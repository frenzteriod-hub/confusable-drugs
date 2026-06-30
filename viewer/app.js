const PAGE_SIZE = 25;

const state = {
  view: "candidates",
  candidates: [],
  variants: [],
  duplicates: [],
  productsByName: new Map(),
  filtered: [],
  page: 1,
};

const elements = {
  search: document.querySelector("#search"),
  mode: document.querySelector("#mode-filter"),
  priority: document.querySelector("#priority-filter"),
  results: document.querySelector("#results"),
  head: document.querySelector("#table-head"),
  filteredCount: document.querySelector("#filtered-count"),
  pageLabel: document.querySelector("#page-label"),
  previous: document.querySelector("#previous"),
  next: document.querySelector("#next"),
  empty: document.querySelector("#empty-state"),
  dialog: document.querySelector("#detail-dialog"),
  detailTitle: document.querySelector("#detail-title"),
  relationshipSummary: document.querySelector("#relationship-summary"),
  productComparison: document.querySelector("#product-comparison"),
  detailContent: document.querySelector("#detail-content"),
};

const formatNumber = number => new Intl.NumberFormat("en-PH").format(number);
const formatScore = number => Number(number).toFixed(3);
const escapeHTML = value => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function modeLabel(mode) {
  return {
    generic_generic: "Generic ↔ Generic",
    brand_brand: "Brand ↔ Brand",
    generic_brand: "Generic ↔ Brand",
  }[mode] || mode;
}

function classificationLabel(classification) {
  return {
    verified_lasa_pair: "Verified LASA pair",
    potential_lasa_pair: "Potential LASA pair",
    spelling_variant_or_probable_typo: "Spelling variant or probable typo",
    normalization_duplicate: "Normalization duplicate",
    false_positive: "False positive",
  }[classification] || classification.replaceAll("_", " ");
}

function reasonLabel(reason) {
  return {
    jaro_winkler: "spelling",
    edit_similarity: "edit distance",
    orthographic_phonetic_agreement: "spelling + phonetic",
    soundex_exact: "Soundex",
    filipino_phonology_experimental: "Filipino-aware",
  }[reason] || reason.replaceAll("_", " ");
}

function indexProducts(products) {
  const index = new Map();
  products.forEach(product => {
    [product.gi, product.bi].filter(Boolean).forEach(nameId => {
      if (!index.has(nameId)) index.set(nameId, []);
      index.get(nameId).push(product);
    });
  });
  return index;
}

async function loadData() {
  const [summary, candidates, variants, duplicates, products] = await Promise.all([
    fetch("data/summary.json").then(response => response.json()),
    fetch("data/review_queue.json").then(response => response.json()),
    fetch("data/source_variants.json").then(response => response.json()),
    fetch("data/normalization_duplicates.json").then(response => response.json()),
    fetch("data/product_records.json").then(response => response.json()),
  ]);
  state.candidates = candidates;
  state.variants = variants;
  state.duplicates = duplicates;
  state.productsByName = indexProducts(products);
  document.querySelector("#indexed-names").textContent = formatNumber(summary.indexed_names);
  document.querySelector("#review-count").textContent = formatNumber(summary.review_candidates);
  document.querySelector("#variant-count").textContent = formatNumber(summary.source_variants);
  document.querySelector("#normalization-count").textContent = formatNumber(summary.normalization_duplicates);
  document.querySelector("#generated-at").textContent = new Date(summary.generated_at).toLocaleDateString("en-PH");
  applyFilters();
}

function applyFilters() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const mode = elements.mode.value;
  const priority = elements.priority.value;
  const source = state.view === "candidates"
    ? state.candidates
    : state.view === "variants"
      ? state.variants
      : state.duplicates;
  state.filtered = source.filter(row => {
    const names = state.view === "duplicates"
      ? [row.canonical, row.alias]
      : [row.a, row.b];
    const namesMatch = !query || names.some(name => name.toLocaleLowerCase().includes(query));
    const modeMatches = state.view !== "candidates" || !mode || row.mode === mode;
    const priorityMatches = state.view !== "candidates" || !priority || row.priority === priority;
    return namesMatch && modeMatches && priorityMatches;
  });
  state.page = 1;
  render();
}

function render() {
  const totalPages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * PAGE_SIZE;
  const rows = state.filtered.slice(start, start + PAGE_SIZE);
  elements.filteredCount.textContent = formatNumber(state.filtered.length);
  elements.pageLabel.textContent = `Page ${state.page} of ${totalPages}`;
  elements.previous.disabled = state.page <= 1;
  elements.next.disabled = state.page >= totalPages;
  elements.empty.hidden = rows.length > 0;
  if (state.view === "candidates") renderCandidates(rows);
  else if (state.view === "variants") renderVariants(rows);
  else renderDuplicates(rows);
}

