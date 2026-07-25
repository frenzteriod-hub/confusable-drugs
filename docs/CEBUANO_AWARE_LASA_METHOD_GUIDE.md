# Cebuano-Aware Confusable Drug Names: Method Guide

This project is a look-alike/sound-alike (LASA) **candidate-ranking** system.
It helps a reviewer find medicine names that deserve a closer look. It does not
identify a medicine from speech, prove that a medication error will occur, or
automatically label a pair as clinically dangerous.

## The Short Version

```text
Published PH FDA names
-> preserve the official spelling
-> use cheap spelling and coarse-IPA blocking for first-pass recall
-> use a bounded pronunciation lattice for phonetic-only recall
-> enrich the selected review queue with full IPA evidence
-> rank potential LASA pairs for human review
-> verify the exact brand/generic, strength, dosage form, and context by human review
```

The key idea is not to force one “Cebuano pronunciation” for an English-looking
drug name. A speaker may use an English-derived reading, read the spelling more
directly, or use an adapted reading. The model keeps these as separate,
costed hypotheses.

## 1. What Is Being Localized

Look-alike similarity is mostly orthographic, so standard measures such as
Jaro–Winkler, Levenshtein distance, and bigram overlap remain useful. The
localized part is sound-alike screening: an English-looking drug name can be
read in different ways in a Philippine/Cebuano setting.

The project therefore combines:

- spelling similarity and Soundex as supporting signals;
- coarse IPA-derived blocking keys so distant spellings can reach full scoring;
- a provenance-aware pronunciation lattice; and
- human review of the medicine context.

This follows the general shape of LASA work such as FDA POCA and the
orthographic/phonetic methods discussed by Kondrak and Dorr. It does not claim
to reproduce their systems exactly.

## 2. Implemented Pronunciation Architecture

The active batch engine uses the following routes for each normalized token:

```text
reviewed IPA override, if one exists
-> CMU Pronouncing Dictionary English path, if the token exists there
-> eSpeak NG English dictionary/context-rule G2P for unknown tokens
-> Epitran English path, only when Flite lex_lookup is available
-> explicitly labelled English spelling fallback

in parallel:
-> Epitran Cebuano direct-reading path, only with full mapping coverage
-> explicit nativized Cebuano Epitran path, when coverage repairs are needed
-> bounded IPA-level Cebuano/Philippine-English adaptations
-> retained legacy spelling-rule baseline
```

The direct-reading route is not merely a fallback from English. It models the
possibility that an unfamiliar label is read from its spelling rather than from
an English lexicon.

| Route | Meaning | Evidence level |
|---|---|---:|
| `curated` | A locally reviewed IPA override. | E0 |
| `english_cmudict` | Exact CMUdict entry for an English word/token. | E0 |
| `english_espeak_ng` | eSpeak NG exception dictionary and ordered context rules for an OOV token. | E1 |
| `english_epitran` | Epitran `eng-Latn` IPA when Flite is available. | E2 |
| `english_heuristic` | Emergency spelling fallback when no English G2P provider returns a path. | E3 |
| `cebuano_epitran_direct` | Epitran `ceb-Latn` direct spelling-reading hypothesis. | E2 |
| `cebuano_epitran_nativized` | Explicit coverage repair before `ceb-Latn`. | E3 |
| `cebuano_phone_adaptation` | Bounded IPA-level local adaptation. | E1/E3 |
| `cebuano_legacy_rule` | Historical spelling-rule baseline for ablation/comparison. | E3 |

Evidence explains why a path exists. It is not the probability that a specific
speaker will say it that way.

## 3. Contextual English G2P Plus Epitran

