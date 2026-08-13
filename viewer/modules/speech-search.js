export function speechAlternativesFromResult(event) {
  const result = event?.results?.[0];
  if (!result) return [];
  return [...new Set(Array.from(result)
    .map(alternative => String(alternative?.transcript || "").trim())
    .filter(Boolean))];
}

export function speechRecognitionConstructor(scope = globalThis) {
  return scope?.SpeechRecognition || scope?.webkitSpeechRecognition || null;
}

export function installSpeechSearch({ root = document, inputs = null } = {}) {
  const Recognition = speechRecognitionConstructor(globalThis);
  if (!Recognition) return [];
  const targets = inputs || [...root.querySelectorAll('input[type="search"]')];

  return targets.filter(Boolean).map(input => {
    if (input.closest(".speech-search-control")) return null;
    const labelText = input.closest("label")?.querySelector(":scope > span")?.textContent?.trim();
    if (labelText && !input.hasAttribute("aria-label")) input.setAttribute("aria-label", labelText);
    const control = document.createElement("div");
    control.className = "speech-search-control";
    input.parentNode.insertBefore(control, input);
    control.appendChild(input);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "speech-search-button";
    button.setAttribute("aria-label", "Search by voice");
    button.setAttribute("aria-pressed", "false");
    button.title = "Search by voice";
    button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z"></path>
      <path d="M19 11v1a7 7 0 0 1-14 0v-1M12 19v3M8 22h8"></path>
    </svg>`;
    control.appendChild(button);

    const status = document.createElement("small");
    status.className = "speech-search-status";
    status.setAttribute("aria-live", "polite");
    status.textContent = "Voice input uses your browser's speech service; this site does not save audio.";
    control.insertAdjacentElement("afterend", status);

    const recognition = new Recognition();
    recognition.lang = "en-PH";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    let listening = false;

    const setListening = active => {
      listening = active;
      button.classList.toggle("listening", active);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", active ? "Stop voice search" : "Search by voice");
    };

    button.addEventListener("click", () => {
      if (listening) return recognition.stop();
      status.textContent = "Listening… say a medicine name.";
      try {
        recognition.start();
        setListening(true);
      } catch {
        status.textContent = "Voice search is already active.";
      }
    });

    recognition.addEventListener("result", event => {
      const alternatives = speechAlternativesFromResult(event);
      const transcript = alternatives[0] || "";
      input.value = transcript;
      input.dispatchEvent(new CustomEvent("voicealternatives", {
        bubbles: true,
        detail: { primary: transcript, alternatives: alternatives.slice(1) },
      }));
      input.dispatchEvent(new Event("input", { bubbles: true }));
      status.textContent = transcript
        ? `Heard “${transcript}”${alternatives.length > 1 ? ` plus ${alternatives.length - 1} alternative${alternatives.length === 2 ? "" : "s"}` : ""}. Matching it to registered medicine names…`
        : "No speech detected.";
      input.focus();
    });
    recognition.addEventListener("error", event => {
      status.textContent = event.error === "not-allowed" || event.error === "service-not-allowed"
        ? "Microphone access was blocked. Allow it in the browser's site settings, or keep typing."
        : event.error === "no-speech"
          ? "No speech was detected. Tap the microphone and try again."
          : "Voice search could not recognize that. Tap the microphone and try again, or keep typing.";
    });
    recognition.addEventListener("end", () => setListening(false));
    return { input, button, status, recognition };
  }).filter(Boolean);
}
