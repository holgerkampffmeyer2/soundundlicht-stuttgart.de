# Sound & Licht Stuttgart

Website für DJ und Veranstaltungstechnik-Vermietung im Großraum Stuttgart.

## Tech-Stack

- **Framework:** Astro 6.x
- **Styling:** Tailwind CSS 4.x
- **Build:** Static Site Generation (SSG)

## Getting Started

```bash
# Installation
pnpm install

# Development
pnpm run dev

# Production Build
pnpm run build

# Preview Build
pnpm run preview
```

## Befehle

| Befehl | Beschreibung |
|--------|---------------|
| `pnpm run dev` | Development Server starten |
| `pnpm run build` | Production Build erstellen |
| `pnpm run preview` | Production Build testen |
| `pnpm run lint` | Code prüfen |
| `pnpm run lint:fix` | Code automatisch korrigieren |

## Verzeichnisstruktur

```
src/
├── components/      # Astro Komponenten
├── layouts/        # Seiten-Layouts
├── pages/          # Seiten (index.astro)
├── styles/         # Global CSS
public/
├── img/            # Bilder (WebP + JPG)
```

## Deployment

Automatisch via GitHub Pages bei Push auf main.

## Domain

https://soundundlicht-stuttgart.de