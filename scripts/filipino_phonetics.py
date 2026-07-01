#!/usr/bin/env python3
"""Experimental Filipino-aware pronunciation features for medicine names.

The module creates several controlled pronunciation paths for each published
name, aligns phoneme sequences with explainable feature costs, and exposes
orthographic, syllabic, and phonetic scores. It is a candidate-ranking aid,
not a validated model of any individual Filipino speaker.
"""

from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass
from functools import lru_cache


VOWELS = frozenset("aeiou")
FILLER_PHONEMES = frozenset({"a", "i", "u", "h", "ʔ"})
SIMILAR_PHONEMES = {
    frozenset(("f", "p")): 0.18,
    frozenset(("v", "b")): 0.18,
    frozenset(("z", "s")): 0.20,
    frozenset(("ʃ", "s")): 0.22,
    frozenset(("θ", "t")): 0.22,
    frozenset(("dʒ", "g")): 0.25,
    frozenset(("dʒ", "j")): 0.18,
    frozenset(("k", "g")): 0.40,
    frozenset(("ɾ", "d")): 0.38,
    frozenset(("ɾ", "r")): 0.05,
    frozenset(("e", "i")): 0.28,
    frozenset(("o", "u")): 0.28,
    frozenset(("a", "e")): 0.48,
    frozenset(("a", "o")): 0.52,
}


@dataclass(frozen=True)
class PronunciationPath:
    label: str
    spelling: str
    syllables: tuple[str, ...]
    phonemes: tuple[str, ...]
    stress_index: int


@dataclass(frozen=True)
class PronunciationProfile:
    source_name: str
    paths: tuple[PronunciationPath, ...]


def normalize_name(value: str) -> str:
    text = unicodedata.normalize("NFKD", value or "").casefold()
    text = "".join(character for character in text if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9]+", "", text)


def nativize(value: str, merge_vowels: bool = False) -> str:
    text = normalize_name(value)
    for source, target in (
        ("tion", "syon"),
        ("sion", "syon"),
        ("ture", "tyur"),
        ("ph", "p"),
        ("th", "t"),
        ("sh", "s"),
        ("ch", "ts"),
        ("qu", "kw"),
        ("x", "ks"),
        ("f", "p"),
        ("v", "b"),
        ("z", "s"),
        ("j", "dy"),
    ):
        text = text.replace(source, target)
    text = re.sub(r"c(?=[eiy])", "s", text)
    text = text.replace("c", "k").replace("q", "k")
    text = re.sub(r"g(?=[eiy])", "dy", text)
    if merge_vowels:
        text = text.replace("e", "i").replace("o", "u")
    return text


def speech_simplify(value: str) -> str:
    text = nativize(value, merge_vowels=True)
    text = re.sub(r"([aeiou])\1+", r"\1", text)
    text = re.sub(r"h(?=[aeiou])", "", text)
    text = text.replace("y", "i")
    return text


def syllabify(value: str) -> tuple[str, ...]:
    """Heuristically split a normalized word into Filipino-like syllables."""
    word = normalize_name(value)
    if not word:
        return ()
    nuclei = [index for index, character in enumerate(word) if character in VOWELS]
    if not nuclei:
        return (word,)
    boundaries = [0]
    for left, right in zip(nuclei, nuclei[1:]):
        consonants = right - left - 1
        if consonants <= 0:
            boundary = right
        elif consonants == 1:
            boundary = left + 1
        else:
            boundary = right - 1
        if boundary > boundaries[-1]:
            boundaries.append(boundary)
    boundaries.append(len(word))
    return tuple(
        word[start:end]
        for start, end in zip(boundaries, boundaries[1:])
        if word[start:end]
    )


def grapheme_to_phonemes(value: str) -> tuple[str, ...]:
    word = normalize_name(value)
    phonemes: list[str] = []
    index = 0
    multi = (
        ("dzh", "dʒ"),
        ("dy", "dʒ"),
        ("ng", "ŋ"),
        ("ts", "ts"),
        ("sy", "ʃ"),
        ("ty", "tj"),
        ("sh", "ʃ"),
        ("th", "θ"),
        ("ch", "tʃ"),
        ("ph", "f"),
    )
    mapping = {
        "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
        "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
        "a": "a", "e": "e", "i": "i", "o": "o", "u": "u",
        "b": "b", "c": "k", "d": "d", "f": "f", "g": "g",
        "h": "h", "j": "dʒ", "k": "k", "l": "l", "m": "m",
        "n": "n", "p": "p", "q": "k", "r": "ɾ", "s": "s",
        "t": "t", "v": "v", "w": "w", "x": "ks", "y": "j", "z": "z",
    }
    while index < len(word):
        matched = False
        for source, target in multi:
            if word.startswith(source, index):
                phonemes.append(target)
                index += len(source)
                matched = True
                break
        if matched:
            continue
        mapped = mapping.get(word[index])
        if mapped:
            phonemes.extend(("k", "s") if mapped == "ks" else (mapped,))
        index += 1
    return tuple(phonemes)


def _path(label: str, spelling: str, final_stress: bool = False) -> PronunciationPath:
    syllables = syllabify(spelling)
    stress_index = max(0, len(syllables) - (1 if final_stress else 2))
    return PronunciationPath(
        label=label,
        spelling=spelling,
        syllables=syllables,
        phonemes=grapheme_to_phonemes(spelling),
        stress_index=stress_index,
    )


