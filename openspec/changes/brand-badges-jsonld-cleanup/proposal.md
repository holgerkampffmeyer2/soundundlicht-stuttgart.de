# Proposal

## Why

Nach der Fertigstellung der LD-Systems-ICOA-Mietpakete haben sich vier Nacharbeit-Themen ergeben:
1. **JSON-LD-Video-Platzhalter**: 5 Seiten ohne Video zeigen weiterhin `VideoObject`-Schema mit Platzhalter-IDs; 2 Seiten mit echtem Video (`karaoke-paket`, `partypaket-stuttgart`) wurden versehentlich auf Platzhalter gesetzt.
2. **Relative JSON-LD-URLs**: `serviceJsonLd` (Bilder), `videoJsonLd` (Thumbnails) und `breadcrumbJsonLd` (Breadcrumb-Items) nutzen relative Pfade statt absoluter URLs – SEO-relevant für Rich Results.
3. **Linkformatierung**: Das `IncludedInPackages`-Component rendert Links mit permanentem Underline; der Site-Standard ist `hover:underline` (z. B. `PackageContents`).
4. **Markenbadges**: Auf allen Produktseiten (Detail- und Kategorieseiten) fehlen Hersteller-Hinweise. Ein textbasierter Badge neben Preis/„Inkl. Kabel“ schafft Transparenz ohne Logo-Lizenz-Risiken (JBL/Harman). § 23 MarkenG erlaubt referenzielle Nutzung echter Warenhersteller.

## What Changes

- **Datenmodell**: Optionales `brands: string[]` in `src/content/config.ts` (Content Collections) und Pflege in 27 Produkt-YAMLs (nur belegte Marken).
- **UI-Komponente**: Neue `BrandBadges.astro` (Pills, keine Logos) im Hero neben Preis/Plug-Badge; auf Kategorieseiten im Hero (aggregiert) und in Produktkarten/Abschnitten.
- **JSON-LD**: `src/data/jsonLd.ts` erhält `SITE_URL` + `absoluteUrl()`; absolute URLs für Service-Images, Video-Thumbnails, Breadcrumb-Items. `videoJsonLd` optional `uploadDate`/`duration`; Karaoke/Partypaket korrigieren; 5 Seiten ohne Video entfernen VideoObject.
- **Linkformat**: `IncludedInPackages.astro` → kein permanenter Underline, nur `hover:underline`.
- **Route/URL-Liste**: `build:full` regeneriert `urllist.txt`; alte Route `ld-icoa-system` nur lokal, kein Redirect nötig.
- **Cleanup**: Einmal-Migrationsskripte löschen; ungenutzte `siteUrl`/`videoPublisher` Variablen entfernen.

## Capabilities

### New Capabilities
- `product-brand-badges`: Zeigt Hersteller als textbasierte Badges auf Produktdetail- und Kategorieseiten. Keine Schema-Änderung, reines UI-Element.
- `jsonld-absolute-urls`: Stellt sicher, dass alle JSON-LD-Bilder, Thumbnails und Breadcrumb-Items absolute URLs nutzen.

### Modified Capabilities
- `product-jsonld`: `Service`-Schema erhält absolute Image-URLs; `VideoObject` wird auf 7 Seiten bereinigt (2 korrigiert, 5 entfernt). Keine neue `brand`-Property im Schema.
- `navigation-links`: `IncludedInPackages`-Linkstil vereinheitlicht auf Site-Standard (`hover:underline`).

## Impact

**Betroffene Dateien:**
- `src/content.config.ts` (Schema-Erweiterung)
- 27 Dateien in `src/content/products/*.yml` (Marken-Pflege)
- `src/components/vermietung/BrandBadges.astro` (neu)
- `src/components/vermietung/IncludedInPackages.astro` (Link-Stil)
- `src/components/vermietung/CategoryLayout.astro` (Badge in Karten)
- `src/components/vermietung/ProductLayout.astro` (optional, falls Hero-Integration dort zentralisiert wird)
- 16 Detailseiten in `src/pages/vermietung/*.astro` (Badge-Import + Placement)
- 4 Kategorieseiten: `ld-systems-icoa-series.astro`, `mikrofon-mischpult.astro`, `led-scheinwerfer.astro`, `nebelmaschinen.astro`
- `src/data/jsonLd.ts` (absolute URLs, Video-Metadaten)
- `scripts/update-sitemap.mjs` (nur Verifikation, kein Code-Change nötig)
- Einmal-Skripte in `scripts/fix_*.py`, `scripts/migrate_*.py` (Löschung nach Verifikation)

**Keine Breaking Changes** – reine UI-Erweiterung und JSON-LD-Korrektur.
