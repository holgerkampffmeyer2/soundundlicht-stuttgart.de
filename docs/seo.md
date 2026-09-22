# SEO-Richtlinien

## JSON-LD pro Seitentyp

- Landing (`/`): `Service` (general), `OfferCatalog` (Pakete & Einzelgeräte, `ab`-Preise), `FAQPage` (manuell via `faqJsonLd`)
- Vermietung (`/vermietung/`): `Service`, `FAQPage` (manuell)
- City-Seite (`/<stadt>/`): `Service` mit `areaServed: { City: "<Stadt>" }` + `provider: LocalBusiness`
- Produktseite (`/vermietung/<produkt>/`): `Service`, `Product`, `FAQPage` (via `getFaqsForPage('<produkt-slug>')`)

## Regeln

- **Preise**: immer `"ab XX€"` als Text, nie fester Betrag in `price`
- **FAQ-Helper**: `getFaqsForPage(pageId)` aus `lib/faqUtils` — filtert FAQs per `pages[]`-Array. FAQPage-JSON-LD wird manuell in jeder Seite gebaut.
- **Slug-Convention**: City = `<stadt>.astro`, Produkt = `vermietung/<produkt-slug>.astro`
- **Title-Pattern**: `"<Keyword> mieten in <Stadt> | Sound & Licht Stuttgart"`
- **Datenquellen**: Produktdaten aus `src/content/products/*.yml`, FAQs aus `src/data/faqs.json`
- **Ich-Perspektive** in allem User-Facing-Text («du … bei mir»), nur `impressum.astro` bleibt «Wir»

## Stufenstrategie für City-Keywords (Town / Einzugsgebiet / FAQ)

Nicht jede Ortschaft bekommt eine eigene Stadtseite (Doorway-Risiko). Die Abdeckung erfolgt in drei Stufen,
jeweils aus Abhol-Perspektive (Kunden holen in der Magellanstraße 4, 70771 Echterdingen ab – KEINE
Werbung für Lieferung/Aufbau):

1. **Stufe 1 – eigene City-Seite** (`src/pages/<slug>.astro`): nur für Einzugsstädte mit relevantem
   Suchvolumen (aktuell 20 Seiten, u. a. stuttgart, esslingen, fellbach, herrenberg, winnenden,
   backnang, metzingen, ostfildern). Kriterien: ausreichende Distanz/Ortsgröße UND eigenständiger
   Keyword-Bedarf («Partybox mieten <Stadt>»).
2. **Stufe 2 – Einzugsgebiet-Sektion** (`CityAreas`-Komponente + `areas[]` in `src/data/cities.json`):
   für Stadtteile und Nachbarorte ohnehin vorhandener Seiten (z. B. Degerloch, Möhringen, Vaihingen,
   Plieningen unter `stuttgart`). Entfernung ist IMMER die Distanz bis zur Abholung in Echterdingen.
3. **Stufe 3 – FAQ-Paare** (`src/data/faqs.json`): «Wie weit ist Echterdingen von X entfernt?» /
   «Wie komme ich von X zur Abholung?» pro Ort, gemappt auf die benachbarte(n) City-Seite(n) via `pages[]`.

Stuttgarter Stadtteile werden NICHT als eigene Seiten umgesetzt (kein zusätzlicher öffentlicher
Verleih in Stadtteilsuche abdeckbar + Doorway-Risiko), sondern nur Stufe 2 + 3.

Nicht vergessen: nach neuem Seiten-Rollout `pnpm run build:full` + `pnpm run indexnow-submit`.

## SEO-Audit-Prozess (4 Phasen)

Quelle: `seo-optimizer` Skill. Strikte Reihenfolge einhalten — jede Phase erst abschließen, wenn die STOP-Kriterien erfüllt sind.

### Phase 1: Technisches Audit

1. Seite crawlen (Screaming Frog, Sitebulb oder eigenes Script über `urllist.txt`)
2. `robots.txt` und XML-Sitemap validieren
3. Crawl-Fehler, Redirect-Chains und tote Links identifizieren
4. Canonicals und Duplicate-Content-Handling prüfen
5. Mobile-Friendliness und responsives Design bewerten
6. HTTPS und Mixed Content prüfen
7. Lade-Performance bewerten (Core Web Vitals)

> **STOP — Keine Phase 2, bis die Audit-Findings dokumentiert und priorisiert sind.**

### Phase 2: On-Page-Optimierung

1. Title-Tags prüfen (unique, 50–60 Zeichen, Keyword vorne)
2. Meta-Descriptions reviewen (unique, 150–160 Zeichen, klarer CTA)
3. Überschriften-Hierarchie analysieren (genau ein H1, logische H2–H6)
4. Image-Alt-Texte und Dateinamen optimieren
5. Interne Verlinkung und Anchor-Texte reviewen
6. URL-Struktur prüfen (kurz, beschreibend, mit Bindestrichen)
7. Open-Graph- und Twitter-Card-Tags validieren

> **STOP — Keine Phase 3, bis die On-Page-Änderungen umgesetzt und verifiziert sind.**

### Phase 3: Strukturierte Daten (JSON-LD)

1. Passende Schema.org-Typen je Seitentyp identifizieren (vgl. oben)
2. JSON-LD implementieren (`Service`, `Product`, `FAQPage`, `OfferCatalog`, …)
3. Mit Google Rich Results Test validieren
4. Rich-Snippet-Tauglichkeit testen
5. Search Console auf Structured-Data-Fehler überwachen

> **STOP — Keine Phase 4, bis die strukturierten Daten die Validierung bestehen.**

### Phase 4: Monitoring & Iteration

1. Google Search Console einrichten
2. Core Web Vitals über die Zeit tracken
3. Indexierungs-Status und Coverage überwachen
4. Such-Performance reviewen (Clicks, Impressions, CTR, Position)
5. Alerts für Crawl-Fehler und Ranking-Abstürze einrichten
