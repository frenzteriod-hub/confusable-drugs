import { escapeHTML, installSignOut, requireAccount } from "./auth.js?v=20260812-3";
import { supabase } from "./supabase-client.js?v=20260809-1";
import {
  activityCalendar,
  activityLevel,
  buildDailyCounts,
  buildDailyReviewActivity,
  calculateLongestStreak,
  calculateStreak,
} from "./modules/review-stats.js?v=20260809-2";
import { formatReviewDuration, includedReviewSeconds, summarizeReviewDurations } from "./modules/review-timing.js?v=20260809-1";
import { normalizeName } from "./modules/name-normalization.js?v=20260809-2";
import {
  biSim, bigramDice, jaroWinkler, levenshteinSimilarity, prefixSimilarity,
} from "./modules/similarity.js?v=20260809-3";
import {
  combinedScoreCards,
  hasCompleteMainScores,
  mainScoreCards,
  scoreRecordStatus,
} from "./modules/admin-score-presentation.js?v=20260809-1";
import { installThemeToggle } from "./modules/theme.js?v=20260811-1";
import { reviewerLabelDistribution, reviewerLabelText } from "./modules/review-decision.js?v=20260812-3";
installThemeToggle();

const PAGE_SIZE = 20;
await requireAccount(["admin"]);
installSignOut();

const reviewerId = new URLSearchParams(location.search).get("id");
const state = { page: 1, count: 0, loadId: 0, reviewerId };
const elements = {
  search: document.querySelector("#audit-history-search"),
  label: document.querySelector("#audit-history-label"),
  list: document.querySelector("#audit-history-list"),
  count: document.querySelector("#audit-history-count"),
  page: document.querySelector("#audit-history-page"),
  previous: document.querySelector("#audit-history-previous"),
  next: document.querySelector("#audit-history-next"),
};

if (!reviewerId) failPage("No reviewer was selected.");

const [{ data: reviewer, error: reviewerError }, { count: pairCount, error: pairError }, reviews, activeReviews] = await Promise.all([
  supabase.from("profiles").select("id, display_name, role").eq("id", reviewerId).eq("role", "reviewer").single(),
  supabase.from("review_pairs").select("id", { count: "exact", head: true }).eq("is_active", true),
  loadAllReviewerReviews(reviewerId),
  loadActiveReviewerReviews(reviewerId),
]);

if (reviewerError || pairError || !reviewer) failPage(reviewerError?.message || pairError?.message || "Reviewer not found.");

document.title = `${reviewer.display_name} · Reviewer audit`;
document.querySelector("#reviewer-name").textContent = reviewer.display_name;
renderSummary(activeReviews, pairCount);
renderActivity(reviews);
renderLabelDistribution(reviews);
loadHistory();

function renderSummary(rows, activePairCount) {
  const counts = buildDailyCounts(rows);
  const timing = summarizeReviewDurations(rows);
  document.querySelector("#audit-reviewed").textContent = rows.length.toLocaleString("en-PH");
  document.querySelector("#audit-progress").textContent = activePairCount ? `${Math.round(rows.length / activePairCount * 100)}% of the queue` : "of the queue";
  document.querySelector("#audit-current-streak").textContent = calculateStreak(counts).toLocaleString("en-PH");
  document.querySelector("#audit-longest-streak").textContent = calculateLongestStreak(counts).toLocaleString("en-PH");
  document.querySelector("#audit-average-time").textContent = timing.averageSeconds === null ? "Not available" : formatReviewDuration(timing.averageSeconds);
  document.querySelector("#audit-timing-count").textContent = `${timing.timedCount.toLocaleString("en-PH")} timed · ${timing.excludedCount.toLocaleString("en-PH")} excluded`;
  document.querySelector("#audit-pending").textContent = Math.max(0, activePairCount - rows.length).toLocaleString("en-PH");
}

