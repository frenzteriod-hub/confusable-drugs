const REQUIRED_MAIN_FIELDS = [
  "orthographic_similarity",
  "english_phonetic",
  "cebuano_score",
  "poca_composite_similarity",
  "kondrak_dorr_style_score",
];

export function hasScore(value) {
  if (value === null || value === undefined || value === "") return false;
  return Number.isFinite(Number(value));
}

export function hasCompleteMainScores(score) {
  return Boolean(score) && REQUIRED_MAIN_FIELDS.every(field => hasScore(score[field]));
}

export function mainScoreCards(score) {
  return [
    {
      key: "look",
      label: "Look-alike",
      value: score?.orthographic_similarity,
      note: "50% BI-SIM + 50% normalized edit; original spelling only",
    },
    {
      key: "english",
      label: "English sound",
      value: score?.english_phonetic,
      note: "English pronunciation compared with ALINE",
    },
    {
      key: "cebuano",
      label: "Cebuano sound",
      value: score?.cebuano_score,
      note: "Fixed sound-only composite after any numeric penalty",
    },
  ];
}

export function combinedScoreCards(score) {
  return [
    {
      key: "poca",
      label: "POCA combined comparator",
      value: score?.poca_composite_similarity,
      note: "50% look-alike + 50% English ALINE",
    },
    {
      key: "kondrak-dorr",
      label: "Kondrak–Dorr combined comparator",
      value: score?.kondrak_dorr_style_score,
      note: "25% each: prefix, NED, BI-SIM, English ALINE",
    },
  ];
}

export function scoreRecordStatus(score, isActive) {
  if (!hasCompleteMainScores(score)) {
    return {
      className: "incomplete",
      label: "Calculation incomplete",
      description: "This saved score record predates the current calculation format.",
    };
  }
  if (isActive) {
    return {
      className: "current",
      label: "Current 20,000-pair queue",
      description: "Calculated with the current frozen validation-candidate model.",
    };
  }
  return {
    className: "historical",
    label: "Historical reviewed pair",
    description: "Not in the current 20,000-pair workload; recalculated with the current model for audit comparison.",
  };
}
