# icoa-pa-pakete Specification

## Purpose
Erweitert den Verleihkatalog um die LD-Systems-ICOA-PA-Linie mit drei Paketgrößen und Einzelmiete von Top und Sub. Zubehör wird wie Kabel behandelt und nur innerhalb der Pakete ausgewiesen. Die ehemalige Bühnen-Paket-Seite leitet auf das Party-Paket XL um.

## Requirements

### Requirement: [REQ-ICOA-01] Drei ICOA-Pakete mit definiertem Inhalt und Preis

Der Katalog SHALL drei ICOA-Pakete mit definiertem Inhalt und Preis anbieten: Club-Paket, Party-Paket XL und Top-Paar. Alle Preise SHALL als „ab XX€ / Tag" dargestellt werden. Die ehemalige Bühnen-Paket-URL SHALL auf das Party-Paket XL weiterleiten.

#### Scenario: Club-Paket

- **WHEN** das Club-Paket angezeigt wird
- **THEN** enthält es 2x ICOA 12 A, 2x ICOA SUB 15 A, 2x Distanzstange und Kabel – ab 150€/Tag

#### Scenario: Party-Paket XL

- **WHEN** das Party-Paket XL angezeigt wird
- **THEN** enthält es 2x ICOA 12 A, 1x ICOA SUB 15 A, 1x Distanzstange, 1x Stativ und Kabel – ab 130€/Tag

#### Scenario: Top-Paar

- **WHEN** das Top-Paar angezeigt wird
- **THEN** enthält es 2x ICOA 12 A, 2x Stative und Kabel – ab 100€/Tag

#### Scenario: Paketübersicht

- **WHEN** `/vermietung` oder die Startseite gerendert wird
- **THEN** erscheinen alle drei ICOA-Pakete mit Preis, Kurzbeschreibung und Link zur Detailseite

#### Scenario: Paketinhalt

- **WHEN** eine Paket-Detailseite geöffnet wird
- **THEN** sind alle enthaltenen Geräte und das Zubehör aufgeführt

### Requirement: [REQ-ICOA-02] Einzelmiete von ICOA 12 A und ICOA SUB 15 A

Der Katalog SHALL das ICOA 12 A für ab 50€/Tag und das ICOA SUB 15 A für ab 60€/Tag einzeln führen. Beide Produkte SHALL auf eine gemeinsame Systemseite mit Ankern verlinken.

#### Scenario: Einzelprodukt im Katalog

- **WHEN** der Sound-Bereich auf `/vermietung` gerendert wird
- **THEN** erscheinen ICOA 12 A und ICOA SUB 15 A als einzelne Karten mit Link zur Systemseite

#### Scenario: Ankerziel

- **WHEN** die Karte „ICOA 12 A" geöffnet wird
- **THEN** führt der Link zu `/vermietung/ld-systems-icoa-series#ld-icoa-12-a`

### Requirement: [REQ-ICOA-03] Zubehör ist kein Einzelgerät

Distanzstangen, Dreibein-Lautsprecherstative und Kabel SHALL nur als Paketbestandteil oder Zubehör auf der Systemseite genannt werden. Für sie SHALL kein eigener Katalog-Eintrag und keine eigene Detailseite angelegt werden.

#### Scenario: Kein Zubehör-Einzelprodukt

- **WHEN** die Products-Collection geladen wird
- **THEN** existieren keine Produkt-Einträge für Distanzstangen, Stative oder Kabel

### Requirement: [REQ-ICOA-04] Eigene Detailseiten mit Entscheidungsinhalt

Jede neue Paketseite SHALL mindestens ein eigenständiges Intro, Highlights, Preis/Kaution, Paketinhalt, Beispielanwendungen und mindestens drei eigene FAQs enthalten. Die Systemseite SHALL Top, Sub und Zubehör mit eigenen Ankerabschnitten, technischen Daten und einer Entscheidungshilfe darstellen.

#### Scenario: Eigene FAQs

- **WHEN** eine neue Seite gerendert wird
- **THEN** enthält sie mindestens drei FAQs, die über ihre `pages`-Zuordnung ausschließlich dieser Seite zugeordnet sind

#### Scenario: Anwendungen

- **WHEN** eine Paketseite gerendert wird
- **THEN** nennt sie passende Anwendungen wie Bandprobe, Theater, mobile DJs, Feiern oder Ersatz-PA

### Requirement: [REQ-ICOA-05] Strukturierte Daten ohne Product-Schema

Jede neue Seite SHALL `Service`, `BreadcrumbList` und `FAQPage` als JSON-LD ausgeben und SHALL KEIN `Product`-Schema verwenden.

#### Scenario: JSON-LD-Typen

- **WHEN** eine neue Seite gerendert wird
- **THEN** sind `Service`, `BreadcrumbList` und `FAQPage` vorhanden und `Product` fehlt

### Requirement: [REQ-ICOA-06] Platzhalterbilder sind austauschbar

Alle neuen Produkte SHALL zunächst ein gemeinsames Platzhalterbild und dessen Thumbnail verwenden. Der Austausch durch echte Fotos SHALL ohne Codeänderung über die YAML-Pfade möglich sein.

#### Scenario: Platzhalter vorhanden

- **WHEN** eine neue Produktkarte gerendert wird
- **THEN** laden Bild und Thumbnail ohne 404

#### Scenario: Bildwechsel

- **WHEN** ein echtes Foto hinterlegt und der YAML-Pfad geändert wird
- **THEN** zeigen Katalog und Detailseite das neue Bild ohne weitere Codeänderung
