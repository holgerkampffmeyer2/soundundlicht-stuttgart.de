# Tasks: Reviews/FAQ Spec Completeness

## Phase 1: Bugfix
- [x] **T1**: `section[id] { scroll-margin-top: 160px }` in `src/styles/global.css` (ersetzt `.anchor-section[id]`, deckt `#bewertungen` und alle Sections mit ID ab)

## Phase 2: Specs
- [x] **T2**: Delta-Spec `specs/reviews-testimonials/spec.md` (Komponente, Paginierung, Pipeline, JSON-LD, Tests)
- [x] **T3**: Delta-Spec `specs/faq-page/spec.md` (Themengruppierung, JSON-LD, Verlinkung)
- [x] **T4**: Delta auf `specs/feature-inventory/spec.md` (RSS, llms.txt, Test-Suite-Ergänzungen)

## Phase 3: Abschluss
- [x] **T5**: `openspec archive reviews-faq-spec-completeness -y`

## Verification
- [x] `pnpm test` — 78 Tests grün
- [x] `pnpm run lint:agent` — sauber
- [x] `pnpm run build` — 41 Seiten, `#bewertungen`-Section im dist-HTML, `scroll-margin-top`-Regel im CSS
