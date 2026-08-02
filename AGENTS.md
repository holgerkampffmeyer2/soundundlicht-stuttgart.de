# Agent Instructions – Sound & Licht Stuttgart

## Projektübersicht
Astro 7.x SSG-Website für Veranstaltungstechnik-Verleih (PA-Anlagen, Partyboxen, Lichttechnik) im Großraum Stuttgart. Dark Theme, statischer Deploy auf GitHub Pages. Inhalte über Content Collections (products YAML, faqs JSON, cities JSON).

## Tech-Stack
- **Framework:** Astro 7.x (SSG, `output: 'static'`, `trailingSlash: 'never'`)
- **Styling:** Tailwind CSS 4.x, Dark Theme, CSS Custom Properties
- **Content:** Content Collections (products YAML, faqs JSON, cities JSON) mit Zod-Validierung
- **Search:** Pagefind (via `astro-pagefind`) — clientseitige Volltextsuche
- **Package-Manager:** pnpm
- **Tests:** Vitest (Unit) + Playwright (E2E)
- **Deploy:** GitHub Pages (static)

## Schnellstart / Docs
- [docs/DESIGN.md](docs/DESIGN.md) — Projektstruktur, Farbsystem, Komponenten, Animationen
- [docs/theme-system.md](docs/theme-system.md) — vollständige Token-Tabellen aller Themes
- [docs/citypage.md](docs/citypage.md) — Anleitung für neue City-Seiten
- [docs/search.md](docs/search.md) — Suche (Pagefind) im Detail
- [docs/seo.md](docs/seo.md) — SEO-Richtlinien & JSON-LD je Seitentyp
- [docs/wishlist.md](docs/wishlist.md) — Merkliste (Wunschliste) im Detail

## Build- & Test-Kommandos
- `pnpm run dev` — Dev server
- `pnpm run build` — Production build → dist/ (für tägliche Entwicklung)
- `pnpm run build:full` — Build + RSS + urllist (für Deploy)
  - **Timeout:** Build braucht ~22s → Agent muss min. 60s Timeout setzen
- `pnpm run build:images` — WebP-Optimierung via Sharp (JPG/PNG in `public/img/`)
- `pnpm run build:full-with-images` — Images + Build + RSS + urllist
- `pnpm run preview` — Preview build
- `pnpm run lint` — ESLint code linting
- `npx vitest run` — Unit-Tests (Vitest)
- `npx playwright test` — E2E-Tests (Playwright)

Build output: `dist/` (static HTML + sitemap), `public/rss.xml`, `public/urllist.txt`.

## CLI-Proxy `rtk`

- Befehle können über den Proxy `rtk` (z.B. `rtk lint`, `rtk pnpm run build`) gefiltert werden.
- **Falls `rtk <cmd>` fehlerhaft/leer läuft** (z.B. `ESLint output (JSON parse failed: EOF ...)`), den Proxy deaktivieren und den Befehl direkt ausführen:
  ```bash
  RTK_DISABLED=1 pnpm run lint
  ```
- `RTK_DISABLED=1` schaltet die Hook-/Proxy-Funktion von rtk komplett ab (kein Wrapping, volle Rohausgabe).

## Git-Workflow
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `ci:`
- Features auf eigenen Branches entwickeln
- Vor Commit: Build und Lint testen (`pnpm run build && pnpm run lint`)
- Keine Secrets (API-Keys, Passwörter) committen

## Definition of Done
- Nach Quellcode-Änderungen: `pnpm run lint && pnpm run build` (Tests falls betroffen)
- Nach reinen .md-Änderungen: direkt push (kein lint/build)
- Keine offenen TODOs im finalen Code hinterlassen

## Arbeitsweise
- Kleine, nachvollziehbare Änderungen bevorzugen
- Bestehende Patterns zuerst wiederverwenden, dann abstrahieren
- Bei unklaren Anforderungen lieber vorhandene Komponenten erweitern statt neue Systeme einführen

## Wichtige Regeln & Grenzen

### Immer
- Domain: `soundundlicht-stuttgart.de`
- Preise als `"ab XX€"`-Text, nie fester Betrag
- Nach `build:full` für Deploy `indexnow-submit` ausführen

### Vorher fragen
- Dependencies hinzufügen
- Analytics-, Consent- oder Payment-Integrationen ändern

### Nie
- Secrets (API-Keys, Passwörter) committen
- Produktive URLs hart codieren (Domain ist `soundundlicht-stuttgart.de`)

## Wissen & Referenzen
- `docs/` — detaillierte Projekt-Doku (Suche, SEO, Merkliste, Design)
- `openspec/` — Feature-Specs (OpenSpec)
- `.serena/memories/` — persistentes Projektwissen (Tech-Stack, Konventionen); vor größeren Änderungen relevante Memories lesen

## OpenSpec Feature Development

This project uses OpenSpec for spec-driven development. To define and implement future features:

1. **Create a new change**:
   ```bash
   openspec new change "<feature-name>"
   ```
2. **Define artifacts**: Fill in `proposal.md`, `design.md`, `tasks.md`, and delta specs under `openspec/changes/<feature-name>/specs/`.
3. **Apply & Implement**: Implement the feature according to the specs and tasks.
4. **Archive & Sync**:
   ```bash
   openspec archive <feature-name> -y
   ```

## IndexNow (URL-Submission)

- `pnpm run indexnow-submit` — sendet alle URLs aus `public/urllist.txt` an `api.indexnow.org`
- Vorher immer `pnpm run build:full` ausführen (aktualisiert `urllist.txt`)
- Google wird nicht unterstützt — dafür Google Search Console nutzen

## Suche (Pagefind)

Kurzübersicht: clientseitige Volltextsuche über `astro-pagefind`, Katalog-Matching für `/vermietung/`, `data-pagefind-ignore` auf Navbar/Footer. Details & Tests: [docs/search.md](docs/search.md).

## SEO-Richtlinien

Kurzübersicht: JSON-LD je Seitentyp (Service, OfferCatalog, FAQPage, Product), Preise immer `"ab XX€"`, Titel-Pattern `"<Keyword> mieten in <Stadt> | Sound & Licht Stuttgart"`. Details: [docs/seo.md](docs/seo.md).

## Merkliste (Wunschliste für Anfragen)

Kurzübersicht: clientseitige Merkliste via `localStorage` (`sls_merkliste`), Komponenten `WishlistIcon`/`WishlistDrawer`/`WishlistButton`/`StickyMerkliste`, Events `toggle-merkliste`/`merkliste-prefill`. Details & Tests: [docs/wishlist.md](docs/wishlist.md).
