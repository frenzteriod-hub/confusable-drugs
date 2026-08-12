import { escapeHTML, installSignOut, requireAccount } from "./auth.js?v=20260812-3";
import { supabase } from "./supabase-client.js?v=20260809-1";
import { activityCalendar, activityLevel, buildDailyCounts, buildDailyReviewActivity, calculateLongestStreak, calculateStreak, dayKey } from "./modules/review-stats.js?v=20260809-2";
import { formatReviewDuration, includedReviewSeconds, summarizeReviewDurations } from "./modules/review-timing.js?v=20260809-1";
import { installThemeToggle } from "./modules/theme.js?v=20260811-1";
import { installAccountSettings } from "./modules/account-settings.js?v=20260812-3";
import { loadReviewSettings, saveReviewSettings } from "./modules/reviewer-settings.js?v=20260809-1";
installThemeToggle();

const account = await requireAccount(["reviewer"]);
installSignOut();
installAccountSettings({ account, supabase });
installReviewSettings();

const [{ count: pairCount, error: pairError }, { count: activeReviewedCount, error: activeReviewError }, reviewResult] = await Promise.all([
  supabase.from("review_pairs").select("id", { count: "exact", head: true }).eq("is_active", true),
  supabase.from("reviewer_queue").select("pair_id", { count: "exact", head: true }).not("review_id", "is", null),
  loadReviews(),
]);
const { data: reviews, error: reviewError } = reviewResult;

if (pairError || activeReviewError || reviewError) throw pairError || activeReviewError || reviewError;

const counts = buildDailyCounts(reviews);
const today = counts[dayKey(new Date())] || 0;
const total = activeReviewedCount || 0;
const pending = Math.max(0, pairCount - total);
document.querySelector("#today-count").textContent = today.toLocaleString("en-PH");
document.querySelector("#streak-count").textContent = calculateStreak(counts).toLocaleString("en-PH");
document.querySelector("#longest-streak-count").textContent = calculateLongestStreak(counts).toLocaleString("en-PH");
document.querySelector("#reviewed-count").textContent = total.toLocaleString("en-PH");
document.querySelector("#reviewed-percent").textContent = pairCount ? `${Math.round(total / pairCount * 100)}% of the queue` : "of the queue";
document.querySelector("#pending-count").textContent = pending.toLocaleString("en-PH");

const activity = activityCalendar(counts);
const dailyActivity = buildDailyReviewActivity(reviews, undefined, includedReviewSeconds);
const timingSummary = summarizeReviewDurations(reviews);
document.querySelector("#activity-total").textContent = `${activity.days.reduce((sum, day) => sum + (day.count || 0), 0).toLocaleString("en-PH")} labels in 12 months`;
document.querySelector("#average-review-time").textContent = timingSummary.averageSeconds === null ? "Not available" : formatReviewDuration(timingSummary.averageSeconds);
document.querySelector("#timed-review-count").textContent = timingSummary.timedCount.toLocaleString("en-PH");
document.querySelector("#excluded-review-count").textContent = timingSummary.excludedCount.toLocaleString("en-PH");
document.querySelector("#activity-months").innerHTML = activity.months.map(month => `<span style="grid-column:${month.week}">${month.label}</span>`).join("");
document.querySelector("#activity-grid").innerHTML = activity.days.map(day => {
  if (day.future) return '<span class="future-day" aria-hidden="true"></span>';
  const details = dailyActivity[day.date] || { count: 0, timedCount: 0, totalSeconds: 0, firstAt: null, lastAt: null };
  const label = `${day.date}: ${day.count} label${day.count === 1 ? "" : "s"}. Select for timing details.`;
  return `<button class="activity-day" type="button" data-level="${activityLevel(day.count)}" data-date="${day.date}" data-count="${details.count}" data-timed-count="${details.timedCount}" data-total-seconds="${details.totalSeconds}" data-first-at="${details.firstAt || ""}" data-last-at="${details.lastAt || ""}" aria-label="${label}"></button>`;
}).join("");

installActivityTooltip();

function installReviewSettings() {
  const button = document.querySelector("#review-settings-button");
  const dialog = document.querySelector("#review-settings-dialog");
  const autosave = document.querySelector("#setting-autosave");
  const focusMode = document.querySelector("#setting-focus-mode");
  const status = document.querySelector("#review-settings-status");
  let settings = loadReviewSettings(account.user.id);

  const paint = () => {
    autosave.checked = settings.autosave;
    focusMode.checked = settings.focusMode;
    button.classList.toggle("enabled", settings.autosave || settings.focusMode);
    button.textContent = settings.autosave || settings.focusMode ? "Settings · On" : "Settings";
  };
  const persist = () => {
    settings = { autosave: autosave.checked, focusMode: focusMode.checked };
    const saved = saveReviewSettings(account.user.id, settings);
    status.textContent = saved ? "Settings saved for this browser." : "Settings are active, but this browser blocked persistent storage.";
    paint();
  };

  button.addEventListener("click", () => {
    paint();
    status.textContent = "Changes apply immediately.";
    if (!dialog.open) dialog.showModal();
  });
  autosave.addEventListener("change", persist);
  focusMode.addEventListener("change", persist);
  paint();
}

