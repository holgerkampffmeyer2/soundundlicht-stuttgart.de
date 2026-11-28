import { test, expect } from '@playwright/test';

const BASE_URL = 'https://soundundlicht-stuttgart.de';

function isOwnUrl(value: string): boolean {
  try {
    return new URL(value).origin === BASE_URL;
  } catch {
    return false;
  }
}

const TECHNICAL_PAGES = [
  '/vermietung/pakete',
  '/vermietung/musikanlage',
  '/vermietung/lautsprecher',
  '/vermietung/pa-anlage',
  '/vermietung/dj-equipment',
  '/vermietung/partylicht',
];

test.describe('SEO-Build-Artefakte', () => {
  test('[REQ-SEO-01] sitemap-index und sitemap-0 enthalten nur öffentliche Seiten', async ({ request }) => {
    const indexResponse = await request.get('/sitemap-index.xml');
    expect(indexResponse.ok()).toBeTruthy();

    const indexXml = await indexResponse.text();
    expect(indexXml).toContain('<sitemapindex');
    expect(indexXml).toContain(`${BASE_URL}/sitemap-0.xml`);

    const sitemapResponse = await request.get('/sitemap-0.xml');
    expect(sitemapResponse.ok()).toBeTruthy();

    const sitemapXml = await sitemapResponse.text();
    expect(sitemapXml).toContain(`${BASE_URL}/stuttgart`);
    expect(sitemapXml).toContain(`${BASE_URL}/vermietung/ld-maui-28g3`);
    for (const path of TECHNICAL_PAGES) {
      expect(sitemapXml).toContain(`${BASE_URL}${path}`);
    }
    expect(sitemapXml).not.toContain('/impressum');
    expect(sitemapXml).not.toContain('/thankyou');
    expect(sitemapXml.match(/<loc>/g)?.length).toBeGreaterThan(20);
  });

  test('[REQ-SEO-01] urllist.txt enthält ausschließlich absolute, öffentliche URLs', async ({ request }) => {
    const response = await request.get('/urllist.txt');
    expect(response.ok()).toBeTruthy();

    const urls = (await response.text()).split('\n').map((line) => line.trim()).filter(Boolean);
    expect(urls.length).toBeGreaterThan(20);
    for (const url of urls) {
      expect(isOwnUrl(url)).toBeTruthy();
      expect(url).not.toContain('/impressum');
      expect(url).not.toContain('/thankyou');
    }
    expect(urls).toContain(`${BASE_URL}/stuttgart`);
    for (const path of TECHNICAL_PAGES) {
      expect(urls).toContain(`${BASE_URL}${path}`);
    }
  });

  test('[REQ-SEO-01] rss.xml ist gültiger RSS-2.0-Feed', async ({ request }) => {
    const response = await request.get('/rss.xml');
    expect(response.ok()).toBeTruthy();

    const xml = await response.text();
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('<channel>');
    expect(xml).toContain('<atom:link');
    expect(xml.match(/<item>/g)?.length).toBeGreaterThan(20);
    for (const path of TECHNICAL_PAGES) {
      expect(xml).toContain(`${BASE_URL}${path}`);
    }
    expect(xml).not.toContain('/thankyou');
  });

  test('[REQ-SEO-01] marketplace.json liefert konsistente Produkt-Daten', async ({ request }) => {
    const response = await request.get('/marketplace.json');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.baseUrl).toBe(BASE_URL);
    expect(Date.parse(body.generatedAt)).not.toBeNaN();
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(20);

    const slugs = body.products.map((product: { slug: string }) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const product of body.products) {
      expect(product.title).toBeTruthy();
      expect(product.price).toMatch(/^ab \d+€/);
      expect(isOwnUrl(product.image)).toBeTruthy();
      expect(isOwnUrl(product.detailUrl)).toBeTruthy();
    }
  });
});
