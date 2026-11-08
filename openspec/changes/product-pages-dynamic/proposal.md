# Proposal

## Why

16 manuelle Produkt-Detail-Seiten (`src/pages/vermietung/*.astro`, ~3.9k LOC) nutzen zwar `ProductLayout` als gemeinsamen Wrapper, duplizieren aber JSON-LD (`serviceJsonLd`, `videoJsonLd`, `faqJsonLd`, `breadcrumbJsonLd`), Specs, Includes, Events, Gallery, Video-Daten pro Seite. Änderungen an JSON-LD oder Section-Struktur erfordern 16 Datei-Edits. Produkt-YAMLs enthalten bereits Kern-Daten, aber Specs/Includes/Events/Gallery/Video fehlen.

## What Changes

- **`src/content/products/*.yml` (22 Dateien)** erweitern um optionale Felder:
  `specs: Record<string,string>`, `includes: string[]`, `events: EventItem[]`, `gallery: string[]`, `videoId?: string`, `videoThumbnail?: string`, `videoTitle?: string`, `seoDescription?: string`
- **`src/content.config.ts`**: Products-Schema um obige Felder erweitern
- **`src/pages/vermietung/[slug].astro` (NEU)**: Dynamische Route mit `getStaticPaths()` aus Products-Collection. Rendert `ProductLayout` mit Props aus Collection-Entry. JSON-LD via Builder (`serviceJsonLd`, `videoJsonLd`, `faqPageJsonLd`, `breadcrumbJsonLd`) aus `jsonld-builders` (#2).
- **16 alte `src/pages/vermietung/*.astro` löschen** nach Verifikation
- **`src/components/vermietung/ProductLayout.astro`**: Unverändert (bereits Props-basiert)
- **`src/components/vermietung/*`**: Unverändert (Props-basiert)
- **`src/data/jsonLd.ts`**: Builder genutzt (`serviceJsonLd`, `videoJsonLd`, `faqPageJsonLd`, `breadcrumbJsonLd`) – aus `jsonld-builders` (#2)
- **`src/lib/types.ts`**: `EventItem` Interface ergänzen; `ProductData` bereits aus #1

## Capabilities

### New Capabilities
- `product-page-dynamic`: Dynamische Generierung von Produkt-Detail-Seiten aus Content Collection mit allen variablen Daten (Specs, Includes, Events, Gallery, Video) in YAML, JSON-LD via Builder

### Modified Capabilities
- `product-detail-pages`: Implementation von manuellen Pages auf dynamische Route migriert; YAML-Schema um Specs/Includes/Events/Gallery/Video erweitert
- `typescript-any-cleanup`: `any` in Produkt-Seiten (FAQ/Offers Mapping) eliminieren
- `jsonld-builders`: Builder in Produkt-Seiten genutzt

## Impact

**Betroffene Dateien:**
- `src/content/products/*.yml` (22 Dateien – Felder ergänzen)
- `src/content.config.ts` (Products-Schema erweitern)
- `src/pages/vermietung/[slug].astro` (NEU)
- `src/pages/vermietung/*.astro` (16 Dateien löschen)
- `src/lib/types.ts` (`EventItem` Interface)
- `src/lib/productJsonLd.test.ts` (NEU, Unit-Tests)
- `tests/product-pages.spec.ts` (NEU, E2E)

**Abhängigkeiten:**
- `types-zod-fix` (#1) für `ProductData` Typ
- `jsonld-builders` (#2) für JSON-LD Builder
