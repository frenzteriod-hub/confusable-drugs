#!/usr/bin/env node

/**
 * Resumable collector for the Philippine FDA Verification Portal.
 *
 * The current portal blocks ordinary HTTP clients but permits an interactive
 * browser. This collector uses the user's installed Chrome, opens the public
 * portal normally, and then reads the same public search API used by the page.
 *
 * It never changes source values. Normalized values are written to a separate
 * CSV and are limited to Unicode/case/whitespace normalization.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");
const PORTAL_URL = "https://verification.fda.gov.ph/";
const SEARCH_URL = new URL("/api/search", PORTAL_URL).toString();
const SOURCE_NAME = "PH_FDA_VERIFICATION_PORTAL";
const ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const PRODUCT_FIELDS = [
  "registration_number",
  "generic_name",
  "brand_name",
  "dosage_strength",
  "dosage_form",
  "classification",
  "packaging",
  "pharmacologic_category",
  "manufacturer",
  "country_of_origin",
  "trader",
  "importer",
  "distributor",
  "app_type",
  "issuance_date",
  "expiry_date",
];

export function normalizeText(value) {
  if (value === null || value === undefined) return "";
  return String(value).normalize("NFKC").replace(/\s+/g, " ").trim();
}

export function normalizeName(value) {
  const text = normalizeText(value).toLocaleLowerCase("en");
  if (["none", "n/a", "na", "-", "unbranded"].includes(text)) return "";
  return text;
}

export function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filePath, columns, rows) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  const lines = [columns.map(csvEscape).join(",")];
  for (const row of rows) {
    lines.push(columns.map((column) => csvEscape(row[column])).join(","));
  }
  fs.writeFileSync(temporaryPath, `${lines.join("\n")}\n`, "utf8");
  fs.renameSync(temporaryPath, filePath);
}

function stableProduct(record) {
  return Object.fromEntries(PRODUCT_FIELDS.map((field) => [field, record[field] ?? null]));
}

function productSignature(record) {
  return JSON.stringify(stableProduct(record));
}

function productFingerprint(record) {
  return [
    normalizeName(record.generic_name),
    normalizeName(record.brand_name),
    normalizeName(record.dosage_strength),
    normalizeName(record.dosage_form),
  ].join("|");
}

function queryFileName(query) {
  const readable = query.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "") || "query";
  const hash = crypto.createHash("sha256").update(query).digest("hex").slice(0, 10);
  return `${readable}_${hash}.json`;
}

function atomicWriteJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  fs.renameSync(temporaryPath, filePath);
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function defaultChromePath() {
  const candidates = [
    process.env.PH_FDA_CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function defaultQueries() {
  const queries = [];
  // Human-drug registrations in the PH FDA registry include biologicals,
  // conventional drugs, household remedies, and herbal medicines. Veterinary
  // VRP registrations are intentionally excluded from this human-drug dataset.
  for (const prefix of [
    "BR-",
    "DRP-",
    "DR-",
    "DRHR-",
    "HRP-",
    "HMRP-",
    "HMR-",
    "THPR-",
  ]) {
    for (const character of ALPHANUMERIC) queries.push(`${prefix}${character}`);
  }
  return queries;
}

function parseArgs(argv) {
  const options = {
    outputDir: path.join(PROJECT_ROOT, "data", "ph_fda"),
    maxRecords: 10_000,
    expectedTotal: 32_557,
    delayMs: 1_500,
    retries: 4,
    timeoutMs: 90_000,
    shardThreshold: 2_000,
    headless: false,
    queries: null,
    chromePath: defaultChromePath(),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = () => {
      index += 1;
      if (index >= argv.length) throw new Error(`Missing value after ${argument}`);
      return argv[index];
    };
    if (argument === "--output-dir") options.outputDir = path.resolve(value());
    else if (argument === "--max-records") options.maxRecords = Number(value());
    else if (argument === "--all") options.maxRecords = Number.POSITIVE_INFINITY;
    else if (argument === "--expected-total") options.expectedTotal = Number(value());
    else if (argument === "--delay-ms") options.delayMs = Number(value());
    else if (argument === "--retries") options.retries = Number(value());
    else if (argument === "--timeout-ms") options.timeoutMs = Number(value());
    else if (argument === "--shard-threshold") options.shardThreshold = Number(value());
    else if (argument === "--queries") {
      options.queries = value().split(",").map((item) => item.trim()).filter(Boolean);
    } else if (argument === "--chrome-path") options.chromePath = value();
    else if (argument === "--headless") options.headless = true;
    else if (argument === "--help" || argument === "-h") options.help = true;
    else throw new Error(`Unknown option: ${argument}`);
  }

  for (const numeric of ["maxRecords", "expectedTotal", "delayMs", "retries", "timeoutMs", "shardThreshold"]) {
    if (Number.isNaN(options[numeric]) || options[numeric] < 0) {
      throw new Error(`Invalid numeric value for ${numeric}`);
    }
  }
  return options;
}

function printHelp() {
  console.log(`
PH FDA resumable product collector

Usage:
  npm run scrape:ph-fda
  npm run scrape:ph-fda -- --max-records 10000
  npm run scrape:ph-fda -- --all

Options:
  --output-dir PATH       Output root (default: data/ph_fda)
  --max-records NUMBER    Stop after at least this many unique registrations
  --all                   Continue until all prefix shards are exhausted
  --queries A,B,C         Collect only these registration-prefix queries
  --expected-total NUMBER Completeness benchmark (default: 32557)
  --delay-ms NUMBER       Pause after each request (default: 1500)
  --retries NUMBER        Retry count for temporary failures (default: 4)
  --timeout-ms NUMBER     Per-request timeout (default: 90000)
  --shard-threshold N     Split a large prefix into smaller queries
  --chrome-path PATH      Installed Chrome/Chromium executable
  --headless              Run without a visible browser (portal may reject this)
`);
}

function isRegistrationPrefix(query) {
  return /^(BR-|DRP-|DR-|DRHR-|HRP-|HMRP-|HMR-|THPR-)[A-Z0-9]+$/i.test(query);
}

function canShard(query) {
  return isRegistrationPrefix(query) && query.length < 14;
}

function childQueries(query) {
  return ALPHANUMERIC.map((character) => `${query}${character}`);
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") throw new Error("Search response is not a JSON object");
  if (!Array.isArray(payload.cdrr)) throw new Error("Search response has no cdrr product array");
  if (payload.cdrr_PIPIL !== undefined && !Array.isArray(payload.cdrr_PIPIL)) {
    throw new Error("Search response has an invalid cdrr_PIPIL array");
  }
}

function filterByRegistrationPrefix(records, query) {
  const prefix = query.toUpperCase();
  return records.filter((record) =>
    normalizeText(record.registration_number).toUpperCase().startsWith(prefix),
  );
}

function loadState(statePath, initialQueries, options) {
  if (fs.existsSync(statePath)) {
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    if (!Array.isArray(state.pending_queries) || typeof state.query_results !== "object") {
      throw new Error(`Invalid checkpoint: ${statePath}`);
    }
    state.target_records = Number.isFinite(options.maxRecords) ? options.maxRecords : "all";
    state.expected_total = options.expectedTotal;
    for (const initialQuery of initialQueries) {
      if (!state.pending_queries.includes(initialQuery) && !state.query_results[initialQuery]) {
        state.pending_queries.push(initialQuery);
      }
    }
    for (const failedQuery of Object.keys(state.failed_queries ?? {})) {
      if (!state.pending_queries.includes(failedQuery) && !state.query_results[failedQuery]) {
        state.pending_queries.push(failedQuery);
      }
    }
    return state;
  }
  return {
    schema_version: 1,
    source: SOURCE_NAME,
    portal_url: PORTAL_URL,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    target_records: Number.isFinite(options.maxRecords) ? options.maxRecords : "all",
    expected_total: options.expectedTotal,
    pending_queries: initialQueries,
    query_results: {},
    failed_queries: {},
  };
}

function loadCollectedData(state, rawQueryDir) {
  const products = new Map();
  const leaflets = new Map();
  const registrationConflicts = [];

  for (const result of Object.values(state.query_results)) {
    if (result.status !== "collected" || !result.file) continue;
    const filePath = path.join(rawQueryDir, result.file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Checkpoint references missing raw response: ${filePath}`);
    }
    const saved = JSON.parse(fs.readFileSync(filePath, "utf8"));
    mergeSavedQuery(saved, products, leaflets, registrationConflicts);
  }
  return { products, leaflets, registrationConflicts };
}

function mergeSavedQuery(saved, products, leaflets, registrationConflicts) {
  const retrievedAt = saved.retrieved_at;
  const sourceQuery = saved.query;

  for (const rawRecord of saved.products ?? []) {
    const registration = normalizeText(rawRecord.registration_number);
    if (!registration) continue;
    const record = {
      ...stableProduct(rawRecord),
      source: SOURCE_NAME,
      source_record_id: `${SOURCE_NAME}:${registration}`,
      source_url: PORTAL_URL,
      retrieved_at: retrievedAt,
      source_query: sourceQuery,
    };
    const existing = products.get(registration);
    if (!existing) {
      products.set(registration, record);
    } else if (productSignature(existing) !== productSignature(record)) {
      registrationConflicts.push({
        registration_number: registration,
        first_record: productSignature(existing),
        conflicting_record: productSignature(record),
        source_query: sourceQuery,
      });
    }
  }

  for (const rawLeaflet of saved.leaflets ?? []) {
    const registration = normalizeText(rawLeaflet.registration_number);
    const fileLink = normalizeText(rawLeaflet.file_link);
    if (!registration || !fileLink) continue;
    const key = `${registration}|${fileLink}`;
    if (!leaflets.has(key)) {
      leaflets.set(key, {
        source: SOURCE_NAME,
        registration_number: registration,
        generic_name_raw: rawLeaflet.generic_name ?? "",
        brand_name_raw: rawLeaflet.brand_name ?? "",
        document_version: rawLeaflet.version ?? "",
        document_category: rawLeaflet.category ?? "",
        file_url: fileLink,
        source_url: PORTAL_URL,
        retrieved_at: retrievedAt,
        source_query: sourceQuery,
      });
    }
  }
}

export function buildReviewData(productRecords, registrationConflicts = []) {
  const incomplete = [];
  const fingerprintGroups = new Map();
  const brandGenerics = new Map();

  for (const record of productRecords) {
    const registration = normalizeText(record.registration_number);
    const generic = normalizeName(record.generic_name);
    const brand = normalizeName(record.brand_name);
    if (!registration || !generic) {
      incomplete.push({
        registration_number: registration,
        generic_name_raw: record.generic_name ?? "",
        brand_name_raw: record.brand_name ?? "",
        reason: !registration ? "missing_registration_number" : "missing_generic_name",
      });
    }

    const fingerprint = productFingerprint(record);
    if (!fingerprintGroups.has(fingerprint)) fingerprintGroups.set(fingerprint, []);
    fingerprintGroups.get(fingerprint).push(record);

    if (brand && generic) {
      if (!brandGenerics.has(brand)) brandGenerics.set(brand, new Map());
      brandGenerics.get(brand).set(generic, record);
    }
  }

  const possibleDuplicates = [];
  for (const [fingerprint, records] of fingerprintGroups) {
    const registrations = [...new Set(records.map((record) => normalizeText(record.registration_number)))];
    if (registrations.length < 2) continue;
    possibleDuplicates.push({
      normalized_product_key: fingerprint,
      registration_numbers: registrations.join(" | "),
      generic_name_raw: records[0].generic_name ?? "",
      brand_name_raw: records[0].brand_name ?? "",
      dosage_strength_raw: records[0].dosage_strength ?? "",
      dosage_form_raw: records[0].dosage_form ?? "",
    });
  }

  const brandGenericConflicts = [];
  for (const [brand, genericRecords] of brandGenerics) {
    if (genericRecords.size < 2) continue;
    brandGenericConflicts.push({
      brand_name_normalized: brand,
      generic_names_normalized: [...genericRecords.keys()].sort().join(" | "),
      registration_numbers: [...genericRecords.values()]
        .map((record) => normalizeText(record.registration_number))
        .sort()
        .join(" | "),
      review_reason: "same_brand_name_has_multiple_generic_names",
    });
  }

  return { incomplete, possibleDuplicates, brandGenericConflicts, registrationConflicts };
}

export function writeOutputs(outputDir, products, leaflets, registrationConflicts, state) {
  const rawDir = path.join(outputDir, "raw");
  const normalizedDir = path.join(outputDir, "normalized");
  const reviewDir = path.join(outputDir, "review");
  const reportsDir = path.join(outputDir, "reports");
  const productRecords = [...products.values()].sort((a, b) =>
    normalizeText(a.registration_number).localeCompare(normalizeText(b.registration_number)),
  );
  const leafletRecords = [...leaflets.values()].sort((a, b) =>
    `${a.registration_number}|${a.file_url}`.localeCompare(`${b.registration_number}|${b.file_url}`),
  );

  const rawColumns = [
    "source",
    "source_record_id",
    ...PRODUCT_FIELDS,
    "source_url",
    "retrieved_at",
    "source_query",
  ];
  writeCsv(path.join(rawDir, "ph_fda_products.csv"), rawColumns, productRecords);

  const normalizedRecords = productRecords.map((record) => ({
    source: record.source,
    source_record_id: record.source_record_id,
    registration_number: normalizeText(record.registration_number),
    generic_name_raw: record.generic_name ?? "",
    generic_name_normalized: normalizeName(record.generic_name),
    brand_name_raw: record.brand_name ?? "",
    brand_name_normalized: normalizeName(record.brand_name),
    dosage_strength_raw: record.dosage_strength ?? "",
    dosage_strength_normalized: normalizeName(record.dosage_strength),
    dosage_form_raw: record.dosage_form ?? "",
    dosage_form_normalized: normalizeName(record.dosage_form),
    classification_raw: record.classification ?? "",
    pharmacologic_category_raw: record.pharmacologic_category ?? "",
    manufacturer_raw: record.manufacturer ?? "",
    country_of_origin_raw: record.country_of_origin ?? "",
    issuance_date_raw: record.issuance_date ?? "",
    expiry_date_raw: record.expiry_date ?? "",
    source_url: record.source_url,
    retrieved_at: record.retrieved_at,
  }));
  writeCsv(
    path.join(normalizedDir, "ph_fda_products.csv"),
    Object.keys(normalizedRecords[0] ?? {
      source: "",
      source_record_id: "",
      registration_number: "",
      generic_name_raw: "",
      generic_name_normalized: "",
      brand_name_raw: "",
      brand_name_normalized: "",
    }),
    normalizedRecords,
  );

  writeCsv(
    path.join(rawDir, "ph_fda_leaflets.csv"),
    [
      "source",
      "registration_number",
      "generic_name_raw",
      "brand_name_raw",
      "document_version",
      "document_category",
      "file_url",
      "source_url",
      "retrieved_at",
      "source_query",
    ],
    leafletRecords,
  );

  const review = buildReviewData(productRecords, registrationConflicts);
  writeCsv(
    path.join(reviewDir, "incomplete_records.csv"),
    ["registration_number", "generic_name_raw", "brand_name_raw", "reason"],
    review.incomplete,
  );
  writeCsv(
    path.join(reviewDir, "possible_duplicates.csv"),
    [
      "normalized_product_key",
      "registration_numbers",
      "generic_name_raw",
      "brand_name_raw",
      "dosage_strength_raw",
      "dosage_form_raw",
    ],
    review.possibleDuplicates,
  );
  writeCsv(
    path.join(reviewDir, "brand_generic_conflicts.csv"),
    [
      "brand_name_normalized",
      "generic_names_normalized",
      "registration_numbers",
      "review_reason",
    ],
    review.brandGenericConflicts,
  );
  writeCsv(
    path.join(reviewDir, "registration_conflicts.csv"),
    ["registration_number", "first_record", "conflicting_record", "source_query"],
    review.registrationConflicts,
  );

  const report = {
    source: SOURCE_NAME,
    portal_url: PORTAL_URL,
    generated_at: new Date().toISOString(),
    expected_total_benchmark: state.expected_total,
    unique_product_records: productRecords.length,
    unique_leaflet_links: leafletRecords.length,
    completed_queries: Object.values(state.query_results).filter((item) => item.status === "collected").length,
    sharded_queries: Object.values(state.query_results).filter((item) => item.status === "sharded").length,
    pending_queries: state.pending_queries.length,
    failed_queries: Object.keys(state.failed_queries).length,
    incomplete_records: review.incomplete.length,
    possible_duplicate_groups: review.possibleDuplicates.length,
    registration_conflicts: review.registrationConflicts.length,
    brand_generic_conflicts: review.brandGenericConflicts.length,
    target_reached:
      state.target_records === "all"
        ? state.pending_queries.length === 0 && Object.keys(state.failed_queries).length === 0
        : productRecords.length >= Number(state.target_records),
    complete_registry_verified:
      productRecords.length === Number(state.expected_total) &&
      state.pending_queries.length === 0 &&
      Object.keys(state.failed_queries).length === 0,
  };
  atomicWriteJson(path.join(reportsDir, "collection_report.json"), report);
  return report;
}

async function fetchSearchPayload(request, query, options) {
  let lastError;
  for (let attempt = 0; attempt <= options.retries; attempt += 1) {
    try {
      const url = new URL(SEARCH_URL);
      url.searchParams.set("q", query);
      const response = await request.get(url.toString(), { timeout: options.timeoutMs });
      const status = response.status();
      if (status === 403) {
        throw new Error("Portal returned 403. Keep the visible Chrome window open and retry later.");
      }
      if (status === 429 || status >= 500) {
        throw new Error(`Temporary portal response ${status}`);
      }
      if (!response.ok()) throw new Error(`Portal response ${status}`);
      const payload = await response.json();
      validatePayload(payload);
      return payload;
    } catch (error) {
      lastError = error;
      const browserClosed = /context disposed|context or browser has been closed|target page.*closed/i.test(
        String(error.message),
      );
      if (
        browserClosed ||
        attempt >= options.retries ||
        String(error.message).includes("returned 403")
      ) {
        break;
      }
      const backoff = Math.min(60_000, 2_000 * 2 ** attempt);
      console.warn(`  Retry ${attempt + 1}/${options.retries} after ${backoff} ms: ${error.message}`);
      await sleep(backoff);
    }
  }
  throw lastError;
}

async function openPortalContext(options, stateDir) {
  const userDataDir = path.join(stateDir, "chrome_profile");
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: options.headless,
    executablePath: options.chromePath,
  });
  try {
    const page = context.pages()[0] ?? (await context.newPage());
    const portalResponse = await page.goto(PORTAL_URL, {
      waitUntil: "domcontentloaded",
      timeout: options.timeoutMs,
    });
    if (!portalResponse || portalResponse.status() !== 200) {
      throw new Error(`Portal access check failed with status ${portalResponse?.status() ?? "unknown"}`);
    }
    await page.getByPlaceholder("Type or Press mic icon to begin search").waitFor({
      state: "visible",
      timeout: options.timeoutMs,
    });
    return context;
  } catch (error) {
    await context.close().catch(() => {});
    throw error;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (!options.chromePath) {
    throw new Error("Chrome/Chromium was not found. Use --chrome-path or PH_FDA_CHROME_PATH.");
  }

  const rawQueryDir = path.join(options.outputDir, "raw", "queries");
  const stateDir = path.join(options.outputDir, "state");
  const statePath = path.join(stateDir, "checkpoint.json");
  fs.mkdirSync(rawQueryDir, { recursive: true });
  fs.mkdirSync(stateDir, { recursive: true });

  const queries = options.queries ?? defaultQueries();
  const state = loadState(statePath, queries, options);
  const { products, leaflets, registrationConflicts } = loadCollectedData(state, rawQueryDir);
  console.log(`Resuming with ${products.size} unique product records.`);

  let stopRequested = false;
  process.once("SIGINT", () => {
    stopRequested = true;
    console.log("\nStopping safely after the current request...");
  });
  process.once("SIGTERM", () => {
    stopRequested = true;
  });

  let context = await openPortalContext(options, stateDir);

  try {
    console.log("Portal access check passed. Do not close the Chrome window while collection is running.");

    while (state.pending_queries.length > 0 && !stopRequested) {
      if (products.size >= options.maxRecords) break;
      const query = state.pending_queries.shift();
      if (state.query_results[query]) continue;

      console.log(`[${products.size} records] Querying ${query}`);
      try {
        const payload = await fetchSearchPayload(context.request, query, options);
        const productsForQuery = filterByRegistrationPrefix(payload.cdrr, query);
        const leafletsForQuery = filterByRegistrationPrefix(payload.cdrr_PIPIL ?? [], query);
        const retrievedAt = new Date().toISOString();
        const fileName = queryFileName(query);
        const saved = {
          schema_version: 1,
          source: SOURCE_NAME,
          portal_url: PORTAL_URL,
          source_query_url: `${SEARCH_URL}?q=${encodeURIComponent(query)}`,
          query,
          retrieved_at: retrievedAt,
          products: productsForQuery,
          leaflets: leafletsForQuery,
          response: payload,
          response_counts: Object.fromEntries(
            Object.entries(payload)
              .filter(([, value]) => Array.isArray(value))
              .map(([key, value]) => [key, value.length]),
          ),
        };
        atomicWriteJson(path.join(rawQueryDir, fileName), saved);

        if (productsForQuery.length > options.shardThreshold && canShard(query)) {
          const children = childQueries(query).filter(
            (child) => !state.query_results[child] && !state.pending_queries.includes(child),
          );
          state.pending_queries.unshift(...children);
          state.query_results[query] = {
            status: "sharded",
            file: fileName,
            matching_products: productsForQuery.length,
            child_queries: children.length,
            retrieved_at: retrievedAt,
          };
          console.log(`  ${productsForQuery.length} matches; split into ${children.length} smaller queries.`);
        } else {
          mergeSavedQuery(saved, products, leaflets, registrationConflicts);
          state.query_results[query] = {
            status: "collected",
            file: fileName,
            matching_products: productsForQuery.length,
            matching_leaflets: leafletsForQuery.length,
            retrieved_at: retrievedAt,
          };
          delete state.failed_queries[query];
          console.log(`  Added ${productsForQuery.length} product rows and ${leafletsForQuery.length} leaflet links.`);
        }
      } catch (error) {
        const browserClosed =
          /context disposed|context or browser has been closed|target page.*closed/i.test(
            String(error.message),
          );
        if (browserClosed) {
          state.pending_queries.unshift(query);
          state.updated_at = new Date().toISOString();
          atomicWriteJson(statePath, state);
          console.warn("  Browser closed unexpectedly; reopening it and retrying the same query.");
          await context.close().catch(() => {});
          await sleep(2_000);
          context = await openPortalContext(options, stateDir);
          console.log("  Portal access restored.");
          continue;
        }
        if (canShard(query) && /timeout|timed out|Temporary portal response/i.test(String(error.message))) {
          const children = childQueries(query).filter(
            (child) => !state.query_results[child] && !state.pending_queries.includes(child),
          );
          state.pending_queries.unshift(...children);
          state.query_results[query] = {
            status: "sharded",
            reason: `parent_query_failed: ${error.message}`,
            child_queries: children.length,
            retrieved_at: new Date().toISOString(),
          };
          console.warn(`  Query failed; split into ${children.length} smaller queries.`);
        } else {
          state.failed_queries[query] = {
            error: error.message,
            failed_at: new Date().toISOString(),
          };
          console.error(`  Failed: ${error.message}`);
          if (/403|access check/i.test(String(error.message))) stopRequested = true;
        }
      }

      state.updated_at = new Date().toISOString();
      atomicWriteJson(statePath, state);
      if (!stopRequested) await sleep(options.delayMs);
    }
  } finally {
    state.updated_at = new Date().toISOString();
    atomicWriteJson(statePath, state);
    await context.close();
  }

  const report = writeOutputs(options.outputDir, products, leaflets, registrationConflicts, state);
  console.log(JSON.stringify(report, null, 2));
  if (Object.keys(state.failed_queries).length > 0) process.exitCode = 2;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`Fatal: ${error.message}`);
    process.exitCode = 1;
  });
}
