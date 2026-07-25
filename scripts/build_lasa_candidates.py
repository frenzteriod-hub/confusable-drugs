#!/usr/bin/env python3
"""Generate reviewable PH LASA name candidates from the canonical database.

This is a candidate-generation system, not a clinical declaration. Every row
retains its comparison mode, component scores, reasons, and review status.
"""

from __future__ import annotations

import argparse
import csv
import json
import math
import re
import sqlite3
import sys
import time
import unicodedata
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path

from filipino_phonetics import (
    pronunciation_coarse_codes,
    pronunciation_feature_defaults,
    pronunciation_features,
    pronunciation_model_metadata,
    speech_simplify,
)


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_CANONICAL_DIR = PROJECT_ROOT / "data" / "canonical"
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "data" / "lasa"

SOUNDEX_MAP = {
    **dict.fromkeys("BFPV", "1"),
    **dict.fromkeys("CGJKQSXZ", "2"),
    **dict.fromkeys("DT", "3"),
    "L": "4",
    **dict.fromkeys("MN", "5"),
    "R": "6",
}


@dataclass(frozen=True)
class NameEntry:
    name_id: str
    name_type: str
    display_name: str
    normalized_name: str
    formulation_ids: frozenset[str]


@dataclass(frozen=True)
class NameComparisonFeatures:
    """Per-name values reused across millions of blocked comparisons."""

    compact: str
    filipino_baseline: str
    soundex: str
    speech_form: str
    coarse_ipa_codes: tuple[str, ...]
    numeric_values: tuple[str, ...]
    base_without_numbers: str


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_name(value: str | None) -> str:
    text = unicodedata.normalize("NFKC", value or "").casefold()
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def compact_name(value: str) -> str:
    return normalize_name(value).replace(" ", "")


def numeric_tokens(value: str) -> tuple[str, ...]:
    return tuple(re.findall(r"\d+(?:\.\d+)?", value))


def name_without_numbers(value: str) -> str:
    return re.sub(r"\d+(?:\.\d+)?", "", compact_name(value))


def normalization_duplicate_key(value: str) -> str:
    """Remove visual formatting while preserving pharmacologically meaningful separators."""
    text = unicodedata.normalize("NFKC", value or "").casefold()
    text = text.replace("®", "").replace("™", "").replace("©", "")
    return re.sub(r"[^a-z0-9+/]+", "", text)


def collapse_normalization_duplicates(
    entries: list[NameEntry],
) -> tuple[list[NameEntry], list[dict[str, object]]]:
    """Collapse same-type names that differ only by formatting or symbols."""
    groups: dict[tuple[str, str], list[NameEntry]] = defaultdict(list)
    for item in entries:
        groups[
            (item.name_type, normalization_duplicate_key(item.display_name))
        ].append(item)

    collapsed: list[NameEntry] = []
    duplicates: list[dict[str, object]] = []
    for (_, normalization_key), members in groups.items():
        if len(members) == 1:
            collapsed.append(members[0])
            continue

        representative = min(
            members,
            key=lambda item: (
                len(item.display_name) - len(normalization_key),
                len(item.display_name),
                item.display_name.casefold(),
            ),
        )
        collapsed.append(
            NameEntry(
                name_id=representative.name_id,
                name_type=representative.name_type,
                display_name=representative.display_name,
                normalized_name=representative.normalized_name,
                formulation_ids=frozenset().union(
                    *(item.formulation_ids for item in members)
                ),
            )
        )
        for alias in members:
            if alias.name_id == representative.name_id:
                continue
            duplicates.append(
                {
                    "canonical_name_id": representative.name_id,
                    "canonical_name": representative.display_name,
                    "alias_name_id": alias.name_id,
                    "alias_name": alias.display_name,
                    "name_type": representative.name_type,
                    "normalization_key": normalization_key,
                    "shared_formulation_ids": "|".join(
                        sorted(
                            representative.formulation_ids.intersection(
                                alias.formulation_ids
                            )
                        )
                    ),
                    "review_classification": "normalization_duplicate",
                    "classification_basis": (
                        "same entity type and name after removing visual formatting,"
                        " trademark symbols, spaces, hyphens, and capitalization;"
                        " pharmacologic + and / separators are preserved"
                    ),
                    "verification_status": "automatically_normalized_not_lasa",
                }
            )
    collapsed.sort(key=lambda item: (item.name_type, item.display_name.casefold()))
    duplicates.sort(
        key=lambda row: (
            str(row["canonical_name"]).casefold(),
            str(row["alias_name"]).casefold(),
        )
    )
    return collapsed, duplicates


def levenshtein_distance(first: str, second: str) -> int:
    if len(first) < len(second):
        first, second = second, first
    if not second:
        return len(first)
    previous = list(range(len(second) + 1))
    for index, first_character in enumerate(first, start=1):
        current = [index]
        for second_index, second_character in enumerate(second, start=1):
            current.append(
                min(
                    current[-1] + 1,
                    previous[second_index] + 1,
                    previous[second_index - 1] + (first_character != second_character),
                )
            )
        previous = current
    return previous[-1]


