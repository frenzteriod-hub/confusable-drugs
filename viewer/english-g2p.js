import { phonemize } from "./vendor/phonemizer.js";

const WORD_BOUNDARY = "‖";
const SOURCE_COST = 0.20;
const MAX_ADAPTED_PATHS = 4;

const VOWELS = new Set([
  "a", "ɑ", "ɒ", "æ", "ʌ", "ə", "ɚ", "ɝ", "ɜ", "e", "ɛ",
  "ɪ", "i", "o", "ɔ", "oʊ", "ʊ", "u", "aɪ", "aʊ", "ɔɪ", "eɪ",
]);

const IPA_DISPLAY = new Map(Object.entries({
  "ɑ": "a", "ɒ": "o", "æ": "a", "ʌ": "a", "ə": "e",
  "ɚ": "er", "ɝ": "er", "ɜ": "er", "ɔ": "o", "o": "o",
  "oʊ": "ow", "ʊ": "u", "u": "u", "ɪ": "i", "i": "i",
  "ɛ": "e", "e": "e", "eɪ": "ey", "aɪ": "ay", "aʊ": "aw",
  "ɔɪ": "oy", "tʃ": "ch", "dʒ": "j", "ɡ": "g", "ŋ": "ng",
  "θ": "th", "ð": "dh", "ʃ": "sh", "ʒ": "zh", "ɾ": "r",
  "j": "y", "ɹ": "r", "ɫ": "l", "ʔ": "", [WORD_BOUNDARY]: " ",
}));

const RAW_IPA_TOKENS = [
  "ɚɹ", "dʒ", "tʃ", "aɪ", "aʊ", "eɪ", "oʊ", "ɔɪ",
  "ɑː", "ɒː", "ɔː", "iː", "uː", "ɜː",
  "iə", "ɪə", "eə", "uə", "ʊə", "ɔə", "ʊɹ",
];

const RAW_PHONE_EXPANSIONS = new Map(Object.entries({
  "ɚɹ": ["ɚ"],
  "ɑː": ["ɑ"], "ɒː": ["ɒ"], "ɔː": ["ɔ"],
  "iː": ["i"], "uː": ["u"], "ɜː": ["ɝ"], "ɐ": ["ʌ"],
  // eSpeak uses these reduced-vowel symbols in unfamiliar and medicine-like
  // words.  Canonicalize them before alignment so they are not mistaken for
  // consonants merely because the compact browser inventory omitted them.
  "ᵻ": ["ɪ"], "ᵿ": ["ʊ"], "ᵊ": ["ə"],
  "ɹ": ["r"], "ɫ": ["l"],
  "iə": ["i", "ə"], "ɪə": ["ɪ", "ə"], "eə": ["e", "ə"],
  "uə": ["u", "ə"], "ʊə": ["ʊ", "ə"], "ɔə": ["ɔ", "ə"],
  "ʊɹ": ["ʊ", "r"],
}));

// Browser free text builds one deterministic aligned vowel reading rather
// than a cross-product.  Separate consonant candidates still contain one
// bounded change each.
const CONSONANT_ALTERNATIVES = new Map([
  ["f", [[ ["p"], 0.38, "CEB006" ]]],
  ["v", [[ ["b"], 0.38, "CEB007" ]]],
  ["z", [[ ["s"], 0.30, "CEB008" ]]],
  ["θ", [[ ["t"], 0.22, "CEB_TH_T" ]]],
  ["ð", [[ ["d"], 0.22, "CEB_DH_D" ]]],
  ["r", [[ ["ɾ"], 0.12, "CEB_R_TAP" ]]],
]);

const WRITTEN_VOWELS = new Set(["a", "e", "i", "o", "u"]);
const LOCAL_A_DISPLAYS = new Set(["a", "o", "ey"]);
const LOCAL_I_DISPLAYS = new Set(["i", "e", "ay"]);
const LOCAL_U_DISPLAYS = new Set(["u", "a", "o"]);

function normalizedWords(value) {
  return (String(value || "").toLocaleLowerCase().match(/[a-z0-9]+/g) || [])
    .filter(Boolean);
}

function canonicalRawPhone(raw) {
  if (RAW_PHONE_EXPANSIONS.has(raw)) return RAW_PHONE_EXPANSIONS.get(raw);
  return [raw.replaceAll("͡", "").replaceAll("̩", "").replaceAll("g", "ɡ")];
}

