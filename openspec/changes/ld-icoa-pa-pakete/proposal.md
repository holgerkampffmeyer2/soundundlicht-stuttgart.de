# Proposal

## Why

Der Verleihkatalog enthält bisher keine kompakte, aktiv betriebene PA-Linie mit 12"-Tops und 15"-Subwoofern. Das neue LD-Systems-ICOA-Setup deckt Bandproben, Theateraufführungen, mobile DJs, kleine Feiern und kurzfristige Ersatz-PA ab. Es eignet sich außerdem als Bühnenmonitor-Lösung. Die Geräte sollen als drei Paketgrößen und zusätzlich einzeln mietbar sein.

## What Changes

- **Neue Produkte in der Products-Collection** (`src/content/products/*.yml`):
  - `ld-icoa-club-paket`: 2x ICOA 12 A, 2x ICOA SUB 15 A, 2x Gravity SP 2332 B Distanzstange, Kabel – ab 150€/Tag
  - `ld-icoa-buehnen-paket`: 2x ICOA 12 A, 1x ICOA SUB 15 A, 1x Distanzstange, 1x Dreibein-Lautsprecherstativ, Kabel – ab 140€/Tag
  - `ld-icoa-top-paar`: 2x ICOA 12 A, 2x Dreibein-Lautsprecherstativ, Kabel – ab 120€/Tag
  - `ld-icoa-12-a`: 1x ICOA 12 A – ab 50€/Tag
  - `ld-icoa-sub-15-a`: 1x ICOA SUB 15 A – ab 60€/Tag
- **Drei Paket-Detailseiten** unter `src/pages/vermietung/` mit eigenen Inhalten, Anwendungen und FAQs.
- **Eine konsolidierte Systemseite** `/vermietung/ld-systems-icoa-series` mit Ankern für Top, Sub und Zubehör; die Einzelprodukte verlinken auf diese Anker.
- **Zubehör** (Distanzstangen, Dreibein-Stative, Kabel) wird wie Kabel behandelt: in Paketen enthalten, nicht als eigenes Kataloggerät geführt. Die vorhandenen Dreibein-Stative werden ohne Modellangabe als „Lautsprecherstativ“ geführt.
- **FAQs** für alle vier neuen Seiten in `src/data/faqs.json`.
- **Platzhalterbilder** für alle neuen Produkte; echte Fotos können später ohne Codeänderung ergänzt werden.
- **Navigation** um Club-Paket und ICOA-System ergänzen.
- **Playwright-Tests** für Routen, Preise, Paketinhalte, FAQs und JSON-LD.

## Capabilities

### New Capabilities

- `icoa-pa-pakete`: Paket- und Einzelmiete der LD-ICOA-PA-Linie inklusive Preisen, Anwendungen, Detailseiten, Platzhalterbildern und strukturierten Daten.

### Modified Capabilities

Keine. Bestehende Produkt-/SEO-Specs werden eingehalten, aber nicht geändert.

## Impact

**Betroffene Dateien:**

- `src/content/products/*.yml` (5 neue Dateien)
- `src/pages/vermietung/ld-icoa-*.astro` (4 neue Seiten)
- `src/data/faqs.json` (neue FAQ-Einträge)
- `src/components/Navbar.astro` (zwei neue Links)
- `public/img/vermietung/icoa-placeholder*.webp` (Platzhalter)
- `tests/icoa-pa-pakete.spec.ts` (neu)

**Nicht betroffen:**

- `CityPackages.astro` bleibt unverändert (weiterhin drei kuratierte Pakete).
- Keine neuen Dependencies.
- Kein `Product`-Schema; JSON-LD bleibt bei `Service`, `BreadcrumbList`, `FAQPage`.
