import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from filipino_phonetics import (  # noqa: E402
    WORD_BOUNDARY,
    _parse_espeak_ipa,
    bigram_dice,
    nativize,
    pronunciation_coarse_codes,
    pronunciation_features,
    pronunciation_profile,
    pronunciation_provider_status,
    syllabify,
    weighted_phoneme_similarity,
)


class TestCebuanoPronunciationLattice(unittest.TestCase):
    def test_legacy_nativization_is_retained_as_a_baseline(self):
        self.assertEqual(nativize("Valsartan"), "balsartan")
        self.assertEqual(nativize("Fluoxetine", merge_vowels=True), "pluuksitini")

    def test_profiles_keep_ipa_and_route_provenance_separate(self):
        profile = pronunciation_profile("topic")
        paths = {path.route: path for path in profile.paths}
        cmu = paths["english_cmudict"]
        self.assertEqual(cmu.spelling, "tapik")
        self.assertEqual(cmu.phonemes, ("t", "ɑ", "p", "ɪ", "k"))
        self.assertEqual(cmu.evidence, "E0")
        self.assertEqual(cmu.cost, 0.0)

        direct = paths["cebuano_epitran_direct"]
        self.assertEqual(direct.spelling, "topik")
        self.assertIsNone(direct.stress_index)
        self.assertEqual(direct.evidence, "E2")

    def test_model_keeps_english_and_direct_cebuano_hypotheses(self):
        profile = pronunciation_profile("model")
        by_route = {path.route: path for path in profile.paths}
        self.assertEqual(by_route["english_cmudict"].spelling, "madel")
        self.assertEqual(by_route["cebuano_epitran_direct"].spelling, "model")
        self.assertNotEqual(
            by_route["english_cmudict"].phonemes,
            by_route["cebuano_epitran_direct"].phonemes,
        )

    def test_cebuano_epitran_raw_route_requires_full_coverage(self):
        profile = pronunciation_profile("Bioflu")
        routes = {path.route for path in profile.paths}
        self.assertNotIn("cebuano_epitran_direct", routes)
        self.assertIn("cebuano_epitran_nativized", routes)
        normalized = next(
            path
            for path in profile.paths
            if path.route == "cebuano_epitran_nativized"
        )
        self.assertEqual(normalized.spelling, "bioplu")
        self.assertEqual(normalized.coverage, 1.0)
        self.assertIn("CEB006", normalized.rule_ids)

    def test_affricates_remain_whole_ipa_segments(self):
        direct_paths = [
            path
            for path in pronunciation_profile("school").paths
            if path.route == "cebuano_epitran_direct"
        ]
        self.assertEqual(len(direct_paths), 1)
        self.assertIn("tʃ", direct_paths[0].phonemes)
        self.assertNotIn("ʃ", direct_paths[0].phonemes)

    def test_contextual_english_route_handles_oov_names_without_flite(self):
        status = pronunciation_provider_status()
        routes = {path.route for path in pronunciation_profile("Bioflu").paths}
        self.assertEqual(status["espeak_ng"], "available")
        self.assertIn("english_espeak_ng", routes)
        self.assertNotIn("english_heuristic", routes)
        self.assertIn("lex_lookup", status["epitran_eng"])

    def test_path_cost_changes_the_ranked_lattice_score(self):
        features = pronunciation_features("bayoplu", "Bioflu")
        self.assertEqual(features["pronunciation_lattice_similarity"], 1.0)
        self.assertLess(
            features["weighted_lattice_similarity"],
            features["pronunciation_lattice_similarity"],
        )
        self.assertGreater(features["pronunciation_path_cost_a"], 0)
        self.assertGreater(features["pronunciation_path_cost_b"], 0)

    def test_spoken_biogesic_variant_is_recalled_without_claiming_certainty(self):
        features = pronunciation_features("bayojesik", "Biogesic")
        self.assertGreater(features["pronunciation_lattice_similarity"], 0.84)
        self.assertGreater(features["weighted_lattice_similarity"], 0.74)
        self.assertIn(features["pronunciation_path_evidence_a"], {"E2", "E3"})
        self.assertEqual(features["pronunciation_path_evidence_b"], "E3")

    def test_reported_english_vowel_contexts_come_from_dictionary_ipa(self):
        expected = {
            "basket": ("b", "æ", "s", "k", "ə", "t"),
            "ball": ("b", "ɔ", "l"),
            "late": ("l", "eɪ", "t"),
            "note": ("n", "oʊ", "t"),
            "stress": ("s", "t", "r", "ɛ", "s"),
            "like": ("l", "aɪ", "k"),
            "head": ("h", "ɛ", "d"),
            "idea": ("aɪ", "d", "i", "ə"),
            "claude": ("k", "l", "ɔ", "d"),
            "could": ("k", "ʊ", "d"),
            "cloud": ("k", "l", "aʊ", "d"),
        }
        for word, phones in expected.items():
            with self.subTest(word=word):
                path = next(
                    item
                    for item in pronunciation_profile(word).paths
                    if item.route == "english_cmudict"
                )
                self.assertEqual(path.phonemes, phones)

    def test_espeak_ipa_parser_keeps_diphthongs_stress_and_rhotics(self):
        phones, stress = _parse_espeak_ipa("b|ˈaɪ|n|ɚ|ɹ|i")
        self.assertEqual(phones, ("b", "aɪ", "n", "ɚ", "i"))
        self.assertEqual(stress, 0)

    def test_espeak_parser_preserves_spoken_boundaries_inside_alphanumeric_tokens(self):
        phones, stress = _parse_espeak_ipa("b|ˈiː‖t|w|ˈɛ|l|v")
        self.assertEqual(
            phones,
            ("b", "i", WORD_BOUNDARY, "t", "w", "ɛ", "l", "v"),
        )
        self.assertEqual(stress, 0)

    def test_oov_drug_like_name_uses_contextual_g2p_before_direct_reading(self):
        paths = pronunciation_profile("cefuroxime").paths
        english = next(path for path in paths if path.route == "english_espeak_ng")
        direct = next(
            path
            for path in paths
            if path.route.startswith("cebuano_epitran")
        )
        self.assertIn("aɪ", english.phonemes)
        self.assertLess(english.cost, direct.cost)

    def test_binary_keeps_english_source_and_direct_local_reading_distinct(self):
        paths = pronunciation_profile("binary").paths
        source = next(path for path in paths if path.route == "english_cmudict")
        direct = next(path for path in paths if path.spelling == "binari")
        self.assertEqual(source.spelling, "bayneri")
        self.assertEqual(source.rule_ids, ("EN_CMU_DICT",))
        self.assertEqual(direct.route, "cebuano_epitran_nativized")
        self.assertIn("CEB_FINAL_Y_I", direct.rule_ids)
        self.assertNotIn("bayniri", {path.spelling for path in paths})
        self.assertFalse(any(
            "CEB_RHOTIC_VOWEL" in path.rule_ids for path in paths
        ))

    def test_ipa_y_glide_is_displayed_as_y_not_j(self):
        source = next(
            path
            for path in pronunciation_profile("universe").paths
            if path.route == "english_cmudict"
        )
        self.assertTrue(source.spelling.startswith("y"))
        self.assertFalse(source.spelling.startswith("j"))

    def test_multiword_paths_keep_a_word_boundary(self):
        profile = pronunciation_profile("Mac Ester")
        self.assertTrue(any(WORD_BOUNDARY in path.phonemes for path in profile.paths))
        self.assertTrue(any(" " in path.spelling for path in profile.paths))

    def test_numeric_tokens_remain_distinct_in_alignment(self):
        same = pronunciation_features("Toner 2", "Toner 2")
        different = pronunciation_features("Toner 2", "Toner 3")
        self.assertEqual(same["weighted_phoneme_similarity"], 1.0)
        self.assertLess(different["weighted_phoneme_similarity"], 1.0)
        self.assertIn("#2", same["pronunciation_path_ipa_a"])

    def test_coarse_codes_use_ipa_derived_shapes(self):
        self.assertIn("PVVPRV", pronunciation_coarse_codes("Bioflu"))
        self.assertIn("PVVPRV", pronunciation_coarse_codes("Bayoplu"))

    def test_syllabifier_preserves_full_display_word(self):
        syllables = syllabify("biogesic")
        self.assertEqual("".join(syllables), "biogesic")
        self.assertGreaterEqual(len(syllables), 3)

    def test_weighted_alignment_rewards_bounded_phone_mergers(self):
        merged = weighted_phoneme_similarity(("p", "i", "l"), ("f", "i", "l"))
        unrelated = weighted_phoneme_similarity(("p", "i", "l"), ("m", "a", "k"))
        self.assertGreater(merged, unrelated)

    def test_orthographic_bigram_is_bounded(self):
        self.assertEqual(bigram_dice("Biogesic", "Biogesic"), 1.0)
        self.assertGreaterEqual(bigram_dice("Biogesic", "Bayojesec"), 0.0)


if __name__ == "__main__":
    unittest.main()
