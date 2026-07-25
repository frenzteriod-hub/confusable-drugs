# Source-Backed Pronunciation Guide

This guide describes the pronunciation lattice used by the batch LASA
candidate generator. It is a screening method, not a claim that the system can
recover one universally correct Cebuano pronunciation of a medicine name.

The key design choice is simple: English spelling, English pronunciation, and
Cebuano direct reading are different hypotheses. The system preserves them as
separate paths, records why each path exists, and lets path cost reduce the
influence of speculative variants.

```text
published medicine spelling
-> cheap spelling, legacy-baseline, and coarse-IPA blocking
-> bounded IPA lattice only for phonetic-only recall
-> selected review queue receives complete pronunciation enrichment
-> cost-adjusted orthographic + phonetic candidate ranking
-> human review
```

## 1. What The System Does And Does Not Claim

The system does:

- preserve the official name for display;
- create possible readings for sound-alike screening;
- show each selected path's source, evidence, rule IDs, IPA, coverage, and
  cost; and
- rank potential LASA pairs for review.

The system does not:

- translate drug names into Cebuano;
- identify a medicine from speech;
- claim that every Cebuano speaker makes the same substitutions; or
- establish clinical risk or a verified LASA pair automatically.

## 2. Implemented Route Model

For an English-derived reading, the batch engine uses this fallback order:

| Route | When it is used | Evidence | Cost role |
|---|---|---:|---|
| `curated` | A reviewed IPA override is supplied. | E0 | No default route cost. |
| `english_cmudict` | The normalized token has a CMU Pronouncing Dictionary entry. | E0 | Lowest English-route cost. |
| `english_espeak_ng` | CMUdict has no entry; eSpeak NG applies its English exception dictionary and ordered context rules. | E1 | General OOV route; lower confidence than an exact CMUdict entry. |
| `english_epitran` | Earlier routes failed, Epitran is installed, and Flite `lex_lookup` is available. | E2 | Optional Flite-backed fallback. |
| `english_heuristic` | No real English G2P provider produced a path. | E3 | Emergency fallback with high cost. |

The following routes can coexist with that English-derived route:

| Route | Meaning | Evidence |
|---|---|---:|
| `cebuano_epitran_direct` | Epitran `ceb-Latn` applied directly to a fully covered spelling. This is a direct-reading hypothesis. | E2 |
| `cebuano_epitran_nativized` | A coverage-compatible spelling is made with explicit substitutions before `ceb-Latn`. | E3 |
| `cebuano_phone_adaptation` | Bounded IPA-level variants of an English-derived path, such as `/f/ → /p/`. | E1/E3 |
| `cebuano_legacy_rule` | Retained older Cebuano-friendly spelling baseline. | E3 |
| `cebuano_spelling_repair` | Extra support-vowel or final-syllable hypothesis. | E3 |

The English fallback order does not mean that the direct-reading route is a
fallback. It is deliberately a separate hypothesis, because an unfamiliar name
on a label may be read from spelling rather than from an English lexicon.

## 3. English G2P And Epitran Boundaries

English vowel letters cannot be resolved with a complete-looking list such as
`a → a/o/ey` or `i → i/e/ay`. English orthography has context rules,
morphology, lexical exceptions, and heteronyms. Adding one application regex
per discovered word would recreate a weaker pronunciation engine and still
fail on unseen drug names.

