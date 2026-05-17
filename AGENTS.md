# Agent Instructions – Sound & Licht Stuttgart

## Project Overview
Astro 6.x SSG site for event tech rental (PA, partyboxes, lights) in Stuttgart area. Built with Tailwind CSS 4.x. Dark theme. Static deployment to GitHub Pages.

## Current Page Structure

```
src/pages/
├── index.astro                       # Landing page (hero slider, services, packages, gallery, steps, city grid, FAQ, testimonials, contact)
├── stuttgart.astro                   # City page: PA-Anlage & Partybox mieten in Stuttgart
├── esslingen.astro                   # City page: Partybox & PA-Anlage mieten in Esslingen
├── tübingen.astro                    # City page: Veranstaltungstechnik mieten in Tübingen
├── filderstadt.astro                 # City page: Partytechnik mieten in Filderstadt
└── leinfelden-echterdingen.astro     # City page: Veranstaltungstechnik mieten in Leinfelden-Echterdingen
```

## Build Commands

```bash
pnpm run dev             # Dev server
pnpm run build           # Production build → dist/
pnpm run build:full      # Build + RSS + urllist (für Deploy)
pnpm run preview         # Preview build
pnpm run generate-rss    # Nur RSS-Feed generieren
pnpm run generate-urllist # Nur urllist.txt generieren
```

Build-Prozess (build:full): `generate-rss.mjs` → `astro build` → `update-sitemap.mjs` (urllist.txt).  
`dist/` is gitignored. Build output: static HTML in `dist/`, sitemap at `dist/sitemap-index.xml`, RSS at `public/rss.xml`, URL-Liste at `public/urllist.txt` + `dist/urllist.txt`.
Für tägliche Entwicklung reicht `pnpm run build` (ohne RSS/urllist).

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

Siehe `docs/DESIGN.md` für Farbsystem, Animationen, Bildkonventionen und Theme-System.
