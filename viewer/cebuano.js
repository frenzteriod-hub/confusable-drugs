import {
  browserPronunciationProfile,
  decodedPathDetailEntries,
  normalizeName,
  pronunciationPathsWithG2P,
  scoreNames,
  syllabify,
  trigrams,
} from "./cebuano-core.js?v=20260713-g2p-5";

const state = {
  names: [],
  pairs: [],
  exactIndex: new Map(),
  gramIndex: new Map(),
  pairIndex: new Map(),
  adjacency: new Map(),
  pronunciationModel: null,
  pathDetailsById: new Map(),
  pathDetailsPromise: null,
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
  resultsHead: document.querySelector(".cebuano-results-table thead"),
  compareForm: document.querySelector("#drug-compare-form"),
  firstDrug: document.querySelector("#first-drug"),
  secondDrug: document.querySelector("#second-drug"),
  compareButton: document.querySelector("#drug-compare-form button"),
  compareStatus: document.querySelector("#compare-status"),
  comparisonResult: document.querySelector("#comparison-result"),
  pronunciationPanel: document.querySelector("#pronunciation-mode-panel"),
  pronunciationForm: document.querySelector("#pronunciation-search-form"),
  pronunciationQuery: document.querySelector("#pronunciation-query"),
  pronunciationButton: document.querySelector("#pronunciation-search-form button"),
  pronunciationStatus: document.querySelector("#pronunciation-status"),
  pronunciationWorkbench: document.querySelector("#pronunciation-workbench"),
  pronunciationResults: document.querySelector("#pronunciation-results"),
  pronunciationCount: document.querySelector("#pronunciation-result-count"),
  pronunciationList: document.querySelector("#pronunciation-list"),
  pronunciationDetail: document.querySelector("#pronunciation-detail"),
};

const escapeHTML = value => String(value || "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const scoreText = value => Number(value).toFixed(3);
const pairKey = (first, second) => first < second ? `${first}:${second}` : `${second}:${first}`;

function profileStatusLabel(status) {
  return {
    profiled: "Batch profile available",
    not_profiled_complex_name: "Not batch-profiled",
    not_profiled_no_supported_paths: "No batch paths",
  }[status] || "Batch status unavailable";
}

function profileStatusNote(status) {
  return {
    not_profiled_complex_name: "The batch engine intentionally does not create pronunciation paths for this complex name. It exceeds the bounded name shape used to avoid cross-ingredient readings and path explosion; spelling-based screening still applies.",
    not_profiled_no_supported_paths: "The name was within the batch-profile bounds, but the batch engine produced no supported pronunciation path. This is a data-review case, not an invitation to substitute a browser reading.",
  }[status] || "The exported batch-profile status is not available for this name.";
}

function isIntentionalNoProfile(status) {
  return status === "not_profiled_complex_name"
    || status === "not_profiled_no_supported_paths";
}

function scoreBand(score) {
  if (score >= 0.90) return ["Very high name similarity", "high"];
  if (score >= 0.80) return ["High name similarity", "high"];
  if (score >= 0.70) return ["Moderate name similarity", "medium"];
  return ["Lower name similarity", "low"];
}

function syllableText(path) {
  return String(path || "")
    .split(/\s+/)
    .filter(Boolean)
    .map(word => {
      const parts = syllabify(word);
      return parts.length ? parts.join("-") : word;
    })
    .join(" ");
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

async function resolveNames(query, limit = 3) {
  const normalized = normalizeName(query);
  if (normalized.length < 3) return [];
  const queryPaths = await pronunciationPathsWithG2P(query);
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
    .slice(0, 100);
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
          matchBasis: scores.matchBasis,
          priority: scores.overall >= 0.85 ? "high" : "medium",
        },
      };
    })
    .filter(result => result.pair.overall >= 0.68)
    .sort((first, second) => second.pair.overall - first.pair.overall)
    .slice(0, 100);
}

// Current candidate list + active sort column (visual = looks, sound = sounds,
// overall = rank). Clicking a column header re-sorts without recomputing scores.
let candidateSort = { rows: [], key: "overall" };

