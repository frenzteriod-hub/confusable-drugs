const PAGE_SIZE = 25;

const CEBUANO_REASON_KEYS = {
  transform: ["filipino_phonology_experimental"],
  lattice: ["pronunciation_lattice_weighted", "pronunciation_lattice_experimental"],
  ensemble: ["experimental_multifeature_ensemble"],
};

const state = {
  rows: [],
  filtered: [],
  page: 1,
};

const elements = {
  search: document.querySelector("#cebuano-pair-search"),
  signal: document.querySelector("#cebuano-signal-filter"),
  priority: document.querySelector("#cebuano-priority-filter"),
  count: document.querySelector("#cebuano-pair-count"),
  pageLabel: document.querySelector("#cebuano-pair-page"),
  results: document.querySelector("#cebuano-pair-results"),
  empty: document.querySelector("#cebuano-pair-empty"),
  previous: document.querySelector("#cebuano-pair-previous"),
  next: document.querySelector("#cebuano-pair-next"),
  dialog: document.querySelector("#cebuano-pair-dialog"),
  title: document.querySelector("#cebuano-pair-title"),
  summary: document.querySelector("#cebuano-pair-summary"),
  detail: document.querySelector("#cebuano-pair-detail"),
};

const formatNumber = number => new Intl.NumberFormat("en-PH").format(number);
const formatScore = value => (
  value === null || value === undefined || Number.isNaN(Number(value))
    ? "—"
    : Number(value).toFixed(3)
);
const escapeHTML = value => String(value || "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function reasonLabel(reason) {
  return {
    jaro_winkler: "spelling",
    edit_similarity: "edit distance",
    orthographic_phonetic_agreement: "spelling + phonetic",
    soundex_exact: "Soundex",
    filipino_phonology_experimental: "legacy Philippine spelling baseline",
    pronunciation_lattice_experimental: "legacy pronunciation lattice",
    pronunciation_lattice_weighted: "weighted pronunciation lattice",
    experimental_multifeature_ensemble: "multi-feature ensemble",
    numeric_strength_or_version_distinction: "numeric distinction down-weighted",
  }[reason] || reason.replaceAll("_", " ");
}

function classificationLabel(classification) {
  return {
    verified_lasa_pair: "Verified LASA pair",
    potential_lasa_pair: "Potential LASA pair",
    spelling_variant_or_probable_typo: "Spelling variant or probable typo",
    normalization_duplicate: "Normalization duplicate",
    false_positive: "False positive",
  }[classification] || String(classification || "Unclassified").replaceAll("_", " ");
}

function pronunciationProfileStatus(row) {
  return row.pronunciationProfileStatus || "not_exported";
}

function pronunciationProfileStatusText(row) {
  return {
    profiled: "Profiled in the batch pronunciation lattice; selected path provenance is shown below.",
    not_profiled_complex_name: "Intentional unprofiled boundary: the complex name exceeded the bounded batch-profile shape, so no selected paths were generated.",
    not_profiled_no_supported_paths: "No supported batch pronunciation path was produced; this is a data-review boundary, not a browser-pronunciation result.",
    not_scored_first_pass: "Pronunciation scoring was deferred during first-pass spelling screening, so no selected path was exported.",
    not_exported: "Pronunciation-profile status was not included in this data export.",
  }[pronunciationProfileStatus(row)]
    || `Batch pronunciation status: ${pronunciationProfileStatus(row)}.`;
}

function selectedPathData(row, side) {
  return {
    path: row[`path${side}`] || "",
    label: row[`pathLabel${side}`] || "",
    route: row[`pathRoute${side}`] || "",
    evidence: row[`pathEvidence${side}`] || "",
    source: row[`pathSource${side}`] || "",
    cost: row[`pathCost${side}`],
    coverage: row[`pathCoverage${side}`],
    ruleIds: row[`pathRuleIds${side}`],
    ipa: row[`pathIpa${side}`] || "",
  };
}

function selectedPathRules(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "").split("|").map(value => value.trim()).filter(Boolean);
}

