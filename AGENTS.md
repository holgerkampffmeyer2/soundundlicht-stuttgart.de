# Agent Instructions – Sound & Licht Stuttgart

## Project Overview
Astro 6.x SSG site for event tech rental (PA, partyboxes, lights) in Stuttgart area. Built with Tailwind CSS 4.x. Dark theme. Static deployment to GitHub Pages.

## Build Commands
- `pnpm run dev` — Dev server
- `pnpm run build` — Production build → dist/ (für tägliche Entwicklung)
- `pnpm run build:full` — Build + RSS + urllist (für Deploy)
- `pnpm run preview` — Preview build

Build output: `dist/` (static HTML + sitemap), `public/rss.xml`, `public/urllist.txt`.

## Git Workflow
- Features auf eigenen Branches entwickeln
- Vor Commit: Build testen (`pnpm run build`)
- Keine Secrets (API-Keys, Passwörter) committen

## SEO Notes
- Single-page for landing (no sub-pages)
- City pages are separate .astro files in `src/pages/` (no dynamic routing)
- Only "ab"-prices shown (no concrete prices)
- Contact via email only (no form)
- Pickup in Leinfelden-Echterdingen (no delivery)

## Referenzen
- [docs/DESIGN.md](docs/DESIGN.md) — Projektstruktur, Farbsystem, Komponenten, Animationen
- [docs/theme-system.md](docs/theme-system.md) — vollständige Token-Tabellen aller Themes
- [docs/citypage.md](docs/citypage.md) — Anleitung für neue City-Seiten
