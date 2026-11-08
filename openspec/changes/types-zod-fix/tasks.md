# Tasks

## 1. Zod-Import migrieren & types.ts erweitern

- [ ] 1.1 `src/content.config.ts`: Import `z` aus `astro/zod` statt `astro:content` ändern
  - Verifikation: `pnpm exec astro check` zeigt keine `ts(6385)` Hints mehr für content.config.ts

- [ ] 1.2 `src/lib/types.ts` erweitern – zentrale Typ-Exports:
  ```ts
  import type { CollectionEntry } from 'astro:content';
  import type { FaqEntry } from './faqUtils';

  export type ProductData = CollectionEntry<'products'>['data'];
  export type CityData = CollectionEntry<'cities'>['data'];
  export type FaqEntry = FaqEntry; // re-export
  export interface EventItem { title: string; description: string; personCount: string; }
  export interface PagefindMeta { type?: string; price?: string; image?: string; category?: string; label?: string; title?: string; }
  export interface JsonLdItem { '@context': string; '@type': string; [key: string]: unknown; }
  export interface BreadcrumbSegment { label: string; href?: string; }
  export type CatalogProduct = Pick<ProductData, 'slug' | 'title' | 'image' | 'price'>;
  ```
  - Verifikation: `tsc --noEmit` auf `types.ts` grün; Exports nutzbar

## 2. Duplizierte Interfaces entfernen & Imports umstellen

- [ ] 2.1 `src/components/CityEinzeltechnik.astro`: Interface `ProductData` entfernen, `import type { ProductData } from '../../lib/types'`
  - Verifikation: `pnpm exec astro check` grün für Datei

- [ ] 2.2 `src/components/vermietung/CategoryLayout.astro`: Interface `CategoryProduct` entfernen, `import type { ProductData } from '../../../lib/types'`; Props `products: ProductData[]`
  - Verifikation: `pnpm exec astro check` grün

- [ ] 2.3 `src/components/vermietung/ProductLayout.astro`: Interface `ProductData` entfernen, `import type { ProductData } from '../../../lib/types'`
  - Verifikation: `pnpm exec astro check` grün

- [ ] 2.4 `src/lib/wishlistDrawer.ts`: Interface `CatalogProduct` entfernen, `import type { CatalogProduct } from '../types'`
  - Verifikation: `pnpm exec astro check` grün; `pnpm test` (wishlistDrawer wird nicht direkt getestet, aber Build + merkliste Tests grün)

- [ ] 2.5 `src/scripts/search.ts`: Interface `CatalogProduct` (Zeile 78) entfernen, `import type { CatalogProduct } from '../lib/types'`
  - Verifikation: `pnpm exec astro check` grün; Playwright Search-Tests grün

- [ ] 2.6 `src/pages/faq.astro`: Interface `FaqEntry` (Zeile 9) entfernen, `import type { FaqEntry } from '../lib/faqUtils'`
  - Verifikation: `pnpm exec astro check` grün; ungenutzte `CITY_NAMES`, `totalCount` Variablen optional entfernen

## 3. Verifikation & Cleanup

- [ ] 3.1 `pnpm exec astro check` → 0 Errors, 0 Warnings, 0 Hints
- [ ] 3.2 `pnpm run lint:agent` → keine Fehler
- [ ] 3.3 `pnpm test` → alle Unit-Tests grün
- [ ] 3.4 `pnpm run build` → Build erfolgreich, alle 41 Pages generiert
- [ ] 3.5 Optional: `npx playwright test` → E2E grün (Merkliste, Suche, City/Produkt-Seiten)

## Workflow follow-up

- Change archivieren nach Review: `openspec archive types-zod-fix -y`
- Memories aktualisieren (core.md, tech_stack.md) falls nötig
