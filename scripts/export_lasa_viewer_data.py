#!/usr/bin/env python3
"""Export compact JSON used by the local LASA review dashboard."""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path

from filipino_phonetics import (
    normalize_name,
    pronunciation_input_is_bounded,
    pronunciation_model_metadata,
    pronunciation_profile,
)


ROOT = Path(__file__).resolve().parent.parent
LASA_DIR = ROOT / "data" / "lasa"
CANONICAL_DIR = ROOT / "data" / "canonical"
LEAFLET_DIR = ROOT / "data" / "ph_fda" / "leaflet_extraction"
OUTPUT_DIR = ROOT / "viewer" / "data"
VIEWER_PATH_DETAIL_LIMIT = 8


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as source:
        return list(csv.DictReader(source))


def looks_like_ingredient_list(value: str) -> bool:
    return bool(
        re.search(
            r"(\+|/|\b(?:hydrochloride|hydrobromide|sodium|calcium|"
            r"besilate|besylate|sulfate|acetate)\b)",
            value or "",
            re.IGNORECASE,
        )
    )


def source_anomaly_name_ids(products: list[dict[str, str]]) -> set[str]:
    anomalies: set[str] = set()
    for product in products:
        brand = product["brand_name_raw"]
        generic = product["generic_name_raw"]
        if (
            product["brand_id"]
            and brand
            and generic
            and looks_like_ingredient_list(brand)
            and not looks_like_ingredient_list(generic)
        ):
            anomalies.add(f"BRAND:{product['brand_id']}")
    return anomalies


def number_or_none(value: str | None) -> float | None:
    """Read optional CSV metrics without inventing a value for unknown stress."""
    if value is None or not str(value).strip():
        return None
    return float(value)


def display_path_label(value: str) -> str:
    """Keep legacy labels accurate when exporting an older candidate file."""
    return value.replace("Filipino", "Legacy Filipino/Philippine")


def rule_ids(value: str | None) -> list[str]:
    """Keep selected rule IDs as structured JSON after their CSV round trip."""
    if not value:
        return []
    return list(
        dict.fromkeys(
            item.strip() for item in str(value).split("|") if item.strip()
        )
    )


def compact_candidate(
    row: dict[str, str], anomaly_name_ids: set[str]
) -> dict[str, object]:
    has_source_anomaly = bool(
        {row["name_a_id"], row["name_b_id"]}.intersection(anomaly_name_ids)
    )
    return {
        "id": row["candidate_id"],
        "aid": row["name_a_id"],
        "a": row["name_a"],
        "at": row["name_a_type"],
        "bid": row["name_b_id"],
        "b": row["name_b"],
        "bt": row["name_b_type"],
        "mode": row["comparison_mode"],
        "priority": row["algorithmic_priority"],
        "jw": float(row["jaro_winkler"]),
        "edit": float(row["edit_similarity"]),
        "distance": int(row["levenshtein_distance"]),
        "soundex": float(row["soundex_similarity"]),
        "legacyFilipino": float(
            row.get("legacy_filipino_jaro_winkler")
            or row["filipino_jaro_winkler"]
        ),
        # ``lattice`` remains the screen's display key, but now contains the
        # cost-weighted score.  The raw best-path value is retained for audit.
        "lattice": float(
            row.get("weighted_lattice_similarity")
            or row["pronunciation_lattice_similarity"]
        ),
        "rawLattice": float(
            row.get("raw_pronunciation_lattice_similarity")
            or row["pronunciation_lattice_similarity"]
        ),
        "phoneme": float(row["weighted_phoneme_similarity"]),
        "syllable": float(row["syllable_similarity"]),
        "stress": number_or_none(row.get("stress_similarity")),
        "bigram": float(row["orthographic_bigram_similarity"]),
        "ensemble": float(row["experimental_ensemble_score"]),
        "numberPenalty": float(row["numeric_distinction_penalty"]),
        # A review-queue row must say whether its selected paths came from a
        # completed lattice comparison.  Blank paths alone are ambiguous:
        # they can mean an intentional complex-name boundary, a deferred
        # first-pass score, or a stale export.
        "pronunciationProfileStatus": (
            row.get("pronunciation_profile_status") or "not_exported"
        ),
        "pathA": row["pronunciation_path_a"],
        "pathB": row["pronunciation_path_b"],
        "pathLabelA": display_path_label(row["pronunciation_path_label_a"]),
        "pathLabelB": display_path_label(row["pronunciation_path_label_b"]),
        "pathRouteA": row.get("pronunciation_path_route_a", ""),
        "pathRouteB": row.get("pronunciation_path_route_b", ""),
        "pathEvidenceA": row.get("pronunciation_path_evidence_a", ""),
        "pathEvidenceB": row.get("pronunciation_path_evidence_b", ""),
        "pathSourceA": row.get("pronunciation_path_source_a", ""),
        "pathSourceB": row.get("pronunciation_path_source_b", ""),
        "pathCostA": number_or_none(row.get("pronunciation_path_cost_a")),
        "pathCostB": number_or_none(row.get("pronunciation_path_cost_b")),
        "pathCoverageA": number_or_none(
            row.get("pronunciation_path_coverage_a")
        ),
        "pathCoverageB": number_or_none(
            row.get("pronunciation_path_coverage_b")
        ),
        "pathRuleIdsA": rule_ids(row.get("pronunciation_path_rule_ids_a")),
        "pathRuleIdsB": rule_ids(row.get("pronunciation_path_rule_ids_b")),
        "pathIpaA": row.get("pronunciation_path_ipa_a", ""),
        "pathIpaB": row.get("pronunciation_path_ipa_b", ""),
        "reasons": row["candidate_reasons"].split("|"),
        "classification": (
            "spelling_variant_or_probable_typo"
            if has_source_anomaly
            else row["review_classification"]
        ),
        "classificationBasis": (
            "possible published brand/generic field inversion; source verification required"
            if has_source_anomaly
            else row["classification_basis"]
        ),
        "status": row["verification_status"],
        "rank": float(row.get("review_rank_score") or 0),
    }


