# Tasks

## 1. Content Schema & Marken-Pflege

- [x] 1.1 `src/content.config.ts`: `brands: z.array(z.string()).optional()` zum Product-Schema hinzufügen; Verify: `pnpm run build` schlägt nicht fehl
- [x] 1.2 27 Produkt-YAMLs in `src/content/products/*.yml` mit `brands: []` befüllen (nur belegte Marken laut Mapping); Verify: `grep -r "brands:" src/content/products/ | wc -l` → 27 Zeilen
- [x] 1.3 Mapping prüfen: JBL, LD Systems, Yamaha, Stairville, Eurolite, BeamZ, EnginStar, Topvision, Uking, MAX, Showlight, Gravity korrekt eingetragen; unklare (Mikrofon, Akku-LED-PAR, LED-PAR-Lichter/-Strahler, Moving Head) ohne Feld; Verify: manueller Spot-Check 5 YAMLs

## 2. Badge-Komponente

- [x] 2.1 `src/components/vermietung/BrandBadges.astro` erstellen: Props `{ brands: string[] }`, rendert `<span class="brand-badge" aria-label={`Marke: ${brand}`}>` pro Marke; leeres Array → nichts; Verify: Datei existiert, TypeScript-Check `pnpm run lint:agent`
- [x] 2.2 Styles in `BrandBadges.astro` `<style>`: Pill-Optik (halbtansparenter dunkler BG, 1px Border `var(--color-border)`, `0.7rem`, `600`, `rounded-full`, `gap-1.5`); Verify: Dev-Server (`pnpm run dev`) → Komponente auf Testseite sichtbar
- [x] 2.3 `src/styles/global.css` Optional: globale `.brand-badge` Klasse falls Wiederverwendung; Verify: keine Stil-Konflikte

## 3. Detailseiten: Badge-Integration im Hero

- [x] 3.1 Import `BrandBadges` in 16 Detailseiten (`akku-party-paket`, `djpaket-fildern`, `jbl-partybox-300-320`, `karaoke-paket`, `kls-laser-bar`, `ld-icoa-buehnen-paket`, `ld-icoa-club-paket`, `ld-icoa-top-paar`, `ld-maui-28g3`, `led-bossfx-nebelmaschine`, `max-party-bar`, `mini-party-beamer`, `partylicht-moving-head`, `partypaket-stuttgart`, `powerstation`, `veranstaltungspaket-stuttgart`)
- [x] 3.2 In jedem Hero-Flex-Container (`<div class="flex flex-wrap gap-3 mt-3 mb-2">`) nach Plug-Badge `<BrandBadges brands={product.brands} />` einfügen; Verify: `pnpm run dev` → Badges erscheinen neben Preis/Plug
- [x] 3.3 Spezialfall `mikrofon-mischpult.astro` hat zwei Produkte (`mikrofon`, `mischpult`) im Hero → Badges nur für `mischpult` (Yamaha); Verify: Hero zeigt nur Yamaha-Pill

## 4. Kategorieseiten: Badge-Integration

- [x] 4.1 `src/components/vermietung/CategoryLayout.astro`: In Produktkarten (`product.brands`) `<BrandBadges brands={product.brands} class="mt-2" />` nach Preis-Badge einfügen; Verify: Übersichtsseite `/vermietung` zeigt Pills in Karten
- [x] 4.2 `ld-systems-icoa-series.astro`: Hero aggregiert `uniqueBrands = [...new Set([top, sub].flatMap(p => p.brands ?? []))]` → Badges; je Geräteabschnitt (`#ld-icoa-12-a`, `#ld-icoa-sub-15-a`) Badges aus jeweiligem Produkt; Verify: Hero zeigt „LD Systems“ + „Gravity“, Abschnitte je eine Pill
- [x] 4.3 `mikrofon-mischpult.astro`: Hero aggregiert `mischpult.brands` (Yamaha); Mikrofon-Abschnitt ohne Badge, Mischpult-Abschnitt mit Yamaha-Pill; Verify: Hero + Abschnitt korrekt
- [x] 4.4 `led-scheinwerfer.astro`: Hero aggregiert `Showlight` (Stage Bar); 4 Produktabschnitte: Strahler/Lichter/Akku ohne Badge, Stage Bar mit `Showlight`; Verify: Hero + Stage-Bar-Abschnitt
- [x] 4.5 `nebelmaschinen.astro`: Hero aggregiert `Stairville` (AF-150) + `Uking` (Nebel-Maschine); beide Abschnitte je eine Pill; Verify: Hero + Abschnitte

## 5. JSON-LD: Absolute URLs & VideoObject-Bereinigung

