import { test, expect } from '@playwright/test';

test.describe('City Pages', () => {
  const testCities = ['stuttgart', 'esslingen', 'filderstadt'];

  for (const city of testCities) {
    test.describe(`City: ${city}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${city}`);
        await page.waitForLoadState('domcontentloaded');
      });

      test('should load successfully', async ({ page }) => {
        await expect(page).toHaveTitle(new RegExp(city.charAt(0).toUpperCase() + city.slice(1), 'i'));
      });

      test('should have hero image', async ({ page }) => {
        // Hero image is in CityHero component with class "hero-bg-img" or similar
        const heroImage = page.locator('.city-hero-bg-img, .hero-bg-img').first();
        if (await heroImage.count() === 0) {
          // Fallback: look for image with city slug in src
          await expect(page.locator(`img[src*="/img/cities/${city}.webp"]`)).toBeVisible();
        } else {
          await expect(heroImage).toBeVisible();
        }
      });

      test('should have FAQ section', async ({ page }) => {
        await expect(page.locator('text=Häufig gestellte Fragen')).toBeVisible({ timeout: 5000 });
      });

      test('should have Contact section', async ({ page }) => {
        await expect(page.locator('text=anfragen').first()).toBeVisible({ timeout: 5000 });
      });

      test('should have JSON-LD scripts', async ({ page }) => {
        const jsonLdScripts = page.locator('script[type="application/ld+json"]');
        const count = await jsonLdScripts.count();
        expect(count).toBeGreaterThanOrEqual(3);
      });
    });
  }
});