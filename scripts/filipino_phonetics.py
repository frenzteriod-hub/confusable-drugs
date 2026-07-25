#!/usr/bin/env python3
"""Cebuano-aware pronunciation features for medicine-name screening.

This module is deliberately a *candidate-ranking* aid.  It does not identify a
medicine and it does not claim that one pronunciation is universally correct.

The pronunciation lattice keeps several routes separate:

* a curated IPA override when one has been supplied;
* CMUdict for known English words (when installed);
* eSpeak NG's contextual English dictionary/rule engine for out-of-vocabulary
  words;
* Epitran English when both Epitran and Flite's ``lex_lookup`` are available;
* a clearly labelled, low-confidence English spelling fallback;
* Epitran Cebuano as a direct-reading hypothesis; and
* bounded Cebuano/Philippine-English adaptations.

Each path preserves IPA tokens, display text, provenance, evidence level,
rules, coverage, and a cost.  Costs prevent a speculative path from winning a
comparison merely because it happens to match another speculative path.
"""

from __future__ import annotations

import hashlib
import importlib.util
import json
import logging
import math
import re
import shutil
import unicodedata
from dataclasses import dataclass
from functools import lru_cache
from typing import Iterable


MODEL_ID = "cebuano-pronunciation-lattice-v4"
MAX_PATHS_PER_TOKEN = 10
MAX_PATHS_PER_NAME = 10
MAX_DETAILED_PATH_PAIRS = 10
MAX_RAW_AUDIT_PATH_PAIRS = 4
MAX_PRONUNCIATION_WORDS = 3
MAX_PRONUNCIATION_LETTERS = 36
MAX_SYLLABLE_ALIGNMENT_SEGMENTS = 32
PATH_COST_PENALTY = 0.075
WORD_BOUNDARY = "‖"

# ``stress_index`` is deliberately optional.  Epitran's public API does not
# retain lexical stress, and assigning penultimate stress to every path creates
# false precision for Philippine-English and Cebuano-influenced readings.
@dataclass(frozen=True)
class PronunciationPath:
    label: str
    spelling: str
    syllables: tuple[str, ...]
    phonemes: tuple[str, ...]
    stress_index: int | None
    route: str
    evidence: str
    source: str
    cost: float
    rule_ids: tuple[str, ...] = ()
    coverage: float = 1.0
    availability: str = "available"
    error: str | None = None

    @property
    def confidence(self) -> float:
        """A transparent relative confidence, not a clinical probability."""
        return round(math.exp(-self.cost), 6)


@dataclass(frozen=True)
class PronunciationProfile:
    source_name: str
    paths: tuple[PronunciationPath, ...]


# Keep this empty by default.  High-risk or speaker-validated medicine names
# can be added in a reviewed data file later without pretending a heuristic is
# an exact source pronunciation.
CURATED_IPA_OVERRIDES: dict[str, tuple[tuple[str, tuple[str, ...], int | None], ...]] = {}


ARPABET_TO_IPA = {
    "AA": "ɑ", "AE": "æ", "AH": "ʌ", "AO": "ɔ", "AW": "aʊ",
    "AY": "aɪ", "B": "b", "CH": "tʃ", "D": "d", "DH": "ð",
    "EH": "ɛ", "ER": "ɝ", "EY": "eɪ", "F": "f", "G": "ɡ",
    "HH": "h", "IH": "ɪ", "IY": "i", "JH": "dʒ", "K": "k",
    "L": "l", "M": "m", "N": "n", "NG": "ŋ", "OW": "oʊ",
    "OY": "ɔɪ", "P": "p", "R": "r", "S": "s", "SH": "ʃ",
    "T": "t", "TH": "θ", "UH": "ʊ", "UW": "u", "V": "v",
    "W": "w", "Y": "j", "Z": "z", "ZH": "ʒ",
}

IPA_DISPLAY = {
    "ɑ": "a", "ɒ": "o", "æ": "a", "ʌ": "a", "ə": "e",
    "ɚ": "er", "ɝ": "er", "ɜ": "er", "ɔ": "o", "o": "o",
    "oʊ": "ow", "ʊ": "u", "u": "u", "ɪ": "i", "i": "i",
    "ɛ": "e", "e": "e", "eɪ": "ey", "aɪ": "ay", "aʊ": "aw",
    "ɔɪ": "oy", "tʃ": "ch", "dʒ": "j", "ɡ": "g", "ŋ": "ng",
    "θ": "th", "ð": "dh", "ʃ": "sh", "ʒ": "zh", "ɾ": "r",
    "j": "y", "ɹ": "r", "ɫ": "l",
    "ʔ": "", WORD_BOUNDARY: " ",
}

VOWEL_PHONEMES = frozenset({
    "a", "ɑ", "ɒ", "æ", "ʌ", "ə", "ɚ", "ɝ", "ɜ", "e", "ɛ",
    "ɪ", "i", "o", "ɔ", "oʊ", "ʊ", "u", "aɪ", "aʊ", "ɔɪ", "eɪ",
})

# Costs are deliberately conservative.  They are model parameters to validate
# with local speaker data, not claims that every speaker makes these changes.
SIMILAR_PHONEMES = {
    frozenset(("f", "p")): 0.22,
    frozenset(("v", "b")): 0.22,
    frozenset(("z", "s")): 0.20,
    frozenset(("ʃ", "s")): 0.24,
    frozenset(("θ", "t")): 0.18,
    frozenset(("ð", "d")): 0.18,
    frozenset(("dʒ", "j")): 0.20,
    frozenset(("tʃ", "ts")): 0.26,
    frozenset(("ɡ", "k")): 0.42,
    frozenset(("r", "ɾ")): 0.08,
    frozenset(("e", "i")): 0.28,
    frozenset(("ɛ", "e")): 0.26,
    frozenset(("ɛ", "i")): 0.38,
    frozenset(("o", "u")): 0.28,
    frozenset(("ɔ", "o")): 0.26,
    frozenset(("ʊ", "u")): 0.26,
    frozenset(("ɑ", "a")): 0.18,
    frozenset(("ə", "a")): 0.45,
    frozenset(("ə", "e")): 0.45,
}

