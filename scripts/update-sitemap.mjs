import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const baseUrl = 'https://soundundlicht-stuttgart.de';

function findHtmlPages() {
  const pages = [];

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
      pages.push(`${baseUrl}${pagePath}`);
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name), `${relativePrefix}${entry.name}/`);
      }
    }
  }

  walkDir(DIST_DIR, '/');
  return [...new Set(pages)].sort();
}

function generateUrllist(urls) {
  const publicPath = path.join(PUBLIC_DIR, 'urllist.txt');
  fs.writeFileSync(publicPath, urls.join('\n') + '\n');
  console.log(`✅ urllist.txt generated with ${urls.length} URLs`);

  const distPath = path.join(DIST_DIR, 'urllist.txt');
  fs.writeFileSync(distPath, urls.join('\n') + '\n');
  console.log(`   → synced to dist/`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const urls = findHtmlPages();
  generateUrllist(urls);
}

export { findHtmlPages, generateUrllist };
