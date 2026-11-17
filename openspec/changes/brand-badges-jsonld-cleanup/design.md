# Design

## Context

Siehe `proposal.md` für Motivation. Ausgangslage:
- 27 Produkt-YAMLs in `src/content/products/` ohne `brands`-Feld
- 16 Detailseiten + 4 Kategorieseiten rendern Hero mit Preis/Plug-Badge
- `CategoryLayout.astro` rendert Produktkarten auf Übersichtsseiten
- `src/data/jsonLd.ts` liefert Builder für `serviceJsonLd`, `videoJsonLd`, `breadcrumbJsonLd`
- `IncludedInPackages.astro` rendert Links mit permanentem Underline
- Einmal-Migrationsskripte in `scripts/migrate_*.py`, `scripts/fix_*.py` (untracked)
- `public/urllist.txt` enthält noch alte Route `ld-icoa-system` (nur lokal)
- Alle Tests grün (`pnpm test`, Playwright 17/17)

## Goals / Non-Goals

**Goals:**
- `brands: string[]` optional in Content Schema; nur belegte Marken gepflegt
- `BrandBadges.astro` Komponente (Pills, text-only, keine Logos) im Hero neben Preis/Plug
- Badges auf Kategorieseiten: Hero (aggregiert) + Produktabschnitte/Karten
- `jsonLd.ts`: `absoluteUrl()` Helper; Service-Images, Video-Thumbnails, Breadcrumb-Items absolut
- `videoJsonLd` optionale `uploadDate`/`duration`; Karaoke/Partypaket korrigieren; 5 Seiten ohne VideoObject
- `IncludedInPackages` Link-Stil: kein permanenter Underline, nur `hover:underline`
- `build:full` regeneriert `urllist.txt` ohne alte Route
- Cleanup: Migrationsskripte löschen, ungenutzte Variablen entfernen
- Tests: keine Platzhalter, VideoObject-Count, absolute URLs, Badge-Sichtbarkeit

**Non-Goals:**
- Kein `brand`-Property in JSON-LD (Schema bleibt `Service` ohne Brand)
- Keine Logo-Bilder, keine externen Assets
- Kein Redirect für alte Route (nie live)
- Keine Änderungen an Preisen, Inhalten, FAQs
- Keine neuen Dependencies

## Decisions

### 1. Marken-Datenmodell: `brands` in Content Collections
**Entscheidung:** Optionales `brands: z.array(z.string()).optional()` in `src/content.config.ts` ergänzen.
**Begründung:** Single Source of Truth im Content; TypeScript-Typen via Astro Content Collections automatisch; keine Code-Mappings nötig.
**Alternative:** Hardcoded Map in `jsonLd.ts` oder `lib/brands.ts` – verworfen, da wartungsintensiv und inkonsistent mit bestehendem Content-Ansatz.

### 2. Badge-Komponente: `BrandBadges.astro` (nicht `BrandBadge`)
**Entscheidung:** Eine Komponente, die ein Array `brands: string[]` entgegennimmt und für jede Marke eine Pill rendert (`<span class="brand-badge">`). Kein `label`-Prop („Marke“).
**Begründung:** Pakete haben mehrere Marken → mehrere Pills. Einzelprodukt = ein Array mit einem Element. Kein zusätzlicher „Marke“-Label-Text nötig (UI spricht für sich).
**Alternative:** Einzelnes `BrandBadge`-Component pro Marke, aufrufend in `.map()` – funktioniert, aber erfordert Import/Loop in jeder Seite. Zentralisierte Komponente ist DRY.

### 3. Badge-Platzierung: Im Hero-Flex-Container nach Plug-Badge
**Entscheidung:** In allen Detailseiten das `<BrandBadges brands={product.brands} />` direkt in die bestehende Flex-Zeile (`<div class="flex flex-wrap gap-3 mt-3 mb-2">`) nach dem Plug-Badge einfügen.
**Begründung:** User-Entscheidung (Hero neben Preis). Minimaler Diff, keine Layout-Änderung. Responsives Wrapping via `flex-wrap` bereits vorhanden.
**Alternative:** Eigene Zeile unter Hero – verworfen (mehr vertikaler Raum, nicht „neben Preis“).

