# Sound & Licht Stuttgart

Website für Veranstaltungstechnik-Vermietung im Großraum Stuttgart (PA-Anlagen, Partyboxen, Lichttechnik).

## Tech-Stack

- **Framework:** Astro 6.x
- **Styling:** Tailwind CSS 4.x
- **Search:** Pagefind 1.5.x (via astro-pagefind) – clientseitige Volltextsuche
- **Build:** Static Site Generation (SSG)
- **Deployment:** GitHub Pages

## Getting Started

```bash
pnpm install
pnpm run dev      # Dev server
pnpm run build    # Production build → dist/
pnpm run build:full # Build + RSS + urllist (für Deploy)
pnpm run preview  # Preview build
```

## Theme System

The site supports multiple color themes switchable via URL parameter (`?theme=<name>`) or by changing the CSS import in `src/styles/global.css`. See [docs/DESIGN.md](docs/DESIGN.md) for details (Token-Tabellen in [docs/theme-system.md](docs/theme-system.md)).

## Neue City-Seite hinzufügen

Siehe [docs/citypage.md](docs/citypage.md) für die vollständige Anleitung.

Weitere Details zu Projektstruktur, Komponenten und Architektur in [docs/DESIGN.md](docs/DESIGN.md).

## Build-Outputs

- `dist/` – statische HTML-Seiten
- `public/rss.xml` – RSS-Feed (wird bei `pnpm run build` generiert)
- `public/urllist.txt` – URL-Liste für Suchmaschinen (wird bei `pnpm run build` generiert)

## Domain

https://soundundlicht-stuttgart.de
