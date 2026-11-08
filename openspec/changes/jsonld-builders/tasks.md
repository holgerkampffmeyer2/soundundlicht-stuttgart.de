# Tasks

## 1. Builder-Funktionen in jsonLd.ts implementieren

- [ ] 1.1 `src/data/jsonLd.ts`: Imports für `ProductData`, `FaqEntry`, `CityData`, `BreadcrumbSegment`, `JsonLdItem` aus `../lib/types` + `FaqEntry` aus `./faqUtils`
  - Verifikation: Importfehler keine, `tsc --noEmit` grün

- [ ] 1.2 `serviceJsonLd(product: ProductData, images: string[])` implementieren –返回 `Service` Schema mit `name`, `description`, `image[]`, `serviceType`, `areaServed`, `provider`, `offers` mit `UnitPriceSpecification`
  - Verifikation: `pnpm exec astro check` keine `any`-Hints für Funktion

- [ ] 1.3 `videoJsonLd(videoId: string, title: string, description: string, thumbnailUrl: string, publisher: { '@type': 'Organization'; name: string; logo: { '@type': 'ImageObject'; url: string } })` implementieren – `VideoObject` mit `contentUrl`, `embedUrl`, `thumbnailUrl`, `uploadDate`, `duration`, `publisher`
  - Verifikation: Rückgabe hat `@type: 'VideoObject'`, korrekte URLs

- [ ] 1.4 `faqPageJsonLd(faqs: FaqEntry[])` implementieren – `FAQPage` mit `mainEntity` Array aus `Question`/`Answer`
  - Verifikation: Output-Struktur matches Spec

- [ ] 1.5 `breadcrumbJsonLd(segments: BreadcrumbSegment[])` implementieren – `BreadcrumbList` mit `itemListElement` als `ListItem[]`
  - Verifikation: Position/Name/Item korrekt

- [ ] 1.6 `offerCatalogJsonLd(items: ProductData[])` Signatur auf `ProductData[]` ändern, Implementation beibehalten (Filter `detailPage` ohne `#`, `UnitPriceSpecification` mit `priceValue`)
  - Verifikation: Keine `any` mehr; `pnpm exec astro check` grün

- [ ] 1.7 Constants (`localBusinessJsonLd`, `organizationJsonLd`, `personJsonLd`, `websiteJsonLd`, `siteNavigationJsonLd`, `serviceArea`) unverändert lassen, nur Exports sicherstellen
  - Verifikation: Exporte unverändert

## 2. Unit-Tests für alle Builder

- [ ] 2.1 `src/data/jsonLd.test.ts` anlegen (Vitest, jsdom Environment)
  - Verifikation: Datei existiert, `pnpm test` läuft

- [ ] 2.2 Tests für `serviceJsonLd`: Pflichtfelder vorhanden, `image[]` aus Parameter, `offers.price` = `priceValue`, `areaServed` = `serviceArea`
  - Verifikation: Test grün, Snapshot mit Referenz-Objekt

- [ ] 2.3 Tests für `videoJsonLd`: `contentUrl`/`embedUrl` korrekt, `publisher` Struktur
  - Verifikation: Test grün

- [ ] 2.4 Tests für `faqPageJsonLd`: `mainEntity` Länge = Input, `Question`/`Answer` Struktur
  - Verifikation: Test grün

- [ ] 2.4 Tests für `breadcrumbJsonLd`: Positionen 1..n, `item` URLs korrekt
  - Verifikation: Test grün

- [ ] 2.5 Tests für `offerCatalogJsonLd`: Filter `detailPage` ohne `#`, `price` = `priceValue`, `priceCurrency: 'EUR'`
  - Verifikation: Test grün

- [ ] 2.6 Snapshot-Tests: Jeder Builder-Output tief-verschachtelt gegen Referenz-Objekt (aus aktuellen Inline-Definitionen extrahiert)
  - Verifikation: `pnpm test` → alle jsonLd Tests grün

## 3. Seiten-Migration: Inline-Objekte durch Builder ersetzen

- [ ] 3.1 `src/pages/index.astro`: `serviceJsonLd`, `faqPageJsonLd`, `offerCatalogJsonLd` Imports & Aufrufe
  - Verifikation: `pnpm exec astro check` grün für Datei

- [ ] 3.2 `src/pages/vermietung.astro`: `serviceJsonLd`, `faqPageJsonLd`, `offerCatalogJsonLd` Imports & Aufrufe
  - Verifikation: `pnpm exec astro check` grün

- [ ] 3.3 `src/pages/vermietung/*.astro` (16 Dateien): je Datei `serviceJsonLd`, `videoJsonLd` (falls Video), `faqPageJsonLd`, `breadcrumbJsonLd` Imports & Aufrufe
  - Verifikation: `pnpm exec astro check` grün für alle 16

- [ ] 3.4 `src/pages/faq.astro`: `faqPageJsonLd` Import & Aufruf
  - Verifikation: `pnpm exec astro check` grün

- [ ] 3.5 City-Seiten (`src/pages/*.astro` 20) – **nach** `city-pages-dynamic` (#3), dort in `[city].astro` Builder nutzen
  - Verifikation: In #3 abgedeckt

## 4. Verifikation & Cleanup

- [ ] 4.1 `pnpm exec astro check` → 0 Errors, 0 Warnings, 0 Hints (insb. keine `any` mehr in jsonLd.ts)
- [ ] 4.2 `pnpm test` → alle Unit-Tests grün (inkl. neue jsonLd Tests)
- [ ] 4.3 `pnpm run build` → Build erfolgreich, alle Pages generiert
- [ ] 4.4 Optional: `npx playwright test` → E2E grün

## Workflow follow-up

- Change archivieren: `openspec archive jsonld-builders -y`
- Memories aktualisieren falls nötig
