import { test, expect } from '@playwright/test';

test.describe('Rezensionen', () => {
  test('[REQ-REVIEW-04] zeigt Aggregatbewertung und SVG-Sterne', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#bewertungen');

    await expect(section).toBeVisible();
    await expect(section.locator('.reviews-score')).toHaveText('5,0');
    await expect(section.locator('.reviews-count')).toHaveText(/\d+ Rezensionen/);
    expect(await section.locator('.reviews-summary-stars svg').count()).toBe(5);
    expect(await section.locator('.review-stars svg[aria-hidden="true"]').count()).toBeGreaterThan(0);
    await expect(section.locator('.reviews-summary-stars')).toHaveAttribute('aria-label', /5,0 von 5 Sternen/);
  });

  test('[REQ-REVIEW-01] paginiert Rezensionen und markiert die aktive Seite', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#bewertungen');
    const visibleCards = section.locator('.review-card:visible');

    await expect(visibleCards).toHaveCount(3);
    const firstName = await visibleCards.first().locator('.review-author h3').innerText();

    await section.getByRole('button', { name: 'Seite 2' }).click();

    await expect(visibleCards).toHaveCount(3);
    expect(await visibleCards.first().locator('.review-author h3').innerText()).not.toBe(firstName);
    await expect(section.locator('.page-btn[data-active="true"]')).toHaveAttribute('aria-current', 'page');
    await expect(section.locator('#prevPage')).toBeEnabled();
    await expect(section.locator('#reviewsStatus')).toHaveText(/Seite 2 von \d+/);
  });

  test('[REQ-REVIEW-04] lange Rezensionen sind aufklappbar', async ({ page }) => {
    await page.goto('/');
    const more = page.locator('#bewertungen .review-more').first();

    await expect(more).toBeVisible();
    await more.locator('summary').click();
    await expect(more).toHaveAttribute('open', '');
    await expect(more.locator('p')).toBeVisible();
    await expect(more.locator('.less-label')).toBeVisible();

    const textBox = await more.locator('p').boundingBox();
    const summaryBox = await more.locator('summary').boundingBox();
    expect(textBox).toBeTruthy();
    expect(summaryBox).toBeTruthy();
    if (textBox && summaryBox) {
      expect(summaryBox.y).toBeGreaterThan(textBox.y + textBox.height);
    }
    expect(await more.evaluate(el => getComputedStyle(el).borderTopWidth)).toBe('0px');
    expect(await more.locator('summary').evaluate(el => getComputedStyle(el).borderTopWidth)).toBe('1px');

    await more.locator('summary').click();
    await expect(more).not.toHaveAttribute('open', '');
    await expect(more.locator('summary')).toBeFocused();
    await page.waitForFunction(() => {
      const card = document.activeElement?.closest('.review-card');
      if (!card) return false;
      const top = card.getBoundingClientRect().top;
      return top >= 0 && top < 200;
    });
  });
});
