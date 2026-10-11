# Design

## Context

Motivation siehe `proposal.md – Why`; Anforderungen siehe `specs/product-detail-pages/spec.md` und `specs/city-einzeltechnik/spec.md`.

Aktueller Zustand (verifiziert):

- **Übersicht** (`src/pages/vermietung.astro:294,350`) rendert den „Mehr Infos"-Link nur, wenn `!item.detailPage.includes('#')`. Die 11 Produkte haben `detailPage: /vermietung#item-<slug>` und bekommen daher bewusst keinen Link.
- **Produktseiten** nutzen `src/components/vermietung/ProductLayout.astro`. Dieses ist **Ein-Produkt-only**: `ProductCTA` erhält `product.slug`, `StickyMerkliste` ein `productSlug`. Eine Kategorieseite mit mehreren Produkten lässt sich damit nicht sinnvoll abbilden.
- **City-Seiten** spielen 2–3 Produkte als „Einzeltechnik" aus (`CityEinzeltechnik.astro`), aber **ohne Detail-Link** (nur „Merken").
- **`IncludedInPackages.astro`** existiert, wird aber nirgends importiert (verwaist).
- Die 11 Produkte haben **0 FAQs**; bestehende Seiten 4–8. Bilder: meist 1 pro Produkt.
- Schema-Entscheidung aus dem SEO-Plan: **kein `Product`-Schema**, stattdessen angereichertes `Service`.
- Sitemap vergibt `/vermietung/…` bereits Priorität 0.8; neue Seiten werden automatisch erfasst.

## Goals / Non-Goals

**Goals:**
- Konsolidierte Zielseiten (3 Detail + 2 Kategorie) statt 11 dünner Seiten.
- Zwei klar getrennte Seitentypen mit eigenem Layout/Template.
- Ankerfähige `detailPage`-Ziele und sichtbare Links von Übersicht und City-Karten.
- Wiederverwendung vorhandener Komponenten (`TechnicalSpecs`, `RentalIncludes`, `RentalPricing`, `ExampleEvents`, `PackageContents`, `IncludedInPackages`).

**Non-Goals:**
- `Product`-Schema, Festpreise, Lieferung/Aufbau, Galerien/neue Bilder, Umbenennung bestehender indexierter Routen.

## Decisions

### D1: Konsolidierung und Kannibalisierungs-Merges
- Eigene Detailseite: `powerstation`, `mini-party-beamer`, `max-party-bar`.
- Kategorieseite: `mikrofon` + `yamaha-mischpult` → `/vermietung/mikrofon-mischpult`; `led-par-strahler` + `led-par-lichter` + `akku-led-par` + `showlight-stage-bar` → `/vermietung/led-scheinwerfer`.
- Variante auf bestehender Seite (kein neues Keyword-Duplikat): `beamz-mhl36` → `partylicht-moving-head`; `nebel-maschine` → `led-bossfx-nebelmaschine`.
- **Alternativen erwogen:** 11 Einzelseiten (verworfen: Thin Content/Doorway); nur Top-3 (verworfen: deckt Long-Tail nicht ab).

