import {
  browserPronunciationProfile,
  normalizeName,
  syllabify,
} from "./cebuano-core.js?v=20260713-g2p-5";

const elements = {
  form: document.querySelector("#lab-form"),
  input: document.querySelector("#lab-name"),
  status: document.querySelector("#lab-status"),
  detail: document.querySelector("#lab-detail"),
  examples: document.querySelector(".lab-examples"),
};

const escapeHTML = value => String(value || "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function uniqueDisplays(paths, limit = 3) {
  return [...new Set(paths.map(path => path.display).filter(Boolean))]
    .slice(0, limit)
    .join(" / ");
}

function syllableText(path) {
  return String(path || "")
    .split(/\s+/)
    .filter(Boolean)
    .map(word => syllabify(word).join("-") || word)
    .join(" ");
}

function pathHeading(path) {
  return {
    english_espeak_ng: "Contextual English G2P",
    cebuano_phone_adaptation: "English IPA + Cebuano-aware adaptation",
    cebuano_grapheme_adaptation: "Letter-aligned Cebuano-aware adaptation",
    cebuano_direct_spelling: "Direct-spelling recovery hypothesis",
    english_spelling_fallback: "Emergency spelling fallback",
  }[path.route] || path.label;
}

function pathNote(path) {
  if (path.route === "english_espeak_ng") {
    return "eSpeak NG selected this pronunciation using its English exception dictionary and surrounding-letter rules. It is a generated hypothesis for unfamiliar drug names, not a verified brand pronunciation.";
  }
  if (path.route === "cebuano_phone_adaptation") {
    return "This begins with the English IPA path and applies one listed, costed consonant change. It does not create a cross-product of every possible vowel change.";
  }
  if (path.route === "cebuano_grapheme_adaptation") {
    return path.alignment?.complete
      ? "This is one deterministic letter-aligned local reading for the entered word. A matching English vowel may stay unchanged; a mismatching vowel uses only the listed contextual rule. It never branches into every vowel combination."
      : "This is the conservative local route for the entered word. Any safely aligned vowel rule is applied once; unmatched English phones are preserved and the path is visibly marked partial instead of being discarded.";
  }
  if (path.route === "cebuano_direct_spelling") {
    return "This is the recovery path for a reader who follows Cebuano-compatible letter values instead of the English source pronunciation. Speaker validation is required.";
  }
  return "The contextual engine was unavailable, so this low-confidence spelling fallback should not be treated as a source pronunciation.";
}

function alignmentText(path) {
  const alignment = path.alignment;
  if (!alignment) return "";
  if (alignment.complete === false) {
    return "partial vowel alignment; unmatched English phones preserved";
  }
  const phone = alignment.sourcePhone || alignment.phone;
  if (alignment.grapheme && phone) {
    return `aligned <${alignment.grapheme}> ↔ /${phone}/`;
  }
  const graphemes = (alignment.anchors || []).map(anchor => anchor.grapheme).join(" | ");
  return graphemes ? `aligned vowels: ${graphemes}` : "aligned vowel context";
}

let renderSequence = 0;

async function renderName(value) {
  const sequence = ++renderSequence;
  const name = value.trim();
  const normalized = normalizeName(name);
  if (normalized.length < 2) {
    elements.detail.hidden = true;
    elements.status.innerHTML = "<strong>Use at least two letters.</strong>";
    return;
  }

  elements.status.innerHTML = `<strong>Analyzing ${escapeHTML(name)}…</strong> Loading the contextual English pronunciation rules.`;
  elements.detail.hidden = true;
  const profile = await browserPronunciationProfile(name);
  if (sequence !== renderSequence) return;

  const sourcePaths = profile.paths.filter(path => path.route === "english_espeak_ng");
  const adaptedPaths = profile.paths.filter(path => [
    "cebuano_phone_adaptation",
    "cebuano_grapheme_adaptation",
  ].includes(path.route));
  const directPaths = profile.paths.filter(path => path.route === "cebuano_direct_spelling");
  const engineStatus = profile.engineAvailable
    ? "eSpeak NG contextual G2P loaded"
    : `Contextual G2P unavailable: ${profile.engineError || "unknown error"}`;

  elements.status.innerHTML = `<strong>${escapeHTML(name)}</strong> generated ${profile.paths.length} separately sourced and costed path${profile.paths.length === 1 ? "" : "s"} for this entered name only.`;
  elements.detail.innerHTML = `
    <div class="pronunciation-detail-heading">
      <div>
        <p class="eyebrow">Contextual pronunciation lattice</p>
        <h3>${escapeHTML(name)}</h3>
        <p>spelling: <code>${escapeHTML(normalized)}</code> · ${escapeHTML(engineStatus)}</p>
      </div>
      <span>${profile.paths.length} path${profile.paths.length === 1 ? "" : "s"}</span>
    </div>
    <p class="section-note">English has context-dependent spellings and exceptions, so the app first generates IPA with a full English G2P engine. It then aligns vowel spellings for this entered name and applies only relevant local rules; it does not scan or regenerate the full medicine database.</p>
    <div class="reading-summary lab-reading-summary">
      <article><span>English source G2P</span><strong>${escapeHTML(uniqueDisplays(sourcePaths) || "Unavailable")}</strong></article>
      <article><span>Cebuano-aware adaptations</span><strong>${escapeHTML(uniqueDisplays(adaptedPaths) || "Unavailable because English G2P failed")}</strong></article>
      <article><span>Direct-spelling recovery</span><strong>${escapeHTML(uniqueDisplays(directPaths) || "Unavailable")}</strong></article>
    </div>
    <div class="path-grid lab-path-grid">
      ${profile.paths.map((path, index) => `<article class="path-card">
        <span>Path ${index + 1} · cost ${Number(path.cost).toFixed(2)} · confidence ${Number(path.confidence).toFixed(2)}</span>
        <strong>${escapeHTML(path.display)}</strong>
        <small>${path.ipa ? `IPA: /${escapeHTML(path.ipa.replaceAll(" ", ""))}/ · ` : ""}chunks: ${escapeHTML(syllableText(path.display))}</small>
        <p>${escapeHTML(pathNote(path))}</p>
        <div class="path-tags">
          <b>${escapeHTML(pathHeading(path))}</b>
          <b>${escapeHTML(path.evidence)}</b>
          ${path.alignment ? `<b>${escapeHTML(alignmentText(path))}</b>` : ""}
          ${(path.rules || []).map(rule => `<b>${escapeHTML(rule)}</b>`).join(" ")}
        </div>
      </article>`).join("")}
    </div>`;
  elements.detail.hidden = false;
}

elements.form.addEventListener("submit", event => {
  event.preventDefault();
  void renderName(elements.input.value);
});

elements.examples.addEventListener("click", event => {
  const button = event.target.closest("button[data-example]");
  if (!button) return;
  elements.input.value = button.dataset.example;
  void renderName(button.dataset.example);
});

elements.input.value = "binary";
void renderName("binary");
