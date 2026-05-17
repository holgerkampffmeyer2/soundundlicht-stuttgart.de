# Sound & Licht Stuttgart – Konzept, Struktur & Design

## Technologie-Stack

- **Framework:** Astro 6.x (Static Site Generation, `output: 'static'`)
- **Styling:** Tailwind CSS 4.x + CSS Custom Properties (Theme-System)
- **Build-Tool:** Vite (via @tailwindcss/vite Plugin)
- **Sprache:** TypeScript / Astro Components
- **Deployment:** GitHub Pages
- **Site-URL:** `https://soundundlicht-stuttgart.de`

---

## Projektstruktur

```
src/
├── components/           # UI-Komponenten
│   └── vermietung/       # Vermietung-spezifische Komponenten
├── layouts/
│   └── Layout.astro
├── pages/                # Routen
│   ├── index.astro       # Landing Page
│   ├── vermietung.astro  # Vermietung Landing
│   └── <stadt>.astro     # City Pages (15 Städte)
├── styles/
│   ├── global.css
│   └── themes/*.css      # 5 Farb-Themes
├── scripts/              # Build-Skripte
│   ├── generate-rss.mjs
│   └── update-sitemap.mjs
└── data/                 # SEO-Daten
public/
├── img/
│   ├── cities/           # City Hero-Bilder (slug.webp + -thumb.webp)
│   └── header.webp
└── rss.xml
```

---

## Seitenübersicht

| Pfad | Typ |
|------|-----|
| `/` | Landing Page |
| `/vermietung/` | Vermietung Landing |
| `/stuttgart/` ... `/ostfildern/` | 15 City Pages |

---

## Farbsystem

### Default (deep-bass – Navy/Blau)

| Token | Wert | Rolle |
|---|---|---|
| `--color-bg` | `#050510` | Hintergrund |
| `--color-surface` | `#0a1628` | Karten, Sektionen |
| `--color-primary` | `#2563eb` | Primäre Akzente |
| `--color-secondary` | `#1e40af` | Sekundäre Akzente |
| `--color-accent` | `#60a5fa` | Buttons, Links |

### Alt-Themes

| Theme | Stimmung |
|---|---|
| `default` | Cyan/Orange (#0891b2 / #f97316) |
| `electric-night` | Purple/Pink (#a855f7 / #ec4899) |
| `golden-hour` | Amber/Gold (#f59e0b / #fb923c) |
| `arctic-frost` | Hellblau/Lavendel (#60a5fa / #a78bfa) |

Vollständige Token-Tabellen: [docs/theme-system.md](theme-system.md)

---

## Theme-Wechsel

- **Permanent**: `@import` in `global.css` ändern
- **Temporär**: `?theme=<name>` URL-Parameter
- Implementiert in `Layout.astro`: early Script setzt `data-theme`, Fallback-`<style>` definiert Alt-Vars, kein FOUC

### Wartung

Neues Theme: `src/styles/themes/<name>.css` → in Layout.astro Script + Style ergänzen.

### Farbverarbeitung

Statt hartcodierter `rgba()`-Werte wird durchgängig `color-mix()` verwendet:
```css
box-shadow: 0 0 30px color-mix(in srgb, var(--color-primary) 30%, transparent);
```

---

## Animation-Klassen

- `.animate-on-scroll` – Fade-In bei Scroll (IntersectionObserver)
- `.gradient-text` – Text-Gradient (primary→accent)
- `.neon-pulse` – Pulsierender Neon-Glow (Buttons)
- `.neon-pulse-cyan` – Pulsierender cyaner Neon-Glow
- `.soundwave-container` / `.soundwave-bar` – Equalizer-Animation
- `.beat-pulse` – Rhythmischer Puls
- `.moving-gradient` – Animierter Hintergrund
- `prefers-reduced-motion` in global.css unterstützt

---

## Bildkonventionen

- **Format**: WebP primär, JPG-Fallback via `<picture>`-Element
- **City Hero**: `public/img/cities/<slug>.webp` (1920px, quality 85)
- **City Thumb**: `public/img/cities/<slug>-thumb.webp` (600px, quality 75)
- **Galerie**: `public/img/vermietung/<name>.webp` + Fallback `.jpg`
- **Batch-Konvertierung**: `node scripts/create-webp.mjs` (1920px, q80, parallel)
- **Optimierung**: `node scripts/optimize-images.mjs` (CLI: `-w`, `-q`, `--concurrency`, `-d`)
- **Attribution**: CC-Lizenzen im HTML-Kommentar vermerken

---

## Barrierefreiheit

- `prefers-reduced-motion` bei allen Animationen
- Bilder mit alt-Text
- Farben nicht als einziges Mittel zur Informationsvermittlung

---

## Build-Skripte

```bash
pnpm run dev          # Dev server
pnpm run build        # Production build → dist/ (inkl. Sitemap)
pnpm run build:full   # Build + RSS + urllist (für Deploy)
pnpm run preview      # Preview
pnpm run generate-rss # Nur RSS-Feed generieren
```

---

## SEO

- JSON-LD: LocalBusiness, Service, FAQPage, OfferCatalog
- City-Seiten: Service mit city-spezifischem `areaServed`
- Sitemap: 25 URLs via `@astrojs/sitemap`
- RSS Feed: `public/rss.xml` (wird bei build generiert)
- urllist.txt für Suchmaschinen
