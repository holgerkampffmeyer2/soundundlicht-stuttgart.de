# Aufbauschema-Plan · LD ICOA Mietpakete

Stand: 15.11.2026 · Zeichner: opencode · Zielablage: `docs/diagrams/icoa/`

## 1. Ziel

Drei Aufbauschematen für die LD-ICOA-Mietpakete, jeweils als eine `.drawio`-Datei mit **zwei Seiten**:

| Seite | Zweck | Hintergrund |
| --- | --- | --- |
| Seite 1 „Digital (dunkel)“ | Website, Screen, Social Media | `#050510` |
| Seite 2 „Druck (hell)“ | Schwarzweiß-Ausdruck, PDF | `#ffffff` |

Beide Seiten werden aus **derselben** Vektorgeometrie erzeugt; nur die Farbpalette wechselt.

## 2. Pakete

| Paket | Inhalt | Preis | Personen | Aufbau | Datei |
| --- | --- | --- | --- | --- | --- |
| Club-Paket | 2× ICOA 12 A, 2× ICOA SUB 15 A, 2× Gravity SP 2332 B | ab 150 € | 60–120 | ~30–40 Min | `ld-icoa-club-paket.*` |
| Partypaket XL | 2× ICOA 12 A, 1× ICOA SUB 15 A, 1× Gravity SP 2332 B, 1× Dreibein-Stativ | ab 130 € | 60–120 | ~30–40 Min | `ld-icoa-party-paket.*` |
| Top-Paar | 2× ICOA 12 A, 2× Dreibein-Stativen | ab 100 € | 30–80 | ~15–20 Min | `ld-icoa-top-paar.*` |

Der **DJ-Mixer ist in keinem Paket enthalten** und wird daher immer als gestrichelter externer Kasten („NICHT IM PAKET“) gezeigt.

Export-Artefakte je Paket: `*.drawio`, `*-digital.svg`, `*-druck.svg`, `*-druck.pdf`.

## 3. Gestaltungsraster (identisch für alle Pakete)

Canvas 1600 px breit · Digital 1600 × 1050 · Druck 1600 × 1131 · Rahmen 24/24/1552/… · Bodenlinie y = 760.

| Element | Position / Größe |
| --- | --- |
| Logo | 40, 32, 112 × 112 (PNG data-URI) |
| Section (`AUFBAUSCHEMA · …`) | 182, 22, 600 × 16 |
| Titel | 180, 42, 900 × 40 (Josefin Sans, 32 pt) |
| Untertitel | 182, 88, 1000 × 22 (Inter, 13 pt) |
| Badge Digital/Druck | 1260, 36, 300 × 28 |
| Preisschild | 1260, 72, 300 × 42 (Josefin Sans, 18 pt) |
| Kopf-Trennlinie | 40, 188, 1520 × 1 |
| Mixer-Box (extern) | 650, 620, 300 × 140, gestrichelt |
| Mixer-Icon | 668, 636, 64 × 64 |
| Stromverteiler | 620, 770, 360 × 44 |
| Legende | 70, 790, 430 × 150 |
| Hinweise | 1020, 790, 510 × 150 |
| Fußzeile | Linie y = footerY − 10; Text y = footerY |

### Farben

| Rolle | Digital | Druck |
| --- | --- | --- |
| bg / surface / surfaceAlt | `#050510` / `#0a1628` / `#0f1f3a` | `#ffffff` / `#ffffff` / `#f5f5f5` |
| primary / secondary / accent | `#2563eb` / `#1e40af` / `#22c55e` | `#000000` / `#000000` / `#000000` |
| text / muted / border | `#f8fafc` / `#64748b` / `#1e293b` | `#000000` / `#333333` / `#000000` |
| Signal / Strom | `#22c55e` / `#64748b` | `#000000` / `#333333` |
| Logo / Mixer-Icon | weiß / blau | schwarz / schwarz |

