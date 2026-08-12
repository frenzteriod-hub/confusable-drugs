import { escapeHTML, installSignOut, requireAccount } from "./auth.js?v=20260809-2";
import { supabase } from "./supabase-client.js?v=20260809-1";
import { showMedicineComparison, showMedicineEvidence } from "./modules/medicine-evidence.js?v=20260811-1";
import { loadReviewSettings, saveReviewSettings } from "./modules/reviewer-settings.js?v=20260809-1";
import { createReviewTimingTracker, formatReviewDuration, includedReviewSeconds } from "./modules/review-timing.js?v=20260809-1";
import { decisionPayload, savedDecision } from "./modules/review-decision.js?v=20260809-2";
import { installThemeToggle } from "./modules/theme.js?v=20260811-1";
import { installAccountSettings } from "./modules/account-settings.js?v=20260812-2";
installThemeToggle();

const PAGE_SIZE = 12;
const account = await requireAccount(["reviewer"]);
const state = {
  account,
  settings: loadReviewSettings(account.user.id),
  listPage: 1,
  focusIndex: 0,
  count: 0,
  rows: [],
  loadId: 0,
  pendingSavedPairId: null,
  saveTimers: new Map(),
  timing: createReviewTimingTracker(),
  // One-pair mode support. `history` lets "Previous pair" step back to a pair
  // that has just left the pending set, and `sessionReviewed` gives the
  // reviewer visible progress when the offset legitimately stays at 0.
  history: [],
  pinnedPairId: null,
  sessionReviewed: 0,
};
installSignOut();
installAccountSettings({ account, supabase });

const elements = {
  search: document.querySelector("#review-search"),
  status: document.querySelector("#review-status"),
  mode: document.querySelector("#review-mode"),
  count: document.querySelector("#review-count"),
  page: document.querySelector("#review-page"),
  list: document.querySelector("#review-list"),
  workspace: document.querySelector(".review-workspace"),
  previous: document.querySelector("#review-previous"),
  next: document.querySelector("#review-next"),
  settingsButton: document.querySelector("#review-settings-button"),
  settingsDialog: document.querySelector("#review-settings-dialog"),
  autosave: document.querySelector("#setting-autosave"),
  focusMode: document.querySelector("#setting-focus-mode"),
  settingsStatus: document.querySelector("#review-settings-status"),
  unsavedDialog: document.querySelector("#unsaved-review-dialog"),
  unsavedTitle: document.querySelector("#unsaved-review-title"),
  unsavedDetail: document.querySelector("#unsaved-review-detail"),
  unsavedSave: document.querySelector("#unsaved-save"),
  unsavedDiscard: document.querySelector("#unsaved-discard"),
  unsavedCancel: document.querySelector("#unsaved-cancel"),
};

const timingObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
      const pairId = Number(entry.target.dataset.pairId);
      const row = state.rows.find(item => item.pair_id === pairId);
      if (!row?.review_id) state.timing.start(pairId);
    }
  });
}, { threshold: [0.35] }) : null;

const initialStatus = new URLSearchParams(location.search).get("status");
if (["pending", "completed", "all"].includes(initialStatus)) elements.status.value = initialStatus;

function resetPosition() {
  state.listPage = 1;
  state.focusIndex = 0;
  state.pendingSavedPairId = null;
  state.history = [];
  state.pinnedPairId = null;
}

function currentStart() {
  return state.settings.focusMode ? state.focusIndex : (state.listPage - 1) * PAGE_SIZE;
}

/* ---------------------------------------------------------------------------
 * Unsaved-decision guard.
 *
 * Auto-save is off by default, so in one-pair mode the natural flow -- pick a
 * label, press "Next pair" -- previously discarded the label with no warning.
 * A card is dirty when its on-screen decision or note differs from what is
 * stored for that pair.
 * ------------------------------------------------------------------------ */
function cardIsDirty(card) {
  if (!card) return false;
  const pairId = Number(card.dataset.pairId);
  const row = state.rows.find(item => item.pair_id === pairId);
  const decision = card.querySelector(".decision-choice:checked")?.value || "";
  const notes = card.querySelector("textarea")?.value.trim() || "";
  return decision !== savedDecision(row || {}) || notes !== (row?.notes || "").trim();
}

function dirtyCard() {
  return [...elements.list.querySelectorAll(".review-pair-card")].find(cardIsDirty) || null;
}

