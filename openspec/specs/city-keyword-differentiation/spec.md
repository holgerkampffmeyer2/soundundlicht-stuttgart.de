# city-keyword-differentiation Specification

## Purpose
Jede der 21 City-Seiten erhält ein eigenes Primärkeyword und echten Unique Content, um Thin-Content- und Doorway-Bewertungen zu vermeiden.

## Requirements

### Requirement: [REQ-CITY-SEO-01] Eindeutiges Primärkeyword pro Stadt
The system SHALL assign exactly one distinct `primaryKeyword` per city entry. No city SHALL use a Stuttgart headterm owned by a technical landingpage as its H1.

#### Scenario: City page H1 uses its own keyword
- **WHEN** `/esslingen` is built
- **THEN** its H1 is `Musikanlage mieten Esslingen` and no other city page uses that H1

### Requirement: [REQ-CITY-SEO-02] Eindeutige SEO-Metadaten
The system SHALL render a distinct `<title>`, H1, meta description and canonical URL for every city page. The meta description SHALL be derived from `metaDescription` in `cities.json`.

#### Scenario: Meta description comes from city data
- **WHEN** `/stuttgart` is built
- **THEN** the meta description equals `metaDescription` of the Stuttgart city entry and differs from all other city pages

### Requirement: [REQ-CITY-SEO-03] Unique Content pro Stadt
Each city page SHALL contain city-specific prose in `heroDescription`, `heroDetails`, `einzelDescription`, `areasIntro` and `icoaIntro`. The shared boilerplate `einzelDescription` SHALL be removed.

#### Scenario: Two city pages differ in substance
- **WHEN** comparing `/kirchheim-unter-teck` and `/göppingen`
- **THEN** their hero prose, product rationale and FAQ answers are not the same text with only the city name exchanged

### Requirement: [REQ-CITY-SEO-04] Stadtbezogenes JSON-LD
The Service JSON-LD of each city page SHALL use `areaServed` with the city name instead of the global service area.

#### Scenario: Service area is city-specific
- **WHEN** inspecting JSON-LD on `/esslingen`
- **THEN** the Service node contains `areaServed` with `@type: "City"` and `name: "Esslingen"`

### Requirement: [REQ-CITY-SEO-05] Eindeutige FAQs pro Stadt
Each city page SHALL contain at least two page-scoped FAQs from `faqs.json` in addition to the global FAQ set.

#### Scenario: City FAQ appears only on its city
- **WHEN** visiting `/nürtingen`
- **THEN** the FAQ about Akku-Technik im Gemeinderaum is visible and not present on `/böblingen`
