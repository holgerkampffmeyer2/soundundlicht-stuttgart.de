# Sound & Licht Stuttgart

Website für Veranstaltungstechnik-Vermietung im Großraum Stuttgart (PA-Anlagen, Partyboxen, Lichttechnik).

## Tech-Stack

- **Framework:** Astro 6.x
- **Styling:** Tailwind CSS 4.x
- **Build:** Static Site Generation (SSG)
- **Deployment:** GitHub Pages

## Getting Started

```bash
pnpm install
pnpm run dev      # Dev server
pnpm run build    # Production build → dist/
pnpm run preview  # Preview build
```

## Seitenstruktur

| Seite | Route | Beschreibung |
|-------|-------|-------------|
| Landing Page | `/` | Hero Slider, Services, Pakete, Galerie, Ablauf, Städteübersicht, FAQ, Bewertungen, Kontakt |
| Stuttgart | `/stuttgart/` | PA-Anlage & Partybox mieten |
| Esslingen | `/esslingen/` | Partybox & PA-Anlage mieten |
| Tübingen | `/tübingen/` | Veranstaltungstechnik mieten |
| Filderstadt | `/filderstadt/` | Partytechnik mieten |
| Leinfelden-Echterdingen | `/leinfelden-echterdingen/` | Veranstaltungstechnik mieten |
| Kornwestheim | `/kornwestheim/` | PA-Anlage & Partybox mieten |
| Ludwigsburg | `/ludwigsburg/` | PA-Anlage & Partybox mieten |
| Böblingen | `/böblingen/` | PA-Anlage & Partybox mieten |
| Sindelfingen | `/sindelfingen/` | PA-Anlage & Partybox mieten |
| Leonberg | `/leonberg/` | PA-Anlage & Partybox mieten |
| Waiblingen | `/waiblingen/` | PA-Anlage & Partybox mieten |
| Nürtingen | `/nürtingen/` | PA-Anlage & Partybox mieten |
| Reutlingen | `/reutlingen/` | Veranstaltungstechnik mieten |
| Kirchheim unter Teck | `/kirchheim-unter-teck/` | Veranstaltungstechnik mieten |
| Ostfildern | `/ostfildern/` | Veranstaltungstechnik mieten |

## Komponenten

| Komponente | Verwendung |
|------------|-----------|
| `CityHero.astro` | Hero mit Stadtbild + Overlay auf City-Seiten |
| `CityPackages.astro` | 3 Paketkarten (Partypaket, DJ-Paket, Veranstaltungspaket) |
| `CitySteps.astro` | 4-Schritte-Ablauf (Anfragen → Bestätigen → Abholen → Feiern) |
| `CityGrid.astro` | Städte-Kachelübersicht auf der Landing Page |
| `Navbar.astro` | Navigation mit mobilen Menü |
| `Footer.astro` | Footer mit Einzugsgebiet, Links, Social Media |
| `Testimonials.astro` | Kundenbewertungen |
| `Layout.astro` | Basis-Layout mit SEO, JSON-LD, Fonts |

## Neue City-Seite hinzufügen

1. **Bild:** CC-lizenziertes Stadtfoto von Wikimedia Commons als WebP konvertieren (1920px hero + 600px thumb) nach `public/img/cities/`
2. **Seite:** `src/pages/<slug>.astro` anlegen (bestehende City-Seite kopieren)
3. **CityGrid:** Eintrag in `src/components/CityGrid.astro` ergänzen
4. **Footer:** Link in `src/components/Footer.astro` Einzugsgebiet ergänzen
5. **Build:** `pnpm run build` – Sitemap prüft neue URL

## Verzeichnisstruktur

```
src/
├── components/     # Astro Komponenten
│   ├── icons/      # SVG Icon Komponenten
│   ├── CityHero.astro
│   ├── CityPackages.astro
│   ├── CitySteps.astro
│   ├── CityGrid.astro
│   ├── Navbar.astro
│   ├── Footer.astro
│   └── Testimonials.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   ├── stuttgart.astro
│   ├── esslingen.astro
│   ├── tübingen.astro
│   ├── filderstadt.astro
│   ├── leinfelden-echterdingen.astro
│   ├── kornwestheim.astro
│   ├── ludwigsburg.astro
│   ├── böblingen.astro
│   ├── sindelfingen.astro
│   ├── leonberg.astro
│   ├── waiblingen.astro
│   ├── nürtingen.astro
│   ├── reutlingen.astro
│   ├── kirchheim-unter-teck.astro
│   └── ostfildern.astro
└── styles/
    └── global.css
public/
└── img/
    ├── cities/       # City Hero-Bilder (slug.webp + slug-thumb.webp)
    ├── vermietung/   # Galerie-Bilder
    └── header.webp
```

## Domain

https://soundundlicht-stuttgart.de
