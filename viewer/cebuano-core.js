import { englishG2PProfile } from "./english-g2p.js?v=20260713-g2p-5";

// Registered-name profiles and review-pair scores are exported from Python.
// Free text uses the bundled eSpeak NG context-rule engine and keeps its
// direct-spelling recovery route separately costed.
// `overallExperimental` additionally blends the preview Editex score.
export const USE_EXPERIMENTAL_OVERALL = false;

export const DERIVED_PATH_WEIGHT = 0.9;
export const PREVIEW_PATH_COST_PENALTY = 0.075;

export function decodeColumnarPath(row, dictionaries) {
  const value = (name, reference) => dictionaries?.[name]?.[reference] || "";
  return {
    display: row[0],
    ipa: row[1],
    syllables: row[2],
    stress: row[3],
    label: value("labels", row[4]),
    route: value("routes", row[5]),
    evidence: value("evidence", row[6]),
    source: value("sources", row[7]),
    cost: row[8],
    confidence: row[9],
    coverage: row[10],
    rules: (row[11] || []).map(reference => value("rules", reference)).filter(Boolean),
    availability: value("availability", row[12]),
    error: row[13],
  };
}

export function decodedPathDetailEntries(data) {
  if (data.format !== "dictionary_columnar_v1") return data.names || [];
  return (data.names || []).map(([id, profileStatus, totalPathCount, truncated, paths]) => [
    id,
    {
      profile_status: profileStatus,
      total_path_count: totalPathCount,
      truncated,
      paths: (paths || []).map(path => decodeColumnarPath(path, data.dictionaries)),
    },
  ]);
}

export function normalizeName(value) {
  return String(value || "").toLocaleLowerCase().replace(/[^a-z0-9]+/g, "");
}

