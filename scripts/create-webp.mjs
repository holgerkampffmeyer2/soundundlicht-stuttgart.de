import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';
const imgDir = path.join(publicDir, 'img');

// Create WebP versions for faster loading
async function createWebP() {
  const files = fs.readdirSync(imgDir, { recursive: true });
  
  let converted = 0;

  for (const file of files) {
    if (typeof file !== 'string') continue;
    
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg') continue;
    
    // Skip small images
    if (file.includes('icons') || file === '5stars.png') continue;
    
    const filePath = path.join(imgDir, file);
    const webpPath = filePath.replace(/\.jpe?g$/i, '.webp');
    
    // Skip if WebP already exists
    if (fs.existsSync(webpPath)) continue;
    
    try {
      await sharp(filePath)
        .resize(1920, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      const originalSize = fs.statSync(filePath).size;
      const webpSize = fs.statSync(webpPath).size;
      const saved = ((1 - webpSize/originalSize) * 100).toFixed(1);
      
      console.log(`✓ ${file} → ${path.basename(webpPath)} (saved ${saved}%)`);
      converted++;
    } catch (err) {
      console.error(`Error: ${file}`, err.message);
    }
  }

  console.log(`\n✅ Created ${converted} WebP images`);
}

createWebP();