export function parseEspeakIPA(value) {
  const ipa = String(value || "").trim();
  const phones = [];
  let primaryStress = null;
  let secondaryStress = null;
  let pendingStress = "";
  let vowelIndex = 0;
  let index = 0;

  while (index < ipa.length) {
    const character = ipa[index];
    if (character === "ˈ" || character === "ˌ") {
      pendingStress = character;
      index += 1;
      continue;
    }
    if (/\s/.test(character)) {
      if (phones.length && phones.at(-1) !== WORD_BOUNDARY) phones.push(WORD_BOUNDARY);
      pendingStress = "";
      index += 1;
      continue;
    }
    const raw = RAW_IPA_TOKENS.find(token => ipa.startsWith(token, index)) || character;
    index += raw.length;
    for (const phone of canonicalRawPhone(raw)) {
      if (!phone) continue;
      if (phone === "r" && ["ɚ", "ɝ"].includes(phones.at(-1))) continue;
      if (VOWELS.has(phone)) {
        if (pendingStress === "ˈ" && primaryStress === null) primaryStress = vowelIndex;
        if (pendingStress === "ˌ" && secondaryStress === null) secondaryStress = vowelIndex;
        vowelIndex += 1;
        pendingStress = "";
      }
      phones.push(phone);
    }
  }
  if (phones.at(-1) === WORD_BOUNDARY) phones.pop();
  return {
    phones,
    stress: primaryStress ?? secondaryStress,
  };
}

export function phonesToDisplay(phones) {
  return phones.map(phone => IPA_DISPLAY.get(phone) ?? phone).join("")
    .replace(/\s+/g, " ").trim();
}

function makePath({
  phones, stress, route, label, evidence, source, cost, rules, alignment = null,
}) {
  return {
    display: phonesToDisplay(phones),
    ipa: phones.join(" "),
    phonemes: phones,
    stress,
    label,
    route,
    evidence,
    source,
    cost: Number(cost.toFixed(6)),
    confidence: Number(Math.exp(-cost).toFixed(6)),
    coverage: 1,
    rules,
    alignment,
    availability: "available",
    error: null,
  };
}

function writtenVowelAnchors(word, wordIndex) {
  const anchors = [];
  let index = 0;
  while (index < word.length) {
    if (WRITTEN_VOWELS.has(word[index])) {
      const start = index;
      while (index < word.length && WRITTEN_VOWELS.has(word[index])) index += 1;
      // Treat a final y following a vowel as part of that vowel spelling
      // (day, key, boy), but retain final y as its own anchor after a
      // consonant (binary).
      if (index === word.length - 1 && word[index] === "y") index += 1;
      if (index < word.length && word[index] === "r") index += 1;
      anchors.push({
        word,
        wordIndex,
        start,
        end: index,
        grapheme: word.slice(start, index),
      });
      continue;
    }
    // A y surrounded by consonants is normally the written vowel nucleus
    // (mycin, rhythm, byte).  A y beside a written vowel remains outside the
    // anchor because it is commonly a glide or part of that spelling context.
    if (
      word[index] === "y"
      && !WRITTEN_VOWELS.has(word[index - 1])
      && !WRITTEN_VOWELS.has(word[index + 1])
    ) {
      anchors.push({
        word,
        wordIndex,
        start: index,
        end: index + 1,
        grapheme: "y",
      });
      index += 1;
      continue;
    }
    if (index === word.length - 1 && word[index] === "y") {
      anchors.push({
        word,
        wordIndex,
        start: index,
        end: index + 1,
        grapheme: "y",
      });
    }
    index += 1;
  }
  return anchors;
}

function phoneWordGroups(phones) {
  const groups = [[]];
  phones.forEach((phone, phoneIndex) => {
    if (phone === WORD_BOUNDARY) groups.push([]);
    else groups.at(-1).push({ phone, phoneIndex });
  });
  return groups;
}

function anchorCapacity(anchor) {
  const withoutRhoticR = anchor.grapheme.endsWith("r")
    ? anchor.grapheme.slice(0, -1)
    : anchor.grapheme;
  return Math.max(1, withoutRhoticR.length);
}

function splitAnchor(anchor, partCount) {
  if (partCount <= 1) {
    return [{
      ...anchor,
      originalGrapheme: anchor.grapheme,
      partIndex: 0,
      partCount: 1,
      splitFromCluster: false,
    }];
  }
  const hasRhoticR = anchor.grapheme.endsWith("r");
  const vowelText = hasRhoticR ? anchor.grapheme.slice(0, -1) : anchor.grapheme;
  const parts = [];
  let cursor = anchor.start;
  for (let partIndex = 0; partIndex < partCount; partIndex++) {
    const remainingParts = partCount - partIndex;
    const remainingLetters = vowelText.length - (cursor - anchor.start);
    const take = remainingParts === 1 ? remainingLetters : 1;
    const start = cursor;
    cursor += take;
    const isLast = partIndex === partCount - 1;
    const end = cursor + (isLast && hasRhoticR ? 1 : 0);
    parts.push({
      ...anchor,
      start,
      end,
      grapheme: anchor.word.slice(start, end),
      originalGrapheme: anchor.grapheme,
      partIndex,
      partCount,
      splitFromCluster: true,
    });
  }
  return parts;
}

