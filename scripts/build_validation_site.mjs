import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "viewer");
const output = path.join(root, "dist");

const publicFiles = [
  "favicon.svg",
  "styles.css",
  "theme-boot.js",
  "login.html",
  "login.js",
  "demo.html",
  "demo.js",
  "auth.js",
  "supabase-client.js",
  "supabase-config.js",
  "reviewer-dashboard.html",
  "reviewer-dashboard.js",
  "review.html",
  "review.js",
  "admin-dashboard.html",
  "admin-dashboard.js",
  "admin-reviewer.html",
  "admin-reviewer.js",
];

const publicModules = [
  "account-settings.js",
  "admin-score-presentation.js",
  "interim-review.js",
  "medicine-evidence.js",
  "name-normalization.js",
  "review-decision.js",
  "review-stats.js",
  "review-timing.js",
  "reviewer-settings.js",
  "similarity.js",
  "speech-search.js",
  "theme.js",
  "validation-accounts.js",
  "reviewer-search.js",
];

const evidenceDirectories = ["leaflet_records", "product_details"];

async function copy(relativeSource, relativeDestination = relativeSource) {
  const destination = path.join(output, relativeDestination);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(source, relativeSource), destination, { recursive: true });
}

async function sanitizeAdminPage(name) {
  const target = path.join(output, name);
  const html = (await readFile(target, "utf8"))
    .replace(/<a href="index\.html">Scoring workspace<\/a>/g, "")
    .replace(/\s*<a class="secondary-link" href="index\.html">Open scores and ranking →<\/a>/g, "");
  await writeFile(target, html);
}

async function restrictLoginDestination() {
  const target = path.join(output, "login.js");
  const sourceCode = await readFile(target, "utf8");
  const original = 'const safeNext = requested && /^[a-z0-9-]+\\.html$/i.test(requested) ? requested : "";';
  const replacement = 'const safeNext = requested === "admin-dashboard.html" ? requested : "";';
  if (!sourceCode.includes(original)) throw new Error("login.js safe-next guard changed; update the validation build explicitly.");
  await writeFile(target, sourceCode.replace(original, replacement));
}

async function directorySize(directory) {
  let total = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    total += entry.isDirectory() ? await directorySize(target) : (await stat(target)).size;
  }
  return total;
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of publicFiles) await copy(file);
for (const moduleName of publicModules) await copy(`modules/${moduleName}`);
await copy("data/product_directory.json");
await copy("data/reviewer_search_names.json");
for (const directory of evidenceDirectories) await copy(`data/${directory}`);

const summary = JSON.parse(await readFile(path.join(source, "data/summary.json"), "utf8"));
await mkdir(path.join(output, "data"), { recursive: true });
await writeFile(path.join(output, "data/summary.json"), `${JSON.stringify({
  generated_at: summary.generated_at,
  expert_review_pairs: summary.expert_review_pairs,
  clinical_status: summary.clinical_status,
}, null, 2)}\n`);

await sanitizeAdminPage("admin-dashboard.html");
await sanitizeAdminPage("admin-reviewer.html");
await restrictLoginDestination();

const forbiddenPublicAssets = [
  "data/candidate_index.json",
  "data/candidate_details",
  "data/cebuano_queue.json",
  "data/expert_queue.json",
  "data/name_products",
  "data/relationship_queue.json",
];
for (const relative of forbiddenPublicAssets) {
  try {
    await stat(path.join(output, relative));
    throw new Error(`Score-bearing asset leaked into validation bundle: ${relative}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const reviewerSearch = JSON.parse(await readFile(path.join(output, "data/reviewer_search_names.json"), "utf8"));
if (!Array.isArray(reviewerSearch.names) || reviewerSearch.names.some(row => row.length !== 3)) {
  throw new Error("Reviewer search index must contain only name, normalized spelling, and pronunciation paths.");
}
const forbiddenSearchKeys = /score|rank|threshold|priority|similarity/i;
if (Object.keys(reviewerSearch).some(key => forbiddenSearchKeys.test(key))) {
  throw new Error("Reviewer search index exposes algorithm scores or ranks.");
}

const bytes = await directorySize(output);
const hobbyLimit = 100 * 1024 * 1024;
if (bytes >= hobbyLimit) throw new Error(`Validation bundle is ${(bytes / 1024 / 1024).toFixed(1)} MiB; Vercel Hobby limit is 100 MiB.`);

console.log(JSON.stringify({
  status: "pass",
  output,
  size_mib: Number((bytes / 1024 / 1024).toFixed(1)),
  reviewer_score_files_exposed: [],
}, null, 2));
