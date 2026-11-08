# Design

## Context

Siehe `proposal.md` – Why. Aktueller Zustand:
- 16 manuelle `src/pages/vermietung/<slug>.astro` (~3.9k LOC), nutzen `ProductLayout` aber duplizieren JSON-LD, Specs, Includes, Events, Gallery, Video
- `ProductLayout.astro` + `vermietung/*` Components bereits Props-basiert & wiederverwendbar
- `src/content/products/*.yml` (22 Dateien) enthalten Kern-Daten, aber Specs/Includes/Events/Gallery/Video fehlen
- `ProductData` Typ aus `types-zod-fix` (#1), JSON-LD Builder aus `jsonld-builders` (#2)
- Abhängig von: `types-zod-fix` (#1), `jsonld-builders` (#2)

## Goals / Non-Goals

**Goals:**
- Einzige dynamische Route `src/pages/vermietung/[slug].astro` mit `getStaticPaths()` aus `products` Collection
- Products-Schema um `specs`, `includes`, `events[]`, `gallery[]`, `videoId?`, `videoThumbnail?`, `videoTitle?`, `seoDescription?` erweitern (alle optional)
- Page rendert `ProductLayout` mit Props aus Collection-Entry; JSON-LD via Builder (`serviceJsonLd`, `videoJsonLd`, `faqPageJsonLd`, `breadcrumbJsonLd`)
- `EventItem` Interface in `types.ts`
- 16 alte `src/pages/vermietung/*.astro` löschen
- Unit-Tests (`productJsonLd.test.ts`), E2E (`tests/product-pages.spec.ts`)
- `pnpm exec astro check` → 0 Hints, `pnpm test` + `pnpm run build` grün

**Non-Goals:**
- Keine Änderungen an `ProductLayout` / `vermietung/*` Components
- Keine Layout-Änderungen
- `CategoryLayout` unverändert

## Decisions

| Entscheidung | Begründung | Alternative |
|---|---|---|
| Alle neuen Felder optional | Bestehende Products ohne Migration lauffähig; Defaults in Page | Pflichtfelder + Migrations-Skript |
| `specs` als `Record<string,string>` | Flexibel für variierende Spec-Keys pro Produkt | Array of Objects mit `key`/`value` |
| `events` als `EventItem[]` mit `title`/`description`/`personCount` | Matches aktuelle Event-Struktur in Pages | String-Array |
| `gallery` als `string[]` | Einfach; Pfade relativ zu `/img/vermietung/` | Object mit `src`/`alt` |
| `videoId` + `videoThumbnail` + `videoTitle` separat | YouTube-Embed braucht ID, Thumbnail, Titel; optional | Ein `video` Object |
| `EventItem` in `types.ts` | Wiederverwendet in Page + Tests | Inline in Schema |

## Risks / Trade-offs

- **[Risk] 22 YAMLs manuell erweitern** → Migrations-Skript empfohlen; Review vor Commit
- **[Risk] Defaults in Page für optionale Felder** → Page prüft `if (product.specs)` etc.; keine Breaking Changes
- **[Risk] 16 Dateien löschen** → Erst nach Build-Vergleich löschen; `git restore` möglich
- **[Trade-off] Optional Fields** → Page prüft Existenz (`if (product.specs)`); keine Breaking Changes
- **[Trade-off] `EventItem` Interface** → In `types.ts` zentral; wiederverwendbar

## Migration Plan

1. **Dependencies ready**: `types-zod-fix` (#1), `jsonld-builders` (#2) gemerged / lokal verfügbar
2. **Schema & Data**:
   - `src/content.config.ts`: Products-Schema um 8 optionale Felder erweitern
   - `src/content/products/*.yml` (22 Dateien): Felder ergänzen (Migrations-Skript empfohlen)
3. **Types**:
   - `src/lib/types.ts`: `EventItem` Interface hinzufügen
4. **Dynamic Route**:
   - `src/pages/vermietung/[slug].astro` (NEU): `getStaticPaths()` aus `getCollection('products')`, `ProductLayout` Props aus Entry, JSON-LD via Builder
   - Imports: `ProductLayout`, `Icon`, `TechnicalSpecs`, `RentalIncludes`, `RentalPricing`, `ExampleEvents`, `getCollection`, `getFaqsForPage`, `serviceArea`, `serviceJsonLd`, `videoJsonLd`, `faqPageJsonLd`, `breadcrumbJsonLd`
   - Props-Mapping: Entry-Daten → `ProductLayout` Props + Slots
5. **Tests**:
   - `src/lib/productJsonLd.test.ts`: Builder-Output für Product-Seite
   - `tests/product-pages.spec.ts` (E2E): 3 Stichproben (Paket, Sound, Licht) prüfen Hero, Specs, Includes, Events, Gallery, Video, FAQ
6. **Cleanup**:
   - 16 alte `src/pages/vermietung/*.astro` löschen (nach Verifikation)
7. **Verifikation**:
   - `pnpm exec astro check` → 0 Hints
   - `pnpm test` + `pnpm run build` → grün
   - `npx playwright test` → E2E grün

Rollback: `git revert`; gelöschte Pages via `git restore` wiederherstellbar.

## Open Questions

- **Migrations-Skript**: Automatisch (Pages parsen → YAML befüllen) oder manuell? Beeinflusst Aufwand stark.
- **Snapshot-Referenzen**: Alte `dist/` archivieren für HTML-Diff?
