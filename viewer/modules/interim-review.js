export function buildInterimReviewStats({ reviews, reviewerIds, pairCount }) {
  const expectedLabels = pairCount * reviewerIds.length;
  const reviewsByPair = reviews.reduce((map, review) => {
    if (!map.has(review.pair_id)) map.set(review.pair_id, []);
    map.get(review.pair_id).push(review);
    return map;
  }, new Map());
  const requiredReviewers = new Set(reviewerIds);
  const completedPairGroups = reviewerIds.length
    ? [...reviewsByPair.values()].filter(group => {
      const present = new Set(group.map(review => review.reviewer_id));
      return [...requiredReviewers].every(id => present.has(id));
    })
    : [];
  const majorityLabel = group => {
    const counts = group.reduce((map, review) => map.set(review.label, (map.get(review.label) || 0) + 1), new Map());
    return [...counts.entries()].find(([, count]) => count > group.length / 2)?.[0] || null;
  };
  const fullyReviewed = completedPairGroups.length;
  const unanimousPairs = completedPairGroups.filter(group => new Set(group.map(review => review.label)).size === 1).length;
  const potentialMajority = completedPairGroups.filter(group => majorityLabel(group) === "potential_lasa").length;
  const falsePositiveMajority = completedPairGroups.filter(group => majorityLabel(group) === "false_positive").length;
  const unresolvedMajority = fullyReviewed - potentialMajority - falsePositiveMajority;
  const channelCompletedGroups = completedPairGroups.filter(group =>
    group.every(review => typeof review.look_alike === "boolean" && typeof review.sound_alike === "boolean")
  );
  const majorityBoolean = (group, field) => {
    const yes = group.filter(review => review[field] === true).length;
    const no = group.filter(review => review[field] === false).length;
    return yes > group.length / 2 ? true : no > group.length / 2 ? false : null;
  };
  const lookAlikeMajority = channelCompletedGroups.filter(group => majorityBoolean(group, "look_alike") === true).length;
  const soundAlikeMajority = channelCompletedGroups.filter(group => majorityBoolean(group, "sound_alike") === true).length;
  const channelUnresolved = channelCompletedGroups.filter(group =>
    majorityBoolean(group, "look_alike") === null || majorityBoolean(group, "sound_alike") === null
  ).length;
  return {
    expectedLabels,
    fullyReviewed,
    unanimousPairs,
    potentialMajority,
    falsePositiveMajority,
    unresolvedMajority,
    channelFullyReviewed: channelCompletedGroups.length,
    lookAlikeMajority,
    soundAlikeMajority,
    channelUnresolved,
    coveragePercent: expectedLabels ? Math.round(reviews.length / expectedLabels * 100) : 0,
    fullyReviewedPercent: pairCount ? Math.round(fullyReviewed / pairCount * 100) : 0,
  };
}
