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
- CityGrid (`src/components/CityGrid.astro`) reads the `cities` Content Collection,
  so add an entry to `src/data/cities.json`:
  ```json
  {
    "name": "<CityName>",
    "slug": "<slug>",
    "image": "/img/cities/<slug>.webp",
    "title": "Veranstaltungstechnik mieten",
    "description": "<Brief description>",
    "distance": "<X km>",
    "travelTime": "<X min>",
    "einzelItems": ["<product-slug-a>", "<product-slug-b>", "<product-slug-c>"],
    "einzelTitle": "Einzelgeräte für",
    "einzelDescription": "Einzelne Geräte statt Komplettpaket? Hier ein Auszug aus meinem Angebot – alle Geräte findest du auf der Übersichtsseite.",
    "areas": [
      { "name": "<Ortsname>", "km": "ca. X km", "travelTime": "X Min." },
      { "name": "<Ort mit eigener Seite>", "km": "ca. X km", "travelTime": "X Min.", "url": "/<slug>" }
    ]
  }
  ```
- `areas[]` = Einzugsgebiet-Chips: `km`/`travelTime` ist immer die Distanz **bis zur Abholung
  in Leinfelden-Echterdingen (Magellanstraße 4)**, nicht zur Stadt der Seite. Orte mit eigener
  City-Seite verlinken per `url`.

## 4. Einzugsgebiet-Sektion im Page
- Import + Einfügen `CityAreas` (nach `<CitySteps />`):
  ```astro
  import CityAreas from "../components/CityAreas.astro";
  ```
  ```astro
  <CityAreas areas={cityData?.areas ?? []} intro="Auch aus <Umgebung> kommst du zu mir – die Abholung in Leinfelden-Echterdingen ist erreichbar." />
  ```
  `cityData` kommt aus `import citiesData from '../data/cities.json'` (siehe bestehende Seiten).
- Wenn die Seite keine eigenen `areas[]` hat, `<CityAreas areas={[]} />` weglassen
  (Sektion rendert nur bei mind. 1 Chip).

## 5. FAQs (Abhol-Perspektive)
- In `src/data/faqs.json` ein "Anfahrt"- und ein "Entfernung"-FAQ-Paar je Stadt anhängen
  (`pages: ["<slug>"]`). Immer Ich-Perspektive („du … bei mir"), KEIN Liefer-/Aufbau-Wording
  – Kunden holen in der Magellanstraße 4 ab.
- FAQ-Paare können zusätzlich benachbarte Cities bedienen (z. B. `pages: ["metzingen", "kirchheim-unter-teck"]`).

## 6. Register in Footer
- Add link in Footer.astro Einzugsgebiet section: `<li><a href="/<slug>/">...</a></li>`

## 7. Build & Verify
- `pnpm run build`
- Check `dist/sitemap-index.xml` includes new URL
- Verify dist output for the new page
