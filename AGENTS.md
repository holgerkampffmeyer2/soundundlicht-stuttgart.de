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

## City Page Pattern

Every city page follows this structure:

```astro
---
import Layout from "../layouts/Layout.astro";
import Navbar from "../components/Navbar.astro";
import Footer from "../components/Footer.astro";
import CityHero from "../components/CityHero.astro";
import CityPackages from "../components/CityPackages.astro";
import CitySteps from "../components/CitySteps.astro";
import MapPinIcon from "../components/icons/MapPinIcon.astro";
import EmailIcon from "../components/icons/EmailIcon.astro";

const cityJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Veranstaltungstechnik Vermietung <CityName>",
  "areaServed": {
    "@type": "City",
    "name": "<CityName>"
  }
};
---
<Layout
  title="<SEO Title>"
  description="<SEO Description>"
  image="/img/header.webp"
  jsonLd={cityJsonLd}
>
  <Navbar />

  <CityHero
    image="/img/cities/<slug>.webp"
    city="<CityName>"
    title="<H1 Title>"
    description="<Hero description (1 paragraph)>"
    details="<Hero details (1 paragraph, distance/practical info)>"
  />

  <CityPackages />
  <CitySteps />

  <!-- Kontakt section -->
  <section id="kontakt" class="...">
    <!-- City-specific contact text + Google Maps embed + email -->
  </section>

  <Footer />
</Layout>
```

## Steps to Add a New City Page

### 1. Image
- Find a CC-licensed city photo on Wikimedia Commons
- Download to `/tmp/<slug>_orig.jpg`
- Convert to WebP: hero at 1920px wide (quality 85), thumbnail at 600px (quality 75)
- Save as `public/img/cities/<slug>.webp` and `public/img/cities/<slug>-thumb.webp`
- Usage: `<CityHero image="/img/cities/<slug>.webp" ... />` and CityGrid thumbnail

### 2. City Page
- Copy an existing city page (e.g., `src/pages/stuttgart.astro`)
- Adjust `cityJsonLd` (name, areaServed name)
- Adjust `<Layout>` title/description
- Adjust `<CityHero>` props (image, city, title, description, details with city-specific distance/time)
- Adjust contact section text (city name, distance from LE)
- Save as `src/pages/<slug>.astro`

### 3. Register in CityGrid
- Add entry to `cities[]` in `src/components/CityGrid.astro`:
  ```js
  {
    name: "<CityName>",
    slug: "<slug>",
    image: "/img/cities/<slug>-thumb.webp",
    title: "<Short title>",
    description: "<Brief description>"
  }
  ```

### 4. Register in Footer
- Add link in Footer.astro Einzugsgebiet section: `<li><a href="/<slug>/">...</a></li>`

### 5. Build & Verify
- `node_modules/.bin/astro build` (all 6+ pages + sitemap)
- Check `dist/sitemap-index.xml` includes new URL
- Verify dist output for the new page

## Components Overview

| Component | Usage | Props |
|-----------|-------|-------|
| `Navbar.astro` | Top navigation on all pages | `currentPage?: string` |
| `Footer.astro` | Footer with links, social, imprint | (none) |
| `CityHero.astro` | Hero with full-bleed city image + dark overlay | `image`, `city`, `title`, `description`, `details` |
| `CityPackages.astro` | 3 package cards (Partypaket, DJ-Paket, Veranstaltungspaket) | (none) |
| `CitySteps.astro` | 4-step process (Anfragen → Bestätigen → Abholen → Feiern) | (none) |
| `CityGrid.astro` | City tile grid on index.astro | (none – self-contained data) |
| `Testimonials.astro` | Customer reviews | `id?: string` |
| `Layout.astro` | Base layout with SEO, JSON-LD, fonts | `title`, `description?`, `image?`, `noIndex?`, `jsonLd?` |

## Image Naming Conventions

- City hero: `public/img/cities/<slug>.webp` (1920px wide, quality 85)
- City thumb: `public/img/cities/<slug>-thumb.webp` (600px wide, quality 75)
- Hero image: `public/img/header.webp`
- Gallery: `public/img/vermietung/<name>.webp` (+ fallback .jpg)
- Attribution for CC images in page source comments

## JSON-LD Patterns

- **Layout.astro** (always present): WebPage, LocalBusiness, AggregateRating (5.0/14 reviews), ItemList/SiteNavigationElement
- **index.astro** : Service (general), FAQPage (8 questions), OfferCatalog (3 packages)
- **City pages**: Service with city-specific `areaServed` (City type)

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

## Design System

### Farben (CSS Variables in global.css)
- `--color-bg`: #0a0a0f (dark)
- `--color-surface`: #12121a
- `--color-primary`: #0891b2 (cyan)
- `--color-secondary`: #f97316 (orange – CTAs, highlights)
- `--color-accent`: #22d3ee (cyan – buttons, links)

### Animation-Klassen
- `.animate-on-scroll` – Fade-In bei Scroll (per IntersectionObserver)
- `.gradient-text` – Orange→Cyan Text-Gradient
- `.neon-pulse` – Pulsierender oranger Neon-Glow (Buttons)
- `.neon-pulse-cyan` – Pulsierender cyaner Neon-Glow
- `.soundwave-container` / `.soundwave-bar` – Equalizer-Animation
- `.beat-pulse` – Rhythmischer Puls
- `.moving-gradient` – Animierter Hintergrund
- `.prefers-reduced-motion` wird in global.css unterstützt

## Image Conventions

### Bilder immer mit WebP + Fallback
Für Galerie-Bilder (index.astro) wird das picture-Element genutzt:
```html
<picture>
  <source srcset="/img/xxx.webp" type="image/webp" />
  <img src="/img/xxx.jpg" alt="..." />
</picture>
```

CityHero nutzt direkt WebP (single source) – Hintergrundbilder via CSS `background-image`.

### Batch-Konvertierung
- `node scripts/create-webp.mjs` — konvertiert alle JPGs/PNGs in `public/img/` zu WebP (1920px, quality 80, parallel)
- `node scripts/optimize-images.mjs` — optimiert + resized Bilder zu WebP, non-destructive, mit CLI-Optionen:
  ```
  -w, --width <px>        Max width (default: 1920)
  -h, --height <px>       Max height
  --fit <mode>            cover/contain/inside/outside (default: inside)
  -q, --quality <num>     WebP quality 1-100 (default: 80)
  --concurrency <num>     Parallel tasks (default: CPU cores)
  -d, --dir <path>        Single directory (default: public/img)
  ```

## Performance
- Bilder lazy laden (`loading="lazy"`)
- WebP als primäres Format (ca. 60-80% kleiner als JPEG)
- Build prüfen vor Commit: `pnpm run build`

## Git Workflow
- Features auf eigenen Branches entwickeln
- Vor Commit: Build testen (`pnpm run build`)
- Keine Secrets (API-Keys, Passwörter) committen

## Barrierefreiheit
- `prefers-reduced-motion` bei allen Animationen unterstützt (global.css)
- Bilder mit alt-Text
- Farben nicht als einziges Mittel zur Informationsvermittlung

## SEO Notes

- Single-page for landing (no sub-pages)
- City pages are separate .astro files in `src/pages/` (no dynamic routing)
- Only "ab"-prices shown (no concrete prices)
- Contact via email only (no form)
- Pickup in Leinfelden-Echterdingen (no delivery)
