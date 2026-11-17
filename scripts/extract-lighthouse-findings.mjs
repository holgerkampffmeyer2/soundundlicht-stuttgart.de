import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const lhDir = '.lighthouseci';

if (!existsSync(lhDir)) {
  console.log('Kein Lighthouse-Ergebnisverzeichnis gefunden.');
  process.exit(0);
}

const files = readdirSync(lhDir)
  .filter(file => file.startsWith('lhr-') && file.endsWith('.json'))
  .sort((a, b) => statSync(join(lhDir, b)).mtimeMs - statSync(join(lhDir, a)).mtimeMs);

if (files.length === 0) {
  console.log('Kein Lighthouse-Report gefunden.');
  process.exit(0);
}

let report;
try {
  report = JSON.parse(readFileSync(join(lhDir, files[0]), 'utf8'));
} catch {
  console.log('Lighthouse-Report konnte nicht gelesen werden.');
  process.exit(0);
}

function score(value) {
  if (typeof value !== 'number') return '—';
  return String(Math.round(value * 100));
}

function fmt(ms) {
  if (typeof ms !== 'number') return '—';
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)} s`;
  return `${Math.round(ms)} ms`;
}

function cleanUrl(url) {
  return typeof url === 'string' ? url.replace(/^http:\/\/localhost:4321/, '') : '';
}

const categories = report.categories ?? {};
const audits = report.audits ?? {};

const lcp = audits['largest-contentful-paint'];
const tbt = audits['total-blocking-time'];
const cls = audits['cumulative-layout-shift'];
const fcp = audits['first-contentful-paint'];
const tti = audits['interactive'];
const lcpElement = audits['largest-contentful-paint-element'];

const opportunities = Object.values(audits)
  .filter(audit => audit?.details?.type === 'opportunity' && audit.score !== 1 && audit.score !== null)
  .sort((a, b) => (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0))
  .slice(0, 5);

const allItems = Object.values(audits)
  .filter(audit => audit?.details?.items && !['total-byte-weight', 'resource-summary'].includes(audit.id))
  .flatMap(audit => audit.details.items ?? [])
  .filter(item => item?.transferSize)
  .sort((a, b) => (b.transferSize ?? 0) - (a.transferSize ?? 0))
  .slice(0, 5);

const categoryNames = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  'best-practices': 'Best Practices',
  seo: 'SEO'
};

console.log('## Lighthouse CI - Key Findings\n');
console.log('| Kategorie | Score |');
console.log('|-----------|-------|');
for (const [id, category] of Object.entries(categories)) {
  console.log(`| ${categoryNames[id] ?? id} | ${score(category?.score)} |`);
}

console.log('\n### Core Web Vitals\n');
console.log('| Metrik | Wert | Score |');
console.log('|--------|------|-------|');
if (lcp) console.log(`| **LCP** (Largest Contentful Paint) | ${fmt(lcp.numericValue)} | ${score(lcp.score)} |`);
console.log(`| **TBT** (Total Blocking Time) | ${tbt ? fmt(tbt.numericValue) : '—'} | ${score(tbt?.score)} |`);
if (cls) console.log(`| **CLS** (Cumulative Layout Shift) | ${Number(cls.numericValue).toFixed(2)} | ${score(cls.score)} |`);
if (fcp) console.log(`| **FCP** (First Contentful Paint) | ${fmt(fcp.numericValue)} | ${score(fcp.score)} |`);
if (tti) console.log(`| **TTI** (Time to Interactive) | ${fmt(tti.numericValue)} | ${score(tti.score)} |`);

if (lcpElement?.displayValue) {
  console.log(`\n**LCP-Element:** ${lcpElement.displayValue}\n`);
}

if (lcp?.details?.items?.[0]?.timings) {
  console.log('**LCP-Aufschlüsselung:**');
  for (const [key, value] of Object.entries(lcp.details.items[0].timings)) {
    console.log(`- ${key}: ${fmt(value)}`);
  }
  console.log();
}

if (opportunities.length > 0) {
  console.log('\n### Top 5 Optimierungsmoeglichkeiten\n');
  console.log('| Massnahme | Einsparung |');
  console.log('|-----------|------------|');
  for (const opportunity of opportunities) {
    const savings = opportunity.details?.overallSavingsMs ?? 0;
    const size = opportunity.details?.overallSavingsBytes ?? 0;
    const sizeKb = Math.round(size / 1024);
    let label = opportunity.title ?? 'Unbekannt';
    if (size > 0) label += ` (${sizeKb} KiB)`;
    console.log(`| ${label} | ${size > 0 ? `${sizeKb} KiB` : fmt(savings)} |`);
  }
}

if (allItems.length > 0) {
  console.log('\n### Groesste Ressourcen\n');
  console.log('| Ressource | Groesse |');
  console.log('|-----------|---------|');
  for (const item of allItems) {
    console.log(`| \`${cleanUrl(item.url) || '—'}\` | ${Math.round(item.transferSize / 1024)} KiB |`);
  }
}

const totalBytes = audits['total-byte-weight'];
if (totalBytes?.numericValue) {
  console.log(`\n**Gesamt:** ${Math.round(totalBytes.numericValue / 1024)} KiB`);
}

const testedUrl = cleanUrl(report.finalDisplayedUrl ?? report.finalUrl);
if (testedUrl) {
  console.log(`\n**Getestete URL:** \`${testedUrl}\``);
}

console.log(`\n[Vollstaendigen Report ansehen](${join(lhDir, files[0]).replaceAll('\\', '/')})`);
