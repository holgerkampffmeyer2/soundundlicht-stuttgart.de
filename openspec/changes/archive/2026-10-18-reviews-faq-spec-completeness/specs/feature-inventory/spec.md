# Feature Inventory

## ADDED Requirements

### Requirement: RSS-Feed und LLM-Hilfsdateien

Der Build SHALL über `pnpm run build:full` zusätzlich zum statischen HTML einen RSS-Feed (`public/rss.xml` via `scripts/generate-rss.mjs`) sowie `public/llms.txt` und `public/llms-full.txt` erzeugen.

#### Scenario: RSS und llms nach Deploy-Build

- **WHEN** `pnpm run build:full` ausgeführt wird
- **THEN** existieren `public/rss.xml` (valides RSS-2.0-XML der neuesten Beiträge/Seiten) und die llms-Dateien im `public/`-Verzeichnis

### Requirement: Erweiterte Test-Abdeckung (Unit + E2E)

Neben Store- und Such-Logik SHALL die Test-Suite auch die Review-Pipeline (Unit, `scripts/fetch-google-reviews.test.mjs`, `src/data/google-reviews.test.ts`) sowie Merkliste- und Such-Interaktionen im Browser (Playwright-E2E: `tests/merkliste.spec.ts`, `tests/search.spec.ts`) abdecken.

#### Scenario: Gesamtsuite ist grün

- **WHEN** `pnpm test` (Vitest, `--pool=forks`) und `npx playwright test` ausgeführt werden
- **THEN** bestehen alle Unit-Tests (Review-Merge/Dedup/Schema, Merkliste-Store, cartData) und alle E2E-Tests (Merkliste-CRUD inkl. localStorage, Suche inkl. Overlay/Keyboard)

#### Scenario: Review-Daten-Invarianten

- **WHEN** `src/data/google-reviews.test.ts` läuft
- **THEN** prüft es Aggregate (`reviewCount` ≥ Anzahl gespeicherter Reviews), ISO-8601-Zeitstempel (wo vorhanden, in nicht-steigender Reihenfolge) und eindeutige Review-Schlüssel (Autor + Text-Präfix)
