# Agent Instructions – Sound & Licht Stuttgart

## Project Overview
Astro 7.x SSG site for event tech rental (PA, partyboxes, lights) in Stuttgart area. Built with Tailwind CSS 4.x. Dark theme. Static deployment to GitHub Pages. Content via Collection (products, faqs, cities).

## Build Commands
- `pnpm run dev` — Dev server
- `pnpm run build` — Production build → dist/ (für tägliche Entwicklung)
- `pnpm run build:full` — Build + RSS + urllist (für Deploy)
  - **Timeout:** Build braucht ~22s → Agent muss min. 60s Timeout setzen
- `pnpm run build:images` — WebP-Optimierung via Sharp (JPG/PNG in `public/img/`)
- `pnpm run build:full-with-images` — Images + Build + RSS + urllist
- `pnpm run preview` — Preview build

Build output: `dist/` (static HTML + sitemap), `public/rss.xml`, `public/urllist.txt`.

## Git Workflow
- Features auf eigenen Branches entwickeln
- Vor Commit: Build testen (`pnpm run build`)
- Keine Secrets (API-Keys, Passwörter) committen

## Suche (Pagefind)

- **Pagefind 1.5.2** via `astro-pagefind` — Indexierung beim Build (sieht "Pagefind indexed N pages")
- **props im `<Layout>`:**
  - `pagefindType="produkt"` → setzt `data-pagefind-weight="2"` + `type:produkt` in meta
  - `pagefindMeta={{ price: "ab 80€", image: "/img/...", category: "Sound", label: "..." }}`
- **`pagefindMeta` wird als separate `<div>` pro Key-Value gerendert** — NICHT kombinierter `;`-String (Pagefind 1.5.2 parst `;` nicht korrekt!)
- **`data-pagefind-ignore`** auf Navbar.astro + Footer.astro
- **URL-Normalisierung**: `normalizeUrl()` strippt trailing slashes im JS (`trailingSlash: 'never'`)
- **Client-Script**: `src/scripts/search.ts` wird in `Layout.astro` via `<script>` importiert
  - **Debounce**: 300ms nach Eingabe (mind. 2 Zeichen)
  - **Keyboard**: ArrowUp/Down/Enter/Escape für Navigation im Overlay
  - **Overlay-Close**: Klick außerhalb via `onDocumentClick`
   - **Pagefind**: Dynamisches `<script>`-Element für `/pagefind/pagefind.js` bei erster Suche (da pagefind erst nach dem Build generiert wird, kann Vite den Import nicht auflösen)
- **Katalog-Matching für `/vermietung/`:**
  - `rentalItems` aus `getCollection('products')` (21 Produkte) wird als JSON-Script eingebettet
  - `matchCatalogProducts(query)` matcht Suchbegriffe gegen Titel/Description/Features
  - Funde werden als reiche Produktkarten gerendert, Link auf `vermietung/#item-<slug>`
  - Nur 10 Produkte haben eigene `.astro`-Seiten → 11 werden via Katalog gematcht
- **Produktdaten**: `src/content/products/*.yml` (21 Dateien) via `getCollection('products')`
- **FAQ-Daten**: `src/data/faqs.json` (135 Einträge) via `getCollection('faqs')`
- **Städte**: `src/data/cities.json` (15 Städte) via `getCollection('cities')`
- **"Mehr Infos"-Button** auf `/vermietung/` erscheint nur bei Produkten mit echter Detailseite (kein `#` in `detailPage`)
- **Tests**: `tests/search.spec.ts` (Playwright, 4 Tests):
  - Input sichtbar, korrekter Placeholder
  - Volltext-Suche mit Pagefind (query `"PA"` → Ergebnisse)
  - Schließen bei Klick außerhalb
  - Kurze Query (1 Zeichen) zeigt kein Overlay

## SEO-Richtlinien

