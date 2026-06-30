import { test, expect } from '@playwright/test';

test.describe('Search functionality', () => {
  test('search input should exist and have correct placeholder', async ({ page }) => {
    await page.goto('/vermietung');
    await page.waitForLoadState('domcontentloaded');

    const searchInput = page.locator('#pagefind-search-input');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', /Technik.*durchsuchen/);
  });

  test('should show results for a valid product query', async ({ page }) => {
    await page.goto('/vermietung');
    await page.waitForLoadState('domcontentloaded');

    const searchInput = page.locator('#pagefind-search-input');
    await expect(searchInput).toBeVisible();

    // Type a 2+ char query that should match products
    await searchInput.fill('PA');

    // Overlay should appear after debounce + pagefind load
    const overlay = page.locator('#pagefind-search-overlay');
    await expect(overlay).toBeVisible({ timeout: 20000 });

    // Should contain result items
    const items = overlay.locator('.rental-search-item');
    await expect(items.first()).toBeVisible({ timeout: 5000 });
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should close overlay when clicking outside', async ({ page }) => {
    await page.goto('/vermietung');
    await page.waitForLoadState('domcontentloaded');

    const searchInput = page.locator('#pagefind-search-input');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('PA');

    const overlay = page.locator('#pagefind-search-overlay');
    await expect(overlay).toBeVisible({ timeout: 20000 });
    await expect(overlay.locator('.rental-search-item').first()).toBeVisible({ timeout: 5000 });

    // Click outside the search area (on the page title) to close overlay
    await page.locator('h1').first().click({ force: true });
    await expect(overlay).not.toBeVisible();
  });

  test('should not show overlay for short queries (below 2 chars)', async ({ page }) => {
    await page.goto('/vermietung');
    await page.waitForLoadState('domcontentloaded');

    const searchInput = page.locator('#pagefind-search-input');
    await expect(searchInput).toBeVisible();

    // Single character — below the 2-char threshold
    await searchInput.fill('P');

    // Wait past the debounce period
    await page.waitForTimeout(500);

    const overlay = page.locator('#pagefind-search-overlay');
    await expect(overlay).not.toBeVisible();
  });
});
