import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const html = await readFile(resolve(root, "index.html"), "utf8");
await writeFile(resolve(output, "index.html"), html);
await cp(resolve(root, "assets"), resolve(output, "assets"), { recursive: true });

console.log("Built iOS web bundle in dist/");
