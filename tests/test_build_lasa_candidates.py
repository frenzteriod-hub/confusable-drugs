import sys
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from build_lasa_candidates import (  # noqa: E402
    NameEntry,
    blocking_keys,
    build_review_queue,
    collapse_normalization_duplicates,
    enrich_review_queue,
    filipino_transform,
    generate_candidates,
    jaro_winkler,
    levenshtein_distance,
    likely_same_combination_variant,
    score_pair,
    soundex,
    write_sqlite,
)
from filipino_phonetics import pronunciation_features  # noqa: E402


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
        self.assertIn("weighted_lattice_similarity", result)
        self.assertIn("raw_pronunciation_lattice_similarity", result)
        self.assertIn("experimental_ensemble_score", result)
        self.assertIn("pronunciation_profile_status", result)
        self.assertIn("pronunciation_path_route_a", result)

    def test_ipa_only_block_recalls_a_phonetic_candidate(self):
        school = entry("B1", "brand", "School", {"F1"})
        eskul = entry("B2", "brand", "Eskul", {"F2"})
        shared = blocking_keys(school).intersection(blocking_keys(eskul))
        self.assertTrue(shared)
        self.assertTrue(all(key[0].startswith("ipa_") for key in shared))

        with patch(
            "build_lasa_candidates.pronunciation_features",
            wraps=pronunciation_features,
        ) as lattice:
            candidates, _ = generate_candidates([school, eskul])
        self.assertEqual(len(candidates), 1)
        self.assertEqual(lattice.call_count, 1)
        self.assertIn(
            "pronunciation_lattice_weighted",
            candidates[0]["candidate_reasons"],
        )
        self.assertGreater(candidates[0]["weighted_lattice_similarity"], 0.90)

    def test_no_reason_without_exact_coarse_ipa_overlap_skips_lattice(self):
        # The cheap spelling proxy is deliberately high here, but these names
        # do not share a complete coarse IPA code.  A broad prefix/suffix block
        # alone must not trigger expensive full path-pair scoring.
        with patch("build_lasa_candidates.pronunciation_features") as lattice:
            result = score_pair(
                entry("B1", "brand", "metforminex", {"F1"}),
                entry("B2", "brand", "cefuruxime", {"F2"}),
                standard_threshold=0.84,
                filipino_threshold=0.86,
            )
        self.assertIsNone(result)
        lattice.assert_not_called()

    def test_sqlite_keeps_unknown_stress_as_null_real_metric(self):
        first = entry("B1", "brand", "School", {"F1"})
        second = entry("B2", "brand", "Eskul", {"F2"})
        candidate = score_pair(first, second, 0.84, 0.86)
        self.assertIsNotNone(candidate)
        self.assertIsNone(candidate["stress_similarity"])
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "candidates.sqlite"
            write_sqlite(path, [first, second], [candidate])
            connection = sqlite3.connect(path)
            try:
                stress = connection.execute(
                    "SELECT stress_similarity FROM lasa_candidates"
                ).fetchone()[0]
                schema = {
                    row[1]: row[2]
                    for row in connection.execute("PRAGMA table_info(lasa_candidates)")
                }
            finally:
                connection.close()
        self.assertIsNone(stress)
        self.assertEqual(schema["stress_similarity"], "REAL")

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
        self.assertEqual(build_review_queue([result]), [])

    def test_exact_coarse_ipa_screen_pair_can_be_promoted_after_full_scoring(self):
        candidate = score_pair(
            entry("B1", "brand", "Model", {"F1"}),
            entry("B2", "brand", "Madal", {"F2"}),
            standard_threshold=0.84,
            filipino_threshold=0.86,
        )
        self.assertIsNotNone(candidate)
        self.assertEqual(candidate["algorithmic_priority"], "screen")
        self.assertTrue(candidate["coarse_ipa_overlap"])
        self.assertEqual(
            candidate["pronunciation_profile_status"], "not_scored_first_pass"
        )

        selected = build_review_queue([candidate])
        self.assertEqual(len(selected), 1)
        self.assertEqual(selected[0]["review_selection"], "phonetic_promotion")
        enriched = enrich_review_queue(selected)
        self.assertEqual(len(enriched), 1)
        self.assertEqual(enriched[0]["algorithmic_priority"], "medium")
        self.assertEqual(enriched[0]["pronunciation_profile_status"], "profiled")
        self.assertIn(
            "phonetic_promotion_after_full_lattice",
            enriched[0]["candidate_reasons"],
        )

    def test_spelling_recall_is_deferred_then_review_queue_is_enriched(self):
        candidate = score_pair(
            entry("B1", "brand", "Biogesic", {"F1"}),
            entry("B2", "brand", "Biogesik", {"F2"}),
            standard_threshold=0.84,
            filipino_threshold=0.86,
        )
        self.assertIsNotNone(candidate)
        self.assertEqual(
            candidate["pronunciation_profile_status"], "not_scored_first_pass"
        )
        self.assertEqual(candidate["pronunciation_path_a"], "")

        queue = build_review_queue([candidate])
        enriched = enrich_review_queue(queue)
        self.assertEqual(len(enriched), 1)
        self.assertEqual(enriched[0]["pronunciation_profile_status"], "profiled")
        self.assertTrue(enriched[0]["pronunciation_path_a"])
        self.assertTrue(enriched[0]["pronunciation_path_b"])
        self.assertGreater(enriched[0]["review_rank_score"], 0.0)

    def test_enrichment_does_not_mutate_cached_pronunciation_features(self):
        first_name = "Aspirin 10"
        second_name = "Aspiran 20"
        baseline = pronunciation_features(first_name, second_name)[
            "experimental_ensemble_score"
        ]
        candidate = score_pair(
            entry("B1", "brand", first_name, {"F1"}),
            entry("B2", "brand", second_name, {"F2"}),
            standard_threshold=0.99,
            filipino_threshold=0.99,
        )
        self.assertIsNotNone(candidate)
        self.assertEqual(candidate["pronunciation_profile_status"], "not_scored_first_pass")
        enriched = enrich_review_queue([candidate])[0]
        self.assertAlmostEqual(
            pronunciation_features(first_name, second_name)[
                "experimental_ensemble_score"
            ],
            baseline,
        )
        self.assertAlmostEqual(
            enriched["experimental_ensemble_score"],
            max(0.0, baseline - candidate["numeric_distinction_penalty"]),
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

    def test_phonetic_promotion_pool_is_bounded_per_name(self):
        candidates = [
            {
                "candidate_id": f"P{index}",
                "name_a_id": "A",
                "name_b_id": f"B{index}",
                "name_a": "Model",
                "name_b": f"Madal{index}",
                "algorithmic_priority": "screen",
                "candidate_nature": "potential_lasa",
                "coarse_ipa_overlap": True,
                "numeric_distinction_penalty": 0.0,
                "jaro_winkler": 0.80 - index / 100,
                "edit_similarity": 0.70,
                "filipino_jaro_winkler": 0.70,
            }
            for index in range(5)
        ]
        queue = build_review_queue(
            candidates,
            maximum_phonetic_promotions_per_name=2,
            maximum_phonetic_promotions=10,
        )
        self.assertEqual(len(queue), 2)
        self.assertTrue(
            all(row["review_selection"] == "phonetic_promotion" for row in queue)
        )

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