# IPA-level alternations.  Use the original phone as the no-cost option and
# create only the top bounded alternatives, never a full cross product.
PHONE_ALTERNATIVES: dict[
    str, tuple[tuple[str | tuple[str, ...], float, str], ...]
] = {
    "f": (("p", 0.38, "CEB006"),),
    "v": (("b", 0.38, "CEB007"),),
    "z": (("s", 0.30, "CEB008"),),
    "θ": (("t", 0.22, "CEB_TH_T"),),
    "ð": (("d", 0.22, "CEB_DH_D"),),
    "r": (("ɾ", 0.12, "CEB_R_TAP"),),
    "ɪ": (("i", 0.24, "CEB001"), ("e", 0.42, "CEB001")),
    "ɛ": (("e", 0.24, "CEB001"), ("i", 0.42, "CEB001")),
    "e": (("i", 0.30, "CEB001"),),
    "u": (("o", 0.28, "CEB002"),),
    "ʊ": (("u", 0.22, "CEB002"), ("o", 0.34, "CEB002")),
    "ɔ": (("o", 0.24, "CEB002"),),
    "o": (("u", 0.30, "CEB002"),),
    "oʊ": (("o", 0.30, "CEB002"), ("u", 0.46, "CEB002")),
    "ə": (("a", 0.52, "CEB010"), ("e", 0.52, "CEB010")),
}

# Epitran's Cebuano map does not cover these Latin letters.  This compatibility
# step is a *separate nativized route*, never a claim that raw Cebuano speech
# universally uses those replacements.
CEBUANO_ENGINE_COMPATIBILITY = (
    ("x", "ks", "CEB_X_KS"),
    ("f", "p", "CEB006"),
    ("v", "b", "CEB007"),
    ("z", "s", "CEB008"),
    ("q", "k", "CEB_Q_K"),
)


def normalize_name(value: str) -> str:
    text = unicodedata.normalize("NFKD", value or "").casefold()
    text = "".join(character for character in text if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9]+", "", text)


def normalized_words(value: str) -> tuple[str, ...]:
    text = unicodedata.normalize("NFKD", value or "").casefold()
    text = "".join(character for character in text if not unicodedata.combining(character))
    return tuple(part for part in re.findall(r"[a-z0-9]+", text) if part)


def pronunciation_input_is_bounded(value: str) -> bool:
    """Keep expensive G2P comparison to medicine-name-sized inputs.

    Long multi-ingredient strings are still screened with spelling features,
    but treating every ingredient list as one spoken medicine name creates a
    combinatorial path explosion and misleading cross-ingredient readings.
    """
    words = normalized_words(value)
    return (
        bool(words)
        and len(words) <= MAX_PRONUNCIATION_WORDS
        and sum(len(word) for word in words) <= MAX_PRONUNCIATION_LETTERS
    )


def _unique(values: Iterable[str]) -> tuple[str, ...]:
    return tuple(dict.fromkeys(value for value in values if value))


def _combine_word_choices(
    choice_groups: tuple[tuple[str, ...], ...], limit: int = 80
) -> tuple[str, ...]:
    combinations = [""]
    for choices in choice_groups:
        next_values: list[str] = []
        for prefix in combinations:
            for choice in choices:
                next_values.append(f"{prefix}{choice}")
                if len(next_values) >= limit:
                    break
            if len(next_values) >= limit:
                break
        combinations = next_values
    return _unique(combinations)


def _english_like_normalized(text: str) -> str:
    """A labelled last-resort display fallback, not an English G2P model."""
    text = (
        text.replace("ph", "f")
        .replace("qu", "kw")
        .replace("x", "ks")
        .replace("ce", "se")
        .replace("ci", "si")
        .replace("cy", "sy")
        .replace("ge", "je")
        .replace("gi", "ji")
        .replace("gy", "jy")
    )
    return re.sub(r"i(?=[aeou])", "ay", text)


def _english_fallback_displays(word: str) -> tuple[str, ...]:
    base = _english_like_normalized(word)
    variants = [base]
    if "flu" in base:
        variants.append(base.replace("flu", "flo"))
    return _unique(variants)


def nativize(value: str, merge_vowels: bool = False) -> str:
    """Legacy Cebuano-friendly spelling transform retained as an E3 baseline."""
    transformed_words: list[str] = []
    for text in normalized_words(value):
        for source, target in (
            ("tion", "syon"), ("sion", "syon"), ("ture", "tyur"),
            ("sch", "sk"), ("ph", "p"), ("th", "t"), ("sh", "s"),
            ("ch", "ts"), ("qu", "kw"), ("x", "ks"), ("f", "p"),
            ("v", "b"), ("z", "s"), ("j", "dy"),
        ):
            text = text.replace(source, target)
        text = re.sub(r"c(?=[eiy])", "s", text)
        text = text.replace("c", "k").replace("q", "k")
        text = re.sub(r"g(?=[eiy])", "dy", text)
        if merge_vowels:
            text = text.replace("e", "i").replace("o", "u")
        transformed_words.append(text)
    return "".join(transformed_words)


def speech_simplify(value: str) -> str:
    text = nativize(value, merge_vowels=True)
    text = re.sub(r"([aeiou])\1+", r"\1", text)
    return text.replace("y", "i")


def syllabify(value: str) -> tuple[str, ...]:
    """Display-only syllabification; IPA syllabification is handled separately."""
    word = normalize_name(value)
    if not word:
        return ()
    nuclei = [index for index, character in enumerate(word) if character in "aeiou"]
    if not nuclei:
        return (word,)
    boundaries = [0]
    for left, right in zip(nuclei, nuclei[1:]):
        consonants = right - left - 1
        boundary = right if consonants <= 0 else left + 1 if consonants == 1 else right - 1
        if boundary > boundaries[-1]:
            boundaries.append(boundary)
    boundaries.append(len(word))
    return tuple(
        word[start:end]
        for start, end in zip(boundaries, boundaries[1:])
        if word[start:end]
    )


def _canonical_phone(phone: str) -> str:
    return phone.replace("͡", "").replace("g", "ɡ")


def _phones_to_display(phones: Iterable[str]) -> str:
    parts: list[str] = []
    for phone in phones:
        if phone.startswith("#"):
            parts.append(phone[1:])
        else:
            parts.append(IPA_DISPLAY.get(phone, phone))
    return "".join(parts).strip()


