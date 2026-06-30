# Refaktor-Plan: Ausstehende Aufräumarbeiten

## 1. rgba()-Werte in Theme-Vars überführen

**Problem:** ~25+ hardcodierte `rgba()`-Werte in `global.css` + `<style>`-Blöcken umgehen das Theme-System. Bei Theme-Wechsel (electric-night → deep-bass → golden-hour → arctic-frost) passen einige Overlay-Farben nicht.

**Dateien:**
- `src/styles/global.css` — ~15 `rgba()` in Shadow/Overlay-Klassen (`.btn-primary:hover`, `.slide-overlay`, `.hero-overlay-accent`, `.gallery-info`, `.plug-badge`, `.price-info-popup`, `.rental-search-*`)
- `src/components/CityHero.astro` — 2x `rgba(10,10,15,...)` in `<style>`
- `src/components/CityGrid.astro` — 5x `rgba(...)` in `<style>`
- `src/components/WishlistDrawer.astro` — `rgba(0,0,0,0.5)` in `<style>`
- `src/components/StickyMerkliste.astro` — `rgba(0,0,0,0.25)` in `<style>`
- `src/components/vermietung/ProductGallery.astro` — `rgba(0,0,0,0.7)` in `<style>`

**Vorgehen:**
1. CSS-Variablen in `theme-vars.css` pro Theme definieren:
   - `--shadow-sm: 0 4px 16px rgba(0,0,0,0.3)`
   - `--shadow-lg: 0 8px 32px rgba(0,0,0,0.35)`
   - `--overlay-dark: rgba(10,10,15,0.85)`
   - `--overlay-medium: rgba(10,10,15,0.7)`
2. In `global.css` + Komponenten `var(...)` statt `rgba(...)` nutzen
3. Themes können Shadow-Intensität leicht variieren

**Aufwand:** ~30 Min.

---

## 2. Duplizierte `<style>`- und `<script>`-Blöcke in 10 Produktseiten

**Problem:** Alle 10 Produktseiten (`src/pages/vermietung/*.astro`) haben identische `<style>`-Blöcke:
```css
.product-header { background: var(--color-bg); padding-bottom: 2rem; }
.cta-section { text-align: center; }
```
Und identische `<script>`-Blöcke:
```js
import { addItem } from '../../lib/merklisteStore';
document.getElementById('request-now-{slug}')?.addEventListener('click', function() {
  addItem('{slug}');
  document.dispatchEvent(new CustomEvent('toggle-merkliste'));
});
```

**Vorgehen:**
1. Neues Component `ProductLayout.astro` erstellen als Layout-Wrapper für Produktseiten
2. Das Component enthält einmalig das `<style>` + delegiertes `<script>` (Event Delegation via `data-product-slug`)
3. Alle 10 Produktseiten nutzen `<ProductLayout>` statt inline-style + inline-script
4. `ProductGallery`, `RentalPricing`, `RentalIncludes` sind bereits eigenständige Components

**Aufwand:** ~45 Min.

---

## 3. `.service-card` / `.equipment-card` zusammenlegen

**Problem:** Zwei ~95% identische CSS-Klassen in `global.css:356-422`:
- `.service-card` (lines 356-386) — mit `border-radius: 1rem`
- `.equipment-card` (lines 389-422) — ohne `border-radius`, dafür `scroll-margin-top: 160px`

**Vorgehen:**
1. `.card-base` als gemeinsame Klasse mit allen gleichen Properties
2. `.service-card` → `.card-base` + `.card-service` (nur radius)
3. `.equipment-card` → `.card-base` + `.card-equipment` (nur scroll-margin + kein radius)
4. Alle Vorkommen in `.astro`-Dateien ersetzen (grep: `.service-card` und `.equipment-card`)
5. HTML-Struktur ggf. Angleichen (`.equipment-card` hat kein `border-radius` → ggf. bewusster Unterschied)

**Aufwand:** ~20 Min.

---

## 4. City-Seiten inkonsistent \[ERLEDIGT - commit b402d5d\]

