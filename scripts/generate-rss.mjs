import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const site = 'https://soundundlicht-stuttgart.de';

const excludePaths = ['/impressum', '/links'];

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function decodeHtmlEntities(str) {
  return str.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code)).replace(/&amp;/g, '&');
}

function formatRssDate(dateStr) {
  const date = new Date(dateStr);
  const dayName = dayNames[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, '0');
  const monthName = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${dayName}, ${day} ${monthName} ${year} 00:00:00 GMT`;
}

function extractMeta(html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : '';
  const description = descMatch ? decodeHtmlEntities(descMatch[1].trim()) : '';
  return { title, description };
}

function findHtmlPages() {
  const pageMap = new Map();

  function walkDir(dir, relativePrefix) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    let hasIndex = false;
    for (const entry of entries) {
      if (entry.isFile() && entry.name === 'index.html') {
        hasIndex = true;
        break;
      }
    }

    if (hasIndex) {
      const pagePath = relativePrefix || '/';
      const shouldExclude = excludePaths.some(ex => pagePath.startsWith(ex));
      if (!shouldExclude) {
        const fullPath = path.join(dir, 'index.html');
        const html = fs.readFileSync(fullPath, 'utf-8');
        const meta = extractMeta(html);
        if (!meta.title.startsWith('Redirecting')) {
          const stat = fs.statSync(fullPath);
          const pubDate = stat.mtime.toISOString().split('T')[0];
          pageMap.set(pagePath, { path: pagePath, title: meta.title, description: meta.description, pubDate });
        }
      }
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name), `${relativePrefix}${entry.name}/`);
      }
    }
  }

  walkDir(DIST_DIR, '/');
  return [...pageMap.values()].sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

function generateRss() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run `astro build` first.');
    process.exit(1);
  }

  const items = findHtmlPages();

  const today = new Date();
  const lastBuildDate = formatRssDate(today);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml('Sound & Licht Stuttgart - Neueste Updates')}</title>
    <link>${site}</link>
    <description>${escapeXml('Neueste Seiten-Updates von Sound & Licht Stuttgart – Veranstaltungstechnik Vermietung im Großraum Stuttgart.')}</description>
    <language>de</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
`;

  for (const item of items) {
    const pubDate = formatRssDate(item.pubDate);
    const category = '[Seite]';
    const link = `${site}${encodeURI(item.path)}`;
    xml += `    <item>
      <guid isPermaLink="false">${escapeXml(encodeURI(item.path))}</guid>
      <title>${escapeXml(category + ' ' + item.title)}</title>
      <link>${escapeXml(link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>
`;
  }

  xml += `  </channel>
</rss>
`;

  const distPath = path.join(DIST_DIR, 'rss.xml');
  fs.writeFileSync(distPath, xml);
  console.log(`✅ RSS feed generated at dist/rss.xml with ${items.length} items`);

  const publicPath = path.join(PUBLIC_DIR, 'rss.xml');
  fs.writeFileSync(publicPath, xml);
  console.log(`   → synced to public/rss.xml`);
}

generateRss();