def jaro_similarity(first: str, second: str) -> float:
    if first == second:
        return 1.0
    if not first or not second:
        return 0.0
    match_distance = max(len(first), len(second)) // 2 - 1
    match_distance = max(0, match_distance)
    first_matches = [False] * len(first)
    second_matches = [False] * len(second)
    matches = 0

    for first_index, character in enumerate(first):
        start = max(0, first_index - match_distance)
        end = min(first_index + match_distance + 1, len(second))
        for second_index in range(start, end):
            if second_matches[second_index] or character != second[second_index]:
                continue
            first_matches[first_index] = True
            second_matches[second_index] = True
            matches += 1
            break
    if not matches:
        return 0.0

    first_sequence = [
        first[index] for index, matched in enumerate(first_matches) if matched
    ]
    second_sequence = [
        second[index] for index, matched in enumerate(second_matches) if matched
    ]
    transpositions = sum(
        first_character != second_character
        for first_character, second_character in zip(first_sequence, second_sequence)
    ) / 2
    return (
        matches / len(first)
        + matches / len(second)
        + (matches - transpositions) / matches
    ) / 3


def jaro_winkler(first: str, second: str) -> float:
    jaro = jaro_similarity(first, second)
    prefix = 0
    for first_character, second_character in zip(first, second):
        if first_character != second_character or prefix == 4:
            break
        prefix += 1
    return jaro + prefix * 0.1 * (1 - jaro)


def soundex(value: str) -> str:
    letters = re.sub(r"[^A-Z]", "", value.upper())
    if not letters:
        return "0000"
    first = letters[0]
    previous = SOUNDEX_MAP.get(first, "0")
    digits: list[str] = []
    for character in letters[1:]:
        code = SOUNDEX_MAP.get(character, "0")
        if code != "0" and code != previous:
            digits.append(code)
        if character not in "HW":
            previous = code
    return (first + "".join(digits) + "000")[:4]


def code_similarity(first: str, second: str) -> float:
    return sum(a == b for a, b in zip(first, second)) / 4


def filipino_transform(value: str) -> str:
    """Create one legacy Filipino/Philippine spelling baseline.

    The transform canonicalizes selected consonant and vowel pairs that may be
    read similarly. It never changes the published medicine name and is kept
    for backwards-compatible comparison only; it is not the Cebuano model.
    """
    transformed = compact_name(value)
    for source, target in (
        ("ph", "p"),
        ("th", "t"),
        ("sh", "s"),
        ("f", "p"),
        ("v", "b"),
        ("z", "s"),
        ("e", "i"),
        ("o", "u"),
    ):
        transformed = transformed.replace(source, target)
    return transformed


@lru_cache(maxsize=65_536)
def name_comparison_features(
    display_name: str, normalized_name: str
) -> NameComparisonFeatures:
    """Cache inexpensive transforms and IPA blocks for each indexed name."""
    standard = compact_name(normalized_name)
    return NameComparisonFeatures(
        compact=standard,
        filipino_baseline=filipino_transform(standard),
        soundex=soundex(standard),
        speech_form=speech_simplify(display_name),
        coarse_ipa_codes=pronunciation_coarse_codes(display_name),
        numeric_values=numeric_tokens(display_name),
        base_without_numbers=name_without_numbers(display_name),
    )


def length_bucket(value: str) -> int:
    return len(value) // 3


def blocking_keys(entry: NameEntry) -> set[tuple[str, str, int | str]]:
    features = name_comparison_features(entry.display_name, entry.normalized_name)
    standard = features.compact
    filipino = features.filipino_baseline
    keys: set[tuple[str, str, int | str]] = set()
    for label, value in (("std", standard), ("fil", filipino)):
        if len(value) >= 2:
            keys.add((f"{label}_prefix2_len", value[:2], length_bucket(value)))
        if len(value) >= 3:
            keys.add((f"{label}_prefix3", value[:3], ""))
            keys.add((f"{label}_suffix3_len", value[-3:], length_bucket(value)))
        keys.add((f"{label}_soundex", soundex(value), ""))

    # IPA-derived keys make genuinely sound-alike spellings eligible for full
    # scoring even when their ordinary spellings land in different blocks.
    # They are intentionally coarse and only a first-pass recall mechanism;
    # the weighted pronunciation lattice remains the actual comparison.
    for code in features.coarse_ipa_codes:
        compact_code = code.replace("|", "")
        if len(compact_code) < 4:
            continue
        # Three-code-unit keys are specific enough to avoid giant phonetic
        # blocks while still grouping close pronunciations such as school and
        # eskul.  Very short codes retain a two-unit+length fallback.
        if len(compact_code) == 4:
            keys.add(("ipa_prefix2_len", compact_code[:2], length_bucket(compact_code)))
            keys.add(("ipa_suffix2_len", compact_code[-2:], length_bucket(compact_code)))
        else:
            keys.add(("ipa_prefix3_len", compact_code[:3], length_bucket(compact_code)))
            keys.add(("ipa_suffix3_len", compact_code[-3:], length_bucket(compact_code)))
    return keys


def comparison_mode(first: NameEntry, second: NameEntry) -> str:
    if first.name_type == second.name_type == "generic":
        return "generic_generic"
    if first.name_type == second.name_type == "brand":
        return "brand_brand"
    return "generic_brand"


