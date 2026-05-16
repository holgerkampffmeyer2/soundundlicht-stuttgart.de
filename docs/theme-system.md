# Theme System

## Architektur

CSS-Variablen-basiert via `@theme {}`-Blöcke. Alle Token sind identisch benannt, nur Werte unterscheiden sich pro Theme. Components in `global.css` nutzen `var(--color-*)` und bleiben unverändert.

```
src/styles/
├── themes/
│   ├── deep-bass.css       ← @theme: Navy/Blau + Josefin Sans (Default)
│   ├── default.css         ← @theme: Cyan/Orange + Josefin Sans (altes Default)
│   ├── electric-night.css  ← @theme: Purple/Pink/Neon + Josefin Sans
│   ├── golden-hour.css     ← @theme: Amber/Gold + Josefin Sans
│   └── arctic-frost.css    ← @theme: Hellblau/Lavendel + Josefin Sans
├── fonts.css               ← @font-face: Josefin Sans (self-hosted, variable woff2)
└── global.css              ← @import "tailwindcss" + @import "./themes/<name>.css" + ALLE Component-Styles
```

## Theme-Wechsel

### 1. Permanent (CSS-Level)

In `src/styles/global.css` Zeile 2 ändern:

```css
@import "./themes/deep-bass.css";  /* ← aktiv (Default) */
/* @import "./themes/default.css"; */
/* @import "./themes/electric-night.css"; */
/* @import "./themes/golden-hour.css"; */
/* @import "./themes/arctic-frost.css"; */
```

### 2. Temporär (URL-Parameter)

Jede Seite unterstützt `?theme=<name>` für Client-seitigen Wechsel ohne Neu-Build:

- `?theme=electric-night` – Purple/Pink
- `?theme=deep-bass` – Navy/Blau
- `?theme=golden-hour` – Amber/Gold
- `?theme=arctic-frost` – Hellblau/Lavendel

Implementiert in `Layout.astro` via:
- Early inline `<script>` liest `?theme=` aus URL, setzt `data-theme` auf `<html>`
- Inline `<style>` definiert alle 4 Alt-Theme-Vars unter `html[data-theme="<name>"] {}`
- Läuft vor dem ersten Paint → kein FOUC

## Alle Themes im Überblick

### deep-bass (Default – Navy/Blau)
| Token | Wert |
|-------|------|
| `--color-bg` | `#050510` |
| `--color-surface` | `#0a1628` |
| `--color-primary` | `#2563eb` |
| `--color-secondary` | `#1e40af` |
| `--color-accent` | `#60a5fa` |

### default (Cyan/Orange, CSS-Import-wechselbar)
| Token | Wert |
|-------|------|
| `--color-bg` | `#0a0a0f` |
| `--color-primary` | `#0891b2` |
| `--color-secondary` | `#f97316` |
| `--color-accent` | `#22d3ee` |

### electric-night (Purple/Pink)
| Token | Wert |
|-------|------|
| `--color-bg` | `#0a0a0f` |
| `--color-surface` | `#1c0a2e` |
| `--color-primary` | `#a855f7` |
| `--color-secondary` | `#ec4899` |
| `--color-accent` | `#22d3ee` |

### golden-hour (Amber/Gold)
| Token | Wert |
|-------|------|
| `--color-bg` | `#0a0a0f` |
| `--color-surface` | `#1a1410` |
| `--color-primary` | `#f59e0b` |
| `--color-secondary` | `#fb923c` |
| `--color-accent` | `#eab308` |

### arctic-frost (Hellblau/Lavendel)
| Token | Wert |
|-------|------|
| `--color-bg` | `#080b12` |
| `--color-surface` | `#0f172a` |
| `--color-primary` | `#60a5fa` |
| `--color-secondary` | `#a78bfa` |
| `--color-accent` | `#67e8f9` |

## Fonts

- **Eine Schriftart für alle Themes**: Josefin Sans (self-hosted, variable woff2)
- Geladen via `src/styles/fonts.css` → `Layout.astro` importiert sie
- Kein Google Fonts-Netzwerkrequest → schneller, DSGVO-konform, offline-fähig

## Farben in Components

Hardcodierte Farben (orange/cyan) wurden durch `color-mix(in srgb, var(--color-*))` ersetzt:

| Klasse | Nutzung |
|--------|---------|
| `.icon-circle` + `.icon-circle-secondary/primary/accent` | Icon-Container |
| `.faq-icon` / `.faq-details[open] .faq-icon` | FAQ-Toggle-Icons |
| `.star-active` | Aktive Sterne in Reviews |
| `.hero-overlay-accent` | Gradient-Overlay auf Hero-Sektionen |
| `.review-card-hover` | Hover-Schatten auf Review-Karten |

## Keine Änderungen an

- Components (Navbar, CityHero, Footer, etc.)
- HTML-Struktur, JSON-LD, Scripts
- Build-Prozess (`pnpm run build`)
- Tailwind-Klassen

## Wartung

Neues Theme hinzufügen:
1. `src/styles/themes/<name>.css` erstellen mit `@theme {}`-Block
2. In `Layout.astro`:
   - Theme in URL-Regex des Scripts ergänzen
   - `html[data-theme="<name>"] {}`-Block im `<style>` ergänzen
3. Für temporären Wechsel: fertig (URL-Parameter)
4. Für permanenten Wechsel: `@import` in `global.css` ändern