function selectedPathText(row, side) {
  const path = selectedPathData(row, side);
  if (path.path) return path.path;
  return {
    not_profiled_complex_name: "No selected path — intentionally not batch-profiled for this complex name.",
    not_profiled_no_supported_paths: "No selected path — the batch engine produced no supported path.",
    not_scored_first_pass: "No selected path — pronunciation scoring was deferred in the first pass.",
  }[pronunciationProfileStatus(row)] || "No selected path was exported.";
}

function selectedPathProvenance(row, side) {
  const path = selectedPathData(row, side);
  if (!path.path) return selectedPathText(row, side);
  const rules = selectedPathRules(path.ruleIds);
  return [
    path.route,
    path.evidence,
    path.source ? `source: ${path.source}` : "source: not exported",
    path.cost === null || path.cost === undefined ? "" : `cost ${formatScore(path.cost)}`,
    path.coverage === null || path.coverage === undefined ? "" : `coverage ${formatScore(path.coverage)}`,
    rules.length ? `rules: ${rules.join(", ")}` : "rules: none recorded",
  ].filter(Boolean).join(" · ");
}

function selectedPathIpa(row, side) {
  const path = selectedPathData(row, side);
  if (path.ipa) return path.ipa;
  return path.path ? "IPA not exported." : selectedPathText(row, side);
}

function compactPathLine(row, side) {
  const path = selectedPathData(row, side);
  const label = path.label || `${side} path`;
  if (path.path) {
    return `<span>${escapeHTML(label)}: <code>${escapeHTML(path.path)}</code></span>`;
  }
  return `<span>${escapeHTML(label)}: ${escapeHTML(selectedPathText(row, side))}</span>`;
}

function cebuanoLabels(row) {
  const reasons = new Set(row.reasons || []);
  return Object.entries(CEBUANO_REASON_KEYS)
    .filter(([, keys]) => keys.some(key => reasons.has(key)))
    .map(([name]) => ({
      transform: "legacy spelling baseline",
      lattice: "weighted pronunciation lattice",
      ensemble: "multi-feature ensemble",
    }[name]));
}

function isCebuanoRow(row) {
  return cebuanoLabels(row).length > 0;
}

function filterBySignal(row, signal) {
  if (!signal) return true;
  return CEBUANO_REASON_KEYS[signal].some(key => (row.reasons || []).includes(key));
}

function applyFilters() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const signal = elements.signal.value;
  const priority = elements.priority.value;
  state.filtered = state.rows.filter(row => {
    const namesMatch = !query || [row.a, row.b].some(name =>
      String(name || "").toLocaleLowerCase().includes(query));
    const signalMatch = filterBySignal(row, signal);
    const priorityMatch = !priority || row.priority === priority;
    return namesMatch && signalMatch && priorityMatch;
  });
  state.page = 1;
  render();
}

function render() {
  const totalPages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * PAGE_SIZE;
  const rows = state.filtered.slice(start, start + PAGE_SIZE);
  elements.count.textContent = formatNumber(state.filtered.length);
  elements.pageLabel.textContent = `Page ${state.page} of ${totalPages}`;
  elements.previous.disabled = state.page <= 1;
  elements.next.disabled = state.page >= totalPages;
  elements.empty.hidden = rows.length > 0;
  elements.results.innerHTML = rows.map(row => `<tr>
    <td class="name-cell" data-label="Name A"><button data-id="${escapeHTML(row.id)}">${escapeHTML(row.a)}</button><small>${escapeHTML(row.at)}</small></td>
    <td class="name-cell" data-label="Name B"><button data-id="${escapeHTML(row.id)}">${escapeHTML(row.b)}</button><small>${escapeHTML(row.bt)}</small></td>
    <td class="pair-path-cell" data-label="Selected paths / batch status">
      ${compactPathLine(row, "A")}
      ${compactPathLine(row, "B")}
    </td>
    <td class="metric" data-label="Looks"><strong>${formatScore(row.jw)}</strong><span>Jaro-Winkler</span></td>
    <td class="metric" data-label="Sounds"><strong>${formatScore(row.lattice)}</strong><span>cost-weighted</span></td>
    <td class="metric" data-label="Ensemble"><strong>${formatScore(row.ensemble)}</strong><span>combined</span></td>
    <td class="reason-list" data-label="Signals">
      <div class="signal-pills">${cebuanoLabels(row).map(label => `<b>${escapeHTML(label)}</b>`).join(" ")}</div>
    </td>
  </tr>`).join("");
}

