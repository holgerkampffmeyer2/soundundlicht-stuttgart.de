# CityGrid Bugfix

## ADDED Requirements

### Requirement: CityGrid hat genau eine getypte `thumbSrc`-Funktion

Der Carousel-Code in `src/components/CityGrid.astro` SHALL genau eine Funktion `thumbSrc(src: string): string` verwenden, die Bildpfade per Regex `/\.(webp|jpe?g|png)$/i` in einen Thumbnail-Pfad umwandelt.

#### Scenario: Doppelte Funktion ist entfernt

- **WHEN** `src/components/CityGrid.astro` analysiert wird
- **THEN** existiert nur eine `thumbSrc`-Funktion, mit Parameter- und Return-Typ `string`
- **THEN** existiert keine ungetypte Duplikat-Funktion mit abweichendem Regex

#### Scenario: Bild-URLs werden korrekt umgewandelt

- **WHEN** `thumbSrc` mit einem `.jpg`-, `.jpeg`-, `.png`- oder `.webp`-Pfad aufgerufen wird
- **THEN** liefert sie den Pfad mit `-thumb.webp`-Endung

### Requirement: Carousel-Lock wird nach dem Sprung zurückgesetzt

`jumpTo()` in `src/components/CityGrid.astro` SHALL `isAnimating = false` nach dem `requestAnimationFrame`-Callback setzen, damit die Steuerung nicht blockiert bleibt.

#### Scenario: Nach dem Sprung ist das Carousel wieder bedienbar

- **WHEN** `jumpTo()` abgeschlossen ist
- **THEN** ist `isAnimating` wieder `false`
- **THEN** sind weitere Sprünge bzw. Autoplay möglich