@lru_cache(maxsize=65_536)
def pronunciation_profile(value: str) -> PronunciationProfile:
    original = normalize_name(value)
    filipino = nativize(value)
    merged = nativize(value, merge_vowels=True)
    simplified = speech_simplify(value)
    candidates = (
        ("published spelling", original, False),
        ("Filipino nativized", filipino, False),
        ("vowel-merged", merged, False),
        ("casual-speech", simplified, False),
        ("final-stress variant", filipino, True),
    )
    paths: list[PronunciationPath] = []
    seen: set[tuple[str, int]] = set()
    for label, spelling, final_stress in candidates:
        path = _path(label, spelling, final_stress)
        key = (path.spelling, path.stress_index)
        if path.phonemes and key not in seen:
            paths.append(path)
            seen.add(key)
    return PronunciationProfile(value, tuple(paths))


def bigram_dice(first: str, second: str) -> float:
    def bigrams(value: str) -> list[str]:
        normalized = normalize_name(value)
        return [normalized[index : index + 2] for index in range(len(normalized) - 1)]

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


def _substitution_cost(first: str, second: str) -> float:
    if first == second:
        return 0.0
    return SIMILAR_PHONEMES.get(frozenset((first, second)), 1.0)


def weighted_phoneme_similarity(
    first: tuple[str, ...], second: tuple[str, ...]
) -> float:
    if not first or not second:
        return 0.0
    previous = [0.0]
    for phoneme in second:
        previous.append(previous[-1] + (0.38 if phoneme in FILLER_PHONEMES else 0.78))
    for left in first:
        insertion = 0.38 if left in FILLER_PHONEMES else 0.78
        current = [previous[0] + insertion]
        for index, right in enumerate(second, start=1):
            deletion = 0.38 if right in FILLER_PHONEMES else 0.78
            current.append(
                min(
                    previous[index] + insertion,
                    current[index - 1] + deletion,
                    previous[index - 1] + _substitution_cost(left, right),
                )
            )
        previous = current
    maximum = max(len(first), len(second))
    return max(0.0, 1.0 - previous[-1] / maximum)


def syllable_similarity(first: tuple[str, ...], second: tuple[str, ...]) -> float:
    if not first or not second:
        return 0.0
    previous = list(range(len(second) + 1))
    for left_index, left in enumerate(first, start=1):
        current = [left_index]
        for right_index, right in enumerate(second, start=1):
            phonetic = weighted_phoneme_similarity(
                grapheme_to_phonemes(left), grapheme_to_phonemes(right)
            )
            current.append(
                min(
                    previous[right_index] + 1,
                    current[right_index - 1] + 1,
                    previous[right_index - 1] + (1 - phonetic),
                )
            )
        previous = current
    return max(0.0, 1.0 - previous[-1] / max(len(first), len(second)))


def stress_similarity(first: PronunciationPath, second: PronunciationPath) -> float:
    if len(first.syllables) <= 1 or len(second.syllables) <= 1:
        return 1.0
    relative_first = first.stress_index / (len(first.syllables) - 1)
    relative_second = second.stress_index / (len(second.syllables) - 1)
    return max(0.0, 1.0 - abs(relative_first - relative_second))


@lru_cache(maxsize=32_768)
def pronunciation_features(first_name: str, second_name: str) -> dict[str, object]:
    first_profile = pronunciation_profile(first_name)
    second_profile = pronunciation_profile(second_name)
    # Phoneme alignment is the inexpensive first pass. Syllable alignment is
    # calculated only for the three strongest path combinations.
    path_pairs: list[
        tuple[float, PronunciationPath, PronunciationPath, float]
    ] = []
    for first in first_profile.paths:
        for second in second_profile.paths:
            phonetic = weighted_phoneme_similarity(first.phonemes, second.phonemes)
            initial = 0.90 * phonetic + 0.10 * stress_similarity(first, second)
            path_pairs.append((initial, first, second, phonetic))
    path_pairs.sort(key=lambda item: item[0], reverse=True)

    best: tuple[float, PronunciationPath, PronunciationPath, float, float] | None = None
    for _, first, second, phonetic in path_pairs[:3]:
        syllables = syllable_similarity(first.syllables, second.syllables)
        stress = stress_similarity(first, second)
        combined = 0.58 * phonetic + 0.32 * syllables + 0.10 * stress
        if best is None or combined > best[0]:
            best = (combined, first, second, phonetic, syllables)
    assert best is not None
    combined, first_path, second_path, phonetic, syllables = best
    orthographic = bigram_dice(first_name, second_name)
    ensemble = (
        0.42 * combined
        + 0.23 * phonetic
        + 0.15 * syllables
        + 0.12 * orthographic
        + 0.08 * stress_similarity(first_path, second_path)
    )
    return {
        "pronunciation_lattice_similarity": round(combined, 6),
        "weighted_phoneme_similarity": round(phonetic, 6),
        "syllable_similarity": round(syllables, 6),
        "stress_similarity": round(stress_similarity(first_path, second_path), 6),
        "orthographic_bigram_similarity": round(orthographic, 6),
        "experimental_ensemble_score": round(ensemble, 6),
        "pronunciation_path_a": first_path.spelling,
        "pronunciation_path_b": second_path.spelling,
        "pronunciation_path_label_a": first_path.label,
        "pronunciation_path_label_b": second_path.label,
    }
