const PAGE_SIZE = 48;
const state = {
  products: [], filtered: [], names: [], page: 1, suggestionTimer: null, voiceAlternatives: [],
  leaflets: null, leafletPromise: null, chatProductRegistration: "",
};
const elements = {
  search: document.querySelector("#product-search"),
  sort: document.querySelector("#product-sort"),
  leafletFilter: document.querySelector("#product-leaflet-filter"),
  count: document.querySelector("#product-count"),
  page: document.querySelector("#product-page"),
  list: document.querySelector("#product-list"),
  previous: document.querySelector("#product-previous"),
  next: document.querySelector("#product-next"),
  suggestion: document.querySelector("#product-suggestion"),
  dialog: document.querySelector("#product-dialog"),
  detailTitle: document.querySelector("#product-detail-title"),
  detailSubtitle: document.querySelector("#product-detail-subtitle"),
  detailContent: document.querySelector("#product-detail-content"),
  chatLauncher: document.querySelector("#chat-launcher"),
  chatDialog: document.querySelector("#medicine-chat"),
  chatMessages: document.querySelector("#chat-messages"),
  chatForm: document.querySelector("#chat-form"),
  chatInput: document.querySelector("#chat-input"),
};
const escapeHTML = value => String(value || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const display = (value, fallback = "Not published") => value || fallback;
const readableMethod = value => ({
  digital_text: "Digital text",
  digital_text_and_ocr: "Digital text + OCR",
  ocr: "OCR",
}[value] || value || "Not recorded");
const reviewLabel = value => ({
  machine_extracted_review_recommended: "Machine-extracted · review recommended",
  needs_human_review: "Needs human review",
  needs_human_review_missing_section: "Needs review · one section was not found",
  needs_human_review_no_sections_found: "Needs review · sections were not found",
}[value] || String(value || "Review status unavailable").replaceAll("_", " "));
const looksLikeIngredientList = value => /(\+|\/|\b(?:hydrochloride|hydrobromide|sodium|calcium|besilate|besylate|sulfate|acetate)\b)/i
  .test(value || "");
const possiblePublishedFieldSwap = product => Boolean(
  product.b && product.g && looksLikeIngredientList(product.b) && !looksLikeIngredientList(product.g)
);
const sortValue = (product, mode) => {
  const selected = {
    brand: product.b, generic: product.g, registration: product.r, expiry: product.x,
  }[mode];
  return (selected || "\uffff").toLocaleLowerCase();
};
const normalizeSuggestion = value => String(value || "").toLocaleLowerCase().replace(/[^a-z0-9]+/g, "");
const nativizeReading = (value, mergeVowels = false) => {
  let transformed = normalizeSuggestion(value);
  for (const [source, target] of [
    ["tion", "syon"], ["sion", "syon"], ["ture", "tyur"], ["ph", "p"],
    ["th", "t"], ["sh", "s"], ["ch", "ts"], ["qu", "kw"], ["x", "ks"],
    ["f", "p"], ["v", "b"], ["z", "s"], ["j", "dy"],
  ]) transformed = transformed.replaceAll(source, target);
  transformed = transformed.replaceAll("ce", "se").replaceAll("ci", "si").replaceAll("cy", "sy")
    .replaceAll("c", "k").replaceAll("q", "k")
    .replaceAll("ge", "dye").replaceAll("gi", "dyi").replaceAll("gy", "dyy");
  if (mergeVowels) transformed = transformed.replaceAll("e", "i").replaceAll("o", "u");
  return transformed;
};
const speechReading = value => nativizeReading(value, true)
  .replace(/([aeiou])\1+/g, "$1").replace(/h(?=[aeiou])/g, "").replaceAll("y", "i");
const pronunciationPaths = value => [...new Set([
  normalizeSuggestion(value),
  nativizeReading(value),
  nativizeReading(value, true),
  speechReading(value),
])].filter(Boolean);
function jaroWinkler(first, second) {
  if (first === second) return 1;
  if (!first || !second) return 0;
  const range = Math.max(Math.floor(Math.max(first.length, second.length) / 2) - 1, 0);
  const firstMatches = Array(first.length).fill(false);
  const secondMatches = Array(second.length).fill(false);
  let matches = 0;
  for (let i = 0; i < first.length; i++) {
    const start = Math.max(0, i - range);
    const end = Math.min(i + range + 1, second.length);
    for (let j = start; j < end; j++) {
      if (secondMatches[j] || first[i] !== second[j]) continue;
      firstMatches[i] = true; secondMatches[j] = true; matches++; break;
    }
  }
  if (!matches) return 0;
  const firstMatched = [...first].filter((_, index) => firstMatches[index]);
  const secondMatched = [...second].filter((_, index) => secondMatches[index]);
  const transpositions = firstMatched.filter((character, index) => character !== secondMatched[index]).length / 2;
  const jaro = (matches / first.length + matches / second.length + (matches - transpositions) / matches) / 3;
  let prefix = 0;
  while (prefix < Math.min(4, first.length, second.length) && first[prefix] === second[prefix]) prefix++;
  return jaro + prefix * 0.1 * (1 - jaro);
}
function rankedSuggestions(query) {
  const queries = [query, ...state.voiceAlternatives].filter(Boolean);
  const queryPaths = [...new Set(queries.flatMap(pronunciationPaths))];
  const standardQuery = normalizeSuggestion(query);
  if (standardQuery.length < 4) return [];
  const ranked = [];
  for (const name of state.names) {
    const lengthDifference = Math.abs(name.normalized.length - standardQuery.length);
    if (lengthDifference > Math.max(7, Math.floor(standardQuery.length * 0.65))) continue;
    const standardScore = jaroWinkler(standardQuery, name.normalized);
    let latticeScore = 0;
    let selectedQueryPath = "";
    let selectedNamePath = "";
    for (const queryPath of queryPaths) {
      for (const namePath of name.paths) {
        const score = jaroWinkler(queryPath, namePath);
        if (score > latticeScore) {
          latticeScore = score; selectedQueryPath = queryPath; selectedNamePath = namePath;
        }
      }
    }
    const score = Math.max(standardScore, latticeScore);
    if (score >= 0.72) ranked.push({
      ...name, score, latticeScore, selectedQueryPath, selectedNamePath,
    });
  }
  return ranked.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, 3);
}
function updateSuggestion(query) {
  clearTimeout(state.suggestionTimer);
  elements.suggestion.replaceChildren();
  if (!query || state.filtered.length) return;
  state.suggestionTimer = setTimeout(() => {
    const suggestions = rankedSuggestions(query);
    if (!suggestions.length) return;
    elements.suggestion.innerHTML = `<span>Did you mean</span>
      ${suggestions.map(suggestion => `<button type="button" data-suggestion="${escapeHTML(suggestion.name)}">${escapeHTML(suggestion.name)}</button>`).join("")}
      <small>registered names · pronunciation-lattice suggestions</small>`;
    const emptyState = elements.list.querySelector(".empty-state");
    if (emptyState) {
      emptyState.innerHTML = `<strong>No exact spelling match</strong>
        <span>Tap the suggested registered name above to search again.</span>`;
    }
  }, 120);
}

