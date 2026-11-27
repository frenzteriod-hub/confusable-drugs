import { createAdminReader } from "./modules/dashboard-data.js";
import { escapeHTML, installSignOut, requireAccount } from "./auth.js?v=20260812-3";
import { supabase } from "./supabase-client.js?v=20260809-1";
import { calculateLongestStreak, calculateStreak, dayKey } from "./modules/review-stats.js?v=20260809-2";
import { formatReviewDuration } from "./modules/review-timing.js?v=20260809-1";
import { DEMO_ADMIN_SNAPSHOT, demoActivitySummary, demoRecentReviews, demoSnapshotTotals, loadDemoPairRows } from "./modules/demo-admin-data.js?v=20260817-4";
import { installThemeToggle } from "./modules/theme.js?v=20260811-1";
installThemeToggle();

const account = await requireAccount(["admin", "demo_admin"]);
installSignOut();

if (account.profile.role === "demo_admin") await renderDemoDashboard();
else {
  const status = document.querySelector("#dashboard-freshness");
  const summaryRequest = fetch("data/summary.json")
    .then(response => response.ok ? response.json() : null).catch(() => null);
  const read = createAdminReader(supabase, totals => {
    renderTotals(totals);
    status.textContent = "Live label count loaded · checking agreement and activity…";
  });
  const cacheKey = "review-summary-v1:" + account.user.id;
  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey));
    if (cached && Date.now() - cached.at < 86400000) {
      renderLiveDashboard(cached.data);
      status.textContent = `Showing totals from ${new Date(cached.at).toLocaleTimeString("en-PH")} · updating…`;
    }
  } catch { /* Storage is optional. */ }
  let refreshing = false;
  async function refresh() {
    if (document.hidden || refreshing) return;
    refreshing = true;
    try {
      const data = await read();
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data })); } catch { /* Storage is optional. */ }
      renderLiveDashboard(data);
      status.textContent = `Updated ${new Date().toLocaleTimeString("en-PH")} · refreshes every 15 seconds`;
      summaryRequest.then(summary => renderQueueSource(data.pairCount, summary));
    } catch (error) {
      status.textContent = `Update failed · retrying in 15 seconds. ${error.message}`;
    } finally {
      refreshing = false;
    }
  }
  document.addEventListener("visibilitychange", refresh);
  window.addEventListener("online", refresh);
  window.setInterval(refresh, 15000);
  await refresh();
}

function renderTotals({ pairCount, reviewerCount, completed }) {
  const expected = pairCount * reviewerCount;
  document.querySelector("#admin-pairs").textContent = pairCount.toLocaleString("en-PH");
  document.querySelector("#admin-reviewers").textContent = reviewerCount.toLocaleString("en-PH");
  document.querySelector("#admin-completed").textContent = completed.toLocaleString("en-PH");
  document.querySelector("#admin-target").textContent = `of ${expected.toLocaleString("en-PH")} expected labels`;
  document.querySelector("#admin-progress").textContent = expected ? `${Math.round(completed / expected * 100)}%` : "0%";
}

