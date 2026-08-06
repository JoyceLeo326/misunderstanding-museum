(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MuseumVisuals = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var provenance = '编辑插画 · 人物与场景均为虚构复合';

  var EXHIBIT_VISUALS = {
    'MIS-001': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-001-misread.webp',
        alt: '餐桌旁，一位来访者把“吃了吗”理解成需要精确回答的饮食询问，另一人想表达的关心停在两人之间。',
        caption: '字面回答得很完整，关心却没有被听见。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-001-context.webp',
        alt: '两个人在餐桌旁放松交谈，把关于晚饭的询问补充成对彼此近况与照顾的关心。',
        caption: '补上“我在惦记你”，一句问饭有了关系里的温度。'
      }
    },
    'MIS-002': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-002-misread.webp',
        alt: '忙碌工作场景里，一人把“你先忙吧”理解成对话已经结束，另一人的失落没有被看见。',
        caption: '体谅和失落同时存在，句号只留下了其中一种。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-002-context.webp',
        alt: '工作结束后，两个人重新面对面确认感受与时间，让被中断的对话有了继续发生的位置。',
        caption: '不是猜出情绪，而是留出一句可以回答的问题。'
      }
    },
    'MIS-003': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-003-misread.webp',
        alt: '两位朋友隔着手机观察不同长度的韩文笑声，一人感到亲近，另一人不确定那是真笑还是礼貌。',
        caption: '同样是笑，长度、关系和前后文让温度变得不同。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-003-context.webp',
        alt: '两位朋友并肩比较聊天语境并真诚笑起来，抽象的笑声符号在两人之间连成共同节奏。',
        caption: '把笑声放回关系里，符号才重新成为真实反应。'
      }
    },
    'MIS-004': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-004-misread.webp',
        alt: '告别场景里，一人把“改天约”当作确定邀请，另一人只是礼貌收尾，悬空的日历让期待没有落点。',
        caption: '一句未来时，因为没有日期而通向两种完全不同的期待。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-004-context.webp',
        alt: '两个人当面确认下一次见面的具体时间与地点，把模糊邀请变成双方都能选择的约定。',
        caption: '具体日期不是扫兴，而是让邀请真正可以抵达。'
      }
    },
    'MIS-005': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-005-misread.webp',
        alt: '餐厅菜单前，一人说“随便”后等待被理解，另一人面对很多选项无从判断，两人的偏好都没有说清。',
        caption: '“都可以”省略了偏好，也把选择压力留给了对方。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-005-context.webp',
        alt: '餐桌旁，短发女策展人与卷发男设计师分别指出两个菜品并共同确认选择，眼神和手势都很放松。',
        caption: '缩小选项、说出倾向，协调就不再靠猜。'
      }
    },
    'MIS-006': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-006-misread.webp',
        alt: '夜晚客厅里，一人说“我没事”并转开身体，另一人不知道应该靠近还是离开，关心停在边界之外。',
        caption: '字面说没有问题，关系却仍在等待一个不越界的选择。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-006-context.webp',
        alt: '安静客厅里，两人隔着舒适距离坐下，一人用开放手势提供独处或陪伴的选择，另一人示意他留下。',
        caption: '先问“需要空间还是陪伴”，关心和边界可以同时成立。'
      }
    },
    'MIS-007': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-007-misread.webp',
        alt: '雪天窗边，留学生把家人反复提醒“多穿点”听成管理与唠叨，手机和围巾之间显得疏远。',
        caption: '生活提醒太具体，远距离的想念反而被藏了起来。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-007-context.webp',
        alt: '雪天窗边，长发留学生在视频通话中围好酒红色围巾并分享窗外风景，神情温暖地回应家人的惦记。',
        caption: '看见提醒背后的无力与关心，距离有了可以回应的形状。'
      }
    },
    'MIS-008': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-008-misread.webp',
        alt: '楼道告别时，一句“有空来玩”在两人之间化成许多没有日期的门，一人认真等待，另一人已经转身。',
        caption: '友善可能是邀请，也可能只是告别；字面没有给出判断依据。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-008-context.webp',
        alt: '长发留学生带着礼物按约来到年长邻居家，门内已经准备好茶和座椅，双方以眼神明确欢迎。',
        caption: '确认一次具体来访，让客气话成为真实的相遇。'
      }
    },
    'MIS-009': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-009-misread.webp',
        alt: '同好展厅里，蓝色针织背心的女孩兴奋看着收藏品，芥末色毛衣的访客却被“入坑”的字面坑洞意象吓到。',
        caption: '圈内人看见兴趣入口，圈外人先听见了危险。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-009-context.webp',
        alt: '两位访客一起走进收藏展厅，交换卡片并讨论展品，打开的门框把加入兴趣社群表现成共同探索。',
        caption: '所谓“入坑”，是从喜欢一件作品开始找到同伴。'
      }
    },
    'MIS-010': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-010-misread.webp',
        alt: '精彩演出现场，女孩激动欢呼，身旁访客却被一句听起来像暴力的圈内夸赞和红色抽象碎片惊到。',
        caption: '高浓度赞美离开圈层语境，会先显露出危险的字面。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-010-context.webp',
        alt: '演出结束后的剧场前，两位朋友拿着节目册模仿精彩动作并一起大笑，理解这句话是在赞美表现。',
        caption: '把夸张放回表演与共同兴趣里，危险字面重新变成赞叹。'
      }
    },
    'MIS-011': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-011-misread.webp',
        alt: '女策展人在繁忙档案室发出简短确认，男设计师看着手机感到疏远，一枚巨大的印章阴影像墙一样隔开两人。',
        caption: '在工作里高效的“收到”，到了亲密对话里可能显得过于完整。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-011-context.webp',
        alt: '博物馆庭院里，女策展人用语音与茶补充温度，并递出明确交接卡；男设计师当面确认她的回复习惯。',
        caption: '说明自己的沟通节奏，再补一个可见的温度信号。'
      }
    },
    'MIS-012': {
      misread: {
        phase: 'misread',
        asset: 'assets/story/mis-012-misread.webp',
        alt: '博物馆长椅两端，两位朋友观察长短不同的抽象笑声墨迹，不确定那是礼貌回应还是真正开心。',
        caption: '没有关系与时机，笑声长度只剩一组难以判读的信号。'
      },
      context: {
        phase: 'context',
        asset: 'assets/story/mis-012-context.webp',
        alt: '两位朋友并肩在长纸上标注笑声节奏并真诚大笑，背后两道墨色轨迹汇合成可以穿过的通道。',
        caption: '一起说明什么时候会这样笑，符号就变成两个人共享的节奏。'
      }
    }
  };

  Object.keys(EXHIBIT_VISUALS).forEach(function (id) {
    EXHIBIT_VISUALS[id].misread.provenance = provenance;
    EXHIBIT_VISUALS[id].context.provenance = provenance;
  });

  function getExhibitVisual(id, phase) {
    var pair = EXHIBIT_VISUALS[id] || EXHIBIT_VISUALS['MIS-001'];
    return phase === 'context' ? pair.context : pair.misread;
  }

  return {
    EXHIBIT_VISUALS: EXHIBIT_VISUALS,
    getExhibitVisual: getExhibitVisual,
    provenance: provenance
  };
}));
