# Shared Image Utils

## ADDED Requirements

### Requirement: Zentrale Bild-Helfer existieren

`src/lib/imageUtils.ts` SHALL die getypten Funktionen `getWebpUrl()` und `getThumbUrl()` exportieren, die von allen Komponenten verwendet werden können.

#### Scenario: Funktionen sind vorhanden

- **WHEN** `src/lib/imageUtils.ts` geladen wird
- **THEN** exportiert es `getWebpUrl` und `getThumbUrl`

### Requirement: Paketkarten nutzen die zentralen Helfer

`src/components/PackageCardGrid.astro` SHALL die WebP-/Thumbnail-Umwandlung über einen Import aus `@lib/imageUtils` beziehen und keine lokalen Duplikate der Funktionen enthalten.

#### Scenario: Import statt Duplikat

- **WHEN** `src/components/PackageCardGrid.astro` analysiert wird
- **THEN** importiert es `getWebpUrl`/`getThumbUrl` aus `@lib/imageUtils`
- **THEN** enthält es keine lokale Deklaration dieser Funktionen