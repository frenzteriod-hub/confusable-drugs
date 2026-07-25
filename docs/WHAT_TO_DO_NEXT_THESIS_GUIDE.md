# What To Do Next: Cebuano-Aware LASA Thesis Guide

This is the practical build-and-evaluate plan for the project. The goal is a
transparent system that ranks potentially confusable medicine names for human
review, not a system that automatically identifies medicines or proves clinical
risk.

## Thesis In One Sentence

```text
Develop and evaluate a provenance-aware, Cebuano-informed pronunciation lattice
for ranking possible sound-alike and look-alike Philippine medicine names.
```

The important wording is **Cebuano-informed**, not “a model of how every
Cebuano speaker pronounces English.” The project tests documented hypotheses
and validates them with local speakers and reviewers.

## Phase 0: Record The Runtime Before Changing Rules

Install the data dependencies and record their versions in your experiment log:

```bash
.venv/bin/pip install -r requirements-data.txt
.venv/bin/python -c "from filipino_phonetics import pronunciation_model_metadata; import json; print(json.dumps(pronunciation_model_metadata(), indent=2))"
```

Check these facts before claiming a pronunciation-provider result:

```text
CMUdict available?                 Known-word English route can be used.
eSpeak NG available?               Contextual OOV English route can be used.
Epitran available?                 Cebuano direct-reading route can be used.
Flite lex_lookup on PATH?          Optional English Epitran fallback can be used.
```

The v4 batch route uses CMUdict first for a known word. If CMUdict has no entry,
it uses eSpeak NG's English dictionary and context-sensitive letter-to-sound
rules through `phonemizer-fork`; `espeakng-loader` supplies the bundled engine
and data, so this route does not depend on a Homebrew installation. Only if
those routes are unavailable does the engine try English Epitran, which still
requires Flite's `lex_lookup`, before reaching the explicitly low-confidence
spelling fallback.

Keep those English-source routes separate from `ceb-Latn`. Cebuano Epitran is
a spelling-to-Cebuano-IPA direct-reading hypothesis, not a
Cebuano-accented-English model and not a replacement for the English source
pronunciation.

The browser has its own bundled contextual provider: the vendored
Phonemizer.js build of eSpeak NG. Install and vendor the pinned dependency when
preparing a reproducible viewer build:

```bash
npm install
npm run viewer:vendor
```

The browser should report when that provider cannot load. It must not silently
replace it with a small hardcoded word table or a blanket one-letter/one-vowel
preview.

## Phase 1: Create A Small, Reviewed Development Set

Do not begin by changing rules across every registry name. Start with a
development set of roughly 100–300 names that includes brands, generics, common
OTC products, and difficult letter patterns such as `f`, `v`, `z`, `x`, `ph`,
`th`, `i`, `e`, `o`, and `u`.

Keep at least these fields:

```text
name_id
published_name
name_type
source
formulation_id or product context
```

Do not correct a published spelling in place. Store a normalized comparison
form separately.

## Phase 2: Establish Orthographic Baselines

Calculate and retain:

```text
Jaro-Winkler
normalized Levenshtein similarity
bigram / BI-SIM-like overlap
prefix and suffix similarity
length difference
Soundex or another rough phonetic code
```

These form the spelling-only baseline. They should remain in the thesis even if
the local pronunciation model improves, because LASA is often both a spelling
and sound problem.

## Phase 3: Make The Rule Ledger A Research Ledger

Use these files together:

```text
docs/SOURCE_BACKED_PRONUNCIATION_RULE_GUIDE.md
docs/cebuano_g2p_rules.csv
```

The CSV is a **research/design ledger**, not a code contract: the current
engine does not parse it. Do not claim that code automatically implements every
row. Update the ledger whenever you propose a new route or adaptation, with:

```text
rule_id
route or input domain
condition / IPA context
output IPA or transformation
evidence level
path cost
source or rationale
coverage action
validation question
```

Prefer IPA-level adaptations after a source route. For example, `/f/→/p/` is a
bounded adaptation of an English-derived phone sequence; it is not evidence
that every written `f` must become `p`.