### D2: Zwei Seitentypen, Kategorieseite als neue Komponente
Detailseiten folgen dem bestehenden Muster (`ProductLayout` + Bausteine). Kategorieseiten erhalten eine neue Komponente `CategoryLayout.astro` (Hero → Vergleichs-Grid mit Ankern → „Welches Gerät passt zu dir?" → Specs/Inklusiv je Gerät → FAQ → CTA), weil `ProductLayout` durch Single-Product-CTA/Sticky nicht passt. **Alternative:** `ProductLayout` um einen Multi-Product-Modus erweitern — verworfen, da es den produktseiten-kritischen Pfad verzweigt.

### D3: Routen, Anker und Link-Gating
- Kategorieseiten-Routen: `/vermietung/mikrofon-mischpult`, `/vermietung/led-scheinwerfer`.
- `detailPage` gebündelter Produkte = `/vermietung/<kategorie>#<slug>`.
- `vermietung.astro`: Bedingung von `item.detailPage && !item.detailPage.includes('#')` auf `item.detailPage` ändern, damit auch Anker-Ziele verlinkt werden (`specs/product-detail-pages` „Übersichtskarte verlinkt auch bei Anker-Ziel").
- Alte `#item-<slug>`-Anker auf `/vermietung` bleiben bestehen (Rückwärtskompatibilität, keine toten Links).

### D4: Anker-Offset
Da Navbar/Sticky-Nav die Zielüberschrift bei Anchor-Sprüngen verdecken kann, bekommen Ankerabschnitte `scroll-margin-top` (analog bestehender Sprungmarken).

### D5: FAQs Pflicht
Je neuer Seite ≥3 unique FAQs in `src/data/faqs.json` mit `pages: ["<slug>"]`; Ausgabe über `getFaqsForPage('<slug>')`. Kategorieseiten können FAQ-Einträge pro Gerät oder je Kategorie bündeln.

### D6: Schema
`Service` + `serviceType` + `areaServed` + `provider` + `offers`/`UnitPriceSpecification` (wie bestehende Seiten), `BreadcrumbList`, `FAQPage`. Kategorieseiten: ein `Service` mit mehreren `offers` (je Produkt) bzw. `hasOfferCatalog`. Kein `Product`. Product-Lookup-Slugs (`pagefindMeta`) konsistent halten.

### D7: Bilder
1 vorhandenes Bild je Produkt als Hero (`preloadImage`), **keine** `ProductGallery`. Fehlende Zusatzbilder sind Non-Goal.

### D8: Interne Verlinkung
- `IncludedInPackages.astro` reaktivieren (Zubehör → Paket, z. B. Mikrofon → Karaoke-Paket).
- „Dazu passend"-Cross-Sell (Mikrofon ↔ Mischpult ↔ Partybox).
- `CityEinzeltechnik.astro` ergänzt einen „Details"-Link, wenn `detailPage` gesetzt ist (`specs/city-einzeltechnik`).

### D9: Prune/Promote-Iteration
Ohne GSC-Vorlauf: Nach 8–12 Wochen Seiten mit 0 Impressions in Kategorien zusammenlegen; umgekehrt Varianten (Nebel/BeamZ) zu eigenen Seiten promoten, falls getrennte Nachfrage sichtbar wird.

## Risks / Trade-offs

- **[Kannibalisierung]** Zwei Seiten pro Keyword → Mitigation: bewusste Merges (D1) + Keyword→Seite-Map.
- **[Thin Content]** Zubehörseiten ohne Substanz → Mitigation: Anti-Bloat-Gate + ≥3 unique FAQs + Entscheidungshilfe-Pflicht (Specs).
- **[Orphan-Seiten]** neue URL ohne interne Links → Mitigation: Verlinkung von Übersicht/City/Paket (D8) + Spec-Anforderung.
- **[Umbau bestehender `detailPage`-Anker]** → Mitigation: additive Änderung, alte `/vermietung#item-…`-Anker bleiben; kein Redirect nötig.
- **[Nur 1 Bild/Seite]** geringerer visueller Reiz → akzeptiert, Hero statt Galerie.
- **[Anchor-Scroll unter Sticky-Nav]** Ziel verdeckt → Mitigation: `scroll-margin-top` (D4).

## Migration Plan

1. Content zuerst (FAQs/Texte), dann Code — sonst leere FAQ-Listen.
2. Neue Seiten + Komponente, YAML-`detailPage`, Gate- und City-Link-Änderungen, `mikrofon`-Kategorie-Fix in einem Branch.
3. `pnpm run lint:agent && pnpm run build && pnpm test`, Schema-/Linkcheck.
4. `pnpm run build:full` + `pnpm run indexnow-submit`, `llms.txt` aktualisieren.
5. **Rollback:** rein additiv; Branch revertieren entfernt die neuen Seiten ohne Auswirkung auf bestehende Routen.