function renderActivity(rows) {
  const counts = buildDailyCounts(rows);
  const daily = buildDailyReviewActivity(rows, undefined, includedReviewSeconds);
  const activity = activityCalendar(counts);
  document.querySelector("#audit-activity-total").textContent = `${activity.days.reduce((sum, day) => sum + (day.count || 0), 0).toLocaleString("en-PH")} labels in 12 months`;
  document.querySelector("#audit-activity-months").innerHTML = activity.months.map(month => `<span style="grid-column:${month.week}">${month.label}</span>`).join("");
  document.querySelector("#audit-activity-grid").innerHTML = activity.days.map(day => {
    if (day.future) return '<span class="future-day" aria-hidden="true"></span>';
    const details = daily[day.date] || { count: 0, timedCount: 0, totalSeconds: 0, firstAt: null, lastAt: null };
    return `<button class="activity-day" type="button" data-level="${activityLevel(day.count)}" data-date="${day.date}" data-count="${details.count}" data-timed-count="${details.timedCount}" data-total-seconds="${details.totalSeconds}" data-first-at="${details.firstAt || ""}" data-last-at="${details.lastAt || ""}" aria-label="${day.date}: ${day.count} labels. Select for timing details."></button>`;
  }).join("");
  installActivityTooltip();
}

function renderLabelDistribution(rows) {
  const labels = reviewerLabelDistribution(rows);
  document.querySelector("#audit-label-distribution").innerHTML = labels.map(({ count, title }) => {
    const percent = rows.length ? Math.round(count / rows.length * 100) : 0;
    return `<div><span><strong>${title}</strong><small>${count.toLocaleString("en-PH")} decisions</small></span><div class="distribution-track"><i style="width:${percent}%"></i></div><b>${percent}%</b></div>`;
  }).join("");
}

