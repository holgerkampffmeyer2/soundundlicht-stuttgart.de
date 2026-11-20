# feature-inventory Specification

## Purpose
Übergreifende Architektur- und Plattform-Invarianten der Website. Features mit eigener Capability-Spec werden hier nur noch verlinkt; das tatsächliche Verhalten ist in den Tests mit den `REQ-*`-IDs abgesichert.

## Requirements

### Requirement: [REQ-CORE-01] Core Architecture and Layout
The platform SHALL use Astro 7.x Static Site Generation (SSG) with Tailwind CSS 4.x and a dark theme.

#### Scenario: Layout structure and navigation
- **WHEN** any page is rendered
- **THEN** it includes the responsive Navbar and Footer marked with `data-pagefind-ignore`, dynamic mobile menu, and WishlistIcon badge

### Requirement: [REQ-SEARCH-01] Pagefind Search Integration
The platform SHALL provide client-side full-text search via `astro-pagefind` with catalog fallback matching.

#### Scenario: Search interaction and performance
- **WHEN** a user types in the search input (min 2 characters, 300ms debounce)
- **THEN** an overlay appears showing Pagefind index results and rich catalog matches with keyboard navigation (ArrowUp/Down/Enter/Escape) and click-outside closure

### Requirement: [REQ-MERKLISTE-01] Merkliste (Wishlist) Store and Components
The platform SHALL provide client-side wishlist management via `src/lib/merklisteStore.ts` stored in `localStorage` (`sls_merkliste`).

#### Scenario: Wishlist CRUD and synchronization
- **WHEN** a user adds, removes, or updates product quantities
- **THEN** the store updates `localStorage`, expires after 24 hours of inactivity, updates badge counts across Navbar and StickyMerkliste, controls the WishlistDrawer modal, and prefills contact inquiries

### Requirement: [REQ-SEO-01] SEO and IndexNow Submission
The platform SHALL provide robust SEO (JSON-LD per page type, price formatting as "ab XX€") and URL submission via IndexNow.

#### Scenario: Search engine indexing and submission
- **WHEN** the site is built with `pnpm run build:full`
- **THEN** static HTML, sitemap, `rss.xml`, and `public/urllist.txt` are generated and can be submitted to IndexNow (`pnpm run indexnow-submit`)

#### Scenario: Build artifacts are regression-tested
- **WHEN** the Playwright suite runs against the built site
- **THEN** sitemap, `urllist.txt`, RSS and `marketplace.json` are parsed and checked for public URLs only and consistent product data

### Requirement: [REQ-SEO-02] RSS-Feed und LLM-Hilfsdateien
Der Build SHALL über `pnpm run build:full` zusätzlich zum statischen HTML einen RSS-Feed (`public/rss.xml` via `scripts/generate-rss.mjs`) sowie `public/llms.txt` und `public/llms-full.txt` erzeugen.

#### Scenario: RSS und llms nach Deploy-Build
- **WHEN** `pnpm run build:full` ausgeführt wird
- **THEN** existieren `public/rss.xml` (valides RSS-2.0-XML der neuesten Beiträge/Seiten) und die llms-Dateien im `public/`-Verzeichnis

### Requirement: [REQ-TEST-01] Automated Testing Suites
The platform SHALL maintain test coverage using Vitest and Playwright and SHALL run lint, unit and browser tests in CI before deployment.

#### Scenario: Unit and E2E test execution
- **WHEN** tests are executed (`vitest` and `playwright test`)
- **THEN** store logic, search functionality, structured data and wishlist interactions are verified successfully

#### Scenario: CI gate before deploy
- **WHEN** a pull request or push changes sources
- **THEN** lint, Vitest and Playwright tests pass before the GitHub Pages deploy job runs

#### Scenario: Review-Daten-Invarianten
- **WHEN** `src/data/google-reviews.test.ts` läuft
- **THEN** prüft es Aggregate (`reviewCount` ≥ Anzahl gespeicherter Reviews), ISO-8601-Zeitstempel (wo vorhanden, in nicht-steigender Reihenfolge) und eindeutige Review-Schlüssel (Autor + Text-Präfix)
