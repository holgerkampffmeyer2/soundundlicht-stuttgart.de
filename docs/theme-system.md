# Theme System

## Architektur

CSS-Variablen-basiert. Das Default-Theme (`deep-bass`) ist als `@theme {}`-Block in `src/styles/themes/deep-bass.css` definiert und in `global.css` importiert. Die übrigen Themes sind reine Variablen-Overrides in `src/styles/theme-vars.css` (`html[data-theme="<name>"]`). Components in `global.css` nutzen `var(--color-*)` und bleiben unverändert.

```
src/styles/
├── themes/
│   └── deep-bass.css       ← @theme: Navy/Blau (Default, in global.css importiert)
├── theme-vars.css          ← html[data-theme="…"]-Overrides: electric-night, deep-bass, golden-hour, arctic-frost
├── fonts.css               ← @font-face: Josefin Sans + Inter (self-hosted, variable woff2)
└── global.css              ← @import "tailwindcss" + @import "./themes/deep-bass.css" + ALLE Component-Styles
```

## Theme-Wechsel

### 1. Default (CSS-Level)

Das Default-Theme (`deep-bass`) ist in `src/styles/global.css` Zeile 2 importiert:

```css
@import "./themes/deep-bass.css";  /* ← aktiv (Default) */
```

Für einen dauerhaften Wechsel `data-theme="<name>"` fest auf `<html>` setzen (die Variablen stammen aus `theme-vars.css`).

### 2. Temporär (URL-Parameter)

Jede Seite unterstützt `?theme=<name>` für Client-seitigen Wechsel ohne Neu-Build:

- `?theme=electric-night` – Purple/Pink
- `?theme=deep-bass` – Navy/Blau
- `?theme=golden-hour` – Amber/Gold
- `?theme=arctic-frost` – Hellblau/Lavendel

Implementiert in `Layout.astro` via:
- Early inline `<script>` liest `?theme=` aus URL, setzt `data-theme` auf `<html>`
- Die Alt-Theme-Vars liegen in `src/styles/theme-vars.css` unter `html[data-theme="<name>"] {}` (in `Layout.astro` importiert)
- Läuft vor dem ersten Paint → kein FOUC

## Alle Themes im Überblick

### deep-bass (Default – Navy/Blau)
| Token | Wert |
|-------|------|
| `--color-bg` | `#050510` |
| `--color-surface` | `#0a1628` |
| `--color-primary` | `#2563eb` |
| `--color-secondary` | `#1e40af` |
| `--color-accent` | `#22c55e` |

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

- **Schriftarten (alle Themes)**: Josefin Sans (Headings) + Inter (Body), beide self-hosted als variable woff2
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
1. `html[data-theme="<name>"] { --color-…: …; }`-Block in `src/styles/theme-vars.css` ergänzen
2. In `Layout.astro` den Theme-Namen in die URL-Regex des Inline-Scripts aufnehmen
3. Für temporären Wechsel: fertig (URL-Parameter)
4. Für dauerhaften Wechsel: `data-theme="<name>"` fest auf `<html>` setzen
