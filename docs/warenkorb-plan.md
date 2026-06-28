# Warenkorb-System Implementierungsplan

## Überblick
Clientseitiger Warenkorb zur Sammlung von Produktanfragen vor der Kontaktformular-Abgabe. Nutzung von `localStorage` für Persistenz, vollständige Integration im bestehenden Astro/Tailwind-Stack ohne zusätzliche Build-Schritte oder Backend-Abhängigkeiten.

---

## Kernarchitektur

### 1. Zustandsmanagement
- **Speichermechanismus**: `localStorage` mit Schlüssel `sls_cart` (Sound & Licht Store Cart)
- **Datenstruktur**:
  ```javascript
  {
    items: [
      {
        slug: string,          // Produkt-Slug (z.B. "jbl-partybox-300-320")
        quantity: number,      // ≥1
        addedAt: timestamp     // Für mögliche Ablauflogik (optional)
      }
    ],
    lastUpdated: timestamp
  }
  ```
- **Zugriffsmodul**: `src/lib/cartStore.js` (einfacher ES-Module mit Funktionen):
  - `getCart()` → gibt aktuelles Warenkorb-Objekt zurück
  - `addItem(slug, quantity=1)` → fügt hinzu oder erhöht Menge
  - `removeItem(slug)` → entfernt komplett
  - `updateItemQuantity(slug, quantity)` → setzt Menge (0 = entfernen)
  - `clearCart()` → leeren Warenkorb
  - `getItemCount()` → Gesamtanzahl Artikel (für Badge)
  - `getTotalPrice()` → berechnet Summe (via Produktdaten-Lookup)

### 2. Produktdaten-Integration
- Nutze bestehende `getCollection('products')`-Strukturen aus:
  - `vermietung.astro` (bereits geladen für Katalog)
  - Section-Komponenten (`soundEquipment`, `lichtEquipment` etc.)
- **Lookup-Mechanismus**: Bei Warenkorb-Operationen Produkt-Daten über Slug aus vorhandenem `products`-Array ziehen (keine zusätzlichen fetches nötig)

---

## Komponenten-Übersicht & Änderungen

### Neu zu erstellen
| Komponente | Zweck | Props | Platzierung |
|------------|-------|-------|-------------|
| `CartButton.astro` | Kleiner Button mit "+" Icon für Produktkarten | `{ product }` | In jedes Produktkarten-Template |
| `CartIcon.astro` | Warenkorb-Icon mit Badge im Header | `{ itemCount }` | `Navbar.astro` (rechts vom Menu-Button) |
| `CartDrawer.astro` | Seitenpanel zur Warenkorb-Ansicht/Bearbeitung | `{ open, onClose, onUpdate }` | Als Portal in `Layout.astro` oder direkt in `Index.astro` |
| `CartItem.astro` | Einzelne Zeile im Warenkorb-Drawer | `{ item, product }` | Innen in `CartDrawer.astro` |

### Zu modifizierende Bestandteile
| Datei | Änderungen |
|-------|------------|
| `src/components/Navbar.astro` | Warenkorb-Icon rechts vom Burger-Menü hinzufügen; Zustand über `cartStore` verbinden |
| `src/pages/vermietung.astro` | In Sound/Licht-Sections: "Jetzt anfragen"-Buttons teilweise durch/oder ergänzen mit "Zum Warenkorb hinzufügen" |
| `src/components/PackageCardGrid.astro` | "Mehr Infos"-Button teilweise ersetzen oder ergänzen mit Warenkorb-Button |
| `src/components/ContactForm.astro` | Zusätzliches verstecktes Feld: `<input type="hidden" name="cart" value={JSON.stringify(cartData)} />` |
| `src/layouts/Layout.astro` | Optional: Warenkorb-Drawer als Portal am Ende des Body einbauen |

---

## Datenfluss & Interaktionen

### 1. Artikel hinzufügen
- Benutzer klickt "Zum Warenkorb hinzufügen" auf Produktkarte
- Component ruft `cartStore.addItem(product.slug)` auf
- UI update: 
  - Button-Status ändert sich zu "Im Warenkorb" (mit Prüfhäkchen-Icon)
  - Warenkorb-Icon-Badge in Navbar inkrementiert