def _romanized_to_phonemes(value: str) -> tuple[str, ...]:
    """Convert documented fallback respellings to IPA-like tokens only."""
    word = normalize_name(value)
    tokens: list[str] = []
    index = 0
    mappings = (
        ("dzh", "dʒ"), ("ch", "tʃ"), ("sh", "ʃ"), ("th", "θ"),
        ("ng", "ŋ"), ("ts", "ts"), ("dy", "dʒ"), ("kw", "kw"),
        ("ks", "ks"), ("ay", "aɪ"), ("ey", "eɪ"), ("ow", "oʊ"),
        ("aw", "aʊ"), ("oy", "ɔɪ"),
    )
    mapping = {
        "a": "a", "e": "e", "i": "i", "o": "o", "u": "u",
        "b": "b", "c": "k", "d": "d", "f": "f", "g": "ɡ",
        "h": "h", "j": "dʒ", "k": "k", "l": "l", "m": "m",
        "n": "n", "p": "p", "q": "k", "r": "ɾ", "s": "s",
        "t": "t", "v": "v", "w": "w", "x": "ks", "y": "j", "z": "z",
    }
    while index < len(word):
        for source, target in mappings:
            if word.startswith(source, index):
                tokens.append(target)
                index += len(source)
                break
        else:
            token = mapping.get(word[index])
            if token:
                tokens.append(token)
            index += 1
    return tuple(tokens)


# Kept for callers that used the old public function.  It is intentionally only
# for ASCII display/fallback text; never pass Epitran IPA through it.
def grapheme_to_phonemes(value: str) -> tuple[str, ...]:
    return _romanized_to_phonemes(value)


def _make_path(
    *,
    label: str,
    phonemes: Iterable[str],
    spelling: str | None = None,
    stress_index: int | None = None,
    route: str,
    evidence: str,
    source: str,
    cost: float,
    rule_ids: Iterable[str] = (),
    coverage: float = 1.0,
    availability: str = "available",
    error: str | None = None,
) -> PronunciationPath:
    phones = tuple(_canonical_phone(phone) for phone in phonemes if phone)
    display = spelling if spelling is not None else _phones_to_display(phones)
    return PronunciationPath(
        label=label,
        spelling=display,
        syllables=syllabify(display),
        phonemes=phones,
        stress_index=stress_index,
        route=route,
        evidence=evidence,
        source=source,
        cost=round(cost, 6),
        rule_ids=tuple(dict.fromkeys(rule_ids)),
        coverage=round(coverage, 6),
        availability=availability,
        error=error,
    )


@lru_cache(maxsize=1)
def _cmudict_data() -> dict[str, list[list[str]]] | None:
    if importlib.util.find_spec("cmudict") is None:
        return None
    try:
        import cmudict  # type: ignore[import-not-found]

        return cmudict.dict()
    except Exception:
        return None


def _arpabet_to_ipa(token: str) -> str | None:
    bare = re.sub(r"\d", "", token)
    if bare == "AH" and token.endswith("0"):
        return "ə"
    if bare == "ER" and token.endswith("0"):
        return "ɚ"
    return ARPABET_TO_IPA.get(bare)


def _arpabet_stress_index(tokens: Iterable[str]) -> int | None:
    primary: int | None = None
    secondary: int | None = None
    vowel_index = 0
    for token in tokens:
        bare = re.sub(r"\d", "", token)
        if bare not in ARPABET_TO_IPA or bare in {"B", "CH", "D", "DH", "F", "G", "HH", "JH", "K", "L", "M", "N", "NG", "P", "R", "S", "SH", "T", "TH", "V", "W", "Y", "Z", "ZH"}:
            continue
        if token.endswith("1") and primary is None:
            primary = vowel_index
        elif token.endswith("2") and secondary is None:
            secondary = vowel_index
        vowel_index += 1
    return primary if primary is not None else secondary


@lru_cache(maxsize=65_536)
def _cmudict_paths(word: str) -> tuple[PronunciationPath, ...]:
    data = _cmudict_data()
    if not data:
        return ()
    paths: list[PronunciationPath] = []
    for index, entry in enumerate(data.get(word, [])[:2]):
        phones = tuple(phone for token in entry if (phone := _arpabet_to_ipa(token)))
        if not phones:
            continue
        paths.append(_make_path(
            label="CMUdict English pronunciation",
            phonemes=phones,
            stress_index=_arpabet_stress_index(entry),
            route="english_cmudict",
            evidence="E0",
            source="CMU Pronouncing Dictionary",
            cost=0.04 * index,
            rule_ids=("EN_CMU_DICT",),
        ))
    return tuple(paths)


@lru_cache(maxsize=1)
def _espeak_backend():
    """Load the bundled eSpeak NG backend without requiring Homebrew.

    ``phonemizer-fork`` exposes the stable Phonemizer API while
    ``espeakng-loader`` supplies the platform library and data.  Keeping the
    backend cached avoids paying its roughly one-second startup cost per word.
    """
    if (
        importlib.util.find_spec("phonemizer") is None
        or importlib.util.find_spec("espeakng_loader") is None
    ):
        return None
    try:
        import espeakng_loader  # type: ignore[import-not-found]
        from phonemizer.backend import EspeakBackend  # type: ignore[import-not-found]
        from phonemizer.backend.espeak.wrapper import (  # type: ignore[import-not-found]
            EspeakWrapper,
        )

        EspeakWrapper.set_library(espeakng_loader.get_library_path())
        EspeakWrapper.set_data_path(espeakng_loader.get_data_path())
        logger = logging.getLogger("confusable_drugs.espeak")
        logger.handlers = [logging.NullHandler()]
        logger.propagate = False
        return EspeakBackend(
            "en-us",
            with_stress=True,
            language_switch="remove-flags",
            words_mismatch="ignore",
            logger=logger,
        )
    except Exception:
        return None


def _canonicalize_espeak_phone(raw_phone: str) -> tuple[str, ...]:
    """Map one pipe-delimited eSpeak phone into the lattice inventory."""
    phone = raw_phone.replace("ˈ", "").replace("ˌ", "").replace("͡", "")
    phone = phone.replace("̩", "").replace("g", "ɡ")
    expansions = {
        "ɑː": ("ɑ",),
        "ɒː": ("ɒ",),
        "ɔː": ("ɔ",),
        "iː": ("i",),
        "uː": ("u",),
        "ɜː": ("ɝ",),
        "ɐ": ("ʌ",),
        "ɹ": ("r",),
        "ɫ": ("l",),
        "iə": ("i", "ə"),
        "ɪə": ("ɪ", "ə"),
        "eə": ("e", "ə"),
        "uə": ("u", "ə"),
        "ʊə": ("ʊ", "ə"),
        "ɔə": ("ɔ", "ə"),
        "ʊɹ": ("ʊ", "r"),
    }
    if not phone:
        return ()
    return expansions.get(phone, (_canonical_phone(phone),))


