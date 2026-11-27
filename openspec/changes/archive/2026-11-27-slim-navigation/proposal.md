# Proposal

## Why

Das Vermietungs-Dropdown führt aktuell 17 Links in drei Gruppen und ist damit unübersichtlich – auf Desktop wie auf Mobile. Die Detailseiten sind bereits über Breadcrumbs und den Hub `/vermietung` erreichbar; eine zweite Navigationsebene würde die Komplexität nur verlagern.

## What Changes

- Vermietungs-Dropdown auf vier Einstiege verschlanken: `/vermietung`, `/vermietung/pakete`, `/vermietung#sound`, `/vermietung#licht`.
- Footer-Spalte „Schnelllinks“ durch „Technik“ ersetzen: alle 27 Vermietungs-Detailseiten, gruppiert in Pakete/Sound/Licht und zweispaltig wie „Einzugsgebiet“.
- `/faq` aus den Schnelllinks in „Externe Links“ übernehmen; die FAQ-Spec (Footer-Link, kein Navbar-Link) bleibt unverändert.
- `REQ-TECHLP-06` anpassen: die sechs Themenpages sind künftig im Footer auffindbar, nicht mehr in der Hauptnavigation.

## Capabilities

### New Capabilities

- (keine)

### Modified Capabilities

- `technical-landingpages`: `REQ-TECHLP-06` (Navigation und aktive Markierung) wird auf vier Nav-Einstiege plus Footer-Discoverability umgestellt.

## Impact

- `src/components/Navbar.astro`, `src/components/Footer.astro`, `tests/navigation.spec.ts`
- Keine neuen Abhängigkeiten, keine neuen Seiten; Anker `#sound`/`#licht` auf `/vermietung` bleiben bestehen.
