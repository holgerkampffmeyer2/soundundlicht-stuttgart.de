# SEO-Verbesserungsplan (2026)

> Erstellt nach Online-Recherche zu aktuellen Ranking-Faktoren und vollständiger
> Analyse der Website. Grundlage für die schrittweise Umsetzung.
>
> **Definition of Done je Code-Änderung:** `pnpm run lint:agent && pnpm run build`
> (+ `npx vitest run --pool=forks`, falls Tests betroffen). JSON-LD gegen
> Google Rich-Results-/Schema-Validator prüfen. Keine offenen TODOs.

---

## 1. Recherche: Was rankt 2026 gut?

### 1.1 Klassisches SEO
Quellen: First Page Sage (2026), Zyppy/SE Land (Survey 131 SEOs, 2026), WordStream, HubSpot.

- **Content & Authority ≈ 80 %** des Algorithmus; Technik nur noch ~7 %.
- Gewichtung: Konsistente hilfreiche Content-Publikation (24 %) · Nischen-Expertise/E-E-A-T (14 %) ·
  Searcher Engagement (13 %) · Keyword im Meta-Title (12 %) · Backlinks (12 %) · Freshness (6 %) ·
  Trust (5 %) · Mobile-Friendly (4 %) · Page Speed (2 %) · Brand Mentions (2 %).
- **Meta-Description & Keywords** haben kaum noch direkten Ranking-Effekt.

### 1.2 Local SEO
Quelle: Whitespark/BrightLocal Local Search Ranking Factors 2025/2026.

- Proximity ~55 % (nicht kontrollierbar) · **GBP-Signale 32 %** · Reviews 16–20 % ·
  **On-Page 19 %** (dedizierte Service-/City-Landingpages, Geo-Keywords, LocalBusiness-Schema).
- **GBP sollte auf die städtespezifische Landingpage verlinken**, nicht auf die Homepage.
- Reviews: Velocity, Aktualität und Antworten zählen mehr als reine Anzahl.

### 1.3 Core Web Vitals (2026)
Quelle: web.dev, CrUX Mai 2026.

- LCP < 2,5 s · INP < 200 ms · CLS < 0,1 (jeweils p75).
- Nur **55,9 %** aller Origins bestehen alle drei; LCP ist der Flaschenhals (68,6 % gut).
- LCP: Hosting/CDN, Bilder (WebP/AVIF, Dimensionen), LCP-Element nie lazy-loaden,
  LCP-Ressource preloaden, `fetchpriority="high"`.

