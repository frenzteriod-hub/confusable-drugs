import csv
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class TestPronunciationRuleLedger(unittest.TestCase):
    def test_rule_ledger_is_rectangular_unique_and_covers_v4_routes(self):
        with (ROOT / "docs" / "cebuano_g2p_rules.csv").open(
            encoding="utf-8", newline=""
        ) as source:
            reader = csv.DictReader(source)
            rows = list(reader)

        self.assertEqual(len(reader.fieldnames or []), 11)
        self.assertTrue(all(None not in row for row in rows))
        identifiers = [row["rule_id"] for row in rows]
        self.assertEqual(len(identifiers), len(set(identifiers)))
        self.assertTrue({
            "EN_CMU_DICT",
            "EN_ESPEAK_NG",
            "EN_EPITRAN_ENG",
            "EN_HEURISTIC",
            "CEB_DIRECT_SPELLING",
            "CEB_CONTEXT_ALIGNED",
            "CEB_CONTEXT_PARTIAL",
            "CEB_A_CONTEXT",
            "CEB_E_CONTEXT",
            "CEB_O_CONTEXT",
            "CEB_I_CONTEXT",
            "CEB_U_CONTEXT",
            "CEB_VOWEL_HIATUS_Y",
            "CEB_EPITRAN_NATIVIZED",
            "CEB_FINAL_Y_I",
            "CEB010",
            "CEB_VOWEL_MERGED",
        }.issubset(identifiers))
        self.assertNotIn("CEB_RHOTIC_VOWEL", identifiers)


if __name__ == "__main__":
    unittest.main()