function renderLiveDashboard({ pairCount, completed, reviewers, interim, distribution }) {
  const expected = pairCount * reviewers.length;
  const {
    fullyReviewed, unanimousPairs, potentialMajority,
    falsePositiveMajority, unresolvedMajority,
  } = interim;

  renderTotals({ pairCount, reviewerCount: reviewers.length, completed });
  document.querySelector("#admin-overlap").textContent = fullyReviewed.toLocaleString("en-PH");

  const coveragePercent = expected ? Math.round(completed / expected * 100) : 0;
  const interimRate = count => fullyReviewed ? Math.round(count / fullyReviewed * 100) : 0;
  const fullyReviewedPhrase = fullyReviewed === 1 ? "1 pair has" : `${fullyReviewed.toLocaleString("en-PH")} pairs have`;
  document.querySelector("#interim-coverage-badge").textContent = `${coveragePercent}% label coverage`;
  document.querySelector("#interim-unanimous").textContent = unanimousPairs.toLocaleString("en-PH");
  document.querySelector("#interim-unanimous-rate").textContent = `${interimRate(unanimousPairs)}% of fully reviewed pairs`;
  document.querySelector("#interim-potential").textContent = potentialMajority.toLocaleString("en-PH");
  document.querySelector("#interim-potential-rate").textContent = `${interimRate(potentialMajority)}% of fully reviewed pairs`;
  document.querySelector("#interim-false-positive").textContent = falsePositiveMajority.toLocaleString("en-PH");
  document.querySelector("#interim-false-positive-rate").textContent = `${interimRate(falsePositiveMajority)}% of fully reviewed pairs`;
  document.querySelector("#interim-unresolved").textContent = unresolvedMajority.toLocaleString("en-PH");
  document.querySelector("#interim-unresolved-rate").textContent = `${interimRate(unresolvedMajority)}% of fully reviewed pairs`;
  document.querySelector("#interim-conclusion-text").textContent = fullyReviewed
    ? `${completed.toLocaleString("en-PH")} of ${expected.toLocaleString("en-PH")} expected reviews are saved (${coveragePercent}%). ${fullyReviewedPhrase} been reviewed by every expert. Of those, ${interimRate(potentialMajority)}% currently have a majority LASA judgment and ${interimRate(falsePositiveMajority)}% have a majority Not LASA judgment. These are preliminary expert judgments, not the study's final conclusion.`
    : `${completed.toLocaleString("en-PH")} of ${expected.toLocaleString("en-PH")} expected reviews are saved (${coveragePercent}%), but no pair has yet been reviewed by every expert.`;

  document.querySelector("#reviewer-progress").innerHTML = reviewers.map(reviewer => {
    const counts = reviewer.days;
    const today = counts[dayKey(new Date())] || 0;
    const percent = pairCount ? Math.round(reviewer.completed / pairCount * 100) : 0;
    const last = reviewer.last;
    return `<tr>
      <td data-label="Reviewer"><a class="reviewer-detail-link" href="admin-reviewer.html?id=${encodeURIComponent(reviewer.id)}"><strong>${escapeHTML(reviewer.display_name)}</strong><small>View dashboard and history →</small></a></td>
      <td data-label="Progress"><div class="progress-meter"><span style="width:${percent}%"></span></div><small>${percent}%</small></td>
      <td data-label="Completed"><strong>${reviewer.completed.toLocaleString("en-PH")}</strong><small> / ${pairCount.toLocaleString("en-PH")}</small></td>
      <td data-label="Today"><strong>${today.toLocaleString("en-PH")}</strong></td>
      <td data-label="Streaks"><strong>${calculateStreak(counts)}</strong> <small>current</small><span class="streak-divider">·</span><strong>${calculateLongestStreak(counts)}</strong> <small>longest</small></td>
      <td data-label="Avg. decision time"><strong>${reviewer.average === null ? "—" : formatReviewDuration(reviewer.average)}</strong><small class="block-label">${reviewer.timed.toLocaleString("en-PH")} timed · ${reviewer.excluded.toLocaleString("en-PH")} excluded</small></td>
      <td data-label="Last activity">${last ? new Date(last).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" }) : "Not started"}</td>
    </tr>`;
  }).join("") || '<tr><td colspan="7">No reviewer accounts found. Create the three reviewer users, then refresh.</td></tr>';

  const labels = [
    ["potential_lasa", "LASA"],
    ["false_positive", "Not LASA"],
    ["needs_discussion", "Needs discussion"],
  ];
  document.querySelector("#label-distribution").innerHTML = labels.map(([label, title]) => {
    const count = distribution[label] || 0;
    const percent = completed ? Math.round(count / completed * 100) : 0;
    return `<div><span><strong>${title}</strong><small>${count.toLocaleString("en-PH")} labels</small></span><div class="distribution-track"><i style="width:${percent}%"></i></div><b>${percent}%</b></div>`;
  }).join("");
}

function renderQueueSource(pairCount, generatedSummary) {
  const generatedPairCount = Number(generatedSummary?.expert_review_pairs || 0);
  const syncNotice = document.querySelector("#queue-sync-notice");
  syncNotice.hidden = true;
  if (generatedPairCount && generatedPairCount !== pairCount) {
    syncNotice.hidden = false;
    syncNotice.textContent = `Queue sync required: Supabase currently has ${pairCount.toLocaleString("en-PH")} active pairs, while the regenerated expert queue contains ${generatedPairCount.toLocaleString("en-PH")}. Synchronize the generated review_pairs.csv before expert review continues.`;
    document.querySelector("#admin-pair-source").textContent = `generated queue: ${generatedPairCount.toLocaleString("en-PH")}`;
  } else if (generatedPairCount) {
    document.querySelector("#admin-pair-source").textContent = "matches generated queue";
  }
}

