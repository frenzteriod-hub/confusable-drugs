const DIRECTORY_URL = "data/product_directory.json";
const FDA_VERIFICATION_URL = "https://verification.fda.gov.ph/";
const INITIAL_PRODUCT_LIMIT = 12;
const COMPARISON_PRODUCT_LIMIT = 4;
const SEARCH_FEEDBACK_MS = 280;

const state = {
  directoryPromise: null,
  indexes: null,
  matches: [],
  visibleCount: INITIAL_PRODUCT_LIMIT,
  comparison: null,
  productByRegistration: new Map(),
  requestId: 0,
  productDetailShards: new Map(),
  leafletShards: new Map(),
};

const elements = {
  dialog: document.querySelector("#medicine-evidence-dialog"),
  title: document.querySelector("#medicine-evidence-title"),
  subtitle: document.querySelector("#medicine-evidence-subtitle"),
  status: document.querySelector("#medicine-evidence-status"),
  content: document.querySelector("#medicine-evidence-content"),
};

const escapeHTML = value => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const display = (value, fallback = "Not published") => String(value || "").trim() || fallback;
const normalizeName = value => String(value || "").toLocaleLowerCase("en")
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "");

async function fetchJSON(url) {
  // Let the browser revalidate large registry files instead of downloading the
  // same evidence bundle again on every modal open or page refresh.
  const response = await fetch(url, { cache: "default" });
  if (!response.ok) throw new Error(`${url} could not load (${response.status})`);
  return response.json();
}

function addToIndex(index, value, product) {
  const key = normalizeName(value);
  if (!key) return;
  if (!index.has(key)) index.set(key, []);
  index.get(key).push(product);
}

async function loadDirectory() {
  if (!state.directoryPromise) {
    state.directoryPromise = fetchJSON(DIRECTORY_URL).then(products => {
      const indexes = { brand: new Map(), generic: new Map() };
      for (const product of products) {
        addToIndex(indexes.brand, product.b, product);
        addToIndex(indexes.generic, product.g, product);
      }
      state.indexes = indexes;
      return products;
    }).catch(error => {
      state.directoryPromise = null;
      throw error;
    });
  }
  return state.directoryPromise;
}

function matchProducts(name, type) {
  const index = type === "brand" ? state.indexes.brand : state.indexes.generic;
  return [...(index.get(normalizeName(name)) || [])].sort((first, second) =>
    Number(second.l || 0) - Number(first.l || 0)
    || String(first.r || "").localeCompare(String(second.r || "")));
}

async function loadProductDetail(product) {
  if (!state.productDetailShards.has(product.q)) {
    state.productDetailShards.set(product.q, fetchJSON(`data/product_details/${product.q}.json`).catch(error => {
      state.productDetailShards.delete(product.q);
      throw error;
    }));
  }
  const shard = await state.productDetailShards.get(product.q);
  return shard[product.r] || product;
}

function metadataItem(label, value) {
  return `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(display(value))}</dd></div>`;
}

function productCard(product, context = "single") {
  const leafletCount = Number(product.l || 0);
  const leafletLabel = leafletCount
    ? `${leafletCount} collected leaflet${leafletCount === 1 ? "" : "s"}`
    : "Registry record only";
  return `<article class="evidence-product-card" data-evidence-registration="${escapeHTML(product.r)}" data-evidence-context="${escapeHTML(context)}">
    <header class="evidence-product-header">
      <div><span class="registration-number">${escapeHTML(display(product.r))}</span>
        <h3>${escapeHTML(display(product.b, "No brand name published"))}</h3>
        <p>${escapeHTML(display(product.g, "No generic name published"))}</p></div>
      <span class="evidence-availability ${leafletCount ? "available" : "registry-only"}">${escapeHTML(leafletLabel)}</span>
    </header>
    <dl class="evidence-product-grid">
      ${metadataItem("Strength", product.s)}
      ${metadataItem("Dosage form", product.f)}
      ${metadataItem("Classification", product.c)}
      ${metadataItem("Manufacturer", product.m)}
      ${metadataItem("Registry expiry", product.x)}
    </dl>
    <div class="evidence-actions">
      ${leafletCount
        ? `<button type="button" data-load-evidence-leaflets="${escapeHTML(product.r)}">View ${leafletCount} leaflet${leafletCount === 1 ? "" : "s"}</button>`
        : '<span class="evidence-no-leaflet">No leaflet was collected for this exact registration.</span>'}
      <button type="button" data-copy-evidence="${escapeHTML(product.r)}">Copy registration</button>
    </div>
    <div class="evidence-leaflet-slot" aria-live="polite"></div>
  </article>`;
}

