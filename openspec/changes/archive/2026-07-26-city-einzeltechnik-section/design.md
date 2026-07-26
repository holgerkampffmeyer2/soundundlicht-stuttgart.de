## Context

City-Seiten (`src/pages/<city>.astro`) sind manuell erstellte Astro-Pages mit fester Struktur:
`CityHero → CityPackages → CitySteps → FAQ → ContactSection`

`CityPackages.astro` ist eine statische Komponente mit 3 hardcoded Paketen (Partypaket, DJ-Paket, Veranstaltungspaket) — identisch auf allen 15 City-Seiten.

Es gibt 21 Produkte: 5 Pakete + 10 Sound-Einzelprodukte + 6 Licht-Einzelprodukte. Kunden, die nur einzelne Geräte brauchen, werden auf City-Seiten nicht bedient.

`cities.json` enthält 15 Städte mit name, slug, image, title, description, distance, travelTime.

## Goals / Non-Goals

**Goals:**
- Neue `CityEinzeltechnik.astro` Komponente, die 2-4 ausgewählte Einzelprodukte pro City anzeigt
- Konfiguration pro City via `cities.json` (Slug-Array `einzelItems`)
- Section-Heading und Beschreibungstext als Props, damit jede City variiert
- Konsistentes Card-Design mit bestehender `/vermietung/`-Seite

**Non-Goals:**
- Automatische Produktauswahl (bleibt manuell konfiguriert)
- Dynamische Preisanzeige aus Content Collections (bleibt statisch in YAML)
- Änderung an `CityPackages` (bleibt wie ist)
- Neue City-Seiten erstellen

## Decisions

### D1: Datenmodell — `einzelItems` in `cities.json`
Statt eigene Config-Dateien pro City zu erstellen, werden die Einzelprodukt-Empfehlungen direkt in `cities.json` ergänzt:

```json
{
  "slug": "stuttgart",
  "einzelItems": ["jbl-partybox-300-320", "kls-laser-bar", "partylicht-moving-head"],
  "einzelTitle": "Einzeltechnik für",
  "einzelDescription": "Du brauchst nur einzelne Geräte?..."
}
```

**Begründung:** Zentral, JSON-basiert, kein Aufwand für 15 zusätzliche Config-Dateien. Slugs referenzieren bestehende Content Collection.

### D2: Props-basierte Variation
`CityEinzeltechnik` bekommt `title`, `description` und `items` als Props. Die City-Seite liest die Daten aus `cities.json` und übergibt sie.

**Begründung:** Maximale Flexibilität — jede City kann individuelle Texte haben, Komponente bleibt wiederverwendbar.

### D3: Produktlookup via `getCollection('products')`
In jeder City-Seite werden die Products geladen und per Slug gefiltert. Das ist SSG-kompatibel und vermeidet Client-Side-Lookup.

**Alternative erwogen:** Embedded JSON wie bei `rental-catalog-data`. Verworfen, weil der Lookup bereits bei Build-Zeit stattfinden kann.

### D4: Maximale 3 Einzelprodukte
Section zeigt max. 3 Items an (1 Spalte mobil, 3 Spalten desktop). Mehr als 3 wäre überladen und lenkt von den Paketen ab.

**Begründung:** Einzeltechnik ist Ergänzung, nicht Hauptinhalt. Max. 3 Items pro City hält den Fokus.

## Risks / Trade-offs

- **[Manueller Aufwand]** Jede City muss individuell konfiguriert werden → 15 JSON-Einträge. *Mitigation:* Defaults in der City-Seite; wenn `einzelItems` fehlt, wird Section nicht gerendert.
- **[Slugs müssen passen]** Bei Umbenennung von Products müssen alle City-Einträge aktualisiert werden → *Mitigation:* Zentrale JSON-Datei, kein Spread über Dateien.
- **[Performance]** `getCollection('products')` wird pro City-Seite aufgerufen → *Mitigation:* Astro SSG cacht den Fetch, 15 Pages sind unproblematisch.
