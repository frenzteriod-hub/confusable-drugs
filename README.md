# Confusable Drugs - Philippine FDA Data Project

This workspace is being rebuilt around current Philippine FDA human-drug
records. The active project contains a resumable product collector and a
separate PI/PIL pipeline for extracting sourced descriptions and indications.

## Active project

```text
scripts/
├── ph_fda_scraper.mjs
├── ph_fda_leaflet_extractor.py
├── build_canonical_database.py
└── build_lasa_candidates.py

tests/
data/ph_fda/
PH_FDA_COLLECTION.md
```

The collector preserves original source values, stores normalized values
separately, records source links and retrieval dates, and sends uncertain or
conflicting records to review files. It never silently corrects drug names or
generates missing medical information.

Generate the canonical product/name database after collecting products:

```bash
.venv/bin/python scripts/build_canonical_database.py
```

This creates normalized CSV tables and `data/canonical/ph_drugs.sqlite`.

Generate algorithmic LASA candidates for review:

```bash
.venv/bin/python scripts/build_lasa_candidates.py
```

The LASA output is explicitly unverified. It compares unique generic and brand
names, excludes known brand/generic relationships for the same formulation,
and records standard and experimental Filipino-aware similarity scores.

## Open the local review dashboard

```bash
npm run viewer:data
npm run viewer
```

Then open `http://localhost:8088`. The dashboard shows the ranked LASA review
queue and probable source spelling variants. Open a candidate to compare its
linked generic formulations, PH FDA registration numbers, strengths, and expiry
dates. It is a review workspace, not a clinical warning system.

The review taxonomy separates potential LASA pairs, probable source spelling
errors, and normalization duplicates. Verified LASA and false-positive labels
are reserved for documented human review and are never assigned automatically.

See [PH_FDA_COLLECTION.md](PH_FDA_COLLECTION.md) for installation, collection,
resume, and leaflet-extraction instructions.

## Legacy project

The previous US/openFDA web application, generated JavaScript databases, CSV
exports, algorithms, and tests are archived under `legacy/`. They are retained
for reference only and are not inputs to the Philippine FDA pipeline.
