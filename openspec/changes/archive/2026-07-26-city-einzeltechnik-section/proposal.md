## Why

City-Seiten vermarkten aktuell nur Komplettpakete (3 identische Cards). Kunden, die nur einzelne Geräte brauchen (z.B. nur eine PA-Anlage, nur Licht, oder nur eine Nebelmaschine), werden nicht angesprochen. Ein Einzeltechnik-Seciton auf City-Seiten erhöht die Conversion für diese Zielgruppe und bringt zusätzliche interne Verlinkungen auf Produktseiten.

## What Changes

- Neue Komponente `CityEinzeltechnik.astro` rendert eine handvermessene Auswahl an Einzelprodukten pro City
- `cities.json` wird um ein `einzelItems`-Array pro City erweitert (Slug-Referenzen auf Produkte)
- Jede City-Seite bekommt den neuen Abschnitt zwischen CityPackages und CitySteps eingefügt
- Section-Heading und Beschreibungstext variieren pro City (via Props)

## Capabilities

### New Capabilities
- `city-einzeltechnik`: Neue Sektion auf City-Seiten mit produtspezifischen Einzeltechnik-Empfehlungen, konfigurierbar pro City via `cities.json`

### Modified Capabilities

## Impact

- `src/data/cities.json` — Schema-Erweiterung um `einzelItems`
- `src/components/CityEinzeltechnik.astro` — Neue Komponente
- `src/pages/*.astro` — 15 City-Seiten bekommen neuen Abschnitt
- `src/content/content.config.ts` — Kein Schema-Change nötig (Slugs referenzieren bestehende Produkte)
