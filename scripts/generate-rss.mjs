import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const site = 'https://soundundlicht-stuttgart.de';

const pageMeta = {
  '/': { title: 'Sound & Licht Stuttgart', description: 'Partytechnik mieten in Stuttgart, Leinfelden-Echterdingen, Esslingen, Tübingen und Umgebung' },
  '/stuttgart/': { title: 'PA-Anlage & Partybox mieten in Stuttgart', description: 'Sound- und Lichttechnik mieten in Stuttgart' },
  '/esslingen/': { title: 'Partybox & PA-Anlage mieten in Esslingen', description: 'Veranstaltungstechnik mieten in Esslingen' },
  '/tübingen/': { title: 'Veranstaltungstechnik mieten in Tübingen', description: 'Sound, Licht und Partyequipment mieten in Tübingen' },
  '/filderstadt/': { title: 'Partytechnik mieten in Filderstadt', description: 'PA-Anlagen und Lichttechnik mieten in Filderstadt' },
  '/leinfelden-echterdingen/': { title: 'Veranstaltungstechnik mieten in Leinfelden-Echterdingen', description: 'Sound und Licht mieten in Leinfelden-Echterdingen' },
  '/kornwestheim/': { title: 'PA-Anlage & Partybox mieten in Kornwestheim', description: 'Veranstaltungstechnik mieten in Kornwestheim' },
  '/ludwigsburg/': { title: 'PA-Anlage & Partybox mieten in Ludwigsburg', description: 'Partytechnik mieten in Ludwigsburg' },
  '/böblingen/': { title: 'PA-Anlage & Partybox mieten in Böblingen', description: 'Sound- und Lichttechnik mieten in Böblingen' },
  '/sindelfingen/': { title: 'PA-Anlage & Partybox mieten in Sindelfingen', description: 'Veranstaltungstechnik mieten in Sindelfingen' },
  '/leonberg/': { title: 'PA-Anlage & Partybox mieten in Leonberg', description: 'Partyequipment mieten in Leonberg' },
  '/waiblingen/': { title: 'PA-Anlage & Partybox mieten in Waiblingen', description: 'Sound und Licht mieten in Waiblingen' },
  '/nürtingen/': { title: 'PA-Anlage & Partybox mieten in Nürtingen', description: 'Veranstaltungstechnik mieten in Nürtingen' },
  '/reutlingen/': { title: 'Veranstaltungstechnik mieten in Reutlingen', description: 'Sound, Licht und DJ-Equipment mieten in Reutlingen' },
  '/kirchheim-unter-teck/': { title: 'Veranstaltungstechnik mieten in Kirchheim unter Teck', description: 'Partytechnik mieten in Kirchheim unter Teck' },
  '/ostfildern/': { title: 'Veranstaltungstechnik mieten in Ostfildern', description: 'Sound und Licht mieten in Ostfildern' },
  '/vermietung/': { title: 'Eventtechnik Vermietung Stuttgart', description: 'Partytechnik mieten in Stuttgart – Sound, Licht, Komplettpakete' },
  '/vermietung/partypaket-stuttgart/': { title: 'Partypaket Stuttgart', description: 'Komplettpaket für bis zu 50 Personen – Sound, Licht, DJ-Equipment mieten' },
  '/vermietung/veranstaltungspaket-stuttgart/': { title: 'Veranstaltungspaket Stuttgart', description: 'Komplettpaket für bis zu 150 Personen – Profi-Equipment mieten' },
  '/vermietung/djpaket-fildern/': { title: 'DJ-Paket Fildern', description: 'DJ-Paket mit LD Maui, Moving Heads, LED PAR für bis zu 150 Personen' },
  '/vermietung/ld-maui-28g3/': { title: 'LD Maui 28 G3 mieten', description: 'Line Array Party-Soundsystem mit 2× 10" Subwoofer und 8× 3.5" Topteil' },
  '/vermietung/jbl-partybox-300-320/': { title: 'JBL Partybox 300/320 mieten', description: 'Kompaktes JBL Partybox Set für Indoor-Events' },
  '/vermietung/partylicht-moving-head/': { title: 'Partylicht & Moving Head mieten', description: 'LED Moving Head Spot + Partylicht Set für Dynamic Lightshows' },
  '/vermietung/led-bossfx-nebelmaschine/': { title: 'LED BossFX & Nebelmaschine mieten', description: 'LED BossFX-2 Pro + AF-150 Nebelmaschine für Atmosphäre' },
  '/vermietung/kls-laser-bar/': { title: 'Eurolite KLS Laser Bar mieten', description: 'Kompaktes LED Bar System mit Laser-Effekten für Partys' },
};

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRssDate(dateStr) {
  const date = new Date(dateStr);
  const dayName = dayNames[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, '0');
  const monthName = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${dayName}, ${day} ${monthName} ${year} 00:00:00 GMT`;
}

function getFileDate(filePath) {
  try {
    return fs.statSync(filePath).mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function generateRss() {
  const outputPath = path.join(__dirname, '../public/rss.xml');
  const items = [];

  const staticPagesDir = path.join(__dirname, '../src/pages');
  const excludePaths = ['impressum', 'links'];

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.astro')) {
        const relativePath = path.relative(staticPagesDir, fullPath);
        let pagePath = '/' + relativePath.replace(/\.astro$/, '').replace(/\\/g, '/');
        if (pagePath.endsWith('/index')) {
          pagePath = pagePath.replace('/index', '') || '/';
        }
        if (pagePath === '//') pagePath = '/';
        pagePath = pagePath.replace(/\/?$/, '/');

        const shouldExclude = excludePaths.some(ex => pagePath.includes(ex));
        if (shouldExclude) continue;

        const meta = pageMeta[pagePath];
        if (meta) {
          items.push({
            id: pagePath,
            title: meta.title,
            link: pagePath,
            description: meta.description,
            pubDate: getFileDate(fullPath),
            isPage: true,
          });
        }
      }
    }
  }

  walkDir(staticPagesDir);

  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

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
    xml += `    <item>
      <guid isPermaLink="false">${escapeXml(item.id)}</guid>
      <title>${escapeXml(category + ' ' + item.title)}</title>
      <link>${escapeXml(site + item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>
`;
  }

  xml += `  </channel>
</rss>
`;

  fs.writeFileSync(outputPath, xml);
  console.log(`✅ RSS feed generated at public/rss.xml with ${items.length} items`);
}

generateRss();
