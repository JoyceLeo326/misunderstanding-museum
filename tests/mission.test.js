'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const mission = require('../mission.js');

test('visitor attributes causally change the recommended exhibit route', () => {
  const partnerCare = mission.createVisitMission({
    name: '顾宁',
    relationship: 'partner',
    perspective: 'speaker',
    goal: 'care',
    moment: '周日晚饭前'
  });
  const colleagueBoundary = mission.createVisitMission({
    name: '周屿',
    relationship: 'colleague',
    perspective: 'listener',
    goal: 'boundary',
    moment: '明早复盘前'
  });

  assert.deepEqual(partnerCare.recommendedIds, ['MIS-001', 'MIS-002', 'MIS-006']);
  assert.deepEqual(colleagueBoundary.recommendedIds, ['MIS-011', 'MIS-004', 'MIS-005']);
  assert.notEqual(partnerCare.conflict, colleagueBoundary.conflict);
  assert.notEqual(partnerCare.choice, colleagueBoundary.choice);
  assert.match(partnerCare.story, /顾宁/);
  assert.match(partnerCare.story, /周日晚饭前/);
});

test('each goal changes the route, action and review loop', () => {
  const base = { name: '顾宁', relationship: 'partner', perspective: 'mediator', moment: '今晚见面前' };
  const care = mission.createVisitMission({ ...base, goal: 'care' });
  const boundary = mission.createVisitMission({ ...base, goal: 'boundary' });
  const repair = mission.createVisitMission({ ...base, goal: 'repair' });

  assert.equal(new Set([care.recommendedIds[0], boundary.recommendedIds[0], repair.recommendedIds[0]]).size, 3);
  assert.notEqual(care.nextSentence, boundary.nextSentence);
  assert.notEqual(boundary.reviewPrompt, repair.reviewPrompt);
  assert.match(repair.outcome, /重新开口|继续对话/);
});

test('visit receipt preserves the person, route, result and next review action', () => {
  const profile = {
    name: '顾宁',
    relationship: 'partner',
    perspective: 'speaker',
    goal: 'care',
    moment: '周日晚饭前'
  };
  const plan = mission.createVisitMission(profile);
  const receipt = mission.buildVisitReceipt({
    profile,
    visitedIds: ['MIS-001', 'MIS-002'],
    note: '先问对方愿不愿意聊，再说明自己的关心。'
  });

  assert.match(receipt, /# 误会博物馆参观回执/);
  assert.match(receipt, /顾宁/);
  assert.match(receipt, /周日晚饭前/);
  assert.match(receipt, /MIS-001/);
  assert.match(receipt, new RegExp(plan.choice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(receipt, /先问对方愿不愿意聊/);
  assert.match(receipt, /复盘/);
});

test('invalid profile values fall back to safe, complete defaults', () => {
  const result = mission.createVisitMission({ relationship: 'unknown', perspective: '', goal: null });

  assert.equal(result.profile.name, '顾宁');
  assert.equal(result.profile.relationship, 'partner');
  assert.equal(result.profile.perspective, 'speaker');
  assert.equal(result.profile.goal, 'care');
  assert.equal(result.recommendedIds.length, 3);
});
