# Suche (Pagefind)

Clientseitige Volltextsuche über `astro-pagefind`. Indexierung beim Build (sieht "Pagefind indexed N pages").

## Pagefind-Integration

- **astro-pagefind** — Indexierung beim Build
- **props im `<Layout>`:**
  - `pagefindType="produkt"` → setzt `data-pagefind-weight="2"` + `type:produkt` in meta
  - `pagefindMeta={{ price: "ab 80€", image: "/img/...", category: "Sound", label: "..." }}`
- **`pagefindMeta` wird als separate `<div>` pro Key-Value gerendert** — NICHT kombinierter `;`-String!
- **`data-pagefind-ignore`** auf Navbar.astro + Footer.astro
- **URL-Normalisierung**: `normalizeUrl()` strippt trailing slashes im JS (`trailingSlash: 'never'`)

## Client-Script

`src/scripts/search.ts` wird in `Layout.astro` via `<script>` importiert:

- **Debounce**: 300ms nach Eingabe (mind. 2 Zeichen)
- **Keyboard**: ArrowUp/Down/Enter/Escape für Navigation im Overlay
- **Overlay-Close**: Klick außerhalb via `onDocumentClick`
- **Pagefind**: `Layout.astro` lädt pagefind per `import('/pagefind/pagefind.js')` in einem `<script is:inline>` (Vite umgangen) und speichert Promise in `window.__pagefind`. `search.ts` greift darauf zu.

## Katalog-Matching für `/vermietung/`

- `rentalItems` aus `getCollection('products')` (21 Produkte) wird als JSON-Script eingebettet
- `matchCatalogProducts(query)` matcht Suchbegriffe gegen Titel/Description/Features
- Funde werden als reiche Produktkarten gerendert, Link auf `vermietung/#item-<slug>`
- Nur 10 Produkte haben eigene `.astro`-Seiten → 11 werden via Katalog gematcht

## Datenquellen

- **Produktdaten**: `src/content/products/*.yml` (21 Dateien) via `getCollection('products')`
- **FAQ-Daten**: `src/data/faqs.json` (135 Einträge) via `getCollection('faqs')`
- **Städte**: `src/data/cities.json` (15 Städte) via `getCollection('cities')`
- **"Details & Buchung"-Link** auf `/vermietung/` erscheint nur bei Produkten mit echter Detailseite (kein `#` in `detailPage`). Auf City-Seiten wird derselbe Link in `CityEinzeltechnik.astro` gerendert.

## Tests

`tests/search.spec.ts` (Playwright, 4 Tests):

- Input sichtbar, korrekter Placeholder
- Volltext-Suche mit Pagefind (query `"PA"` → Ergebnisse)
- Schließen bei Klick außerhalb
- Kurze Query (1 Zeichen) zeigt kein Overlay
