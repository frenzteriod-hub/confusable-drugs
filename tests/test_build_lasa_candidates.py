import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from build_lasa_candidates import (  # noqa: E402
    NameEntry,
    build_review_queue,
    collapse_normalization_duplicates,
    filipino_transform,
    generate_candidates,
    jaro_winkler,
    levenshtein_distance,
    likely_same_combination_variant,
    score_pair,
    soundex,
)


def entry(identifier, kind, name, formulations):
    return NameEntry(
        name_id=identifier,
        name_type=kind,
        display_name=name,
        normalized_name=name.casefold(),
        formulation_ids=frozenset(formulations),
    )


class TestLASACandidates(unittest.TestCase):
    def test_core_metrics(self):
        self.assertEqual(levenshtein_distance("tramadol", "trazodone"), 4)
        self.assertGreater(jaro_winkler("tramadol", "trazodone"), 0.75)
        self.assertEqual(soundex("tramadol"), "T653")

    def test_candidate_exposes_experimental_pronunciation_components(self):
        result = score_pair(
            entry("B1", "brand", "Bayojesec", {"F1"}),
            entry("B2", "brand", "Biogesic", {"F2"}),
            standard_threshold=0.84,
            filipino_threshold=0.86,
        )
        self.assertIsNotNone(result)
        self.assertIn("pronunciation_lattice_similarity", result)
        self.assertIn("experimental_ensemble_score", result)
        self.assertTrue(result["pronunciation_path_a"])
        self.assertTrue(result["pronunciation_path_b"])

    def test_base_identical_numeric_variants_are_demoted(self):
        result = score_pair(
            entry("B1", "brand", "Gardasil", {"F1"}),
            entry("B2", "brand", "Gardasil 9", {"F2"}),
            standard_threshold=0.84,
            filipino_threshold=0.86,
        )
        self.assertIsNotNone(result)
        self.assertEqual(result["numeric_distinction_penalty"], 0.18)
        self.assertEqual(result["algorithmic_priority"], "screen")
        self.assertIn(
            "numeric_strength_or_version_distinction",
            result["candidate_reasons"],
        )

    def test_known_orthographic_candidates_are_recalled(self):
        entries = [
            entry("G1", "generic", "tramadol", {"F1"}),
            entry("G2", "generic", "trazodone", {"F2"}),
            entry("G3", "generic", "hydroxyzine", {"F3"}),
            entry("G4", "generic", "hydralazine", {"F4"}),
        ]
        candidates, _ = generate_candidates(entries)
        pairs = {
            frozenset((row["name_a"], row["name_b"])) for row in candidates
        }
        self.assertIn(frozenset(("tramadol", "trazodone")), pairs)
        self.assertIn(frozenset(("hydroxyzine", "hydralazine")), pairs)

    def test_related_brand_generic_pair_is_excluded(self):
        entries = [
            entry("G1", "generic", "Example", {"F1"}),
            entry("B1", "brand", "Exampel", {"F1"}),
        ]
        candidates, _ = generate_candidates(entries)
        self.assertEqual(candidates, [])

    def test_exact_name_across_entity_types_is_not_a_lasa_pair(self):
        entries = [
            entry("G1", "generic", "Example", {"F1"}),
            entry("B1", "brand", "Example", {"F2"}),
        ]
        candidates, _ = generate_candidates(entries)
        self.assertEqual(candidates, [])

    def test_unrelated_names_are_not_candidates(self):
        entries = [
            entry("G1", "generic", "aspirin", {"F1"}),
            entry("G2", "generic", "warfarin", {"F2"}),
        ]
        candidates, _ = generate_candidates(entries)
        self.assertEqual(candidates, [])

    def test_filipino_transform_models_selected_mergers(self):
        self.assertEqual(filipino_transform("fluoxetine"), "pluuxitini")
        self.assertEqual(filipino_transform("valsartan"), "balsartan")
        self.assertEqual(filipino_transform("omeprazole"), "umiprasuli")

    def test_same_long_combination_format_variant_is_excluded(self):
        first = entry(
            "G1",
            "generic",
            "Thiamine (Vitamin B1) + Pyridoxine (Vitamin B6) + Cyanocobalamin",
            {"F1"},
        )
        second = entry(
            "G2",
            "generic",
            "Thiamine (Vitamins B1) / Pyridoxine (Vitamin B6) / Cyanocobalamin",
            {"F2"},
        )
        self.assertTrue(likely_same_combination_variant(first, second))
        candidates, _ = generate_candidates([first, second])
        self.assertEqual(candidates, [])

    def test_review_queue_limits_pairs_per_name(self):
        candidates = []
        for index in range(5):
            candidates.append(
                {
                    "candidate_id": f"C{index}",
                    "name_a_id": "A",
                    "name_b_id": f"B{index}",
                    "algorithmic_priority": "high",
                    "jaro_winkler": 0.99 - index / 100,
                    "edit_similarity": 0.9,
                    "filipino_jaro_winkler": 0.9,
                }
            )
        queue = build_review_queue(candidates, maximum_per_name=2)
        self.assertEqual(len(queue), 2)

    def test_close_generic_spelling_is_routed_as_source_variant(self):
        entries = [
            entry("G1", "generic", "cefuroxime", {"F1"}),
            entry("G2", "generic", "cefuruxime", {"F2"}),
        ]
        candidates, _ = generate_candidates(entries)
        self.assertEqual(len(candidates), 1)
        self.assertEqual(
            candidates[0]["candidate_nature"],
            "probable_generic_spelling_variant",
        )
        self.assertEqual(
            candidates[0]["review_classification"],
            "spelling_variant_or_probable_typo",
        )
        self.assertEqual(build_review_queue(candidates), [])

    def test_formatting_alias_is_a_normalization_duplicate(self):
        entries = [
            entry("B1", "brand", "Hydroper", {"F1"}),
            entry("B2", "brand", "Hydroper®", {"F1"}),
        ]
        collapsed, duplicates = collapse_normalization_duplicates(entries)
        self.assertEqual([item.display_name for item in collapsed], ["Hydroper"])
        self.assertEqual(len(duplicates), 1)
        self.assertEqual(
            duplicates[0]["review_classification"],
            "normalization_duplicate",
        )

    def test_formatting_aliases_merge_their_product_relationships(self):
        entries = [
            entry("B1", "brand", "Example-1", {"F1"}),
            entry("B2", "brand", "Example 1", {"F2"}),
        ]
        collapsed, duplicates = collapse_normalization_duplicates(entries)
        self.assertEqual(len(collapsed), 1)
        self.assertEqual(collapsed[0].formulation_ids, frozenset({"F1", "F2"}))
        self.assertEqual(len(duplicates), 1)

    def test_semantic_combination_separator_is_not_removed(self):
        entries = [
            entry("G1", "generic", "Drug A + Drug B", {"F1"}),
            entry("G2", "generic", "Drug A Drug B", {"F2"}),
        ]
        collapsed, duplicates = collapse_normalization_duplicates(entries)
        self.assertEqual(len(collapsed), 2)
        self.assertEqual(duplicates, [])


if __name__ == "__main__":
    unittest.main()
