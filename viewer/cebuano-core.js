export function normalizeName(value) {
  return String(value || "").toLocaleLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function nativizeReading(value, mergeVowels = false) {
  let transformed = normalizeName(value);
  for (const [source, target] of [
    ["tion", "syon"], ["sion", "syon"], ["ture", "tyur"], ["ph", "p"],
    ["th", "t"], ["sh", "s"], ["ch", "ts"], ["qu", "kw"], ["x", "ks"],
    ["f", "p"], ["v", "b"], ["z", "s"], ["j", "dy"],
  ]) transformed = transformed.replaceAll(source, target);
  transformed = transformed
    .replaceAll("ce", "se").replaceAll("ci", "si").replaceAll("cy", "sy")
    .replaceAll("c", "k").replaceAll("q", "k")
    .replaceAll("ge", "dye").replaceAll("gi", "dyi").replaceAll("gy", "dyy");
  if (mergeVowels) transformed = transformed.replaceAll("e", "i").replaceAll("o", "u");
  return transformed;
}

export function pronunciationPaths(value) {
  const original = normalizeName(value);
  const nativized = nativizeReading(value);
  const merged = nativizeReading(value, true);
  const casual = merged
    .replace(/([aeiou])\1+/g, "$1")
    .replace(/h(?=[aeiou])/g, "")
    .replaceAll("y", "i");
  const paths = [original, nativized, merged, casual];
  for (const path of [...paths]) {
    if (path.startsWith("i")) paths.push(`ay${path.slice(1)}`);
  }
  return [...new Set(paths)].filter(Boolean);
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

export function scoreNames(firstName, secondName, providedFirstPaths, providedSecondPaths) {
  const first = normalizeName(firstName);
  const second = normalizeName(secondName);
  const firstPaths = providedFirstPaths || pronunciationPaths(firstName);
  const secondPaths = providedSecondPaths || pronunciationPaths(secondName);
  const visual = jaroWinkler(first, second);
  let sound = 0;
  let selectedFirstPath = first;
  let selectedSecondPath = second;
  for (const firstPath of firstPaths) {
    for (const secondPath of secondPaths) {
      const pathScore = jaroWinkler(firstPath, secondPath);
      if (pathScore > sound) {
        sound = pathScore;
        selectedFirstPath = firstPath;
        selectedSecondPath = secondPath;
      }
    }
  }
  const edit = levenshteinSimilarity(selectedFirstPath, selectedSecondPath);
  const syllable = syllableSimilarity(selectedFirstPath, selectedSecondPath);
  return {
    visual,
    sound,
    edit,
    syllable,
    overall: 0.30 * visual + 0.35 * sound + 0.20 * edit + 0.15 * syllable,
  };
}

export function trigrams(value) {
  const normalized = normalizeName(value);
  if (normalized.length < 3) return normalized ? [normalized] : [];
  return [...new Set(
    Array.from({ length: normalized.length - 2 }, (_, index) => normalized.slice(index, index + 3)),
  )];
}
