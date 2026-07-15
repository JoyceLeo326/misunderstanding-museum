(function () {
  'use strict';

  var root = document.documentElement;
  var reducedMotion = false;
  try {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (error) {
    reducedMotion = false;
  }

  var lensItems = [
    {
      id: 'MIS-001', wing: '异乡生活展厅', original: '“吃了吗？”',
      literal: 'Have you eaten?', context: '“今天过得怎么样？\n有没有好好照顾自己？”'
    },
    {
      id: 'MIS-002', wing: '关系展厅', original: '“你先忙吧”',
      literal: 'Take your time.', context: '“我有一点失落，\n也想让你再问一句。”'
    },
    {
      id: 'MIS-003', wing: '同好暗号展厅', original: '“ㅋㅋㅋ”',
      literal: 'Hahaha', context: '“笑声的长短，\n也在表达关系和语气。”'
    },
    {
      id: 'MIS-004', wing: '网络语境展厅', original: '“改天约”',
      literal: 'Another day.', context: '“有时是认真邀请，\n有时只是礼貌收尾。”'
    }
  ];

  var exhibits = {
    'MIS-001': { number: '001', wing: '异乡生活展厅', original: '“吃了吗？”', literal: '你是否已经吃过饭？', context: '我在想你，也想知道你今天有没有照顾好自己。', question: '在你的关系里，这句话通常是什么意思？', coordinates: [[78, '较清晰'], [76, '较高'], [64, '中等']] },
    'MIS-002': { number: '002', wing: '关系展厅', original: '“你先忙吧”', literal: '请先处理你的事情。', context: '我理解你很忙，但此刻也许有一点失落，想让你再问一句。', question: '你会把这句话读成体谅、结束，还是等待？', coordinates: [[72, '较清晰'], [88, '很高'], [86, '很高']] },
    'MIS-003': { number: '003', wing: '同好暗号展厅', original: '“ㅋㅋㅋ”', literal: '一串表示笑声的韩文字母。', context: '数量、前后文和关系距离，一起决定这声笑有多真。', question: '你常用的文字笑声是什么？它的长度有区别吗？', coordinates: [[52, '中等'], [74, '较高'], [82, '很高']] },
    'MIS-004': { number: '004', wing: '网络语境展厅', original: '“改天约”', literal: '换一个日期见面。', context: '它可能是一份还没定日期的邀请，也可能是一种温和的告别。', question: '什么信号会让你相信“改天”真的会来？', coordinates: [[80, '较清晰'], [55, '中等'], [91, '很高']] },
    'MIS-005': { number: '005', wing: '关系展厅', original: '“随便”', literal: '任何选项都可以。', context: '没有说出明确偏好，不代表完全没有期待；语气可能正在等待被看见。', question: '你说“随便”时，是真的都可以吗？', coordinates: [[86, '很清晰'], [90, '很高'], [88, '很高']] },
    'MIS-006': { number: '006', wing: '关系展厅', original: '“我没事”', literal: '我现在没有问题。', context: '它可能是在确认边界，也可能是还没准备好把需要说出来。', question: '怎样的下一句话，既关心又不会越界？', coordinates: [[91, '很清晰'], [93, '很高'], [94, '很高']] },
    'MIS-007': { number: '007', wing: '异乡生活展厅', original: '“多穿点”', literal: '增加衣物。', context: '天气提醒之外，它也可能是一种隔着距离、无法亲手照顾的惦记。', question: '你的家人会用哪句生活提醒表达想念？', coordinates: [[82, '很清晰'], [80, '较高'], [58, '中等']] },
    'MIS-008': { number: '008', wing: '异乡生活展厅', original: '“有空来玩”', literal: '有时间可以来拜访。', context: '在不同社交习惯里，它可能是具体邀请，也可能只是友善的对话结尾。', question: '你会等待第二次邀请，还是直接确认时间？', coordinates: [[84, '很清晰'], [63, '中等'], [87, '很高']] },
    'MIS-009': { number: '009', wing: '同好暗号展厅', original: '“入坑”', literal: '掉进一个坑里。', context: '它描述的不是危险，而是从喜欢一个作品开始，进入一群人的共同语言。', question: '哪件作品让你第一次找到“同坑”的人？', coordinates: [[22, '很低'], [76, '较高'], [69, '较高']] },
    'MIS-010': { number: '010', wing: '同好暗号展厅', original: '“我担杀疯了”', literal: '我支持的人正在疯狂杀戮。', context: '在圈层语境里，这是高浓度的夸赞：喜欢的人刚刚完成了非常亮眼的表现。', question: '你所在的兴趣圈还有哪些“听起来很危险”的夸奖？', coordinates: [[12, '很低'], [82, '很高'], [74, '较高']] },
    'MIS-011': { number: '011', wing: '网络语境展厅', original: '“收到”', literal: '信息已接收。', context: '在工作里它高效明确，在亲密聊天里却可能因为过于完整而显得有距离。', question: '哪一种回复对你来说既有效率又有温度？', coordinates: [[95, '很清晰'], [51, '中等'], [68, '较高']] },
    'MIS-012': { number: '012', wing: '网络语境展厅', original: '“哈哈 / 哈哈哈哈哈”', literal: '不同长度的笑声。', context: '字数、标点、平台和关系共同调节笑声温度；多一个“哈”也可能多一层真诚。', question: '你的聊天里，几个“哈”才算真的笑了？', coordinates: [[38, '较低'], [67, '较高'], [83, '很高']] }
  };

  var labSteps = [
    { stage: '切片 01 · 原话', quote: '“你先忙吧。”', copy: '短短五个字，信息完整，语气却没有被写出来。它可以是体谅，也可以是失落，还可能只是结束对话。', question: '如果不看前后文，你会把它读成哪一种情绪？' },
    { stage: '切片 02 · 字面', quote: 'Take your time.', copy: '直译顺畅，行动指令也很清楚：你可以先去忙。但字面没有携带停顿、回复速度和此前发生过的对话。', question: '翻译保住了信息，却漏掉了哪些关系线索？' },
    { stage: '切片 03 · 语境', quote: '体谅，还是失落？', copy: '同一句话放进不同关系，会拥有不同重量。也许对方真的想给你空间，也许是在等待一句“怎么了”，两种理解都需要前后文来确认。', question: '哪些语气、时间和关系背景会改变你的判断？' },
    { stage: '切片 04 · 下一句', quote: '“我忙完来找你。\n你是不是有点不开心？”', copy: '好的下一句不急着宣布自己猜对了，而是同时保留体谅与询问：先回应字面，再轻轻确认语境。', question: '你还能补出哪一句，让两种理解都有继续说下去的空间？' }
  ];

  function list(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function setPressed(buttons, active) {
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', button === active ? 'true' : 'false');
    });
  }

  function setupReveal() {
    var items = list('[data-reveal]');
    if (!items.length || reducedMotion || !('IntersectionObserver' in window)) return;

    var observer;
    try {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

      items.forEach(function (item, index) {
        item.style.setProperty('--reveal-delay', String((index % 3) * 55) + 'ms');
        item.classList.add('reveal-pending');
        observer.observe(item);
      });

      window.setTimeout(function () {
        items.forEach(function (item) {
          if (!item.classList.contains('is-visible')) item.classList.add('is-visible');
        });
      }, 2200);
    } catch (error) {
      items.forEach(function (item) {
        item.classList.remove('reveal-pending');
        item.classList.add('is-visible');
      });
    }
  }

  function setupScrollState() {
    var header = document.querySelector('[data-header]');
    var progressBar = document.querySelector('[data-scroll-progress]');
    var frame = null;

    function update() {
      frame = null;
      var scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      var progress = scrollable ? Math.min(1, window.pageYOffset / scrollable) : 0;
      if (progressBar) progressBar.style.transform = 'scaleX(' + String(progress) + ')';
      if (header) header.classList.toggle('is-scrolled', window.pageYOffset > 8);
    }

    window.addEventListener('scroll', function () {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function setupNavigationState() {
    var sections = list('main section[id]');
    var links = list('.desktop-nav a, .mobile-nav a');
    if (!sections.length || !links.length) return;

    function activate(current) {
      links.forEach(function (link) {
        if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    function update() {
      var marker = Math.max(92, window.innerHeight * 0.28);
      var current = sections[0];
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= marker) current = section;
      });
      activate('#' + current.id);
    }

    var frame = null;
    window.addEventListener('scroll', function () {
      if (frame) return;
      frame = window.requestAnimationFrame(function () {
        frame = null;
        update();
      });
    }, { passive: true });

    links.forEach(function (link) {
      link.addEventListener('click', function () { activate(link.getAttribute('href')); });
    });
    update();
  }

  function setupLens() {
    var lens = document.querySelector('[data-context-lens]');
    if (!lens) return;
    var modeButtons = list('[data-lens-mode]', lens);
    var itemButtons = list('[data-lens-index]', lens);
    var wing = lens.querySelector('[data-lens-wing]');
    var accession = lens.querySelector('.accession');
    var original = lens.querySelector('[data-lens-original]');
    var literalBox = lens.querySelector('[data-lens-literal]');
    var literalText = literalBox ? literalBox.querySelector('strong') : null;
    var contextBox = lens.querySelector('[data-lens-context]');
    var contextText = contextBox ? contextBox.querySelector('strong') : null;

    function setMode(mode, activeButton) {
      var showContext = mode === 'context';
      lens.classList.toggle('is-context', showContext);
      if (literalBox) literalBox.hidden = showContext;
      if (contextBox) contextBox.hidden = !showContext;
      setPressed(modeButtons, activeButton);
    }

    function setItem(index, activeButton) {
      var item = lensItems[index];
      if (!item) return;
      if (accession) accession.textContent = item.id;
      if (wing) wing.textContent = item.wing;
      if (original) original.textContent = item.original;
      if (literalText) literalText.textContent = item.literal;
      if (contextText) contextText.textContent = item.context;
      setPressed(itemButtons, activeButton);
    }

    modeButtons.forEach(function (button) {
      button.addEventListener('click', function () { setMode(button.getAttribute('data-lens-mode'), button); });
    });
    itemButtons.forEach(function (button) {
      button.addEventListener('click', function () { setItem(Number(button.getAttribute('data-lens-index')), button); });
    });
  }

  var selectedExhibitId = 'MIS-001';

  function setupCollection() {
    var cards = list('.collection-card');
    var filters = list('[data-filter]');
    var inspector = document.querySelector('[data-collection-inspector]');
    if (!cards.length || !inspector) return;

    var number = inspector.querySelector('[data-inspector-number]');
    var wing = inspector.querySelector('[data-inspector-wing]');
    var original = inspector.querySelector('[data-inspector-original]');
    var literal = inspector.querySelector('[data-inspector-literal]');
    var context = inspector.querySelector('[data-inspector-context]');
    var question = inspector.querySelector('[data-inspector-question]');
    var coordinateRows = list('[data-coordinate]', inspector);
    var visitMeter = document.querySelector('[data-visit-meter]');
    var visitCount = document.querySelector('[data-visit-count]');
    var visitLabel = document.querySelector('[data-visit-label]');
    var receiptCount = document.querySelector('[data-receipt-count]');
    var receiptCopy = document.querySelector('[data-receipt-copy]');
    var visitStorageKey = 'misunderstanding-museum-visit-v2';
    var visited = { 'MIS-001': true };

    try {
      var savedVisit = JSON.parse(sessionStorage.getItem(visitStorageKey) || '[]');
      if (Array.isArray(savedVisit)) {
        savedVisit.forEach(function (id) { if (exhibits[id]) visited[id] = true; });
      }
    } catch (error) { /* Session progress is optional. */ }

    function updateCoordinates(item) {
      coordinateRows.forEach(function (row, index) {
        var coordinate = item.coordinates && item.coordinates[index] ? item.coordinates[index] : [50, '中等'];
        var bar = row.querySelector('b');
        var label = row.querySelector('em');
        if (bar) bar.style.setProperty('--coordinate-value', String(coordinate[0]) + '%');
        if (label) label.textContent = coordinate[1];
      });
    }

    function updateVisit(id) {
      if (exhibits[id]) visited[id] = true;
      var ids = Object.keys(visited).filter(function (key) { return exhibits[key]; });
      var count = Math.max(1, Math.min(cards.length, ids.length));
      cards.forEach(function (card) { card.classList.toggle('is-visited', Boolean(visited[card.getAttribute('data-id')])); });
      if (visitMeter) visitMeter.style.setProperty('--visit-progress', String((count / cards.length) * 360) + 'deg');
      if (visitCount) visitCount.textContent = String(count);
      if (visitLabel) visitLabel.textContent = '已阅 ' + String(count) + ' / ' + String(cards.length);
      if (receiptCount) receiptCount.textContent = count < 10 ? '0' + String(count) : String(count);
      if (receiptCopy) {
        if (count >= cards.length) receiptCopy.textContent = '十二件藏品已经连成一张完整语境地图。下一次，也可以捐出你自己的那句话。';
        else if (count >= 8) receiptCopy.textContent = '你已经走进大多数展厅。再看几件，会发现误会并不只发生在翻译里。';
        else if (count >= 4) receiptCopy.textContent = '你的参观路径正在展开：有些误会来自语言，有些来自关系里的期待。';
        else receiptCopy.textContent = '你已经看过第一批藏品。继续翻阅，语境会慢慢连成一张地图。';
      }
      try { sessionStorage.setItem(visitStorageKey, JSON.stringify(ids)); } catch (error) { /* Optional. */ }
    }

    function selectCard(card, shouldScroll) {
      var id = card.getAttribute('data-id');
      var item = exhibits[id];
      if (!item) return;
      selectedExhibitId = id;
      cards.forEach(function (candidate) {
        var active = candidate === card;
        candidate.classList.toggle('is-selected', active);
        candidate.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      number.textContent = item.number;
      wing.textContent = item.wing;
      original.textContent = item.original;
      literal.textContent = item.literal;
      context.textContent = item.context;
      question.textContent = item.question;
      updateCoordinates(item);
      updateVisit(id);
      if (shouldScroll) inspector.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
    }

    function applyFilter(value, activeButton) {
      filters.forEach(function (button) { button.setAttribute('aria-pressed', button === activeButton ? 'true' : 'false'); });
      cards.forEach(function (card) {
        card.hidden = value !== 'all' && card.getAttribute('data-wing') !== value;
      });
      var selected = document.querySelector('.collection-card.is-selected');
      if (selected && selected.hidden) {
        var firstVisible = cards.filter(function (card) { return !card.hidden; })[0];
        if (firstVisible) selectCard(firstVisible, false);
      }
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () { selectCard(card, window.innerWidth < 760); });
    });
    filters.forEach(function (button) {
      button.addEventListener('click', function () { applyFilter(button.getAttribute('data-filter'), button); });
    });

    list('[data-random-exhibit]').forEach(function (button) {
      button.addEventListener('click', function () {
        var allFilter = filters.filter(function (filter) { return filter.getAttribute('data-filter') === 'all'; })[0];
        if (allFilter) applyFilter('all', allFilter);
        var candidates = cards.filter(function (card) { return card.getAttribute('data-id') !== selectedExhibitId; });
        var card = candidates[Math.floor(Math.random() * candidates.length)] || cards[0];
        selectCard(card, true);
      });
    });

    var openLab = inspector.querySelector('[data-open-lab]');
    if (openLab) openLab.addEventListener('click', function () {
      var lab = document.querySelector('#lab');
      if (lab) lab.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });

    updateCoordinates(exhibits[selectedExhibitId]);
    updateVisit(selectedExhibitId);
  }

  function setupLab() {
    var tabs = list('[data-lab-step]');
    var panel = document.querySelector('#lab-panel');
    if (!tabs.length || !panel) return;
    var stage = panel.querySelector('[data-lab-stage]');
    var quote = panel.querySelector('[data-lab-quote]');
    var copy = panel.querySelector('[data-lab-copy]');
    var question = panel.querySelector('[data-lab-question]');

    function activate(index, button) {
      var item = labSteps[index];
      if (!item) return;
      tabs.forEach(function (tab) { tab.setAttribute('aria-selected', tab === button ? 'true' : 'false'); });
      panel.setAttribute('aria-labelledby', button.id);
      stage.textContent = item.stage;
      quote.textContent = item.quote;
      copy.textContent = item.copy;
      question.textContent = item.question;
      panel.classList.remove('is-changing');
      void panel.offsetWidth;
      panel.classList.add('is-changing');
    }

    tabs.forEach(function (button, index) {
      button.addEventListener('click', function () { activate(index, button); });
      button.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        var next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        activate(next, tabs[next]);
      });
    });
  }

  function copyText(text, callback) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { callback(true); }, function () { callback(false); });
      return;
    }
    var helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    var succeeded = false;
    try { succeeded = document.execCommand('copy'); } catch (error) { succeeded = false; }
    document.body.removeChild(helper);
    callback(succeeded);
  }

  function setupCardGenerator() {
    var form = document.querySelector('[data-card-form]');
    var preview = document.querySelector('[data-card-preview]');
    if (!form || !preview) return;

    var fields = {
      wing: form.elements.wing,
      original: form.elements.original,
      meaning: form.elements.meaning,
      misread: form.elements.misread,
      resolution: form.elements.resolution
    };
    var outputs = {
      wing: preview.querySelector('[data-preview-wing]'),
      original: preview.querySelector('[data-preview-original]'),
      meaning: preview.querySelector('[data-preview-meaning]'),
      misread: preview.querySelector('[data-preview-misread]'),
      resolution: preview.querySelector('[data-preview-resolution]')
    };
    var status = form.querySelector('[data-form-status]');
    var copyStatus = document.querySelector('[data-copy-status]');
    var clearButton = form.querySelector('[data-clear-card]');
    var copyButton = document.querySelector('[data-copy-card]');
    var storageKey = 'misunderstanding-museum-draft-v2';

    function value(field, fallback) {
      var current = field && field.value ? field.value.trim() : '';
      return current || fallback;
    }

    function updatePreview(save) {
      outputs.wing.textContent = value(fields.wing, '关系展厅');
      outputs.original.textContent = '“' + value(fields.original, '把那句话写在这里') + '”';
      outputs.meaning.textContent = value(fields.meaning, '真正想说的话，会出现在这里。');
      outputs.misread.textContent = value(fields.misread, '另一种理解，会出现在这里。');
      outputs.resolution.textContent = value(fields.resolution, '后来怎样重新靠近彼此？');
      if (!save) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          wing: fields.wing.value,
          original: fields.original.value,
          meaning: fields.meaning.value,
          misread: fields.misread.value,
          resolution: fields.resolution.value
        }));
      } catch (error) { /* Local storage is optional. */ }
    }

    function loadDraft() {
      try {
        var draft = JSON.parse(localStorage.getItem(storageKey) || 'null');
        if (!draft) return;
        Object.keys(fields).forEach(function (key) {
          if (typeof draft[key] === 'string') fields[key].value = draft[key];
        });
        updatePreview(false);
        status.textContent = '已恢复这台设备上的未完成草稿。';
      } catch (error) { /* Ignore malformed or unavailable storage. */ }
    }

    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener(key === 'wing' ? 'change' : 'input', function () { updatePreview(true); });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      updatePreview(true);
      status.textContent = '藏品卡已生成。你可以继续修改，或复制卡片内容。';
      preview.classList.remove('is-generated');
      void preview.offsetWidth;
      preview.classList.add('is-generated');
    });

    if (clearButton) clearButton.addEventListener('click', function () {
      form.reset();
      try { localStorage.removeItem(storageKey); } catch (error) { /* Optional. */ }
      updatePreview(false);
      status.textContent = '已清空本地草稿。';
      if (copyStatus) copyStatus.textContent = '';
    });

    if (copyButton) copyButton.addEventListener('click', function () {
      var text = [
        '误会博物馆｜' + value(fields.wing, '关系展厅'),
        '当时的原话：' + value(fields.original, '未填写'),
        '我真正想表达：' + value(fields.meaning, '未填写'),
        '对方当时听成：' + value(fields.misread, '未填写'),
        '后来补上的下一句：' + value(fields.resolution, '未填写'),
        '共同注释：在你的关系里，这句话通常是什么意思？'
      ].join('\n');
      copyText(text, function (ok) {
        if (copyStatus) copyStatus.textContent = ok ? '藏品卡文字已复制。' : '当前浏览器未允许复制，请长按表单内容手动复制。';
      });
    });

    loadDraft();
    updatePreview(false);
  }

  function registerOfflineCache() {
    if (!('serviceWorker' in navigator) || window.location.protocol !== 'https:') return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () { /* The site works without offline cache. */ });
    });
  }

  function init() {
    root.classList.add('enhanced');
    setupReveal();
    setupScrollState();
    setupNavigationState();
    setupLens();
    setupCollection();
    setupLab();
    setupCardGenerator();
    registerOfflineCache();
  }

  try {
    init();
  } catch (error) {
    list('.reveal-pending').forEach(function (item) {
      item.classList.remove('reveal-pending');
      item.classList.add('is-visible');
    });
    root.classList.add('enhancement-failed');
  }
}());
