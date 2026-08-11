import { destinationForRole, getCurrentAccount } from "./auth.js?v=20260809-1";
import { isSupabaseConfigured, supabase } from "./supabase-client.js?v=20260809-1";
import { installThemeToggle } from "./modules/theme.js?v=20260811-1";
installThemeToggle();

const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#login-error");
const warning = document.querySelector("#configuration-warning");
const submit = form.querySelector("button[type='submit']");

if (!isSupabaseConfigured) {
  warning.hidden = false;
  submit.disabled = true;
} else {
  const account = await getCurrentAccount();
  if (account) location.replace(destinationForRole(account.profile.role));
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  errorMessage.hidden = true;
  submit.disabled = true;
  submit.textContent = "Signing in…";
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    errorMessage.textContent = error.message === "Invalid login credentials"
      ? "The email or password is incorrect. Please try again."
      : error.message;
    errorMessage.hidden = false;
    submit.disabled = false;
    submit.textContent = "Sign in to review";
    return;
  }
  const account = await getCurrentAccount();
  const requested = new URLSearchParams(location.search).get("next");
  const safeNext = requested && /^[a-z0-9-]+\.html$/i.test(requested) ? requested : "";
  location.replace(safeNext && account.profile.role === "admin" ? safeNext : destinationForRole(account.profile.role));
});