function renderMatches() {
  const shown = state.matches.slice(0, state.visibleCount);
  elements.content.innerHTML = `<div class="evidence-product-list">${shown.map(product => productCard(product, "single")).join("")}</div>
    ${shown.length < state.matches.length
      ? `<button class="secondary-action evidence-show-all" type="button" data-show-all-evidence>Show all ${state.matches.length.toLocaleString("en-PH")} registered products</button>`
      : ""}
    ${liveVerificationOption()}`;
  elements.status.textContent = `${state.matches.length.toLocaleString("en-PH")} exact registered product${state.matches.length === 1 ? "" : "s"} found.`;
}

function comparisonSide(key, label) {
  const side = state.comparison[key];
  const shown = side.matches.slice(0, side.visibleCount);
  return `<section class="evidence-comparison-side">
    <header class="evidence-comparison-heading">
      <span>${escapeHTML(label)} · ${escapeHTML(side.type === "brand" ? "Brand" : "Generic")}</span>
      <h3>${escapeHTML(side.name)}</h3>
      <p>${side.matches.length.toLocaleString("en-PH")} exact registered product${side.matches.length === 1 ? "" : "s"}</p>
    </header>
    ${shown.length
      ? `<div class="evidence-product-list">${shown.map(product => productCard(product, key)).join("")}</div>`
      : noMatchContent(side.name)}
    ${shown.length < side.matches.length
      ? `<button class="secondary-action evidence-show-all" type="button" data-show-comparison-evidence="${key}">Show all ${side.matches.length.toLocaleString("en-PH")} products for ${escapeHTML(side.name)}</button>`
      : ""}
    ${shown.length ? liveVerificationOption() : ""}
  </section>`;
}

function cprResultsTable(key, label) {
  const side = state.comparison[key];
  const shown = side.matches.slice(0, side.visibleCount);
  return `<section class="evidence-cpr-panel">
    <header class="evidence-cpr-heading">
      <div><span>${escapeHTML(label)} · Local PH FDA search</span><h3>${escapeHTML(side.name)}</h3></div>
      <strong>${side.matches.length.toLocaleString("en-PH")} Drug CPR record${side.matches.length === 1 ? "" : "s"}</strong>
    </header>
    ${shown.length ? `<div class="evidence-cpr-table-wrap"><table class="evidence-cpr-table">
      <thead><tr><th>Registration number</th><th>Generic name</th><th>Brand name</th><th>Dosage strength</th><th>Dosage form</th><th>Classification</th><th>Details</th></tr></thead>
      <tbody>${shown.map(product => `<tr>
        <td data-label="Registration number">${escapeHTML(display(product.r))}</td>
        <td data-label="Generic name">${escapeHTML(display(product.g))}</td>
        <td data-label="Brand name">${escapeHTML(display(product.b, "No brand published"))}</td>
        <td data-label="Dosage strength">${escapeHTML(display(product.s))}</td>
        <td data-label="Dosage form">${escapeHTML(display(product.f))}</td>
        <td data-label="Classification">${escapeHTML(display(product.c))}</td>
        <td data-label="Details"><button type="button" aria-expanded="false" data-toggle-cpr-details="${escapeHTML(product.r)}" data-evidence-context="${escapeHTML(key)}">View details</button></td>
      </tr>`).join("")}</tbody>
    </table></div>` : `<div class="evidence-cpr-empty">No exact Drug CPR record was found in the local snapshot.</div>`}
  </section>`;
}

