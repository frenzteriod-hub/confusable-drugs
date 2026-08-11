import { normalizeName } from "./name-normalization.js";

const FILLERS = new Set(["a", "i", "u", "h", "ʔ"]);
const PAIR_COSTS = new Map([
  ["f|p", 0.18], ["b|v", 0.18], ["s|z", 0.20], ["s|ʃ", 0.22],
  ["t|θ", 0.22], ["dʒ|g", 0.25], ["dʒ|j", 0.18], ["g|k", 0.40],
  ["d|ɾ", 0.38], ["r|ɾ", 0.05], ["e|i", 0.28], ["o|u", 0.28],
  ["a|e", 0.48], ["a|o", 0.52],
]);
const pairKey = (a, b) => [a, b].sort().join("|");

export function jaroWinkler(first, second) {
  if (first === second) return 1;
  if (!first || !second) return 0;
  const range = Math.max(Math.floor(Math.max(first.length, second.length) / 2) - 1, 0);
  const firstMatches = Array(first.length).fill(false);
  const secondMatches = Array(second.length).fill(false);
  let matches = 0;
  for (let left = 0; left < first.length; left++) {
    for (let right = Math.max(0, left - range); right < Math.min(left + range + 1, second.length); right++) {
      if (secondMatches[right] || first[left] !== second[right]) continue;
      firstMatches[left] = true; secondMatches[right] = true; matches++; break;
    }
  }
  if (!matches) return 0;
  const firstMatched = [...first].filter((_, index) => firstMatches[index]);
  const secondMatched = [...second].filter((_, index) => secondMatches[index]);
  const transpositions = firstMatched.filter((c, index) => c !== secondMatched[index]).length / 2;
  const jaro = (matches / first.length + matches / second.length + (matches - transpositions) / matches) / 3;
  let prefix = 0;
  while (prefix < Math.min(4, first.length, second.length) && first[prefix] === second[prefix]) prefix++;
  return jaro + prefix * 0.1 * (1 - jaro);
}

export function levenshteinSimilarity(first, second) {
  if (first === second) return 1;
  if (!first || !second) return 0;
  let previous = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (let left = 1; left <= first.length; left++) {
    const current = [left];
    for (let right = 1; right <= second.length; right++) {
      current.push(Math.min(previous[right] + 1, current[right - 1] + 1,
        previous[right - 1] + (first[left - 1] === second[right - 1] ? 0 : 1)));
    }
    previous = current;
  }
  return Math.max(0, 1 - previous.at(-1) / Math.max(first.length, second.length));
}

export function weightedPhonemeSimilarity(first, second) {
  if (!first.length || !second.length) return 0;
  let previous = [0];
  for (const phoneme of second) previous.push(previous.at(-1) + (FILLERS.has(phoneme) ? 0.38 : 0.78));
  for (const left of first) {
    const insertion = FILLERS.has(left) ? 0.38 : 0.78;
    const current = [previous[0] + insertion];
    for (let index = 1; index <= second.length; index++) {
      const right = second[index - 1];
      const deletion = FILLERS.has(right) ? 0.38 : 0.78;
      const substitution = left === right ? 0 : (PAIR_COSTS.get(pairKey(left, right)) ?? 1);
      current.push(Math.min(previous[index] + insertion, current[index - 1] + deletion,
        previous[index - 1] + substitution));
    }
    previous = current;
  }
  return Math.max(0, 1 - previous.at(-1) / Math.max(first.length, second.length));
}

export function syllableSimilarity(first, second) {
  if (!first.length || !second.length) return 0;
  let previous = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (let left = 1; left <= first.length; left++) {
    const current = [left];
    for (let right = 1; right <= second.length; right++) {
      const similarity = weightedPhonemeSimilarity([...first[left - 1]], [...second[right - 1]]);
      current.push(Math.min(previous[right] + 1, current[right - 1] + 1,
        previous[right - 1] + (1 - similarity)));
    }
    previous = current;
  }
  return Math.max(0, 1 - previous.at(-1) / Math.max(first.length, second.length));
}

export function stressSimilarity(first, second) {
  if (first.syllables.length <= 1 || second.syllables.length <= 1) return null;
  const a = first.stressIndex / (first.syllables.length - 1);
  const b = second.stressIndex / (second.syllables.length - 1);
  return Math.max(0, 1 - Math.abs(a - b));
}