- **JSON-LD pro Seitentyp:**
  - Landing (`/`): `Service` (general), `OfferCatalog` (4 Pakete, `ab`-Preise), `FAQPage` (manuell via `faqJsonLd`)
  - Vermietung (`/vermietung/`): `Service`, `FAQPage` (manuell via `faqSchema`)
  - City-Seite (`/<stadt>/`): `Service` mit `areaServed: { City: "<Stadt>" }` + `provider: LocalBusiness`
  - Produktseite (`/vermietung/<produkt>/`): `Service`, `Product`, `FAQPage` (via `getFaqsForPage('<produkt-slug>')`)
- **Preise**: immer `"ab XX€"` als Text, nie fester Betrag in `price`
- **FAQ-Helper**: `getFaqsForPage(pageId)` aus `lib/faqUtils` — filtert FAQs per `pages[]`-Array. `faqUtils` hat keinen `getFaqSchema()`, FAQPage-JSON-LD wird manuell in jeder Seite gebaut.
- **Slug-Convention**: City = `<stadt>.astro`, Produkt = `vermietung/<produkt-slug>.astro`
- **Title-Pattern**: `"<Keyword> mieten in <Stadt> | Sound & Licht Stuttgart"`

## IndexNow (URL-Submission)

- `pnpm run indexnow-submit` — sendet alle URLs aus `public/urllist.txt` an `api.indexnow.org`
- Das Relay verteilt automatisch an Bing, Yandex, Naver, Seznam, Yep
- Vorher immer `pnpm run build:full` ausführen (aktualisiert `urllist.txt`)
- **Google wird nicht unterstützt** — dafür Google Search Console nutzen

## Merkliste (Wunschliste für Anfragen)

- **Clientseitige Merkliste** (`src/lib/merklisteStore.ts`) via `localStorage` (Key: `sls_merkliste`)
  - Funktionen: `getCart()`, `addItem(slug)`, `removeItem(slug)`, `updateItemQuantity(slug, qty)`, `clearCart()`, `getItemCount()`
  - Automatische Leerung nach 24h Inaktivität
  - Produktdaten-Lookup via embedded JSON `#rental-catalog-data`
- **Komponenten:**
  - `WishlistIcon.astro` — Herz-Icon mit Badge in `Navbar.astro` (desktop + mobile)
  - `WishlistDrawer.astro` — Seitenpanel mit ARIA (`role="dialog"`, `aria-modal`), Escape/Overlay-Close, Focus-Trap, scale-Animation
  - `WishlistButton.astro` — "Merken"-Button für Produktdetailseiten
  - `StickyMerkliste.astro` — Sticky-Panel mit "Merkliste betrachten" (alle Seiten)
- **Icons**: Herz-Icon via `Icon.astro` (`name="heart"`) – kein hardcodiertes SVG
- **Event-Interface:**
  - `toggle-merkliste` → Drawer öffnen/schließen
  - `merkliste-prefill` → Kontaktformular vorbereiten
- **Data-Actions:**
  - `add-to-wishlist` → Produkt auf Merkliste
  - `toggle-wishlist` → Drawer umschalten
  - `request-now` → Sprung zum Formular
- **Scope-Guard**: `PackageCardGrid.astro` hat `data-package-grid` für `target.closest()` – verhindert Double-Add mit `vermietung.astro`-Handler
- **Skript-Imports**: Statische ESM-Imports (`import { addItem } from '../lib/merklisteStore'`) in `<script>` – keine dynamischen `import()`-Aufrufe (zuverlässiger in preview/production)
- **Tests**: `tests/merkliste.spec.ts` (Playwright, 3 Tests) + `src/lib/merklisteStore.test.ts` (Vitest, 16 Tests):
  - Playwright: Produkt von `/vermietung/` + Detailseite + mehrere Produkte hinzufügen
  - Vitest: Unit-Tests für alle Store-Funktionen (CRUD, Validierung, Ablauf 24h)
  - Server: `pnpm run preview` auf Port 4321 (oder Dev-Server)

## Referenzen
- [docs/DESIGN.md](docs/DESIGN.md) — Projektstruktur, Farbsystem, Komponenten, Animationen
- [docs/theme-system.md](docs/theme-system.md) — vollständige Token-Tabellen aller Themes
- [docs/citypage.md](docs/citypage.md) — Anleitung für neue City-Seiten
