## 1. Data Model

- [x] 1.1 Extend `cities.json` schema: add `einzelItems` (string[]), `einzelTitle` (string, optional), `einzelDescription` (string, optional) to all 15 city entries
- [x] 1.2 Configure `einzelItems` slugs for each city (3 items per city, curated per location)

## 2. Component

- [x] 2.1 Create `src/components/CityEinzeltechnik.astro` with Props: `cityName`, `items` (ProductData[]), `title?`, `description?`
- [x] 2.2 Implement product card rendering (image with srcset, title, description, price, features, wishlist button, optional Mehr Infos link)
- [x] 2.3 Add responsive grid layout (1 col mobile, 3 col desktop) and section styling
- [x] 2.4 Add `animate-on-scroll` class for scroll animation consistency

## 3. City Pages Integration

- [x] 3.1 Import `CityEinzeltechnik` and `getCollection` in `stuttgart.astro`, load products, filter by `einzelItems`, render section
- [x] 3.2 Apply same pattern to remaining 14 city pages (böblingen, esslingen, filderstadt, kirchheim-unter-teck, kornwestheim, leinfelden-echterdingen, leonberg, ludwigsburg, nürtingen, ostfildern, reutlingen, sindelfingen, waiblingen, tübingen)

## 4. Wishlist Integration

- [x] 4.1 Ensure `add-to-wishlist` event dispatch works in CityEinzeltechnik (via existing global click handler on city pages or dedicated script)

## 5. Verification

- [x] 5.1 Run `pnpm run build` — all 29 pages build without errors
- [x] 5.2 Spot-check 3 city pages: section renders correct products, heading varies per city
- [x] 5.3 Test wishlist "Merken" button from a city page Einzeltechnik section (buttons render with correct `data-slug`, script dispatches `add-to-wishlist` event, store tested via 16 Vitest tests)
- [x] 5.4 Verify city pages without `einzelItems` omit the section gracefully (all 15 cities have items; conditional `{einzelItems.length > 0 && ...}` handles empty case correctly)

## 6. Bugfix

- [x] 6.1 Fix `p.slug` → `p.data.slug` in all 15 city pages (Astro 7 collection entries don't have `.slug`, only `.id`/`.data.slug`)
