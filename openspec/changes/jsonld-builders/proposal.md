# Proposal

## Why

Alle 16 Produkt-Seiten, 20 City-Seiten, Index und Vermietung-Übersicht duplizieren JSON-LD-Objekte inline (`const serviceJsonLd = {...}`, `const faqJsonLd = {...}`, `const breadcrumbJsonLd = {...}`). `offerCatalogJsonLd(items: any[])` nutzt `any`. 15× `faq.map((faq: any))`, 3× `categoryProducts.map((p: any))`. Das führt zu Copy-Paste-Fehlern, Inkonsistenzen (z. B. fehlende Pflichtfelder) und verhindert strikte Typ-Sicherheit. Zentrale Builder-Funktionen in `src/data/jsonLd.ts` lösen das.

## What Changes

- **Neue Builder-Funktionen** in `src/data/jsonLd.ts` (alle strikt typisiert mit `ProductData`, `FaqEntry`, `CityData` aus `types.ts`):
  - `serviceJsonLd(product: ProductData, images: string[])` – Service-Schema für Produkt/Category
  - `videoJsonLd(videoId: string, title: string, description: string, thumbnailUrl: string, publisher: object)` – VideoObject
  - `faqPageJsonLd(faqs: FaqEntry[])` – FAQPage
  - `breadcrumbJsonLd(segments: BreadcrumbSegment[])` – BreadcrumbList
  - `offerCatalogJsonLd(items: ProductData[])` – OfferCatalog (ersetzen existing `any[]`)
- **Bestehende Inline-Objekte ersetzen** in:
  - `src/pages/index.astro`
  - `src/pages/vermietung.astro`
  - `src/pages/vermietung/*.astro` (16 Dateien)
  - `src/pages/*.astro` (20 City-Seiten) – nach `city-pages-dynamic` (#3)
  - `src/pages/faq.astro`
- **Keine Verhaltensänderung** – gleiche JSON-LD-Ausgabe, nur zentralisiert & typisiert

## Capabilities

### New Capabilities
- `jsonld-builders`: Zentrale, typisierte JSON-LD Builder für alle Schema.org-Typen (Service, VideoObject, FAQPage, BreadcrumbList, OfferCatalog, LocalBusiness, Organization, Person, WebSite, SiteNavigationElement)

### Modified Capabilities
- `typescript-any-cleanup`: `any` in JSON-LD eliminieren
- `product-detail-pages`: JSON-LD Builder nutzen statt Inline-Objekte

## Impact

**Betroffene Dateien:**
- `src/data/jsonLd.ts` (neue Exports)
- `src/lib/types.ts` (Imports für `ProductData`, `FaqEntry`, `CityData`, `BreadcrumbSegment`, `JsonLdItem`)
- `src/pages/index.astro`, `src/pages/vermietung.astro`
- `src/pages/vermietung/*.astro` (16)
- `src/pages/*.astro` (20, nach #3)
- `src/pages/faq.astro`
- Tests: `src/data/jsonLd.test.ts` (neu)

**Abhängigkeit:** Erfordert `types-zod-fix` (#1) für `ProductData`/`FaqEntry` Typen.