function renderComparison() {
  elements.content.innerHTML = `<section class="evidence-cpr-results" aria-label="Local PH FDA search results">
    <div class="evidence-results-heading"><div><span>Automatic local search</span><h3>Drug CPR records</h3></div><p>Both names were searched together. These results are shown from the local PH FDA snapshot, so the expert does not need to wait for the live portal.</p></div>
    ${cprResultsTable("first", "Name A")}
    ${cprResultsTable("second", "Name B")}
  </section>
  <div class="evidence-detail-heading"><span>Detailed local evidence</span><h3>Product details and collected leaflets</h3></div>
  <div class="evidence-comparison-grid">
    ${comparisonSide("first", "Name A")}
    ${comparisonSide("second", "Name B")}
  </div>`;
  elements.status.textContent = `Auto-search complete — Name A: ${state.comparison.first.matches.length.toLocaleString("en-PH")} exact product${state.comparison.first.matches.length === 1 ? "" : "s"} · Name B: ${state.comparison.second.matches.length.toLocaleString("en-PH")} exact product${state.comparison.second.matches.length === 1 ? "" : "s"}. No new tab was opened.`;
}

function noMatchContent(name) {
  return `<div class="empty-panel evidence-empty">
    <strong>No exact linked registry record was found for this name</strong>
    <span>The review name is left unchanged. You can double-check the live FDA site if this local snapshot appears incomplete.</span>
    <div class="evidence-actions evidence-fallback-actions">
      <button type="button" data-copy-evidence="${escapeHTML(name)}">Copy “${escapeHTML(name)}”</button>
    </div>
    ${liveVerificationOption("No exact local match was found. Open the live portal only if you need a current manual check.")}
  </div>`;
}

function liveVerificationOption(message = "The local snapshot is usually enough for review. Open the live portal only when something looks missing, doubtful, or outdated.") {
  return `<details class="evidence-live-check">
    <summary>Need to double-check the live FDA site?</summary>
    <p>${escapeHTML(message)}</p>
    <a class="fda-record-link optional-live-link" href="${FDA_VERIFICATION_URL}" target="_blank" rel="noreferrer">Open live FDA verification ↗</a>
  </details>`;
}

function comparisonLoading(first, second) {
  return `<div class="evidence-search-loading" role="status">
    <span class="evidence-search-spinner" aria-hidden="true"></span>
    <div><strong>Searching both medicine names…</strong>
      <p>Checking the local PH FDA snapshot for <b>${escapeHTML(first.name)}</b> and <b>${escapeHTML(second.name)}</b>.</p>
      <small>No live FDA page is being opened.</small></div>
  </div>`;
}

const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

function cprDetailItem(label, value) {
  return `<div><strong>${escapeHTML(label)}:</strong><span>${escapeHTML(display(value, "—"))}</span></div>`;
}

function cprDetailPanel(product) {
  return `<div class="evidence-cpr-detail-grid">
    ${cprDetailItem("Classification", product.c)}
    ${cprDetailItem("Packaging", product.k)}
    ${cprDetailItem("Manufacturer", product.m)}
    ${cprDetailItem("Country of origin", product.o)}
    ${cprDetailItem("Trader", product.t)}
    ${cprDetailItem("Importer", product.m2)}
    ${cprDetailItem("Distributor", product.d)}
    ${cprDetailItem("Application type", product.a)}
    ${cprDetailItem("Issuance date", product.i)}
    ${cprDetailItem("Expiry date", product.x)}
    ${cprDetailItem("Pharmacologic category", product.p)}
  </div>`;
}

