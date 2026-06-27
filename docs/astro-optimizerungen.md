# Astro-Optimierungen – Plan & Migration Guide

> Übertragbar auf zweite Website – alle Pfade und Patterns sind dokumentiert.

## Übersicht

5 Phasen, priorisiert nach Impact/Aufwand:

| Phase | Feature | Impact | Aufwand | Status |
|-------|---------|--------|---------|--------|
| 1 | **Image Optimization** (`astro:assets`, AVIF, LCP) | 🔥🔥🔥 | mittel | ⏳ ~60% |
| 2 | **View Transitions** (CSS-only) | 🔥🔥 | gering | ✅ 100% |
| 3 | **Content Collections** (Validierung + Typsicherheit) | 🔥🔥 | mittel | ✅ 100% |
| 4 | **Inline-Script auslagern** | 🔥 | gering | ✅ 100% |
| 5 | **Config Feintuning** | 🔸 | gering | ✅ 100% |

---

## Phase 1: Image Optimization (`astro:assets`)

### Ziel
- Alle `<img>`-Tags durch `<Image>`/`<Picture>` aus `astro:assets` ersetzen
- AVIF mit WebP-Fallback via `<Picture formats={['avif','webp']}>`
- LCP-Bilder: `loading="eager"` + `fetchpriority="high"`
- Sharp-Codec-Konfiguration für bessere Kompression

### Schritte

#### 1.1 `astro.config.mjs` – Image Config anpassen

```js
// astro.config.mjs
export default defineConfig({
  // ... bestehende Config
  image: {
    service: {
      config: {
        webp: { effort: 6 },
        avif: { effort: 4 },
      },
    },
  },
});
```

#### 1.2 Statische Bilder nach `src/assets/` verschieben

| Bild | Alter Pfad (public/) | Neuer Pfad (src/assets/) |
|------|---------------------|--------------------------|
| Logo | `/public/img/djhulk_logo.webp` | `src/assets/logo/djhulk_logo.webp` |
| Header | `/public/img/header.webp` | `src/assets/header.webp` |
| Breadcrumb-BG | `/public/img/breadcrumb-bg.webp` | `src/assets/breadcrumb-bg.webp` |
| Slider 1-4 | `/public/img/slider/slide{1-4}.webp` | `src/assets/slider/slide{1-4}.webp` |
| City-Bilder | `/public/img/cities/*.webp` | `src/assets/cities/*.webp` |

#### 1.3 `<img>` → `<Picture>` in Komponenten

**Pattern für statische Bilder:**
```astro
---
import { Picture } from 'astro:assets';
import logo from '@assets/logo/djhulk_logo.webp';
---
<Picture
  src={logo}
  formats={['avif', 'webp']}
  alt="Sound und Licht Stuttgart Logo"
  loading="eager"
  fetchpriority="high"
  class="h-12"
/>
```

**Pattern für LCP-Bilder (Hero):**
```astro
<Picture
  src={heroImg}
  formats={['avif', 'webp']}
  alt=""
  loading="eager"
  fetchpriority="high"
  class="hero-bg-img"
  widths={[640, 1024, 1920]}
  sizes="100vw"
/>
```

#### 1.4 Dynamische Katalogbilder (`rental-catalog.ts`)

Bleiben in `public/img/vermietung/` – Optimierung via Build-Skript:

1. `sharp` in `package.json` devDependencies aufnehmen:
   ```json
   "sharp": "^0.33.0"
   ```
2. Build-Skript `scripts/optimize-images.mjs` erweitern (generiert optimierte Versionen)
3. In `package.json`:
   ```json
   "build:images": "node scripts/optimize-images.mjs",
   "build:full": "pnpm build:images && astro build && ..."
   ```

**Falls `import.meta.glob`-Ansatz gewünscht:**
```ts
// src/lib/images.ts
const productImages = import.meta.glob('/src/assets/vermietung/**/*.{webp,jpg,JPG,png}', {
  eager: true,
  query: { w: '400;800;1200', format: 'avif,webp' },
});
export function getProductImage(path: string): ImageMetadata | undefined {
  const key = Object.keys(productImages).find(k => k.endsWith(path.split('/').pop() || ''));
  return key ? productImages[key] as ImageMetadata : undefined;
}
```

