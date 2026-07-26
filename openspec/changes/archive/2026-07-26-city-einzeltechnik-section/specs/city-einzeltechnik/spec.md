## ADDED Requirements

### Requirement: City pages SHALL display an Einzeltechnik section
Each city page SHALL render a section showcasing individual (non-package) equipment items that are configured for that specific city.

#### Scenario: Section renders with configured items
- **WHEN** a city page is built and `einzelItems` contains at least one valid product slug
- **THEN** a `CityEinzeltechnik` section is rendered between CityPackages and CitySteps with the configured products displayed as cards

#### Scenario: Section omitted when no items configured
- **WHEN** a city page is built and `einzelItems` is empty or absent in `cities.json`
- **THEN** no Einzeltechnik section is rendered on that city page

### Requirement: City data SHALL support individual item configuration
The `cities.json` schema SHALL accept an `einzelItems` array of product slug strings and optional `einzelTitle`/`einzelDescription` string fields per city entry.

#### Scenario: Valid city with individual items
- **WHEN** a city entry in `cities.json` contains `"einzelItems": ["jbl-partybox-300-320", "kls-laser-bar"]`
- **THEN** the city page renders cards for those two products in the Einzeltechnik section

#### Scenario: City without individual items fields
- **WHEN** a city entry in `cities.json` does not contain `einzelItems`
- **THEN** the section is omitted and no error occurs during build

### Requirement: Einzeltechnik cards SHALL use consistent product card design
Each product card in the Einzeltechnik section SHALL display: image (WebP with thumbnail srcset), title, description, price, features list, a "Merken" wishlist button, and a "Mehr Infos" link (if `detailPage` is present and not a hash-link).

#### Scenario: Product card with detail page
- **WHEN** a product has a `detailPage` value that does not start with `#`
- **THEN** the card includes a "Mehr Infos" button linking to that page

#### Scenario: Product card without detail page
- **WHEN** a product has no `detailPage` or it starts with `#`
- **THEN** the card shows only the "Merken" button, no "Mehr Infos" link

### Requirement: Section heading SHALL be configurable per city
The Einzeltechnik section heading and description text SHALL be configurable per city via `einzelTitle` and `einzelDescription` fields in `cities.json`.

#### Scenario: Custom heading per city
- **WHEN** `einzelTitle` is set to "Technik nach Wahl für" in a city entry
- **THEN** the section heading renders "Technik nach Wahl für <Stadtname>"

#### Scenario: Default heading when not configured
- **WHEN** `einzelTitle` is absent for a city entry
- **THEN** the section heading defaults to "Einzeltechnik für <Stadtname>"

### Requirement: Wishlist integration SHALL work in Einzeltechnik section
The "Merken" button in Einzeltechnik product cards SHALL dispatch the `add-to-wishlist` custom event with the product slug, consistent with existing wishlist behavior on `/vermietung/`.

#### Scenario: Adding item to wishlist from city page
- **WHEN** user clicks the "Merken" button on an Einzeltechnik product card
- **THEN** the `add-to-wishlist` event is dispatched and the item is added to localStorage

### Requirement: Maximum three items displayed
The Einzeltechnik section SHALL display a maximum of 3 product cards. If `einzelItems` contains more than 3 slugs, only the first 3 SHALL be rendered.

#### Scenario: More than 3 items configured
- **WHEN** `einzelItems` contains 5 product slugs
- **THEN** only the first 3 products are rendered as cards
