#!/usr/bin/env node
// Öffnet Google Maps in einem persistenten Browserprofil, damit du dich einmalig
// anmelden kannst. Das Profil wird für `pnpm run update-reviews` wiederverwendet.
import { chromium } from 'playwright';
import { PLACE_URL, PROFILE_DIR, launchSession, isSignedIn } from './lib/gmaps-session.mjs';

const TIMEOUT_MS = 5 * 60 * 1000;

console.log(`🔐 Google-Anmeldung für Rezensionen-Scraper`);
console.log(`   Profil: ${PROFILE_DIR}`);
console.log(`   Bitte im geöffneten Fenster bei Google anmelden (als Inhaber des Betriebs).`);

const context = await launchSession(chromium, { headless: false });
const page = context.pages()[0] || (await context.newPage());
await page.goto(PLACE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

const start = Date.now();
while (Date.now() - start < TIMEOUT_MS) {
  if (await isSignedIn(page)) {
    console.log('✅ Angemeldet — Profil gespeichert. Du kannst das Fenster schließen.');
    await context.close();
    process.exit(0);
  }
  await page.waitForTimeout(2000);
}

console.error('⏰ Zeitlimit erreicht — nicht angemmeldet. Skript erneut ausführen.');
await context.close();
process.exit(1);