The implemented OOV route therefore uses
[eSpeak NG](https://github.com/espeak-ng/espeak-ng). Its documented dictionary
format combines exception entries with ordered pronunciation rules whose
matches can inspect preceding and following context, word boundaries,
prefixes, suffixes, consonant groups, and other conditions. The project calls
that engine through the Phonemizer API and requests pipe-delimited IPA phones
with stress. The backend is initialized once and cached; repeated words are
cached as pronunciation paths.

This is still a hypothesis for a coined product name. It solves the engineering
problem of general contextual G2P; it does not reveal what a manufacturer or a
particular Philippine speaker intended.

[Epitran](https://github.com/dmort27/epitran) converts orthography to IPA. The
batch engine retains two language/script codes as optional or parallel routes:

```text
eng-Latn  English-derived IPA route
ceb-Latn  Cebuano direct-reading IPA route
```

`eng-Latn` is used only after three safeguards:

1. CMUdict did not provide the token's pronunciation.
2. The eSpeak NG route did not produce a path.
3. Flite's external `lex_lookup` executable is discoverable on `PATH`.

Epitran documents this Flite requirement for English G2P. Installing the
Python `epitran` package alone does not provide `lex_lookup`. If the preflight
fails or transcription fails, the English Epitran route is unavailable and the
engine records provider status rather than silently treating a failure as IPA.

`ceb-Latn` is not a Cebuano-accented English model. It asks, “what IPA would
this token have if its spelling were read under the Cebuano mapping?” The engine
accepts a raw `ceb-Latn` path only at full mapping coverage. Characters not
covered by that mapping are not accepted as IPA merely because they pass through
the transliterator. A separate E3 compatibility route may explicitly normalize
`x`, `f`, `v`, `z`, or `q` before a second coverage check; that route always
keeps its substitutions and higher cost visible.

For implementation details and current language support, see the
[Epitran documentation](https://github.com/dmort27/epitran). Epitran's
`trans_list()` output is used to retain IPA segments; the system does not split
a Unicode IPA string character by character.

## 4. Evidence Levels

Evidence is about why a path exists. It is not a probability that a person will
say it that way.

| Level | Meaning | Examples in this project |
|---|---|---|
| E0 | Exact pronunciation source or reviewed local override. | CMUdict entry; curated IPA path. |
| E1 | A general pronunciation engine or a source-backed relationship supports the path, but the exact local medicine reading is unverified. | eSpeak NG OOV G2P; reduced comparison cost for locally related phones. |
| E2 | A tool-generated transcription or G2P result needing validation. | Epitran `eng-Latn`; fully covered Epitran `ceb-Latn` direct reading. |
| E3 | Explicit heuristic or nativization rule requiring validation. | English spelling fallback; `f→p`; support vowel. |

CMUdict is an English pronunciation source, not evidence that a local Cebuano
speaker uses the same pronunciation. Likewise, a full-coverage Cebuano Epitran
route is useful as a spelling-reading baseline, not direct evidence of accented
English speech.

## 5. Path Provenance

Each batch path stores the following information for audit and export:

```text
display form             human-readable approximation
IPA / phoneme segments   the sequence used for similarity
route                    e.g. english_cmudict or cebuano_epitran_direct
evidence                 E0, E1, E2, E3, or a mixed label
source                   dictionary, engine, or rule explanation
cost                     non-negative route/variant penalty
rule IDs                 all explicit rule identifiers used
coverage                 proportion supported by the Epitran direct map
stress                   index when supplied; otherwise unknown
availability/error       provider state where relevant
```

`docs/cebuano_g2p_rules.csv` is the accompanying research and validation
ledger. The current Python module does not parse that CSV at runtime, so it
must not be described as a code contract. A row documents a proposed or
implemented route and the question that still needs speaker validation.

The display form is for reviewers. It is not the canonical phonetic data; IPA
segments are the data used for the batch phonetic comparison.

Epitran routes do not supply reliable lexical stress in this workflow. Their
stress value is therefore `unknown`, and stress contributes to a pair score
only when both selected paths actually supply it (for example, a CMUdict or
curated path). The engine never invents penultimate stress.

## 6. IPA-Level Adaptations

The current model uses a bounded beam of IPA-level alternatives. It keeps the
original phone at no added cost and only a small number of explicit variants.
Examples include:

```text
/f/ → /p/       /v/ → /b/       /z/ → /s/
/θ/ → /t/       /ð/ → /d/       /r/ → /ɾ/
/ɪ, ɛ, e/ ↔ /i, e/              /u, ʊ, o, ɔ, oʊ/ ↔ /u, o/
word-final spelling y → i in the direct-reading route
```

These are conservative model parameters, not blanket claims about all Cebuano
speakers. They are linked to a rule ID and cost, then must be tested with local
speaker data. A spelling rule such as `ch → ts` is not applied merely because
the letters are `ch`; the relevant English IPA context must support an affricate
path first.

The v4 batch beam deliberately has no phone-only `/ɚ/` or `/ɝ/` replacement.
The interactive browser adds a narrower, silence-aware vowel-anchor alignment:
it groups written vowel spellings and pairs them monotonically with English
vowel nuclei. A dynamic path may skip a silent written anchor, split a vowel
cluster, or treat consonant-surrounded `y` as vocalic. If a complete alignment
still cannot be formed, it preserves unmatched English phones in a visibly
partial route and withholds rules that would require an unsupported link.
For an anchor written as standalone `a` or `ar`, `CEB_A_CONTEXT` permits only
`a`, `o`, or `ey`, never `e` or `i`. Other rhotic spellings such as `er`, `ir`,
`or`, and `ur` cannot receive that written-`a` rule. The aligned browser path is
an E3 hypothesis pending local speaker validation; it is not yet part of the
stored v4 batch export.

The research motivation for these candidates includes Cebuano phonology and
writing conventions described by Wolff and Bunye. It does not remove the need
for Cebuano-speaker validation.

## 7. Staged And Bounded Batch Scoring

The registry contains too many names for a detailed IPA-path cross-product on
every blocked pair. The batch therefore separates **candidate recall** from
**review-queue explanation**:

1. Cheap spelling, legacy-baseline, Soundex, and coarse IPA block keys identify
   comparisons worth considering.
2. A pair already retained by a spelling, Soundex, or legacy signal is written
   as a first-pass candidate without spending a full lattice comparison.
3. If a pair has no spelling-based reason but shares coarse IPA evidence, the
   engine runs the bounded lattice to decide whether it is a phonetic-only
   recall candidate. This is how weak-spelling cases such as `School` and
   `Eskul` can still enter screening.
4. After high/medium candidates are selected for human review, deferred rows
   are enriched with their full pronunciation metrics, winning routes, IPA,
   evidence, and costs. The review queue—not every screening row—is the
   complete phonetic review artifact.
5. A small **phonetic-promotion pool** gives otherwise screen-level potential
   LASA rows a second route to the queue when their coarse IPA codes overlap
   exactly. Those rows are fully profiled, then kept only when their
   cost-adjusted weighted lattice meets the promotion gate: at least `0.84`,
   or at least `0.80` with either at least `0.04` above ordinary
   Jaro–Winkler or a speech-form Jaro–Winkler of at least `0.72`.
   Rows with a numeric strength/version distinction penalty are excluded from
   this pool.

The promotion pool is deliberately narrower than the broad IPA prefix/suffix
blocking keys. “Exact coarse overlap” means that the two names share a coarse
model code; it does not assert an identical real-world pronunciation or a
verified LASA relationship.

Its default budget is at most two additional promoted rows per name and 5,000
promoted rows globally. Rebuilds may adjust those limits with
`--phonetic-promotion-pairs-per-name` and `--maximum-phonetic-promotions`.
Record any non-default values with the batch report so promotion-pool size is
reproducible.

First-pass rows that deliberately skipped the lattice carry the status
`not_scored_first_pass`. That status means “not yet profiled,” not “no sound
similarity.” Review-queue export must not treat its placeholder numeric fields
as negative phonetic evidence.

Pronunciation profiling itself is bounded to short medicine-name-sized inputs:
at present, no more than three normalized words and 36 normalized letters.
Long multi-ingredient strings, especially ingredient lists joined by `+` or
`/`, stay in spelling/context screening and are marked
`not_profiled_complex_name` rather than being forced into a misleading
cross-ingredient pronunciation. This is a safety and runtime boundary, not a
phonetic judgement.

## 8. Weighted Lattice Selection

For a profiled pair, the engine first ranks route pairs by a cheap,
cost-aware whole-path phoneme score. Only a bounded beam of plausible pairs,
plus a small raw-score audit set, receives detailed phoneme, IPA-syllable, and
where available stress comparison. Stress is added only when both paths have
known stress. It records both values below:

```text
raw path-pair similarity
cost-adjusted path-pair similarity
  = max(0, raw similarity - path-cost penalty × (cost A + cost B))
```

The selected match is the pair with the best cost-adjusted value, with lower
combined cost breaking a tie. The exported data also retains the best raw score
for audit. This prevents two high-cost E3 paths from outranking a more credible
dictionary or coverage-checked route solely because their spellings happen to
match.

Scores are experimental ranking signals, not probabilities or clinical risk
estimates. The detailed configuration, provider status, and configuration hash
are exported with each batch run.

## 9. Context Matters: `topic`, `model`, And `binary`

The same spelling vowel can have different sound routes. These are illustrative
route types, not claims about one speaker:

```text
topic
  English CMUdict route: /t ɑ p ɪ k/, displayed as “tapik” in the current engine
  Direct reading: /t o p i k/, displayed as “topik” when raw coverage is complete
  Adapted route: bounded vowel alternatives remain separately costed

model
  English CMUdict route: /m ɑ d ə l/, displayed as “madel”
  Direct reading: /m o d e l/, displayed as “model” when raw coverage is complete
  Adapted route: a “ma-del” style IPA variant only when generated and labelled

binary
  Browser English route: /b aɪ n ɚ i/, displayed as “bayneri”
  Vowel anchors: i | ar | y <-> /aɪ | ɚ | i/
  One aligned written-a change: /b aɪ n a r i/, displayed as “baynari”
  Cebuano-compatible direct-spelling recovery: final-y context produces “binari”
```

The English-source `bayneri`, aligned browser hypothesis `baynari`, and direct
recovery `binari` remain separate. The aligned path exists only because the
browser can associate `/ɚ/` with written `ar`; the same rule cannot fire for a
rhotic vowel aligned to `er`, `ir`, `or`, or `ur`. The browser generates this
for the queried word only, not by enumerating every medicine or every vowel
combination.

Neither route is automatically “proper.” The useful output is a transparent set
of candidates and the evidence behind the one that affected a LASA ranking.

## 10. Batch Authority Versus Browser Preview

The Python batch engine is authoritative for registered names and saved LASA
review-pair scores. Run:

```bash
.venv/bin/python scripts/build_lasa_candidates.py
npm run viewer:data
```

The export step serializes the enriched review queue's batch-generated paths,
IPA, provenance, costs, and model metadata into the viewer data. Browser free
text uses the pinned Phonemizer.js build of eSpeak NG. It emits one
deterministic local vowel reading per queried name. A monotonic dynamic
alignment permits silent written anchors, split vowel clusters, and vocalic
`y`; the reading may confirm the English display or apply multiple required
context decisions without branching. If complete alignment is impossible,
unmatched source phones are retained and the route is explicitly marked
partial rather than removed. Separate consonant candidates contain one bounded
change, and the direct-spelling recovery remains separately costed. The old fixed word table,
blanket `e→i`/`o→u` paths, and vowel cross-product were removed. This browser
work is on demand and does not require `viewer:data`. Browser eSpeak output is
an E1 contextual hypothesis and the aligned local path is E3; neither is a
CMUdict claim or speaker-validated result. For a registered name, inspect the
exported batch path list and profile status; rerun the export only after
deliberately changing the batch model.

## 11. Validation And Safety

Collect both pronunciation and pair judgments from Cebuano speakers, preferably
with pharmacy or clinical reviewers. Record whether a person read the label,
repeated an audio prompt, or spoke naturally in a sentence—those conditions can
produce different paths.

For each candidate, reviewers should see the exact names, formulation context,
strength, dosage form, route, winning paths, routes, evidence, and costs. The
system must never silently select a medicine from a sound-alike result.

## 12. Sources

- [WHO: Medication Without Harm / LASA guidance](https://www.who.int/publications/i/item/9789240058897)
- [FDA Phonetic and Orthographic Computer Analysis (POCA)](https://www.fda.gov/drugs/resources-drugs/phonetic-and-orthographic-computer-analysis-poca-program)
- [Kondrak and Dorr: Identification of Confusable Drug Names](https://aclanthology.org/C04-1137.pdf)
- [CMU Pronouncing Dictionary](https://github.com/cmusphinx/cmudict)
- [eSpeak NG](https://github.com/espeak-ng/espeak-ng)
- [eSpeak NG pronunciation-rule specification](https://github.com/espeak-ng/espeak-ng/blob/master/docs/dictionary.md)
- [Phonemizer API](https://bootphon.github.io/phonemizer/api_reference.html)
- [Phonemizer.js](https://github.com/xenova/phonemizer.js)
- [Jiampojamarn, Kondrak, and Sherif: many-to-many letter/phoneme alignment](https://aclanthology.org/N07-1047/)
- [Pine et al.: index-preserving rule-based G2P transformations](https://aclanthology.org/2022.computel-1.7/)
- [Epitran](https://github.com/dmort27/epitran)
- [Brooks, *Dictionary of the British English Spelling System*](https://books.openedition.org/obp/2188)
- [Wolff, *A Dictionary of Cebuano Visayan*](https://www.gutenberg.org/ebooks/40074)
- [Bunye, *Cebuano Grammar Notes*](https://manifold.uhpress.hawaii.edu/read/cebuano-grammar-notes)