## Phase 4: Generate Provenance-Aware Paths

For each short, medicine-name-sized token or name, generate the following
bounded paths where available:

```text
curated IPA override
CMUdict known-word English path
eSpeak NG contextual English path for a CMUdict OOV token
English Epitran path as an optional later fallback (only with Flite lex_lookup)
explicitly low-confidence English spelling fallback
coverage-checked Cebuano Epitran direct-reading path
explicit nativized Cebuano Epitran path
bounded IPA-level adaptation paths
legacy Philippine/Filipino spelling baseline
```

“Contextual” here means that the English provider considers surrounding
letters and its pronunciation dictionary/rules; it does not assign one fixed
sound to each written vowel. This handles patterns such as `basket`, `ball`,
`late`, `note`, `like`, `could`, and `cloud` without adding a project-specific
exception for every example. English spelling still has lexical exceptions and
heteronyms, so the provider is a source hypothesis, not proof of how a local
speaker will pronounce an unfamiliar medicine name.

For free-text browser analysis, use Phonemizer.js to generate the contextual
English source path, then derive separately labelled and costed local
adaptations. Registered names should continue to use their exported batch
profiles. A direct spelling reading must remain a separate Cebuano path; it
must not overwrite the source-English path or be presented as the same kind of
evidence.

Save each path as a record, not just as a display string:

```text
name_id
display
ipa
ipa_segments
route
source
evidence_level
path_cost
rule_ids
coverage
stress_or_unknown
availability_or_error
model_id
config_hash
```

Examples that should be explainable to a reviewer:

```text
binary
  The English-source G2P /b aɪ n ɚ i/ displays as bayneri.
  The browser aligns i | ar | y to /aɪ | ɚ | i/ and displays baynari after one written-a rule.
  A separate Cebuano-compatible direct-spelling recovery displays as binari.

topic
  English dictionary path can display as tapik.
  Cebuano direct-reading path can display as topik.

model
  English dictionary path can display as madel.
  Cebuano direct-reading path can display as model.

Bioflu
  A raw Cebuano engine route is withheld if f is not covered.
  An explicit f→p nativized route can display as bioplu and remains E3/costed.
```

Never label one of these displays “the proper Cebuano pronunciation” without
speaker data.

For `binary`, the browser now uses a conservative monotonic vowel-anchor
alignment and changes only the aligned written `ar` nucleus. It produces the
separate E3 hypothesis `baynari`; it cannot apply this rule to rhotics written
with `er`, `ir`, `or`, or `ur`. The written-`a` outputs are restricted to `a`,
`o`, or `ey`, never `e` or `i`. This preview is computed for the entered name
only. The stored v4 batch export is intentionally not rebuilt or relabelled
until the aligned rule receives local speaker validation.

The same engine always returns one local reading when English G2P succeeds.
The monotonic alignment can skip an internal silent written vowel and recognize
a consonant-surrounded `y` as a vowel anchor. A matching context can retain the same display (`ball -> bol`,
`head -> hed`, `cloud -> klawd`), while a mismatching context is repaired in
that single path (`basket -> basket`, `note -> not`, `topic -> topik`,
`model -> model`, `umbrella -> ambrela`, `uranus -> yoreynos`,
`idea -> aydiya`). This is deterministic rule application, not enumeration of
all possible vowel combinations. A rare incomplete alignment preserves the
unmatched English phones and carries a visible partial-alignment rule instead
of producing no local route.

Do not force a long multi-ingredient string into one pronunciation lattice.
The current implementation bounds profiling to three normalized words and 36
normalized letters. Ingredient lists joined by `+` or `/`, and other inputs
outside that limit, should remain in spelling/context screening with an explicit
`not_profiled_complex_name` status. That status records a deliberate modeling
boundary; it does not mean the name is non-confusable.

## Phase 5: Candidate Blocking And Sound Comparison

Use inexpensive blocks before comparing every path pair:

```text
ordinary prefix/suffix/length blocks
Soundex or legacy baseline blocks
coarse IPA prefix/suffix/length blocks
```