#### 1.5 Betroffene Dateien (alle `<img>`-Vorkommen)

| Datei | Zeile | Änderung |
|-------|-------|----------|
| `src/components/Navbar.astro` | 33 | Logo → `<Picture>` mit Import |
| `src/components/Footer.astro` | 11 | Logo → `<Picture>` mit Import |
| `src/components/HeroSlider.astro` | 34-42 | 4 Hero-Slides → `<Picture>` mit eager/high auf erstem |
| `src/components/PackageCardGrid.astro` | 15 | Produktkarten → `<Picture>` |
| `src/components/CityGrid.astro` | div. | CSS `background-image` via `data-bg` → `<Picture>` pro Slide + JS bg swap |
| `src/components/vermietung/ProductGallery.astro` | 20-40 | Hauptbild + Thumbnails → `<Picture>` |
| `src/pages/vermietung.astro` | 204, 242 | Sound/Licht-Karten → `<Picture>` |
| `src/layouts/Layout.astro` | 208, 264 | Inline-Script `<img>`-Konstruktion → URL bleibt String (Pagefind braucht URLs) |

#### 1.5b Build-Skript `scripts/optimize-images.mjs`

✅ Skript existiert, aber **nicht in `package.json` integriert**. Bei Bedarf aktivieren:
```json
"build:images": "node scripts/optimize-images.mjs",
```

#### 1.6 `<Image>`-Import-Pattern für dynamische Bild-Arrays (Produktseiten)

Jede Produktseite hat ein `images`-Array mit Pfaden. Lösung:

```astro
---
// Statt String-Array: import.meta.glob Eager Map
const images = [
  await import('@assets/vermietung/ldmaui3.webp').then(m => m.default),
  await import('@assets/vermietung/LDMAUI28G3_1_kl.webp').then(m => m.default),
  // ...
];
---
<ProductGallery images={images} title={title} />
```

**Vereinfachte Variante:** `getImage()` auf dem ersten Bild und restliche als `<img>` mit Pfaden aus `public/`

### Status Phase 1 (ca. 60%)

| Schritt | Status |
|---------|--------|
| 1.1 `astro.config.mjs` Image Config | ✅ |
| 1.2 Statische Bilder in `src/assets/` | ✅ (Logo, Header, Slider, Cities) |
| 1.3 HeroSlider → `<Picture>` mit AVIF | ✅ |
| 1.3 PackageCardGrid/vermietung.astro `<img>` | ✅ `decoding="async"` gesetzt |
| 1.3 ProductGallery.astro `<img>` | ✅ `decoding="async"` gesetzt |
| 1.4 `sharp` in dependencies | ✅ |
| 1.5 Build-Skript `optimize-images.mjs` | ⏳ existiert, nicht integriert |
| 1.6 Vermietung-Bilder nach `src/assets/` | ❌ bleiben in `public/` (Build-Skript) |
| CityGrid.astro CSS `background-image` | ❌ komplexer Refactor |
| Produktseiten Hero `background-image` | ❌ komplexer Refactor |

---

## Phase 2: View Transitions

### Ziel
SPA-like Navigation zwischen Seiten ohne JS-Overhead.

### CSS-only (empfohlen, 0KB JS)

```css
/* src/styles/global.css */
@view-transition { navigation: auto; }
```

Optional: Named Transitions für morphing-Effekte:

```astro
<!-- Katalog-Karten auf /vermietung/ -->
<a href={item.detailPage} transition:name={`product-${item.slug}`}>
```

### JS-Router (optional, ~12KB)

```astro
---
// src/layouts/Layout.astro
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/styles/global.css` | `@view-transition { navigation: auto; }` ✅ |
| `src/components/PackageCardGrid.astro` | `transition:name` auf Karten-Links ✅ |
| `src/pages/vermietung.astro` | `transition:name` auf Sound/Licht-Karten ✅ |

### Status Phase 2

| Schritt | Status |
|---------|--------|
| CSS-only `@view-transition` | ✅ |
| `transition:name` auf Karten | ✅ |

---

## Phase 3: Content Collections

