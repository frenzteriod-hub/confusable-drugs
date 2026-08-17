const DEMO_QUEUE_SIZE = 20_000;
const DEMO_LABEL_TOTALS = Object.freeze({
  potential_lasa: 2_074,
  false_positive: 1_523,
  needs_discussion: 20,
});

export const DEMO_ADMIN_SNAPSHOT = Object.freeze({
  queueSize: DEMO_QUEUE_SIZE,
  startedOn: "2026-08-12",
  reviewers: Object.freeze([
    Object.freeze({
      id: "demo-micah",
      name: "Micah Areja",
      completed: 2_034,
      averageSeconds: 42,
      activity: Object.freeze({
        "2026-08-12": 321,
        "2026-08-13": 408,
        "2026-08-14": 390,
        "2026-08-15": 360,
        "2026-08-16": 310,
        "2026-08-17": 245,
      }),
    }),
    Object.freeze({
      id: "demo-nicole",
      name: "Nicole Angelica B. Tupaz",
      completed: 1_583,
      averageSeconds: 58,
      activity: Object.freeze({
        "2026-08-12": 240,
        "2026-08-13": 315,
        "2026-08-14": 284,
        "2026-08-15": 277,
        "2026-08-16": 251,
        "2026-08-17": 216,
      }),
    }),
    Object.freeze({
      id: "demo-lorraine",
      name: "Lorraine Villaber-Tagle",
      completed: 0,
      averageSeconds: null,
      activity: Object.freeze({}),
    }),
  ]),
  labels: Object.freeze([
    Object.freeze({ label: "LASA", count: 2_074 }),
    Object.freeze({ label: "Not LASA", count: 1_523 }),
    Object.freeze({ label: "Needs discussion", count: 20 }),
  ]),
});

function reviewLabel(globalIndex) {
  const labelPosition = (globalIndex * 997) % 3_617;
  if (labelPosition < DEMO_LABEL_TOTALS.potential_lasa) return "potential_lasa";
  if (labelPosition < DEMO_LABEL_TOTALS.potential_lasa + DEMO_LABEL_TOTALS.false_positive) return "false_positive";
  return "needs_discussion";
}

export function requiredDemoPairCount(snapshot = DEMO_ADMIN_SNAPSHOT) {
  return Math.max(0, ...snapshot.reviewers.map(reviewer => reviewer.completed));
}

export async function loadDemoPairRows(supabase, requiredCount = requiredDemoPairCount()) {
  if (!supabase) throw new Error("The score-free review queue is unavailable.");
  const pairs = [];
  const batchSize = 1_000;
  for (let start = 0; start < requiredCount; start += batchSize) {
    const end = Math.min(requiredCount, start + batchSize) - 1;
    const { data, error } = await supabase
      .from("review_pairs")
      .select("id, source_pair_key, name_a, name_b, comparison_type")
      .eq("is_active", true)
      .order("id", { ascending: true })
      .range(start, end);
    if (error) throw error;
    pairs.push(...(data || []));
    if (!data || data.length < end - start + 1) break;
  }
  if (pairs.length < requiredCount) {
    throw new Error(`Only ${pairs.length.toLocaleString("en-PH")} of ${requiredCount.toLocaleString("en-PH")} required active pairs could be loaded.`);
  }
  return Object.freeze(pairs.slice(0, requiredCount).map(pair => Object.freeze({
    id: pair.id,
    sourcePairKey: pair.source_pair_key,
    medicineA: pair.name_a,
    medicineB: pair.name_b,
    comparisonType: pair.comparison_type,
  })));
}

export function demoReviewerHistory(reviewerOrId, pairRows) {
  const reviewer = typeof reviewerOrId === "string"
    ? DEMO_ADMIN_SNAPSHOT.reviewers.find(item => item.id === reviewerOrId)
    : reviewerOrId;
  if (!reviewer) return [];
  if (!Array.isArray(pairRows) || pairRows.length < reviewer.completed) {
    throw new Error(`The active review queue did not provide enough real medicine pairs for ${reviewer.name}.`);
  }

  const globalOffset = DEMO_ADMIN_SNAPSHOT.reviewers
    .slice(0, DEMO_ADMIN_SNAPSHOT.reviewers.findIndex(item => item.id === reviewer.id))
    .reduce((sum, item) => sum + item.completed, 0);
  const reviews = [];
  let reviewerIndex = 0;
  for (const [date, count] of Object.entries(reviewer.activity).sort(([left], [right]) => left.localeCompare(right))) {
    for (let dayIndex = 0; dayIndex < count; dayIndex += 1) {
      const globalIndex = globalOffset + reviewerIndex;
      const seconds = 8 * 3600 + Math.floor((dayIndex + 1) / (count + 1) * 9 * 3600);
      const hour = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const minute = String(Math.floor(seconds % 3600 / 60)).padStart(2, "0");
      const second = String(seconds % 60).padStart(2, "0");
      const pair = pairRows[reviewerIndex];
      reviews.push(Object.freeze({
        id: `example-review-${reviewer.id}-${pair.sourcePairKey || pair.id}`,
        reviewerId: reviewer.id,
        pairId: pair.id,
        sourcePairKey: pair.sourcePairKey,
        medicineA: pair.medicineA,
        medicineB: pair.medicineB,
        comparisonType: pair.comparisonType,
        label: reviewLabel(globalIndex),
        durationSeconds: Math.max(8, (reviewer.averageSeconds || 45) + ((globalIndex * 17) % 15) - 7),
        reviewedAt: `${date}T${hour}:${minute}:${second}+08:00`,
      }));
      reviewerIndex += 1;
    }
  }
  return Object.freeze(reviews.reverse());
}

export function demoRecentReviews(pairRows, limit = 8) {
  return DEMO_ADMIN_SNAPSHOT.reviewers
    .flatMap(reviewer => demoReviewerHistory(reviewer, pairRows))
    .sort((left, right) => right.reviewedAt.localeCompare(left.reviewedAt))
    .slice(0, limit);
}

export function demoSnapshotTotals(snapshot = DEMO_ADMIN_SNAPSHOT) {
  const completed = snapshot.reviewers.reduce((sum, reviewer) => sum + reviewer.completed, 0);
  const expected = snapshot.queueSize * snapshot.reviewers.length;
  const labelCount = snapshot.labels.reduce((sum, item) => sum + item.count, 0);
  return {
    completed,
    expected,
    labelCount,
    coveragePercent: expected ? Math.round(completed / expected * 100) : 0,
  };
}

export function demoActivitySummary(reviewer) {
  const entries = Object.entries(reviewer.activity).sort(([left], [right]) => left.localeCompare(right));
  return {
    today: entries.at(-1)?.[1] || 0,
    activeDays: entries.filter(([, count]) => count > 0).length,
    lastActivity: entries.at(-1)?.[0] || null,
    activityTotal: entries.reduce((sum, [, count]) => sum + count, 0),
  };
}