function normalizedWords(value) {
  return (String(value || "").toLocaleLowerCase().match(/[a-z0-9]+/g) || [])
    .map(normalizeName)
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function combineWordChoices(choiceGroups, limit = 180) {
  const combinations = [""];
  for (const choices of choiceGroups) {
    const next = [];
    for (const prefix of combinations) {
      for (const choice of choices) {
        next.push(`${prefix}${choice}`);
        if (next.length >= limit) break;
      }
      if (next.length >= limit) break;
    }
    combinations.splice(0, combinations.length, ...next);
  }
  return unique(combinations);
}

function englishLikeNormalized(value) {
  return value
    .replaceAll("ph", "f")
    .replaceAll("qu", "kw")
    .replaceAll("x", "ks")
    .replaceAll("ce", "se").replaceAll("ci", "si").replaceAll("cy", "sy")
    .replaceAll("ge", "je").replaceAll("gi", "ji").replaceAll("gy", "jy");
}

function nativizeNormalized(value) {
  let transformed = value;
  for (const [source, target] of [
    ["tion", "syon"], ["sion", "syon"], ["ture", "tyur"], ["sch", "sk"],
    ["ph", "p"], ["th", "t"], ["sh", "s"], ["ch", "ts"],
    ["qu", "kw"], ["x", "ks"], ["f", "p"], ["v", "b"],
    ["z", "s"], ["j", "dy"],
  ]) transformed = transformed.replaceAll(source, target);
  return transformed
    .replaceAll("ce", "se").replaceAll("ci", "si").replaceAll("cy", "sy")
    .replaceAll("c", "k").replaceAll("q", "k")
    .replaceAll("ge", "dye").replaceAll("gi", "dyi").replaceAll("gy", "dyy");
}

function directCebuanoReading(value) {
  return normalizedWords(value)
    .map(word => nativizeNormalized(word).replace(/y$/, "i"))
    .join(" ");
}

function fallbackTokenPaths(token) {
  return unique([
    englishLikeNormalized(token),
    nativizeNormalized(token).replace(/y$/, "i"),
  ]);
}

// Synchronous callers receive only conservative fallback paths.  UI flows
// that can await the bundled engine use browserPronunciationProfile below.
export function pronunciationPaths(value) {
  const words = normalizedWords(value);
  if (words.length > 1) {
    return combineWordChoices(words.map(fallbackTokenPaths), 80);
  }
  return fallbackTokenPaths(normalizeName(value));
}

function makeBrowserFallbackPath({ display, route, label, evidence, source, cost, rules }) {
  return {
    display,
    ipa: "",
    phonemes: [],
    stress: null,
    label,
    route,
    evidence,
    source,
    cost,
    confidence: Number(Math.exp(-cost).toFixed(6)),
    coverage: 1,
    rules,
    availability: "available",
    error: null,
  };
}

export async function browserPronunciationProfile(value) {
  const engineProfile = await englishG2PProfile(value);
  const paths = [...engineProfile.paths];
  const direct = directCebuanoReading(value);
  if (direct) {
    paths.push(makeBrowserFallbackPath({
      display: direct,
      route: "cebuano_direct_spelling",
      label: "Cebuano-compatible direct-spelling recovery path",
      evidence: "E2/E3",
      source: "Browser direct-spelling rules; requires Cebuano speaker validation",
      cost: 0.62,
      rules: ["CEB_DIRECT_SPELLING"],
    }));
  }
  if (!engineProfile.available) {
    const fallback = englishLikeNormalized(normalizeName(value));
    if (fallback) {
      paths.push(makeBrowserFallbackPath({
        display: fallback,
        route: "english_spelling_fallback",
        label: "English spelling fallback (G2P unavailable)",
        evidence: "E3",
        source: "Limited browser spelling fallback; not a source pronunciation",
        cost: 0.95,
        rules: ["EN_HEURISTIC"],
      }));
    }
  }
  const deduped = new Map();
  for (const path of paths) {
    const key = `${path.route}:${path.display}`;
    if (!deduped.has(key) || path.cost < deduped.get(key).cost) deduped.set(key, path);
  }
  return {
    sourceName: String(value || ""),
    normalized: engineProfile.normalized,
    engineAvailable: engineProfile.available,
    engineError: engineProfile.error,
    rawIpa: engineProfile.rawIpa || "",
    paths: [...deduped.values()].sort((left, right) =>
      left.cost - right.cost || left.route.localeCompare(right.route)),
  };
}

export async function pronunciationPathsWithG2P(value) {
  return (await browserPronunciationProfile(value)).paths;
}
export function jaroWinkler(first, second) {
  if (first === second) return 1;
  if (!first || !second) return 0;
  const range = Math.max(Math.floor(Math.max(first.length, second.length) / 2) - 1, 0);
  const firstMatches = Array(first.length).fill(false);
  const secondMatches = Array(second.length).fill(false);
  let matches = 0;
  for (let left = 0; left < first.length; left++) {
    const start = Math.max(0, left - range);
    const end = Math.min(left + range + 1, second.length);
    for (let right = start; right < end; right++) {
      if (secondMatches[right] || first[left] !== second[right]) continue;
      firstMatches[left] = true;
      secondMatches[right] = true;
      matches++;
      break;
    }
  }
  if (!matches) return 0;
  const firstMatched = [...first].filter((_, index) => firstMatches[index]);
  const secondMatched = [...second].filter((_, index) => secondMatches[index]);
  const transpositions = firstMatched
    .filter((character, index) => character !== secondMatched[index]).length / 2;
  const jaro = (
    matches / first.length
    + matches / second.length
    + (matches - transpositions) / matches
  ) / 3;
  let prefix = 0;
  while (
    prefix < Math.min(4, first.length, second.length)
    && first[prefix] === second[prefix]
  ) prefix++;
  return jaro + prefix * 0.1 * (1 - jaro);
}

export function levenshteinSimilarity(first, second) {
  if (first === second) return 1;
  if (!first || !second) return 0;
  let previous = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (let left = 1; left <= first.length; left++) {
    const current = [left];
    for (let right = 1; right <= second.length; right++) {
      current.push(Math.min(
        previous[right] + 1,
        current[right - 1] + 1,
        previous[right - 1] + (first[left - 1] === second[right - 1] ? 0 : 1),
      ));
    }
    previous = current;
  }
  return Math.max(0, 1 - previous[second.length] / Math.max(first.length, second.length));
}

export function syllabify(value) {
  const word = normalizeName(value);
  if (!word) return [];
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const nuclei = [...word]
    .map((character, index) => vowels.has(character) ? index : -1)
    .filter(index => index >= 0);
  if (!nuclei.length) return [word];
  const boundaries = [0];
  for (let index = 0; index < nuclei.length - 1; index++) {
    const left = nuclei[index];
    const right = nuclei[index + 1];
    const consonants = right - left - 1;
    const boundary = consonants <= 0 ? right : consonants === 1 ? left + 1 : right - 1;
    if (boundary > boundaries[boundaries.length - 1]) boundaries.push(boundary);
  }
  boundaries.push(word.length);
  return boundaries.slice(0, -1)
    .map((start, index) => word.slice(start, boundaries[index + 1]))
    .filter(Boolean);
}

export function syllableSimilarity(first, second) {
  const left = syllabify(first);
  const right = syllabify(second);
  if (!left.length || !right.length) return 0;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex++) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex++) {
      current.push(Math.min(
        previous[rightIndex] + 1,
        current[rightIndex - 1] + 1,
        previous[rightIndex - 1]
          + (1 - jaroWinkler(left[leftIndex - 1], right[rightIndex - 1])),
      ));
    }
    previous = current;
  }
  return Math.max(0, 1 - previous[right.length] / Math.max(left.length, right.length));
}

// Cebuano-grouped Editex: a phonetic edit distance where substituting within a
// Cebuano-equivalent letter group (e/i/y, o/u/w, b/v, p/f, c/k/q, s/z, m/n) is
// cheaper than an unrelated substitution. Better suited to sound-alike than the
// spelling-oriented Jaro–Winkler because the cost reflects how the sound moves.
const CEBUANO_GROUPS = [
  "a", "eiy", "ouw", "bv", "pf", "ckq", "sz", "d", "t", "g", "j", "l", "r", "mn", "h",
];
const LETTER_GROUP = (() => {
  const map = new Map();
  CEBUANO_GROUPS.forEach((group, index) => {
    for (const letter of group) map.set(letter, index);
  });
  return map;
})();