def _parse_espeak_ipa(value: str) -> tuple[tuple[str, ...], int | None]:
    """Parse eSpeak's pipe-delimited IPA and retain primary stress."""
    phones: list[str] = []
    primary_stress: int | None = None
    secondary_stress: int | None = None
    vowel_index = 0
    # eSpeak can expand one alphanumeric label token into several spoken words
    # (for example B12 -> "B twelve").  Make those internal boundaries
    # explicit before splitting phones; never keep a string such as "b θ" as
    # one malformed phoneme.
    separated = value.replace(WORD_BOUNDARY, f"|{WORD_BOUNDARY}|")
    separated = re.sub(r"\s+", f"|{WORD_BOUNDARY}|", separated)
    for raw_phone in separated.split("|"):
        if raw_phone == WORD_BOUNDARY:
            if phones and phones[-1] != WORD_BOUNDARY:
                phones.append(WORD_BOUNDARY)
            continue
        has_primary = "ˈ" in raw_phone
        has_secondary = "ˌ" in raw_phone
        for phone in _canonicalize_espeak_phone(raw_phone):
            # en-us eSpeak sometimes emits a rhotic vowel followed by a
            # redundant separate rhotic (for example binary: ɚ|ɹ).  The
            # lattice stores one rhotic nucleus for that sequence.
            if phone == "r" and phones and phones[-1] in {"ɚ", "ɝ"}:
                continue
            if phone in VOWEL_PHONEMES:
                if has_primary and primary_stress is None:
                    primary_stress = vowel_index
                elif has_secondary and secondary_stress is None:
                    secondary_stress = vowel_index
                vowel_index += 1
                has_primary = False
                has_secondary = False
            phones.append(phone)
    if phones and phones[-1] == WORD_BOUNDARY:
        phones.pop()
    stress = primary_stress if primary_stress is not None else secondary_stress
    return tuple(phones), stress


@lru_cache(maxsize=65_536)
def _espeak_english_path(word: str) -> PronunciationPath | None:
    """Return contextual English G2P for words absent from CMUdict."""
    backend = _espeak_backend()
    if backend is None:
        return None
    try:
        from phonemizer.separator import Separator  # type: ignore[import-not-found]

        outputs = backend.phonemize(
            [word],
            separator=Separator(phone="|", word=WORD_BOUNDARY, syllable=""),
            strip=True,
            njobs=1,
        )
        phones, stress = _parse_espeak_ipa(outputs[0] if outputs else "")
    except Exception:
        return None
    if not phones:
        return None
    return _make_path(
        label="eSpeak NG contextual English pronunciation",
        phonemes=phones,
        stress_index=stress,
        route="english_espeak_ng",
        evidence="E1",
        source="eSpeak NG en-us dictionary/context-rule G2P via Phonemizer",
        cost=0.20,
        rule_ids=("EN_ESPEAK_NG",),
    )


@lru_cache(maxsize=1)
def pronunciation_provider_status() -> dict[str, str]:
    statuses = {
        "cmudict": "available" if _cmudict_data() else "unavailable",
        "espeak_ng": "available" if _espeak_backend() else (
            "unavailable: install phonemizer-fork and espeakng-loader"
        ),
        "epitran": "available" if importlib.util.find_spec("epitran") else "unavailable",
        "epitran_eng": "unavailable: lex_lookup not on PATH",
        "epitran_ceb": "unavailable: Epitran not installed",
    }
    if statuses["epitran"] == "available":
        statuses["epitran_ceb"] = "available"
        if shutil.which("lex_lookup"):
            statuses["epitran_eng"] = "available"
    return statuses


@lru_cache(maxsize=2)
def _epitran_engine(code: str):
    if importlib.util.find_spec("epitran") is None:
        return None
    if code == "eng-Latn" and not shutil.which("lex_lookup"):
        return None
    try:
        import epitran  # type: ignore[import-not-found]

        return epitran.Epitran(code)
    except Exception:
        return None


@lru_cache(maxsize=65_536)
def _epitran_english_path(word: str) -> PronunciationPath | None:
    engine = _epitran_engine("eng-Latn")
    if engine is None:
        return None
    try:
        phones = tuple(_canonical_phone(phone) for phone in engine.trans_list(word) if phone)
    except Exception:
        return None
    if not phones:
        return None
    return _make_path(
        label="Epitran English pronunciation",
        phonemes=phones,
        stress_index=None,
        route="english_epitran",
        evidence="E2",
        source="Epitran eng-Latn via Flite lex_lookup",
        cost=0.28,
        rule_ids=("EN_EPITRAN_ENG",),
    )


def _cebuano_coverage(engine, word: str) -> tuple[float, tuple[str, ...]]:
    try:
        tuples = engine.word_to_tuples(word)
    except Exception:
        return 0.0, ()
    if not tuples:
        return 0.0, ()
    missing = tuple(item[2] for item in tuples if not item[3])
    return (len(tuples) - len(missing)) / len(tuples), missing


def _cebuano_engine_compatible(word: str) -> tuple[str, tuple[str, ...], int]:
    result = word
    rules: list[str] = []
    changes = 0
    for source, target, rule_id in CEBUANO_ENGINE_COMPATIBILITY:
        count = result.count(source)
        if count:
            result = result.replace(source, target)
            rules.extend((rule_id,) * count)
            changes += count
    # English word-final <y> commonly represents /i/.  Keep that contextual
    # conversion in the direct-reading recovery route instead of globally
    # converting every y (where it can also represent a consonantal /j/).
    if result.endswith("y"):
        result = f"{result[:-1]}i"
        rules.append("CEB_FINAL_Y_I")
        changes += 1
    return result, tuple(rules), changes


