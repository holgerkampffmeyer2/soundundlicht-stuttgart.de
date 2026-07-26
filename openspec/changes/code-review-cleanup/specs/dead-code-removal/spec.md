# Delta Spec: Dead Code Removal & Docs

## Änderungen

### Dead Code
1. `ContactForm.astro`: `import { getItemCount } from '../../lib/merklisteStore'` entfernt (nie genutzt)
2. `thankyou.astro`: `getCollection('products')` Import + `allProducts` + `productsBySlug` entfernt (Server-Fetch, nie im Template verwendet)

### Dokumentation
3. `AGENTS.md`: `updateItemQuantity(slug, qty)` aus Funktionsliste entfernt (existiert nicht im Store)

## Betroffene Dateien
- `src/components/ContactForm.astro`
- `src/pages/thankyou.astro`
- `AGENTS.md`

## Risiko
Sehr niedrig — tote Referenzen entfernt, kein Verhalten geändert.
