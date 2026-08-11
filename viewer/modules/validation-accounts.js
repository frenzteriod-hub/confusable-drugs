export function validationReviewers(profiles = []) {
  return profiles.filter(profile => profile.role === "reviewer" && profile.is_test_account !== true);
}

export function validationReviews(reviews = [], reviewers = []) {
  const reviewerIds = new Set(reviewers.map(reviewer => reviewer.id));
  return reviews.filter(review => reviewerIds.has(review.reviewer_id));
}
