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

export function normalizeUsername(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function usernameChangeError(value, currentUsername = "") {
  const username = normalizeUsername(value);
  if (!username) return "Enter the username you want to use.";
  if (!/^[a-z0-9][a-z0-9._-]{2,39}$/.test(username)) {
    return "Use 3–40 letters, numbers, dots, underscores, or hyphens, starting with a letter or number.";
  }
  if (username === normalizeUsername(currentUsername)) return "Enter a different username.";
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
  const usernameForm = document.querySelector("#username-change-form");
  const currentUsername = document.querySelector("#account-current-username");
  const newUsername = document.querySelector("#account-new-username");
  const usernameStatus = document.querySelector("#username-change-status");
  const passwordForm = document.querySelector("#password-change-form");
  const password = document.querySelector("#account-new-password");
  const confirmation = document.querySelector("#account-confirm-password");
  const passwordStatus = document.querySelector("#password-change-status");

  if (!button || !dialog || !nameForm || !usernameForm || !passwordForm) return;

  nameInput.value = account.profile.display_name;
  currentUsername.textContent = account.profile.username || "Unavailable";

  button.addEventListener("click", () => {
    nameInput.value = account.profile.display_name;
    setStatus(nameStatus, "", "success");
    setStatus(usernameStatus, "", "success");
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

  usernameForm.addEventListener("submit", async event => {
    event.preventDefault();
    const username = normalizeUsername(newUsername.value);
    const validationError = usernameChangeError(username, account.profile.username);
    if (validationError) {
      setStatus(usernameStatus, validationError, "error");
      newUsername.focus();
      return;
    }

    setBusy(usernameForm, true);
    setStatus(usernameStatus, "Changing username…", "pending");
    const { data, error } = await supabase.rpc("change_own_username", { requested_username: username });
    setBusy(usernameForm, false);

    if (error) {
      const message = /already in use|duplicate key/i.test(error.message)
        ? "That username is already in use. Choose another one."
        : error.message;
      setStatus(usernameStatus, `Could not change the username. ${message}`, "error");
      return;
    }

    account.profile.username = normalizeUsername(data || username);
    currentUsername.textContent = account.profile.username;
    newUsername.value = "";
    await supabase.auth.refreshSession();
    setStatus(usernameStatus, `Username changed to ${account.profile.username}. No email or OTP confirmation is needed.`);
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