async function loadHistory() {
  const loadId = ++state.loadId;
  elements.list.innerHTML = '<p class="loading-message">Loading reviewer decisions…</p>';
  const search = elements.search.value.trim().toLocaleLowerCase().replaceAll("%", "\\%").replaceAll("_", "\\_");
  let query = supabase.from("admin_reviewer_history").select("*", { count: "exact" }).eq("reviewer_id", reviewerId).order("reviewed_at", { ascending: false });
  if (search) query = query.ilike("search_text", `%${search}%`);
  if (elements.label.value) query = query.eq("label", elements.label.value);
  const start = (state.page - 1) * PAGE_SIZE;
  const { data, count, error } = await query.range(start, start + PAGE_SIZE - 1);
  if (loadId !== state.loadId) return;
  if (error) {
    elements.list.innerHTML = `<div class="empty-panel"><strong>History could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
    return;
  }
  state.count = count || 0;
  const pages = Math.max(1, Math.ceil(state.count / PAGE_SIZE));
  if (state.page > pages) {
    state.page = pages;
    loadHistory();
    return;
  }
  const [scoreMap, pairStatusMap] = await Promise.all([
    loadScores(data || []),
    loadPairStatuses(data || []),
  ]);
  elements.count.textContent = `${state.count.toLocaleString("en-PH")} review${state.count === 1 ? "" : "s"}`;
  elements.page.textContent = `Page ${state.page} of ${pages}`;
  elements.previous.disabled = state.page <= 1;
  elements.next.disabled = state.page >= pages;
  elements.list.innerHTML = (data || []).map(review => historyCard(
    review,
    scoreMap.get(review.source_pair_key),
    pairStatusMap.get(review.source_pair_key) === true,
  )).join("") || '<div class="empty-panel"><strong>No decisions match this view</strong><span>Try a different medicine name or reviewer label.</span></div>';
}

function historyCard(review, score, isActive) {
  const duration = includedReviewSeconds(review.review_duration_seconds);
  const firstSurface = normalizeName(review.name_a);
  const secondSurface = normalizeName(review.name_b);
  const normalizedEdit = levenshteinSimilarity(firstSurface, secondSurface);
  const dice = bigramDice(firstSurface, secondSurface);
  const surfaceBiSim = biSim(firstSurface, secondSurface);
  const prefix = prefixSimilarity(firstSurface, secondSurface);
  const winkler = score?.jaro_winkler ?? jaroWinkler(firstSurface, secondSurface);
  const durationText = duration !== null ? formatReviewDuration(duration) : Number(review.review_duration_seconds) >= 3600 ? "Excluded: 1 hour or longer" : "Not recorded";
  const reviewedAt = new Date(review.reviewed_at).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "medium" });
  const corrected = review.updated_at && Math.abs(new Date(review.updated_at) - new Date(review.reviewed_at)) > 1000
    ? `<small>Last corrected ${new Date(review.updated_at).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "medium" })}</small>`
    : "";
  const scoreStatus = scoreRecordStatus(score, isActive);
  const completeScores = hasCompleteMainScores(score);
  const renderScoreCard = (card, kind) => `<b class="algorithm-main-score ${escapeHTML(kind)} ${escapeHTML(card.key)}"><i class="score-priority-chip">${kind === "primary" ? "Main score" : "Reference"}</i><small>${escapeHTML(card.label)}</small>${formatScore(card.value)}<em>${escapeHTML(card.note)}</em></b>`;
  const mainScores = mainScoreCards(score).map(card => renderScoreCard(card, "primary")).join("");
  const combinedScores = combinedScoreCards(score).map(card => renderScoreCard(card, "reference")).join("");
  return `<article class="reviewer-history-item">
    <div class="reviewer-history-heading">
      <div><span class="comparison-type">${escapeHTML(modeText(review.comparison_type))}</span><h3>${escapeHTML(review.name_a)} <i>↔</i> ${escapeHTML(review.name_b)}</h3><small>${escapeHTML(review.name_a_type)} ↔ ${escapeHTML(review.name_b_type)}</small></div>
      <span class="review-label ${escapeHTML(review.label)}">${escapeHTML(channelLabelText(review))}</span>
    </div>
    <div class="reviewer-history-details">
      <section><span>Reviewer rationale</span><p class="review-rationale ${review.notes ? "" : "missing"}">${review.notes ? escapeHTML(review.notes) : "No written reason was provided."}</p></section>
      <section><span>Decision timing</span><strong>${escapeHTML(reviewedAt)}</strong><small>${escapeHTML(durationText)} decision time</small>${corrected}</section>
      <section class="algorithm-context">
        <div class="algorithm-context-heading"><span>Admin-only algorithm context</span><i class="score-record-status ${escapeHTML(scoreStatus.className)}">${escapeHTML(scoreStatus.label)}</i></div>
        <p class="score-status-description">${escapeHTML(scoreStatus.description)}</p>
        ${completeScores ? `<div class="algorithm-score-section primary"><strong>Main channel scores <i>Use these first</i></strong><small>These are the three separate signals the study evaluates. There is no automatic all-channel LASA verdict.</small><div class="algorithm-main-score-grid">${mainScores}</div></div>
        <div class="algorithm-score-section combined"><strong>Published combined comparators</strong><small>These reference formulas combine only the inputs stated below; neither is a clinical label.</small><div class="algorithm-combined-score-grid">${combinedScores}</div></div>` : '<div class="score-incomplete-message"><strong>This historical calculation is incomplete.</strong><span>It must be recalculated with the frozen v4.1 model before interpretation.</span></div>'}
        <details class="algorithm-calculation-details"><summary>Show calculation details and weights</summary><div class="algorithm-score-grid">
        <b><small>Normalized edit · surface</small>${formatScore(normalizedEdit)}</b>
        <b><small>Bigram Dice · surface</small>${formatScore(dice)}</b>
        <b><small>Jaro–Winkler · surface</small>${formatScore(winkler)}</b>
        <b><small>BI-SIM · surface</small>${formatScore(score?.bi_sim ?? surfaceBiSim)}</b>
        <b><small>Common-prefix similarity</small>${formatScore(score?.prefix_similarity ?? prefix)}</b>
        <b><small>Cebuano ALINE · adjusted</small>${formatScore(score?.adjusted_phonetic)}</b>
        <b><small>Cebuano Editex · original spelling</small>${formatScore(score?.cebuano_editex_similarity)}</b>
        <b><small>Character-syllable shape</small>${formatScore(score?.syllable_similarity)}</b>
        <b><small>Relative stress</small>${formatScore(score?.stress_similarity)}</b>
        <b><small>Cebuano adaptation effect</small>${formatSignedScore(score?.adaptation_effect)}</b>
        <b><small>Cebuano sound composite · raw</small>${formatScore(score?.metadata?.cebuano_raw_score)}</b>
        <b><small>${isActive ? "Current queue rank" : "Previous queue rank"}</small>${score?.rank ? `#${Number(score.rank).toLocaleString("en-PH")}` : "Not ranked"}</b>
        <b><small>Scoring model</small>${escapeHTML(score?.metadata?.model_id || "—")}</b>
      </div></details><small class="algorithm-context-note">The reviewer recorded an overall LASA, Not LASA, or Needs discussion judgment without seeing any algorithm score. Look-alike scoring still uses unchanged registered spellings, while Cebuano respellings affect only pronunciation-path features. Scores rank candidates only and never decide LASA status.</small></section>
    </div>
  </article>`;
}

async function loadScores(history) {
  const keys = [...new Set(history.map(row => row.source_pair_key).filter(Boolean))];
  if (!keys.length) return new Map();
  const expanded = await supabase.from("pair_scores").select("pair_key, rank, jaro_winkler, orthographic_similarity, poca_composite_similarity, bi_sim, prefix_similarity, bigram_dice, kondrak_dorr_style_score, english_phonetic, adjusted_phonetic, cebuano_editex_similarity, syllable_similarity, stress_similarity, adaptation_effect, cebuano_score, metadata").in("pair_key", keys);
  if (!expanded.error) return new Map((expanded.data || []).map(row => [row.pair_key, row]));
  // Keep the current dashboard usable until the reviewed migration is applied.
  const legacy = await supabase.from("pair_scores").select("pair_key, rank, jaro_winkler, orthographic_similarity, english_phonetic, adjusted_phonetic, adaptation_effect, cebuano_score").in("pair_key", keys);
  if (legacy.error) return new Map();
  return new Map((legacy.data || []).map(row => [row.pair_key, row]));
}

async function loadPairStatuses(history) {
  const keys = [...new Set(history.map(row => row.source_pair_key).filter(Boolean))];
  if (!keys.length) return new Map();
  const { data, error } = await supabase.from("review_pairs").select("source_pair_key, is_active").in("source_pair_key", keys);
  if (error) return new Map();
  return new Map((data || []).map(row => [row.source_pair_key, row.is_active]));
}

async function loadAllReviewerReviews(id) {
  const rows = [];
  const batchSize = 1000;
  for (let start = 0; ; start += batchSize) {
    const { data, error } = await supabase.from("reviews").select("label, look_alike, sound_alike, reviewed_at, review_duration_seconds").eq("reviewer_id", id).order("reviewed_at", { ascending: false }).range(start, start + batchSize - 1);
    if (error) throw error;
    rows.push(...(data || []));
    if (!data || data.length < batchSize) break;
  }
  return rows;
}

async function loadActiveReviewerReviews(id) {
  const rows = [];
  const batchSize = 1000;
  for (let start = 0; ; start += batchSize) {
    const { data, error } = await supabase.from("reviews")
      .select("label, look_alike, sound_alike, reviewed_at, review_duration_seconds, review_pairs!inner(is_active)")
      .eq("reviewer_id", id)
      .eq("review_pairs.is_active", true)
      .order("reviewed_at", { ascending: false })
      .range(start, start + batchSize - 1);
    if (error) throw error;
    rows.push(...(data || []));
    if (!data || data.length < batchSize) break;
  }
  return rows;
}

function installActivityTooltip() {
  const grid = document.querySelector("#audit-activity-grid");
  const tooltip = document.querySelector("#audit-activity-tooltip");
  let pinned = false;
  const show = (cell, pin = false) => {
    if (!cell) return;
    pinned = pin;
    const count = Number(cell.dataset.count);
    const timed = Number(cell.dataset.timedCount);
    const average = timed ? Math.round(Number(cell.dataset.totalSeconds) / timed) : null;
    const date = new Date(`${cell.dataset.date}T12:00:00+08:00`).toLocaleDateString("en-PH", { dateStyle: "full" });
    const first = cell.dataset.firstAt ? new Date(Number(cell.dataset.firstAt)).toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" }) : null;
    const last = cell.dataset.lastAt ? new Date(Number(cell.dataset.lastAt)).toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" }) : null;
    tooltip.innerHTML = `<strong>${escapeHTML(date)}</strong><span>${count.toLocaleString("en-PH")} label${count === 1 ? "" : "s"}</span><small>${average === null ? "No eligible timing data" : `Average ${formatReviewDuration(average)} · ${timed} timed`}</small>${first ? `<small>First ${first} · Last ${last}</small>` : ""}`;
    tooltip.hidden = false;
    const rect = cell.getBoundingClientRect();
    requestAnimationFrame(() => {
      const box = tooltip.getBoundingClientRect();
      tooltip.style.left = `${Math.min(innerWidth - box.width - 10, Math.max(10, rect.left + rect.width / 2 - box.width / 2))}px`;
      tooltip.style.top = `${rect.top - box.height - 10 > 8 ? rect.top - box.height - 10 : rect.bottom + 10}px`;
    });
  };
  grid.addEventListener("pointerover", event => show(event.target.closest(".activity-day")));
  grid.addEventListener("pointerout", () => { if (!pinned) tooltip.hidden = true; });
  grid.addEventListener("focusin", event => show(event.target.closest(".activity-day")));
  grid.addEventListener("focusout", () => { if (!pinned) tooltip.hidden = true; });
  grid.addEventListener("click", event => show(event.target.closest(".activity-day"), true));
  document.addEventListener("pointerdown", event => {
    if (!event.target.closest(".activity-day")) { pinned = false; tooltip.hidden = true; }
  });
}

function formatScore(value) {
  if (value === null || value === undefined || value === "") return "—";
  const score = Number(value);
  return Number.isFinite(score) ? score.toFixed(3) : "—";
}

function formatSignedScore(value) {
  if (value === null || value === undefined || value === "") return "—";
  const score = Number(value);
  return Number.isFinite(score) ? `${score >= 0 ? "+" : ""}${score.toFixed(3)}` : "—";
}

function channelLabelText(review) { return reviewerLabelText(review.label); }

function modeText(mode) {
  return { generic_generic: "Generic ↔ Generic", brand_brand: "Brand ↔ Brand", generic_brand: "Generic ↔ Brand" }[mode] || mode;
}

function failPage(message) {
  document.querySelector("main").innerHTML = `<div class="empty-panel"><strong>Reviewer audit unavailable</strong><span>${escapeHTML(message)}</span><a href="admin-dashboard.html">Return to admin dashboard</a></div>`;
  throw new Error(message);
}

let searchTimer;
elements.search.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { state.page = 1; loadHistory(); }, 250);
});
elements.label.addEventListener("change", () => { state.page = 1; loadHistory(); });
elements.previous.addEventListener("click", () => { state.page -= 1; loadHistory(); });
elements.next.addEventListener("click", () => { state.page += 1; loadHistory(); });