### Ziel
- Zod-Schema-Validierung für Produkte, FAQs, Städte
- Typsicherheit via `getCollection()`/`getEntry()`
- Build-Fehler bei inkonsistenten Daten

### 3.1 `src/content.config.ts`

```ts
import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: 'src/content/products' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.string(),
    description: z.string(),
    category: z.enum(['Paket', 'Sound', 'Licht']),
    price: z.string(),
    priceValue: z.number(),
    features: z.array(z.string()),
    detailPage: z.string().optional(),
  }),
});

const faqs = defineCollection({
  loader: file('src/data/faqs.json'),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    tags: z.array(z.string()).optional(),
    pages: z.array(z.string()).optional(),
  }),
});

const cities = defineCollection({
  loader: file('src/data/cities.json'),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    image: z.string(),
    title: z.string(),
    description: z.string(),
    distance: z.string().optional(),
    travelTime: z.string().optional(),
  }),
});

export const collections = { products, faqs, cities };
```

### 3.2 Daten migrieren

**`src/content/products/partypaket-stuttgart.yml`** (Beispiel – 1 Datei pro Produkt):
```yaml
slug: partypaket-stuttgart
title: Partypaket
image: /img/vermietung/partypaket.webp
description: "Das Party-Starterpaket besteht aus Licht und Sound für kleinere Feiern bis ca. 50 Personen."
category: Paket
price: "ab 160€ / Tag"
priceValue: 160
features:
  - "2x JBL Partyboxen"
  - "KLS Laser Bar"
  - "Nebelmaschine"
  - "Mikrofon"
  - "4x LED Par Lichter"
detailPage: "/vermietung/partypaket-stuttgart"
```

**`src/data/cities.json`** (neu – Städte-Stammdaten):
```json
[
  {
    "name": "Stuttgart",
    "slug": "stuttgart",
    "image": "/img/cities/stuttgart.webp",
    "title": "PA-Anlage & Partybox mieten",
    "description": "Veranstaltungstechnik für Partys, Hochzeiten und Firmenfeiern in Stuttgart.",
    "distance": "15 km",
    "travelTime": "20-25 min"
  }
]
```

### 3.3 Importe ersetzen

**Überall:**
```astro
// ALT
import { rentalItems } from '../data/rental-catalog';
const items = rentalItems;

// NEU
import { getCollection } from 'astro:content';
const items = await getCollection('products');
```

### 3.4 Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/content.config.ts` | **NEU** |
| `src/content/products/*.yml` | **NEU** (21 Dateien) |
| `src/data/cities.json` | **NEU** |
| `src/data/faqs.json` | **NEU** (aus faqs.ts generieren) |
| `src/data/rental-catalog.ts` | **ENTFALLEN** (durch Products-Collection) |
| `src/data/faqs.ts` | **ENTFALLEN** (durch FAQs-Collection) |
| `src/lib/faqUtils.ts` | Anpassung: `getFaqsForPage()` nutzt `getCollection('faqs')` |
| `src/data/jsonLd.ts` | `offerCatalogJsonLd()` nimmt Collection-Items |
| `src/pages/index.astro` | `getCollection('products')` statt `rentalItems` |
| `src/pages/vermietung.astro` | `getCollection('products')` statt `rentalItems` |
| Alle 10 Produktseiten | `getCollection('products')` statt `rentalItems` |
| `src/layouts/Layout.astro` | `getCollection('products')` für Rental-Catalog-JSON |
| `src/components/CityGrid.astro` | `getCollection('cities')` statt hardcoded Array |
| Alle 14 City-Seiten | `getCollection('cities')` für Distance/TravelTime |

### Status Phase 3

| Schritt | Status |
|---------|--------|
| `src/content.config.ts` mit Zod-Schemas | ✅ |
| 21 YAML-Produktdateien in `src/content/products/` | ✅ |
| `src/data/cities.json` | ✅ |
| `src/data/faqs.json` (135 Einträge) | ✅ |
| `faqUtils.ts` → `getCollection('faqs')` | ✅ |
| `jsonLd.ts` → Collection-kompatibel | ✅ |
| `Layout.astro` → `getCollection('products')` | ✅ |
| `index.astro` → `getCollection('products')` | ✅ |
| `vermietung.astro` → `getCollection('products')` | ✅ |
| 10 Produktseiten → `getCollection('products')` | ✅ |
| 15 City-Seiten → `await getFaqsForPage()` | ✅ |
| `CityGrid.astro` → `getCollection('cities')` | ✅ |
| `rental-catalog.ts` entfernt | ✅ |
| `faqs.ts` entfernt | ✅ |
| Build läuft (27 Seiten) | ✅ |

