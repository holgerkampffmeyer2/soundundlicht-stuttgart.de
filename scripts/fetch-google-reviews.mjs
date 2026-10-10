#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reviewsFilePath = path.join(__dirname, '../src/data/google-reviews.json');

// Google Business Profile "Holger Kampffmeyer DJ Dienstleistungen"
const QUERY = 'Holger Kampffmeyer DJ Dienstleistungen Leinfelden-Echterdingen';
// Place-ID aus dem Google-Maps-Link: <hex_1>:<hex_2>; hex_2 === cid (dezimal)
const PLACE_ID = '0x4799c318ddfada49:0x8c761bb0db8ae55e';
const IMAGE = 'gosom/google-maps-scraper:latest';
const CACHE_VOLUME = 'gmaps-playwright-cache';
const DRY_RUN = process.argv.includes('--dry-run');

// cid aus dem Scraper wird als JS-Number (float) geparst -> gleiche Rundung beim Vergleich.
const expectedCid = Number(BigInt(PLACE_ID.split(':')[1]));

const reviewKey = (review) =>
  `${(review.author_name || '').trim().toLowerCase()}|${(review.text || '').trim().slice(0, 40)}`;

function loadExisting() {
  try {
    const parsed = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));
    return {
      reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
    };
  } catch {
    return { reviews: [] };
  }
}

function mapReview(raw) {
  const text = (raw.text_original || raw.Description || '').trim();
  return {
    author_name: (raw.Name || 'Anonym').trim(),
    rating: raw.Rating ?? 5,
    text,
    relative_time_description: raw.When || '',
    time: raw.published_at || undefined,
  };
}

function runScraper() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gmaps-sls-'));
  const queriesFile = path.join(tmpDir, 'queries.txt');
  const outDir = path.join(tmpDir, 'out');
  fs.writeFileSync(queriesFile, `${QUERY}\n`, 'utf-8');
  fs.mkdirSync(outDir);

  const resultsFile = path.join(outDir, 'results.json');
  const dockerArgs = [
    'run',
    '--rm',
    '-v',
    `${CACHE_VOLUME}:/opt`,
    '-v',
    `${queriesFile}:/queries.txt:ro`,
    '-v',
    `${outDir}:/out`,
    IMAGE,
    '-input',
    '/queries.txt',
    '-results',
    '/out/results.json',
    '-depth',
    '1',
    '-lang',
    'de',
    '-exit-on-inactivity',
    '1m',
    '-json',
    '-extra-reviews',
  ];

  if (DRY_RUN) {
    console.log('🧪 docker ' + dockerArgs.map((a) => (a.includes(' ') ? `"${a}"` : a)).join(' '));
    fs.rmSync(tmpDir, { recursive: true, force: true });
    return null;
  }

  console.log('📥 Scrape Google-Rezensionen über google-maps-scraper (Docker)...');
  console.log(`   Query: "${QUERY}" (kann ~25s dauern)`);

  const result = spawnSync('docker', dockerArgs, { encoding: 'utf-8' });

  if (result.error) {
    const hint =
      result.error.code === 'ENOENT'
        ? 'Docker ist nicht installiert bzw. nicht im PATH. Siehe https://docs.docker.com/get-docker/'
        : result.error.message;
    throw new Error(hint);
  }

  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || '').trim().split('\n').slice(-5).join('\n');
    throw new Error(`Docker-Scraper fehlgeschlagen (Exit ${result.status}):\n${detail}`);
  }

  if (!fs.existsSync(resultsFile)) {
    throw new Error('Scraper hat keine results.json erzeugt.');
  }

  const entries = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
  const list = Array.isArray(entries) ? entries : [entries];
  fs.rmSync(tmpDir, { recursive: true, force: true });

  const match =
    list.find((entry) => Number(entry.cid) === expectedCid) ||
    list.find((entry) => /Kampffmeyer/i.test(entry.title || ''));

  if (!match) {
    throw new Error(
      `Kein Treffer für "${QUERY}" gefunden (${list.length} Ergebnis(se): ${list
        .map((e) => e.title)
        .join(', ')}).`
    );
  }

  return match;
}

function main() {
  if (DRY_RUN) {
    runScraper();
    return;
  }

  let match;
  try {
    match = runScraper();
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }

  const reviews = (match.user_reviews || [])
    .map(mapReview)
    .sort((a, b) => String(b.time || '').localeCompare(String(a.time || '')));

  console.log(`   Gefunden: "${match.title}" — ${match.review_rating}★ / ${match.review_count} Bewertungen`);
  console.log(`   Scraper liefert ${reviews.length} Rezension(en).`);

  const existing = loadExisting();
  const existingKeys = new Set(existing.reviews.map(reviewKey));
  const newCount = reviews.filter((review) => !existingKeys.has(reviewKey(review))).length;
  const seen = new Set(reviews.map(reviewKey));
  const kept = existing.reviews.filter((review) => !seen.has(reviewKey(review)));
  const merged = [...reviews, ...kept];

  const output = {
    ratingValue: match.review_rating ?? 5,
    reviewCount: match.review_count ?? merged.length,
    fetchedAt: new Date().toISOString(),
    reviews: merged,
  };

  fs.writeFileSync(reviewsFilePath, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  console.log(
    `✅ Geschrieben: ${path.relative(process.cwd(), reviewsFilePath)} ` +
      `(ratingValue=${output.ratingValue}, reviewCount=${output.reviewCount}, ` +
      `gespeichert=${merged.length}, davon neu: ${newCount})`
  );
}

main();
