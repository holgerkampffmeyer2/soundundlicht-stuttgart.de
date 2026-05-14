import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const lhDir = '.lighthouseci';
const files = readdirSync(lhDir).filter(f => f.startsWith('lhr-') && f.endsWith('.json'));

if (files.length === 0) {
  console.log('No Lighthouse report found.');
  process.exit(0);
}

const report = JSON.parse(readFileSync(join(lhDir, files[0]), 'utf-8'));

function score(n) {
  const s = Math.round(n * 100);
  if (s >= 90) return `🟢 ${s}`;
  if (s >= 50) return `🟠 ${s}`;
  return `🔴 ${s}`;
}

function fmt(ms) {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)} s`;
  return `${Math.round(ms)} ms`;
}

const categories = report.categories;
const perf = categories.performance;
const audits = report.audits;

const lcp = audits['largest-contentful-paint'];
const tbt = audits['total-blocking-time'];
const cls = audits['cumulative-layout-shift'];
const fcp = audits['first-contentful-paint'];
const speedIndex = audits['speed-index'];
const tti = audits['interactive'];

const opportunities = Object.values(audits)
  .filter(a => a.details?.type === 'opportunity' && a.score !== 1 && a.score !== null)
  .sort((a, b) => (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0))
  .slice(0, 5);

const largestResources = Object.values(audits)
  .filter(a => a.id === 'total-byte-weight' && a.details?.items)
  .flatMap(a => a.details.items || [])
  .filter(i => i.transferSize)
  .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0))
  .slice(0, 5);

const allItems = Object.values(audits)
  .filter(a => a.details?.items && a.id !== 'total-byte-weight' && a.id !== 'resource-summary')
  .flatMap(a => a.details.items || [])
  .filter(i => i.transferSize)
  .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0))
  .slice(0, 5);

const lcpElement = audits['largest-contentful-paint-element'];

const categoryEmoji = (id) => {
  if (id === 'performance') return '⚡';
  if (id === 'accessibility') return '♿';
  if (id === 'best-practices') return '✅';
  if (id === 'seo') return '🔍';
  return '';
};

console.log('## ⚡ Lighthouse CI – Key Findings\n');
console.log('| Category | Score |');
console.log('|----------|-------|');
for (const [id, cat] of Object.entries(categories)) {
  console.log(`| ${categoryEmoji(id)} ${id.replace('-', ' ')} | ${score(cat.score)} |`);
}

console.log('\n### ⏱ Core Web Vitals\n');
console.log('| Metric | Value | Score |');
console.log('|--------|-------|-------|');
if (lcp) console.log(`| **LCP** (Largest Contentful Paint) | ${fmt(lcp.numericValue)} | ${score(lcp.score)} |`);
console.log(`| **TBT** (Total Blocking Time) | ${tbt ? fmt(tbt.numericValue) : '—'} | ${tbt ? score(tbt.score) : '—'} |`);
if (cls) console.log(`| **CLS** (Cumulative Layout Shift) | ${cls.numericValue.toFixed(2)} | ${score(cls.score)} |`);
if (fcp) console.log(`| **FCP** (First Contentful Paint) | ${fmt(fcp.numericValue)} | ${score(fcp.score)} |`);
if (tti) console.log(`| **TTI** (Time to Interactive) | ${fmt(tti.numericValue)} | ${score(tti.score)} |`);

if (lcpElement?.displayValue) {
  console.log(`\n📌 **LCP Element:** ${lcpElement.displayValue}\n`);
}

if (lcp?.details?.items?.[0]?.timings) {
  const timings = lcp.details.items[0].timings;
  console.log('**LCP Breakdown:**');
  for (const [k, v] of Object.entries(timings)) {
    console.log(`- ${k}: ${fmt(v)}`);
  }
  console.log();
}

if (opportunities.length > 0) {
  console.log('\n### 🎯 Top 5 Optimierungsmöglichkeiten\n');
  console.log('| Maßnahme | Einsparung |');
  console.log('|----------|-----------|');
  for (const opp of opportunities) {
    const savings = opp.details.overallSavingsMs || 0;
    const size = opp.details.overallSavingsBytes || 0;
    let label = opp.title;
    if (savings > 0 && size > 0) {
      const sizeKB = Math.round(size / 1024);
      label += ` (${fmt(savings)} / ${sizeKB} KiB)`;
    } else if (size > 0) {
      label += ` (${Math.round(size / 1024)} KiB)`;
    } else if (savings > 0) {
      label += ` (${fmt(savings)})`;
    }
    const icon = opp.score === null ? '⚠️' : opp.score < 0.5 ? '🔴' : '🟠';
    console.log(`| ${icon} ${label} | ${size > 0 ? `${Math.round(size / 1024)} KiB` : fmt(savings)} |`);
  }
}

if (allItems.length > 0) {
  console.log('\n### 📦 Top 5 größte Ressourcen\n');
  console.log('| Resource | Size |');
  console.log('|----------|------|');
  for (const item of allItems) {
    const url = item.url?.replace('http://localhost:4321', '') || item.url || '—';
    const size = item.transferSize;
    console.log(`| \`${url}\` | ${Math.round(size / 1024)} KiB |`);
  }
}

const totalBW = audits['total-byte-weight'];
if (totalBW) {
  console.log(`\n**Gesamt:** ${Math.round(totalBW.numericValue / 1024)} KiB über ${audits['resource-summary']?.details?.items?.length || '—'} Ressourcen`);
}

const reportUrl = report.finalDisplayedUrl?.replace('http://localhost:4321', '') || report.finalUrl?.replace('http://localhost:4321', '');
if (reportUrl) {
  console.log(`\n**Getestete URL:** \`${reportUrl}\``);
}

console.log(`\n🔗 [Vollständigen Report ansehen](${files[0]})`);