def likely_same_combination_variant(first: NameEntry, second: NameEntry) -> bool:
    if first.name_type != "generic" or second.name_type != "generic":
        return False
    separators = ("+", "/")
    if not any(separator in first.display_name for separator in separators):
        return False
    if not any(separator in second.display_name for separator in separators):
        return False
    ignored = {
        "as",
        "usp",
        "bp",
        "vitamin",
        "vitamins",
        "hydrochloride",
        "hcl",
    }

    def tokens(value: str) -> set[str]:
        return {
            token
            for token in normalize_name(value).split()
            if token not in ignored and not token.isdigit() and len(token) > 1
        }

    first_tokens = tokens(first.display_name)
    second_tokens = tokens(second.display_name)
    if not first_tokens or not second_tokens:
        return False
    overlap = len(first_tokens.intersection(second_tokens))
    union = len(first_tokens.union(second_tokens))
    return overlap / union >= 0.86


def score_pair(
    first: NameEntry,
    second: NameEntry,
    standard_threshold: float,
    filipino_threshold: float,
) -> dict[str, object] | None:
    first_features = name_comparison_features(
        first.display_name, first.normalized_name
    )
    second_features = name_comparison_features(
        second.display_name, second.normalized_name
    )
    first_compact = first_features.compact
    second_compact = second_features.compact
    if not first_compact or not second_compact or first_compact == second_compact:
        return None
    if first.formulation_ids.intersection(second.formulation_ids):
        return None
    if likely_same_combination_variant(first, second):
        return None
    shorter = min(len(first_compact), len(second_compact))
    longer = max(len(first_compact), len(second_compact))
    if shorter < 4 or shorter / longer < 0.55:
        return None

    standard_jw = jaro_winkler(first_compact, second_compact)
    first_soundex = first_features.soundex
    second_soundex = second_features.soundex
    soundex_score = code_similarity(first_soundex, second_soundex)

    reasons: list[str] = []
    if standard_jw >= standard_threshold:
        reasons.append("jaro_winkler")
    if standard_jw >= 0.74 and soundex_score >= 0.75:
        reasons.append("orthographic_phonetic_agreement")
    if first_soundex == second_soundex and standard_jw >= 0.70:
        reasons.append("soundex_exact")

    filipino_first = first_features.filipino_baseline
    filipino_second = second_features.filipino_baseline
    filipino_jw = jaro_winkler(filipino_first, filipino_second)
    if filipino_jw >= filipino_threshold and (
        filipino_jw >= standard_jw + 0.02 or standard_jw >= 0.75
    ):
        reasons.append("filipino_phonology_experimental")

    # The full pronunciation lattice is intentionally expensive.  It is needed
    # during first-pass generation only when *none* of the inexpensive spelling
    # signals has recalled the pair.  Any pair already retained by Jaro-Winkler,
    # Soundex, or the clearly-labelled legacy baseline is enriched only after
    # review-queue selection.  This avoids an IPA-path cross-product for the
    # large number of routine orthographic candidates below the main threshold.
    # A no-reason pair must first share an exact coarse IPA shape; broad
    # prefix/suffix IPA blocks are recall blocks, not enough evidence by
    # themselves to justify a full path-pair comparison.
    speech_jw = jaro_winkler(first_features.speech_form, second_features.speech_form)
    needs_lattice_now = not reasons
    shared_coarse_ipa_codes: frozenset[str] | None = None
    if needs_lattice_now:
        shared_coarse_ipa_codes = frozenset(
            set(first_features.coarse_ipa_codes).intersection(
                second_features.coarse_ipa_codes
            )
        )
        if not shared_coarse_ipa_codes:
            return None

    # ``pronunciation_features`` is cached.  Both the first pass and review
    # enrichment adjust its ensemble for numeric distinctions, so always copy
    # the returned mapping before adding row-specific fields.
    advanced = (
        dict(pronunciation_features(first.display_name, second.display_name))
        if needs_lattice_now
        else pronunciation_feature_defaults(
            first.display_name, second.display_name, "not_scored_first_pass"
        )
    )
    lattice_score = float(advanced["weighted_lattice_similarity"])
    # ``raw_best_lattice_similarity`` is intentionally audit-only: it records
    # the best raw match in the retained path-pair beam, even where that match
    # is too speculative to be the cost-adjusted winner.  The older
    # ``pronunciation_lattice_similarity`` field remains the raw value of the
    # selected, cost-aware path pair.
    raw_lattice_score = float(advanced["raw_best_lattice_similarity"])
    raw_ensemble_score = float(advanced["experimental_ensemble_score"])

    phonetic_candidate = lattice_score >= 0.84 or (
        lattice_score >= 0.80
        and (lattice_score >= standard_jw + 0.04 or speech_jw >= 0.72)
    )
    if needs_lattice_now and not phonetic_candidate:
        return None
    first_numbers = first_features.numeric_values
    second_numbers = second_features.numeric_values
    first_base = first_features.base_without_numbers
    second_base = second_features.base_without_numbers
    base_similarity = (
        jaro_winkler(first_base, second_base)
        if first_base and second_base
        else 0.0
    )
    number_penalty = 0.0
    if (
        first_numbers != second_numbers
        and (first_numbers or second_numbers)
        and base_similarity >= 0.94
    ):
        number_penalty = 0.18 if first_base == second_base else 0.10
    ensemble_score = max(0.0, raw_ensemble_score - number_penalty)
    advanced["experimental_ensemble_score"] = round(ensemble_score, 6)
    advanced["numeric_distinction_penalty"] = round(number_penalty, 6)
    if needs_lattice_now and phonetic_candidate:
        reasons.append("pronunciation_lattice_weighted")
    if needs_lattice_now and ensemble_score >= 0.80 and standard_jw >= 0.70:
        reasons.append("experimental_multifeature_ensemble")
    if number_penalty:
        reasons.append("numeric_strength_or_version_distinction")
    if not reasons:
        return None

    distance = levenshtein_distance(first_compact, second_compact)
    edit_similarity = 1 - distance / longer
    if edit_similarity >= 0.78:
        reasons.append("edit_similarity")

    if standard_jw >= 0.93 or (distance <= 2 and shorter >= 6):
        priority = "high"
    elif (
        standard_jw >= 0.86
        or filipino_jw >= 0.90
        or lattice_score >= 0.86
        or ensemble_score >= 0.86
    ):
        priority = "medium"
    else:
        priority = "screen"
    if number_penalty and base_similarity >= 0.98:
        priority = "screen"

    candidate_key = "|".join(sorted((first.name_id, second.name_id)))
    candidate_nature = (
        "probable_generic_spelling_variant"
        if comparison_mode(first, second) == "generic_generic"
        and distance <= 2
        and standard_jw >= 0.93
        else "potential_lasa"
    )
    review_classification = (
        "spelling_variant_or_probable_typo"
        if candidate_nature == "probable_generic_spelling_variant"
        else "potential_lasa_pair"
    )
    classification_basis = (
        "close generic-name spelling; source verification required"
        if review_classification == "spelling_variant_or_probable_typo"
        else "algorithmic name similarity only; confusion evidence not established"
    )
    # Persist this inexpensive exact-shape signal.  Screen-level candidates
    # with it form a small promotion pool: they are fully profiled before a
    # weak spelling score can exclude a genuinely close local reading.
    if shared_coarse_ipa_codes is None:
        shared_coarse_ipa_codes = frozenset(
            set(first_features.coarse_ipa_codes).intersection(
                second_features.coarse_ipa_codes
            )
        )
    return {
        "candidate_id": "LASA_" + __import__("hashlib").sha256(
            candidate_key.encode("utf-8")
        ).hexdigest()[:20],
        "name_a_id": first.name_id,
        "name_a_type": first.name_type,
        "name_a": first.display_name,
        "name_b_id": second.name_id,
        "name_b_type": second.name_type,
        "name_b": second.display_name,
        "comparison_mode": comparison_mode(first, second),
        "jaro_winkler": round(standard_jw, 6),
        "levenshtein_distance": distance,
        "edit_similarity": round(edit_similarity, 6),
        "soundex_a": first_soundex,
        "soundex_b": second_soundex,
        "soundex_similarity": round(soundex_score, 6),
        "speech_jaro_winkler": round(speech_jw, 6),
        # Retain the historical field for existing exports, while publishing
        # an explicit name for new integrations and documentation.
        "filipino_jaro_winkler": round(filipino_jw, 6),
        "legacy_filipino_jaro_winkler": round(filipino_jw, 6),
        "coarse_ipa_overlap": bool(shared_coarse_ipa_codes),
        "coarse_ipa_overlap_count": len(shared_coarse_ipa_codes),
        "raw_pronunciation_lattice_similarity": round(raw_lattice_score, 6),
        **advanced,
        "candidate_reasons": "|".join(sorted(set(reasons))),
        "algorithmic_priority": priority,
        "candidate_nature": candidate_nature,
        "review_classification": review_classification,
        "classification_basis": classification_basis,
        "verification_status": "unverified_requires_human_review",
    }


