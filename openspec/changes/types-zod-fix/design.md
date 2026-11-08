# Design

## Context

Siehe `proposal.md` – Why. Aktueller Zustand:
- `src/content.config.ts` importiert `z` aus `astro:content` (deprecated, 40 Hints)
- 6 duplizierte Produkt-Interfaces, 2 FAQ-Interfaces im Codebase
- `src/lib/types.ts` existiert nur mit `ProductData` (manuell, nicht aus Collection abgeleitet)
- `faqUtils.ts` exportiert `FaqEntry`, aber `faq.astro` definiert eigenes Interface

## Goals / Non-Goals

**Goals:**
- `z` aus `astro/zod` importieren → 0 Astro-Check-Hints
- `src/lib/types.ts` als **Single Source of Truth** für alle Collection-Typen
- Alle duplizierten Interfaces entfernen, Imports auf `types.ts` / `faqUtils.ts` umstellen
- `CollectionEntry<'products'>['data']` / `CollectionEntry<'cities'>['data']` nutzen für automatische Schema-Sync
- Build & Tests grün (`pnpm exec astro check` 0 Hints, `pnpm test` grün)

**Non-Goals:**
- Keine Schema-Änderungen an Content Collections
- Keine Laufzeit-Verhaltensänderungen
- Keine JSON-LD Builder (gehört zu separatem Change `jsonld-builders`)

## Decisions

| Entscheidung | Begründung | Alternative |
|---|---|---|
| `ProductData` = `CollectionEntry<'products'>['data']` | Automatisch in Sync mit YAML-Schema; bei Schema-Änderung TypeScript-Fehler statt Drift | Manuelles Interface pflegen (aktueller Zustand) |
| `CityData` = `CollectionEntry<'cities'>['data']` | Gleicher Grund; Cities-Schema wird in #3 erweitert | — |
| `FaqEntry` aus `faqUtils.ts` exportieren | Bereits dort definiert; `faq.astro` nutzt es bereits implizit via Import | Eigenes Interface in `types.ts` |
| `EventItem`, `PagefindMeta`, `JsonLdItem`, `BreadcrumbSegment` in `types.ts` | Wiederverwendet in CategoryLayout, ProductLayout, search.ts, CityEinzeltechnik | Inline in jeder Datei |
| `CatalogProduct` in `wishlistDrawer.ts` / `search.ts` → `Pick<ProductData, 'slug'|'title'|'image'|'price'>` | Vermeidet Duplikat; Compiler prüft Subset-Kompatibilität | Eigenes Interface `CatalogProduct` |

## Risks / Trade-offs

- **[Risk] Type-Inference bricht bei z.union/z.discriminatedUnion** → Content Collections nutzen nur `z.object`, keine Unions → geringes Risiko
- **[Risk] `CollectionEntry` erfordert Import aus `astro:content`** → bereits in Projekt verwendet (`getCollection`), bekanntes Pattern
- **[Trade-off] `types.ts` wird zentrale Dependency** → alle betroffenen Dateien müssen rebuilden; akzeptabel bei 10 Dateien

## Migration Plan

1. `src/content.config.ts`: Import `z` aus `astro/zod`
2. `src/lib/types.ts`: Alle Typ-Exports hinzufügen (siehe Tasks)
3. Je betroffene Datei: Interface entfernen, Import aus `types.ts` / `faqUtils.ts` hinzufügen
4. `pnpm exec astro check` → 0 Hints erwarten
5. `pnpm test` + `pnpm run build` → grün
6. `pnpm run lint:agent` → grün

Rollback: `git revert` des Commits; keine DB-Migration nötig.

## Open Questions

Keine – alle Entscheidungen getroffen.
