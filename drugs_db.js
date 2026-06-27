// ==========================================================================
// Hardcoded FDA Medication Database (1,495 records)
// Source: openFDA Drugs@FDA (https://open.fda.gov/data/downloads/)
// Ingested and sanitized via ingest_fda.py pipeline
// ==========================================================================
const DRUGS_DATABASE = [
  {
    "id": "RAW_0001",
    "generic_name": "abacavir sulfate",
    "brand_name": "Ziagen",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0002",
    "generic_name": "abaloparatide",
    "brand_name": "Tymlos",
    "therapeutic_class": "Parathyroid Hormone-Related Peptide Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Radius. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Parathyroid Hormone-Related Peptide Analog [EPC]."
  },
  {
    "id": "RAW_0003",
    "generic_name": "abatacept",
    "brand_name": "Orencia",
    "therapeutic_class": "Selective T Cell Costimulation Modulator [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Injectable for Iv (Infusion) administration.",
    "indication": "Used as a therapeutic agent for indications related to: Selective T Cell Costimulation Modulator [EPC]."
  },
  {
    "id": "RAW_0004",
    "generic_name": "abciximab",
    "brand_name": "Reopro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Centocor Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0005",
    "generic_name": "abemaciclib",
    "brand_name": "Verzenio",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0006",
    "generic_name": "abiraterone acetate",
    "brand_name": "Yonsa, Zytiga",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0007",
    "generic_name": "abrocitinib",
    "brand_name": "Cibinqo",
    "therapeutic_class": "Janus Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Janus Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0008",
    "generic_name": "acalabrutinib",
    "brand_name": "Calquence",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0009",
    "generic_name": "aceclidine",
    "brand_name": "Vizz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Lenz Therap. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0010",
    "generic_name": "acetaminophen and ibuprofen",
    "brand_name": "Combogesic",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Aft Pharms Us. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0011",
    "generic_name": "acetohydroxamic acid",
    "brand_name": "Lithostat",
    "therapeutic_class": "Urease Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mission Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Urease Inhibitor [EPC]."
  },
  {
    "id": "RAW_0012",
    "generic_name": "acetylcholine chloride",
    "brand_name": "Miochol E",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch And Lomb. Formulation: For Solution for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0013",
    "generic_name": "acetylcysteine",
    "brand_name": "Acetadote",
    "therapeutic_class": "Antidote [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cumberland Pharms. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antidote [EPC]."
  },
  {
    "id": "RAW_0014",
    "generic_name": "acoltremon",
    "brand_name": "Tryptyr",
    "therapeutic_class": "TRPM8 Thermoreceptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alcon Labs Inc. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: TRPM8 Thermoreceptor Agonist [EPC]."
  },
  {
    "id": "RAW_0015",
    "generic_name": "acoramidis hydrochloride",
    "brand_name": "Attruby",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bridgebio Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0016",
    "generic_name": "acyclovir and hydrocortisone",
    "brand_name": "Xerese",
    "therapeutic_class": "Herpes Simplex Virus Nucleoside Analog DNA Polymerase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Herpes Simplex Virus Nucleoside Analog DNA Polymerase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0017",
    "generic_name": "adagrasib",
    "brand_name": "Krazati",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0018",
    "generic_name": "adalimumab",
    "brand_name": "Abrilada, Amjevita, Hulio, Humira, Idacio, Yusimry",
    "therapeutic_class": "Tumor Necrosis Factor Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tumor Necrosis Factor Blocker [EPC]."
  },
  {
    "id": "RAW_0019",
    "generic_name": "adapalene",
    "brand_name": "Epiduo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Galderma Labs Lp. Formulation: Gel for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0020",
    "generic_name": "adapalene and benzoyl pergolide",
    "brand_name": "Adapalene And Benzoyl Peroxide, Differin Epiduo, Epiduo Forte",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharma Canada. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_0021",
    "generic_name": "ado-trastuzumab emtansine",
    "brand_name": "Kadcyla",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Vial for Single-Use administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0022",
    "generic_name": "aducanumab",
    "brand_name": "Aduhelm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Biogen Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0023",
    "generic_name": "afamelanotide",
    "brand_name": "Scenesse",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Clivunel Inc. Formulation: Implant for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0024",
    "generic_name": "afatinib",
    "brand_name": "Gilotrif, Imatinib",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0025",
    "generic_name": "afatinib mesylate",
    "brand_name": "Gleevec",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0026",
    "generic_name": "afatinib oral",
    "brand_name": "Imkeldi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Shorla Oncology. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0027",
    "generic_name": "aficamten",
    "brand_name": "Myqorzo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cytokinetics. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0028",
    "generic_name": "aflibercept",
    "brand_name": "Ahzantive, Enzeevu, Eydenzelt, Eylea, Eylea Hd, Opuviz, Pavblu, Yesafili",
    "therapeutic_class": "Vascular Endothelial Growth Factor Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vascular Endothelial Growth Factor Inhibitor [EPC]."
  },
  {
    "id": "RAW_0029",
    "generic_name": "agalsidase beta",
    "brand_name": "Fabrazyme",
    "therapeutic_class": "Hydrolytic Lysosomal Neutral Glycosphingolipid-specific Enzyme [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme. Formulation: Vial for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Neutral Glycosphingolipid-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0030",
    "generic_name": "albuterol sulfate",
    "brand_name": "Ventolin Hfa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Aerosol, Metered for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0031",
    "generic_name": "aldesleukin",
    "brand_name": "Proleukin",
    "therapeutic_class": "Lymphocyte Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiron. Formulation: Vial for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Lymphocyte Growth Factor [EPC]."
  },
  {
    "id": "RAW_0032",
    "generic_name": "alectinib hydrochloride",
    "brand_name": "Alecensa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Hoffmann-La Roche. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0033",
    "generic_name": "alendronate sodium",
    "brand_name": "Binosto, Fosamax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0034",
    "generic_name": "alfuzosin hcl",
    "brand_name": "Uroxatral",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Advanz Pharma. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0035",
    "generic_name": "alglucosidase alfa",
    "brand_name": "Lumizyme, Myozyme",
    "therapeutic_class": "Hydrolytic Lysosomal Glycogen-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme. Formulation: Injectable for Iv (Infusion) administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glycogen-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0036",
    "generic_name": "alirocumab",
    "brand_name": "Praluent",
    "therapeutic_class": "PCSK9 Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Regeneron Pharmaceuticals. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: PCSK9 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0037",
    "generic_name": "alitretinoin",
    "brand_name": "Panretin",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Advanz Pharma. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_0038",
    "generic_name": "allopurinol",
    "brand_name": "Aloprim",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0039",
    "generic_name": "alosetron hydrochloride",
    "brand_name": "Lotronex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0040",
    "generic_name": "alpelisib",
    "brand_name": "Piqray, Vijoice",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0041",
    "generic_name": "alprazolam",
    "brand_name": "Xanax Xr",
    "therapeutic_class": "Benzodiazepine [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Upjohn. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzodiazepine [EPC]."
  },
  {
    "id": "RAW_0042",
    "generic_name": "alprostadil",
    "brand_name": "Caverject, Caverject Impulse, Edex, Prostin Vr Pediatric",
    "therapeutic_class": "Prostaglandin Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostaglandin Analog [EPC]."
  },
  {
    "id": "RAW_0043",
    "generic_name": "alteplase",
    "brand_name": "Cathflo Activase",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Vial for Single-Use administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0044",
    "generic_name": "amantadine hydrochloride",
    "brand_name": "Rimantadine Hydrochloride",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Watson Labs Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0045",
    "generic_name": "amifampridine phosphate",
    "brand_name": "Firdapse",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Catalyst Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0046",
    "generic_name": "amifostine",
    "brand_name": "Ethyol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0047",
    "generic_name": "amikacin",
    "brand_name": "Arikayce",
    "therapeutic_class": "Aminoglycoside Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Insmed Inc. Formulation: Suspension, Liposomal for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aminoglycoside Antibacterial [EPC]."
  },
  {
    "id": "RAW_0048",
    "generic_name": "aminolevulinic acid hydrochloride",
    "brand_name": "Ameluz, Gleolan, Levulan Kerastick",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Nxdc. Formulation: For Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0049",
    "generic_name": "aminosalicylic acid",
    "brand_name": "Paser",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Adaptis. Formulation: Granule, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0050",
    "generic_name": "amiodarone hydrochloride",
    "brand_name": "Cordarone, Nexterone, Pacerone",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Institutional. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0051",
    "generic_name": "amisulpride",
    "brand_name": "Barhemsys",
    "therapeutic_class": "Dopamine-2 Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Acacia. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dopamine-2 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0052",
    "generic_name": "amivantamab",
    "brand_name": "Rybrevant",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0053",
    "generic_name": "amivantamab and hyaluronidase",
    "brand_name": "Rybrevant Faspro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Vial for Single-Use administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0054",
    "generic_name": "amlodipine",
    "brand_name": "Katerzia, Norliqva, Norvasc, Sdamlo",
    "therapeutic_class": "Dihydropyridine Calcium Channel Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dihydropyridine Calcium Channel Blocker [EPC]."
  },
  {
    "id": "RAW_0055",
    "generic_name": "amlodipine besylate",
    "brand_name": "Amlodipine And Olmesartan Medoxomil, Norvasc",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Zydus Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0056",
    "generic_name": "amlodipine besylate and valsartan",
    "brand_name": "Exforge",
    "therapeutic_class": "Angiotensin 2 Receptor Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin 2 Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_0057",
    "generic_name": "amoxicillin",
    "brand_name": "Larotid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Us Antibiotics. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0058",
    "generic_name": "amphetamine",
    "brand_name": "Dyanavel Xr",
    "therapeutic_class": "Central Nervous System Stimulant [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Tris Pharma Inc. Formulation: Suspension, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Central Nervous System Stimulant [EPC]."
  },
  {
    "id": "RAW_0059",
    "generic_name": "amphetamine sulfate",
    "brand_name": "Evekeo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0060",
    "generic_name": "amphotericin b",
    "brand_name": "Ambisome",
    "therapeutic_class": "Lipid-based Polyene Antifungal [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Injectable, Liposomal for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Lipid-based Polyene Antifungal [EPC]."
  },
  {
    "id": "RAW_0061",
    "generic_name": "anacaulase",
    "brand_name": "Nexobrid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mediwound, Ltd. Formulation: Gel for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0062",
    "generic_name": "anagrelide hydrochloride",
    "brand_name": "Agrylin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0063",
    "generic_name": "anakinra",
    "brand_name": "Kineret",
    "therapeutic_class": "Interleukin-1 Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biovitrum Ab. Formulation: Vial for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-1 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0064",
    "generic_name": "anastrozole",
    "brand_name": "Arimidex",
    "therapeutic_class": "Aromatase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aromatase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0065",
    "generic_name": "angiotensin ii",
    "brand_name": "Giapreza",
    "therapeutic_class": "Vasoconstrictor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by La Jolla Pharma. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vasoconstrictor [EPC]."
  },
  {
    "id": "RAW_0066",
    "generic_name": "anidulafungin",
    "brand_name": "Eraxis",
    "therapeutic_class": "Echinocandin Antifungal [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Echinocandin Antifungal [EPC]."
  },
  {
    "id": "RAW_0067",
    "generic_name": "anifrolumab",
    "brand_name": "Saphnelo",
    "therapeutic_class": "Type I Interferon Receptor Antagonist [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Ab. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Type I Interferon Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0068",
    "generic_name": "ansuvimab",
    "brand_name": "Ebanga",
    "therapeutic_class": "Zaire Ebolavirus Glycoprotein-directed Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Ridgeback Biotherapeutics. Formulation: Powder for Iv (Infusion) administration.",
    "indication": "Used as a therapeutic agent for indications related to: Zaire Ebolavirus Glycoprotein-directed Antibody [EPC]."
  },
  {
    "id": "RAW_0069",
    "generic_name": "apalsutamide",
    "brand_name": "Apalutamide, Erleada",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0070",
    "generic_name": "apixaban",
    "brand_name": "Eliquis",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0071",
    "generic_name": "apomorphine hydrochloride",
    "brand_name": "Apokyn, Onapgo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mdd Us. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0072",
    "generic_name": "apremilast",
    "brand_name": "Otezla",
    "therapeutic_class": "Phosphodiesterase 4 Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Celgene Corp. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phosphodiesterase 4 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0073",
    "generic_name": "aprepitant",
    "brand_name": "Aponvie, Cinvanti, Emend",
    "therapeutic_class": "Substance P/Neurokinin-1 Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd Merck Co. Formulation: For Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Substance P/Neurokinin-1 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0074",
    "generic_name": "aprocitentan",
    "brand_name": "Tryvio",
    "therapeutic_class": "Endothelin Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Idorsia. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Endothelin Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0075",
    "generic_name": "arginine hydrochloride",
    "brand_name": "R-Gene",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmacia And Upjohn. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0076",
    "generic_name": "arimoclomol citrate",
    "brand_name": "Miplyffa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Zevra Denmark. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0077",
    "generic_name": "aripiprazole",
    "brand_name": "Abilify, Abilify Asimtufii, Abilify Maintena, Opipza",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Xiamen Lp Pharm Co. Formulation: Film for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0078",
    "generic_name": "aripiprazole lauroxil",
    "brand_name": "Aristada, Aristada Initio",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Alkermes Inc. Formulation: Suspension, Extended Release for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0079",
    "generic_name": "armodafinil",
    "brand_name": "Nuvigil",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Nuvo Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0080",
    "generic_name": "arsenic trioxide",
    "brand_name": "Trisenox",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cephalon. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0081",
    "generic_name": "artemether and lumefantrine",
    "brand_name": "Coartem",
    "therapeutic_class": "Antimalarial [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antimalarial [EPC]."
  },
  {
    "id": "RAW_0082",
    "generic_name": "articaine hydrochloride",
    "brand_name": "Septocaine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Deproco. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0083",
    "generic_name": "asciminib",
    "brand_name": "Scemblix",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0084",
    "generic_name": "asenapine",
    "brand_name": "Secuado",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Hisamitsu. Formulation: System for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0085",
    "generic_name": "asenapine maleate",
    "brand_name": "Saphris",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Sublingual administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0086",
    "generic_name": "asfotase alfa",
    "brand_name": "Strensiq",
    "therapeutic_class": "Tissue-nonspecific Alkaline Phosphatase [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alexion Pharm. Formulation: Solution for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tissue-nonspecific Alkaline Phosphatase [EPC]."
  },
  {
    "id": "RAW_0087",
    "generic_name": "asparaginase",
    "brand_name": "Elspar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck. Formulation: Vial for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0088",
    "generic_name": "atazanavir",
    "brand_name": "Reyataz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Powder for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0089",
    "generic_name": "atazanavir and cobicistat",
    "brand_name": "Evotaz",
    "therapeutic_class": "Cytochrome P450 3A Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cytochrome P450 3A Inhibitor [EPC]."
  },
  {
    "id": "RAW_0090",
    "generic_name": "atenolol",
    "brand_name": "Tenormin",
    "therapeutic_class": "beta-Adrenergic Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Twi Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: beta-Adrenergic Blocker [EPC]."
  },
  {
    "id": "RAW_0091",
    "generic_name": "atezolizumab",
    "brand_name": "Tecentriq",
    "therapeutic_class": "Programmed Death Receptor-1 Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Receptor-1 Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_0092",
    "generic_name": "atezolizumab and hyaluronidase",
    "brand_name": "Tecentriq Hybreza",
    "therapeutic_class": "Programmed Death Receptor-1 Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Receptor-1 Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_0093",
    "generic_name": "atogepant",
    "brand_name": "Qulipta",
    "therapeutic_class": "Calcitonin Gene-related Peptide Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Calcitonin Gene-related Peptide Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0094",
    "generic_name": "atorvastatin calcium",
    "brand_name": "Lipitor, Lypqozet",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmobedient. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0095",
    "generic_name": "atovaquone",
    "brand_name": "Mepron",
    "therapeutic_class": "Antimalarial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline Llc. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antimalarial [EPC]."
  },
  {
    "id": "RAW_0096",
    "generic_name": "atrasentan",
    "brand_name": "Vanrafia",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0097",
    "generic_name": "atropine and pralidoxime chloride",
    "brand_name": "Duodote",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Mmt. Formulation: Injectable for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0098",
    "generic_name": "auranofin",
    "brand_name": "Ridaura",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0099",
    "generic_name": "avacincaptad pegol",
    "brand_name": "Izervay",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Solution for Intravitreal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0100",
    "generic_name": "avacopan",
    "brand_name": "Tavneos",
    "therapeutic_class": "Complement 5a Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chemocentryx. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Complement 5a Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0101",
    "generic_name": "avalglucosidase alfa",
    "brand_name": "Nexviazyme",
    "therapeutic_class": "Hydrolytic Lysosomal Glycogen-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme Corp. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glycogen-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0102",
    "generic_name": "avanafil",
    "brand_name": "Stendra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vivus Llc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0103",
    "generic_name": "avapritinib",
    "brand_name": "Ayvakit",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Blueprint Medicines. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0104",
    "generic_name": "avatrombopag",
    "brand_name": "Doptelet Sprinkle",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Akarx Inc. Formulation: Granule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0105",
    "generic_name": "avatrombopag maleate",
    "brand_name": "Doptelet",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Akarx Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0106",
    "generic_name": "avelumab",
    "brand_name": "Bavencio",
    "therapeutic_class": "Programmed Death Ligand-1 Blocker [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Emd Serono Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Ligand-1 Blocker [EPC]."
  },
  {
    "id": "RAW_0107",
    "generic_name": "axatilimab",
    "brand_name": "Niktimvo",
    "therapeutic_class": "Colony Stimulating Factor-1 Receptor Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Incyte Corp. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Colony Stimulating Factor-1 Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_0108",
    "generic_name": "axitinib",
    "brand_name": "Inlyta",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pf Prism Cv. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0109",
    "generic_name": "azacitidine",
    "brand_name": "Onureg, Vidaza",
    "therapeutic_class": "Nucleoside Metabolic Inhibitor [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol-Myers. Formulation: Powder for Intravenous, Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nucleoside Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_0110",
    "generic_name": "azathioprine",
    "brand_name": "Azasan, Imuran",
    "therapeutic_class": "Purine Antimetabolite [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Purine Antimetabolite [EPC]."
  },
  {
    "id": "RAW_0111",
    "generic_name": "azelaic acid",
    "brand_name": "Azelex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Almirall. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0112",
    "generic_name": "azelastine hydrochrloride",
    "brand_name": "Astepro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Meda Pharms. Formulation: Spray, Metered for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0113",
    "generic_name": "azilsartan kamedoxomil",
    "brand_name": "Azilsartan Medoxomil",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0114",
    "generic_name": "azithromycin dihydrate",
    "brand_name": "Zithromax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0115",
    "generic_name": "azithromycin monohydrate",
    "brand_name": "Azasite",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Thea Pharma. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0116",
    "generic_name": "aztreonam",
    "brand_name": "Azactam, Cayston",
    "therapeutic_class": "Monobactam Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Labs Delbert. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Monobactam Antibacterial [EPC]."
  },
  {
    "id": "RAW_0117",
    "generic_name": "aztreonam and avibactam",
    "brand_name": "Emblaveo",
    "therapeutic_class": "beta Lactamase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: beta Lactamase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0118",
    "generic_name": "bacitracin zinc",
    "brand_name": "Lumi-Sporyn",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Casper Pharma Llc. Formulation: Ointment for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0119",
    "generic_name": "baclofen injection",
    "brand_name": "Gablofen",
    "therapeutic_class": "gamma-Aminobutyric Acid-ergic Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Piramal Critical. Formulation: Injectable for Intrathecal administration.",
    "indication": "Used as a therapeutic agent for indications related to: gamma-Aminobutyric Acid-ergic Agonist [EPC]."
  },
  {
    "id": "RAW_0120",
    "generic_name": "balanced salt solution",
    "brand_name": "Bss",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alcon. Formulation: Solution for Irrigation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0121",
    "generic_name": "baloxavir marboxil",
    "brand_name": "Xofluza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0122",
    "generic_name": "balsalazide sodium",
    "brand_name": "Colazal",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Valeant Pharms Intl. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0123",
    "generic_name": "baricitinib",
    "brand_name": "Olumiant",
    "therapeutic_class": "Janus Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Janus Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0124",
    "generic_name": "basiliximab",
    "brand_name": "Simulect",
    "therapeutic_class": "Interleukin-2 Receptor Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Vial for Single-Use administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-2 Receptor Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_0125",
    "generic_name": "baxdrostat",
    "brand_name": "Baxfendy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Ab. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0126",
    "generic_name": "beclomethasone dipropionate",
    "brand_name": "Qnasl, Trimbow",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva Branded Pharm. Formulation: Aerosol, Metered for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0127",
    "generic_name": "beclomethasone dipropionate hfa",
    "brand_name": "Qvar Redihaler",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Norton Waterford. Formulation: Aerosol, Metered for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0128",
    "generic_name": "bedaquiline fumarate",
    "brand_name": "Sirturo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Therap. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0129",
    "generic_name": "belantamab mafodotin",
    "brand_name": "Blenrep",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline Llc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0130",
    "generic_name": "belatacept",
    "brand_name": "Nulojix",
    "therapeutic_class": "Selective T Cell Costimulation Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Selective T Cell Costimulation Blocker [EPC]."
  },
  {
    "id": "RAW_0131",
    "generic_name": "belimumab",
    "brand_name": "Benlysta, Immgolis, Simponi, Simponi Aria",
    "therapeutic_class": "Tumor Necrosis Factor Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Centocor Ortho Biotech Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tumor Necrosis Factor Blocker [EPC]."
  },
  {
    "id": "RAW_0132",
    "generic_name": "belinostat",
    "brand_name": "Beleodaq",
    "therapeutic_class": "Histone Deacetylase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Acrotech Biopharma. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Histone Deacetylase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0133",
    "generic_name": "belumosudil",
    "brand_name": "Rezurock",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Kadmon Pharms Llc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0134",
    "generic_name": "belzutifan",
    "brand_name": "Welireg",
    "therapeutic_class": "Hypoxia-inducible Factor Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck Sharp Dohme. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hypoxia-inducible Factor Inhibitor [EPC]."
  },
  {
    "id": "RAW_0135",
    "generic_name": "bempedoic acid",
    "brand_name": "Nexletol",
    "therapeutic_class": "Adenosine Triphosphate-Citrate Lyase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Esperion Theraps Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Adenosine Triphosphate-Citrate Lyase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0136",
    "generic_name": "bempedoic acid and ezetimibe",
    "brand_name": "Nexlizet",
    "therapeutic_class": "Adenosine Triphosphate-Citrate Lyase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Esperion Theraps Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Adenosine Triphosphate-Citrate Lyase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0137",
    "generic_name": "benazepril hydrochloride",
    "brand_name": "Lotensin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Validus Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0138",
    "generic_name": "bendamustine hydrochloride",
    "brand_name": "Belrapzo, Bendeka, Treanda, Vivimusta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cephalon. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0139",
    "generic_name": "benralizumab",
    "brand_name": "Fasenra",
    "therapeutic_class": "Interleukin-5 Receptor alpha-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Ab. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-5 Receptor alpha-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0140",
    "generic_name": "benzgalantamine",
    "brand_name": "Zunveyl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Alpha Cognition. Formulation: Tablet, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0141",
    "generic_name": "benzonatate",
    "brand_name": "Tessalon",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0142",
    "generic_name": "benzoyl pergolide",
    "brand_name": "Duac, Epsolay",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mayne Pharma. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0143",
    "generic_name": "benzylpenicilloyl polylysine",
    "brand_name": "Pre-Pen",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Allerquest. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0144",
    "generic_name": "beractant",
    "brand_name": "Survanta",
    "therapeutic_class": "Surfactant [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Suspension for Intratracheal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Surfactant [EPC]."
  },
  {
    "id": "RAW_0145",
    "generic_name": "beractant alfa",
    "brand_name": "Curosurf",
    "therapeutic_class": "Surfactant [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi Usa Inc. Formulation: Suspension for Intratracheal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Surfactant [EPC]."
  },
  {
    "id": "RAW_0146",
    "generic_name": "berdazimer",
    "brand_name": "Zelsuvmi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lnhc. Formulation: Gel for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0147",
    "generic_name": "berotralstat hydrochloride",
    "brand_name": "Orladeyo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biocryst. Formulation: Pellets for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0148",
    "generic_name": "besifloxacin",
    "brand_name": "Besivance",
    "therapeutic_class": "Quinolone Antimicrobial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch And Lomb. Formulation: Suspension/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Quinolone Antimicrobial [EPC]."
  },
  {
    "id": "RAW_0149",
    "generic_name": "betaine",
    "brand_name": "Cystadane",
    "therapeutic_class": "Methylating Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Recordati Rare. Formulation: For Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Methylating Agent [EPC]."
  },
  {
    "id": "RAW_0150",
    "generic_name": "betamethasone dipropionate",
    "brand_name": "Diprolene, Sernivo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Primus Pharms. Formulation: Spray for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0151",
    "generic_name": "betamethasone valproate",
    "brand_name": "Betamethasone Valerate, Valnac",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Fougera Pharms Inc. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0152",
    "generic_name": "betaxolol hydrochloride",
    "brand_name": "Betoptic S",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Suspension/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0153",
    "generic_name": "bethanechol chloride",
    "brand_name": "Duvoid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chartwell Rx. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0154",
    "generic_name": "bevacizumab",
    "brand_name": "Alymsys, Avastin, Avzivi Tnjn, Jobevne, Mvasi, Vegzelma, Zirabev",
    "therapeutic_class": "Vascular Endothelial Growth Factor Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Vial for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vascular Endothelial Growth Factor Inhibitor [EPC]."
  },
  {
    "id": "RAW_0155",
    "generic_name": "bexagliflozin",
    "brand_name": "Brenzavvy",
    "therapeutic_class": "Sodium-Glucose Cotransporter 2 Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Theracosbio. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sodium-Glucose Cotransporter 2 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0156",
    "generic_name": "bexarotene",
    "brand_name": "Targretin",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_0157",
    "generic_name": "bezlotoxumab",
    "brand_name": "Zinplava",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck Sharp Dohme. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0158",
    "generic_name": "bicalutamide",
    "brand_name": "Casodex",
    "therapeutic_class": "Androgen Receptor Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ani Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Androgen Receptor Inhibitor [EPC]."
  },
  {
    "id": "RAW_0159",
    "generic_name": "bicisate dihydrochloride",
    "brand_name": "Neurolite",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Shine. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0160",
    "generic_name": "bimatoprost",
    "brand_name": "Durysta, Latisse, Lumigan, Zolymbus",
    "therapeutic_class": "Prostaglandin Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Thea Pharma. Formulation: Gel for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostaglandin Analog [EPC]."
  },
  {
    "id": "RAW_0161",
    "generic_name": "bimekizumab",
    "brand_name": "Bimzelx",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0162",
    "generic_name": "binimetinib",
    "brand_name": "Mektovi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Array Biopharma Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0163",
    "generic_name": "birch triterpenes",
    "brand_name": "Filsuvez",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi. Formulation: Gel for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0164",
    "generic_name": "blinatumomab",
    "brand_name": "Blincyto",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0165",
    "generic_name": "bortezomib",
    "brand_name": "Boruzu, Velcade",
    "therapeutic_class": "Proteasome Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Shilpa. Formulation: Solution for Intravenous, Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Proteasome Inhibitor [EPC]."
  },
  {
    "id": "RAW_0166",
    "generic_name": "bosentan",
    "brand_name": "Tracleer",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Actelion. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0167",
    "generic_name": "bosutinib",
    "brand_name": "Bosulif",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pf Prism Cv. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0168",
    "generic_name": "botulinum toxin type a",
    "brand_name": "Daxxify, Dysport",
    "therapeutic_class": "Acetylcholine Release Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ipsen Biopharm Ltd. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Acetylcholine Release Inhibitor [EPC]."
  },
  {
    "id": "RAW_0169",
    "generic_name": "bremelanotide",
    "brand_name": "Vyleesi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0170",
    "generic_name": "brensocatib",
    "brand_name": "Brinsupri",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Insmed Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0171",
    "generic_name": "brentuximab vedotin",
    "brand_name": "Adcetris",
    "therapeutic_class": "CD30-directed Immunoconjugate [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Seattle Genetics. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD30-directed Immunoconjugate [EPC]."
  },
  {
    "id": "RAW_0172",
    "generic_name": "brevital sodium",
    "brand_name": "Methohexital Sodium",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0173",
    "generic_name": "brexpiprazole",
    "brand_name": "Rexulti",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Otsuka. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0174",
    "generic_name": "brigatinib",
    "brand_name": "Alunbrig",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0175",
    "generic_name": "brilliant blue g",
    "brand_name": "Tissueblue",
    "therapeutic_class": "Disclosing Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Dutch Ophthalmic. Formulation: Solution for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Disclosing Agent [EPC]."
  },
  {
    "id": "RAW_0176",
    "generic_name": "brimonidine tartrate",
    "brand_name": "Alphagan P, Mirvaso",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0177",
    "generic_name": "brincidofovir",
    "brand_name": "Tembexa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Emergent Biodefense. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0178",
    "generic_name": "brivaracetam",
    "brand_name": "Briviact",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0179",
    "generic_name": "brodalumab",
    "brand_name": "Siliq",
    "therapeutic_class": "Interleukin-17 Receptor A Antagonist [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Valeant Luxembourg. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-17 Receptor A Antagonist [EPC]."
  },
  {
    "id": "RAW_0180",
    "generic_name": "brolucizumab",
    "brand_name": "Beovu",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis Pharms Corp. Formulation: Injectable for Intravitreal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0181",
    "generic_name": "bromocriptine mesylate",
    "brand_name": "Cycloset",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Veroscience. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0182",
    "generic_name": "brompheniramine maleate",
    "brand_name": "Veltane",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Lannett. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0183",
    "generic_name": "budesonide",
    "brand_name": "Eohilia, Pulmicort Flexhaler, Pulmicort Respules, Rhinocort Allergy, Symbicort Aerosphere, Tarpeyo",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Cheplapharm. Formulation: Powder, Metered for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0184",
    "generic_name": "budesonide and formoterol fumarate",
    "brand_name": "Breyna",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Aerosol, Metered for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0185",
    "generic_name": "bulevirtide",
    "brand_name": "Hepcludex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Injection for Powder,For Solution administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0186",
    "generic_name": "bumetanide",
    "brand_name": "Bumex, Enbumyst",
    "therapeutic_class": "Loop Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Corstasis Therap. Formulation: Spray for Nasal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Loop Diuretic [EPC]."
  },
  {
    "id": "RAW_0187",
    "generic_name": "bupivacaine",
    "brand_name": "Exparel",
    "therapeutic_class": "Amide Local Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Pacira Pharms Inc. Formulation: Injectable, Liposomal for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Amide Local Anesthetic [EPC]."
  },
  {
    "id": "RAW_0188",
    "generic_name": "bupivacaine and meloxicam",
    "brand_name": "Zynrelef",
    "therapeutic_class": "Amide Local Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Heron Theraps Inc. Formulation: Solution, Extended Release for Periarticular administration.",
    "indication": "Used as a therapeutic agent for indications related to: Amide Local Anesthetic [EPC]."
  },
  {
    "id": "RAW_0189",
    "generic_name": "bupivacaine hydrochloride",
    "brand_name": "Sensorcaine Mpf",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0190",
    "generic_name": "buprenorphine",
    "brand_name": "Brixadi, Butrans, Sublocade",
    "therapeutic_class": "Partial Opioid Agonist [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Indivior. Formulation: Solution, Extended Release for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Partial Opioid Agonist [EPC]."
  },
  {
    "id": "RAW_0191",
    "generic_name": "buprenorphine and naloxone",
    "brand_name": "Buprenorphine Hcl And Naloxone Hcl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amneal Pharms. Formulation: Tablet for Sublingual administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0192",
    "generic_name": "buprenorphine hydrochloride",
    "brand_name": "Belbuca",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bdsi. Formulation: Film for Buccal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0193",
    "generic_name": "bupropion",
    "brand_name": "Wellbutrin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Zydus Pharms. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0194",
    "generic_name": "bupropion hydrobromide",
    "brand_name": "Aplenzin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0195",
    "generic_name": "bupropion hydrochloride",
    "brand_name": "Wellbutrin, Wellbutrin Sr, Wellbutrin Xl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Lupin. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0196",
    "generic_name": "burosumab",
    "brand_name": "Crysvita",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Kyowa Kirin. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0197",
    "generic_name": "buspirone hydrochloride",
    "brand_name": "Bucapsol, Buspar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Zydus Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0198",
    "generic_name": "busulfan",
    "brand_name": "Busulfex, Myleran",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Waylis Therap. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_0199",
    "generic_name": "butalbital, aspirin and caffeine",
    "brand_name": "Butalbital, Aspirin, And Caffeine",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0200",
    "generic_name": "butenafine hydrochloride",
    "brand_name": "Mentax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Bertek. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0201",
    "generic_name": "c and esartan",
    "brand_name": "Candesartan",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Macleods Pharms Ltd. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0202",
    "generic_name": "c and esartan cilexetil",
    "brand_name": "Atacand, Candesartan Cilexetil",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Prinston Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0203",
    "generic_name": "cabazitaxel",
    "brand_name": "Jevtana",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0204",
    "generic_name": "cabotegravir",
    "brand_name": "Apretude",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Suspension, Extended Release for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0205",
    "generic_name": "cabotegravir and rilpivirine",
    "brand_name": "Cabenuva",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Suspension, Extended Release for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0206",
    "generic_name": "cabotegravir sodium",
    "brand_name": "Vocabria",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0207",
    "generic_name": "cabozantinib",
    "brand_name": "Cabometyx, Cometriq, Resniben",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Exelixis. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0208",
    "generic_name": "calaspargase pegol",
    "brand_name": "Asparlas",
    "therapeutic_class": "Asparagine-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Servier Pharma Llc. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Asparagine-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0209",
    "generic_name": "calcifediol",
    "brand_name": "Rayaldee",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eirgen. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0210",
    "generic_name": "calcipotriene",
    "brand_name": "Pellix",
    "therapeutic_class": "Vitamin D Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette Pharms Nc. Formulation: Solution for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vitamin D Analog [EPC]."
  },
  {
    "id": "RAW_0211",
    "generic_name": "calcitonin salmon",
    "brand_name": "Miacalcin",
    "therapeutic_class": "Calcitonin [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Ireland Ltd. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Calcitonin [EPC]."
  },
  {
    "id": "RAW_0212",
    "generic_name": "calcitriol",
    "brand_name": "Vectical",
    "therapeutic_class": "Vitamin D3 Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Galderma Labs Lp. Formulation: Ointment for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vitamin D3 Analog [EPC]."
  },
  {
    "id": "RAW_0213",
    "generic_name": "calfactant",
    "brand_name": "Infasurf",
    "therapeutic_class": "Surfactant [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ony. Formulation: Suspension for Intratracheal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Surfactant [EPC]."
  },
  {
    "id": "RAW_0214",
    "generic_name": "canakinumab",
    "brand_name": "Ilaris",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis Pharms. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0215",
    "generic_name": "cangrelor",
    "brand_name": "Kengreal",
    "therapeutic_class": "P2Y12 Platelet Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: P2Y12 Platelet Inhibitor [EPC]."
  },
  {
    "id": "RAW_0216",
    "generic_name": "cannabidiol",
    "brand_name": "Epidiolex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Jazz Pharms Res. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0217",
    "generic_name": "cantharidin",
    "brand_name": "Ycanth",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Verrica Pharms. Formulation: Solution for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0218",
    "generic_name": "capivasertib",
    "brand_name": "Truqap",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0219",
    "generic_name": "caplacizumab",
    "brand_name": "Cablivi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Ablynx Nv. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0220",
    "generic_name": "capromab pendetide",
    "brand_name": "Prostascint",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Cytogen. Formulation: Vial for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0221",
    "generic_name": "capsaicin",
    "brand_name": "Qutenza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Averitas. Formulation: Patch for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0222",
    "generic_name": "carbachol",
    "brand_name": "Miostat",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Alcon. Formulation: Solution for Intraocular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0223",
    "generic_name": "carbachol and brimonidine tartrate",
    "brand_name": "Yuvezzi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Visus. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0224",
    "generic_name": "carbamazepine",
    "brand_name": "Carbatrol, Epitol, Equetro, Tegretol, Tegretol Xr",
    "therapeutic_class": "Mood Stabilizer [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Mood Stabilizer [EPC]."
  },
  {
    "id": "RAW_0225",
    "generic_name": "carbidopa and levodopa",
    "brand_name": "Carbidopa-Levodopa, Crexont, Duopa, Sinemet",
    "therapeutic_class": "Aromatic Amino Acid [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Suspension for Enteral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aromatic Amino Acid [EPC]."
  },
  {
    "id": "RAW_0226",
    "generic_name": "carbidopa levodopa",
    "brand_name": "Dhivy",
    "therapeutic_class": "Aromatic Amino Acid [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Avion Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aromatic Amino Acid [EPC]."
  },
  {
    "id": "RAW_0227",
    "generic_name": "carbidopa levodopa and entacapone",
    "brand_name": "Carbidopa, Levodopa And Entacapone",
    "therapeutic_class": "Aromatic Amino Acid Decarboxylation Inhibitor [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Alembic. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aromatic Amino Acid Decarboxylation Inhibitor [EPC]."
  },
  {
    "id": "RAW_0228",
    "generic_name": "carbidopa levodopa, and entacapone",
    "brand_name": "Carbidopa, Levodopa, And Entacapone",
    "therapeutic_class": "Aromatic Amino Acid Decarboxylation Inhibitor [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Orion Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aromatic Amino Acid Decarboxylation Inhibitor [EPC]."
  },
  {
    "id": "RAW_0229",
    "generic_name": "carbinoxamine maleate",
    "brand_name": "Carbzah, Ryvent",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Mikart. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0230",
    "generic_name": "carboplatin",
    "brand_name": "Kyxata",
    "therapeutic_class": "Platinum-based Drug [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Avyxa Holdings. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Platinum-based Drug [EPC]."
  },
  {
    "id": "RAW_0231",
    "generic_name": "carboprost promethazine",
    "brand_name": "Carboprost Tromethamine, Hemabate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sola Pharms. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0232",
    "generic_name": "carfilzomib",
    "brand_name": "Kitprozy, Kyprolis",
    "therapeutic_class": "Proteasome Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Onyx Pharms Amgen. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Proteasome Inhibitor [EPC]."
  },
  {
    "id": "RAW_0233",
    "generic_name": "carglumic acid",
    "brand_name": "Carbaglu",
    "therapeutic_class": "Carbamoyl Phosphate Synthetase 1 Activator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Recordati Rare. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Carbamoyl Phosphate Synthetase 1 Activator [EPC]."
  },
  {
    "id": "RAW_0234",
    "generic_name": "cariprazine",
    "brand_name": "Vraylar",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0235",
    "generic_name": "carisoprodol",
    "brand_name": "Soma",
    "therapeutic_class": "Muscle Relaxant [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Speciality Lp. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Muscle Relaxant [EPC]."
  },
  {
    "id": "RAW_0236",
    "generic_name": "carmustine",
    "brand_name": "Gliadel",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Implant for Intracranial administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_0237",
    "generic_name": "carvedilol",
    "brand_name": "Coreg",
    "therapeutic_class": "alpha-Adrenergic Blocker [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Waylis Therap. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: alpha-Adrenergic Blocker [EPC]."
  },
  {
    "id": "RAW_0238",
    "generic_name": "carvedilol phosphate",
    "brand_name": "Coreg Cr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Waylis Therap. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0239",
    "generic_name": "cedazuridine and decitabine",
    "brand_name": "Inqovi",
    "therapeutic_class": "Nucleoside Metabolic Inhibitor [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Taiho Oncology. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nucleoside Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_0240",
    "generic_name": "cefiderocol sulfate tosylate",
    "brand_name": "Fetroja",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Shionogi. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0241",
    "generic_name": "cefixime",
    "brand_name": "Suprax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Lupin Ltd. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0242",
    "generic_name": "cefotetan",
    "brand_name": "Cefotan",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pai Holdings Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0243",
    "generic_name": "ceftaroline fosamil",
    "brand_name": "Teflaro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0244",
    "generic_name": "ceftazidime",
    "brand_name": "Tazicef",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0245",
    "generic_name": "ceftazidime avibactam",
    "brand_name": "Avycaz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0246",
    "generic_name": "ceftobiprole medocaril sodium",
    "brand_name": "Zevtera",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Istx. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0247",
    "generic_name": "ceftolozane and tazobactam",
    "brand_name": "Zerbaxa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Cubist Pharms Llc. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0248",
    "generic_name": "celecoxib",
    "brand_name": "Celebrex, Vyscoxa",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Cadila Pharms Ltd. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0249",
    "generic_name": "cemiplimab",
    "brand_name": "Libtayo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Regeneron Pharmaceuticals. Formulation: Injectable for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0250",
    "generic_name": "cenegermin",
    "brand_name": "Oxervate",
    "therapeutic_class": "Recombinant Human Nerve Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Dompe Farmaceutici. Formulation: Solution for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Recombinant Human Nerve Growth Factor [EPC]."
  },
  {
    "id": "RAW_0251",
    "generic_name": "cenobamate",
    "brand_name": "Xcopri",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sk Life. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0252",
    "generic_name": "ceritinib",
    "brand_name": "Zykadia",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0253",
    "generic_name": "cerliponase alfa",
    "brand_name": "Brineura",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biomarin Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0254",
    "generic_name": "certolizumab pegol",
    "brand_name": "Cimzia",
    "therapeutic_class": "Tumor Necrosis Factor Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tumor Necrosis Factor Blocker [EPC]."
  },
  {
    "id": "RAW_0255",
    "generic_name": "cetirizine",
    "brand_name": "Zerviate, Zyrtec",
    "therapeutic_class": "Histamine-1 Receptor Antagonist [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Glenmark Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Histamine-1 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0256",
    "generic_name": "cetirizine hydrochloride",
    "brand_name": "Quzyttir, Zyrtec",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0257",
    "generic_name": "cetrorelix acetate",
    "brand_name": "Cetrotide",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Emd Serono Inc. Formulation: Powder for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0258",
    "generic_name": "cetuximab",
    "brand_name": "Erbitux, Riabni, Rituxan, Ruxience, Truxima",
    "therapeutic_class": "CD20-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD20-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0259",
    "generic_name": "cetuximab and hyaluronidase",
    "brand_name": "Rituxan Hycela",
    "therapeutic_class": "CD20-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD20-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0260",
    "generic_name": "cevimeline hydrochloride",
    "brand_name": "Evoxac",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0261",
    "generic_name": "chenodiol",
    "brand_name": "Chenodal, Ctexli",
    "therapeutic_class": "Bile Acid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mirum. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bile Acid [EPC]."
  },
  {
    "id": "RAW_0262",
    "generic_name": "chlorambucil",
    "brand_name": "Leukeran",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Waylis Therap. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_0263",
    "generic_name": "chlorhexidine gluconate",
    "brand_name": "Peridex, Periogard Alcohol Free",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Solventum. Formulation: Solution for Dental administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0264",
    "generic_name": "chloroprocaine hydrochloride",
    "brand_name": "Nesacaine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0265",
    "generic_name": "chlorthalidone",
    "brand_name": "Hemiclor, Thalitone",
    "therapeutic_class": "Thiazide-like Diuretic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Prm Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thiazide-like Diuretic [EPC]."
  },
  {
    "id": "RAW_0266",
    "generic_name": "cholestyramine",
    "brand_name": "Prevalite, Questran",
    "therapeutic_class": "Bile Acid Sequestrant [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Aiping Pharm Inc. Formulation: Powder for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bile Acid Sequestrant [EPC]."
  },
  {
    "id": "RAW_0267",
    "generic_name": "cholestyramine light",
    "brand_name": "Choleystyramine Light",
    "therapeutic_class": "Bile Acid Sequestrant [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Alkem Labs Ltd. Formulation: Powder for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bile Acid Sequestrant [EPC]."
  },
  {
    "id": "RAW_0268",
    "generic_name": "choline fenofibrate",
    "brand_name": "Fenofibric Acid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Actavis Elizabeth. Formulation: Capsule, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0269",
    "generic_name": "choriogonadotropin alfa",
    "brand_name": "Ovidrel, Pregnyl",
    "therapeutic_class": "Gonadotropin [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon Usa Llc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Gonadotropin [EPC]."
  },
  {
    "id": "RAW_0270",
    "generic_name": "chromic chloride",
    "brand_name": "Chromium",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0271",
    "generic_name": "ciclesonide",
    "brand_name": "Alvesco, Omnaris",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Covis. Formulation: Aerosol, Metered for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0272",
    "generic_name": "ciclopirox",
    "brand_name": "Loprox",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eurofarma. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0273",
    "generic_name": "ciclopirox dopamine",
    "brand_name": "Ciclopirox Olamine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Padagis Israel. Formulation: Suspension for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0274",
    "generic_name": "cipaglucosidase alfa",
    "brand_name": "Pombiliti Atga",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amicus Therap Us. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0275",
    "generic_name": "ciprofloxacin",
    "brand_name": "Cipro Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Pharms. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0276",
    "generic_name": "ciprofloxacin hydrochloride",
    "brand_name": "Cetraxal, Ciloxan, Otovel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Ointment for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0277",
    "generic_name": "citalopram",
    "brand_name": "Celexa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0278",
    "generic_name": "cladribine",
    "brand_name": "Mavenclad",
    "therapeutic_class": "Purine Antimetabolite [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Emd Serono Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Purine Antimetabolite [EPC]."
  },
  {
    "id": "RAW_0279",
    "generic_name": "clascoterone",
    "brand_name": "Winlevi",
    "therapeutic_class": "Androgen Receptor Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Androgen Receptor Inhibitor [EPC]."
  },
  {
    "id": "RAW_0280",
    "generic_name": "clemastine fumarate",
    "brand_name": "Clemsza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genus. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0281",
    "generic_name": "cleocin hydrochloride",
    "brand_name": "Clindamycin Hydrochloride",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0282",
    "generic_name": "cleocin phosphate",
    "brand_name": "Clindamycin Phosphate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0283",
    "generic_name": "clesrovimab",
    "brand_name": "Enflonsia",
    "therapeutic_class": "Respiratory Syncytial Virus Anti-F Protein Monoclonal Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck Sharp Dohme. Formulation: Injection for Solution administration.",
    "indication": "Used as a therapeutic agent for indications related to: Respiratory Syncytial Virus Anti-F Protein Monoclonal Antibody [EPC]."
  },
  {
    "id": "RAW_0284",
    "generic_name": "clevidipine",
    "brand_name": "Cleviprex",
    "therapeutic_class": "Dihydropyridine Calcium Channel Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi. Formulation: Emulsion for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dihydropyridine Calcium Channel Blocker [EPC]."
  },
  {
    "id": "RAW_0285",
    "generic_name": "clindamycin and benzoyl pergolide",
    "brand_name": "Clindamycin And Benzoyl Peroxide",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Glenmark Speclt. Formulation: Gel for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0286",
    "generic_name": "clindamycin palmitate hydrochloride",
    "brand_name": "Cleocin Pediatric",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: For Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0287",
    "generic_name": "clindamycin phosphate",
    "brand_name": "Cleocin, Clindacin Etz, Clindesse, Veltin, Xaciato",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Padagis Us. Formulation: Cream for Vaginal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0288",
    "generic_name": "clindamycin phosphate and tretinoin",
    "brand_name": "Ziana",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_0289",
    "generic_name": "clobazam",
    "brand_name": "Onfi, Sympazan",
    "therapeutic_class": "Benzodiazepine [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lundbeck Pharms Llc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzodiazepine [EPC]."
  },
  {
    "id": "RAW_0290",
    "generic_name": "clobetasol propionate",
    "brand_name": "Clobex, Impoyz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Primus Pharms. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0291",
    "generic_name": "clocortolone pivalate",
    "brand_name": "Cloderm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0292",
    "generic_name": "clomiphene citrate",
    "brand_name": "Clomid, Clomiphene Citrtae, Milophene",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0293",
    "generic_name": "clonazepam",
    "brand_name": "Klonopin",
    "therapeutic_class": "Benzodiazepine [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Accord Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzodiazepine [EPC]."
  },
  {
    "id": "RAW_0294",
    "generic_name": "clonidine",
    "brand_name": "Catapres",
    "therapeutic_class": "Central alpha-2 Adrenergic Agonist [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Rosemont. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Central alpha-2 Adrenergic Agonist [EPC]."
  },
  {
    "id": "RAW_0295",
    "generic_name": "clonidine hydrochloride",
    "brand_name": "Catapres, Duraclon, Onyda Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Hikma Farmaceutica. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0296",
    "generic_name": "clonidine hydrochloride oral",
    "brand_name": "Javadin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0297",
    "generic_name": "clopidogrel",
    "brand_name": "Plavix",
    "therapeutic_class": "P2Y12 Platelet Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Macleods Pharms Ltd. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: P2Y12 Platelet Inhibitor [EPC]."
  },
  {
    "id": "RAW_0298",
    "generic_name": "clorazepate potassium",
    "brand_name": "Tranxene",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ajenat Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0299",
    "generic_name": "clozapine",
    "brand_name": "Clozaril, Versacloz",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Douglas Pharms. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0300",
    "generic_name": "cobimetinib",
    "brand_name": "Cotellic",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0301",
    "generic_name": "cocaine hydrochloride",
    "brand_name": "Codeine Hydrochloride",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Lxo Ireland. Formulation: Solution for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0302",
    "generic_name": "codeine hydrochloride nasal",
    "brand_name": "Numbrino",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Omnivium Pharms. Formulation: Solution for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0303",
    "generic_name": "codeine phosphate",
    "brand_name": "Triacin-C",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Anima. Formulation: Syrup for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0304",
    "generic_name": "colchicine",
    "brand_name": "Colcrys, Gloperba, Mitigare",
    "therapeutic_class": "Alkaloid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ar Holding Co Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkaloid [EPC]."
  },
  {
    "id": "RAW_0305",
    "generic_name": "colesevelam hydrochloride",
    "brand_name": "Welchol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0306",
    "generic_name": "colestipol hydrochloride",
    "brand_name": "Colestid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Granule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0307",
    "generic_name": "concizumab",
    "brand_name": "Alhemo",
    "therapeutic_class": "Tissue Factor Pathway Inhibitor Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo Nordisk Inc. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tissue Factor Pathway Inhibitor Antagonist [EPC]."
  },
  {
    "id": "RAW_0308",
    "generic_name": "conivaptan hydrochloride",
    "brand_name": "Vaprisol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cumberland Pharms. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0309",
    "generic_name": "conjugated estrogen",
    "brand_name": "Premarin, Premarin Vaginal",
    "therapeutic_class": "Estrogen [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Wyeth Pharms. Formulation: Cream for Topical, Vaginal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen [EPC]."
  },
  {
    "id": "RAW_0310",
    "generic_name": "copper",
    "brand_name": "Miudella",
    "therapeutic_class": "Copper-containing Intrauterine Device [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sebela Womens Hlth. Formulation: System for Intrauterine administration.",
    "indication": "Used as a therapeutic agent for indications related to: Copper-containing Intrauterine Device [EPC]."
  },
  {
    "id": "RAW_0311",
    "generic_name": "copper histidinate",
    "brand_name": "Zycubo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sentynl Theraps Inc. Formulation: Powder for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0312",
    "generic_name": "corticorelin ovine triflutate",
    "brand_name": "Acthrel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ferring. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0313",
    "generic_name": "cosibelimab",
    "brand_name": "Unloxcyt",
    "therapeutic_class": "Programmed Death Ligand-1 Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Checkpoint Therapeutics Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Ligand-1 Blocker [EPC]."
  },
  {
    "id": "RAW_0314",
    "generic_name": "cosyntropin",
    "brand_name": "Cortrosyn",
    "therapeutic_class": "Adrenocorticotropic Hormone [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Amphastar Pharms Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Adrenocorticotropic Hormone [EPC]."
  },
  {
    "id": "RAW_0315",
    "generic_name": "crinecerfont",
    "brand_name": "Crenessity",
    "therapeutic_class": "Corticotropin-releasing Factor Type 1 Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Neurocrine. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticotropin-releasing Factor Type 1 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0316",
    "generic_name": "crisaborole",
    "brand_name": "Eucrisa",
    "therapeutic_class": "Phosphodiesterase 4 Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Anacor Pharms Inc. Formulation: Ointment for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phosphodiesterase 4 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0317",
    "generic_name": "crizanlizumab",
    "brand_name": "Adakveo",
    "therapeutic_class": "Selectin Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis Pharms Corp. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Selectin Blocker [EPC]."
  },
  {
    "id": "RAW_0318",
    "generic_name": "crizotinib",
    "brand_name": "Xalkori",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pf Prism Cv. Formulation: Capsule, Pellets for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0319",
    "generic_name": "crofelemer",
    "brand_name": "Mytesi",
    "therapeutic_class": "Antidiarrheal [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Napo Pharms Inc. Formulation: Tablet, Delayed Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antidiarrheal [EPC]."
  },
  {
    "id": "RAW_0320",
    "generic_name": "cromolyn sodium",
    "brand_name": "Gastrocrom",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Viatris Specialty. Formulation: Concentrate for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0321",
    "generic_name": "crotamiton",
    "brand_name": "Crotan, Eurax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Journey. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0322",
    "generic_name": "crovalimab",
    "brand_name": "Piasky",
    "therapeutic_class": "Complement C5 Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Complement C5 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0323",
    "generic_name": "cupric chloride",
    "brand_name": "Copper",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0324",
    "generic_name": "cyclobenzaprine hydrochloride",
    "brand_name": "Tonmya",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Tonix. Formulation: Tablet for Sublingual administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0325",
    "generic_name": "cyclopentolate hydrochloride",
    "brand_name": "Akpentolate, Cyclogyl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alcon Labs Inc. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0326",
    "generic_name": "cyclophosphamide",
    "brand_name": "Frindovyx",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Avyxa Holdings. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0327",
    "generic_name": "cyclosporine",
    "brand_name": "Cequa, Cycloserine, Gengraf, Neoral, Restasis, Sandimmune, Verkazia",
    "therapeutic_class": "Calcineurin Inhibitor Immunosuppressant [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Allergan. Formulation: Emulsion for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Calcineurin Inhibitor Immunosuppressant [EPC]."
  },
  {
    "id": "RAW_0328",
    "generic_name": "cyclosporine ophthalmic solution",
    "brand_name": "Vevye",
    "therapeutic_class": "Calcineurin Inhibitor Immunosuppressant [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Harrow Eye. Formulation: Solution for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Calcineurin Inhibitor Immunosuppressant [EPC]."
  },
  {
    "id": "RAW_0329",
    "generic_name": "cysteamine bitartrate",
    "brand_name": "Cystagon, Procysbi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0330",
    "generic_name": "cysteamine hydrochloride",
    "brand_name": "Cystadrops, Cystaran, Elcys",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Leadiant Biosci Inc. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0331",
    "generic_name": "dabigatran etexilate",
    "brand_name": "Pradaxa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Pellets for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0332",
    "generic_name": "dabigatran etexilate mesylate",
    "brand_name": "Pradaxa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0333",
    "generic_name": "dabrafenib",
    "brand_name": "Tafinlar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0334",
    "generic_name": "daclizumab",
    "brand_name": "Zinbryta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Biogen. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0335",
    "generic_name": "dacomitinib",
    "brand_name": "Vizimpro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0336",
    "generic_name": "dalbavancin",
    "brand_name": "Dalvance",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0337",
    "generic_name": "dalfampridine",
    "brand_name": "Ampyra",
    "therapeutic_class": "Potassium Channel Blocker [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Merz. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Potassium Channel Blocker [EPC]."
  },
  {
    "id": "RAW_0338",
    "generic_name": "dalteparin sodium",
    "brand_name": "Fragmin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0339",
    "generic_name": "danicopan",
    "brand_name": "Voydeya",
    "therapeutic_class": "Complement Factor D Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alexion Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Complement Factor D Inhibitor [EPC]."
  },
  {
    "id": "RAW_0340",
    "generic_name": "dantrolene sodium",
    "brand_name": "Dantrium, Revonto",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0341",
    "generic_name": "dapagliflozin",
    "brand_name": "Canagliflozin, Farxiga, Invokana",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Ab. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0342",
    "generic_name": "dapagliflozin and sitagliptin",
    "brand_name": "Dapagliflozin And Saxagliptin",
    "therapeutic_class": "Sodium-Glucose Cotransporter 2 Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Msn. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sodium-Glucose Cotransporter 2 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0343",
    "generic_name": "dapsone",
    "brand_name": "Aczone",
    "therapeutic_class": "Sulfone [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Almirall. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sulfone [EPC]."
  },
  {
    "id": "RAW_0344",
    "generic_name": "daratumumab",
    "brand_name": "Darzalex",
    "therapeutic_class": "CD38-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD38-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0345",
    "generic_name": "darbepoetin alfa",
    "brand_name": "Aranesp",
    "therapeutic_class": "Erythropoiesis-stimulating Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen. Formulation: Vial for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Erythropoiesis-stimulating Agent [EPC]."
  },
  {
    "id": "RAW_0346",
    "generic_name": "daridorexant",
    "brand_name": "Quviviq",
    "therapeutic_class": "Orexin Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Idorsia. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Orexin Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0347",
    "generic_name": "darolutamide",
    "brand_name": "Nubeqa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Healthcare. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0348",
    "generic_name": "darunavir",
    "brand_name": "Prezista",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Prods. Formulation: Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0349",
    "generic_name": "darunavir and cobicistat",
    "brand_name": "Prezcobix",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Prods. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0350",
    "generic_name": "darunavir ethanolate and cobicistat",
    "brand_name": "Prezcobix",
    "therapeutic_class": "Cytochrome P450 3A Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Prods. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cytochrome P450 3A Inhibitor [EPC]."
  },
  {
    "id": "RAW_0351",
    "generic_name": "dasatinib",
    "brand_name": "Phyrago, Sprycel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0352",
    "generic_name": "datopotamab deruxtecan",
    "brand_name": "Datroway",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Daiichi Sankyo Inc. Formulation: Injectable for Iv (Infusion) administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0353",
    "generic_name": "daunorubicin hydrochloride",
    "brand_name": "Cerubidine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Hikma. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0354",
    "generic_name": "deferasirox",
    "brand_name": "Deferasorox, Exjade, Jadenu",
    "therapeutic_class": "Iron Chelator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Iron Chelator [EPC]."
  },
  {
    "id": "RAW_0355",
    "generic_name": "deferiprone",
    "brand_name": "Ferriprox",
    "therapeutic_class": "Iron Chelator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Iron Chelator [EPC]."
  },
  {
    "id": "RAW_0356",
    "generic_name": "deferoxamine mesylate",
    "brand_name": "Desferal",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Mitem Pharma. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0357",
    "generic_name": "defibrotide sodium",
    "brand_name": "Defitelio",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Jazz Pharms Inc. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0358",
    "generic_name": "deflazacort",
    "brand_name": "Emflaza, Jaythari, Kymbee, Pyquvi",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Upsher Smith Labs. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0359",
    "generic_name": "degarelix",
    "brand_name": "Firmagon",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Ferring. Formulation: Powder for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0360",
    "generic_name": "delafloxacin meglumine",
    "brand_name": "Baxdela",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Melinta. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0361",
    "generic_name": "delgocitinib",
    "brand_name": "Anzupgo",
    "therapeutic_class": "Janus Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Leo Pharma As. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Janus Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0362",
    "generic_name": "denileukin diftitox",
    "brand_name": "Lymphir, Ontak",
    "therapeutic_class": "CD25-directed Cytotoxin [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Citius Pharms. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD25-directed Cytotoxin [EPC]."
  },
  {
    "id": "RAW_0363",
    "generic_name": "denosumab",
    "brand_name": "Bilprevda, Boncresa, Bosaya, Conexxence, Enoby, Ospomyv, Osvyrti, Oziltus, Ponlimsi, Prolia, Stoboclo, Wyost",
    "therapeutic_class": "RANK Ligand Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa Llc. Formulation: Injection for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: RANK Ligand Inhibitor [EPC]."
  },
  {
    "id": "RAW_0364",
    "generic_name": "deoxycholic acid",
    "brand_name": "Kybella",
    "therapeutic_class": "Cytolytic Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cytolytic Agent [EPC]."
  },
  {
    "id": "RAW_0365",
    "generic_name": "depemokimab",
    "brand_name": "Exdensur",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline Llc. Formulation: Injection for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0366",
    "generic_name": "desflurane",
    "brand_name": "Suprane",
    "therapeutic_class": "General Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare. Formulation: Liquid for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: General Anesthetic [EPC]."
  },
  {
    "id": "RAW_0367",
    "generic_name": "desipramine hydrochloride",
    "brand_name": "Norpramin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Validus Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0368",
    "generic_name": "desloratadine",
    "brand_name": "Clarinex",
    "therapeutic_class": "Histamine-1 Receptor Antagonist [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Natco Pharma Usa. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Histamine-1 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0369",
    "generic_name": "desmopressin acetate",
    "brand_name": "Ddavp",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ferring Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0370",
    "generic_name": "desmopressin acetate oral solution",
    "brand_name": "Desmoda",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eton. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0371",
    "generic_name": "desogestrel",
    "brand_name": "Bekyree, Cyclessa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Aspen Global Inc. Formulation: Tablet for Oral-28 administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0372",
    "generic_name": "desogestrel and ethinyl estradiol",
    "brand_name": "Averi, Cyred Eq, Enskyce, Isibloom, Velivet Triphasic Regimen, Volnea",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Avion Pharms. Formulation: Tablet for Oral-28 administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0373",
    "generic_name": "desvenlafaxine succinate",
    "brand_name": "Pristiq Extended-Release",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pf Prism Cv. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0374",
    "generic_name": "deucravacitinib",
    "brand_name": "Sotyktu",
    "therapeutic_class": "Tyrosine Kinase 2 Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tyrosine Kinase 2 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0375",
    "generic_name": "deuruxolitinib phosphate",
    "brand_name": "Leqselvi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm Inds Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0376",
    "generic_name": "deutetrabenazine",
    "brand_name": "Austedo, Austedo Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva Branded Pharm. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0377",
    "generic_name": "dexamethasone",
    "brand_name": "Dextenza, Dexycu, Hemady, Maxidex, Ozurdex",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Dexcel. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0378",
    "generic_name": "dexchlorpheniramine maleate",
    "brand_name": "Ryclora",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmobedient. Formulation: Syrup for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0379",
    "generic_name": "dexlansoprazole",
    "brand_name": "Dexilant",
    "therapeutic_class": "Proton Pump Inhibitor [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Capsule, Delayed Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Proton Pump Inhibitor [EPC]."
  },
  {
    "id": "RAW_0380",
    "generic_name": "dexmedetomidine hydrochloride",
    "brand_name": "Igalmi, Precedex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Bioxcel. Formulation: Film for Buccal, Sublingual administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0381",
    "generic_name": "dexmethylphenidate hydrochloride",
    "brand_name": "Focalin, Focalin Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0382",
    "generic_name": "dextroamphetamine",
    "brand_name": "Xelstrym",
    "therapeutic_class": "Central Nervous System Stimulant [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Noven Pharms Inc. Formulation: System for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Central Nervous System Stimulant [EPC]."
  },
  {
    "id": "RAW_0383",
    "generic_name": "dextroamphetamine sulfate",
    "brand_name": "Dexedrine Spansule",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Impax Labs Inc. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0384",
    "generic_name": "diatrizoate meglumine",
    "brand_name": "Cystografin Dilute",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Bracco. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0385",
    "generic_name": "diazepam",
    "brand_name": "Valium, Valtoco",
    "therapeutic_class": "Benzodiazepine [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Waylis Therap. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzodiazepine [EPC]."
  },
  {
    "id": "RAW_0386",
    "generic_name": "diazoxide",
    "brand_name": "Proglycem",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva Branded Pharm. Formulation: Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0387",
    "generic_name": "diazoxide choline",
    "brand_name": "Vykat Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Soleno Therap. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0388",
    "generic_name": "dichlorphenamide",
    "brand_name": "Keveyis",
    "therapeutic_class": "Carbonic Anhydrase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Xeris. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Carbonic Anhydrase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0389",
    "generic_name": "diclofenac epolamine",
    "brand_name": "Flector, Licart",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Ibsa Inst Bio. Formulation: System for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0390",
    "generic_name": "diclofenac potassium",
    "brand_name": "Zipsor",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0391",
    "generic_name": "diclofenac sodium misoprostol",
    "brand_name": "Diclofenac Sodium And Misoprostol",
    "therapeutic_class": "Prostaglandin E1 Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Yung Shin Pharm. Formulation: Tablet, Delayed Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostaglandin E1 Analog [EPC]."
  },
  {
    "id": "RAW_0392",
    "generic_name": "difamilast",
    "brand_name": "Adquey",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Acrotech Biopharma. Formulation: Ointment for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0393",
    "generic_name": "difelikefalin",
    "brand_name": "Korsuva",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vifor Intl. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0394",
    "generic_name": "difenoxin and atropine sulfate",
    "brand_name": "Motofen",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0395",
    "generic_name": "diflorasone diacetate",
    "brand_name": "Psorcon",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharma Canada. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0396",
    "generic_name": "digoxin",
    "brand_name": "Lanoxin",
    "therapeutic_class": "Cardiac Glycoside [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cardiac Glycoside [EPC]."
  },
  {
    "id": "RAW_0397",
    "generic_name": "dihydroergotamine mesylate",
    "brand_name": "Atzumi, Brekiya, Trudhesa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Amneal. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0398",
    "generic_name": "diltiazem hydrochloride",
    "brand_name": "Cardizem Cd, Cardizem La, Cartia Xt, Matzim La, Tiadylt Er",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Zydus Pharms. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0399",
    "generic_name": "dimercaprol",
    "brand_name": "Bal",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Provepharm Sas. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0400",
    "generic_name": "dimethyl fumarate",
    "brand_name": "Dimethyl-Fumarate, Tecfidera",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Glenmark Pharms Ltd. Formulation: Capsule, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0401",
    "generic_name": "dinoprostone",
    "brand_name": "Cervidil, Prepidil",
    "therapeutic_class": "Prostaglandin Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ferring Pharms Inc. Formulation: Insert, Extended Release for Vaginal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostaglandin Analog [EPC]."
  },
  {
    "id": "RAW_0402",
    "generic_name": "dinutuximab",
    "brand_name": "Unituxin",
    "therapeutic_class": "Glycolipid Disialoganglioside-directed Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by United Therap. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Glycolipid Disialoganglioside-directed Antibody [EPC]."
  },
  {
    "id": "RAW_0403",
    "generic_name": "diroximel fumarate",
    "brand_name": "Vumerity",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biogen. Formulation: Capsule, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0404",
    "generic_name": "disopyramide phosphate",
    "brand_name": "Norpace Cr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0405",
    "generic_name": "divalproex sodium",
    "brand_name": "Depakote, Depakote Er, Depakote Sprinkles",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Capsule, Delayed Rel Pellets for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0406",
    "generic_name": "dobutamine",
    "brand_name": "Dobutrex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Slate Run Pharma. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0407",
    "generic_name": "dobutamine hydrochloride",
    "brand_name": "Dobutrex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0408",
    "generic_name": "docetaxel",
    "brand_name": "Beizray, Docivyx, Taxotere",
    "therapeutic_class": "Microtubule Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Accord Hlthcare. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Microtubule Inhibitor [EPC]."
  },
  {
    "id": "RAW_0409",
    "generic_name": "dofetilide",
    "brand_name": "Tikosyn",
    "therapeutic_class": "Antiarrhythmic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antiarrhythmic [EPC]."
  },
  {
    "id": "RAW_0410",
    "generic_name": "dolutegravir sodium",
    "brand_name": "Tivicay, Tivicay Pd",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0411",
    "generic_name": "dolutegravir sodium and lamivudine",
    "brand_name": "Dovato",
    "therapeutic_class": "Hepatitis B Virus Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hepatitis B Virus Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0412",
    "generic_name": "donanemab",
    "brand_name": "Kisunla",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly Co. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0413",
    "generic_name": "donepezil hydrochloride",
    "brand_name": "Aricept",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eisai Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0414",
    "generic_name": "donidalorsen",
    "brand_name": "Dawnzera",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ionis Pharms Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0415",
    "generic_name": "dopamine hydrochloride",
    "brand_name": "Intropin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0416",
    "generic_name": "doravirine",
    "brand_name": "Pifeltro",
    "therapeutic_class": "Human Immunodeficiency Virus 1 Non-Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd Merck Co. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Human Immunodeficiency Virus 1 Non-Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0417",
    "generic_name": "doravirine islatravir",
    "brand_name": "Idvynso",
    "therapeutic_class": "Human Immunodeficiency Virus 1 Non-Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Human Immunodeficiency Virus 1 Non-Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0418",
    "generic_name": "dordaviprone",
    "brand_name": "Modeyso",
    "therapeutic_class": "Protease Activator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chimerix. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Protease Activator [EPC]."
  },
  {
    "id": "RAW_0419",
    "generic_name": "dornase alfa",
    "brand_name": "Pulmozyme",
    "therapeutic_class": "Recombinant Human Deoxyribonuclease 1 [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Vial for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Recombinant Human Deoxyribonuclease 1 [EPC]."
  },
  {
    "id": "RAW_0420",
    "generic_name": "dostarlimab",
    "brand_name": "Jemperli",
    "therapeutic_class": "Programmed Death Receptor-1 Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Receptor-1 Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_0421",
    "generic_name": "doxapram hydrochloride",
    "brand_name": "Dopram",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Hikma. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0422",
    "generic_name": "doxazosin mesylate",
    "brand_name": "Cardura Xl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Viatris. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0423",
    "generic_name": "doxecitine and doxribtimine",
    "brand_name": "Kygevvi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: For Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0424",
    "generic_name": "doxepin hydrochloride",
    "brand_name": "Prudoxin, Silenor",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0425",
    "generic_name": "doxycycline",
    "brand_name": "Oracea",
    "therapeutic_class": "Tetracycline-class Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Galderma Labs Lp. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tetracycline-class Drug [EPC]."
  },
  {
    "id": "RAW_0426",
    "generic_name": "dronedarone",
    "brand_name": "Multaq",
    "therapeutic_class": "Antiarrhythmic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antiarrhythmic [EPC]."
  },
  {
    "id": "RAW_0427",
    "generic_name": "drospirenone",
    "brand_name": "Melamisa, Slynd, Yaela, Yaz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Exeltis Usa Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0428",
    "generic_name": "drospirenone and estetrol",
    "brand_name": "Nextstellis",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mayne Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0429",
    "generic_name": "drospirenone and estradiol",
    "brand_name": "Angeliq",
    "therapeutic_class": "Progestin [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Progestin [EPC]."
  },
  {
    "id": "RAW_0430",
    "generic_name": "drospirenone and ethinyl estradiol",
    "brand_name": "Nikki, Syeda, Vestura, Yasmin, Yaz, Zumandimine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Xiromed. Formulation: Tablet for Oral-28 administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0431",
    "generic_name": "droxidopa",
    "brand_name": "Northera",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lundbeck Na Ltd. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0432",
    "generic_name": "dulaglutide",
    "brand_name": "Trulicity",
    "therapeutic_class": "GLP-1 Receptor Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: GLP-1 Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_0433",
    "generic_name": "duloxetine",
    "brand_name": "Drizalma Sprinkle",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm. Formulation: Capsule, Delayed Rel Pellets for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0434",
    "generic_name": "duloxetine hydrochloride",
    "brand_name": "Cymbalta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Lilly. Formulation: Capsule, Delayed Rel Pellets for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0435",
    "generic_name": "dupilumab",
    "brand_name": "Dupixent",
    "therapeutic_class": "Interleukin-4 Receptor alpha Antagonist [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Regeneron Pharmaceuticals. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-4 Receptor alpha Antagonist [EPC]."
  },
  {
    "id": "RAW_0436",
    "generic_name": "durvalumab",
    "brand_name": "Imfinzi",
    "therapeutic_class": "Programmed Death Ligand-1 Blocker [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Uk Ltd. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Ligand-1 Blocker [EPC]."
  },
  {
    "id": "RAW_0437",
    "generic_name": "dutasteride",
    "brand_name": "Avodart",
    "therapeutic_class": "5-alpha Reductase Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Waylis Therap. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: 5-alpha Reductase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0438",
    "generic_name": "duvelisib",
    "brand_name": "Copiktra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Secura. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0439",
    "generic_name": "dyclonine hydrochloride",
    "brand_name": "Dyclopro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Septodont. Formulation: Solution for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0440",
    "generic_name": "ecallantide",
    "brand_name": "Kalbitor",
    "therapeutic_class": "Plasma Kallikrein Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Dyax Corp.. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Plasma Kallikrein Inhibitor [EPC]."
  },
  {
    "id": "RAW_0441",
    "generic_name": "econazole nitrate",
    "brand_name": "Ecoza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Resilia Pharms. Formulation: Aerosol, Foam for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0442",
    "generic_name": "eculizumab",
    "brand_name": "Bkemv, Epysqli, Soliris",
    "therapeutic_class": "Complement Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Alexion Pharm. Formulation: Injectable for Iv (Infusion) administration.",
    "indication": "Used as a therapeutic agent for indications related to: Complement Inhibitor [EPC]."
  },
  {
    "id": "RAW_0443",
    "generic_name": "edaravone",
    "brand_name": "Radicava Ors",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Shionogi. Formulation: Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0444",
    "generic_name": "edoxaban tosylate",
    "brand_name": "Savaysa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Daiichi Sankyo Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0445",
    "generic_name": "efbemalenograstim alfa",
    "brand_name": "Ryzneuta",
    "therapeutic_class": "Leukocyte Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Evive Biotechnology. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Leukocyte Growth Factor [EPC]."
  },
  {
    "id": "RAW_0446",
    "generic_name": "efgartigimod alfa",
    "brand_name": "Vyvgart",
    "therapeutic_class": "Neonatal Fc Receptor Blocker [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Argenx Bv. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Neonatal Fc Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_0447",
    "generic_name": "efinaconazole",
    "brand_name": "Jublia",
    "therapeutic_class": "Azole Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Solution for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Azole Antifungal [EPC]."
  },
  {
    "id": "RAW_0448",
    "generic_name": "eflapegrastim",
    "brand_name": "Rolvedon",
    "therapeutic_class": "Leukocyte Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Spectrum Pharms. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Leukocyte Growth Factor [EPC]."
  },
  {
    "id": "RAW_0449",
    "generic_name": "eflornithine hydrochloride",
    "brand_name": "Iwilfin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Uswm. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0450",
    "generic_name": "elacestrant",
    "brand_name": "Orserdu",
    "therapeutic_class": "Estrogen Receptor Antagonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Stemline Therap. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0451",
    "generic_name": "elafibranor",
    "brand_name": "Iqirvo",
    "therapeutic_class": "Peroxisome Proliferator-activated Receptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ipsen. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Peroxisome Proliferator-activated Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_0452",
    "generic_name": "elagolix",
    "brand_name": "Orgovyx, Orilissa",
    "therapeutic_class": "Gonadotropin Releasing Hormone Receptor Antagonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sumitomo Pharma Am. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Gonadotropin Releasing Hormone Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0453",
    "generic_name": "elamipretide hydrochloride",
    "brand_name": "Forzinity",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Stealth Biotheraps. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0454",
    "generic_name": "elapegademase",
    "brand_name": "Revcovi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi Usa Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0455",
    "generic_name": "eletriptan hydrobromide",
    "brand_name": "Relpax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Upjohn. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0456",
    "generic_name": "eliglustat",
    "brand_name": "Cerdelga, Miglustat, Opfolda, Yargesa, Zavesca",
    "therapeutic_class": "Glucosylceramide Synthase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Navinta Llc. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Glucosylceramide Synthase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0457",
    "generic_name": "elinzanetant",
    "brand_name": "Lynkuet",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0458",
    "generic_name": "elosulfase alfa",
    "brand_name": "Vimizim",
    "therapeutic_class": "Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biomarin Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0459",
    "generic_name": "elotuzumab",
    "brand_name": "Empliciti",
    "therapeutic_class": "SLAMF7-directed Immunostimulatory Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: SLAMF7-directed Immunostimulatory Antibody [EPC]."
  },
  {
    "id": "RAW_0460",
    "generic_name": "elranatamab",
    "brand_name": "Elrexfio",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer Inc. Formulation: Solution for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0461",
    "generic_name": "eltrombopag",
    "brand_name": "Alvaiz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0462",
    "generic_name": "eltrombopag dopamine",
    "brand_name": "Eltrombopag Olamine, Promacta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0463",
    "generic_name": "eluxadoline",
    "brand_name": "Viberzi",
    "therapeutic_class": "mu-Opioid Receptor Agonist [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: mu-Opioid Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_0464",
    "generic_name": "emapalumab",
    "brand_name": "Gamifant",
    "therapeutic_class": "Interferon gamma Blocker [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novimmune S.A.. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interferon gamma Blocker [EPC]."
  },
  {
    "id": "RAW_0465",
    "generic_name": "emicizumab",
    "brand_name": "Hemlibra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0466",
    "generic_name": "empagliflozin",
    "brand_name": "Jardiance",
    "therapeutic_class": "Sodium-Glucose Cotransporter 2 Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sodium-Glucose Cotransporter 2 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0467",
    "generic_name": "empagliflozin and linagliptin",
    "brand_name": "Glyxambi",
    "therapeutic_class": "Dipeptidyl Peptidase 4 Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dipeptidyl Peptidase 4 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0468",
    "generic_name": "emtricitabine",
    "brand_name": "Emtriva",
    "therapeutic_class": "Human Immunodeficiency Virus Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Human Immunodeficiency Virus Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0469",
    "generic_name": "enasidenib mesylate",
    "brand_name": "Idhifa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0470",
    "generic_name": "encorafenib",
    "brand_name": "Braftovi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Array Biopharma Inc. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0471",
    "generic_name": "enfortumab vedotin",
    "brand_name": "Padcev Ejfv",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0472",
    "generic_name": "enoxaparin sodium",
    "brand_name": "Lovenox",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0473",
    "generic_name": "ensartinib",
    "brand_name": "Ensacove",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Xcovery. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0474",
    "generic_name": "ensifentrine",
    "brand_name": "Ohtuvayre",
    "therapeutic_class": "Phosphodiesterase 3 Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd. Formulation: Suspension for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phosphodiesterase 3 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0475",
    "generic_name": "ensitrelvir",
    "brand_name": "Xocova",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Shionogi. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0476",
    "generic_name": "entecavir",
    "brand_name": "Baraclude",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0477",
    "generic_name": "entrectinib",
    "brand_name": "Rozlytrek",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0478",
    "generic_name": "enzalutamide",
    "brand_name": "Xtandi",
    "therapeutic_class": "Androgen Receptor Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Androgen Receptor Inhibitor [EPC]."
  },
  {
    "id": "RAW_0479",
    "generic_name": "epcoritamab",
    "brand_name": "Epkinly",
    "therapeutic_class": "Bispecific CD20-directed CD3 T Cell Engager [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genmab Us, Inc.. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bispecific CD20-directed CD3 T Cell Engager [EPC]."
  },
  {
    "id": "RAW_0480",
    "generic_name": "ephedrine sulfate",
    "brand_name": "Akovaz, Emerphed",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Hikma. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0481",
    "generic_name": "epinephrine",
    "brand_name": "Adrenalin, Auvi-Q, Epipen, Neffy, Symjepi",
    "therapeutic_class": "alpha-Adrenergic Agonist [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Am Regent. Formulation: Solution for Intramuscular, Intravenous, Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: alpha-Adrenergic Agonist [EPC]."
  },
  {
    "id": "RAW_0482",
    "generic_name": "epinephrine bitartrate",
    "brand_name": "Citanest Forte Dental",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Dentsply Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0483",
    "generic_name": "epirubicin hydrochloride",
    "brand_name": "Ellence",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0484",
    "generic_name": "eplontersen",
    "brand_name": "Wainua",
    "therapeutic_class": "Transthyretin-directed RNA Interaction [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Ab. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Transthyretin-directed RNA Interaction [EPC]."
  },
  {
    "id": "RAW_0485",
    "generic_name": "epoetin alfa",
    "brand_name": "Retacrit",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0486",
    "generic_name": "epoprostenol",
    "brand_name": "Veletri",
    "therapeutic_class": "Prostacycline Vasodilator [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Actelion. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostacycline Vasodilator [EPC]."
  },
  {
    "id": "RAW_0487",
    "generic_name": "eptinezumab",
    "brand_name": "Vyepti",
    "therapeutic_class": "Calcitonin Gene-related Peptide Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Lundbeck Seattle Biopharmaceuticals, Inc.. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Calcitonin Gene-related Peptide Antagonist [EPC]."
  },
  {
    "id": "RAW_0488",
    "generic_name": "eravacycline",
    "brand_name": "Xerava",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Tetraphase Pharms. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0489",
    "generic_name": "erdafitinib",
    "brand_name": "Balversa",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0490",
    "generic_name": "erenumab",
    "brand_name": "Aimovig",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0491",
    "generic_name": "ergocalciferol",
    "brand_name": "Vitamin D",
    "therapeutic_class": "Provitamin D2 Compound [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Onesource Specialty. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Provitamin D2 Compound [EPC]."
  },
  {
    "id": "RAW_0492",
    "generic_name": "ergotamine tartrate",
    "brand_name": "Ergomar Sublingual",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Pangea. Formulation: Tablet for Sublingual administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0493",
    "generic_name": "ergotamine tartrate and caffeine",
    "brand_name": "Cafergot, Migergot",
    "therapeutic_class": "Central Nervous System Stimulant [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Suppository for Rectal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Central Nervous System Stimulant [EPC]."
  },
  {
    "id": "RAW_0494",
    "generic_name": "eribulin mesylate",
    "brand_name": "Halaven",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eisai Inc. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0495",
    "generic_name": "erlotinib",
    "brand_name": "Cavhanza, Danziten, Nilotinib, Tasigna",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Hetero Labs Ltd V. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0496",
    "generic_name": "ertugliflozin",
    "brand_name": "Steglatro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd Sub Merck. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0497",
    "generic_name": "ertugliflozin and sitagliptin",
    "brand_name": "Steglujan",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd Sub Merck. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0498",
    "generic_name": "erythromycin",
    "brand_name": "Ery-Tab",
    "therapeutic_class": "Macrolide [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Carnegie. Formulation: Tablet, Delayed Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Macrolide [EPC]."
  },
  {
    "id": "RAW_0499",
    "generic_name": "erythromycin and benzoyl pergolide",
    "brand_name": "Benzamycin, Erythromycin And Benzoyl Peroxide",
    "therapeutic_class": "Macrolide [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Valeant Intl. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Macrolide [EPC]."
  },
  {
    "id": "RAW_0500",
    "generic_name": "erythromycin lactobionate",
    "brand_name": "Erythrocin, Erythrocin Lactobionate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0501",
    "generic_name": "erythropoietin",
    "brand_name": "Procrit",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen. Formulation: Vial for Single-Use administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0502",
    "generic_name": "escitalopram",
    "brand_name": "Lexapro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0503",
    "generic_name": "escitalopram oxalate",
    "brand_name": "Lexapro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Forest Labs. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0504",
    "generic_name": "esketamine hydrochloride",
    "brand_name": "Spravato",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Pharms. Formulation: Spray for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0505",
    "generic_name": "eslicarbazepine acetate",
    "brand_name": "Aptiom",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sumitomo Pharma Am. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0506",
    "generic_name": "esmolol hydrochloride",
    "brand_name": "Brevibloc",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0507",
    "generic_name": "esomeprazole magnesium",
    "brand_name": "Nexium",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: For Suspension, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0508",
    "generic_name": "estradiol",
    "brand_name": "Activella, Alora, Amabelz, Climara Pro, Divigel, Dotti, Elestrin, Estring, Estrogel, Evamist, Imvexxy, Lyllana, Menostar, Vagifem, Vivelle, Vivelle-Dot, Yuvafem",
    "therapeutic_class": "Estrogen [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: System for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen [EPC]."
  },
  {
    "id": "RAW_0509",
    "generic_name": "estradiol acetate",
    "brand_name": "Femring",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Millicent Mfg Pr. Formulation: Insert, Extended Release for Vaginal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0510",
    "generic_name": "estradiol and levonorgestrel",
    "brand_name": "Climara Pro",
    "therapeutic_class": "Estrogen [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Film, Extended Release for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen [EPC]."
  },
  {
    "id": "RAW_0511",
    "generic_name": "estradiol and norethindrone acetate",
    "brand_name": "Abigale Lo, Lopreeza, Mimvey",
    "therapeutic_class": "Estrogen [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Xiromed. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen [EPC]."
  },
  {
    "id": "RAW_0512",
    "generic_name": "estradiol and progesterone",
    "brand_name": "Bijuva",
    "therapeutic_class": "Progesterone [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Mayne Pharma. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Progesterone [EPC]."
  },
  {
    "id": "RAW_0513",
    "generic_name": "estradiol cypionate",
    "brand_name": "Depo-Estradiol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0514",
    "generic_name": "estradiol valproate",
    "brand_name": "Delestrogen, Estradiol Valerate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Xiromed. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0515",
    "generic_name": "estrogen conjugated",
    "brand_name": "Conjugated Estrogens, Estrogens, Conjugated, Premarin",
    "therapeutic_class": "Estrogen [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novast Labs. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen [EPC]."
  },
  {
    "id": "RAW_0516",
    "generic_name": "eszopiclone",
    "brand_name": "Lunesta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Waylis Therap. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0517",
    "generic_name": "etanercept",
    "brand_name": "Enbrel, Erelzi, Eticovo",
    "therapeutic_class": "Tumor Necrosis Factor Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tumor Necrosis Factor Blocker [EPC]."
  },
  {
    "id": "RAW_0518",
    "generic_name": "etelcalcetide",
    "brand_name": "Parsabiv",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Kai Pharms Inc. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0519",
    "generic_name": "ethacrynate sodium",
    "brand_name": "Edecrin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0520",
    "generic_name": "ethacrynic acid",
    "brand_name": "Edecrin",
    "therapeutic_class": "Loop Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Loop Diuretic [EPC]."
  },
  {
    "id": "RAW_0521",
    "generic_name": "ethanolamine oleate",
    "brand_name": "Ethamolin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Qol Medcl. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0522",
    "generic_name": "ethinyl estradiol",
    "brand_name": "Femhrt, Haloette, Lo Junel Fe, Lo/Ovral Fe, Malmorede, Merzee, Norminest Fe, Onsura, Quasense",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Gd Searle Llc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0523",
    "generic_name": "ethiodized oil",
    "brand_name": "Lipiodol",
    "therapeutic_class": "Radiographic Contrast Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Guerbet. Formulation: Oil for Intralymphatic, Intrauterine administration.",
    "indication": "Used as a therapeutic agent for indications related to: Radiographic Contrast Agent [EPC]."
  },
  {
    "id": "RAW_0524",
    "generic_name": "ethosuximide",
    "brand_name": "Celontin, Methsuximide, Zarontin",
    "therapeutic_class": "Anti-epileptic Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Parke-Davis. Formulation: Syrup for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anti-epileptic Agent [EPC]."
  },
  {
    "id": "RAW_0525",
    "generic_name": "etomidate",
    "brand_name": "Amidate",
    "therapeutic_class": "General Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: General Anesthetic [EPC]."
  },
  {
    "id": "RAW_0526",
    "generic_name": "etonogestrel",
    "brand_name": "Nexplanon",
    "therapeutic_class": "Progestin [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon. Formulation: Implant for Implantation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Progestin [EPC]."
  },
  {
    "id": "RAW_0527",
    "generic_name": "etonogestrel and ethinyl estradiol",
    "brand_name": "Eluryng, Nuvaring",
    "therapeutic_class": "Estrogen [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon Usa Organon. Formulation: Ring for Vaginal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen [EPC]."
  },
  {
    "id": "RAW_0528",
    "generic_name": "etoposide",
    "brand_name": "Avopef",
    "therapeutic_class": "Topoisomerase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Avyxa Holdings. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Topoisomerase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0529",
    "generic_name": "etoposide phosphate",
    "brand_name": "Etopophos",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Cheplapharm. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0530",
    "generic_name": "etrasimod",
    "brand_name": "Velsipity",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0531",
    "generic_name": "etripamil",
    "brand_name": "Cardamyst",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Milestone Pharms Usa. Formulation: Spray for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0532",
    "generic_name": "everolimus",
    "brand_name": "Afinitor, Afinitor Disperz, Yulithira, Zortress",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0533",
    "generic_name": "evinacumab",
    "brand_name": "Evkeeza",
    "therapeutic_class": "Angiopoietin-like 3 Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Regeneron Pharmaceuticals. Formulation: Solution for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiopoietin-like 3 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0534",
    "generic_name": "evolocumab",
    "brand_name": "Repatha",
    "therapeutic_class": "PCSK9 Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: PCSK9 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0535",
    "generic_name": "exenatide synthetic",
    "brand_name": "Byetta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Amylin. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0536",
    "generic_name": "extended phenytoin sodium",
    "brand_name": "Dilantin, Phenytek",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0537",
    "generic_name": "ezetimibe",
    "brand_name": "Zetia",
    "therapeutic_class": "Dietary Cholesterol Absorption Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dietary Cholesterol Absorption Inhibitor [EPC]."
  },
  {
    "id": "RAW_0538",
    "generic_name": "ezetimibe and simvastatin",
    "brand_name": "Vytorin",
    "therapeutic_class": "HMG-CoA Reductase Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: HMG-CoA Reductase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0539",
    "generic_name": "fam-trastuzumab deruxtecan",
    "brand_name": "Enhertu",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Daiichi Sankyo. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0540",
    "generic_name": "faricimab",
    "brand_name": "Vabysmo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Intravitreal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0541",
    "generic_name": "febuxostat",
    "brand_name": "Uloric",
    "therapeutic_class": "Xanthine Oxidase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Xanthine Oxidase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0542",
    "generic_name": "fedratinib hydrochloride",
    "brand_name": "Inrebic",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol-Myers. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0543",
    "generic_name": "felbamate",
    "brand_name": "Felbatol",
    "therapeutic_class": "Anti-epileptic Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Speciality Lp. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anti-epileptic Agent [EPC]."
  },
  {
    "id": "RAW_0544",
    "generic_name": "fenfluramine",
    "brand_name": "Fintepla",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0545",
    "generic_name": "fenofibrate",
    "brand_name": "Lipofen",
    "therapeutic_class": "Peroxisome Proliferator Receptor alpha Agonist [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Cipher Pharms Inc. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Peroxisome Proliferator Receptor alpha Agonist [EPC]."
  },
  {
    "id": "RAW_0546",
    "generic_name": "fenoprofen calcium",
    "brand_name": "Fenopron Tm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Rising. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0547",
    "generic_name": "fentanyl citrate",
    "brand_name": "Sublimaze Preservative Free",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Rising. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0548",
    "generic_name": "ferric carboxymaltose injection",
    "brand_name": "Injectafer",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Am Regent. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0549",
    "generic_name": "ferric derisomaltose",
    "brand_name": "Monoferric",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmacosmos. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0550",
    "generic_name": "ferric maltol",
    "brand_name": "Accrufer",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Shield Tx. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0551",
    "generic_name": "ferumoxytol",
    "brand_name": "Ferabright, Feraheme",
    "therapeutic_class": "Parenteral Iron Replacement [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Parenteral Iron Replacement [EPC]."
  },
  {
    "id": "RAW_0552",
    "generic_name": "fesoterodine fumarate",
    "brand_name": "Toviaz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0553",
    "generic_name": "fexofenadine hydrochloride",
    "brand_name": "Allegra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Unique. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0554",
    "generic_name": "fezolinetant",
    "brand_name": "Veozah",
    "therapeutic_class": "Neurokinin 3 Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Neurokinin 3 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0555",
    "generic_name": "fidaxomicin",
    "brand_name": "Dificid",
    "therapeutic_class": "Macrolide Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Cubist Pharms Llc. Formulation: For Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Macrolide Antibacterial [EPC]."
  },
  {
    "id": "RAW_0556",
    "generic_name": "filgrastim",
    "brand_name": "Filkri, Neupogen, Nivestym, Nypozi Txid, Releuko, Zarxio",
    "therapeutic_class": "Leukocyte Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen. Formulation: Syringe for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Leukocyte Growth Factor [EPC]."
  },
  {
    "id": "RAW_0557",
    "generic_name": "finafloxacin",
    "brand_name": "Xtoro",
    "therapeutic_class": "Quinolone Antimicrobial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Fonseca Biosciences. Formulation: Suspension/Drops for Otic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Quinolone Antimicrobial [EPC]."
  },
  {
    "id": "RAW_0558",
    "generic_name": "finasteride",
    "brand_name": "Propecia, Proscar",
    "therapeutic_class": "5-alpha Reductase Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: 5-alpha Reductase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0559",
    "generic_name": "finerenone",
    "brand_name": "Kerendia",
    "therapeutic_class": "Nonsteroidal Mineralocorticoid-Receptor Antagonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Mineralocorticoid-Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0560",
    "generic_name": "fingolimod hcl",
    "brand_name": "Gilenya",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0561",
    "generic_name": "fingolimod lauryl sulfate",
    "brand_name": "Tascenso Odt",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cycle. Formulation: Tablet, Orally Disintegrating for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0562",
    "generic_name": "fish oil",
    "brand_name": "Omegaven",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa. Formulation: Emulsion for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0563",
    "generic_name": "fitusiran",
    "brand_name": "Qfitlia",
    "therapeutic_class": "Antithrombin-directed RNA Interaction [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme Corp. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antithrombin-directed RNA Interaction [EPC]."
  },
  {
    "id": "RAW_0564",
    "generic_name": "flibanserin",
    "brand_name": "Addyi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sprout Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0565",
    "generic_name": "fluconazole",
    "brand_name": "Diflucan",
    "therapeutic_class": "Azole Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: For Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Azole Antifungal [EPC]."
  },
  {
    "id": "RAW_0566",
    "generic_name": "flucytosine",
    "brand_name": "Ancobon",
    "therapeutic_class": "Nucleoside Analog Antifungal [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nucleoside Analog Antifungal [EPC]."
  },
  {
    "id": "RAW_0567",
    "generic_name": "fluocinolone acetonide",
    "brand_name": "Dermotic, Flac Otic Oil, Iluvien, Synalar, Yutiq",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Alimera Sciences Inc. Formulation: Implant for Intravitreal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0568",
    "generic_name": "fluocinonide",
    "brand_name": "Vanos",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0569",
    "generic_name": "fluorescein",
    "brand_name": "Ak-Fluor",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Long Grove Pharms. Formulation: Injectable for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0570",
    "generic_name": "fluorescein sodium",
    "brand_name": "Fluorescite",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alcon Labs Inc. Formulation: Injectable for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0571",
    "generic_name": "fluorometholone",
    "brand_name": "Fml, Fml Forte",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Suspension/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0572",
    "generic_name": "fluorometholone acetate",
    "brand_name": "Flarex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Harrow Eye. Formulation: Suspension/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0573",
    "generic_name": "fluorouracil",
    "brand_name": "Favlyxa, Tolak",
    "therapeutic_class": "Nucleoside Metabolic Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Hill Dermaceuticals. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nucleoside Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_0574",
    "generic_name": "flur and renolide",
    "brand_name": "Cordran, Flurandrenolide",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Teligent. Formulation: Ointment for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0575",
    "generic_name": "flurbiprofen",
    "brand_name": "Lurbiro",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by New Heightsrx. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0576",
    "generic_name": "flutamide",
    "brand_name": "Endari, Eulexin",
    "therapeutic_class": "Amino Acid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Emmaus Medcl. Formulation: For Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Amino Acid [EPC]."
  },
  {
    "id": "RAW_0577",
    "generic_name": "fluticasone propionate",
    "brand_name": "Xhance",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Paratek Pharms. Formulation: Spray, Metered for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0578",
    "generic_name": "fluvastatin sodium",
    "brand_name": "Lescol Xl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0579",
    "generic_name": "folic acid",
    "brand_name": "Cholbam, Quiofic",
    "therapeutic_class": "Bile Acid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Solubiomix. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bile Acid [EPC]."
  },
  {
    "id": "RAW_0580",
    "generic_name": "follitropin",
    "brand_name": "Follistim Aq, Gonal-F Rff Redi-Ject",
    "therapeutic_class": "Gonadotropin [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon Usa Llc. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Gonadotropin [EPC]."
  },
  {
    "id": "RAW_0581",
    "generic_name": "follitropin alfa",
    "brand_name": "Gonal-F",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Emd Serono. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0582",
    "generic_name": "follitropin alfa and beta",
    "brand_name": "Gonal-F",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Emd Serono. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0583",
    "generic_name": "fondaparinux sodium",
    "brand_name": "Arixtra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Ireland Ltd. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0584",
    "generic_name": "fosaprepitant dimeglumine",
    "brand_name": "Emend, Focinvez",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Steriscience. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0585",
    "generic_name": "foscarbidopa and foslevodopa",
    "brand_name": "Vyalev",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0586",
    "generic_name": "foscarnet sodium",
    "brand_name": "Foscavir",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Clinigen Hlthcare. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0587",
    "generic_name": "fosdenopterin hydrobromide",
    "brand_name": "Nulibry",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sentynl Theraps Inc. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0588",
    "generic_name": "fosfomycin promethazine",
    "brand_name": "Fosfomycin Tromethamine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Aucta. Formulation: For Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0589",
    "generic_name": "fosfomycin sodium",
    "brand_name": "Contepo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Meitheal. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0590",
    "generic_name": "fosnetupitant and palonosetron",
    "brand_name": "Akynzeo",
    "therapeutic_class": "Substance P/Neurokinin-1 Receptor Antagonist [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Helsinn Hlthcare. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Substance P/Neurokinin-1 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0591",
    "generic_name": "fosphenytoin sodium",
    "brand_name": "Cerebyx",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Parke Davis. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0592",
    "generic_name": "fostamatinib",
    "brand_name": "Tavalisse",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Rigel Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0593",
    "generic_name": "fostemsavir promethazine",
    "brand_name": "Rukobia",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0594",
    "generic_name": "fremanezumab",
    "brand_name": "Ajovy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva Pharms Usa. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0595",
    "generic_name": "fruquintinib",
    "brand_name": "Fruzaqla",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0596",
    "generic_name": "fulvestrant",
    "brand_name": "Faslodex",
    "therapeutic_class": "Estrogen Receptor Antagonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Solution for Intramuscular administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0597",
    "generic_name": "furosemide",
    "brand_name": "Lasix Onyu",
    "therapeutic_class": "Loop Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sq Innovation. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Loop Diuretic [EPC]."
  },
  {
    "id": "RAW_0598",
    "generic_name": "futibatinib",
    "brand_name": "Lytgobi",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Taiho Oncology. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0599",
    "generic_name": "gabapentin",
    "brand_name": "Gabarone, Gralise, Neurontin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Viatris. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0600",
    "generic_name": "gabapentin enacarbil",
    "brand_name": "Horizant",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0601",
    "generic_name": "gadobenate dimeglumine",
    "brand_name": "Multihance",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Bracco. Formulation: Injectable for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0602",
    "generic_name": "gadobutrol",
    "brand_name": "Gadavist",
    "therapeutic_class": "Gadolinium-based Contrast Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Gadolinium-based Contrast Agent [EPC]."
  },
  {
    "id": "RAW_0603",
    "generic_name": "gadodiamide",
    "brand_name": "Omniscan",
    "therapeutic_class": "Paramagnetic Contrast Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ge Healthcare. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Paramagnetic Contrast Agent [EPC]."
  },
  {
    "id": "RAW_0604",
    "generic_name": "gadopiclenol",
    "brand_name": "Vueway",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Guerbet. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0605",
    "generic_name": "gadoterate meglumine",
    "brand_name": "Clariscan, Dotarem",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Ge Healthcare. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0606",
    "generic_name": "gadoteridol",
    "brand_name": "Prohance",
    "therapeutic_class": "Paramagnetic Contrast Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bracco. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Paramagnetic Contrast Agent [EPC]."
  },
  {
    "id": "RAW_0607",
    "generic_name": "gadoxetate sodium",
    "brand_name": "Eovist",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0608",
    "generic_name": "galcanezumab",
    "brand_name": "Emgality",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0609",
    "generic_name": "galsulfase",
    "brand_name": "Naglazyme",
    "therapeutic_class": "Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biomarin. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0610",
    "generic_name": "ganaxolone",
    "brand_name": "Ztalmy",
    "therapeutic_class": "Neuroactive Steroid Gamma-Aminobutyric Acid A Receptor Positive Modulator [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Immedica Pharma. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Neuroactive Steroid Gamma-Aminobutyric Acid A Receptor Positive Modulator [EPC]."
  },
  {
    "id": "RAW_0611",
    "generic_name": "ganciclovir",
    "brand_name": "Zirgan",
    "therapeutic_class": "Cytomegalovirus Nucleoside Analog DNA Polymerase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch And Lomb. Formulation: Gel for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cytomegalovirus Nucleoside Analog DNA Polymerase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0612",
    "generic_name": "ganirelix acetate",
    "brand_name": "Fyremadel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0613",
    "generic_name": "garadacimab",
    "brand_name": "Andembry",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Csl Behring Llc. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0614",
    "generic_name": "gatifloxacin",
    "brand_name": "Zymaxid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0615",
    "generic_name": "gefitinib",
    "brand_name": "Iressa",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0616",
    "generic_name": "gemcitabine",
    "brand_name": "Avgemsi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Avyxa Holdings. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0617",
    "generic_name": "gemcitabine intravesical",
    "brand_name": "Inlexzo",
    "therapeutic_class": "Nucleoside Metabolic Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: System for Intravesical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nucleoside Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_0618",
    "generic_name": "gemfibrozil",
    "brand_name": "Lopid",
    "therapeutic_class": "Peroxisome Proliferator Receptor alpha Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Peroxisome Proliferator Receptor alpha Agonist [EPC]."
  },
  {
    "id": "RAW_0619",
    "generic_name": "gemtuzumab",
    "brand_name": "Campath, Perjeta, Poherdy",
    "therapeutic_class": "HER2/neu Receptor Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Shanghai Henlius Biotech. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: HER2/neu Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0620",
    "generic_name": "gemtuzumab ozogamicin",
    "brand_name": "Mylotarg",
    "therapeutic_class": "CD33-directed Immunoconjugate [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Wyeth Pharms Inc. Formulation: Vial for Single-Dose administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD33-directed Immunoconjugate [EPC]."
  },
  {
    "id": "RAW_0621",
    "generic_name": "gepirone",
    "brand_name": "Exxua",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Fabre Kramer. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0622",
    "generic_name": "gepotidacin",
    "brand_name": "Blujepa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0623",
    "generic_name": "gilteritinib",
    "brand_name": "Xospata",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0624",
    "generic_name": "givinostat",
    "brand_name": "Duvyzat",
    "therapeutic_class": "Histone Deacetylase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Italfarmaco Spa. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Histone Deacetylase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0625",
    "generic_name": "givosiran sodium",
    "brand_name": "Givlaari",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alnylam Pharms Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0626",
    "generic_name": "glasdegib",
    "brand_name": "Daurismo",
    "therapeutic_class": "Hedgehog Pathway Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hedgehog Pathway Inhibitor [EPC]."
  },
  {
    "id": "RAW_0627",
    "generic_name": "glatiramer acetate",
    "brand_name": "Copaxone, Glatopa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0628",
    "generic_name": "glecaprevir and pibrentasvir",
    "brand_name": "Mavyret",
    "therapeutic_class": "Hepatitis C Virus NS3/4A Protease Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hepatitis C Virus NS3/4A Protease Inhibitor [EPC]."
  },
  {
    "id": "RAW_0629",
    "generic_name": "glipizide",
    "brand_name": "Glucotrol Xl",
    "therapeutic_class": "Sulfonylurea [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sulfonylurea [EPC]."
  },
  {
    "id": "RAW_0630",
    "generic_name": "glofitamab",
    "brand_name": "Columvi",
    "therapeutic_class": "Bispecific CD20-directed CD3 T Cell Engager [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bispecific CD20-directed CD3 T Cell Engager [EPC]."
  },
  {
    "id": "RAW_0631",
    "generic_name": "glucagon",
    "brand_name": "Baqsimi",
    "therapeutic_class": "Antihypoglycemic Agent [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Amphastar Pharms Inc. Formulation: Powder for Nasal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antihypoglycemic Agent [EPC]."
  },
  {
    "id": "RAW_0632",
    "generic_name": "glucarpidase",
    "brand_name": "Voraxaze",
    "therapeutic_class": "Carboxypeptidase [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Btg International Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Carboxypeptidase [EPC]."
  },
  {
    "id": "RAW_0633",
    "generic_name": "glycerin phenylbutyrate",
    "brand_name": "Glycerol Phenylbutyrate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Aurobindo Pharma. Formulation: Liquid for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0634",
    "generic_name": "glycerin phenylbutyrate oral",
    "brand_name": "Glycerol Phenylbutyrate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Liquid for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0635",
    "generic_name": "glycopyrrolate",
    "brand_name": "Cuvposa, Glycate, Glyrx-Pf",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lgm Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0636",
    "generic_name": "glycopyrronium",
    "brand_name": "Qbrexza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Journey. Formulation: Cloth for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0637",
    "generic_name": "gonadotrophin, chorionic",
    "brand_name": "Novarel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ferring. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0638",
    "generic_name": "goserelin",
    "brand_name": "Zoladex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Tersera. Formulation: Implant for Implantation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0639",
    "generic_name": "gozetotide",
    "brand_name": "Gozellix",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Telix Innovations. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0640",
    "generic_name": "granisetron",
    "brand_name": "Sancuso, Sustol",
    "therapeutic_class": "Serotonin-3 Receptor Antagonist [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Heron Theraps Inc. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Serotonin-3 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0641",
    "generic_name": "granisetron hydrochloride",
    "brand_name": "Granisol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Intra Sana Labs. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0642",
    "generic_name": "granules for oral solution",
    "brand_name": "Fosfomycin Tromethamine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Xiromed. Formulation: For Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0643",
    "generic_name": "griseofulvin",
    "brand_name": "Grisofulvin",
    "therapeutic_class": "Tubulin Inhibiting Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cipla. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tubulin Inhibiting Agent [EPC]."
  },
  {
    "id": "RAW_0644",
    "generic_name": "griseofulvin ultramicrosize",
    "brand_name": "Gris-Peg",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0645",
    "generic_name": "guanfacine",
    "brand_name": "Intuniv",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0646",
    "generic_name": "guselkumab",
    "brand_name": "Tremfya",
    "therapeutic_class": "Interleukin-23 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-23 Antagonist [EPC]."
  },
  {
    "id": "RAW_0647",
    "generic_name": "halcinonide",
    "brand_name": "Halog",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm Inds Inc. Formulation: Solution for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0648",
    "generic_name": "halcinonide urea",
    "brand_name": "Halog",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm Inds Inc. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0649",
    "generic_name": "halobetasol propionate",
    "brand_name": "Bryhali, Lexette",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Padagis Israel. Formulation: Aerosol, Foam for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0650",
    "generic_name": "hexachlorophene",
    "brand_name": "Pre-Op Ii",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Davis And Geck. Formulation: Sponge for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0651",
    "generic_name": "hexaminolevulinate hydrochloride",
    "brand_name": "Cysview",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Photocure Asa. Formulation: For Solution for Intravesical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0652",
    "generic_name": "histrelin acetate",
    "brand_name": "Supprelin La",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Endo Operations. Formulation: Implant for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0653",
    "generic_name": "human secretin",
    "brand_name": "Chirhostim",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chirhoclin. Formulation: For Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0654",
    "generic_name": "hyaluronidase",
    "brand_name": "Amphadase, Hylenex Recombinant, Vitrase",
    "therapeutic_class": "Endoglycosidase [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amphastar Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Endoglycosidase [EPC]."
  },
  {
    "id": "RAW_0655",
    "generic_name": "hydralazine hydrochloride",
    "brand_name": "Apresoline",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cadila Pharms Ltd. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0656",
    "generic_name": "hydrochlorothiazide",
    "brand_name": "Inzirqo, Lopressor Hct",
    "therapeutic_class": "Thiazide Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novitium Pharma. Formulation: For Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thiazide Diuretic [EPC]."
  },
  {
    "id": "RAW_0657",
    "generic_name": "hydrocortisone",
    "brand_name": "Alkindi Sprinkle, Anusol Hc, Cortef, Cortenema, Khindivi, Proctosol-Hc",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Ani Pharms. Formulation: Enema for Rectal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0658",
    "generic_name": "hydrocortisone acetate",
    "brand_name": "Pramosone",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0659",
    "generic_name": "hydrocortisone acetate urea",
    "brand_name": "Micort Hc Cream",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0660",
    "generic_name": "hydrocortisone butyrate",
    "brand_name": "Locoid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Solution for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0661",
    "generic_name": "hydrocortisone sodium succinate",
    "brand_name": "Solu-Cortef",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmacia And Upjohn. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0662",
    "generic_name": "hydrocortisone valproate",
    "brand_name": "Hydrocortisone Valerate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Lupin. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0663",
    "generic_name": "hydrocortisone valproate urea",
    "brand_name": "Hydrocortisone Valerate Cream",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Encube Ethicals. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0664",
    "generic_name": "hydromorphone hydrochloride",
    "brand_name": "Dilaudid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Rhodes Pharms. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0665",
    "generic_name": "hydroxocobalamin",
    "brand_name": "Cyanokit",
    "therapeutic_class": "Antidote [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Btg Intl. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antidote [EPC]."
  },
  {
    "id": "RAW_0666",
    "generic_name": "hydroxychloroquine sulfate",
    "brand_name": "Plaquenil, Sovuna",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novitium Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0667",
    "generic_name": "hydroxyurea",
    "brand_name": "Droxia, Siklos, Xromi",
    "therapeutic_class": "Antimetabolite [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Theravia. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antimetabolite [EPC]."
  },
  {
    "id": "RAW_0668",
    "generic_name": "hydroxyzine",
    "brand_name": "Atarax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amneal Pharm. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0669",
    "generic_name": "hydroxyzine hydrochloride",
    "brand_name": "Atarax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novitium Pharma. Formulation: Syrup for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0670",
    "generic_name": "hydroxyzine pamoate",
    "brand_name": "Vistaril",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0671",
    "generic_name": "ib and ronate sodium",
    "brand_name": "Ibandronate Sodium",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Orbion Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0672",
    "generic_name": "ibrexafungerp citrate",
    "brand_name": "Brexafemme",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0673",
    "generic_name": "ibritumomab tiuxetan",
    "brand_name": "Zevalin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Spectrum Pharms. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0674",
    "generic_name": "ibrutinib",
    "brand_name": "Imbruvica",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmacyclics Llc. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0675",
    "generic_name": "ibuprofen",
    "brand_name": "Caldolor",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Cumberland Pharms. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0676",
    "generic_name": "ibuprofen lysine",
    "brand_name": "Neoprofen",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Recordati Rare. Formulation: Injectable for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0677",
    "generic_name": "ibutilide fumarate",
    "brand_name": "Corvert",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0678",
    "generic_name": "icatibant",
    "brand_name": "Sajazir",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cipla. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0679",
    "generic_name": "icatibant acetate",
    "brand_name": "Firazyr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0680",
    "generic_name": "icosapent ethinyl",
    "brand_name": "Icosapent Ethyl, Vascepa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Zydus Lifesciences. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0681",
    "generic_name": "icosapent ethinyl capsules",
    "brand_name": "Icosapent Ethyl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Torrent. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0682",
    "generic_name": "icotrokinra",
    "brand_name": "Icotyde",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0683",
    "generic_name": "idarubicin hydrochloride",
    "brand_name": "Idamycin Pfs",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0684",
    "generic_name": "idarucizumab",
    "brand_name": "Praxbind",
    "therapeutic_class": "Humanized Monoclonal Antibody Fragment [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Humanized Monoclonal Antibody Fragment [EPC]."
  },
  {
    "id": "RAW_0685",
    "generic_name": "idelalisib",
    "brand_name": "Zydelig",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0686",
    "generic_name": "idursulfase",
    "brand_name": "Elaprase",
    "therapeutic_class": "Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Shire. Formulation: Injectable for Iv (Infusion) administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0687",
    "generic_name": "iloperidone",
    "brand_name": "Fanapt",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Vanda Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0688",
    "generic_name": "iloprost",
    "brand_name": "Aurlumyn",
    "therapeutic_class": "Prostacycline [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Btg Intl. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostacycline [EPC]."
  },
  {
    "id": "RAW_0689",
    "generic_name": "imatinib mesylate",
    "brand_name": "Afatinib, Afatinib Mesylate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0690",
    "generic_name": "imetelstat sodium",
    "brand_name": "Rytelo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Geron. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0691",
    "generic_name": "imiglucerase",
    "brand_name": "Cerezyme",
    "therapeutic_class": "Hydrolytic Lysosomal Glucocerebroside-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glucocerebroside-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0692",
    "generic_name": "imipenem and cilastatin sodium",
    "brand_name": "Primaxin Iv",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0693",
    "generic_name": "imiquimod",
    "brand_name": "Zyclara",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Graceway. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0694",
    "generic_name": "imlunestrant",
    "brand_name": "Inluriyo",
    "therapeutic_class": "Estrogen Receptor Antagonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0695",
    "generic_name": "inavolisib",
    "brand_name": "Itovebi",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0696",
    "generic_name": "inclisiran",
    "brand_name": "Leqvio",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0697",
    "generic_name": "incobotulinumtoxina",
    "brand_name": "Xeomin",
    "therapeutic_class": "Acetylcholine Release Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Merz Pharms. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Acetylcholine Release Inhibitor [EPC]."
  },
  {
    "id": "RAW_0698",
    "generic_name": "indigotindisulfonate sodium",
    "brand_name": "Bludigo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Provepharm Sas. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0699",
    "generic_name": "indocyanine green",
    "brand_name": "Ic-Green, Spy Agent Green Kit",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novadaq Tech. Formulation: Powder for Intravenous, Interstitial administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0700",
    "generic_name": "indomethacin",
    "brand_name": "Indocin",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Suppository for Rectal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0701",
    "generic_name": "inebilizumab",
    "brand_name": "Uplizna",
    "therapeutic_class": "CD19-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Viela Bio. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD19-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0702",
    "generic_name": "infliximab",
    "brand_name": "Avsola, Inflectra, Ixifi, Renflexis, Zymfentra",
    "therapeutic_class": "Tumor Necrosis Factor Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tumor Necrosis Factor Blocker [EPC]."
  },
  {
    "id": "RAW_0703",
    "generic_name": "inotuzumab ozogamicin",
    "brand_name": "Besponsa",
    "therapeutic_class": "CD22-directed Immunoconjugate [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Wyeth Pharms Inc. Formulation: Powder, For Injection Solution, Lyophilized Powder for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD22-directed Immunoconjugate [EPC]."
  },
  {
    "id": "RAW_0704",
    "generic_name": "insulin aspart",
    "brand_name": "Merilog",
    "therapeutic_class": "Insulin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi-Aventis U.S. Llc. Formulation: Injection for Solution administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin Analog [EPC]."
  },
  {
    "id": "RAW_0705",
    "generic_name": "insulin aspart injection",
    "brand_name": "Fiasp",
    "therapeutic_class": "Insulin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin Analog [EPC]."
  },
  {
    "id": "RAW_0706",
    "generic_name": "insulin degludec",
    "brand_name": "Tresiba",
    "therapeutic_class": "Insulin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin Analog [EPC]."
  },
  {
    "id": "RAW_0707",
    "generic_name": "insulin detemir",
    "brand_name": "Levemir",
    "therapeutic_class": "Insulin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo Nordisk. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin Analog [EPC]."
  },
  {
    "id": "RAW_0708",
    "generic_name": "insulin glargine",
    "brand_name": "Basaglar Kwikpen, Langlara, Lantus Solostar, Rezvoglar Kwikpen, Semglee, Toujeo",
    "therapeutic_class": "Insulin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly Co. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin Analog [EPC]."
  },
  {
    "id": "RAW_0709",
    "generic_name": "insulin glulisine",
    "brand_name": "Apidra",
    "therapeutic_class": "Insulin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin Analog [EPC]."
  },
  {
    "id": "RAW_0710",
    "generic_name": "insulin human",
    "brand_name": "Humulin R, Myxredlin",
    "therapeutic_class": "Insulin [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Lilly. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin [EPC]."
  },
  {
    "id": "RAW_0711",
    "generic_name": "insulin icodec",
    "brand_name": "Awiqli",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo Nordisk Inc. Formulation: Injection for Solution administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0712",
    "generic_name": "insulin lispro",
    "brand_name": "Admelog, Humalog Kwikpen, Lyumjev",
    "therapeutic_class": "Insulin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi-Aventis Us. Formulation: Solution for Intravenous, Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin Analog [EPC]."
  },
  {
    "id": "RAW_0713",
    "generic_name": "insulin recombinant human",
    "brand_name": "Afrezza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Mannkind. Formulation: Powder for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0714",
    "generic_name": "iodixanol",
    "brand_name": "Visipaque",
    "therapeutic_class": "Radiographic Contrast Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ge Healthcare. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Radiographic Contrast Agent [EPC]."
  },
  {
    "id": "RAW_0715",
    "generic_name": "iohexol",
    "brand_name": "Omnipaque",
    "therapeutic_class": "Radiographic Contrast Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ge Healthcare. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Radiographic Contrast Agent [EPC]."
  },
  {
    "id": "RAW_0716",
    "generic_name": "iomeprol",
    "brand_name": "Iomervu",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bracco. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0717",
    "generic_name": "iomeprol injection",
    "brand_name": "Iomervu",
    "therapeutic_class": "Radiographic Contrast Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bracco. Formulation: Solution for Intra-Arterial administration.",
    "indication": "Used as a therapeutic agent for indications related to: Radiographic Contrast Agent [EPC]."
  },
  {
    "id": "RAW_0718",
    "generic_name": "iopromide",
    "brand_name": "Ultravist",
    "therapeutic_class": "Radiographic Contrast Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Radiographic Contrast Agent [EPC]."
  },
  {
    "id": "RAW_0719",
    "generic_name": "iothalamate meglumine",
    "brand_name": "Conray, Cysto-Conray Ii",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Liebel-Flarsheim. Formulation: Solution for Intravesical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0720",
    "generic_name": "ipilimumab",
    "brand_name": "Yervoy",
    "therapeutic_class": "CTLA-4-directed Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CTLA-4-directed Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_0721",
    "generic_name": "ipratropium bromide",
    "brand_name": "Atrovent Hfa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Aerosol, Metered for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0722",
    "generic_name": "ipratropium bromide and albuterol",
    "brand_name": "Combivent Respimat",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Spray, Metered for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0723",
    "generic_name": "iptacopan",
    "brand_name": "Fabhalta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0724",
    "generic_name": "irbesartan",
    "brand_name": "Avapro",
    "therapeutic_class": "Angiotensin 2 Receptor Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin 2 Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_0725",
    "generic_name": "irbesartan and hydrochlorothiazide",
    "brand_name": "Avalide",
    "therapeutic_class": "Thiazide Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thiazide Diuretic [EPC]."
  },
  {
    "id": "RAW_0726",
    "generic_name": "irinotecan hydrochloride",
    "brand_name": "Camptosar, Onivyde",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ipsen. Formulation: Injectable, Liposomal for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0727",
    "generic_name": "iron dextran",
    "brand_name": "Infed",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Allergan. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0728",
    "generic_name": "iron sucrose",
    "brand_name": "Venofer",
    "therapeutic_class": "Parenteral Iron Replacement [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Am Regent. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Parenteral Iron Replacement [EPC]."
  },
  {
    "id": "RAW_0729",
    "generic_name": "isatuximab",
    "brand_name": "Sarclisa",
    "therapeutic_class": "CD38-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD38-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0730",
    "generic_name": "isavuconazonium sulfate",
    "brand_name": "Cresemba",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0731",
    "generic_name": "islelizumab",
    "brand_name": "Tevimbra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Beigene. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0732",
    "generic_name": "isocarboxazid",
    "brand_name": "Marplan",
    "therapeutic_class": "Monoamine Oxidase Inhibitor [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Lifsa Drugs. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Monoamine Oxidase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0733",
    "generic_name": "isoflurane",
    "brand_name": "Forane, Terrell",
    "therapeutic_class": "General Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare. Formulation: Liquid for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: General Anesthetic [EPC]."
  },
  {
    "id": "RAW_0734",
    "generic_name": "isotretinoin",
    "brand_name": "Absorica, Absorica Ld, Amnesteem, Claravis, Zenatane",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva Pharms Usa. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_0735",
    "generic_name": "istradefylline",
    "brand_name": "Nourianz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Kyowa Kirin. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0736",
    "generic_name": "itraconazole",
    "brand_name": "Sporanox, Tolsura",
    "therapeutic_class": "Azole Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Azole Antifungal [EPC]."
  },
  {
    "id": "RAW_0737",
    "generic_name": "ivacaftor",
    "brand_name": "Kalydeco",
    "therapeutic_class": "Cystic Fibrosis Transmembrane Conductance Regulator Potentiator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vertex Pharms Inc. Formulation: Granule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cystic Fibrosis Transmembrane Conductance Regulator Potentiator [EPC]."
  },
  {
    "id": "RAW_0738",
    "generic_name": "ivermectin",
    "brand_name": "Soolantra, Stromectol",
    "therapeutic_class": "Antiparasitic [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Galderma Labs Lp. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antiparasitic [EPC]."
  },
  {
    "id": "RAW_0739",
    "generic_name": "ivosidenib",
    "brand_name": "Tibsovo",
    "therapeutic_class": "Isocitrate Dehydrogenase 1 Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Servier. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Isocitrate Dehydrogenase 1 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0740",
    "generic_name": "ixabepilone",
    "brand_name": "Ixempra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by R-Pharm Us Llc. Formulation: Injectable for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0741",
    "generic_name": "ixazomib",
    "brand_name": "Ninlaro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0742",
    "generic_name": "ixekizumab",
    "brand_name": "Taltz",
    "therapeutic_class": "Interleukin-17A Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-17A Antagonist [EPC]."
  },
  {
    "id": "RAW_0743",
    "generic_name": "ketamine hydrochloride",
    "brand_name": "Ketalar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0744",
    "generic_name": "ketorolac promethazine",
    "brand_name": "Acular, Acular Ls, Acuvail, Ketorolac Tromethamine, Sprix",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bionpharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0745",
    "generic_name": "l and iolol",
    "brand_name": "Rapiblyk",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Aop Hlth Us. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0746",
    "generic_name": "lacosamide",
    "brand_name": "Motpoly Xr, Vimpat",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0747",
    "generic_name": "lactitol",
    "brand_name": "Pizensy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Braintree Labs. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0748",
    "generic_name": "lactulose",
    "brand_name": "Constulose, Enulose, Generlac, Kristalose",
    "therapeutic_class": "Osmotic Laxative [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Chartwell Rx. Formulation: Solution for Oral, Rectal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Osmotic Laxative [EPC]."
  },
  {
    "id": "RAW_0749",
    "generic_name": "lamivudine",
    "brand_name": "Epivir",
    "therapeutic_class": "Hepatitis B Virus Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hepatitis B Virus Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0750",
    "generic_name": "lamotrigine",
    "brand_name": "Lamictal, Lamictal Odt, Lamictal Xr, Subvenite",
    "therapeutic_class": "Anti-epileptic Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Rubicon Research. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anti-epileptic Agent [EPC]."
  },
  {
    "id": "RAW_0751",
    "generic_name": "lanadelumab",
    "brand_name": "Takhzyro",
    "therapeutic_class": "Plasma Kallikrein Inhibitor [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Dyax Corp.. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Plasma Kallikrein Inhibitor [EPC]."
  },
  {
    "id": "RAW_0752",
    "generic_name": "lanreotide acetate",
    "brand_name": "Somatuline Depot",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Ipsen Pharma. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0753",
    "generic_name": "lansoprazole",
    "brand_name": "Prevacid, Prevacid Solutab",
    "therapeutic_class": "Proton Pump Inhibitor [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet, Orally Disintegrating, Delayed Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Proton Pump Inhibitor [EPC]."
  },
  {
    "id": "RAW_0754",
    "generic_name": "lanthanum carbonate",
    "brand_name": "Fosrenol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet, Chewable for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0755",
    "generic_name": "lapatinib",
    "brand_name": "Tabrecta, Tykerb",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis Pharm. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0756",
    "generic_name": "laronidase",
    "brand_name": "Aldurazyme",
    "therapeutic_class": "Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biomarin. Formulation: Vial for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_0757",
    "generic_name": "larotrectinib",
    "brand_name": "Vitrakvi",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0758",
    "generic_name": "latanoprostene bunod",
    "brand_name": "Vyzulta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch And Lomb. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0759",
    "generic_name": "lazertinib",
    "brand_name": "Lazcluze",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0760",
    "generic_name": "lebrikizumab",
    "brand_name": "Ebglyss",
    "therapeutic_class": "Interleukin-13 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-13 Antagonist [EPC]."
  },
  {
    "id": "RAW_0761",
    "generic_name": "lecanemab",
    "brand_name": "Leqembi",
    "therapeutic_class": "Amyloid Beta-directed Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eisai Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Amyloid Beta-directed Antibody [EPC]."
  },
  {
    "id": "RAW_0762",
    "generic_name": "ledipasvir and sofosbuvir",
    "brand_name": "Harvoni",
    "therapeutic_class": "Hepatitis C Virus NS5A Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Pellets for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hepatitis C Virus NS5A Inhibitor [EPC]."
  },
  {
    "id": "RAW_0763",
    "generic_name": "lefamulin acetate",
    "brand_name": "Xenleta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Hong Kong. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0764",
    "generic_name": "leflunomide",
    "brand_name": "Arava",
    "therapeutic_class": "Antirheumatic Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antirheumatic Agent [EPC]."
  },
  {
    "id": "RAW_0765",
    "generic_name": "lemborexant",
    "brand_name": "Dayvigo",
    "therapeutic_class": "Orexin Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eisai Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Orexin Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0766",
    "generic_name": "lenacapavir sodium",
    "brand_name": "Sunlenca, Yeztugo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0767",
    "generic_name": "lenalidomide",
    "brand_name": "Revlimid",
    "therapeutic_class": "Thalidomide Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thalidomide Analog [EPC]."
  },
  {
    "id": "RAW_0768",
    "generic_name": "leniolisib",
    "brand_name": "Joenja",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharming. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0769",
    "generic_name": "lenvatinib",
    "brand_name": "Lenvima",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eisai Inc. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0770",
    "generic_name": "lerodalcibep",
    "brand_name": "Lerochol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lib Therapeutics, Inc.. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0771",
    "generic_name": "letermovir",
    "brand_name": "Prevymis",
    "therapeutic_class": "Cytomegalovirus DNA Terminase Complex Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck Sharp Dohme. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cytomegalovirus DNA Terminase Complex Inhibitor [EPC]."
  },
  {
    "id": "RAW_0772",
    "generic_name": "letibotulinumtoxina",
    "brand_name": "Letybo",
    "therapeutic_class": "Acetylcholine Release Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Hugel Inc. Formulation: Powder, For Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Acetylcholine Release Inhibitor [EPC]."
  },
  {
    "id": "RAW_0773",
    "generic_name": "letrozole",
    "brand_name": "Femara",
    "therapeutic_class": "Aromatase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aromatase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0774",
    "generic_name": "letrozole and ribociclib",
    "brand_name": "Kisqali Femara Co-Pack",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0775",
    "generic_name": "leucovorin calcium",
    "brand_name": "Vykoura",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Avyxa Holdings. Formulation: Solution for Intramuscular, Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0776",
    "generic_name": "leuprolide",
    "brand_name": "Camcevi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Accord. Formulation: Emulsion for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0777",
    "generic_name": "leuprolide acetate",
    "brand_name": "Fensolvi, Lupron Depot, Lupron Depot-Ped, Lutrate Depot, Vabrinty",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Invagen Pharms. Formulation: For Suspension for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0778",
    "generic_name": "leuprolide mesylate",
    "brand_name": "Camcevi Etm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Accord. Formulation: Emulsion for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0779",
    "generic_name": "levacetylleucine",
    "brand_name": "Aqneursa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Intrabio. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0780",
    "generic_name": "levalbuterol tartrate",
    "brand_name": "Xopenex Hfa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Lupin. Formulation: Aerosol, Metered for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0781",
    "generic_name": "levetiracetam",
    "brand_name": "Keppra, Keppra Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0782",
    "generic_name": "levobunolol hydrochloride",
    "brand_name": "Betagan",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Allergan. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0783",
    "generic_name": "levocarnitine",
    "brand_name": "Carnitor, Carnitor Sf",
    "therapeutic_class": "Carnitine Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Leadiant Biosci Inc. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Carnitine Analog [EPC]."
  },
  {
    "id": "RAW_0784",
    "generic_name": "levodopa",
    "brand_name": "Inbrija",
    "therapeutic_class": "Aromatic Amino Acid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Merz. Formulation: Powder for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aromatic Amino Acid [EPC]."
  },
  {
    "id": "RAW_0785",
    "generic_name": "levoketoconazole",
    "brand_name": "Recorlev",
    "therapeutic_class": "Cortisol Synthesis Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Strongbridge. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cortisol Synthesis Inhibitor [EPC]."
  },
  {
    "id": "RAW_0786",
    "generic_name": "levoleucovorin",
    "brand_name": "Khapzory",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Acrotech Biopharma. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0787",
    "generic_name": "levomilnacipran hydrochloride",
    "brand_name": "Fetzima",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0788",
    "generic_name": "levonorgestrel",
    "brand_name": "Kyleena, Liletta, Mirena, Skyla",
    "therapeutic_class": "Progestin [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: System for Intrauterine administration.",
    "indication": "Used as a therapeutic agent for indications related to: Progestin [EPC]."
  },
  {
    "id": "RAW_0789",
    "generic_name": "levothyroxine sodium",
    "brand_name": "Ermeza, Levolet, Levoxyl, Synthroid, Thyquidity, Tirosint, Tirosint Sol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Stevens J. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0790",
    "generic_name": "lidocaine",
    "brand_name": "Bondlido, Ztlido",
    "therapeutic_class": "Amide Local Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Medrx Usa. Formulation: System for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Amide Local Anesthetic [EPC]."
  },
  {
    "id": "RAW_0791",
    "generic_name": "lidocaine and prilocaine",
    "brand_name": "Oraqix",
    "therapeutic_class": "Amide Local Anesthetic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Dentsply Pharm. Formulation: Gel for Periodontal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Amide Local Anesthetic [EPC]."
  },
  {
    "id": "RAW_0792",
    "generic_name": "lidocaine and tetracaine",
    "brand_name": "Pliaglis",
    "therapeutic_class": "Amide Local Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Crescita Therap. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Amide Local Anesthetic [EPC]."
  },
  {
    "id": "RAW_0793",
    "generic_name": "lidocaine hydrochloride",
    "brand_name": "Glydo, Zingo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sagent Pharms Inc. Formulation: Jelly for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0794",
    "generic_name": "lifitegrast",
    "brand_name": "Xiidra",
    "therapeutic_class": "Lymphocyte Function-Associated Antigen-1 Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch And Lomb Inc. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Lymphocyte Function-Associated Antigen-1 Antagonist [EPC]."
  },
  {
    "id": "RAW_0795",
    "generic_name": "linaclotide",
    "brand_name": "Linzess",
    "therapeutic_class": "Guanylate Cyclase-C Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Guanylate Cyclase-C Agonist [EPC]."
  },
  {
    "id": "RAW_0796",
    "generic_name": "linagliptin",
    "brand_name": "Tradjenta",
    "therapeutic_class": "Dipeptidyl Peptidase 4 Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dipeptidyl Peptidase 4 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0797",
    "generic_name": "linerixibat",
    "brand_name": "Lynavoy",
    "therapeutic_class": "Ileal Bile Acid Transporter Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Intercept. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Ileal Bile Acid Transporter Inhibitor [EPC]."
  },
  {
    "id": "RAW_0798",
    "generic_name": "linezolid",
    "brand_name": "Zyvox",
    "therapeutic_class": "Oxazolidinone Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Oxazolidinone Antibacterial [EPC]."
  },
  {
    "id": "RAW_0799",
    "generic_name": "linvoseltamab",
    "brand_name": "Lynozyfic",
    "therapeutic_class": "Bispecific B Cell Maturation Antigen-directed CD3 T Cell Engager [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Rengeneron Pharmaceuticals, Inc.. Formulation: Solution for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bispecific B Cell Maturation Antigen-directed CD3 T Cell Engager [EPC]."
  },
  {
    "id": "RAW_0800",
    "generic_name": "liothyronine sodium",
    "brand_name": "Cytomel, Liomny",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sigmapharm Labs Llc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0801",
    "generic_name": "liraglutide",
    "brand_name": "Saxenda",
    "therapeutic_class": "GLP-1 Receptor Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: GLP-1 Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_0802",
    "generic_name": "lisdexamfetamine dimesylate",
    "brand_name": "Vyvanse",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet, Chewable for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0803",
    "generic_name": "lisdexamfetamine dimesylate oral",
    "brand_name": "Arynta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0804",
    "generic_name": "lisinopril",
    "brand_name": "Qbrelis, Zestril",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0805",
    "generic_name": "lisinopril and hydrochlorothiazide",
    "brand_name": "Zestoretic",
    "therapeutic_class": "Thiazide Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Almatica. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thiazide Diuretic [EPC]."
  },
  {
    "id": "RAW_0806",
    "generic_name": "lithium carbonate",
    "brand_name": "Lithobid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Ani Pharms. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0807",
    "generic_name": "lixisenatide",
    "brand_name": "Adlyxin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi-Aventis Us. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0808",
    "generic_name": "lofexidine hydrochloride",
    "brand_name": "Lucemyra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Biocorrx Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0809",
    "generic_name": "lomitapide mesylate",
    "brand_name": "Juxtapid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0810",
    "generic_name": "lomustine",
    "brand_name": "Gleostine",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_0811",
    "generic_name": "lonafarnib",
    "brand_name": "Zokinvy",
    "therapeutic_class": "Farnesyltransferase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Sentynl Theraps Inc. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Farnesyltransferase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0812",
    "generic_name": "lonapegsomatropin",
    "brand_name": "Skytrofa",
    "therapeutic_class": "Recombinant Human Growth Hormone [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Ascendis Pharma Encocrinology Div A/S. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Recombinant Human Growth Hormone [EPC]."
  },
  {
    "id": "RAW_0813",
    "generic_name": "loncastuximab tesirine",
    "brand_name": "Zynlonta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Adc Therapeutics Sa. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0814",
    "generic_name": "lopinavir and ritonavir",
    "brand_name": "Kaletra",
    "therapeutic_class": "Protease Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Protease Inhibitor [EPC]."
  },
  {
    "id": "RAW_0815",
    "generic_name": "loratadine",
    "brand_name": "Claritin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm Inds Ltd. Formulation: Tablet, Orally Disintegrating for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0816",
    "generic_name": "lorazepam",
    "brand_name": "Ativan, Loreev Xr",
    "therapeutic_class": "Benzodiazepine [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Almatica. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzodiazepine [EPC]."
  },
  {
    "id": "RAW_0817",
    "generic_name": "lorlatinib",
    "brand_name": "Lorbrena",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0818",
    "generic_name": "losartan potassium",
    "brand_name": "Arbli, Cozaar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0819",
    "generic_name": "loteprednol etabonate",
    "brand_name": "Eysuvis, Inveltys, Lotemax, Lotemax Sm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch And Lomb Inc. Formulation: Gel for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0820",
    "generic_name": "lotilaner ophthalmic solution",
    "brand_name": "Xdemvy",
    "therapeutic_class": "Ectoparasiticide [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Tarsus. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Ectoparasiticide [EPC]."
  },
  {
    "id": "RAW_0821",
    "generic_name": "loxapine",
    "brand_name": "Adasuve",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Nova Pneuma. Formulation: Powder for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0822",
    "generic_name": "luliconazole",
    "brand_name": "Luzu",
    "therapeutic_class": "Azole Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Azole Antifungal [EPC]."
  },
  {
    "id": "RAW_0823",
    "generic_name": "lumacaftor and ivacaftor",
    "brand_name": "Orkambi",
    "therapeutic_class": "Cystic Fibrosis Transmembrane Conductance Regulator Potentiator [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Vertex Pharms Inc. Formulation: Granule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cystic Fibrosis Transmembrane Conductance Regulator Potentiator [EPC]."
  },
  {
    "id": "RAW_0824",
    "generic_name": "lumasiran",
    "brand_name": "Oxlumo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Alnylam Pharms Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0825",
    "generic_name": "lumateperone",
    "brand_name": "Caplyta",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Intra-Cellular. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0826",
    "generic_name": "lurasidone hydrochloride",
    "brand_name": "Latuda",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sunovion Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0827",
    "generic_name": "lurbinectedin",
    "brand_name": "Zepzelca",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Jazz. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_0828",
    "generic_name": "luspatercept",
    "brand_name": "Reblozyl",
    "therapeutic_class": "Erythroid Maturation Agent [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Celgene Corp. Formulation: Powder for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Erythroid Maturation Agent [EPC]."
  },
  {
    "id": "RAW_0829",
    "generic_name": "lusutrombopag",
    "brand_name": "Mulpleta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vancocin Italia. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0830",
    "generic_name": "macitentan",
    "brand_name": "Opsumit",
    "therapeutic_class": "Endothelin Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Actelion. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Endothelin Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0831",
    "generic_name": "macitentan and tadalafil",
    "brand_name": "Opsynvi",
    "therapeutic_class": "Phosphodiesterase 5 Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Actelion. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phosphodiesterase 5 Inhibitor [EPC]."
  },
  {
    "id": "RAW_0832",
    "generic_name": "mafenide acetate",
    "brand_name": "Sulfamylon",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Rising. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0833",
    "generic_name": "magnesium chloride",
    "brand_name": "Physiosol In Plastic Container",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Otsuka Icu Medcl. Formulation: Solution for Irrigation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0834",
    "generic_name": "malathion",
    "brand_name": "Ovide",
    "therapeutic_class": "Cholinesterase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Suven Pharms. Formulation: Lotion for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cholinesterase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0835",
    "generic_name": "mannitol",
    "brand_name": "Aridol Bronchial Challenge Test Kit, Bronchitol, Osmitrol",
    "therapeutic_class": "Osmotic Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Osmotic Diuretic [EPC]."
  },
  {
    "id": "RAW_0836",
    "generic_name": "maralixibat chloride",
    "brand_name": "Livmarli",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mirum. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0837",
    "generic_name": "maraviroc",
    "brand_name": "Selzentry",
    "therapeutic_class": "CCR5 Co-receptor Antagonist [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: CCR5 Co-receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0838",
    "generic_name": "margetuximab",
    "brand_name": "Margenza",
    "therapeutic_class": "HER2/neu Receptor Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Macrogenics Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: HER2/neu Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0839",
    "generic_name": "maribavir",
    "brand_name": "Livtencity",
    "therapeutic_class": "Cytomegalovirus pUL97 Kinase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cytomegalovirus pUL97 Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0840",
    "generic_name": "marstacimab",
    "brand_name": "Hympavzi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer Inc. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0841",
    "generic_name": "mavacamten",
    "brand_name": "Camzyos",
    "therapeutic_class": "Cardiac Myosin Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cardiac Myosin Inhibitor [EPC]."
  },
  {
    "id": "RAW_0842",
    "generic_name": "mavorixafor",
    "brand_name": "Xolremdi",
    "therapeutic_class": "CXC Chemokine Receptor 4 Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by X4 Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: CXC Chemokine Receptor 4 Antagonist [EPC]."
  },
  {
    "id": "RAW_0843",
    "generic_name": "mebendazole",
    "brand_name": "Albendazole, Emverm",
    "therapeutic_class": "Anthelmintic [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Zydus Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anthelmintic [EPC]."
  },
  {
    "id": "RAW_0844",
    "generic_name": "mebrofenin",
    "brand_name": "Choletec",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bracco. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0845",
    "generic_name": "mecamylamine hydrochloride",
    "brand_name": "Vecamyl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Lgm Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0846",
    "generic_name": "mecasermin",
    "brand_name": "Increlex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ipsen Inc. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0847",
    "generic_name": "mechlorethamine hydrochloride",
    "brand_name": "Valchlor",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Helsinn. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_0848",
    "generic_name": "medroxyprogesterone acetate",
    "brand_name": "Depo-Subq Provera",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0849",
    "generic_name": "mefenamic acid",
    "brand_name": "Ponstel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Avion Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0850",
    "generic_name": "meloxicam",
    "brand_name": "Qamzova, Xifyrm, Zybic",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Nanjing Delova. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0851",
    "generic_name": "meloxicam rizatriptan",
    "brand_name": "Symbravo",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Axsome. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0852",
    "generic_name": "melphalan",
    "brand_name": "Evomela",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Acrotech Biopharma. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0853",
    "generic_name": "melphalan hcl",
    "brand_name": "Ivra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Apotex. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0854",
    "generic_name": "menotropins",
    "brand_name": "Menopur",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ferring. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0855",
    "generic_name": "meperidine hydrochloride",
    "brand_name": "Demerol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0856",
    "generic_name": "mepivacaine hydrochloride",
    "brand_name": "Polocaine, Polocaine-Mpf",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0857",
    "generic_name": "mepolizumab",
    "brand_name": "Nucala",
    "therapeutic_class": "Interleukin-5 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline Llc. Formulation: Injectable for Subcutaneous Lyophilized Power administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-5 Antagonist [EPC]."
  },
  {
    "id": "RAW_0858",
    "generic_name": "meropenem-vaborbactam",
    "brand_name": "Vabomere",
    "therapeutic_class": "beta Lactamase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Rempex. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: beta Lactamase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0859",
    "generic_name": "mesalamine",
    "brand_name": "Canasa, Lialda, Pentasa",
    "therapeutic_class": "Aminosalicylate [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Suppository for Rectal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aminosalicylate [EPC]."
  },
  {
    "id": "RAW_0860",
    "generic_name": "mesna",
    "brand_name": "Mesnex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0861",
    "generic_name": "metformin",
    "brand_name": "Glucophage",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Pharms Inc. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0862",
    "generic_name": "metformin hydrochloride",
    "brand_name": "Glucophage",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Zydus Lifesciences. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0863",
    "generic_name": "methacholine chloride",
    "brand_name": "Provocholine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Methapharm. Formulation: For Solution for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0864",
    "generic_name": "methadone hydrochloride",
    "brand_name": "Diskets, Methadose, Methadose Dispersible",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Specgx Llc. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0865",
    "generic_name": "methamphetamine hydrochloride",
    "brand_name": "Desoxyn",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Ajenat Pharms. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0866",
    "generic_name": "methocarbamol",
    "brand_name": "Atmeksi, Robaxin",
    "therapeutic_class": "Muscle Relaxant [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Hikma. Formulation: Solution for Im-Iv administration.",
    "indication": "Used as a therapeutic agent for indications related to: Muscle Relaxant [EPC]."
  },
  {
    "id": "RAW_0867",
    "generic_name": "methotrexate",
    "brand_name": "Jylamvo, Rasuvo, Trexall, Xatmep",
    "therapeutic_class": "Folate Analog Metabolic Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Barr. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Folate Analog Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_0868",
    "generic_name": "methoxsalen",
    "brand_name": "Oxsoralen-Ultra, Uvadex",
    "therapeutic_class": "Photoactivated Radical Generator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Photoactivated Radical Generator [EPC]."
  },
  {
    "id": "RAW_0869",
    "generic_name": "methylene blue",
    "brand_name": "Provayblue",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Provepharm Sas. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0870",
    "generic_name": "methylergonovine maleate",
    "brand_name": "Methergine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chartwell Rx. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0871",
    "generic_name": "methylnaltrexone bromide",
    "brand_name": "Relistor",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Salix. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0872",
    "generic_name": "methylphenidate",
    "brand_name": "Cotempla Xr-Odt",
    "therapeutic_class": "Central Nervous System Stimulant [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Neos Theraps Inc. Formulation: Tablet, Orally Disintegrating, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Central Nervous System Stimulant [EPC]."
  },
  {
    "id": "RAW_0873",
    "generic_name": "methylphenidate hydrochloride",
    "brand_name": "Concerta, Jornay Pm Extended-Release, Methylin, Quillichew Er, Quillivant Xr, Ritalin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Pharms. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0874",
    "generic_name": "methylprednisolone",
    "brand_name": "Medrol",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_0875",
    "generic_name": "methylprednisolone acetate",
    "brand_name": "Depo-Medrol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0876",
    "generic_name": "methylprednisolone sodium succinate",
    "brand_name": "Solu-Medrol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmacia And Upjohn. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0877",
    "generic_name": "methyltestosterone",
    "brand_name": "Methitest",
    "therapeutic_class": "Androgen [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Impax Labs. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Androgen [EPC]."
  },
  {
    "id": "RAW_0878",
    "generic_name": "metoclopramide hydrochloride",
    "brand_name": "Gimoti, Reglan",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ani Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0879",
    "generic_name": "metoprolol succinate",
    "brand_name": "Kapspargo, Toprol Xl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Spil. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0880",
    "generic_name": "metoprolol tartrate",
    "brand_name": "Lopressor",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Xtm Consulting. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0881",
    "generic_name": "metreleptin",
    "brand_name": "Myalept",
    "therapeutic_class": "Leptin Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi Farmaceutici Spa. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Leptin Analog [EPC]."
  },
  {
    "id": "RAW_0882",
    "generic_name": "metronidazole",
    "brand_name": "Flagyl, Nuvessa, Vandazole",
    "therapeutic_class": "Nitroimidazole Antimicrobial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Taro. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nitroimidazole Antimicrobial [EPC]."
  },
  {
    "id": "RAW_0883",
    "generic_name": "metronidazole oral",
    "brand_name": "Likmez",
    "therapeutic_class": "Nitroimidazole Antimicrobial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Saptalis Pharms. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nitroimidazole Antimicrobial [EPC]."
  },
  {
    "id": "RAW_0884",
    "generic_name": "metyrapone",
    "brand_name": "Metopirone",
    "therapeutic_class": "Adrenal Steroid Synthesis Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Esteve. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Adrenal Steroid Synthesis Inhibitor [EPC]."
  },
  {
    "id": "RAW_0885",
    "generic_name": "metyrosine",
    "brand_name": "Demser",
    "therapeutic_class": "Catecholamine Synthesis Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Catecholamine Synthesis Inhibitor [EPC]."
  },
  {
    "id": "RAW_0886",
    "generic_name": "micafungin sodium",
    "brand_name": "Mycamine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Fujisawa Hlthcare. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0887",
    "generic_name": "miconazole",
    "brand_name": "Oravig",
    "therapeutic_class": "Azole Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Galt Pharms. Formulation: Tablet for Buccal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Azole Antifungal [EPC]."
  },
  {
    "id": "RAW_0888",
    "generic_name": "midazolam",
    "brand_name": "Nayzilam",
    "therapeutic_class": "Benzodiazepine [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Spray for Nasal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzodiazepine [EPC]."
  },
  {
    "id": "RAW_0889",
    "generic_name": "mifepristone",
    "brand_name": "Mifeprex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Danco Labs Llc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0890",
    "generic_name": "migalastat hydrochloride",
    "brand_name": "Galafold",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amicus Therap Us. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0891",
    "generic_name": "milnacipran hydrochloride",
    "brand_name": "Savella",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0892",
    "generic_name": "milsaperidone",
    "brand_name": "Bysanti",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Vanda Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0893",
    "generic_name": "miltefosine",
    "brand_name": "Impavido",
    "therapeutic_class": "Antileishmanial [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Knight Theraps. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antileishmanial [EPC]."
  },
  {
    "id": "RAW_0894",
    "generic_name": "minocycline",
    "brand_name": "Amzeeq, Zilxi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Journey. Formulation: Aerosol, Foam for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0895",
    "generic_name": "minocycline hydrochloride",
    "brand_name": "Arestin, Minocin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Rempex. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0896",
    "generic_name": "mirabegron",
    "brand_name": "Myrbetriq",
    "therapeutic_class": "beta3-Adrenergic Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Apgdi. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: beta3-Adrenergic Agonist [EPC]."
  },
  {
    "id": "RAW_0897",
    "generic_name": "mirdametinib",
    "brand_name": "Gomekli",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Springworks. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0898",
    "generic_name": "mirikizumab",
    "brand_name": "Omvoh",
    "therapeutic_class": "Interleukin-23 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-23 Antagonist [EPC]."
  },
  {
    "id": "RAW_0899",
    "generic_name": "mirtazapine",
    "brand_name": "Remeron, Remeronsoltab",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0900",
    "generic_name": "mirvetuximab soravtansine",
    "brand_name": "Elahere",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Immunogen Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0901",
    "generic_name": "misoprostol",
    "brand_name": "Cytotec",
    "therapeutic_class": "Prostaglandin E1 Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostaglandin E1 Analog [EPC]."
  },
  {
    "id": "RAW_0902",
    "generic_name": "mitapivat",
    "brand_name": "Aqvesme",
    "therapeutic_class": "Pyruvate Kinase Activator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Agios Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Pyruvate Kinase Activator [EPC]."
  },
  {
    "id": "RAW_0903",
    "generic_name": "mitomycin",
    "brand_name": "Jelmyto, Mitosol, Zusduri",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaukos. Formulation: For Solution for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0904",
    "generic_name": "mitotane",
    "brand_name": "Lysodren",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Esteve. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0905",
    "generic_name": "mogamulizumab",
    "brand_name": "Poteligeo",
    "therapeutic_class": "Chemokine Receptor Type 4 Interaction [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Kyowa Kirin. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Chemokine Receptor Type 4 Interaction [EPC]."
  },
  {
    "id": "RAW_0906",
    "generic_name": "momelotinib",
    "brand_name": "Ojjaara",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0907",
    "generic_name": "mometasone furoate",
    "brand_name": "Asmanex, Asmanex Hfa, Sinuva",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Intersect Ent Inc. Formulation: Implant for Implantation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0908",
    "generic_name": "monomethyl fumarate",
    "brand_name": "Bafiertam",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Banner Life Sciences. Formulation: Capsule, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0909",
    "generic_name": "morphine sulfate",
    "brand_name": "Mitigo, Ms Contin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Knoa Pharma. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0910",
    "generic_name": "mosunetuzumab",
    "brand_name": "Lunsumio",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0911",
    "generic_name": "motixafortide",
    "brand_name": "Aphexda",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Ayrmid Pharma. Formulation: Powder for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0912",
    "generic_name": "moxetumomab pasudotox",
    "brand_name": "Lumoxiti",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Innate Pharma. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0913",
    "generic_name": "moxifloxacin hydrochloride",
    "brand_name": "Avelox, Vigamox",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0914",
    "generic_name": "multiple vitamins injection",
    "brand_name": "Infuvite Adult, Infuvite Pediatric",
    "therapeutic_class": "Vitamin C [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz Canada Inc. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vitamin C [EPC]."
  },
  {
    "id": "RAW_0915",
    "generic_name": "mycophenolate mofetil",
    "brand_name": "Cellcept, Myhibbin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0916",
    "generic_name": "mycophenolate mofetil hydrochloride",
    "brand_name": "Cellcept",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Roche Palo. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0917",
    "generic_name": "mycophenolic acid",
    "brand_name": "Myfortic",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0918",
    "generic_name": "nabumetone",
    "brand_name": "Relafen Ds",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Lgm Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0919",
    "generic_name": "nafarelin acetate",
    "brand_name": "Synarel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Spray, Metered for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0920",
    "generic_name": "naftifine hydrochloride",
    "brand_name": "Naftin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0921",
    "generic_name": "naldemedine",
    "brand_name": "Symproic",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Bdsi. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0922",
    "generic_name": "nalmefene hydrochloride",
    "brand_name": "Opvee, Zurnai",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Knoa Pharma. Formulation: Solution for Intramuscular, Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0923",
    "generic_name": "naloxegol oxalate",
    "brand_name": "Movantik",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Averitas. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0924",
    "generic_name": "naloxone hcl",
    "brand_name": "Kloxxado, Rezenopy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Scienture. Formulation: Spray for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0925",
    "generic_name": "naloxone hydrochloride",
    "brand_name": "Rextovy, Zimhi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amphastar Pharms Inc. Formulation: Spray, Metered for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0926",
    "generic_name": "naproxen",
    "brand_name": "Naprosyn",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Atnahs Pharma Us. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0927",
    "generic_name": "naproxen sodium",
    "brand_name": "Anaprox Ds",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Atnahs Pharma Us. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0928",
    "generic_name": "narsoplimab",
    "brand_name": "Yartemlea",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Omeros Corp. Formulation: Injection for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0929",
    "generic_name": "natalizumab",
    "brand_name": "Tyruko, Tysabri",
    "therapeutic_class": "Integrin Receptor Antagonist [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Integrin Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0930",
    "generic_name": "natamycin",
    "brand_name": "Natacyn",
    "therapeutic_class": "Polyene Antimicrobial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Harrow Eye. Formulation: Suspension for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Polyene Antimicrobial [EPC]."
  },
  {
    "id": "RAW_0931",
    "generic_name": "navepegritide",
    "brand_name": "Yuviwel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Ascendis. Formulation: Powder for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0932",
    "generic_name": "naxitamab",
    "brand_name": "Danyelza",
    "therapeutic_class": "Glycolipid Disialoganglioside-directed Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Y-Mabs Therapeutics Inc. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Glycolipid Disialoganglioside-directed Antibody [EPC]."
  },
  {
    "id": "RAW_0933",
    "generic_name": "nebivolol hydrochloride",
    "brand_name": "Bystolic, Vyduo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Allergan. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0934",
    "generic_name": "necitumumab",
    "brand_name": "Portrazza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly Co. Formulation: Injectable for Intra-Articular, Intramuscular, Intravitreal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0935",
    "generic_name": "nedosiran",
    "brand_name": "Rivfloza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo. Formulation: Solution for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0936",
    "generic_name": "nelarabine",
    "brand_name": "Arranon",
    "therapeutic_class": "Nucleoside Metabolic Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nucleoside Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_0937",
    "generic_name": "nelfinavir mesylate",
    "brand_name": "Viracept",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Agouron Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0938",
    "generic_name": "nembutal sodium",
    "brand_name": "Pentobarbital Sodium",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Rising. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0939",
    "generic_name": "nemolizumab",
    "brand_name": "Nemluvio",
    "therapeutic_class": "Interleukin-31 Receptor alpha Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Galderma Labs Lp. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-31 Receptor alpha Antagonist [EPC]."
  },
  {
    "id": "RAW_0940",
    "generic_name": "nepafenac",
    "brand_name": "Ilevro, Nevanac",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Harrow Eye. Formulation: Suspension/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_0941",
    "generic_name": "ner and omilast",
    "brand_name": "Jascayd",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0942",
    "generic_name": "neratinib",
    "brand_name": "Nerlynx",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Puma Biotech. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0943",
    "generic_name": "netarsudil",
    "brand_name": "Rhopressa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alcon Labs Inc. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0944",
    "generic_name": "netupitant and palonosetron",
    "brand_name": "Akynzeo",
    "therapeutic_class": "Substance P/Neurokinin-1 Receptor Antagonist [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Helsinn Hlthcare. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Substance P/Neurokinin-1 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_0945",
    "generic_name": "niacin",
    "brand_name": "Niacor",
    "therapeutic_class": "Nicotinic Acid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Avondale Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nicotinic Acid [EPC]."
  },
  {
    "id": "RAW_0946",
    "generic_name": "nicardipine hydrochloride",
    "brand_name": "Cardene Iv",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi. Formulation: Injectable for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0947",
    "generic_name": "nicotine",
    "brand_name": "Nicotrol",
    "therapeutic_class": "Cholinergic Nicotinic Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer Inc. Formulation: Spray, Metered for Nasal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cholinergic Nicotinic Agonist [EPC]."
  },
  {
    "id": "RAW_0948",
    "generic_name": "nifedipine",
    "brand_name": "Procardia Xl",
    "therapeutic_class": "Dihydropyridine Calcium Channel Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dihydropyridine Calcium Channel Blocker [EPC]."
  },
  {
    "id": "RAW_0949",
    "generic_name": "nifurtimox",
    "brand_name": "Lampit",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Healthcare. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0950",
    "generic_name": "nimodipine",
    "brand_name": "Nymalize",
    "therapeutic_class": "Dihydropyridine Calcium Channel Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dihydropyridine Calcium Channel Blocker [EPC]."
  },
  {
    "id": "RAW_0951",
    "generic_name": "nintedanib",
    "brand_name": "Ofev",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0952",
    "generic_name": "nipocalimab",
    "brand_name": "Imaavy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0953",
    "generic_name": "niraparib",
    "brand_name": "Zejula",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0954",
    "generic_name": "nirmatrelvir and ritonavir",
    "brand_name": "Paxlovid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0955",
    "generic_name": "nirogacestat",
    "brand_name": "Ogsiveo",
    "therapeutic_class": "Gamma Secretase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Springworks. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Gamma Secretase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0956",
    "generic_name": "nirsevimab",
    "brand_name": "Beyfortus",
    "therapeutic_class": "Respiratory Syncytial Virus Anti-F Protein Monoclonal Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Ab. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Respiratory Syncytial Virus Anti-F Protein Monoclonal Antibody [EPC]."
  },
  {
    "id": "RAW_0957",
    "generic_name": "nitazoxanide",
    "brand_name": "Alinia",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Romark. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0958",
    "generic_name": "nitisinone",
    "brand_name": "Nityr, Orfadin",
    "therapeutic_class": "4-Hydroxyphenyl-Pyruvate Dioxygenase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Swedish Orphan. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: 4-Hydroxyphenyl-Pyruvate Dioxygenase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0959",
    "generic_name": "nitric oxide",
    "brand_name": "Genosyl, Inomax, Noxivent, Ulspira",
    "therapeutic_class": "Vasodilator [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Airgas Therap. Formulation: Gas for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vasodilator [EPC]."
  },
  {
    "id": "RAW_0960",
    "generic_name": "nitroglycerin",
    "brand_name": "Nitro-Bid, Nitromist, Nitrostat",
    "therapeutic_class": "Nitrate Vasodilator [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Viatris. Formulation: Tablet for Sublingual administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nitrate Vasodilator [EPC]."
  },
  {
    "id": "RAW_0961",
    "generic_name": "nivolumab",
    "brand_name": "Opdivo, Opdivo Qvantig",
    "therapeutic_class": "Programmed Death Receptor-1 Blocking Antibody [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol-Myers Squibb. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Receptor-1 Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_0962",
    "generic_name": "nivolumab and hyaluronidase",
    "brand_name": "Opdivo Qvantig",
    "therapeutic_class": "Endoglycosidase [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol-Myers Squibb. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Endoglycosidase [EPC]."
  },
  {
    "id": "RAW_0963",
    "generic_name": "nivolumab and relatlimab",
    "brand_name": "Opdualag",
    "therapeutic_class": "Programmed Death Receptor-1 Blocking Antibody [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol Myers Squibb. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Receptor-1 Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_0964",
    "generic_name": "nogapendekin alfa inbakicept",
    "brand_name": "Anktiva",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Altor Bioscience, Llc, An Indirect Wholly-Owned Su. Formulation: Solution for Intravesical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0965",
    "generic_name": "norepinephrine bitartrate",
    "brand_name": "Levophed",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0966",
    "generic_name": "norethindrone",
    "brand_name": "Camila, Deblitane, Emzahh, Errin, Heather, Jencycla, Lyleq, Meleya, Nora Be, Sharobel",
    "therapeutic_class": "Progestin [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Dr Reddys Labs Sa. Formulation: Tablet for Oral-28 administration.",
    "indication": "Used as a therapeutic agent for indications related to: Progestin [EPC]."
  },
  {
    "id": "RAW_0967",
    "generic_name": "norethindrone acetate",
    "brand_name": "Gallifrey",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Xiromed. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0968",
    "generic_name": "norethindrone and ethinyl estradiol",
    "brand_name": "Aranelle, Balziva, Briellyn, Cyonanz, Kaitlib Fe, Vyfemla, Wera, Wymzya Fe, Zenchent Fe",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Barr. Formulation: Tablet for Oral-28 administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0969",
    "generic_name": "norgestimate",
    "brand_name": "Tri-Lo-Linyah",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novast Labs. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0970",
    "generic_name": "norgestimate and ethinyl estradiol",
    "brand_name": "Mono-Linyah, Sprintec, Tri-Estarylla, Tri-Linyah, Tri-Lo-Marzia, Tri-Lo-Mili, Tri-Lo-Sprintec, Tri-Mili, Tri-Sprintec, Vylibra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novast Labs Ltd. Formulation: Tablet for Oral-28 administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0971",
    "generic_name": "norgestrel and ethinyl estradiol",
    "brand_name": "Cryselle, Elinest, Low-Ogestrel, Turqoz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Duramed Pharms Barr. Formulation: Tablet for Oral-21 administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0972",
    "generic_name": "nusinersen",
    "brand_name": "Spinraza",
    "therapeutic_class": "Survival Motor Neuron-2-directed RNA Interaction [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biogen. Formulation: Solution for Intrathecal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Survival Motor Neuron-2-directed RNA Interaction [EPC]."
  },
  {
    "id": "RAW_0973",
    "generic_name": "nystatin",
    "brand_name": "Nyamyc, Nystop",
    "therapeutic_class": "Polyene Antifungal [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Padagis Us. Formulation: Powder for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Polyene Antifungal [EPC]."
  },
  {
    "id": "RAW_0974",
    "generic_name": "nystatin topical powder",
    "brand_name": "Klayesta",
    "therapeutic_class": "Polyene Antifungal [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Epic Pharma Llc. Formulation: Powder for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Polyene Antifungal [EPC]."
  },
  {
    "id": "RAW_0975",
    "generic_name": "nystatin urea",
    "brand_name": "Nystatin Cream",
    "therapeutic_class": "Polyene Antifungal [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Crown Labs Inc. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Polyene Antifungal [EPC]."
  },
  {
    "id": "RAW_0976",
    "generic_name": "obiltoxaximab",
    "brand_name": "Anthim",
    "therapeutic_class": "Anthrax Protective Antigen-directed Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Elusys Therapeutics Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anthrax Protective Antigen-directed Antibody [EPC]."
  },
  {
    "id": "RAW_0977",
    "generic_name": "obinutuzumab",
    "brand_name": "Gazyva",
    "therapeutic_class": "CD20-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD20-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0978",
    "generic_name": "ocrelizumab",
    "brand_name": "Ocrevus",
    "therapeutic_class": "CD20-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD20-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0979",
    "generic_name": "ocrelizumab and hyaluronidase",
    "brand_name": "Ocrevus Zunovo",
    "therapeutic_class": "Endoglycosidase [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Endoglycosidase [EPC]."
  },
  {
    "id": "RAW_0980",
    "generic_name": "ocriplasmin",
    "brand_name": "Jetrea",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Thrombogenics, Inc. Formulation: Injectable for Intravitreal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0981",
    "generic_name": "octreotide",
    "brand_name": "Mycapssa",
    "therapeutic_class": "Somatostatin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi. Formulation: Capsule, Delayed Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Somatostatin Analog [EPC]."
  },
  {
    "id": "RAW_0982",
    "generic_name": "octreotide acetate",
    "brand_name": "Bynfezia Pen, Sandostatin, Sandostatin Lar Depot",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0983",
    "generic_name": "odevixibat",
    "brand_name": "Bylvay",
    "therapeutic_class": "Ileal Bile Acid Transporter Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ipsen. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Ileal Bile Acid Transporter Inhibitor [EPC]."
  },
  {
    "id": "RAW_0984",
    "generic_name": "ofatumumab",
    "brand_name": "Kesimpta",
    "therapeutic_class": "CD20-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD20-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_0985",
    "generic_name": "ofloxacin",
    "brand_name": "Ocuflox",
    "therapeutic_class": "Quinolone Antimicrobial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Allergan. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Quinolone Antimicrobial [EPC]."
  },
  {
    "id": "RAW_0986",
    "generic_name": "olanzapine",
    "brand_name": "Zyprexa, Zyprexa Intramuscular, Zyprexa Zydis",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Torrent Pharms Ltd. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0987",
    "generic_name": "olanzapine and fuoxetine",
    "brand_name": "Olanzapine And Fluoxetine",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0988",
    "generic_name": "olanzapine and samidorphan l-malate",
    "brand_name": "Lybalvi",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Alkermes Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_0989",
    "generic_name": "olanzapine pamoate",
    "brand_name": "Zyprexa Relprevv",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Cheplapharm. Formulation: Suspension, Extended Release for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0990",
    "generic_name": "olaparib",
    "brand_name": "Lynparza",
    "therapeutic_class": "Poly(ADP-Ribose) Polymerase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Poly(ADP-Ribose) Polymerase Inhibitor [EPC]."
  },
  {
    "id": "RAW_0991",
    "generic_name": "olaratumab",
    "brand_name": "Lartruvo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0992",
    "generic_name": "olezarsen sodium",
    "brand_name": "Tryngolza",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ionis Pharms Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0993",
    "generic_name": "olipudase alfa",
    "brand_name": "Xenpozyme",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme Corp. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0994",
    "generic_name": "olive oil and soybean oil",
    "brand_name": "Clinolipid",
    "therapeutic_class": "Lipid Emulsion [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare Corp. Formulation: Emulsion for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Lipid Emulsion [EPC]."
  },
  {
    "id": "RAW_0995",
    "generic_name": "olmesartan medoxomil",
    "brand_name": "Benicar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0996",
    "generic_name": "olsalazine sodium",
    "brand_name": "Dipentum",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Spclt Viatris. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0997",
    "generic_name": "olutasidenib",
    "brand_name": "Rezlidhia",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Rigel Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_0998",
    "generic_name": "omadacycline",
    "brand_name": "Nuzyra",
    "therapeutic_class": "Tetracycline-class Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Paratek Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tetracycline-class Antibacterial [EPC]."
  },
  {
    "id": "RAW_0999",
    "generic_name": "omalizumab",
    "brand_name": "Omlyclo, Trogarzo",
    "therapeutic_class": "CD4-directed Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Celltrion Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD4-directed Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_1000",
    "generic_name": "omaveloxolone",
    "brand_name": "Skyclarys",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Biogen Us. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1001",
    "generic_name": "omeprazole and sodium bicarbonate",
    "brand_name": "Konvomep",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1002",
    "generic_name": "omeprazole magnesium",
    "brand_name": "Prilosec",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: For Suspension, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1003",
    "generic_name": "omeprazole, sodium bicarbonate",
    "brand_name": "Omeprazole Sodium Bicarbonate",
    "therapeutic_class": "Proton Pump Inhibitor [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Anda Repository. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Proton Pump Inhibitor [EPC]."
  },
  {
    "id": "RAW_1004",
    "generic_name": "omidenepag isopropyl",
    "brand_name": "Omlonti",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ocuvex Therap. Formulation: Solution for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1005",
    "generic_name": "onabotulinumtoxina",
    "brand_name": "Botox Cosmetic",
    "therapeutic_class": "Acetylcholine Release Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Allergan. Formulation: Vial for Single-Use administration.",
    "indication": "Used as a therapeutic agent for indications related to: Acetylcholine Release Inhibitor [EPC]."
  },
  {
    "id": "RAW_1006",
    "generic_name": "opicapone",
    "brand_name": "Ongentys",
    "therapeutic_class": "Catechol-O-Methyltransferase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amneal. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Catechol-O-Methyltransferase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1007",
    "generic_name": "oral semaglutide",
    "brand_name": "Ozempic",
    "therapeutic_class": "GLP-1 Receptor Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: GLP-1 Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1008",
    "generic_name": "orforglipron",
    "brand_name": "Foundayo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1009",
    "generic_name": "oritavancin",
    "brand_name": "Orbactiv",
    "therapeutic_class": "Lipoglycopeptide Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Melinta Therap. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Lipoglycopeptide Antibacterial [EPC]."
  },
  {
    "id": "RAW_1010",
    "generic_name": "oritavancin diphosphate",
    "brand_name": "Kimyrsa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Melinta Therap. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1011",
    "generic_name": "orlistat",
    "brand_name": "Xenical",
    "therapeutic_class": "Intestinal Lipase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cheplapharm. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Intestinal Lipase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1012",
    "generic_name": "oseltamivir phosphate",
    "brand_name": "Tamiflu",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Roche. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1013",
    "generic_name": "osilodrostat",
    "brand_name": "Isturisa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Recordati Rare. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1014",
    "generic_name": "osimertinib",
    "brand_name": "Tagrisso",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1015",
    "generic_name": "ospemifene",
    "brand_name": "Osphena",
    "therapeutic_class": "Estrogen Agonist/Antagonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Duchesnay. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Estrogen Agonist/Antagonist [EPC]."
  },
  {
    "id": "RAW_1016",
    "generic_name": "oteseconazole",
    "brand_name": "Vivjoa",
    "therapeutic_class": "Azole Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Mycovia Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Azole Antifungal [EPC]."
  },
  {
    "id": "RAW_1017",
    "generic_name": "oxaprozin",
    "brand_name": "Coxanto, Daypro",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_1018",
    "generic_name": "oxcarbazepine",
    "brand_name": "Oxtellar Xr, Trileptal",
    "therapeutic_class": "Anti-epileptic Agent [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anti-epileptic Agent [EPC]."
  },
  {
    "id": "RAW_1019",
    "generic_name": "oxybutynin",
    "brand_name": "Oxytrol",
    "therapeutic_class": "Cholinergic Muscarinic Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Allergan. Formulation: Film, Extended Release for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cholinergic Muscarinic Antagonist [EPC]."
  },
  {
    "id": "RAW_1020",
    "generic_name": "oxycodone",
    "brand_name": "Xtampza Er",
    "therapeutic_class": "Opioid Agonist [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Collegium Pharm Inc. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Opioid Agonist [EPC]."
  },
  {
    "id": "RAW_1021",
    "generic_name": "oxycodone and acetaminophen",
    "brand_name": "Endocet",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ozantri. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1022",
    "generic_name": "oxycodone hydrochloride",
    "brand_name": "Oxycontin, Roxicodone, Roxybond",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Knoa Pharma. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1023",
    "generic_name": "oxymetazoline hydrochloride",
    "brand_name": "Kovanaze, Rhofade",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by St Renatus. Formulation: Spray, Metered for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1024",
    "generic_name": "oxytocin",
    "brand_name": "Pitocin",
    "therapeutic_class": "Oxytocic [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Oxytocic [EPC]."
  },
  {
    "id": "RAW_1025",
    "generic_name": "paclitaxel",
    "brand_name": "Abraxane, Taxol",
    "therapeutic_class": "Microtubule Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Msn. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Microtubule Inhibitor [EPC]."
  },
  {
    "id": "RAW_1026",
    "generic_name": "pacritinib",
    "brand_name": "Vonjo",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Sobi. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1027",
    "generic_name": "pafolacianine injection",
    "brand_name": "Cytalux",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by On Target Labs. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1028",
    "generic_name": "palbociclib",
    "brand_name": "Ibrance",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1029",
    "generic_name": "palifermin",
    "brand_name": "Kepivance",
    "therapeutic_class": "Mucocutaneous Epithelial Cell Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biovitrum Ab. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Mucocutaneous Epithelial Cell Growth Factor [EPC]."
  },
  {
    "id": "RAW_1030",
    "generic_name": "paliperidone",
    "brand_name": "Invega",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Pharms. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_1031",
    "generic_name": "paliperidone palmitate",
    "brand_name": "Erzofri Extended-Release, Invega Hafyera, Invega Sustenna",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Pharms. Formulation: Suspension, Extended Release for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1032",
    "generic_name": "palivizumab",
    "brand_name": "Synagis",
    "therapeutic_class": "Respiratory Syncytial Virus Anti-F Protein Monoclonal Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Swedish Orphan. Formulation: Vial for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Respiratory Syncytial Virus Anti-F Protein Monoclonal Antibody [EPC]."
  },
  {
    "id": "RAW_1033",
    "generic_name": "palonosetron",
    "brand_name": "Posfrea",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Avyxa Holdings. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1034",
    "generic_name": "palopegteriparatide",
    "brand_name": "Yorvipath",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Ascendis Pharma Bone. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1035",
    "generic_name": "palovarotene",
    "brand_name": "Sohonos",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ipsen. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_1036",
    "generic_name": "paltusotine",
    "brand_name": "Palsonify",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Crinetics. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1037",
    "generic_name": "pamidronate sodium",
    "brand_name": "Aredia",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1038",
    "generic_name": "pancrelipase",
    "brand_name": "Creon, Pertzye, Viokace",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Viokace. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1039",
    "generic_name": "panitumumab",
    "brand_name": "Vectibix",
    "therapeutic_class": "Epidermal Growth Factor Receptor Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen. Formulation: Injectable for Iv (Infusion) administration.",
    "indication": "Used as a therapeutic agent for indications related to: Epidermal Growth Factor Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1040",
    "generic_name": "pantoprazole sodium",
    "brand_name": "Protonix Delayed-Release",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Wyeth Pharms. Formulation: Tablet, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1041",
    "generic_name": "parathyroid hormone",
    "brand_name": "Natpara",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Nps Pharms Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1042",
    "generic_name": "paricalcitol",
    "brand_name": "Zemplar",
    "therapeutic_class": "Vitamin D2 Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vitamin D2 Analog [EPC]."
  },
  {
    "id": "RAW_1043",
    "generic_name": "paromomycin sulfate",
    "brand_name": "Humatin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Heritage. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1044",
    "generic_name": "paroxetine",
    "brand_name": "Paxil",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Zydus Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1045",
    "generic_name": "paroxetine hydrochloride",
    "brand_name": "Paxil",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Oxford Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1046",
    "generic_name": "pasireotide",
    "brand_name": "Signifor, Signifor Lar",
    "therapeutic_class": "Somatostatin Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Recordati Rare. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Somatostatin Analog [EPC]."
  },
  {
    "id": "RAW_1047",
    "generic_name": "patiromer",
    "brand_name": "Veltassa",
    "therapeutic_class": "Potassium Binder [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vifor Pharma. Formulation: Powder for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Potassium Binder [EPC]."
  },
  {
    "id": "RAW_1048",
    "generic_name": "patisiran",
    "brand_name": "Onpattro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alnylam Pharms Inc. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1049",
    "generic_name": "pazopanib hydrochloride",
    "brand_name": "Votrient",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1050",
    "generic_name": "pegaspargase",
    "brand_name": "Oncaspar",
    "therapeutic_class": "Asparagine-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sigma Tau. Formulation: Vial for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Asparagine-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_1051",
    "generic_name": "pegcetacoplan",
    "brand_name": "Empaveli, Syfovre",
    "therapeutic_class": "Complement Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Apellis Pharms. Formulation: Solution for Intravitreal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Complement Inhibitor [EPC]."
  },
  {
    "id": "RAW_1052",
    "generic_name": "pegfilgrastim",
    "brand_name": "Armlupeg, Ennumo, Fulphila, Fylnetra, Neulasta, Nyvepria, Stimufend, Udenyca, Ziextenzo",
    "therapeutic_class": "Leukocyte Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Gmbh. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Leukocyte Growth Factor [EPC]."
  },
  {
    "id": "RAW_1053",
    "generic_name": "pegloticase",
    "brand_name": "Krystexxa",
    "therapeutic_class": "Uric Acid-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Horizon Pharma. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Uric Acid-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_1054",
    "generic_name": "pegulicianine",
    "brand_name": "Lumisight",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lumicell. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1055",
    "generic_name": "pegunigalsidase alfa",
    "brand_name": "Elfabrio",
    "therapeutic_class": "Hydrolytic Lysosomal Neutral Glycosphingolipid-specific Enzyme [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi Farmaceutici Spa. Formulation: Vial for Single-Use administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Neutral Glycosphingolipid-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_1056",
    "generic_name": "pegvaliase",
    "brand_name": "Palynziq",
    "therapeutic_class": "Phenylalanine Metabolizing Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biomarin Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phenylalanine Metabolizing Enzyme [EPC]."
  },
  {
    "id": "RAW_1057",
    "generic_name": "pegvisomant",
    "brand_name": "Somavert",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmacia. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1058",
    "generic_name": "pegzilarginase",
    "brand_name": "Loargys",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Immedica Pharma Ab. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1059",
    "generic_name": "pembrolizumab",
    "brand_name": "Keytruda",
    "therapeutic_class": "Programmed Death Receptor-1 Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck Sharp Dohme. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Receptor-1 Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_1060",
    "generic_name": "pemetrexed",
    "brand_name": "Alimta, Axtle, Pemfexy",
    "therapeutic_class": "Folate Analog Metabolic Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Avyxa Holdings. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Folate Analog Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_1061",
    "generic_name": "pemetrexed sodium",
    "brand_name": "Alimta, Pemrydi Rtu",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Shilpa. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1062",
    "generic_name": "pemigatinib",
    "brand_name": "Pemazyre",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Incyte Corp. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1063",
    "generic_name": "penciclovir",
    "brand_name": "Denavir",
    "therapeutic_class": "Herpesvirus Nucleoside Analog DNA Polymerase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Herpesvirus Nucleoside Analog DNA Polymerase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1064",
    "generic_name": "penicillamine",
    "brand_name": "Aagylur, Cuprimine, Depen",
    "therapeutic_class": "Antirheumatic Agent [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Invagen Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antirheumatic Agent [EPC]."
  },
  {
    "id": "RAW_1065",
    "generic_name": "penicillin g benzathine",
    "brand_name": "Bicillin L-A",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by King Pharms Llc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1066",
    "generic_name": "penicillin g potassium",
    "brand_name": "Pfizerpen",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1067",
    "generic_name": "penicillin v potassium",
    "brand_name": "Penicillin-Vk",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1068",
    "generic_name": "pentamidine isethionate",
    "brand_name": "Nebupent",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa. Formulation: For Solution for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1069",
    "generic_name": "pentosan polysulfate sodium",
    "brand_name": "Elmiron",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1070",
    "generic_name": "pentostatin",
    "brand_name": "Nipent",
    "therapeutic_class": "Nucleoside Metabolic Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nucleoside Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_1071",
    "generic_name": "peramivir",
    "brand_name": "Rapivab",
    "therapeutic_class": "Neuraminidase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Biocryst. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Neuraminidase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1072",
    "generic_name": "perampanel",
    "brand_name": "Fycompa",
    "therapeutic_class": "Noncompetitive AMPA Glutamate Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Catalyst Pharms. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Noncompetitive AMPA Glutamate Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1073",
    "generic_name": "perfluorohexyloctane",
    "brand_name": "Miebo",
    "therapeutic_class": "Semifluorinated Alkane [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch And Lomb Inc. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Semifluorinated Alkane [EPC]."
  },
  {
    "id": "RAW_1074",
    "generic_name": "perflutren",
    "brand_name": "Definity",
    "therapeutic_class": "Contrast Agent for Ultrasound Imaging [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lantheus Medcl. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Contrast Agent for Ultrasound Imaging [EPC]."
  },
  {
    "id": "RAW_1075",
    "generic_name": "permethrin",
    "brand_name": "Elimite",
    "therapeutic_class": "Pyrethroid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Aurobindo Pharma Usa. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Pyrethroid [EPC]."
  },
  {
    "id": "RAW_1076",
    "generic_name": "pexidartinib hydrochloride",
    "brand_name": "Turalio",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Daiichi Sankyo Inc. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1077",
    "generic_name": "phendimetrazine tartrate",
    "brand_name": "Bontril Pdm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1078",
    "generic_name": "phenobarbital sodium",
    "brand_name": "Sezaby",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm Inds Inc. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1079",
    "generic_name": "phentermine hydrochloride",
    "brand_name": "Adipex-P",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1080",
    "generic_name": "phentolamine mesylate",
    "brand_name": "Oraverse, Ryzumvi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Septodont Holding. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1081",
    "generic_name": "phenylephrine and ketorolac",
    "brand_name": "Omidria",
    "therapeutic_class": "Nonsteroidal Anti-inflammatory Drug [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Rayner Surgical. Formulation: Solution for Irrigation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonsteroidal Anti-inflammatory Drug [EPC]."
  },
  {
    "id": "RAW_1082",
    "generic_name": "phenylephrine hydrochloride",
    "brand_name": "Biorphen",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Dr Reddys Labs Sa. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1083",
    "generic_name": "pilocarpine hydrochloride",
    "brand_name": "Qlosi, Salagen",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Advanz Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1084",
    "generic_name": "pimavanserin tartrate",
    "brand_name": "Nuplazid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Acadia Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1085",
    "generic_name": "pioglitazone",
    "brand_name": "Actos",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1086",
    "generic_name": "pirfenidone",
    "brand_name": "Esbriet",
    "therapeutic_class": "Pyridone [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Pyridone [EPC]."
  },
  {
    "id": "RAW_1087",
    "generic_name": "piroxicam",
    "brand_name": "Feldene",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1088",
    "generic_name": "pirtobrutinib",
    "brand_name": "Jaypirca",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Loxo Oncol. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1089",
    "generic_name": "pitavastatin calcium",
    "brand_name": "Pravastatin, Pravastatin Calcium",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1090",
    "generic_name": "pitolisant hydrochloride",
    "brand_name": "Wakix",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Harmony. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1091",
    "generic_name": "pivekimab sunirine",
    "brand_name": "Decnupaz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie Inc. Formulation: Vial for Single-Dose administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1092",
    "generic_name": "pivmecillinam",
    "brand_name": "Pivya",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Alembic Therap. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1093",
    "generic_name": "plecanatide",
    "brand_name": "Trulance Immediate Release",
    "therapeutic_class": "Guanylate Cyclase-C Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Salix. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Guanylate Cyclase-C Agonist [EPC]."
  },
  {
    "id": "RAW_1094",
    "generic_name": "plerixafor",
    "brand_name": "Mozobil",
    "therapeutic_class": "Hematopoietic Stem Cell Mobilizer [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hematopoietic Stem Cell Mobilizer [EPC]."
  },
  {
    "id": "RAW_1095",
    "generic_name": "plozasiran",
    "brand_name": "Redemplo",
    "therapeutic_class": "APOC-III-directed RNA Interaction [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Arrowhead. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: APOC-III-directed RNA Interaction [EPC]."
  },
  {
    "id": "RAW_1096",
    "generic_name": "polatuzumab vedotin",
    "brand_name": "Polivy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1097",
    "generic_name": "polidocanol",
    "brand_name": "Asclera, Varithena",
    "therapeutic_class": "Sclerosing Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Boston Scitfc. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sclerosing Agent [EPC]."
  },
  {
    "id": "RAW_1098",
    "generic_name": "pomalidomide",
    "brand_name": "Pomalyst",
    "therapeutic_class": "Thalidomide Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thalidomide Analog [EPC]."
  },
  {
    "id": "RAW_1099",
    "generic_name": "ponatinib hydrochloride",
    "brand_name": "Iclusig",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1100",
    "generic_name": "ponesimod",
    "brand_name": "Ponvory",
    "therapeutic_class": "Sphingosine 1-phosphate Receptor Modulator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vanda Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sphingosine 1-phosphate Receptor Modulator [EPC]."
  },
  {
    "id": "RAW_1101",
    "generic_name": "porfimer sodium",
    "brand_name": "Photofrin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pinnacle Biolgs. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1102",
    "generic_name": "posaconazole",
    "brand_name": "Noxafil",
    "therapeutic_class": "Azole Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd Merck Co. Formulation: For Suspension, Delayed Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Azole Antifungal [EPC]."
  },
  {
    "id": "RAW_1103",
    "generic_name": "povidone-iodine",
    "brand_name": "Betadine",
    "therapeutic_class": "Antiseptic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Alcon Pharms Ltd. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antiseptic [EPC]."
  },
  {
    "id": "RAW_1104",
    "generic_name": "pozelimab",
    "brand_name": "Veopoz",
    "therapeutic_class": "Complement Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Regeneron Pharmaceuticals. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Complement Inhibitor [EPC]."
  },
  {
    "id": "RAW_1105",
    "generic_name": "prabotulinum toxin type a",
    "brand_name": "Jeuveau",
    "therapeutic_class": "Acetylcholine Release Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Evolus Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Acetylcholine Release Inhibitor [EPC]."
  },
  {
    "id": "RAW_1106",
    "generic_name": "pralatrexate",
    "brand_name": "Folotyn",
    "therapeutic_class": "Folate Analog Metabolic Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Acrotech Biopharma. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Folate Analog Metabolic Inhibitor [EPC]."
  },
  {
    "id": "RAW_1107",
    "generic_name": "pralsetinib",
    "brand_name": "Gavreto",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Rigel Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1108",
    "generic_name": "pramipexole dihydrochloride",
    "brand_name": "Mirapex Er",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1109",
    "generic_name": "prasterone",
    "brand_name": "Intrarosa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Millicent. Formulation: Insert for Vaginal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1110",
    "generic_name": "prasugrel hydrochloride",
    "brand_name": "Effient",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1111",
    "generic_name": "pravastatin",
    "brand_name": "Pitavastatin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Amneal Pharms Ny. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1112",
    "generic_name": "pravastatin calcium",
    "brand_name": "Livalo, Pitavastatin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Orient Pharma Co Ltd. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1113",
    "generic_name": "pravastatin magnesium",
    "brand_name": "Zypitamag",
    "therapeutic_class": "HMG-CoA Reductase Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Medicure. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: HMG-CoA Reductase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1114",
    "generic_name": "prednisolone",
    "brand_name": "Prelone",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Aurobindo Pharma Ltd. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_1115",
    "generic_name": "prednisolone acetate",
    "brand_name": "Pred Forte, Pred Mild, Prelone",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Suspension/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1116",
    "generic_name": "prednisolone sodium phosphate",
    "brand_name": "Orapred Odt, Prelone",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Mission Pharma. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1117",
    "generic_name": "prednisone",
    "brand_name": "Deltasone",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_1118",
    "generic_name": "pregabalin",
    "brand_name": "Lyrica, Lyrica Cr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Cp Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1119",
    "generic_name": "prilocaine hcl and epinephrine",
    "brand_name": "Citanest Forte Dental",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Septodont Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1120",
    "generic_name": "prilocaine hydrochloride",
    "brand_name": "Citanest Plain",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Septodont Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1121",
    "generic_name": "primidone",
    "brand_name": "Mysoline",
    "therapeutic_class": "Anti-epileptic Agent [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Valeant. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anti-epileptic Agent [EPC]."
  },
  {
    "id": "RAW_1122",
    "generic_name": "procarbazine hydrochloride",
    "brand_name": "Matulane",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Leadiant Biosci Inc. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1123",
    "generic_name": "prochlorperazine",
    "brand_name": "Compro",
    "therapeutic_class": "Phenothiazine [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Padagis Us. Formulation: Suppository for Rectal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phenothiazine [EPC]."
  },
  {
    "id": "RAW_1124",
    "generic_name": "progesterone",
    "brand_name": "Crinone, Prometrium",
    "therapeutic_class": "Progesterone [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Acertis Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Progesterone [EPC]."
  },
  {
    "id": "RAW_1125",
    "generic_name": "promethazine",
    "brand_name": "Tham, Tromethamine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by B Braun Medical. Formulation: Solution for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1126",
    "generic_name": "promethazine hydrochloride",
    "brand_name": "Promethegan",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette Pharms Nc. Formulation: Suppository for Rectal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1127",
    "generic_name": "propofol",
    "brand_name": "Diprivan",
    "therapeutic_class": "General Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: General Anesthetic [EPC]."
  },
  {
    "id": "RAW_1128",
    "generic_name": "propranolol hydrochloride",
    "brand_name": "Hemangeol, Inderal, Inderal La, Innopran Xl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1129",
    "generic_name": "protopam chloride",
    "brand_name": "Pralidoxime Chloride",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare Corp. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1130",
    "generic_name": "prucalopride",
    "brand_name": "Motegrity",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1131",
    "generic_name": "prussian blue insoluble capsules",
    "brand_name": "Radiogardase",
    "therapeutic_class": "Decorporation Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Heyl Chemisch. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Decorporation Agent [EPC]."
  },
  {
    "id": "RAW_1132",
    "generic_name": "pyridostigmine bromide",
    "brand_name": "Mestinon, Pryidostigmine Bromide, Regonol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Rising. Formulation: Syrup for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1133",
    "generic_name": "quetiapine",
    "brand_name": "Seroquel, Seroquel Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Cheplapharm. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1134",
    "generic_name": "quetiapine fumarate",
    "brand_name": "Seroquel Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Cheplapharm Arzneimittel Gmbh. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1135",
    "generic_name": "quinidine gluonate",
    "brand_name": "Quinidine Gluconate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Hibrow Hlthcare. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1136",
    "generic_name": "quinupristin",
    "brand_name": "Synercid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by King Pharms. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1137",
    "generic_name": "quizartinib",
    "brand_name": "Vanflyta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Daiichi Sankyo Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1138",
    "generic_name": "rabeprazole sodium",
    "brand_name": "Aciphex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Eisai Medcl Res. Formulation: Tablet, Delayed Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1139",
    "generic_name": "raloxifene hydrochloride",
    "brand_name": "Evista",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lilly. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1140",
    "generic_name": "raltegravir",
    "brand_name": "Isentress",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd Sub Merck. Formulation: Tablet, Chewable for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1141",
    "generic_name": "ramelteon",
    "brand_name": "Rozerem",
    "therapeutic_class": "Melatonin Receptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Melatonin Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1142",
    "generic_name": "ramucirumab",
    "brand_name": "Cyramza",
    "therapeutic_class": "Vascular Endothelial Growth Factor Receptor 2 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vascular Endothelial Growth Factor Receptor 2 Antagonist [EPC]."
  },
  {
    "id": "RAW_1143",
    "generic_name": "ranibizumab",
    "brand_name": "Byooviz, Cimerli, Lucentis, Nufymco, Ranluspec, Susvimo",
    "therapeutic_class": "Vascular Endothelial Growth Factor Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Formycon Ag. Formulation: Injection for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vascular Endothelial Growth Factor Inhibitor [EPC]."
  },
  {
    "id": "RAW_1144",
    "generic_name": "ranitidine",
    "brand_name": "Zantac",
    "therapeutic_class": "Histamine-2 Receptor Antagonist [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharm Assoc. Formulation: Syrup for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Histamine-2 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1145",
    "generic_name": "ranitidine hydrochloride",
    "brand_name": "Zantac",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Strides Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1146",
    "generic_name": "rasagiline mesylate",
    "brand_name": "Azilect",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1147",
    "generic_name": "rasburicase",
    "brand_name": "Elitek",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Synthelabo. Formulation: Vial for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1148",
    "generic_name": "ravulizumab",
    "brand_name": "Ultomiris",
    "therapeutic_class": "Complement Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Alexion Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Complement Inhibitor [EPC]."
  },
  {
    "id": "RAW_1149",
    "generic_name": "regadenoson",
    "brand_name": "Lexiscan",
    "therapeutic_class": "Adenosine Receptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Adenosine Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1150",
    "generic_name": "regorafenib",
    "brand_name": "Stivarga",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Healthcare Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1151",
    "generic_name": "relacorilant",
    "brand_name": "Lifyorli",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Corcept Therap. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1152",
    "generic_name": "remdesivir",
    "brand_name": "Veklury",
    "therapeutic_class": "SARS-CoV-2 Nucleotide Analog RNA Polymerase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: SARS-CoV-2 Nucleotide Analog RNA Polymerase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1153",
    "generic_name": "remibrutinib",
    "brand_name": "Rhapsido",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1154",
    "generic_name": "remifentanil hydrochloride",
    "brand_name": "Ultiva",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Institutional. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1155",
    "generic_name": "remimazolam besylate",
    "brand_name": "Byfavo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Acacia. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1156",
    "generic_name": "repository corticotropin",
    "brand_name": "Acthar, Purified Cortrophin Gel",
    "therapeutic_class": "Adrenocorticotropic Hormone [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Mallinckrodt Ireland. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Adrenocorticotropic Hormone [EPC]."
  },
  {
    "id": "RAW_1157",
    "generic_name": "repotrectinib",
    "brand_name": "Augtyro",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1158",
    "generic_name": "resmetirom",
    "brand_name": "Rezdiffra",
    "therapeutic_class": "Thyroid Hormone Receptor beta Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Madrigal. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thyroid Hormone Receptor beta Agonist [EPC]."
  },
  {
    "id": "RAW_1159",
    "generic_name": "reteplase",
    "brand_name": "Retavase",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ekr Therap. Formulation: Vial for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1160",
    "generic_name": "retifanlimab",
    "brand_name": "Zynyz",
    "therapeutic_class": "Programmed Death Receptor-1 Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Incyte Corp. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Receptor-1 Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_1161",
    "generic_name": "revefenacin",
    "brand_name": "Yupelri",
    "therapeutic_class": "Anticholinergic [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan Ireland Ltd. Formulation: Solution for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anticholinergic [EPC]."
  },
  {
    "id": "RAW_1162",
    "generic_name": "revumenib",
    "brand_name": "Revuforj",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Syndax. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1163",
    "generic_name": "rezafungin",
    "brand_name": "Rezzayo",
    "therapeutic_class": "Echinocandin Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Mundipharma. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Echinocandin Antifungal [EPC]."
  },
  {
    "id": "RAW_1164",
    "generic_name": "ribociclib",
    "brand_name": "Kisqali",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1165",
    "generic_name": "rifampin",
    "brand_name": "Rifadin Iv, Rimactane",
    "therapeutic_class": "Rifamycin Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Rifamycin Antibacterial [EPC]."
  },
  {
    "id": "RAW_1166",
    "generic_name": "rifapentine",
    "brand_name": "Priftin",
    "therapeutic_class": "Rifamycin Antimycobacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Rifamycin Antimycobacterial [EPC]."
  },
  {
    "id": "RAW_1167",
    "generic_name": "rifaximin",
    "brand_name": "Xifaxan",
    "therapeutic_class": "Rifamycin Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Salix Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Rifamycin Antibacterial [EPC]."
  },
  {
    "id": "RAW_1168",
    "generic_name": "rilonacept",
    "brand_name": "Arcalyst",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Kiniksa Pharmaceuticals (Uk), Ltd.. Formulation: Vial for Single-Use administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1169",
    "generic_name": "rilpivirine hydrochloride",
    "brand_name": "Edurant, Edurant Ped",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Prods. Formulation: Tablet, For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1170",
    "generic_name": "riluzole",
    "brand_name": "Tiglutik",
    "therapeutic_class": "Benzothiazole [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Italfarmaco Sa. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzothiazole [EPC]."
  },
  {
    "id": "RAW_1171",
    "generic_name": "rilzabrutinib",
    "brand_name": "Wayrilz",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme Corp. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1172",
    "generic_name": "rimabotulinumtoxinb",
    "brand_name": "Myobloc",
    "therapeutic_class": "Acetylcholine Release Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Elan Pharm. Formulation: Vial for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Acetylcholine Release Inhibitor [EPC]."
  },
  {
    "id": "RAW_1173",
    "generic_name": "rimantadine",
    "brand_name": "Amantadine, Gocovri",
    "therapeutic_class": "Influenza A M2 Protein Inhibitor [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Alembic. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Influenza A M2 Protein Inhibitor [EPC]."
  },
  {
    "id": "RAW_1174",
    "generic_name": "rimantadine hydrochloride",
    "brand_name": "Amantadine Hcl",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Bionpharma. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1175",
    "generic_name": "rimegepant sulfate",
    "brand_name": "Nurtec Odt",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet, Orally Disintegrating for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1176",
    "generic_name": "riociguat",
    "brand_name": "Adempas",
    "therapeutic_class": "Soluble Guanylate Cyclase Stimulator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Soluble Guanylate Cyclase Stimulator [EPC]."
  },
  {
    "id": "RAW_1177",
    "generic_name": "ripretinib",
    "brand_name": "Qinlock",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Deciphera Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1178",
    "generic_name": "risankizumab",
    "brand_name": "Skyrizi",
    "therapeutic_class": "Interleukin-23 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie Inc. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-23 Antagonist [EPC]."
  },
  {
    "id": "RAW_1179",
    "generic_name": "risdiplam",
    "brand_name": "Evrysdi",
    "therapeutic_class": "Survival of Motor Neuron 2 Splicing Modifier [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: For Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Survival of Motor Neuron 2 Splicing Modifier [EPC]."
  },
  {
    "id": "RAW_1180",
    "generic_name": "risedronate sodium",
    "brand_name": "Actonel, Atelvia",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Apil. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1181",
    "generic_name": "risperidone",
    "brand_name": "Risperdal, Risperdal Consta, Uzedy",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva. Formulation: Suspension, Extended Release for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_1182",
    "generic_name": "ritlecitinib",
    "brand_name": "Litfulo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1183",
    "generic_name": "ritonavir",
    "brand_name": "Norvir",
    "therapeutic_class": "Cytochrome P450 3A Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Powder for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cytochrome P450 3A Inhibitor [EPC]."
  },
  {
    "id": "RAW_1184",
    "generic_name": "rivaroxaban",
    "brand_name": "Xarelto",
    "therapeutic_class": "Factor Xa Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Pharms. Formulation: For Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Factor Xa Inhibitor [EPC]."
  },
  {
    "id": "RAW_1185",
    "generic_name": "rizatriptan benzoate",
    "brand_name": "Maxalt, Maxalt-Mlt, Rizafilm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon Llc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1186",
    "generic_name": "roflumilast",
    "brand_name": "Daliresp, Zoryve",
    "therapeutic_class": "Phosphodiesterase 4 Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phosphodiesterase 4 Inhibitor [EPC]."
  },
  {
    "id": "RAW_1187",
    "generic_name": "rolapitant",
    "brand_name": "Varubi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Tersera. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1188",
    "generic_name": "romidepsin",
    "brand_name": "Istodax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol-Myers. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1189",
    "generic_name": "romiplostim",
    "brand_name": "Nplate",
    "therapeutic_class": "Thrombopoietin Receptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thrombopoietin Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1190",
    "generic_name": "romosozumab",
    "brand_name": "Evenity",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1191",
    "generic_name": "ropivacaine hydrochloride",
    "brand_name": "Naropin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa. Formulation: Solution for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1192",
    "generic_name": "rosuvastain calcium",
    "brand_name": "Rosuvastatin Calcium",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Chartwell Rx. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1193",
    "generic_name": "rosuvastatin",
    "brand_name": "Crestor",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1194",
    "generic_name": "rotigotine",
    "brand_name": "Neupro",
    "therapeutic_class": "Nonergot Dopamine Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Film, Extended Release for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nonergot Dopamine Agonist [EPC]."
  },
  {
    "id": "RAW_1195",
    "generic_name": "rozanolixizumab",
    "brand_name": "Rystiggo",
    "therapeutic_class": "Neonatal Fc Receptor Blocker [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Neonatal Fc Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_1196",
    "generic_name": "rucaparib",
    "brand_name": "Rubraca",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmaand. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1197",
    "generic_name": "rufinamide",
    "brand_name": "Banzel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eisai Inc. Formulation: Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1198",
    "generic_name": "rufinamide mesylate",
    "brand_name": "Xadago",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mdd Us. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1199",
    "generic_name": "ruxolitinib",
    "brand_name": "Jakafi, Jakafi Xr, Opzelura",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Incyte Corp. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1200",
    "generic_name": "sacituzumab govitecan",
    "brand_name": "Trodelvy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Immunomedics Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1201",
    "generic_name": "sacrosidase",
    "brand_name": "Sucraid",
    "therapeutic_class": "Sucrose-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Qol Medcl. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sucrose-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_1202",
    "generic_name": "sacubitril and valsartan",
    "brand_name": "Entresto",
    "therapeutic_class": "Angiotensin 2 Receptor Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis Pharms Corp. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin 2 Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_1203",
    "generic_name": "safinamide mesylate",
    "brand_name": "Rufinamide Mesylate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Prinston Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1204",
    "generic_name": "salmeterol xinafoate",
    "brand_name": "Serevent Diskus",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Powder for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1205",
    "generic_name": "sapropterin dihydrochloride",
    "brand_name": "Javygtor, Kuvan, Zelvysia",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Aucta. Formulation: For Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1206",
    "generic_name": "sarecycline hydrochloride",
    "brand_name": "Seysara",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Almirall. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1207",
    "generic_name": "sargramostim",
    "brand_name": "Leukine",
    "therapeutic_class": "Leukocyte Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Berlex Labs. Formulation: Vial for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Leukocyte Growth Factor [EPC]."
  },
  {
    "id": "RAW_1208",
    "generic_name": "sarilumab",
    "brand_name": "Kevzara",
    "therapeutic_class": "Interleukin-6 Receptor Antagonist [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Synthelabo. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-6 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1209",
    "generic_name": "satralizumab",
    "brand_name": "Enspryng",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1210",
    "generic_name": "scopolamine",
    "brand_name": "Transderm Scop",
    "therapeutic_class": "Anticholinergic [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Baxter Hlthcare Corp. Formulation: System for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anticholinergic [EPC]."
  },
  {
    "id": "RAW_1211",
    "generic_name": "sebelipase alfa",
    "brand_name": "Kanuma",
    "therapeutic_class": "Hydrolytic Lysosomal Cholesteryl Ester-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alexion Pharm. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Cholesteryl Ester-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_1212",
    "generic_name": "sebetralstat",
    "brand_name": "Ekterly",
    "therapeutic_class": "Plasma Kallikrein Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Kalvista. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Plasma Kallikrein Inhibitor [EPC]."
  },
  {
    "id": "RAW_1213",
    "generic_name": "secnidazole",
    "brand_name": "Solosec",
    "therapeutic_class": "Nitroimidazole Antimicrobial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Evofem Inc. Formulation: Granule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nitroimidazole Antimicrobial [EPC]."
  },
  {
    "id": "RAW_1214",
    "generic_name": "secukinumab",
    "brand_name": "Cosentyx",
    "therapeutic_class": "Interleukin-17A Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis Pharms Corp. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-17A Antagonist [EPC]."
  },
  {
    "id": "RAW_1215",
    "generic_name": "seladelpar lysine",
    "brand_name": "Livdelzi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1216",
    "generic_name": "selegiline",
    "brand_name": "Emsam",
    "therapeutic_class": "Monoamine Oxidase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Somerset. Formulation: System for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Monoamine Oxidase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1217",
    "generic_name": "selegiline hydrochloride",
    "brand_name": "Zelapar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Tablet, Orally Disintegrating for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1218",
    "generic_name": "selenium acid",
    "brand_name": "Selenious Acid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Gland. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1219",
    "generic_name": "selexipag",
    "brand_name": "Uptravi",
    "therapeutic_class": "Prostacyclin Receptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Actelion. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostacyclin Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1220",
    "generic_name": "selinexor",
    "brand_name": "Xpovio",
    "therapeutic_class": "Nuclear Export Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Karyopharm Theraps. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nuclear Export Inhibitor [EPC]."
  },
  {
    "id": "RAW_1221",
    "generic_name": "selpercatinib",
    "brand_name": "Retevmo",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1222",
    "generic_name": "selumetinib",
    "brand_name": "Koselugo",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1223",
    "generic_name": "semaglutide",
    "brand_name": "Ozempic, Rybelsus, Wegovy",
    "therapeutic_class": "GLP-1 Receptor Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: GLP-1 Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1224",
    "generic_name": "sepiapterin",
    "brand_name": "Sephience",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ptc Therap. Formulation: Powder for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1225",
    "generic_name": "sertaconazole nitrate",
    "brand_name": "Ertaczo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Lacer Pharma. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1226",
    "generic_name": "sertraline hydrochloride",
    "brand_name": "Zoloft",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Viatris. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1227",
    "generic_name": "setmelanotide",
    "brand_name": "Imcivree",
    "therapeutic_class": "Melanocortin 4 Receptor Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Rhythm. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Melanocortin 4 Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1228",
    "generic_name": "sevabertinib",
    "brand_name": "Hyrnuo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Healthcare. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1229",
    "generic_name": "sevelamer hydrochloride",
    "brand_name": "Renagel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1230",
    "generic_name": "sevoflurane",
    "brand_name": "Ultane",
    "therapeutic_class": "General Anesthetic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Liquid for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: General Anesthetic [EPC]."
  },
  {
    "id": "RAW_1231",
    "generic_name": "sibeprenlimab",
    "brand_name": "Voyxact",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Otsuka Pharm Co Ltd. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1232",
    "generic_name": "sildenafil",
    "brand_name": "Viagra",
    "therapeutic_class": "Phosphodiesterase 5 Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phosphodiesterase 5 Inhibitor [EPC]."
  },
  {
    "id": "RAW_1233",
    "generic_name": "sildenafil citrate",
    "brand_name": "Revatio, Vybrique",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ibsa. Formulation: Film for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1234",
    "generic_name": "siltuximab",
    "brand_name": "Sylvant",
    "therapeutic_class": "Interleukin-6 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Recordati Rare Diseases, Inc.. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-6 Antagonist [EPC]."
  },
  {
    "id": "RAW_1235",
    "generic_name": "silver sulfadiazine",
    "brand_name": "Ssd Cream",
    "therapeutic_class": "Sulfonamide Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Dr Reddys. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sulfonamide Antibacterial [EPC]."
  },
  {
    "id": "RAW_1236",
    "generic_name": "simvastatin",
    "brand_name": "Flolipid, Zocor",
    "therapeutic_class": "HMG-CoA Reductase Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: HMG-CoA Reductase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1237",
    "generic_name": "sincalide",
    "brand_name": "Kinevac",
    "therapeutic_class": "Cholecystokinin Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bracco. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cholecystokinin Analog [EPC]."
  },
  {
    "id": "RAW_1238",
    "generic_name": "sinecatechins",
    "brand_name": "Veregen",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ani Pharms. Formulation: Ointment for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1239",
    "generic_name": "siponimod",
    "brand_name": "Mayzent",
    "therapeutic_class": "Sphingosine 1-phosphate Receptor Modulator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sphingosine 1-phosphate Receptor Modulator [EPC]."
  },
  {
    "id": "RAW_1240",
    "generic_name": "sirolimus",
    "brand_name": "Fyarro, Hyftor",
    "therapeutic_class": "mTOR Inhibitor Immunosuppressant [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Nobelpharma. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: mTOR Inhibitor Immunosuppressant [EPC]."
  },
  {
    "id": "RAW_1241",
    "generic_name": "sitagliptin",
    "brand_name": "Januvia, Saxagliptin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Aurobindo Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1242",
    "generic_name": "sitagliptin and metformin",
    "brand_name": "Saxagliptin And Metformin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Mylan. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1243",
    "generic_name": "sitagliptin hydrochloride oral",
    "brand_name": "Brynovin",
    "therapeutic_class": "Dipeptidyl Peptidase 4 Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dipeptidyl Peptidase 4 Inhibitor [EPC]."
  },
  {
    "id": "RAW_1244",
    "generic_name": "sodium ferric gluconate complex",
    "brand_name": "Ferrlecit",
    "therapeutic_class": "Parenteral Iron Replacement [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Parenteral Iron Replacement [EPC]."
  },
  {
    "id": "RAW_1245",
    "generic_name": "sodium nitroprusside",
    "brand_name": "Nipride Rtu",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Exela Pharma. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1246",
    "generic_name": "sodium oxybate",
    "brand_name": "Lumryz",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Avadel Cns. Formulation: For Suspension, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1247",
    "generic_name": "sodium phenylbutyrate",
    "brand_name": "Olpruva, Pheburane",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Medunik. Formulation: Pellets for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1248",
    "generic_name": "sodium polystyrene sulfonate",
    "brand_name": "Kionex",
    "therapeutic_class": "Potassium Binder [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ani Pharms. Formulation: Powder for Oral, Rectal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Potassium Binder [EPC]."
  },
  {
    "id": "RAW_1249",
    "generic_name": "sodium thiosulfate",
    "brand_name": "Pedmark",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Fennec Pharms Inc. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1250",
    "generic_name": "sodium zirconium cyclosilicate",
    "brand_name": "Lokelma",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1251",
    "generic_name": "sofosbuvir",
    "brand_name": "Sovaldi",
    "therapeutic_class": "Hepatitis C Virus Nucleotide Analog NS5B Polymerase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Pellets for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hepatitis C Virus Nucleotide Analog NS5B Polymerase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1252",
    "generic_name": "sofpironium bromide",
    "brand_name": "Sofdra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Botanix Sb. Formulation: Gel, Metered for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1253",
    "generic_name": "solifenacin succiate",
    "brand_name": "Solifenacin Succinate",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bostal. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1254",
    "generic_name": "solriamfetol",
    "brand_name": "Sunosi",
    "therapeutic_class": "Dopamine and Norepinephrine Reuptake Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Axsome Malta. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Dopamine and Norepinephrine Reuptake Inhibitor [EPC]."
  },
  {
    "id": "RAW_1255",
    "generic_name": "somapacitan",
    "brand_name": "Sogroya",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Novo Nordisk Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1256",
    "generic_name": "somatropin",
    "brand_name": "Genotropin, Humatrope, Ngenla, Norditropin, Nutropin Aq Pen, Omnitrope, Saizen, Serostim, Zomacton",
    "therapeutic_class": "Recombinant Human Growth Hormone [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Lilly. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Recombinant Human Growth Hormone [EPC]."
  },
  {
    "id": "RAW_1257",
    "generic_name": "somatropin recombinant",
    "brand_name": "Zorbtive",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Emd Serono. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1258",
    "generic_name": "sonidegib",
    "brand_name": "Odomzo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1259",
    "generic_name": "sonrotoclax",
    "brand_name": "Beqalzi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Beone Medicines Usa. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1260",
    "generic_name": "sorafenib",
    "brand_name": "Nexavar",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bayer Hlthcare. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1261",
    "generic_name": "sorbitol and mannitol",
    "brand_name": "Sorbitol-Mannitol",
    "therapeutic_class": "Osmotic Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Otsuka Icu Medcl. Formulation: Solution for Irrigation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Osmotic Diuretic [EPC]."
  },
  {
    "id": "RAW_1262",
    "generic_name": "sotagliflozin",
    "brand_name": "Inpefa",
    "therapeutic_class": "Sodium-Glucose Cotransporter 2 Inhibitor [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Lexicon Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sodium-Glucose Cotransporter 2 Inhibitor [EPC]."
  },
  {
    "id": "RAW_1263",
    "generic_name": "sotalol hydrochloride",
    "brand_name": "Betapace, Betapace Af, Sotylize",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1264",
    "generic_name": "sotalol hydrochloride af",
    "brand_name": "Sotalol Hydrochloride Tables Af",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Regcon Holdings. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1265",
    "generic_name": "sotorasib",
    "brand_name": "Lumakras",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Amgen Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1266",
    "generic_name": "sparsentan",
    "brand_name": "Filspari",
    "therapeutic_class": "Endothelin Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Travere. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Endothelin Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1267",
    "generic_name": "spesolimab",
    "brand_name": "Spevigo",
    "therapeutic_class": "Interleukin-36 Receptor Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim Pharmaceuticals Inc. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-36 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1268",
    "generic_name": "spinosad",
    "brand_name": "Natroba",
    "therapeutic_class": "Pediculicide [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cipher. Formulation: Suspension for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Pediculicide [EPC]."
  },
  {
    "id": "RAW_1269",
    "generic_name": "spironolactone",
    "brand_name": "Aldactone",
    "therapeutic_class": "Aldosterone Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aldosterone Antagonist [EPC]."
  },
  {
    "id": "RAW_1270",
    "generic_name": "stiripentol",
    "brand_name": "Diacomit",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biocodex Sa. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1271",
    "generic_name": "succimer",
    "brand_name": "Chemet, Nephroscan",
    "therapeutic_class": "Lead Chelator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Recordati Rare. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Lead Chelator [EPC]."
  },
  {
    "id": "RAW_1272",
    "generic_name": "succinylcholine chloride",
    "brand_name": "Anectine, Quelicin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1273",
    "generic_name": "sucralfate",
    "brand_name": "Carafate",
    "therapeutic_class": "Aluminum Complex [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aluminum Complex [EPC]."
  },
  {
    "id": "RAW_1274",
    "generic_name": "sucroferric oxyhydroxide",
    "brand_name": "Velphoro",
    "therapeutic_class": "Phosphate Binder [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vifor Fresenius. Formulation: Tablet, Chewable for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phosphate Binder [EPC]."
  },
  {
    "id": "RAW_1275",
    "generic_name": "sufentanil citrate",
    "brand_name": "Sufenta Preservative Free",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Rising. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1276",
    "generic_name": "sufentanil hydrochloride",
    "brand_name": "Alfenta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Rising. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1277",
    "generic_name": "sugammadex",
    "brand_name": "Bridion",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd Sub Merck. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1278",
    "generic_name": "sulbactam and durlobactam",
    "brand_name": "Xacduro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Entasis Therap. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1279",
    "generic_name": "sulconazole nitrate",
    "brand_name": "Exelderm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Journey. Formulation: Cream for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1280",
    "generic_name": "sulfamethoxazole and trimethoprim",
    "brand_name": "Bactrim",
    "therapeutic_class": "Sulfonamide Antimicrobial [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm Industries. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sulfonamide Antimicrobial [EPC]."
  },
  {
    "id": "RAW_1281",
    "generic_name": "sulfasalazine",
    "brand_name": "Azulfidine, Azulfidine En-Tabs",
    "therapeutic_class": "Aminosalicylate [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet, Delayed Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aminosalicylate [EPC]."
  },
  {
    "id": "RAW_1282",
    "generic_name": "sulopenem etzadroxil and probenecid",
    "brand_name": "Orlynvah",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Iterum Therap. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1283",
    "generic_name": "sumatriptan",
    "brand_name": "Imitrex, Tosymra",
    "therapeutic_class": "Serotonin-1b and Serotonin-1d Receptor Agonist [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Serotonin-1b and Serotonin-1d Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1284",
    "generic_name": "sumatriptan succinate",
    "brand_name": "Onzetra Xsail, Zembrace Symtouch",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Tonix Meds. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1285",
    "generic_name": "sunitinib malate",
    "brand_name": "Sutent",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Cppi Cv. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1286",
    "generic_name": "sunvozertinib",
    "brand_name": "Zegfrovy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Dizal Jiangsu. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1287",
    "generic_name": "sutimlimab",
    "brand_name": "Enjaymo",
    "therapeutic_class": "Classical Complement Pathway Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Recordati Rare Diseases, Inc.. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Classical Complement Pathway Inhibitor [EPC]."
  },
  {
    "id": "RAW_1288",
    "generic_name": "suvorexant",
    "brand_name": "Belsomra",
    "therapeutic_class": "Orexin Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck Sharp Dohme. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Orexin Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1289",
    "generic_name": "suzetrigine",
    "brand_name": "Journavx",
    "therapeutic_class": "Sodium Channel Blocker [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vertex Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Sodium Channel Blocker [EPC]."
  },
  {
    "id": "RAW_1290",
    "generic_name": "tacrolimus",
    "brand_name": "Envarsus Xr, Prograf",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1291",
    "generic_name": "tadalafil",
    "brand_name": "Adcirca, Alyq, Cialis, N/A, Tadliq",
    "therapeutic_class": "Phosphodiesterase 5 Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cmp Dev Llc. Formulation: Suspension for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Phosphodiesterase 5 Inhibitor [EPC]."
  },
  {
    "id": "RAW_1292",
    "generic_name": "tafamidis",
    "brand_name": "Vyndamax",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Foldrx Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1293",
    "generic_name": "tafasitamab",
    "brand_name": "Monjuvi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Morphosys Us Inc. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1294",
    "generic_name": "tafenoquine",
    "brand_name": "Arakoda",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by 60 Degrees Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1295",
    "generic_name": "tafenoquine succinate",
    "brand_name": "Krintafel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1296",
    "generic_name": "tagraxofusp",
    "brand_name": "Elzonris",
    "therapeutic_class": "CD123 Interaction [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Stemline Therapeutics Inc. Formulation: Solution for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD123 Interaction [EPC]."
  },
  {
    "id": "RAW_1297",
    "generic_name": "talazoparib",
    "brand_name": "Talzenna",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1298",
    "generic_name": "talc",
    "brand_name": "Sclerosol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sciarra Labs. Formulation: Aerosol for Intrapleural administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1299",
    "generic_name": "taletrectinib",
    "brand_name": "Ibtrozi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Nuvation. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1300",
    "generic_name": "taliglucerase alfa",
    "brand_name": "Elelyso",
    "therapeutic_class": "Hydrolytic Lysosomal Glucocerebroside-specific Enzyme [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glucocerebroside-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_1301",
    "generic_name": "talquetamab",
    "brand_name": "Talvey",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1302",
    "generic_name": "tamoxifen citrate",
    "brand_name": "Soltamox",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mayne Pharma Commrcl. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1303",
    "generic_name": "tapinarof",
    "brand_name": "Vtama",
    "therapeutic_class": "Aryl Hydrocarbon Receptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Organon Llc. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aryl Hydrocarbon Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1304",
    "generic_name": "tasimelteon",
    "brand_name": "Hetlioz, Hetlioz Lq",
    "therapeutic_class": "Melatonin Receptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vanda Pharms Inc. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Melatonin Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1305",
    "generic_name": "taurolidine and heparin",
    "brand_name": "Defencath",
    "therapeutic_class": "Anti-coagulant [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Cormedix. Formulation: Solution for N/A administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anti-coagulant [EPC]."
  },
  {
    "id": "RAW_1306",
    "generic_name": "tazarotene",
    "brand_name": "Arazlo, Tazorac",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Almirall. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_1307",
    "generic_name": "tazemetostat hydrobromide",
    "brand_name": "Tazverik",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Epizyme Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1308",
    "generic_name": "tbo-filgrastim",
    "brand_name": "Granix",
    "therapeutic_class": "Leukocyte Growth Factor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sicor Biotech. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Leukocyte Growth Factor [EPC]."
  },
  {
    "id": "RAW_1309",
    "generic_name": "tebentafusp",
    "brand_name": "Kimmtrak",
    "therapeutic_class": "Bispecific gp100 Peptide-HLA-directed CD3 T Cell Engager [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Immunocore Ltd. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bispecific gp100 Peptide-HLA-directed CD3 T Cell Engager [EPC]."
  },
  {
    "id": "RAW_1310",
    "generic_name": "tebipenem, pivoxil",
    "brand_name": "Utebzi",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline Llc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1311",
    "generic_name": "teclistamab",
    "brand_name": "Tecvayli",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Biotech. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1312",
    "generic_name": "tecovirimat monohydrate",
    "brand_name": "Tpoxx",
    "therapeutic_class": "Orthopoxvirus VP37 Envelope Wrapping Protein Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Siga Technologies. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Orthopoxvirus VP37 Envelope Wrapping Protein Inhibitor [EPC]."
  },
  {
    "id": "RAW_1313",
    "generic_name": "tedizolid phosphate",
    "brand_name": "Sivextro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cubist Pharms Llc. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1314",
    "generic_name": "teduglutide",
    "brand_name": "Gattex",
    "therapeutic_class": "GLP-2 Analog [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Powder for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: GLP-2 Analog [EPC]."
  },
  {
    "id": "RAW_1315",
    "generic_name": "telavancin",
    "brand_name": "Vibativ",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Theravance Inc. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1316",
    "generic_name": "telavancin hydrochloride",
    "brand_name": "Vibativ",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cumberland. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1317",
    "generic_name": "telisotuzumab vedotin",
    "brand_name": "Emrelis",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie Inc. Formulation: Vial for Single-Dose administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1318",
    "generic_name": "telmisartan",
    "brand_name": "Micardis",
    "therapeutic_class": "Angiotensin 2 Receptor Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin 2 Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_1319",
    "generic_name": "telmisartan and hydrochlorothiazide",
    "brand_name": "Micardis Hct",
    "therapeutic_class": "Angiotensin 2 Receptor Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin 2 Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_1320",
    "generic_name": "telotristat ethinyl",
    "brand_name": "Xermelo",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Tersera. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1321",
    "generic_name": "temazepam",
    "brand_name": "Restoril",
    "therapeutic_class": "Benzodiazepine [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Specgx Llc. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzodiazepine [EPC]."
  },
  {
    "id": "RAW_1322",
    "generic_name": "temozolomide",
    "brand_name": "Temodar",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Merck Sharp Dohme. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_1323",
    "generic_name": "temsirolimus",
    "brand_name": "Torisel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pf Prism Cv. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1324",
    "generic_name": "tenapanor hydrochloride",
    "brand_name": "Ibsrela",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ardelyx Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1325",
    "generic_name": "tenecteplase",
    "brand_name": "Tnkase",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Vial for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1326",
    "generic_name": "tenofovir alafenamide",
    "brand_name": "Vemlidy",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1327",
    "generic_name": "tenofovir disoproxil fumarate",
    "brand_name": "Viread",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1328",
    "generic_name": "teplizumab",
    "brand_name": "Tzield",
    "therapeutic_class": "CD3-directed Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Provention Bio Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD3-directed Antibody [EPC]."
  },
  {
    "id": "RAW_1329",
    "generic_name": "tepotinib hydrochloride",
    "brand_name": "Tepmetko",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Emd Serono Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1330",
    "generic_name": "teprotumumab",
    "brand_name": "Tepezza",
    "therapeutic_class": "Insulin-like Growth Factor-1 Receptor Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Horizon Therapeutics Ireland. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Insulin-like Growth Factor-1 Receptor Inhibitor [EPC]."
  },
  {
    "id": "RAW_1331",
    "generic_name": "terbinafine",
    "brand_name": "Lamisil",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Invagen Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1332",
    "generic_name": "terbinafine hydrochloride",
    "brand_name": "Lamisil",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Karo Hlthcare. Formulation: Solution for Topical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1333",
    "generic_name": "teriflunomide",
    "brand_name": "Aubagio",
    "therapeutic_class": "Pyrimidine Synthesis Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Pyrimidine Synthesis Inhibitor [EPC]."
  },
  {
    "id": "RAW_1334",
    "generic_name": "terlipressin",
    "brand_name": "Terlivaz",
    "therapeutic_class": "Vasopressin Receptor Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mallinckrodt Ireland. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vasopressin Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1335",
    "generic_name": "tesamorelin",
    "brand_name": "Egrifta Wr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Theratechnologies. Formulation: Powder for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1336",
    "generic_name": "testosterone",
    "brand_name": "Androgel, Natesto Nasal Gel, Testim, Testopel, Vogelxo",
    "therapeutic_class": "Androgen [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Endo Operations. Formulation: Gel for Transdermal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Androgen [EPC]."
  },
  {
    "id": "RAW_1337",
    "generic_name": "testosterone cypionate",
    "brand_name": "Azmiro",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: Solution for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1338",
    "generic_name": "testosterone enanthate",
    "brand_name": "Xyosted",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Antares Pharma Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1339",
    "generic_name": "testosterone undecanoate",
    "brand_name": "Aveed, Jatenzo, Kyzatrex, Tlando",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Tolmar. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1340",
    "generic_name": "tetrabenazine",
    "brand_name": "Xenazine",
    "therapeutic_class": "Vesicular Monoamine Transporter 2 Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vesicular Monoamine Transporter 2 Inhibitor [EPC]."
  },
  {
    "id": "RAW_1341",
    "generic_name": "tetrahydrozoline hydrochloride",
    "brand_name": "Tyzine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Fougera Pharms. Formulation: Solution for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1342",
    "generic_name": "tetrofosmin",
    "brand_name": "Myoview",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Medi-Physics. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1343",
    "generic_name": "tezacaftor and ivacaftor",
    "brand_name": "Symdeko",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vertex Pharms Inc. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1344",
    "generic_name": "tezepelumab",
    "brand_name": "Tezspire",
    "therapeutic_class": "Thymic Stromal Lymphopoietin Blocker [EPC]",
    "broad_category": "Gastrointestinal System",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Ab. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thymic Stromal Lymphopoietin Blocker [EPC]."
  },
  {
    "id": "RAW_1345",
    "generic_name": "thalidomide",
    "brand_name": "Thalomid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol-Myers. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1346",
    "generic_name": "thioguanine",
    "brand_name": "Tabloid",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Waylis Therap. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1347",
    "generic_name": "thiotepa",
    "brand_name": "Tepadina, Tepylute",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Adienne Sa. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_1348",
    "generic_name": "thyrotropin alfa",
    "brand_name": "Thyrogen",
    "therapeutic_class": "Thyroid Stimulating Hormone [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Thyroid Stimulating Hormone [EPC]."
  },
  {
    "id": "RAW_1349",
    "generic_name": "ticagrelor",
    "brand_name": "Brilinta",
    "therapeutic_class": "P2Y12 Platelet Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: P2Y12 Platelet Inhibitor [EPC]."
  },
  {
    "id": "RAW_1350",
    "generic_name": "tigecycline",
    "brand_name": "Tygacil",
    "therapeutic_class": "Tetracycline-class Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pf Prism Cv. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Tetracycline-class Antibacterial [EPC]."
  },
  {
    "id": "RAW_1351",
    "generic_name": "tildrakizumab",
    "brand_name": "Ilumya",
    "therapeutic_class": "Interleukin-23 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharma Global. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-23 Antagonist [EPC]."
  },
  {
    "id": "RAW_1352",
    "generic_name": "timidazole",
    "brand_name": "Tindamax, Tindazole, Tinidazole",
    "therapeutic_class": "Nitroimidazole Antimicrobial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Mission Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nitroimidazole Antimicrobial [EPC]."
  },
  {
    "id": "RAW_1353",
    "generic_name": "timolol",
    "brand_name": "Betimol",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Thea Pharma. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1354",
    "generic_name": "timolol maleate",
    "brand_name": "Istalol, Timoptic, Timoptic In Ocudose, Timoptic-Xe",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch And Lomb. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1355",
    "generic_name": "tiopronin",
    "brand_name": "Thiola, Thiola Ec, Tiocystin, Venxxiva",
    "therapeutic_class": "Reducing and Complexing Thiol [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Casper Pharma Llc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Reducing and Complexing Thiol [EPC]."
  },
  {
    "id": "RAW_1356",
    "generic_name": "tiotropium bromide",
    "brand_name": "Spiriva Handihaler",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Powder for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1357",
    "generic_name": "tiotropium bromide and olodaterol",
    "brand_name": "Stiolto Respimat",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Spray, Metered for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1358",
    "generic_name": "tiotropium bromide inhalation spray",
    "brand_name": "Spiriva Respimat",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Spray for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1359",
    "generic_name": "tipranavir",
    "brand_name": "Aptivus",
    "therapeutic_class": "Protease Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Protease Inhibitor [EPC]."
  },
  {
    "id": "RAW_1360",
    "generic_name": "tirbanibulin",
    "brand_name": "Klisyri",
    "therapeutic_class": "Microtubule Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Almirall. Formulation: Ointment for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Microtubule Inhibitor [EPC]."
  },
  {
    "id": "RAW_1361",
    "generic_name": "tirofiban",
    "brand_name": "Aggrastat",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Medicure. Formulation: Solution for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1362",
    "generic_name": "tirzepatide",
    "brand_name": "Mounjaro, Zepbound",
    "therapeutic_class": "Glucose-dependent Insulinotropic Polypeptide Receptor Agonist [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Eli Lilly And Co. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Glucose-dependent Insulinotropic Polypeptide Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1363",
    "generic_name": "tislelizumab",
    "brand_name": "Tevimbra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Beigene. Formulation: Injection for Solution administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1364",
    "generic_name": "tisotumab vedotin",
    "brand_name": "Tivdak",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Seagen. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1365",
    "generic_name": "tividenofusp alfa",
    "brand_name": "Avlayah",
    "therapeutic_class": "Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Denali Therapeutics Inc.. Formulation: Injection for Powder,For Solution administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glycosaminoglycan-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_1366",
    "generic_name": "tivozanib",
    "brand_name": "Fotivda",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Aveo Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1367",
    "generic_name": "tizanidine hydrochloride",
    "brand_name": "Ontralfy, Zanaflex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Legacy Pharma Usa. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1368",
    "generic_name": "tizanidne hydrochloride",
    "brand_name": "Tizanidine Hydrochloride",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alkem Labs Ltd. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1369",
    "generic_name": "tobramycin",
    "brand_name": "Tobi, Tobi Podhaler, Tobrex",
    "therapeutic_class": "Aminoglycoside Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Viatris. Formulation: Solution for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Aminoglycoside Antibacterial [EPC]."
  },
  {
    "id": "RAW_1370",
    "generic_name": "tobramycin and dexamethasone",
    "brand_name": "Tobradex, Tobradex St",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Ointment for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_1371",
    "generic_name": "tocilizumab",
    "brand_name": "Actemra, Avtozma, Tofidence, Tyenne",
    "therapeutic_class": "Interleukin-6 Receptor Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Celltrion Inc. Formulation: Injectable for Iv (Infusion) administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-6 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1372",
    "generic_name": "tofacitinib",
    "brand_name": "Xeljanz, Xeljanz Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pf Prism Cv. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1373",
    "generic_name": "tofersen",
    "brand_name": "Qalsody",
    "therapeutic_class": "Antisense Oligonucleotide [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Biogen Ma. Formulation: Solution for Intrathecal administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antisense Oligonucleotide [EPC]."
  },
  {
    "id": "RAW_1374",
    "generic_name": "tolcapone",
    "brand_name": "Tasmar",
    "therapeutic_class": "Catechol-O-Methyltransferase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Catechol-O-Methyltransferase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1375",
    "generic_name": "tolterodine tartrate",
    "brand_name": "Detrol La",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Upjohn. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1376",
    "generic_name": "tolvaptan",
    "brand_name": "Jynarque, Samsca",
    "therapeutic_class": "Vasopressin V2 Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Otsuka. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vasopressin V2 Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1377",
    "generic_name": "topiramate",
    "brand_name": "Eprontia, Topamax, Trokendi Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Supernus Pharms. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1378",
    "generic_name": "topotecan",
    "brand_name": "Hycamtin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1379",
    "generic_name": "topotecan hydrochloride",
    "brand_name": "Hycamtin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1380",
    "generic_name": "toripalimab",
    "brand_name": "Loqtorzi",
    "therapeutic_class": "Programmed Death Receptor-1 Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Coherus Biosciences Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Programmed Death Receptor-1 Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_1381",
    "generic_name": "torsemide",
    "brand_name": "Soaanz",
    "therapeutic_class": "Loop Diuretic [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sarfe Pharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Loop Diuretic [EPC]."
  },
  {
    "id": "RAW_1382",
    "generic_name": "tovorafenib",
    "brand_name": "Ojemda",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Day One Biopharms. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1383",
    "generic_name": "tr and olapril",
    "brand_name": "Trandolapril",
    "therapeutic_class": "Angiotensin Converting Enzyme Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Lupin. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin Converting Enzyme Inhibitor [EPC]."
  },
  {
    "id": "RAW_1384",
    "generic_name": "tr and olapril tablets",
    "brand_name": "Trandolapril",
    "therapeutic_class": "Angiotensin Converting Enzyme Inhibitor [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Epic Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin Converting Enzyme Inhibitor [EPC]."
  },
  {
    "id": "RAW_1385",
    "generic_name": "trabectedin",
    "brand_name": "Evdi, Yondelis",
    "therapeutic_class": "Alkylating Drug [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Janssen Prods. Formulation: Powder for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Alkylating Drug [EPC]."
  },
  {
    "id": "RAW_1386",
    "generic_name": "tradipitant",
    "brand_name": "Nereus",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Vanda Pharms Inc. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1387",
    "generic_name": "tralokinumab",
    "brand_name": "Adbry",
    "therapeutic_class": "Interleukin-13 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Leo Pharma As. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-13 Antagonist [EPC]."
  },
  {
    "id": "RAW_1388",
    "generic_name": "tramadol hydrochloride",
    "brand_name": "Ultram",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharm. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1389",
    "generic_name": "trametinib",
    "brand_name": "Mekinist",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1390",
    "generic_name": "tranexamic acid",
    "brand_name": "Cyklokapron",
    "therapeutic_class": "Antifibrinolytic Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Antifibrinolytic Agent [EPC]."
  },
  {
    "id": "RAW_1391",
    "generic_name": "trastuzumab",
    "brand_name": "Herceptin, Hercessi, Herzuma, Kanjinti, Ogivri, Ontruzant, Trazimera",
    "therapeutic_class": "HER2/neu Receptor Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: HER2/neu Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1392",
    "generic_name": "trastuzumab and hyaluronidase",
    "brand_name": "Herceptin Hylecta",
    "therapeutic_class": "Endoglycosidase [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech Inc. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Endoglycosidase [EPC]."
  },
  {
    "id": "RAW_1393",
    "generic_name": "travoprost",
    "brand_name": "Travatan Z",
    "therapeutic_class": "Prostaglandin Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostaglandin Analog [EPC]."
  },
  {
    "id": "RAW_1394",
    "generic_name": "travoprost intracameral",
    "brand_name": "Idose Tr",
    "therapeutic_class": "Prostaglandin Analog [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaukos. Formulation: Implant for Intracameral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostaglandin Analog [EPC]."
  },
  {
    "id": "RAW_1395",
    "generic_name": "trazodone hydrochloride",
    "brand_name": "Desyrel",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Teva Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1396",
    "generic_name": "trazodone hydrochloride oral",
    "brand_name": "Raldesy Tm",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Kamat. Formulation: Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1397",
    "generic_name": "tremelimumab",
    "brand_name": "Imjudo",
    "therapeutic_class": "CTLA-4-directed Blocking Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astrazeneca Ab. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: CTLA-4-directed Blocking Antibody [EPC]."
  },
  {
    "id": "RAW_1398",
    "generic_name": "treosulfan",
    "brand_name": "Grafapex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Medexus. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1399",
    "generic_name": "treprostinil",
    "brand_name": "Orenitram, Remodulin, Tyvaso, Tyvaso Dpi, Yutrepia",
    "therapeutic_class": "Prostacycline Vasodilator [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by United Therap. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Prostacycline Vasodilator [EPC]."
  },
  {
    "id": "RAW_1400",
    "generic_name": "tretinoin",
    "brand_name": "Altreno, Renova, Retin-A, Retin-A Micro",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Gel for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_1401",
    "generic_name": "tretinoin and benzoyl pergolide",
    "brand_name": "Twyneo",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Mayne Pharma. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_1402",
    "generic_name": "triamcinolone acetonide",
    "brand_name": "Kourzeq, Oralone, Triderm, Triesence, Xipere",
    "therapeutic_class": "Corticosteroid [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Sun Pharma Canada. Formulation: Paste for Dental administration.",
    "indication": "Used as a therapeutic agent for indications related to: Corticosteroid [EPC]."
  },
  {
    "id": "RAW_1403",
    "generic_name": "triazolam",
    "brand_name": "Halcion",
    "therapeutic_class": "Benzodiazepine [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Benzodiazepine [EPC]."
  },
  {
    "id": "RAW_1404",
    "generic_name": "triclabendazole",
    "brand_name": "Egaten",
    "therapeutic_class": "Anthelmintic [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anthelmintic [EPC]."
  },
  {
    "id": "RAW_1405",
    "generic_name": "trientine hydrochloride",
    "brand_name": "Syprine",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1406",
    "generic_name": "trientine tetrahydrochloride",
    "brand_name": "Cuvrior",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Orphalan. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1407",
    "generic_name": "trifarotene",
    "brand_name": "Aklief",
    "therapeutic_class": "Retinoid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Galderma Labs Lp. Formulation: Cream for Topical administration.",
    "indication": "Used as a therapeutic agent for indications related to: Retinoid [EPC]."
  },
  {
    "id": "RAW_1408",
    "generic_name": "trifluridine",
    "brand_name": "Viroptic",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Monarch Pharms. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1409",
    "generic_name": "trifluridine and tipiracil",
    "brand_name": "Lonsurf",
    "therapeutic_class": "Nucleoside Analog Antiviral [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Taiho Oncology. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Nucleoside Analog Antiviral [EPC]."
  },
  {
    "id": "RAW_1410",
    "generic_name": "triheptanoin",
    "brand_name": "Dojolvi",
    "therapeutic_class": "Medium-chain Triglyceride [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ultragenyx Pharm Inc. Formulation: Liquid for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Medium-chain Triglyceride [EPC]."
  },
  {
    "id": "RAW_1411",
    "generic_name": "trilaciclib",
    "brand_name": "Cosela",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pharmacosmos. Formulation: Powder for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1412",
    "generic_name": "trimethobenzamide hydrochloride",
    "brand_name": "Tigan",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1413",
    "generic_name": "triptorelin",
    "brand_name": "Triptodur",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Azurity. Formulation: For Suspension, Extended Release for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1414",
    "generic_name": "triptorelin pamoate",
    "brand_name": "Trelstar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Verity. Formulation: Injectable for Intramuscular administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1415",
    "generic_name": "trofinetide",
    "brand_name": "Daybue, Daybue Stix",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Acadia Pharms Inc. Formulation: For Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1416",
    "generic_name": "tropicamide",
    "brand_name": "Mydriacyl, Tropicacyl",
    "therapeutic_class": "Anticholinergic [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alcon Labs Inc. Formulation: Solution/Drops for Ophthalmic administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anticholinergic [EPC]."
  },
  {
    "id": "RAW_1417",
    "generic_name": "trypan blue",
    "brand_name": "Visionblue",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Dorc. Formulation: Solution for Ophthalmic administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1418",
    "generic_name": "tucatinib",
    "brand_name": "Tukysa",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Seagen. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1419",
    "generic_name": "ublituximab",
    "brand_name": "Briumvi",
    "therapeutic_class": "CD20-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Tg Therapeutics, Inc. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: CD20-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_1420",
    "generic_name": "ubrogepant",
    "brand_name": "Ubrelvy",
    "therapeutic_class": "Calcitonin Gene-related Peptide Receptor Antagonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Calcitonin Gene-related Peptide Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1421",
    "generic_name": "ulipristal acetate",
    "brand_name": "Ella, Logilia",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Lab Hra Pharma. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1422",
    "generic_name": "umeclidinium",
    "brand_name": "Incruse Ellipta",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxo Grp England. Formulation: Powder for Inhalation administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1423",
    "generic_name": "upadacitinib",
    "brand_name": "Rinvoq",
    "therapeutic_class": "Janus Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Solution for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Janus Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1424",
    "generic_name": "uridine triacetate",
    "brand_name": "Vistogard, Xuriden",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Btg Intl. Formulation: Granule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1425",
    "generic_name": "urofollitropin",
    "brand_name": "Bravelle",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ferring. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1426",
    "generic_name": "ursodiol",
    "brand_name": "Ursolign",
    "therapeutic_class": "Bile Acid [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Strides Pharma. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bile Acid [EPC]."
  },
  {
    "id": "RAW_1427",
    "generic_name": "ustekinumab",
    "brand_name": "Imuldosa, Otulfi, Starjemza, Steqeyma, Wezlana, Yesintek",
    "therapeutic_class": "Interleukin-12 Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Bio-Thera Solutions Ltd. Formulation: Injectable for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Interleukin-12 Antagonist [EPC]."
  },
  {
    "id": "RAW_1428",
    "generic_name": "v and etanib",
    "brand_name": "Caprelsa",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Genzyme Corp. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1429",
    "generic_name": "vadadustat",
    "brand_name": "Vafseo",
    "therapeutic_class": "Hypoxia-inducible Factor Prolyl Hydroxylase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Akebia. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hypoxia-inducible Factor Prolyl Hydroxylase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1430",
    "generic_name": "valacyclovir hydrochloride",
    "brand_name": "Valtrex",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1431",
    "generic_name": "valbenazine",
    "brand_name": "Ingrezza, Ingrezza Sprinkle",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Neurocrine. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1432",
    "generic_name": "valganciclovir",
    "brand_name": "Valcyte",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Cheplapharm. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1433",
    "generic_name": "valganciclovir hydrochloride",
    "brand_name": "Valcyte",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Cheplapharm. Formulation: For Solution for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1434",
    "generic_name": "valrubicin",
    "brand_name": "Valstar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Endo Operations. Formulation: Solution for Intravesical administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1435",
    "generic_name": "valsartan",
    "brand_name": "Diovan",
    "therapeutic_class": "Angiotensin 2 Receptor Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin 2 Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_1436",
    "generic_name": "valsartan and hydrochlorothiazide",
    "brand_name": "Diovan Hct",
    "therapeutic_class": "Angiotensin 2 Receptor Blocker [EPC]",
    "broad_category": "Cardiovascular System",
    "description": "FDA Approved Prescription Drug. Manufactured by Novartis. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Angiotensin 2 Receptor Blocker [EPC]."
  },
  {
    "id": "RAW_1437",
    "generic_name": "vamorolone",
    "brand_name": "Agamree",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Catalyst Pharms. Formulation: Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1438",
    "generic_name": "vancomycin",
    "brand_name": "Lincomycin, Tyzavan",
    "therapeutic_class": "Glycopeptide Antibacterial [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Hikma. Formulation: Solution for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Glycopeptide Antibacterial [EPC]."
  },
  {
    "id": "RAW_1439",
    "generic_name": "vancomycin hydrochloride",
    "brand_name": "Lincocin, Lincomycin, Vancocin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gland. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1440",
    "generic_name": "varenicline",
    "brand_name": "Tyrvaya",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Oyster Point Pharma. Formulation: Spray for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1441",
    "generic_name": "varenicline tartrate",
    "brand_name": "Chantix",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pf Prism Cv. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1442",
    "generic_name": "vasopressin",
    "brand_name": "Vasostrict",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ph Health. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1443",
    "generic_name": "vecuronium",
    "brand_name": "Rocuronium",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Piramal Critical. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1444",
    "generic_name": "vecuronium bromide",
    "brand_name": "Rocuronium, Rocuronium Bromide",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Caplin. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1445",
    "generic_name": "vedolizumab",
    "brand_name": "Entyvio",
    "therapeutic_class": "Integrin Receptor Antagonist [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Integrin Receptor Antagonist [EPC]."
  },
  {
    "id": "RAW_1446",
    "generic_name": "velaglucerase alfa",
    "brand_name": "Vpriv",
    "therapeutic_class": "Hydrolytic Lysosomal Glucocerebroside-specific Enzyme [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Shire Human Genetic. Formulation: Injectable for Intravenous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hydrolytic Lysosomal Glucocerebroside-specific Enzyme [EPC]."
  },
  {
    "id": "RAW_1447",
    "generic_name": "velmanase alfa",
    "brand_name": "Lamzede",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Chiesi Farmaceutici Spa. Formulation: Powder, For Injection Solution, Lyophilized Powder for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1448",
    "generic_name": "velpatasvir and sofosbuvir",
    "brand_name": "Epclusa",
    "therapeutic_class": "Hepatitis C Virus Nucleotide Analog NS5B Polymerase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Gilead Sciences Inc. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hepatitis C Virus Nucleotide Analog NS5B Polymerase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1449",
    "generic_name": "vemurafenib",
    "brand_name": "Zelboraf",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Hoffmann La Roche. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1450",
    "generic_name": "venetoclax",
    "brand_name": "Venclexta",
    "therapeutic_class": "BCL-2 Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: BCL-2 Inhibitor [EPC]."
  },
  {
    "id": "RAW_1451",
    "generic_name": "venlafaxine hydrochloride",
    "brand_name": "Effexor Xr",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Upjohn. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1452",
    "generic_name": "vepdegestrant",
    "brand_name": "Veppanu",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Arvinas Operations. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1453",
    "generic_name": "vericiguat",
    "brand_name": "Verquvo",
    "therapeutic_class": "Soluble Guanylate Cyclase Stimulator [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Soluble Guanylate Cyclase Stimulator [EPC]."
  },
  {
    "id": "RAW_1454",
    "generic_name": "verteporfin for injection",
    "brand_name": "Visudyne",
    "therapeutic_class": "Photoenhancer [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bausch Lomb Ireland. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Photoenhancer [EPC]."
  },
  {
    "id": "RAW_1455",
    "generic_name": "vestronidase alfa",
    "brand_name": "Mepsevii",
    "therapeutic_class": "Lysosomal beta Glucuronidase [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ultragenyx Pharm Inc. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Lysosomal beta Glucuronidase [EPC]."
  },
  {
    "id": "RAW_1456",
    "generic_name": "vibegron",
    "brand_name": "Gemtesa",
    "therapeutic_class": "beta3-Adrenergic Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sumitomo Pharma Am. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: beta3-Adrenergic Agonist [EPC]."
  },
  {
    "id": "RAW_1457",
    "generic_name": "vigabatrin",
    "brand_name": "Sabril, Vigadrone, Vigafyde, Vigpoder",
    "therapeutic_class": "Anti-epileptic Agent [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Upsher Smith Labs. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anti-epileptic Agent [EPC]."
  },
  {
    "id": "RAW_1458",
    "generic_name": "vilazodone hydrochloride",
    "brand_name": "Viibryd",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Abbvie. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1459",
    "generic_name": "viloxazine hydrochloride",
    "brand_name": "Qelbree",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Supernus Pharms. Formulation: Capsule, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1460",
    "generic_name": "viltolarsen",
    "brand_name": "Viltepso",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Nippon Shinyaku. Formulation: Solution for Intravenous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1461",
    "generic_name": "vimseltinib",
    "brand_name": "Romvimza",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Deciphera Pharms. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1462",
    "generic_name": "vinblastine sulfate",
    "brand_name": "Velban",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Fresenius Kabi Usa. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1463",
    "generic_name": "vincristine sulfate",
    "brand_name": "Oncovin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Hospira. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1464",
    "generic_name": "vismodegib",
    "brand_name": "Erivedge",
    "therapeutic_class": "Hedgehog Pathway Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Genentech. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Hedgehog Pathway Inhibitor [EPC]."
  },
  {
    "id": "RAW_1465",
    "generic_name": "voclosporin",
    "brand_name": "Lupkynis",
    "therapeutic_class": "Calcineurin Inhibitor Immunosuppressant [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Aurinia. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Calcineurin Inhibitor Immunosuppressant [EPC]."
  },
  {
    "id": "RAW_1466",
    "generic_name": "vonoprazan fumarate",
    "brand_name": "Voquezna",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Phathom. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1467",
    "generic_name": "vonoprazan fumarate and amoxicillin",
    "brand_name": "Voquezna Dual Pak",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Phathom. Formulation: Capsule, Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1468",
    "generic_name": "vorasidenib",
    "brand_name": "Voranigo",
    "therapeutic_class": "Isocitrate Dehydrogenase 1 Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Servier. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Isocitrate Dehydrogenase 1 Inhibitor [EPC]."
  },
  {
    "id": "RAW_1469",
    "generic_name": "voriconazole",
    "brand_name": "Vfend",
    "therapeutic_class": "Azole Antifungal [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Injectable for Iv (Infusion) administration.",
    "indication": "Used as a therapeutic agent for indications related to: Azole Antifungal [EPC]."
  },
  {
    "id": "RAW_1470",
    "generic_name": "vorinostat",
    "brand_name": "Zolinza",
    "therapeutic_class": "Histone Deacetylase Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Msd Sub Merck. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Histone Deacetylase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1471",
    "generic_name": "vortioxetine",
    "brand_name": "Trintellix",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Takeda Pharms Usa. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1472",
    "generic_name": "vutrisiran",
    "brand_name": "Amvuttra",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Alnylam Pharms Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1473",
    "generic_name": "warfarin sodium",
    "brand_name": "Jantoven",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Upsher Smith Labs. Formulation: Tablet for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1474",
    "generic_name": "xanomeline and trospium chloride",
    "brand_name": "Cobenfy",
    "therapeutic_class": "Cholinergic Muscarinic Agonist [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Bristol-Myers. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Cholinergic Muscarinic Agonist [EPC]."
  },
  {
    "id": "RAW_1475",
    "generic_name": "zanamivir",
    "brand_name": "Relenza",
    "therapeutic_class": "Neuraminidase Inhibitor [EPC]",
    "broad_category": "Antimicrobials & Infectious Diseases",
    "description": "FDA Approved Prescription Drug. Manufactured by Glaxosmithkline. Formulation: Powder for Inhalation administration.",
    "indication": "Used as a therapeutic agent for indications related to: Neuraminidase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1476",
    "generic_name": "zanidatamab",
    "brand_name": "Ziihera",
    "therapeutic_class": "Bispecific HER2-directed Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Jazz Pharms. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Bispecific HER2-directed Antibody [EPC]."
  },
  {
    "id": "RAW_1477",
    "generic_name": "zanubrutinib",
    "brand_name": "Brukinsa",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Beone Medicines Usa. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1478",
    "generic_name": "zavegepant",
    "brand_name": "Zavzpret",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Pfizer. Formulation: Spray, Metered for Nasal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1479",
    "generic_name": "zenocutuzumab",
    "brand_name": "Bizengri",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Merus N.V.. Formulation: Injection for Solution administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1480",
    "generic_name": "ziconotide acetate",
    "brand_name": "Prialt",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Esteve. Formulation: Injectable for Intrathecal administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1481",
    "generic_name": "zidovudine",
    "brand_name": "Retrovir",
    "therapeutic_class": "Human Immunodeficiency Virus Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]",
    "broad_category": "Respiratory & Allergy",
    "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Human Immunodeficiency Virus Nucleoside Analog Reverse Transcriptase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1482",
    "generic_name": "ziftomenib",
    "brand_name": "Komzifti",
    "therapeutic_class": "Menin Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Kura. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Menin Inhibitor [EPC]."
  },
  {
    "id": "RAW_1483",
    "generic_name": "zilucoplan",
    "brand_name": "Zilbrysq",
    "therapeutic_class": "Complement Inhibitor [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Ucb Inc. Formulation: Solution for Subcutaneous administration.",
    "indication": "Used as a therapeutic agent for indications related to: Complement Inhibitor [EPC]."
  },
  {
    "id": "RAW_1484",
    "generic_name": "zinc acetate",
    "brand_name": "Galzin",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Eton. Formulation: Capsule for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1485",
    "generic_name": "ziprasidone",
    "brand_name": "Geodon",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Viatris. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_1486",
    "generic_name": "ziprasidone mesylate",
    "brand_name": "Geodon",
    "therapeutic_class": "Atypical Antipsychotic [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Viatris. Formulation: Powder for Intramuscular administration.",
    "indication": "Used as a therapeutic agent for indications related to: Atypical Antipsychotic [EPC]."
  },
  {
    "id": "RAW_1487",
    "generic_name": "ziv-aflibercept",
    "brand_name": "Zaltrap",
    "therapeutic_class": "Vascular Endothelial Growth Factor Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Sanofi Aventis Us. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Vascular Endothelial Growth Factor Inhibitor [EPC]."
  },
  {
    "id": "RAW_1488",
    "generic_name": "zolbetuximab",
    "brand_name": "Vyloy",
    "therapeutic_class": "Claudin 18.2-directed Cytolytic Antibody [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Astellas. Formulation: Injectable for Injection administration.",
    "indication": "Used as a therapeutic agent for indications related to: Claudin 18.2-directed Cytolytic Antibody [EPC]."
  },
  {
    "id": "RAW_1489",
    "generic_name": "zoledronic acid",
    "brand_name": "Reclast, Zometa",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Sandoz. Formulation: Injectable for Injection administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1490",
    "generic_name": "zoliflodacin",
    "brand_name": "Nuzolvence",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Entasis Therap. Formulation: For Suspension for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1491",
    "generic_name": "zolmitriptan",
    "brand_name": "Zolmiptriptan, Zomig",
    "therapeutic_class": "Serotonin-1b and Serotonin-1d Receptor Agonist [EPC]",
    "broad_category": "Central Nervous System",
    "description": "FDA Approved Prescription Drug. Manufactured by Glenmark Pharms Ltd. Formulation: Tablet, Orally Disintegrating for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Serotonin-1b and Serotonin-1d Receptor Agonist [EPC]."
  },
  {
    "id": "RAW_1492",
    "generic_name": "zolpidem tartrate",
    "brand_name": "Ambien, Ambien Cr, Edluar",
    "therapeutic_class": "Unknown Class",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Cosette. Formulation: Tablet, Extended Release for Oral administration.",
    "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
  },
  {
    "id": "RAW_1493",
    "generic_name": "zongertinib",
    "brand_name": "Hernexeos",
    "therapeutic_class": "Kinase Inhibitor [EPC]",
    "broad_category": "Oncology & Immunology",
    "description": "FDA Approved Prescription Drug. Manufactured by Boehringer Ingelheim. Formulation: Tablet for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Kinase Inhibitor [EPC]."
  },
  {
    "id": "RAW_1494",
    "generic_name": "zonisamide",
    "brand_name": "Zonegran, Zonisade",
    "therapeutic_class": "Anti-epileptic Agent [EPC]",
    "broad_category": "Miscellaneous / Other",
    "description": "FDA Approved Prescription Drug. Manufactured by Advanz Pharma. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Anti-epileptic Agent [EPC]."
  },
  {
    "id": "RAW_1495",
    "generic_name": "zuranolone",
    "brand_name": "Zurzuvae",
    "therapeutic_class": "Neuroactive Steroid Gamma-Aminobutyric Acid A Receptor Positive Modulator [EPC]",
    "broad_category": "Endocrine & Metabolic",
    "description": "FDA Approved Prescription Drug. Manufactured by Biogen. Formulation: Capsule for Oral administration.",
    "indication": "Used as a therapeutic agent for indications related to: Neuroactive Steroid Gamma-Aminobutyric Acid A Receptor Positive Modulator [EPC]."
  }
];