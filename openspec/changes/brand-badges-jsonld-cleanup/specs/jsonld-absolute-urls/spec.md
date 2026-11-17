# Spec Delta

## Purpose

Stellt sicher, dass alle JSON-LD-Structured-Data absolute URLs für Bilder (Service.image, VideoObject.thumbnailUrl), Breadcrumb-Items und Publisher-Logos verwenden, damit Suchmaschinen Rich Results korrekt validieren können.

## ADDED Requirements

### Requirement: Absolute Service-Image-URLs
Das `Service`-Schema SHALL für jedes `image`-Array absolute URLs ausgeben (Schema `https://soundundlicht-stuttgart.de/...`). Relative Pfade aus den Seiten SHALL vor der Serialisierung zu absoluten URLs konvertiert werden.

#### Scenario: Detailseite mit Hero-Bild
- **WHEN** eine Detailseite `serviceJsonLd(product, ["/img/vermietung/hero.webp"])` aufruft
- **THEN** das generierte JSON-LD enthält `"image": ["https://soundundlicht-stuttgart.de/img/vermietung/hero.webp"]`

#### Scenario: Bereits absolute URL bleibt erhalten
- **WHEN** ein Image-Pfad bereits absolut ist (z. B. `https://cdn.example.com/img.webp`)
- **THEN** die URL wird unverändert in das Schema übernommen

### Requirement: Absolute VideoObject-Thumbnail-URLs
Das `VideoObject`-Schema SHALL für `thumbnailUrl` absolute URLs ausgeben.

#### Scenario: Video mit relativem Thumbnail
- **WHEN** `videoJsonLd(..., "/img/vermietung/karaoke-paket-hero.webp", ...)` aufgerufen wird
- **THEN** das JSON-LD enthält `"thumbnailUrl": ["https://soundundlicht-stuttgart.de/img/vermietung/karaoke-paket-hero.webp"]`

### Requirement: Absolute Breadcrumb-Item-URLs
Das `BreadcrumbList`-Schema SHALL für jedes `itemListElement.item` absolute URLs ausgeben (sofern `href` gesetzt). Der letzte Eintrag (aktuelle Seite) ohne `href` SHALL ohne `item` serialisiert werden.

#### Scenario: Breadcrumb mit drei Segmenten
- **WHEN** `breadcrumbJsonLd([{label:"Startseite",href:"/"},{label:"Vermietung",href:"/vermietung"},{label:"Produkt"}])` aufgerufen wird
- **THEN** die ersten beiden Items enthalten absolute `item`-URLs, das letzte hat kein `item`-Feld

### Requirement: VideoObject-Platzhalter bereinigt
Auf Produktseiten ohne echtes Video SHALL KEIN `VideoObject`-Schema ausgegeben werden. Auf den beiden Seiten mit echtem Video (`karaoke-paket`, `partypaket-stuttgart`) SHALL das `VideoObject` mit korrekter `uploadDate` und `duration` ausgegeben werden.

#### Scenario: Seite ohne Video
- **WHEN** `akku-party-paket`, `max-party-bar`, `mini-party-beamer`, `partylicht-moving-head`, `powerstation` geladen werden
- **THEN** das `jsonLd`-Array der Seite enthält kein `VideoObject`

#### Scenario: Karaoke-Paket mit echtem Video
- **WHEN** `karaoke-paket` geladen wird
- **THEN** `VideoObject` mit `contentUrl` `https://www.youtube.com/watch?v=Ivch0DqKkW0`, `uploadDate: "2024-01-20T00:00:00+00:00"`, `duration: "PT1M30S"` ausgegeben

#### Scenario: Partypaket mit echtem Video
- **WHEN** `partypaket-stuttgart` geladen wird
- **THEN** `VideoObject` mit `contentUrl` `https://www.youtube.com/watch?v=Ivch0DqKkW0`, `uploadDate: "2024-01-20T00:00:00+00:00"`, `duration: "PT1M30S"` ausgegeben

### Requirement: Bestehende VideoObject-Metadaten bleiben erhalten
Für die 5 bereits befüllten Video-Seiten (`djpaket-fildern`, `kls-laser-bar`, `ld-maui-28g3`, `led-bossfx-nebelmaschine`, `veranstaltungspaket-stuttgart`) SHALL die bestehenden `uploadDate`/`duration`-Defaults (2024-03-15 / PT1M32S) unverändert bleiben.

#### Scenario: DJ-Paket VideoObject
- **WHEN** `djpaket-fildern` geladen wird
- **THEN** `VideoObject` mit `uploadDate: "2024-03-15T00:00:00+00:00"`, `duration: "PT1M32S"` beibehalten
