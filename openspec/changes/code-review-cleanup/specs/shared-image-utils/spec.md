# Delta Spec: Shared Image Utils

## Änderungen
1. Neue Datei `src/lib/imageUtils.ts` mit `getWebpUrl()` und `getThumbUrl()`
2. `PackageCardGrid.astro`: Lokale Funktionen durch Import aus `@lib/imageUtils` ersetzt

## Betroffene Dateien
- `src/lib/imageUtils.ts` (NEU)
- `src/components/PackageCardGrid.astro` (import angepasst)

## Risiko
Sehr niedrig — reines Refactoring, kein Verhalten geändert.
