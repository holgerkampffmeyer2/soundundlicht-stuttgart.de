# Sound & Licht Stuttgart – Konzept, Struktur & Design

## Technologie-Stack

- **Framework:** Astro 7.x (Static Site Generation, `output: 'static'`)
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
│   └── vermietung/       # Vermietung-spezifische Komponenten (u. a. ProductLayout, ProductGallery)
├── layouts/
│   └── Layout.astro
├── pages/                # Routen
│   ├── index.astro       # Landing Page
│   ├── vermietung.astro  # Vermietung Landing
│   ├── vermietung/       # Produkt- & Kategorieseiten (inkl. ICOA-System/-Pakete, Redirects)
│   │   ├── partypaket-stuttgart.astro
│   │   ├── djpaket-fildern.astro
│   │   ├── veranstaltungspaket-stuttgart.astro
│   │   ├── akku-party-paket.astro
│   │   ├── karaoke-paket.astro
│   │   ├── jbl-partybox-300-320.astro
│   │   ├── ld-maui-28g3.astro
│   │   ├── ld-systems-icoa-series.astro   # ICOA-System (Kategorie)
│   │   ├── ld-icoa-top-paar.astro         # ICOA-Paket
│   │   ├── ld-icoa-party-paket.astro      # ICOA-Paket (Partypaket XL)
│   │   ├── ld-icoa-club-paket.astro       # ICOA-Paket
│   │   ├── ld-icoa-buehnen-paket.astro    # Redirect → Partypaket XL
│   │   ├── kls-laser-bar.astro
│   │   ├── led-bossfx-nebelmaschine.astro
│   │   ├── nebelmaschinen.astro
│   │   ├── partylicht-moving-head.astro
│   │   ├── powerstation.astro
│   │   ├── mini-party-beamer.astro
│   │   ├── max-party-bar.astro
│   │   ├── mikrofon-mischpult.astro
│   │   └── led-scheinwerfer.astro
│   └── [city].astro       # City Pages (21 Städte, dynamisch aus cities.json)
├── styles/
│   ├── global.css
│   ├── theme-vars.css    # Alt-Theme-Variablen (?theme=)
│   └── themes/deep-bass.css  # @theme-Basis (Default)
├── scripts/              # Client-Skripte (Build-Skripte: /scripts/)
│   ├── search.ts
│   └── scroll-animations.ts
├── content/
│   └── products/         # 27 Produkt-YAMLs
├── lib/                  # Hilfsfunktionen
│   ├── cartData.ts       # Cart-Daten (readRawCart, buildProductMap, formatCartItems, getCartData)
│   ├── cartData.test.ts  # Unit-Tests
│   ├── faqUtils.ts       # FAQ-Filterung (getFaqsForPage)
│   ├── imageUtils.ts     # WebP/Thumb-URLs
│   ├── merklisteStore.ts # localStorage-CRUD für Merkliste
│   ├── merklisteStore.test.ts # Unit-Tests
│   └── types.ts          # Gemeinsame Typen
├── data/                 # JSON-Daten
│   ├── cities.json
│   ├── faqs.json
│   └── google-reviews.json
public/
├── downloads/            # Downloadbare Dateien (z. B. PDF-Anleitungen)
│   └── icoa/             # Druck-PDFs der ICOA-Aufbauschemata
├── img/
│   ├── cities/           # City Hero-Bilder (slug.webp + -thumb.webp)
│   ├── vermietung/
│   │   └── icoa/         # Digitale ICOA-Aufbauschemata (SVG) für Galerie
│   └── header.webp
└── rss.xml
docs/
└── diagrams/
    └── icoa/             # Quell-Dateien der ICOA-Aufbauschemata (.drawio, .svg, .pdf)
```

---

## Seitenübersicht

| Pfad | Typ |
|------|-----|
| `/` | Landing Page |
| `/vermietung/` | Vermietung Landing (auch `type:produkt`, 27 Einzelartikel via Katalog-Matching) |
| `/vermietung/partypaket-stuttgart/` | Partypaket |
| `/vermietung/djpaket-fildern/` | DJ-Paket |
| `/vermietung/veranstaltungspaket-stuttgart/` | Veranstaltungspaket |
| `/vermietung/akku-party-paket/` | Akku-Party-Paket – Outdoor |
| `/vermietung/karaoke-paket/` | Karaoke-Paket |
| `/vermietung/jbl-partybox-300-320/` | JBL Partybox |
| `/vermietung/ld-maui-28g3/` | LD Maui 28 G3 |
| `/vermietung/ld-systems-icoa-series/` | LD ICOA System (Kategorie) |
| `/vermietung/ld-icoa-top-paar/` | ICOA-Paket: Top-Paar (unter ICOA System) |
| `/vermietung/ld-icoa-party-paket/` | ICOA-Paket: Partypaket XL (unter ICOA System) |
| `/vermietung/ld-icoa-club-paket/` | ICOA-Paket: Club-Paket (unter ICOA System) |
| `/vermietung/kls-laser-bar/` | KLS Laser Bar |
| `/vermietung/led-bossfx-nebelmaschine/` | LED + Nebelmaschine |
| `/vermietung/nebelmaschinen/` | Nebelmaschinen (AF-150 & Uking 1200W) |
| `/vermietung/partylicht-moving-head/` | Partylicht Moving Head |
| 21 City Pages: `/stuttgart/`, `/esslingen/`, ... `/göppingen/` | City Pages |
| Anker-gebündelte Geräte (z. B. `/vermietung/led-scheinwerfer#led-par-lichter`, `/vermietung/nebelmaschinen#af-150`) | Als Abschnitt auf Kategorieseite, kein eigener Link |

