# Delta Spec: TypeScript any Cleanup

## Änderungen

### ProductLayout.astro
- `product: any` → `ProductData { slug, title, images?, ctaLabel? }`
- `pagefindMeta: any` → `PagefindMeta { price?, image?, category?, label? }`
- `jsonLd: any[]` → `JsonLdItem[]` (Record-basiert mit `[key: string]: unknown`)
- `breadcrumbSegments: any[]` → `BreadcrumbSegment[] { label, href? }`

### FAQSection.astro
- Inline-Interface `Faq { question: string; answer: string }` hinzugefügt
- `const { faqs } = Astro.props` → `const { faqs } = Astro.props as { faqs: Faq[] }`

### PackageCardGrid.astro
- `pakete: any[]` → `pakete: PaketItem[]`
- Interface mit 7 Properties (slug, title, description, image, price, features, detailPage?)

### search.ts
- `PagefindInstance` Interface (search-Methode)
- `PagefindData` Interface (url, meta, excerpt)
- `rentalCatalog: any[]` → `CatalogProduct[]`
- `(window as any).__pagefind` → `(window as { __pagefind?: ... }).__pagefind`
- `doSearch` Return-Type: `PagefindData[]`
- `renderResults` Parameter: `PagefindData[]`

## Betroffene Dateien
4 Dateien, 72 Zeilen geändert (+ insgesamt)

## Risiko
Sehr niedrig — reine Typisierung, kein Laufzeitverhalten geändert.
