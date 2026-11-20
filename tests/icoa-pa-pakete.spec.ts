import { test, expect } from '@playwright/test';
import { getJsonLdNodes, jsonLdTypes } from './helpers/jsonld';

const pages = [
  {
    path: '/vermietung/ld-icoa-club-paket',
    heading: '2x ICOA Fullrange-Lautsprecher + 2x Bassreflex-PA-Subwoofer',
    price: 'ab 150€ / Tag',
    hasSub: true,
  },
  {
    path: '/vermietung/ld-icoa-party-paket',
    heading: '2x ICOA Fullrange-Lautsprecher + 1x Bassreflex-PA-Subwoofer',
    price: 'ab 130€ / Tag',
    hasSub: true,
  },
  {
    path: '/vermietung/ld-icoa-top-paar',
    heading: '2x ICOA Fullrange-Lautsprecher',
    price: 'ab 100€ / Tag',
    hasSub: false,
  },
];

test.describe('LD ICOA PA-Pakete', () => {
  for (const pageData of pages) {
    test.describe(pageData.heading, () => {
      test.beforeEach(async ({ page }) => {
        const response = await page.goto(pageData.path);
        expect(response?.status()).toBe(200);
        await page.waitForLoadState('domcontentloaded');
      });

      test('[REQ-ICOA-01] zeigt Überschrift und Preis', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: pageData.heading })).toBeVisible();
        await expect(page.getByText(pageData.price).first()).toBeVisible();
      });

      test('[REQ-ICOA-02] verlinkt auf Systemseite und Paketinhalt', async ({ page }) => {
        await expect(page.locator('a[href="/vermietung/ld-systems-icoa-series#ld-icoa-12-a"]:visible').first()).toBeVisible();
        if (pageData.hasSub) {
          await expect(page.locator('a[href="/vermietung/ld-systems-icoa-series#ld-icoa-sub-15-a"]:visible').first()).toBeVisible();
        }
      });

      test('[REQ-ICOA-04] hat eigene FAQs', async ({ page }) => {
        await expect(page.getByText('Häufig gestellte Fragen')).toBeVisible();
        expect(await page.locator('details.faq-details').count()).toBeGreaterThanOrEqual(3);
      });

      test('[REQ-ICOA-05] hat geparstes Service-, Breadcrumb- und FAQ-JSON-LD ohne Product', async ({ page }) => {
        const types = jsonLdTypes(await getJsonLdNodes(page));
        for (const type of ['Service', 'BreadcrumbList', 'FAQPage']) {
          expect(types).toContain(type);
        }
        expect(types).not.toContain('Product');
      });
    });
  }

  test.describe('LD ICOA Systemseite', () => {
    test.beforeEach(async ({ page }) => {
      const response = await page.goto('/vermietung/ld-systems-icoa-series');
      expect(response?.status()).toBe(200);
      await page.waitForLoadState('domcontentloaded');
    });

    test('zeigt Tops, Subs und Zubehör', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1, name: 'LD ICOA PA-System mieten' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'LD Systems ICOA 12 A' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'LD Systems ICOA SUB 15 A' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Distanzstangen, Stative & Kabel' })).toBeVisible();
    });

    test('hat die erwarteten Anker', async ({ page }) => {
      await expect(page.locator('#ld-icoa-12-a')).toHaveCount(1);
      await expect(page.locator('#ld-icoa-sub-15-a')).toHaveCount(1);
      await expect(page.locator('#zubehoer')).toHaveCount(1);
    });

    test('[REQ-ICOA-02] verlinkt auf alle drei Pakete', async ({ page }) => {
      for (const packagePath of [
        '/vermietung/ld-icoa-club-paket',
        '/vermietung/ld-icoa-party-paket',
        '/vermietung/ld-icoa-top-paar',
      ]) {
        await expect(page.locator(`a[href="${packagePath}"]:visible`).first()).toBeVisible();
      }
    });

    test('[REQ-ICOA-05] hat geparstes JSON-LD ohne Product und mit Offer', async ({ page }) => {
      const nodes = await getJsonLdNodes(page);
      const types = jsonLdTypes(nodes);
      expect(types).toContain('Service');
      expect(types).not.toContain('Product');

      const service = nodes.find((node) => node['@type'] === 'Service');
      const offers = service?.offers as Array<Record<string, unknown>>;
      expect(offers.map((offer) => offer['@type'])).toContain('Offer');
      expect(offers).toHaveLength(2);
    });
  });

  test('[REQ-ICOA-03] Navbar verlinkt Club-Paket und System', async ({ page }) => {
    await page.goto('/vermietung');
    expect(await page.locator('a[href="/vermietung/ld-icoa-club-paket"]').count()).toBeGreaterThan(0);
    expect(await page.locator('a[href^="/vermietung/ld-systems-icoa-series"]').count()).toBeGreaterThan(0);
  });
});
