export const DEFAULT_REVIEW_SETTINGS = Object.freeze({
  autosave: false,
  focusMode: false,
});

function settingsKey(userId) {
  return `ph-lasa-review-settings:${userId}`;
}

export function loadReviewSettings(userId) {
  try {
    const saved = JSON.parse(localStorage.getItem(settingsKey(userId)) || "null");
    return {
      autosave: typeof saved?.autosave === "boolean" ? saved.autosave : DEFAULT_REVIEW_SETTINGS.autosave,
      focusMode: typeof saved?.focusMode === "boolean" ? saved.focusMode : DEFAULT_REVIEW_SETTINGS.focusMode,
    };
  } catch {
    return { ...DEFAULT_REVIEW_SETTINGS };
  }
}

export function saveReviewSettings(userId, settings) {
  const normalized = {
    autosave: Boolean(settings.autosave),
    focusMode: Boolean(settings.focusMode),
  };
  try {
    localStorage.setItem(settingsKey(userId), JSON.stringify(normalized));
    return true;
  } catch {
    return false;
  }
}
