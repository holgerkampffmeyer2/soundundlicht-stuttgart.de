# nebelmaschinen-page Specification

## Purpose
Bündelt die verfügbaren Nebelmaschinen (Stairville AF-150, Uking 1200W) auf der eigenen Kategorieseite `/vermietung/nebelmaschinen` mit Entscheidungshilfe, verankerten Geräteabschnitten und FAQ.

## Requirements

### Requirement: Es gibt eine Nebelmaschinen-Kategorieseite

Die Seite `/vermietung/nebelmaschinen` SHALL beide verfügbaren Nebelmaschinen in je einem verankerbaren Abschnitt bündeln und eine Entscheidungshilfe („Welche Nebelmaschine passt zu dir?") bereitstellen.

#### Scenario: Beide Geräte sind verankert

- **WHEN** die Nebelmaschinen-Seite gerendert wird
- **THEN** existieren die Anker `#af-150` (Stairville AF-150) und `#nebel-maschine` (Uking 1200W)

#### Scenario: Anker lösen keine tote Verlinkung aus

- **WHEN** ein Produkt auf `#af-150` bzw. `#nebel-maschine` verweist
- **THEN** springt der Link zum passenden Abschnitt (scroll-margin berücksichtigt)

### Requirement: AF-150 ist ein eigenständiges Mietgerät

Die Stairville AF-150 SHALL als eigenes Produkt mit eigener Produktkarte auf `/vermietung` und eigener `detailPage` verfügbar sein.

#### Scenario: AF-150 Produktkarte

- **WHEN** die Übersicht `/vermietung` gerendert wird
- **THEN** zeigt die AF-150-Karte „Mehr Infos" mit Ziel `/vermietung/nebelmaschinen#af-150`

### Requirement: Kein Duplicate Content durch Variantenabschnitt

Die Nebelmaschinen-Inhalte SHALL nicht doppelt als Variantenabschnitt auf `/vermietung/led-bossfx-nebelmaschine` geführt werden; stattdessen SHALL die BossFX-Seite auf die Nebelmaschinen-Seite verlinken.

#### Scenario: BossFX-Seite verlinkt zur Nebel-Seite

- **WHEN** die Seite `/vermietung/led-bossfx-nebelmaschine` gerendert wird
- **THEN** enthält sie einen internen Link auf `/vermietung/nebelmaschinen` und keinen eigenen `#nebel-maschine`-Abschnitt mehr

### Requirement: FAQs der Nebelmaschinen-Seite

Die Nebelmaschinen-Seite SHALL mindestens drei seiten-spezifische FAQs enthalten und ein gültiges `FAQPage`-Structured-Data ausgeben.

#### Scenario: Eindeutige FAQs

- **WHEN** die Seite gerendert wird
- **THEN** gibt `getFaqsForPage('nebelmaschinen')` mindestens drei FAQs zurück und das `FAQPage`-JSON-LD wird ausgegeben

### Requirement: Paket-Bestandteile verlinken die AF-150 auf die Nebel-Seite

In den Paketseiten SHALL der Bestandteil „Stairville AF-150 Nebelmaschine" auf `/vermietung/nebelmaschinen#af-150` verweisen.

#### Scenario: Paket-AF-150-Link

- **WHEN** eine Paketseite (Party-, Veranstaltungs- oder DJ-Paket) gerendert wird
- **THEN** zeigt der AF-150-Bestandteil-Link auf `/vermietung/nebelmaschinen#af-150`
