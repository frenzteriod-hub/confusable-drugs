// The build substitutes a directory version derived from the registry contents.
// Serving viewer/ directly continues to use the original local directory.
export const indexDirectory = null;

export function normalizeProductName(value) {
  return String(value || "").toLocaleLowerCase("en").normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "");
}

export function productBucket(key) {
  let hash = 0;
  for (const letter of key) hash = (hash * 31 + letter.charCodeAt(0)) >>> 0;
  return (hash % 128).toString(16);
}
