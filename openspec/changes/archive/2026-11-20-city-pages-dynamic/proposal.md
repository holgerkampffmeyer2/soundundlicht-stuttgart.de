# Proposal

## Why

20 manuelle City-Pages (`src/pages/*.astro`) mit ~3.9k LOC sind zu 95% identisch in Struktur (Layout, Components, JSON-LD) und unterscheiden sich nur in Daten (Stadt-Name, Bild, Distanz, Reisezeit, Prosa-Texte). Änderungen am Layout erfordern 20 Datei-Edits. `cities.json` enthält bereits alle strukturierten Daten, aber Prosa-Felder (Hero-Titel, Beschreibung, Detail-Text, Einzeltechnik-Titel, Areas-Intro, Kontakt-Text) fehlen im Schema und in den Pages hartcodiert.

## What Changes

- **`src/data/cities.json` erweitern** um Prosa-Felder für jede City:
  `heroTitle`, `heroDescription`, `heroDetails`, `einzelTitle`, `einzelDescription`, `areasIntro`, `contactDescription`, `distanceText`, `travelTimeText` (alle optional, Defaults aus existierenden Pages)
- **`src/content.config.ts`**: Cities-Schema um obige Felder erweitern (`z.string().optional()`)
- **`src/pages/[city].astro` (NEU)**: Dynamische Route mit `getStaticPaths()` aus Cities-Collection. Rendert Layout mit `CityHero`, `CityPackages`, `CitySteps`, `CityAreas`, `CityEinzeltechnik`, `FAQSection`, `ContactSection`, `Breadcrumb`, JSON-LD (Breadcrumb + Service + FAQ) – alles parametrisiert über City-Daten.
- **20 alte `src/pages/*.astro` löschen** nach Verifikation
- **`src/components/CityGrid.astro`**: Unverändert (nutzt `getCollection('cities')` für Carousel)
- **`src/lib/faqUtils.ts`**: `getFaqsForPage` sync machen (async entfernt)
- **`src/lib/types.ts`**: `CityData` = `CollectionEntry<'cities'>['data']` exportieren
- **JSON-LD**: Builder aus `jsonld-builders` (#2) nutzen (`breadcrumbJsonLd`, `serviceJsonLd`, `faqPageJsonLd`)

## Capabilities

### New Capabilities
- `city-page-dynamic`: Dynamische Generierung von City-Landing-Pages aus Content Collection mit parametrisierten Prosa-Feldern, JSON-LD Buildern und wiederverwendbaren Components

### Modified Capabilities
- `feature-inventory` (Geographic City Pages): Implementation von manuellen Pages auf dynamische Route migriert
- `typescript-any-cleanup`: `any` in City-Pages (FAQ-Mapping) eliminieren
- `product-detail-pages`: JSON-LD Builder nutzen (via `jsonld-builders`)

## Impact

**Betroffene Dateien:**
- `src/data/cities.json` (Prosa-Felder für 20 Cities ergänzen)
- `src/content.config.ts` (Cities-Schema erweitern)
- `src/pages/[city].astro` (NEU)
- `src/pages/*.astro` (20 Dateien löschen)
- `src/lib/faqUtils.ts` (sync)
- `src/lib/types.ts` (CityData Export)
- `src/lib/cityUtils.test.ts` (NEU, Unit-Tests)
- `tests/city-pages.spec.ts` (NEU, E2E)

**Abhängigkeiten:**
- `types-zod-fix` (#1) für `CityData` Typ
- `jsonld-builders` (#2) für JSON-LD Builder
- `servicearea-from-cities` (#5) für `areaServed` in JSON-LD