> Hinweis: `/vermietung/ld-icoa-buehnen-paket/` leitet auf `/vermietung/ld-icoa-party-paket/` weiter. Die ICOA-Paketseiten sind per Breadcrumb unter `/vermietung/ld-systems-icoa-series/` eingeordnet.

---

## Farbsystem

### Default (deep-bass – Navy/Blau)

| Token | Farbe | Rolle |
|---|---|---|
| `--color-bg` | <span style="display:inline-block;width:12px;height:12px;background:#050510;border-radius:2px;border:1px solid #333;"></span> `#050510` | Hintergrund |
| `--color-surface` | <span style="display:inline-block;width:12px;height:12px;background:#0a1628;border-radius:2px;border:1px solid #333;"></span> `#0a1628` | Karten, Sektionen |
| `--color-primary` | <span style="display:inline-block;width:12px;height:12px;background:#2563eb;border-radius:2px;"></span> `#2563eb` | Primäre Akzente |
| `--color-secondary` | <span style="display:inline-block;width:12px;height:12px;background:#1e40af;border-radius:2px;"></span> `#1e40af` | Sekundäre Akzente |
| `--color-accent` | <span style="display:inline-block;width:12px;height:12px;background:#22c55e;border-radius:2px;"></span> `#22c55e` | Buttons, Links |

### Alle Themes

| Theme | Stimmung | Status |
|---|---|---|
| `deep-bass` | <span style="display:inline-block;width:12px;height:12px;background:#050510;border-radius:2px;"></span> Navy/Blau | **Default** |
| `electric-night` | <span style="display:inline-block;width:12px;height:12px;background:#a855f7;border-radius:2px;"></span> Purple/Pink | Alternativ |
| `golden-hour` | <span style="display:inline-block;width:12px;height:12px;background:#f59e0b;border-radius:2px;"></span> Amber/Gold | Alternativ |
| `arctic-frost` | <span style="display:inline-block;width:12px;height:12px;background:#60a5fa;border-radius:2px;"></span> Hellblau/Lavendel | Alternativ |

Vollständige Token-Tabellen: [docs/theme-system.md](theme-system.md)

---

## Theme-Wechsel

- **Permanent**: `@import` in `global.css` ändern
- **Temporär**: `?theme=<name>` URL-Parameter
- Implementiert in `Layout.astro`: early Script setzt `data-theme`, Fallback-`<style>` definiert Alt-Vars, kein FOUC

### Wartung

Neues Theme: Variablen in `src/styles/theme-vars.css` unter `html[data-theme="<name>"]` ergänzen + Namen in die `?theme=`-Regex in `Layout.astro` aufnehmen.

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

- **Format**: WebP primär, JPG-Fallback via `<picture>`-Element; Ausnahmen für Diagramme/Illustrationen (z. B. SVG-Aufbauschemata in Galerien)
- **City Hero**: `public/img/cities/<slug>.webp` (1920px, quality 85)
- **City Thumb**: `public/img/cities/<slug>-thumb.webp` (600px, quality 75)
- **Galerie**: `public/img/vermietung/<name>.webp` + Fallback `.jpg` (oder SVG z. B. unter `public/img/vermietung/<gruppe>/`)
- **Downloads**: `public/downloads/<gruppe>/` für druckfreundliche PDFs/Anleitungen (z. B. ICOA-Aufbauschemata); Quellen dazu in `docs/diagrams/<gruppe>/`
- **Produktlayout**: `ProductLayout` (`galleryImages?: string[]`) rendert die Galerie; optional `downloads?: { label, href, filename }[]` zeigt unter der Galerie einen „Anleitung / Aufbauschema als PDF“-Downloadblock
- **Optimierung**: `node scripts/optimize-images.mjs` (WebP via Sharp, CLI: `-w`, `-q`, `--concurrency`, `-d`)
- **Attribution**: CC-Lizenzen im HTML-Kommentar vermerken

