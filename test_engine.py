import unittest
from lasa_engine import (
    levenshtein_distance,
    levenshtein_similarity,
    jaro_winkler_similarity,
    soundex_encode,
    soundex_similarity,
    generate_tallman_lettering
)

class TestLASAEngine(unittest.TestCase):
    
    def test_levenshtein(self):
        # tramadol vs trazodone:
        # t-r-a-m-a-d-o-l -> t-r-a-z-o-d-o-n-e
        # Replace m with z, replace a with o, insert n, insert e?
        # Let's count actual edits:
        # t r a m a d o l
        # t r a z o d o n e
        # 1. m -> z (trazadol)
        # 2. a -> o (trazodol)
        # 3. l -> n (trazodon)
        # 4. insert e -> trazodone
        # Distance is 4. Let's verify:
        self.assertEqual(levenshtein_distance("tramadol", "trazodone"), 4)
        self.assertEqual(levenshtein_distance("cat", "cut"), 1)
        self.assertEqual(levenshtein_distance("same", "same"), 0)
        self.assertEqual(levenshtein_distance("", "test"), 4)
        
    def test_jaro_winkler(self):
        # Identical strings should have similarity 1.0
        self.assertAlmostEqual(jaro_winkler_similarity("tramadol", "tramadol"), 1.0)
        # Completely different strings should have low similarity
        self.assertLess(jaro_winkler_similarity("abc", "xyz"), 0.5)
        # Similar strings should have high similarity
        self.assertGreater(jaro_winkler_similarity("tramadol", "trazodone"), 0.75)
        
    def test_soundex(self):
        self.assertEqual(soundex_encode("tramadol"), "T653")
        self.assertEqual(soundex_encode("trazodone"), "T623")
        self.assertEqual(soundex_encode("hydroxyzine"), "H362")
        self.assertEqual(soundex_encode("hydralazine"), "H364")
        self.assertEqual(soundex_encode(""), "0000")
        
        # soundex similarity checks
        self.assertEqual(soundex_similarity("tramadol", "trazodone"), 0.75)  # T, 6, 3 match (3/4 = 0.75)
        
    def test_tallman(self):
        # Test registered
        t1, t2 = generate_tallman_lettering("tramadol", "trazodone")
        self.assertEqual(t1, "traMADol")
        self.assertEqual(t2, "traZODone")
        
        # Test fallback (custom words)
        # "testmed" vs "testmod" -> LCP: "testm", LCS: "d"
        # middle parts: "e" vs "o". Since they are < 2 chars, it will fallback to start_cap:
        # start_cap for "testmed" and "testmod" (prefix length = 5): start_cap = 3 (due to override).
        # So "testmed"[:3] + "testmed"[3:].upper() -> "tesTMED" -> capitalized first letter -> "TesTMED"
        t1, t2 = generate_tallman_lettering("testmed", "testmod")
        self.assertEqual(t1, "TesTMED")
        self.assertEqual(t2, "TesTMOD")
        
        # "alphadrugex" vs "betadrugex" -> LCP: "", LCS: "adrugex" (since 'a' is shared)
        # mid1: "alph", mid2: "bet"
        # Should yield "ALPHadrugex" and "BETadrugex"
        t1, t2 = generate_tallman_lettering("alphadrugex", "betadrugex")
        self.assertEqual(t1, "ALPHadrugex")
        self.assertEqual(t2, "BETadrugex")

if __name__ == "__main__":
    unittest.main()
