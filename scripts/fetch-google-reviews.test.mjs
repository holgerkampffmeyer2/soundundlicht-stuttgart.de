// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  buildOutput,
  mapReview,
  mergeReviews,
  parseLimit,
  reviewKey,
  sortReviewsByTimeDesc,
  sortReviewsForDisplay,
} from './lib/review-pipeline.mjs';
import { relativeDateInfo } from './lib/review-dates.mjs';
import { extractReviewTimestamps } from './lib/scrape-reviews.mjs';

function siteReview(overrides = {}) {
  return {
    author_name: 'Jonas K.',
    rating: 5,
    text: 'Alles top!',
    relative_time_description: 'vor einem Monat',
    time: '2026-09-02T17:54:38.606303Z',
    ...overrides,
  };
}

function scrapedReview(overrides = {}) {
  return {
    author_name: 'Jonas K.',
    rating: 5,
    text: 'Alles top!',
    relative_time_description: 'vor 2 Monaten',
    ...overrides,
  };
}

describe('[REQ-REVIEW-02] mapReview', () => {
  it('keeps site-shaped scraper fields and trims them', () => {
    expect(mapReview(scrapedReview({ author_name: '  Jonas K.  ' }))).toEqual({
      author_name: 'Jonas K.',
      rating: 5,
      text: 'Alles top!',
      relative_time_description: 'vor 2 Monaten',
      time: undefined,
    });
  });

  it('defaults author to Anonym and rating to 5', () => {
    expect(mapReview({ text: 'x' }).author_name).toBe('Anonym');
    expect(mapReview({ text: 'x' }).rating).toBe(5);
  });

  it('keeps time undefined when not available', () => {
    expect(mapReview(scrapedReview()).time).toBeUndefined();
    expect(mapReview(siteReview()).time).toBe('2026-09-02T17:54:38.606303Z');
  });

  it('[REQ-REVIEW-05] keeps the pinned flag from raw data and existing keys', () => {
    expect(mapReview(scrapedReview({ pinned: true })).pinned).toBe(true);
    const key = reviewKey(scrapedReview());
    expect(mapReview(scrapedReview(), new Set([key])).pinned).toBe(true);
    expect(mapReview(scrapedReview()).pinned).toBeUndefined();
  });
});

describe('[REQ-REVIEW-02] relativeDateInfo', () => {
  const now = new Date('2026-11-28T12:34:56.000Z');

  it('converts days and weeks to a calendar date', () => {
    expect(relativeDateInfo('vor 2 Tagen', now)).toEqual({
      time: '2026-11-26T00:00:00.000Z',
      datePrecision: 'day',
    });
    expect(relativeDateInfo('vor einer Woche', now).time).toBe('2026-11-21T00:00:00.000Z');
  });

  it('keeps month and year precision instead of inventing a day', () => {
    expect(relativeDateInfo('vor einem Monat', now)).toEqual({
      time: '2026-10-01T00:00:00.000Z',
      datePrecision: 'month',
    });
    expect(relativeDateInfo('Bearbeitet: vor 5 Monaten', now)).toEqual({
      time: '2026-06-01T00:00:00.000Z',
      datePrecision: 'month',
    });
    expect(relativeDateInfo('vor einem Jahr', now)).toEqual({
      time: '2025-01-01T00:00:00.000Z',
      datePrecision: 'year',
    });
  });

  it('ignores unknown descriptions', () => {
    expect(relativeDateInfo('', now)).toBeNull();
    expect(relativeDateInfo('kürzlich', now)).toBeNull();
  });
});

describe('[REQ-REVIEW-02] extractReviewTimestamps', () => {
  it('reads exact timestamps from place and batchexecute payloads', () => {
    const id = 'Ci9DQUlRQUNvZENodHljRjlvT2pkUWNIcGlPRFJsWkZGUldXZHpjVTlsUVZRMlNIYxAB';
    const place = `["${id}",["0x0:0x8c761bb0db8ae55e",null,1793085777415683,1793085777415683`;
    const batch = `[\\"${id}\\",[\\"0x0:0x8c761bb0db8ae55e\\",null,1793085777415683,1793085777415683`;
    for (const body of [place, batch]) {
      const timestamps = extractReviewTimestamps(body);
      expect(timestamps.get(id)).toBe(new Date(1793085777415).toISOString());
    }
  });
});

