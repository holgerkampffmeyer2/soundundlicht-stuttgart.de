# city-page-dynamic Specification

## Purpose
Dynamically generates city landing pages from a Content Collection with parameterized prose fields, reusable components, and centralized JSON-LD builders. Eliminates 21 near-duplicate manual page files (~3.9k LOC) while preserving all current content and SEO structure.

## Requirements

### Requirement: [REQ-CITY-01] Dynamic City Page Route
The system SHALL provide a dynamic route `src/pages/[city].astro` that generates a page for each entry in the `cities` Content Collection via `getStaticPaths()`.

#### Scenario: Build generates all city pages
- **WHEN** `pnpm run build` executes
- **THEN** `dist/<city-slug>.html` exists for all 21 cities in the `cities` collection

### Requirement: [REQ-CITY-02] Prosa Fields in Cities Collection
The system SHALL extend the `cities` Content Collection schema with optional prose fields: `heroTitle`, `heroDescription`, `heroDetails`, `einzelTitle`, `einzelDescription`, `areasIntro`, `contactDescription`. Each field SHALL be optional (`z.string().optional()`) with fallback defaults.

#### Scenario: City entry with custom prose
- **WHEN** a city entry in `cities.json` includes `heroTitle: "Custom Title"`
- **THEN** the generated page uses "Custom Title" in `CityHero` component

#### Scenario: City entry without optional prose uses defaults
- **WHEN** a city entry omits `heroDescription`
- **THEN** the generated page falls back to a default description derived from city name

### Requirement: [REQ-CITY-03] Reusable Component Composition
The dynamic page SHALL compose the page from existing reusable components: `CityHero`, `CityPackages`, `CitySteps`, `CityAreas`, `CityEinzeltechnik`, `FAQSection`, `ContactSection`, `Breadcrumb`, `Navbar`, `Footer`, `Layout`.

#### Scenario: Page renders all component sections
- **WHEN** visiting `/stuttgart`
- **THEN** page contains Hero, Packages, Steps, Areas, Einzeltechnik (if `einzelItems`), FAQ, Contact, Breadcrumb in correct order

### Requirement: [REQ-CITY-04] City-Specific JSON-LD via Builders
The page SHALL output JSON-LD using centralized builders: `breadcrumbJsonLd` (BreadcrumbList), `serviceJsonLd` (Service with `areaServed` = city), `faqPageJsonLd` (FAQPage from `getFaqsForPage(citySlug)`).

#### Scenario: JSON-LD includes city-specific Service
- **WHEN** visiting `/stuttgart`
- **THEN** page includes `<script type="application/ld+json">` with `@type: 'Service'`, `areaServed: { '@type': 'City', name: 'Stuttgart' }`

#### Scenario: JSON-LD includes FAQPage from filtered FAQs
- **WHEN** visiting `/stuttgart`
- **THEN** page includes `FAQPage` with `mainEntity` from `getFaqsForPage('stuttgart')`

### Requirement: [REQ-CITY-05] Breadcrumb Navigation
The page SHALL render a `Breadcrumb` component with segments: Home → City Name, and matching `BreadcrumbList` JSON-LD.

#### Scenario: Breadcrumb links and JSON-LD match
- **WHEN** visiting `/esslingen`
- **THEN** visible breadcrumb shows "Startseite / Esslingen"; JSON-LD `BreadcrumbList` has two `ListItem` entries with correct URLs

### Requirement: [REQ-CITY-06] Einzeltechnik Section Conditional
The `CityEinzeltechnik` component SHALL render only when `cityData.einzelItems` exists and has items; it SHALL display up to 3 items from `einzelItems` array mapped to product data.

#### Scenario: City with einzelItems shows section
- **WHEN** city has `einzelItems: ['jbl-partybox-300-320', 'kls-laser-bar']`
- **THEN** `CityEinzeltechnik` renders with those product cards

#### Scenario: City without einzelItems hides section
- **WHEN** city has no `einzelItems` or empty array
- **THEN** `CityEinzeltechnik` not rendered

### Requirement: [REQ-CITY-07] Areas Section with Custom Intro
The `CityAreas` component SHALL render with `areas` from city data and custom `intro` text from `areasIntro` field (fallback to default).

#### Scenario: Custom areas intro used
- **WHEN** city has `areasIntro: "Custom intro text"`
- **THEN** `CityAreas` receives and renders that text

### Requirement: [REQ-CITY-08] Contact Section with Custom Text
The `ContactSection` component SHALL render with custom `description` from `contactDescription` field and a distance line generated from `distance` and the city name.

#### Scenario: Distance line generated from distance
- **WHEN** a city has `distance: "ca. 30 km"`
- **THEN** `ContactSection` receives `Nur ca. 30 km von <city> – verkehrsgünstig an A8 / B27`

#### Scenario: Custom contact description used
- **WHEN** city has `contactDescription: "Custom contact text"`
- **THEN** `ContactSection` renders that text

### Requirement: [REQ-CITY-09] FAQ Filtering by City
The page SHALL filter FAQs via `getFaqsForPage(citySlug)` and pass to `FAQSection`.

#### Scenario: Only city-relevant FAQs shown
- **WHEN** city has `slug: 'stuttgart'`
- **THEN** `FAQSection` receives only FAQs where `pages` includes `'stuttgart'` or `'index'`