async function toggleCprDetails(button) {
  const sourceRow = button.closest("tr");
  const existingRow = sourceRow?.nextElementSibling;
  if (!sourceRow) return;
  if (existingRow?.classList.contains("evidence-cpr-detail-row")) {
    existingRow.remove();
    button.textContent = "View details";
    button.setAttribute("aria-expanded", "false");
    return;
  }
  const product = state.productByRegistration.get(button.dataset.toggleCprDetails);
  if (!product) return;
  const detailRow = document.createElement("tr");
  detailRow.className = "evidence-cpr-detail-row";
  detailRow.dataset.detailRegistration = product.r;
  detailRow.dataset.evidenceContext = button.dataset.evidenceContext;
  detailRow.innerHTML = '<td colspan="7" data-label="Expanded details"><div class="evidence-cpr-detail-loading"><span class="evidence-search-spinner" aria-hidden="true"></span><strong>Loading local product details…</strong></div></td>';
  sourceRow.insertAdjacentElement("afterend", detailRow);
  button.textContent = "Hide details";
  button.setAttribute("aria-expanded", "true");
  try {
    const details = await loadProductDetail(product);
    if (!detailRow.isConnected) return;
    detailRow.querySelector("td").innerHTML = cprDetailPanel(details);
  } catch (error) {
    if (!detailRow.isConnected) return;
    detailRow.querySelector("td").innerHTML = `<div class="evidence-cpr-detail-error"><strong>Details could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
  }
}

function readableMethod(value) {
  return ({ digital_text: "Digital text", digital_text_and_ocr: "Digital text + OCR", ocr: "OCR" })[value]
    || display(value, "Extraction method unavailable");
}

function reviewLabel(value) {
  return ({
    machine_extracted_review_recommended: "Machine-extracted · review recommended",
    needs_human_review: "Needs human review",
    needs_human_review_missing_section: "Needs review · one section was not found",
    needs_human_review_no_sections_found: "Needs review · sections were not found",
  })[value] || display(String(value || "").replaceAll("_", " "), "Review status unavailable");
}

function leafletPanel(leaflet, index, total) {
  const title = total > 1 ? `Leaflet ${index + 1} of ${total}` : "Medicine leaflet";
  const description = leaflet.description
    ? `<section class="leaflet-section"><h4>${escapeHTML(leaflet.description_heading || "Description")}</h4><p>${escapeHTML(leaflet.description)}</p></section>`
    : '<section class="leaflet-section missing"><h4>Description</h4><p>No description section was found automatically.</p></section>';
  const indications = leaflet.indications
    ? `<section class="leaflet-section indication"><h4>${escapeHTML(leaflet.indications_heading || "Indications")}</h4><p>${escapeHTML(leaflet.indications)}</p></section>`
    : '<section class="leaflet-section missing"><h4>Indications</h4><p>No indication section was found automatically.</p></section>';
  return `<article class="leaflet-card">
    <div class="leaflet-card-heading"><div><span class="name-type">${escapeHTML(title)}</span><h3>${escapeHTML(display(leaflet.category, "Product information"))}</h3></div>
      <span class="record-count">${escapeHTML(readableMethod(leaflet.method))}</span></div>
    <div class="leaflet-review-note"><strong>${escapeHTML(reviewLabel(leaflet.review_status))}</strong>
      <span>Text is shown from the collected PH FDA-linked document and may contain extraction errors.</span></div>
    ${description}${indications}
    ${leaflet.url ? `<a class="fda-record-link leaflet-source-link" href="${escapeHTML(leaflet.url)}" target="_blank" rel="noreferrer">Open source leaflet ↗</a>` : ""}
  </article>`;
}

async function loadLeaflets(registration, button) {
  const product = state.productByRegistration.get(registration);
  const card = button.closest(".evidence-product-card");
  const slot = card?.querySelector(".evidence-leaflet-slot");
  if (!product || !slot) return;
  button.disabled = true;
  button.textContent = "Loading leaflet…";
  slot.innerHTML = '<p class="loading-message">Loading the collected leaflet evidence…</p>';
  try {
    if (!state.leafletShards.has(product.q)) {
      state.leafletShards.set(product.q, fetchJSON(`data/leaflet_records/${product.q}.json`).catch(error => {
        state.leafletShards.delete(product.q);
        throw error;
      }));
    }
    const shard = await state.leafletShards.get(product.q);
    const leaflets = shard[product.r] || [];
    slot.innerHTML = leaflets.length
      ? `<div class="leaflet-list">${leaflets.map((leaflet, index) => leafletPanel(leaflet, index, leaflets.length)).join("")}</div>`
      : '<div class="empty-panel"><strong>No leaflet text found</strong><span>The registry indicates a leaflet, but its collected text is unavailable.</span></div>';
    button.textContent = "Leaflet shown below";
  } catch (error) {
    slot.innerHTML = `<div class="empty-panel"><strong>Leaflet could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
    button.disabled = false;
    button.textContent = "Retry leaflet";
  }
}

