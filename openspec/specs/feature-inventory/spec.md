# feature-inventory Specification

## Purpose
Comprehensive functional and architectural feature inventory of the Sound & Licht Stuttgart event technology rental website.

## Requirements

### Requirement: Core Architecture and Layout
The platform SHALL use Astro 7.x Static Site Generation (SSG) with Tailwind CSS 4.x and a dark theme.

#### Scenario: Layout structure and navigation
- **WHEN** any page is rendered
- **THEN** it includes the responsive Navbar and Footer marked with `data-pagefind-ignore`, dynamic mobile menu, and WishlistIcon badge

### Requirement: Product Content Collections and Catalog
The platform SHALL manage rental products via Astro content collections (`src/content/products/*.yml`) with 22 items.

#### Scenario: Product catalog and detail pages
- **WHEN** users browse `/vermietung/` or product detail pages (`/vermietung/<slug>/`)
- **THEN** products display pricing ("ab XX€"), features, descriptions, and "Mehr Infos" buttons for products with dedicated detail pages

#### Scenario: Einzeltechnik section on city pages
- **WHEN** a city page renders the Einzeltechnik section with individual equipment items
- **THEN** each product card with a real detail page (no `#` anchor) SHALL display a "Details & Buchung ↗" link styled as `btn-primary`, matching the visual pattern used in the Komplettpakete section

### Requirement: FAQ Collection and Utility
The platform SHALL manage FAQs via `src/data/faqs.json` (183 entries) filtered by page identifiers via `getFaqsForPage(pageId)`.

#### Scenario: FAQ rendering and schema
- **WHEN** a product, city, or landing page renders FAQs
- **THEN** relevant FAQs are filtered and displayed with corresponding FAQPage JSON-LD structured data

### Requirement: Geographic City Pages
The platform SHALL generate landing pages for 20 target cities based on `src/data/cities.json`.

#### Scenario: City page generation and SEO
- **WHEN** a user visits `/<stadt>/`
- **THEN** the page renders localized rental information with `Service`, `LocalBusiness`, and `areaServed` JSON-LD schema

### Requirement: Pagefind Search Integration
The platform SHALL provide client-side full-text search via `astro-pagefind` with catalog fallback matching.

#### Scenario: Search interaction and performance
- **WHEN** a user types in the search input (min 2 characters, 300ms debounce)
- **THEN** an overlay appears showing Pagefind index results and rich catalog matches with keyboard navigation (ArrowUp/Down/Enter/Escape) and click-outside closure

### Requirement: Merkliste (Wishlist) Store and Components
The platform SHALL provide client-side wishlist management via `src/lib/merklisteStore.ts` stored in `localStorage` (`sls_merkliste`).

#### Scenario: Wishlist CRUD and synchronization
- **WHEN** a user adds, removes, or updates product quantities
- **THEN** the store updates `localStorage`, expires after 24 hours of inactivity, updates badge counts across Navbar and StickyMerkliste, controls the WishlistDrawer modal, and prefills contact inquiries

### Requirement: SEO and IndexNow Submission
The platform SHALL provide robust SEO (JSON-LD per page type, price formatting as "ab XX€") and URL submission via IndexNow.

#### Scenario: Search engine indexing and submission
- **WHEN** the site is built with `pnpm run build:full`
- **THEN** static HTML, sitemap, `rss.xml`, and `public/urllist.txt` are generated and can be submitted to IndexNow (`pnpm run indexnow-submit`)

### Requirement: Automated Testing Suites
The platform SHALL maintain test coverage using Vitest and Playwright.

#### Scenario: Unit and E2E test execution
- **WHEN** tests are executed (`vitest` and `playwright test`)
- **THEN** store logic, search functionality, and wishlist interactions are verified successfully

### Requirement: RSS-Feed und LLM-Hilfsdateien

Der Build SHALL über `pnpm run build:full` zusätzlich zum statischen HTML einen RSS-Feed (`public/rss.xml` via `scripts/generate-rss.mjs`) sowie `public/llms.txt` und `public/llms-full.txt` erzeugen.

#### Scenario: RSS und llms nach Deploy-Build

- **WHEN** `pnpm run build:full` ausgeführt wird
- **THEN** existieren `public/rss.xml` (valides RSS-2.0-XML der neuesten Beiträge/Seiten) und die llms-Dateien im `public/`-Verzeichnis

### Requirement: Erweiterte Test-Abdeckung (Unit + E2E)

Neben Store- und Such-Logik SHALL die Test-Suite auch die Review-Pipeline (Unit, `scripts/fetch-google-reviews.test.mjs`, `src/data/google-reviews.test.ts`) sowie Merkliste- und Such-Interaktionen im Browser (Playwright-E2E: `tests/merkliste.spec.ts`, `tests/search.spec.ts`) abdecken.

#### Scenario: Gesamtsuite ist grün

- **WHEN** `pnpm test` (Vitest, `--pool=forks`) und `npx playwright test` ausgeführt werden
- **THEN** bestehen alle Unit-Tests (Review-Merge/Dedup/Schema, Merkliste-Store, cartData) und alle E2E-Tests (Merkliste-CRUD inkl. localStorage, Suche inkl. Overlay/Keyboard)

#### Scenario: Review-Daten-Invarianten

- **WHEN** `src/data/google-reviews.test.ts` läuft
- **THEN** prüft es Aggregate (`reviewCount` ≥ Anzahl gespeicherter Reviews), ISO-8601-Zeitstempel (wo vorhanden, in nicht-steigender Reihenfolge) und eindeutige Review-Schlüssel (Autor + Text-Präfix)
