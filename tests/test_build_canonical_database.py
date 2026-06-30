import sys
import sqlite3
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from build_canonical_database import (  # noqa: E402
    build_tables,
    clean_generic_display,
    normalize_name,
    split_ingredient_components,
    write_sqlite,
)


def source_row(registration, generic, brand):
    return {
        "source": "PH_FDA_VERIFICATION_PORTAL",
        "source_record_id": f"PH_FDA_VERIFICATION_PORTAL:{registration}",
        "registration_number": registration,
        "generic_name": generic,
        "brand_name": brand,
        "dosage_strength": "10 mg",
        "dosage_form": "Tablet",
        "classification": "Prescription Drug",
        "packaging": "",
        "pharmacologic_category": "",
        "manufacturer": "",
        "country_of_origin": "",
        "trader": "",
        "importer": "",
        "distributor": "",
        "app_type": "",
        "issuance_date": "",
        "expiry_date": "",
        "source_url": "https://verification.fda.gov.ph/",
        "retrieved_at": "2026-06-30T00:00:00Z",
        "source_query": "TEST",
    }


class TestCanonicalDatabase(unittest.TestCase):
    def test_explicit_plus_combination_is_split(self):
        parts, method = split_ingredient_components("Drug A + Drug B")
        self.assertEqual(parts, ["Drug A", "Drug B"])
        self.assertEqual(method, "explicit_plus")

    def test_and_is_flagged_but_not_split(self):
        rows = [source_row("DR-1", "Drug A and Drug B", "Brand")]
        tables = build_tables(rows)
        self.assertEqual(len(tables["ingredients"]), 1)
        self.assertEqual(len(tables["ambiguous_and"]), 1)

    def test_same_brand_can_link_to_multiple_formulations(self):
        rows = [
            source_row("DR-1", "Drug A", "Shared Brand"),
            source_row("DR-2", "Drug B", "Shared Brand"),
        ]
        tables = build_tables(rows)
        self.assertEqual(len(tables["brands"]), 1)
        self.assertEqual(len(tables["formulations"]), 2)
        self.assertEqual(len(tables["brand_formulations"]), 2)

    def test_unbranded_product_has_no_brand_entity(self):
        tables = build_tables([source_row("DR-1", "Drug A", "None")])
        self.assertEqual(tables["products"][0]["is_branded"], 0)
        self.assertEqual(tables["products"][0]["brand_id"], "")
        self.assertEqual(tables["brands"], [])

    def test_export_marker_is_preserved_as_flag(self):
        display, export_only = clean_generic_display("(For Export Only) Ibuprofen")
        self.assertEqual(display, "Ibuprofen")
        self.assertTrue(export_only)
        self.assertEqual(normalize_name(display), "ibuprofen")

    def test_sqlite_preserves_zero_flags(self):
        tables = build_tables([source_row("DR-1", "Drug A", "None")])
        with tempfile.TemporaryDirectory() as temporary:
            database = Path(temporary) / "test.sqlite"
            write_sqlite(database, tables)
            with sqlite3.connect(database) as connection:
                flags = connection.execute(
                    "SELECT is_branded, is_export_only FROM products"
                ).fetchone()
        self.assertEqual(flags, (0, 0))


if __name__ == "__main__":
    unittest.main()
