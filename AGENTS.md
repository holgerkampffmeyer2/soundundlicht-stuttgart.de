# Agent Instructions – Sound & Licht Stuttgart

## Project Overview
Astro 6.x SSG site for event tech rental (PA, partyboxes, lights) in Stuttgart area. Built with Tailwind CSS 4.x. Dark theme. Static deployment to GitHub Pages.

## Build Commands
- `pnpm run dev` — Dev server
- `pnpm run build` — Production build → dist/ (für tägliche Entwicklung)
- `pnpm run build:full` — Build + RSS + urllist (für Deploy)
  - **Timeout:** Build braucht ~35–40s → Agent muss min. 180s Timeout setzen
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
  - `rentalItems` aus `rental-catalog.ts` (21 Produkte) wird als JSON-Script eingebettet
  - `matchCatalogProducts(query)` matcht Suchbegriffe gegen Titel/Description/Features
  - Funde werden als reiche Produktkarten gerendert, Link auf `vermietung/#item-<slug>`
  - Nur 10 Produkte haben eigene `.astro`-Seiten → 11 werden via Katalog gematcht
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

## Referenzen
- [docs/DESIGN.md](docs/DESIGN.md) — Projektstruktur, Farbsystem, Komponenten, Animationen
- [docs/theme-system.md](docs/theme-system.md) — vollständige Token-Tabellen aller Themes
- [docs/citypage.md](docs/citypage.md) — Anleitung für neue City-Seiten
