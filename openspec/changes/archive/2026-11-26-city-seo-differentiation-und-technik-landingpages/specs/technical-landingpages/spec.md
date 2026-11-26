# Spec Delta

## Purpose

Technische Landingpages bündeln die Stuttgart-Headterms und verhindern Kannibalisierung mit den 21 Stadtseiten.

## ADDED Requirements

### Requirement: [REQ-TECHLP-01] Sechs technische Landingpages
The system SHALL provide `/vermietung/pakete`, `/vermietung/musikanlage`, `/vermietung/lautsprecher`, `/vermietung/pa-anlage`, `/vermietung/dj-equipment` and `/vermietung/partylicht`. Each page SHALL use its keyword in title, H1 and first paragraph.

#### Scenario: Headterm page is generated
- **WHEN** `pnpm run build:full` executes
- **THEN** `dist/vermietung/lautsprecher.html` exists with title `Lautsprecher mieten in Stuttgart | Sound & Licht Stuttgart`

### Requirement: [REQ-TECHLP-02] Kein Product-Schema
Technical landingpages SHALL emit `Service`, `BreadcrumbList` and `FAQPage` JSON-LD, but never `Product`.

#### Scenario: JSON-LD types on a technical page
- **WHEN** inspecting `/vermietung/pa-anlage`
- **THEN** JSON-LD contains Service, BreadcrumbList and FAQPage and does not contain Product

### Requirement: [REQ-TECHLP-03] Preisdarstellung
Visible prices SHALL use the text format `ab XX€`. Numeric values SHALL only be used in JSON-LD `priceSpecification`.

#### Scenario: Price text on technical page
- **WHEN** visiting `/vermietung/musikanlage`
- **THEN** product prices are displayed as `ab XX€` and not as bare numbers

### Requirement: [REQ-TECHLP-04] Musikbox-Synonym
The system SHALL NOT create a dedicated Musikbox URL. The phrase `Musikbox mieten` SHALL appear on `jbl-partybox-300-320` in title, intro and FAQ.

#### Scenario: Musikbox query maps to Partybox page
- **WHEN** visiting `/vermietung/jbl-partybox-300-320`
- **THEN** the page contains `Musikbox mieten` and no separate `/vermietung/musikbox` page exists

### Requirement: [REQ-TECHLP-05] Artefakte
All six technical landingpages SHALL be present in sitemap, `urllist.txt`, RSS and `llms.txt`.

#### Scenario: Sitemap and urllist include new pages
- **WHEN** `pnpm run build:full` completes
- **THEN** sitemap and urllist contain all six new clean URLs without `.html` suffix
