# FAQ Page

## ADDED Requirements

### Requirement: Themenseite `/faq` mit Themen-Gruppierung

Die Seite `src/pages/faq.astro` SHALL alle Einträge aus `src/data/faqs.json` nach Themen gruppieren (Allgemein & Buchung, Komplettpakete, Sound & PA-Anlagen, Licht & Effekte, Standorte & Lieferung, Weitere Fragen) und je Stadt die FAQs der Stadt zuordnen.

#### Scenario: Gruppierung nach Seiten-Zuordnung

- **WHEN** die Seite gebaut wird
- **THEN** ordnet `categoryOf` jeden FAQ über seine `pages`-IDs einer Kategorie zu (index → allgemein, vermietung → katalog, Paket-/Produkt-/Stadt-Slugs → jeweilige Kategorie) und leere Kategorien entfallen

#### Scenario: Inhaltsverzeichnis und Stadtgruppen

- **WHEN** die Seite gerendert wird
- **THEN** zeigt das Inhaltsverzeichnis die vorhandenen Themenabschnitte plus „Standorte & Lieferung" (falls städtische FAQs existieren), und jede Stadt mit FAQs hat einen eigenen Ankerabschnitt

### Requirement: FAQPage-JSON-LD mit allen Einträgen

`src/pages/faq.astro` SHALL inline ein `FAQPage`-JSON-LD mit **allen** FAQs (ungefiltert) ausgeben.

#### Scenario: Vollständiges Schema

- **WHEN** `/faq` gebaut wird
- **THEN** enthält das JSON-LD `mainEntity` mit einer `Question` inkl. `acceptedAnswer` pro Eintrag aus `faqs.json`

### Requirement: FAQ-Verlinkung

Die FAQ-Seite SHALL über den Footer erreichbar sein; die Navbar SHALL keinen FAQ-Eintrag führen (Vermeidung von Nav-Überladung).

#### Scenario: Footer-Link

- **WHEN** eine beliebige Seite gerendert wird
- **THEN** enthält der Footer einen Link auf `/faq`
- **AND** die Navbar-Links verweisen nicht auf `/faq`