function renderCandidates(rows) {
  elements.head.innerHTML = `<tr>
    <th style="width:20%">Name A</th><th style="width:20%">Name B</th>
    <th style="width:16%">Review classification</th><th style="width:16%">Product relation</th>
    <th style="width:8%">Priority</th><th style="width:8%">Spelling</th>
    <th style="width:12%">Signals</th>
  </tr>`;
  elements.results.innerHTML = rows.map(row => {
    const relationship = productRelationship(
      row,
      state.productsByName.get(row.aid) || [],
      state.productsByName.get(row.bid) || [],
    );
    return `<tr>
      <td class="name-cell"><button data-id="${escapeHTML(row.id)}">${escapeHTML(row.a)}</button><small>${escapeHTML(row.at)}</small></td>
      <td class="name-cell"><button data-id="${escapeHTML(row.id)}">${escapeHTML(row.b)}</button><small>${escapeHTML(row.bt)}</small></td>
      <td><span class="classification-label ${row.classification === "spelling_variant_or_probable_typo" ? "typo" : "potential"}">${escapeHTML(classificationLabel(row.classification))}</span></td>
      <td><span class="relation-label ${escapeHTML(relationship.level)}">${escapeHTML(relationship.title)}</span></td>
      <td><span class="badge ${escapeHTML(row.priority)}">${escapeHTML(row.priority)}</span></td>
      <td class="metric"><strong>${formatScore(row.jw)}</strong><span>Jaro-Winkler</span></td>
      <td class="reason-list">${row.reasons.map(reasonLabel).map(escapeHTML).join(" · ")}</td>
    </tr>`;
  }).join("");
}

function renderVariants(rows) {
  elements.head.innerHTML = `<tr>
    <th style="width:34%">Published name A</th><th style="width:34%">Published name B</th>
    <th style="width:12%">Similarity</th><th style="width:10%">Edits</th>
    <th style="width:10%">Classification</th>
  </tr>`;
  elements.results.innerHTML = rows.map(row => `<tr>
    <td class="name-cell">${escapeHTML(row.a)}</td>
    <td class="name-cell">${escapeHTML(row.b)}</td>
    <td class="metric"><strong>${formatScore(row.jw)}</strong><span>Jaro-Winkler</span></td>
    <td class="metric"><strong>${row.distance}</strong><span>characters</span></td>
    <td><span class="classification-label typo">${escapeHTML(classificationLabel(row.classification))}</span></td>
  </tr>`).join("");
}

