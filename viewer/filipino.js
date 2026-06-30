const PAGE_SIZE = 30;
const state = { rows: [], filtered: [], page: 1 };
const escapeHTML = value => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const elements = {
  search: document.querySelector("#filipino-search"), count: document.querySelector("#filipino-count"),
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
    <td><strong>${escapeHTML(row.a)}</strong><small class="block-label">${escapeHTML(row.at)}</small></td>
    <td><strong>${escapeHTML(row.b)}</strong><small class="block-label">${escapeHTML(row.bt)}</small></td>
    <td class="metric"><strong>${row.jw.toFixed(3)}</strong><span>Jaro–Winkler</span></td>
    <td class="metric"><strong>${row.filipino.toFixed(3)}</strong><span>experimental</span></td>
    <td class="metric"><strong>${(row.filipino - row.jw >= 0 ? "+" : "") + (row.filipino - row.jw).toFixed(3)}</strong><span>score change</span></td>
    <td><span class="classification-label potential">Unverified candidate</span></td>
  </tr>`).join("");
}
function filter() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  state.filtered = query ? state.rows.filter(row => `${row.a} ${row.b}`.toLocaleLowerCase().includes(query)) : state.rows;
  state.page = 1; render();
}
fetch("data/review_queue.json").then(response => response.json()).then(rows => {
  state.rows = rows.filter(row => row.reasons.includes("filipino_phonology_experimental"))
    .sort((a,b) => b.filipino - a.filipino || b.rank - a.rank);
  state.filtered = state.rows; render();
});
elements.search.addEventListener("input", filter);
elements.previous.addEventListener("click", () => { state.page--; render(); });
elements.next.addEventListener("click", () => { state.page++; render(); });