function render() {
  const pages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
  state.page = Math.min(state.page, pages);
  const rows = state.filtered.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
  elements.count.textContent = state.filtered.length.toLocaleString("en-PH");
  elements.page.textContent = `Page ${state.page} of ${pages}`;
  elements.previous.disabled = state.page === 1;
  elements.next.disabled = state.page === pages;
  elements.list.innerHTML = rows.map(product => `<article class="directory-card" data-registration="${escapeHTML(product.r)}">
    <div class="directory-card-heading">
      <div><span class="registration-number">${escapeHTML(product.r)}</span>
        <h3>${escapeHTML(display(product.b, "No brand name published"))}</h3></div>
      <span class="product-classification">${escapeHTML(display(product.c, "Classification unavailable"))}</span>
    </div>
    ${possiblePublishedFieldSwap(product) ? `<div class="source-warning">
      <strong>Possible PH FDA field inversion</strong>
      <span>The published brand resembles an ingredient list while the published generic resembles a brand. These source fields are shown unchanged.</span>
    </div>` : ""}
    <dl>
      <div><dt>Published generic field</dt><dd>${escapeHTML(display(product.g))}</dd></div>
      <div><dt>Strength and form</dt><dd>${escapeHTML(display([product.s, product.f].filter(Boolean).join(" · ")))}</dd></div>
      <div><dt>Manufacturer</dt><dd>${escapeHTML(display(product.m))}</dd></div>
      <div><dt>Expiry</dt><dd>${escapeHTML(display(product.x))}</dd></div>
    </dl>
    <div class="directory-actions">
      <button class="product-detail-button" type="button" data-product-detail="${escapeHTML(product.r)}">
        ${product.l
          ? `View details + ${product.l} source leaflet${product.l === 1 ? "" : "s"}`
          : "View registry details · no leaflet"}
      </button>
      <button class="chat-product-button" type="button" data-chat-product="${escapeHTML(product.r)}">Ask guide</button>
      <a class="fda-record-link directory-fda-link" href="${escapeHTML(product.u)}" target="_blank" rel="noreferrer"
      data-registration="${escapeHTML(product.r)}">Copy ${escapeHTML(product.r)} &amp; open PH FDA ↗</a>
    </div>
  </article>`).join("") || `<div class="empty-state"><strong>No registered product found</strong><span>Try a registration number or shorter medicine name.</span></div>`;
}