### 4. Kategorieseiten: Aggregation im Hero + pro Produkt
**Entscheidung:**
- Hero: `uniqueBrands = [...new Set(products.flatMap(p => p.brands ?? []))]` → Badges
- Produktabschnitte/Karten: jeweiliges `product.brands`
**Begründung:** User-Entscheidung (Detail- und Kategorieseiten). Hero zeigt Markenvielfalt der Kategorie; Abschnitte/Karten konkrete Zuordnung.

### 5. JSON-LD Absolute URLs: Zentraler Helper in `jsonLd.ts`
**Entscheidung:** `const SITE_URL = "https://soundundlicht-stuttgart.de"; const absoluteUrl = (p: string) => new URL(p, SITE_URL).href;` in `jsonLd.ts` exportieren und in allen Buildern nutzen.
**Begründung:** Ein Ort, konsistent, TypeScript-sicher. `new URL()` handhabt relative und absolute Pfade korrekt.
**Alternative:** Astro `site` Config aus `astro.config.mjs` zur Build-Zeit injizieren – überkomplex für statische Domain.

### 6. VideoObject: Optionale Metadaten statt Defaults
**Entscheidung:** `videoJsonLd` Signatur erweitern: `meta?: { uploadDate?: string; duration?: string }`. Karaoke/Partypaket übergeben explizite Werte; 5 bestehenden Videos behalten Defaults (2024-03-15 / PT1M32S) – keine Migration nötig.
**Begründung:** User will nur Platzhalter bereinigen; bestehende Metadaten nicht auditieren. Optionale Parameter vermeiden Breaking Change für 5 Seiten.

### 7. Link-Stil: CSS-only Fix in `IncludedInPackages.astro`
**Entscheidung:** `.included-in-packages-link { text-decoration: none; } .included-in-packages-link:hover { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 4px; }` – Farben bleiben `var(--color-secondary)` / `white` auf Hover.
**Begründung:** Site-Standard ist `hover:underline` (siehe `PackageContents`). Kein JS, keine Klasse ändern.

### 8. Cleanup: Skripte nach Verifikation löschen
**Entscheidung:** Einmal-Skripte (`scripts/migrate_*.py`, `scripts/fix_*.py`) nach erfolgreichem Build+Tests manuell löschen. Nicht im CI automatisieren.
**Begründung:** Untracked, einmalig, kein Risiko bei manuellem Löschen nach Verifikation.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| YAML-Pflege vergessen → Badges fehlen | CI-Check: `grep -r "brands:" src/content/products/` in PR-Check; fehlende Einträge als Warnung |
| `absoluteUrl` bricht bei leeren Strings | Guard: `if (!path) return path;` vor `new URL()` |
| Karaoke/Partypaket Video-Metadaten falsch | Explizite Werte im Code; Unit-Test für `videoJsonLd` mit Meta-Objekt |
| `urllist.txt` nicht regeneriert | `build:full` manuell prüfen; `grep ld-icoa-system public/urllist.txt` muss leer sein |
| Badge-Layout bricht auf Mobile | `flex-wrap` + `gap-3` bereits vorhanden; Pill `white-space: nowrap` verhindern |
| `brand` im JSON-LD versehentlich eingefügt | Kein Code-Change an Schema-Buildern für `brand`; Specs verbieten es explizit |

## Migration Plan

1. **Content Schema & YAMLs** – `content.config.ts` + 27 YAMLs (Marken eintragen)
2. **Badge-Komponente** – `BrandBadges.astro` erstellen + Styles
3. **Detailseiten** – Import + Platzierung in 16 Hero-Flex-Containern
4. **Kategorieseiten** – 4 Seiten: Hero-Aggregation + Produktabschnitte; `CategoryLayout` Karten
5. **JSON-LD** – `jsonLd.ts` Helper + Builder-Anpassungen; 7 Video-Seiten anpassen (2 befüllen, 5 entfernen)
6. **Link-Stil** – `IncludedInPackages.astro` CSS
7. **Build & Verifikation** – `pnpm run lint:agent && pnpm run build && pnpm test && npx playwright test && pnpm run build:full`
8. **Cleanup** – Migrationsskripte löschen, `urllist.txt` prüfen
9. **OpenSpec** – Tasks abhaken, Change archivieren

**Rollback:** `git revert` auf Change-Commits; keine DB-Migrationen, keine externen Dependencies.

## Open Questions

Keine – alle Entscheidungen durch User-Antworten und bestehende Konventionen geklärt.
