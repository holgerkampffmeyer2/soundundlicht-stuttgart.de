# Tasks

## 1. Schema & Daten

- [x] 1.1 `src/content.config.ts`: `primaryKeyword`, `seoTitle`, `metaDescription` optional ergänzen.
- [x] 1.2 `src/data/cities.json`: Alle 21 Einträge mit Primärkeyword, SEO-Title, Meta-Description und unique Prosa aktualisieren.
- [x] 1.3 `src/data/faqs.json`: Zwei city-spezifische FAQs je Stadt ergänzen.

## 2. City-Route

- [x] 2.1 `src/pages/[city].astro`: Neue SEO-Felder für Title/Description/H1 nutzen.
- [x] 2.2 `serviceJsonLd` mit stadtbezogenem `areaServed` aufrufen.
- [x] 2.3 Identischen „Tipps vom Profi"-Text pro Stadt individualisieren.

## 3. Technische Landingpages

- [x] 3.1 `TechnicalLandingLayout.astro` anlegen.
- [x] 3.2 Sechs Seiten unter `src/pages/vermietung/` anlegen (pakete, musikanlage, lautsprecher, pa-anlage, dj-equipment, partylicht).
- [x] 3.3 `src/data/faqs.json`: Je drei FAQs pro technischer Seite ergänzen.
- [x] 3.4 `jbl-partybox-300-320.astro`: „Musikbox mieten" als Synonym ergänzen.

## 4. Tests & Artefakte

- [x] 4.1 `tests/city-pages.spec.ts`: Unique-Title/H1/Meta/Canonical, Mindest-Unique-Wörter, eindeutige Primärkeywords.
- [x] 4.2 `tests/jsonld-pages.spec.ts`: Service/Breadcrumb/FAQ für technische Seiten.
- [x] 4.3 `tests/seo-artifacts.spec.ts`: Neue URLs in Sitemap/urllist/RSS.
- [x] 4.4 `public/llms.txt` / `public/llms-full.txt` und SEO-Doku aktualisieren.

## 5. Verifikation

- [x] 5.1 `pnpm run lint:agent && pnpm run check && pnpm run build:full`.
- [x] 5.2 `pnpm test` (117 Tests) und `CI=1 npx playwright test --workers=1 --reporter=line` (69 Tests).
- [x] 5.3 `pnpm run indexnow-submit` nach erfolgreichem `build:full` (51 URLs, ohne `/404`).