---

## Barrierefreiheit

- `prefers-reduced-motion` bei allen Animationen
- Bilder mit alt-Text
- Farben nicht als einziges Mittel zur Informationsvermittlung

---

## Build-Skripte

```bash
pnpm run dev                # Dev server
pnpm run build              # Production build → dist/ (inkl. Sitemap)
pnpm run build:full         # Build + RSS + urllist (für Deploy)
pnpm run build:full-with-images # Images + Build + RSS + urllist
pnpm run build:images       # WebP-Optimierung via Sharp (JPG/PNG)
pnpm run preview            # Preview
pnpm run generate-rss       # Nur RSS-Feed generieren
pnpm run indexnow-submit    # URL-Submission an Suchmaschinen
```

---

## SEO

- JSON-LD: LocalBusiness, Service, FAQPage, OfferCatalog (kein `Product`)
- City-Seiten: Service mit city-spezifischem `areaServed`
- Sitemap: via `@astrojs/sitemap` (derzeit 46 indexierte Seiten laut Build)
- RSS Feed: `public/rss.xml` (wird bei build generiert)
- urllist.txt für Suchmaschinen

---

## Suchsystem (Pagefind)

Die Site verwendet **Pagefind 2.0.1** (via `astro-pagefind`) für clientseitige Volltextsuche. Indexierung erfolgt automatisch beim Build (`pnpm run build` / `pnpm run build:full` → "Pagefind indexed N pages").

### Funktionsweise

1. **Build**: Pagefind indexiert alle statischen HTML-Seiten im `dist/`-Output
2. **Client**: `Layout.astro` lädt pagefind per `import('/pagefind/pagefind.js')` in einem `<script is:inline>` (nicht von Vite verarbeitet) und speichert den Promise in `window.__pagefind`. `src/scripts/search.ts` nutzt `window.__pagefind` für die Suche.
3. **Ergebnisse**: Werden in einem Overlay unter dem Suchinput gerendert

### Metadata pro Seite

Jede Seite kann über Props im `<Layout>` mit Pagefind-Metadaten versehen werden:

| Prop | Typ | Beispiel |
|------|-----|----------|
| `pagefindType` | `string` | `"produkt"` |
| `pagefindMeta` | `Record<string, string>` | `{{ price: "ab 80€", image: "/img/...", ... }}` |

**Achtung**: `pagefindMeta` wird als **separate `<div>`-Elemente** pro Key-Value-Paar gerendert, nicht als kombinierter `;`-String. Pagefind 2.0.1 parst `;` nicht korrekt als Separator.

Wird `pagefindType="produkt"` gesetzt, bekommt die Seite automatisch `data-pagefind-weight="2"` (doppeltes Gewicht in Suchergebnissen).

### Produkte auf `/vermietung/` (Katalog-Matching)

27 Produkte sind als Content-Collection (`src/content/products/*.yml`) definiert und werden über `src/components/RentalCatalogData.astro` als `rentalItems` eingebettet. Produkt- und Kategorieseiten liegen in `src/pages/vermietung/` (mehrere Geräte-Detailseiten werden über Anker auf Kategorieseiten gebündelt, z. B. `/vermietung/led-scheinwerfer#led-par-lichter`). Alle Produkte tragen ein `detailPage` (Route oder Anker). Jede Produkt-YAML kann ein optionales `order`-Feld (Zahl, nach `category`) tragen: `/vermietung` und `RentalCatalogData.astro` sortieren danach und gruppieren so verwandte Geräte (z. B. beide Nebelmaschinen direkt beieinander).

Damit auch Zubehör/Anker-Geräte in der Suche gefunden werden:

1. **`/vermietung/`** hat `pagefindType="produkt"` und wird als Produktseite indexiert
2. **Katalog-JSON**: Der gesamte `rentalItems[]`-Array wird als `<script id="rental-catalog-data" type="application/json">` in die Seite eingebettet
3. **Client-Matching**: Die Suchfunktion `matchCatalogProducts(query)` durchsucht Titel, Beschreibung und Features aller Katalog-Produkte und rendert Treffer als reiche Produktkarten
4. **Links**: Produktkarten verlinken auf `detailPage` (Route oder Anker-Ziel); Nicht-Anker-Ziele werden gegen doppelte Pagefind-Treffer dedupliziert

### URL-Normalisierung

Pagefind speichert URLs mit trailing slash (z.B. `/vermietung/jbl-partybox-300-320/`). Da `trailingSlash: 'never'` in der Astro-Config gesetzt ist, werden Slashes clientseitig via `normalizeUrl()` entfernt.

### Ignorierte Elemente

- `Navbar.astro` und `Footer.astro` haben `data-pagefind-ignore` (werden nicht indexiert)
