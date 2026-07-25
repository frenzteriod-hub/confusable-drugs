import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "viewer", "vendor");

await mkdir(output, { recursive: true });
await Promise.all([
  copyFile(
    resolve(root, "node_modules", "phonemizer", "dist", "phonemizer.js"),
    resolve(output, "phonemizer.js"),
  ),
  copyFile(
    resolve(root, "node_modules", "phonemizer", "LICENSE"),
    resolve(output, "phonemizer.LICENSE.txt"),
  ),
]);

console.log("Vendored Phonemizer.js and its license into viewer/vendor.");
