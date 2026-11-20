# Proposal

## Why

Der Zod-Import aus `astro:content` ist deprecated (Astro 7 / Zod 4). `astro check` meldet 40 Hints (`ts(6385): 'z' is deprecated`). Zudem existieren 6 duplizierte `ProductData`/`CatalogProduct`/`CategoryProduct` Interfaces und 2 `FaqEntry` Interfaces im Codebase – keine Single Source of Truth. Das erhöht Wartungsaufwand und Regression-Risiko bei Schema-Änderungen.

## What Changes

- **Zod-Import migrieren**: `import { z } from 'astro:content'` → `import { z } from 'astro/zod'` in `src/content.config.ts`
- **Single-Source Types**: `src/lib/types.ts` als zentrale Export-Datei für:
  - `ProductData` = `CollectionEntry<'products'>['data']`
  - `CityData` = `CollectionEntry<'cities'>['data']`
  - `FaqEntry` = aus FAQ-Schema ableiten
  - `EventItem`, `PagefindMeta`, `JsonLdItem`, `BreadcrumbSegment` Interfaces
- **Alle duplizierten Interfaces entfernen** in:
  - `src/components/CityEinzeltechnik.astro`
  - `src/components/vermietung/CategoryLayout.astro`
  - `src/components/vermietung/ProductLayout.astro`
  - `src/lib/wishlistDrawer.ts` (CatalogProduct → Pick<ProductData,...>)
  - `src/scripts/search.ts` (CatalogProduct → Pick<ProductData,...>)
  - `src/pages/faq.astro` (FaqEntry → Import aus `faqUtils`)
- **Keine Verhaltensänderung** – reiner Refactor

## Capabilities

### New Capabilities
*(keine – reiner Refactor, keine neuen System-Verhaltensweisen)*

### Modified Capabilities
- `typescript-any-cleanup`: Ergänzung der Single-Source-Type-Regel und Zod-Migration

## Impact

**Betroffene Dateien:**
- `src/content.config.ts` (Import)
- `src/lib/types.ts` (neu/erweitert)
- `src/components/CityEinzeltechnik.astro`
- `src/components/vermietung/CategoryLayout.astro`
- `src/components/vermietung/ProductLayout.astro`
- `src/lib/wishlistDrawer.ts`
- `src/scripts/search.ts`
- `src/pages/faq.astro`
- `src/lib/faqUtils.ts` (FaqEntry Export)

**Tests:** `pnpm exec astro check` → 0 Hints; `pnpm test` grün

**Skip Specs:** Ja – reiner Refactor ohne Verhaltensänderung
