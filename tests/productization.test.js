'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('the first screen leads with the complete reconciliation outcome', () => {
  const html = read('index.html');

  assert.match(html, /class="hero-intro"[^>]*>[^<]*三条/);
  assert.match(html, /class="hero-intro"[^>]*>[^<]*确认/);
  assert.match(html, /class="hero-intro"[^>]*>[^<]*下载/);
  assert.match(html, /class="button button-primary" href="#route">/);
});

test('mobile primary navigation exposes the reconciliation task', () => {
  const html = read('index.html');
  const nav = html.match(/<nav class="mobile-nav"[\s\S]*?<\/nav>/);

  assert.ok(nav, 'mobile navigation is present');
  assert.match(nav[0], /href="#route"[\s\S]*?<small>我的方案<\/small>/);
  assert.doesNotMatch(nav[0], /href="#lab"/);
});

test('mobile exhibit comparison keeps a reliable touch target after rendering', () => {
  const css = read('styles.css');
  assert.match(css, /\.inspector-visual-switch button\s*\{[^}]*min-height:\s*46px;/);
});
