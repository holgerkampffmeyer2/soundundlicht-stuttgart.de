# Design

## Context

`Navbar.astro` pflegt die Vermietungs-Links aktuell zweimal (Desktop-Dropdown und Mobile-Akkordeon) mit 17 Einträgen in drei Gruppen. Die sechs Themenpages werden von `REQ-TECHLP-06` und `tests/navigation.spec.ts` in der Navigation geprüft. Die 27 Detailseiten haben bereits Breadcrumbs; `/faq` muss laut FAQ-Spec im Footer und darf nicht in der Navbar stehen. Die Footer-Spalte „Schnelllinks“ dupliziert fast vollständig die Topnavigation.

## Goals / Non-Goals

**Goals:**
- Ein gemeinsamer Eintrags-Array für Desktop und Mobile mit vier Vermietungs-Einstiegen.
- Alle 27 Vermietungs-Detailseiten im Footer auffindbar machen.
- Spec und E2E-Tests auf die neue Discoverability umstellen.

**Non-Goals:**
- Keine Level-2-Navigation und keine neuen Landingpages.
- Keine Änderung an Einzugsgebiet, externen Links, Social-Icons oder Produktinhalten.
- Keine dynamische Linkgenerierung aus der Products-Collection.

## Decisions

1. **Schlanker Dropdown statt Level-2-Nav.** Detailseiten sind über den Hub, Breadcrumbs und künftig den Footer erreichbar; eine zweite Ebene würde zusätzlichen Platz, eigene Active-Logik und ein Mobile-Akkordeon erfordern. Alternativ betrachtet: persists Subnav auf `/vermietung*` – verworfen wegen Komplexität bei geringem Nutzen für eine kleine Seite.
2. **Ein `vermietungEntries`-Array in `Navbar.astro`.** Desktop und Mobile rendern dieselben vier Ziele; Gruppenheader, Scrollbegrenzung und doppelte Pflege entfallen. Die Active-Markierung bleibt beim Vermietungs-Elternlink für alle `/vermietung*`-Pfade; `/vermietung/pakete` wird zusätzlich bei exaktem Pfad markiert. Anker-Ziele brauchen keinen serverseitigen Active-State.
3. **Statische Footer-Spalte „Technik“.** Die Liste folgt der bestehenden Konvention von „Einzugsgebiet“ (statisch, zweispaltig, gruppiert). Eine Ableitung aus `products` wurde verworfen: nicht jede Detailseite entspricht genau einem Produkt, und mehrere Seiten bündeln Produkte.
4. **FAQ-Link in „Externe Links“.** Damit bleibt die FAQ-Spec erfüllt, während die übrigen Schnelllinks entfallen können, weil sie bereits in der Topnavigation stehen.

## Risks / Trade-offs

- [Weniger direkte Zugriffe auf Detailseiten] → Footer-Liste, Breadcrumbs und die vier Einstiege sichern die Auffindbarkeit; E2E-Test prüft die sechs Pflicht-Links im Footer.
- [Footer-Liste kann veralten] → Statische Liste analog zum Einzugsgebiet dokumentieren; Tests decken die wichtigsten Pfade ab.
- [Mobile Dropdown weniger hierarchisch] → Vier Einträge passen ohne Scroll in das bestehende Akkordeon.

## Migration Plan

Reihenfolge: OpenSpec-Artefakte → Navbar → Footer → Tests → Verifikation (`playwright`, `lint:agent`, `check`, `build`) → Archivierung. Rollback über `git revert` des Implementations-Commits.
