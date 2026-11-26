# City Page hinzufügen

City Pages werden dynamisch über `src/pages/[city].astro` aus der Collection `cities` erzeugt. Eine neue Stadt ist daher ein Eintrag in `src/data/cities.json` – eine eigene `.astro`-Datei wird nicht angelegt.

## 1. Bild

- WebP (16:4, z. B. 1920x480) und Thumb (600x150) in `public/img/cities/`.
- Dateiname: `<slug>.webp` und `<slug>-thumb.webp`.
- Quelle und Lizenz dokumentieren. Beispiel Göppingen: `0 5890 Panorama Göppingen.jpg`, W. Bulach, CC BY-SA 4.0, Wikimedia Commons.

## 2. Eintrag in `src/data/cities.json`

Pflichtfelder:

| Feld | Zweck |
| --- | --- |
| `name`, `slug` | Anzeigename und URL-Segment |
| `image` | Pfad zum Hero-Bild |
| `title`, `description` | Meta-Titel und Kurzbeschreibung |
| `distance`, `travelTime` | Entfernung/Fahrtzeit ab Magellanstraße 4, Leinfelden-Echterdingen |
| `einzelItems` | 2–3 Produkt-Slugs für die Einzelgeräte-Sektion |
| `areas[]` | Orte im Einzugsgebiet der Stadt |

Optional, aber für neue Städte Pflicht: `primaryKeyword`, `seoTitle`, `metaDescription`. `primaryKeyword` ist das einzigartige Stadt-Longtail (z. B. `Musikanlage mieten Esslingen`) und wird als H1 gerendert. `seoTitle` und `metaDescription` werden direkt in `<title>` und `<meta name="description">` übernommen. Die Stuttgarter Headterms gehören den technischen Landingpages unter `/vermietung/` und dürfen nicht als City-H1 dupliziert werden.

Weitere optionale Prosa-Felder: `heroTitle`, `heroDescription`, `heroDetails`, `areasIntro`, `contactDescription`, `distanceText`, `travelTimeText`, `einzelTitle`, `einzelDescription`, `icoaTitle`, `icoaIntro`. Fehlt eines, greift der Standardtext in `src/pages/[city].astro`.

**Thin-Content-Regel:** Jede Stadt braucht eigene Szenarien (Location/Anlass), eigene Produktbegründung und mindestens zwei eigene FAQs. Ein nur ausgetauschter Stadtname in sonst identischen Texten ist nicht zulässig.

`areas[]` ist der einheitliche Standard für die Sektion „Schnell bei mir in Echterdingen“. Jede Stadt sollte 6–10 Einträge mit `name`, `km` (`ca. X km`) und `travelTime` (`X Min.`) haben. Für Orte mit eigener City Page zusätzlich `url` setzen. Alle Distanzen immer ab dem Abholort in Leinfelden-Echterdingen messen, nicht ab der Stadt selbst.

## 3. Einzeltechnik

`einzelItems` enthält 2–3 Slugs aus `src/content/products/`, z. B. `jbl-partybox-300-320`, `kls-laser-bar` oder `partylicht-moving-head`. Die Komponente zeigt nur Produkte an, die in der Collection gefunden werden; ungültige Slugs werden übersprungen.

## 4. Einzugsgebiet-Sektion

`src/pages/[city].astro` rendert `CityAreas` automatisch für jede Stadt. Eine manuelle Ergänzung in einer Seiten-Datei ist nicht nötig. Die Sektion erscheint nur, wenn `areas[]` mindestens einen Eintrag enthält. `areasIntro` überschreibt den Standard-Text; ohne eigenes Feld wird der Default aus `city.areasIntro ?? ...` verwendet.

## 5. FAQs

Neue FAQ-Einträge nach dem bestehenden Muster in `src/data/faqs.json` ergänzen:

```json
{
  "id": "göppingen-anfahrt",
  "question": "Wie komme ich von Göppingen zu dir nach Leinfelden-Echterdingen?",
  "answer": "...",
  "pages": ["göppingen"]
}
```

Der Slug in `pages` muss exakt dem `slug` aus `cities.json` entsprechen. `src/lib/faqUtils.ts` übernimmt das Matching.

## 6. Footer

Die neue Stadt im statischen Einzugsgebiet-Linkblock in `src/components/Footer.astro` ergänzen:

```astro
<li><a href="/göppingen" class="text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">Göppingen</a></li>
```

Die Liste wird nicht automatisch aus `cities.json` erzeugt.

## 7. Weitere Registrierungen

- `public/llms.txt`: Link im Abschnitt „Einzugsgebiet“ ergänzen.
- `public/llms-full.txt`: Stadt in „Einzugsgebiet“ und „Stadtseiten“ ergänzen, Anzahl anpassen.
- `public/404.html`: Redirect für alte/transliterierte Slugs ergänzen, z. B. `/goeppingen` → `/g%C3%B6ppingen`.
- `public/urllist.txt` und `sitemap-index.xml` werden über `pnpm run build:full` erzeugt.

## 8. Prüfen

```bash
pnpm run lint:agent
pnpm run build
pnpm test
curl -I https://soundundlicht-stuttgart.de/<slug>
```

Nach dem Deployment `pnpm run indexnow-submit` ausführen.
