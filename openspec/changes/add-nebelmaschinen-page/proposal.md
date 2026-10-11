# Proposal: Add Nebelmaschinen Page

## Why

Der Change `add-product-detail-pages` hat `nebel-maschine` (Uking 1200W) bewusst als Variantenabschnitt `#nebel-maschine` auf die bestehende Seite `/vermietung/led-bossfx-nebelmaschine` gelegt (Design D1: Vermeidung von Kannibalisierung/Thin Content). Für Nebelmaschinen besteht jedoch eine eigenständige Suchintention („Nebelmaschine mieten"), und es gibt zwei tatsächlich verfügbare Geräte: die kompakte Stairville **AF-150** (800 W, bisher nur Bestandteil des LED-BossFX-Kombis und der Pakete) und die **Uking 1200W**. Eine gemeinsame Kategorieseite bündelt beide suchmaschinenrelevant und schafft ein klares internes Verlinkungsziel.

## What Changes

- Neue **Kategorieseite** `/vermietung/nebelmaschinen` (via `CategoryLayout`) mit Hero, Entscheidungshilfe („Welche Nebelmaschine passt zu dir?") und zwei Ankerabschnitten `#af-150` und `#nebel-maschine`.
- **AF-150 wird eigenständiges Mietgerät**: neues Produkt-YAML `af-150.yml` (ab 20€/Tag, `category: Licht`), erscheint als Karte auf `/vermietung`.
- `nebel-maschine.detailPage` wird auf `/vermietung/nebelmaschinen#nebel-maschine` umgestellt.
- Der Variantenabschnitt `#nebel-maschine` wird **von der BossFX-Seite entfernt** (Vermeidung von Duplicate Content); dort bleibt ein Cross-Link zur Nebel-Seite.
- Interne Verlinkung: Paket-Bestandteile (Party-, Veranstaltungs-, DJ-Paket) linken die AF-150 auf `/vermietung/nebelmaschinen#af-150`; KLS-Laser-Bar verlinkt die 1200W-Maschine auf `#nebel-maschine`.
- ≥3 neue, eindeutige FAQs in `src/data/faqs.json` (`pages: ["nebelmaschinen"]`).
- Doku: `docs/DESIGN.md`, `public/llms.txt`.

## Capabilities

### New Capabilities
- `nebelmaschinen-page`: Kategorieseite, die beide Nebelmaschinen bündelt; AF-150 als eigenständiges Mietgerät.

## Impact

- `src/pages/vermietung/nebelmaschinen.astro` (neu), `src/pages/vermietung/led-bossfx-nebelmaschine.astro`, `src/pages/vermietung/kls-laser-bar.astro`, `src/pages/vermietung/{party,veranstaltungs,dj}paket*.astro`.
- `src/content/products/af-150.yml` (neu), `src/content/products/nebel-maschine.yml`.
- `src/data/faqs.json`, `docs/DESIGN.md`, `public/llms.txt`.