/* A pair shown but never decided. Only enforced in one-pair mode: there the
 * reviewer is working strictly pair-by-pair, so moving on without an answer
 * leaves a silent hole in the dataset. In list mode most of the twelve cards
 * on screen are legitimately undecided, so paging must not be blocked.
 * "Needs discussion" is the intended answer for uncertainty. */
function undecidedCard() {
  if (!state.settings.focusMode) return null;
  return [...elements.list.querySelectorAll(".review-pair-card")].find(card =>
    card.dataset.reviewed !== "1" && !card.querySelector(".decision-choice:checked")
  ) || null;
}

// Runs `proceed()` unless the pair is unsaved or undecided, in which case the
// reviewer resolves it first.
function guardNavigation(proceed, { checkUndecided = true } = {}) {
  const dirty = state.settings.autosave ? null : dirtyCard();
  // Changing a filter is deliberate navigation, not skipping a pair, so the
  // undecided check applies only to Previous/Next.
  const undecided = checkUndecided ? undecidedCard() : null;
  const card = dirty || undecided;
  if (!card) return proceed();

  const decision = card.querySelector(".decision-choice:checked")?.value || "";
  const isUndecided = !decision && card.dataset.reviewed !== "1";

  elements.unsavedTitle.textContent = isUndecided
    ? "No decision on this pair yet"
    : "You have not saved this pair";
  elements.unsavedDetail.textContent = isUndecided
    ? "Choose LASA, Not LASA, or Needs discussion. If you are unsure, Needs discussion is the right answer — skipping leaves a gap in the review set."
    : "Your changes to this pair have not been saved yet. Leaving now would discard them.";

  // Nothing to save when no decision exists, so offer the deliberate skip.
  elements.unsavedSave.hidden = isUndecided;
  elements.unsavedSave.disabled = false;
  elements.unsavedDiscard.textContent = isUndecided
    ? "Skip without deciding"
    : "Discard and continue";
  elements.unsavedCancel.textContent = isUndecided
    ? "Go back and decide"
    : "Stay on this pair";

  state.pendingNavigation = { card, proceed };
  if (!elements.unsavedDialog.open) elements.unsavedDialog.showModal();
}

function closeUnsavedDialog() {
  if (elements.unsavedDialog.open) elements.unsavedDialog.close();
  state.pendingNavigation = null;
}

elements.unsavedSave.addEventListener("click", async () => {
  const pending = state.pendingNavigation;
  if (!pending) return closeUnsavedDialog();
  elements.unsavedSave.disabled = true;
  await saveReview(pending.card);
  elements.unsavedSave.disabled = false;
  if (cardIsDirty(pending.card)) return; // save failed; keep the reviewer here
  closeUnsavedDialog();
  pending.proceed();
});

elements.unsavedDiscard.addEventListener("click", () => {
  const pending = state.pendingNavigation;
  closeUnsavedDialog();
  pending?.proceed();
});

elements.unsavedCancel.addEventListener("click", closeUnsavedDialog);
elements.unsavedDialog.addEventListener("cancel", event => { event.preventDefault(); closeUnsavedDialog(); });

// Closing the tab or following a link is the same hazard.
window.addEventListener("beforeunload", event => {
  if (state.settings.autosave || !dirtyCard()) return;
  event.preventDefault();
  event.returnValue = "";
});

