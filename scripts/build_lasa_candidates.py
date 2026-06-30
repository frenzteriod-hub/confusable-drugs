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
import time
import unicodedata
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


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


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_name(value: str | None) -> str:
    text = unicodedata.normalize("NFKC", value or "").casefold()
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def compact_name(value: str) -> str:
    return normalize_name(value).replace(" ", "")


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
    """Create one experimental Filipino reading form for name comparison.

    The transform canonicalizes selected consonant and vowel pairs that may be
    read similarly. It never changes the published medicine name.
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


def length_bucket(value: str) -> int:
    return len(value) // 3


def blocking_keys(entry: NameEntry) -> set[tuple[str, str, int | str]]:
    standard = compact_name(entry.normalized_name)
    filipino = filipino_transform(entry.normalized_name)
    keys: set[tuple[str, str, int | str]] = set()
    for label, value in (("std", standard), ("fil", filipino)):
        if len(value) >= 2:
            keys.add((f"{label}_prefix2_len", value[:2], length_bucket(value)))
        if len(value) >= 3:
            keys.add((f"{label}_prefix3", value[:3], ""))
            keys.add((f"{label}_suffix3_len", value[-3:], length_bucket(value)))
        keys.add((f"{label}_soundex", soundex(value), ""))
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
    first_compact = compact_name(first.normalized_name)
    second_compact = compact_name(second.normalized_name)
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
    first_soundex = soundex(first_compact)
    second_soundex = soundex(second_compact)
    soundex_score = code_similarity(first_soundex, second_soundex)

    reasons: list[str] = []
    if standard_jw >= standard_threshold:
        reasons.append("jaro_winkler")
    if standard_jw >= 0.74 and soundex_score >= 0.75:
        reasons.append("orthographic_phonetic_agreement")
    if first_soundex == second_soundex and standard_jw >= 0.70:
        reasons.append("soundex_exact")

    filipino_first = filipino_transform(first_compact)
    filipino_second = filipino_transform(second_compact)
    filipino_jw = jaro_winkler(filipino_first, filipino_second)
    if filipino_jw >= filipino_threshold and (
        filipino_jw >= standard_jw + 0.02 or standard_jw >= 0.75
    ):
        reasons.append("filipino_phonology_experimental")
    if not reasons:
        return None

    distance = levenshtein_distance(first_compact, second_compact)
    edit_similarity = 1 - distance / longer
    if edit_similarity >= 0.78:
        reasons.append("edit_similarity")

    if standard_jw >= 0.93 or (distance <= 2 and shorter >= 6):
        priority = "high"
    elif standard_jw >= 0.86 or filipino_jw >= 0.90:
        priority = "medium"
    else:
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
        "filipino_jaro_winkler": round(filipino_jw, 6),
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
            -float(row["jaro_winkler"]),
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
    candidates: list[dict[str, object]], maximum_per_name: int = 3
) -> list[dict[str, object]]:
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
                "review_rank_score": round(
                    max(
                        float(row["jaro_winkler"]),
                        float(row["edit_similarity"]),
                        float(row["filipino_jaro_winkler"]),
                    ),
                    6,
                ),
            }
        )
        per_name[first_id] += 1
        per_name[second_id] += 1
    return selected


def write_csv(path: Path, columns: list[str], rows: list[dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    with temporary.open("w", encoding="utf-8", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=columns, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    temporary.replace(path)


def write_sqlite(
    path: Path, entries: list[NameEntry], candidates: list[dict[str, object]]
) -> None:
    temporary = path.with_suffix(".sqlite.tmp")
    temporary.unlink(missing_ok=True)
    connection = sqlite3.connect(temporary)
    connection.executescript(
        """
        CREATE TABLE name_index (
            name_id TEXT PRIMARY KEY,
            name_type TEXT NOT NULL,
            display_name TEXT NOT NULL,
            normalized_name TEXT NOT NULL,
            formulation_ids TEXT NOT NULL
        );
        CREATE TABLE lasa_candidates (
            candidate_id TEXT PRIMARY KEY,
            name_a_id TEXT NOT NULL REFERENCES name_index(name_id),
            name_a_type TEXT NOT NULL,
            name_a TEXT NOT NULL,
            name_b_id TEXT NOT NULL REFERENCES name_index(name_id),
            name_b_type TEXT NOT NULL,
            name_b TEXT NOT NULL,
            comparison_mode TEXT NOT NULL,
            jaro_winkler REAL NOT NULL,
            levenshtein_distance INTEGER NOT NULL,
            edit_similarity REAL NOT NULL,
            soundex_a TEXT NOT NULL,
            soundex_b TEXT NOT NULL,
            soundex_similarity REAL NOT NULL,
            filipino_jaro_winkler REAL NOT NULL,
            candidate_reasons TEXT NOT NULL,
            algorithmic_priority TEXT NOT NULL,
            candidate_nature TEXT NOT NULL,
            review_classification TEXT NOT NULL,
            classification_basis TEXT NOT NULL,
            verification_status TEXT NOT NULL
        );
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
        columns = list(candidates[0])
        connection.executemany(
            f"INSERT INTO lasa_candidates ({', '.join(columns)}) "
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
    parser.add_argument("--filipino-threshold", type=float, default=0.86)
    parser.add_argument("--maximum-block-size", type=int, default=500)
    parser.add_argument("--review-pairs-per-name", type=int, default=3)
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
    review_queue = build_review_queue(candidates, args.review_pairs_per_name)
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
        "probable_source_spelling_variant_count": len(source_variants),
        "normalization_duplicate_count": len(normalization_duplicates),
        "candidates_by_mode": dict(sorted(modes.items())),
        "candidates_by_priority": dict(sorted(priorities.items())),
        **generation_stats,
        "standard_threshold": args.standard_threshold,
        "filipino_threshold": args.filipino_threshold,
        "maximum_block_size": args.maximum_block_size,
        "review_pairs_per_name": args.review_pairs_per_name,
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
