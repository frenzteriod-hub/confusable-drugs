#!/usr/bin/env python3
"""Export compact JSON used by the local LASA review dashboard."""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
LASA_DIR = ROOT / "data" / "lasa"
CANONICAL_DIR = ROOT / "data" / "canonical"
OUTPUT_DIR = ROOT / "viewer" / "data"


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
        "filipino": float(row["filipino_jaro_winkler"]),
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


def compact_product(row: dict[str, str]) -> dict[str, object]:
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
        "u": "https://verification.fda.gov.ph/",
    }


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
    products = [
        compact_product(row)
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
    }
    write_json(OUTPUT_DIR / "summary.json", summary)
    write_json(OUTPUT_DIR / "review_queue.json", candidates)
    write_json(OUTPUT_DIR / "source_variants.json", variants)
    write_json(
        OUTPUT_DIR / "normalization_duplicates.json",
        normalization_duplicates,
    )
    write_json(OUTPUT_DIR / "product_records.json", products)
    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
