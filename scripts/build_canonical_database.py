#!/usr/bin/env python3
"""Build canonical PH FDA product/name tables without changing source facts."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import sqlite3
import unicodedata
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_INPUT = PROJECT_ROOT / "data" / "ph_fda" / "raw" / "ph_fda_products.csv"
DEFAULT_OUTPUT = PROJECT_ROOT / "data" / "canonical"
UNBRANDED_VALUES = {"", "-", "n/a", "na", "none", "unbranded", "generic product"}
EXPORT_MARKER = re.compile(r"^\s*\(\s*for\s+export\s+only\s*\)\s*", re.IGNORECASE)

SOURCE_FIELDS = [
    "source",
    "source_record_id",
    "registration_number",
    "generic_name",
    "brand_name",
    "dosage_strength",
    "dosage_form",
    "classification",
    "packaging",
    "pharmacologic_category",
    "manufacturer",
    "country_of_origin",
    "trader",
    "importer",
    "distributor",
    "app_type",
    "issuance_date",
    "expiry_date",
    "source_url",
    "retrieved_at",
    "source_query",
]


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_text(value: str | None) -> str:
    text = unicodedata.normalize("NFKC", value or "")
    return re.sub(r"\s+", " ", text).strip()


def normalize_name(value: str | None) -> str:
    return normalize_text(value).casefold()


def clean_generic_display(value: str) -> tuple[str, bool]:
    source = normalize_text(value)
    export_only = bool(EXPORT_MARKER.match(source))
    cleaned = EXPORT_MARKER.sub("", source)
    return cleaned, export_only


def stable_id(prefix: str, normalized_value: str) -> str:
    digest = hashlib.sha256(normalized_value.encode("utf-8")).hexdigest()[:20]
    return f"{prefix}_{digest}"


def split_ingredient_components(generic_name: str) -> tuple[list[str], str]:
    """Split only explicit + or / separators; ambiguous 'and' stays intact."""
    generic_name = normalize_text(generic_name)
    if "+" in generic_name:
        parts = [normalize_text(part) for part in generic_name.split("+")]
        method = "explicit_plus"
    elif "/" in generic_name:
        parts = [normalize_text(part) for part in generic_name.split("/")]
        method = "explicit_slash"
    else:
        parts = [generic_name]
        method = "single"
    parts = [part for part in parts if part]
    return parts or [generic_name], method


def read_products(input_path: Path) -> list[dict[str, str]]:
    with input_path.open(encoding="utf-8", newline="") as source:
        reader = csv.DictReader(source)
        missing = set(SOURCE_FIELDS).difference(reader.fieldnames or [])
        if missing:
            raise ValueError(f"Input is missing columns: {', '.join(sorted(missing))}")
        return list(reader)


def write_csv(path: Path, columns: list[str], rows: list[dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    with temporary.open("w", encoding="utf-8", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=columns, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    temporary.replace(path)


def atomic_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    temporary.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temporary.replace(path)


def build_tables(source_rows: list[dict[str, str]]) -> dict[str, list[dict[str, object]]]:
    products: list[dict[str, object]] = []
    formulations: dict[str, dict[str, object]] = {}
    brands: dict[str, dict[str, object]] = {}
    ingredients: dict[str, dict[str, object]] = {}
    formulation_ingredients: dict[tuple[str, str], dict[str, object]] = {}
    brand_formulations: dict[tuple[str, str], dict[str, object]] = {}
    ambiguous_and: list[dict[str, object]] = []
    registrations_seen: dict[str, str] = {}
    duplicate_registrations: list[dict[str, object]] = []

    for source in source_rows:
        registration = normalize_text(source["registration_number"])
        generic_display, export_only = clean_generic_display(source["generic_name"])
        generic_normalized = normalize_name(generic_display)
        if not registration or not generic_normalized:
            continue

        source_signature = json.dumps(
            {field: source.get(field, "") for field in SOURCE_FIELDS},
            sort_keys=True,
            ensure_ascii=False,
        )
        if registration in registrations_seen:
            duplicate_registrations.append(
                {
                    "registration_number": registration,
                    "reason": (
                        "exact_duplicate_registration"
                        if registrations_seen[registration] == source_signature
                        else "conflicting_duplicate_registration"
                    ),
                }
            )
            continue
        registrations_seen[registration] = source_signature

        formulation_id = stable_id("FORM", generic_normalized)
        if formulation_id not in formulations:
            components, split_method = split_ingredient_components(generic_display)
            formulations[formulation_id] = {
                "formulation_id": formulation_id,
                "generic_name_display": generic_display,
                "generic_name_normalized": generic_normalized,
                "ingredient_count": len(components),
                "component_split_method": split_method,
            }
            if " and " in generic_normalized and split_method == "single":
                ambiguous_and.append(
                    {
                        "formulation_id": formulation_id,
                        "generic_name_display": generic_display,
                        "reason": "contains_and_not_automatically_split",
                    }
                )
            for position, component in enumerate(components, start=1):
                component_normalized = normalize_name(component)
                ingredient_id = stable_id("ING", component_normalized)
                ingredients.setdefault(
                    ingredient_id,
                    {
                        "ingredient_id": ingredient_id,
                        "ingredient_name_display": component,
                        "ingredient_name_normalized": component_normalized,
                    },
                )
                formulation_ingredients[(formulation_id, ingredient_id)] = {
                    "formulation_id": formulation_id,
                    "ingredient_id": ingredient_id,
                    "ingredient_position": position,
                    "ingredient_name_as_published": component,
                    "split_method": split_method,
                    "review_status": (
                        "needs_review" if split_method in {"explicit_slash"} else "rule_extracted"
                    ),
                }

        brand_raw = normalize_text(source["brand_name"])
        brand_normalized = normalize_name(brand_raw)
        is_branded = brand_normalized not in UNBRANDED_VALUES
        brand_id = stable_id("BRAND", brand_normalized) if is_branded else ""
        if is_branded:
            brands.setdefault(
                brand_id,
                {
                    "brand_id": brand_id,
                    "brand_name_display": brand_raw,
                    "brand_name_normalized": brand_normalized,
                },
            )
            brand_formulations[(brand_id, formulation_id)] = {
                "brand_id": brand_id,
                "formulation_id": formulation_id,
            }

        product = {
            "product_id": source.get("source_record_id")
            or f"PH_FDA_VERIFICATION_PORTAL:{registration}",
            "registration_number": registration,
            "formulation_id": formulation_id,
            "brand_id": brand_id,
            "is_branded": int(is_branded),
            "is_export_only": int(export_only),
            "generic_name_raw": source["generic_name"],
            "brand_name_raw": source["brand_name"],
            "dosage_strength_raw": source["dosage_strength"],
            "dosage_strength_normalized": normalize_name(source["dosage_strength"]),
            "dosage_form_raw": source["dosage_form"],
            "dosage_form_normalized": normalize_name(source["dosage_form"]),
            "classification_raw": source["classification"],
            "pharmacologic_category_raw": source["pharmacologic_category"],
            "manufacturer_raw": source["manufacturer"],
            "country_of_origin_raw": source["country_of_origin"],
            "packaging_raw": source["packaging"],
            "trader_raw": source["trader"],
            "importer_raw": source["importer"],
            "distributor_raw": source["distributor"],
            "application_type_raw": source["app_type"],
            "issuance_date_raw": source["issuance_date"],
            "expiry_date_raw": source["expiry_date"],
            "source": source["source"],
            "source_url": source["source_url"],
            "retrieved_at": source["retrieved_at"],
        }
        products.append(product)

    return {
        "products": products,
        "formulations": list(formulations.values()),
        "brands": list(brands.values()),
        "ingredients": list(ingredients.values()),
        "formulation_ingredients": list(formulation_ingredients.values()),
        "brand_formulations": list(brand_formulations.values()),
        "ambiguous_and": ambiguous_and,
        "duplicate_registrations": duplicate_registrations,
    }


def write_sqlite(database_path: Path, tables: dict[str, list[dict[str, object]]]) -> None:
    database_path.parent.mkdir(parents=True, exist_ok=True)
    temporary = database_path.with_suffix(".sqlite.tmp")
    temporary.unlink(missing_ok=True)
    connection = sqlite3.connect(temporary)
    connection.execute("PRAGMA foreign_keys = ON")
    connection.executescript(
        """
        CREATE TABLE formulations (
            formulation_id TEXT PRIMARY KEY,
            generic_name_display TEXT NOT NULL,
            generic_name_normalized TEXT NOT NULL UNIQUE,
            ingredient_count INTEGER NOT NULL,
            component_split_method TEXT NOT NULL
        );
        CREATE TABLE brands (
            brand_id TEXT PRIMARY KEY,
            brand_name_display TEXT NOT NULL,
            brand_name_normalized TEXT NOT NULL UNIQUE
        );
        CREATE TABLE ingredients (
            ingredient_id TEXT PRIMARY KEY,
            ingredient_name_display TEXT NOT NULL,
            ingredient_name_normalized TEXT NOT NULL UNIQUE
        );
        CREATE TABLE products (
            product_id TEXT PRIMARY KEY,
            registration_number TEXT NOT NULL UNIQUE,
            formulation_id TEXT NOT NULL REFERENCES formulations(formulation_id),
            brand_id TEXT REFERENCES brands(brand_id),
            is_branded INTEGER NOT NULL,
            is_export_only INTEGER NOT NULL,
            generic_name_raw TEXT NOT NULL,
            brand_name_raw TEXT,
            dosage_strength_raw TEXT,
            dosage_strength_normalized TEXT,
            dosage_form_raw TEXT,
            dosage_form_normalized TEXT,
            classification_raw TEXT,
            pharmacologic_category_raw TEXT,
            manufacturer_raw TEXT,
            country_of_origin_raw TEXT,
            packaging_raw TEXT,
            trader_raw TEXT,
            importer_raw TEXT,
            distributor_raw TEXT,
            application_type_raw TEXT,
            issuance_date_raw TEXT,
            expiry_date_raw TEXT,
            source TEXT NOT NULL,
            source_url TEXT NOT NULL,
            retrieved_at TEXT NOT NULL
        );
        CREATE TABLE formulation_ingredients (
            formulation_id TEXT NOT NULL REFERENCES formulations(formulation_id),
            ingredient_id TEXT NOT NULL REFERENCES ingredients(ingredient_id),
            ingredient_position INTEGER NOT NULL,
            ingredient_name_as_published TEXT NOT NULL,
            split_method TEXT NOT NULL,
            review_status TEXT NOT NULL,
            PRIMARY KEY (formulation_id, ingredient_id)
        );
        CREATE TABLE brand_formulations (
            brand_id TEXT NOT NULL REFERENCES brands(brand_id),
            formulation_id TEXT NOT NULL REFERENCES formulations(formulation_id),
            PRIMARY KEY (brand_id, formulation_id)
        );
        CREATE INDEX products_formulation_idx ON products(formulation_id);
        CREATE INDEX products_brand_idx ON products(brand_id);
        CREATE INDEX products_generic_raw_idx ON products(generic_name_raw);
        CREATE INDEX products_brand_raw_idx ON products(brand_name_raw);
        CREATE VIEW brand_generic_names AS
        SELECT b.brand_name_display, b.brand_name_normalized,
               f.generic_name_display, f.generic_name_normalized,
               COUNT(p.product_id) AS registered_product_count
        FROM brand_formulations bf
        JOIN brands b ON b.brand_id = bf.brand_id
        JOIN formulations f ON f.formulation_id = bf.formulation_id
        LEFT JOIN products p
          ON p.brand_id = bf.brand_id AND p.formulation_id = bf.formulation_id
        GROUP BY b.brand_id, f.formulation_id;
        """
    )

    for table in (
        "formulations",
        "brands",
        "ingredients",
        "products",
        "formulation_ingredients",
        "brand_formulations",
    ):
        rows = tables[table]
        if not rows:
            continue
        columns = list(rows[0])
        placeholders = ", ".join("?" for _ in columns)
        connection.executemany(
            f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({placeholders})",
            [
                [
                    None if row.get(column, "") == "" else row.get(column)
                    for column in columns
                ]
                for row in rows
            ],
        )
    connection.commit()
    foreign_key_errors = connection.execute("PRAGMA foreign_key_check").fetchall()
    if foreign_key_errors:
        raise RuntimeError(f"SQLite foreign-key errors: {foreign_key_errors[:5]}")
    connection.close()
    temporary.replace(database_path)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    output_dir = args.output_dir.resolve()
    source_rows = read_products(args.input.resolve())
    tables = build_tables(source_rows)

    table_columns = {
        name: list(rows[0]) if rows else []
        for name, rows in tables.items()
    }
    for name in (
        "products",
        "formulations",
        "brands",
        "ingredients",
        "formulation_ingredients",
        "brand_formulations",
    ):
        write_csv(output_dir / f"{name}.csv", table_columns[name], tables[name])
    write_csv(
        output_dir / "review" / "ambiguous_and_formulations.csv",
        ["formulation_id", "generic_name_display", "reason"],
        tables["ambiguous_and"],
    )
    write_csv(
        output_dir / "review" / "duplicate_registrations.csv",
        ["registration_number", "reason"],
        tables["duplicate_registrations"],
    )
    write_sqlite(output_dir / "ph_drugs.sqlite", tables)

    brand_to_formulations: dict[str, set[str]] = defaultdict(set)
    for row in tables["brand_formulations"]:
        brand_to_formulations[str(row["brand_id"])].add(str(row["formulation_id"]))
    report = {
        "generated_at": utc_now(),
        "source_product_rows": len(source_rows),
        "canonical_products": len(tables["products"]),
        "unique_generic_formulations": len(tables["formulations"]),
        "unique_brand_names": len(tables["brands"]),
        "provisional_ingredient_components": len(tables["ingredients"]),
        "combination_formulations": sum(
            int(row["ingredient_count"]) > 1 for row in tables["formulations"]
        ),
        "unbranded_products": sum(not int(row["is_branded"]) for row in tables["products"]),
        "brands_linked_to_multiple_formulations": sum(
            len(formulation_ids) > 1 for formulation_ids in brand_to_formulations.values()
        ),
        "ambiguous_and_formulations": len(tables["ambiguous_and"]),
        "duplicate_registration_rows": len(tables["duplicate_registrations"]),
        "sqlite_foreign_keys_valid": True,
    }
    atomic_json(output_dir / "canonical_report.json", report)
    print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
