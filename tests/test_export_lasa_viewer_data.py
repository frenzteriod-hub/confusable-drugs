import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from build_lasa_candidates import NameEntry, score_pair  # noqa: E402
from export_lasa_viewer_data import (  # noqa: E402
    compact_candidate,
    compact_cebuano_tools,
    compact_pronunciation_paths,
)
from filipino_phonetics import pronunciation_model_metadata  # noqa: E402


def entry(identifier: str, name: str) -> NameEntry:
    return NameEntry(
        name_id=identifier,
        name_type="brand",
        display_name=name,
        normalized_name=name.casefold(),
        formulation_ids=frozenset({identifier}),
    )


class TestViewerExport(unittest.TestCase):
    def test_path_export_keeps_ipa_and_provenance(self):
        displays, details = compact_pronunciation_paths("topic")
        self.assertIn("tapik", displays)
        self.assertIn("topik", displays)
        self.assertGreaterEqual(details["total_path_count"], len(details["paths"]))
        cmu = next(
            path for path in details["paths"] if path["route"] == "english_cmudict"
        )
        self.assertEqual(cmu["ipa"], ["t", "ɑ", "p", "ɪ", "k"])
        self.assertEqual(cmu["evidence"], "E0")
        self.assertEqual(cmu["cost"], 0.0)
        self.assertEqual(details["profile_status"], "profiled")

    def test_complex_name_has_explicit_unprofiled_status(self):
        displays, details = compact_pronunciation_paths(
            "Dextrose Sodium Chloride Potassium"
        )
        self.assertEqual(displays, [])
        self.assertEqual(details["profile_status"], "not_profiled_complex_name")
        self.assertEqual(details["total_path_count"], 0)

    def test_candidate_export_preserves_unknown_stress_and_weighted_score(self):
        candidate = score_pair(entry("B1", "School"), entry("B2", "Eskul"), 0.84, 0.86)
        self.assertIsNotNone(candidate)
        csv_row = {
            key: "" if value is None else str(value)
            for key, value in candidate.items()
        }
        compact = compact_candidate(csv_row, set())
        self.assertIsNone(compact["stress"])
        self.assertGreater(compact["lattice"], 0.90)
        self.assertGreater(compact["rawLattice"], compact["lattice"])
        self.assertTrue(compact["pathIpaA"])
        self.assertEqual(compact["pronunciationProfileStatus"], "profiled")
        self.assertTrue(compact["pathSourceA"])
        self.assertIsNotNone(compact["pathCoverageA"])
        self.assertIsInstance(compact["pathRuleIdsA"], list)

    def test_candidate_export_keeps_intentional_unprofiled_boundary(self):
        candidate = score_pair(entry("B1", "School"), entry("B2", "Eskul"), 0.84, 0.86)
        self.assertIsNotNone(candidate)
        csv_row = {
            key: "" if value is None else str(value)
            for key, value in candidate.items()
        }
        csv_row.update(
            {
                "pronunciation_profile_status": "not_profiled_complex_name",
                "pronunciation_path_a": "",
                "pronunciation_path_b": "",
                "pronunciation_path_source_a": "",
                "pronunciation_path_source_b": "",
                "pronunciation_path_coverage_a": "",
                "pronunciation_path_coverage_b": "",
                "pronunciation_path_rule_ids_a": "",
                "pronunciation_path_rule_ids_b": "",
            }
        )
        compact = compact_candidate(csv_row, set())
        self.assertEqual(
            compact["pronunciationProfileStatus"],
            "not_profiled_complex_name",
        )
        self.assertEqual(compact["pathA"], "")
        self.assertIsNone(compact["pathCoverageA"])
        self.assertEqual(compact["pathRuleIdsA"], [])

    def test_tool_and_detail_payloads_are_separate(self):
        candidate = score_pair(entry("B1", "School"), entry("B2", "Eskul"), 0.84, 0.86)
        self.assertIsNotNone(candidate)
        csv_row = {
            key: "" if value is None else str(value)
            for key, value in candidate.items()
        }
        compact = compact_candidate(csv_row, set())
        tools, details = compact_cebuano_tools(
            [
                {
                    "bi": "B1",
                    "b": "School",
                    "gi": "",
                    "g": "",
                },
                {
                    "bi": "B2",
                    "b": "Eskul",
                    "gi": "",
                    "g": "",
                },
            ],
            [compact],
            "2026-07-11T00:00:00+00:00",
            pronunciation_model_metadata(),
        )
        self.assertEqual(tools["name_columns"][-1], "profile_status")
        self.assertEqual(len(tools["pairs"][0]), 9)
        self.assertEqual(details["format"], "dictionary_columnar_v1")
        self.assertEqual(
            details["name_columns"],
            ["id", "profile_status", "total_path_count", "truncated", "paths"],
        )
        detail_by_id = {row[0]: row for row in details["names"]}
        self.assertEqual(detail_by_id["B1"][1], "profiled")
        self.assertTrue(detail_by_id["B1"][4])
        source_ref = detail_by_id["B1"][4][0][7]
        self.assertTrue(details["dictionaries"]["sources"][source_ref])


if __name__ == "__main__":
    unittest.main()
