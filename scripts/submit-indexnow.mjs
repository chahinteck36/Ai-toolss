/**
 * IndexNow URL Submission Script for adawatai.online
 * 
 * Safely submits URLs to the IndexNow API (Bing, Yandex, etc.) from the server side,
 * keeping keys and submission logic completely out of client-side bundles.
 * 
 * Usage:
 *   node scripts/submit-indexnow.mjs
 * Or with custom key via environment variable:
 *   INDEXNOW_KEY=your_key node scripts/submit-indexnow.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HOST = 'adawatai.online';
const BASE_URL = `https://${HOST}`;
const KEY_FILE = 'adawatai-indexnow-key.txt';

// Read key from environment variable or key file
let indexNowKey = process.env.INDEXNOW_KEY;
if (!indexNowKey) {
  const keyFilePath = path.join(rootDir, 'public', KEY_FILE);
  if (fs.existsSync(keyFilePath)) {
    indexNowKey = fs.readFileSync(keyFilePath, 'utf8').trim();
  }
}

if (!indexNowKey) {
  console.error('Error: No IndexNow key found. Provide INDEXNOW_KEY env var or create public/' + KEY_FILE);
  process.exit(1);
}

// Extract URLs from public/sitemap.xml if available
function getUrlsFromSitemap() {
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    return [`${BASE_URL}/`];
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)];
  return locMatches.map(m => m[1]);
}

async function submitToIndexNow() {
  const urls = getUrlsFromSitemap();
  console.log(`Submitting ${urls.length} URLs to IndexNow for host: ${HOST}...`);

  const payload = {
    host: HOST,
    key: indexNowKey,
    keyLocation: `${BASE_URL}/${KEY_FILE}`,
    urlList: urls.slice(0, 1000) // IndexNow allows up to 10,000 URLs per request
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`IndexNow Submission Successful! Status: ${response.status}`);
    } else {
      const text = await response.text();
      console.warn(`IndexNow returned status ${response.status}: ${text}`);
    }
  } catch (err) {
    console.error('Failed to communicate with IndexNow API:', err.message);
  }
}

submitToIndexNow();
