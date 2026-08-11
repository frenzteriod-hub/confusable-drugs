// Apply a saved dark-mode choice before CSS loads. Light is always the default.
try {
  var themePreference = localStorage.getItem("ph-lasa-theme") === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = themePreference;
  document.documentElement.dataset.themePreference = themePreference;
} catch {
  document.documentElement.dataset.theme = "light";
  document.documentElement.dataset.themePreference = "light";
}