function silentAnchorCost(anchor) {
  if (anchor.grapheme === "e" && anchor.end === anchor.word.length) return 0.01;
  if (anchor.grapheme === "u" && anchor.word[anchor.start - 1] === "q") return 0.08;
  return anchor.grapheme.length > 1 ? 1.10 : 0.90;
}

function anchorPhoneAlignmentCost(anchor, phone) {
  const display = phonesToDisplay([phone]);
  const grapheme = anchor.grapheme;
  if (grapheme === "e" && anchor.end === anchor.word.length) return 1.40;
  const compatible = {
    a: LOCAL_A_DISPLAYS,
    ar: new Set([...LOCAL_A_DISPLAYS, "er"]),
    e: new Set(["e", "i", "er"]),
    i: LOCAL_I_DISPLAYS,
    y: LOCAL_I_DISPLAYS,
    o: new Set(["o", "a", "u"]),
    u: new Set([...LOCAL_U_DISPLAYS, "er"]),
    ur: new Set([...LOCAL_U_DISPLAYS, "er"]),
  }[grapheme];
  if (compatible?.has(display)) return 0;
  // Multi-letter spellings are intentionally left broad: eSpeak has already
  // resolved their English context and this score only chooses a monotonic
  // anchor, not a new pronunciation.
  return grapheme.length > 1 ? 0.16 : 0.42;
}

function anchorsForVowelPhones(word, wordIndex, vowelPhones) {
  const anchors = writtenVowelAnchors(word, wordIndex);
  const memo = new Map();

  function solve(anchorIndex, phoneIndex) {
    const key = `${anchorIndex}:${phoneIndex}`;
    if (memo.has(key)) return memo.get(key);
    if (anchorIndex === anchors.length) {
      const terminal = phoneIndex === vowelPhones.length
        ? { cost: 0, anchors: [] }
        : null;
      memo.set(key, terminal);
      return terminal;
    }

    const anchor = anchors[anchorIndex];
    const remainingPhones = vowelPhones.length - phoneIndex;
    const maxParts = Math.min(anchorCapacity(anchor), remainingPhones);
    let best = null;
    for (let partCount = 0; partCount <= maxParts; partCount++) {
      const tail = solve(anchorIndex + 1, phoneIndex + partCount);
      if (!tail) continue;
      const parts = partCount ? splitAnchor(anchor, partCount) : [];
      const localCost = partCount
        ? parts.reduce((total, part, partIndex) => total
          + anchorPhoneAlignmentCost(part, vowelPhones[phoneIndex + partIndex].phone), 0)
          + Math.max(0, partCount - 1) * 0.12
        : silentAnchorCost(anchor);
      const candidate = {
        cost: localCost + tail.cost,
        anchors: [...parts, ...tail.anchors],
      };
      if (
        !best
        || candidate.cost < best.cost - 1e-9
        || (
          Math.abs(candidate.cost - best.cost) < 1e-9
          && candidate.anchors.length > best.anchors.length
        )
      ) best = candidate;
    }
    memo.set(key, best);
    return best;
  }

  return solve(0, 0)?.anchors || null;
}

function alignedVowelAnchors(words, phones) {
  const groups = phoneWordGroups(phones);
  const aligned = new Map();
  if (groups.length !== words.length) return { aligned, complete: false };
  let complete = true;
  groups.forEach((group, wordIndex) => {
    const vowelPhones = group.filter(item => VOWELS.has(item.phone));
    const anchors = anchorsForVowelPhones(
      words[wordIndex],
      wordIndex,
      vowelPhones,
    );
    if (!anchors) {
      complete = false;
      return;
    }
    vowelPhones.forEach((item, vowelIndex) => {
      aligned.set(item.phoneIndex, anchors[vowelIndex]);
    });
  });
  return { aligned, complete };
}

