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

test('perspective, goal and feedback reorder genuinely different candidate strategies', () => {
  const speakerCare = mission.createVisitMission({
    relationship: 'partner', perspective: 'speaker', goal: 'care', feedback: 'none'
  });
  const listenerCare = mission.createVisitMission({
    relationship: 'partner', perspective: 'listener', goal: 'care', feedback: 'none'
  });
  const pressured = mission.createVisitMission({
    relationship: 'partner', perspective: 'speaker', goal: 'care', feedback: 'pressured'
  });

  assert.deepEqual(speakerCare.strategies.map((item) => item.id), ['clarify', 'mirror', 'space']);
  assert.deepEqual(listenerCare.strategies.map((item) => item.id), ['mirror', 'space', 'clarify']);
  assert.deepEqual(pressured.strategies.map((item) => item.id), ['space', 'mirror', 'clarify']);
  assert.equal(new Set(speakerCare.strategies.map((item) => item.tradeoff)).size, 3);
  assert.notEqual(speakerCare.perspectives.shared, listenerCare.perspectives.shared);
});

test('reconciliation archive preserves event, perspectives, human choice, tradeoff and next round', () => {
  const archive = mission.buildReconciliationArchive({
    profile: {
      name: '顾宁',
      relationship: 'partner',
      perspective: 'listener',
      goal: 'repair',
      feedback: 'unclear',
      moment: '今晚九点',
      eventLine: '我听见“你先忙吧”后结束了通话，对方沉默了很久。'
    },
    candidateId: 'mirror',
    confirmedAt: '2026/8/7 21:00:00',
    visitedIds: ['MIS-002'],
    note: '对方说先复述让她感觉终于被听见。'
  });

  assert.match(archive, /沟通与和解档案/);
  assert.match(archive, /我听见“你先忙吧”/);
  assert.match(archive, /三种视角/);
  assert.match(archive, /双向复述/);
  assert.match(archive, /需要承担的取舍/);
  assert.match(archive, /2026\/8\/7 21:00:00/);
  assert.match(archive, /下一轮依据/);
  assert.match(archive, /MIS-002/);
});