### 2. Warenkorb ansehen/bearbeiten
- Klick auf Warenkorb-Icon öffnet `CartDrawer` (über CSS-Animation/Transition)
- Drawer zeigt:
  - Produktbild (mini), Titel, Preis pro Stück
  - Menge-Stepper (-/+, aktueller Wert, Max: 99)
  - Entfernen-Button (Papierkorb-Icon)
  - Zwischensumme pro Position
  - Gesamtbetrag unten
- Alle Änderungen aktualisieren sofort `localStorage` und UI

### 3. Checkout-Integration
- Beim Absenden des Kontaktformulars:
  1. Formular-JS holt aktuellen Warenkorb via `cartStore.getCart()`
  2. Serialisiert zu lesbarem String (oder JSON) für verstecktes Feld
  3. Beispielwert: `"2x JBL Partybox 300/320, 1x Akku-Party-Paket"`
  4. Optional: Zusätzlich strukturiertes JSON für Maschinenverarbeitung
- Formular wird wie gehabt an Web3Forms gesendet

### 4. Bestätigung & Post-Submit
- Auf `/thankyou` Seite:
  - Optionaler Abschnitt: "Ihre Anfrage umfasste: [formatierte Warenkorb-Liste]"
  - Button: "Warenkorb leeren für neue Anfrage" (ruft `cartStore.clearCart()` auf)
  - Andernfalls: Warenkorb bleibt erhalten (für mögliche Nachfragen)

---

## UI/UX-Spezifikationen

### Design-Anlehnung an Bestandteile
- **Farben**: Nutze vorhandene Variablen (`--color-accent`, `--color-secondary`, etc.)
- **Icons**: Verwende existierende `Icon.astro`-Komponente oder SVG-Inline für konsistenten Stil
- **Abstände/radius**: Übernehme von `btn-primary`, `input`-Stilen
- **Hover/Zustände**: Entspricht bestehenden Button-Animationen

### Mobile-first Überlegungen
- Warenkorb-Drawer: 
  - Desktop: Rechtsseitiges Panel (30-40% Breite)
  - Mobile: Vollbild-Overlay mit Schließen-Icon (X) oben links
- Menge-Stepper: Touch-freundliche Buttons (min. 44x44pt)
- Warenkorb-Icon: Auch auf Mobile im Header sichtbar (rechts vom Burger-Menü)

### Zugänglichkeit (a11y)
- Alle interaktiven Elemente mit `aria-label` versehen
- Warenkorb-Icon: `aria-label="Warenkorb (3 Artikel)"` mit dynamischer Anzahl
- Drawer: Fokus-Management beim Öffnen/Schließen, Esc zum Schließen
- Menge-Inputs: Klare Labels, sichtbar trotz visueller Steuerung

---

## Implementierungsphasen (empfohlene Reihenfolge)

### Phase 1: Grundlagen
1. Erstellen
   - Erstelle `src/lib/cartStore.js` mit CRUD-Operationen
   - Implementiere `localStorage`-Lade-/Speicherlogik mit Fehlerfallback
   - Grundlegende Getter für Anzahl/Preis (vorerst hardcoded Testdaten)

2. UI-Komponenten Grundgerüst
   - `CartButton.astro`: Einfacher Button mit Zuständen (normal/in-cart)
   - `CartIcon.astro`: Icon + Badge (vereinzelt mit Mock-Daten)
   - `CartDrawer.astro`: Statisches Layout ohne Funktionalität

### Phase 2: Integration
1. Verbinde `CartButton` mit Produktkarten in:
   - Sound/Licht Abschnitte in `vermietung.astro`
   - `PackageCardGrid.astro`
2. Implementiere eigentliche `addToCart` Logik in Buttons
3. Verbinde `CartIcon` mit `cartStore.getItemCount()`

### Phase 3: Interaktion & Drawer
1. Implementiere Warenkorb-Drawer mit Öffnen/Schließen
2. Fülle Drawer mit dynamischer Produktliste (Lookup über `products`-Array)
3. Implementiere Menge-Stepper und Entfernen-Funktion mit Store-Updates
4. Stelle sicher, dass UI-Änderungen sofort im reflet sind

### Phase 4: Formular-Integration
1. Erstelle Hilfsfunktion zur Formatierung des Warenkorbs für Anzeige
2. Füge verstecktes Feld zu `ContactForm.astro` hinzu
3. Stelle sicher, dass der Wert beim Submit aktuell ist (kein Race-Condition)

