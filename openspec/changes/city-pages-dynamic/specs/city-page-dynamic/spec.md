# Spec Delta

## Purpose

Dynamically generates city landing pages from a Content Collection with parameterized prose fields, reusable components, and centralized JSON-LD builders. Eliminates 20 near-duplicate manual page files (~3.9k LOC) while preserving all current content and SEO structure.

## ADDED Requirements

### Requirement: Dynamic City Page Route
The system SHALL provide a dynamic route `src/pages/[city].astro` that generates a page for each entry in the `cities` Content Collection via `getStaticPaths()`.

#### Scenario: Build generates all city pages
- **WHEN** `pnpm run build` executes
- **THEN** `dist/<city-slug>.html` exists for all 20 cities in the `cities` collection

### Requirement: Prosa Fields in Cities Collection
The system SHALL extend the `cities` Content Collection schema with optional prose fields: `heroTitle`, `heroDescription`, `heroDetails`, `einzelTitle`, `einzelDescription`, `areasIntro`, `contactDescription`, `distanceText`, `travelTimeText`. Each field SHALL be optional (`z.string().optional()`) with fallback defaults.

#### Scenario: City entry with custom prose
- **WHEN** a city entry in `cities.json` includes `heroTitle: "Custom Title"`
- **THEN** the generated page uses "Custom Title" in `CityHero` component

#### Scenario: City entry without optional prose uses defaults
- **WHEN** a city entry omits `heroDescription`
- **THEN** the generated page falls back to a default description derived from city name

### Requirement: Reusable Component Composition
The dynamic page SHALL compose the page from existing reusable components: `CityHero`, `CityPackages`, `CitySteps`, `CityAreas`, `CityEinzeltechnik`, `FAQSection`, `ContactSection`, `Breadcrumb`, `Navbar`, `Footer`, `Layout`.

#### Scenario: Page renders all component sections
- **WHEN** visiting `/stuttgart`
- **THEN** page contains Hero, Packages, Steps, Areas, Einzeltechnik (if `einzelItems`), FAQ, Contact, Breadcrumb in correct order

### Requirement: City-Specific JSON-LD via Builders
The page SHALL output JSON-LD using centralized builders: `breadcrumbJsonLd` (BreadcrumbList), `serviceJsonLd` (Service with `areaServed` = city), `faqPageJsonLd` (FAQPage from `getFaqsForPage(citySlug)`).

#### Scenario: JSON-LD includes city-specific Service
- **WHEN** visiting `/stuttgart`
- **THEN** page includes `<script type="application/ld+json">` with `@type: 'Service'`, `areaServed: { '@type': 'City', name: 'Stuttgart' }`

#### Scenario: JSON-LD includes FAQPage from filtered FAQs
- **WHEN** visiting `/stuttgart`
- **THEN** page includes `FAQPage` with `mainEntity` from `getFaqsForPage('stuttgart')`

### Requirement: Breadcrumb Navigation
The page SHALL render a `Breadcrumb` component with segments: Home → City Name, and matching `BreadcrumbList` JSON-LD.

#### Scenario: Breadcrumb links and JSON-LD match
- **WHEN** visiting `/esslingen`
- **THEN** visible breadcrumb shows "Startseite / Esslingen"; JSON-LD `BreadcrumbList` has two `ListItem` entries with correct URLs

### Requirement: Einzeltechnik Section Conditional
The `CityEinzeltechnik` component SHALL render only when `cityData.einzelItems` exists and has items; it SHALL display up to 3 items from `einzelItems` array mapped to product data.

#### Scenario: City with einzelItems shows section
- **WHEN** city has `einzelItems: ['jbl-partybox-300-320', 'kls-laser-bar']`
- **THEN** `CityEinzeltechnik` renders with those product cards

#### Scenario: City without einzelItems hides section
- **WHEN** city has no `einzelItems` or empty array
- **THEN** `CityEinzeltechnik` not rendered

### Requirement: Areas Section with Custom Intro
The `CityAreas` component SHALL render with `areas` from city data and custom `intro` text from `areasIntro` field (fallback to default).

#### Scenario: Custom areas intro used
- **WHEN** city has `areasIntro: "Custom intro text"`
- **THEN** `CityAreas` receives and renders that text

### Requirement: Contact Section with Custom Text
The `ContactSection` component SHALL render with custom `description` from `contactDescription` field and `distanceText` from `distanceText` field (fallbacks to defaults).

#### Scenario: Custom contact description used
- **WHEN** city has `contactDescription: "Custom contact text"`
- **THEN** `ContactSection` renders that text

### Requirement: FAQ Filtering by City
The page SHALL filter FAQs via `getFaqsForPage(citySlug)` and pass to `FAQSection`.

#### Scenario: Only city-relevant FAQs shown
- **WHEN** city has `slug: 'stuttgart'`
- **THEN** `FAQSection` receives only FAQs where `pages` includes `'stuttgart'` or `'index'`

## ADDED Requirements (Modified Capabilities)

### Requirement: Dynamic Route Replaces Manual Pages (feature-inventory: Geographic City Pages)
The system SHALL generate city pages via dynamic route instead of 20 manual `.astro` files. All 20 cities SHALL have equivalent content, SEO, and JSON-LD output.

#### Scenario: Build output matches manual pages
- **WHEN** comparing `dist/stuttgart.html` (dynamic) vs. previous manual page
- **THEN** title, meta description, hero content, packages, FAQ, contact, JSON-LD are equivalent

### Requirement: Eliminate `any` in FAQ Mapping (typescript-any-cleanup)
The dynamic page SHALL use typed `FaqEntry` from `faqUtils` for FAQ JSON-LD mapping, no `any`.

#### Scenario: TypeScript check passes without `any`
- **WHEN** `pnpm exec astro check`
- **THEN** no `any`-related hints for `[city].astro`

### Requirement: JSON-LD Builders Used (product-detail-pages / jsonld-builders)
The page SHALL use `breadcrumbJsonLd`, `serviceJsonLd`, `faqPageJsonLd` from `jsonld-builders` instead of inline objects.

#### Scenario: JSON-LD from builders
- **WHEN** page renders
- **THEN** all `<script type="application/ld+json">` tags contain output from builder functions

## REMOVED Requirements

### Requirement: 20 Manual City Page Files
**Reason**: Replaced by single dynamic route `[city].astro` with data-driven content.
**Migration**: Delete `src/pages/<city>.astro` (20 files); dynamic route generates equivalent output.