The coarse IPA blocks are important because a sound-alike pair can have weak
ordinary spelling similarity. They only allow a pair to reach full scoring;
they do not prove it is a LASA pair.

Use a staged batch rather than a full IPA-path cross-product for every blocked
comparison:

```text
cheap spelling / legacy / Soundex candidate reason
  -> retain as a first-pass candidate; defer detailed pronunciation work

no cheap reason + shared coarse IPA evidence
  -> run the bounded lattice to test phonetic-only recall

selected high/medium review candidate
  -> enrich with the full pronunciation metrics and winning-path provenance

screen-level potential LASA + exact coarse IPA overlap + no numeric distinction
  -> fully score; retain only if the weighted lattice passes the promotion gate
```

This preserves phonetic-only recall such as `School` / `Eskul`, while keeping
the complete registry build tractable. Mark deferred first-pass rows as
`not_scored_first_pass`; do not interpret their placeholder lattice metrics as
evidence of no sound similarity. The reviewer-facing queue should be enriched
before export.

The phonetic-promotion pool is intentionally small and auditable. It uses an
exact shared **coarse model code**, not a broad IPA prefix/suffix block and not
a claim of identical real-world pronunciation. Exclude rows carrying a numeric
strength/version distinction penalty. A promoted screen-level row must pass the
full cost-adjusted weighted-lattice gate before it is retained in the final
review queue: at least `0.84`, or at least `0.80` with either a `0.04` lead over
ordinary Jaro–Winkler or speech-form Jaro–Winkler of at least `0.72`.

Bound that extra pool explicitly: the current defaults allow two additional
promoted rows per name and 5,000 globally. The rebuild flags
`--phonetic-promotion-pairs-per-name` and
`--maximum-phonetic-promotions` make the budget configurable; record the chosen
values in each experiment's batch report.

For each profiled candidate pair, use a bounded, cost-aware beam of plausible
path pairs for detailed weighted phoneme and syllable similarity. Retain both:

```text
raw_best_path_similarity
weighted_lattice_similarity
```

Use weighted selection, not `max(raw_score)`:

```text
weighted_pair_score = max(0, raw_pair_score - penalty × (path_cost_A + path_cost_B))
selected_pair = path pair with the highest weighted_pair_score
```

If both paths have known stress, stress can be an additional minor feature. If
either route has unknown stress—as with Epitran—omit it instead of guessing.

The current implementation uses weighted IPA edit distance. It is reasonable to
compare with ALINE later, but do not say the current code runs full ALINE unless
you actually implement it.

## Phase 6: Produce A Review Queue, Not A Diagnosis

Combine spelling and sound signals into a hand-weighted experimental score until
you have labelled data. Keep the exact model configuration with each run.

Every enriched review row should include:

```text
name A and name B
name types and product/formulation context
spelling metrics
raw and weighted pronunciation metrics
selected display paths and IPA
route, evidence, cost, coverage, and rule IDs for both paths
numeric strength/version penalty
reason the row entered the queue
pronunciation-profile status, if a complex name was intentionally not profiled
human review status
```

Keep close generic-name spelling variants and formatting duplicates separate
from potential LASA pairs. They may be data-quality or source-verification
findings rather than medication-confusion findings.

## Phase 7: Collect Human Data

Do not validate only arbitrary strings. Ask reviewers about real medicine-name
pairs and retain the exact task:

```text
label read aloud
audio prompt repeated
natural speech in a sentence
```

Record consent, anonymized reviewer ID, language background only at an
appropriate and approved level, and the exact product context shown. A useful
label form contains:

```text
name_a, name_b
path_a, path_b, route_a, route_b
look_alike_rating
sound_alike_rating
possible_lasa / not_lasa / uncertain
reason
reviewer_id
```

Treat “200–500 reviewed pairs” as a planning target, not a universal research
requirement. More important are representative difficult cases, multiple
reviewers where possible, and reported agreement.

## Phase 8: Evaluate With Clean Splits

Compare these baselines:

