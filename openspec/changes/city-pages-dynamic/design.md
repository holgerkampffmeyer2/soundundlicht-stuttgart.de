# Design

## Context

Siehe `proposal.md` – Why. Aktueller Zustand:
- 20 manuelle `src/pages/<city>.astro` (~3.9k LOC), ~95% identisch
- `cities.json` hat 20 Einträge mit strukturierten Daten, aber Prosa-Felder fehlen im Schema
- Components (`CityHero`, `CityPackages`, `CitySteps`, `CityAreas`, `CityEinzeltechnik`, `FAQSection`, `ContactSection`, `Breadcrumb`) bereits Props-basiert & wiederverwendbar
- `getFaqsForPage(citySlug)` in `faqUtils.ts` filtert FAQs
- `CityGrid.astro` nutzt `getCollection('cities')` für Carousel
- Abhängig von: `types-zod-fix` (#1) für `CityData` Typ, `jsonld-builders` (#2) für JSON-LD Builder, `servicearea-from-cities` (#5) für `areaServed`

## Goals / Non-Goals

**Goals:**
- Einzige dynamische Route `src/pages/[city].astro` mit `getStaticPaths()` aus `cities` Collection
- Prosa-Felder in `cities.json` + Schema (`heroTitle`, `heroDescription`, `heroDetails`, `einzelTitle`, `einzelDescription`, `areasIntro`, `contactDescription`, `distanceText`, `travelTimeText`) – alle optional
- Page komponiert aus bestehenden Components (`CityHero`, `CityPackages`, `CitySteps`, `CityAreas`, `CityEinzeltechnik`, `FAQSection`, `ContactSection`, `Breadcrumb`)
- JSON-LD via Builder (`breadcrumbJsonLd`, `serviceJsonLd`, `faqPageJsonLd`) aus `jsonld-builders` (#2)
- `getFaqsForPage` sync machen (async entfernen)
- 20 alte `src/pages/<city>.astro` löschen
- Unit-Tests (`cityUtils.test.ts`), E2E-Tests (`tests/city-pages.spec.ts`)
- `pnpm exec astro check` → 0 Hints, `pnpm test` + `pnpm run build` grün

**Non-Goals:**
- Keine neuen Components
- Keine Layout-Änderungen
- `CityGrid.astro` Carousel unverändert
- `serviceArea` Ableitung in #5 (`servicearea-from-cities`)

## Decisions

| Entscheidung | Begründung | Alternative |
|---|---|---|
| Prosa-Felder optional (`z.string().optional()`) | Bestehende Cities ohne Migration lauffähig; Defaults in Page | Pflichtfelder + Migrations-Skript |
| Defaults in Page-Logik (nicht im Schema) | Schema bleibt sauber; Defaults zentral in Page | Defaults im Schema via `.default()` |
| `getFaqsForPage` sync machen | Keine async Operation; vereinfacht Typ & Aufruf | Async beibehalten |
| `CityData` = `CollectionEntry<'cities'>['data']` | Automatisch in Sync mit Schema | Manuelles Interface |
| `serviceArea` aus Cities ableiten in #5 | Hier nur `areaServed: { '@type': 'City', name: city.name }` | Hardcoded Service Area |
| `getStaticPaths()` aus Collection | Astro Standard; Collection liefert validierte Daten | Manuelles Array aus `cities.json` importieren |

## Risks / Trade-offs

- **[Risk] Prosa-Migration manuell/fehleranfällig** → Migrations-Skript schreiben, das alte Pages parst und `cities.json` befüllt; Review vor Commit
- **[Risk] Defaults in Page vs. Schema** → Defaults in Page-Logik (ein Ort); Schema bleibt clean
- **[Risk] 20 Dateien löschen** → Erst nach Build-Vergleich aller 20 Pages löschen; `git restore` möglich
- **[Risk] `getFaqsForPage` sync Breaking Change** → Nur intern genutzt (City-Pages, FAQ-Seite, Produktseiten); alle Aufrufer anpassen
- **[Trade-off] Defaults in Page vs. Schema** → Page-Logik zentraler, Schema cleaner; akzeptabel
- **[Trade-off] `getFaqsForPage` sync** → Vereinfacht Typ & Aufruf; alle Aufrufer (City-Pages, FAQ-Seite, Produktseiten) müssen `await` entfernen

## Migration Plan

1. **Dependencies ready**: `types-zod-fix` (#1), `jsonld-builders` (#2), `servicearea-from-cities` (#5) gemerged / lokal verfügbar
2. **Schema & Data**:
   - `src/content.config.ts`: Cities-Schema um 9 optionale Strings erweitern
   - `src/data/cities.json`: Prosa-Felder für 20 Cities ergänzen (Migrations-Skript empfohlen)
3. **Types & Utils**:
   - `src/lib/types.ts`: `export type CityData = CollectionEntry<'cities'>['data']`
   - `src/lib/faqUtils.ts`: `async` aus `getFaqsForPage` entfernen, Return-Type `FaqEntry[]`
   - `src/lib/faqUtils.test.ts`: Tests anpassen (async/await entfernen)
4. **Dynamic Route**:
   - `src/pages/[city].astro` (NEU): `getStaticPaths()` aus `getCollection('cities')`, Page komponiert aus Components, JSON-LD via Builder
   - Imports: `CityHero`, `CityPackages`, `CitySteps`, `CityAreas`, `CityEinzeltechnik`, `FAQSection`, `ContactSection`, `Breadcrumb`, `Layout`, `Navbar`, `Footer`, `Icon`, `getCollection`, `getFaqsForPage`, `citiesData` (für `einzelItems` Mapping), JSON-LD Builder
   - Props-Mapping: City-Daten → Component-Props (siehe Spec)
5. **Tests**:
   - `src/lib/cityUtils.test.ts`: `getStaticPaths` liefert 20 Entries; JSON-LD Builder korrekt
   - `tests/city-pages.spec.ts` (E2E): 3 Stichproben (stuttgart, esslingen, fernen) prüfen Hero, Packages, FAQ, Contact, Breadcrumb, JSON-LD
6. **Cleanup**:
   - 20 alte `src/pages/<city>.astro` löschen (nach Verifikation aller 20 Pages)
7. **Verifikation**:
   - `pnpm exec astro check` → 0 Hints
   - `pnpm test` + `pnpm run build` → grün
   - `npx playwright test` → E2E grün
   - HTML-Vergleich: `dist/stuttgart.html` vs. Referenz (Snapshot)

Rollback: `git revert`; gelöschte Pages via `git restore` wiederherstellbar.

## Open Questions

- **Migrations-Skript**: Automatisch (Pages parsen → JSON befüllen) oder manuell Copy-Paste? Beeinflusst Aufwand stark.
- **Snapshot-Referenzen**: Alte `dist/` archivieren für HTML-Diff, oder nur Build + E2E?
