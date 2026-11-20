# SEO-Offsite-Checkliste (manuell / wiederkehrend)

> Manuelle Maßnahmen aus `docs/seo-improvement-plan.md` §5 und §11.
> Nicht automatisierbar — wird von Hand in einem festen Rhythmus gemacht.
> Code-Änderungen gehören nicht in diese Datei.

## Rhythmus

| Wann | Fokus | Aufwand |
|---|---|---|
| Nach jedem Verleih | Reviews | 2 Min |
| Wöchentlich (Mo) | GSC, GBP, IndexNow | 10 Min |
| Monatlich (1.) | GBP-Profil, NAP, AI-Visibility | 30 Min |
| Quartalsweise | Backlinks, Audit, llms.txt | 60 Min |

## A — Nach jedem Verleih

- [ ] Zufriedene Kunden um Google-Bewertung bitten (Link/QR nach Rückgabe).
- [ ] Neue Rezension zeitnah und freundlich beantworten (Velocity > Anzahl).
- [ ] `pnpm run update-reviews` ausführen (einmalig `pnpm run gmaps:login`;
      `--dry-run` für einen Probe-Lauf). `aggregateRating` in `jsonLd.ts` zieht automatisch mit.

## B — Wöchentlich

- [ ] Google Search Console: Indexierung/Coverage, Core Web Vitals,
      Klicks/Impressions/CTR, Suchanfragen je City-/Produktseite.
- [ ] Alerts für Crawl-Fehler und Ranking-Abstürze prüfen.
- [ ] GBP: offene Fragen (Q&A) beantworten, Fotos/Posts aktuell halten.
- [ ] Nach jedem `pnpm run build:full`: `pnpm run indexnow-submit`.

## C — Monatlich

- [ ] GBP: Primärkategorie = Verleih von Veranstaltungstechnik (DJ nur sekundär).
- [ ] Website-Link im GBP auf `/vermietung` oder `/stuttgart`, mit UTM-Parametern.
- [ ] Sekundärkategorien und Leistungen (PA, Partybox, Licht, DJ) gepflegt.
- [ ] NAP exakt: Holger Kampffmeyer · Magellanstraße 4 · 70771 Leinfelden-Echterdingen · +49 171 1467491.
- [ ] NAP-Konsistenz in Verzeichnissen: Google, Bing Places, Apple Maps,
      Gelbe Seiten, 11880, Yelp, Facebook.
- [ ] GBP-Insights: Anrufe, Routenanfragen, Website-Klicks, Suchanfragen.
- [ ] AI-Visibility: Erwähnung in AI Overviews / Perplexity / ChatGPT für
      „Partytechnik / PA mieten Stuttgart" stichprobenartig prüfen.

## D — Quartalsweise

- [ ] Backlink-Aufbau: lokale Vereine, Musikschulen, Eventlocations,
      Hochzeitsdienstleister ansprechen.
- [ ] Regionale Presse: Stuttgarter Zeitung, Filder-Zeitung, Amtsblatt Echterdingen.
- [ ] Medium-Artikel ausbauen und intern/extern verlinken.
- [ ] `public/llms.txt`: echte Produkt-URLs, Impressum-Link, Last-updated-Datum prüfen.
- [ ] Broken/inkonsistente Citations finden und korrigieren.
- [ ] Ranking-/Keyword-Entwicklung der City-Landingpages vergleichen.

## Run-Log

| Datum | Rhythmus | Erledigt | Befund / Notiz | Nächster Termin |
|---|---|---|---|---|
| | | | | |

## Referenzen

- `docs/seo-improvement-plan.md` §5 (Off-Site-Plan) und §6 (Reviews-Pipeline)
- `docs/seo.md` (Audit-Phasen, JSON-LD-Richtlinien)
- `AGENTS.md` (IndexNow nach `build:full`)
