/**
 * Downloads every Unsplash stock image listed in src/content/media.json into
 * public/images/stock/<key>.jpg so the site no longer depends on the CDN.
 * Afterwards set NEXT_PUBLIC_LOCAL_IMAGES=true in .env.local.
 *
 *   npm run images:localize
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const registry = JSON.parse(await readFile(path.join(root, "src/content/media.json"), "utf8"));
const outDir = path.join(root, "public/images/stock");
await mkdir(outDir, { recursive: true });

for (const [key, { id }] of Object.entries(registry.images)) {
  if (!id.startsWith("photo-")) continue; // already a local/client image
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`✗ ${key}: HTTP ${res.status}`);
    continue;
  }
  await writeFile(path.join(outDir, `${key}.jpg`), Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${key}`);
}
console.log("\nDone. Add NEXT_PUBLIC_LOCAL_IMAGES=true to .env.local and restart.");
