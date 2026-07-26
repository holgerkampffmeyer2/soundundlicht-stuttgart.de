# Delta Spec: CityGrid Bugfix

## Änderungen
1. Doppelte `thumbSrc` Funktion entfernt (eine ohne Type, eine mit — unterschiedliche Regex)
2. Verbleibende Funktion: `thumbSrc(src: string): string` mit `/\.(webp|jpe?g|png)$/i`
3. `isAnimating = false` in `jumpTo()` nach `requestAnimationFrame` hinzugefügt

## Betroffene Datei
`src/components/CityGrid.astro` (frontmatter + `<script>`)

## Risiko
Niedrig — Bugfix ohne funktionale Regression. Nur CSS/HTML-Rendering betroffen.
