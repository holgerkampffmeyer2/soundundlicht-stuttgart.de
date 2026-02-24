import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';
const imgDir = path.join(publicDir, 'img');

// Optimize all JPG images
async function optimizeImages() {
  const files = fs.readdirSync(imgDir, { recursive: true });
  
  let optimized = 0;
  let totalSaved = 0;

  for (const file of files) {
    if (typeof file !== 'string') continue;
    
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') continue;
    
    const filePath = path.join(imgDir, file);
    const stat = fs.statSync(filePath);
    const originalSize = stat.size;
    
    try {
      // Determine max width based on directory
      let maxWidth = 1920; // default for main images
      
      if (file.includes('vermietung')) {
        maxWidth = 1200; // product images
      } else if (file.includes('videos') || file === 'header.jpg') {
        maxWidth = 1920;
      } else if (file.includes('icons') || file === '5stars.png' || file === 'favicon.ico') {
        maxWidth = 100; // small icons
      }
      
      const image = sharp(filePath);
      const metadata = await image.metadata();
      
      // Skip if already smaller
      if (metadata.width && metadata.width <= maxWidth) {
        console.log(`Skipping ${file} (already optimized: ${metadata.width}px)`);
        continue;
      }

      // Optimize
      let optimizedImage;
      if (ext === '.png') {
        optimizedImage = image.png({ quality: 80, compressionLevel: 9 });
      } else {
        optimizedImage = image.jpeg({ quality: 80, mozjpeg: true });
      }
      
      if (metadata.width && metadata.width > maxWidth) {
        optimizedImage = optimizedImage.resize(maxWidth, null, { withoutEnlargement: true });
      }
      
      const buffer = await optimizedImage.toBuffer();
      fs.writeFileSync(filePath, buffer);
      
      const newSize = buffer.length;
      const saved = originalSize - newSize;
      const percent = ((saved / originalSize) * 100).toFixed(1);
      
      console.log(`✓ ${file}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (saved ${percent}%)`);
      
      optimized++;
      totalSaved += saved;
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  console.log(`\n✅ Optimized ${optimized} images. Total saved: ${(totalSaved/1024).toFixed(1)}KB`);
}

optimizeImages();