function renderCandidateBody() {
  if (!candidateSort.rows.length) {
    elements.resultsBody.innerHTML = `<tr><td colspan="6" data-label="Result">No candidate passed the experimental display threshold.</td></tr>`;
    return;
  }
  const rows = [...candidateSort.rows].sort((first, second) =>
    second.pair[candidateSort.key] - first.pair[candidateSort.key]);
  elements.resultsBody.innerHTML = rows.map(({ pair, name }) => `<tr>
    <td class="name-cell" data-label="Potentially confusable name"><strong>${escapeHTML(name.name)}</strong></td>
    <td data-label="Type"><span class="mode-label">${escapeHTML(name.type)}</span></td>
    <td class="metric" data-label="Looks alike"><strong>${scoreText(pair.visual)}</strong><span>spelling</span></td>
    <td class="metric" data-label="Sounds alike"><strong>${scoreText(pair.sound)}</strong><span>${pair.matchBasis === "localized-reading" ? "via reading" : pair.matchBasis === "spelling" ? "via spelling" : "rule-based"}</span></td>
    <td class="metric" data-label="Rank score"><strong>${scoreText(pair.overall)}</strong><span>not probability</span></td>
    <td data-label="Priority"><span class="badge ${escapeHTML(pair.priority)}">${escapeHTML(pair.priority)}</span></td>
  </tr>`).join("");
}

function showCandidateResults(targetIndex) {
  const target = state.names[targetIndex];
  let rows = renderCandidateRows(target.index);
  const usedPrecomputedQueue = rows.length > 0;
  if (!rows.length) rows = fallbackCandidateRows(target.index);
  candidateSort.rows = rows;
  elements.searchStatus.innerHTML = `You selected <strong>${escapeHTML(target.name)}</strong> (${escapeHTML(target.type)}). The list below ranks potentially confusable names; it does not confirm a LASA relationship.`;
  elements.resultsTitle.textContent = `Names similar to ${target.name}`;
  elements.resultCount.textContent = `${rows.length} candidate${rows.length === 1 ? "" : "s"}`;
  renderCandidateBody();
  elements.resultCount.title = usedPrecomputedQueue
    ? "Candidates from the precomputed LASA review queue"
    : "Candidates calculated on demand";
  elements.results.hidden = false;
}

