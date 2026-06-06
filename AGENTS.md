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

## Referenzen
- [docs/DESIGN.md](docs/DESIGN.md) — Projektstruktur, Farbsystem, Komponenten, Animationen
- [docs/theme-system.md](docs/theme-system.md) — vollständige Token-Tabellen aller Themes
- [docs/citypage.md](docs/citypage.md) — Anleitung für neue City-Seiten
