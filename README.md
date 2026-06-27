# Sound & Licht Stuttgart

Website für Veranstaltungstechnik-Vermietung im Großraum Stuttgart (PA-Anlagen, Partyboxen, Lichttechnik).

## Tech-Stack

- **Framework:** Astro 7.x
- **Content:** Content Collections (Products YAML, FAQs JSON, Cities JSON) mit Zod-Validierung
- **Styling:** Tailwind CSS 4.x
- **Search:** Pagefind 1.5.x (via astro-pagefind) – clientseitige Volltextsuche
- **Build:** Static Site Generation (SSG)
- **Deployment:** GitHub Pages

## Getting Started

```bash
pnpm install
pnpm run dev                # Dev server
pnpm run build              # Production build → dist/
pnpm run build:images       # WebP-Optimierung via Sharp (JPG/PNG)
pnpm run build:full         # Build + RSS + urllist (für Deploy)
pnpm run build:full-with-images # Images + Build + RSS + urllist
pnpm run preview            # Preview build
```

## Theme System

The site supports multiple color themes switchable via URL parameter (`?theme=<name>`) or by changing the CSS import in `src/styles/global.css`. See [docs/DESIGN.md](docs/DESIGN.md) for details (Token-Tabellen in [docs/theme-system.md](docs/theme-system.md)).

## Neue City-Seite hinzufügen

Siehe [docs/citypage.md](docs/citypage.md) für die vollständige Anleitung.

Weitere Details zu Projektstruktur, Komponenten und Architektur in [docs/DESIGN.md](docs/DESIGN.md).

## IndexNow

Nach einem Deploy die aktualisierten URLs an alle IndexNow-Suchmaschinen melden:

```bash
pnpm run build:full     # urllist.txt aktualisieren
pnpm run indexnow-submit  # an Bing, Yandex, Naver, Seznam, Yep senden
```

## Build-Outputs

- `dist/` – statische HTML-Seiten
- `public/rss.xml` – RSS-Feed (wird bei `pnpm run build:full` generiert)
- `public/urllist.txt` – URL-Liste für Suchmaschinen (wird bei `pnpm run build:full` generiert)

## Domain

https://soundundlicht-stuttgart.de
