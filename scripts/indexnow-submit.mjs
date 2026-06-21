#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const urlListPath = path.join(__dirname, '../public/urllist.txt');
const keyFilePath = path.join(__dirname, '../public/4bfc0fd67acc4ae197ac3535aeba6450.txt');

// Read the key from the verification file
let apiKey;
try {
  apiKey = fs.readFileSync(keyFilePath, 'utf-8').trim();
  if (!apiKey) {
    throw new Error('API key is empty');
  }
} catch (error) {
  console.error('❌ Error reading API key from', keyFilePath);
  console.error(error.message);
  process.exit(1);
}

// Read URLs from urllist.txt
let urls;
try {
  const content = fs.readFileSync(urlListPath, 'utf-8');
  urls = content
    .split('\n')
    .map(line => {
      // Handle both formats: "1: https://..." and "https://..."
      const url = line.includes(': ') ? line.split(': ')[1] : line;
      return url ? url.trim() : '';
    })
    .filter(url => url && url.startsWith('https://'));
} catch (error) {
  console.error('❌ Error reading URLs from', urlListPath);
  console.error(error.message);
  process.exit(1);
}

if (!urls.length) {
  console.error('❌ No URLs found in', urlListPath);
  process.exit(1);
}

const payload = {
  host: 'soundundlicht-stuttgart.de',
  key: apiKey,
  keyLocation: 'https://soundundlicht-stuttgart.de/4bfc0fd67acc4ae197ac3535aeba6450.txt',
  urlList: urls
};

// Send the request
const apiUrl = 'https://api.indexnow.org/indexnow';

console.log(`📤 Sending ${urls.length} URLs to IndexNow API (relay to Bing, Yandex, Naver, Seznam, Yep)...`);

try {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    console.log('✅ IndexNow request sent successfully!');
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    console.log(`📝 URLs submitted: ${urls.length}`);
    console.log(`\n📋 Submitted URLs:`);
    urls.forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });
  } else {
    const text = await response.text();
    console.error(`❌ IndexNow API returned status ${response.status}`);
    console.error('Response:', text);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error sending IndexNow request:');
  console.error(error.message);
  process.exit(1);
}
