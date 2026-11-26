# Proposal

## Why

Die 21 dynamischen City-Seiten nutzen zwar bereits individuelle Prosa-Felder, teilen aber Titel-Template, `einzelDescription`, große Teile von `heroDetails`/`icoaIntro`, das FAQ-Grundgerüst und identische Sektionen. Google bewertet solche Muster als Thin Content / Doorway Pages. Eine Konsolidierung in Regionsseiten würde das Problem nur verlagern. Stattdessen erhält jede Stadt ein eigenes Primärkeyword mit echter Unique Content-Begründung; die Stuttgart-Headterms werden auf sechs technische Landingpages konzentriert.

## What Changes

- `src/content.config.ts`: Cities-Schema um `primaryKeyword`, `seoTitle`, `metaDescription` erweitern.
- `src/data/cities.json`: Für alle 21 Städte Primärkeyword, SEO-Title, Meta-Description und individualisierte Prosa (Hero, Einzeltechnik, Areas, ICOA, Kontakt) hinterlegen.
- `src/pages/[city].astro`: Nutzt die neuen SEO-Felder statt des generischen Titels; `Service.areaServed` stadtbezogen; FAQ-Sektion enthält stadtbezogene FAQs.
- `src/data/faqs.json`: Zwei city-spezifische FAQs je Stadt sowie je 3 FAQs für die sechs technischen Seiten.
- Sechs neue Seiten unter `src/pages/vermietung/`: `pakete`, `musikanlage`, `lautsprecher`, `pa-anlage`, `dj-equipment`, `partylicht`.
- `src/pages/vermietung/jbl-partybox-300-320.astro`: „Musikbox mieten" als Synonym, keine neue URL.
- Tests, `public/llms.txt`, `public/llms-full.txt` und SEO-Doku anpassen.

## Capabilities

### New Capabilities
- `city-keyword-differentiation`: Eindeutige Keyword-, Title-, Description- und Content-Zuordnung pro City-Seite.
- `technical-landingpages`: Technische Vermietungs-Landingpages für die Stuttgart-Headterms unter `/vermietung/`.

### Modified Capabilities
- `city-page-dynamic`: SEO-Felder werden konsumiert; `areaServed` ist stadtbezogen.
- `faq-page`: Page-scoped FAQs für Cities und technische Seiten.
- `feature-inventory`: Neue Seiten und differenzierte City-Seiten.

## Impact

Keine neuen Dependencies, keine Analytics-/Consent-Änderungen, keine Secrets. Betroffen: Content-Schema, City-Daten, dynamische Route, FAQ-Daten, sechs neue Astro-Seiten, JBL-Seite, Tests und SEO-Doku.
