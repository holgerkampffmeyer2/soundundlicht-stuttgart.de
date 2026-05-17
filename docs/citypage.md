# City Page hinzufügen

## 1. Image
- Find a CC-licensed city photo on Wikimedia Commons
- Download to `/tmp/<slug>_orig.jpg`
- Convert to WebP: hero at 1920px wide (quality 85), thumbnail at 600px (quality 75)
- Save as `public/img/cities/<slug>.webp` and `public/img/cities/<slug>-thumb.webp`
- Usage: `<CityHero image="/img/cities/<slug>.webp" ... />` and CityGrid thumbnail

## 2. City Page
- Copy an existing city page (e.g., `src/pages/stuttgart.astro`)
- Adjust `cityJsonLd` (name, areaServed name)
- Adjust `<Layout>` title/description
- Adjust `<CityHero>` props (image, city, title, description, details with city-specific distance/time)
- Adjust contact section text (city name, distance from LE)
- Save as `src/pages/<slug>.astro`

## 3. Register in CityGrid
- Add entry to `cities[]` in `src/components/CityGrid.astro`:
  ```js
  {
    name: "<CityName>",
    slug: "<slug>",
    image: "/img/cities/<slug>-thumb.webp",
    title: "<Short title>",
    description: "<Brief description>"
  }
  ```

## 4. Register in Footer
- Add link in Footer.astro Einzugsgebiet section: `<li><a href="/<slug>/">...</a></li>`

## 5. Build & Verify
- `pnpm run build`
- Check `dist/sitemap-index.xml` includes new URL
- Verify dist output for the new page
