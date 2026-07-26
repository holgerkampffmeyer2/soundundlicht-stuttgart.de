## Context

The `CityEinzeltechnik.astro` component renders individual equipment cards on city pages. Currently, the link at the bottom of each card says "Mehr Infos" with `btn-secondary` styling. The adjacent `CityPackages.astro` section (hardcoded, not dynamic) uses "Details & Buchung ↗" with `btn-primary text-center text-sm py-2.5 px-4 mt-auto` styling.

The goal is to align these two sections so they look and feel like co-equal CTAs.

## Goals / Non-Goals

**Goals:**
- Make the Einzeltechnik link text match the packages section: "Details & Buchung ↗"
- Make the Einzeltechnik link styling match: `btn-primary text-center text-sm py-2.5 px-4 mt-auto`
- Keep the existing conditional: only render when `detailPage` exists and has no `#`

**Non-Goals:**
- Changing the "Merken" wishlist button (stays as-is)
- Changing which products appear in the einzelItems arrays
- Modifying CityPackages.astro (already correct)

## Decisions

### Decision 1: Use exact same link pattern as CityPackages

**Choice:** Copy the `<a>` element pattern from `CityPackages.astro` line 32-34 verbatim into `CityEinzeltechnik.astro`, replacing the current `<a>` element.

**Rationale:** The packages section already defines the visual standard. Matching it exactly (same classes, same text, same arrow glyph) ensures consistency without introducing new design tokens.

**Current code in CityEinzeltechnik.astro (line 81-83):**
```astro
{item.detailPage && !item.detailPage.includes('#') && (
  <a href={item.detailPage} class="btn-secondary w-full text-center block">Mehr Infos</a>
)}
```

**New code:**
```astro
{item.detailPage && !item.detailPage.includes('#') && (
  <a href={item.detailPage} class="btn-primary text-center text-sm py-2.5 px-4 mt-auto">
    Details &amp; Buchung ↗
  </a>
)}
```

### Decision 2: Keep "Merken" button as-is

**Choice:** Leave the wishlist button unchanged (`btn-primary w-full !px-3`).

**Rationale:** The wishlist button serves a different purpose (save for later) and should remain visually distinct from the CTA link. Two primary buttons stacked is acceptable since they serve different intents (save vs. act now).

## Risks / Trade-offs

- **[Visual density]** Two stacked primary buttons may feel heavy on small cards. → Mitigation: The cards already have `flex flex-col gap-2` spacing, and the smaller `text-sm py-2.5 px-4` on the CTA keeps it compact.
- **[Conditional rendering unchanged]** Products with anchor-only `detailPage` (11 of 21 products) still won't show any link. → This is by design — those products don't have standalone detail pages to link to.