async function copyEvidence(value, button) {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(value);
    button.textContent = "Copied";
    elements.status.textContent = `Copied ${value}. Paste it into PH FDA verification.`;
  } catch {
    button.textContent = `Copy manually: ${value}`;
    elements.status.textContent = "Automatic copy was blocked by the browser.";
  }
  setTimeout(() => { button.textContent = original; }, 2200);
}

elements.dialog?.addEventListener("click", event => {
  const cprDetailsButton = event.target.closest("[data-toggle-cpr-details]");
  if (cprDetailsButton) {
    toggleCprDetails(cprDetailsButton);
    return;
  }
  const leafletButton = event.target.closest("[data-load-evidence-leaflets]");
  if (leafletButton) {
    loadLeaflets(leafletButton.dataset.loadEvidenceLeaflets, leafletButton);
    return;
  }
  const copyButton = event.target.closest("[data-copy-evidence]");
  if (copyButton) {
    copyEvidence(copyButton.dataset.copyEvidence, copyButton);
    return;
  }
  if (event.target.closest("[data-show-all-evidence]")) {
    state.visibleCount = state.matches.length;
    renderMatches();
    return;
  }
  const comparisonButton = event.target.closest("[data-show-comparison-evidence]");
  if (comparisonButton && state.comparison) {
    const side = state.comparison[comparisonButton.dataset.showComparisonEvidence];
    if (side) {
      side.visibleCount = side.matches.length;
      renderComparison();
    }
  }
});

export async function showMedicineEvidence(name, type) {
  if (!elements.dialog) return;
  const requestId = ++state.requestId;
  state.comparison = null;
  elements.dialog.classList.remove("comparison-mode");
  elements.title.textContent = name;
  elements.subtitle.textContent = `${type === "brand" ? "Brand" : "Generic"} name · PH FDA registry and collected leaflet evidence`;
  elements.status.textContent = "Loading exact registered products…";
  elements.content.innerHTML = '<p class="loading-message">Loading the local PH FDA product directory…</p>';
  if (!elements.dialog.open) elements.dialog.showModal();
  try {
    await loadDirectory();
    if (requestId !== state.requestId) return;
    state.matches = matchProducts(name, type);
    state.productByRegistration = new Map(state.matches.map(product => [product.r, product]));
    state.visibleCount = INITIAL_PRODUCT_LIMIT;
    if (state.matches.length) renderMatches();
    else {
      elements.status.textContent = "No exact registered product match found.";
      elements.content.innerHTML = noMatchContent(name);
    }
  } catch (error) {
    elements.status.textContent = "Medicine evidence could not load.";
    elements.content.innerHTML = `<div class="empty-panel"><strong>Product directory could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
  }
}

export async function showMedicineComparison(first, second) {
  if (!elements.dialog) return;
  const requestId = ++state.requestId;
  elements.dialog.classList.add("comparison-mode");
  elements.title.textContent = `${first.name} ↔ ${second.name}`;
  elements.subtitle.textContent = "Both names are searched automatically in the local PH FDA registry snapshot; use the live FDA link only when you need to double-check";
  elements.status.textContent = "Searching both names in the local PH FDA snapshot…";
  elements.content.innerHTML = comparisonLoading(first, second);
  if (!elements.dialog.open) elements.dialog.showModal();
  try {
    await Promise.all([loadDirectory(), wait(SEARCH_FEEDBACK_MS)]);
    if (requestId !== state.requestId) return;
    state.comparison = {
      first: { ...first, matches: matchProducts(first.name, first.type), visibleCount: COMPARISON_PRODUCT_LIMIT },
      second: { ...second, matches: matchProducts(second.name, second.type), visibleCount: COMPARISON_PRODUCT_LIMIT },
    };
    const products = [...state.comparison.first.matches, ...state.comparison.second.matches];
    state.productByRegistration = new Map(products.map(product => [product.r, product]));
    renderComparison();
  } catch (error) {
    if (requestId !== state.requestId) return;
    elements.status.textContent = "Medicine comparison could not load.";
    elements.content.innerHTML = `<div class="empty-panel"><strong>Product directory could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
  }
}
