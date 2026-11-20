# Tasks

## 1. Vorbereitung

- [x] 1.1 Branch `feat/ld-icoa-pa-pakete` anlegen (Working-Tree-Änderungen bleiben erhalten)
- [x] 1.2 OpenSpec-Change `ld-icoa-pa-pakete` anlegen
- [x] 1.3 `proposal.md`, `design.md`, `tasks.md`, `specs/icoa-pa-pakete/spec.md` schreiben

## 2. Assets

- [x] 2.1 `public/img/vermietung/icoa-placeholder.webp` erzeugen
- [x] 2.2 `public/img/vermietung/icoa-placeholder-thumb.webp` erzeugen

## 3. Content

- [x] 3.1 `src/content/products/ld-icoa-club-paket.yml` anlegen
- [x] 3.2 `src/content/products/ld-icoa-buehnen-paket.yml` anlegen
- [x] 3.3 `src/content/products/ld-icoa-top-paar.yml` anlegen
- [x] 3.4 `src/content/products/ld-icoa-12-a.yml` anlegen
- [x] 3.5 `src/content/products/ld-icoa-sub-15-a.yml` anlegen
- [x] 3.6 Mindestens 3 eigene FAQs pro neuer Seite in `src/data/faqs.json` ergänzen

## 4. Seiten

- [x] 4.1 `src/pages/vermietung/ld-icoa-club-paket.astro`
- [x] 4.2 `src/pages/vermietung/ld-icoa-buehnen-paket.astro`
- [x] 4.3 `src/pages/vermietung/ld-icoa-top-paar.astro`
- [x] 4.4 `src/pages/vermietung/ld-systems-icoa-series.astro` (Anker `#ld-icoa-12-a`, `#ld-icoa-sub-15-a`, `#zubehoer`)
- [x] 4.5 JSON-LD: `Service`, `BreadcrumbList`, `FAQPage`; kein `Product`
- [x] 4.6 Interne Verlinkung: Pakete → Systemanker, Systemseite → Pakete

## 5. Integration

- [x] 5.1 `Navbar.astro`: Club-Paket und ICOA-System verlinken
- [x] 5.2 Katalog-/Homepage-Darstellung prüfen (automatisch über Collection)
- [x] 5.3 Merkliste und Kontakt-Prefill prüfen

## 6. Tests & Verifikation

- [x] 6.1 `tests/icoa-pa-pakete.spec.ts` anlegen
- [x] 6.2 `pnpm run lint:agent`
- [x] 6.3 `pnpm run build`
- [x] 6.4 `pnpm test`
- [x] 6.5 `npx playwright test tests/icoa-pa-pakete.spec.ts`
- [x] 6.6 `pnpm run build:full`
- [x] 6.7 Change archivieren: `openspec archive ld-icoa-pa-pakete -y`