def load_name_entries(canonical_dir: Path) -> list[NameEntry]:
    entries: list[NameEntry] = []
    with (canonical_dir / "formulations.csv").open(encoding="utf-8", newline="") as source:
        for row in csv.DictReader(source):
            formulation_id = row["formulation_id"]
            entries.append(
                NameEntry(
                    name_id=f"GENERIC:{formulation_id}",
                    name_type="generic",
                    display_name=row["generic_name_display"],
                    normalized_name=row["generic_name_normalized"],
                    formulation_ids=frozenset({formulation_id}),
                )
            )

    brand_formulations: dict[str, set[str]] = defaultdict(set)
    with (canonical_dir / "brand_formulations.csv").open(
        encoding="utf-8", newline=""
    ) as source:
        for row in csv.DictReader(source):
            brand_formulations[row["brand_id"]].add(row["formulation_id"])
    with (canonical_dir / "brands.csv").open(encoding="utf-8", newline="") as source:
        for row in csv.DictReader(source):
            brand_id = row["brand_id"]
            entries.append(
                NameEntry(
                    name_id=f"BRAND:{brand_id}",
                    name_type="brand",
                    display_name=row["brand_name_display"],
                    normalized_name=row["brand_name_normalized"],
                    formulation_ids=frozenset(brand_formulations.get(brand_id, set())),
                )
            )
    return entries


