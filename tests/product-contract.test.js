'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('the visit mission is usable before the collection and has causal inputs', () => {
  const html = read('index.html');
  assert.match(html, /data-visitor-mission/);
  assert.match(html, /name="relationship"/);
  assert.match(html, /name="perspective"/);
  assert.match(html, /name="goal"/);
  assert.match(html, /data-personal-route/);
  assert.match(html, /data-next-sentence/);
  assert.match(html, /name="feedback"/);
  assert.match(html, /name="eventLine"/);
  assert.match(html, /data-reconciliation-studio/);
  assert.match(html, /data-perspective-speaker/);
  assert.match(html, /data-strategy-candidates/);
  assert.match(html, /data-confirm-strategy/);
});

test('the result can be saved and exported without an account or backend', () => {
  const html = read('index.html');
  const script = read('script.js');
  assert.match(html, /data-save-reflection/);
  assert.match(html, /data-download-receipt/);
  assert.match(html, /data-download-archive/);
  assert.match(html, /data-download-card/);
  assert.match(script, /localStorage/);
  assert.match(script, /URL\.createObjectURL/);
  assert.match(script, /buildReconciliationArchive/);
  assert.doesNotMatch(script, /fetch\s*\(.*api/i);
});

test('runtime remains local-first and dependencies are self-hosted', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /https?:\/\/(?:fonts\.|cdn\.|unpkg|jsdelivr)/i);
  assert.match(html, /mission\.js/);
  assert.match(read('sw.js'), /mission\.js/);
});

test('repository ignores secret-bearing env files while allowing a template', () => {
  const ignore = read('.gitignore');
  assert.match(ignore, /^\.env\*$/m);
  assert.match(ignore, /^!\.env\.example$/m);
});

test('publish workflow verifies source and generated artifacts before deploy', () => {
  const packageJson = JSON.parse(read('package.json'));
  const workflow = read('.github/workflows/ci.yml');
  assert.ok(packageJson.scripts.build);
  assert.ok(packageJson.scripts['security:secrets']);
  assert.match(workflow, /npm run security:secrets/);
  assert.match(workflow, /--dir dist/);
  assert.match(workflow, /deploy-pages/);
});

test('Vercel serves the same verified static artifact as GitHub Pages', () => {
  const config = JSON.parse(read('vercel.json'));
  assert.equal(config.outputDirectory, 'dist');
});
