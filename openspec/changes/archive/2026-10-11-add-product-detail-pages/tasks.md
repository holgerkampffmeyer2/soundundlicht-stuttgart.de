# Tasks

## 1. Content (zuerst – Grundlage für FAQ-Schema)

- [x] 1.1 FAQs für die drei Detailseiten (`powerstation`, `mini-party-beamer`, `max-party-bar`) in `src/data/faqs.json` ergänzen (je ≥3, `pages[]`-Mapping) und mit `node -e`/Build prüfen, dass `getFaqsForPage('<slug>')` je Seite ≥3 zurückgibt
- [x] 1.2 FAQs für die Kategorieseiten (`mikrofon-mischpult`, `led-scheinwerfer`) ergänzen (je ≥3) und Rückgabe via `getFaqsForPage` verifizieren
- [x] 1.3 Texte je Seite autorisieren: Hero-Intro, „Wann brauchst du das?", „Dazu passend" (Ich-Perspektive, kein wörtlicher Kartentext) — als Markdown/Inline-Content in den Seiten abgelegt
- [x] 1.4 Technische Daten + Inklusivleistungen je Produkt festlegen (Details zu `TechnicalSpecs`/`RentalIncludes`/`PackageContents`), fachlich aus YAML/Herstellerdaten abgeleitet

## 2. Datenmodell

- [x] 2.1 `detailPage` der betroffenen Produkte in `src/content/products/*.yml` auf echte Routen/Anker setzen (`powerstation`, `mini-party-beamer`, `max-party-bar` → eigene Route; `mikrofon`, `yamaha-mischpult` → `/vermietung/mikrofon-mischpult#<slug>`; LED-Familie → `/vermietung/led-scheinwerfer#<slug>`; `beamz-mhl36` → `/vermietung/partylicht-moving-head#beamz-mhl36`; `nebel-maschine` → `/vermietung/led-bossfx-nebelmaschine#nebel-maschine`); Verify: `pnpm run build` lädt alle Produkte fehlerfrei
- [x] 2.2 Bugfix `mikrofon.yml`: `category: Licht` → `Sound`; Verify: Produkt erscheint im Build in der Sound-Sektion von `/vermietung`

## 3. Detailseiten (3)

- [x] 3.1 `src/pages/vermietung/powerstation.astro` nach bestehendem `ProductLayout`-Muster erstellen (Hero, Entscheidungshilfe, `TechnicalSpecs`, `RentalIncludes`, `RentalPricing`, `ExampleEvents`, FAQ, `Service`/`Breadcrumb`/`FAQPage`-Schema, `preloadImage`); Verify: Seite baut, ein `<h1>`, JSON-LD enthält `Service` (kein `Product`)
- [x] 3.2 `src/pages/vermietung/mini-party-beamer.astro` analog erstellen; Verify: Build ok + Schema valide
- [x] 3.3 `src/pages/vermietung/max-party-bar.astro` analog erstellen; Verify: Build ok + Schema valide

## 4. Kategorieseiten (2)

- [x] 4.1 Neue Komponente `src/components/vermietung/CategoryLayout.astro` (Hero → Produkt-Grid mit `id`-Ankern + `scroll-margin-top` → Entscheidungshilfe → Specs/Inklusiv je Gerät → FAQ → CTA); Verify: Komponente rendert 2–4 Produkte mit Anker-IDs
- [x] 4.2 `src/pages/vermietung/mikrofon-mischpult.astro` (mikrofon, yamaha-mischpult) erstellen, ein `Service` mit zwei `offers`, FAQ, Breadcrumb; Verify: Anker `#mikrofon`/`#yamaha-mischpult` springen korrekt, Schema valide
- [x] 4.3 `src/pages/vermietung/led-scheinwerfer.astro` (4 Produkte) erstellen, ein `Service` mit mehreren `offers`; Verify: alle 4 Anker vorhanden, Schema valide

## 5. Bestehende Seiten erweitern (Kannibalisierungs-Merge)

- [x] 5.1 `src/pages/vermietung/partylicht-moving-head.astro` um Variante `beamz-mhl36` ergänzen (eigener Anker `#beamz-mhl36`, Beschreibung/Abgrenzung Wash vs. Gobo) + Cross-Link; Verify: Anker erreichbar, Build ok
- [x] 5.2 `src/pages/vermietung/led-bossfx-nebelmaschine.astro` um Variante `nebel-maschine` ergänzen (Anker `#nebel-maschine`, Abgrenzung Kompakt-Kombi vs. 1200W) + Cross-Link; Verify: Anker erreichbar, Build ok

## 6. Interne Verlinkung

- [x] 6.1 `src/pages/vermietung.astro`: Link-Bedingung für Sound- und Licht-Sektion auf `item.detailPage` ändern (Anker-Ziele erlauben); Verify: Zubehör-Karten zeigen „Mehr Infos" und linken auf Kategorienanker
- [x] 6.2 `src/components/CityEinzeltechnik.astro`: „Details"-Link rendern, wenn `detailPage` gesetzt; Verify: City-Seite zeigt Link, Ziel existiert (kein 404)
- [x] 6.3 `IncludedInPackages.astro` in zutreffenden Produktseiten einbinden (z. B. Mikrofon → Karaoke-Paket) und Paketseiten mit Zubehör-Cross-Links ergänzen; Verify: Cross-Links bidirektional vorhanden

## 7. Verifikation & Deploy

- [x] 7.1 `pnpm run lint:agent && pnpm run build` — keine Fehler, alle neuen Seiten im `dist/` vorhanden
- [x] 7.2 `pnpm test` (Vitest, `--pool=forks`) — alle Tests grün
- [x] 7.3 Schema-Validierung der neuen Seiten (Rich-Results-/Schema-Validator): `Service`, `BreadcrumbList`, `FAQPage` valide, kein `Product`
- [x] 7.4 Linkcheck der neuen Seiten: keine Orphan-Seiten (von Übersicht/City/Paket verlinkt), keine toten Anker
- [x] 7.5 `public/llms.txt` um neue Seiten ergänzen und `docs/seo-improvement-plan.md` Backlog-Punkt 10 aktualisieren
- [x] 7.6 `pnpm run build:full && pnpm run indexnow-submit` nach dem Merge; Verify: neue URLs in `urllist.txt` + Sitemap enthalten
