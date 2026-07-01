import {
  normalizeName,
  pronunciationPaths,
  scoreNames,
  trigrams,
} from "./cebuano-core.js";

const state = {
  names: [],
  pairs: [],
  exactIndex: new Map(),
  gramIndex: new Map(),
  pairIndex: new Map(),
  adjacency: new Map(),
  loaded: false,
};

const elements = {
  modeButtons: [...document.querySelectorAll(".cebuano-mode-switch button")],
  searchPanel: document.querySelector("#search-mode-panel"),
  comparePanel: document.querySelector("#compare-mode-panel"),
  searchForm: document.querySelector("#candidate-search-form"),
  query: document.querySelector("#candidate-query"),
  searchButton: document.querySelector("#candidate-search-form button"),
  searchStatus: document.querySelector("#candidate-search-status"),
  interpretationResults: document.querySelector("#interpretation-results"),
  interpretationCount: document.querySelector("#interpretation-result-count"),
  interpretationList: document.querySelector("#interpretation-list"),
  results: document.querySelector("#candidate-results"),
  resultsTitle: document.querySelector("#candidate-results-title"),
  resultCount: document.querySelector("#candidate-result-count"),
  resultsBody: document.querySelector("#candidate-results-body"),
  compareForm: document.querySelector("#drug-compare-form"),
  firstDrug: document.querySelector("#first-drug"),
  secondDrug: document.querySelector("#second-drug"),
  compareButton: document.querySelector("#drug-compare-form button"),
  compareStatus: document.querySelector("#compare-status"),
  comparisonResult: document.querySelector("#comparison-result"),
};

