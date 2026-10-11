# Dead Code Removal & Docs

## ADDED Requirements

### Requirement: Kein toter Import im ContactForm

`src/components/ContactForm.astro` SHALL keinen ungenutzten Import `getItemCount` aus `../../lib/merklisteStore` enthalten.

#### Scenario: Import ist entfernt

- **WHEN** `src/components/ContactForm.astro` gelesen wird
- **THEN** existiert kein `import { getItemCount }`-Statement

### Requirement: Kein toter Produkt-Fetch in thankyou

`src/pages/thankyou.astro` SHALL keine ungenutzte Verwendung von `getCollection('products')` samt `allProducts` und `productsBySlug` enthalten.

#### Scenario: Server-Fetch ist entfernt

- **WHEN** `src/pages/thankyou.astro` gelesen wird
- **THEN** existiert weder der `getCollection('products')`-Import noch `allProducts` oder `productsBySlug`

### Requirement: AGENTS.md referenziert nur existierende Store-Funktionen

`AGENTS.md` SHALL `updateItemQuantity(slug, qty)` nicht mehr in der Funktionsliste der Merkliste aufführen, da diese Funktion im Store nicht existiert.

#### Scenario: Referenz ist entfernt

- **WHEN** `AGENTS.md` geprüft wird
- **THEN** enthält die Merkliste-Funktionsliste kein `updateItemQuantity`