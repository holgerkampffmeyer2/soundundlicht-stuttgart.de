# reviews-testimonials Specification

## Purpose
Regelt die Anzeige der Google-Rezensionen als paginierte Testimonials, die Scraper-Pipeline mit angemeldeter Session und die Verwendung des Review-Aggregats in den strukturierten Daten.

## Requirements

### Requirement: [REQ-REVIEW-01] Testimonials-Anzeige mit Paginierung

`src/components/Testimonials.astro` SHALL alle Rezensionen aus `src/data/google-reviews.json` in Datenreihenfolge (gepinnte zuerst, danach Scraper: neueste zuerst) anzeigen und bei mehr als 3 Einträgen clientseitig paginieren (3 Karten pro Seite).

#### Scenario: Paginierung rendert nur die aktive Seite

- **WHEN** die Seite mit der Testimonials-Sektion geladen wird
- **THEN** sind nur die Karten der Seite 1 sichtbar, die Seiten-Buttons markieren „1" als aktiv und Vorher/Zurück-Buttons sind am Rand deaktiviert

#### Scenario: Seitenwechsel aktualisiert die Karten

- **WHEN** ein Nutzer auf eine Seitennummer oder „Weiter" klickt
- **THEN** werden nur die Karten der gewählten Seite angezeigt und die Button-Zustände (aktiv, disabled) sind entsprechend aktualisiert

#### Scenario: Anker `#bewertungen` landet unter der fixed Navbar

- **WHEN** ein Nutzer über Navbar, Footer oder `/#bewertungen` zur Sektion springt
- **THEN** positioniert der Browser die Sektion unter der fixen Navigation (`section[id]` hat `scroll-margin-top: 160px`)

### Requirement: [REQ-REVIEW-04] Barrierearme Rezensionsdarstellung mit Theme-Akzenten

`src/components/Testimonials.astro` SHALL Rezensionen als hochwertige Karten mit Aggregatbewertung, SVG-Sternen, SVG-Icons, lesbarem Text und zugänglicher Paginierung darstellen; die Farbgebung SHALL Theme-Tokens nutzen und SHALL sich nicht auf Blautöne beschränken.

#### Scenario: Aggregatbewertung und SVG-Sterne

- **WHEN** die Testimonials-Sektion gerendert wird
- **THEN** zeigt sie `ratingValue` als deutsche Dezimalzahl und `reviewCount` aus `google-reviews.json`, und sowohl Aggregat als auch Einzelbewertungen verwenden `aria-hidden="true"`-SVG-Sterne mit `role="img"`-Textalternative

#### Scenario: Lange Rezensionen

- **WHEN** eine Rezension länger als 420 Zeichen ist
- **THEN** zeigt die Karte eine Vorschau und ein natives `<details>`-Element „Mehr lesen", das den vollständigen Text ohne Verlust von Zeilenumbrücken zugänglich macht
- **THEN** erscheint der Umschalter „Weniger anzeigen“ nach dem vollständigen Text, mit der Trennlinie unter dem Text statt zwischen Vorschau und Rest
- **THEN** bleibt der Fokus beim Zuklappen auf dem Umschalter und die Karte wird wieder oben im Viewport positioniert

#### Scenario: Paginierung mit Status und Fokus

- **WHEN** die Seite gewechselt wird
- **THEN** markieren die Seiten-Buttons den aktiven Zustand per `data-active` und `aria-current`, ein `aria-live`-Status nennt die aktuelle Seite, und alle Buttons haben sichtbare Fokusrahmen in `--color-accent`

### Requirement: [REQ-REVIEW-05] Pinned Highlight-Rezension

`src/data/google-reviews.json` SHALL ein `pinned`-Flag für die Highlight-Rezension führen; `src/components/Testimonials.astro` SHALL diese Rezension unabhängig vom Datum zuerst anzeigen und mit Pin-Icon, sichtbarem Text „Top-Rezension" und einem dezenten Akzent an der Karte kennzeichnen. Die Pipeline SHALL das Flag bei erneutem Scrapen erhalten.

