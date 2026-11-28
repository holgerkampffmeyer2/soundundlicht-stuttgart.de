const DEFAULT_LIMIT = 0;

export const reviewKey = (review) =>
  `${(review.author_name || '').trim().toLowerCase()}|${(review.text || '').trim().slice(0, 40)}`;

// Normalisiert eine Scraper-Rezension in die Site-Form.
// Playwright-Scraper liefert bereits Site-Form, daher nur Trim/Fallbacks.
export function mapReview(raw, pinnedKeys = new Set()) {
  const review = {
    author_name: (raw.author_name || 'Anonym').trim(),
    rating: raw.rating ?? 5,
    text: (raw.text || '').trim(),
    relative_time_description: raw.relative_time_description || '',
    time: raw.time || undefined,
  };
  if (raw.datePrecision) review.datePrecision = raw.datePrecision;
  if (raw.pinned || pinnedKeys.has(reviewKey(review))) review.pinned = true;
  return review;
}

export function parseLimit(argv = process.argv, defaultLimit = DEFAULT_LIMIT) {
  const idx = argv.indexOf('--limit');
  if (idx >= 0 && argv[idx + 1]) {
    const n = parseInt(argv[idx + 1], 10);
    if (!Number.isNaN(n) && n >= 0) return n;
  }
  return defaultLimit;
}

function reviewTime(review) {
  return review.time ? new Date(review.time).getTime() : Number.NEGATIVE_INFINITY;
}

export function sortReviewsByTimeDesc(reviews) {
  return [...reviews].sort((a, b) => reviewTime(b) - reviewTime(a));
}

export function sortReviewsForDisplay(reviews) {
  return [...reviews].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
    return reviewTime(b) - reviewTime(a);
  });
}

export function mergeReviews(scraped, existing, limit = 0) {
  const pinnedKeys = new Set(existing.filter((review) => review.pinned).map(reviewKey));
  const reviews = scraped.map((review) => mapReview(review, pinnedKeys));

  const existingKeys = new Set(existing.map(reviewKey));
  const newCount = reviews.filter((review) => !existingKeys.has(reviewKey(review))).length;

  const seen = new Set(reviews.map(reviewKey));
  const kept = sortReviewsByTimeDesc(existing.filter((review) => !seen.has(reviewKey(review))));

  const merged = [...reviews, ...kept];
  const hasAnyTime = merged.some((review) => review.time);
  const allTimed = merged.every((review) => review.time);
  const ordered = allTimed
    ? sortReviewsForDisplay(merged)
    : [...merged.filter((review) => review.pinned), ...merged.filter((review) => !review.pinned)];
  const finalReviews = limit && hasAnyTime && ordered.length > limit ? ordered.slice(0, limit) : ordered;

  return { reviews: finalReviews, newCount };
}

export function buildOutput({ match, reviews, now = new Date() }) {
  return {
    ratingValue: match.ratingValue ?? 5,
    reviewCount: match.reviewCount ?? reviews.length,
    fetchedAt: now.toISOString(),
    reviews,
  };
}
