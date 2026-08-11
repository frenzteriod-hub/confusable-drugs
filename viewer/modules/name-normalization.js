export function normalizeName(value) {
  return String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase().replace(/[^a-z0-9]+/g, "");
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

export function casualReading(value) {
  return nativizeReading(value, true)
    .replace(/([aeiou])\1+/g, "$1")
    .replace(/h(?=[aeiou])/g, "")
    .replaceAll("y", "i");
}

