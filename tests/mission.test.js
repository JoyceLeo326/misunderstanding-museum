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

test('a real conversation reflection changes the next visit route and next sentence', () => {
  const base = {
    name: '顾宁',
    relationship: 'partner',
    perspective: 'speaker',
    goal: 'care',
    moment: '周日晚饭前'
  };
  const firstVisit = mission.createVisitMission(base);
  const feltPressured = mission.createVisitMission({ ...base, feedback: 'pressured' });
  const stillUnclear = mission.createVisitMission({ ...base, feedback: 'unclear' });

  assert.equal(firstVisit.recommendedIds[0], 'MIS-001');
  assert.equal(feltPressured.recommendedIds[0], 'MIS-006');
  assert.equal(stillUnclear.recommendedIds[0], 'MIS-002');
  assert.notEqual(firstVisit.nextSentence, feltPressured.nextSentence);
  assert.notEqual(feltPressured.nextSentence, stillUnclear.nextSentence);
  assert.match(feltPressured.feedbackSummary, /边界|空间/);
  assert.match(stillUnclear.feedbackSummary, /确认|理解/);
});

test('visit receipt includes the feedback that shaped the next round', () => {
  const receipt = mission.buildVisitReceipt({
    profile: {
      name: '顾宁',
      relationship: 'partner',
      perspective: 'speaker',
      goal: 'care',
      feedback: 'pressured',
      moment: '周日晚饭前'
    },
    visitedIds: ['MIS-001'],
    note: '下次先问是否愿意继续。'
  });

  assert.match(receipt, /对话反馈/);
  assert.match(receipt, /需要更多空间/);
  assert.match(receipt, /MIS-006/);
});
