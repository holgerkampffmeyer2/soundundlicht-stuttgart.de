import { test, expect } from '@playwright/test';
import { getJsonLdNodes, jsonLdTypes } from './helpers/jsonld';

const BASE_URL = 'https://soundundlicht-stuttgart.de';

test.describe('City Pages', () => {
  const testCities = ['stuttgart', 'esslingen', 'filderstadt'];

  for (const city of testCities) {
    test.describe(`City: ${city}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${city}`);
        await page.waitForLoadState('domcontentloaded');
      });

      test('[REQ-CITY-01] should load successfully', async ({ page }) => {
        await expect(page).toHaveTitle(new RegExp(city.charAt(0).toUpperCase() + city.slice(1), 'i'));
      });

      test('[REQ-CITY-02] should have a non-empty h1', async ({ page }) => {
        await expect(page.locator('h1')).not.toBeEmpty();
      });

      test('[REQ-CITY-01] should have hero image', async ({ page }) => {
        // Hero image is in CityHero component with class "hero-bg-img" or similar
        const heroImage = page.locator('.city-hero-bg-img, .hero-bg-img').first();
        if (await heroImage.count() === 0) {
          // Fallback: look for image with city slug in src
          await expect(page.locator(`img[src*="/img/cities/${city}.webp"]`)).toBeVisible();
        } else {
          await expect(heroImage).toBeVisible();
        }
      });

      test('[REQ-FAQ-01] should have FAQ section', async ({ page }) => {
        await expect(page.locator('text=Häufig gestellte Fragen')).toBeVisible({ timeout: 5000 });
      });

      test('[REQ-CITY-08] should have Contact section', async ({ page }) => {
        await expect(page.locator('text=anfragen').first()).toBeVisible({ timeout: 5000 });
      });

      test('[REQ-CITY-04] hat geparstes JSON-LD mit Breadcrumb, Service und FAQ', async ({ page }) => {
        const nodes = await getJsonLdNodes(page);
        const types = jsonLdTypes(nodes);
        for (const type of ['WebPage', 'LocalBusiness', 'ItemList', 'BreadcrumbList', 'Service', 'FAQPage']) {
          expect(types).toContain(type);
        }
        expect(types).not.toContain('Product');

        const breadcrumb = nodes.find((node) => node['@type'] === 'BreadcrumbList');
        const items = breadcrumb?.itemListElement as Array<Record<string, unknown>>;
        expect(items).toHaveLength(2);
        expect(String(items[1].name).toLowerCase()).toBe(city);
        expect(items[1].item).toBe(`${BASE_URL}/${city}`);
        for (const item of items) {
          expect(String(item.position)).toMatch(/^[12]$/);
        }
      });
    });
  }
});