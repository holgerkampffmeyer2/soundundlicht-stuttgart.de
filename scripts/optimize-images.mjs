import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const CONCURRENCY = os.cpus().length;

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dirs: [path.join(PUBLIC_DIR, 'img')],
    width: 1920,
    height: null,
    fit: 'inside',
    quality: 80,
    concurrency: CONCURRENCY,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-w' || arg === '--width') {
      options.width = parseInt(args[++i], 10) || 1920;
    } else if (arg === '-h' || arg === '--height') {
      options.height = parseInt(args[++i], 10) || null;
    } else if (arg === '--fit') {
      options.fit = args[++i] || 'inside';
    } else if (arg === '-q' || arg === '--quality') {
      options.quality = parseInt(args[++i], 10) || 80;
    } else if (arg === '--concurrency') {
      options.concurrency = parseInt(args[++i], 10) || CONCURRENCY;
    } else if (arg === '-d' || arg === '--dir') {
      options.dirs = [args[++i]];
    } else if (arg === '-h' || arg === '--help') {
      console.log(`
Usage: node optimize-images.mjs [options]

Options:
  -w, --width <px>        Max width (default: 1920)
  -h, --height <px>       Max height (default: no limit)
  --fit <mode>            Fit mode: cover/contain/inside/outside (default: inside)
  -q, --quality <num>     WebP quality 1-100 (default: 80)
  --concurrency <num>     Parallel tasks (default: CPU cores)
  -d, --dir <path>        Single directory to process (default: public/img)
  -h, --help              Show this help
      `);
      process.exit(0);
    }
  }

  return options;
}

function findImages(rootDir) {
  const images = [];
  if (!fs.existsSync(rootDir)) return images;

  const files = fs.readdirSync(rootDir, { recursive: true });
  for (const file of files) {
    if (typeof file !== 'string') continue;
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') continue;
    images.push(path.join(rootDir, file));
  }

  return images;
}

async function processImage(filePath, options) {
  const baseName = path.basename(filePath);
  const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');

  if (baseName.includes('icons') || baseName === '5stars.png') return false;

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Generate -thumb.webp variant (480px width) if it doesn't exist
    const thumbPath = filePath.replace(/\.(jpe?g|png)$/i, '-thumb.webp');
    let thumbGenerated = false;
    if (!fs.existsSync(thumbPath) && metadata.width > 480) {
      const thumbPipeline = sharp(filePath).resize({ width: 480, withoutEnlargement: true, fit: 'inside' });
      await thumbPipeline.webp({ quality: 75 }).toFile(thumbPath);
      const thumbSize = fs.statSync(thumbPath).size;
      console.log(`  ✓ thumb: ${path.basename(thumbPath)} (${(thumbSize / 1024).toFixed(1)}KB)`);
      thumbGenerated = true;
    }

    const needsResize =
      (options.width && metadata.width && metadata.width > options.width) ||
      (options.height && metadata.height && metadata.height > options.height);

    if (!needsResize && fs.existsSync(webpPath)) {
      return thumbGenerated;
    }

    const resizeOpts = {};
    if (needsResize) {
      if (options.width && metadata.width > options.width) resizeOpts.width = options.width;
      if (options.height && metadata.height > options.height) resizeOpts.height = options.height;
      resizeOpts.withoutEnlargement = true;
      resizeOpts.fit = options.fit;
    }

    let pipeline = image;

    if (needsResize) {
      pipeline = pipeline.resize(resizeOpts);
    }

    await pipeline
      .webp({ quality: options.quality })
      .toFile(webpPath);

    const originalSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const saved = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`  ✓ ${baseName} → ${path.basename(webpPath)} (${saved}% smaller)`);
    return true;
  } catch (err) {
    console.error(`  ✗ Error: ${baseName} - ${err.message}`);
    return false;
  }
}

async function processAll(images, options) {
  let converted = 0;
  const queue = [...images];

  async function worker() {
    while (queue.length > 0) {
      const filePath = queue.shift();
      const done = await processImage(filePath, options);
      if (done) converted++;
    }
  }

  const workers = Array.from({ length: Math.min(options.concurrency, images.length) }, () => worker());
  await Promise.all(workers);

  return converted;
}

async function main() {
  const options = parseArgs();
  let totalConverted = 0;

  for (const dir of options.dirs) {
    if (!fs.existsSync(dir)) {
      console.log(`Skipping (not found): ${dir}`);
      continue;
    }
    const images = findImages(dir);
    if (images.length === 0) {
      console.log(`No images found in: ${dir}`);
      continue;
    }
    console.log(`Processing ${images.length} images in: ${dir}`);
    const converted = await processAll(images, options);
    console.log(`[${dir}] ${converted} files converted to WebP`);
    totalConverted += converted;
  }

  console.log(`\n✅ Total: ${totalConverted} WebP images created`);
}

main();
