# typescript-any-cleanup Specification

## Purpose
Ersetzt verbleibende `any`-Typen durch benannte Interfaces in ProductLayout, FAQSection, PackageCardGrid und search.ts, um volle Typ-Sicherheit ohne Laufzeitänderungen herzustellen.

## Requirements

### Requirement: ProductLayout verwendet konkrete Typen statt `any`

`src/components/vermietung/ProductLayout.astro` SHALL `product`, `pagefindMeta`, `jsonLd` und `breadcrumbSegments` über benannte Interfaces typisieren (`ProductData`, `PagefindMeta`, `JsonLdItem[]`, `BreadcrumbSegment[]`) und keine `: any`-Annotationen enthalten.

#### Scenario: Keine `any`-Verwendung

- **WHEN** `ProductLayout.astro` gelint wird
- **THEN** enthält es keine `: any`-Annotationen
- **THEN** nutzt es die benannten Interfaces für die vier Props

### Requirement: FAQSection typisiert Props

`src/components/FAQSection.astro` SHALL ein `Faq`-Interface definieren und `faqs` als `Faq[]` typisieren, ohne `any`.

#### Scenario: `faqs` ist typisiert

- **WHEN** `FAQSection.astro` gelint wird
- **THEN** ist `faqs` als `Faq[]` typisiert statt `any`

### Requirement: PackageCardGrid typisiert Pakete

`src/components/PackageCardGrid.astro` SHALL `pakete` als `PaketItem[]` typisieren (Interface mit `slug`, `title`, `description`, `image`, `price`, `features`, `detailPage?`).

#### Scenario: `pakete` ist typisiert

- **WHEN** `PackageCardGrid.astro` gelint wird
- **THEN** ist `pakete` als `PaketItem[]` typisiert statt `any`

### Requirement: search.ts entfernt `any`-Typen

`src/scripts/search.ts` SHALL die Interfaces `PagefindInstance` und `PagefindData` sowie `CatalogProduct[]` für den Katalog verwenden, `window.__pagefind` ohne `as any` ansprechen und `doSearch`/`renderResults` mit `PagefindData[]` typisieren.

#### Scenario: Keine `any`-Verwendung

- **WHEN** `search.ts` gelint wird
- **THEN** enthält es keine `any`-Typen
- **THEN** sind `doSearch` und `renderResults` mit `PagefindData[]` typisiert
