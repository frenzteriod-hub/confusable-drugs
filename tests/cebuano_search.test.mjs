import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  browserPronunciationProfile,
  decodedPathDetailEntries,
  pronunciationPaths,
  scoreNames,
} from "../viewer/cebuano-core.js";
import {
  parseEspeakIPA,
  phonesToDisplay,
} from "../viewer/english-g2p.js";

test("columnar batch path details decode with provenance intact", () => {
  const entries = decodedPathDetailEntries({
    format: "dictionary_columnar_v1",
    dictionaries: {
      labels: ["CMUdict English pronunciation"],
      routes: ["english_cmudict"],
      evidence: ["E0"],
      sources: ["CMU Pronouncing Dictionary"],
      rules: ["EN_CMU_DICT"],
      availability: ["available"],
    },
    names: [["B1", "profiled", 1, false, [[
      "tapik", "t ɑ p ɪ k", "ta-pik", 0, 0, 0, 0, 0,
      0, 1, 1, [0], 0, null,
    ]]]],
  });
  const path = entries[0][1].paths[0];
  assert.equal(entries[0][0], "B1");
  assert.equal(path.route, "english_cmudict");
  assert.equal(path.source, "CMU Pronouncing Dictionary");
  assert.deepEqual(path.rules, ["EN_CMU_DICT"]);
  assert.equal(path.ipa, "t ɑ p ɪ k");
});

test("direct-spelling recovery remains separate from English G2P", () => {
  assert.deepEqual(pronunciationPaths("binary"), ["binary", "binari"]);
});

test("English G2P source contains no word-specific example lookup", () => {
  const source = readFileSync(
    new URL("../viewer/english-g2p.js", import.meta.url),
    "utf8",
  );
  const examples = [
    "binary", "basket", "ball", "late", "note", "stress", "like",
    "universe", "umbrella", "uranus", "head", "idea", "claude",
    "could", "cloud", "cefuroxime", "xylometazoline", "biozalin",
  ];
  for (const word of examples) {
    assert.equal(source.includes(`"${word}"`), false, word);
    assert.equal(source.includes(`'${word}'`), false, word);
  }
});

test("IPA parser preserves English diphthongs, stress, and the y glide", () => {
  const binary = parseEspeakIPA("bˈaɪnɚɹi");
  assert.deepEqual(binary.phones, ["b", "aɪ", "n", "ɚ", "i"]);
  assert.equal(binary.stress, 0);
  assert.equal(phonesToDisplay(["j", "u", "n", "ɪ", "v", "ɝ", "s"]), "yunivers");
  assert.deepEqual(parseEspeakIPA("sɪlᵻn").phones, ["s", "ɪ", "l", "ɪ", "n"]);
});

test("contextual engine covers all reported English vowel examples", async () => {
  const expected = new Map([
    ["binary", "bayneri"],
    ["basket", "baskit"],
    ["ball", "bol"],
    ["late", "leyt"],
    ["note", "nowt"],
    ["stress", "stres"],
    ["like", "layk"],
    ["universe", "yunivers"],
    ["umbrella", "ambrele"],
    ["uranus", "yurranes"],
    ["head", "hed"],
    ["idea", "aydie"],
    ["claude", "klod"],
    ["could", "kud"],
    ["cloud", "klawd"],
  ]);
  for (const [word, display] of expected) {
    const profile = await browserPronunciationProfile(word);
    const source = profile.paths.find(path => path.route === "english_espeak_ng");
    assert.equal(profile.engineAvailable, true, word);
    assert.equal(source.display, display, word);
    assert.equal(source.evidence, "E1", word);
    assert.deepEqual(source.rules, ["EN_ESPEAK_NG"], word);
  }
});

test("binary keeps English source, aligned adaptation, and direct reading separate", async () => {
  const profile = await browserPronunciationProfile("binary");
  const source = profile.paths.find(path => path.route === "english_espeak_ng");
  const adapted = profile.paths.find(path => path.route === "cebuano_grapheme_adaptation");
  const direct = profile.paths.find(path => path.route === "cebuano_direct_spelling");
  assert.equal(source.display, "bayneri");
  assert.equal(adapted.display, "baynari");
  assert.equal(adapted.alignment.grapheme, "ar");
  assert.equal(adapted.alignment.sourcePhone, "ɚ");
  assert.equal(adapted.alignment.localDisplay, "ar");
  assert.ok(adapted.rules.includes("CEB_A_CONTEXT"));
  assert.equal(direct.display, "binari");
  assert.ok(source.cost < adapted.cost);
  assert.ok(adapted.cost < direct.cost);
  assert.ok(!profile.paths.some(path => path.display === "bayniri"));
  assert.ok(!profile.paths.some(path => path.rules.includes("CEB_RHOTIC_VOWEL")));
});