### Phase 5: Feinschliff & Testing
1. Übergangszustände (Lade-/Leer-Zustände des Warenkorbs)
2. Visuelle Feedback-Animationen (z.B. "Produkt zum Warenkorb hinzufügt"-Effekt)
3. Edge Cases: 
   - Max-Mengen-Begrenzung pro Produkt (z.B. 99)
   - Ungültige Eingaben im Menge-Feld behandeln
   - Leeren Warenkorb graceful handlen
4. Aufräumen: Entferne alle Testdaten/Konsolen-Ausgaben

---

## Abhängigkeiten & Risiken

### Technische Abhängigkeiten
- Keine neuen NPM-Pakete erforderlich (verwendet bestehendes Astro/Build-Setup)
- Optional: Falls komplexe Animationen gewünscht, könnte `@animierte` oder ähnliche genutzt werden (aber nicht zwingend nötig)

### Potenzielle Herausforderungen & Lösungen
| Risiko | Lösung |
|--------|--------|
| **Konsistenz der Produktdaten** | Stelle sicher, dass alle Produktanzeigen (Sektionen, Paketgrid, Detailseiten) dieselbe Quelle (`getCollection('products')`) nutzen für Lookups |
| **Zustands-Synchronisation bei mehreren Tabs** | Optional: `storage`-Event-Listener zum Aktualisieren anderer Tabs beim `localStorage`-Change (nice-to-have) |
| **Leistung bei großen Katalogen** | Aktueller Katalog ist klein (~21 Produkte); Lookups über Array sind vernachlässigbar slow |
| **Formularübermittlung mit Warenkorb-Daten** | Teste, dass Web3Forms lange Strings im `cart`-Field akzeptiert (falls nicht: kürze auf Zusammenfassung oder nutze eigenen Betreff-Feld kreativ) |
| **Zurück-Button nach Submit** | Überlege: Soll Warenkorb nach erfolgter Absende leeren? (Empfehlung: Nur bei expliziter "Neue Anfrage" Aktion zurücksetzen, nicht automatisch) |

---

## Erfolgsmetriken & Testing-Checkliste

### Funktional tests
- [ ] Produkt zum Warenkorb hinzufügen von allen Listenorten
- [ ] Warenkorb-Badge aktualisiert korrekt
- [ ] Warenkorb-Drawer öffnet/schließen korrekt
- [ ] Menge erhöhen/verringern funktioniert
- [ ] Artikel entfernen funktioniert
- [ ] Warenkorb persists über Seite Neuladen
- [ ] Warenkorb persists über Seitenwechsel (z.B. Vermietung → Index → Vermietung)
- [ ] Leeren Warenkorb zeigt passenden Zustand
- [ ] Formularübermittlung enthält korrekte Warenkorb-Daten
- [ ] Thank-you Seite zeigt Bestellzusammenfassung an (falls implementiert)

### Nicht-funktional tests
- [ ] Keine JavaScript-Fehler in Console
- [ ] Responsive Breakpoints funktionieren (Mobile/Desktop)
- [ ] Tastatur-Navigation möglich (Tab fokusierbare Elemente)
- [ ] Screenreader-freundliche Labels anunciado
- [ ] Visuelle Zustände (hover/focus/disabled) konsistent
- [ ] Keine Layout-Shifts beim Laden

### Performance-Kriterien
- [ ] Warenkorb-Operationen <16ms (60fps Grenze)
- [ ] Keine blockierenden Long Tasks beim Hinzufügen/Entfernen
- [ ] Effiziente lokale Speicherung (keine unnötigen JSON.stringify Aufrufe bei jedem Keystroke)

---

## Weiterführende Überlegungen (für zukünftige Iterationen)

1. **Produktvarianten unterstützen**: Falls zukünftig Produkte Optionen haben (z.B. Farben, Zusatzleistungen)
2. **Wishlist-Funktion**: Merkzettel für später neben aktuellem Warenkorb
3. **Speziell für Events**: Vorbefüllte Warenkörbe für typische Partykonfigurationen
4. **Analytik-Einsicht**: Welche Produkte werden häufig zusammen gelegt? (via Event-Tracking in Warenkorb-Aktionen)
5. **Zeitlich begrenzte Angebote**: Warenkorb mit Ablaufdatum für Rabatte

---

*Dieser Plan bietet eine vollständige, umsetzbare Roadmap für den Warenkorb-Feature unter Einhaltung der bestehenden Projektarchitektur und -konventionen. Alle Komponenten lassen sich schrittweise implementieren und testen, wobei jede Phase eigenständig funktionsfähig bleibt.*