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
    moment: '周日晚饭前',
    eventLine: '我问“吃了吗？”，对方只回答了晚饭，我们都不知道下一句怎么接。'
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

  var STRATEGIES = {
    clarify: {
      title: '把没有说出的意图补完整',
      label: '直接澄清',
      fit: '适合双方仍愿意继续、但字面遮住了真正意图的时刻。',
      tradeoff: '更快抵达重点，也可能让对方感到你急着证明自己。',
      phase: 'context'
    },
    mirror: {
      title: '先并排复述双方听见的版本',
      label: '双向复述',
      fit: '适合双方都确信自己听懂了，却说的是两个版本的时刻。',
      tradeoff: '更慢，但能减少辩解；需要先忍住判断谁对谁错。',
      phase: 'misread'
    },
    space: {
      title: '把是否继续的选择交还给对方',
      label: '留出边界',
      fit: '适合情绪升高、回应变短，或对方已经表现出压力的时刻。',
      tradeoff: '保护关系安全，也意味着这次不一定立刻得到答案。',
      phase: 'context'
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
      moment: oneLine(value.moment, DEFAULT_PROFILE.moment, 30),
      eventLine: oneLine(value.eventLine, DEFAULT_PROFILE.eventLine, 180)
    };
  }

  function applyFeedback(baseIds, relationshipKey, feedback) {
    var priority = feedback.priority && feedback.priority[relationshipKey];
    if (!priority) return baseIds.slice();
    return [priority].concat(baseIds.filter(function (id) { return id !== priority; })).slice(0, 3);
  }

  function strategyOrder(profile) {
    if (profile.feedback === 'pressured' || profile.goal === 'boundary') return ['space', 'mirror', 'clarify'];
    if (profile.feedback === 'unclear' || profile.goal === 'repair' || profile.perspective === 'mediator') return ['mirror', 'clarify', 'space'];
    if (profile.perspective === 'listener') return ['mirror', 'space', 'clarify'];
    return ['clarify', 'mirror', 'space'];
  }

  function strategySentence(id, mission) {
    if (id === 'mirror') {
      return '“我先不判断谁理解错了。你听见的是哪一句？我再说说我原本想表达的，我们一起看看差在哪里。”';
    }
    if (id === 'space') {
      return '“我想把这件事说清，但不需要现在完成。你愿意继续、晚一点再聊，还是这次先停在这里？”';
    }
    return mission.nextSentence;
  }

  function buildStrategies(mission) {
    return strategyOrder(mission.profile).map(function (id, index) {
      var strategy = STRATEGIES[id];
      return {
        id: id,
        title: strategy.title,
        label: strategy.label,
        fit: strategy.fit,
        tradeoff: strategy.tradeoff,
        sentence: strategySentence(id, mission),
        exhibitId: mission.recommendedIds[index],
        phase: strategy.phase
      };
    });
  }

  function sameList(left, right) {
    return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every(function (value, index) { return value === right[index]; });
  }

  function diffMissions(previousInput, nextInput) {
    var previous = createVisitMission(previousInput);
    var next = createVisitMission(nextInput);
    var changes = [];
    if (previous.profile.name !== next.profile.name) changes.push('档案称呼从“' + previous.profile.name + '”改为“' + next.profile.name + '”');
    if (previous.profile.moment !== next.profile.moment) changes.push('准备开口的时机从“' + previous.profile.moment + '”改为“' + next.profile.moment + '”');
    if (previous.relationshipLabel !== next.relationshipLabel) changes.push('关系从“' + previous.relationshipLabel + '”改为“' + next.relationshipLabel + '”');
    if (previous.perspectiveLabel !== next.perspectiveLabel) changes.push('观察位置从“' + previous.perspectiveLabel + '”改为“' + next.perspectiveLabel + '”');
    if (previous.goalLabel !== next.goalLabel) changes.push('对话目标从“' + previous.goalLabel + '”改为“' + next.goalLabel + '”');
    if (previous.profile.eventLine !== next.profile.eventLine) changes.push('事件底稿已经改写');
    if (previous.feedbackLabel !== next.feedbackLabel) changes.push('真实回应从“' + previous.feedbackLabel + '”更新为“' + next.feedbackLabel + '”');
    if (!sameList(previous.recommendedIds, next.recommendedIds)) changes.push('优先馆藏从 ' + previous.recommendedIds.join(' → ') + ' 调整为 ' + next.recommendedIds.join(' → '));
    if (previous.nextSentence !== next.nextSentence) changes.push('建议的下一句话已经改写');
    if (previous.reviewPrompt !== next.reviewPrompt) changes.push('复盘问题已经改写');
    if (!sameList(previous.strategies.map(function (item) { return item.id; }), next.strategies.map(function (item) { return item.id; }))) changes.push('三条候选路径的优先顺序已经调整');
    if (!sameList(previous.strategies.map(function (item) { return item.exhibitId + ':' + item.phase; }), next.strategies.map(function (item) { return item.exhibitId + ':' + item.phase; }))) changes.push('候选路径对应的故事证据图已经调整');
    return changes;
  }

  function createVisitMission(input) {
    var profile = normalizeProfile(input);
    var relationship = RELATIONSHIPS[profile.relationship];
    var perspective = PERSPECTIVES[profile.perspective];
    var goal = GOALS[profile.goal];
    var feedback = FEEDBACKS[profile.feedback];
    var recommendedIds = applyFeedback(ROUTES[profile.relationship][profile.goal], profile.relationship, feedback);
    var mission = {
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
      story: profile.name + '准备在' + profile.moment + '，和' + relationship.person + '处理一次没有说清的对话。作为' + perspective.label + '，这次参观要帮你' + goal.label + '。',
      perspectives: {
        speaker: '表达者可能想让对方听见“' + goal.label + '”，但善意没有自动成为共同语境。',
        listener: '接收者只能从这段可确认的事件推断：' + profile.eventLine + ' 当下的短回应不等于已经理解。',
        shared: perspective.question
      }
    };
    mission.strategies = buildStrategies(mission);
    return mission;
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
      '- 事件记录：' + mission.profile.eventLine,
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

  function buildReconciliationArchive(input) {
    var value = input && typeof input === 'object' ? input : {};
    var mission = createVisitMission(value.profile);
    var selected = mission.strategies.filter(function (strategy) { return strategy.id === value.candidateId; })[0] || mission.strategies[0];
    var visited = Array.isArray(value.visitedIds) ? value.visitedIds.filter(function (id) {
      return /^MIS-\d{3}$/.test(String(id));
    }) : [];
    var note = oneLine(value.note, '尚未记录真实回应；对话后再回来补充。', 240);
    var confirmedAt = oneLine(value.confirmedAt, '本次会话内已由使用者确认', 40);
    var rawHistory = Array.isArray(value.history) ? value.history.slice(-8) : [];
    var decisions = rawHistory.map(function (entry, index) {
      var entryValue = entry && typeof entry === 'object' ? entry : {};
      var entryMission = createVisitMission(entryValue.profile);
      var entryCandidate = entryMission.strategies.filter(function (strategy) { return strategy.id === entryValue.candidateId; })[0] || entryMission.strategies[0];
      return {
        version: index + 1,
        mission: entryMission,
        candidate: entryCandidate,
        confirmedAt: oneLine(entryValue.confirmedAt, '已确认', 40)
      };
    });
    if (!decisions.length || decisions[decisions.length - 1].candidate.id !== selected.id || JSON.stringify(decisions[decisions.length - 1].mission.profile) !== JSON.stringify(mission.profile)) {
      decisions.push({ version: decisions.length + 1, mission: mission, candidate: selected, confirmedAt: confirmedAt });
    }
    var historyLines = [];
    decisions.forEach(function (decision, index) {
      historyLines.push('### V' + String(decision.version) + ' · ' + decision.candidate.label);
      historyLines.push('- 确认时间：' + decision.confirmedAt);
      historyLines.push('- 真实回应：' + decision.mission.feedbackLabel);
      historyLines.push('- 已确认方案：' + decision.candidate.title);
      historyLines.push('- 下一句话：' + decision.candidate.sentence);
      historyLines.push('- 取舍：' + decision.candidate.tradeoff);
      if (index > 0) {
        var differences = diffMissions(decisions[index - 1].mission.profile, decision.mission.profile);
        if (decisions[index - 1].candidate.id !== decision.candidate.id) differences.push('人工选择从“' + decisions[index - 1].candidate.label + '”改为“' + decision.candidate.label + '”');
        historyLines.push('- 相比 V' + String(index) + '：' + (differences.length ? differences.join('；') : '输入与方案没有结构性变化'));
      }
      historyLines.push('');
    });
    return [
      '# 误会博物馆｜沟通与和解档案',
      '',
      '## 事件底稿',
      '- 记录者：' + mission.profile.name,
      '- 关系：' + mission.relationshipLabel + ' · ' + mission.personLabel,
      '- 所在视角：' + mission.perspectiveLabel,
      '- 准备开口：' + mission.profile.moment,
      '- 当时发生：' + mission.profile.eventLine,
      '',
      '## 三种视角',
      '- 表达者：' + mission.perspectives.speaker,
      '- 接收者：' + mission.perspectives.listener,
      '- 共同确认：' + mission.perspectives.shared,
      '',
      '## 候选方案与人的确认',
      '- 已确认方案：' + selected.label + ' · ' + selected.title,
      '- 适用时刻：' + selected.fit,
      '- 需要承担的取舍：' + selected.tradeoff,
      '- 确认记录：' + confirmedAt,
      '',
      '## 准备说出的下一句',
      selected.sentence,
      '',
      '## 决策版本',
      historyLines.join('\n'),
      '## 参观依据',
      '- 推荐馆藏：' + mission.recommendedIds.join(' → '),
      '- 已阅馆藏：' + (visited.length ? visited.join('、') : '尚未开始'),
      '',
      '## 真实回应与下一轮',
      '- 本轮反馈：' + mission.feedbackLabel,
      '- 下一轮依据：' + mission.feedbackSummary,
      '- 我的记录：' + note,
      '- 复盘问题：' + mission.reviewPrompt,
      '',
      '> 这份档案记录的是一次沟通选择，不替任何一方诊断意图，也不宣布唯一正确解释。',
      ''
    ].join('\n');
  }

  return {
    DEFAULT_PROFILE: DEFAULT_PROFILE,
    RELATIONSHIPS: RELATIONSHIPS,
    PERSPECTIVES: PERSPECTIVES,
    GOALS: GOALS,
    FEEDBACKS: FEEDBACKS,
    STRATEGIES: STRATEGIES,
    normalizeProfile: normalizeProfile,
    createVisitMission: createVisitMission,
    diffMissions: diffMissions,
    buildVisitReceipt: buildVisitReceipt,
    buildReconciliationArchive: buildReconciliationArchive
  };
}));
