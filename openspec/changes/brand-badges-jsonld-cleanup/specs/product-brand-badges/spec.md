# Spec Delta

## Purpose

Zeigt Hersteller von Mietgeräten als textbasierte Badges auf Produktdetail- und Kategorieseiten an, um Transparenz zu schaffen ohne Logo-Lizenz-Risiken (z. B. JBL/Harman). Badges sind rein informativ und werden nicht ins JSON-LD-Schema übernommen.

## ADDED Requirements

### Requirement: Markenbadges im Hero von Detailseiten
Auf Produktdetailseiten SHALL eine Reihe von Hersteller-Pills im Hero-Bereich neben dem Preis und dem „Inkl. Kabel & Einweisung“-Badge erscheinen. Jede Pille zeigt exakt einen Markennamen (z. B. „JBL“, „LD Systems“). Bei fehlendem `brands`-Array oder leerem Array SHALL kein Badge gerendert werden.

#### Scenario: Einzelprodukt mit einer Marke
- **WHEN** eine Detailseite mit `product.brands = ["JBL"]` geladen wird
- **THEN** im Hero-Flex-Container erscheint nach dem Plug-Badge eine Pill mit dem Text „JBL“

#### Scenario: Paket mit mehreren Marken
- **WHEN** eine Paket-Detailseite mit `product.brands = ["JBL", "Eurolite", "Uking"]` geladen wird
- **THEN** im Hero erscheinen drei Pills nebeneinander/umbrechend mit den Texten „JBL“, „Eurolite“, „Uking“

#### Scenario: Produkt ohne Marke
- **WHEN** eine Detailseite ohne `brands`-Feld oder mit `brands: []` geladen wird
- **THEN** keine Pille im Hero gerendert; Layout bleibt unverändert

### Requirement: Markenbadges auf Kategorieseiten
Auf Kategorieseiten SHALL Herstellerbadges an zwei Stellen erscheinen: (1) im Hero aggregiert über alle Produkte der Kategorie (nur eindeutige Marken), (2) in jedem Produktabschnitt/Karte der jeweiligen Produktmarke.

#### Scenario: ICOA-Kategorie im Hero
- **WHEN** `/vermietung/ld-systems-icoa-series` geladen wird und die Produkte `["LD Systems", "Gravity"]` enthalten
- **THEN** im Hero erscheinen Pills „LD Systems“ und „Gravity“

#### Scenario: Produktabschnitt mit Marke
- **WHEN** in der ICOA-Seite der Abschnitt „LD Systems ICOA 12 A“ geladen wird mit `brands = ["LD Systems"]`
- **THEN** in diesem Abschnitt (neben Preis) eine Pill „LD Systems“ angezeigt

#### Scenario: Kategorie-Produktkarte ohne Marke
- **WHEN** eine Produktkarte in `CategoryLayout` ohne `brands`-Array gerendert wird
- **THEN** keine Pill in der Karte; Kartenhöhe unverändert

### Requirement: Markenpflege ausschließlich in Content Collections
Markennamen SHALL ausschließlich über das optionale `brands: string[]`-Feld in den Produkt-YAMLs (`src/content/products/*.yml`) gepflegt werden. Keine hartcodierten Mappings im Code.

#### Scenario: YAML mit Marken
- **WHEN** ein Produkt-YAML `brands: ["JBL", "Yamaha"]` enthält
- **THEN** die Badges auf allen Seiten, die dieses Produkt rendern, zeigen genau diese beiden Marken

### Requirement: Keine Logos, keine Schema-Erweiterung
Badges SHALL rein textbasiert sein (keine Bild-Logos). Es SHALL KEIN `brand`-Property in JSON-LD (`Service`, `Product`, `VideoObject`) eingefügt werden.

#### Scenario: JSON-LD unverändert
- **WHEN** eine Produktseite mit Badges gerendert wird
- **THEN** das `Service`-Schema enthält kein `brand`-Feld
