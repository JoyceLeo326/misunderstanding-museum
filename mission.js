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
    feedback: 'none',
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

  var FEEDBACKS = {
    none: {
      label: '还没带进真实对话',
      summary: '先按这次关系与目标出发；回来后再用真实回应调整下一轮。'
    },
    understood: {
      label: '对方更理解我的意思',
      summary: '这次确认已经起作用；下一轮可以练习更细的偏好与关系暗号。',
      priority: { partner: 'MIS-005', colleague: 'MIS-004', 'foreign-friend': 'MIS-007', 'fandom-friend': 'MIS-009' },
      choice: '保留这次有效的确认方式，再把一句模糊表达改成双方都能选择的具体问题。',
      nextSentence: '“谢谢你告诉我你听见了什么。下次再遇到类似的话，我们也先确认它在当下是什么意思，好吗？”',
      outcome: '把一次偶然说清，变成两个人下次还能使用的沟通方法。',
      reviewPrompt: '记下这次真正起作用的那一句，并观察它在另一个场景里是否仍然有效。'
    },
    unclear: {
      label: '我们还是没说清',
      summary: '上一轮仍有两种理解；下一轮先核对彼此听见的版本。',
      priority: { partner: 'MIS-002', colleague: 'MIS-004', 'foreign-friend': 'MIS-008', 'fandom-friend': 'MIS-003' },
      choice: '暂停继续解释，先请双方各用一句话复述自己听见的意思，再指出差异。',
      nextSentence: '“我发现我们可能听见了两个版本。你先说说你刚才理解成了什么，我再说我的，好吗？”',
      outcome: '让分歧从情绪里的猜测，变成可以一起查看的两个具体版本。',
      reviewPrompt: '复盘时只记录“我们分别听见了什么”，暂时不判断谁的版本更正确。'
    },
    pressured: {
      label: '对方需要更多空间',
      summary: '上一轮的关心带来了压力；下一轮先确认边界与可拒绝的空间。',
      priority: { partner: 'MIS-006', colleague: 'MIS-011', 'foreign-friend': 'MIS-008', 'fandom-friend': 'MIS-012' },
      choice: '先停下追问，把是否继续、何时继续和怎样继续的选择权明确交还给对方。',
      nextSentence: '“我先停在这里。你希望我陪着、晚一点再问，还是这次先不聊？都可以。”',
      outcome: '让关心不再以压力抵达，也让对方能够清楚选择需要的距离。',
      reviewPrompt: '观察哪一种停顿让身体和语气真正放松；下一轮从那个距离开始。'
    },
    concrete: {
      label: '下一句需要更具体',
      summary: '上一轮意图已经出现，但行动仍然模糊；下一轮把选项、时间或期待说具体。',
      priority: { partner: 'MIS-005', colleague: 'MIS-011', 'foreign-friend': 'MIS-008', 'fandom-friend': 'MIS-012' },
      choice: '保留原来的善意，同时补上两个有限选项、一个时间点或一个可以拒绝的行动。',
      nextSentence: '“我想把这件事说具体一点：你更希望我们现在聊十分钟，还是明晚再约一个时间？”',
      outcome: '让善意变成可执行、可选择也可拒绝的下一步。',
      reviewPrompt: '检查下一句是否包含明确行动与选择；如果仍需猜测，再缩小一次范围。'
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
      feedback: validKey(value.feedback, FEEDBACKS, DEFAULT_PROFILE.feedback),
      moment: oneLine(value.moment, DEFAULT_PROFILE.moment, 30)
    };
  }

  function applyFeedback(baseIds, relationshipKey, feedback) {
    var priority = feedback.priority && feedback.priority[relationshipKey];
    if (!priority) return baseIds.slice();
    return [priority].concat(baseIds.filter(function (id) { return id !== priority; })).slice(0, 3);
  }

  function createVisitMission(input) {
    var profile = normalizeProfile(input);
    var relationship = RELATIONSHIPS[profile.relationship];
    var perspective = PERSPECTIVES[profile.perspective];
    var goal = GOALS[profile.goal];
    var feedback = FEEDBACKS[profile.feedback];
    var recommendedIds = applyFeedback(ROUTES[profile.relationship][profile.goal], profile.relationship, feedback);
    return {
      profile: profile,
      owner: profile.name,
      relationshipLabel: relationship.label,
      personLabel: relationship.person,
      perspectiveLabel: perspective.label,
      goalLabel: goal.label,
      feedbackLabel: feedback.label,
      feedbackSummary: feedback.summary,
      recommendedWing: relationship.wing,
      recommendedIds: recommendedIds,
      conflict: perspective.conflict,
      choice: feedback.choice || goal.choice,
      nextSentence: feedback.nextSentence || goal.nextSentence,
      outcome: feedback.outcome || goal.outcome,
      reviewPrompt: feedback.reviewPrompt || goal.reviewPrompt,
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
      '- 对话反馈：' + mission.feedbackLabel,
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
    FEEDBACKS: FEEDBACKS,
    normalizeProfile: normalizeProfile,
    createVisitMission: createVisitMission,
    buildVisitReceipt: buildVisitReceipt
  };
}));