The project does not maintain its own exhaustive table for English `a`, `e`,
`i`, `o`, `u`, vowel pairs, silent letters, and surrounding consonants.
[eSpeak NG](https://github.com/espeak-ng/espeak-ng) already supplies a hybrid
system: an exception dictionary for known forms and ordered pronunciation rules
with preceding and following context for unseen forms. The batch accesses it
through `phonemizer-fork` and a bundled `espeakng-loader` library, preserving
stress and pipe-delimited IPA segments. CMUdict still ranks above this route
when an exact entry exists.

The resulting `english_espeak_ng` path generalizes to unknown brand and drug-like
names, but it is not automatically the manufacturer-intended or local
pronunciation. This is why disagreement, direct spelling, and local adaptation
paths remain in the lattice.

Epitran is the right kind of building block because it produces IPA segments,
not just another English respelling. It is deliberately used as a baseline
inside a larger lattice rather than as a complete “Cebuano accent” model.

```text
eng-Latn  English-derived IPA seed
ceb-Latn  Direct Cebuano reading of the written token
```

Important constraints:

- `eng-Latn` needs Flite’s external `lex_lookup` executable. Installing the
  Python package alone is insufficient. If it is absent, the optional route is
  marked unavailable; eSpeak NG remains the normal English OOV provider.
- `ceb-Latn` does **not** mean “how a Cebuano speaker says English.” It means
  “how this spelling maps under the Cebuano orthographic model.”
- Some Latin letters need explicit coverage handling. The batch engine accepts
  a raw `ceb-Latn` result only when all letters are mapped. It may create a
  separately labelled E3 route with `x→ks`, `f→p`, `v→b`, `z→s`, or `q→k`, then
  checks coverage again.
- IPA is kept as segments with `trans_list()`-style tokenization. The code does
  not split a Unicode IPA string character by character.
- Epitran stress is treated as unknown. The model never invents penultimate
  stress just because a word has several syllables.

## 4. Why Nearby Letters Still Matter

The user's examples are exactly why a simple five-vowel replacement table is
not enough.

```text
topic
  English dictionary route can yield an IPA sequence displayed as “tapik”.
  Cebuano direct reading can yield a path displayed as “topik”.

model
  English dictionary route can yield “madel”.
  Cebuano direct reading can yield “model”.
```

The interactive browser now reports three explicit, separate interpretations
for `binary`:

```text
eSpeak NG English source: /b aɪ n ɚ i/ -> bayneri
aligned browser anchors: i | ar | y <-> /aɪ | ɚ | i/
written-a contextual adaptation: /b aɪ n a r i/ -> baynari
Cebuano-compatible direct-spelling recovery with final-y context -> binari
```

The browser does not rewrite `/ɚ/` from the phone sequence alone. It first
aligns vowel nuclei monotonically to written vowel anchors and fails closed if
their counts cannot be reconciled. Only an anchor written as standalone `a` or
`ar` can invoke `CEB_A_CONTEXT`; the permitted local displays are `a`, `o`, or
`ey`, never `e` or `i`. Thus `binary` changes only aligned `ar -> er` to
`ar`, while English `i -> ay` and final `y -> i` remain intact. This is computed
for the entered word only and does not scan or regenerate the medicine
database.

The stored Python batch data remains the v4 export. Its phone-only rhotic rule
is still disabled, so it retains English `bayneri` and direct `binari` until the
new aligned browser hypothesis has speaker validation and is deliberately
promoted into a later batch model.

The browser emits one deterministic local reading whenever English G2P
succeeds. Its monotonic alignment can skip a silent written vowel, split a
multi-vowel spelling across nuclei, and recognize consonant-surrounded `y` as a
vowel anchor. A rule may confirm the English display or replace only the
contextually mismatching nuclei; it does not branch over every alternative. If
a rare word remains only partially alignable, unmatched English phones are
preserved and the route is explicitly marked partial rather than suppressed.
Current regression examples include `basket -> basket`, `ball -> bol`,
`late -> leyt`, `note -> not`, `model -> model`, `topic -> topik`,
`umbrella -> ambrela`, `uranus -> yoreynos`, and `idea -> aydiya`.
Medicine-like regression cases with internal silent letters or vocalic `y`
include `omeprazole`, `azithromycin`, `furosemide`, and `aspirin`.

Both routes are useful. Neither is declared universally correct. The preceding
letters, word history, and route source determine the vowel sequence; the
system should not replace every `o` or `e` with one fixed sound.

The same principle applies to consonants. The model can generate bounded
alternatives such as `/f/→/p/`, `/v/→/b/`, `/z/→/s/`, `/θ/→/t/`, `/ð/→/d/`, and
some vowel closeness. These are costed comparison hypotheses, not universal
claims about Cebuano speakers.

## 5. Path Record: What Must Be Saved

Every batch path should remain inspectable. The current export contains:

```text
display form            reviewer-friendly approximation
IPA segments            data used by the phonetic comparison
route                   source family, for example english_cmudict
evidence                E0 / E1 / E2 / E3
source                  dictionary, engine, or explicit fallback explanation
path cost               non-negative penalty for speculative routes
rule IDs                substitutions used to construct the path
coverage                direct Epitran mapping coverage
stress                  supplied index or unknown
availability / error    provider state when relevant
```

The display form is not the authoritative phonetic representation. IPA
segments are. A display such as `tapik` is there so a reviewer can understand
the candidate without reading IPA.

## 6. Candidate Blocking And Staged Scoring

Comparing every pair of roughly 25,000 indexed names is expensive. The batch
pipeline first uses ordinary spelling and legacy-baseline keys, then adds coarse
IPA-derived prefixes, suffixes, and length buckets. These are **recall keys**,
not evidence that a pair is confusable.

The detailed lattice is staged:

1. Pairs with a spelling, Soundex, or legacy-baseline reason are retained as
   inexpensive first-pass candidates.
2. A pair with no such reason receives a first-pass full lattice only if it has
   shared coarse IPA evidence, because that is a plausible phonetic-only recall
   case.
3. Once the high/medium review queue is selected, deferred spelling candidates
   receive the same full path, IPA, cost, and provenance enrichment as the
   phonetic-only candidates.

There is also a narrow **phonetic-promotion pool** for potential LASA rows that
would otherwise remain at screen priority. A row enters this pool only when its
coarse IPA code overlaps exactly with the other name; it is fully profiled and
kept in the final review queue only if its cost-adjusted weighted lattice passes
the same gate as first-pass phonetic recall: at least `0.84`, or at least `0.80`
with either a `0.04` lead over ordinary Jaro–Winkler or speech-form
Jaro–Winkler of at least `0.72`. Numeric strength/version distinctions carrying
a penalty do not enter this pool. Exact coarse overlap is a model filter, not a
claim that two speakers pronounce the names identically.

The default promotion budget is two extra rows per name and 5,000 rows globally.
Use `--phonetic-promotion-pairs-per-name` and
`--maximum-phonetic-promotions` to tune those limits for a documented rebuild.

Thus a screening-row status of `not_scored_first_pass` means deferred detailed
phonetics, not a zero sound-alike finding. The fully enriched review queue is
the artifact reviewers should use when judging sound similarity.

This matters for a pair such as:

```text
School ↔ Eskul
```

Their ordinary spelling similarity is low, but an English-derived `school`
path and a support-vowel hypothesis can align. Shared coarse IPA evidence lets
the pair reach full scoring; the reviewer still sees that the winning route is
speculative rather than treating it as a fact.

### Complex Ingredient Names

Pronunciation profiling is intentionally limited to short, medicine-name-sized
inputs: at present, no more than three normalized words and 36 normalized
letters. A long multi-ingredient string can create a large and misleading
cross-product of token paths, especially when ingredients are joined by `+` or
`/`. Those names remain eligible for spelling/context screening but are marked
`not_profiled_complex_name`; the system does not invent a single whole-string
pronunciation. That status is not a claim that the names are acoustically
different or safe.

## 7. Weighted Phonetic Similarity

For a profiled pair, the engine uses a bounded, cost-aware beam of plausible
path pairs for detailed calculation:

```text
phoneme similarity
IPA-syllable similarity
stress similarity, only when both paths have known stress
```

Related substitutions receive lower edit costs than unrelated ones. For
example, `/f/` and `/p/` are closer than `/f/` and `/m/`. This is a weighted IPA
edit-distance approach, not a full implementation of ALINE. It may be
described as ALINE-inspired only if that distinction is made clear.

The engine retains two values:

```text
raw path-pair score
weighted lattice score = max(0, raw score - penalty × (cost A + cost B))
```

It selects the pair with the best **weighted** score, with lower combined cost
breaking a tie. This prevents two weak E3 spellings from automatically winning
because they happen to match exactly. The raw maximum remains visible for audit.

## 8. Combining Sound And Spelling

Before a labelled Cebuano medicine-pronunciation dataset exists, any combined
ranking is hand-weighted and experimental. It should be called a ranking score,
not a probability or clinical risk estimate.

Useful features include:

```text
cost-adjusted pronunciation lattice similarity
raw best path similarity (audit only)
weighted IPA phoneme similarity
IPA-syllable similarity
Jaro-Winkler and edit similarity
bigram overlap, prefixes/suffixes, Soundex
numeric-strength distinction penalty
winning path route, evidence, and cost
```

Numeric tokens must stay distinct. Similar names with different strengths,
versions, dosage forms, or formulations require extra caution rather than an
automatic match.

An enriched review row also retains the pronunciation-profile status. If a
complex name was intentionally not profiled, reviewers see that status beside
the spelling and context metrics instead of an invented path.

## 9. Human Review And Evaluation

The next research step is not to add unlimited rules. It is to collect
consented, speaker-provided data and pair judgments.

For each reviewed pair, record:

```text
name A / name B
brand or generic type
strength, dosage form, and formulation context
paths shown and their IPA/provenance
speaker or reviewer task (label reading, audio repetition, natural speech)
sound-alike and look-alike judgment
LASA-review judgment and rationale
```

Use name-disjoint training and test splits if a learned model is later added;
otherwise near-duplicate names can leak between training and evaluation. Report
reviewer agreement as well as ranking metrics such as Precision@k, Recall@k,
MRR, and PR-AUC where labels support them.

Suggested ablations:

```text
1. spelling-only baseline
2. English CMUdict/eSpeak NG/Epitran route only
3. coverage-checked Cebuano direct-reading Epitran route only
4. weighted multi-route lattice
5. legacy Filipino/Philippine spelling transform (explicit historical baseline)
```

## 10. Browser Preview Versus Batch Output

The Python batch engine is authoritative for registered-name paths and saved
review-pair scores. The export sends its current paths, IPA, evidence, costs,
and configuration metadata to the viewer.

The free-form browser pronunciation lab is useful for trying invented names.
It now bundles Phonemizer.js/eSpeak NG and returns contextual English IPA,
separately costed phone adaptations, and a direct-spelling recovery path. It no
longer uses a fixed example-word table or blanket vowel merging. Browser output
is still generated E1/E3 evidence, not a CMUdict claim or a verified local
pronunciation, and exported batch output remains authoritative for a registered
medicine name.

## 11. Safety Statement For The Thesis

Use wording like this:

> This system ranks possible LASA name pairs for review. It does not establish
> a clinically dangerous relationship or select a medicine. Final assessment
> requires human review of the exact name, active ingredient, strength, dosage
> form, route, product relationship, and clinical context.

## Sources To Keep Nearby

- [WHO LASA guidance](https://www.who.int/publications/i/item/9789240058897)
- [FDA Phonetic and Orthographic Computer Analysis](https://www.fda.gov/drugs/resources-drugs/phonetic-and-orthographic-computer-analysis-poca-program)
- [Kondrak and Dorr, *Identification of Confusable Drug Names*](https://aclanthology.org/C04-1137.pdf)
- [CMU Pronouncing Dictionary](https://www.speech.cs.cmu.edu/cgi-bin/cmudict?in=welcome)
- [eSpeak NG pronunciation rules](https://github.com/espeak-ng/espeak-ng/blob/master/docs/dictionary.md)
- [Phonemizer](https://bootphon.github.io/phonemizer/)
- [Phonemizer.js](https://github.com/xenova/phonemizer.js)
- [Jiampojamarn, Kondrak, and Sherif: many-to-many letter/phoneme alignment](https://aclanthology.org/N07-1047/)
- [Pine et al.: index-preserving rule-based G2P transformations](https://aclanthology.org/2022.computel-1.7/)
- [Epitran](https://github.com/dmort27/epitran)
- [Flite](https://github.com/festvox/flite)
- [Wolff, *A Dictionary of Cebuano Visayan*](https://www.gutenberg.org/ebooks/40074)
- [Mango-Cats PoC-PhOCA](https://github.com/Mango-Cats/PoC-PhOCA) as a
  Philippine/Filipino comparison baseline, not a Cebuano pronunciation source.
