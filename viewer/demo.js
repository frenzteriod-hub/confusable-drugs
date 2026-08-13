import { installThemeToggle } from "./modules/theme.js?v=20260811-1";

installThemeToggle();

const roots = [
  ["Alvena", "Alvina"], ["Brimora", "Brinora"], ["Calvexa", "Calvesa"], ["Dorevia", "Dorebia"],
  ["Elunor", "Elonor"], ["Ferixa", "Perixa"], ["Galvion", "Galbion"], ["Helvora", "Helbora"],
  ["Iveron", "Iberon"], ["Juvexa", "Jubexa"], ["Kelvion", "Kelbion"], ["Lumera", "Lomera"],
  ["Monvexa", "Monbexa"], ["Norevia", "Norebia"], ["Orliven", "Orleben"], ["Pelvora", "Felvora"],
  ["Quinexa", "Kinexa"], ["Ravion", "Rabion"], ["Selmora", "Selmura"], ["Torvena", "Torbena"],
  ["Ulvexa", "Olvexa"], ["Virelon", "Birelon"], ["Wenora", "Winora"], ["Xelvion", "Selvion"],
];
const modifiers = ["A", "B", "C", "D", "E"];
const labels = ["lasa", "not_lasa", "discussion"];
const labelNames = { lasa: "LASA", not_lasa: "Not LASA", discussion: "Needs discussion" };

const pairs = modifiers.flatMap((modifier, modifierIndex) => roots.map((root, rootIndex) => {
  const index = modifierIndex * roots.length + rootIndex;
  return {
    id: `DEMO-${String(index + 1).padStart(3, "0")}`,
    a: `Simu-${root[0]} ${modifier}`,
    b: `Simu-${root[1]} ${modifier}`,
    type: index % 4 === 0 ? "Generic ↔ Brand" : "Brand ↔ Brand",
    reviews: 1 + ((index * 7) % 3),
    agreement: index % 7 === 0 ? "Needs discussion" : index % 3 === 0 ? "LASA majority" : "Not LASA majority",
  };
}));

const practice = pairs.map(() => ({ label: "", comment: "" }));
let pairIndex = 0;
let tablePage = 0;
let tableMatches = pairs;

const q = selector => document.querySelector(selector);
const qa = selector => [...document.querySelectorAll(selector)];
const elements = {
  simulationTitle: q("#simulation-title"), simulationDescription: q("#simulation-description"),
  reviewerView: q("#demo-reviewer-view"), adminView: q("#demo-admin-view"),
  pairNumber: q("#demo-pair-number"), pairType: q("#demo-pair-type"), nameA: q("#demo-name-a"), nameB: q("#demo-name-b"),
  comment: q("#demo-comment"), autosave: q("#demo-autosave"), saveStatus: q("#demo-save-status"),
  previousPair: q("#demo-previous-pair"), nextPair: q("#demo-next-pair"), saveButton: q("#demo-save-button"),
  reviewedCount: q("#demo-reviewed-count"), lasaCount: q("#demo-lasa-count"), notLasaCount: q("#demo-not-lasa-count"), discussionCount: q("#demo-discussion-count"),
  progressRing: q("#demo-progress-ring"), historyCount: q("#demo-history-count"), historyList: q("#demo-history-list"), emptyHistory: q("#demo-empty-history"),
  evidenceButton: q("#demo-evidence-button"), evidenceDialog: q("#demo-evidence-dialog"), evidenceTitle: q("#demo-evidence-title"), evidenceRecords: q("#demo-evidence-records"),
  reviewerProgress: q("#demo-reviewer-progress"), labelDistribution: q("#demo-label-distribution"),
  candidateSearch: q("#demo-candidate-search"), candidateRows: q("#demo-candidate-rows"), tableSummary: q("#demo-table-summary"), tablePrevious: q("#demo-table-previous"), tableNext: q("#demo-table-next"),
};

