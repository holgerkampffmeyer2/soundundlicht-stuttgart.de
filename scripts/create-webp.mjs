import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import os from 'os';

const DEFAULT_IMG_DIRS = ['./public/img', './public/assets'];
const CONCURRENCY = os.cpus().length;

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,
    width: 1920,
    quality: 80,
    recursive: false,
    concurrency: CONCURRENCY
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-w' || arg === '--width') {
      options.width = parseInt(args[++i], 10) || 1920;
    } else if (arg === '-q' || arg === '--quality') {
      options.quality = parseInt(args[++i], 10) || 80;
    } else if (arg === '-r' || arg === '--recursive') {
      options.recursive = true;
    } else if (arg === '--concurrency') {
      options.concurrency = parseInt(args[++i], 10) || CONCURRENCY;
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      options.input = arg;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Usage: node create-webp.mjs [options] [input]

Options:
  -w, --width <px>      Resize width (default: 1920)
  -q, --quality <num>   WebP quality 1-100 (default: 80)
  -r, --recursive      Process directories recursively
  --concurrency <num>  Parallel tasks (default: CPU cores)
  -h, --help          Show this help

Examples:
  node create-webp.mjs                          # Convert all default dirs
  node create-webp.mjs public/img/header.jpg    # Single file
  node create-webp.mjs -w 1280 public/img/      # Dir with custom width`);
}

async function processFile(filePath, options) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return false;

  const baseName = path.basename(filePath);
  if (baseName.includes('icons') || baseName === '5stars.png') return false;

  const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');

  if (fs.existsSync(webpPath)) {
    console.log(`  ⏭️  Skipping (exists): ${baseName}`);
    return false;
  }

  try {
    const pipeline = sharp(filePath);

    if (options.width > 0) {
      pipeline.resize(options.width, null, { withoutEnlargement: true });
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

async function processDir(dirPath, options, recursive = false) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return 0;
  }

  let converted = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const tasks = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory() && recursive) {
      tasks.push(processDir(fullPath, options, recursive));
    } else if (entry.isFile()) {
      tasks.push(processFile(fullPath, options));
    }
  }

  const results = await Promise.all(tasks);
  converted = results.reduce((sum, r) => sum + (r || 0), 0);

  return converted;
}

async function processFilesWithConcurrency(files, options) {
  let converted = 0;
  const queue = [...files];

  async function worker() {
    while (queue.length > 0) {
      const filePath = queue.shift();
      const done = await processFile(filePath, options);
      if (done) converted++;
    }
  }

  const workers = Array.from({ length: Math.min(options.concurrency, files.length) }, () => worker());
  await Promise.all(workers);
  return converted;
}

async function main() {
  const options = parseArgs();
  let totalConverted = 0;

  if (options.input) {
    const inputPath = options.input;

    if (fs.existsSync(inputPath)) {
      const stat = fs.statSync(inputPath);
      if (stat.isDirectory()) {
        console.log(`Processing directory: ${inputPath}`);
        totalConverted += await processDir(inputPath, options, options.recursive);
      } else {
        console.log(`Processing single file: ${inputPath}`);
        await processFile(inputPath, options);
        totalConverted++;
      }
    } else {
      console.error(`File not found: ${inputPath}`);
      process.exit(1);
    }
  } else {
    for (const imgDir of DEFAULT_IMG_DIRS) {
      if (!fs.existsSync(imgDir)) continue;

      const files = fs.readdirSync(imgDir);
      const imageFiles = [];

      for (const file of files) {
        const filePath = path.join(imgDir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          imageFiles.push(filePath);
        } else if (stat.isDirectory() && options.recursive) {
          totalConverted += await processDir(filePath, options, true);
        }
      }

      if (imageFiles.length > 0) {
        const converted = await processFilesWithConcurrency(imageFiles, options);
        console.log(`[${imgDir}] ${converted} files converted`);
        totalConverted += converted;
      }
    }
  }

  console.log(`\n✅ Total: ${totalConverted} WebP images created`);
}

main();
