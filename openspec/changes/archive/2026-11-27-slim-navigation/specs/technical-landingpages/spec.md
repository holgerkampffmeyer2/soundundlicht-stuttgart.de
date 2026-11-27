# Spec Delta

## MODIFIED Requirements

### Requirement: [REQ-TECHLP-06] Navigation und aktive Markierung

The main navigation SHALL offer four Vermietung entry links (`/vermietung`, `/vermietung/pakete`, `/vermietung#sound`, `/vermietung#licht`) in both desktop and mobile views. The six technical landingpages SHALL remain discoverable through the footer link list. On `/vermietung*` the Vermietung parent link SHALL be marked active; `/vermietung/pakete` SHALL additionally be marked active when it is the current page.

#### Scenario: Vermietung entry links are present
- **WHEN** a visitor opens the desktop or mobile Vermietung navigation
- **THEN** links to `/vermietung`, `/vermietung/pakete`, `/vermietung#sound` and `/vermietung#licht` are present
- **THEN** no links to individual technical landingpages are present in the dropdown

#### Scenario: Technical landingpages are discoverable
- **WHEN** any page is rendered
- **THEN** the footer contains links to `/vermietung/pakete`, `/vermietung/musikanlage`, `/vermietung/lautsprecher`, `/vermietung/pa-anlage`, `/vermietung/dj-equipment` and `/vermietung/partylicht`

#### Scenario: Active navigation state
- **WHEN** a visitor opens `/vermietung/pa-anlage`
- **THEN** the Vermietung parent link in the main navigation has the active class