test("written-a adaptation is aligned, contextual, and never a blanket e/i rule", async () => {
  for (const word of ["basket", "ball", "late", "head", "her", "bird", "turn"]) {
    const profile = await browserPronunciationProfile(word);
    assert.ok(!profile.paths.some(path => path.rules.includes("CEB_A_CONTEXT")), word);
  }
  const any = await browserPronunciationProfile("any");
  const adapted = any.paths.find(path => path.route === "cebuano_grapheme_adaptation");
  assert.equal(adapted.display, "ani");
  assert.equal(adapted.alignment.grapheme, "a");
  assert.ok(!any.paths.some(path => ["eni", "ini"].includes(path.display)
    && path.route === "cebuano_grapheme_adaptation"));
});

test("contextual local reading covers the reported vowel examples without branching", async () => {
  const expected = new Map([
    ["binary", "baynari"],
    ["basket", "basket"],
    ["ball", "bol"],
    ["late", "leyt"],
    ["note", "not"],
    ["stress", "stres"],
    ["like", "layk"],
    ["universe", "yunivers"],
    ["umbrella", "ambrela"],
    ["uranus", "yoreynos"],
    ["head", "hed"],
    ["idea", "aydiya"],
    ["claude", "klod"],
    ["could", "kud"],
    ["cloud", "klawd"],
    ["topic", "topik"],
    ["model", "model"],
  ]);
  for (const [word, display] of expected) {
    const profile = await browserPronunciationProfile(word);
    const aligned = profile.paths.filter(
      path => path.route === "cebuano_grapheme_adaptation",
    );
    assert.equal(aligned.length, 1, word);
    assert.equal(aligned[0].display, display, `${word}: ${JSON.stringify(aligned[0].alignment)}`);
    assert.ok(aligned[0].rules.includes("CEB_CONTEXT_ALIGNED"), word);
  }
});

test("consonant candidates remain single changes rather than a cross-product", async () => {
  for (const word of ["universe", "cefuroxime", "xylometazoline"]) {
    const profile = await browserPronunciationProfile(word);
    const consonantPaths = profile.paths.filter(
      path => path.route === "cebuano_phone_adaptation",
    );
    for (const path of consonantPaths) {
      assert.equal(path.rules.filter(rule => rule !== "EN_ESPEAK_NG").length, 1, word);
    }
  }
});

test("unseen drug-like names use general G2P rather than a spelling lookup", async () => {
  for (const word of [
    "cefuroxime", "xylometazoline", "biozalin", "omeprazole",
    "azithromycin", "furosemide", "aspirin",
  ]) {
    const profile = await browserPronunciationProfile(word);
    assert.equal(profile.engineAvailable, true);
    assert.ok(profile.paths.some(path => path.route === "english_espeak_ng"));
    const aligned = profile.paths.find(
      path => path.route === "cebuano_grapheme_adaptation",
    );
    assert.ok(aligned, word);
    assert.equal(aligned.alignment.complete, true, word);
    assert.ok(!profile.paths.some(path => path.route === "english_spelling_fallback"));
    assert.ok(profile.rawIpa.length > 0);
  }
});

test("a rare incomplete alignment is preserved and visibly marked partial", async () => {
  const profile = await browserPronunciationProfile("rhythm");
  const aligned = profile.paths.find(
    path => path.route === "cebuano_grapheme_adaptation",
  );
  assert.ok(aligned);
  assert.equal(aligned.alignment.complete, false);
  assert.ok(aligned.rules.includes("CEB_CONTEXT_PARTIAL"));
  assert.ok(!aligned.rules.includes("CEB_CONTEXT_ALIGNED"));
});

test("multi-word G2P keeps a word boundary", async () => {
  const profile = await browserPronunciationProfile("Mac Ester");
  const source = profile.paths.find(path => path.route === "english_espeak_ng");
  assert.ok(source.display.includes(" "));
  assert.ok(source.ipa.includes("‖"));
});

test("sound scoring consumes structured path costs", async () => {
  const first = await browserPronunciationProfile("binari");
  const second = await browserPronunciationProfile("binary");
  const score = scoreNames("binari", "binary", first.paths, second.paths);
  assert.equal(score.rawSound, 1);
  assert.ok(score.sound < score.rawSound);
  assert.ok(score.overall > 0.85);
  assert.equal(score.matchBasis, "localized-reading");
  assert.ok(score.readingConfidence < 1);
});

test("context-dependent long vowels are not blanket spelling replacements", async () => {
  const late = await browserPronunciationProfile("late");
  const displays = late.paths.map(path => path.display);
  assert.ok(displays.includes("leyt"));
  assert.ok(displays.includes("late"));
  assert.ok(!displays.includes("lati"));
  assert.ok(!displays.includes("lit"));
});

test("a missing internal chunk is tolerated but not treated as exact", () => {
  const score = scoreNames("amoxcillin", "Amoxicillin");
  assert.ok(score.overall > 0.80);
  assert.ok(score.overall < 1);
});
