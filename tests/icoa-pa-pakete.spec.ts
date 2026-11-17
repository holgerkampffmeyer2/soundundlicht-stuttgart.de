import { test, expect } from '@playwright/test';

const pages = [
  {
    path: '/vermietung/ld-icoa-club-paket',
    heading: 'Club-Paket LD ICOA',
    price: 'ab 150€ / Tag',
    hasSub: true,
  },
  {
    path: '/vermietung/ld-icoa-buehnen-paket',
    heading: 'Bühnen-Paket LD ICOA',
    price: 'ab 140€ / Tag',
    hasSub: true,
  },
  {
    path: '/vermietung/ld-icoa-top-paar',
    heading: 'Top-Paar LD ICOA',
    price: 'ab 120€ / Tag',
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

      test('zeigt Überschrift und Preis', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: pageData.heading })).toBeVisible();
        await expect(page.getByText(pageData.price).first()).toBeVisible();
      });

      test('verlinkt auf Systemseite und Paketinhalt', async ({ page }) => {
        await expect(page.locator('a[href="/vermietung/ld-systems-icoa-series#ld-icoa-12-a"]:visible').first()).toBeVisible();
        if (pageData.hasSub) {
          await expect(page.locator('a[href="/vermietung/ld-systems-icoa-series#ld-icoa-sub-15-a"]:visible').first()).toBeVisible();
        }
      });

      test('hat eigene FAQs', async ({ page }) => {
        await expect(page.getByText('Häufig gestellte Fragen')).toBeVisible();
        expect(await page.locator('details.faq-details').count()).toBeGreaterThanOrEqual(3);
      });

      test('hat Service-, Breadcrumb- und FAQ-JSON-LD ohne Product', async ({ page }) => {
        const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
        const joined = jsonLd.join(' ');
        expect(joined).toContain('"@type":"Service"');
        expect(joined).toContain('"@type":"BreadcrumbList"');
        expect(joined).toContain('"@type":"FAQPage"');
        expect(joined).not.toContain('"@type":"Product"');
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

    test('verlinkt auf alle drei Pakete', async ({ page }) => {
      for (const packagePath of [
        '/vermietung/ld-icoa-club-paket',
        '/vermietung/ld-icoa-buehnen-paket',
        '/vermietung/ld-icoa-top-paar',
      ]) {
        await expect(page.locator(`a[href="${packagePath}"]:visible`).first()).toBeVisible();
      }
    });

    test('hat JSON-LD ohne Product und mit beiden Angeboten', async ({ page }) => {
      const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
      const joined = jsonLd.join(' ');
      expect(joined).toContain('"@type":"Service"');
      expect(joined).toContain('"@type":"Offer"');
      expect(joined).not.toContain('"@type":"Product"');
    });
  });

  test('Navbar verlinkt Club-Paket und System', async ({ page }) => {
    await page.goto('/vermietung');
    expect(await page.locator('a[href="/vermietung/ld-icoa-club-paket"]').count()).toBeGreaterThan(0);
    expect(await page.locator('a[href="/vermietung/ld-systems-icoa-series"]').count()).toBeGreaterThan(0);
  });
});
