# Spec Delta

## Purpose

Ergänzt konsolidierte Produkt-Detail- und Kategorieseiten für bislang unverlinkte Mietgeräte, damit jede Long-Tail-Suchanfrage ein eigenes, inhaltlich tragfähiges Ziel hat, ohne Thin-Content-Seiten zu erzeugen.

## ADDED Requirements

### Requirement: Anti-Bloat-Gate für neue Produktseiten

Eine neue Produktseite SHALL nur angelegt werden, wenn sie mindestens eines erfüllt: eigene Suchintention („X mieten"), Entscheidungshilfe über die Übersichtskarte hinaus, internes Verlinkungsziel oder KI-Zitierfähigkeit. Andernfalls SHALL das Produkt als Karte auf `/vermietung` verbleiben.

#### Scenario: Produkt ohne eigenständigen Mehrwert

- **WHEN** ein Produkt weder eigene Suchintention noch Inhalt über die Karte hinaus besitzt
- **THEN** wird keine eigene Seite angelegt und das Produkt bleibt als Karte auf der Übersicht

#### Scenario: Zubehör mit gemeinsamer Suchintention

- **WHEN** mehrere Zubehör-Produkte keine je eigene Suchintention haben (z. B. Mikrofon und Mischpult)
- **THEN** werden sie auf einer gemeinsamen Kategorieseite mit eigenen Ankerabschnitten gebündelt statt einzeln veröffentlicht

### Requirement: Jedes bislang unverlinkte Produkt hat ein konsolidiertes Ziel

Jedes Produkt ohne bisherige Detailseite SHALL genau ein konsolidiertes Ziel besitzen: eine eigene Detailseite, eine Kategorieseite mit Anker, oder eine Variante auf einer bestehenden Seite. Die Zielseite SHALL über die Produkt-`detailPage` erreichbar sein.

#### Scenario: Produkt mit eigener Suchintention

- **WHEN** ein Produkt eine eigenständige Suchintention hat (z. B. Powerstation, Party-Beamer, Party-Lichtanlage)
- **THEN** erhält es eine eigene Detailseite unter `/vermietung/<slug>`

#### Scenario: Produkt als Variante zur Vermeidung von Kannibalisierung

- **WHEN** ein Produkt mit einem bereits belegten Keyword konkurrieren würde (z. B. zweite Nebelmaschine, zweiter Moving Head)
- **THEN** wird es als zusätzliche Variante auf der bestehenden, thematisch passenden Seite ergänzt statt als eigene Seite

### Requirement: Detailseiten liefern Entscheidungshilfe über die Karte hinaus

Jede neue Detailseite SHALL mindestens einen eigenständigen Entscheidungsinhalt bieten, der nicht auf der Übersichtskarte dargestellt ist (z. B. „Wann brauchst du das?"), sowie technische Daten, enthaltene Leistungen und Anwendungsbeispiele.

#### Scenario: Detailseite mit Entscheidungshilfe

- **WHEN** eine neue Detailseite erzeugt wird
- **THEN** enthält sie ein frisch geschriebenes Intro, einen Entscheidungsabschnitt („Wann brauchst du das?"), technische Daten, Inklusivleistungen und Anlässe

#### Scenario: Kein Duplikat des Kartentextes

- **WHEN** die Detailseite gerendert wird
- **THEN** übernimmt der sichtbare Haupttext nicht wörtlich die Beschreibung der Übersichtskarte

### Requirement: Kategorieseiten bündeln verwandte Geräte mit Ankern

Eine Kategorieseite SHALL mehrere verwandte Produkte zusammenfassen, jedes mit eigenem Ankerabschnitt, sowie eine Vergleichs-/Entscheidungshilfe („Welches Gerät passt zu dir?") bereitstellen.

#### Scenario: Kategorieseite mit mehreren Produkten

- **WHEN** eine Kategorieseite aufgebaut wird (z. B. Mikrofon & Mischpult, LED-Scheinwerfer)
- **THEN** erscheint jedes enthaltene Produkt in einem eigenen, verankerbaren Abschnitt und zusätzlich eine Entscheidungshilfe

#### Scenario: Kategorie-Anker als Linkziel

- **WHEN** ein Produkt einer Kategorieseite zugeordnet ist
- **THEN** verweist seine `detailPage` auf die Kategorieseite inklusive Anker auf den Produktabschnitt

### Requirement: FAQs und FAQPage-Schema je neuer Seite

Jede neue Detail- oder Kategorieseite SHALL mindestens drei seiten-spezifische FAQs enthalten und ein gültiges `FAQPage`-Structured-Data ausgeben.

#### Scenario: Neue Seite mit eindeutigen FAQs

- **WHEN** eine neue Seite erzeugt wird
- **THEN** enthält sie mindestens drei FAQs, die keinem anderen Produkt zugeordnet sind, und emittiert das passende `FAQPage`-JSON-LD

### Requirement: Strukturierte Daten mit Service statt Product

Neue Produkt- und Kategorieseiten SHALL `Service` (mit `serviceType`, `areaServed`, `provider` und `offers`/`UnitPriceSpecification`) sowie `BreadcrumbList` und `FAQPage` ausgeben und SHALL KEIN `Product`-Schema verwenden.

#### Scenario: Service-Schema ohne Product

- **WHEN** eine neue Seite gerendert wird
- **THEN** sind die JSON-LD-Typen `Service`, `BreadcrumbList` und `FAQPage` vorhanden, `Product` fehlt

### Requirement: Keine Orphan-Seiten

Jede neue Seite SHALL mindestens von einem internen Einstieg verlinkt sein — der Übersichtsseite `/vermietung` und/oder einer City-„Einzeltechnik"-Karte und/oder einer Paketseite.

#### Scenario: Neue Seite ist verlinkt

- **WHEN** eine neue Detail- oder Kategorieseite veröffentlicht wird
- **THEN** ist sie über mindestens einen internen Link von Übersicht, City-Karte oder Paketseite erreichbar

### Requirement: Übersichtskarte verlinkt auch bei Anker-Ziel

Die Übersichtsseite `/vermietung` SHALL den Detail-Link einer Produktkarte rendern, sobald eine `detailPage` gesetzt ist — einschließlich Zielen mit Anker.

#### Scenario: Karte mit Anker-Ziel

- **WHEN** ein Produkt eine `detailPage` mit Anker enthält (z. B. `/vermietung/led-scheinwerfer#led-par-strahler`)
- **THEN** zeigt die Übersichtskarte einen „Mehr Infos"-Link zu diesem Ziel

#### Scenario: Karte ohne Ziel

- **WHEN** ein Produkt keine `detailPage` besitzt
- **THEN** zeigt die Übersichtskarte keinen Detail-Link
