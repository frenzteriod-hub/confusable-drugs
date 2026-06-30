# Philippine FDA Data Collection

This project collects Philippine FDA human-drug records separately from every
other data source. It includes conventional drugs, biologicals, household
remedies, and herbal medicines, while excluding veterinary registrations. It
does not use an LLM and does not modify published drug names.

## Install

The collector uses an installed Google Chrome or Chromium browser because the
current portal rejects ordinary HTTP clients.

```bash
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
```

## Small validation run

```bash
npm run scrape:ph-fda -- \
  --queries DR-X8346,DR-X9100 \
  --max-records 2
```

## First 10,000 records

```bash
npm run scrape:ph-fda -- --max-records 10000
```

## Complete registry attempt

```bash
npm run scrape:ph-fda -- --all
```

The visible Chrome window is part of the access check. Do not close it while
the collector is running. Stop with `Ctrl+C`; the next run resumes from the
checkpoint.

## Outputs

```text
data/ph_fda/
├── raw/
│   ├── ph_fda_products.csv
│   ├── ph_fda_leaflets.csv
│   └── queries/                    # unchanged API responses by query
├── normalized/
│   └── ph_fda_products.csv
├── review/
│   ├── incomplete_records.csv
│   ├── possible_duplicates.csv
│   ├── brand_generic_conflicts.csv
│   └── registration_conflicts.csv
├── reports/
│   └── collection_report.json
└── state/
    ├── checkpoint.json
    └── chrome_profile/
```

`raw/ph_fda_products.csv` preserves the source values. The normalized file only
applies Unicode, case, and whitespace normalization. It never performs fuzzy
spelling correction.

The `32,557` expected count is a benchmark from the previous human-drug
registry page, not an assumption that the current portal is unchanged. A run
is marked complete only when all query shards finish without failures and the
unique registration count matches the configured benchmark.

## Extract descriptions and indications from PI/PIL files

After the product collector has produced `raw/ph_fda_leaflets.csv`, create a
local Python environment:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-data.txt
```

Test a first batch of 100 documents:

```bash
.venv/bin/python scripts/ph_fda_leaflet_extractor.py --max-documents 100
```

Continue through every available leaflet:

```bash
.venv/bin/python scripts/ph_fda_leaflet_extractor.py --all
```

This stage downloads the original PDF, records its SHA-256 hash, preserves text
by page, and extracts description and indications with their page numbers.
Scanned PDFs use local OCR and are always marked for human review. Missing
sections remain empty; the program never invents medical information.
