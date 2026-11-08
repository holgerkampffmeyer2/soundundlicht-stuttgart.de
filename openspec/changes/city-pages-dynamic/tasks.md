# Tasks

## 1. Schema & Data vorbereiten

- [ ] 1.1 `src/content.config.ts`: Cities-Schema um 9 optionale Strings erweitern (`heroTitle`, `heroDescription`, `heroDetails`, `einzelTitle`, `einzelDescription`, `areasIntro`, `contactDescription`, `distanceText`, `travelTimeText`)
  - Verifikation: `pnpm exec astro check` grün; Schema validiert Cities

- [ ] 1.2 `src/data/cities.json`: Prosa-Felder für alle 20 Cities ergänzen (Migrations-Skript oder manuell)
  - Verifikation: JSON valide, alle 20 Einträge haben neue Felder (können leer sein)

- [ ] 1.3 (Optional) Migrations-Skript `scripts/migrate-city-prose.mjs` schreiben, das alte `src/pages/<city>.astro` parst und `cities.json` befüllt
  - Verifikation: Skript läuft fehlerfrei, Output validiert

## 2. Types & Utils aktualisieren

- [ ] 2.1 `src/lib/types.ts`: `export type CityData = CollectionEntry<'cities'>['data']` hinzufügen
  - Verifikation: `tsc --noEmit` grün

- [ ] 2.2 `src/lib/faqUtils.ts`: `async` aus `getFaqsForPage` entfernen, Return-Type `FaqEntry[]`
  - Verifikation: `pnpm exec astro check` grün; keine async-Warnungen

- [ ] 2.3 `src/lib/faqUtils.test.ts`: Tests anpassen (`await` entfernen)
  - Verifikation: `pnpm test` → faqUtils Tests grün

## 3. Dynamische Route `[city].astro` implementieren

- [ ] 3.1 `src/pages/[city].astro` (NEU) anlegen:
  - `getStaticPaths()` aus `getCollection('cities')`
  - Props-Mapping: City-Daten → Component-Props
  - Components: `CityHero`, `CityPackages`, `CitySteps`, `CityAreas`, `CityEinzeltechnik`, `FAQSection`, `ContactSection`, `Breadcrumb`
  - JSON-LD: `breadcrumbJsonLd`, `serviceJsonLd`, `faqPageJsonLd` (Imports aus `jsonld-builders`)
  - `einzelItems` Mapping via `citiesData` Import + `getCollection('products')`
  - `getFaqsForPage(citySlug)` für FAQs
  - Verifikation: `pnpm exec astro check` grün für Datei

- [ ] 3.2 Defaults für optionale Prosa-Felder in Page-Logik definieren (z. B. `heroTitle ?? \`PA-Anlage & Partybox mieten in ${city.name}\``)
  - Verifikation: Page rendert ohne Fehler auch bei leeren Feldern

## 4. Tests

- [ ] 4.1 `src/lib/cityUtils.test.ts` (NEU):
  - `getStaticPaths` liefert 20 Entries
  - JSON-LD Builder (`breadcrumbJsonLd`, `serviceJsonLd`, `faqPageJsonLd`) korrekte Struktur
  - Verifikation: `pnpm test` → cityUtils Tests grün

- [ ] 4.2 `tests/city-pages.spec.ts` (NEU, Playwright E2E):
  - 3 Stichproben-Cities: `stuttgart`, `esslingen`, `filderstadt`
  - Prüfen: Title, Hero-Bild, Packages, Einzeltechnik (falls Items), Steps, Areas, FAQ, Contact, Breadcrumb, JSON-LD vorhanden
  - Verifikation: `npx playwright test tests/city-pages.spec.ts` grün

## 5. Cleanup & Verifikation

- [ ] 5.1 20 alte `src/pages/<city>.astro` löschen (nach Verifikation aller 20 Pages im Build)
  - Verifikation: `git status` zeigt nur neue `[city].astro`, keine alten City-Pages

- [ ] 5.2 `pnpm exec astro check` → 0 Errors, 0 Warnings, 0 Hints
- [ ] 5.3 `pnpm test` → alle Unit-Tests grün
- [ ] 5.4 `pnpm run build` → Build erfolgreich, 20 City-HTMLs generiert
- [ ] 5.5 `npx playwright test` → E2E grün (inkl. neue city-pages Tests)
- [ ] 5.6 Optional: HTML-Snapshot-Vergleich `dist/stuttgart.html` vs. archivierte Referenz

## Workflow follow-up

- Change archivieren: `openspec archive city-pages-dynamic -y`
- Memories aktualisieren (core.md: "20 City-Pages manuell" → "dynamische Route")
- Docs aktualisieren (docs/citypage.md evtl. anpassen)
