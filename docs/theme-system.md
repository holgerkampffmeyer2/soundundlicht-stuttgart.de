# Theme System – Drop-In Replacement

## Architektur

CSS-Variablen-basiert: Zwei Theme-Dateien definieren nur `@theme {}`-Blöcke mit denselben Token-Namen, aber unterschiedlichen Werten + Fonts. Alle Komponenten (`global.css`) bleiben unverändert.

```
src/styles/
├── themes/
│   ├── default.css      ← @theme: Cyan/Orange + Josefin Sans (aktuell)
│   └── alt.css          ← @theme: Purple/Pink/Neon + Poppins/Open Sans
├── fonts.css            ← @font-face (Josefin Sans + Poppins + Open Sans)
├── global.css           ← @import "tailwindcss" + ALLE Component-Styles (button, card, hero, etc.)
└── theme-loader.css     ← zentraler Import: themes/X.css → fonts.css → global.css
```

## Theme-Wechsel

`theme-loader.css` – eine Zeile ändern:

```css
@import "./themes/alt.css";       /* ← aktiv: Electric Night */
/* @import "./themes/default.css"; */  /* ← alternativ: Cyan/Orange */
```

## Theme A (Default – aktuell)

| Token | Wert | Rolle |
|-------|------|-------|
| `--color-bg` | `#0a0a0f` | Hintergrund |
| `--color-surface` | `#12121a` | Karten/Sektionen |
| `--color-surface-hover` | `#1a1a25` | Karten-Hover |
| `--color-primary` | `#0891b2` | Primär (cyan) |
| `--color-primary-hover` | `#22d3ee` | Primär-Hover |
| `--color-secondary` | `#f97316` | Sekundär/CTA (orange) |
| `--color-secondary-hover` | `#fb923c` | Sekundär-Hover |
| `--color-accent` | `#22d3ee` | Akzent (cyan) |
| `--color-text` | `#f8fafc` | Text |
| `--color-text-muted` | `#94a3b8` | Muted-Text |
| `--color-border` | `#1e1e2e` | Rahmen |
| `--font-heading` | `'Josefin Sans Variable', 'Josefin Sans', sans-serif` | Überschriften |
| `--font-body` | `'Josefin Sans Variable', 'Josefin Sans', sans-serif` | Fließtext |

## Theme B ("Electric Night" – Neu)

Inspiriert von Club-Atmosphäre, Neonlicht, Bühnen-Party-Vibe.

| Token | Wert | Rolle |
|-------|------|-------|
| `--color-bg` | `#0a0a0f` | Hintergrund (unverändert) |
| `--color-surface` | `#1c0a2e` | Karten/Sektionen (deep purple) |
| `--color-surface-hover` | `#2d1b4e` | Karten-Hover |
| `--color-primary` | `#a855f7` | Primär (purple-500) |
| `--color-primary-hover` | `#c084fc` | Primär-Hover (purple-400) |
| `--color-secondary` | `#ec4899` | Sekundär/CTA (pink-500) |
| `--color-secondary-hover` | `#f472b6` | Sekundär-Hover (pink-400) |
| `--color-accent` | `#22d3ee` | Akzent (cyan bleibt als Kontrast) |
| `--color-text` | `#f8fafc` | Text (unverändert) |
| `--color-text-muted` | `#a1a1aa` | Muted-Text (zinc-400) |
| `--color-border` | `#3b0764` | Rahmen (purple-950) |
| `--font-heading` | `'Poppins', sans-serif` | Überschriften |
| `--font-body` | `'Open Sans', sans-serif` | Fließtext |

## Umsetzung

1. `src/styles/themes/default.css` – @theme-Block aus global.css extrahiert + font-Vars
2. `src/styles/themes/alt.css` – neues "Electric Night" @theme
3. `src/styles/theme-loader.css` – zentrale CSS-Import-Kette
4. `src/styles/global.css` – @theme entfernt, body/font-play auf CSS-Variablen umgestellt
5. `src/styles/fonts.css` – @font-face für Poppins + Open Sans ergänzt
6. `src/layouts/Layout.astro` – import auf theme-loader.css

## Keine Änderungen an

- Components (Navbar, HeroSlider, CityGrid, Footer, etc.)
- Tailwind-Klassen in .astro-Files (`bg-[var(--color-primary)]` → `bg-primary` etc.)
- HTML-Struktur, JSON-LD, Scripts
- Build-Prozess

## Fallstricke

- `@font-face` muss VOR `@import "tailwindcss"` kommen (Tailwind v4 Bug)
- `@theme {}` muss NACH `@import "tailwindcss"` kommen (CSS-Reihenfolge)
- Google Fonts @import wird per `@import url(...)` vor `@import "tailwindcss"` gelöst
