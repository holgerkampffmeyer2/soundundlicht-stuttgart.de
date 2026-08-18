# Merkliste (Wunschliste für Anfragen)

## Store

- **Clientseitige Merkliste** (`src/lib/merklisteStore.ts`) via `localStorage` (Key: `sls_merkliste`)
  - Funktionen: `getCart()`, `addItem(slug)`, `removeItem(slug)`, `hasItem(slug)`, `clearCart()`, `getItemCount()`
  - Automatische Leerung nach 24h Inaktivität
  - Produktdaten-Lookup via embedded JSON `#rental-catalog-data`

## Cart-Daten (`src/lib/cartData.ts`)

Extrahiertes Utility für Formular-Integration:
- `readRawCart()` — rohe Merkliste aus localStorage lesen
- `buildProductMap()` — Produktdaten aus `#rental-catalog-data`-JSON mappen
- `formatCartItems()` — Merkliste-Items für Anzeige formatieren
- `getCartData()` — Kombinierte Funktion (Read + Map + Format)
- Textarea-Prefill: Merkliste-Items werden in "Weitere Informationen" des Kontaktformulars vorausgefüllt

## Komponenten

- `WishlistIcon.astro` — Herz-Icon mit Badge in `Navbar.astro` (desktop + mobile)
- `WishlistDrawer.astro` — Seitenpanel mit ARIA (`role="dialog"`, `aria-modal`), Escape/Overlay-Close, Focus-Trap, scale-Animation
- `WishlistButton.astro` — "Merken"-Button für Produktdetailseiten
- `PackageCardGrid.astro` — "Merken"/"Gemerkt"-Button auf Paketkacheln (toggle-Verhalten)
- `StickyMerkliste.astro` — Sticky-Panel mit "Merkliste betrachten" (alle Seiten)

### Merkliste-Button Status

Alle Merkliste-Buttons prüfen beim Laden, ob das Produkt bereits in der Merkliste ist:
- **Nicht in Liste:** `btn-primary`, Text "Merken", `aria-pressed="false"`
- **Bereits in Liste:** `btn-secondary`, Text "Gemerkt", `aria-pressed="true"`

## Icons

Herz-Icon via `Icon.astro` (`name="heart"`) – kein hardcodiertes SVG.

## Event-Interface

- `toggle-merkliste` → Drawer öffnen/schließen
- `merkliste-prefill` → Kontaktformular vorbereiten (Items in Textarea vorausfüllen)

## Data-Actions

- `add-to-wishlist` → Produkt auf Merkliste (toggle: add/remove)
- `toggle-wishlist` → Drawer umschalten
- `request-now` → Navigation zu `/vermietung#kontakt`

## Implementierungs-Hinweise

- **Scope-Guard**: `PackageCardGrid.astro` hat `data-package-grid` für `target.closest()` – verhindert Double-Add mit `vermietung.astro`-Handler
- **Skript-Imports**: Statische ESM-Imports (`import { addItem } from '../lib/merklisteStore'`) in `<script>` – keine dynamischen `import()`-Aufrufe (zuverlässiger in preview/production)

## Tests

`tests/merkliste.spec.ts` (Playwright, 3 Tests) + `src/lib/merklisteStore.test.ts` (Vitest, 16 Tests) + `src/lib/cartData.test.ts` (Vitest, 22 Tests):

- Playwright: Produkt von `/vermietung/` + Detailseite + mehrere Produkte hinzufügen
- Vitest (merklisteStore): Unit-Tests für alle Store-Funktionen (CRUD, Validierung, Ablauf 24h, hasItem)
- Vitest (cartData): Unit-Tests für readRawCart, buildProductMap, formatCartItems, getCartData, Textarea-Prefill
- Server: `pnpm run preview` auf Port 4321 (oder Dev-Server)