export function bigramDice(first, second) {
  const grams = value => Array.from({ length: Math.max(0, value.length - 1) }, (_, i) => value.slice(i, i + 2));
  const left = grams(normalizeName(first));
  const right = grams(normalizeName(second));
  if (!left.length && !right.length) return 1;
  if (!left.length || !right.length) return 0;
  const remaining = [...right];
  let overlap = 0;
  for (const gram of left) {
    const index = remaining.indexOf(gram);
    if (index >= 0) { overlap++; remaining.splice(index, 1); }
  }
  return 2 * overlap / (left.length + right.length);
}

export function prefixSimilarity(first, second) {
  const left = normalizeName(first); const right = normalizeName(second);
  if (!left && !right) return 1;
  const longer = Math.max(left.length, right.length);
  if (!longer) return 1;
  let shared = 0;
  while (shared < Math.min(left.length, right.length) && left[shared] === right[shared]) shared++;
  return shared / longer;
}

export function biSim(first, second) {
  const left = normalizeName(first); const right = normalizeName(second);
  if (!left && !right) return 1;
  if (!left || !right) return 0;
  const grams = value => {
    const symbols = [`^${value[0]}`, ...value];
    return Array.from({ length: value.length }, (_, index) => [symbols[index], symbols[index + 1]]);
  };
  const leftBigrams = grams(left); const rightBigrams = grams(right);
  let previous = Array(rightBigrams.length + 1).fill(0);
  for (const leftBigram of leftBigrams) {
    const current = [0];
    for (let index = 1; index <= rightBigrams.length; index++) {
      const rightBigram = rightBigrams[index - 1];
      const positionalSimilarity = ((leftBigram[0] === rightBigram[0])
        + (leftBigram[1] === rightBigram[1])) / 2;
      current.push(Math.max(previous[index], current[index - 1],
        previous[index - 1] + positionalSimilarity));
    }
    previous = current;
  }
  return previous.at(-1) / Math.max(left.length, right.length);
}

const CEBUANO_GROUPS = [
  "a", "ei", "ou", "fp", "vb", "ckq", "sz",
  "d", "t", "g", "j", "l", "r", "m", "n", "h", "w", "x", "y",
];
const editexGroupCost = (a, b) => {
  if (a === b) return 0;
  return CEBUANO_GROUPS.some(group => group.includes(a) && group.includes(b)) ? 1 : 2;
};
const editexIndelCost = (current, previous) => (
  current !== previous && ["h", "w"].includes(current) ? 1 : editexGroupCost(current, previous)
);

export function editexSimilarity(first, second) {
  const left = normalizeName(first); const right = normalizeName(second);
  if (left === right) return left ? 1 : 0;
  if (!left || !right) return 0;
  let previous = [0];
  for (let index = 0; index < right.length; index++) {
    previous.push(previous.at(-1) + editexIndelCost(right[index], index ? right[index - 1] : "\0"));
  }
  for (let a = 1; a <= left.length; a++) {
    const priorLeft = a > 1 ? left[a - 2] : "\0";
    const current = [previous[0] + editexIndelCost(left[a - 1], priorLeft)];
    for (let b = 1; b <= right.length; b++) {
      const priorRight = b > 1 ? right[b - 2] : "\0";
      current.push(Math.min(
        previous[b] + editexIndelCost(left[a - 1], priorLeft),
        current[b - 1] + editexIndelCost(right[b - 1], priorRight),
        previous[b - 1] + editexGroupCost(left[a - 1], right[b - 1]),
      ));
    }
    previous = current;
  }
  return Math.max(0, 1 - previous.at(-1) / (2 * Math.max(left.length, right.length)));
}

export function headTailScore(first, second) {
  const left = normalizeName(first); const right = normalizeName(second);
  if (left.length < 2 || right.length < 2) return left && left === right ? 1 : 0;
  return ((left[0] === right[0]) + (left[1] === right[1])
    + (left.at(-1) === right.at(-1)) + (left.at(-2) === right.at(-2))) / 4;
}

export function trigrams(value) {
  const normalized = normalizeName(value);
  if (normalized.length < 3) return normalized ? [normalized] : [];
  return [...new Set(Array.from({ length: normalized.length - 2 }, (_, i) => normalized.slice(i, i + 3)))];
}