def compact_product(
    row: dict[str, str], leaflet_counts: dict[str, int]
) -> dict[str, object]:
    registration = row["registration_number"]
    return {
        "r": registration,
        "gi": f"GENERIC:{row['formulation_id']}",
        "bi": f"BRAND:{row['brand_id']}" if row["brand_id"] else "",
        "b": row["brand_name_raw"],
        "g": row["generic_name_raw"],
        "s": row["dosage_strength_raw"],
        "f": row["dosage_form_raw"],
        "c": row["classification_raw"],
        "p": row["pharmacologic_category_raw"],
        "m": row["manufacturer_raw"],
        "o": row["country_of_origin_raw"],
        "i": row["issuance_date_raw"],
        "x": row["expiry_date_raw"],
        "k": row["packaging_raw"],
        "t": row["trader_raw"],
        "m2": row["importer_raw"],
        "d": row["distributor_raw"],
        "a": row["application_type_raw"],
        "l": leaflet_counts.get(registration, 0),
        "u": "https://verification.fda.gov.ph/",
    }


def compact_leaflets(
    rows: list[dict[str, str]],
) -> dict[str, list[dict[str, object]]]:
    by_registration: dict[str, list[dict[str, object]]] = {}
    seen_hashes: dict[str, set[str]] = {}
    for row in rows:
        registration = row["registration_number"]
        pdf_hash = row["pdf_sha256"]
        if not registration or not pdf_hash:
            continue
        registration_hashes = seen_hashes.setdefault(registration, set())
        if pdf_hash in registration_hashes:
            continue
        registration_hashes.add(pdf_hash)
        by_registration.setdefault(registration, []).append(
            {
                "description": row["description_extracted"],
                "indications": row["indications_extracted"],
                "description_heading": row["description_heading"],
                "indications_heading": row["indications_heading"],
                "category": row["document_category"],
                "version": row["document_version"],
                "url": row["file_url"],
                "method": row["extraction_method"],
                "confidence": row["extraction_confidence"],
                "review_status": row["review_status"],
            }
        )
    return by_registration


def compact_variant(row: dict[str, str]) -> dict[str, object]:
    return {
        "id": row["candidate_id"],
        "a": row["name_a"],
        "b": row["name_b"],
        "jw": float(row["jaro_winkler"]),
        "distance": int(row["levenshtein_distance"]),
        "reasons": row["candidate_reasons"].split("|"),
        "classification": row["review_classification"],
        "classificationBasis": row["classification_basis"],
        "status": row["verification_status"],
    }


