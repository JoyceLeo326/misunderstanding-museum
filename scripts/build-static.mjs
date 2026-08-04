import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const files = [
  'index.html',
  'styles.css',
  'mission.js',
  'script.js',
  'manifest.webmanifest',
  'sw.js',
  '.nojekyll'
];
const directories = ['assets', 'docs'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of files) {
  const source = join(root, file);
  await stat(source);
  await cp(source, join(output, file));
}

for (const directory of directories) {
  const source = join(root, directory);
  await stat(source);
  await cp(source, join(output, directory), { recursive: true });
}

console.log(`Static site built with ${files.length} core files and ${directories.length} asset directories.`);
