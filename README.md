# Confusable Drugs — Philippine FDA Data Project

This workspace is built around Philippine FDA human-drug records. It contains
a resumable product collector, a PI/PIL extraction pipeline, and an
experimental Cebuano-aware look-alike/sound-alike (LASA) screening workflow.

## Active project

```text
scripts/
├── ph_fda_scraper.mjs
├── ph_fda_leaflet_extractor.py
├── build_canonical_database.py
├── build_lasa_candidates.py
└── filipino_phonetics.py       # Cebuano-aware pronunciation lattice

tests/
data/ph_fda/
PH_FDA_COLLECTION.md
docs/
```

The collector preserves original source values, stores normalized values
separately, records source links and retrieval dates, and sends uncertain or
conflicting records to review files. It never silently corrects drug names or
generates missing medical information.

Install the data and browser dependencies once:

```bash
.venv/bin/pip install -r requirements-data.txt
npm install
npm run viewer:vendor
```

The Python dependencies include a bundled eSpeak NG library for contextual
English grapheme-to-phoneme conversion. The browser uses the pinned
Phonemizer.js bundle copied by `viewer:vendor`; it does not download a
pronunciation service at runtime.

Generate the canonical product/name database after installing dependencies:

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
and records standard plus experimental Cebuano-aware similarity signals.

The experimental pronunciation lattice keeps its routes separate instead of
pretending there is one correct local pronunciation:

```text
curated reviewed IPA (when supplied)
-> CMU Pronouncing Dictionary English path (when the token exists)
-> eSpeak NG contextual dictionary/rule G2P (for unknown tokens)
-> Epitran English path (only when Flite lex_lookup is installed)
-> low-confidence English spelling fallback
-> coverage-checked Epitran Cebuano direct-reading hypothesis
-> explicit, higher-cost Cebuano/Philippine-English adaptations
```

Every retained path has a display form, IPA segments, source, evidence level,
rule IDs, coverage, and a cost. The batch scorer ranks the best **cost-adjusted**
path pair rather than the best raw match, so speculative paths cannot win merely
because they match each other. Stress is used only when a route supplies it;
Epitran paths have unknown stress. All weights are fixed, untrained, and
clinically unvalidated candidate-ranking parameters.

The batch is deliberately staged and bounded. It first applies cheap spelling,
legacy-baseline, and coarse IPA blocking signals. A full IPA lattice comparison
is used in the first pass only to decide phonetic-only recall cases that have
shared coarse IPA evidence but no spelling-based reason to be retained (for
example, `School` / `Eskul`). Stronger spelling/legacy candidates are retained
cheaply, then receive a full pronunciation profile only after they enter the
selected review queue. This keeps the full registry rebuild practical without
presenting a zero first-pass lattice score as evidence that two names do not
sound alike.

A small phonetic-promotion pool also protects against missing a useful
screen-level sound-alike: a potential LASA row with an **exact coarse IPA-code
overlap** receives full scoring and stays in the final review queue only if its
cost-adjusted weighted lattice passes the same gate as first-pass phonetic
recall: at least `0.84`, or at least `0.80` with either a `0.04` lead over
ordinary Jaro–Winkler or a speech-form Jaro–Winkler of at least `0.72`.
“Exact” here means a shared coarse model code, not a claim that speakers use an
identical pronunciation. Rows carrying a numeric strength/version distinction
penalty are excluded from this promotion pool.

To keep this extra work bounded, the default pool permits at most two promoted
rows per name and 5,000 promoted rows overall. These limits are configurable
with `--phonetic-promotion-pairs-per-name` and
`--maximum-phonetic-promotions` when rebuilding candidates.

Pronunciation profiling is also limited to short medicine-name-sized inputs.
Long multi-ingredient strings are intentionally screened with spelling and
context features only; the engine does not force one cross-ingredient
pronunciation path. Their output status makes that distinction explicit. A
missing profile is therefore not a claim that the name is phonetically safe or
different.

English spelling is not modeled as five vowels plus a growing list of local
regular expressions. eSpeak NG already combines an exception dictionary with
ordered, context-sensitive spelling rules, so an unseen drug-like name receives
a general G2P hypothesis. CMUdict remains the lower-cost exact route for words
it contains. The rule engine still cannot guarantee the manufacturer-intended
pronunciation of a coined brand, so disagreement and direct-reading paths remain
visible for review.

Epitran's optional `eng-Latn` mode needs Flite's external `lex_lookup`
executable on `PATH`; installing Epitran alone is not enough. The bundled
eSpeak NG route now handles the normal OOV case before this optional route.
`ceb-Latn` is still used only as a coverage-checked direct reading of the
spelling; it is not a model of how every Cebuano speaker pronounces English.

## Open the local review dashboard

```bash
npm run viewer:data
npm run viewer
```

Then open `http://localhost:8088`. The dashboard shows the ranked LASA review
queue and probable source spelling variants. Open a candidate to compare its
linked generic formulations, PH FDA registration numbers, strengths, and expiry
dates. It is a review workspace, not a clinical warning system.

The Python batch engine is authoritative for registered-name paths and ranked
pairs. Run `npm run viewer:data` after rebuilding LASA candidates to export its
current paths, provenance, and model metadata. Browser-side free text runs only
for the entered name: Phonemizer.js/eSpeak NG supplies English IPA, a
silence-aware monotonic vowel-anchor alignment licenses contextual
written-vowel rules, and the direct-spelling recovery remains separate. The
browser emits one deterministic local reading per queried name—even when it
matches the English display—rather than a branching cross-product. Internal
silent vowels and vowel-like `y` are handled during alignment; if a
rare spelling still cannot align completely, unmatched English phones are
preserved and the route is visibly marked partial instead of disappearing.
Separate consonant candidates contain one bounded change. It has no fixed word
table and does not rebuild or scan the exported medicine database. The
browser still lacks the batch engine's CMUdict and Epitran route union, so
exported batch paths remain authoritative for a registered name.

The review taxonomy separates potential LASA pairs, probable source spelling
errors, and normalization duplicates. Verified LASA and false-positive labels
are reserved for documented human review and are never assigned automatically.

See [PH_FDA_COLLECTION.md](PH_FDA_COLLECTION.md) for installation, collection,
resume, and leaflet-extraction instructions.

For the pronunciation method and validation plan, see
[the source-backed pronunciation guide](docs/SOURCE_BACKED_PRONUNCIATION_RULE_GUIDE.md),
[the Cebuano-aware LASA method guide](docs/CEBUANO_AWARE_LASA_METHOD_GUIDE.md),
and [the practical thesis guide](docs/WHAT_TO_DO_NEXT_THESIS_GUIDE.md).

## Legacy project

The previous US/openFDA web application, generated JavaScript databases, CSV
exports, algorithms, and tests are archived under `legacy/`. They are retained
for reference only and are not inputs to the Philippine FDA pipeline.
