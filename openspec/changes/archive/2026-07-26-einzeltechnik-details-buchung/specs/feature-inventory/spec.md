## MODIFIED Requirements

### Requirement: Product Content Collections and Catalog
The platform SHALL manage rental products via Astro content collections (`src/content/products/*.yml`) with 21 items.

#### Scenario: Product catalog and detail pages
- **WHEN** users browse `/vermietung/` or product detail pages (`/vermietung/<slug>/`)
- **THEN** products display pricing ("ab XX€"), features, descriptions, and "Mehr Infos" buttons for products with dedicated detail pages

#### Scenario: Einzeltechnik section on city pages
- **WHEN** a city page renders the Einzeltechnik section with individual equipment items
- **THEN** each product card with a real detail page (no `#` anchor) SHALL display a "Details & Buchung ↗" link styled as `btn-primary`, matching the visual pattern used in the Komplettpakete section
