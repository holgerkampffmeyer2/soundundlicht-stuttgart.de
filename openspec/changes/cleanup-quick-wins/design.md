# Design

## Context

Siehe `proposal.md` – Why. Aktueller Zustand: diverse Quick-Wins angesammelt (Assets, Trailing Slash, Scroll-Animations, HeroSlider, Imports, async/sync, Cache, Git-Artefakte, Dependencies, Memories). Alle unabhängig, keine Breaking Changes.

## Goals / Non-Goals

**Goals:**
- Alle 10 Cleanup-Punkte umsetzen
- `pnpm exec astro check` → 0 Hints (unused imports weg)
- Build-Größe reduziert (Assets gelöscht)
- `pnpm test` + `pnpm run build` grün
- Memories aktuell

**Non-Goals:**
- Keine Verhaltensänderungen an Features
- Keine neuen Features

## Decisions

| Aufgabe | Entscheidung | Begründung |
|---|---|---|
| Assets löschen | `rm -rf src/assets/cities src/assets/header.webp src/assets/slider/*.webp` | Keine Referenzen im Code; `public/img/` wird genutzt |
| CityGrid Trailing Slash | `/${cities[0].slug}` statt `/${cities[0].slug}/` | Konsistent mit `trailingSlash: 'never'` |
| Scroll-Animations | Ein Observer + `matchMedia('(prefers-reduced-motion: reduce)')` | Performance + Accessibility |
| HeroSlider | Pause on hover/focus/visibility + `matchMedia` für reduced-motion | Accessibility Standard |
| Unused Imports/Vars | Einfach löschen | Keine Seiteneffekte |
| `getFaqsForPage` sync | `async` entfernen, Return-Type `FaqEntry[]` | Keine async Operation |
| Merkliste Cache | Modul-Level `let _cache` + Timestamp-Check | Vermeidet wiederholtes `JSON.parse` |
| Git-Artefakte | `.gitignore` + `public/rss.xml`, `public/urllist.txt`; CI generiert in `build:full` | Kein Datum-Churn im Repo |
| Patch-Deps | `pnpm up -L` für patch/minor; TS 7 gepinnt | Stabilität; TS 7 braucht typescript-eslint 9+ |
| Memories Update | Pfade/Befehle korrigieren | Doku aktuell halten |

## Risks / Trade-offs

- **[Risk] Assets löschen bricht Build** → `pnpm run build` nach Löschen prüfen; `git restore` möglich
- **[Risk] CI generiert rss/urllist** → Deploy-Workflow muss `generate-rss` + `update-sitemap` nach `astro build` laufen (bereits der Fall)
- **[Risk] TS 7 Pin** → typescript-eslint@8 unterstützt TS 7 nicht; Pin beibehalten bis Upgrade
- **[Trade-off] Merkliste Cache** → Minimaler Speicher; Cache-Invalidierung bei `saveMerkliste()` ausreichend

## Migration Plan

Alle Tasks unabhängig → parallelisierbar:
1. Assets löschen → Build prüfen
2. CityGrid Trailing Slash Fix
3. Scroll-Animations refactoren
4. HeroSlider Script erweitern
5. Unused Imports/Vars löschen
6. `getFaqsForPage` sync + Tests anpassen
7. Merkliste Cache implementieren
8. `.gitignore` + CI prüfen
9. `pnpm up -L` (Patch) → Tests
10. Memories aktualisieren
11. `pnpm exec astro check`, `pnpm test`, `pnpm run build` → alle grün

Rollback: `git revert` pro Commit; Assets via `git restore`.

## Open Questions

Keine.
