const PAGE_SIZE = 48;
const state = { products: [], filtered: [], page: 1 };
const elements = {
  search: document.querySelector("#product-search"),
  sort: document.querySelector("#product-sort"),
  count: document.querySelector("#product-count"),
  page: document.querySelector("#product-page"),
  list: document.querySelector("#product-list"),
  previous: document.querySelector("#product-previous"),
  next: document.querySelector("#product-next"),
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
}

fetch("data/product_records.json").then(response => response.json()).then(products => {
  state.products = products.map(product => ({
    ...product,
    _search: [product.r, product.b, product.g, product.s, product.f, product.c, product.m]
      .filter(Boolean).join(" ").toLocaleLowerCase(),
  }));
  applyFilters();
}).catch(error => {
  elements.list.innerHTML = `<div class="empty-state"><strong>Product data could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
});

elements.search.addEventListener("input", applyFilters);
elements.sort.addEventListener("input", applyFilters);
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