**Problem:** 5 City-Seiten nutzen `<ContactSection>` component, 10 haben inline-Kontakt mit `<Icon name="map-pin">` und `<Icon name="email">`. Die kurzen Seiten (83 Zeilen) fehlen ggf. Sektionen.

**Kurze Seiten (83 Zeilen):** `esslingen`, `filderstadt`, `leinfelden-echterdingen`, `stuttgart`, `tübingen`
**Lange Seiten (134 Zeilen):** `böblingen`, `kirchheim-unter-teck`, `kornwestheim`, `leonberg`, `ludwigsburg`, `nürtingen`, `ostfildern`, `reutlingen`, `sindelfingen`, `waiblingen`

**Lösung:** Alle 10 langen City-Seiten wurden auf `<ContactSection />` Component umgestellt. Jetzt nutzen alle 15 City-Seiten die gleiche Component (Commit `b402d5d`).

**Dateien angepasst:**
- `böblingen.astro`, `kirchheim-unter-teck.astro`, `kornwestheim.astro`, `leonberg.astro`, `ludwigsburg.astro`, `nürtingen.astro`, `ostfildern.astro`, `reutlingen.astro`, `sindelfingen.astro`, `waiblingen.astro`

**Aufwand:** ✅ Erledigt

---

## 5. Duplizierte Event-Handler für `add-to-wishlist`

**Problem:** Der `add-to-wishlist`-Click-Handler existiert in 5+ Dateien:
- `PackageCardGrid.astro` (scope-guarded auf `data-package-grid`)
- `vermietung.astro` (scope-guarded auf `#pakete` ausschluss)
- `WishlistButton.astro` (per `data-wishlist-slug`)
- `StickyMerkliste.astro` (per `data-product-slug`)

**Vorgehen:**
1. Zentralen Event-Listener in `Layout.astro` registrieren
2. Custom Event `add-to-wishlist` einführen (wie bei `toggle-merkliste`)
3. Alle dezentralen Handler durch `dispatchEvent` ersetzen
4. Badge-Update ebenfalls zentral im Listener

**Aufwand:** ~30 Min. (birgt Risiko für Regression — gründlich testen)

---

## 6. `text-white` / `bg-black` durch Theme-Vars ersetzen

**Problem:** 14+ Stellen mit hardcodierten `text-white`, `bg-black`, `text-white/90` in Komponenten.

**Dateien:** `WishlistDrawer.astro`, `CityHero.astro`, `StickyMerkliste.astro`, `WishlistIcon.astro`, `Testimonials.astro`, 8 Produktseiten (Video-Placeholder)

**Bewertung:** Teilweise korrekt (Badge-Text muss weiß sein → `--color-bg` invert). Aber die 8× `bg-black` für Video-Placeholder könnten `bg-[var(--color-bg)]` sein.

**Vorgehen:**
1. Prüfen ob `var(--color-bg)` bei Video-Placeholdern passt
2. `text-white` → `var(--color-bg)` (weil Buttons secondary/accent als bg haben)
3. `bg-black/50` für Drawer-Overlay → eigene CSS-Variable `--overlay-scrim`

**Aufwand:** ~15 Min.

---

## Priorisierung

| Rang | Task | Aufwand | Impact | Risiko | Status |
|------|------|---------|--------|--------|--------|
| 1 | Duplizierte Produktseiten (2) | 45 Min | Hoch (Wartbarkeit) | Niedrig | Offen |
| 2 | rgba → Theme-Vars (1) | 30 Min | Mittel (Theme-Konsistenz) | Niedrig | Offen |
| 3 | service/equipment-card merge (3) | 20 Min | Mittel (CSS-Größe) | Niedrig | Offen |
| 4 | Zentraler Event-Handler (5) | 30 Min | Mittel (Wartbarkeit) | Hoch | Offen |
| 5 | text-white/bg-black (6) | 15 Min | Niedrig (Kosmetik) | Niedrig | Offen |
| 6 | City-Seiten vereinheitlicht (4) | ✅ | Niedrig | Niedrig | ERLEDIGT (b402d5d) |

**Empfehlung:** 1 → 6 → 2 → 3 → 5, Task 4 nur bei Bedarf (Regression-Risiko).
