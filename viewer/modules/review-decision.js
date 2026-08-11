export function savedDecision(row) {
  if (row?.label === "needs_discussion") return "discussion";
  if (row?.label === "potential_lasa") return "lasa";
  if (row?.label === "false_positive") return "not_lasa";
  return "";
}

export function savedChannelReason(row) {
  if (row?.look_alike === true && row?.sound_alike === true) return "both";
  if (row?.look_alike === true) return "look";
  if (row?.sound_alike === true) return "sound";
  return "";
}

export function decisionPayload(decision) {
  if (decision === "discussion") {
    return { label: "needs_discussion", lookAlike: null, soundAlike: null };
  }
  if (decision === "not_lasa") {
    return { label: "false_positive", lookAlike: null, soundAlike: null };
  }
  if (decision !== "lasa") return null;
  return { label: "potential_lasa", lookAlike: null, soundAlike: null };
}