function editexCost(left, right) {
  if (left === right) return 0;
  const leftGroup = LETTER_GROUP.get(left);
  const rightGroup = LETTER_GROUP.get(right);
  return leftGroup !== undefined && leftGroup === rightGroup ? 1 : 2;
}

export function editexSimilarity(first, second) {
  const left = normalizeName(first);
  const right = normalizeName(second);
  if (left === right) return left ? 1 : 0;
  if (!left || !right) return 0;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex++) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex++) {
      current.push(Math.min(
        previous[rightIndex] + 1,
        current[rightIndex - 1] + 1,
        previous[rightIndex - 1] + editexCost(left[leftIndex - 1], right[rightIndex - 1]),
      ));
    }
    previous = current;
  }
  return Math.max(0, 1 - previous[right.length] / (2 * Math.max(left.length, right.length)));
}

// Head/tail (htco) feature, after Japan's PMDA drug-name similarity index:
// confusion concentrates at the first two and last two letters of a name.
export function headTailScore(first, second) {
  const left = normalizeName(first);
  const right = normalizeName(second);
  if (left.length < 2 || right.length < 2) return left && left === right ? 1 : 0;
  const head = (left[0] === right[0] ? 1 : 0) + (left[1] === right[1] ? 1 : 0);
  const tail = (left[left.length - 1] === right[right.length - 1] ? 1 : 0)
    + (left[left.length - 2] === right[right.length - 2] ? 1 : 0);
  return (head + tail) / 4;
}

export function pronunciationPathText(path) {
  return typeof path === "string" ? path : String(path?.display || "");
}

function previewPathCost(name, path) {
  if (typeof path === "object" && Number.isFinite(Number(path?.cost))) {
    return Number(path.cost);
  }
  if (pronunciationPathText(path) === normalizeName(name)) return 0;
  return DERIVED_PATH_WEIGHT;
}

export function scoreNames(firstName, secondName, providedFirstPaths, providedSecondPaths) {
  const first = normalizeName(firstName);
  const second = normalizeName(secondName);
  const firstPaths = providedFirstPaths || pronunciationPaths(firstName);
  const secondPaths = providedSecondPaths || pronunciationPaths(secondName);
  const visual = jaroWinkler(first, second);
  // The preview retains the raw best score for inspection, but ranks by a
  // cost-adjusted score.  The Python batch engine uses its own detailed IPA
  // route costs; this is deliberately only a conservative browser analogue.
  let sound = 0;
  let rawSound = 0;
  let selectedFirstPath = first;
  let selectedSecondPath = second;
  let selectedCost = 0;
  for (const firstPath of firstPaths) {
    for (const secondPath of secondPaths) {
      const firstText = pronunciationPathText(firstPath);
      const secondText = pronunciationPathText(secondPath);
      const pathScore = jaroWinkler(firstText, secondText);
      rawSound = Math.max(rawSound, pathScore);
      const routeCost = previewPathCost(firstName, firstPath)
        + previewPathCost(secondName, secondPath);
      const adjusted = Math.max(0, pathScore - PREVIEW_PATH_COST_PENALTY * routeCost);
      if (adjusted > sound) {
        sound = adjusted;
        selectedFirstPath = firstText;
        selectedSecondPath = secondText;
        selectedCost = routeCost;
      }
    }
  }
  // A reading-basis signal remains visible for reviewers, alongside the cost
  // already included in the preview sound score.
  const matchedOnSpelling = selectedFirstPath === first && selectedSecondPath === second;
  const matchBasis = matchedOnSpelling ? "spelling" : "localized-reading";
  const readingConfidence = Math.exp(-selectedCost);
  const edit = levenshteinSimilarity(selectedFirstPath, selectedSecondPath);
  const syllable = syllableSimilarity(selectedFirstPath, selectedSecondPath);
  // Additional sound-alike signals, exposed for review and experimentation.
  const phonetic = editexSimilarity(selectedFirstPath, selectedSecondPath);
  const headTail = headTailScore(first, second);
  // Thesis-reported formula (unchanged).
  const overallBase = 0.30 * visual + 0.35 * sound + 0.20 * edit + 0.15 * syllable;
  // Experimental: enrich the sound term with the Cebuano Editex distance (50/50).
  const overallExperimental =
    0.30 * visual + 0.35 * (0.5 * sound + 0.5 * phonetic) + 0.20 * edit + 0.15 * syllable;
  return {
    visual,
    sound,
    rawSound,
    edit,
    syllable,
    phonetic,
    headTail,
    matchBasis,
    readingConfidence,
    overall: USE_EXPERIMENTAL_OVERALL ? overallExperimental : overallBase,
    overallExperimental,
  };
}

export function trigrams(value) {
  const normalized = normalizeName(pronunciationPathText(value));
  if (normalized.length < 3) return normalized ? [normalized] : [];
  return [...new Set(
    Array.from({ length: normalized.length - 2 }, (_, index) => normalized.slice(index, index + 3)),
  )];
}
