## ADDED Requirements

### Requirement: Feature Inventory Documentation
The system SHALL document and specify all features of the current implementation of the Sound & Licht Stuttgart event technology rental platform.

#### Scenario: Verify core architecture features
- **WHEN** the project is inspected
- **THEN** it confirms Astro 7.x static site generation, Tailwind CSS 4.x styling, and dark theme support

#### Scenario: Verify content collection features
- **WHEN** content collections are accessed
- **THEN** products (YAML collections), FAQs (JSON), and cities (JSON) are loaded and rendered correctly

#### Scenario: Verify Pagefind search features
- **WHEN** a user searches for equipment using the search bar
- **THEN** Pagefind indexes and returns results with debounced input, keyboard navigation, and catalog matching

#### Scenario: Verify Merkliste wishlist features
- **WHEN** a user interacts with the wishlist store
- **THEN** items can be added, removed, updated in quantity via localStorage (`sls_merkliste`), displayed in the wishlist drawer, and used to prefill contact inquiries

#### Scenario: Verify SEO and IndexNow features
- **WHEN** pages are generated or submitted
- **THEN** appropriate JSON-LD structured data is included per page type and URLs can be submitted via IndexNow
