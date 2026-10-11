# Tasks

## 1. Content & Datenmodell

- [x] 1.1 `src/content/products/af-150.yml` anlegen (slug `af-150`, `category: Licht`, `price: "ab 20€ / Tag"`, `priceValue: 20`, `detailPage: /vermietung/nebelmaschinen#af-150`)
- [x] 1.2 `src/content/products/nebel-maschine.yml` `detailPage` → `/vermietung/nebelmaschinen#nebel-maschine`
- [x] 1.3 ≥3 unique FAQs mit `pages: ["nebelmaschinen"]` in `src/data/faqs.json` ergänzen; `getFaqsForPage('nebelmaschinen')` liefert ≥3

## 2. Nebelmaschinen-Seite

- [x] 2.1 `src/pages/vermietung/nebelmaschinen.astro` (CategoryLayout: Hero, DecisionHelp, Anker `#af-150` + `#nebel-maschine`, RelatedLinks, FAQ)
- [x] 2.2 JSON-LD `Service` (offers je Gerät) + `BreadcrumbList` + `FAQPage`, kein `Product`; `pagefindMeta` gesetzt

## 3. Bestehende Seiten & Verlinkung

- [x] 3.1 `led-bossfx-nebelmaschine.astro`: Variantenabschnitt `#nebel-maschine` + `specsNebel` entfernen, Cross-Link zur Nebel-Seite ergänzen
- [x] 3.2 Paketseiten (Party/Veranstaltung/DJ): AF-150-`detailPage` → `/vermietung/nebelmaschinen#af-150`
- [x] 3.3 `kls-laser-bar.astro`: Cross-Link auf `/vermietung/nebelmaschinen#nebel-maschine`

## 4. Doku & Verifikation

- [x] 4.1 `docs/DESIGN.md` (Routenliste, Seitenübersicht, Produktanzahl) + `public/llms.txt` aktualisieren
- [x] 4.2 `pnpm run lint:agent && pnpm run build` — fehlerfrei, Seite + Anker vorhanden
- [x] 4.3 `pnpm test` (Vitest, `--pool=forks`) — grün
- [x] 4.4 Deploy: `pnpm run build:full && pnpm run indexnow-submit`