function contextualVowelDecision(phone, anchor) {
  if (!anchor) return null;
  const sourceDisplay = phonesToDisplay([phone]);
  let replacement = null;
  let cost = 0;
  let rule = "";

  if (anchor.grapheme === "a") {
    const afterA = anchor.word.slice(anchor.start + 1);
    replacement = ["a"];
    if (afterA.startsWith("ll")) replacement = ["o"];
    else if (
      /^[^aeiouy][aeiou]/.test(afterA)
      || /^[^aeiouy]+e$/.test(afterA)
    ) replacement = ["eɪ"];
    if (sourceDisplay === phonesToDisplay(replacement)) return null;
    cost = 0.34;
    rule = "CEB_A_CONTEXT";
  } else if (anchor.grapheme === "ar") {
    if (LOCAL_A_DISPLAYS.has(sourceDisplay)) return null;
    replacement = ["a"];
    if (["ɚ", "ɝ"].includes(phone)) {
      replacement = ["a", "r"];
    }
    cost = 0.34;
    rule = "CEB_A_CONTEXT";
  } else if (anchor.grapheme === "e" && !anchor.splitFromCluster) {
    if (sourceDisplay === "e") return null;
    replacement = ["e"];
    cost = 0.26;
    rule = "CEB_E_CONTEXT";
  } else if (anchor.grapheme === "o") {
    if (sourceDisplay === "o") return null;
    replacement = ["o"];
    cost = 0.26;
    rule = "CEB_O_CONTEXT";
  } else if (anchor.grapheme === "i") {
    if (LOCAL_I_DISPLAYS.has(sourceDisplay)) return null;
    replacement = ["i"];
    cost = 0.28;
    rule = "CEB_I_CONTEXT";
  } else if (anchor.grapheme === "ur" && anchor.start === 0) {
    if (sourceDisplay === "o") return null;
    replacement = ["ɚ", "ɝ"].includes(phone) ? ["o", "r"] : ["o"];
    cost = 0.30;
    rule = "CEB_U_CONTEXT";
  } else if (anchor.grapheme === "u") {
    if (LOCAL_U_DISPLAYS.has(sourceDisplay)) return null;
    const afterU = anchor.word.slice(anchor.end);
    replacement = /^[^aeiouy]$/.test(afterU) ? ["o"] : ["a"];
    cost = 0.30;
    rule = "CEB_U_CONTEXT";
  }
  if (!replacement) return null;
  return {
    replacement,
    cost,
    rule,
    alignment: {
      word: anchor.word,
      grapheme: anchor.grapheme,
      start: anchor.start,
      end: anchor.end,
      sourcePhone: phone,
      sourceDisplay,
      localDisplay: phonesToDisplay(replacement),
    },
  };
}

function deterministicGraphemePath(sourcePath, vowelAlignment) {
  const phones = [];
  const alignmentRule = vowelAlignment.complete
    ? "CEB_CONTEXT_ALIGNED"
    : "CEB_CONTEXT_PARTIAL";
  const rules = ["EN_ESPEAK_NG", alignmentRule];
  const changes = [];
  let addedCost = 0;

  sourcePath.phonemes.forEach((phone, phoneIndex) => {
    if (phone === WORD_BOUNDARY) {
      phones.push(phone);
      return;
    }
    const anchor = vowelAlignment.aligned.get(phoneIndex);
    const decision = contextualVowelDecision(phone, anchor);
    let replacement = decision?.replacement || [phone];
    let changeCost = decision?.cost || 0;
    const changeRules = decision ? [decision.rule] : [];

    const previousPhone = sourcePath.phonemes[phoneIndex - 1];
    if (
      anchor?.splitFromCluster
      && anchor.partIndex > 0
      && anchor.grapheme === "a"
      && VOWELS.has(previousPhone)
      && ["i", "e"].includes(phonesToDisplay([previousPhone]))
    ) {
      replacement = ["j", ...replacement];
      changeCost += 0.18;
      changeRules.push("CEB_VOWEL_HIATUS_Y");
    }

    phones.push(...replacement);
    if (changeRules.length) {
      addedCost += changeCost;
      rules.push(...changeRules);
      changes.push({
        ...(decision?.alignment || {
          word: anchor.word,
          grapheme: anchor.grapheme,
          start: anchor.start,
          end: anchor.end,
          sourcePhone: phone,
          sourceDisplay: phonesToDisplay([phone]),
        }),
        localDisplay: phonesToDisplay(replacement),
        rules: changeRules,
      });
    }
  });

  if (!changes.length) addedCost = 0.12;
  const alignedAnchors = [...vowelAlignment.aligned.entries()].map(
    ([phoneIndex, anchor]) => ({
      phoneIndex,
      phone: sourcePath.phonemes[phoneIndex],
      grapheme: anchor.grapheme,
      word: anchor.word,
      start: anchor.start,
      end: anchor.end,
    }),
  );
  const localPhones = phones.filter(
    (phone, index) => !(phone === "r" && phones[index - 1] === "r"),
  );
  const primary = changes[0] || alignedAnchors[0] || null;
  return makePath({
    phones: localPhones,
    stress: sourcePath.stress,
    route: "cebuano_grapheme_adaptation",
    label: vowelAlignment.complete
      ? "eSpeak NG English + deterministic letter-aligned Cebuano-aware reading"
      : "eSpeak NG English + conservative partially aligned Cebuano-aware reading",
    evidence: vowelAlignment.complete ? "E1/E3" : "E3",
    source: `${sourcePath.source}; monotonic vowel anchors; one deterministic local reading; ${vowelAlignment.complete ? "complete" : "partial"} alignment`,
    cost: sourcePath.cost + addedCost,
    rules: [...new Set(rules)],
    alignment: {
      ...(primary || {}),
      complete: vowelAlignment.complete,
      anchors: alignedAnchors,
      changes,
    },
  });
}

