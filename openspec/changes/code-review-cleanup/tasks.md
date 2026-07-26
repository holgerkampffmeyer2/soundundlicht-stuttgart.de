# Tasks: Code Review Cleanup

## Phase 1: Bugfixes
- [x] **T1**: CityGrid `thumbSrc` deduplizieren
- [x] **T2**: CityGrid `isAnimating` Lock fixen

## Phase 2: TypeScript Types
- [x] **T3**: ProductLayout `any` → Interfaces
- [x] **T4**: FAQSection `any` → `Faq`
- [x] **T5**: PackageCardGrid `any` → `PaketItem`
- [x] **T6**: search.ts `any`-Typen bereinigen

## Phase 3: Refactoring
- [x] **T7**: `src/lib/imageUtils.ts` erstellen
- [x] **T8**: PackageCardGrid auf imageUtils umstellen
- [x] **T9**: ContactForm toten Import entfernen
- [x] **T10**: thankyou.astro toten Fetch entfernen

## Phase 4: Doku
- [x] **T11**: AGENTS.md Extension war bereits korrekt (`.ts`)
- [x] **T12**: AGENTS.md `updateItemQuantity` Referenz entfernt

## Verification
- [x] `pnpm run build` — 29 Seiten, 35.68s, kein Fehler
- [x] `pnpm run lint` — keine neuen Fehler (28 vorher existierend)
