# faq-page Specification

## Purpose
Beschreibt die zentrale FAQ-Themenseite und die vollständige FAQPage-Struktur: alle Einträge aus `src/data/faqs.json` werden nach Themen und Städten gruppiert und mit ungefiltertem JSON-LD ausgegeben.

## Requirements

### Requirement: [REQ-FAQ-01] Themenseite `/faq` mit Themen-Gruppierung

Die Seite `src/pages/faq.astro` SHALL alle Einträge aus `src/data/faqs.json` nach Themen gruppieren (Allgemein & Buchung, Komplettpakete, Sound & PA-Anlagen, Licht & Effekte, Standorte & Lieferung, Weitere Fragen) und je Stadt die FAQs der Stadt zuordnen.

#### Scenario: Gruppierung nach Seiten-Zuordnung

- **WHEN** die Seite gebaut wird
- **THEN** ordnet `categoryOf` jeden FAQ über seine `pages`-IDs einer Kategorie zu (index → allgemein, vermietung → katalog, Paket-/Produkt-/Stadt-Slugs → jeweilige Kategorie) und leere Kategorien entfallen

#### Scenario: Inhaltsverzeichnis und Stadtgruppen

- **WHEN** die Seite gerendert wird
- **THEN** zeigt das Inhaltsverzeichnis die vorhandenen Themenabschnitte plus „Standorte & Lieferung" (falls städtische FAQs existieren), und jede Stadt mit FAQs hat einen eigenen Ankerabschnitt

### Requirement: [REQ-FAQ-02] FAQPage-JSON-LD mit allen Einträgen

`src/pages/faq.astro` SHALL inline ein `FAQPage`-JSON-LD mit **allen** FAQs (ungefiltert) ausgeben.

#### Scenario: Vollständiges Schema

- **WHEN** `/faq` gebaut wird
- **THEN** enthält das JSON-LD `mainEntity` mit einer `Question` inkl. `acceptedAnswer` pro Eintrag aus `faqs.json`

### Requirement: [REQ-FAQ-03] Tag-basierte FAQ-Filterung auf Produktseiten

`getFaqsForPage()` SHALL FAQs über `tags` und die Seitentags in `src/lib/faqUtils.ts` auswählen; `index` SHALL nur noch für die Startseite gelten.

#### Scenario: Globale FAQs

- **WHEN** `getFaqsForPage()` für eine beliebige Seite aufgerufen wird
- **THEN** sind alle FAQs mit `tags: ["global"]` enthalten

#### Scenario: Topic-Tags

- **WHEN** eine Seite einen der Tags `jbl`, `ld`, `licht` oder `nebel` trägt
- **THEN** sind FAQs mit demselben Tag enthalten, unabhängig von `pages`

#### Scenario: Falsche Seiten-Zuordnung

- **WHEN** eine FAQ einen Topic-Tag trägt und die Seite einen anderen Topic-Tag trägt
- **THEN** wird die FAQ auch bei einem `pages`-Eintrag nicht ausgegeben

#### Scenario: Taglose Seiten

- **WHEN** die Seite keine Topic-Tags trägt (Startseite, `/vermietung`, Städte, unbekannte Seiten)
- **THEN** gelten weiterhin die expliziten `pages`-Zuordnungen

### Requirement: [REQ-FAQ-04] Barrierearme FAQ-Darstellung mit SVG-Icons

`src/pages/faq.astro` SHALL FAQ-Symbolik als SVG-Icons aus `src/components/Icon.astro` darstellen und die Abschnitte über theme-aware Akzentfarben unterscheidbar machen; CSS SHALL keine doppelten Aufklapp-Indikatoren oder kontrastschwachen Fließtext erzeugen.

#### Scenario: SVG statt Emoji

- **WHEN** `/faq` gerendert wird
- **THEN** enthalten Themen-, Fragen- und Stadtüberschriften keine Emoji-Zeichen, und alle dekorativen Symbole sind `aria-hidden="true"`-SVGs aus der Icon-Komponente

#### Scenario: Theme-Akzente und Lesbarkeit

- **WHEN** ein Theme aktiv ist
- **THEN** nutzen Inhaltsverzeichnis, Abschnittsköpfe und FAQ-Karten die Theme-Tokens `--color-accent`, `--color-primary` und deren Mischungen, während Antworttext und Stadtfragen `--color-text` verwenden

#### Scenario: Aufklapp-Indikator

- **WHEN** eine FAQ geöffnet oder geschlossen wird
- **THEN** zeigt jede `summary` genau einen Chevron-SVG-Indikator; es gibt keinen CSS-`content`-Indikator (`+`/`?`/`📍`) mehr

### Requirement: [REQ-FAQ-05] Einheitliche FAQ-Darstellung auf allen Seiten

Alle FAQ-Blöcke SHALL dieselbe SVG-/Karten-Darstellung wie `/faq` nutzen; FAQ-Abschnitte SHALL eine eigene `h2` besitzen oder als `div` ohne Überschrift gerendert werden.

#### Scenario: Gemeinsame FAQ-Komponente

- **WHEN** eine Seite FAQs rendert
- **THEN** verwendet sie `FAQSection.astro` mit `.faq-item`, `.faq-question-icon`, `.faq-chevron` und `.faq-answer`, und es gibt kein `.faq-details`/`.faq-icon` mehr

#### Scenario: Abschnittsüberschriften

- **WHEN** ein FAQ-Abschnitt als `section` gerendert wird
- **THEN** enthält er eine eigene `h2`, einschließlich des Inhaltsverzeichnisses auf `/faq`

### Requirement: FAQ-Verlinkung

Die FAQ-Seite SHALL über den Footer erreichbar sein; die Navbar SHALL keinen FAQ-Eintrag führen (Vermeidung von Nav-Überladung).

#### Scenario: Footer-Link

- **WHEN** eine beliebige Seite gerendert wird
- **THEN** enthält der Footer einen Link auf `/faq`
- **AND** die Navbar-Links verweisen nicht auf `/faq`
