# Proposal Status Matrix, Traceability, and Confirmation Lists

Companion to `LASA_Thesis_Proposal_Ch1-4_Corrected.docx`. All values verified against fresh executions (2026-07-14) and generated reports.

## 1. Proposal-status matrix

| Component | Status | Evidence today | Thesis 2 work | Validation needed | Known limitation |
|---|---|---|---|---|---|
| Registry collection | Implemented—preliminary | 31,208 records; 428/428 queries; report retained | Re-run as needed; freeze | Benchmark reconciliation | Coverage unverified vs 32,557 |
| Registry reconciliation | Proposed for Thesis 2 | 924 dup groups, 3+773 conflicts, 11 incomplete flagged | Resolve, freeze, version | Adviser sign-off | Counts will shift |
| Canonical-name extraction | Implemented—preliminary | SQLite build, FK checks pass | Re-validate post-reconciliation | Entity spot audit | Provisional ingredient parsing |
| Pronunciation-source routing | Implemented—preliminary | Route table in exports; provider status logged | Extend curated overrides | Speaker validation | Routes are hypotheses |
| English source G2P | Implemented—preliminary | CMUdict + eSpeak NG paths in exports | OOV audit on drug names | Expert/speaker checks | Coined names remain guesses |
| Cebuano adaptation lattice | Implemented—preliminary | v4 lattice, costed paths | Refine rules; grapheme conditioning | Speaker validation | Not clinically validated |
| Grapheme-origin guard | Proposed for Thesis 2 | Browser-preview alignment fragments only | Implement contextual rules + tests | Speaker + expert review | Pending implementation |
| Pronunciation-adaptation module | Experimental | v3.14.0-prototype; 128 checks pass | Integration experiment | Speaker validation | `validated: false` |
| ALINE-style scorer | Implemented—preliminary | Module scorer; pilot recall@10 0.955 | Compare vs original ALINE | Held-out evaluation | Omits 1:2 expansion; tiny pilot |
| Orthographic similarity | Implemented—preliminary | BI-SIM/NED tests reproduce published values | Add Editex comparison | Held-out evaluation | Editex not in batch |
| Logistic-regression experiment | Proposed for Thesis 2 | Design only (Eqs 3.10–3.12) | Train/evaluate if labels suffice | Confirmed labels; name-disjoint splits | Conditional on label volume |
| Human expert validation | Proposed for Thesis 2 | Draft instrument (App. B) | Recruit, rate, adjudicate | Ethics + adviser approval | Not yet conducted |
| Cebuano-speaker validation | Proposed for Thesis 2 | Draft instrument (App. C) | Elicit, transcribe, compare | Ethics + adviser approval | Not yet conducted |
| Final threshold selection | Proposed for Thesis 2 | Pilot sweep only | Select on validation split | Held-out confirmation | Pilot thresholds not final |
| Clinical deployment | **Outside current scope** | — | None in this study | Regulatory/clinical | Explicitly excluded |

## 2. Method-to-code traceability

| Method / equation | Source location | Status | Tests | Limitation | Thesis 2 change |
|---|---|---|---|---|---|
| Weighted phoneme similarity (Eq 3.6) | `confusable drugs/scripts/filipino_phonetics.py` `weighted_phoneme_similarity` (~line 997) | Implemented—preliminary | pytest `test_filipino_phonetics.py` | Costs are design values | Possible re-tuning |
| Raw score 0.67/0.33 & 0.60/0.30/0.10 (Eqs 3.7a–b) | same file, lines ~1190–1192 | Implemented—preliminary | pytest | Fixed weights | Ablation; possible re-weight |
| Path-cost penalty 0.075 (Eq 3.8) | same file, `PATH_COST_PENALTY` line 46, applied ~1195 | Implemented—preliminary | pytest | Heuristic penalty | Sensitivity analysis |
| Ensemble 0.52/0.23/0.17/0.08 (Eq 3.9) | same file, line ~1204 (`experimental_ensemble_score`) | Implemented—preliminary | pytest + candidate-builder tests | Not a probability | Baseline vs learned combiner |
| Numeric distinction penalty 0.18/0.10 | `scripts/build_lasa_candidates.py` ~line 488 | Implemented—preliminary | `test_build_lasa_candidates.py` | Heuristic | Keep as context feature |
| Syllable / stress similarity | `filipino_phonetics.py` `_phoneme_syllables`, `stress_similarity` (~1058) | Implemented—preliminary | pytest | Stress often unknown | Separate ablated features |
| ALINE-style aligner + initial-segment boost | `engine.js` (practice-code repo) §11 (~line 1093) | Experimental | `engine.test.js` (128 checks) | Omits ALINE 1:2 ops | Compare vs original ALINE |
| BI-SIM / NED | `engine.js` `biSim` (~1185), `ned` | Implemented—preliminary | Reproduce K&D 2004 Table 2 values | — | Reuse in integrated engine |
| Cebuano-grouped Editex (preview) | `confusable drugs/viewer/cebuano-core.js` `editexCost` (~299) | Experimental (browser only) | viewer tests | Not in batch | Promote or drop after eval |
| Grapheme-origin guard (Eq 3.5) | browser preview alignment only (`viewer/cebuano-core.js`) | Proposed for Thesis 2 | none yet | Unimplemented in batch | Implement + test |
| Logistic regression (Eqs 3.10–3.12) | none (design) | Proposed for Thesis 2 | none | No labels yet | Implement with scikit-learn |
| Pilot evaluation | `soundalike-eval.js` (practice-code repo) | Experimental | fresh run included | 46 names; 23 positives; no held-out split | Full gold set + splits |

