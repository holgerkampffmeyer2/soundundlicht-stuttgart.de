# Tasks

## 1. Schema & Data vorbereiten

- [ ] 1.1 `src/content.config.ts`: Products-Schema um 8 optionale Felder erweitern (`specs: z.record(z.string()).optional()`, `includes: z.array(z.string()).optional()`, `events: z.array(z.object({ title: z.string(), description: z.string(), personCount: z.string() })).optional()`, `gallery: z.array(z.string()).optional()`, `videoId: z.string().optional()`, `videoThumbnail: z.string().optional()`, `videoTitle: z.string().optional()`, `seoDescription: z.string().optional()`)
  - Verifikation: `pnpm exec astro check` grün

- [ ] 1.2 `src/content/products/*.yml` (22 Dateien): Felder für relevante Products ergänzen (Migrations-Skript oder manuell)
  - Verifikation: YAML valide, relevante Products haben neue Felder

- [ ] 1.3 (Optional) Migrations-Skript `scripts/migrate-product-data.mjs` schreiben
  - Verifikation: Skript läuft, Output validiert

## 2. Types & Dynamic Route

- [ ] 2.1 `src/lib/types.ts`: `EventItem` Interface hinzufügen (`title`, `description`, `personCount`)
  - Verifikation: `tsc --noEmit` grün

- [ ] 2.2 `src/pages/vermietung/[slug].astro` (NEU) anlegen:
  - `getStaticPaths()` aus `getCollection('products')` (nur mit `detailPage` ohne `#`)
  - Props-Mapping: Entry-Daten → `ProductLayout` Props + Slots
  - JSON-LD: `serviceJsonLd`, `videoJsonLd` (conditional), `faqPageJsonLd`, `breadcrumbJsonLd` (Imports aus `jsonld-builders`)
  - `getFaqsForPage(slug)` für FAQs
  - Slots: `hero` (mit Video-Embed conditional), `RentalPricing`, `TechnicalSpecs`, `RentalIncludes`, `ExampleEvents`, FAQ
  - Verifikation: `pnpm exec astro check` grün für Datei

- [ ] 2.3 Conditionals in Page: `if (product.specs) <TechnicalSpecs />`, `if (product.includes) <RentalIncludes />`, `if (product.events) <ExampleEvents />`, `if (product.gallery) galleryImages`, `if (product.videoId) videoJsonLd` + Hero-Slot mit Video-Embed
  - Verifikation: Page rendert ohne Fehler bei leeren Feldern

## 3. Tests

- [ ] 3.1 `src/lib/productJsonLd.test.ts` (NEU):
  - `serviceJsonLd` Output für Product (Offers, priceValue)
  - `videoJsonLd` Output conditional
  - `faqPageJsonLd` + `breadcrumbJsonLd`
  - Verifikation: `pnpm test` → productJsonLd Tests grün

- [ ] 3.2 `tests/product-pages.spec.ts` (NEU, Playwright E2E):
  - 3 Stichproben: Paket (`partypaket-stuttgart`), Sound (`ld-maui-28g3`), Licht (`partylicht-moving-head`)
  - Prüfen: Hero, Specs, Includes, Events, Gallery, Video, FAQ, JSON-LD
  - Verifikation: `npx playwright test tests/product-pages.spec.ts` grün

## 4. Cleanup & Verifikation

- [ ] 4.1 16 alte `src/pages/vermietung/*.astro` löschen (nach Verifikation aller Pages im Build)
  - Verifikation: `git status` zeigt nur neue `[slug].astro`, keine alten

- [ ] 4.2 `pnpm exec astro check` → 0 Errors, 0 Warnings, 0 Hints
- [ ] 4.3 `pnpm test` → alle Unit-Tests grün
- [ ] 4.4 `pnpm run build` → Build erfolgreich, 16 Produkt-HTMLs generiert
- [ ] 4.5 `npx playwright test` → E2E grün (inkl. neue product-pages Tests)
- [ ] 4.6 Optional: HTML-Snapshot-Vergleich `dist/vermietung/ld-maui-28g3.html` vs. Referenz

## Workflow follow-up

- Change archivieren: `openspec archive product-pages-dynamic -y`
- Memories aktualisieren falls nötig
