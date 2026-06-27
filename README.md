# 🛡️ LASA Clinical Safety Portal — CDSS v1.0

A professional **Clinical Decision Support System (CDSS)** for detecting **Look-Alike Sound-Alike (LASA)** drug name confusions. Built to help healthcare professionals, pharmacists, and students identify potentially dangerous medication mix-ups before they reach patients.

> **Live Demo:** _[Deploy on Vercel — see instructions below]_

---

## 📋 Table of Contents

- [Features](#-features)
- [Data Source](#-data-source)
- [Assessment Methodologies](#-assessment-methodologies)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deploy on Vercel](#-deploy-on-vercel)
- [Python Tools](#-python-tools)
- [License](#-license)

---

## ✨ Features

### 🌐 Web Application (Static Frontend)

| Feature | Description |
|---|---|
| **📝 Prescription Auditor** | Paste medical orders or drug names into the audit console. The system scans against 1,495 FDA medications to identify LASA warnings (confusable drug pairs) and spelling typos in real-time. |
| **📋 Drug Directory** | Browse and search all 1,495 medications by brand name, generic name, therapeutic class, or broad category. Filterable by 8 therapeutic categories. Each card is clickable for full drug details. |
| **⚠️ LASA Alert Pairs** | Generates an O(N²) pairwise comparison table of all confusable drug pairs across the database. Supports both **Generic-to-Generic** and **Brand-to-Brand** comparison modes. Displays Jaro-Winkler score, Levenshtein distance, Soundex match percentage, and Tall Man Lettering alignment. |
| **⚙️ Algorithm Parameters** | Adjustable Jaro-Winkler threshold slider (0.70–0.95) for tuning detection sensitivity. Changes dynamically update the LASA Alert Pairs table. |
| **💊 Drug Detail Modal** | Click any drug to view its full FDA profile: brand/generic names, therapeutic class, broad category, description, indications, and a list of confusable counterparts with similarity scores. |
| **🔍 "Did You Mean?" Suggestions** | When a directory search returns no results, the system performs fuzzy matching and suggests the closest medication name. |
| **🇵🇭 Filipino-Aware LASA Detection** | Dedicated page for detecting drug name confusions specific to Filipino (Tagalog & Bisaya) speakers. Implements a custom Grapheme-to-Phoneme (G2P) engine with 8 phonological rules, Filipino Phonetic Encoder, and multi-signal detection that classifies pairs as Filipino-Only, Amplified, or Standard. |

### 🇵🇭 Filipino Phonological Rules

The system models how Filipino healthcare workers actually pronounce English drug names:

| Rule | Speaker | English Sound | Filipino Realization | Example |
|---|---|---|---|---|
| f→p | Tagalog + Bisaya | /f/ | /p/ | fluoxetine → "pluoxetine" |
| v→b | Tagalog + Bisaya | /v/ | /b/ | valsartan → "balsartan" |
| th→t | Tagalog + Bisaya | /θ/ | /t/ | theophylline → "teopylline" |
| z→s | Tagalog + Bisaya | /z/ | /s/ | azithromycin → "asitromycin" |
| ph→p | Tagalog + Bisaya | /f/ (digraph) | /p/ | phenytoin → "penytoin" |
| sh→s | Tagalog + Bisaya | /ʃ/ | /s/ | (sound merging) |
| e→i | Bisaya only | /ɛ/, /e/ | /i/ | metformin → "mitformin" |
| o→u | Bisaya only | /ɔ/, /o/ | /u/ | propranolol → "prupranulul" |

### 🐍 Python Backend Tools

| Tool | Description |
|---|---|
| **Data Ingestion Pipeline** | Multi-stage openFDA data processing: classification fixing, Levenshtein-based typo correction, formatting standardization, USAN stem-based therapeutic classification, and safety validation. |
| **CLI Prescription Auditor** | Terminal-based prescription scanner with LASA warnings and spelling correction suggestions. |
| **Clinician Training System** | Interactive quiz modes: Brand-Generic Matcher, Tall Man Lettering Spelling Quiz, and Prescription Error Spotter with realistic dispensing error scenarios. |
| **Automated Test Suites** | Unit tests for all core algorithms (Levenshtein, Jaro-Winkler, Soundex, TML) and programmatic engine verification. |

---

## 📦 Data Source

All medication data is sourced from the **openFDA Drugs@FDA** public dataset:

- **Source:** [https://open.fda.gov/data/downloads/](https://open.fda.gov/data/downloads/) → Drugs@FDA
- **Raw File:** `drug-drugsfda-0001-of-0001.json` (~124 MB, downloaded locally and ignored by Git because it exceeds normal GitHub file size limits)
- **Processing:** The raw FDA archive is processed through `ingest_fda.py`, a multi-stage sanitization pipeline that:
  1. Seeds 34 mandatory clinical safety validation entries (ISMP reference drugs)
  2. Extracts branded prescription-only medications from FDA application records
  3. **Classification Fixer** — Detects and corrects misclassified brand/generic name swaps
  4. **Typo Fixer** — Uses Levenshtein distance (≤ 2 edits) against a 600+ drug master dictionary to auto-correct misspellings, with ambiguous matches flagged for manual clinical review
  5. **Formatting Standardizer** — Normalizes capitalization, combination separators, and punctuation
  6. **Therapeutic Classifier** — Assigns drugs to 8 broad categories using USAN generic stem matching and keyword analysis
  7. **Exclusion Filter** — Removes non-drug entries (gases, contrast agents, devices, supplements)
- **Output:** 1,495 unique, sanitized drug records with structured fields

### Drug Record Structure

Each medication record contains:

```json
{
  "id": "RAW_0001",
  "generic_name": "abacavir sulfate",
  "brand_name": "Ziagen",
  "therapeutic_class": "Unknown Class",
  "broad_category": "Antimicrobials & Infectious Diseases",
  "description": "FDA Approved Prescription Drug. Manufactured by Viiv Hlthcare. Formulation: Solution for Oral administration.",
  "indication": "Therapeutic classification and specific indication data are not natively provided in this dataset."
}
```

### Broad Categories

| Category | Description |
|---|---|
| Cardiovascular System | Heart, blood pressure, cholesterol, anticoagulants |
| Central Nervous System | Antidepressants, antipsychotics, sedatives, analgesics |
| Antimicrobials & Infectious Diseases | Antibiotics, antivirals, antifungals |
| Endocrine & Metabolic | Diabetes, thyroid, corticosteroids, hormones |
| Respiratory & Allergy | Antihistamines, bronchodilators, asthma |
| Gastrointestinal System | PPIs, H2 blockers, antiemetics |
| Oncology & Immunology | Chemotherapy, monoclonal antibodies, immunosuppressants |
| Miscellaneous / Other | Drugs not classified into the above categories |

---

## 🔬 Assessment Methodologies

The CDSS implements **10 assessment methodologies** for detecting LASA drug name confusions:

### 1. Jaro-Winkler Similarity (Orthographic)
Measures string similarity prioritizing matching characters near the **start of the string** (prefix weighting). The configurable threshold defaults to **0.82** (standard clinical sensitivity). Values range from 0.0 (completely different) to 1.0 (identical).

### 2. Levenshtein Edit Distance (Orthographic)
Computes the exact minimum number of **insertions, deletions, or substitutions** required to transform one drug name into another. Lower values indicate higher confusability.

### 3. Soundex Phonetics (Phonetic)
Encodes drug names into **4-character phonetic codes** (e.g., tramadol → `T653`, trazodone → `T623`) to detect names that **sound similar** when spoken aloud, even if spelled differently.

### 4. Tall Man Lettering — TML (Visual Safety)
Applies the **ISMP/FDA-standard** visual differentiation technique by capitalizing unique syllables in confusable pairs:
- `traMADol` vs. `traZODone`
- `hydrOXYzine` vs. `hydrALAzine`
- `predniSONE` vs. `predniSOLONE`

Uses an official 57-entry lookup map with an algorithmic fallback (longest common prefix/suffix alignment) for pairs not in the official ISMP list.

### 5. Drug Name Normalization (Pre-processing)
Strips **30+ pharmaceutical salt suffixes** (hydrochloride, sulfate, sodium, phosphate, etc.), formulation terms (topical, gel, cream), special characters, and extra whitespace to isolate the **active ingredient base name** for accurate comparison.

### 6. ISMP Known LASA Overrides (Clinical Reference)
**13 clinically verified high-risk confusable pairs** from the ISMP (Institute for Safe Medication Practices) reference list. These pairs **always trigger alerts** regardless of algorithmic similarity scores:

| Drug A | Drug B |
|---|---|
| tramadol | trazodone |
| hydroxyzine | hydralazine |
| metformin | metronidazole |
| prednisone | prednisolone |
| bupropion | buspirone |
| ranitidine | cetirizine |
| amlodipine | amiodarone |
| clonazepam | clonidine |
| dopamine | dobutamine |
| ephedrine | epinephrine |
| vinblastine | vincristine |
| paclitaxel | docetaxel |

### 7. Multi-Signal Composite Detection (Ensemble)
A drug pair is flagged as a LASA risk if **any** of the following conditions are met:
1. **Jaro-Winkler ≥ threshold** (default 0.82)
2. **Jaro-Winkler ≥ 0.75 AND Soundex ≥ 0.75** (phonetic cross-validation)
3. **Pair exists in ISMP clinical override list**

This multi-signal approach reduces false negatives by cross-validating orthographic and phonetic similarity signals.

### 8. Filipino Grapheme-to-Phoneme — G2P (Phonological)
Rule-based transformation engine that converts English drug names into their Filipino-realized pronunciation. Applies **8 ordered phonological rules** (digraphs processed first to prevent conflicts): `ph→p`, `th→t`, `sh→s`, `f→p`, `v→b`, `z→s`, plus Bisaya-specific vowel collapse (`e→i`, `o→u`).

### 9. Filipino Phonetic Encoder (Modified Soundex)
A modified Soundex pipeline that **first applies Filipino G2P transformation**, then generates standard phonetic codes. Unlike vanilla Soundex (which preserves the first letter as-is), this captures how Filipino speakers actually pronounce the initial consonant — critical for detecting F/P and V/B merger confusions that standard Soundex completely misses.

### 10. Filipino Multi-Signal Detection (Ensemble)
Cross-validates Filipino G2P-transformed Jaro-Winkler scores against Filipino Phonetic similarity. Classifies confusable pairs into three categories:
- **🇵🇭 Filipino-Only**: Confusable only under Filipino pronunciation (missed by standard English LASA systems)
- **⬆️ Amplified**: Confusable in both English and Filipino, but with higher similarity under Filipino phonology
- **Standard**: Equally confusable in both phonological contexts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, Vanilla CSS, Vanilla JavaScript |
| **Fonts** | Google Fonts (Inter, Outfit, JetBrains Mono) |
| **Data** | Hardcoded JSON (1,495 records in `drugs_db.js`) |
| **Performance Cache** | Precomputed static LASA metrics in `lasa_pairs_cache.js` |
| **Backend Tools** | Python 3 (data ingestion, CLI tools, testing) |
| **Data Source** | openFDA Drugs@FDA API / Download |
| **Deployment** | Static hosting (Vercel, Netlify, GitHub Pages) |

---

## 📂 Project Structure

```
confusable-drugs/
├── index.html                  # Main HTML entry point
├── styles.css                  # Complete CSS design system
├── app.js                      # Frontend application logic (algorithms, UI rendering)
├── drugs_db.js                 # Hardcoded database of 1,495 FDA medications
├── lasa_pairs_cache.js         # Precomputed LASA pair metrics for fast static hosting
├── README.md                   # This file
│
├── data/                       # Data directory
│   ├── drug-drugsfda-0001-of-0001.json   # Raw openFDA archive (~124 MB, local only / gitignored)
│   ├── raw_drugs.json          # Processed drug records (1,495 entries)
│   ├── drugs.json              # Alternate export format
│   ├── drugs.csv               # CSV export
│   └── manual_review_queue.json # Flagged ambiguous entries for human review
│
├── ingest_fda.py               # Multi-stage FDA data ingestion pipeline
├── generate_pairs_cache.py     # Generates lasa_pairs_cache.js from processed drug data
├── lasa_engine.py              # Core LASA detection engine (LASADetector class)
├── prescription_auditor.py     # CLI prescription auditor
├── train_cli.py                # Clinician training system (3 quiz modes)
├── verify_engine.py            # Automated engine verification
│
├── test_engine.py              # Unit tests for core algorithms
├── test_combin.py              # Combination drug tests
├── test_descriptions.py        # Description generation tests
├── test_regex.py               # Regex pattern tests
└── check_merged.py             # Merge verification utility
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.10+ _(only for data ingestion and CLI tools)_

### Run Locally

```bash
# Clone or download the project
cd confusable-drugs

# Start a local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

The app loads instantly — no build step, no dependencies, no database required.

### Regenerate Drug Data (Optional)

If you want to re-process the FDA data from scratch:

```bash
# Download the Drugs@FDA archive from open.fda.gov (if not present)
# Place it at: data/drug-drugsfda-0001-of-0001.json

# Run the ingestion pipeline
python3 ingest_fda.py

# Verify the engine
python3 verify_engine.py

# Regenerate static LASA metric cache for Vercel/GitHub Pages
python3 generate_pairs_cache.py

# Run unit tests
python3 -m pytest test_engine.py -v
```

---

## ☁️ Deploy on Vercel

This is a **fully static site** — no server, no database, no API required.

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from project root)
vercel

# Follow prompts — done!
```

### Option 2: Vercel Dashboard

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Framework Preset: **Other**
5. Build Command: _(leave empty)_
6. Output Directory: `./`
7. Click **Deploy**

> **Note:** You do **not** need to upload the `data/` directory or Python files to Vercel. The only files needed for the web app are:
> - `index.html`
> - `styles.css`
> - `app.js`
> - `drugs_db.js`

---

## 🐍 Python Tools

### CLI Prescription Auditor

```bash
python3 prescription_auditor.py
```

Interactive terminal tool for scanning prescriptions. Enter medical orders and get real-time LASA warnings and spelling corrections.

### Clinician Training System

```bash
python3 train_cli.py
```

Three training modes:
1. **Brand-Generic Matcher** — Multiple choice quiz matching brand ↔ generic names
2. **Tall Man Lettering Quiz** — Type the correct TML spelling for LASA-risk drugs
3. **Prescription Error Spotter** — Analyze simulated dispensing scenarios and identify LASA errors

### Run Tests

```bash
# Unit tests for core algorithms
python3 -m pytest test_engine.py -v

# Full engine verification
python3 verify_engine.py
```

---

## 📄 License

This project uses publicly available data from the [openFDA](https://open.fda.gov/) platform. openFDA data is provided under a [Creative Commons CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) public domain dedication.

---

## 🙏 Credits & References

- **Data:** [openFDA Drugs@FDA](https://open.fda.gov/data/downloads/) — U.S. Food & Drug Administration
- **LASA Standards:** [ISMP List of Confused Drug Names](https://www.ismp.org/recommendations/confused-drug-names) — Institute for Safe Medication Practices
- **Tall Man Lettering:** [FDA Name Differentiation Project](https://www.fda.gov/drugs/medication-errors-related-cder-regulated-drug-products/fda-name-differentiation-project)
- **Algorithms:** Jaro (1989), Winkler (1990), Levenshtein (1965), Soundex (Russell, 1918)
