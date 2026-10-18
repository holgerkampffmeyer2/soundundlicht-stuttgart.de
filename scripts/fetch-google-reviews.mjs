#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { scrapeGoogleReviews } from './lib/scrape-reviews.mjs';
import { buildOutput, mergeReviews, parseLimit } from './lib/review-pipeline.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reviewsFilePath = path.join(__dirname, '../src/data/google-reviews.json');

const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = parseLimit(process.argv);

function loadExisting() {
  try {
    const parsed = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));
    return Array.isArray(parsed.reviews) ? parsed.reviews : [];
  } catch {
    return [];
  }
}

async function main() {
  if (DRY_RUN) {
    console.log('🧪 Dry-Run: Playwright-Scraper mit persistentem Profil (~/.cache/sls-gmaps-profile)');
    console.log(`   Place-URL: Holger Kampffmeyer DJ Dienstleistungen`);
    console.log(`   Limit: ${LIMIT} (0 = unbegrenzt, falls keine Zeitstempel vorhanden)`);
    return;
  }

  console.log('📥 Scrape Google-Rezensionen via Playwright...');
  console.log(`   Profil: ~/.cache/sls-gmaps-profile (Anmeldung einmalig: pnpm run gmaps:login)`);

  let match;
  try {
    match = await scrapeGoogleReviews({ chromium, headless: true });
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }

  const { reviews, newCount } = mergeReviews(match.reviews, loadExisting(), LIMIT);
  const output = buildOutput({ match, reviews });

  fs.writeFileSync(reviewsFilePath, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  console.log(
    `✅ Geschrieben: ${path.relative(process.cwd(), reviewsFilePath)} ` +
      `(ratingValue=${output.ratingValue}, reviewCount=${output.reviewCount}, ` +
      `gespeichert=${reviews.length}, davon neu: ${newCount})`
  );
}

main();