def generate_candidates(
    entries: list[NameEntry],
    standard_threshold: float = 0.84,
    filipino_threshold: float = 0.86,
    maximum_block_size: int = 500,
) -> tuple[list[dict[str, object]], dict[str, int]]:
    blocks: dict[tuple[str, str, int | str], list[int]] = defaultdict(list)
    for index, entry in enumerate(entries):
        for key in blocking_keys(entry):
            blocks[key].append(index)

    seen_pairs: set[tuple[int, int]] = set()
    candidates: list[dict[str, object]] = []
    skipped_large_blocks = 0
    pair_count = 0
    for members in blocks.values():
        if len(members) < 2:
            continue
        if len(members) > maximum_block_size:
            skipped_large_blocks += 1
            continue
        for left_position, left_index in enumerate(members):
            for right_index in members[left_position + 1 :]:
                pair = (
                    (left_index, right_index)
                    if left_index < right_index
                    else (right_index, left_index)
                )
                if pair in seen_pairs:
                    continue
                seen_pairs.add(pair)
                pair_count += 1
                if pair_count % 250_000 == 0:
                    print(
                        f"Scored {pair_count:,} blocked pairs; "
                        f"retained {len(candidates):,} candidates…",
                        file=sys.stderr,
                        flush=True,
                    )
                scored = score_pair(
                    entries[pair[0]],
                    entries[pair[1]],
                    standard_threshold,
                    filipino_threshold,
                )
                if scored:
                    candidates.append(scored)
    candidates.sort(
        key=lambda row: (
            {"high": 0, "medium": 1, "screen": 2}[str(row["algorithmic_priority"])],
            -max(
                float(row["jaro_winkler"]),
                float(row.get("weighted_lattice_similarity", 0)),
            ),
            str(row["name_a"]).casefold(),
            str(row["name_b"]).casefold(),
        )
    )
    return candidates, {
        "blocking_keys": len(blocks),
        "unique_pairs_scored": pair_count,
        "large_blocks_skipped": skipped_large_blocks,
    }


def build_review_queue(
    candidates: list[dict[str, object]],
    maximum_per_name: int = 3,
    maximum_phonetic_promotions_per_name: int = 2,
    maximum_phonetic_promotions: int = 5_000,
) -> list[dict[str, object]]:
    """Select ordinary review rows plus a bounded-evidence phonetic pool.

    Most screen-level spelling candidates should not reach human review.  An
    exception is a pair that already shares an *exact* coarse IPA shape: its
    full costed lattice may materially change its rank (for example,
    ``model`` / ``madal``).  Those rows are enriched and must pass the full
    lattice gate before they survive the queue; numeric-version distinctions
    are never promoted this way.
    """
    eligible = [
        row
        for row in candidates
        if row["algorithmic_priority"] in {"high", "medium"}
        and row.get("candidate_nature", "potential_lasa") == "potential_lasa"
    ]
    eligible.sort(
        key=lambda row: (
            {"high": 0, "medium": 1}[str(row["algorithmic_priority"])],
            -max(
                float(row["jaro_winkler"]),
                float(row["edit_similarity"]),
                float(row["filipino_jaro_winkler"]),
                float(row.get("weighted_lattice_similarity", 0)),
                float(row.get("experimental_ensemble_score", 0)),
            ),
        )
    )
    selected: list[dict[str, object]] = []
    per_name: Counter[str] = Counter()
    for row in eligible:
        first_id = str(row["name_a_id"])
        second_id = str(row["name_b_id"])
        if per_name[first_id] >= maximum_per_name or per_name[second_id] >= maximum_per_name:
            continue
        selected.append(
            {
                **row,
                "initial_algorithmic_priority": row["algorithmic_priority"],
                "review_selection": "priority_recall",
                "review_rank_score": round(review_rank_score(row), 6),
            }
        )
        per_name[first_id] += 1
        per_name[second_id] += 1

    # Exact coarse-code agreement is deliberately much narrower than the
    # prefix/suffix IPA blocking keys.  On the canonical dataset it yields a
    # small, auditable screen-level pool rather than profiling every weak
    # spelling candidate.
    promotions = [
        row
        for row in candidates
        if row["algorithmic_priority"] == "screen"
        and row.get("candidate_nature", "potential_lasa") == "potential_lasa"
        and bool(row.get("coarse_ipa_overlap"))
        and not float(row.get("numeric_distinction_penalty", 0) or 0)
    ]
    promotions.sort(
        key=lambda row: (
            -float(row.get("speech_jaro_winkler", 0) or 0),
            -max(
                float(row["jaro_winkler"]),
                float(row["edit_similarity"]),
                float(row["filipino_jaro_winkler"]),
            ),
            str(row["name_a"]).casefold(),
            str(row["name_b"]).casefold(),
        )
    )
    promotion_per_name: Counter[str] = Counter()
    selected_promotions = 0
    for row in promotions:
        if selected_promotions >= maximum_phonetic_promotions:
            break
        first_id = str(row["name_a_id"])
        second_id = str(row["name_b_id"])
        if (
            promotion_per_name[first_id] >= maximum_phonetic_promotions_per_name
            or promotion_per_name[second_id] >= maximum_phonetic_promotions_per_name
        ):
            continue
        selected.append(
            {
                **row,
                "initial_algorithmic_priority": row["algorithmic_priority"],
                "review_selection": "phonetic_promotion",
                "review_rank_score": round(review_rank_score(row), 6),
            }
        )
        promotion_per_name[first_id] += 1
        promotion_per_name[second_id] += 1
        selected_promotions += 1
    return selected