- [x] 5.1 `src/data/jsonLd.ts`: `SITE_URL` + `absoluteUrl(path: string)` Helper exportieren; Verify: TypeScript-Check
- [x] 5.2 `serviceJsonLd`: `image: images.map(absoluteUrl)`; Verify: Build JSON-LD auf Detailseite enthält absolute Image-URLs
- [x] 5.3 `videoJsonLd`: Signatur erweitern `meta?: { uploadDate?: string; duration?: string }`; Defaults beibehalten (`2024-03-15T00:00:00+00:00`, `PT1M32S`); `thumbnailUrl: [absoluteUrl(thumbnailUrl)]`; Verify: Karaoke/Partypaket mit Meta-Objekt korrekte Werte, 5 bestehende Videos Defaults
- [x] 5.4 `breadcrumbJsonLd`: `item: segment.href ? absoluteUrl(segment.href) : undefined`; Verify: BreadcrumbList Items absolut, letzter ohne `item`
- [x] 5.5 `karaoke-paket.astro`: `videoJsonLd` Aufruf mit `uploadDate: "2024-01-20T00:00:00+00:00"`, `duration: "PT1M30S"`, `thumbnailUrl: "/img/vermietung/karaoke-paket-hero.webp"`; `VIDEO_*_PLACEHOLDER` entfernen; Verify: Kein Platzhalter, VideoObject mit korrekten Metadaten
- [x] 5.6 `partypaket-stuttgart.astro`: Analog zu 5.5 (gleiche Video-ID, Thumbnail `/img/vermietung/partypaket.webp`); Verify: VideoObject korrekt
- [x] 5.7 5 Seiten ohne Video (`akku-party-paket`, `max-party-bar`, `mini-party-beamer`, `partylicht-moving-head`, `powerstation`): `videoJsonLd` Import, `videoJsonLdData`, `videoPublisher`, `jsonLd`-Eintrag komplett entfernen; ungenutzte `siteUrl`/`videoPublisher` Variablen löschen; Verify: Build → keine `VIDEO_*_PLACEHOLDER` im HTML, kein VideoObject im JSON-LD

## 6. Link-Formatierung & Route

- [x] 6.1 `src/components/vermietung/IncludedInPackages.astro`: `.included-in-packages-link { text-decoration: none; } .included-in-packages-link:hover { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 4px; }`; Verify: Links im Hero (Top-Paar, Bühnen-Paket, Club-Paket) haben keinen permanenten Underline, nur Hover
- [x] 6.2 `pnpm run build:full` ausführen; `grep ld-icoa-system public/urllist.txt` → keine Treffer; Verify: Alte Route nicht mehr in urllist
- [x] 6.3 Optional: `scripts/update-sitemap.mjs` prüfen, falls urllist nicht regeneriert → Fix; Verify: `dist/urllist.txt` ebenfalls sauber

## 7. Cleanup

- [x] 7.1 Einmal-Skripte löschen: `scripts/migrate_final.py`, `scripts/migrate_jsonld.py`, `scripts/migrate_jsonld_final.py`, `scripts/fix_jsonld_prerender.py`, `scripts/fix_jsonld_serialization.py`, `scripts/fix_prerender.py`; Verify: `ls scripts/*.py` → leer
- [x] 7.2 Ungenutzte `siteUrl` Konstanten in 12 Video-Seiten bereits in 5.7 entfernt; Verify: `grep -r "const siteUrl" src/pages/vermietung/` → keine Treffer mehr

## 8. Tests & Verifikation

- [x] 8.1 Unit-Test `tests/jsonld.spec.ts`: `videoJsonLd` mit/ohne Meta, `absoluteUrl`, `serviceJsonLd` absolute Images, `breadcrumbJsonLd` absolute Items; Verify: `pnpm test` → alle grün
- [ ] 8.2 Playwright-Test `tests/brand-badges.spec.ts`: Detailseite `karaoke-paket` → Badge „JBL“ + „Yamaha“ sichtbar; Paketseite `partypaket-stuttgart` → 3 Badges; Kategorie `ld-systems-icoa-series` Hero → 2 Badges; Verify: `npx playwright test tests/brand-badges.spec.ts`
- [ ] 8.3 Playwright-Test `tests/jsonld-placeholders.spec.ts`: 5 Seiten ohne Video → kein `VideoObject`; 7 Seiten mit Video → `VideoObject` vorhanden; Karaoke/Partypaket → korrekte `uploadDate`/`duration`; Verify: `npx playwright test tests/jsonld-placeholders.spec.ts`
- [ ] 8.4 Playwright-Test `tests/link-format.spec.ts`: `IncludedInPackages` Links auf `ld-systems-icoa-series` → kein permanenter Underline, nur Hover; Verify: `npx playwright test tests/link-format.spec.ts`
- [x] 8.5 Full-Build & Lint: `pnpm run lint:agent && pnpm run build:full && pnpm test && npx playwright test`; Verify: Alle grün, `dist/urllist.txt` sauber

## Workflow follow-up

- OpenSpec Tasks im Change abhaken
- `openspec archive brand-badges-jsonld-cleanup -y` nach Review
- Commit + Push (nach Freigabe)