```text
1. spelling only
2. English CMUdict + eSpeak NG route only
3. Cebuano direct-reading Epitran route only
4. weighted multi-route lattice
5. legacy Filipino/Philippine spelling transform (historical ablation)
6. optional English Epitran/Flite fallback ablation, when available
```

Use name-disjoint train/test partitions for any learned model. Otherwise a
brand-family or spelling variant can leak into both sets and inflate results.

Report, where labels support them:

```text
Precision@k
Recall@k
MRR
PR-AUC
reviewer agreement
false-positive review burden
```

## Phase 9: Learn Weights Only After Labels Exist

Once you have an adequate review dataset, logistic regression or another
interpretable model can learn feature weights. Candidate inputs include:

```text
weighted_lattice_similarity
raw_best_lattice_similarity
jaro_winkler
edit_similarity
bigram_similarity
winning route/evidence/cost features
numeric distinction feature
```

Calibrate any probability output on held-out data. Until then, call the output
an experimental ranking score.

## Phase 10: Suggested Thesis Method Statement

> This study ranks potential look-alike/sound-alike medicine-name pairs using
> orthographic features and a provenance-aware pronunciation lattice. The
> lattice combines CMUdict known-word pronunciations, contextual eSpeak NG
> hypotheses for out-of-vocabulary English names, and separate Cebuano
> direct-reading hypotheses, with bounded, costed adaptations. It is designed to
> support human review, not to determine clinical risk or select a medicine
> automatically.

## Final Checklist

```text
[ ] Official names remain unchanged for display.
[ ] Every pronunciation path has IPA, route, evidence, source, and cost.
[ ] CMUdict is preferred for known English words.
[ ] eSpeak NG is recorded as contextual OOV G2P, not a Cebuano-accent model.
[ ] Epitran English is only an optional fallback when Flite lex_lookup is available.
[ ] Raw Cebuano Epitran output is accepted only at full coverage.
[ ] Browser free text uses bundled Phonemizer.js or reports provider failure.
[ ] Source-English, direct-reading, and local-adaptation paths stay distinct.
[x] Browser /ɚ/ changes require a matching written-a vowel anchor and fail closed otherwise.
[ ] Stress is unknown unless a source supplies it.
[ ] Candidate blocking includes a phonetic route.
[ ] First-pass deferred and complex-name profile statuses are preserved.
[ ] The selected review queue is enriched before reviewer-facing export.
[ ] Ranking uses cost-adjusted paths and preserves the raw best score.
[ ] Human review checks the exact ingredient, strength, dosage form, and context.
[ ] Evaluation compares spelling-only, route-only, and weighted-lattice baselines.
[ ] The thesis never presents a ranking score as clinical proof.
```

## References

- [WHO LASA guidance](https://www.who.int/publications/i/item/9789240058897)
- [FDA POCA](https://www.fda.gov/drugs/resources-drugs/phonetic-and-orthographic-computer-analysis-poca-program)
- [Kondrak and Dorr](https://aclanthology.org/C04-1137.pdf)
- [Epitran](https://github.com/dmort27/epitran)
- [Flite](https://github.com/festvox/flite)
- [eSpeak NG](https://github.com/espeak-ng/espeak-ng)
- [eSpeak NG dictionary and context-rule format](https://github.com/espeak-ng/espeak-ng/blob/master/docs/dictionary.md)
- [Phonemizer](https://bootphon.github.io/phonemizer/)
- [Phonemizer.js](https://github.com/xenova/phonemizer.js)
- [Jiampojamarn, Kondrak, and Sherif: many-to-many letter/phoneme alignment](https://aclanthology.org/N07-1047/)
- [Pine et al.: index-preserving rule-based G2P transformations](https://aclanthology.org/2022.computel-1.7/)
- [eSpeak NG Loader](https://github.com/thewh1teagle/espeakng-loader)
- [CMU Pronouncing Dictionary](https://www.speech.cs.cmu.edu/cgi-bin/cmudict?in=welcome)
- [Wolff, *A Dictionary of Cebuano Visayan*](https://www.gutenberg.org/ebooks/40074)
