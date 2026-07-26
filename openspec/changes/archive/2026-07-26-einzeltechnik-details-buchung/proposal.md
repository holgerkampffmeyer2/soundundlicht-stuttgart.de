## Why

The Einzeltechnik (individual equipment) section on city pages currently shows a "Mehr Infos" link in `btn-secondary` style, while the adjacent Komplettpakete (complete packages) section uses "Details & Buchung ↗" in `btn-primary` style. This visual inconsistency makes the individual equipment cards feel like a secondary feature rather than a co-equal call-to-action. Aligning the link text and styling creates a uniform experience across both sections.

## What Changes

- Replace "Mehr Infos" link text with "Details & Buchung ↗" in `CityEinzeltechnik.astro`
- Switch link class from `btn-secondary` to `btn-primary text-center text-sm py-2.5 px-4` to match `CityPackages.astro`
- Keep the existing conditional: link only renders when `detailPage` exists and does not contain `#`
- Keep the "Merken" wishlist button as-is (remains `btn-primary w-full`)

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `feature-inventory`: Update the "Product Content Collections and Catalog" requirement scenario to reflect the new "Details & Buchung" link text in the Einzeltechnik section (currently says "Mehr Infos")

## Impact

- `src/components/CityEinzeltechnik.astro` — link text, CSS classes, conditional logic unchanged
- `openspec/specs/feature-inventory/spec.md` — scenario text update