async function loadQueue({ scrollToList = false } = {}) {
  const loadId = ++state.loadId;
  elements.list.innerHTML = '<p class="loading-message">Loading score-free review queue…</p>';
  let query = supabase.from("reviewer_queue").select("*", { count: "exact" }).order("review_order");
  const search = elements.search.value.trim().toLocaleLowerCase().replaceAll("%", "\\%").replaceAll("_", "\\_");
  if (search) query = query.ilike("search_text", `%${search}%`);
  if (elements.mode.value) query = query.eq("comparison_type", elements.mode.value);
  if (elements.status.value === "pending") query = query.is("review_id", null);
  if (elements.status.value === "completed") query = query.not("review_id", "is", null);
  // "Previous pair" can ask for a specific pair that has already left the
  // current filter (a pair just labeled drops out of the Pending set). Pin it
  // by id and bypass the status filter so it can still be corrected.
  if (state.pinnedPairId !== null) {
    let pinned = supabase.from("reviewer_queue").select("*", { count: "exact" }).eq("pair_id", state.pinnedPairId);
    const pinnedResult = await pinned;
    if (loadId !== state.loadId) return;
    if (!pinnedResult.error && pinnedResult.data?.length) {
      state.rows = pinnedResult.data;
      render();
      if (scrollToList) requestAnimationFrame(() => elements.list.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    state.pinnedPairId = null; // fall through to the normal offset query
  }
  const start = currentStart();
  const end = state.settings.focusMode ? start : start + PAGE_SIZE - 1;
  const { data, count, error } = await query.range(start, end);
  if (loadId !== state.loadId) return;
  if (error) {
    elements.list.innerHTML = `<div class="empty-panel"><strong>Queue could not load</strong><span>${escapeHTML(error.message)}</span></div>`;
    return;
  }
  state.count = count || 0;
  if (state.count && start >= state.count) {
    if (state.settings.focusMode) state.focusIndex = state.count - 1;
    else state.listPage = Math.max(1, Math.ceil(state.count / PAGE_SIZE));
    await loadQueue({ scrollToList });
    return;
  }
  state.rows = data || [];
  render();
  if (scrollToList) requestAnimationFrame(() => elements.list.scrollIntoView({ behavior: "smooth", block: "start" }));
}

function render() {
  const focusMode = state.settings.focusMode;
  const pages = Math.max(1, Math.ceil(state.count / PAGE_SIZE));
  elements.workspace.classList.toggle("focus-review-workspace", focusMode);
  elements.list.classList.toggle("focus-review-list", focusMode);
  elements.count.textContent = state.count.toLocaleString("en-PH");
  // In Pending + one-pair mode the offset legitimately stays at 0: each labeled
  // pair leaves the pending set, so position 0 is already the next pair. Showing
  // "Pair 1 of N" there looks stuck, so report progress instead.
  const pendingFocus = focusMode && elements.status.value === "pending" && state.pinnedPairId === null;
  if (state.pinnedPairId !== null) {
    elements.page.textContent = "Revisiting an earlier pair · one-pair mode";
  } else if (pendingFocus) {
    const done = state.sessionReviewed;
    elements.page.textContent = `${state.count.toLocaleString("en-PH")} pairs remaining · ${done.toLocaleString("en-PH")} labeled this session · one-pair mode`;
  } else if (focusMode) {
    elements.page.textContent = `Pair ${state.count ? state.focusIndex + 1 : 0} of ${state.count.toLocaleString("en-PH")} · one-pair mode`;
  } else {
    elements.page.textContent = `Page ${state.listPage} of ${pages}`;
  }
  elements.previous.textContent = focusMode ? "← Previous pair" : "← Previous";
  elements.next.textContent = focusMode ? "Next pair →" : "Next →";
  // Previous stays available whenever there is somewhere to go back to, so a
  // mis-clicked label can be corrected without changing the status filter.
  elements.previous.disabled = focusMode
    ? (state.focusIndex <= 0 && state.history.length === 0 && state.pinnedPairId === null)
    : state.listPage <= 1;
  elements.next.disabled = focusMode
    ? (state.pinnedPairId === null && state.focusIndex >= state.count - 1)
    : state.listPage >= pages;
  timingObserver?.disconnect();
  elements.list.innerHTML = state.rows.map(row => `<article class="review-pair-card ${row.review_id ? "reviewed" : "pending"}" data-pair-id="${row.pair_id}" data-reviewed="${row.review_id ? "1" : "0"}">
    <div class="pair-card-heading">
      <span class="review-state">${row.review_id ? "Reviewed" : "Pending"}</span>
      <span class="comparison-type">${escapeHTML(modeText(row.comparison_type))}</span>
    </div>
    <div class="medicine-pair">
      <div><small>Name A · ${escapeHTML(row.name_a_type)}</small><strong>${escapeHTML(row.name_a)}</strong>
        <div class="review-medicine-actions"><button class="medicine-evidence-button" type="button" data-medicine-name="${escapeHTML(row.name_a)}" data-medicine-type="${escapeHTML(row.name_a_type)}">View local FDA records</button></div></div>
      <span aria-hidden="true">↔</span>
      <div><small>Name B · ${escapeHTML(row.name_b_type)}</small><strong>${escapeHTML(row.name_b)}</strong>
        <div class="review-medicine-actions"><button class="medicine-evidence-button" type="button" data-medicine-name="${escapeHTML(row.name_b)}" data-medicine-type="${escapeHTML(row.name_b_type)}">View local FDA records</button></div></div>
    </div>
    <div class="pair-evidence-actions"><button class="pair-evidence-button" type="button"
      data-name-a="${escapeHTML(row.name_a)}" data-type-a="${escapeHTML(row.name_a_type)}"
      data-name-b="${escapeHTML(row.name_b)}" data-type-b="${escapeHTML(row.name_b_type)}"
      aria-label="Auto-search both medicines in local PH FDA records and compare">Auto-search both &amp; compare</button></div>
    <fieldset class="label-options primary-decision-options"><legend>Your independent decision</legend>
      ${decisionButton(row, "lasa", "LASA", "Plausibly confusable in Cebuano-context practice")}
      ${decisionButton(row, "not_lasa", "Not LASA", "Not plausibly confusable in this context")}
      ${decisionButton(row, "discussion", "Needs discussion", "Use this instead of guessing")}
    </fieldset>
    <div class="review-notes-panel"><label class="review-notes"><span>Optional comment</span><textarea rows="2" maxlength="1000" placeholder="Add a brief comment if useful…">${escapeHTML(row.notes || "")}</textarea></label></div>
    <div class="pair-card-footer"><span class="save-status" role="status">${reviewStatusText(row)}</span><button class="primary-action save-review" type="button">${saveButtonText(row)}</button></div>
  </article>`).join("") || '<div class="empty-panel"><strong>No pairs match this view</strong><span>Try a different status, comparison type, or medicine name.</span></div>';
  elements.list.querySelectorAll(".review-pair-card.pending").forEach(card => timingObserver?.observe(card));
}

function decisionButton(row, value, title, help) {
  return `<label class="label-choice"><input class="decision-choice" type="radio" name="decision-${row.pair_id}" value="${value}" ${savedDecision(row) === value ? "checked" : ""}><span><strong>${title}</strong><small>${help}</small></span></label>`;
}

function reviewValues(card) {
  const decision = card.querySelector(".decision-choice:checked")?.value || "";
  return decisionPayload(decision);
}

function saveButtonText(row) {
  if (state.settings.autosave) return "Save now";
  return row.review_id ? "Update label" : "Save review";
}

function reviewStatusText(row) {
  if (!row.reviewed_at) return "Not reviewed yet";
  const saved = new Date(row.reviewed_at).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" });
  const seconds = includedReviewSeconds(row.review_duration_seconds);
  if (seconds !== null) return `Labeled ${saved} · ${formatReviewDuration(seconds)}`;
  if (Number(row.review_duration_seconds) >= 3600) return `Labeled ${saved} · timing excluded (1 hr or longer)`;
  return `Labeled ${saved}`;
}

function scheduleAutosave(card, delay = 250) {
  const pairId = Number(card.dataset.pairId);
  clearTimeout(state.saveTimers.get(pairId));
  const status = card.querySelector(".save-status");
  status.classList.remove("error");
  status.textContent = delay > 300 ? "Autosave pending…" : "Autosaving shortly…";
  state.saveTimers.set(pairId, setTimeout(() => {
    state.saveTimers.delete(pairId);
    saveReview(card, { automatic: true });
  }, delay));
}

async function saveReview(card, { automatic = false } = {}) {
  const values = reviewValues(card);
  const status = card.querySelector(".save-status");
  const button = card.querySelector(".save-review");
  if (!values) {
    status.textContent = "Choose LASA, Not LASA, or Needs discussion. For LASA, also choose why.";
    status.classList.add("error");
    return;
  }
  if (button.dataset.saving === "true") {
    if (automatic) scheduleAutosave(card, 350);
    return;
  }
  button.dataset.saving = "true";
  button.disabled = true;
  status.classList.remove("error");
  status.textContent = automatic ? "Autosaving…" : "Saving…";
  const pairId = Number(card.dataset.pairId);
  const row = state.rows.find(item => item.pair_id === pairId);
  // Read "already reviewed?" from the card, not from state.rows. A debounced
  // autosave can fire after navigation has replaced state.rows, and the lookup
  // would then miss, mark the save as a first review, and start+finish the
  // timer back to back -- recording a near-zero review_duration_seconds.
  const firstReview = card.dataset.reviewed !== "1";
  const payload = {
    pair_id: pairId,
    reviewer_id: state.account.user.id,
    label: values.label,
    look_alike: values.lookAlike,
    sound_alike: values.soundAlike,
    notes: card.querySelector("textarea").value.trim() || null,
  };
  let timing = null;
  let timingCaptured = false;
  let result;
  if (firstReview) {
    state.timing.start(pairId);
    timing = state.timing.finish(pairId);
    result = await supabase.from("reviews").upsert({
      ...payload,
      review_started_at: timing.startedAt,
      review_duration_seconds: timing.durationSeconds,
    }, { onConflict: "pair_id,reviewer_id" }).select("id, reviewed_at, review_started_at, review_duration_seconds").single();
    timingCaptured = !result.error;
    if (result.error && isTimingSchemaError(result.error)) {
      result = await supabase.from("reviews").upsert(payload, { onConflict: "pair_id,reviewer_id" }).select("id, reviewed_at").single();
    }
  } else {
    result = await supabase.from("reviews").upsert(payload, { onConflict: "pair_id,reviewer_id" }).select("id, reviewed_at, review_started_at, review_duration_seconds").single();
    if (result.error && isTimingSchemaError(result.error)) {
      result = await supabase.from("reviews").upsert(payload, { onConflict: "pair_id,reviewer_id" }).select("id, reviewed_at").single();
    }
  }
  const { data, error } = result;
  if (error) {
    status.textContent = error.message;
    status.classList.add("error");
    button.disabled = false;
    delete button.dataset.saving;
    if (firstReview) state.timing.start(pairId);
    return;
  }
  if (row) Object.assign(row, {
    review_id: data.id,
    reviewed_at: data.reviewed_at,
    review_started_at: data.review_started_at || (timingCaptured ? timing?.startedAt : row.review_started_at),
    review_duration_seconds: data.review_duration_seconds ?? (timingCaptured ? timing?.durationSeconds : row.review_duration_seconds),
    label: payload.label,
    look_alike: payload.look_alike,
    sound_alike: payload.sound_alike,
    notes: payload.notes,
  });
  if (elements.status.value === "pending") state.pendingSavedPairId = payload.pair_id;
  if (firstReview) state.sessionReviewed += 1;
  const savedRow = state.rows.find(item => item.pair_id === pairId);
  if (savedRow) {
    // Keep the in-memory row in step with what was just written, so the
    // unsaved-decision guard does not treat a saved card as still dirty.
    savedRow.review_id = data.id;
    savedRow.label = payload.label;
    savedRow.look_alike = payload.look_alike;
    savedRow.sound_alike = payload.sound_alike;
    savedRow.notes = payload.notes;
    savedRow.reviewed_at = data.reviewed_at;
  }
  card.dataset.reviewed = "1";
  if (card.isConnected) {
    card.classList.remove("pending");
    card.classList.add("reviewed");
    card.querySelector(".review-state").textContent = "Reviewed";
    const timingNote = firstReview && !timingCaptured ? " · timing awaits database upgrade" : "";
    status.textContent = `${automatic ? "Autosaved" : "Saved"} just now${timingNote}${state.settings.focusMode ? " · choose Next pair when ready" : ""}`;
    button.textContent = saveButtonText(row || { review_id: data.id });
    button.disabled = false;
    delete button.dataset.saving;
  }
}

function isTimingSchemaError(error) {
  return /review_started_at|review_duration_seconds|schema cache|column/i.test(`${error?.message || ""} ${error?.details || ""}`);
}

function modeText(mode) {
  return { generic_generic: "Generic ↔ Generic", brand_brand: "Brand ↔ Brand", generic_brand: "Generic ↔ Brand" }[mode] || mode;
}

function applySettingsUI() {
  elements.autosave.checked = state.settings.autosave;
  elements.focusMode.checked = state.settings.focusMode;
  elements.settingsButton.classList.toggle("enabled", state.settings.autosave || state.settings.focusMode);
  elements.settingsButton.textContent = state.settings.autosave || state.settings.focusMode ? "Settings · On" : "Settings";
  document.querySelectorAll(".save-review").forEach(button => {
    const row = state.rows.find(item => item.pair_id === Number(button.closest(".review-pair-card")?.dataset.pairId));
    if (row) button.textContent = saveButtonText(row);
  });
}

function persistSettings() {
  const focusChanged = state.settings.focusMode !== elements.focusMode.checked;
  state.settings = { autosave: elements.autosave.checked, focusMode: elements.focusMode.checked };
  if (!state.settings.autosave) {
    state.saveTimers.forEach(timer => clearTimeout(timer));
    state.saveTimers.clear();
  }
  const saved = saveReviewSettings(state.account.user.id, state.settings);
  elements.settingsStatus.textContent = saved ? "Settings saved for this browser." : "Settings are active, but this browser blocked persistent storage.";
  applySettingsUI();
  if (focusChanged) {
    resetPosition();
    loadQueue({ scrollToList: true });
  } else if (state.settings.autosave) {
    elements.list.querySelectorAll(".review-pair-card").forEach(card => {
      if (reviewValues(card)) scheduleAutosave(card);
    });
  }
}

let searchTimer;
elements.search.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => guardNavigation(() => { resetPosition(); loadQueue(); }, { checkUndecided: false }), 250);
});
[elements.status, elements.mode].forEach(element => element.addEventListener("change", () => guardNavigation(() => { resetPosition(); loadQueue(); }, { checkUndecided: false })));
elements.previous.addEventListener("click", () => guardNavigation(() => {
  state.pendingSavedPairId = null;
  if (state.settings.focusMode) {
    // Prefer stepping back through pairs actually visited; a pair labeled in
    // Pending mode has left the filter, so an offset alone cannot reach it.
    const earlier = state.history.pop();
    if (earlier !== undefined) state.pinnedPairId = earlier;
    else if (state.focusIndex > 0) { state.pinnedPairId = null; state.focusIndex -= 1; }
  } else {
    state.listPage -= 1;
  }
  loadQueue({ scrollToList: true });
}));
elements.next.addEventListener("click", () => guardNavigation(() => {
  if (state.settings.focusMode) {
    const currentPairId = state.rows[0]?.pair_id;
    if (currentPairId !== undefined) state.history.push(currentPairId);
    if (state.pinnedPairId !== null) {
      // Returning from a revisited pair: resume the normal queue position.
      state.pinnedPairId = null;
    } else if (!(elements.status.value === "pending" && state.pendingSavedPairId === currentPairId)) {
      state.focusIndex += 1;
    }
  } else if (!(elements.status.value === "pending" && state.pendingSavedPairId !== null)) {
    state.listPage += 1;
  }
  state.pendingSavedPairId = null;
  loadQueue({ scrollToList: true });
}));
elements.settingsButton.addEventListener("click", () => {
  applySettingsUI();
  elements.settingsStatus.textContent = "Changes apply immediately.";
  if (!elements.settingsDialog.open) elements.settingsDialog.showModal();
});
[elements.autosave, elements.focusMode].forEach(element => element.addEventListener("change", persistSettings));
elements.list.addEventListener("change", event => {
  const choice = event.target.closest(".decision-choice");
  if (choice && state.settings.autosave && reviewValues(choice.closest(".review-pair-card"))) {
    scheduleAutosave(choice.closest(".review-pair-card"));
  }
});
function beginCardTiming(event) {
  const card = event.target.closest?.(".review-pair-card.pending");
  if (card) state.timing.start(Number(card.dataset.pairId));
}
elements.list.addEventListener("pointerdown", beginCardTiming);
elements.list.addEventListener("focusin", beginCardTiming);
elements.list.addEventListener("input", event => {
  const notes = event.target.closest(".review-notes textarea");
  if (!notes || !state.settings.autosave) return;
  const card = notes.closest(".review-pair-card");
  if (reviewValues(card)) scheduleAutosave(card, 800);
});
elements.list.addEventListener("click", event => {
  const comparisonButton = event.target.closest(".pair-evidence-button");
  if (comparisonButton) {
    showMedicineComparison(
      { name: comparisonButton.dataset.nameA, type: comparisonButton.dataset.typeA },
      { name: comparisonButton.dataset.nameB, type: comparisonButton.dataset.typeB },
    );
    return;
  }
  const evidenceButton = event.target.closest(".medicine-evidence-button");
  if (evidenceButton) {
    showMedicineEvidence(evidenceButton.dataset.medicineName, evidenceButton.dataset.medicineType);
    return;
  }
  const saveButton = event.target.closest(".save-review");
  if (saveButton) saveReview(saveButton.closest(".review-pair-card"));
});

applySettingsUI();
loadQueue();
