# Proposal: Add Product Detail Pages

## Why

11 von 21 Produkten haben keine Zielseite. Sie sind nur als Karten auf `/vermietung` und als „Einzeltechnik" auf City-Seiten sichtbar, ohne eigenes Linkziel. Dadurch fehlen indexierbare Long-Tail-URLs, interne Verlinkungsziele und KI-zitierfähige Inhalte. Zugleich würde eine 1:1-Detailseite für jedes 10–15 €-Zubehör (Mikrofon, Mischpult, einzelne LED-PARs) Thin Content erzeugen und das Doorway-Risiko erhöhen.

## What Changes

- **Konsolidierter Roll-out: 5 neue Seiten statt 11.**
  - Neue **Detailseiten**: `powerstation`, `mini-party-beamer`, `max-party-bar`.
  - Neue **Kategorieseiten**: `mikrofon-mischpult` (bündelt `mikrofon` + `yamaha-mischpult`), `led-scheinwerfer` (bündelt `led-par-strahler`, `led-par-lichter`, `akku-led-par`, `showlight-stage-bar`).
  - **Bestehende Seiten erweitern** statt Kannibalisierung: `partylicht-moving-head` nimmt `beamz-mhl36` als Variante auf, `led-bossfx-nebelmaschine` nimmt `nebel-maschine` als Variante auf.
- Produkte ohne eigenständigen Mehrwert bleiben als Karten auf der Übersicht.
- Neue Seiten liefern Inhalt über die Karte hinaus: Entscheidungshilfe („Wann brauchst du das?"), technische Daten, Inklusivleistungen, Anlässe, ≥3 unique FAQs, Cross-Links zu Paketen (reaktiviert `IncludedInPackages`).
- Verlinkung: Übersichtskarten und City-„Einzeltechnik"-Karten verlinken auf die Detail-/Kategorieseiten (auch bei Anker-Zielen).
- **Bugfix:** `mikrofon` wird von `category: Licht` auf `Sound` korrigiert.

## Capabilities

### New Capabilities
- `product-detail-pages`: Konsolidierte Produkt-Detail- und Kategorieseiten inkl. Anti-Bloat-Gate, Entscheidungshilfe-Inhalt, Schema und interner Verlinkung.

### Modified Capabilities
- `city-einzeltechnik`: Das Karten-Requirement wird erweitert, sodass der Produkt-Link auch bei Anker-/Hash-`detailPage` gerendert wird und auf Detail-/Kategorieseiten zeigt.

## Impact

- `src/content/products/*.yml` — `detailPage` auf echte Routen/Anker umstellen; `mikrofon`-Kategorie-Fix.
- `src/pages/vermietung/*.astro` — 5 neue Seiten (3 Detail, 2 Kategorie); 2 bestehende erweitern.
- `src/components/vermietung/*` — neue Kategorieseiten-/Vergleichskomponente; `IncludedInPackages` reaktiviert.
- `src/pages/vermietung.astro` — Link-Gating für Anker-`detailPage`.
- `src/components/CityEinzeltechnik.astro` — „Details"-Link.
- `src/data/faqs.json` — neue FAQs je Seite (`pages[]`-Mapping).
- `public/llms.txt` — neue Seiten aufführen.
- `docs/seo-improvement-plan.md` — Backlog-Punkt 10 aktualisieren.
