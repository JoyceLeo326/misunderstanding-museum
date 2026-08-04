import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const directoryFlag = process.argv.indexOf('--dir');
const target = directoryFlag >= 0 && process.argv[directoryFlag + 1]
  ? resolve(repository, process.argv[directoryFlag + 1])
  : repository;
const ignoredDirectories = new Set(['.git', 'node_modules', ...(target === repository ? ['dist'] : [])]);
const ignoredFile = resolve(repository, 'scripts/check-secrets.mjs');
const binaryExtensions = new Set([
  '.avif', '.docx', '.gif', '.gz', '.ico', '.jpeg', '.jpg', '.mov', '.mp3', '.mp4',
  '.numbers', '.pages', '.pdf', '.png', '.webm', '.webp', '.woff', '.woff2', '.zip'
]);
const detectors = [
  ['OpenAI-style credential', /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{24,}\b/g],
  ['Anthropic-style credential', /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g],
  ['GitHub token', /\bgh[opusr]_[A-Za-z0-9]{30,}\b/g],
  ['Google API credential', /\bAIza[0-9A-Za-z_-]{30,}\b/g],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/g],
  ['Private key block', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  ['Assigned secret value', /(?:api[_-]?key|access[_-]?token|client[_-]?secret)\s*[:=]\s*["'][A-Za-z0-9_./+=-]{20,}["']/gi]
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

const targetInfo = await stat(target);
if (!targetInfo.isDirectory()) throw new Error('Secret scan target must be a directory.');
const files = await walk(target);
const findings = [];

for (const file of files) {
  if (file === ignoredFile || binaryExtensions.has(extname(file).toLowerCase())) continue;
  const info = await stat(file);
  if (info.size > 2_000_000) continue;
  const content = await readFile(file, 'utf8');
  for (const [name, pattern] of detectors) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) findings.push(`${relative(target, file)}: ${name}`);
  }
}

if (findings.length) {
  console.error('Potential credentials detected (values suppressed):');
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exitCode = 1;
} else {
  console.log(`Secret scan passed for ${relative(repository, target) || 'repository source'}.`);
}