const escapeHTML = value => String(value || "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const scoreText = value => Number(value).toFixed(3);
const pairKey = (first, second) => first < second ? `${first}:${second}` : `${second}:${first}`;

function scoreBand(score) {
  if (score >= 0.90) return ["Very high name similarity", "high"];
  if (score >= 0.80) return ["High name similarity", "high"];
  if (score >= 0.70) return ["Moderate name similarity", "medium"];
  return ["Lower name similarity", "low"];
}

function buildIndexes() {
  state.names.forEach((name, index) => {
    if (!state.exactIndex.has(name.normalized)) state.exactIndex.set(name.normalized, []);
    state.exactIndex.get(name.normalized).push(index);
    const grams = new Set(name.paths.flatMap(trigrams));
    grams.forEach(gram => {
      if (!state.gramIndex.has(gram)) state.gramIndex.set(gram, []);
      state.gramIndex.get(gram).push(index);
    });
  });
  state.pairs.forEach((pair, pairPosition) => {
    state.pairIndex.set(pairKey(pair.a, pair.b), pair);
    for (const namePosition of [pair.a, pair.b]) {
      if (!state.adjacency.has(namePosition)) state.adjacency.set(namePosition, []);
      state.adjacency.get(namePosition).push(pairPosition);
    }
  });
}

function shortlist(query, queryPaths) {
  const normalized = normalizeName(query);
  const exact = state.exactIndex.get(normalized) || [];
  const overlap = new Map(exact.map(index => [index, 1000]));
  for (const gram of new Set(queryPaths.flatMap(trigrams))) {
    for (const index of state.gramIndex.get(gram) || []) {
      overlap.set(index, (overlap.get(index) || 0) + 1);
    }
  }
  let indexes = [...overlap.entries()]
    .sort((first, second) => second[1] - first[1])
    .slice(0, 350)
    .map(([index]) => index);
  if (indexes.length < 40) {
    indexes = state.names
      .map((name, index) => ({ name, index }))
      .filter(({ name }) => Math.abs(name.normalized.length - normalized.length) <= Math.max(5, normalized.length * 0.55))
      .slice(0, 1200)
      .map(({ index }) => index);
  }
  return [...new Set([...exact, ...indexes])];
}

function resolveNames(query, limit = 3) {
  const normalized = normalizeName(query);
  if (normalized.length < 3) return [];
  const queryPaths = pronunciationPaths(query);
  const seen = new Set();
  return shortlist(query, queryPaths)
    .map(index => {
      const name = state.names[index];
      return {
        index,
        name,
        scores: scoreNames(query, name.name, queryPaths, name.paths),
      };
    })
    .filter(result => result.scores.overall >= 0.58)
    .sort((first, second) =>
      second.scores.overall - first.scores.overall
      || (first.name.type === second.name.type ? 0 : first.name.type === "generic" ? -1 : 1)
      || first.name.name.localeCompare(second.name.name))
    .filter(result => {
      const key = `${result.name.normalized}:${result.name.type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

function renderCandidateRows(targetIndex) {
  const pairPositions = state.adjacency.get(targetIndex) || [];
  return pairPositions
    .map(position => {
      const pair = state.pairs[position];
      const otherIndex = pair.a === targetIndex ? pair.b : pair.a;
      return { pair, name: state.names[otherIndex] };
    })
    .sort((first, second) => second.pair.overall - first.pair.overall)
    .slice(0, 15);
}

function fallbackCandidateRows(targetIndex) {
  const target = state.names[targetIndex];
  return shortlist(target.name, target.paths)
    .filter(index => index !== targetIndex)
    .map(index => {
      const name = state.names[index];
      const scores = scoreNames(target.name, name.name, target.paths, name.paths);
      return {
        name,
        pair: {
          visual: scores.visual,
          sound: scores.sound,
          edit: scores.edit,
          syllable: scores.syllable,
          overall: scores.overall,
          priority: scores.overall >= 0.85 ? "high" : "medium",
        },
      };
    })
    .filter(result => result.pair.overall >= 0.68)
    .sort((first, second) => second.pair.overall - first.pair.overall)
    .slice(0, 15);
}

function showCandidateResults(targetIndex) {
  const target = state.names[targetIndex];
  let rows = renderCandidateRows(target.index);
  const usedPrecomputedQueue = rows.length > 0;
  if (!rows.length) rows = fallbackCandidateRows(target.index);
  elements.searchStatus.innerHTML = `You selected <strong>${escapeHTML(target.name)}</strong> (${escapeHTML(target.type)}). The list below ranks potentially confusable names; it does not confirm a LASA relationship.`;
  elements.resultsTitle.textContent = `Names similar to ${target.name}`;
  elements.resultCount.textContent = `${rows.length} candidate${rows.length === 1 ? "" : "s"}`;
  elements.resultsBody.innerHTML = rows.map(({ pair, name }) => `<tr>
    <td class="name-cell" data-label="Potentially confusable name"><strong>${escapeHTML(name.name)}</strong></td>
    <td data-label="Type"><span class="mode-label">${escapeHTML(name.type)}</span></td>
    <td class="metric" data-label="Looks alike"><strong>${scoreText(pair.visual)}</strong><span>spelling</span></td>
    <td class="metric" data-label="Sounds alike"><strong>${scoreText(pair.sound)}</strong><span>rule-based</span></td>
    <td class="metric" data-label="Rank score"><strong>${scoreText(pair.overall)}</strong><span>not probability</span></td>
    <td data-label="Priority"><span class="badge ${escapeHTML(pair.priority)}">${escapeHTML(pair.priority)}</span></td>
  </tr>`).join("");
  if (!rows.length) {
    elements.resultsBody.innerHTML = `<tr><td colspan="6" data-label="Result">No candidate passed the experimental display threshold.</td></tr>`;
  }
  elements.resultCount.title = usedPrecomputedQueue
    ? "Candidates from the precomputed LASA review queue"
    : "Candidates calculated on demand";
  elements.results.hidden = false;
}

function searchCandidates(event) {
  event.preventDefault();
  elements.interpretationResults.hidden = true;
  elements.results.hidden = true;
  const query = elements.query.value.trim();
  const matches = resolveNames(query, 5);
  if (!matches.length) {
    elements.searchStatus.innerHTML = `<strong>No likely registered names found.</strong> Try another spelling or a longer part of the medicine name.`;
    return;
  }
  elements.searchStatus.innerHTML = `<strong>“${escapeHTML(query)}” produced ${matches.length} possible registered-name interpretation${matches.length === 1 ? "" : "s"}.</strong> Rankings are suggestions, not identification. Select the intended official name before viewing confusable-name candidates.`;
  elements.interpretationCount.textContent = `${matches.length} ranked option${matches.length === 1 ? "" : "s"}`;
  elements.interpretationList.innerHTML = matches.map((match, index) => `<li>
    <span class="interpretation-rank">${index + 1}</span>
    <div><strong>${escapeHTML(match.name.name)}</strong><small>${escapeHTML(match.name.type)}</small></div>
    <div class="interpretation-signals">
      <span><strong>${scoreText(match.scores.visual)}</strong><small>Looks alike</small></span>
      <span><strong>${scoreText(match.scores.sound)}</strong><small>Sounds alike</small></span>
      <span><strong>${scoreText(match.scores.overall)}</strong><small>Overall rank</small></span>
    </div>
    <button type="button" data-name-index="${match.index}" aria-pressed="false">Select this name</button>
  </li>`).join("");
  elements.interpretationResults.hidden = false;
}

function comparisonMetric(label, score, note) {
  return `<article><span>${escapeHTML(label)}</span><strong>${scoreText(score)}</strong><small>${escapeHTML(note)}</small></article>`;
}

function compareDrugs(event) {
  event.preventDefault();
  elements.comparisonResult.hidden = true;
  const firstValue = elements.firstDrug.value.trim();
  const secondValue = elements.secondDrug.value.trim();
  const firstMatches = resolveNames(firstValue, 5);
  const secondMatches = resolveNames(secondValue, 5);
  if (!firstMatches.length || !secondMatches.length) {
    elements.compareStatus.innerHTML = `<strong>One or both entries have no likely registered-name options.</strong> Try a longer or more exact medicine name.`;
    return;
  }
  const first = firstMatches.find(match => match.name.normalized === normalizeName(firstValue));
  const second = secondMatches.find(match => match.name.normalized === normalizeName(secondValue));
  if (!first || !second) {
    const suggestionGroup = (label, target, matches) => `
      <div><strong>${escapeHTML(label)}:</strong>${matches.slice(0, 3).map(match =>
        `<button type="button" data-compare-target="${target}" data-name-index="${match.index}">${escapeHTML(match.name.name)} (${escapeHTML(match.name.type)}) · ${scoreText(match.scores.overall)}</button>`
      ).join("")}</div>`;
    elements.compareStatus.innerHTML = `<strong>Confirm the registered names before comparison.</strong>
      <div class="compare-suggestions">
        ${first ? "" : suggestionGroup("First entry options", "first", firstMatches)}
        ${second ? "" : suggestionGroup("Second entry options", "second", secondMatches)}
      </div>`;
    return;
  }
  if (first.index === second.index) {
    elements.compareStatus.innerHTML = `<strong>Both entries resolved to ${escapeHTML(first.name.name)}.</strong> Choose two different medicine names.`;
    return;
  }
  const stored = state.pairIndex.get(pairKey(first.index, second.index));
  const live = scoreNames(first.name.name, second.name.name, first.name.paths, second.name.paths);
  const scores = stored || {
    visual: live.visual,
    sound: live.sound,
    edit: live.edit,
    syllable: live.syllable,
    overall: live.overall,
    priority: live.overall >= 0.85 ? "high" : live.overall >= 0.70 ? "medium" : "screening",
  };
  const [band, bandClass] = scoreBand(scores.overall);
  elements.compareStatus.innerHTML = `Comparing <strong>${escapeHTML(first.name.name)}</strong> (${escapeHTML(first.name.type)}) with <strong>${escapeHTML(second.name.name)}</strong> (${escapeHTML(second.name.type)}).`;
  elements.comparisonResult.innerHTML = `
    <div class="comparison-summary ${bandClass}">
      <div><p class="eyebrow">Experimental result</p><h3>${escapeHTML(band)}</h3></div>
      <strong>${scoreText(scores.overall)}</strong>
    </div>
    <div class="comparison-metrics">
      ${comparisonMetric("Looks alike", scores.visual, "spelling similarity")}
      ${comparisonMetric("Sounds alike", scores.sound, "localized reading similarity")}
      ${comparisonMetric("Syllable similarity", scores.syllable, "approximate spoken chunks")}
      ${comparisonMetric("Overall rank", scores.overall, "screening score, not probability")}
    </div>
    <p class="comparison-note">${stored
      ? "This pair is present in the precomputed LASA review queue."
      : "This pair is not in the precomputed review queue; the score was calculated on demand using the lightweight rule-based matcher."
    } Similarity alone does not establish a LASA classification.</p>`;
  elements.comparisonResult.hidden = false;
}

function switchMode(button) {
  const searchMode = button.id === "search-mode-button";
  elements.modeButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  elements.searchPanel.hidden = !searchMode;
  elements.comparePanel.hidden = searchMode;
}

async function loadData() {
  try {
    const response = await fetch("data/cebuano_tools.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state.names = data.names.map(([id, name, type, normalized, paths], index) => ({
      id, name, type, normalized, paths, index,
    }));
    state.pairs = data.pairs.map(([a, b, visual, sound, edit, syllable, overall, priority]) => ({
      a, b, visual, sound, edit, syllable, overall, priority,
    }));
    buildIndexes();
    state.loaded = true;
    elements.searchButton.disabled = false;
    elements.compareButton.disabled = false;
    elements.searchStatus.textContent = `${state.names.length.toLocaleString("en-PH")} registered names ready.`;
    elements.compareStatus.textContent = "Enter two medicine names to compare.";
  } catch (error) {
    const message = `The Cebuano-aware data could not load: ${error.message}`;
    elements.searchStatus.textContent = message;
    elements.compareStatus.textContent = message;
  }
}

elements.modeButtons.forEach(button => button.addEventListener("click", () => switchMode(button)));
elements.searchForm.addEventListener("submit", searchCandidates);
elements.interpretationList.addEventListener("click", event => {
  const button = event.target.closest("button[data-name-index]");
  if (!button) return;
  elements.interpretationList.querySelectorAll("button").forEach(item => {
    const selected = item === button;
    item.classList.toggle("selected", selected);
    item.setAttribute("aria-pressed", String(selected));
    item.textContent = selected ? "Selected" : "Select this name";
  });
  showCandidateResults(Number(button.dataset.nameIndex));
});
elements.compareForm.addEventListener("submit", compareDrugs);
elements.compareStatus.addEventListener("click", event => {
  const button = event.target.closest("button[data-compare-target][data-name-index]");
  if (!button) return;
  const name = state.names[Number(button.dataset.nameIndex)];
  const input = button.dataset.compareTarget === "first" ? elements.firstDrug : elements.secondDrug;
  input.value = name.name;
  input.focus();
});
loadData();
