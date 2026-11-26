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

test.describe('City-SEO-Differenzierung', () => {
  const allCitySlugs = [
    'stuttgart', 'esslingen', 'tübingen', 'filderstadt', 'leinfelden-echterdingen',
    'kornwestheim', 'ludwigsburg', 'böblingen', 'sindelfingen', 'leonberg',
    'waiblingen', 'nürtingen', 'reutlingen', 'kirchheim-unter-teck', 'ostfildern',
    'fellbach', 'herrenberg', 'winnenden', 'backnang', 'metzingen', 'göppingen',
  ];

  type CityMeta = {
    slug: string;
    title: string;
    h1: string;
    description: string;
    canonical: string;
  };

  test('[REQ-CITY-SEO-01][REQ-CITY-SEO-02] alle 21 Städte haben eindeutige Titles, H1, Descriptions und Canonicals', async ({ page }) => {
    const pages: CityMeta[] = [];

    for (const slug of allCitySlugs) {
      await page.goto(`/${encodeURI(slug)}`);
      const meta = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() ?? '',
        description: document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '',
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      }));
      pages.push({ slug, ...meta });
    }

    for (const key of ['title', 'h1', 'description', 'canonical'] as const) {
      expect(new Set(pages.map((entry) => entry[key])).size).toBe(allCitySlugs.length);
    }

    for (const entry of pages) {
      expect(entry.h1).not.toContain('PA-Anlage & Partybox mieten');
      expect(entry.description.length).toBeGreaterThan(80);
      expect(entry.canonical).toBe(`${BASE_URL}/${encodeURI(entry.slug)}`);
    }
  });

  test('[REQ-CITY-SEO-03] jede Stadt hat eigene Begriffe in Title, H1 und Description', async ({ page }) => {
    const occurrences = new Map<string, number>();

    for (const slug of allCitySlugs) {
      await page.goto(`/${encodeURI(slug)}`);
      const text = await page.evaluate(() => [
        document.title,
        document.querySelector('h1')?.textContent ?? '',
        document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      ].join(' '));

      for (const word of new Set(text.toLowerCase().match(/[a-zäöüß]{4,}/g) ?? [])) {
        occurrences.set(word, (occurrences.get(word) ?? 0) + 1);
      }
    }

    const uniqueWords = [...occurrences.values()].filter((count) => count === 1);
    expect(uniqueWords.length).toBeGreaterThan(allCitySlugs.length * 3);
  });

  test('[REQ-CITY-SEO-04][REQ-CITY-SEO-05] JSON-LD und FAQs sind stadtbezogen', async ({ page }) => {
    await page.goto('/esslingen');
    const nodes = await getJsonLdNodes(page);
    const service = nodes.find((node) => node['@type'] === 'Service');
    expect(service?.areaServed).toEqual([{ '@type': 'City', name: 'Esslingen' }]);
    await expect(page.getByText('Wann reicht schlanke Beschallung in Esslinger Altstadt-Räumen?', { exact: false })).toBeVisible();

    await page.goto('/nürtingen');
    await expect(page.getByText('Brauche ich für Nürtinger Feiern Akku-Box oder Netzstrom?', { exact: false })).toBeVisible();
    await expect(page.getByText('Wann lohnt sich „Akku-Licht für Tübinger Gartenpartys“?', { exact: false })).toHaveCount(0);
  });
});