def compact_normalization_duplicate(row: dict[str, str]) -> dict[str, object]:
    return {
        "canonicalId": row["canonical_name_id"],
        "canonical": row["canonical_name"],
        "aliasId": row["alias_name_id"],
        "alias": row["alias_name"],
        "type": row["name_type"],
        "key": row["normalization_key"],
        "classification": row["review_classification"],
        "classificationBasis": row["classification_basis"],
        "status": row["verification_status"],
    }


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    temporary.write_text(
        json.dumps(value, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    temporary.replace(path)


def write_javascript_data(path: Path, variable: str, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    temporary.write_text(
        f"globalThis.{variable}="
        + json.dumps(value, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    temporary.replace(path)


def compact_pronunciation_paths(
    value: str,
) -> tuple[list[str], dict[str, object]]:
    """Serialize the batch engine's actual paths for catalog names.

    The viewer may still make lightweight paths for free text, but it must not
    re-label those browser heuristics as the authoritative batch pronunciation
    analysis for a registered catalog name.
    """
    all_paths = pronunciation_profile(value).paths
    # Long multi-ingredient strings are intentionally left out of the
    # pronunciation lattice.  Export that decision so the viewer never turns
    # a deliberate batch boundary into an indistinguishable browser fallback.
    if all_paths:
        profile_status = "profiled"
    elif not pronunciation_input_is_bounded(value):
        profile_status = "not_profiled_complex_name"
    else:
        profile_status = "not_profiled_no_supported_paths"
    visible_paths = all_paths[:VIEWER_PATH_DETAIL_LIMIT]
    details = [
        {
            "display": path.spelling,
            "ipa": list(path.phonemes),
            "syllables": list(path.syllables),
            "stress": path.stress_index,
            "label": path.label,
            "route": path.route,
            "evidence": path.evidence,
            "source": path.source,
            "cost": path.cost,
            "confidence": path.confidence,
            "coverage": path.coverage,
            "rules": list(path.rule_ids),
            "availability": path.availability,
            "error": path.error,
        }
        for path in visible_paths
    ]
    return (
        list(dict.fromkeys(path["display"] for path in details if path["display"])),
        {
            "profile_status": profile_status,
            "paths": details,
            "total_path_count": len(all_paths),
            "truncated": len(all_paths) > len(visible_paths),
        },
    )


def compact_cebuano_tools(
    products: list[dict[str, object]],
    candidates: list[dict[str, object]],
    generated_at: str,
    pronunciation_model: dict[str, object],
) -> tuple[dict[str, object], dict[str, object]]:
    names_by_id: dict[str, tuple[str, str]] = {}
    for product in products:
        for identifier, name, name_type in (
            (str(product["bi"]), str(product["b"]), "brand"),
            (str(product["gi"]), str(product["g"]), "generic"),
        ):
            if identifier and name:
                names_by_id.setdefault(identifier, (name, name_type))
    for candidate in candidates:
        names_by_id.setdefault(
            str(candidate["aid"]), (str(candidate["a"]), str(candidate["at"]))
        )
        names_by_id.setdefault(
            str(candidate["bid"]), (str(candidate["b"]), str(candidate["bt"]))
        )

    ordered_names = sorted(
        names_by_id.items(),
        key=lambda item: (item[1][0].casefold(), item[1][1], item[0]),
    )
    name_positions = {
        identifier: index for index, (identifier, _) in enumerate(ordered_names)
    }
    names = []
    path_details = []
    dictionary_values: dict[str, list[str]] = {
        "labels": [],
        "routes": [],
        "evidence": [],
        "sources": [],
        "rules": [],
        "availability": [],
    }
    dictionary_positions: dict[str, dict[str, int]] = {
        key: {} for key in dictionary_values
    }

    def dictionary_ref(dictionary: str, value: str) -> int:
        positions = dictionary_positions[dictionary]
        if value not in positions:
            positions[value] = len(dictionary_values[dictionary])
            dictionary_values[dictionary].append(value)
        return positions[value]

    def encode_path(path: dict[str, object]) -> list[object]:
        return [
            path["display"],
            " ".join(str(item) for item in path["ipa"]),
            "-".join(str(item) for item in path["syllables"]),
            path["stress"],
            dictionary_ref("labels", str(path["label"])),
            dictionary_ref("routes", str(path["route"])),
            dictionary_ref("evidence", str(path["evidence"])),
            dictionary_ref("sources", str(path["source"])),
            path["cost"],
            path["confidence"],
            path["coverage"],
            [dictionary_ref("rules", str(rule)) for rule in path["rules"]],
            dictionary_ref("availability", str(path["availability"])),
            path["error"],
        ]

    for identifier, (name, name_type) in ordered_names:
        paths, details = compact_pronunciation_paths(name)
        names.append([
            identifier,
            name,
            name_type,
            normalize_name(name),
            paths,
            details["profile_status"],
        ])
        path_details.append([
            identifier,
            details["profile_status"],
            details["total_path_count"],
            details["truncated"],
            [encode_path(path) for path in details["paths"]],
        ])
    pairs = [
        [
            name_positions[str(candidate["aid"])],
            name_positions[str(candidate["bid"])],
            candidate["jw"],
            candidate["lattice"],
            candidate["rawLattice"],
            candidate["edit"],
            candidate["syllable"],
            candidate["rank"],
            candidate["priority"],
        ]
        for candidate in candidates
        if str(candidate["aid"]) in name_positions
        and str(candidate["bid"]) in name_positions
    ]
    tools = {
        "generated_at": generated_at,
        "pronunciation_model": pronunciation_model,
        "name_columns": [
            "id",
            "name",
            "type",
            "normalized",
            "paths",
            "profile_status",
        ],
        "pair_columns": [
            "name_a_index",
            "name_b_index",
            "looks_alike",
            "weighted_sounds_alike",
            "raw_best_sounds_alike",
            "edit_similarity",
            "syllable_similarity",
            "rank_score",
            "priority",
        ],
        "names": names,
        "pairs": pairs,
    }
    details = {
        "generated_at": generated_at,
        "pronunciation_model": pronunciation_model,
        "path_detail_limit": VIEWER_PATH_DETAIL_LIMIT,
        "format": "dictionary_columnar_v1",
        "name_columns": [
            "id",
            "profile_status",
            "total_path_count",
            "truncated",
            "paths",
        ],
        "path_columns": [
            "display",
            "ipa",
            "syllables",
            "stress",
            "label_ref",
            "route_ref",
            "evidence_ref",
            "source_ref",
            "cost",
            "confidence",
            "coverage",
            "rule_refs",
            "availability_ref",
            "error",
        ],
        "dictionaries": dictionary_values,
        "names": path_details,
    }
    return tools, details


def main() -> int:
    report = json.loads((LASA_DIR / "lasa_report.json").read_text(encoding="utf-8"))
    product_rows = read_csv(CANONICAL_DIR / "products.csv")
    anomaly_name_ids = source_anomaly_name_ids(product_rows)
    candidates = [
        compact_candidate(row, anomaly_name_ids)
        for row in read_csv(LASA_DIR / "lasa_review_queue.csv")
    ]
    variants = [
        compact_variant(row)
        for row in read_csv(LASA_DIR / "probable_source_spelling_variants.csv")
    ]
    normalization_duplicates = [
        compact_normalization_duplicate(row)
        for row in read_csv(LASA_DIR / "normalization_duplicates.csv")
    ]
    leaflet_rows = read_csv(LEAFLET_DIR / "ph_fda_leaflet_sections.csv")
    leaflets = compact_leaflets(leaflet_rows)
    products = [
        compact_product(row, {registration: len(records) for registration, records in leaflets.items()})
        for row in product_rows
    ]
    summary = {
        "generated_at": report["generated_at"],
        "indexed_names": report["name_count"],
        "generic_names": report["generic_name_count"],
        "brand_names": report["brand_name_count"],
        "screening_candidates": report["algorithmic_candidate_count"],
        "review_candidates": len(candidates),
        "source_variants": len(variants),
        "normalization_duplicates": len(normalization_duplicates),
        "product_records": len(products),
        "clinical_status": report["clinical_status"],
        "pronunciation_model": report.get(
            "pronunciation_model", pronunciation_model_metadata()
        ),
    }
    write_json(OUTPUT_DIR / "summary.json", summary)
    write_json(OUTPUT_DIR / "review_queue.json", candidates)
    write_json(OUTPUT_DIR / "source_variants.json", variants)
    write_json(
        OUTPUT_DIR / "normalization_duplicates.json",
        normalization_duplicates,
    )
    write_json(OUTPUT_DIR / "product_records.json", products)
    write_json(OUTPUT_DIR / "leaflet_records.json", leaflets)
    write_javascript_data(
        OUTPUT_DIR / "product_records.js",
        "PRODUCT_RECORDS",
        products,
    )
    write_javascript_data(
        OUTPUT_DIR / "leaflet_records.js",
        "LEAFLET_RECORDS",
        leaflets,
    )
    cebuano_tools, cebuano_path_details = compact_cebuano_tools(
        products,
        candidates,
        report["generated_at"],
        summary["pronunciation_model"],
    )
    write_json(OUTPUT_DIR / "cebuano_tools.json", cebuano_tools)
    write_json(OUTPUT_DIR / "cebuano_path_details.json", cebuano_path_details)
    write_json(
        OUTPUT_DIR / "cebuano_name_paths.json",
        {
            "generated_at": report["generated_at"],
            "pronunciation_model": summary["pronunciation_model"],
            "name_columns": ["type", "normalized", "paths", "profile_status"],
            "names": [
                [name_type, normalized, paths, profile_status]
                for _, _, name_type, normalized, paths, profile_status
                in cebuano_tools["names"]
            ],
        },
    )
    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
