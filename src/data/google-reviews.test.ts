// @vitest-environment node
import { describe, expect, it } from 'vitest';
import googleReviews from './google-reviews.json';

interface SiteReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  time?: string;
}

interface ReviewsData {
  ratingValue: number;
  reviewCount: number;
  fetchedAt?: string;
  reviews: SiteReview[];
}

const data = googleReviews as unknown as ReviewsData;

function timeMs(review: SiteReview) {
  return review.time ? new Date(review.time).getTime() : Number.NEGATIVE_INFINITY;
}

const reviewKey = (review: SiteReview) =>
  `${(review.author_name || '').trim().toLowerCase()}|${(review.text || '').trim().slice(0, 40)}`;

const ISO_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

describe('src/data/google-reviews.json', () => {
  it('has the aggregate fields consumed by jsonLd.ts', () => {
    expect(typeof data.ratingValue).toBe('number');
    expect(data.ratingValue).toBeGreaterThanOrEqual(1);
    expect(data.ratingValue).toBeLessThanOrEqual(5);
    expect(Number.isFinite(Number(data.ratingValue.toFixed(1)))).toBe(true);

    expect(typeof data.reviewCount).toBe('number');
    expect(data.reviewCount).toBeGreaterThan(0);
    expect(data.reviewCount).toBeGreaterThanOrEqual(data.reviews.length);
  });

  it('has a valid ISO fetchedAt when present', () => {
    if (!data.fetchedAt) return;
    expect(data.fetchedAt).toMatch(ISO_UTC);
    expect(Number.isNaN(new Date(data.fetchedAt).getTime())).toBe(false);
  });

  it('contains an array of well-formed reviews', () => {
    expect(Array.isArray(data.reviews)).toBe(true);
    for (const review of data.reviews) {
      expect(typeof review.author_name).toBe('string');
      expect(review.author_name.trim().length).toBeGreaterThan(0);
      expect(typeof review.rating).toBe('number');
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
      expect(typeof review.text).toBe('string');
      expect(review.text.trim().length).toBeGreaterThan(0);
    }
  });

  it('keeps review timestamps valid ISO-8601 when present', () => {
    for (const review of data.reviews) {
      if (!review.time) continue;
      expect(review.time).toMatch(ISO_UTC);
      expect(Number.isNaN(new Date(review.time).getTime())).toBe(false);
    }
  });

  it('lists reviews with timestamps in non-increasing order', () => {
    const timed = data.reviews.filter((r) => r.time);
    for (let i = 1; i < timed.length; i++) {
      expect(timeMs(timed[i])).toBeLessThanOrEqual(timeMs(timed[i - 1]));
    }
  });

  it('has no duplicate reviews', () => {
    const keys = data.reviews.map(reviewKey);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
