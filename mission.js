(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MuseumMission = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var DEFAULT_PROFILE = {
    name: '顾宁',
    relationship: 'partner',
    perspective: 'speaker',
    goal: 'care',
    moment: '周日晚饭前'
  };

  var RELATIONSHIPS = {
    partner: { label: '亲密关系', person: '伴侣', wing: '关系展厅' },
    colleague: { label: '工作关系', person: '同事', wing: '网络语境展厅' },
    'foreign-friend': { label: '跨文化关系', person: '异乡朋友', wing: '异乡生活展厅' },
    'fandom-friend': { label: '同好关系', person: '同好', wing: '同好暗号展厅' }
  };

  var PERSPECTIVES = {
    speaker: {
      label: '说出这句话的人',
      conflict: '你知道自己的善意，却看不见它抵达对方时变成了什么。',
      question: '如果不急着解释自己，你能先确认对方听见了什么吗？'
    },
    listener: {
      label: '听见这句话的人',
      conflict: '字面已经清楚，关系里的意图仍然没有被确认。',
      question: '你能把自己的理解说成一个问题，而不是一项结论吗？'
    },
    mediator: {
      label: '旁观调解的人',
      conflict: '两个人都在用自己的经验补全空白，却以为对方看见了同一幅画面。',
      question: '你能分别复述双方的版本，再找出没有被说出的那一层吗？'
    }
  };

  var GOALS = {
    care: {
      label: '确认关心',
      choice: '先回应字面，再说清关心，最后用一个可拒绝的问题确认。',
      nextSentence: '“我不是在追问结果，只是有点惦记你。你愿意告诉我今天过得怎么样吗？”',
      outcome: '让关心被听见，同时给对方留下选择是否继续说的空间。',
      reviewPrompt: '对方回应的是事实、感受，还是边界？据此决定下一次先问什么。'
    },
    boundary: {
      label: '保留边界',
      choice: '先确认对方是否愿意继续，再解释语境，不替对方命名感受。',
      nextSentence: '“如果你现在不想聊也可以；我想确认一下，这句话有没有让你不舒服？”',
      outcome: '让双方都能停下来，不必用沉默证明理解或用追问证明关心。',
      reviewPrompt: '记下哪一句让对方更放松；如果仍然沉默，就把选择权留到下次。'
    },
    repair: {
      label: '修复误读',
      choice: '承认刚才的误读，复述双方意思，再约定下次怎样确认。',
      nextSentence: '“我刚才把你的意思听窄了。你愿意告诉我，你真正想让我听见的是什么吗？”',
      outcome: '为一次误读留下重新开口的入口，让关系可以继续对话。',
      reviewPrompt: '等对话结束后，各自写下一句“下次我会这样问”，再比较是否更具体。'
    }
  };

  var ROUTES = {
    partner: {
      care: ['MIS-001', 'MIS-002', 'MIS-006'],
      boundary: ['MIS-006', 'MIS-005', 'MIS-002'],
      repair: ['MIS-002', 'MIS-001', 'MIS-005']
    },
    colleague: {
      care: ['MIS-004', 'MIS-011', 'MIS-005'],
      boundary: ['MIS-011', 'MIS-004', 'MIS-005'],
      repair: ['MIS-005', 'MIS-011', 'MIS-004']
    },
    'foreign-friend': {
      care: ['MIS-007', 'MIS-001', 'MIS-008'],
      boundary: ['MIS-008', 'MIS-004', 'MIS-006'],
      repair: ['MIS-001', 'MIS-008', 'MIS-007']
    },
    'fandom-friend': {
      care: ['MIS-003', 'MIS-009', 'MIS-010'],
      boundary: ['MIS-010', 'MIS-012', 'MIS-003'],
      repair: ['MIS-009', 'MIS-003', 'MIS-012']
    }
  };

  function oneLine(value, fallback, limit) {
    var text = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
    return (text || fallback).slice(0, limit || 40);
  }

  function validKey(value, source, fallback) {
    return typeof value === 'string' && Object.prototype.hasOwnProperty.call(source, value) ? value : fallback;
  }

  function normalizeProfile(input) {
    var value = input && typeof input === 'object' ? input : {};
    return {
      name: oneLine(value.name, DEFAULT_PROFILE.name, 20),
      relationship: validKey(value.relationship, RELATIONSHIPS, DEFAULT_PROFILE.relationship),
      perspective: validKey(value.perspective, PERSPECTIVES, DEFAULT_PROFILE.perspective),
      goal: validKey(value.goal, GOALS, DEFAULT_PROFILE.goal),
      moment: oneLine(value.moment, DEFAULT_PROFILE.moment, 30)
    };
  }

  function createVisitMission(input) {
    var profile = normalizeProfile(input);
    var relationship = RELATIONSHIPS[profile.relationship];
    var perspective = PERSPECTIVES[profile.perspective];
    var goal = GOALS[profile.goal];
    var recommendedIds = ROUTES[profile.relationship][profile.goal].slice();
    return {
      profile: profile,
      owner: profile.name,
      relationshipLabel: relationship.label,
      personLabel: relationship.person,
      perspectiveLabel: perspective.label,
      goalLabel: goal.label,
      recommendedWing: relationship.wing,
      recommendedIds: recommendedIds,
      conflict: perspective.conflict,
      choice: goal.choice,
      nextSentence: goal.nextSentence,
      outcome: goal.outcome,
      reviewPrompt: goal.reviewPrompt,
      observationQuestion: perspective.question,
      story: profile.name + '准备在' + profile.moment + '前，和' + relationship.person + '处理一次没有说清的对话。作为' + perspective.label + '，这次参观要帮你' + goal.label + '。'
    };
  }

  function buildVisitReceipt(input) {
    var value = input && typeof input === 'object' ? input : {};
    var mission = createVisitMission(value.profile);
    var visited = Array.isArray(value.visitedIds) ? value.visitedIds.filter(function (id) {
      return /^MIS-\d{3}$/.test(String(id));
    }) : [];
    var note = oneLine(value.note, '尚未记录；参观后补上一句真正想说的话。', 240);
    return [
      '# 误会博物馆参观回执',
      '',
      '- 参观者：' + mission.profile.name,
      '- 对话关系：' + mission.relationshipLabel + ' · ' + mission.personLabel,
      '- 我的视角：' + mission.perspectiveLabel,
      '- 希望做到：' + mission.goalLabel,
      '- 发生时刻：' + mission.profile.moment,
      '- 推荐路线：' + mission.recommendedIds.join(' → '),
      '- 已阅藏品：' + (visited.length ? visited.join('、') : '尚未开始'),
      '',
      '## 这次选择',
      mission.choice,
      '',
      '## 可以先说',
      mission.nextSentence,
      '',
      '## 我的记录',
      note,
      '',
      '## 期待结果',
      mission.outcome,
      '',
      '## 下次复盘',
      mission.reviewPrompt,
      ''
    ].join('\n');
  }

  return {
    DEFAULT_PROFILE: DEFAULT_PROFILE,
    RELATIONSHIPS: RELATIONSHIPS,
    PERSPECTIVES: PERSPECTIVES,
    GOALS: GOALS,
    normalizeProfile: normalizeProfile,
    createVisitMission: createVisitMission,
    buildVisitReceipt: buildVisitReceipt
  };
}));