#### Scenario: Pinned erscheint zuerst auf Seite 1

- **WHEN** die Testimonials-Sektion Rezensionen mit `pinned: true` rendert
- **THEN** ist die gepinnte Karte die erste Karte auf Seite 1, trägt `is-pinned`, zeigt das Pin-Icon und den Text „Top-Rezension", und die übrigen Karten bleiben chronologisch sortiert

#### Scenario: Pin bleibt nach `update-reviews` erhalten

- **WHEN** `mergeReviews` eine bereits gepinnte Rezension erneut aus dem Scraper übernimmt
- **THEN** bleibt `pinned: true` erhalten und die Rezension wird vor allen neueren, nicht gepinnten Rezensionen einsortiert

### Requirement: [REQ-REVIEW-02] Review-Datenpipeline via Playwright mit angemeldeter Session

`scripts/fetch-google-reviews.mjs` (Aufruf `pnpm run update-reviews`) SHALL die vollständige Rezensionenliste des Betriebs über Playwright mit persistentem Browserprofil (`~/.cache/sls-gmaps-profile`) laden und nach `src/data/google-reviews.json` schreiben. Die einmalige Anmeldung erfolgt über `pnpm run gmaps:login`.

#### Scenario: Unangemeldete Session wird abgelehnt

- **WHEN** der Scraper startet und das Profil enthält keine Google-Session
- **THEN** bricht er mit einer Fehlermeldung ab, die auf `pnpm run gmaps:login` verweist

#### Scenario: Alle Rezensionen werden geladen

- **WHEN** der Scraper mit angemeldeter Session läuft
- **THEN** liest er `reviewCount` aus dem Aggregate-Bereich, öffnet das Rezensionen-Panel, sortiert „Neueste" (best effort), scrollt bis alle Karten geladen sind und schreibt `ratingValue`, `reviewCount`, `fetchedAt` und die Reviews (Autor, Sterne, Text, Datum als `time` mit `datePrecision`)

#### Scenario: Rezensionsdatum statt Relativangabe

- **WHEN** die Testimonials-Sektion eine Rezension mit `time` rendert
- **THEN** zeigt sie ein Kalenderdatum (`TT.MM.JJJJ`, bei Monats-/Jahresgenauigkeit „Monat Jahr" bzw. Jahr) und niemals „vor 2 Tagen" oder ähnliche Relativangaben

#### Scenario: Merge ohne Duplikate

- **WHEN** `mergeReviews` Scraper-Ergebnis und bestehende Datei zusammenführt
- **THEN** Reviews mit gleichem Autor + Text-Präfix werden dedupliziert, `pinned`-Flags aus bestehenden Daten übernommen, nicht zurückgeladene bestehende Reviews werden angehängt und bei vollständig vorhandenen Datumswerten chronologisch (neueste zuerst, gepinnte zuerst) sortiert

#### Scenario: Unit-Tests sichern die Pipeline

- **WHEN** `pnpm test` läuft
- **THEN** prüfen `scripts/fetch-google-reviews.test.mjs` (Mapping, Dedup, Merge-Reihenfolge, Limit-Logik, Output-Shape) und `src/data/google-reviews.test.ts` (Schema, ISO-Zeitstempel, keine Duplikate) die Pipeline- invarianten

### Requirement: [REQ-REVIEW-03] Review-Aggregate in JSON-LD

`src/data/jsonLd.ts` SHALL `ratingValue` und `reviewCount` aus `src/data/google-reviews.json` als `aggregateRating`-Schema ausgeben (eine Quelle der Wahrheit).

#### Scenario: Aggregate entsprechen den Daten

- **WHEN** eine Seite mit Review-JSON-LD gebaut wird
- **THEN** enthält `aggregateRating` die Werte aus `google-reviews.json` (aktuell 5.0 / 31) als Strings
