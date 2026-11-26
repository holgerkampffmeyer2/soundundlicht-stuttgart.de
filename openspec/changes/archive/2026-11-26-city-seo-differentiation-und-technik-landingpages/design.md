# Design

## Entscheidungen

- **Keine Regions-Migration.** Alle 21 City-URLs bleiben erhalten; die Konsolidierung würde Thin Content nur verlagern.
- **Headterms gehören den technischen Seiten.** `/vermietung/musikanlage`, `/lautsprecher`, `/pa-anlage`, `/dj-equipment`, `/partylicht`, `/pakete` optimieren auf `<Keyword> mieten in Stuttgart`. City-Seiten nutzen Stadt-Longtails und dürfen die Headterms nicht duplizieren.
- **`Musikbox mieten` bleibt Synonym** auf `jbl-partybox-300-320` (kein eigener Slug, kein eigenes FAQ-Tag).
- **JSON-LD bleibt `Service` + `FAQPage`**, bewusst kein `Product`. Preise werden sichtbar als `ab XX€` ausgegeben; `priceValue` bleibt nur im Schema.

## Datenmodell

`cities.json` erhält pro Eintrag `primaryKeyword`, `seoTitle`, `metaDescription`. Bestehende Felder `title`/`description` werden auf dieselben Werte gesetzt, damit die Collection konsistent bleibt. `heroTitle` = Primärkeyword (H1), `heroDescription`/`heroDetails`/`einzelTitle`/`einzelDescription`/`areasIntro`/`icoaIntro`/`contactDescription` werden individualisiert.

FAQ-Filterung bleibt bei `getFaqsForPage(slug)`: globale FAQs + themenbasierte FAQs + explizite `pages`-Einträge. Neue FAQs nutzen ausschließlich `pages`, damit keine Schema-Änderung an `tags` nötig ist.

## Technische Landingpages

Ein gemeinsames Layout `src/components/vermietung/TechnicalLandingLayout.astro` kapselt Layout, Navbar, Breadcrumb, Hero, deciding sections, FAQ, CTA und Footer. Jede der sechs Seiten liefert nur Daten (Keyword, Beschreibung, Produkte, FAQ-Slug, Abschnitte). Das verhindert sechs weitere Template-Kopien im Seiten-Code.

## Tests

Ein Playwright-Test über alle 21 City-Slugs prüft eindeutige Titles/H1/Descriptions/Canonicals, mindestens drei nur auf je einer Seite vorkommende Wörter und keine doppelten Primärkeywords. `jsonld-pages.spec.ts` prüft Service/Breadcrumb/FAQ für die sechs neuen Seiten. `seo-artifacts.spec.ts` prüft deren Sitemap-/urllist-Präsenz.