function renderDuplicates(rows) {
  elements.head.innerHTML = `<tr>
    <th style="width:28%">Canonical display</th><th style="width:28%">Formatting alias</th>
    <th style="width:12%">Entity type</th><th style="width:18%">Classification</th>
    <th style="width:14%">Normalized key</th>
  </tr>`;
  elements.results.innerHTML = rows.map(row => `<tr>
    <td class="name-cell">${escapeHTML(row.canonical)}</td>
    <td class="name-cell">${escapeHTML(row.alias)}</td>
    <td class="mode-label">${escapeHTML(row.type)}</td>
    <td><span class="classification-label duplicate">${escapeHTML(classificationLabel(row.classification))}</span></td>
    <td class="reason-list">${escapeHTML(row.key)}</td>
  </tr>`).join("");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function productRelationship(row, productsA, productsB) {
  const registrationsA = new Set(productsA.map(product => product.r));
  const sharedRegistrations = productsB
    .map(product => product.r)
    .filter(registration => registrationsA.has(registration));
  const formulationsA = new Set(productsA.map(product => product.gi));
  const sharedFormulations = unique(productsB
    .map(product => product.gi)
    .filter(formulation => formulationsA.has(formulation)));

  if (sharedRegistrations.length) {
    return {
      level: "same-product",
      title: "Same registered product",
      message: `${sharedRegistrations.length} registration${sharedRegistrations.length === 1 ? "" : "s"} contain both names. This is usually a brand name linked to its generic formulation.`,
    };
  }
  if (sharedFormulations.length) {
    return {
      level: "same-generic",
      title: "Same generic formulation",
      message: "These names occur on different registered products that share the same generic formulation.",
    };
  }
  if (productsA.length && productsB.length) {
    return {
      level: "different-product",
      title: "Different registered formulations",
      message: "No shared registration number or exact generic formulation was found. Similar spelling does not mean these medicines are equivalent.",
    };
  }
  return {
    level: "unknown",
    title: "Relationship needs review",
    message: "The local PH FDA records are not sufficient to establish a product relationship for this pair.",
  };
}

function looksLikeIngredientList(value) {
  return /(\+|\/|\b(?:hydrochloride|hydrobromide|sodium|calcium|besilate|besylate|sulfate|acetate)\b)/i
    .test(value || "");
}

function possiblePublishedFieldSwap(product) {
  return Boolean(
    product.b
    && product.g
    && looksLikeIngredientList(product.b)
    && !looksLikeIngredientList(product.g)
  );
}

function productCard(name, type, products) {
  const generics = unique(products.map(product => product.g));
  const brands = unique(products.map(product => product.b));
  const registrations = unique(products.map(product => product.r));
  const visibleProducts = products.slice(0, 8);
  const genericText = generics.length ? generics.join(" · ") : "No linked generic formulation";
  const brandText = brands.length ? brands.join(" · ") : "No brand name published";
  const possibleSwap = products.some(possiblePublishedFieldSwap);
  return `<section class="product-card">
    <div class="product-card-heading">
      <div><span class="name-type">Candidate indexed as ${escapeHTML(type)}</span><h3>${escapeHTML(name)}</h3></div>
      <span class="record-count">${formatNumber(registrations.length)} registration${registrations.length === 1 ? "" : "s"}</span>
    </div>
    ${possibleSwap ? `<div class="source-warning">
      <strong>Possible PH FDA field inversion</strong>
      <span>The published brand resembles an ingredient list while the published generic resembles a brand. The dashboard does not silently correct it.</span>
    </div>` : ""}
    <dl class="published-fields">
      <div><dt>Published brand name${brands.length === 1 ? "" : "s"}</dt><dd>${escapeHTML(brandText)}</dd></div>
      <div><dt>Published generic name${generics.length === 1 ? "" : "s"}</dt><dd>${escapeHTML(genericText)}</dd></div>
    </dl>
    <div class="registration-list">
      ${visibleProducts.map(product => `<article>
        <div class="registration-title">
          <strong class="registration-number">${escapeHTML(product.r)}</strong>
          <strong class="presentation">${escapeHTML([product.s, product.f].filter(Boolean).join(" · ") || "Strength/form not listed")}</strong>
        </div>
        <small>${escapeHTML([product.m, product.x ? `expires ${product.x}` : ""].filter(Boolean).join(" · "))}</small>
        <a class="fda-record-link" href="${escapeHTML(product.u)}" target="_blank" rel="noreferrer"
          data-registration="${escapeHTML(product.r)}"
          title="Copies the registration number, then opens the FDA search portal">
          Copy ${escapeHTML(product.r)} &amp; open PH FDA ↗
        </a>
      </article>`).join("") || "<p>No matching product record found.</p>"}
      ${products.length > visibleProducts.length ? `<p class="more-records">+ ${formatNumber(products.length - visibleProducts.length)} more records</p>` : ""}
    </div>
  </section>`;
}

function showDetails(id) {
  const row = state.candidates.find(candidate => candidate.id === id);
  if (!row) return;
  const productsA = state.productsByName.get(row.aid) || [];
  const productsB = state.productsByName.get(row.bid) || [];
  const relationship = productRelationship(row, productsA, productsB);
  elements.detailTitle.textContent = `${row.a} ↔ ${row.b}`;
  elements.relationshipSummary.className = `relationship-summary ${relationship.level}`;
  elements.relationshipSummary.innerHTML = `<strong>${escapeHTML(relationship.title)}</strong><span>${escapeHTML(relationship.message)}</span>`;
  elements.productComparison.innerHTML =
    productCard(row.a, row.at, productsA) + productCard(row.b, row.bt, productsB);
  const details = [
    ["Review classification", classificationLabel(row.classification)],
    ["Classification basis", row.classificationBasis],
    ["Comparison", modeLabel(row.mode)],
    ["Priority", row.priority],
    ["Jaro-Winkler", formatScore(row.jw)],
    ["Edit similarity", `${formatScore(row.edit)} (${row.distance} edits)`],
    ["Soundex similarity", formatScore(row.soundex)],
    ["Filipino-aware (experimental)", formatScore(row.filipino)],
    ["Review status", "Unverified—human review required"],
  ];
  elements.detailContent.innerHTML = details.map(([label, value]) =>
    `<article><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></article>`
  ).join("");
  elements.dialog.showModal();
}

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active", tab === button));
    state.view = button.dataset.view;
    elements.mode.disabled = state.view !== "candidates";
    elements.priority.disabled = state.view !== "candidates";
    applyFilters();
  });
});
[elements.search, elements.mode, elements.priority].forEach(control => {
  control.addEventListener("input", applyFilters);
});
elements.previous.addEventListener("click", () => { state.page -= 1; render(); });
elements.next.addEventListener("click", () => { state.page += 1; render(); });
elements.results.addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");
  if (button) showDetails(button.dataset.id);
});
elements.productComparison.addEventListener("click", event => {
  const link = event.target.closest(".fda-record-link[data-registration]");
  if (!link) return;
  const registration = link.dataset.registration;
  navigator.clipboard.writeText(registration).then(() => {
    link.textContent = `${registration} copied — paste it in FDA Search ↗`;
  }).catch(() => {
    link.textContent = `Search ${registration} on PH FDA ↗`;
  });
});

loadData().catch(error => {
  elements.results.innerHTML = `<tr><td colspan="7">Could not load local review data: ${escapeHTML(error.message)}</td></tr>`;
});
