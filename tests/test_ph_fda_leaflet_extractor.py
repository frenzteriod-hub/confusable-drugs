import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from ph_fda_leaflet_extractor import (  # noqa: E402
    extract_section,
    google_drive_download_url,
    normalize_space,
)


class TestLeafletExtractor(unittest.TestCase):
    def test_google_drive_link_conversion(self):
        source = "https://drive.google.com/file/d/abc123/view?usp=drivesdk"
        self.assertEqual(
            google_drive_download_url(source),
            "https://drive.google.com/uc?export=download&id=abc123",
        )

    def test_indications_section_and_page_are_preserved(self):
        pages = [
            "PRODUCT DESCRIPTION:\nWhite tablet.\nFORMULATION:\nIngredient 10 mg.",
            "INDICATIONS:\nFor treatment of example condition.\nDOSAGE AND ADMINISTRATION:\nOne tablet.",
        ]
        section = extract_section(
            pages,
            ("indications", "therapeutic indications"),
            ("dosage and administration", "contraindications"),
        )
        self.assertEqual(section.text, "For treatment of example condition.")
        self.assertEqual(section.start_page, 2)
        self.assertEqual(section.end_page, 2)

    def test_no_section_is_not_invented(self):
        section = extract_section(["FORMULATION:\nIngredient 10 mg."], ("indications",), ("dosage",))
        self.assertEqual(section.text, "")
        self.assertIsNone(section.start_page)

    def test_whitespace_normalization_does_not_correct_words(self):
        self.assertEqual(
            normalize_space("ketorolac   promethazine\n"),
            "ketorolac promethazine",
        )


if __name__ == "__main__":
    unittest.main()
