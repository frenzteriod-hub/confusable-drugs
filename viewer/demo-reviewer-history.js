import { escapeHTML, installSignOut, requireAccount } from "./auth.js?v=20260812-3";
import { supabase } from "./supabase-client.js?v=20260809-1";
import { DEMO_ADMIN_SNAPSHOT, demoReviewerHistory, loadDemoPairRows } from "./modules/demo-admin-data.js?v=20260817-4";
import { buildDailyCounts, calculateLongestStreak, calculateStreak } from "./modules/review-stats.js?v=20260809-2";
import { formatReviewDuration } from "./modules/review-timing.js?v=20260809-1";
import { reviewerLabelDistribution, reviewerLabelText } from "./modules/review-decision.js?v=20260812-3";
import { installThemeToggle } from "./modules/theme.js?v=20260811-1";

installThemeToggle();
await requireAccount(["demo_admin"]);
installSignOut();

const PAGE_SIZE = 25;
const reviewerId = new URLSearchParams(location.search).get("id");
const reviewer = DEMO_ADMIN_SNAPSHOT.reviewers.find(item => item.id === reviewerId);
if (!reviewer) failPage("Reviewer not found.");

let reviews;
try {
  reviews = demoReviewerHistory(reviewer, await loadDemoPairRows(supabase, reviewer.completed));
} catch (error) {
  failPage(error.message || "Real medicine pairs could not be loaded.");
}
const state = { page: 1 };
const elements = {
  search: document.querySelector("#audit-history-search"),
  label: document.querySelector("#audit-history-label"),
  body: document.querySelector("#audit-history-body"),
  count: document.querySelector("#audit-history-count"),
  page: document.querySelector("#audit-history-page"),
  previous: document.querySelector("#audit-history-previous"),
  next: document.querySelector("#audit-history-next"),
};

document.title = `${reviewer.name} · Reviewer profile`;
document.querySelector("#reviewer-name").textContent = reviewer.name;
renderSummary();
renderDistribution();
renderTimeline();
renderHistory();

function renderSummary() {
  const rows = reviews.map(review => ({ reviewed_at: review.reviewedAt }));
  const counts = buildDailyCounts(rows);
  const percent = Math.round(reviews.length / DEMO_ADMIN_SNAPSHOT.queueSize * 100);
  document.querySelector("#audit-reviewed").textContent = reviews.length.toLocaleString("en-PH");
  document.querySelector("#audit-progress").textContent = `${percent}% of the queue`;
  document.querySelector("#audit-current-streak").textContent = calculateStreak(counts).toLocaleString("en-PH");
  document.querySelector("#audit-longest-streak").textContent = calculateLongestStreak(counts).toLocaleString("en-PH");
  document.querySelector("#audit-average-time").textContent = reviewer.averageSeconds === null ? "Not available" : formatReviewDuration(reviewer.averageSeconds);
  document.querySelector("#audit-pending").textContent = (DEMO_ADMIN_SNAPSHOT.queueSize - reviews.length).toLocaleString("en-PH");
}

function renderDistribution() {
  const labels = reviewerLabelDistribution(reviews);
  document.querySelector("#audit-label-distribution").innerHTML = labels.map(({ count, title }) => {
    const percent = reviews.length ? Math.round(count / reviews.length * 100) : 0;
    return `<div><span><strong>${escapeHTML(title)}</strong><small>${count.toLocaleString("en-PH")} labels</small></span><div class="distribution-track"><i style="width:${percent}%"></i></div><b>${percent}%</b></div>`;
  }).join("");
}

function renderTimeline() {
  const entries = Object.entries(reviewer.activity).sort(([left], [right]) => right.localeCompare(left));
  document.querySelector("#audit-daily-activity").innerHTML = entries.map(([date, count]) => {
    const percent = reviewer.completed ? Math.round(count / Math.max(...Object.values(reviewer.activity)) * 100) : 0;
    const label = new Date(`${date}T12:00:00+08:00`).toLocaleDateString("en-PH", { dateStyle: "medium" });
    return `<div><span><strong>${escapeHTML(label)}</strong><small>${count.toLocaleString("en-PH")} labels</small></span><div class="distribution-track"><i style="width:${percent}%"></i></div><b>${count.toLocaleString("en-PH")}</b></div>`;
  }).join("") || '<div class="empty-panel"><strong>No activity yet</strong><span>This reviewer has not saved a label.</span></div>';
}

function filteredReviews() {
  const search = elements.search.value.trim().toLocaleLowerCase();
  return reviews.filter(review => {
    const matchesSearch = !search || `${review.medicineA} ${review.medicineB}`.toLocaleLowerCase().includes(search);
    return matchesSearch && (!elements.label.value || review.label === elements.label.value);
  });
}

function renderHistory() {
  const matches = filteredReviews();
  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  state.page = Math.min(state.page, pages);
  const start = (state.page - 1) * PAGE_SIZE;
  const pageRows = matches.slice(start, start + PAGE_SIZE);
  elements.count.textContent = `${matches.length.toLocaleString("en-PH")} review${matches.length === 1 ? "" : "s"}`;
  elements.page.textContent = `Page ${state.page} of ${pages}`;
  elements.previous.disabled = state.page <= 1;
  elements.next.disabled = state.page >= pages;
  elements.body.innerHTML = pageRows.map(review => `<tr>
    <td data-label="Medicine pair"><strong>${escapeHTML(review.medicineA)}</strong><small class="block-label">↔ ${escapeHTML(review.medicineB)}</small></td>
    <td data-label="Label"><span class="review-label ${escapeHTML(review.label)}">${escapeHTML(reviewerLabelText(review.label))}</span></td>
    <td data-label="Decision time"><strong>${escapeHTML(formatReviewDuration(review.durationSeconds))}</strong></td>
    <td data-label="Saved">${new Date(review.reviewedAt).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "medium" })}</td>
  </tr>`).join("") || '<tr><td colspan="4"><div class="empty-panel"><strong>No labels match this view</strong><span>Try another medicine name or label.</span></div></td></tr>';
}

function failPage(message) {
  document.querySelector("main").innerHTML = `<div class="empty-panel"><strong>Reviewer profile unavailable</strong><span>${escapeHTML(message)}</span><a href="admin-dashboard.html">Return to admin dashboard</a></div>`;
  throw new Error(message);
}

let searchTimer;
elements.search.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { state.page = 1; renderHistory(); }, 150);
});
elements.label.addEventListener("change", () => { state.page = 1; renderHistory(); });
elements.previous.addEventListener("click", () => { state.page -= 1; renderHistory(); });
elements.next.addEventListener("click", () => { state.page += 1; renderHistory(); });