### 1.4 GEO / KI-Suche (AI Overviews, ChatGPT, Perplexity)
Quelle: GEO-Paper (KDD '24), Anbieter-Guides 2026.

- Struktur (Schema, Tabellen, FAQ) und Entitäten-Klarheit entscheiden über AI-Zitate.
- `llms.txt` ist eine Hilfe, **kein Ersatz** für Schema/Content.
- `robots.txt` soll AI-Bots explizit erlauben (bereits umgesetzt).
- Abstrakte/langweilige Sprache rankt schlechter in GENERATIVE-Engines; konkrete
  Statistiken und Quellenangaben helfen.

---

## 2. Ist-Zustand der Website

**Stark (über Branchenschnitt):**
- Statisch (Astro SSG), schlankes JS (~13 KB gesamt), selbstgehostete Variable-Fonts
  mit `preload`, `<Picture>` mit AVIF/WebP, Pagefind-Suche.
- Breadcrumb-/FAQ-/Service-Schema auf allen Seiten, Sitemap mit git-`lastmod`,
  IndexNow, RSS, `llms.txt`, AI-Crawler in `robots.txt` erlaubt.
- 20 City-Landingpages + 10 Produktseiten mit einzigartigem Text, LocalBusiness-`areaServed`.

**Gefundene Lücken:**

| # | Befund | Wirkung | Ort |
|---|--------|---------|-----|
| 1 | Kein `Product`-Schema auf Produktseiten (nur `Service`) | siehe Abschnitt 3 | `vermietung/*.astro`, `jsonLd.ts` |
| 2 | `noindex`-Seiten in der Sitemap (`/impressum`, `/thankyou`) | widersprüchliche Signale | `astro.config.mjs:25` |
| 3 | Kein `<main>`-Landmark & kein Skip-Link | A11y-Lücke (Lighthouse „warn“) | `Layout.astro:127` |
| 4 | `aggregateRating` hardcoded (5,0/21) statt aus Daten | Pflege-/Konsistenzrisiko | `jsonLd.ts:45` |
| 5 | Kein `Organization`/`logo`, kein `Person`-Author | schwächere Entität/E-E-A-T | `Layout.astro` |
| 6 | City-LCP-Bild nicht preloaded (`preloadImage` fehlt) | LCP-Potenzial verschenkt | `stuttgart.astro:83` u. a. |
| 7 | hCaptcha behauptet, aber nicht geladen | Datenschutz-/Funktions-Diskrepanz | `ContactForm.astro:180`, `impressum.astro:162,166,167` |
| 8 | `llms.txt` veraltet (tote Anker, externer Impressum-Link) | schwächere AI-Zitierbarkeit | `public/llms.txt` |
| 9 | 11 von 21 Produkten ohne Detailseite | weniger indexierbare Long-Tails | `content/products/*.yml` |
| 10 | Kaum Backlinks (ein Medium-Artikel) | größter offener Faktor (12 %) | extern |

---

## 3. Product-Schema: Warum es scheiterte und was stattdessen

**Historie (`git log`):**
- `6710a5b` führte `Product`-Schema ein.
- `8afae3e` ergänzte je Produktseite ein **erfundenes** Einzel-`Review`
  (Autor „Kunde", generischer Text „Tolles Set, einfache Handhabung…").
- `8ca26a9` entfernte Festpreise sowie **dieses erfundene Produkt-Review** aus dem JSON-LD.
  Die **echten Google-Rezensionen** in `src/data/google-reviews.json` (in
  `Testimonials.astro` sichtbar) waren davon **nicht** betroffen.
- `35c483f` **entfernte `Product`** komplett von allen Produktseiten.

**Ursachen:**
1. **Semantik:** Verleih ist kein Kauf. Googles Product-Rich-Results erwarten `offers`
   mit exaktem `price`, `priceCurrency`, `availability`, `itemCondition`.
   Bei „ab XX€“ gibt es keinen gültigen Festpreis → Validierungsfehler.
2. `brand` war die **eigene Firma** statt des Herstellers (LD Systems/JBL) → ungültig.

**Entscheidung:** `Product` wird **nicht** wieder eingeführt. Stattdessen wird das
bestehende, semantisch korrekte `Service`-Schema angereichert:
- `Service` mit `serviceType`, `areaServed`, `provider`, `url`, `image`
- `offers` → `Offer` mit
  `priceCurrency: "EUR"`, `price: priceValue` (numerischer Startpreis),
  `priceSpecification` (`UnitPriceSpecification`, `unitCode: "DAY"`),
  `availability: "https://schema.org/InStock"`, `url`
- `hasOfferCatalog` (gebündelte Angebote) am LocalBusiness.

> **Beschlossene Abweichung:** Für das Schema wird der numerische Startpreis
> (`priceValue` aus den Produkt-YAMLs, bereits im Zod-Schema vorhanden) genutzt.
> Die sichtbare UI bleibt bei „ab XX€“-Text. Damit ist ein Preis-/Angebotsbezug
> maschinenlesbar, ohne die UI-Regel zu brechen.

---

## 4. Umsetzungsplan

> **Status:** Phase 1 (1–6) und Phase 2 (7–9) umgesetzt im Branch
> `feat/seo-p1-p2-improvements`. Offen bleiben nur Backlog (10) und
> Off-Site-Maßnahmen (11).

### Phase 1 – Quick Wins (Code)

1. **Sitemap bereinigen** ✅
   - `astro.config.mjs:25` — `filter: (page) => !/\/(impressum|thankyou)\/?$/.test(page)`
     (bzw. äquivalent im `serialize`).
2. **Accessibility** ✅
   - `Layout.astro:127` — `<main id="main">`-Landmark um den `<slot/>`; Skip-Link
     (`<a href="#main" class="skip-link">Zum Inhalt springen</a>`) am Body-Anfang.
   - `global.css:5` — `scroll-behavior: smooth` im reduced-motion-Block (`:603`)
     auf `auto` zurücksetzen.
3. **LCP** ✅
   - `preloadImage` auf allen 20 City-Seiten setzen (Hero-Bild), z. B.
     `stuttgart.astro:83` (`preloadImage="/img/cities/stuttgart.webp"`).
4. **Reviews-Datenpipeline + `aggregateRating`** ✅
   - Script `scripts/fetch-google-reviews.mjs` (Docker: `gosom/google-maps-scraper`)
     aktualisiert `src/data/google-reviews.json` inkl. `ratingValue` + `reviewCount`.
     Details: Abschnitt 6.
   - `jsonLd.ts:45` — Aggregat aus `google-reviews.json` lesen statt hardcoded
     (`ratingValue:"5.0"`, `reviewCount:"21"`).
   - Hinweis: Für `LocalBusiness`/`Service` zeigt Google **keine** Sterne-Rich-Snippets;
     das Aggregat dient der Entität-/KI-Konsistenz, nicht SERP-Sternen.
5. **Service-Schema ausbauen** (siehe Abschnitt 3) ✅
   - `jsonLd.ts` + `vermietung/*.astro`: `Service` + `Offer`/`PriceSpecification`,
     `serviceType`, `areaServed`.
6. **`OfferCatalog` vereinheitlichen** ✅
   - `jsonLd.ts:106` — `offerCatalogJsonLd` auf `Service`-Logik angleichen.

### Phase 2 – E-E-A-T & AI

7. **Entität stärken** (`jsonLd.ts` / `Layout.astro`) ✅
   - `Organization` mit `logo` + `@id`
   - `Person` (Holger Kampffmeyer, `sameAs` zu den Social-Profilen)
   - `WebSite` mit `SearchAction` (Pagefind-Suche; `?q=` wird jetzt ausgewertet)
8. **`public/llms.txt` aktualisieren** ✅
   - Echte Produkt-URLs statt `/#pakete`-Anker
   - Impressum-Link auf `/impressum` (statt externe Domain)
   - `Last updated`-Datum erneuern
9. **hCaptcha entfernen** ✅
   - `impressum.astro:162,166,167` (Überschrift + beide Absätze zu hCaptcha)
   - leeres `<div class="h-captcha">` in `ContactForm.astro:180` + zugehöriges CSS
   - Web3Forms bleibt als Spamschutz bestehen; Datenschutztext entsprechend kürzen.

### Phase 3 – Backlog (nur Vormerkung)

10. **11 fehlende Produkt-Detailseiten** (von 21) ✅
    - Konsolidiert umgesetzt (statt 11 dünner Seiten): 3 Detailseiten
      (`powerstation`, `mini-party-beamer`, `max-party-bar`), 2 Kategorieseiten
      (`mikrofon-mischpult`, `led-scheinwerfer`) sowie 2 erweiterte Seiten
      (`partylicht-moving-head#beamz-mhl36`, `led-bossfx-nebelmaschine#nebel-maschine`).
    - Nachbesserung: `nebel-maschine` als eigene Kategorieseite `nebelmaschinen`
      herausgelöst (mit `led-bossfx-nebelmaschine#nebel-maschine` als Variante
      verworfen) und AF-150 als eigenständiges Mietgerät ergänzt
      (`openspec/changes/add-nebelmaschinen-page/`).
    - OpenSpec-Change: `openspec/changes/add-product-detail-pages/`. Muster aus
      `docs/seo.md` (`Service` + `BreadcrumbList` + `FAQPage`, kein `Product`).

### Off-Site-Maßnahmenplan

11. Off-Site-Maßnahmen sind kein Code und laufen separat als wiederkehrende Routine
    (siehe Abschnitt 5). Optional als eigene Datei `docs/seo-offsite.md` auslagern.

---

## 5. Off-Site-Maßnahmenplan

### 5.1 Google Business Profile (GBP) — größter kontrollierbarer Hebel (32 %)
> Profil existiert bereits: „Holger Kampffmeyer DJ Dienstleistungen",
> `Magellanstraße 4, 70771 Leinfelden-Echterdingen`
> (Place-ID `0x4799c318ddfada49:0x8c761bb0db8ae55e`). Es geht um **Optimierung**,
> nicht um Neuanlage.

- **Primärkategorie** prüfen: Wenn „DJ" primär ist, aber die Seite auf **Verleih**
  zielt → Primärkategorie eher „Verleih von Veranstaltungstechnik / Sound- & Lichtanlagen",
  DJ als Sekundärkategorie.
- **Website-Link** im Profil auf eine relevante Landingpage (`/vermietung` oder
  `/stuttgart`) statt Homepage setzen — mit **UTM-Parametern** zur Messung.
- Sekundärkategorien und **Leistungen/Services** ergänzen (PA, Partybox, Licht, DJ).
- **NAP** (Name, Adresse, Telefon) exakt identisch zu `jsonLd.ts` (`Magellanstraße 4`,
  70771 Leinfelden-Echterdingen, `+49 171 1467491`).
- **Fotos/Posts** regelmäßig aktualisieren (Aktualität > Menge), **Fragen (Q&A)** beantworten.
- **Reviews:** systematisch nach jedem Verleih einholen (Review-Link/QR), zeitnah und
  freundlich **beantworten**. Review-**Velocity** und Aktualität zählen stärker als die
  reine Anzahl (Ziel: kontinuierlich, nicht in Schüben).

### 5.2 Reviews
- Die Rezensionen in `src/data/google-reviews.json` sind **echte** GBP-Bewertungen
  (in `Testimonials.astro` sichtbar) — keine Fake-Reviews. Sie werden über die
  Pipeline in Abschnitt 6 aktuell gehalten.
- Zufriedene Kunden aktiv um Google-Bewertung bitten (Link/QR nach Rückgabe).
- Nach jedem Refresh `aggregateRating` (aus derselben Datei) automatisch mitziehen.

### 5.3 Backlinks (Faktor 12 %)
- Lokale **Vereine, Musikschulen, Eventlocations, Hochzeitsdienstleister** als Partner.
- **Regionale Presse** (Stuttgarter Zeitung, Filder-Zeitung, Amtsblatt Echterdingen).
- **Branchenverzeichnisse** mit Konsistenz-NAP (Google, Bing Places, Apple Maps,
  Gelbe Seiten, 11880, Yelp, Facebook).
- Medium-Artikel ausbauen und intern/ extern verlinken; ggf. Gastbeiträge.
- Verlinkung der Städte-Landingpages von extern fördert auch den lokalen Long-Tail.

### 5.4 NAP- / Citation-Konsistenz
- Einheitliches NAP über alle Verzeichnisse und Social-Profile.
- Broken/inkonsistente Einträge finden und korrigieren (Audit-Tool).

### 5.5 Monitoring & Iteration (laufend)
- **Google Search Console:** Indexierung/Coverage, Core Web Vitals, Klicks/Impressions/CTR,
  Suchanfragen je City-/Produktseite.
- **IndexNow** nach jedem `build:full`.
- **AI-Visibility:** regelmäßig prüfen, ob Marke in AI Overviews, Perplexity und
  ChatGPT für „Partytechnik/PA mieten Stuttgart"-Anfragen zitiert wird.
- **GBP-Insights:** Anrufe, Routenanfragen, Website-Klicks, Suchanfragen.
- Alerts für Crawl-Fehler und Ranking-Abstürze.

---

## 6. Reviews-Datenpipeline (`google-reviews.json`)

### 6.1 Herkunft
`src/data/google-reviews.json` wurde ursprünglich im **alten Repo**
`holgerkampffmeyer2.github.io` durch `scripts/fetchGoogleReviews.js` erzeugt
(Playwright-Scraping der Google-Suche). Dieses Script wurde am **2026-04-04 in
`70655ff` gelöscht** (fragil: abgelaufene Session-Tokens, wechselnde DOM-Selektoren,
Scraping-ToS). Seitdem wird die Datei **manuell** gepflegt.

### 6.2 Entscheidung: `google-maps-scraper` (Docker) in `scripts/fetch-google-reviews.mjs`
- Der offizielle OSS-Scraper **`gosom/google-maps-scraper`** läuft lokal als
  Docker-Container — **kein Google-API-Key nötig**.
- Query: `Holger Kampffmeyer DJ Dienstleistungen Leinfelden-Echterdingen`.
- Aufruf intern:
  ```
  docker run --rm -v gmaps-playwright-cache:/opt \
    -v <queries>:/queries.txt:ro -v <out>:/out \
    gosom/google-maps-scraper:latest \
    -input /queries.txt -results /out/results.json \
    -depth 1 -lang de -exit-on-inactivity 1m -json -extra-reviews
  ```
- Treffer-Match über `cid` (= zweiter Teil der Place-ID
  `0x4799c318ddfada49:0x8c761bb0db8ae55e` als Dezimalzahl); Fallback: Titel enthält
  „Kampffmeyer“.
- Ausgabe nach `src/data/google-reviews.json`:
  - `ratingValue` = `review_rating`
  - `reviewCount` = `review_count`
  - `reviews[]` = `user_reviews` + bestehende (Dedup über Autor + Text-Präfix) — erhält
    die bisherigen Texte
- Aufruf: `pnpm run update-reviews` (benötigt laufenden Docker; `--dry-run` zeigt nur den
  Docker-Befehl).
- **Vorteil gegenüber der Places API:** kein Key, mehr Rezensionen (`-extra-reviews`
  liefert aktuell 8 statt der auf 5 begrenzten API-Reviews) und vollständige Texte.
- `jsonLd.ts` liest `ratingValue`/`reviewCount` aus derselben Datei (eine Quelle
  der Wahrheit).

---

## 7. Nicht in Scope

- Änderungen an Analytics-, Consent- oder Payment-Integrationen.
- Deploy-/Infrastruktur-Änderungen.

---

## 8. Quellen

- First Page Sage — The 2026 Google Algorithm Ranking Factors
- Zyppy / Search Engine Land — Google's top ranking factors (Survey 131 SEOs, 2026)
- Whitespark / BrightLocal — Local Search Ranking Factors 2025/2026
- web.dev — Web Vitals / Core Web Vitals thresholds; CrUX Mai 2026
- GEO: Generative Engine Optimization (Aggarwal et al., KDD '24, arXiv:2311.09735)