@lru_cache(maxsize=65_536)
def _epitran_cebuano_paths(word: str) -> tuple[PronunciationPath, ...]:
    engine = _epitran_engine("ceb-Latn")
    if engine is None:
        return ()
    paths: list[PronunciationPath] = []
    raw_coverage, _ = _cebuano_coverage(engine, word)
    if raw_coverage == 1.0:
        try:
            phones = tuple(_canonical_phone(phone) for phone in engine.trans_list(word) if phone)
        except Exception:
            phones = ()
        if phones:
            paths.append(_make_path(
                label="Epitran Cebuano direct-reading hypothesis",
                phonemes=phones,
                stress_index=None,
                route="cebuano_epitran_direct",
                evidence="E2",
                source="Epitran ceb-Latn; raw spelling map covered",
                cost=0.42,
                rule_ids=("CEB_EPITRAN_DIRECT",),
                coverage=raw_coverage,
            ))

    compatible, rules, changes = _cebuano_engine_compatible(word)
    if changes:
        compatibility_coverage, _ = _cebuano_coverage(engine, compatible)
        if compatibility_coverage == 1.0:
            try:
                phones = tuple(
                    _canonical_phone(phone) for phone in engine.trans_list(compatible) if phone
                )
            except Exception:
                phones = ()
            if phones:
                paths.append(_make_path(
                    label="Epitran Cebuano nativized direct-reading hypothesis",
                    phonemes=phones,
                    stress_index=None,
                    route="cebuano_epitran_nativized",
                    evidence="E3",
                    source="Epitran ceb-Latn after explicit compatibility substitutions",
                    cost=0.62 + 0.22 * changes,
                    rule_ids=("CEB_EPITRAN_NATIVIZED", *rules),
                    coverage=compatibility_coverage,
                ))
    return tuple(paths)


def _heuristic_english_paths(word: str) -> tuple[PronunciationPath, ...]:
    return tuple(
        _make_path(
            label="English spelling fallback",
            spelling=display,
            phonemes=_romanized_to_phonemes(display),
            stress_index=None,
            route="english_heuristic",
            evidence="E3",
            source="Documented fallback only; no English G2P source available",
            cost=0.95 + 0.08 * index,
            rule_ids=("EN_HEURISTIC",),
        )
        for index, display in enumerate(_english_fallback_displays(word))
    )


def _legacy_cebuano_paths(word: str) -> tuple[PronunciationPath, ...]:
    paths: list[PronunciationPath] = []
    for label, display, cost, rule_id in (
        ("Legacy Cebuano nativized spelling path", nativize(word), 1.00, "CEB_LEGACY"),
        ("Legacy vowel-merged spelling path", nativize(word, True), 1.28, "CEB_VOWEL_MERGED"),
    ):
        if not display:
            continue
        paths.append(_make_path(
            label=label,
            spelling=display,
            phonemes=_romanized_to_phonemes(display),
            stress_index=None,
            route="cebuano_legacy_rule",
            evidence="E3",
            source="Legacy documented spelling rule baseline; requires speaker validation",
            cost=cost,
            rule_ids=(rule_id,),
        ))
    return tuple(paths)


def _phone_adaptations(path: PronunciationPath) -> tuple[PronunciationPath, ...]:
    if not path.phonemes or not path.route.startswith("english_"):
        return ()
    beam: list[tuple[tuple[str, ...], float, tuple[str, ...]]] = [((), 0.0, ())]
    for phone in path.phonemes:
        options = (((phone,), 0.0, ""), *PHONE_ALTERNATIVES.get(phone, ()))
        next_beam: list[tuple[tuple[str, ...], float, tuple[str, ...]]] = []
        for prefix, added_cost, rules in beam:
            for replacement, cost, rule_id in options:
                replacement_phones = (
                    (replacement,) if isinstance(replacement, str) else replacement
                )
                next_beam.append((
                    (*prefix, *replacement_phones),
                    added_cost + cost,
                    rules if not rule_id else (*rules, rule_id),
                ))
        deduped: dict[tuple[str, ...], tuple[float, tuple[str, ...]]] = {}
        for phones, added_cost, rules in next_beam:
            current = deduped.get(phones)
            if current is None or added_cost < current[0]:
                deduped[phones] = (added_cost, rules)
        beam = [
            (phones, added_cost, rules)
            for phones, (added_cost, rules) in sorted(
                deduped.items(), key=lambda item: (item[1][0], item[0])
            )[:MAX_PATHS_PER_TOKEN]
        ]
    paths: list[PronunciationPath] = []
    for phones, added_cost, rules in beam:
        if not rules:
            continue
        paths.append(_make_path(
            label=f"{path.label} + Cebuano-aware phone adaptation",
            phonemes=phones,
            stress_index=path.stress_index,
            route="cebuano_phone_adaptation",
            evidence="E1/E3",
            source=f"{path.source}; bounded local phone alternatives",
            cost=path.cost + added_cost,
            rule_ids=(*path.rule_ids, *rules),
            coverage=path.coverage,
        ))
    return tuple(paths)


def _reading_variants(path: PronunciationPath) -> tuple[PronunciationPath, ...]:
    """Retain a few explicit high-cost spelling repairs for review experiments."""
    display = normalize_name(path.spelling)
    variants: list[tuple[str, str, str]] = []
    if re.match(r"^s[^aeiou]", display):
        variants.extend(((f"e{display}", "support vowel e", "CEB009"), (f"i{display}", "support vowel i", "CEB009")))
    if re.search(r"[^aeiou]les$", display):
        variants.append((f"{display[:-3]}ols", "final -les vocalized", "CEB011"))
    elif re.search(r"[^aeiou]le$", display):
        variants.append((f"{display[:-2]}ol", "final -le vocalized", "CEB011"))
    return tuple(
        _make_path(
            label=f"{path.label} + {label}",
            spelling=variant,
            phonemes=_romanized_to_phonemes(variant),
            stress_index=None,
            route="cebuano_spelling_repair",
            evidence="E3",
            source=f"{path.source}; heuristic repair requiring speaker validation",
            cost=path.cost + 0.62,
            rule_ids=(*path.rule_ids, rule_id),
            coverage=path.coverage,
        )
        for variant, label, rule_id in variants
    )


