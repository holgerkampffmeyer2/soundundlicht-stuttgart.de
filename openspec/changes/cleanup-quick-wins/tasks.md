# Tasks

## 1. Assets & Trailing Slash

- [ ] 1.1 Unbenutzte Assets löschen: `rm -rf src/assets/cities src/assets/header.webp src/assets/slider/*.webp`
  - Verifikation: `pnpm run build` erfolgreich; `git status` zeigt gelöschte Dateien

- [ ] 1.2 CityGrid Trailing Slash Fix: `src/components/CityGrid.astro:61` → `<a href={`/${cities[0].slug}`}>` (ohne Slash)
  - Verifikation: `pnpm exec astro check` grün; Build generiert korrekte Links

## 2. Scripts & Accessibility

- [ ] 2.1 `src/scripts/scroll-animations.ts` refactoren: Ein `IntersectionObserver` für alle `.animate-on-scroll`; `prefers-reduced-motion` Check → direkt `.visible` setzen
  - Verifikation: `pnpm run build` grün; Animationen funktionieren; reduced-motion respektiert

- [ ] 2.2 `src/components/HeroSlider.astro` Script erweitern:
  - Pause on `mouseenter`/`mouseleave` (hover), `focusin`/`focusout` (focus)
  - `visibilitychange` Event → pause/resume
  - `matchMedia('(prefers-reduced-motion: reduce)')` → Autoplay deaktivieren
  - Verifikation: Autoplay pausiert bei Hover/Focus; reduced-motion deaktiviert Autoplay

## 3. Code Cleanup (Imports/Vars/Async)

- [ ] 3.1 Unused Imports/Vars löschen:
  - `src/components/WishlistButton.astro:35` `import { getCart }`
  - `src/pages/faq.astro:36` `const CITY_NAMES`
  - `src/pages/faq.astro:86` `const totalCount`
  - `playwright.config.ts:2` `devices` Import
  - `scripts/lib/scrape-reviews.mjs:7` `page` Parameter
  - Verifikation: `pnpm exec astro check` → 0 Hints für diese Dateien

- [ ] 3.2 `src/lib/faqUtils.ts:9`: `async` aus `getFaqsForPage` entfernen, Return-Type `FaqEntry[]`
  - Verifikation: `pnpm exec astro check` grün; keine async-Warnungen

- [ ] 3.3 `src/lib/faqUtils.test.ts`: Tests anpassen (`await` entfernen)
  - Verifikation: `pnpm test` → faqUtils Tests grün

## 4. Performance & Git Hygiene

- [ ] 4.1 `src/lib/merklisteStore.ts`: In-Memory-Cache (`let _cache: MerklisteData | null = null`); `loadMerkliste()` prüft Cache + Timestamp; `saveMerkliste()` invalidiert Cache
  - Verifikation: `pnpm test` → merklisteStore Tests grün; keine Verhaltensänderung

- [ ] 4.2 `.gitignore` erweitern: `public/rss.xml`, `public/urllist.txt` hinzufügen
  - Verifikation: `git status` zeigt diese Dateien nicht mehr als tracked

- [ ] 4.3 CI prüfen: `.github/workflows/deploy.yml` generiert `rss.xml` + `urllist.txt` in `build:full` (bereits der Fall)
  - Verifikation: Workflow läuft durch, Artefakte werden generiert

## 5. Dependencies & Memories

- [ ] 5.1 Patch-Dependency-Updates: `pnpm up -L` für astro (7.4.7), tailwind (4.3.5), vite (8.3.6), eslint (10.14), vitest (5.1), playwright (1.65); **nicht** TypeScript 7 (gepinnt), jsdom 31 nur wenn kompatibel
  - Verifikation: `pnpm test` + `pnpm run build` grün; `pnpm exec astro check` grün

- [ ] 5.2 Serena Memories aktualisieren:
  - `.serena/memories/core.md`: `src/content/content.config.ts` → `src/content.config.ts`
  - `.serena/memories/suggested_commands.md`: `update-reviews` via Docker → Playwright Profil
  - `.serena/memories/tech_stack.md`: Astro ^7.3 → ^7.4
  - Verifikation: Memories lesen → korrekte Infos

## 6. Verifikation

- [ ] 6.1 `pnpm exec astro check` → 0 Errors, 0 Warnings, 0 Hints
- [ ] 6.2 `pnpm run lint:agent` → keine Fehler
- [ ] 6.3 `pnpm test` → alle Unit-Tests grün
- [ ] 6.4 `pnpm run build` → Build erfolgreich
- [ ] 6.5 Optional: `npx playwright test` → E2E grün

## Workflow follow-up

- Change archivieren: `openspec archive cleanup-quick-wins -y`
- Memories Commit separat (Chore)
