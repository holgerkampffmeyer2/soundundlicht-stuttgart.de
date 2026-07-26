## 1. Component Update

- [x] 1.1 Replace "Mehr Infos" link in `CityEinzeltechnik.astro` with "Details & Buchung ↗" pattern from `CityPackages.astro` (change class to `btn-primary text-center text-sm py-2.5 px-4 mt-auto`, text to `Details &amp; Buchung ↗`)

## 2. Spec Update

- [x] 2.1 Add "Einzeltechnik section on city pages" scenario to `feature-inventory` spec requirement "Product Content Collections and Catalog"

## 3. Verification

- [x] 3.1 Build and verify "Details & Buchung ↗" renders on Stuttgart, Esslingen, and Tübingen city pages (products with real detail pages)
- [x] 3.2 Verify products with anchor-only detailPage (e.g. led-par-lichter) still omit the link gracefully
