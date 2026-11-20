import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT ?? 4321);

const CONTENT_TYPES = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  let file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end();
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    const indexFile = path.join(file, 'index.html');
    file = fs.existsSync(indexFile) ? indexFile : `${file}.html`;
  }
  if (!path.extname(file)) {
    file += '.html';
  }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    const notFoundFile = path.join(ROOT, '404.html');
    if (fs.existsSync(notFoundFile) && fs.statSync(notFoundFile).isFile()) {
      res.writeHead(404, {
        'Content-Type': CONTENT_TYPES['.html'],
      });
      fs.createReadStream(notFoundFile).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found');
    return;
  }

  res.writeHead(200, {
    'Content-Type': CONTENT_TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT);
