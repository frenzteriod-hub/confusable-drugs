import { destinationForRole, getCurrentAccount } from "./auth.js?v=20260812-3";
import { isSupabaseConfigured, supabase } from "./supabase-client.js?v=20260809-1";
import { installThemeToggle } from "./modules/theme.js?v=20260811-1";
installThemeToggle();

const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#login-error");
const warning = document.querySelector("#configuration-warning");
const submit = form.querySelector("button[type='submit']");

function destination(account) {
  const next = new URLSearchParams(location.search).get("next");
  const allowed = account.profile.role === "reviewer"
    ? ["review.html", "reviewer-dashboard.html"] : ["admin-dashboard.html"];
  return allowed.includes(next) ? next : destinationForRole(account.profile.role);
}

function showError(error) {
  errorMessage.textContent = error.message === "Invalid login credentials"
    ? "The username or password is incorrect. Please try again." : error.message;
  errorMessage.hidden = false;
}

if (!isSupabaseConfigured) {
  warning.hidden = false;
  submit.disabled = true;
} else {
  try {
    const account = await getCurrentAccount();
    if (account) location.replace(destination(account));
  } catch (error) {
    showError(error);
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  errorMessage.hidden = true;
  submit.disabled = true;
  submit.textContent = "Signing in…";
  try {
    const login = document.querySelector("#login-name").value.trim().toLowerCase();
    const email = login.includes("@") ? login : `${login}@cebuano-lasa.local`;
    const password = document.querySelector("#password").value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const account = await getCurrentAccount();
    if (!account) throw new Error("Your session could not be restored. Please sign in again.");
    location.replace(destination(account));
  } catch (error) {
    showError(error);
  } finally {
    submit.disabled = false;
    submit.textContent = "Sign in to review";
  }
});