function adaptedPaths(sourcePath, words) {
  const vowelAlignment = alignedVowelAnchors(words, sourcePath.phonemes);
  const alignedPath = deterministicGraphemePath(sourcePath, vowelAlignment);
  const candidates = [];
  sourcePath.phonemes.forEach((phone, phoneIndex) => {
    if (phone === WORD_BOUNDARY) return;
    const options = (CONSONANT_ALTERNATIVES.get(phone) || []).map(
      ([replacement, cost, rule]) => ({
        replacement,
        cost,
        rule,
        route: "cebuano_phone_adaptation",
        alignment: null,
      }),
    );

    for (const option of options) {
      const phones = [
        ...sourcePath.phonemes.slice(0, phoneIndex),
        ...option.replacement,
        ...sourcePath.phonemes.slice(phoneIndex + 1),
      ];
      if (phonesToDisplay(phones) === sourcePath.display) continue;
      candidates.push(makePath({
        phones,
        stress: sourcePath.stress,
        route: option.route,
        label: "eSpeak NG English + bounded Cebuano-aware phone adaptation",
        evidence: "E1/E3",
        source: `${sourcePath.source}; one bounded local consonant change`,
        cost: sourcePath.cost + option.cost,
        rules: ["EN_ESPEAK_NG", option.rule],
        alignment: option.alignment,
      }));
    }
  });

  const deduped = new Map();
  for (const path of candidates.sort((left, right) =>
    left.cost - right.cost || left.display.localeCompare(right.display))) {
    const key = `${path.route}:${path.display}`;
    if (!deduped.has(key)) deduped.set(key, path);
  }
  const consonantPaths = [...deduped.values()].slice(0, MAX_ADAPTED_PATHS - 1);
  // The deterministic query-specific route is the primary local result.  It
  // must not be displaced merely because a name contains several consonants
  // that each license a cheaper one-change candidate.
  return [alignedPath, ...consonantPaths];
}

const profileCache = new Map();

export function englishG2PProfile(value) {
  const words = normalizedWords(value);
  const key = words.join(" ");
  if (profileCache.has(key)) return profileCache.get(key);
  const result = (async () => {
    if (!words.length || words.length > 3 || words.join("").length > 36) {
      return {
        input: String(value || ""),
        normalized: key,
        available: false,
        error: "Input is outside the bounded medicine-name shape.",
        paths: [],
      };
    }
    try {
      const outputs = await phonemize(key, "en-us");
      const rawIpa = outputs.join(" ").trim();
      const { phones, stress } = parseEspeakIPA(rawIpa);
      if (!phones.length) throw new Error("The engine returned no IPA phones.");
      const sourcePath = makePath({
        phones,
        stress,
        route: "english_espeak_ng",
        label: "eSpeak NG contextual English pronunciation",
        evidence: "E1",
        source: "eSpeak NG en-us dictionary/context-rule G2P (browser bundle)",
        cost: SOURCE_COST,
        rules: ["EN_ESPEAK_NG"],
      });
      return {
        input: String(value || ""),
        normalized: key,
        available: true,
        error: null,
        rawIpa,
        paths: [sourcePath, ...adaptedPaths(sourcePath, words)],
      };
    } catch (error) {
      return {
        input: String(value || ""),
        normalized: key,
        available: false,
        error: error instanceof Error ? error.message : String(error),
        paths: [],
      };
    }
  })();
  profileCache.set(key, result);
  return result;
}
