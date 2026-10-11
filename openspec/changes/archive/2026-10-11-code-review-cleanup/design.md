# Design: Code Review Cleanup

## 1. CityGrid Bugfixes

### 1.1 thumbSrc Deduplizierung
**Vorher**: Zwei `thumbSrc` Funktionen (Zeile 8 + 14) mit unterschiedlicher Regex.
**Nachher**: Eine Funktion mit korrektem TypeScript-Interface.

### 1.2 isAnimating Lock Fix
**Problem**: `isAnimating` wird bei `jumpTo()` nicht zurückgesetzt → Carousel kann einfrieren.
**Lösung**: `isAnimating = false` in `jumpTo()` nach `update()` via `requestAnimationFrame`.

## 2. TypeScript any→Interface

### ProductLayout.astro
4 Interfaces: `ProductData`, `PagefindMeta`, `JsonLdItem`, `BreadcrumbSegment`

### FAQSection.astro
Inline-Interface `Faq { question, answer }`

### PackageCardGrid.astro
Interface `PaketItem { slug, title, description, image, price, features, detailPage? }`

### search.ts
Interfaces: `PagefindInstance`, `PagefindData` — ersetzt 6 `any`-Stellen

## 3. Shared Image Utils
Neue Datei `src/lib/imageUtils.ts` mit `getWebpUrl()` und `getThumbUrl()`.

## 4. Dead Code Removal
- `ContactForm.astro`: `getItemCount` Import entfernt (nie genutzt)
- `thankyou.astro`: `getCollection` Fetch + Variable entfernt (Server-Fetch, nie im Template)

## 5. AGENTS.md
`updateItemQuantity()` Referenz entfernt (existiert nicht im Store)
