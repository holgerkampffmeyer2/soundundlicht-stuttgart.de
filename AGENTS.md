# Agenten-Informationen

## Projekt
Sound & Licht Stuttgart - DJ und Veranstaltungstechnik-Vermietung im Großraum Stuttgart

## Domain
- **Live-Domain:** https://soundundlicht-stuttgart.de
- **Hosting:** GitHub Pages
- **GitHub:** github.com/holgerkampffmeyer/soundundlicht-stuttgart.de

## Tech-Stack
- **Framework:** Astro 5.x
- **Styling:** Tailwind CSS 4.x
- **Build:** Static Site Generation (SSG)

## Build & Deployment
```bash
npm run dev       # Development server
npm run build     # Production build -> dist/
npm run preview   # Preview production build
npm run lint      # ESLint Code-Prüfung
npm run lint:fix  # ESLint Auto-Fix
```

## Wichtige Regeln
1. **DESIGN.md lesen** für Design, Architektur und Funktionen
2. Domain IMMER auf `soundundlicht-stuttgart.de` setzen
3. Nach Änderungen: lint -> build -> commit -> push
4. Single-Page Website: Alle Inhalte in `src/pages/index.astro`

## Verzeichnisstruktur
```
src/
├── components/      # Astro Komponenten
├── layouts/        # Seiten-Layouts
├── pages/          # Seiten (index.astro)
├── styles/         # Global CSS
public/
├── img/            # Bilder (WebP + JPG)
.github/
├── workflows/      # GitHub Actions
```

## Links
- DJ Hulk Website: https://holger-kampffmeyer.de
