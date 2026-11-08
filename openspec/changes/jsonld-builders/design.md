# Design

## Context

Siehe `proposal.md` – Why. Aktueller Zustand:
- `src/data/jsonLd.ts` exportiert nur `offerCatalogJsonLd(items: any[])` + Konstanten
- 36+ Seiten duplizieren JSON-LD inline (`serviceJsonLd`, `faqJsonLd`, `breadcrumbJsonLd`, `videoJsonLd`)
- `offerCatalogJsonLd(items: any[])` nutzt `any`
- 15× `faq.map((faq: any))`, 3× `categoryProducts.map((p: any))`
- Abhängig von `types-zod-fix` (#1) für `ProductData`, `FaqEntry`, `CityData`, `BreadcrumbSegment`, `JsonLdItem`

## Goals / Non-Goals

**Goals:**
- Alle Builder-Funktionen in `src/data/jsonLd.ts` strikt typisiert (kein `any`)
- Bestehende Inline-Objekte in 36+ Seiten durch Builder-Aufrufe ersetzen
- Constants (`localBusinessJsonLd`, etc.) beibehalten, nur Export
- Unit-Tests für alle Builder (`src/data/jsonLd.test.ts`)
- `pnpm exec astro check` → 0 Hints für `jsonLd.ts` und Konsumenten
- Build & Tests grün

**Non-Goals:**
- Keine Schema-Änderungen an JSON-LD Ausgabe (gleiche Keys/Werte)
- Keine neuen Schema.org-Typen
- City-Seiten-Migration gehört zu #3 (`city-pages-dynamic`)

## Decisions

| Entscheidung | Begründung | Alternative |
|---|---|---|
| Alle Builder in `src/data/jsonLd.ts` | Bestehende Datei, bereits JSON-LD Zentrale; keine neue Datei nötig | Neue Datei `jsonld/builders.ts` |
| `serviceJsonLd(product, images[])` Signatur | Produktseiten brauchen `images[]` für `image[]` im Service | `serviceJsonLd(product)` + separater `images` Param |
| `videoJsonLd` nimmt `publisher: Organization` | Publisher aus `organizationJsonLd` ableitbar; expliziter Param für Flexibilität | `publisher` aus Constants ableiten |
| `faqPageJsonLd(faqs: FaqEntry[])` | Nutzt `FaqEntry` aus `faqUtils`; keine Duplikation | Eigenes `FaqEntry` Interface hier |
| `breadcrumbJsonLd(segments: BreadcrumbSegment[])` | `BreadcrumbSegment` aus `types.ts`; wiederverwendbar für City/Produkt/FAQ | Inline Array in jeder Page |
| `offerCatalogJsonLd(items: ProductData[])` | Ersetzt existing `any[]`; filtert `detailPage` ohne `#` | `items: any[]` beibehalten (Status quo) |
| Constants unverändert lassen | `localBusinessJsonLd` etc. bereits korrekt; nur Export | In Builder-Funktionen umwandeln (unnötig) |
| Unit-Tests in `src/data/jsonLd.test.ts` | Neben `jsonLd.ts`; Vitest jsdom Environment | Separate Test-Datei |

## Risks / Trade-offs

- **[Risk] Breaking Change in JSON-LD Output** → Unit-Tests vergleichen Builder-Output mit Referenz-Objekten (Snapshot); CI prüft Deep-Equal
- **[Risk] Typ-Abhängigkeit zu `types.ts`** → `types-zod-fix` muss zuerst gemerged sein; CI baut beide Changes zusammen
- **[Risk] 36+ Dateien ändern** → Automatisiertes Search/Replace für Inline-Objekte risikoreich; manuell pro Datei sicherer
- **[Trade-off] Builder vs. Inline** → Mehr Abstraktion, aber weniger Duplikation; Wartbarkeit gewinnt
- **[Trade-off] `videoJsonLd` Publisher Param** → Expliziter Param erhöht Flexibilität für Tests; Default-Wert möglich

## Migration Plan

1. `types-zod-fix` (#1) mergen / lokal als Dependency haben
2. `src/data/jsonLd.ts`: Builder-Funktionen implementieren + Tests schreiben
3. `src/data/jsonLd.test.ts`: Snapshot-Tests für alle Builder (Referenz-Objekte aus aktuellen Inline-Definitionen)
4. Seiten-Migration (kann parallel, pro Datei):
   - `src/pages/index.astro`
   - `src/pages/vermietung.astro`
   - `src/pages/vermietung/*.astro` (16)
   - `src/pages/faq.astro`
   - City-Seiten nach #3
5. `pnpm exec astro check` → 0 Hints
6. `pnpm test` + `pnpm run build` → grün

Rollback: `git revert`; keine Schema-Migration.

## Open Questions

Keine.