def _dedupe_and_rank_paths(paths: Iterable[PronunciationPath], limit: int) -> tuple[PronunciationPath, ...]:
    # Preserve one representative from each route.  Two routes can produce the
    # same IPA sequence, but their provenance and cost are still meaningful to
    # reviewers and to later calibration work.
    selected: dict[tuple[tuple[str, ...], int | None, str], PronunciationPath] = {}
    for path in paths:
        if not path.phonemes:
            continue
        key = (path.phonemes, path.stress_index, path.route)
        current = selected.get(key)
        if current is None or (path.cost, path.route, path.spelling) < (
            current.cost, current.route, current.spelling
        ):
            selected[key] = path
    ranked = sorted(
        selected.values(),
        key=lambda path: (path.cost, path.route, path.spelling, path.phonemes),
    )
    route_representatives: list[PronunciationPath] = []
    seen_routes: set[str] = set()
    for path in ranked:
        if path.route not in seen_routes:
            route_representatives.append(path)
            seen_routes.add(path.route)
    selected_paths = route_representatives[:limit]
    selected_keys = {(path.phonemes, path.stress_index, path.route) for path in selected_paths}
    selected_paths.extend(
        path
        for path in ranked
        if (path.phonemes, path.stress_index, path.route) not in selected_keys
    )
    return tuple(selected_paths[:limit])


@lru_cache(maxsize=65_536)
def _token_profile(word: str) -> tuple[PronunciationPath, ...]:
    if word.isdigit():
        return (_make_path(
            label="Numeric token retained for safety",
            spelling=word,
            phonemes=tuple(f"#{digit}" for digit in word),
            stress_index=None,
            route="numeric",
            evidence="E0",
            source="Published strength/version token",
            cost=0.0,
            rule_ids=("NUMERIC_RETAINED",),
        ),)

    paths: list[PronunciationPath] = []
    for display, phones, stress in CURATED_IPA_OVERRIDES.get(word, ()):
        paths.append(_make_path(
            label="Curated pronunciation override",
            spelling=display,
            phonemes=phones,
            stress_index=stress,
            route="curated",
            evidence="E0",
            source="Reviewed local pronunciation override",
            cost=0.0,
            rule_ids=("CURATED_IPA",),
        ))

    english_paths = list(_cmudict_paths(word))
    if not english_paths:
        espeak_path = _espeak_english_path(word)
        if espeak_path:
            english_paths.append(espeak_path)
    if not english_paths:
        epitran_path = _epitran_english_path(word)
        if epitran_path:
            english_paths.append(epitran_path)
    if not english_paths:
        english_paths.extend(_heuristic_english_paths(word))
    paths.extend(english_paths)
    for english_path in english_paths:
        paths.extend(_phone_adaptations(english_path))

    direct_paths = list(_epitran_cebuano_paths(word))
    paths.extend(direct_paths)
    legacy_paths = list(_legacy_cebuano_paths(word))
    paths.extend(legacy_paths)
    # Repairs may be applied after an English-derived display form as well as a
    # direct-reading form (for example, ``school -> eskul``).  They remain E3
    # and carry a substantial extra cost in every case.
    for path in (*english_paths, *direct_paths, *legacy_paths):
        paths.extend(_reading_variants(path))
    return _dedupe_and_rank_paths(paths, MAX_PATHS_PER_TOKEN)


def _combine_paths(groups: tuple[tuple[PronunciationPath, ...], ...]) -> tuple[PronunciationPath, ...]:
    combinations: list[PronunciationPath] = []
    partials: list[tuple[PronunciationPath, ...]] = [()]
    for group in groups:
        next_partials: list[tuple[PronunciationPath, ...]] = []
        for partial in partials:
            for path in group:
                next_partials.append((*partial, path))
                if len(next_partials) >= MAX_PATHS_PER_NAME * 3:
                    break
            if len(next_partials) >= MAX_PATHS_PER_NAME * 3:
                break
        partials = next_partials
    for parts in partials:
        phones: list[str] = []
        for index, path in enumerate(parts):
            if index:
                phones.append(WORD_BOUNDARY)
            phones.extend(path.phonemes)
        labels = tuple(dict.fromkeys(path.label for path in parts))
        routes = tuple(dict.fromkeys(path.route for path in parts))
        evidence = "+".join(dict.fromkeys(path.evidence for path in parts))
        sources = "; ".join(dict.fromkeys(path.source for path in parts))
        rules = tuple(rule for path in parts for rule in path.rule_ids)
        combinations.append(_make_path(
            label=" + ".join(labels),
            spelling=" ".join(path.spelling for path in parts),
            phonemes=phones,
            stress_index=parts[0].stress_index if len(parts) == 1 else None,
            route=routes[0] if len(routes) == 1 else "mixed",
            evidence=evidence,
            source=sources,
            cost=sum(path.cost for path in parts),
            rule_ids=rules,
            coverage=min(path.coverage for path in parts),
        ))
    return _dedupe_and_rank_paths(combinations, MAX_PATHS_PER_NAME)


@lru_cache(maxsize=65_536)
def pronunciation_profile(value: str) -> PronunciationProfile:
    words = normalized_words(value)
    if not words or not pronunciation_input_is_bounded(value):
        return PronunciationProfile(value, ())
    return PronunciationProfile(value, _combine_paths(tuple(_token_profile(word) for word in words)))


def english_like_readings(value: str) -> tuple[str, ...]:
    """Return display forms for English-derived paths, with provenance elsewhere."""
    paths = pronunciation_profile(value).paths
    return _unique(
        path.spelling
        for path in paths
        if path.route.startswith("english_") or path.route == "cebuano_phone_adaptation"
    )


def cebuano_from_english_like_readings(
    value: str, merge_vowels: bool = False
) -> tuple[str, ...]:
    paths = pronunciation_profile(value).paths
    readings = [
        path.spelling
        for path in paths
        if path.route == "cebuano_phone_adaptation"
    ]
    if merge_vowels:
        readings = [reading.replace("e", "i").replace("o", "u") for reading in readings]
    return _unique(readings)


def _substitution_cost(first: str, second: str) -> float:
    if first == second:
        return 0.0
    return SIMILAR_PHONEMES.get(frozenset((first, second)), 1.0)


def _indel_cost(phone: str) -> float:
    if phone == WORD_BOUNDARY:
        return 0.12
    if phone in VOWEL_PHONEMES:
        return 0.42
    if phone.startswith("#"):
        return 1.0
    return 0.78


