# Agent Instructions – Sound & Licht Stuttgart

## Project Overview
Astro 7.x SSG site for event tech rental (PA, partyboxes, lights) in Stuttgart area. Built with Tailwind CSS 4.x. Dark theme. Static deployment to GitHub Pages. Content via Collection (products, faqs, cities).

## Build Commands
- `pnpm run dev` — Dev server
- `pnpm run build` — Production build → dist/ (für tägliche Entwicklung)
- `pnpm run build:full` — Build + RSS + urllist (für Deploy)
  - **Timeout:** Build braucht ~19s → Agent muss min. 60s Timeout setzen
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
- **Katalog-Matching für `/vermietung/`:**
  - `rentalItems` aus `getCollection('products')` (21 Produkte) wird als JSON-Script eingebettet
  - `matchCatalogProducts(query)` matcht Suchbegriffe gegen Titel/Description/Features
  - Funde werden als reiche Produktkarten gerendert, Link auf `vermietung/#item-<slug>`
  - Nur 10 Produkte haben eigene `.astro`-Seiten → 11 werden via Katalog gematcht
- **Produktdaten**: `src/content/products/*.yml` (21 Dateien) via `getCollection('products')`
- **FAQ-Daten**: `src/data/faqs.json` (135 Einträge) via `getCollection('faqs')`
- **Städte**: `src/data/cities.json` (15 Städte) via `getCollection('cities')`
- **"Mehr Infos"-Button** auf `/vermietung/` erscheint nur bei Produkten mit echter Detailseite (kein `#` in `detailPage`)

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

## Warenkorb (Cart-System)

- **Clientseitiger Warenkorb** (`src/lib/cartStore.js`) via `localStorage` (Key: `sls_cart`)
  - Funktionen: `getCart()`, `addItem(slug)`, `removeItem(slug)`, `updateItemQuantity(slug, qty)`, `clearCart()`, `getItemCount()`
  - Automatische Leerung nach 24h Inaktivität
  - Produktdaten-Lookup via embedded JSON `#rental-catalog-data`
- **Komponenten:**
  - `CartIcon.astro` — Warenkorb-Icon mit Badge in `Navbar.astro` (desktop + mobile)
  - `CartDrawer.astro` — Seitenpanel mit ARIA (`role="dialog"`, `aria-modal`), Escape/Overlay-Close, Focus-Trap, scale-Animation
  - `CartButton.astro` — "Zum Warenkorb hinzufügen"-Button für Produktdetailseiten
  - `StickyCTA.astro` — Grünes Sticky-Panel mit "Warenkorb betrachten" (alle Seiten)
- **Icons**: Alle Cart-Icons via `Icon.astro` (`name="cart"`) – kein hardcodiertes SVG
- **Event-Interface:**
  - `toggle-cart` → Drawer öffnen/schließen
  - `cart-prefill` → Kontaktformular vorbereiten
- **Skript-Imports**: Statische ESM-Imports (`import { addItem } from '../lib/cartStore'`) in `<script>` – keine dynamischen `import()`-Aufrufe (zuverlässiger in preview/production)
- **Tests**: `tests/cart.spec.ts` (Playwright, 3 Tests):
  - Produkt von `/vermietung/` hinzufügen, Badge-Prüfung, Drawer, Form-Prefill
  - Produkt von Detailseite hinzufügen
  - Mehrere Produkte + Drawer-Inhalt + Formular
  - Server: `pnpm run preview` auf Port 4321 (oder Dev-Server)

## Referenzen
- [docs/DESIGN.md](docs/DESIGN.md) — Projektstruktur, Farbsystem, Komponenten, Animationen
- [docs/theme-system.md](docs/theme-system.md) — vollständige Token-Tabellen aller Themes
- [docs/citypage.md](docs/citypage.md) — Anleitung für neue City-Seiten