async function searchCandidates(event) {
  event.preventDefault();
  elements.interpretationResults.hidden = true;
  elements.results.hidden = true;
  const query = elements.query.value.trim();
  elements.searchStatus.textContent = "Analyzing the query with contextual English G2P…";
  const matches = await resolveNames(query, 100);
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

async function compareDrugs(event) {
  event.preventDefault();
  elements.comparisonResult.hidden = true;
  const firstValue = elements.firstDrug.value.trim();
  const secondValue = elements.secondDrug.value.trim();
  elements.compareStatus.textContent = "Analyzing both names with contextual English G2P…";
  const [firstMatches, secondMatches] = await Promise.all([
    resolveNames(firstValue, 5),
    resolveNames(secondValue, 5),
  ]);
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
      ${comparisonMetric("Phonetic (Cebuano Editex)", live.phonetic, "group-aware sound distance")}
      ${comparisonMetric("Syllable similarity", scores.syllable, "approximate spoken chunks")}
      ${comparisonMetric("Overall rank", scores.overall, "screening score, not probability")}
    </div>
    <p class="match-basis-note">Sound match found via <strong>${live.matchBasis === "spelling" ? "the published spelling" : "a localized reading"}</strong>${live.matchBasis === "spelling" ? "" : ` (reading confidence ${scoreText(live.readingConfidence)})`}.</p>
    <p class="comparison-note">${stored
      ? "This pair is present in the precomputed LASA review queue."
      : "This pair is not in the precomputed review queue; the score was calculated on demand using contextual browser G2P and exported name paths."
    } Similarity alone does not establish a LASA classification.</p>`;
  elements.comparisonResult.hidden = false;
}

async function searchPronunciations(event) {
  event.preventDefault();
  elements.pronunciationWorkbench.hidden = true;
  elements.pronunciationDetail.hidden = true;
  const query = elements.pronunciationQuery.value.trim();
  elements.pronunciationStatus.textContent = "Analyzing the query with contextual English G2P…";
  const matches = await resolveNames(query, 60);
  if (!matches.length) {
    elements.pronunciationStatus.innerHTML = `<strong>No likely registered names found.</strong> Try a longer name, a brand name, or a generic name from the dataset.`;
    return;
  }
  elements.pronunciationStatus.innerHTML = `<strong>“${escapeHTML(query)}” matched ${matches.length} registered-name option${matches.length === 1 ? "" : "s"}.</strong> Click one name to inspect its precomputed batch pronunciation paths and provenance.`;
  elements.pronunciationCount.textContent = `${matches.length} option${matches.length === 1 ? "" : "s"}`;
  elements.pronunciationList.innerHTML = matches.map((match, index) => {
    const possiblePathCount = (match.name.pathDetails || match.name.paths || []).length;
    const profileStatus = match.name.profileStatus || (possiblePathCount ? "profiled" : "");
    const pathCountLabel = isIntentionalNoProfile(profileStatus)
      ? profileStatusLabel(profileStatus)
      : "Possible paths";
    return `<li>
    <span class="interpretation-rank">${index + 1}</span>
    <div><strong>${escapeHTML(match.name.name)}</strong><small>${escapeHTML(match.name.type)}</small></div>
    <div class="interpretation-signals">
      <span><strong>${scoreText(match.scores.visual)}</strong><small>Looks alike</small></span>
      <span><strong>${scoreText(match.scores.sound)}</strong><small>Sounds alike</small></span>
      <span><strong>${isIntentionalNoProfile(profileStatus) ? "—" : possiblePathCount}</strong><small>${escapeHTML(pathCountLabel)}</small></span>
    </div>
    <button type="button" data-pronunciation-index="${match.index}" aria-pressed="false">Show readings</button>
  </li>`;
  }).join("");
  elements.pronunciationWorkbench.hidden = false;
}

function routeLabel(route) {
  return {
    curated: "Curated pronunciation override",
    english_cmudict: "CMUdict English pronunciation",
    english_espeak_ng: "eSpeak NG contextual English pronunciation",
    english_epitran: "Epitran English pronunciation",
    english_heuristic: "English spelling fallback",
    cebuano_epitran_direct: "Epitran Cebuano direct-reading hypothesis",
    cebuano_epitran_nativized: "Epitran Cebuano nativized direct-reading hypothesis",
    cebuano_phone_adaptation: "Cebuano-aware phone adaptation",
    cebuano_grapheme_adaptation: "Letter-aligned Cebuano-aware adaptation",
    cebuano_direct_spelling: "Cebuano-compatible direct-spelling recovery path",
    cebuano_legacy_rule: "Legacy spelling-rule baseline",
    cebuano_spelling_repair: "Cebuano spelling-repair hypothesis",
    numeric: "Published numeric token",
  }[route] || route || "Generated path";
}

async function viewerFallbackPathDetails(name) {
  return (await browserPronunciationProfile(name.name)).paths;
}

function pathCostText(path) {
  if (path.cost === null || path.cost === undefined) return "not available";
  return Number(path.cost).toFixed(2);
}

async function loadPathDetails() {
  if (state.pathDetailsById.size) return state.pathDetailsById;
  if (!state.pathDetailsPromise) {
    state.pathDetailsPromise = fetch("data/cebuano_path_details.json")
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        for (const [id, details] of decodedPathDetailEntries(data)) {
          state.pathDetailsById.set(id, details);
        }
        return state.pathDetailsById;
      })
      .catch(error => {
        state.pathDetailsPromise = null;
        throw error;
      });
  }
  return state.pathDetailsPromise;
}

function detailRecord(value) {
  if (Array.isArray(value)) {
    return {
      profile_status: value.length ? "profiled" : "",
      paths: value,
      total_path_count: value.length,
      truncated: false,
    };
  }
  return value && Array.isArray(value.paths) ? value : null;
}

async function showPronunciationDetail(nameIndex) {
  const name = state.names[nameIndex];
  if (!name) return;
  let profile = detailRecord(name.pathDetails);
  let detailError = "";
  let detailMissing = false;
  const listedProfileStatus = profile?.profile_status || name.profileStatus || "";
  // The compact catalog payload already records an intentional no-profile
  // boundary, so avoid downloading the large detail file just to rediscover
  // it.  A missing detail file is treated separately below.
  if (!profile && !isIntentionalNoProfile(listedProfileStatus)) {
    elements.pronunciationStatus.textContent = "Loading batch pronunciation details…";
    try {
      const pathDetails = await loadPathDetails();
      if (pathDetails.has(name.id)) {
        profile = detailRecord(pathDetails.get(name.id));
      } else {
        detailMissing = true;
      }
    } catch (error) {
      detailError = error.message;
    }
  }
  const profileStatus = profile?.profile_status
    || name.profileStatus
    || (profile?.paths?.length ? "profiled" : "");
  const intentionallyUnprofiled = isIntentionalNoProfile(profileStatus);
  let paths = profile?.paths?.length ? profile.paths : [];
  if (!paths.length && !intentionallyUnprofiled) {
    paths = await viewerFallbackPathDetails(name);
  }
  const usingBatchProfile = Boolean(profile?.paths?.length);
  const displayedPathCount = intentionallyUnprofiled
    ? "Not profiled"
    : profile?.total_path_count || paths.length;
  elements.pronunciationList.querySelectorAll("button[data-pronunciation-index]").forEach(button => {
    const selected = Number(button.dataset.pronunciationIndex) === nameIndex;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.textContent = selected ? "Showing" : "Show readings";
  });
  elements.pronunciationDetail.innerHTML = `
    <div class="pronunciation-detail-heading">
      <div>
        <p class="eyebrow">${usingBatchProfile
          ? "Batch pronunciation profile"
          : intentionallyUnprofiled
            ? "Batch pronunciation status"
            : "Batch profile unavailable · contextual browser G2P"}</p>
        <h3>${escapeHTML(name.name)}</h3>
        <p>${escapeHTML(name.type)} · normalized as <code>${escapeHTML(name.normalized)}</code></p>
      </div>
      <span>${escapeHTML(displayedPathCount)}${intentionallyUnprofiled ? "" : ` possible path${displayedPathCount === 1 ? "" : "s"}`}</span>
    </div>
    ${intentionallyUnprofiled ? `<div class="profile-status-card">
      <strong>${escapeHTML(profileStatusLabel(profileStatus))}</strong>
      <p>${escapeHTML(profileStatusNote(profileStatus))}</p>
      <small>No browser preview is shown here because it would not be equivalent to an exported batch profile.</small>
    </div>` : `<div class="path-grid">
      ${paths.map((path, index) => {
        const displayPath = path.display || "(no display form)";
        const syllables = Array.isArray(path.syllables) && path.syllables.length
          ? path.syllables.join("-")
          : path.syllables || syllableText(displayPath);
        const rules = Array.isArray(path.rules) && path.rules.length
          ? path.rules.join(", ")
          : "none recorded";
        return `<article class="path-card">
          <span>Path ${index + 1}</span>
          <strong>${escapeHTML(displayPath)}</strong>
          <small>IPA: ${escapeHTML(Array.isArray(path.ipa) ? path.ipa.join(" ") : path.ipa || "not available")}</small>
          <small>Syllable chunks: ${escapeHTML(syllables)}</small>
          <p>${escapeHTML(path.source || "No source detail was exported.")}</p>
          <div class="path-tags">
            <b>${escapeHTML(routeLabel(path.route))}</b>
            <b>${escapeHTML(path.evidence || "evidence not recorded")}</b>
            <b>cost ${escapeHTML(pathCostText(path))}</b>
            ${path.coverage === null || path.coverage === undefined ? "" : `<b>coverage ${escapeHTML(Number(path.coverage).toFixed(2))}</b>`}
            <b>rules: ${escapeHTML(rules)}</b>
          </div>
        </article>`;
      }).join("")}
    </div>`}
    ${profile?.truncated ? `<p class="interpretation-note">The viewer shows the first ${paths.length} route-diverse paths from a ${profile.total_path_count}-path batch profile.</p>` : ""}
    <p class="interpretation-note">${usingBatchProfile
      ? "These are batch-generated candidate paths, not official pronunciations. Their route, evidence level, and cost are shown so speculative paths cannot be mistaken for a dictionary or speaker-validated result."
      : intentionallyUnprofiled
        ? "This is an explicit batch-engine boundary, not a missing file or a pronunciation finding."
        : `Batch path details were unavailable${detailMissing ? " for this catalog name" : ""}${detailError ? ` (${escapeHTML(detailError)})` : ""}; the displayed readings are contextual browser-generated hypotheses only.`
    } A human reviewer still checks the exact brand, generic, strength, and form.</p>`;
  elements.pronunciationDetail.hidden = false;
  elements.pronunciationStatus.textContent = usingBatchProfile
    ? "Batch pronunciation details loaded."
    : intentionallyUnprofiled
      ? profileStatusLabel(profileStatus)
      : "Batch details unavailable; contextual browser G2P shown.";
  if (window.matchMedia("(max-width: 850px)").matches) {
    elements.pronunciationDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function switchMode(button) {
  const activePanelId = button.getAttribute("aria-controls");
  elements.modeButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  [elements.searchPanel, elements.comparePanel, elements.pronunciationPanel].forEach(panel => {
    panel.hidden = panel.id !== activePanelId;
  });
}

async function loadData() {
  try {
    const response = await fetch("data/cebuano_tools.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state.pronunciationModel = data.pronunciation_model || null;
    const nameColumns = data.name_columns || [];
    const nameColumn = column => nameColumns.indexOf(column);
    const profileStatusColumn = nameColumn("profile_status");
    const pathDetailsColumn = nameColumn("path_details");
    state.names = data.names.map(([id, name, type, normalized, paths, ...extra], index) => {
      const record = [id, name, type, normalized, paths, ...extra];
      const profileStatus = profileStatusColumn >= 0
        ? record[profileStatusColumn]
        : paths?.length ? "profiled" : "";
      return {
        id,
        name,
        type,
        normalized,
        paths: Array.isArray(paths) ? paths : [],
        profileStatus,
        pathDetails: pathDetailsColumn >= 0 ? record[pathDetailsColumn] || null : null,
        index,
      };
    });
    state.pairs = data.pairs.map(pair => {
      const [a, b, visual, sound] = pair;
      const modern = pair.length >= 9;
      const [rawSound, edit, syllable, overall, priority] = modern
        ? pair.slice(4, 9)
        : [sound, ...pair.slice(4, 8)];
      return { a, b, visual, sound, rawSound, edit, syllable, overall, priority };
    });
    buildIndexes();
    state.loaded = true;
    elements.searchButton.disabled = false;
    elements.compareButton.disabled = false;
    elements.pronunciationButton.disabled = false;
    elements.searchStatus.textContent = `${state.names.length.toLocaleString("en-PH")} registered names ready.`;
    elements.compareStatus.textContent = "Enter two medicine names to compare.";
    const englishG2P = state.pronunciationModel?.provider_status?.espeak_ng;
    const providerNote = englishG2P === "available"
      ? " eSpeak NG contextual G2P was available for unknown names in this batch."
      : " eSpeak NG was unavailable for this batch; affected profiles retain explicit fallback provenance.";
    elements.pronunciationStatus.textContent = `Enter one medicine name to inspect its batch reading paths.${providerNote}`;
  } catch (error) {
    const message = `The Cebuano-aware data could not load: ${error.message}`;
    elements.searchStatus.textContent = message;
    elements.compareStatus.textContent = message;
    elements.pronunciationStatus.textContent = message;
  }
}

elements.modeButtons.forEach(button => button.addEventListener("click", () => switchMode(button)));
elements.searchForm.addEventListener("submit", searchCandidates);
elements.resultsHead?.addEventListener("click", event => {
  const header = event.target.closest("th[data-sort]");
  if (!header) return;
  candidateSort.key = header.dataset.sort;
  elements.resultsHead.querySelectorAll("th[data-sort]").forEach(th =>
    th.classList.toggle("active", th === header));
  renderCandidateBody();
});
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
elements.pronunciationForm.addEventListener("submit", searchPronunciations);
elements.pronunciationList.addEventListener("click", event => {
  const button = event.target.closest("button[data-pronunciation-index]");
  if (!button) return;
  void showPronunciationDetail(Number(button.dataset.pronunciationIndex));
});
elements.compareStatus.addEventListener("click", event => {
  const button = event.target.closest("button[data-compare-target][data-name-index]");
  if (!button) return;
  const name = state.names[Number(button.dataset.nameIndex)];
  const input = button.dataset.compareTarget === "first" ? elements.firstDrug : elements.secondDrug;
  input.value = name.name;
  input.focus();
});
loadData();
