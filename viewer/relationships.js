const PAGE_SIZE = 40;
const state = { groups: [], filtered: [], page: 1 };
const list = document.querySelector("#group-list");
const search = document.querySelector("#group-search");
const count = document.querySelector("#group-count");
const pageLabel = document.querySelector("#group-page");
const previous = document.querySelector("#group-previous");
const next = document.querySelector("#group-next");
const escapeHTML = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const modeLabel = mode => ({generic_generic:"Generic ↔ Generic",brand_brand:"Brand ↔ Brand",generic_brand:"Generic ↔ Brand"}[mode] || mode);
const classLabel = value => ({
  potential_lasa_pair:"Potential LASA pair", spelling_variant_or_probable_typo:"Spelling variant or probable typo",
  normalization_duplicate:"Normalization duplicate", verified_lasa_pair:"Verified LASA pair", false_positive:"False positive"
}[value] || value.replaceAll("_", " "));

function buildGroups(rows) {
  const map = new Map();
  const add = (id, name, type, otherId, otherName, otherType, row) => {
    if (!map.has(id)) map.set(id, { id, name, type, links: [] });
    map.get(id).links.push({ id: otherId, name: otherName, type: otherType, row });
  };
  rows.forEach(row => {
    add(row.aid, row.a, row.at, row.bid, row.b, row.bt, row);
    add(row.bid, row.b, row.bt, row.aid, row.a, row.at, row);
  });
  return [...map.values()].sort((a,b) => b.links.length - a.links.length || a.name.localeCompare(b.name));
}

function render() {
  const pages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
  state.page = Math.min(state.page, pages);
  const rows = state.filtered.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
  count.textContent = state.filtered.length.toLocaleString("en-PH");
  pageLabel.textContent = `Page ${state.page} of ${pages}`;
  previous.disabled = state.page === 1;
  next.disabled = state.page === pages;
  list.innerHTML = rows.map(group => `<details class="group-card">
    <summary><span><strong>${escapeHTML(group.name)}</strong><small>${escapeHTML(group.type)}</small></span>
      <b>${group.links.length} connection${group.links.length === 1 ? "" : "s"}</b></summary>
    <div class="connection-list">${group.links.sort((a,b) => b.row.rank - a.row.rank).map(link => `<article>
      <div><strong>${escapeHTML(link.name)}</strong><small>${escapeHTML(link.type)} · ${escapeHTML(modeLabel(link.row.mode))}</small></div>
      <div><span>${escapeHTML(classLabel(link.row.classification))}</span><b>${Number(link.row.jw).toFixed(3)}</b></div>
    </article>`).join("")}</div>
  </details>`).join("") || `<div class="empty-state"><strong>No medicine found</strong><span>Try a shorter name.</span></div>`;
}
function filter() {
  const query = search.value.trim().toLocaleLowerCase();
  state.filtered = query ? state.groups.filter(group => group.name.toLocaleLowerCase().includes(query)) : state.groups;
  state.page = 1; render();
}
fetch("data/review_queue.json").then(response => response.json()).then(rows => {
  state.groups = buildGroups(rows); state.filtered = state.groups; render();
});
search.addEventListener("input", filter);
previous.addEventListener("click", () => { state.page--; render(); });
next.addEventListener("click", () => { state.page++; render(); });
