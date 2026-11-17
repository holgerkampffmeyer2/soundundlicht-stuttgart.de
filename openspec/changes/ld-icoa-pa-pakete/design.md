# Design

## Context

Die Seite nutzt manuelle Produktseiten mit `ProductLayout` (Pakete) und `CategoryLayout` (Kategorieseiten mit Ankern). Produktdaten liegen in `src/content/products/*.yml`, FAQs in `src/data/faqs.json`. Katalog, Homepage, Merkliste, Sitemap und Marketplace-Feed werden aus der Collection gespeist. Die Anti-Bloat-Spec verlangt eigenen Mehrwert pro neuer Seite und konsolidierte Ziele für Geräte ohne eigene Suchintention.

## Goals / Non-Goals

**Goals:**

- Drei klar unterscheidbare Paketgrößen mit eigenen Seiten und Preisen.
- Einzelmiete von Top und Sub über eine gemeinsame Systemseite mit Ankern.
- Zubehör (Distanzstangen, Dreibein-Stative, Kabel) als Paketbestandteil, nicht als Einzelgerät.
- Echte technische Daten der Geräte, ehrliche Anwendungsbeschreibungen und mindestens drei eigene FAQs pro Seite.
- Platzhalterbilder, die ohne Codeänderung durch echte Fotos ersetzt werden können.
- JSON-LD ohne `Product`-Schema.

**Non-Goals:**

- Keine neuen Stative erfinden oder konkrete Stativmodelle nennen; vorhandene Dreibein-Stative bleiben unspezifiziert.
- Keine Änderungen an `CityPackages.astro`.
- Keine Video-Einbettung, solange kein echtes Video vorliegt.
- Keine neue dynamische Route oder Migration der bestehenden Produktseiten.

## Decisions

| Entscheidung | Begründung | Alternative |
|---|---|---|
| 3 Paketseiten + 1 Systemseite | Pakete haben eigene Preise/Zielgruppen; Top/Sub teilen Suchintention und werden als Kategorie gebündelt | 5 Einzelseiten (mehr Thin-Content-Risiko) |
| Zubehör nur in Paketen | Kabel/Distanzstangen/Stative sind keine eigenständigen Mietgeräte; Nutzerentscheidung | Einzelpreise für Zubehör im Katalog |
| Dreibein-Stativ ohne Modell | Bestand vorhanden, aber nicht spezifiziert; keine falschen Produktangaben | Konkretes Modell wie SP 5211 B nennen |
| Platzhalter-WebP + Thumbnail | `PackageCardGrid`/`CategoryLayout` erwarten `-thumb.webp`; später nur YAML-Pfade tauschen | SVG-Platzhalter (bricht Thumbnail-Konvention) |
| `ProductLayout` für Pakete | Konsistent mit bestehenden Paketseiten | Neues Layout |
| `CategoryLayout` für Systemseite | Bestehendes Muster für Geräte mit Ankern (Mikrofon & Mischpult) | Eigene Seite mit `ProductLayout` |
| Kein Video-JSON-LD | Kein echtes Video vorhanden; keine Platzhalter-URLs in strukturierten Daten | Video-Platzhalter wie bei bestehenden Seiten |

## Preis- und Paketlogik

| Paket | Bestandteile | Preis |
|---|---|---|
| Club-Paket | 2x ICOA 12 A, 2x ICOA SUB 15 A, 2x SP 2332 B, Kabel | ab 150€/Tag |
| Bühnen-Paket | 2x ICOA 12 A, 1x ICOA SUB 15 A, 1x SP 2332 B, 1x Dreibein-Stativ, Kabel | ab 140€/Tag |
| Top-Paar | 2x ICOA 12 A, 2x Dreibein-Stativ, Kabel | ab 120€/Tag |
| ICOA 12 A | 1x Top | ab 50€/Tag |
| ICOA SUB 15 A | 1x Sub | ab 60€/Tag |

## Risks / Trade-offs

- **[Risk] Geringer Preisabstand Club (150€) zu Bühne (140€)** → Kannibalisierung möglich; bewusst so entschieden. Bei Bedarf später Club auf 170–190€ anheben.
- **[Risk] Platzhalterbilder** → Nicht social-media-optimiert; Austausch ist vorgesehen.
- **[Risk] Unbekanntes Stativmodell** → Nur „Lautsprecherstativ“ nennen, keine technischen Daten erfinden.
- **[Trade-off] Zubehör nicht einzeln buchbar** → Weniger Katalogkarten, dafür konsistente Paketlogik und keine Thin-Content-Seiten.

## Migration Plan

1. OpenSpec-Change anlegen und Artefakte schreiben.
2. Platzhalterbilder erzeugen.
3. Produkt-YAMLs und FAQs ergänzen.
4. Vier Seiten implementieren.
5. Navigation ergänzen.
6. Tests und Build ausführen.
7. Change nach Review archivieren.
