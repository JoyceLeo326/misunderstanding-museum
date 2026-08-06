'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const visual = require('../visual-core.js');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('twelve exhibits form twenty-four unique before-and-context story scenes', () => {
  const ids = Object.keys(visual.EXHIBIT_VISUALS);
  assert.equal(ids.length, 12);

  const assets = ids.flatMap((id) => {
    const pair = visual.EXHIBIT_VISUALS[id];
    assert.match(id, /^MIS-\d{3}$/);
    assert.equal(pair.misread.phase, 'misread');
    assert.equal(pair.context.phase, 'context');
    assert.ok(pair.misread.alt.length >= 24);
    assert.ok(pair.context.alt.length >= 24);
    assert.ok(pair.misread.caption.length >= 12);
    assert.ok(pair.context.caption.length >= 12);
    return [pair.misread.asset, pair.context.asset];
  });

  assert.equal(assets.length, 24);
  assert.equal(new Set(assets).size, 24);
});

test('every story asset is a compact self-hosted WebP file', () => {
  const assets = Object.values(visual.EXHIBIT_VISUALS).flatMap((pair) => [pair.misread.asset, pair.context.asset]);
  assets.forEach((asset) => {
    assert.match(asset, /^assets\/story\/mis-\d{3}-(?:misread|context)\.webp$/);
    const absolute = path.join(root, asset);
    assert.ok(fs.existsSync(absolute), `missing ${asset}`);
    assert.ok(fs.statSync(absolute).size < 300 * 1024, `${asset} exceeds 300 KiB`);
  });
});

test('brand, visual comparison and reflection controls are wired into the product', () => {
  const html = read('index.html');
  const sw = read('sw.js');
  const build = read('scripts/build-static.mjs');

  assert.match(html, /assets\/brand\/museum-mark\.svg/);
  assert.match(html, /visual-core\.js/);
  assert.match(html, /data-lens-scene/);
  assert.match(html, /data-inspector-scene/);
  assert.match(html, /name="feedback"/);
  assert.match(sw, /visual-core\.js/);
  assert.match(build, /visual-core\.js/);
});