---

## Phase 4: Inline-Script auslagern

### Ziel
- Such-/Pagefind-Logik aus `Layout.astro` in separate `.ts`-Datei
- TypeScript-Validierung, Bundling, Minification durch Astro/Vite

### 4.1 `src/scripts/search.ts`

```ts
// ~220 Zeilen aus Layout.astro – extrahiert als Modul
const DEBOUNCE_MS = 300;
const MAX_RESULTS = 10;
let pagefindPromise: Promise<any> | null = null;
// ... gesamte Search-Logik
```

### 4.2 In `Layout.astro` einbinden

```astro
<script>
  import '../../scripts/search.ts';
</script>
```

### 4.3 Scroll-Animation ggf. trennen

Falls IntersectionObserver-Logik nur auf wenigen Seiten gebraucht wird, in separaten `<script is:inline>` oder als eigenes Modul:
```astro
<script>
  import '../../scripts/scroll-animations.ts';
</script>
```

### 4.4 Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/scripts/search.ts` | **NEU** ✅ |
| `src/scripts/scroll-animations.ts` | **NEU** ✅ (separat ausgegliedert) |
| `src/layouts/Layout.astro` | Inline-`<script>` entfernt, durch Import ersetzt ✅ |

### Status Phase 4

| Schritt | Status |
|---------|--------|
| `src/scripts/search.ts` erstellt | ✅ |
| `src/scripts/scroll-animations.ts` separiert | ✅ |
| Layout.astro Import statt Inline | ✅ |

---

## Phase 5: Config Feintuning

### Ziel
- [x] `compressHTML: true` ✅
- [x] `image.service.config` für WebP/AVIF ✅
- [x] `tsconfig.json` Path Aliases ✅

### Status Phase 5

| Schritt | Status |
|---------|--------|
| `compressHTML: true` | ✅ |
| `image.service.config` | ✅ |
| Path Aliases (`@assets/*`, etc.) | ✅ |

---

### 5.1 `astro.config.mjs`

```js
export default defineConfig({
  // Bestehend:
  site: 'https://soundundlicht-stuttgart.de',
  trailingSlash: 'never',
  build: { format: 'directory' },
  
  // Neu:
  compressHTML: true,
  image: {
    service: {
      config: {
        webp: { effort: 6 },
        avif: { effort: 4 },
      },
    },
  },
  // Bestehende Integrations...
});
```

### 5.2 `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@assets/*": ["src/assets/*"],
      "@components/*": ["src/components/*"],
      "@lib/*": ["src/lib/*"],
      "@data/*": ["src/data/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

---

## Commit-Strategie

Pro Phase ein Commit, damit Änderungen nachvollziehbar bleiben:

```
git checkout -b feat/phase1-image-optimization
git add ... && git commit -m "feat: Phase 1 – Image Optimization mit astro:assets und AVIF"
git checkout main && git merge feat/phase1-image-optimization

git checkout -b feat/phase2-view-transitions
git add ... && git commit -m "feat: Phase 2 – View Transitions (CSS-only)"
git checkout main && git merge feat/phase2-view-transitions

# usw.
```

---

## Schnell-Checkliste für zweite Website

- [ ] `pnpm add sharp` (falls nicht vorhanden)
- [ ] `astro.config.mjs`: `image.service.config` + `compressHTML`
- [ ] Statische Bilder von `public/` nach `src/assets/`
- [ ] `<img>` → `<Picture formats={['avif','webp']}>`
- [ ] LCP-Bilder: `loading="eager"` + `fetchpriority="high"`
- [ ] `global.css`: `@view-transition { navigation: auto; }`
- [ ] `src/content.config.ts` für Content Collections
- [ ] Inline-Scripts in `src/scripts/` auslagern
- [ ] Build testen: `pnpm run build`
- [ ] Lighthouse-Test (LCP, CLS, TBT)
