import { configurationMessage, isSupabaseConfigured, supabase } from "./supabase-client.js?v=20260809-1";

export function destinationForRole(role) {
  return role === "admin" ? "admin-dashboard.html" : "reviewer-dashboard.html";
}

export async function getCurrentAccount() {
  if (!isSupabaseConfigured) throw new Error(configurationMessage());
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!session) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, display_name, username, role, is_test_account")
    .eq("id", session.user.id)
    .single();
  if (profileError) throw profileError;
  return { session, user: session.user, profile };
}

export async function requireAccount(allowedRoles = ["admin", "reviewer"]) {
  let account;
  try {
    account = await getCurrentAccount();
  } catch (error) {
    showBlockingError(error.message);
    return new Promise(() => {});
  }

  if (!account) {
    const next = encodeURIComponent(location.pathname.split("/").pop() || "");
    location.replace(`login.html${next ? `?next=${next}` : ""}`);
    return new Promise(() => {});
  }
  if (!allowedRoles.includes(account.profile.role)) {
    location.replace(destinationForRole(account.profile.role));
    return new Promise(() => {});
  }

  document.querySelectorAll("[data-user-name]").forEach(element => {
    element.textContent = account.profile.display_name;
  });
  document.querySelectorAll("[data-user-role]").forEach(element => {
    element.textContent = account.profile.is_test_account ? "Testing account" : account.profile.role;
  });
  document.querySelectorAll("[data-test-account-notice]").forEach(element => {
    element.hidden = !account.profile.is_test_account;
  });
  document.body.classList.remove("auth-pending");
  document.body.classList.add("auth-ready");
  return account;
}

export function installSignOut() {
  document.querySelectorAll("[data-sign-out]").forEach(button => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      await supabase.auth.signOut();
      location.replace("login.html");
    });
  });
}

export function showBlockingError(message) {
  document.body.classList.remove("auth-pending");
  document.body.innerHTML = `<main class="auth-error-card">
    <div class="brand-mark" aria-hidden="true">Rx</div>
    <p class="eyebrow">Setup needed</p>
    <h1>Review workspace unavailable</h1>
    <p>${escapeHTML(message)}</p>
    <a class="primary-link" href="login.html">Return to sign in</a>
  </main>`;
}

export function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