function shortenChatText(value, maximum = 700) {
  const text = String(value || "").trim();
  return text.length <= maximum ? text : `${text.slice(0, maximum).trim()}…`;
}

function appendChatMessage(role, content) {
  const message = document.createElement("article");
  message.className = `chat-message ${role}`;
  message.innerHTML = content;
  elements.chatMessages.append(message);
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function openMedicineChat() {
  if (!elements.chatMessages.children.length) {
    appendChatMessage("assistant", `<strong>Hello. I’m a medicine information simulator—not a licensed pharmacist.</strong>
      <p>I use only this PH FDA registry and its collected leaflets. Ask “What is…” followed by a brand, generic name, or registration number.</p>`);
  }
  if (!elements.chatDialog.open) elements.chatDialog.showModal();
  elements.chatInput.focus();
}

function chatProductChoice(product) {
  const label = display(product.b, product.g || product.r);
  const presentation = [product.g, product.s, product.f].filter(Boolean).join(" · ");
  return `<button type="button" class="chat-choice" data-chat-registration="${escapeHTML(product.r)}">
    <strong>${escapeHTML(label)}</strong>
    <span>${escapeHTML(product.r)}${presentation ? ` · ${escapeHTML(presentation)}` : ""}</span>
    <small>${product.l ? `${product.l} source leaflet${product.l === 1 ? "" : "s"}` : "Registry only · no leaflet"}</small>
  </button>`;
}

function chatNameChoice(name) {
  const products = productsForChatName(name);
  return `<button type="button" class="chat-choice" data-chat-name="${escapeHTML(name.name)}"
    data-chat-name-type="${escapeHTML(name.type)}">
    <strong>${escapeHTML(name.name)}</strong>
    <span>Registered ${escapeHTML(name.type)} name</span>
    <small>${products.length} product registration${products.length === 1 ? "" : "s"}</small>
  </button>`;
}

function cleanChatQuery(value) {
  return String(value || "")
    .replace(/^(?:hello|hi|hey)[,!.]?\s*/i, "")
    .replace(/^(?:please\s+)?(?:what(?:'s| is)|tell me about|explain|can you explain|do you know)\s+/i, "")
    .replace(/\b(?:drug|medicine|medication)\??$/i, "")
    .replace(/[?!.]+$/g, "")
    .trim();
}

function productsForChatName(name) {
  return state.products.filter(product => {
    const value = name.type === "brand" ? product.b : product.g;
    return normalizeSuggestion(value) === name.normalized;
  }).sort((first, second) =>
    Number(Boolean(second.l)) - Number(Boolean(first.l))
    || first.r.localeCompare(second.r));
}

function resolveChatNames(query) {
  const normalized = normalizeSuggestion(query);
  if (!normalized) return [];
  const exact = state.names.filter(name => name.normalized === normalized);
  if (exact.length) return exact;
  return rankedSuggestions(query);
}

function showChatNameProducts(name) {
  const products = productsForChatName(name);
  if (!products.length) {
    appendChatMessage("assistant", `<p>I found the registered name “${escapeHTML(name.name)},” but no linked product record. Source review is needed.</p>`);
    return;
  }
  if (products.length === 1) {
    explainChatProduct(products[0]);
    return;
  }
  appendChatMessage("assistant", `<p><strong>${escapeHTML(name.name)}</strong> appears on ${products.length} registrations. Choose the exact strength, dosage form, and registration number:</p>
    <div class="chat-choices">${products.slice(0, 8).map(chatProductChoice).join("")}</div>`);
}

async function explainChatProduct(product) {
  state.chatProductRegistration = product.r;
  const label = display(product.b, product.g || product.r);
  const identity = `<strong>${escapeHTML(label)}</strong> is registered as
    <strong>${escapeHTML(display(product.g, "a product with no published generic name"))}</strong>.
    Its registered presentation is ${escapeHTML(display([product.s, product.f].filter(Boolean).join(" · ")))}.
    It is classified as ${escapeHTML(display(product.c))}.`;
  if (!product.l) {
    appendChatMessage("assistant", `<p>${identity}</p>
      <p><strong>Indication unavailable:</strong> no PH FDA leaflet link was collected for this exact registration (${escapeHTML(product.r)}). I won’t infer its use from another product.</p>
      <button type="button" class="chat-inline-action" data-chat-detail="${escapeHTML(product.r)}">View registry details</button>`);
    return;
  }
  appendChatMessage("assistant", `<p>${identity}</p><p class="chat-loading">Checking the linked leaflet…</p>`);
  const loadingMessage = elements.chatMessages.querySelector(".chat-message:last-child");
  try {
    const leaflets = (await loadLeaflets())[product.r] || [];
    const leaflet = leaflets.find(item => item.indications) || leaflets.find(item => item.description) || null;
    if (!leaflet) {
      loadingMessage.innerHTML += `<p><strong>Indication unavailable:</strong> a leaflet is linked, but no description or indication was extracted. Human source review is needed.</p>`;
    } else {
      const description = leaflet.description
        ? `<p><strong>Description:</strong> ${escapeHTML(shortenChatText(leaflet.description, 420))}</p>`
        : "";
      const indication = leaflet.indications
        ? `<p class="chat-indication"><strong>Leaflet indication:</strong> ${escapeHTML(shortenChatText(leaflet.indications))}</p>`
        : `<p><strong>Indication unavailable:</strong> the linked leaflet did not yield an indication section. I won’t guess.</p>`;
      loadingMessage.innerHTML += `${description}${indication}
        <p class="chat-source-note">Machine-extracted from a PH FDA-linked document; verify the source before clinical use.</p>`;
    }
    loadingMessage.querySelector(".chat-loading")?.remove();
    loadingMessage.insertAdjacentHTML(
      "beforeend",
      `<button type="button" class="chat-inline-action" data-chat-detail="${escapeHTML(product.r)}">View full details and source</button>`,
    );
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
  } catch (error) {
    loadingMessage.querySelector(".chat-loading").textContent = `Leaflet data could not load: ${error.message}`;
  }
}

function respondToChat(value) {
  const query = cleanChatQuery(value);
  const refersToCurrent = /^(?:this|it|this one)$/i.test(query);
  if (refersToCurrent && state.chatProductRegistration) {
    const product = state.products.find(item => item.r === state.chatProductRegistration);
    if (product) explainChatProduct(product);
    return;
  }
  if (!query || refersToCurrent) {
    appendChatMessage("assistant", "<p>Please tell me the brand, generic name, or registration number.</p>");
    return;
  }
  if (/\b(?:dose|dosage|how much|interaction|pregnan|overdose|emergency)\b/i.test(value)) {
    appendChatMessage("assistant", `<p>I can identify a medicine and show its sourced description or indication, but I can’t safely choose a dose or assess interactions, pregnancy, overdose, or emergencies. Please ask a licensed pharmacist or doctor.</p>
      <p>You can still type the medicine name and I’ll show the available registry and leaflet evidence.</p>`);
    return;
  }
  const exactRegistration = state.products.find(
    product => normalizeSuggestion(product.r) === normalizeSuggestion(query),
  );
  if (exactRegistration) {
    explainChatProduct(exactRegistration);
    return;
  }
  const names = resolveChatNames(query);
  if (!names.length) {
    appendChatMessage("assistant", `<p>I couldn’t find a close registered name for “${escapeHTML(query)}.” Try a shorter brand or generic name, or enter the registration number.</p>`);
    return;
  }
  if (names.length === 1 && names[0].normalized === normalizeSuggestion(query)) {
    showChatNameProducts(names[0]);
    return;
  }
  appendChatMessage("assistant", `<p>I didn’t find an exact registered name. Did you mean one of these?</p><div class="chat-choices">
    ${names.map(chatNameChoice).join("")}
  </div>`);
}

function metadataItem(label, value) {
  return `<article><span>${escapeHTML(label)}</span><strong>${escapeHTML(display(value))}</strong></article>`;
}

function loadLeaflets() {
  if (state.leaflets) return Promise.resolve(state.leaflets);
  if (globalThis.LEAFLET_RECORDS) {
    state.leaflets = globalThis.LEAFLET_RECORDS;
    return Promise.resolve(state.leaflets);
  }
  if (!state.leafletPromise) {
    state.leafletPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "data/leaflet_records.js";
      script.onload = () => {
        if (!globalThis.LEAFLET_RECORDS) {
          reject(new Error("Leaflet data loaded without any records"));
          return;
        }
        state.leaflets = globalThis.LEAFLET_RECORDS;
        resolve(state.leaflets);
      };
      script.onerror = () => reject(new Error("Leaflet data could not load"));
      document.head.append(script);
    }).then(leaflets => {
      state.leaflets = leaflets;
      return leaflets;
    }).catch(error => {
      state.leafletPromise = null;
      throw error;
    });
  }
  return state.leafletPromise;
}

function initializeProducts(products) {
  state.products = products.map(product => ({
    ...product,
    _search: [product.r, product.b, product.g, product.s, product.f, product.c, product.m]
      .filter(Boolean).join(" ").toLocaleLowerCase(),
  }));
  const uniqueNames = new Map();
  for (const product of products) {
    for (const [name, type] of [[product.b, "brand"], [product.g, "generic"]]) {
      const normalized = normalizeSuggestion(name);
      if (!normalized || uniqueNames.has(`${type}:${normalized}`)) continue;
      uniqueNames.set(`${type}:${normalized}`, { name, type, normalized, paths: pronunciationPaths(name) });
    }
  }
  state.names = [...uniqueNames.values()];
  applyFilters();
}

function showProductLoadError(error) {
  elements.list.innerHTML = `<div class="empty-state"><strong>Product data could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
}

if (globalThis.PRODUCT_RECORDS) {
  initializeProducts(globalThis.PRODUCT_RECORDS);
} else {
  fetch("data/product_records.json").then(response => {
    if (!response.ok) throw new Error(`Product data could not load (${response.status})`);
    return response.json();
  }).then(initializeProducts).catch(showProductLoadError);
}

function leafletPanel(leaflet, index, total) {
  const title = total > 1 ? `Leaflet ${index + 1} of ${total}` : "Medicine leaflet";
  const description = leaflet.description
    ? `<section class="leaflet-section"><h4>${escapeHTML(leaflet.description_heading || "Description")}</h4>
        <p>${escapeHTML(leaflet.description)}</p></section>`
    : `<section class="leaflet-section missing"><h4>Description</h4><p>No description section was found automatically.</p></section>`;
  const indications = leaflet.indications
    ? `<section class="leaflet-section indication"><h4>${escapeHTML(leaflet.indications_heading || "Indications")}</h4>
        <p>${escapeHTML(leaflet.indications)}</p></section>`
    : `<section class="leaflet-section missing"><h4>Indication</h4><p>No indication section was found automatically.</p></section>`;
  return `<article class="leaflet-card">
    <div class="leaflet-card-heading">
      <div><span class="name-type">${escapeHTML(title)}</span><h3>${escapeHTML(display(leaflet.category, "Product information"))}</h3></div>
      <span class="record-count">${escapeHTML(readableMethod(leaflet.method))}</span>
    </div>
    <div class="leaflet-review-note"><strong>${escapeHTML(reviewLabel(leaflet.review_status))}</strong>
      <span>Text is shown from the collected PH FDA-linked document and may contain extraction errors.</span></div>
    ${description}${indications}
    <a class="fda-record-link leaflet-source-link" href="${escapeHTML(leaflet.url)}" target="_blank" rel="noreferrer">Open source leaflet ↗</a>
  </article>`;
}

async function showProductDetails(registration) {
  const product = state.products.find(row => row.r === registration);
  if (!product) return;
  elements.detailTitle.textContent = display(product.b, product.g || registration);
  elements.detailSubtitle.textContent = `${registration} · ${display(product.g)}`;
  elements.detailContent.innerHTML = `<div class="product-detail-grid">
    ${[
      ["Strength", product.s], ["Dosage form", product.f], ["Classification", product.c],
      ["Pharmacologic category", product.p], ["Manufacturer", product.m], ["Country of origin", product.o],
      ["Packaging", product.k], ["Trader", product.t], ["Importer", product.m2],
      ["Distributor", product.d], ["Application type", product.a], ["Issuance date", product.i],
      ["Expiry", product.x],
    ].map(([label, value]) => metadataItem(label, value)).join("")}
  </div>
  <div class="leaflet-heading"><h3>Leaflet information</h3><p>Loading sourced leaflet text…</p></div>`;
  elements.dialog.showModal();
  try {
    const leaflets = (await loadLeaflets())[registration] || [];
    if (!elements.dialog.open || elements.detailSubtitle.textContent.split(" · ")[0] !== registration) return;
    elements.detailContent.querySelector(".leaflet-heading").innerHTML = `<h3>Leaflet information</h3>
      <p>${leaflets.length
        ? "Machine-extracted from PH FDA-linked documents. Verify the source before clinical use."
        : "No PH FDA leaflet link was collected for this exact registration. The registry details above are still available; no indication has been inferred or copied from another product."}</p>`;
    elements.detailContent.insertAdjacentHTML(
      "beforeend",
      `<div class="leaflet-list">${leaflets.map((leaflet, index) => leafletPanel(leaflet, index, leaflets.length)).join("")}</div>`,
    );
  } catch (error) {
    elements.detailContent.querySelector(".leaflet-heading").innerHTML = `<h3>Leaflet information</h3>
      <p>${escapeHTML(error.message)}</p>`;
  }
}

function applyFilters() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  const leafletMode = elements.leafletFilter.value;
  state.filtered = state.products.filter(product => {
    const searchMatches = !terms.length || terms.every(term => product._search.includes(term));
    const leafletMatches = leafletMode === "all"
      || (leafletMode === "with" && product.l > 0)
      || (leafletMode === "without" && !product.l);
    return searchMatches && leafletMatches;
  });
  const mode = elements.sort.value;
  state.filtered.sort((a, b) => sortValue(a, mode).localeCompare(sortValue(b, mode))
    || a.r.localeCompare(b.r));
  state.page = 1;
  render();
  updateSuggestion(query);
}

elements.search.addEventListener("input", applyFilters);
elements.search.addEventListener("voicealternatives", event => {
  state.voiceAlternatives = event.detail?.alternatives || [];
  updateSuggestion(elements.search.value.trim());
});
elements.sort.addEventListener("input", applyFilters);
elements.leafletFilter.addEventListener("input", applyFilters);
elements.suggestion.addEventListener("click", event => {
  const button = event.target.closest("button[data-suggestion]");
  if (!button) return;
  elements.search.value = button.dataset.suggestion;
  elements.search.dispatchEvent(new Event("input", { bubbles: true }));
  elements.search.focus();
});
elements.previous.addEventListener("click", () => { state.page--; render(); scrollTo({ top: 0, behavior: "smooth" }); });
elements.next.addEventListener("click", () => { state.page++; render(); scrollTo({ top: 0, behavior: "smooth" }); });
elements.list.addEventListener("click", event => {
  const chatButton = event.target.closest("[data-chat-product]");
  if (chatButton) {
    const product = state.products.find(item => item.r === chatButton.dataset.chatProduct);
    if (!product) return;
    openMedicineChat();
    appendChatMessage("user", `<p>What is ${escapeHTML(display(product.b, product.g || product.r))} (${escapeHTML(product.r)})?</p>`);
    explainChatProduct(product);
    return;
  }
  const detailButton = event.target.closest("[data-product-detail]");
  if (detailButton) {
    showProductDetails(detailButton.dataset.productDetail);
    return;
  }
  const link = event.target.closest(".fda-record-link[data-registration]");
  if (!link) return;
  const registration = link.dataset.registration;
  navigator.clipboard.writeText(registration).then(() => {
    link.textContent = `${registration} copied — paste it in FDA Search ↗`;
  }).catch(() => {
    link.textContent = `Search ${registration} on PH FDA ↗`;
  });
});
elements.chatLauncher.addEventListener("click", openMedicineChat);
elements.chatForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = elements.chatInput.value.trim();
  if (!value) return;
  appendChatMessage("user", `<p>${escapeHTML(value)}</p>`);
  elements.chatInput.value = "";
  respondToChat(value);
});
elements.chatMessages.addEventListener("click", event => {
  const nameChoice = event.target.closest("[data-chat-name][data-chat-name-type]");
  if (nameChoice) {
    const normalized = normalizeSuggestion(nameChoice.dataset.chatName);
    const name = state.names.find(item =>
      item.normalized === normalized && item.type === nameChoice.dataset.chatNameType);
    if (name) showChatNameProducts(name);
    return;
  }
  const choice = event.target.closest("[data-chat-registration]");
  if (choice) {
    const product = state.products.find(item => item.r === choice.dataset.chatRegistration);
    if (product) explainChatProduct(product);
    return;
  }
  const detail = event.target.closest("[data-chat-detail]");
  if (!detail) return;
  elements.chatDialog.close();
  showProductDetails(detail.dataset.chatDetail);
});
