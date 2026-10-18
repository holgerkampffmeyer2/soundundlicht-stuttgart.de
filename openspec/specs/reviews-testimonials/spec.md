# reviews-testimonials Specification

## Purpose
TBD - created by archiving change reviews-faq-spec-completeness. Update Purpose after archive.

## Requirements

### Requirement: Testimonials-Anzeige mit Paginierung

`src/components/Testimonials.astro` SHALL alle Rezensionen aus `src/data/google-reviews.json` in Datenreihenfolge (Scraper: neueste zuerst) anzeigen und bei mehr als 3 Einträgen clientseitig paginieren (3 Karten pro Seite).

#### Scenario: Paginierung rendert nur die aktive Seite

- **WHEN** die Seite mit der Testimonials-Sektion geladen wird
- **THEN** sind nur die Karten der Seite 1 sichtbar, die Seiten-Buttons markieren „1" als aktiv und Vorher/Zurück-Buttons sind am Rand deaktiviert

#### Scenario: Seitenwechsel aktualisiert die Karten

- **WHEN** ein Nutzer auf eine Seitennummer oder „Weiter" klickt
- **THEN** werden nur die Karten der gewählten Seite angezeigt und die Button-Zustände (aktiv, disabled) sind entsprechend aktualisiert

#### Scenario: Anker `#bewertungen` landet unter der fixed Navbar

- **WHEN** ein Nutzer über Navbar, Footer oder `/#bewertungen` zur Sektion springt
- **THEN** positioniert der Browser die Sektion unter der fixen Navigation (`section[id]` hat `scroll-margin-top: 160px`)

### Requirement: Review-Datenpipeline via Playwright mit angemeldeter Session

`scripts/fetch-google-reviews.mjs` (Aufruf `pnpm run update-reviews`) SHALL die vollständige Rezensionenliste des Betriebs über Playwright mit persistentem Browserprofil (`~/.cache/sls-gmaps-profile`) laden und nach `src/data/google-reviews.json` schreiben. Die einmalige Anmeldung erfolgt über `pnpm run gmaps:login`.

#### Scenario: Unangemeldete Session wird abgelehnt

- **WHEN** der Scraper startet und das Profil enthält keine Google-Session
- **THEN** bricht er mit einer Fehlermeldung ab, die auf `pnpm run gmaps:login` verweist

#### Scenario: Alle Rezensionen werden geladen

- **WHEN** der Scraper mit angemeldeter Session läuft
- **THEN** liest er `reviewCount` aus dem Aggregate-Bereich, öffnet das Rezensionen-Panel, sortiert „Neueste" (best effort), scrollt bis alle Karten geladen sind und schreibt `ratingValue`, `reviewCount`, `fetchedAt` und die Reviews (Autor, Sterne, Text, relatives Datum)

#### Scenario: Merge ohne Duplikate

- **WHEN** `mergeReviews` Scraper-Ergebnis und bestehende Datei zusammenführt
- **THEN** ist die Scraper-Reihenfolge maßgeblich, Reviews mit gleichem Autor + Text-Präfix werden dedupliziert und nicht zurückgeladene bestehende Reviews werden angehängt

#### Scenario: Unit-Tests sichern die Pipeline

- **WHEN** `pnpm test` läuft
- **THEN** prüfen `scripts/fetch-google-reviews.test.mjs` (Mapping, Dedup, Merge-Reihenfolge, Limit-Logik, Output-Shape) und `src/data/google-reviews.test.ts` (Schema, ISO-Zeitstempel, keine Duplikate) die Pipeline- invarianten

### Requirement: Review-Aggregate in JSON-LD

`src/data/jsonLd.ts` SHALL `ratingValue` und `reviewCount` aus `src/data/google-reviews.json` als `aggregateRating`-Schema ausgeben (eine Quelle der Wahrheit).

#### Scenario: Aggregate entsprechen den Daten

- **WHEN** eine Seite mit Review-JSON-LD gebaut wird
- **THEN** enthält `aggregateRating` die Werte aus `google-reviews.json` (aktuell 5.0 / 31) als Strings
