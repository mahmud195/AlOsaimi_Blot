// In-place image compression: resize to sensible max dimensions, re-encode JPG/PNG.
// Keeps original file extensions so Vite glob imports keep working.
// Run: node scripts/compress-images.mjs

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = path.resolve('src/assets');
const MIN_BYTES = 100 * 1024; // only touch files > 100KB
const MAX_WIDTH = 1920;       // hero/banner max
const MAX_WIDTH_SMALL = 1280; // anything inside modals/cards

const smallHints = ['/Pics For Website_Our Services/', '/picutres for section project/', '/AlOsaimi_Clients/', '/AlOsaimi_Certificates/', '/Logos/'];

function pickMaxWidth(p) {
  return smallHints.some(h => p.replaceAll('\\', '/').includes(h)) ? MAX_WIDTH_SMALL : MAX_WIDTH;
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const isJpg = ext === '.jpg' || ext === '.jpeg';
  const isPng = ext === '.png';
  if (!isJpg && !isPng) return null;

  const stat = await fs.stat(file);
  if (stat.size < MIN_BYTES) return null;

  // Read into buffer first — avoids Windows file-lock issues from cloud-synced folders
  const inputBuf = await fs.readFile(file);
  const img = sharp(inputBuf, { failOn: 'none' });
  const meta = await img.metadata();
  const maxW = pickMaxWidth(file);
  const pipeline = img.rotate();
  if (meta.width && meta.width > maxW) pipeline.resize({ width: maxW, withoutEnlargement: true });

  const buf = isJpg
    ? await pipeline.jpeg({ quality: 78, mozjpeg: true }).toBuffer()
    : await pipeline.png({ compressionLevel: 9, palette: true, quality: 80 }).toBuffer();

  if (buf.length >= stat.size) return { file, before: stat.size, after: stat.size, skipped: true };
  await fs.writeFile(file, buf);
  return { file, before: stat.size, after: buf.length, skipped: false };
}

const results = [];
for await (const f of walk(ROOT)) {
  try {
    const r = await processFile(f);
    if (r && !r.skipped) results.push(r);
  } catch (e) {
    console.warn('skip', f, e.message);
  }
}

const totalBefore = results.reduce((s, r) => s + r.before, 0);
const totalAfter = results.reduce((s, r) => s + r.after, 0);
console.log(`Compressed ${results.length} files`);
console.log(`Saved: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB`);
console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB  After: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
for (const r of results.sort((a, b) => (b.before - b.after) - (a.before - a.after)).slice(0, 15)) {
  console.log(`  ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB  ${path.relative('.', r.file)}`);
}
