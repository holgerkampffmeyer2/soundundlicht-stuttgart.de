# Design & Theme System

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
Alle verfügbaren Themes via `?theme=<name>`:
- `default` – Cyan/Orange (#0891b2 / #f97316)
- `electric-night` – Purple/Pink (#a855f7 / #ec4899)
- `golden-hour` – Amber/Gold (#f59e0b / #fb923c)
- `arctic-frost` – Hellblau/Lavendel (#60a5fa / #a78bfa)

Siehe [docs/theme-system.md](theme-system.md) für vollständige Token-Tabellen aller Themes.

## Animation-Klassen
- `.animate-on-scroll` – Fade-In bei Scroll (IntersectionObserver)
- `.gradient-text` – Text-Gradient (primary→accent)
- `.neon-pulse` – Pulsierender Neon-Glow (Buttons)
- `.neon-pulse-cyan` – Pulsierender cyaner Neon-Glow
- `.soundwave-container` / `.soundwave-bar` – Equalizer-Animation
- `.beat-pulse` – Rhythmischer Puls
- `.moving-gradient` – Animierter Hintergrund
- `prefers-reduced-motion` in global.css unterstützt

## Bildkonventionen
- **Format**: WebP primär, JPG-Fallback via `<picture>`-Element
- **City Hero**: `public/img/cities/<slug>.webp` (1920px, quality 85)
- **City Thumb**: `public/img/cities/<slug>-thumb.webp` (600px, quality 75)
- **Galerie**: `public/img/vermietung/<name>.webp` + Fallback `.jpg`
- **Batch-Konvertierung**: `node scripts/create-webp.mjs` (1920px, q80, parallel)
- **Optimierung**: `node scripts/optimize-images.mjs` (CLI: `-w`, `-q`, `--concurrency`, `-d`)
- **Attribution**: CC-Lizenzen im HTML-Kommentar vermerken

## Barrierefreiheit
- `prefers-reduced-motion` bei allen Animationen
- Bilder mit alt-Text
- Farben nicht als einziges Mittel zur Informationsvermittlung

## Theme-Wechsel
- **Permanent**: `@import` in `global.css` ändern
- **Temporär**: `?theme=<name>` URL-Parameter
- Implementiert in `Layout.astro`: early Script setzt `data-theme`, Fallback-`<style>` definiert Alt-Vars, kein FOUC

## Wartung
Neues Theme: `src/styles/themes/<name>.css` → in Layout.astro Script + Style ergänzen.
