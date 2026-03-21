# DESIGN.md - Sound & Licht Stuttgart

## Projektübersicht

**Website:** https://soundundlicht-stuttgart.de  
**Zweck:** Online-Präsenz für DJ- und Veranstaltungstechnik-Vermietung im Großraum Stuttgart  
**Inhaber:** Holger Kampffmeyer

---

## Design

### Farbpalette
| Variable | Wert | Verwendung |
|----------|------|------------|
| `--color-bg` | `#0a0a0f` | Hintergrund |
| `--color-surface` | `#121218` | Karten/Oberflächen |
| `--color-text` | `#e5e5e5` | Primärtext |
| `--color-text-muted` | `#a3a3a3` | Sekundärtext |
| `--color-secondary` | `#f97316` (orange) | Akzent/CTA |
| `--color-accent` | `#22d3ee` (cyan) | Sekundärakzent |
| `--color-border` | `#262626` | Borders |

### Typografie
- **Headings:** `Play` (Google Fonts) - 700 weight
- **Body:** `Josefin Sans` (Google Fonts) - 300-600 weight
- **Sizes:** `text-5xl` bis `text-xl` (responsive)

### Visuelle Elemente
- Dark Mode Design
- Gradient-Overlays auf Bildern
- Animierte Scroll-Effekte (`animate-on-scroll`)
- Hero-Slider mit 2 Slides
- Hover-Effekte: `translateY(-3px)`, `box-shadow`
- Glassmorphismus bei Navbar

### Animationen & Effekte
| Effekt | Klasse | Beschreibung |
|--------|--------|--------------|
| Soundwave | `.soundwave-container` / `.soundwave-bar` | Animierter Equalizer im Hero |
| Neon-Pulse | `.neon-pulse` / `.neon-pulse-cyan` | Pulsierender Neon-Glow |
| Light-Ray | `.light-ray` | Lichtstrahl-Effekt bei Gallery-Hover |
| Beat-Pulse | `.beat-pulse` | Rhythmischer Puls-Effekt |
| Moving Gradient | `.moving-gradient` | Animierter Hintergrund-Gradient |

### Barrierefreiheit
- `prefers-reduced-motion` wird bei allen Animationen unterstützt

---

## Architektur

### Tech Stack
| Komponente | Technologie |
|------------|-------------|
| Framework | Astro 6.x |
| Styling | Tailwind CSS 4.x |
| Scripting | Vanilla TypeScript |
| Build | Vite |
| Bildoptimierung | Sharp (dev) |
| Hosting | GitHub Pages |

### Verzeichnisstruktur
```
/src
  /components
    Navbar.astro      # Navigation mit Mobile Menu
    Footer.astro      # Footer mit Kontakt/Social
    Testimonials.astro # Kundenbewertungen
    /icons            # SVG Icon-Komponenten
  /layouts
    Layout.astro      # Haupt-Layout mit SEO/Schema.org
  /pages
    index.astro       # Single-Page Website
  /styles
    global.css        # Custom CSS + CSS Variables
/public
  /img                # Bilder (vermietung, videos, icons)
/dist                 # Build-Output
```

---

## Struktur

### Sections (index.astro)
1. **Hero Slider** - 2 Slides mit Navigation, Dots, Auto-Slide (5s)
2. **Services** - Leistungsübersicht (4 Karten)
3. **Galerie** - Bild-Gallery mit Kategorie-Beschreibungen
4. **FAQ** - Häufig gestellte Fragen (als Accordion)
5. **Bewertungen** - Kundenbewertungen
6. **Kontakt** - Kontakt-Infos mit Google Maps Embed

### Komponenten
- **Navbar:** Fixed, `z-50`, backdrop-blur, Mobile Hamburger Menu
- **Footer:** Social Links, Adresse, Copyright
- **Testimonials:** Kundenbewertungen mit Rating
- **Icons:** VolumeUpIcon, LightBulbIcon, PackageIcon, CheckCircleIcon, MapPinIcon, EmailIcon

---

## Funktionen

### Slider (Hero)
- 2 Slides mit fade transition
- prev/next Buttons (`z-index: 20`)
- dots navigation
- auto-play alle 5s
- **Fix:** `pointer-events: none/z-index` für inaktive/aktive Slides

### Navigation
- Smooth scroll zu Sections (`#home`, `#services`, etc.)
- Active State Tracking
- Mobile Menu mit Toggle

### Google Maps
- Embed im Kontakt-Bereich
- Zeigt auf Google Business Profile (Holger Kampffmeyer DJ Dienstleistungen)
- Responsive: h-64 mobile, h-80 desktop

### SEO
- Meta Description, Keywords (erweitert mit lokalen Städten)
- Open Graph Tags
- Twitter Cards
- Schema.org LocalBusiness JSON-LD (mit areaServed, telephone, priceRange)
- Schema.org SiteNavigationElement als ItemList
- Canonical URL
- `noIndex` Prop für Seiten ohne Indexierung
- `jsonLd` Prop für seiten-spezifische Schema-Daten
- Lokale Keywords: Stuttgart, Leinfelden-Echterdingen, Esslingen, Tübingen, Kornwestheim

### Texte
- Du-Ansprache durchgehend
- Lokale Städte: Stuttgart, Leinfelden-Echterdingen, Esslingen, Tübingen, Kornwestheim
- USPs: Kostenlose Lieferung, persönliche Beratung, keine Kaution

---

## Deployment

- **GitHub Actions:** `.github/workflows/deploy.yml`
- **Branch:** `main`
- **URL:** soundundlicht-stuttgart.de (per CNAME)

---

## Code-Qualität

### Linting
```bash
npm run lint      # ESLint Prüfung (.astro, .ts, .js)
npm run lint:fix  # Automatische Korrekturen
```

### TypeScript
```bash
npm run astro check  # Astro TypeScript Check
```

### Dependencies
- ESLint 10.x mit Astro, TypeScript und Prettier Integration
- astro-eslint-parser für .astro Dateien
- @typescript-eslint für TypeScript Support

---

---

## Bildbearbeitung

### Verfügbare Scripts
| Script | Beschreibung |
|--------|--------------|
| `create-webp.mjs` | Erstellt WebP-Versionen aller JPG-Bilder (Qualität: 80%, max. 1920px) |
| `optimize-images.mjs` | Optimiert existierende Bilder für Web |

### Verwendung
```bash
# WebP erstellen
node create-webp.mjs

# Bilder optimieren
node optimize-images.mjs
```

Bilder liegen in:
- `/public/img/` - Öffentliche Bilder (WebP + JPG)
- `/img/` - Quelldateien (JPG)

---

## Externe Links
- DJ Hulk: https://holger-kampffmeyer.de/djhulk-electronic-music
- Vermietung: https://holger-kampffmeyer.de/vermietung
- Facebook: https://www.facebook.com/profile.php?id=61559169515364
- Instagram: https://www.instagram.com/holgerkampffmeyer/
