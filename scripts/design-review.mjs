import { chromium } from '/mnt/c/work/soundundlicht-stuttgart.de/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:4321';
const OUT = '/tmp/design-review';
const { mkdirSync, writeFileSync } = await import('fs');
mkdirSync(OUT, { recursive: true });

const VPS = [
  { n: 'mobile', w: 375, h: 812 },
  { n: 'tablet', w: 768, h: 1024 },
  { n: 'desktop', w: 1280, h: 800 },
  { n: 'wide', w: 1920, h: 1080 },
];

const PAGES = [
  { p: '/', n: 'index' },
  { p: '/stuttgart/', n: 'stuttgart' },
  { p: '/esslingen/', n: 'esslingen' },
  { p: '/tübingen/', n: 'tuebingen' },
  { p: '/filderstadt/', n: 'filderstadt' },
  { p: '/leinfelden-echterdingen/', n: 'leinfelden' },
];

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });

const issues = [];

function luma(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function ratio(c1, c2) {
  const [l1, l2] = [luma(...c1), luma(...c2)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function rgb(s) { const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); return m ? [~~m[1], ~~m[2], ~~m[3]] : null; }

for (const pg of PAGES) {
  for (const vp of VPS) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    const errors = [];
    p.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    try {
      await p.goto(BASE + pg.p, { waitUntil: 'networkidle', timeout: 20000 });
      await p.waitForTimeout(1500);
      await p.screenshot({ path: `${OUT}/${pg.n}_${vp.n}.png`, fullPage: true });

      // Heading analysis
      const headings = await p.evaluate(() => {
        const h1 = document.querySelectorAll('h1');
        const h2 = document.querySelectorAll('h2');
        return {
          h1: Array.from(h1).map(h => h.textContent.trim().slice(0, 60)),
          h2: Array.from(h2).map(h => h.textContent.trim().slice(0, 60)),
          h1count: h1.length,
          h2count: h2.length,
          title: document.title,
        };
      });

      if (headings.h1.length === 0) issues.push({ p: pg.n, v: vp.n, s: 'HIGH', t: 'SEO', m: 'No <h1> tag on page' });
      if (headings.h1.length > 1) issues.push({ p: pg.n, v: vp.n, s: 'MEDIUM', t: 'SEO', m: `Multiple <h1> (${headings.h1.length}): ${headings.h1.join(', ')}` });
      if (headings.h2.length === 0) issues.push({ p: pg.n, v: vp.n, s: 'HIGH', t: 'SEO', m: 'No <h2> tags on page' });

      // Overflow
      const ov = await p.evaluate(() => {
        const sw = document.documentElement.scrollWidth, vw = window.innerWidth;
        if (sw > vw + 5) {
          const els = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > vw + 2 && r.width > 20) { els.push(`${el.tagName}.${(el.className||'').slice(0,30)} r=${Math.round(r.right)}`); if (els.length>5) return; }
          });
          return { sw, vw, els };
        }
        return null;
      });
      if (ov) issues.push({ p: pg.n, v: vp.n, s: 'HIGH', t: 'OVERFLOW', m: `Horiz overflow ${ov.sw}px > ${ov.vw}px`, d: ov.els });

      // Mobile nav check
      if (vp.n === 'mobile') {
        const navCheck = await p.evaluate(() => {
          const nav = document.querySelector('nav');
          if (!nav) return { hasNav: false };
          const links = nav.querySelectorAll('a');
          const visible = Array.from(links).filter(a => a.offsetParent !== null).length;
          return { hasNav: true, totalLinks: links.length, visibleLinks: visible };
        });
        if (!navCheck.hasNav) issues.push({ p: pg.n, v: vp.n, s: 'HIGH', t: 'NAV', m: 'No <nav> element' });
        else if (navCheck.visibleLinks === 0) issues.push({ p: pg.n, v: vp.n, s: 'MEDIUM', t: 'NAV', m: `Nav has ${navCheck.totalLinks} links but none visible (maybe collapsed but no toggle)` });
      }

      // Image checks
      const imgs = await p.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
          src: (img.getAttribute('src')||'').slice(0, 60),
          alt: img.getAttribute('alt'),
          loading: img.getAttribute('loading'),
          hasWH: img.hasAttribute('width') || (img.naturalWidth > 0),
          nw: img.naturalWidth,
        }));
      });
      const noAlt = imgs.filter(i => !i.alt);
      noAlt.forEach(i => issues.push({ p: pg.n, v: vp.n, s: 'MEDIUM', t: 'ACCESSIBILITY', m: `Image missing alt: ${i.src}` }));
      const noLazy = imgs.filter(i => !i.loading && i.src.match(/\.(webp|jpg|png)/));
      noLazy.forEach(i => issues.push({ p: pg.n, v: vp.n, s: 'LOW', t: 'PERF', m: `No lazy loading: ${i.src}` }));

      // Contrast check
      const contrast = await p.evaluate(() => {
        function rgb(s) { const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); return m ? [~~m[1], ~~m[2], ~~m[3]] : null; }
        function luma(r, g, b) { const [rs, gs, bs] = [r,g,b].map(c => { c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }); return 0.2126*rs+0.7152*gs+0.0722*bs; }
        function ratio(c1, c2) { return (Math.max(luma(...c1),luma(...c2)) + 0.05) / (Math.min(luma(...c1),luma(...c2)) + 0.05); }
        const issues = [];
        document.querySelectorAll('p, span, a, button, label, li, h1, h2, h3, h4, .nav-link, .btn-primary, .btn-secondary').forEach(el => {
          const style = getComputedStyle(el);
          const t = (el.textContent||'').trim(); if (!t || t.length < 3) return;
          const c = rgb(style.color), bg = rgb(style.backgroundColor);
          if (!c || !bg) return;
          const fs = parseFloat(style.fontSize);
          const fw = parseInt(style.fontWeight);
          const cr = ratio(c, bg);
          const req = (fs >= 24 || (fs >= 18 && fw >= 700)) ? 3.0 : 4.5;
          if (cr < req && cr > 1.0) {
            issues.push({ txt: t.slice(0, 40), tag: el.tagName, cls: (el.className||'').slice(0,30), cr: cr.toFixed(2), req, fs: Math.round(fs) });
            if (issues.length >= 10) return;
          }
        });
        return issues;
      });
      contrast.forEach(c => issues.push({ p: pg.n, v: vp.n, s: c.cr < 3 ? 'HIGH' : 'MEDIUM', t: 'CONTRAST', m: `<${c.tag}>.${c.cls} "${c.txt}" ratio=${c.cr} need=${c.req} (${c.fs}px)` }));

      // Console errors
      errors.forEach(e => issues.push({ p: pg.n, v: vp.n, s: 'HIGH', t: 'CONSOLE', m: e.slice(0, 200) }));

      // Check text-only pages (empty content)
      const textLen = await p.evaluate(() => document.body.textContent.trim().length);
      if (textLen < 100) issues.push({ p: pg.n, v: vp.n, s: 'HIGH', t: 'CONTENT', m: `Page has only ${textLen} chars of text` });

    } catch (e) {
      issues.push({ p: pg.n, v: vp.n, s: 'HIGH', t: 'ERROR', m: `Page load failed: ${e.message}` });
    } finally { await ctx.close(); }
  }
}

await browser.close();

// Report
const report = [];
report.push('========================================');
report.push('   WEB DESIGN REVIEW RESULTS');
report.push('========================================\n');

report.push(`Target: ${BASE}`);
report.push(`Pages: ${PAGES.length} (${PAGES.map(p => p.n).join(', ')})`);
report.push(`Viewports: ${VPS.map(v => `${v.n} (${v.w}x${v.h})`).join(', ')}\n`);

report.push('--- ISSUES ---\n');
const byS = { HIGH: [], MEDIUM: [], LOW: [] };
issues.forEach(i => { if (byS[i.s]) byS[i.s].push(i); else byS.LOW.push(i); });
for (const [s, items] of Object.entries(byS)) {
  if (items.length === 0) continue;
  report.push(`[${s}] (${items.length})`);
  items.forEach(i => report.push(`  ${i.p}/${i.v} [${i.t}] ${i.m}`));
  report.push('');
}
report.push(`Total issues: ${issues.length}`);
report.push(`\nScreenshots: ${OUT}/`);

const reportText = report.join('\n');
console.log(reportText);
writeFileSync(`${OUT}/report.txt`, reportText);