describe('[REQ-REVIEW-02] reviewKey', () => {
  it('is case- and whitespace-insensitive on the author name', () => {
    const a = siteReview({ author_name: '  Jonas K. ' });
    const b = siteReview({ author_name: 'jonas k.' });
    expect(reviewKey(a)).toBe(reviewKey(b));
  });

  it('uses only the first 40 characters of the text', () => {
    const long = 'x'.repeat(100);
    const a = siteReview({ text: long });
    const b = siteReview({ text: long + ' changed suffix' });
    expect(reviewKey(a)).toBe(reviewKey(b));
  });

  it('differs for different reviews', () => {
    expect(reviewKey(siteReview())).not.toBe(reviewKey(siteReview({ author_name: 'Andere' })));
    expect(reviewKey(siteReview())).not.toBe(reviewKey(siteReview({ text: 'anderer Text' })));
  });
});

describe('[REQ-REVIEW-02] parseLimit', () => {
  it('keeps all reviews by default', () => {
    expect(parseLimit(['node', 'script.mjs'])).toBe(0);
  });

  it('parses a positive --limit value', () => {
    expect(parseLimit(['node', 'script.mjs', '--limit', '5'])).toBe(5);
  });

  it('accepts zero as unlimited', () => {
    expect(parseLimit(['node', 'script.mjs', '--limit', '0'])).toBe(0);
  });

  it('rejects invalid values and falls back to the default', () => {
    expect(parseLimit(['node', 'script.mjs', '--limit', 'abc'])).toBe(0);
    expect(parseLimit(['node', 'script.mjs', '--limit', '-3'])).toBe(0);
    expect(parseLimit(['node', 'script.mjs', '--limit'])).toBe(0);
    expect(parseLimit(['node', 'script.mjs'], 10)).toBe(10);
  });
});

describe('[REQ-REVIEW-02] sortReviewsByTimeDesc', () => {
  it('orders newest first', () => {
    const sorted = sortReviewsByTimeDesc([
      siteReview({ time: '2026-04-21T10:22:10.106016Z' }),
      siteReview({ time: '2026-09-02T17:54:38.606303Z' }),
      siteReview({ time: '2026-08-07T07:57:03.978012Z' }),
    ]);
    expect(sorted.map((r) => r.time)).toEqual([
      '2026-09-02T17:54:38.606303Z',
      '2026-08-07T07:57:03.978012Z',
      '2026-04-21T10:22:10.106016Z',
    ]);
  });

  it('puts reviews without a time last', () => {
    const sorted = sortReviewsByTimeDesc([
      siteReview({ time: undefined, author_name: 'Ohne' }),
      siteReview({ time: '2026-01-01T00:00:00Z', author_name: 'Mit' }),
    ]);
    expect(sorted.map((r) => r.author_name)).toEqual(['Mit', 'Ohne']);
  });

  it('does not mutate the input array', () => {
    const input = [
      siteReview({ time: '2026-01-01T00:00:00Z', author_name: 'a' }),
      siteReview({ time: '2026-09-01T00:00:00Z', author_name: 'b' }),
    ];
    sortReviewsByTimeDesc(input);
    expect(input.map((r) => r.author_name)).toEqual(['a', 'b']);
  });
});

describe('[REQ-REVIEW-05] sortReviewsForDisplay', () => {
  it('puts the pinned review first regardless of its date', () => {
    const reviews = [
      siteReview({ author_name: 'Alt', time: '2020-01-01T00:00:00Z' }),
      siteReview({ author_name: 'Neu', text: 'Anderer Text', time: '2026-11-01T00:00:00Z' }),
      siteReview({ author_name: 'Top', text: 'Highlight', time: '2021-01-01T00:00:00Z', pinned: true }),
    ];
    expect(sortReviewsForDisplay(reviews).map((r) => r.author_name)).toEqual(['Top', 'Neu', 'Alt']);
  });

  it('does not mutate the input array', () => {
    const input = [
      siteReview({ author_name: 'a', time: '2026-01-01T00:00:00Z' }),
      siteReview({ author_name: 'b', text: 'x', time: '2026-02-01T00:00:00Z', pinned: true }),
    ];
    sortReviewsForDisplay(input);
    expect(input.map((r) => r.author_name)).toEqual(['a', 'b']);
  });
});

