import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from filipino_phonetics import (  # noqa: E402
    bigram_dice,
    nativize,
    pronunciation_features,
    pronunciation_profile,
    syllabify,
    weighted_phoneme_similarity,
)


class TestFilipinoPhonetics(unittest.TestCase):
    def test_nativization_models_selected_filipiino_readings(self):
        self.assertEqual(nativize("Valsartan"), "balsartan")
        self.assertEqual(nativize("Fluoxetine", merge_vowels=True), "pluuksitini")

    def test_profile_contains_multiple_controlled_paths(self):
        profile = pronunciation_profile("Biogesic")
        self.assertGreaterEqual(len(profile.paths), 3)
        self.assertTrue(all(path.phonemes for path in profile.paths))

    def test_syllabifier_preserves_full_word(self):
        syllables = syllabify("biogesic")
        self.assertEqual("".join(syllables), "biogesic")
        self.assertGreaterEqual(len(syllables), 3)

    def test_weighted_alignment_rewards_filipiino_mergers(self):
        merged = weighted_phoneme_similarity(("p", "i", "l"), ("f", "i", "l"))
        unrelated = weighted_phoneme_similarity(("p", "i", "l"), ("m", "a", "k"))
        self.assertGreater(merged, unrelated)

    def test_numeric_suffixes_remain_in_pronunciation_alignment(self):
        same = pronunciation_features("Toner 2", "Toner 2")
        different = pronunciation_features("Toner 2", "Toner 3")
        self.assertEqual(same["weighted_phoneme_similarity"], 1.0)
        self.assertLess(different["weighted_phoneme_similarity"], 1.0)

    def test_lattice_finds_biogesic_spoken_variant(self):
        features = pronunciation_features("vahyouhjayseek", "Biogesic")
        self.assertGreater(features["pronunciation_lattice_similarity"], 0.70)

    def test_orthographic_bigram_is_bounded(self):
        self.assertEqual(bigram_dice("Biogesic", "Biogesic"), 1.0)
        self.assertGreaterEqual(bigram_dice("Biogesic", "Bayojesec"), 0.0)


if __name__ == "__main__":
    unittest.main()
