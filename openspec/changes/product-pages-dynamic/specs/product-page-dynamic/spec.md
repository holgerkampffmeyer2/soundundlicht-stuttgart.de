# Spec Delta

## Purpose

Dynamically generates product detail pages from Content Collections with all variable data (Specs, Includes, Events, Gallery, Video) stored in YAML. Eliminates 16 near-duplicate manual page files (~3.9k LOC) while preserving all current content, SEO, and JSON-LD structure.

## ADDED Requirements

### Requirement: Dynamic Product Page Route
The system SHALL provide a dynamic route `src/pages/vermietung/[slug].astro` that generates a page for each entry in the `products` Content Collection via `getStaticPaths()`.

#### Scenario: Build generates all product pages
- **WHEN** `pnpm run build` executes
- **THEN** `dist/vermietung/<slug>.html` exists for all products with `detailPage` not containing '#'

### Requirement: Extended Product Schema
The system SHALL extend the `products` Content Collection schema with optional fields: `specs` (Record<string,string>), `includes` (string[]), `events` (EventItem[]), `gallery` (string[]), `videoId` (string), `videoThumbnail` (string), `videoTitle` (string), `seoDescription` (string). Each field SHALL be optional.

#### Scenario: Product with full specs/events/gallery/video
- **WHEN** product YAML includes `specs`, `events`, `gallery`, `videoId`
- **THEN** generated page renders Specs table, Events cards, Gallery images, Video embed

#### Scenario: Product without optional fields renders gracefully
- **WHEN** product YAML omits `events` and `videoId`
- **THEN** generated page omits Events section and Video embed without error

### Requirement: Reusable ProductLayout Composition
The dynamic page SHALL render `ProductLayout` with all props derived from Collection Entry: `product`, `pageTitle`, `description`, `image`, `preloadImage`, `galleryImages`, `jsonLd`, `breadcrumbSegments`, and slotted sections (`hero`, `RentalPricing`, `TechnicalSpecs`, `RentalIncludes`, `ExampleEvents`, FAQ).

#### Scenario: All sections rendered when data present
- **WHEN** product has `specs`, `includes`, `events`, `gallery`, `faqs`
- **THEN** page renders Specs table, Includes list, Events cards, Gallery, FAQ accordion

### Requirement: JSON-LD via Builders
The page SHALL output JSON-LD using centralized builders: `serviceJsonLd` (Service with `offers`), `videoJsonLd` (VideoObject, conditional), `faqPageJsonLd` (FAQPage), `breadcrumbJsonLd` (BreadcrumbList).

#### Scenario: Service JSON-LD with offers
- **WHEN** product page renders
- **THEN** `<script type="application/ld+json">` contains `Service` with `offers` → `Offer` → `UnitPriceSpecification.price` = `priceValue`

#### Scenario: VideoObject JSON-LD conditional
- **WHEN** product has `videoId`
- **THEN** page includes `VideoObject` JSON-LD with `contentUrl`, `embedUrl`, `thumbnailUrl`

#### Scenario: FAQPage from filtered FAQs
- **WHEN** product page renders
- **THEN** `FAQPage` JSON-LD from `faqPageJsonLd(getFaqsForPage(slug))`

### Requirement: Breadcrumb Navigation
The page SHALL render `Breadcrumb` with segments: Home → Vermietung → Product Title, and matching `BreadcrumbList` JSON-LD.

#### Scenario: Breadcrumb and JSON-LD match
- **WHEN** visiting `/vermietung/ld-maui-28g3`
- **THEN** breadcrumb shows "Startseite / Vermietung / LD Maui 28 G3"; JSON-LD `BreadcrumbList` has three `ListItem` entries

### Requirement: Gallery Images
The page SHALL pass `galleryImages` array to `ProductLayout` for gallery section. Images from `gallery` field in YAML (fallback to single `image`).

#### Scenario: Gallery renders multiple images
- **WHEN** product has `gallery: ['img1.webp', 'img2.webp']`
- **THEN** gallery section displays both images

### Requirement: Video Embed
The page SHALL render YouTube embed in hero slot when `videoId` present, using `videoThumbnail` as poster, `videoTitle` as title.

#### Scenario: Video embed renders
- **WHEN** product has `videoId: 'vE5PQ7IUdrg'`
- **THEN** hero section contains `<iframe src="https://www.youtube-nocookie.com/embed/vE5PQ7IUdrg">`

## ADDED Requirements (Modified Capabilities)

### Requirement: Dynamic Route Replaces Manual Pages (product-detail-pages)
The system SHALL generate product pages via dynamic route instead of 16 manual `.astro` files. All 16 products SHALL have equivalent content, SEO, JSON-LD, Specs, Includes, Events, Gallery, Video output.

#### Scenario: Build output matches manual pages
- **WHEN** comparing `dist/vermietung/ld-maui-28g3.html` (dynamic) vs. previous manual page
- **THEN** title, hero, specs, includes, events, gallery, video, FAQ, JSON-LD are equivalent

### Requirement: Eliminate `any` in JSON-LD Mapping (typescript-any-cleanup)
The dynamic page SHALL use typed `ProductData`, `FaqEntry` for JSON-LD mapping, no `any`.

#### Scenario: TypeScript check passes
- **WHEN** `pnpm exec astro check`
- **THEN** no `any`-related hints for `[slug].astro`

### Requirement: JSON-LD Builders Used (jsonld-builders)
The page SHALL use `serviceJsonLd`, `videoJsonLd`, `faqPageJsonLd`, `breadcrumbJsonLd` from `jsonld-builders` instead of inline objects.

#### Scenario: JSON-LD from builders
- **WHEN** page renders
- **THEN** all `<script type="application/ld+json">` tags contain output from builder functions

## REMOVED Requirements

### Requirement: 16 Manual Product Page Files
**Reason**: Replaced by single dynamic route `[slug].astro` with data-driven content.
**Migration**: Delete `src/pages/vermietung/<slug>.astro` (16 files); dynamic route generates equivalent output.
