# citygrid-bugfix Specification

## Purpose
Definiert die Korrekturen am CityGrid-Carousel aus dem Code-Review: zentrale, getypte Thumbnail-Erzeugung über `imageUtils` sowie ein zuverlässiges Zurücksetzen des Navigations-Locks (`isAnimating`) nach jedem Sprung.

## Requirements

### Requirement: CityGrid nutzt den zentralen Thumbnail-Helper

`src/components/CityGrid.astro` SHALL `getThumbUrl` aus `src/lib/imageUtils` für alle `data-srcset`-Werte verwenden und SHALL keine eigene `thumbSrc`-Funktion definieren.

#### Scenario: Keine lokale Duplikat-Funktion

- **WHEN** `src/components/CityGrid.astro` analysiert wird
- **THEN** existiert keine lokale `thumbSrc`-Funktion
- **THEN** wird `getThumbUrl` aus `../lib/imageUtils` importiert und für alle Stadtbilder verwendet

#### Scenario: Bild-URLs werden korrekt umgewandelt

- **WHEN** `getThumbUrl` mit einem Bildpfad aufgerufen wird
- **THEN** liefert sie den Pfad mit `-thumb.webp`-Endung

### Requirement: Carousel-Lock wird nach dem Sprung zurückgesetzt

`jumpTo()` in `src/lib/cityCarousel.ts` SHALL `isAnimating = false` nach dem verschachtelten `requestAnimationFrame`-Callback setzen, damit die Steuerung nicht blockiert bleibt.

#### Scenario: Nach dem Sprung ist das Carousel wieder bedienbar

- **WHEN** `jumpTo()` abgeschlossen ist
- **THEN** ist `isAnimating` wieder `false`
- **THEN** sind weitere Sprünge bzw. Autoplay möglich
