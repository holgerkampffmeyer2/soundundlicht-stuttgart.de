# Proposal

## Why

Codebase enthält mehrere Quick-Wins und Cleanup-Aufgaben, die sich angesammelt haben: unbenutzte Assets (2,7 MB), inkonsistenter Trailing Slash, ineffiziente Scroll-Animationen, HeroSlider ohne Accessibility-Features, ungenutzte Imports, generierte Artefakte im Repo, veraltete Dependencies, veraltete Serena Memories. Diese erhöhen Build-Größe, Wartungsaufwand und technisches Debt ohne Nutzen.

## What Changes

- **Unused Assets entfernen**: `src/assets/cities/` (30 Dateien, 2,7 MB), `src/assets/header.webp`, `src/assets/slider/*.webp` – keine Referenzen im Code
- **CityGrid Trailing Slash Fix**: Clone-Link `/${cities[0].slug}/` → `/${cities[0].slug}` (consistent mit `trailingSlash: 'never'`)
- **Scroll-Animations optimieren**: Ein `IntersectionObserver` für alle `.animate-on-scroll`; `prefers-reduced-motion` Respekt
- **HeroSlider Accessibility**: Pause on hover/focus/visibility; `prefers-reduced-motion` → Autoplay deaktivieren
- **Unused Imports/Vars entfernen**: `WishlistButton.astro:35 getCart`, `faq.astro:36 CITY_NAMES`, `faq.astro:86 totalCount`, `playwright.config.ts:2 devices`, `scripts/lib/scrape-reviews.mjs:7 page`
- **`getFaqsForPage` sync machen**: `async` entfernen (keine Awaits)
- **Merkliste In-Memory-Cache**: `loadMerkliste()` Cache vermeidet wiederholtes `JSON.parse`
- **Generierte Artefakte aus Git entfernen**: `public/rss.xml`, `public/urllist.txt` → `.gitignore` + CI generiert frisch
- **Patch-Dependency-Updates**: astro 7.4.7, tailwind 4.3.5, vite 8.3.6, eslint 10.14, vitest 5.1, playwright 1.65 (TypeScript 7 bewusst gepinnt)
- **Serena Memories aktualisieren**: `core.md`, `suggested_commands.md`, `tech_stack.md` Pfade/Befehle korrigieren

## Capabilities

### New Capabilities
*(keine – reine Cleanup/Refactor-Aufgaben)*

### Modified Capabilities
- `typescript-any-cleanup`: Unused Vars entfernt
- `feature-inventory`: Asset-Optimierung, Dependency-Updates dokumentiert

## Impact

**Betroffene Dateien:**
- `src/assets/cities/` (löschen), `src/assets/header.webp` (löschen), `src/assets/slider/*.webp` (löschen)
- `src/components/CityGrid.astro:61` (Trailing Slash)
- `src/scripts/scroll-animations.ts` (Observer + reduced-motion)
- `src/components/HeroSlider.astro` (Script: pause/reduced-motion)
- `src/components/WishlistButton.astro:35`, `src/pages/faq.astro:36/86`, `playwright.config.ts:2`, `scripts/lib/scrape-reviews.mjs:7` (Imports/Vars)
- `src/lib/faqUtils.ts:9` (sync)
- `src/lib/merklisteStore.ts` (Cache)
- `.gitignore` (+ `public/rss.xml`, `public/urllist.txt`)
- `.github/workflows/deploy.yml` (CI generiert rss/urllist)
- `package.json` (Patch-Updates)
- `.serena/memories/core.md`, `suggested_commands.md`, `tech_stack.md` (Updates)

**Skip Specs:** Ja – reine Cleanup/Refactor-Aufgaben ohne Verhaltensänderung