const recent = document.querySelector("#recent-reviews");
recent.innerHTML = reviews.filter(review => review.review_pairs).slice(0, 6).map(review => `<article>
  <div><strong>${escapeHTML(review.review_pairs.name_a)} <span>↔</span> ${escapeHTML(review.review_pairs.name_b)}</strong><small>${reviewTimestamp(review)}</small></div>
  <span class="review-label ${escapeHTML(review.label)}">${escapeHTML(channelLabelText(review))}</span>
</article>`).join("") || '<div class="empty-panel"><strong>No labels yet</strong><span>Start with your first Cebuano medicine pair.</span><a href="review.html">Begin reviewing</a></div>';

function labelText(label) {
  return { potential_lasa: "LASA", false_positive: "Not LASA", needs_discussion: "Needs discussion" }[label] || label;
}

function channelLabelText(review) {
  return labelText(review.label);
}

async function loadReviews() {
  const base = "pair_id, label, look_alike, sound_alike, reviewed_at, updated_at, review_started_at, review_duration_seconds, review_pairs(name_a, name_b)";
  let result = await supabase.from("reviews").select(base).eq("reviewer_id", account.user.id).order("reviewed_at", { ascending: false });
  if (result.error && /review_started_at|review_duration_seconds|schema cache|column/i.test(result.error.message || "")) {
    result = await supabase.from("reviews").select("pair_id, label, reviewed_at, updated_at, review_pairs(name_a, name_b)").eq("reviewer_id", account.user.id).order("reviewed_at", { ascending: false });
  }
  return result;
}

function reviewTimestamp(review) {
  const saved = new Date(review.reviewed_at).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" });
  const seconds = includedReviewSeconds(review.review_duration_seconds);
  if (seconds !== null) return `${saved} · ${formatReviewDuration(seconds)}`;
  if (Number(review.review_duration_seconds) >= 3600) return `${saved} · timing excluded`;
  return saved;
}

function installActivityTooltip() {
  const grid = document.querySelector("#activity-grid");
  const tooltip = document.querySelector("#activity-tooltip");
  let pinned = false;

  function show(cell, pin = false) {
    if (!cell) return;
    pinned = pin;
    const count = Number(cell.dataset.count);
    const timedCount = Number(cell.dataset.timedCount);
    const totalSeconds = Number(cell.dataset.totalSeconds);
    const average = timedCount ? Math.round(totalSeconds / timedCount) : null;
    const date = new Date(`${cell.dataset.date}T12:00:00+08:00`).toLocaleDateString("en-PH", { dateStyle: "full" });
    const first = cell.dataset.firstAt ? new Date(Number(cell.dataset.firstAt)).toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" }) : null;
    const last = cell.dataset.lastAt ? new Date(Number(cell.dataset.lastAt)).toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" }) : null;
    tooltip.innerHTML = `<strong>${escapeHTML(date)}</strong><span>${count.toLocaleString("en-PH")} label${count === 1 ? "" : "s"}</span><small>${average === null ? "No eligible timing data" : `Average ${formatReviewDuration(average)} · ${timedCount} timed`}</small>${first ? `<small>First ${first} · Last ${last}</small>` : ""}`;
    tooltip.hidden = false;
    const rect = cell.getBoundingClientRect();
    requestAnimationFrame(() => {
      const box = tooltip.getBoundingClientRect();
      const left = Math.min(innerWidth - box.width - 10, Math.max(10, rect.left + rect.width / 2 - box.width / 2));
      const above = rect.top - box.height - 10;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${above > 8 ? above : rect.bottom + 10}px`;
    });
  }

  function hide() {
    if (!pinned) tooltip.hidden = true;
  }

  grid.addEventListener("pointerover", event => show(event.target.closest(".activity-day")));
  grid.addEventListener("pointerout", hide);
  grid.addEventListener("focusin", event => show(event.target.closest(".activity-day")));
  grid.addEventListener("focusout", hide);
  grid.addEventListener("click", event => {
    const cell = event.target.closest(".activity-day");
    if (cell) show(cell, true);
  });
  document.addEventListener("pointerdown", event => {
    if (!event.target.closest(".activity-day") && !event.target.closest("#activity-tooltip")) {
      pinned = false;
      tooltip.hidden = true;
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      pinned = false;
      tooltip.hidden = true;
    }
  });
  addEventListener("scroll", () => { if (!pinned) tooltip.hidden = true; }, true);
}
