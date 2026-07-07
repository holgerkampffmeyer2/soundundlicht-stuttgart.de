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
│   ├── vermietung/       # Produktseiten (10)
│   │   ├── partypaket-stuttgart.astro
│   │   ├── djpaket-fildern.astro
│   │   ├── veranstaltungspaket-stuttgart.astro
│   │   ├── akku-party-paket.astro
│   │   ├── karaoke-paket.astro
│   │   ├── jbl-partybox-300-320.astro
│   │   ├── ld-maui-28g3.astro
│   │   ├── kls-laser-bar.astro
│   │   ├── led-bossfx-nebelmaschine.astro
│   │   └── partylicht-moving-head.astro
│   └── <stadt>.astro     # City Pages (15 Städte)
├── styles/
│   ├── global.css
│   └── themes/*.css      # 5 Farb-Themes
├── scripts/              # Build-Skripte
│   ├── generate-rss.mjs
│   └── update-sitemap.mjs
├── data/                 # SEO-Daten + Mietkatalog
│   ├── jsonLd.ts
│   ├── packages.ts
│   └── rental-catalog.ts   # 21 Mietartikel (alle Produkte)
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
| `/vermietung/` | Vermietung Landing (auch `type:produkt`, 21 Einzelartikel via Katalog-Matching) |
| `/vermietung/partypaket-stuttgart/` | Partypaket |
| `/vermietung/djpaket-fildern/` | DJ-Paket |
| `/vermietung/veranstaltungspaket-stuttgart/` | Veranstaltungspaket |
| `/vermietung/akku-party-paket/` | Akku-Party-Paket – Outdoor |
| `/vermietung/karaoke-paket/` | Karaoke-Paket |
| `/vermietung/jbl-partybox-300-320/` | JBL Partybox |
| `/vermietung/ld-maui-28g3/` | LD Maui 28 G3 |
| `/vermietung/kls-laser-bar/` | KLS Laser Bar |
| `/vermietung/led-bossfx-nebelmaschine/` | LED + Nebelmaschine |
| `/vermietung/partylicht-moving-head/` | Partylicht Moving Head |
| 15 City Pages: `/stuttgart/`, `/esslingen/`, ... `/ostfildern/` | City Pages |
| Weitere 11 Mietartikel (Powerstation, Mikrofon, Beamer, …) | Nur auf `/vermietung/#item-<slug>` (keine eigenen Seiten) |

---

## Farbsystem

### Default (deep-bass – Navy/Blau)

| Token | Farbe | Rolle |
|---|---|---|
| `--color-bg` | <span style="display:inline-block;width:12px;height:12px;background:#050510;border-radius:2px;border:1px solid #333;"></span> `#050510` | Hintergrund |
| `--color-surface` | <span style="display:inline-block;width:12px;height:12px;background:#0a1628;border-radius:2px;border:1px solid #333;"></span> `#0a1628` | Karten, Sektionen |
| `--color-primary` | <span style="display:inline-block;width:12px;height:12px;background:#2563eb;border-radius:2px;"></span> `#2563eb` | Primäre Akzente |
| `--color-secondary` | <span style="display:inline-block;width:12px;height:12px;background:#1e40af;border-radius:2px;"></span> `#1e40af` | Sekundäre Akzente |
| `--color-accent` | <span style="display:inline-block;width:12px;height:12px;background:#60a5fa;border-radius:2px;"></span> `#60a5fa` | Buttons, Links |

### Alt-Themes

| Theme | Stimmung |
|---|---|
| `default` | <span style="display:inline-block;width:12px;height:12px;background:#0891b2;border-radius:2px;"></span> Cyan/Orange (#0891b2 / #f97316) |
| `electric-night` | <span style="display:inline-block;width:12px;height:12px;background:#a855f7;border-radius:2px;"></span> Purple/Pink (#a855f7 / #ec4899) |
| `golden-hour` | <span style="display:inline-block;width:12px;height:12px;background:#f59e0b;border-radius:2px;"></span> Amber/Gold (#f59e0b / #fb923c) |
| `arctic-frost` | <span style="display:inline-block;width:12px;height:12px;background:#60a5fa;border-radius:2px;"></span> Hellblau/Lavendel (#60a5fa / #a78bfa) |

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

- JSON-LD: LocalBusiness, Service, Product, FAQPage, OfferCatalog
- City-Seiten: Service mit city-spezifischem `areaServed`
- Sitemap: 25 URLs via `@astrojs/sitemap`
- RSS Feed: `public/rss.xml` (wird bei build generiert)
- urllist.txt für Suchmaschinen

---

## Suchsystem (Pagefind)

Die Site verwendet **Pagefind 1.5.2** (via `astro-pagefind`) für clientseitige Volltextsuche. Indexierung erfolgt automatisch beim Build (`pnpm run build` / `pnpm run build:full` → "Pagefind indexed N pages").

### Funktionsweise

1. **Build**: Pagefind indexiert alle statischen HTML-Seiten im `dist/`-Output
2. **Client**: `src/scripts/search.ts` erzeugt ein dynamisches `<script>`-Element für `/pagefind/pagefind.js` und greift über `window.pagefind` darauf zu (Vite kann den Import nicht auflösen, da pagefind erst nach dem Build generiert wird)
3. **Ergebnisse**: Werden in einem Overlay unter dem Suchinput gerendert

### Metadata pro Seite

Jede Seite kann über Props im `<Layout>` mit Pagefind-Metadaten versehen werden:

| Prop | Typ | Beispiel |
|------|-----|----------|
| `pagefindType` | `string` | `"produkt"` |
| `pagefindMeta` | `Record<string, string>` | `{{ price: "ab 80€", image: "/img/...", ... }}` |

**Achtung**: `pagefindMeta` wird als **separate `<div>`-Elemente** pro Key-Value-Paar gerendert, nicht als kombinierter `;`-String. Pagefind 1.5.2 parst `;` nicht korrekt als Separator.

Wird `pagefindType="produkt"` gesetzt, bekommt die Seite automatisch `data-pagefind-weight="2"` (doppeltes Gewicht in Suchergebnissen).

### Produkte auf `/vermietung/` (ohne eigene Seite)

21 Produkte sind in `src/data/rental-catalog.ts` definiert. Nur 10 haben eigene Unterseiten in `src/pages/vermietung/`. Die restlichen 11 (Powerstation, Mikrofon, Beamer, …) existieren nur als Karten auf der `/vermietung/`-Seite.

Damit auch diese in der Suche gefunden werden:

1. **`/vermietung/`** hat `pagefindType="produkt"` und wird als Produktseite indexiert
2. **Katalog-JSON**: Der gesamte `rentalItems[]`-Array wird als `<script id="rental-catalog-data" type="application/json">` in die Seite eingebettet
3. **Client-Matching**: Die Suchfunktion `matchCatalogProducts(query)` durchsucht Titel, Beschreibung und Features aller 21 Produkte und rendert Treffer als reiche Produktkarten
4. **Links**: Produkte ohne eigene Seite verlinken auf `vermietung/#item-<slug>`, Produkte mit eigener Seite auf die Detailseite

### URL-Normalisierung

Pagefind speichert URLs mit trailing slash (z.B. `/vermietung/jbl-partybox-300-320/`). Da `trailingSlash: 'never'` in der Astro-Config gesetzt ist, werden Slashes clientseitig via `normalizeUrl()` entfernt.

### Ignorierte Elemente

- `Navbar.astro` und `Footer.astro` haben `data-pagefind-ignore` (werden nicht indexiert)
