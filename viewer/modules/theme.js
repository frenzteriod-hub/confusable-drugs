/* Theme preference: Light / Dark.
 *
 * Stored globally (not per reviewer) because the login page has no signed-in
 * user yet, and a reviewer who picks Dark should not see a light flash before
 * authenticating. `applyStoredTheme()` is called from an inline <head> script
 * so the attribute is set before first paint.
 */
const STORAGE_KEY = "ph-lasa-theme";
export const THEME_ORDER = ["light", "dark"];

export function readTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function writeTheme(theme) {
  if (!THEME_ORDER.includes(theme)) return false;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

export function resolveTheme(theme = readTheme()) {
  return theme === "dark" ? "dark" : "light";
}

export function applyStoredTheme() {
  const theme = readTheme();
  document.documentElement.dataset.theme = resolveTheme(theme);
  document.documentElement.dataset.themePreference = theme;
}

/** Mount a Light/Dark toggle into every navigation or explicit theme control. */
export function installThemeToggle() {
  applyStoredTheme();

  const buttons = [];
  document.querySelectorAll(".site-nav, [data-theme-controls]").forEach(container => {
    if (container.querySelector("[data-theme-toggle]")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nav-settings-button theme-toggle-button";
    button.dataset.themeToggle = "";
    container.append(button);
    buttons.push(button);
  });

  function paint() {
    const theme = readTheme();
    const dark = theme === "dark";
    buttons.forEach(button => {
      button.textContent = dark ? "☀ Light mode" : "☾ Dark mode";
      button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("aria-pressed", String(dark));
      button.title = dark ? "Switch to light mode" : "Switch to dark mode";
    });
  }

  buttons.forEach(button => button.addEventListener("click", () => {
    const next = readTheme() === "dark" ? "light" : "dark";
    writeTheme(next);
    applyStoredTheme();
    paint();
  }));

  paint();
}