def review_rank_score(row: dict[str, object]) -> float:
    """Return the transparent rank value used for review-queue ordering."""
    return max(
        float(row["jaro_winkler"]),
        float(row["edit_similarity"]),
        float(row["filipino_jaro_winkler"]),
        float(row.get("weighted_lattice_similarity", 0)),
        float(row.get("experimental_ensemble_score", 0)),
    )


def qualifies_for_phonetic_promotion(row: dict[str, object]) -> bool:
    """Require full, costed evidence before keeping a screen-level promotion."""
    if row.get("pronunciation_profile_status") != "profiled":
        return False
    if float(row.get("numeric_distinction_penalty", 0) or 0):
        return False
    lattice_score = float(row.get("weighted_lattice_similarity", 0) or 0)
    standard_jw = float(row["jaro_winkler"])
    speech_jw = float(row.get("speech_jaro_winkler", 0) or 0)
    return lattice_score >= 0.84 or (
        lattice_score >= 0.80
        and (lattice_score >= standard_jw + 0.04 or speech_jw >= 0.72)
    )


def enrich_review_queue(rows: list[dict[str, object]]) -> list[dict[str, object]]:
    """Attach full pronunciation evidence to the small, selected review set.

    Candidate generation deliberately defers the expensive IPA path-pair
    comparison for rows that were already recalled by spelling.  The exported
    review queue is the human-facing artifact, so each selected row is
    enriched here before it reaches the CSV and viewer.  A small exact-coarse-
    IPA screen pool is promoted only if its full score passes the same weighted
    lattice gate.  This is both more feasible on the canonical dataset and
    more honest than presenting a skipped first-pass lattice as a zero
    pronunciation score.
    """
    enriched_rows: list[dict[str, object]] = []
    total = len(rows)
    for index, row in enumerate(rows, start=1):
        advanced = dict(
            pronunciation_features(str(row["name_a"]), str(row["name_b"]))
        )
        number_penalty = float(row.get("numeric_distinction_penalty", 0) or 0)
        ensemble_score = max(
            0.0,
            float(advanced["experimental_ensemble_score"]) - number_penalty,
        )
        advanced["experimental_ensemble_score"] = round(ensemble_score, 6)
        advanced["numeric_distinction_penalty"] = round(number_penalty, 6)

        lattice_score = float(advanced["weighted_lattice_similarity"])
        standard_jw = float(row["jaro_winkler"])
        reasons = {
            reason
            for reason in str(row.get("candidate_reasons", "")).split("|")
            if reason
        }
        if lattice_score >= 0.84 or (
            lattice_score >= 0.80 and lattice_score >= standard_jw + 0.04
        ):
            reasons.add("pronunciation_lattice_weighted")
        if ensemble_score >= 0.80 and standard_jw >= 0.70:
            reasons.add("experimental_multifeature_ensemble")
        if number_penalty:
            reasons.add("numeric_strength_or_version_distinction")

        is_phonetic_promotion = (
            row.get("review_selection") == "phonetic_promotion"
        )
        if is_phonetic_promotion and not qualifies_for_phonetic_promotion(
            {**row, **advanced}
        ):
            continue
        if is_phonetic_promotion:
            reasons.add("phonetic_promotion_after_full_lattice")

        enriched = {
            **row,
            "raw_pronunciation_lattice_similarity": round(
                float(advanced["raw_best_lattice_similarity"]), 6
            ),
            **advanced,
            "candidate_reasons": "|".join(sorted(reasons)),
        }
        if is_phonetic_promotion:
            # The raw candidate ledger remains ``screen``.  The final review
            # queue records that full pronunciation evidence promoted it.
            enriched["algorithmic_priority"] = "medium"
        enriched["review_rank_score"] = round(review_rank_score(enriched), 6)
        enriched_rows.append(enriched)
        if index % 1_000 == 0 or index == total:
            print(
                f"Enriched {index:,}/{total:,} selected review pairs with pronunciation paths…",
                file=sys.stderr,
                flush=True,
            )
    enriched_rows.sort(
        key=lambda row: (
            {"high": 0, "medium": 1, "screen": 2}.get(
                str(row.get("algorithmic_priority")), 3
            ),
            -float(row["review_rank_score"]),
            str(row["name_a"]).casefold(),
            str(row["name_b"]).casefold(),
        )
    )
    return enriched_rows