Alle Farben werden als `light-dark(hex, hex)` **gepinnt**, damit draw.io beim Theme-Wechsel nichts umfärbt. Im exportierten SVG muss der String `light-dark` deshalb **0-mal** vorkommen.

### Schriften

- **Josefin Sans** – Titel, Preisschild
- **Inter** – alles Übrige

Beide als Variable-TTF (Google Fonts) installiert: Windows `%LOCALAPPDATA%\Microsoft\Windows\Fonts` + Registry-Einträge „Josefin Sans (TrueType)“ / „Inter (TrueType)“; Linux `~/.local/share/fonts` + `fc-cache`.

## 4. Geräte-Geometrie

Maßstab: 1 px ≈ 2,9 mm (ca. 3,5 px/cm).

| Gerät | Realmaß | Darstellung |
| --- | --- | --- |
| ICOA 12 A (Top) | 375 × 635 mm | **130 × 220 px Hochformat**, koaxial (Horn mittig im 12"-Woofer), Grillrahmen, 4 Eck-Schrauben, 4 Seitengriffe, 2 Füße, Stativaufnahme unten, 2 Bassreflex-Ports |
| ICOA SUB 15 A | 510 × 598 mm | **188 × 220 px**, 15"-Woofer mit Dustcap, 2 Bassreflex-Ports, 4 Seitengriffe, 2 Füße, M20-Aufnahme oben |
| Gravity SP 2332 B | Distanzstange | 16 px Rohr + 2 Aufnahmen + Label „SP 2332 B / M20 → 35 mm“ |
| Dreibein-Stativ | – | 16 px Rohr (Höhe 168 px), 3 Beine (2 diagonal, 1 mittig), 3 Füße |
| DJ-Mixer | extern | gestrichelter Kasten 300 × 140 + eigenes Line-Art-Icon (2 Kanalzüge, 3 Drehregler, Crossfader, Master) |

## 5. Layout je Paket

### 5.1 Club-Paket (freigegeben)

- Stack links: Top cx 500 (435–565, y 220–440), Pol 440–540, Sub cx 500 (406–594, y 540–760)
- Stack rechts gespiegelt: cx 1100; Riser x = 630 / 970
- Signal: Mixer → Sub `IN A` → Sub `OUT A` → Top `INPUT 1` (gespiegelt R); `THRU 1` ungenutzt
- Strom: Mixer, beide Subs, beide Tops → Stromverteiler

### 5.2 Partypaket XL

| Element | Position |
| --- | --- |
| Sub A | x 266, y 540, 188 × 220 (cx 360) |
| Top A (auf Pol) | x 295, y 220, 130 × 220 (cx 360, Unterkante 440) |
| Pol | 352–368, y 440 → 540; Label 378, 466 |
| Top B (auf Dreibein) | x 1175, y 300, 130 × 220 (cx 1240, Unterkante 520) |
| Dreibein | Rohr 1232–1248, y 520 → 688; Beine (1154, 750), (1326, 750), (1240, 744) |
| Mixer | 650–950, 620–760 |

Signalwege: `sig1` Mixer → Sub A `IN A` (via 560/690 → 560/668) · `sig2` Sub A `OUT A` → Top A `INPUT 1` (via 530/598 → 530/330) · `sig3` Mixer → Top B `INPUT 1` (via 1090/690 → 1090/410).

Stromwege: Mixer (800, 760 → 770) · Sub A (360, 760 → 775 → 620, 775) · Top A (295, 400 → 80, 400 → 80, 780 → 620, 780) · Top B (1305, 480 → 1380, 480 → 1380, 780 → 980, 780).

### 5.3 Top-Paar

| Element | Position |
| --- | --- |
| Top L (auf Dreibein) | x 295, y 300, 130 × 220 (cx 360) |
| Top R (auf Dreibein) | x 1175, y 300, 130 × 220 (cx 1240) |
| Dreibeine | wie 5.2, beide y 520 → 760 |
| Mixer | 650–950, 620–760 |

Signalwege: `sig1` Mixer → Top L `INPUT 1` (via 540/690 → 540/410) · `sig2` Mixer → Top R `INPUT 1` (via 1060/690 → 1060/410).

Stromwege: Top L (295, 480 → 80, 480 → 80, 780 → 620, 780) · Top R (1305, 480 → 1380, 480 → 1380, 780 → 980, 780) · Mixer (800, 760 → 770).

## 6. Beschriftungslogik

| Art | Platzierung |
| --- | --- |
| Modell-/Typenlabel | linksbündig am Gerät: x = Gerätkante − 144, y = y + 36 (Name) / y + 54 (Spec); rechts: x = Gerätkante + 12, Breite 132 |
| Port-Labels | `IN A` / `OUT A` / `INPUT 1` 9 pt, mit `labelBackgroundColor = bg` für Lesbarkeit über Gehäuseflächen |
| Anschlusspunkte | 6 px Kreise, grün (Signal) bzw. grau (unbenutzt) |
| Legende | XLR-Signal (grün durchgezogen), Stromkabel 230 V (grau gestrichelt), Nicht im Paket enthalten (gestrichelter Kasten) |
| Hinweise | je Paket eigener Text zu Signalweg, Crossover/Preset, Aufbauzeit |

Regel: Textboxen für Modelllabels 132 px breit, rechtsbündig bzw. linksbündig am Gerät mit 12 px Abstand.

## 7. Generator & Pipeline

Generator: `/tmp/opencode/generate-icoa-packages.mjs` (geteilte Helfer `drawTop`, `drawSub`, `drawPole`, `drawTripod`, `mixerBox`, `powerStrip`, `legend`, `notes`, `header`, `footer`; ein `PACKAGES`-Config je Paket).

Fallstricke, die beim Generieren zu beachten sind:

1. **XML-Escaping**: `esc()` darf keine Entities als Literal im Quelltext enthalten – `&` & Co. werden beim Schreiben der Datei teils zerstört. Stattdessen `String.fromCharCode(38)` + `'amp;'` zusammensetzen.
2. **Logo-URI**: `data:image/png,<base64>` **ohne** Semikolon (Semikolon wird als Style-Trenner geparst).
3. **Nach jedem Patch** `node --check` und Generator einmal laufen lassen – Regex-Ersetzungen haben einmal Hilfsvariablen gelöscht.

Export (draw.io CLI `C:\Users\holge\AppData\Local\Programs\draw.io\draw.io.exe`):

```
draw.io.exe -x -f svg -p 1 -o <name>-digital.svg <name>.drawio
draw.io.exe -x -f svg -p 2 -o <name>-druck.svg   <name>.drawio
draw.io.exe -x -f pdf -p 2 -o <name>-druck.pdf   <name>.drawio
```

## 8. Qualitätskriterien (Validierung)

- 0 Texte außerhalb der Seite (OOB)
- 0 Text–Text-Überlappungen
- 0 Kabel-/Linien-Durchgänge durch Textboxen oder Panels
- `light-dark` im exportierten SVG: 0 Treffer
- Digital: Logo weiß, Mixer-Icon blau, Hintergrund `#050510`
- Druck: Logo schwarz, Mixer-Icon schwarz, Hintergrund `#ffffff`, PDF-Ecken weiß
- PDF: Text extrahierbar, Schriften eingebettet, 1 Seite im Format 1152 × 814 pt

## 9. Status

- [x] Club-Paket gezeichnet, exportiert, validiert, **vom Nutzer freigegeben**
- [x] Schriften (Josefin Sans + Inter) installiert und im Export verifiziert
- [x] XML-Escaping-Fehler behoben (vorher: 8 statt 47 Textzellen exportiert)
- [x] Partypaket XL generieren + exportieren + validieren
- [x] Top-Paar generieren + exportieren + validieren
- [x] Beide neuen Diagramme in draw.io zur Review öffnen
- [ ] Optional: Einbindung in die Produktdetailseiten (`/vermietung/ld-icoa-*`)