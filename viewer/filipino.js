const PAGE_SIZE = 30;
const state = { rows: [], filtered: [], page: 1, allReviewCount: 0 };
const escapeHTML = value => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const elements = {
  search: document.querySelector("#filipino-search"), mode: document.querySelector("#filipino-mode"),
  count: document.querySelector("#filipino-count"), allCount: document.querySelector("#all-review-count"),
  page: document.querySelector("#filipino-page"), results: document.querySelector("#filipino-results"),
  previous: document.querySelector("#filipino-previous"), next: document.querySelector("#filipino-next")
};
function render() {
  const pages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
  state.page = Math.min(state.page, pages);
  const rows = state.filtered.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
  elements.count.textContent = state.filtered.length.toLocaleString("en-PH");
  elements.page.textContent = `Page ${state.page} of ${pages}`;
  elements.previous.disabled = state.page === 1; elements.next.disabled = state.page === pages;
  elements.results.innerHTML = rows.map(row => `<tr>
    <td data-label="Name A"><strong>${escapeHTML(row.a)}</strong><small class="block-label">${escapeHTML(row.at)}</small></td>
    <td data-label="Name B"><strong>${escapeHTML(row.b)}</strong><small class="block-label">${escapeHTML(row.bt)}</small></td>
    <td class="metric" data-label="Spelling"><strong>${row.jw.toFixed(3)}</strong><span>Jaro–Winkler</span></td>
    <td class="metric" data-label="Pronunciation lattice"><strong>${row.lattice.toFixed(3)}</strong><span>best controlled path</span></td>
    <td class="metric" data-label="Feature ensemble"><strong>${row.ensemble.toFixed(3)}</strong><span>fixed weights · experimental</span></td>
    <td data-label="Selected paths"><strong>${escapeHTML(row.pathA)}</strong><span class="path-arrow">↔</span><strong>${escapeHTML(row.pathB)}</strong>
      <small class="block-label">${escapeHTML(row.pathLabelA)} · ${escapeHTML(row.pathLabelB)}</small></td>
    <td data-label="Review status"><span class="classification-label potential">Unverified candidate</span></td>
  </tr>`).join("");
}
function filter() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const mode = elements.mode.value;
  state.filtered = state.rows.filter(row =>
    (!query || `${row.a} ${row.b}`.toLocaleLowerCase().includes(query))
    && (!mode || row.mode === mode)
  );
  state.page = 1; render();
}
fetch("data/review_queue.json").then(response => response.json()).then(rows => {
  state.allReviewCount = rows.length;
  elements.allCount.textContent = rows.length.toLocaleString("en-PH");
  state.rows = rows.filter(row => row.reasons.some(reason => [
    "filipino_phonology_experimental",
    "pronunciation_lattice_experimental",
    "experimental_multifeature_ensemble",
  ].includes(reason))).sort((a,b) => b.ensemble - a.ensemble || b.rank - a.rank);
  state.filtered = state.rows; render();
});
elements.search.addEventListener("input", filter);
elements.mode.addEventListener("input", filter);
elements.previous.addEventListener("click", () => { state.page--; render(); });
elements.next.addEventListener("click", () => { state.page++; render(); });