function selectRole(role) {
  const reviewer = role === "reviewer";
  qa("[data-demo-role]").forEach(button => {
    const selected = button.dataset.demoRole === role;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  elements.reviewerView.hidden = !reviewer;
  elements.adminView.hidden = reviewer;
  elements.simulationTitle.textContent = reviewer ? "Reviewer perspective" : "Administrator perspective";
  elements.simulationDescription.textContent = reviewer
    ? "Practice the same score-blind decision flow used by an expert reviewer."
    : "Explore simulated progress, human-label summaries, and the shared candidate workload.";
}

function selectedLabel() { return q('input[name="demo-label"]:checked')?.value || ""; }

function saveCurrent(showStatus = true) {
  const label = selectedLabel();
  if (!label) {
    if (showStatus) elements.saveStatus.textContent = "Choose a label before saving";
    return false;
  }
  practice[pairIndex] = { label, comment: elements.comment.value.trim() };
  if (showStatus) elements.saveStatus.textContent = "Practice decision saved in this session";
  renderProgress();
  return true;
}

function renderPair() {
  const pair = pairs[pairIndex];
  const response = practice[pairIndex];
  elements.pairNumber.textContent = `Pair ${pairIndex + 1} of ${pairs.length}`;
  elements.pairType.textContent = pair.type;
  elements.nameA.textContent = pair.a;
  elements.nameB.textContent = pair.b;
  qa('input[name="demo-label"]').forEach(input => { input.checked = input.value === response.label; });
  elements.comment.value = response.comment;
  elements.previousPair.disabled = pairIndex === 0;
  elements.nextPair.textContent = pairIndex === pairs.length - 1 ? "Return to first pair ↺" : "Next pair →";
  elements.saveStatus.textContent = response.label ? "Practice decision saved in this session" : "Choose a label to continue";
}

function renderProgress() {
  const reviewed = practice.filter(item => item.label);
  const counts = Object.fromEntries(labels.map(label => [label, reviewed.filter(item => item.label === label).length]));
  elements.reviewedCount.textContent = reviewed.length;
  elements.lasaCount.textContent = counts.lasa;
  elements.notLasaCount.textContent = counts.not_lasa;
  elements.discussionCount.textContent = counts.discussion;
  elements.historyCount.textContent = reviewed.length;
  elements.progressRing.style.setProperty("--demo-progress", `${(reviewed.length / pairs.length) * 100}%`);
  const recent = practice.map((item, index) => ({ ...item, index })).filter(item => item.label).slice(-5).reverse();
  elements.emptyHistory.hidden = recent.length > 0;
  elements.historyList.innerHTML = recent.map(item => `<li><button type="button" data-history-index="${item.index}"><strong>${pairs[item.index].a} ↔ ${pairs[item.index].b}</strong><span>${labelNames[item.label]}</span></button></li>`).join("");
  qa("[data-history-index]").forEach(button => button.addEventListener("click", () => { pairIndex = Number(button.dataset.historyIndex); renderPair(); }));
}

function showEvidence() {
  const pair = pairs[pairIndex];
  elements.evidenceTitle.textContent = `${pair.a} ↔ ${pair.b}`;
  elements.evidenceRecords.innerHTML = [pair.a, pair.b].map((name, index) => `<article><div><span>DEMO-CPR-${String(pairIndex * 2 + index + 1).padStart(4, "0")}</span><strong>${name}</strong></div><dl><div><dt>Generic name</dt><dd>Fictional demo ingredient ${pairIndex + index + 1}</dd></div><div><dt>Dosage form</dt><dd>${(pairIndex + index) % 2 ? "Capsule" : "Film-coated tablet"}</dd></div><div><dt>Strength</dt><dd>${100 + ((pairIndex + index) % 5) * 100} mg</dd></div><div><dt>Classification</dt><dd>Simulated record—not for medical use</dd></div></dl></article>`).join("");
  elements.evidenceDialog.showModal();
}

function renderAdmin() {
  const reviewers = [{ name: "Demo Reviewer 1", done: 91 }, { name: "Demo Reviewer 2", done: 84 }, { name: "Demo Reviewer 3", done: 74 }];
  elements.reviewerProgress.innerHTML = reviewers.map(reviewer => `<article><div><strong>${reviewer.name}</strong><span>${reviewer.done} / 120</span></div><i><b style="width:${reviewer.done / 1.2}%"></b></i><small>${Math.round(reviewer.done / 1.2)}% complete</small></article>`).join("");
  const distribution = [{ label: "LASA", count: 68 }, { label: "Not LASA", count: 153 }, { label: "Needs discussion", count: 28 }];
  elements.labelDistribution.innerHTML = distribution.map(item => `<article><div><strong>${item.label}</strong><span>${item.count}</span></div><i><b style="width:${item.count / 2.49}%"></b></i></article>`).join("");
  renderCandidateTable();
}

function renderCandidateTable() {
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(tableMatches.length / pageSize));
  tablePage = Math.min(tablePage, pageCount - 1);
  const start = tablePage * pageSize;
  const rows = tableMatches.slice(start, start + pageSize);
  elements.candidateRows.innerHTML = rows.length ? rows.map(pair => `<tr><td><strong>${pair.a}</strong><span>↔ ${pair.b}</span></td><td>${pair.type}</td><td>${pair.reviews} of 3</td><td><span class="demo-agreement">${pair.agreement}</span></td><td><button type="button" data-admin-evidence="${pair.id}">View</button></td></tr>`).join("") : `<tr><td colspan="5">No fictional candidates match this search.</td></tr>`;
  const end = Math.min(start + pageSize, tableMatches.length);
  elements.tableSummary.textContent = tableMatches.length ? `Showing ${start + 1}–${end} of ${tableMatches.length}` : "Showing 0 candidates";
  elements.tablePrevious.disabled = tablePage === 0;
  elements.tableNext.disabled = tablePage >= pageCount - 1;
  qa("[data-admin-evidence]").forEach(button => button.addEventListener("click", () => { pairIndex = pairs.findIndex(pair => pair.id === button.dataset.adminEvidence); showEvidence(); }));
}

qa("[data-demo-role]").forEach(button => button.addEventListener("click", () => selectRole(button.dataset.demoRole)));
qa('input[name="demo-label"]').forEach(input => input.addEventListener("change", () => {
  if (elements.autosave.checked) saveCurrent(); else elements.saveStatus.textContent = "Unsaved practice decision";
}));
elements.comment.addEventListener("input", () => { if (elements.autosave.checked && selectedLabel()) saveCurrent(false); });
elements.saveButton.addEventListener("click", () => saveCurrent());
elements.previousPair.addEventListener("click", () => { if (elements.autosave.checked && selectedLabel()) saveCurrent(false); pairIndex = Math.max(0, pairIndex - 1); renderPair(); });
elements.nextPair.addEventListener("click", () => { if (elements.autosave.checked && selectedLabel()) saveCurrent(false); pairIndex = pairIndex === pairs.length - 1 ? 0 : pairIndex + 1; renderPair(); });
elements.evidenceButton.addEventListener("click", showEvidence);
q("#demo-history-button").addEventListener("click", () => q("#demo-history-panel").scrollIntoView({ behavior: "smooth", block: "center" }));
q("#demo-candidates-button").addEventListener("click", () => q("#demo-candidate-table-panel").scrollIntoView({ behavior: "smooth", block: "start" }));
elements.candidateSearch.addEventListener("input", () => { const term = elements.candidateSearch.value.trim().toLowerCase(); tableMatches = pairs.filter(pair => `${pair.a} ${pair.b}`.toLowerCase().includes(term)); tablePage = 0; renderCandidateTable(); });
elements.tablePrevious.addEventListener("click", () => { tablePage = Math.max(0, tablePage - 1); renderCandidateTable(); });
elements.tableNext.addEventListener("click", () => { tablePage += 1; renderCandidateTable(); });

selectRole("reviewer");
renderPair();
renderProgress();
renderAdmin();
