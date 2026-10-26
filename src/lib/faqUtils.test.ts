// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { getFaqsForPage } from './faqUtils';

describe('getFaqsForPage', () => {
  it('returns all FAQs when page is "index" and FAQ has pages=["index"]', async () => {
    const result = await getFaqsForPage('index');
    expect(result.length).toBeGreaterThan(0);
    const hasIndexFaq = result.some((faq) => faq.pages?.includes('index'));
    expect(hasIndexFaq).toBe(true);
  });

  it('returns FAQs filtered by currentPage when pages array contains the page', async () => {
    const result = await getFaqsForPage('vermietung');
    expect(result.length).toBeGreaterThan(0);
    const allMatch = result.every(
      (faq) => !faq.pages || faq.pages.length === 0 || faq.pages.includes('vermietung') || faq.pages.includes('index')
    );
    expect(allMatch).toBe(true);
  });

  it('returns FAQs for a specific product page', async () => {
    const result = await getFaqsForPage('jbl-partybox-300-320');
    expect(result.length).toBeGreaterThan(0);
    const allMatch = result.every(
      (faq) => !faq.pages || faq.pages.length === 0 || faq.pages.includes('jbl-partybox-300-320') || faq.pages.includes('index')
    );
    expect(allMatch).toBe(true);
  });

  it('returns FAQs for a city page', async () => {
    const result = await getFaqsForPage('stuttgart');
    expect(result.length).toBeGreaterThan(0);
    const allMatch = result.every(
      (faq) => !faq.pages || faq.pages.length === 0 || faq.pages.includes('stuttgart') || faq.pages.includes('index')
    );
    expect(allMatch).toBe(true);
  });

  it('does not return FAQs that are for a different page', async () => {
    const result = await getFaqsForPage('vermietung');
    const wrongPageFaqs = result.filter(
      (faq) => faq.pages && faq.pages.length > 0 && !faq.pages.includes('vermietung') && !faq.pages.includes('index')
    );
    expect(wrongPageFaqs.length).toBe(0);
  });

  it('falls back to all FAQs when page has no matching FAQs (returns index FAQs)', async () => {
    const result = await getFaqsForPage('nonexistent-page');
    // Should return FAQs that have "index" in pages (the fallback)
    const hasIndexFallback = result.some((faq) => faq.pages?.includes('index'));
    expect(hasIndexFallback).toBe(true);
  });
});