function detailArticle(label, value) {
  return `<article><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></article>`;
}

function showDetails(id) {
  const row = state.rows.find(candidate => candidate.id === id);
  if (!row) return;
  elements.title.textContent = `${row.a} ↔ ${row.b}`;
  elements.summary.className = "relationship-summary same-generic";
  elements.summary.innerHTML = `<strong>${escapeHTML(row.priority)} priority candidate</strong>
    <span>${escapeHTML(classificationLabel(row.classification))}. Cebuano-aware signal(s): ${escapeHTML(cebuanoLabels(row).join(", "))}. ${escapeHTML(pronunciationProfileStatusText(row))} This is still unverified and needs human review.</span>`;
  const pathA = selectedPathData(row, "A");
  const pathB = selectedPathData(row, "B");
  const details = [
    ["Comparison type", String(row.mode || "").replaceAll("_", " ↔ ")],
    ["Classification basis", row.classificationBasis],
    ["Jaro-Winkler spelling", formatScore(row.jw)],
    ["Edit similarity", `${formatScore(row.edit)} (${row.distance || 0} edits)`],
    ["Legacy Filipino/Philippine spelling baseline", formatScore(row.legacyFilipino ?? row.filipino)],
    ["Pronunciation lattice (cost-weighted)", formatScore(row.lattice)],
    ["Raw best path similarity", formatScore(row.rawLattice)],
    ["Weighted phoneme alignment", formatScore(row.phoneme)],
    ["Syllable alignment", formatScore(row.syllable)],
    ["Orthographic bigrams", formatScore(row.bigram)],
    ["Multi-feature ensemble", formatScore(row.ensemble)],
    ["Numeric strength/version penalty", `-${formatScore(row.numberPenalty)}`],
    ["Pronunciation-profile status", pronunciationProfileStatusText(row)],
    [`${row.a} path · ${pathA.label || "no selected path"}`, selectedPathText(row, "A")],
    [`${row.a} provenance`, selectedPathProvenance(row, "A")],
    [`${row.a} IPA`, selectedPathIpa(row, "A")],
    [`${row.b} path · ${pathB.label || "no selected path"}`, selectedPathText(row, "B")],
    [`${row.b} provenance`, selectedPathProvenance(row, "B")],
    [`${row.b} IPA`, selectedPathIpa(row, "B")],
    ["All trigger signals", (row.reasons || []).map(reasonLabel).join(" · ")],
    ["Review status", "Unverified - human review required"],
  ];
  elements.detail.innerHTML = `<article class="experimental-detail-note">
    <span>How to read this page</span>
    <strong>These rows are screening candidates. The pronunciation lattice is cost-weighted and route provenance is shown below; none of the scores confirms medication confusion.</strong>
  </article>${details.map(([label, value]) => detailArticle(label, value)).join("")}`;
  elements.dialog.showModal();
}

async function loadData() {
  const rows = await fetch("data/review_queue.json").then(response => response.json());
  state.rows = rows
    .filter(isCebuanoRow)
    .sort((first, second) =>
      (second.priority === "high") - (first.priority === "high")
      || second.ensemble - first.ensemble
      || second.lattice - first.lattice
      || first.a.localeCompare(second.a));
  applyFilters();
}

[elements.search, elements.signal, elements.priority].forEach(control => {
  control.addEventListener("input", applyFilters);
});
elements.previous.addEventListener("click", () => { state.page -= 1; render(); });
elements.next.addEventListener("click", () => { state.page += 1; render(); });
elements.results.addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");
  if (button) showDetails(button.dataset.id);
});

loadData().catch(error => {
  elements.pageLabel.textContent = "Data could not load";
  elements.results.innerHTML = `<tr><td colspan="7">Could not load Cebuano pair data: ${escapeHTML(error.message)}</td></tr>`;
});
