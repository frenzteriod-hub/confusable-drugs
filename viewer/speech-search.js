const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  document.querySelectorAll('input[type="search"]').forEach(input => {
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
    control.insertAdjacentElement("afterend", status);

    const recognition = new SpeechRecognition();
    recognition.lang = "en-PH";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    let listening = false;

    const setListening = active => {
      listening = active;
      button.classList.toggle("listening", active);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", active ? "Stop voice search" : "Search by voice");
    };

    button.addEventListener("click", () => {
      if (listening) {
        recognition.stop();
        return;
      }
      status.textContent = "Listening… say a medicine or registration number.";
      try {
        recognition.start();
        setListening(true);
      } catch {
        status.textContent = "Voice search is already active.";
      }
    });

    recognition.addEventListener("result", event => {
      const transcript = event.results[0][0].transcript.trim();
      input.value = transcript;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      status.textContent = transcript ? `Searching for “${transcript}”` : "No speech detected.";
      input.focus();
    });
    recognition.addEventListener("error", event => {
      status.textContent = event.error === "not-allowed"
        ? "Microphone access was blocked. Allow it in your browser settings to use voice search."
        : "Voice search could not hear that. Tap the microphone and try again.";
    });
    recognition.addEventListener("end", () => setListening(false));
  });
}
