# Tasks

## 1. Navigation verschlanken

- [x] 1.1 `Navbar.astro`: `vermietungGroups` durch vier Einträge (`/vermietung`, `/vermietung/pakete`, `/vermietung#sound`, `/vermietung#licht`) ersetzen und Desktop sowie Mobile aus dieser Liste rendern; verifiziert durch `npx playwright test tests/navigation.spec.ts` mit genau diesen Zielen in beiden Menüs.
- [x] 1.2 Active-Markierung auf den Vermietungs-Elternlink (und `/vermietung/pakete` bei exaktem Pfad) umstellen; verifiziert durch E2E-Check auf `/vermietung/pa-anlage`.

## 2. Footer umstrukturieren

- [x] 2.1 `Footer.astro`: Spalte „Schnelllinks“ durch „Technik“ mit allen 27 Vermietungs-Detailseiten in drei Gruppen ersetzen; verifiziert durch E2E-Check der sechs Pflicht-Links im Footer.
- [x] 2.2 `/faq` in „Externe Links“ übernehmen; verifiziert durch E2E-Check: Footer enthält `/faq`, Navbar nicht.

## 3. Integration und Verifikation

- [x] 3.1 `tests/navigation.spec.ts` auf `[REQ-TECHLP-06]` (vier Nav-Einstiege, Footer-Discoverability, Active-State) umschreiben; `npx playwright test tests/navigation.spec.ts` läuft grün.
- [x] 3.2 `pnpm run lint:agent && pnpm run check && pnpm run build` läuft ohne Fehler.

## Workflow follow-up

- Archivierung nach erfolgreicher Verifikation mit `openspec archive slim-navigation -y`.
- Archiviertes Ergebnis mit `openspec validate` prüfen.
