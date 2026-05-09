# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pages.spec.ts >> Alle Seiten >> / lädt und hat korrekte Inhalte
- Location: e2e/pages.spec.ts:14:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4175/
Call log:
  - navigating to "http://localhost:4175/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const PAGES = [
  4  |   { url: '/', title: /Sound & Licht Stuttgart/i, city: 'Stuttgart' },
  5  |   { url: '/stuttgart/', title: /Stuttgart/i, city: 'Stuttgart' },
  6  |   { url: '/esslingen/', title: /Esslingen/i, city: 'Esslingen' },
  7  |   { url: '/tübingen/', title: /Tübingen/i, city: 'Tübingen' },
  8  |   { url: '/filderstadt/', title: /Filderstadt/i, city: 'Filderstadt' },
  9  |   { url: '/leinfelden-echterdingen/', title: /Leinfelden-Echterdingen/i, city: 'Leinfelden-Echterdingen' },
  10 | ];
  11 | 
  12 | test.describe('Alle Seiten', () => {
  13 |   for (const page of PAGES) {
  14 |     test(`${page.url} lädt und hat korrekte Inhalte`, async ({ page: p }) => {
> 15 |       await p.goto(page.url);
     |               ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4175/
  16 |       await p.waitForLoadState('networkidle');
  17 | 
  18 |       // Status 200
  19 |       expect(p.url()).not.toContain('404');
  20 |       expect(p.url()).not.toContain('500');
  21 | 
  22 |       // Title korrekt
  23 |       await expect(p).toHaveTitle(page.title);
  24 | 
  25 |       // Keine JS-Fehler
  26 |       const logs: string[] = [];
  27 |       p.on('pageerror', err => logs.push(err.message));
  28 |       expect(logs).toEqual([]);
  29 | 
  30 |       // JSON-LD vorhanden
  31 |       const jsonlds = await p.$$eval('script[type="application/ld+json"]', els =>
  32 |         els.map(el => JSON.parse(el.textContent || '{}'))
  33 |       );
  34 |       expect(jsonlds.length).toBeGreaterThanOrEqual(3);
  35 | 
  36 |       // LocalBusiness Schema
  37 |       const localBusiness = jsonlds.find(j => j['@type'] === 'LocalBusiness');
  38 |       expect(localBusiness).toBeDefined();
  39 |       expect(localBusiness?.name).toContain('Sound & Licht Stuttgart');
  40 | 
  41 |       // Service Schema
  42 |       const service = jsonlds.find(j => j['@type'] === 'Service');
  43 |       if (page.url !== '/') {
  44 |         expect(service).toBeDefined();
  45 |         expect(service?.areaServed?.name).toBe(page.city);
  46 |       }
  47 | 
  48 |       // AggregateRating
  49 |       const rating = jsonlds.find(j => j['@type'] === 'AggregateRating');
  50 |       expect(rating).toBeDefined();
  51 |       expect(rating?.ratingValue).toBe('5.0');
  52 | 
  53 |       // FAQ Schema bei Startseite
  54 |       if (page.url === '/') {
  55 |         const faq = jsonlds.find(j => j['@type'] === 'FAQPage');
  56 |         expect(faq).toBeDefined();
  57 |         expect(faq?.mainEntity?.length).toBe(8);
  58 |       }
  59 | 
  60 |       // ↗ bei externen Links zu holger-kampffmeyer.de
  61 |       const extLinks = await p.$$eval('a[href*="holger-kampffmeyer.de"]', els =>
  62 |         els.map(el => el.textContent)
  63 |       );
  64 |       for (const link of extLinks) {
  65 |         expect(link).toContain('↗');
  66 |       }
  67 | 
  68 |       // Key Navigation
  69 |       const navbar = p.locator('nav');
  70 |       await expect(navbar).toBeVisible();
  71 | 
  72 |       // Pakete Section
  73 |       const pakete = p.locator('#pakete, section:has(h3:has-text("Partypaket"))').first();
  74 |       await expect(pakete).toBeVisible();
  75 | 
  76 |       // Kontakt
  77 |       const kontakt = p.locator('#kontakt, section:has(h2:has-text("Kontakt"))').first();
  78 |       await expect(kontakt).toBeVisible();
  79 |     });
  80 |   }
  81 | });
  82 | 
```