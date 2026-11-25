import { test, expect, type Page } from '@playwright/test';
import { getJsonLdNodes, jsonLdTypes } from './helpers/jsonld';

const BASE_URL = 'https://soundundlicht-stuttgart.de';
const BASE_TYPES = ['WebPage', 'LocalBusiness', 'Organization', 'Person', 'WebSite', 'ItemList'];

async function visit(page: Page, path: string): Promise<void> {
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
}

test.describe('JSON-LD-Seitentypen', () => {
  test('[REQ-JSONLD-01] Produktseite hat vollständige, absolute JSON-LD-Daten ohne Product', async ({ page }) => {
    await visit(page, '/vermietung/ld-maui-28g3');

    const nodes = await getJsonLdNodes(page);
    const types = jsonLdTypes(nodes);
    for (const type of [...BASE_TYPES, 'Service', 'BreadcrumbList', 'FAQPage', 'VideoObject']) {
      expect(types).toContain(type);
    }
    expect(types).not.toContain('Product');

    const service = nodes.find((node) => node['@type'] === 'Service');
    const images = service?.image as string[];
    expect(Array.isArray(images)).toBeTruthy();
    expect(images.length).toBeGreaterThan(0);
    for (const image of images) {
      expect(image.startsWith(BASE_URL)).toBeTruthy();
    }

    const breadcrumb = nodes.find((node) => node['@type'] === 'BreadcrumbList');
    const items = breadcrumb?.itemListElement as Array<Record<string, unknown>>;
    expect(items.length).toBeGreaterThan(1);
    for (const item of items) {
      if (item.item) expect(String(item.item).startsWith(BASE_URL)).toBeTruthy();
    }

    const faq = nodes.find((node) => node['@type'] === 'FAQPage');
    const questions = faq?.mainEntity as Array<Record<string, unknown>>;
    expect(questions.length).toBeGreaterThan(0);
    for (const question of questions) {
      expect(question['@type']).toBe('Question');
      expect((question.acceptedAnswer as Record<string, unknown>)['@type']).toBe('Answer');
    }
  });

  test('[REQ-JSONLD-01] Kategorieseite hat Service/Breadcrumb/FAQ ohne VideoObject', async ({ page }) => {
    await visit(page, '/vermietung/nebelmaschinen');

    const types = jsonLdTypes(await getJsonLdNodes(page));
    for (const type of [...BASE_TYPES, 'Service', 'BreadcrumbList', 'FAQPage']) {
      expect(types).toContain(type);
    }
    expect(types).not.toContain('Product');
    expect(types).not.toContain('VideoObject');
  });

  test('[REQ-JSONLD-01] FAQ-Seite hat FAQPage, aber kein Product', async ({ page }) => {
    await visit(page, '/faq');

    const types = jsonLdTypes(await getJsonLdNodes(page));
    for (const type of [...BASE_TYPES, 'FAQPage']) {
      expect(types).toContain(type);
    }
    expect(types).not.toContain('Product');
  });

  test('[REQ-FAQ-04] FAQ-Seite nutzt SVG-Icons und lesbaren Antworttext', async ({ page }) => {
    await visit(page, '/faq');

    const summaries = page.locator('details.faq-item summary');
    const summaryCount = await summaries.count();
    expect(summaryCount).toBeGreaterThan(0);
    expect(await summaries.locator('svg[aria-hidden="true"]').count()).toBe(summaryCount * 2);
    expect(await page.locator('.toc-chip svg[aria-hidden="true"]').count()).toBeGreaterThan(0);

    for (const summary of await summaries.all()) {
      const text = (await summary.innerText()).trim();
      expect(text.startsWith('?')).toBeFalsy();
      expect(text.startsWith('📍')).toBeFalsy();
    }

    const answerColor = await page.locator('.faq-answer p').first().evaluate((element) => getComputedStyle(element).color);
    const bodyColor = await page.locator('body').evaluate((element) => getComputedStyle(element).color);
    expect(answerColor).toBe(bodyColor);
  });

  test('[REQ-JSONLD-01] Impressum hat nur die Basistypen', async ({ page }) => {
    await visit(page, '/impressum');

    const types = jsonLdTypes(await getJsonLdNodes(page));
    expect(types.sort()).toEqual([...BASE_TYPES].sort());
  });

  test('[REQ-FAQ-03] Partybox-FAQ nur auf JBL-Seiten', async ({ page }) => {
    const question = 'Wie viel kostet es, eine Partybox in Stuttgart zu mieten?';

    for (const path of [
      '/vermietung/jbl-partybox-300-320',
      '/vermietung/akku-party-paket',
      '/vermietung/partypaket-stuttgart',
      '/vermietung/karaoke-paket',
    ]) {
      await visit(page, path);
      await expect(page.getByText(question)).toBeVisible();
    }

    for (const path of ['/vermietung/ld-maui-28g3', '/vermietung/veranstaltungspaket-stuttgart']) {
      await visit(page, path);
      await expect(page.getByText(question)).toHaveCount(0);

      const faq = (await getJsonLdNodes(page)).find((node) => node['@type'] === 'FAQPage');
      const names = ((faq?.mainEntity as Array<Record<string, unknown>>) ?? []).map((entry) => entry.name);
      expect(names).not.toContain(question);
    }
  });
});
