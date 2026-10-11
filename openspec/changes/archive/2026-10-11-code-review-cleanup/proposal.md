# Proposal: Code Review Cleanup

## Problem
Code Review hat 12 Findings identifiziert:
- 2 kritische Bugs (CityGrid: doppelte Funktion + Carousel-Lock)
- 4 TypeScript `any`-Typen (Typ-Safety)
- 4 Code-Qualitäts-Probleme (duplizierter Code, tote Imports)
- 2 Dokumentations-Inkonsistenzen (AGENTS.md)

## Lösungsansatz
Phasierte Bereinigung in 4 Phasen:

1. **Phase 1 - Bugfixes**: CityGrid `thumbSrc` deduplizieren, `isAnimating` Lock fixen
2. **Phase 2 - Types**: `any` → konkrete Interfaces in 4 Dateien
3. **Phase 3 - Refactoring**: Shared `imageUtils.ts`, tote Imports entfernen, doppelte Logik konsolidieren
4. **Phase 4 - Doku**: AGENTS.md korrigieren

## Betroffene Dateien (9)
- `src/components/CityGrid.astro`
- `src/components/vermietung/ProductLayout.astro`
- `src/components/FAQSection.astro`
- `src/components/PackageCardGrid.astro`
- `src/components/ContactForm.astro`
- `src/pages/thankyou.astro`
- `src/scripts/search.ts`
- `src/lib/imageUtils.ts` (NEU)
- `AGENTS.md`

## Risiko
Niedrig — keine funktionalen Änderungen außer Bugfixes. Build erfolgreich, Lint zeigt keine neuen Fehler.
