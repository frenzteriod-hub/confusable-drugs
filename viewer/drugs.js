const PAGE_SIZE = 48;
const state = { products: [], filtered: [], names: [], page: 1, suggestionTimer: null };
const elements = {
  search: document.querySelector("#product-search"),
  sort: document.querySelector("#product-sort"),
  count: document.querySelector("#product-count"),
  page: document.querySelector("#product-page"),
  list: document.querySelector("#product-list"),
  previous: document.querySelector("#product-previous"),
  next: document.querySelector("#product-next"),
  suggestion: document.querySelector("#product-suggestion"),
};
const escapeHTML = value => String(value || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const display = (value, fallback = "Not published") => value || fallback;
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
const filipinoReading = value => {
  let transformed = normalizeSuggestion(value);
  for (const [source, target] of [
    ["ph", "p"], ["th", "t"], ["sh", "s"], ["f", "p"], ["v", "b"],
    ["z", "s"], ["g", "j"], ["y", "i"], ["e", "i"], ["o", "u"],
    ["q", "k"], ["c", "k"],
  ]) transformed = transformed.replaceAll(source, target);
  return transformed;
};
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
function bestSuggestion(query) {
  const standardQuery = normalizeSuggestion(query);
  const readingQuery = filipinoReading(query);
  if (standardQuery.length < 4) return null;
  let best = null;
  for (const name of state.names) {
    const lengthDifference = Math.abs(name.normalized.length - standardQuery.length);
    if (lengthDifference > Math.max(4, Math.floor(standardQuery.length * 0.45))) continue;
    if (name.reading[0] !== readingQuery[0]) continue;
    const standardScore = jaroWinkler(standardQuery, name.normalized);
    const readingScore = jaroWinkler(readingQuery, name.reading);
    const score = Math.max(standardScore, readingScore);
    if (!best || score > best.score) best = { ...name, score };
  }
  return best && best.score >= 0.82 ? best : null;
}
function updateSuggestion(query) {
  clearTimeout(state.suggestionTimer);
  elements.suggestion.replaceChildren();
  if (!query || state.filtered.length) return;
  state.suggestionTimer = setTimeout(() => {
    const suggestion = bestSuggestion(query);
    if (!suggestion) return;
    elements.suggestion.innerHTML = `<span>Did you mean</span>
      <button type="button" data-suggestion="${escapeHTML(suggestion.name)}">${escapeHTML(suggestion.name)}</button>
      <small>${escapeHTML(suggestion.type)} · sounds/spells similar</small>`;
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
  elements.list.innerHTML = rows.map(product => `<article class="directory-card">
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
    <a class="fda-record-link directory-fda-link" href="${escapeHTML(product.u)}" target="_blank" rel="noreferrer"
      data-registration="${escapeHTML(product.r)}">Copy ${escapeHTML(product.r)} &amp; open PH FDA ↗</a>
  </article>`).join("") || `<div class="empty-state"><strong>No registered product found</strong><span>Try a registration number or shorter medicine name.</span></div>`;
}

function applyFilters() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  state.filtered = terms.length
    ? state.products.filter(product => terms.every(term => product._search.includes(term)))
    : [...state.products];
  const mode = elements.sort.value;
  state.filtered.sort((a, b) => sortValue(a, mode).localeCompare(sortValue(b, mode))
    || a.r.localeCompare(b.r));
  state.page = 1;
  render();
  updateSuggestion(query);
}

fetch("data/product_records.json").then(response => response.json()).then(products => {
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
      uniqueNames.set(`${type}:${normalized}`, { name, type, normalized, reading: filipinoReading(name) });
    }
  }
  state.names = [...uniqueNames.values()];
  applyFilters();
}).catch(error => {
  elements.list.innerHTML = `<div class="empty-state"><strong>Product data could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
});

elements.search.addEventListener("input", applyFilters);
elements.sort.addEventListener("input", applyFilters);
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
  const link = event.target.closest(".fda-record-link[data-registration]");
  if (!link) return;
  const registration = link.dataset.registration;
  navigator.clipboard.writeText(registration).then(() => {
    link.textContent = `${registration} copied — paste it in FDA Search ↗`;
  }).catch(() => {
    link.textContent = `Search ${registration} on PH FDA ↗`;
  });
});
