# Merkliste (Wunschliste für Anfragen)

## Store

- **Clientseitige Merkliste** (`src/lib/merklisteStore.ts`) via `localStorage` (Key: `sls_merkliste`)
  - Funktionen: `getCart()`, `addItem(slug)`, `removeItem(slug)`, `clearCart()`, `getItemCount()`
  - Automatische Leerung nach 24h Inaktivität
  - Produktdaten-Lookup via embedded JSON `#rental-catalog-data`

## Komponenten

- `WishlistIcon.astro` — Herz-Icon mit Badge in `Navbar.astro` (desktop + mobile)
- `WishlistDrawer.astro` — Seitenpanel mit ARIA (`role="dialog"`, `aria-modal`), Escape/Overlay-Close, Focus-Trap, scale-Animation
- `WishlistButton.astro` — "Merken"-Button für Produktdetailseiten
- `StickyMerkliste.astro` — Sticky-Panel mit "Merkliste betrachten" (alle Seiten)

## Icons

Herz-Icon via `Icon.astro` (`name="heart"`) – kein hardcodiertes SVG.

## Event-Interface

- `toggle-merkliste` → Drawer öffnen/schließen
- `merkliste-prefill` → Kontaktformular vorbereiten

## Data-Actions

- `add-to-wishlist` → Produkt auf Merkliste
- `toggle-wishlist` → Drawer umschalten
- `request-now` → Sprung zum Formular

## Implementierungs-Hinweise

- **Scope-Guard**: `PackageCardGrid.astro` hast `data-package-grid` für `target.closest()` – verhindert Double-Add mit `vermietung.astro`-Handler
- **Skript-Imports**: Statische ESM-Imports (`import { addItem } from '../lib/merklisteStore'`) in `<script>` – keine dynamischen `import()`-Aufrufe (zuverlässiger in preview/production)

## Tests

`tests/merkliste.spec.ts` (Playwright, 3 Tests) + `src/lib/merklisteStore.test.ts` (Vitest, 16 Tests):

- Playwright: Produkt von `/vermietung/` + Detailseite + mehrere Produkte hinzufügen
- Vitest: Unit-Tests für alle Store-Funktionen (CRUD, Validierung, Ablauf 24h)
- Server: `pnpm run preview` auf Port 4321 (oder Dev-Server)