describe('[REQ-REVIEW-02] mergeReviews', () => {
  const scraped = [
    scrapedReview({ author_name: 'Neu' }),
    scrapedReview({ author_name: 'Auch neu', text: 'Anderer Text' }),
  ];

  it('maps, preserves scraper order (newest first) and reports new entries', () => {
    const { reviews, newCount } = mergeReviews(scraped, [], 22);
    expect(reviews.map((r) => r.author_name)).toEqual(['Neu', 'Auch neu']);
    expect(newCount).toBe(2);
  });

  it('keeps existing reviews that the scraper did not return', () => {
    const existing = [
      siteReview({ author_name: 'Alt', time: '2026-04-21T10:22:10.106016Z' }),
    ];
    const { reviews, newCount } = mergeReviews(scraped, existing, 22);
    expect(reviews.map((r) => r.author_name)).toEqual(['Neu', 'Auch neu', 'Alt']);
    expect(newCount).toBe(2);
  });

  it('sorts chronologically when every review has a time', () => {
    const { reviews } = mergeReviews(
      [
        scrapedReview({ author_name: 'Älter', time: '2026-08-01T00:00:00Z' }),
        scrapedReview({ author_name: 'Neuer', text: 'Anderer Text', time: '2026-11-01T00:00:00Z' }),
      ],
      [],
      0
    );
    expect(reviews.map((r) => r.author_name)).toEqual(['Neuer', 'Älter']);
  });

  it('[REQ-REVIEW-05] keeps a pinned review first even when older', () => {
    const pinned = siteReview({ author_name: 'Chris D.', time: '2026-01-01T00:00:00Z', pinned: true });
    const newer = siteReview({ author_name: 'Neu', text: 'Anderer Text', time: '2026-11-01T00:00:00Z' });
    const { reviews } = mergeReviews([newer], [pinned], 0);
    expect(reviews.map((r) => r.author_name)).toEqual(['Chris D.', 'Neu']);
    expect(reviews[0].pinned).toBe(true);
  });

  it('[REQ-REVIEW-05] restores the pin when a pinned review is scraped again', () => {
    const pinned = siteReview({ author_name: 'Chris D.', time: '2020-01-01T00:00:00Z', pinned: true });
    const { reviews } = mergeReviews(
      [scrapedReview({ author_name: 'Chris D.', time: '2026-11-01T00:00:00Z' })],
      [pinned],
      0
    );
    expect(reviews).toHaveLength(1);
    expect(reviews[0].pinned).toBe(true);
  });

  it('does not duplicate reviews already stored', () => {
    const existing = [
      siteReview({ author_name: 'Jonas K.', time: '2026-01-01T00:00:00Z' }),
    ];
    const { reviews, newCount } = mergeReviews([scrapedReview()], existing, 22);
    expect(reviews).toHaveLength(1);
    expect(newCount).toBe(0);
  });

  it('lets scraped data win over stale existing data', () => {
    const existing = [
      siteReview({ author_name: 'Jonas K.', text: 'Alles top!', time: '2020-01-01T00:00:00Z' }),
    ];
    const { reviews } = mergeReviews([scrapedReview()], existing, 22);
    expect(reviews).toHaveLength(1);
    expect(reviews[0].relative_time_description).toBe('vor 2 Monaten');
  });

  it('applies the limit newest-first when all reviews have a time', () => {
    const many = Array.from({ length: 5 }, (_, i) => [
      { author_name: `R${i}`, text: `Text ${i}`, time: `2026-09-0${i + 1}T00:00:00Z` },
    ]).flat();
    const { reviews } = mergeReviews(many, [], 3);
    expect(reviews).toHaveLength(3);
    expect(reviews.map((r) => r.author_name)).toEqual(['R4', 'R3', 'R2']);
  });

  it('keeps all reviews when no time is available (no safe truncation)', () => {
    const timeless = [
      { author_name: 'A', text: 'a' },
      { author_name: 'B', text: 'b' },
      { author_name: 'C', text: 'c' },
    ];
    const { reviews } = mergeReviews(timeless, [], 2);
    expect(reviews).toHaveLength(3);
  });

  it('keeps all reviews when the limit is falsy', () => {
    const many = Array.from({ length: 4 }, (_, i) => [
      { author_name: `R${i}`, text: `Text ${i}`, time: `2026-09-0${i + 1}T00:00:00Z` },
    ]).flat();
    expect(mergeReviews(many, [], 0).reviews).toHaveLength(4);
  });

  it('handles empty input', () => {
    expect(mergeReviews([], [], 22)).toEqual({ reviews: [], newCount: 0 });
  });
});

describe('[REQ-REVIEW-02] buildOutput', () => {
  const match = { ratingValue: 4.8, reviewCount: 31 };

  it('uses scraper aggregate values and an ISO fetchedAt', () => {
    const now = new Date('2026-10-15T18:39:10.848Z');
    const output = buildOutput({ match, reviews: [siteReview()], now });
    expect(output).toEqual({
      ratingValue: 4.8,
      reviewCount: 31,
      fetchedAt: '2026-10-15T18:39:10.848Z',
      reviews: [siteReview()],
    });
  });

  it('falls back to 5 and the review count when aggregate values are missing', () => {
    const output = buildOutput({ match: {}, reviews: [siteReview(), siteReview()] });
    expect(output.ratingValue).toBe(5);
    expect(output.reviewCount).toBe(2);
    expect(() => new Date(output.fetchedAt).toISOString()).not.toThrow();
  });
});
