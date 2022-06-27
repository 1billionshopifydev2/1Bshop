const apiReviewToGatsbyReview = review => {
  return {
    user:
      review.user && review.user.display_name ? review.user.display_name : null,
    datePublished: review.created_at,
    score: review.score,
    name: review.title,
    body: review.content,
  }
}

module.exports.apiReviewToGatsbyReview = apiReviewToGatsbyReview
