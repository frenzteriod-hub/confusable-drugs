export const MAX_INCLUDED_REVIEW_SECONDS = 60 * 60;

export function createReviewTimingTracker(now = () => Date.now()) {
  const sessions = new Map();

  return {
    start(pairId) {
      const key = Number(pairId);
      if (!sessions.has(key)) sessions.set(key, now());
      return sessions.get(key);
    },
    finish(pairId) {
      const key = Number(pairId);
      const endedAt = now();
      const startedAt = sessions.get(key) ?? endedAt;
      const durationSeconds = Math.max(1, Math.round((endedAt - startedAt) / 1000));
      sessions.delete(key);
      return {
        startedAt: new Date(startedAt).toISOString(),
        durationSeconds,
      };
    },
    has(pairId) {
      return sessions.has(Number(pairId));
    },
    clear(pairId) {
      sessions.delete(Number(pairId));
    },
  };
}

export function includedReviewSeconds(value) {
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds > 0 && seconds < MAX_INCLUDED_REVIEW_SECONDS
    ? Math.round(seconds)
    : null;
}

export function formatReviewDuration(value) {
  const seconds = Math.max(0, Math.round(Number(value) || 0));
  if (seconds < 60) return `${seconds} sec`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return remainder ? `${minutes} min ${remainder} sec` : `${minutes} min`;
}

export function summarizeReviewDurations(reviews) {
  const included = reviews
    .map(review => includedReviewSeconds(review.review_duration_seconds))
    .filter(seconds => seconds !== null);
  const recorded = reviews.filter(review => Number(review.review_duration_seconds) > 0).length;
  const totalSeconds = included.reduce((sum, seconds) => sum + seconds, 0);

  return {
    averageSeconds: included.length ? Math.round(totalSeconds / included.length) : null,
    totalSeconds,
    timedCount: included.length,
    excludedCount: recorded - included.length,
  };
}