## 3. Proposed-method → Thesis 2 work

| Proposed method | Thesis 2 activities (timeline #) |
|---|---|
| Dataset finalization | Reconciliation, freeze, versioning (#2) |
| Grapheme-origin adaptation | Alignment implementation (#3), rule refinement (#4), tests (#6) |
| Integrated engine | Pronunciation-module–registry integration experiment (#5), interface (#16) |
| Labeled gold set | Instruments (#7), ethics (#8), expert review (#9), speaker eval (#10), finalization (#11) |
| Models & thresholds | Training / threshold selection (#12), held-out eval (#13) |
| Analysis | Ablations (#14), statistics (#15), writing & defense (#17–18) |

## 4. Claims still requiring scholarly citations / verification

1. mesulid/mellaril as a documented confusable pair (flagged in `soundalike-eval.js`; needs a primary citation or removal from gold set).
2. /f/→/p/, /v/→/b/ and vowel-neutralization prevalence among Cebuano speakers specifically (currently supported by general descriptive sources; needs Cebuano-specific phonology/loanword studies and/or the study's own speaker data).
3. Cebuano historical three-vowel inventory and modern loanword vowels (Wolff 1972 cited; a modern Cebuano phonology source would strengthen it).
4. Stress-placement behavior for English loanwords in Cebuano (no direct source cited; treated as unknown-if-absent in the model).
5. DOI suffixes for Millán-Hernández et al. (2019a) and Vázquez et al. (2020) (carried over from the original draft bibliography; verify against the publisher before final submission).
6. ISMP list edition/year to be pinned at dataset-freeze time.

## 5. Administrative details requiring proponent/adviser confirmation

- Expert-reviewer count (5–10) and qualifications; speaker count (15–30); Metro Cebu recruitment.
- Ethics-review route (USC-IERC or as the adviser directs) and its calendar.
- Responsibility split between Padal and Palanas (Table 5 "Lead" column).
- ₱10,000 budget and cost sharing.
- All Thesis 2 calendar dates (T2-week placeholders in Table 5).
- Panel/defense scheduling.

## 6. Proposed Thesis 2 activities (as committed in the document)

Reconcile and finalize the dataset; improve the English-to-Cebuano adaptation engine; add grapheme-origin-aware rules; integrate selected components; create/validate labeled pairs; expert and Cebuano-speaker validation (subject to approval); compare similarity models; tune thresholds; ablations; ranking and classification evaluation; complete the application interface; analyze results and write conclusions.

## 7. Verification statement

- Pronunciation-module tests re-run 2026-07-14: **128 passed, 0 failed** (`engine_fresh_test_output.txt`).
- Pilot evaluation re-run 2026-07-14: recall@1 .591 / @3 .739 / @5 .807 / @10 .955; best F1 at t=0.70 (P .52 / R .52 / F1 .52) (`engine_fresh_eval_output.txt`).
- Registry figures read from `data/ph_fda/reports/collection_report.json` (incl. `complete_registry_verified: false`).
- Kondrak & Dorr (2004) footnote 5 (74.2% initial-segment statistic) verified against the paper itself.
- **Every one of the 62 rendered pages of the corrected PDF was visually inspected** (8 contact sheets + close-ups of equations, Table 1 continuation, timeline, figures, bibliography, and appendices); no clipped text, no mid-word route breaks, no blank TOC, no lone-URL final page.