def weighted_phoneme_similarity(
    first: tuple[str, ...], second: tuple[str, ...]
) -> float:
    if not first or not second:
        return 0.0
    previous = [0.0]
    for phone in second:
        previous.append(previous[-1] + _indel_cost(phone))
    for left in first:
        current = [previous[0] + _indel_cost(left)]
        for index, right in enumerate(second, start=1):
            current.append(min(
                previous[index] + _indel_cost(left),
                current[index - 1] + _indel_cost(right),
                previous[index - 1] + _substitution_cost(left, right),
            ))
        previous = current
    maximum = max(len(first), len(second))
    return max(0.0, 1.0 - previous[-1] / maximum)


def _phoneme_syllables(phones: tuple[str, ...]) -> tuple[tuple[str, ...], ...]:
    parts: list[tuple[str, ...]] = []
    current: list[str] = []
    saw_vowel = False
    for phone in phones:
        if phone == WORD_BOUNDARY:
            if current:
                parts.append(tuple(current))
            current = []
            saw_vowel = False
            continue
        if phone in VOWEL_PHONEMES and saw_vowel:
            parts.append(tuple(current))
            current = []
        current.append(phone)
        saw_vowel = saw_vowel or phone in VOWEL_PHONEMES
    if current:
        parts.append(tuple(current))
    return tuple(parts) if parts else (phones,)


def syllable_similarity(first: tuple[str, ...], second: tuple[str, ...]) -> float:
    left_syllables = _phoneme_syllables(first)
    right_syllables = _phoneme_syllables(second)
    if not left_syllables or not right_syllables:
        return 0.0
    previous = list(range(len(right_syllables) + 1))
    for left_index, left in enumerate(left_syllables, start=1):
        current = [left_index]
        for right_index, right in enumerate(right_syllables, start=1):
            phonetic = weighted_phoneme_similarity(left, right)
            current.append(min(
                previous[right_index] + 1,
                current[right_index - 1] + 1,
                previous[right_index - 1] + (1 - phonetic),
            ))
        previous = current
    return max(0.0, 1.0 - previous[-1] / max(len(left_syllables), len(right_syllables)))


def stress_similarity(first: PronunciationPath, second: PronunciationPath) -> float | None:
    if first.stress_index is None or second.stress_index is None:
        return None
    first_syllables = _phoneme_syllables(first.phonemes)
    second_syllables = _phoneme_syllables(second.phonemes)
    if len(first_syllables) <= 1 or len(second_syllables) <= 1:
        return 1.0
    first_relative = first.stress_index / (len(first_syllables) - 1)
    second_relative = second.stress_index / (len(second_syllables) - 1)
    return max(0.0, 1.0 - abs(first_relative - second_relative))


def bigram_dice(first: str, second: str) -> float:
    def bigrams(value: str) -> list[str]:
        normalized = normalize_name(value)
        return [normalized[index:index + 2] for index in range(len(normalized) - 1)]

    left, right = bigrams(first), bigrams(second)
    if not left and not right:
        return 1.0
    if not left or not right:
        return 0.0
    remaining = list(right)
    overlap = 0
    for item in left:
        if item in remaining:
            overlap += 1
            remaining.remove(item)
    return 2 * overlap / (len(left) + len(right))


def pronunciation_feature_defaults(
    first_name: str,
    second_name: str,
    status: str = "not_scored_first_pass",
) -> dict[str, object]:
    """Return schema-stable fields when a full lattice is intentionally skipped."""
    return {
        "pronunciation_profile_status": status,
        "pronunciation_lattice_similarity": 0.0,
        "weighted_lattice_similarity": 0.0,
        "raw_best_lattice_similarity": 0.0,
        "weighted_phoneme_similarity": 0.0,
        "syllable_similarity": 0.0,
        "stress_similarity": None,
        "orthographic_bigram_similarity": round(bigram_dice(first_name, second_name), 6),
        "experimental_ensemble_score": 0.0,
        "pronunciation_path_a": "",
        "pronunciation_path_b": "",
        "pronunciation_path_label_a": "",
        "pronunciation_path_label_b": "",
        "pronunciation_path_route_a": "",
        "pronunciation_path_route_b": "",
        "pronunciation_path_evidence_a": "",
        "pronunciation_path_evidence_b": "",
        "pronunciation_path_source_a": "",
        "pronunciation_path_source_b": "",
        # A skipped lattice has no selected route, so zero would be misleading
        # (zero is a genuine cost for a curated/first dictionary route).
        "pronunciation_path_cost_a": None,
        "pronunciation_path_cost_b": None,
        "pronunciation_path_coverage_a": None,
        "pronunciation_path_coverage_b": None,
        "pronunciation_path_rule_ids_a": "",
        "pronunciation_path_rule_ids_b": "",
        "pronunciation_path_ipa_a": "",
        "pronunciation_path_ipa_b": "",
    }


