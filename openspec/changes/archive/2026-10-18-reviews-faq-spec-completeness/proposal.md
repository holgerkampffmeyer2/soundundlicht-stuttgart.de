# Proposal: Reviews/FAQ Spec Completeness

## Why

Die OpenSpec-Specs decken den aktuellen Funktionsumfang unvollständig ab. Nach dem Wechsel des Review-Scrapings von Docker auf einen Playwright-Scraper mit angemeldeter Session (31 statt 5 Reviews, Paginierung) existiert keine Spec; ebenso wenig für die eigenständige FAQ-Seite `/faq`. Zusätzlich sprang der Anker `/#bewertungen` hinter die fixed Navbar, da `section[id]` kein `scroll-margin-top` hat. Ziel: Specs + Tests bilden die Website vollständig ab.

## What Changes

- **Neu-Spec `reviews-testimonials`**: Testimonials-Komponente (3er-Paginierung, Datenreihenfolge neueste zuerst), Datenpipeline `scripts/fetch-google-reviews.mjs` + `scripts/lib/{gmaps-session,scrape-reviews,review-pipeline}.mjs` (persistentes Browserprofil, `pnpm run gmaps:login`, Merge/Dedup), JSON-LD `aggregateRating` aus `src/data/google-reviews.json`.
- **Neu-Spec `faq-page`**: `/faq` gruppiert alle FAQs nach Themen (Allgemein, Pakete, Sound, Licht, Standorte), inline `FAQPage`-JSON-LD mit allen Einträgen, Footer-Link (Navbar-Eintrag entfernt).
- **Delta `feature-inventory`**: RSS (`public/rss.xml`) und `llms.txt`/`llms-full.txt` als Requirements; Test-Suite-Ergänzung (Playwright-E2E Merkliste/Suche, Scraper-Pipeline-Unit-Tests).
- **Bugfix**: `section[id] { scroll-margin-top: 160px }` in `global.css` (Anker `#bewertungen` landet korrekt unter der fixed Navbar).

## Capabilities

### New Capabilities
- `reviews-testimonials`: Review-Anzeige mit Paginierung und Google-Scraping-Pipeline.
- `faq-page`: Themenseite `/faq` mit allen FAQs und FAQPage-JSON-LD.

### Modified Capabilities
- `feature-inventory`: RSS/llms.txt-Outputs und erweiterte Testabdeckung ergänzt.

## Impact

- `src/styles/global.css` (Anker-Fix, einzige Code-Änderung; Rest ist bereits implementiert und wird durch diese Specs nur dokumentiert/abgesichert).
- `openspec/specs/`: zwei neue Spec-Verzeichnisse, ein Delta auf `feature-inventory`.
- Tests: bestehende `scripts/fetch-google-reviews.test.mjs`, `src/data/google-reviews.test.ts`, `tests/*.spec.ts` diessen als Abnahmekriterien.
