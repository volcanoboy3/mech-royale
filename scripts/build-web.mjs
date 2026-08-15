import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const html = await readFile(resolve(root, "index.html"), "utf8");
await writeFile(resolve(output, "index.html"), html);

// Package only assets the game actually references. Source generations, raw
// alternates, and progress logs stay in the workspace instead of bloating iOS.
const assetPattern = /assets\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|gif|svg|mp3|wav|ogg)/gi;
const assetRefs = [...new Set([...html.matchAll(assetPattern)].map(match => match[0]))].sort();
for (const assetRef of assetRefs) {
  if (assetRef.includes("..")) throw new Error(`Unsafe asset path: ${assetRef}`);
  const destination = resolve(output, assetRef);
  await mkdir(dirname(destination), { recursive: true });
  await cp(resolve(root, assetRef), destination);
}

console.log(`Built iOS web bundle in dist/ with ${assetRefs.length} runtime assets.`);