def write_csv(path: Path, columns: list[str], rows: list[dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    with temporary.open("w", encoding="utf-8", newline="") as output:
        writer = csv.DictWriter(
            output,
            fieldnames=columns,
            extrasaction="ignore",
            lineterminator="\n",
        )
        writer.writeheader()
        writer.writerows(rows)
    temporary.replace(path)


def write_sqlite(
    path: Path, entries: list[NameEntry], candidates: list[dict[str, object]]
) -> None:
    """Write the review data without discarding optional provenance fields.

    Pronunciation outputs intentionally evolve as evidence routes and review
    metadata improve.  The old fixed schema made that unsafe: a missing stress
    value or a newly added route field could make an otherwise valid batch
    build fail.  Candidate columns are produced by this module, validated as
    SQL identifiers, and typed from their actual values instead.
    """

    def identifier(value: str) -> str:
        if not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", value):
            raise ValueError(f"Unsafe SQLite column name: {value!r}")
        return f'"{value}"'

    def column_type(column: str) -> str:
        # Preserve numeric affinity even when every row happens to have an
        # unknown value (for example, stress for Epitran-only paths).
        if column in {
            "jaro_winkler",
            "speech_jaro_winkler",
            "edit_similarity",
            "soundex_similarity",
            "filipino_jaro_winkler",
            "legacy_filipino_jaro_winkler",
            "raw_pronunciation_lattice_similarity",
            "pronunciation_lattice_similarity",
            "weighted_lattice_similarity",
            "raw_best_lattice_similarity",
            "weighted_phoneme_similarity",
            "syllable_similarity",
            "stress_similarity",
            "orthographic_bigram_similarity",
            "experimental_ensemble_score",
            "numeric_distinction_penalty",
            "pronunciation_path_cost_a",
            "pronunciation_path_cost_b",
            "pronunciation_path_coverage_a",
            "pronunciation_path_coverage_b",
            "review_rank_score",
        }:
            return "REAL"
        if column in {
            "levenshtein_distance",
            "coarse_ipa_overlap",
            "coarse_ipa_overlap_count",
        }:
            return "INTEGER"
        values = [row.get(column) for row in candidates if row.get(column) is not None]
        if not values:
            return "TEXT"
        if all(isinstance(value, int) and not isinstance(value, bool) for value in values):
            return "INTEGER"
        if all(isinstance(value, (bool, int, float)) for value in values):
            return "REAL"
        return "TEXT"

    temporary = path.with_suffix(".sqlite.tmp")
    temporary.unlink(missing_ok=True)
    connection = sqlite3.connect(temporary)
    connection.execute("PRAGMA foreign_keys = ON")
    connection.executescript(
        """
        CREATE TABLE name_index (
            name_id TEXT PRIMARY KEY,
            name_type TEXT NOT NULL,
            display_name TEXT NOT NULL,
            normalized_name TEXT NOT NULL,
            formulation_ids TEXT NOT NULL
        );
        """
    )

    columns = list(candidates[0]) if candidates else [
        "candidate_id",
        "name_a_id",
        "name_b_id",
        "comparison_mode",
        "algorithmic_priority",
    ]
    definitions: list[str] = []
    for column in columns:
        quoted = identifier(column)
        if column == "candidate_id":
            definitions.append(f"{quoted} TEXT PRIMARY KEY")
        elif column in {"name_a_id", "name_b_id"}:
            definitions.append(
                f"{quoted} TEXT NOT NULL REFERENCES name_index(name_id)"
            )
        else:
            definitions.append(f"{quoted} {column_type(column)}")
    connection.execute(
        "CREATE TABLE lasa_candidates (" + ", ".join(definitions) + ")"
    )
    connection.executescript(
        """
        CREATE INDEX lasa_name_a_idx ON lasa_candidates(name_a_id);
        CREATE INDEX lasa_name_b_idx ON lasa_candidates(name_b_id);
        CREATE INDEX lasa_mode_idx ON lasa_candidates(comparison_mode);
        CREATE INDEX lasa_priority_idx ON lasa_candidates(algorithmic_priority);
        """
    )
    connection.executemany(
        "INSERT INTO name_index VALUES (?, ?, ?, ?, ?)",
        [
            (
                entry.name_id,
                entry.name_type,
                entry.display_name,
                entry.normalized_name,
                "|".join(sorted(entry.formulation_ids)),
            )
            for entry in entries
        ],
    )
    if candidates:
        connection.executemany(
            f"INSERT INTO lasa_candidates ({', '.join(identifier(column) for column in columns)}) "
            f"VALUES ({', '.join('?' for _ in columns)})",
            [[row[column] for column in columns] for row in candidates],
        )
    connection.commit()
    errors = connection.execute("PRAGMA foreign_key_check").fetchall()
    if errors:
        raise RuntimeError(f"LASA SQLite foreign-key errors: {errors[:5]}")
    connection.close()
    temporary.replace(path)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--canonical-dir", type=Path, default=DEFAULT_CANONICAL_DIR)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--standard-threshold", type=float, default=0.84)
    parser.add_argument(
        "--filipino-threshold",
        "--legacy-filipino-threshold",
        dest="filipino_threshold",
        type=float,
        default=0.86,
        help=(
            "Threshold for the retained legacy Filipino/Philippine spelling "
            "baseline; it is not the Cebuano pronunciation model."
        ),
    )
    parser.add_argument("--maximum-block-size", type=int, default=500)
    parser.add_argument("--review-pairs-per-name", type=int, default=3)
    parser.add_argument(
        "--phonetic-promotion-pairs-per-name",
        type=int,
        default=2,
        help=(
            "Maximum additional exact-coarse-IPA screen rows selected per "
            "name before full pronunciation scoring."
        ),
    )
    parser.add_argument(
        "--maximum-phonetic-promotions",
        type=int,
        default=5_000,
        help=(
            "Global cap for exact-coarse-IPA screen rows selected for full "
            "pronunciation promotion."
        ),
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    started = time.monotonic()
    raw_entries = load_name_entries(args.canonical_dir.resolve())
    entries, normalization_duplicates = collapse_normalization_duplicates(raw_entries)
    candidates, generation_stats = generate_candidates(
        entries,
        standard_threshold=args.standard_threshold,
        filipino_threshold=args.filipino_threshold,
        maximum_block_size=args.maximum_block_size,
    )
    phonetic_promotion_eligible_count = sum(
        row["algorithmic_priority"] == "screen"
        and row.get("candidate_nature", "potential_lasa") == "potential_lasa"
        and bool(row.get("coarse_ipa_overlap"))
        and not float(row.get("numeric_distinction_penalty", 0) or 0)
        for row in candidates
    )
    selected_review_rows = build_review_queue(
        candidates,
        args.review_pairs_per_name,
        args.phonetic_promotion_pairs_per_name,
        args.maximum_phonetic_promotions,
    )
    phonetic_promotion_selected_count = sum(
        row.get("review_selection") == "phonetic_promotion"
        for row in selected_review_rows
    )
    review_queue = enrich_review_queue(selected_review_rows)
    phonetic_promotion_accepted_count = sum(
        row.get("review_selection") == "phonetic_promotion"
        for row in review_queue
    )
    source_variants = [
        row
        for row in candidates
        if row["candidate_nature"] == "probable_generic_spelling_variant"
    ]
    output_dir = args.output_dir.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    name_rows = [
        {
            "name_id": entry.name_id,
            "name_type": entry.name_type,
            "display_name": entry.display_name,
            "normalized_name": entry.normalized_name,
            "formulation_ids": "|".join(sorted(entry.formulation_ids)),
        }
        for entry in entries
    ]
    write_csv(output_dir / "name_index.csv", list(name_rows[0]), name_rows)
    candidate_columns = list(candidates[0]) if candidates else []
    write_csv(output_dir / "lasa_candidates.csv", candidate_columns, candidates)
    review_columns = list(review_queue[0]) if review_queue else []
    write_csv(output_dir / "lasa_review_queue.csv", review_columns, review_queue)
    source_variant_columns = list(source_variants[0]) if source_variants else []
    write_csv(
        output_dir / "probable_source_spelling_variants.csv",
        source_variant_columns,
        source_variants,
    )
    normalization_columns = (
        list(normalization_duplicates[0]) if normalization_duplicates else []
    )
    write_csv(
        output_dir / "normalization_duplicates.csv",
        normalization_columns,
        normalization_duplicates,
    )
    write_sqlite(output_dir / "ph_lasa.sqlite", entries, candidates)

    modes = Counter(str(row["comparison_mode"]) for row in candidates)
    priorities = Counter(str(row["algorithmic_priority"]) for row in candidates)
    report = {
        "generated_at": utc_now(),
        "name_count": len(entries),
        "source_name_count": len(raw_entries),
        "generic_name_count": sum(entry.name_type == "generic" for entry in entries),
        "brand_name_count": sum(entry.name_type == "brand" for entry in entries),
        "algorithmic_candidate_count": len(candidates),
        "ranked_review_queue_count": len(review_queue),
        "review_queue_pronunciation_enriched_count": len(review_queue),
        "phonetic_promotion_selected_count": phonetic_promotion_selected_count,
        "phonetic_promotion_accepted_count": phonetic_promotion_accepted_count,
        "phonetic_promotion_eligible_count": phonetic_promotion_eligible_count,
        "probable_source_spelling_variant_count": len(source_variants),
        "normalization_duplicate_count": len(normalization_duplicates),
        "candidates_by_mode": dict(sorted(modes.items())),
        "candidates_by_priority": dict(sorted(priorities.items())),
        **generation_stats,
        "standard_threshold": args.standard_threshold,
        "legacy_filipino_threshold": args.filipino_threshold,
        # Kept for software that already reads the first experimental field.
        "filipino_threshold": args.filipino_threshold,
        "pronunciation_model": pronunciation_model_metadata(),
        "maximum_block_size": args.maximum_block_size,
        "review_pairs_per_name": args.review_pairs_per_name,
        "phonetic_promotion_pairs_per_name": args.phonetic_promotion_pairs_per_name,
        "maximum_phonetic_promotions": args.maximum_phonetic_promotions,
        "pronunciation_scoring_strategy": (
            "first-pass IPA lattice for phonetic-only recall; full IPA evidence "
            "attached to selected review rows; exact coarse-IPA screen rows are "
            "retained only when their full weighted lattice score promotes them"
        ),
        "elapsed_seconds": round(time.monotonic() - started, 3),
        "clinical_status": (
            "potential_lasa_candidates_only; verified_lasa_and_false_positive"
            "_require_human_review"
        ),
    }
    (output_dir / "lasa_report.json").write_text(
        json.dumps(report, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