async function renderDemoDashboard() {
  let pairRows;
  try {
    pairRows = await loadDemoPairRows(supabase);
  } catch (error) {
    const body = document.querySelector("#demo-label-history-body");
    if (body) body.innerHTML = `<tr><td colspan="5">${escapeHTML(error.message || "Real medicine pairs could not be loaded.")}</td></tr>`;
    throw error;
  }
  const snapshot = DEMO_ADMIN_SNAPSHOT;
  const totals = demoSnapshotTotals(snapshot);
  document.body.classList.add("demo-admin-account");
  document.querySelectorAll("[data-real-admin-only]").forEach(element => { element.hidden = true; });

  const notice = document.querySelector("#queue-sync-notice");
  notice.hidden = true;
  notice.replaceChildren();

  document.querySelector(".admin-welcome .eyebrow").textContent = "Isolated demonstration workspace";
  document.querySelector(".admin-welcome h2").textContent = "Illustrative reviewer progress at a glance";
  document.querySelector(".admin-welcome p:last-child").textContent = "This account shows a fixed example timeline for demonstrating the portal. The secured validation workspace and its actual progress remain separate.";

  document.querySelector("#admin-pairs").textContent = snapshot.queueSize.toLocaleString("en-PH");
  document.querySelector("#admin-pair-source").textContent = "illustrative queue size";
  document.querySelector("#admin-reviewers").textContent = snapshot.reviewers.length.toLocaleString("en-PH");
  document.querySelector("#admin-completed").textContent = totals.completed.toLocaleString("en-PH");
  document.querySelector("#admin-target").textContent = `of ${totals.expected.toLocaleString("en-PH")} illustrative decisions`;
  document.querySelector("#admin-progress").textContent = `${totals.coveragePercent}%`;
  document.querySelector("#admin-overlap").textContent = "0";

  document.querySelector("#interim-coverage-badge").textContent = `${totals.coveragePercent}% illustrative coverage`;
  for (const selector of ["#interim-unanimous", "#interim-potential", "#interim-false-positive", "#interim-unresolved"]) {
    document.querySelector(selector).textContent = "0";
  }
  for (const selector of ["#interim-unanimous-rate", "#interim-potential-rate", "#interim-false-positive-rate", "#interim-unresolved-rate"]) {
    document.querySelector(selector).textContent = "not calculated in the demo";
  }
  document.querySelector("#interim-conclusion-text").textContent = `${totals.completed.toLocaleString("en-PH")} of ${totals.expected.toLocaleString("en-PH")} illustrative decisions are shown. Because Lorraine has no demo decisions, no pair is presented as fully reviewed and no preliminary research conclusion is calculated.`;

  document.querySelector("#reviewer-progress").innerHTML = snapshot.reviewers.map(reviewer => {
    const activity = demoActivitySummary(reviewer);
    const percent = Math.round(reviewer.completed / snapshot.queueSize * 100);
    const last = activity.lastActivity
      ? new Date(`${activity.lastActivity}T17:00:00+08:00`).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })
      : "Not started";
    return `<tr>
      <td data-label="Reviewer"><a class="reviewer-detail-link" href="demo-reviewer-history.html?id=${encodeURIComponent(reviewer.id)}"><strong>${escapeHTML(reviewer.name)}</strong><small>View all label history →</small></a></td>
      <td data-label="Progress"><div class="progress-meter"><span style="width:${percent}%"></span></div><small>${percent}%</small></td>
      <td data-label="Completed"><strong>${reviewer.completed.toLocaleString("en-PH")}</strong><small> / ${snapshot.queueSize.toLocaleString("en-PH")}</small></td>
      <td data-label="Today"><strong>${activity.today.toLocaleString("en-PH")}</strong></td>
      <td data-label="Streaks"><strong>${activity.activeDays}</strong> <small>illustrative days</small></td>
      <td data-label="Avg. decision time"><strong>${reviewer.averageSeconds === null ? "—" : formatReviewDuration(reviewer.averageSeconds)}</strong><small class="block-label">illustrative timing</small></td>
      <td data-label="Last activity">${last}</td>
    </tr>`;
  }).join("");

  document.querySelector("#label-distribution").innerHTML = snapshot.labels.map(item => {
    const percent = totals.completed ? Math.round(item.count / totals.completed * 100) : 0;
    return `<div><span><strong>${item.label}</strong><small>${item.count.toLocaleString("en-PH")} illustrative labels</small></span><div class="distribution-track"><i style="width:${percent}%"></i></div><b>${percent}%</b></div>`;
  }).join("");

  const reviewerNames = new Map(snapshot.reviewers.map(reviewer => [reviewer.id, reviewer.name]));
  const labelNames = {
    potential_lasa: "LASA",
    false_positive: "Not LASA",
    needs_discussion: "Needs discussion",
  };
  const labelHistory = document.querySelector("#demo-label-history");
  labelHistory.hidden = false;
  document.querySelector("#demo-label-history-body").innerHTML = demoRecentReviews(pairRows).map(review => `<tr>
    <td data-label="Reviewer"><a class="reviewer-detail-link" href="demo-reviewer-history.html?id=${encodeURIComponent(review.reviewerId)}"><strong>${escapeHTML(reviewerNames.get(review.reviewerId) || "Reviewer")}</strong><small>View profile →</small></a></td>
    <td data-label="Medicine pair"><strong>${escapeHTML(review.medicineA)}</strong><small class="block-label">↔ ${escapeHTML(review.medicineB)}</small></td>
    <td data-label="Label"><span class="review-label ${review.label}">${escapeHTML(labelNames[review.label] || review.label)}</span></td>
    <td data-label="Decision time"><strong>${formatReviewDuration(review.durationSeconds)}</strong></td>
    <td data-label="Saved">${new Date(review.reviewedAt).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}</td>
  </tr>`).join("");
}
