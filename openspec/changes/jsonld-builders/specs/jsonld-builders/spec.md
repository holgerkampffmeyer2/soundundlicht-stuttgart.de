# Spec Delta

## Purpose

Provides centralized, strictly typed builder functions for all Schema.org structured data used across the site (Service, VideoObject, FAQPage, BreadcrumbList, OfferCatalog, LocalBusiness, Organization, Person, WebSite, SiteNavigationElement). Eliminates copy-paste duplication and `any` types in 36+ pages.

## ADDED Requirements

### Requirement: Service JSON-LD Builder
The system SHALL provide a `serviceJsonLd(product: ProductData, images: string[])` function that returns a valid Schema.org `Service` object with `name`, `description`, `image[]`, `serviceType`, `areaServed`, `provider`, and `offers` with `UnitPriceSpecification`.

#### Scenario: Build Service JSON-LD for product page
- **WHEN** caller invokes `serviceJsonLd(productData, ['/img/product.webp'])`
- **THEN** returned object has `@type: 'Service'`, `@context: 'https://schema.org'`, all required properties populated from `ProductData` and images

### Requirement: VideoObject JSON-LD Builder
The system SHALL provide a `videoJsonLd(videoId: string, title: string, description: string, thumbnailUrl: string, publisher: Organization)` function that returns a valid Schema.org `VideoObject` with `contentUrl`, `embedUrl`, `thumbnailUrl`, `uploadDate`, `duration`, `publisher`.

#### Scenario: Build VideoObject for product with YouTube demo
- **WHEN** caller invokes `videoJsonLd('vE5PQ7IUdrg', 'Title', 'Desc', '/img/thumb.webp', publisherObj)`
- **THEN** returned object has `@type: 'VideoObject'`, `contentUrl: 'https://www.youtube.com/watch?v=vE5PQ7IUdrg'`, `embedUrl: 'https://www.youtube.com/embed/vE5PQ7IUdrg'`

### Requirement: FAQPage JSON-LD Builder
The system SHALL provide a `faqPageJsonLd(faqs: FaqEntry[])` function that returns a valid Schema.org `FAQPage` with `mainEntity` array of `Question`/`Answer` pairs.

#### Scenario: Build FAQPage from filtered FAQs
- **WHEN** caller invokes `faqPageJsonLd(faqArray)`
- **THEN** returned object has `@type: 'FAQPage'`, `mainEntity` length equals input array, each entry has `Question` with `name` and `acceptedAnswer` with `Answer` and `text`

### Requirement: BreadcrumbList JSON-LD Builder
The system SHALL provide a `breadcrumbJsonLd(segments: BreadcrumbSegment[])` function that returns a valid Schema.org `BreadcrumbList` with `itemListElement` of `ListItem` (position, name, item URL).

#### Scenario: Build BreadcrumbList for city page
- **WHEN** caller invokes `breadcrumbJsonLd([{label:'Startseite',href:'/'},{label:'Stuttgart',href:'/stuttgart'}])`
- **THEN** returned object has `@type: 'BreadcrumbList'`, `itemListElement` with two `ListItem` entries, correct positions and URLs

### Requirement: OfferCatalog JSON-LD Builder
The system SHALL provide an `offerCatalogJsonLd(items: ProductData[])` function that returns a valid Schema.org `OfferCatalog` with filtered `detailPage` items, each as `Offer` with `Service` itemOffered, `priceCurrency: 'EUR'`, `UnitPriceSpecification` with `price` from `priceValue`.

#### Scenario: Build OfferCatalog from product catalog
- **WHEN** caller invokes `offerCatalogJsonLd(allProducts)`
- **THEN** returned object has `@type: 'OfferCatalog'`, `itemListElement` only for products with `detailPage` not containing '#', each `Offer` has `UnitPriceSpecification.price` from `priceValue`

### Requirement: Static Organization/Person/WebSite/LocalBusiness JSON-LD
The system SHALL export pre-built constant objects: `localBusinessJsonLd`, `organizationJsonLd`, `personJsonLd`, `websiteJsonLd`, `siteNavigationJsonLd` matching current output (no behavior change).

#### Scenario: Constants match existing JSON-LD
- **WHEN** importing `localBusinessJsonLd` from `jsonLd.ts`
- **THEN** object equals current inline definition in `Layout.astro` (deep equal)

## ADDED Requirements (Modified Capabilities)

### Requirement: Eliminate `any` in JSON-LD (typescript-any-cleanup)
The system SHALL NOT use `any` type in any JSON-LD builder signature or implementation. All builders SHALL use `ProductData`, `FaqEntry`, `CityData`, `BreadcrumbSegment`, `JsonLdItem` from `types.ts`.

#### Scenario: TypeScript compilation without `any`
- **WHEN** running `pnpm exec astro check`
- **THEN** no `ts(6385)` or `any`-related hints for `jsonLd.ts` or consumers

### Requirement: Product pages use builders (product-detail-pages)
The system SHALL render product detail pages using `serviceJsonLd`, `videoJsonLd`, `faqPageJsonLd`, `breadcrumbJsonLd` instead of inline objects.

#### Scenario: Product page JSON-LD from builders
- **WHEN** building `/vermietung/ld-maui-28g3`
- **THEN** page's `<script type="application/ld+json">` tags contain output from builder functions, no inline object literals
