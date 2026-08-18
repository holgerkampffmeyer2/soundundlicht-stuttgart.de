# UX-Verbesserungsplan – Sound & Licht Stuttgart

> Basierend auf KI-UX-Analyse (Stand: August 2026), abgeglichen mit aktuellem Code-Status.
> Zielgruppe: Vielfältig – Einsteiger (Geburtstag, privater Anlass), Hobby-Veranstalter (Vereinsfeiern), DJs/Profis, Hochzeiten & Firmen-Events.

---

## Umgesetzte Maßnahmen (Stand: August 2026)

Folgende Maßnahmen wurden bereits umgesetzt und getestet (Lint + Build bestanden):

| Maßnahme | Status | Dateien |
|---|---|---|
| Hero-Texte index.astro: 4 verständliche Slides statt technischer Begriffe | ✅ Done | `index.astro` |
| Hero-Texte vermietung.astro: 5 Paket-Slides verständlicher formuliert, einheitliche CTA "Jetzt anfragen" | ✅ Done | `vermietung.astro` |
| Spotify/Bluetooth-Sektion auf Startseite | ✅ Done | `index.astro` |
| Für-Einsteiger-Snippet vor FAQ auf Startseite | ✅ Done | `index.astro` |
| CTA-Texte vereinheitlicht (Paket finden / Verfügbarkeit prüfen / Jetzt anfragen) | ✅ Done | `index.astro`, `vermietung.astro`, `ContactSection.astro`, `BieteSection.astro` |
| PackageCardGrid: Audience-Tags, Entscheidungshilfe (Personen, Aufbauzeit, Spotify, Mikrofon, Licht), Technische Details als Accordion | ✅ Done | `PackageCardGrid.astro` |
| YAML-Dateien: Neue Audience-Felder für alle 5 Pakete | ✅ Done | `src/content/products/*.yml` |
| ContactForm: Neue Reihenfolge, Selects, Pflichtfelder reduziert, Button "Kostenlos und unverbindlich Angebot anfragen" | ✅ Done | `ContactForm.astro` |
| Thankyou-Seite: Klare Bestätigung, Vorbereitungstipps, "Jetzt anrufen"-Button | ✅ Done | `thankyou.astro` |
| Kontakt-Überschrift "Unverbindlich Verfügbarkeit prüfen" | ✅ Done | `vermietung.astro`, `index.astro` |
| Ich-Perspektive: Gesamter User-Facing-Text auf "Ich" umgestellt (Einzelunternehmer, persönlich). Nur `impressum.astro` bleibt "Wir" | ✅ Done | Alle `.astro`-Dateien außer `impressum.astro` |
| Merkliste-Button zeigt "Gemerkt" (btn-secondary) wenn Produkt schon in der Merkliste ist | ✅ Done | `PackageCardGrid.astro`, `WishlistButton.astro`, `StickyMerkliste.astro`, `Layout.astro` |
| cartData.ts: Cart-Logik extrahiert (readRawCart, buildProductMap, formatCartItems, getCartData) mit 22 Unit-Tests | ✅ Done | `src/lib/cartData.ts`, `src/lib/cartData.test.ts` |
| Textarea-Prefill: Merkliste-Items werden in "Weitere Informationen" des Kontaktformulars vorausgefüllt | ✅ Done | `ContactForm.astro`, `src/scripts/merkliste-prefill.ts` |
| ContactForm: Kein Gäste-Feld, kein "Veranstaltungsort" — optionale Adressfelder (Straße, Hausnummer, PLZ, Stadt) | ✅ Done | `ContactForm.astro` |
| WishlistDrawer "Jetzt anfragen" navigiert zu `/vermietung#kontakt` | ✅ Done | `WishlistDrawer.astro` |
| Entscheidungshilfe-Box auf Paketkacheln: Kein schwarzer Balken mehr (border statt bg) | ✅ Done | `PackageCardGrid.astro` |

### Hero-Texte: Kein weiterer Handlungsbedarf

Die Hero-Texte von index.astro und vermietung.astro sind bewusst unterschiedlich:
- **index.astro:** Breite Ansprache (alle Zielgruppen, alle Anlässe), kein Preis im Hero
- **vermietung.astro:** Konkrete Pakete mit Preisen für bewusst gelangte Besucher

Diese Differenzierung ist sinnvoll und slider-konform.

---

## Offene Maßnahmen

Keine offenen Maßnahmen mehr — alle umgesetzt.

### ~~OFFEN-1: Kombinierter Abschnitt "So einfach geht's"~~ ✅ Done

Zweispaltiger Abschnitt in `index.astro` implementiert (linke Spalte: Musik vom Handy + Tipps, rechte Spalte: Für Einsteiger mit Checkmarks).

### ~~OFFEN-2: Einzelgeräte auf Startseite sichtbar machen~~ ✅ Done

Eigene Sektion mit 7 Einzelgeräte-Karten + Callout in der Paket-Sektion auf `index.astro` implementiert.

---

## Nicht geändert (bewusst beibehalten)

- Die starke Vertrauensbasis (lokale Nähe, Abholung, Einweisung, Testen) – USP
- Die City Pages – funktionieren gut für SEO
- Die Merkliste – gut gelöst
- Die Preis-Info-Popups – sinnvoll
- Dark Theme – passt zur Branche
- Die FAQ-Sektion – gut beantwortet
- Pagefind-Suche – funktioniert
- BieteSection (4-Karten-Grid) – zeigt Leistungen + USP klar

---

## UX-Pro-Max Design-System Empfehlung

Laut UX Pro Max Analyse (Event/Conference Landing Pattern):

- **Style:** Flat Design (Modern, Clean, Dark-Mode-ready)
- **Performance:** Exzellent (kein Gradient/Shadow-Overhead)
- **Accessibility:** WCAG AAA kompatibel
- **Key Effects:** Keine Gradientes/Shadows, einfache Hover-States (Color/Opacity Shift), schnelles Laden, cleane Transitions (150–200ms ease)
- **Icons:** SVG (Heroicons/Lucide), keine Emojis als strukturelle Icons
- **Checklist:** cursor-pointer auf alle klickbaren Elemente, Hover-States mit smooth Transitions, Light+Dark Kontrast 4.5:1, Focus-States für Keyboard, prefers-reduced-motion respektieren

---

## Metriken zur Erfolgsmessung

Nach Umsetzung messen:

- **Formular-Start vs. Abschluss** (Conversion Rate)
- **Häufigste Select-Option im Formular** („Empfehlung brauchen" vs. konkrete Technik)
- **Absprungrate auf der Startseite** (vor/nach Hero-Änderung)
- **Klicks auf Spotify-Sektion** (Interesse an Plug-and-Play)
- **Telefonanrufe** (via Click-to-Call-Tracking)
