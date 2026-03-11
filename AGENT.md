# AGENT.md - Entwickler-Regeln

## Projekt: Sound & Licht Stuttgart
- **URL:** https://soundundlicht-stuttgart.de
- **GitHub:** https://github.com/holgerkampffmeyer/soundundlicht-stuttgart.de

---

## Wichtige Regeln

### 1. Keine externen CDNs für Fonts/Icons
- Google Fonts und externe Icon-Libraries vermeiden
- Stattdessen: Lokale SVGs oder selbst-gehostete Fonts

### 2. Bilder immer mit WebP + Fallback
```html
<picture>
  <source srcset="/img/xxx.webp" type="image/webp" />
  <img src="/img/xxx.jpg" alt="..." />
</picture>
```

### 3. Barrierefreiheit
- `prefers-reduced-motion` bei allen Animationen unterstützen
- Farben nicht als einziges Mittel verwenden
- Alle Bilder mit alt-Text

### 4. SEO
- Meta Description, Keywords, Open Graph, Twitter Cards
- Schema.org LocalBusiness JSON-LD
- Canonical URL

### 5. Performance
- Bilder lazy laden (`loading="lazy"`)
- Build prüfen: `npm run build`
- Keine unnötigen Dependencies

### 6. Git Workflow
- Features auf eigenen Branches entwickeln
- Vor Commit: Build testen
- Keine Geheimnisse (API-Keys, Passwörter) committen

---

## Verfügbare Scripts

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Development Server starten |
| `npm run build` | Produktion-Build erstellen |
| `npm run preview` | Preview des Builds |
| `node create-webp.mjs` | WebP-Bilder erstellen |

---

## Ordnerstruktur

```
/src
  /components      # Astro-Komponenten
  /layouts         # Layouts
  /pages           # Seiten
  /styles          # CSS
/public
  /img             # Bilder (WebP + JPG)
/dist              # Build-Output
```

---

## Design-System

### Farben (CSS Variables in global.css)
- `--color-bg`: #0a0a0f
- `--color-secondary`: #f97316 (orange)
- `--color-accent`: #22d3ee (cyan)

### Animation-Klassen
- `.animate-on-scroll` - Fade-In bei Scroll
- `.soundwave-container` - Equalizer-Animation
- `.neon-pulse` - Pulsierender Glow
- `.light-ray` - Lichtstrahl bei Hover
- `.gradient-text` - Orange→Cyan Gradient