@lru_cache(maxsize=32_768)
def pronunciation_features(first_name: str, second_name: str) -> dict[str, object]:
    first_profile = pronunciation_profile(first_name)
    second_profile = pronunciation_profile(second_name)
    if not first_profile.paths or not second_profile.paths:
        return pronunciation_feature_defaults(
            first_name, second_name, "not_profiled_complex_name"
        )

    # A full syllable alignment calls phoneme alignment again for each syllable
    # pair.  First keep a small, cost-aware beam by whole-path phoneme score,
    # then perform the expensive syllable/stress comparison only for those
    # plausible route pairs.  This keeps the full PH FDA batch feasible while
    # preserving multiple evidence routes instead of one fixed pronunciation.
    preliminary: list[tuple[float, PronunciationPath, PronunciationPath, float]] = []
    for first in first_profile.paths:
        for second in second_profile.paths:
            phonetic = weighted_phoneme_similarity(first.phonemes, second.phonemes)
            preliminary.append((
                phonetic - PATH_COST_PENALTY * (first.cost + second.cost),
                first,
                second,
                phonetic,
            ))
    preliminary.sort(
        key=lambda item: (
            -item[0],
            item[1].cost + item[2].cost,
            item[1].route,
            item[2].route,
        )
    )
    # Retain a few raw phoneme leaders as well.  They make the separately
    # exported raw-best audit value meaningful even if their route costs are
    # too high to enter the cost-adjusted ranking beam.
    raw_leaders = sorted(
        preliminary,
        key=lambda item: (
            -item[3],
            item[1].cost + item[2].cost,
            item[1].route,
            item[2].route,
        ),
    )[:MAX_RAW_AUDIT_PATH_PAIRS]
    detailed_pairs = []
    seen_detailed_pairs: set[tuple[PronunciationPath, PronunciationPath]] = set()
    for candidate in [*preliminary[:MAX_DETAILED_PATH_PAIRS], *raw_leaders]:
        key = (candidate[1], candidate[2])
        if key in seen_detailed_pairs:
            continue
        seen_detailed_pairs.add(key)
        detailed_pairs.append(candidate)
    selected: tuple[float, float, PronunciationPath, PronunciationPath, float, float, float | None] | None = None
    raw_best = 0.0
    for _, first, second, phonetic in detailed_pairs:
        syllables = (
            phonetic
            if max(len(first.phonemes), len(second.phonemes))
            > MAX_SYLLABLE_ALIGNMENT_SEGMENTS
            else syllable_similarity(first.phonemes, second.phonemes)
        )
        stress = stress_similarity(first, second)
        raw = 0.67 * phonetic + 0.33 * syllables
        if stress is not None:
            raw = 0.60 * phonetic + 0.30 * syllables + 0.10 * stress
        raw_best = max(raw_best, raw)
        adjusted = max(0.0, raw - PATH_COST_PENALTY * (first.cost + second.cost))
        candidate = (adjusted, raw, first, second, phonetic, syllables, stress)
        if selected is None or candidate[0] > selected[0] or (
            candidate[0] == selected[0]
            and (first.cost + second.cost) < (selected[2].cost + selected[3].cost)
        ):
            selected = candidate
    assert selected is not None
    adjusted, raw, first_path, second_path, phonetic, syllables, stress = selected
    orthographic = bigram_dice(first_name, second_name)
    ensemble = 0.52 * adjusted + 0.23 * phonetic + 0.17 * syllables + 0.08 * orthographic
    return {
        "pronunciation_profile_status": "profiled",
        "pronunciation_lattice_similarity": round(raw, 6),
        "weighted_lattice_similarity": round(adjusted, 6),
        "raw_best_lattice_similarity": round(raw_best, 6),
        "weighted_phoneme_similarity": round(phonetic, 6),
        "syllable_similarity": round(syllables, 6),
        "stress_similarity": round(stress, 6) if stress is not None else None,
        "orthographic_bigram_similarity": round(orthographic, 6),
        "experimental_ensemble_score": round(ensemble, 6),
        "pronunciation_path_a": first_path.spelling,
        "pronunciation_path_b": second_path.spelling,
        "pronunciation_path_label_a": first_path.label,
        "pronunciation_path_label_b": second_path.label,
        "pronunciation_path_route_a": first_path.route,
        "pronunciation_path_route_b": second_path.route,
        "pronunciation_path_evidence_a": first_path.evidence,
        "pronunciation_path_evidence_b": second_path.evidence,
        "pronunciation_path_source_a": first_path.source,
        "pronunciation_path_source_b": second_path.source,
        "pronunciation_path_cost_a": round(first_path.cost, 6),
        "pronunciation_path_cost_b": round(second_path.cost, 6),
        "pronunciation_path_coverage_a": round(first_path.coverage, 6),
        "pronunciation_path_coverage_b": round(second_path.coverage, 6),
        "pronunciation_path_rule_ids_a": "|".join(first_path.rule_ids),
        "pronunciation_path_rule_ids_b": "|".join(second_path.rule_ids),
        "pronunciation_path_ipa_a": " ".join(first_path.phonemes),
        "pronunciation_path_ipa_b": " ".join(second_path.phonemes),
    }


def _coarse_phone(phone: str) -> str:
    if phone == WORD_BOUNDARY:
        return "|"
    if phone.startswith("#"):
        return phone
    if phone in VOWEL_PHONEMES:
        return "V"
    if phone in {"p", "b", "f", "v"}:
        return "P"
    if phone in {"t", "d", "θ", "ð", "s", "z", "ʃ", "ʒ", "tʃ", "dʒ", "ts"}:
        return "T"
    if phone in {"k", "ɡ", "ŋ", "kw", "ks"}:
        return "K"
    if phone in {"m", "n"}:
        return "N"
    if phone in {"l", "r", "ɾ"}:
        return "R"
    if phone in {"j", "w", "h"}:
        return "G"
    return phone


@lru_cache(maxsize=65_536)
def pronunciation_coarse_codes(value: str) -> tuple[str, ...]:
    """Cheap IPA-derived blocking keys; full comparison still uses IPA paths."""
    codes = []
    for path in pronunciation_profile(value).paths:
        if path.cost > 1.35:
            continue
        code = "".join(_coarse_phone(phone) for phone in path.phonemes)
        if len(code.replace("|", "")) >= 3:
            codes.append(code)
    return _unique(codes[:12])


def pronunciation_model_metadata() -> dict[str, object]:
    configuration = {
        "model_id": MODEL_ID,
        "max_paths_per_token": MAX_PATHS_PER_TOKEN,
        "max_paths_per_name": MAX_PATHS_PER_NAME,
        "max_detailed_path_pairs": MAX_DETAILED_PATH_PAIRS,
        "max_raw_audit_path_pairs": MAX_RAW_AUDIT_PATH_PAIRS,
        "max_pronunciation_words": MAX_PRONUNCIATION_WORDS,
        "max_pronunciation_letters": MAX_PRONUNCIATION_LETTERS,
        "max_syllable_alignment_segments": MAX_SYLLABLE_ALIGNMENT_SEGMENTS,
        "path_cost_penalty": PATH_COST_PENALTY,
        "phone_alternatives": PHONE_ALTERNATIVES,
        "cebuano_engine_compatibility": CEBUANO_ENGINE_COMPATIBILITY,
    }
    encoded = json.dumps(configuration, ensure_ascii=False, sort_keys=True, default=list).encode("utf-8")
    return {
        "model_id": MODEL_ID,
        "config_sha256": hashlib.sha256(encoded).hexdigest(),
        "provider_status": pronunciation_provider_status(),
        "notes": (
            "CMUdict supplies exact known-word routes. eSpeak NG supplies contextual "
            "dictionary/rule G2P for OOV names. Epitran Cebuano remains a separate "
            "direct-reading recovery path; English Epitran is used only when Flite "
            "lex_lookup is available, and stress is unknown for Epitran paths."
        ),
    }
