const MIN_PASSWORD_LENGTH = 8;

export function normalizeDisplayName(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

export function displayNameError(value) {
  const name = normalizeDisplayName(value);
  if (!name) return "Enter the name you want shown in the reviewer portal.";
  if (name.length > 100) return "Display name must be 100 characters or fewer.";
  return "";
}

export function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function emailChangeError(value, currentEmail = "") {
  const email = normalizeEmail(value);
  if (!email) return "Enter the new email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  if (email === normalizeEmail(currentEmail)) return "Enter a different email address.";
  return "";
}

export function passwordChangeError(password, confirmation) {
  if (String(password).length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters for the new password.`;
  }
  if (password !== confirmation) return "The two password entries do not match.";
  return "";
}

function setStatus(element, message, kind = "success") {
  element.textContent = message;
  element.dataset.kind = kind;
}

function setBusy(form, busy) {
  form.querySelectorAll("button, input").forEach(control => { control.disabled = busy; });
}

export function installAccountSettings({ account, supabase }) {
  const button = document.querySelector("#account-settings-button");
  const dialog = document.querySelector("#account-settings-dialog");
  const nameForm = document.querySelector("#display-name-form");
  const nameInput = document.querySelector("#account-display-name");
  const nameStatus = document.querySelector("#display-name-status");
  const emailForm = document.querySelector("#email-change-form");
  const currentEmail = document.querySelector("#account-current-email");
  const newEmail = document.querySelector("#account-new-email");
  const emailStatus = document.querySelector("#email-change-status");
  const passwordForm = document.querySelector("#password-change-form");
  const password = document.querySelector("#account-new-password");
  const confirmation = document.querySelector("#account-confirm-password");
  const passwordStatus = document.querySelector("#password-change-status");

  if (!button || !dialog || !nameForm || !emailForm || !passwordForm) return;

  nameInput.value = account.profile.display_name;
  currentEmail.textContent = account.user.email || "Unavailable";

  button.addEventListener("click", () => {
    nameInput.value = account.profile.display_name;
    setStatus(nameStatus, "", "success");
    setStatus(emailStatus, "", "success");
    setStatus(passwordStatus, "", "success");
    if (!dialog.open) dialog.showModal();
  });

  nameForm.addEventListener("submit", async event => {
    event.preventDefault();
    const name = normalizeDisplayName(nameInput.value);
    const validationError = displayNameError(name);
    if (validationError) {
      setStatus(nameStatus, validationError, "error");
      nameInput.focus();
      return;
    }

    setBusy(nameForm, true);
    setStatus(nameStatus, "Saving display name…", "pending");
    const { data, error } = await supabase
      .from("profiles")
      .update({ display_name: name })
      .eq("id", account.user.id)
      .select("display_name")
      .single();
    setBusy(nameForm, false);

    if (error) {
      setStatus(nameStatus, `Could not save the name. ${error.message}`, "error");
      return;
    }

    account.profile.display_name = data.display_name;
    nameInput.value = data.display_name;
    document.querySelectorAll("[data-user-name]").forEach(element => {
      element.textContent = data.display_name;
    });
    setStatus(nameStatus, "Display name saved.");
  });

  emailForm.addEventListener("submit", async event => {
    event.preventDefault();
    const email = normalizeEmail(newEmail.value);
    const validationError = emailChangeError(email, account.user.email);
    if (validationError) {
      setStatus(emailStatus, validationError, "error");
      newEmail.focus();
      return;
    }

    setBusy(emailForm, true);
    setStatus(emailStatus, "Requesting email change…", "pending");
    const { data, error } = await supabase.auth.updateUser({ email });
    setBusy(emailForm, false);

    if (error) {
      setStatus(emailStatus, `Could not request the email change. ${error.message}`, "error");
      return;
    }

    newEmail.value = "";
    if (normalizeEmail(data.user?.email) === email) {
      account.user.email = data.user.email;
      currentEmail.textContent = data.user.email;
      setStatus(emailStatus, "Sign-in email changed successfully.");
    } else {
      setStatus(emailStatus, "Confirmation sent. Follow the instructions from Supabase before using the new email to sign in.");
    }
  });

  passwordForm.addEventListener("submit", async event => {
    event.preventDefault();
    const validationError = passwordChangeError(password.value, confirmation.value);
    if (validationError) {
      setStatus(passwordStatus, validationError, "error");
      password.focus();
      return;
    }

    setBusy(passwordForm, true);
    setStatus(passwordStatus, "Changing password…", "pending");
    const { error } = await supabase.auth.updateUser({ password: password.value });
    setBusy(passwordForm, false);

    if (error) {
      setStatus(passwordStatus, `Could not change the password. ${error.message}`, "error");
      return;
    }

    passwordForm.reset();
    setStatus(passwordStatus, "Password changed successfully.");
  });
}
