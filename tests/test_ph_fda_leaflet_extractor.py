import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from ph_fda_leaflet_extractor import (  # noqa: E402
    DESCRIPTION_HEADINGS,
    DESCRIPTION_STOPS,
    INDICATION_HEADINGS,
    INDICATION_STOPS,
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

    def test_patient_leaflet_used_for_heading_is_an_indication(self):
        section = extract_section(
            [
                "WHAT IS THIS MEDICINE USED FOR?\n"
                "This product is used for the prevention and treatment of Vitamin E deficiency.\n"
                "HOW MUCH AND HOW OFTEN SHOULD YOU TAKE THIS MEDICINE?\n"
                "Take one capsule a day."
            ],
            INDICATION_HEADINGS,
            INDICATION_STOPS,
        )
        self.assertEqual(
            section.text,
            "This product is used for the prevention and treatment of Vitamin E deficiency.",
        )
        self.assertEqual(section.heading, "WHAT IS THIS MEDICINE USED FOR?")

    def test_patient_leaflet_description_stops_before_contents(self):
        section = extract_section(
            [
                "PRODUCT DESCRIPTION\n"
                "An oblong, yellow and green soft gelatin capsule.\n"
                "WHAT IS IN THE MEDICINE?\n"
                "Vitamin E and Lecithin."
            ],
            DESCRIPTION_HEADINGS,
            DESCRIPTION_STOPS,
        )
        self.assertEqual(
            section.text,
            "An oblong, yellow and green soft gelatin capsule.",
        )

    def test_whitespace_normalization_does_not_correct_words(self):
        self.assertEqual(
            normalize_space("ketorolac   promethazine\n"),
            "ketorolac promethazine",
        )


if __name__ == "__main__":
    unittest.main()
