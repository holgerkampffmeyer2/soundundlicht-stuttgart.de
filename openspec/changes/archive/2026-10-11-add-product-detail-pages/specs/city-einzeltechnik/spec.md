# Spec Delta

## MODIFIED Requirements

### Requirement: Einzeltechnik cards SHALL use consistent product card design
Each product card in the Einzeltechnik section SHALL display: image (WebP with thumbnail srcset), title, description, price, features list, a "Merken" wishlist button, and a "Details" link whenever `detailPage` is present (including anchor/hash targets such as `/vermietung/<category>#<slug>`).

#### Scenario: Product card with detail page
- **WHEN** a product has a non-empty `detailPage` value (a direct route or a route with an anchor)
- **THEN** the card includes a "Details" link to that target

#### Scenario: Product card without detail page
- **WHEN** a product has no `detailPage`
- **THEN** the card shows only the "Merken" button, no "Details" link
