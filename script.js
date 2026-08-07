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
      id: 'MIS-001', wing: '异乡生活展厅', source: '编辑复合故事', original: '“吃了吗？”',
      literal: 'Have you eaten?', context: '“今天过得怎么样？\n有没有好好照顾自己？”'
    },
    {
      id: 'MIS-002', wing: '关系展厅', source: '编辑情境示例', original: '“你先忙吧”',
      literal: 'Take your time.', context: '“我有一点失落，\n也想让你再问一句。”'
    },
    {
      id: 'MIS-003', wing: '同好暗号展厅', source: '编辑情境示例', original: '“ㅋㅋㅋ”',
      literal: 'Hahaha', context: '“笑声的长短，\n也在表达关系和语气。”'
    },
    {
      id: 'MIS-004', wing: '网络语境展厅', source: '编辑情境示例', original: '“改天约”',
      literal: 'Another day.', context: '“有时是认真邀请，\n有时只是礼貌收尾。”'
    }
  ];

  var exhibits = {
    'MIS-001': { number: '001', wing: '异乡生活展厅', source: '编辑复合故事', original: '“吃了吗？”', literal: '你是否已经吃过饭？', context: '我在想你，也想知道你今天有没有照顾好自己。', question: '在你的关系里，这句话通常是什么意思？', coordinates: [4, 4, 3] },
    'MIS-002': { number: '002', wing: '关系展厅', source: '编辑情境示例', original: '“你先忙吧”', literal: '请先处理你的事情。', context: '我理解你很忙，但此刻也许有一点失落，想让你再问一句。', question: '你会把这句话读成体谅、结束，还是等待？', coordinates: [4, 5, 5] },
    'MIS-003': { number: '003', wing: '同好暗号展厅', source: '编辑情境示例', original: '“ㅋㅋㅋ”', literal: '一串表示笑声的韩文字母。', context: '数量、前后文和关系距离，一起决定这声笑有多真。', question: '你常用的文字笑声是什么？它的长度有区别吗？', coordinates: [3, 4, 4] },
    'MIS-004': { number: '004', wing: '网络语境展厅', source: '编辑情境示例', original: '“改天约”', literal: '换一个日期见面。', context: '它可能是一份还没定日期的邀请，也可能是一种温和的告别。', question: '什么信号会让你相信“改天”真的会来？', coordinates: [4, 3, 5] },
    'MIS-005': { number: '005', wing: '关系展厅', source: '编辑情境示例', original: '“随便”', literal: '任何选项都可以。', context: '没有说出明确偏好，不代表完全没有期待；语气可能正在等待被看见。', question: '你说“随便”时，是真的都可以吗？', coordinates: [4, 5, 4] },
    'MIS-006': { number: '006', wing: '关系展厅', source: '编辑情境示例', original: '“我没事”', literal: '我现在没有问题。', context: '它可能是在确认边界，也可能是还没准备好把需要说出来。', question: '怎样的下一句话，既关心又不会越界？', coordinates: [5, 5, 5] },
    'MIS-007': { number: '007', wing: '异乡生活展厅', source: '编辑情境示例', original: '“多穿点”', literal: '增加衣物。', context: '天气提醒之外，它也可能是一种隔着距离、无法亲手照顾的惦记。', question: '你的家人会用哪句生活提醒表达想念？', coordinates: [4, 4, 3] },
    'MIS-008': { number: '008', wing: '异乡生活展厅', source: '编辑情境示例', original: '“有空来玩”', literal: '有时间可以来拜访。', context: '在不同社交习惯里，它可能是具体邀请，也可能只是友善的对话结尾。', question: '你会等待第二次邀请，还是直接确认时间？', coordinates: [4, 3, 4] },
    'MIS-009': { number: '009', wing: '同好暗号展厅', source: '编辑情境示例', original: '“入坑”', literal: '掉进一个坑里。', context: '它描述的不是危险，而是从喜欢一个作品开始，进入一群人的共同语言。', question: '哪件作品让你第一次找到“同坑”的人？', coordinates: [1, 4, 3] },
    'MIS-010': { number: '010', wing: '同好暗号展厅', source: '编辑情境示例', original: '“我担杀疯了”', literal: '我支持的人正在疯狂杀戮。', context: '在圈层语境里，这是高浓度的夸赞：喜欢的人刚刚完成了非常亮眼的表现。', question: '你所在的兴趣圈还有哪些“听起来很危险”的夸奖？', coordinates: [1, 4, 4] },
    'MIS-011': { number: '011', wing: '网络语境展厅', source: '编辑情境示例', original: '“收到”', literal: '信息已接收。', context: '在工作里它高效明确，在亲密聊天里却可能因为过于完整而显得有距离。', question: '哪一种回复对你来说既有效率又有温度？', coordinates: [5, 3, 3] },
    'MIS-012': { number: '012', wing: '网络语境展厅', source: '编辑情境示例', original: '“哈哈 / 哈哈哈哈哈”', literal: '不同长度的笑声。', context: '字数、标点、平台和关系共同调节笑声温度；多一个“哈”也可能多一层真诚。', question: '你的聊天里，几个“哈”才算真的笑了？', coordinates: [2, 3, 4] }
  };

  var visualEngine = window.MuseumVisuals;

  var labSteps = [
    { stage: '观察 01 · 原话', quote: '“你先忙吧。”', copy: '短短五个字，信息完整，语气却留了白。它可能是体谅，也可能藏着一点失落，还可能只是在温和地结束对话。', question: '如果暂时不看前后文，你会先听见哪一种情绪？' },
    { stage: '观察 02 · 字面', quote: 'Take your time.', copy: '直译清楚地传达了行动：你可以先去忙。但停顿、回复速度和此前的对话，还没有一起抵达。', question: '除了字面信息，你还会留意哪些细微信号？' },
    { stage: '观察 03 · 语境', quote: '体谅，还是失落？', copy: '同一句话回到不同关系里，会拥有不同重量。也许对方真的想留出空间，也许是在等待一句“怎么了”；答案需要由前后文慢慢照亮。', question: '哪些语气、时机和关系背景，会改变你的判断？' },
    { stage: '观察 04 · 下一句', quote: '“我忙完来找你。\n你是不是有点不开心？”', copy: '更好的下一句，不急着宣布自己猜对了。先回应字面，再轻轻确认感受，让体谅和关心都能被接住。', question: '你会补上哪一句，让彼此都更容易继续说下去？' }
  ];

  function list(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function setPressed(buttons, active) {
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', button === active ? 'true' : 'false');
    });
  }

  function setupHeroSequence() {
    var heroCopy = document.querySelector('[data-hero-sequence]');
    if (!heroCopy) return;
    list('[data-hero-reveal]', heroCopy).forEach(function (item, index) {
      item.style.setProperty('--hero-index', String(index));
    });
    if (reducedMotion) {
      heroCopy.classList.add('is-entered');
      return;
    }
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { heroCopy.classList.add('is-entered'); });
    });
  }

  function setupTextReveal() {
    var headings = list('[data-text-reveal]');
    if (!headings.length) return;

    headings.forEach(function (heading) {
      var label = heading.textContent.replace(/\s+/g, ' ').trim();
      var lines = [];
      var current = '';

      Array.prototype.slice.call(heading.childNodes).forEach(function (node) {
        if (node.nodeName === 'BR') {
          if (current.trim()) lines.push(current.trim());
          current = '';
          return;
        }
        current += node.textContent || '';
      });
      if (current.trim()) lines.push(current.trim());
      if (!lines.length) lines.push(label);

      heading.setAttribute('aria-label', label);
      heading.textContent = '';
      lines.forEach(function (line, index) {
        var outer = document.createElement('span');
        var inner = document.createElement('span');
        outer.className = 'text-reveal-line';
        outer.setAttribute('aria-hidden', 'true');
        outer.style.setProperty('--line-index', String(index));
        inner.textContent = line;
        outer.appendChild(inner);
        heading.appendChild(outer);
      });
    });

    if (reducedMotion || !('IntersectionObserver' in window)) {
      headings.forEach(function (heading) { heading.classList.add('is-text-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-text-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    headings.forEach(function (heading) { observer.observe(heading); });
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
          if (item.classList.contains('is-visible')) return;
          var rect = item.getBoundingClientRect();
          if (rect.top < window.innerHeight * 1.15 && rect.bottom > -100) item.classList.add('is-visible');
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
    var scene = lens.querySelector('[data-lens-scene]');
    var sceneImage = scene ? scene.querySelector('img') : null;
    var sceneLabel = scene ? scene.querySelector('[data-lens-scene-label]') : null;
    var sceneCaption = scene ? scene.querySelector('[data-lens-scene-caption]') : null;
    var activeIndex = 0;
    var activePhase = 'misread';

    function updateScene() {
      if (!visualEngine || !sceneImage) return;
      var item = lensItems[activeIndex] || lensItems[0];
      var visual = visualEngine.getExhibitVisual(item.id, activePhase);
      sceneImage.src = visual.asset;
      sceneImage.alt = visual.alt;
      if (sceneLabel) sceneLabel.textContent = activePhase === 'context' ? '补上语境' : '误读发生处';
      if (sceneCaption) sceneCaption.textContent = visual.caption;
    }

    function setMode(mode, activeButton) {
      var showContext = mode === 'context';
      activePhase = showContext ? 'context' : 'misread';
      lens.classList.toggle('is-context', showContext);
      if (literalBox) literalBox.hidden = showContext;
      if (contextBox) contextBox.hidden = !showContext;
      setPressed(modeButtons, activeButton);
      updateScene();
    }

    function setItem(index, activeButton) {
      var item = lensItems[index];
      if (!item) return;
      activeIndex = index;
      if (accession) accession.textContent = item.id;
      if (wing) wing.textContent = item.wing + ' · ' + item.source;
      if (original) original.textContent = item.original;
      if (literalText) literalText.textContent = item.literal;
      if (contextText) contextText.textContent = item.context;
      setPressed(itemButtons, activeButton);
      updateScene();
    }

    modeButtons.forEach(function (button) {
      button.addEventListener('click', function () { setMode(button.getAttribute('data-lens-mode'), button); });
    });
    itemButtons.forEach(function (button) {
      button.addEventListener('click', function () { setItem(Number(button.getAttribute('data-lens-index')), button); });
    });
  }

  var selectedExhibitId = 'MIS-001';
  var activeVisitMission = null;

  function setupCollection() {
    var cards = list('.collection-card');
    var filters = list('[data-filter]');
    var inspector = document.querySelector('[data-collection-inspector]');
    if (!cards.length || !inspector) return;

    var number = inspector.querySelector('[data-inspector-number]');
    var wing = inspector.querySelector('[data-inspector-wing]');
    var source = inspector.querySelector('[data-inspector-source]');
    var original = inspector.querySelector('[data-inspector-original]');
    var literal = inspector.querySelector('[data-inspector-literal]');
    var context = inspector.querySelector('[data-inspector-context]');
    var question = inspector.querySelector('[data-inspector-question]');
    var coordinateRows = list('[data-coordinate]', inspector);
    var backdrop = document.querySelector('[data-inspector-backdrop]');
    var closeInspectorButton = inspector.querySelector('[data-close-inspector]');
    var previousButton = inspector.querySelector('[data-prev-exhibit]');
    var nextButton = inspector.querySelector('[data-next-exhibit]');
    var position = inspector.querySelector('[data-inspector-position]');
    var inspectorScene = inspector.querySelector('[data-inspector-scene]');
    var inspectorSceneImage = inspectorScene ? inspectorScene.querySelector('img') : null;
    var inspectorSceneLabel = inspectorScene ? inspectorScene.querySelector('[data-inspector-scene-label]') : null;
    var inspectorSceneCaption = inspectorScene ? inspectorScene.querySelector('[data-inspector-scene-caption]') : null;
    var inspectorSceneProvenance = inspectorScene ? inspectorScene.querySelector('[data-inspector-scene-provenance]') : null;
    var inspectorVisualButtons = list('[data-inspector-visual-mode]', inspector);
    var visitMeter = document.querySelector('[data-visit-meter]');
    var visitCount = document.querySelector('[data-visit-count]');
    var visitLabel = document.querySelector('[data-visit-label]');
    var receiptCount = document.querySelector('[data-receipt-count]');
    var receiptCopy = document.querySelector('[data-receipt-copy]');
    var visitStorageKey = 'misunderstanding-museum-visit-v2';
    var visited = { 'MIS-001': true };
    var lastInspectorTrigger = null;
    var missionQuestion = '';
    var inspectorVisualPhase = 'misread';

    function hydrateCardVisuals() {
      if (!visualEngine) return;
      cards.forEach(function (card) {
        if (card.querySelector('.card-scene')) return;
        var id = card.getAttribute('data-id');
        var visual = visualEngine.getExhibitVisual(id, 'misread');
        var frame = document.createElement('span');
        var image = document.createElement('img');
        var label = document.createElement('span');
        frame.className = 'card-scene';
        image.src = visual.asset;
        image.alt = visual.alt;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.width = 1440;
        image.height = 960;
        label.textContent = '从误读进入';
        frame.appendChild(image);
        frame.appendChild(label);
        var top = card.querySelector('.card-top');
        if (top) top.insertAdjacentElement('afterend', frame);
        else card.prepend(frame);
      });
    }

    function renderInspectorVisual(id, phase) {
      if (!visualEngine || !inspectorSceneImage) return;
      inspectorVisualPhase = phase === 'context' ? 'context' : 'misread';
      var visual = visualEngine.getExhibitVisual(id, inspectorVisualPhase);
      inspectorSceneImage.src = visual.asset;
      inspectorSceneImage.alt = visual.alt;
      if (inspectorSceneLabel) inspectorSceneLabel.textContent = inspectorVisualPhase === 'context' ? '补上语境' : '误读发生处';
      if (inspectorSceneCaption) inspectorSceneCaption.textContent = visual.caption;
      if (inspectorSceneProvenance) inspectorSceneProvenance.textContent = visual.provenance;
      inspectorVisualButtons.forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-inspector-visual-mode') === inspectorVisualPhase ? 'true' : 'false');
      });
    }

    hydrateCardVisuals();

    try {
      var savedVisit = JSON.parse(sessionStorage.getItem(visitStorageKey) || '[]');
      if (Array.isArray(savedVisit)) {
        savedVisit.forEach(function (id) { if (exhibits[id]) visited[id] = true; });
      }
    } catch (error) { /* Session progress is optional. */ }

    function updateCoordinates(item) {
      coordinateRows.forEach(function (row, index) {
        var level = item.coordinates && item.coordinates[index] ? Number(item.coordinates[index]) : 3;
        level = Math.max(1, Math.min(5, level));
        var bar = row.querySelector('b');
        var label = row.querySelector('em');
        var name = row.querySelector('span');
        if (bar) bar.style.setProperty('--coordinate-level', String(level));
        if (label) label.textContent = String(level) + ' / 5';
        row.setAttribute('aria-label', (name ? name.textContent : '编辑判读') + ' ' + String(level) + ' / 5');
      });
    }

    function mobileInspectorActive() {
      return window.innerWidth < 760;
    }

    function openInspector(trigger) {
      if (!mobileInspectorActive()) return;
      lastInspectorTrigger = trigger || lastInspectorTrigger;
      if (backdrop) {
        backdrop.hidden = false;
        window.requestAnimationFrame(function () { backdrop.classList.add('is-visible'); });
      }
      inspector.classList.add('is-open');
      inspector.setAttribute('role', 'dialog');
      inspector.setAttribute('aria-modal', 'true');
      document.body.classList.add('inspector-open');
      if (closeInspectorButton) window.setTimeout(function () { closeInspectorButton.focus(); }, reducedMotion ? 0 : 180);
    }

    function closeInspector(returnFocus) {
      inspector.classList.remove('is-open');
      inspector.removeAttribute('role');
      inspector.removeAttribute('aria-modal');
      document.body.classList.remove('inspector-open');
      if (backdrop) {
        backdrop.classList.remove('is-visible');
        window.setTimeout(function () { backdrop.hidden = true; }, reducedMotion ? 0 : 240);
      }
      if (returnFocus && lastInspectorTrigger) lastInspectorTrigger.focus();
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
        if (count >= cards.length) receiptCopy.textContent = '十二件藏品已经连成一张完整语境地图。下一次，也可以制作你自己的藏品卡。';
        else if (count >= 8) receiptCopy.textContent = '你已经走进大多数展厅。再看几件，会发现误会并不只发生在翻译里。';
        else if (count >= 4) receiptCopy.textContent = '你的参观路径正在展开：有些误会来自语言，有些来自关系里的期待。';
        else receiptCopy.textContent = '你已经看过第一批藏品。继续翻阅，语境会慢慢连成一张地图。';
      }
      try { sessionStorage.setItem(visitStorageKey, JSON.stringify(ids)); } catch (error) { /* Optional. */ }
      document.dispatchEvent(new CustomEvent('museum:visit-change', { detail: { visitedIds: ids.slice() } }));
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
      if (source) source.textContent = '内容来源 · ' + item.source;
      original.textContent = item.original;
      literal.textContent = item.literal;
      context.textContent = item.context;
      question.textContent = item.question + (missionQuestion ? ' ' + missionQuestion : '');
      renderInspectorVisual(id, 'misread');
      updateCoordinates(item);
      updateVisit(id);
      if (position) position.textContent = String(cards.indexOf(card) + 1) + ' / ' + String(cards.length);
      if (shouldScroll) {
        if (mobileInspectorActive()) openInspector(card);
        else inspector.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
      }
    }

    function moveSelection(direction) {
      var visibleCards = cards.filter(function (card) { return !card.hidden; });
      if (!visibleCards.length) return;
      var selected = visibleCards.filter(function (card) { return card.getAttribute('data-id') === selectedExhibitId; })[0];
      var currentIndex = Math.max(0, visibleCards.indexOf(selected));
      var nextIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
      selectCard(visibleCards[nextIndex], false);
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
    inspectorVisualButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        renderInspectorVisual(selectedExhibitId, button.getAttribute('data-inspector-visual-mode'));
      });
    });

    document.addEventListener('museum:open-exhibit', function (event) {
      var id = event.detail && event.detail.id;
      var card = cards.filter(function (candidate) { return candidate.getAttribute('data-id') === id; })[0];
      if (!card) return;
      var allFilter = filters.filter(function (filter) { return filter.getAttribute('data-filter') === 'all'; })[0];
      if (allFilter) applyFilter('all', allFilter);
      selectCard(card, Boolean(event.detail && event.detail.scroll));
      if (!mobileInspectorActive() && event.detail && event.detail.scroll) {
        var collection = document.querySelector('#collection');
        if (collection) collection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });

    document.addEventListener('museum:mission-change', function (event) {
      missionQuestion = event.detail && event.detail.observationQuestion ? event.detail.observationQuestion : '';
      var item = exhibits[selectedExhibitId];
      if (item) question.textContent = item.question + (missionQuestion ? ' ' + missionQuestion : '');
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
      closeInspector(false);
      var lab = document.querySelector('#lab');
      if (lab) lab.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });

    if (previousButton) previousButton.addEventListener('click', function () { moveSelection(-1); });
    if (nextButton) nextButton.addEventListener('click', function () { moveSelection(1); });
    if (closeInspectorButton) closeInspectorButton.addEventListener('click', function () { closeInspector(true); });
    if (backdrop) backdrop.addEventListener('click', function () { closeInspector(true); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && inspector.classList.contains('is-open')) closeInspector(true);
      if (event.key !== 'Tab' || !inspector.classList.contains('is-open')) return;
      var focusable = list('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])', inspector).filter(function (element) {
        return !element.hidden && element.getClientRects().length > 0;
      });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    document.addEventListener('focusin', function (event) {
      if (!inspector.classList.contains('is-open') || inspector.contains(event.target)) return;
      if (closeInspectorButton) closeInspectorButton.focus();
    });
    window.addEventListener('resize', function () {
      if (!mobileInspectorActive() && inspector.classList.contains('is-open')) closeInspector(false);
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

  function downloadText(filename, text, mimeType) {
    var blob = new Blob([text], { type: (mimeType || 'text/plain') + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 500);
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
    var downloadButton = document.querySelector('[data-download-card]');
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

    function cardText() {
      return [
        '# 误会博物馆｜' + value(fields.wing, '关系展厅'),
        '',
        '- 当时的原话：' + value(fields.original, '未填写'),
        '- 我真正想表达：' + value(fields.meaning, '未填写'),
        '- 对方当时听成：' + value(fields.misread, '未填写'),
        '- 后来补上的下一句：' + value(fields.resolution, '未填写'),
        '',
        '> 共同注释：在你的关系里，这句话通常是什么意思？',
        ''
      ].join('\n');
    }

    function applyMission(mission) {
      if (!mission) return;
      if (!fields.original.value && !fields.meaning.value && !fields.misread.value) fields.wing.value = mission.recommendedWing;
      fields.resolution.placeholder = '例如：' + mission.nextSentence;
      updatePreview(false);
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
      status.textContent = '一张新的空白藏品卡已经准备好。';
      if (copyStatus) copyStatus.textContent = '';
    });

    if (copyButton) copyButton.addEventListener('click', function () {
      copyText(cardText(), function (ok) {
        if (copyStatus) copyStatus.textContent = ok ? '藏品卡文字已复制。' : '复制没有完成。可选中文本后手动复制。';
      });
    });

    if (downloadButton) downloadButton.addEventListener('click', function () {
      downloadText('误会博物馆-藏品卡.md', cardText(), 'text/markdown');
      if (copyStatus) copyStatus.textContent = '藏品卡已下载为 Markdown 文件。';
    });

    document.addEventListener('museum:mission-change', function (event) { applyMission(event.detail); });

    loadDraft();
    applyMission(activeVisitMission);
    updatePreview(false);
  }

  function setupVisitorMission() {
    var section = document.querySelector('[data-visitor-mission]');
    var form = document.querySelector('[data-mission-form]');
    var engine = window.MuseumMission;
    if (!section || !form || !engine) return;

    var fields = {
      name: form.elements.visitorName,
      relationship: form.elements.relationship,
      perspective: form.elements.perspective,
      goal: form.elements.goal,
      feedback: form.elements.feedback,
      moment: form.elements.moment,
      eventLine: form.elements.eventLine
    };
    var outputs = {
      story: section.querySelector('[data-mission-story]'),
      wing: section.querySelector('[data-mission-wing]'),
      conflict: section.querySelector('[data-mission-conflict]'),
      choice: section.querySelector('[data-mission-choice]'),
      outcome: section.querySelector('[data-mission-outcome]'),
      review: section.querySelector('[data-mission-review]'),
      feedback: section.querySelector('[data-mission-feedback]'),
      nextSentence: section.querySelector('[data-next-sentence]'),
      question: section.querySelector('[data-mission-question]'),
      speaker: section.querySelector('[data-perspective-speaker]'),
      listener: section.querySelector('[data-perspective-listener]'),
      shared: section.querySelector('[data-perspective-shared]')
    };
    var route = section.querySelector('[data-personal-route]');
    var note = section.querySelector('[data-reflection-note]');
    var status = section.querySelector('[data-mission-status]');
    var saveButton = section.querySelector('[data-save-reflection]');
    var downloadButton = section.querySelector('[data-download-receipt]');
    var startButton = section.querySelector('[data-start-route]');
    var candidates = section.querySelector('[data-strategy-candidates]');
    var confirmation = section.querySelector('[data-human-confirmation]');
    var confirmationTitle = section.querySelector('[data-confirmation-title]');
    var confirmationSentence = section.querySelector('[data-confirmation-sentence]');
    var confirmationTradeoff = section.querySelector('[data-confirmation-tradeoff]');
    var confirmationStatus = section.querySelector('[data-confirmation-status]');
    var confirmButton = section.querySelector('[data-confirm-strategy]');
    var versionProposal = section.querySelector('[data-version-proposal]');
    var proposalVersion = section.querySelector('[data-proposal-version]');
    var proposalDiff = section.querySelector('[data-proposal-diff]');
    var decisionHistoryList = section.querySelector('[data-decision-history]');
    var profileStorageKey = 'misunderstanding-museum-profile-v3';
    var noteStorageKey = 'misunderstanding-museum-reflection-v3';
    var visitStorageKey = 'misunderstanding-museum-visit-v2';
    var decisionStorageKey = 'misunderstanding-museum-decisions-v1';
    var visitedIds = [];
    var decisionHistory = [];
    var activeCandidateId = '';
    var confirmedCandidateId = '';
    var confirmedAt = '';

    function readVisited() {
      try {
        var saved = JSON.parse(sessionStorage.getItem(visitStorageKey) || '[]');
        return Array.isArray(saved) ? saved.filter(function (id) { return Boolean(exhibits[id]); }) : [];
      } catch (error) { return []; }
    }

    function profileFromFields() {
      return {
        name: fields.name.value,
        relationship: fields.relationship.value,
        perspective: fields.perspective.value,
        goal: fields.goal.value,
        feedback: fields.feedback.value,
        moment: fields.moment.value,
        eventLine: fields.eventLine.value
      };
    }

    function storeProfile(profile) {
      try { localStorage.setItem(profileStorageKey, JSON.stringify(profile)); } catch (error) { /* Optional. */ }
    }

    function decisionSignature(profile, candidateId) {
      return JSON.stringify(engine.normalizeProfile(profile)) + '|' + String(candidateId || '');
    }

    function lastDecision() {
      return decisionHistory.length ? decisionHistory[decisionHistory.length - 1] : null;
    }

    function storeDecisions() {
      try { localStorage.setItem(decisionStorageKey, JSON.stringify(decisionHistory.slice(-8))); } catch (error) { /* Optional. */ }
    }

    function loadDecisions() {
      try {
        var saved = JSON.parse(localStorage.getItem(decisionStorageKey) || '[]');
        if (!Array.isArray(saved)) return;
        decisionHistory = saved.slice(-8).map(function (entry) {
          var profile = engine.normalizeProfile(entry && entry.profile);
          var mission = engine.createVisitMission(profile);
          var requested = entry && typeof entry.candidateId === 'string' ? entry.candidateId : '';
          var candidate = mission.strategies.filter(function (strategy) { return strategy.id === requested; })[0] || mission.strategies[0];
          return {
            profile: profile,
            candidateId: candidate.id,
            confirmedAt: entry && typeof entry.confirmedAt === 'string' ? entry.confirmedAt.slice(0, 40) : '已确认'
          };
        });
      } catch (error) { decisionHistory = []; }
    }

    function proposalChanges() {
      var previous = lastDecision();
      if (!previous || !activeVisitMission) return [];
      var changes = engine.diffMissions(previous.profile, activeVisitMission.profile);
      if (previous.candidateId !== activeCandidateId) {
        var previousMission = engine.createVisitMission(previous.profile);
        var previousStrategy = previousMission.strategies.filter(function (strategy) { return strategy.id === previous.candidateId; })[0];
        var activeStrategy = findStrategy(activeCandidateId);
        changes.push('待确认方案从“' + (previousStrategy ? previousStrategy.label : '上一方案') + '”切换到“' + (activeStrategy ? activeStrategy.label : '当前方案') + '”');
      }
      return changes;
    }

    function appendHistoryLine(decision, index) {
      if (!decisionHistoryList) return;
      var mission = engine.createVisitMission(decision.profile);
      var strategy = mission.strategies.filter(function (item) { return item.id === decision.candidateId; })[0] || mission.strategies[0];
      var item = document.createElement('li');
      var top = document.createElement('div');
      var version = document.createElement('span');
      var time = document.createElement('small');
      var title = document.createElement('strong');
      var copy = document.createElement('p');
      version.textContent = 'V' + String(index + 1) + ' · ' + mission.feedbackLabel;
      time.textContent = decision.confirmedAt;
      title.textContent = strategy.label + ' · ' + strategy.title;
      copy.textContent = strategy.sentence + ' 取舍：' + strategy.tradeoff;
      top.appendChild(version);
      top.appendChild(time);
      item.appendChild(top);
      item.appendChild(title);
      item.appendChild(copy);
      if (index > 0) {
        var previous = decisionHistory[index - 1];
        var changes = engine.diffMissions(previous.profile, decision.profile);
        if (previous.candidateId !== decision.candidateId) changes.push('人工重新选择了方案');
        var delta = document.createElement('em');
        delta.textContent = '相比 V' + String(index) + '：' + (changes.length ? changes.join('；') : '输入与方案没有结构性变化');
        item.appendChild(delta);
      }
      decisionHistoryList.appendChild(item);
    }

    function renderDecisionLedger() {
      var previous = lastDecision();
      var currentSignature = activeVisitMission ? decisionSignature(activeVisitMission.profile, activeCandidateId) : '';
      var previousSignature = previous ? decisionSignature(previous.profile, previous.candidateId) : '';
      var isConfirmed = Boolean(previous && currentSignature === previousSignature);
      if (isConfirmed) {
        confirmedCandidateId = previous.candidateId;
        confirmedAt = previous.confirmedAt;
      } else {
        confirmedCandidateId = '';
        confirmedAt = '';
      }
      renderConfirmation(findStrategy(activeCandidateId));

      if (decisionHistoryList) {
        decisionHistoryList.textContent = '';
        if (!decisionHistory.length) {
          var empty = document.createElement('li');
          var emptyTitle = document.createElement('span');
          var emptyCopy = document.createElement('p');
          empty.className = 'is-empty';
          emptyTitle.textContent = '尚无版本';
          emptyCopy.textContent = '确认第一条路径后，这里会留下 V1 的方案、取舍与下一句。';
          empty.appendChild(emptyTitle);
          empty.appendChild(emptyCopy);
          decisionHistoryList.appendChild(empty);
        } else decisionHistory.forEach(appendHistoryLine);
      }

      var changes = proposalChanges();
      var hasProposal = Boolean(previous && !isConfirmed);
      if (versionProposal) versionProposal.hidden = !hasProposal;
      if (proposalVersion && hasProposal) proposalVersion.textContent = 'V' + String(decisionHistory.length + 1) + ' · 等待确认';
      if (proposalDiff && hasProposal) {
        proposalDiff.textContent = '';
        if (!changes.length) changes.push('输入或方案尚未产生可见的结构性差异');
        changes.forEach(function (change) {
          var item = document.createElement('li');
          item.textContent = change;
          proposalDiff.appendChild(item);
        });
      }
      return { confirmed: isConfirmed, proposal: hasProposal, changes: changes };
    }

    function renderRoute(mission) {
      var buttons = list('button', route);
      mission.recommendedIds.forEach(function (id, index) {
        var button = buttons[index];
        var item = exhibits[id];
        if (!button || !item) return;
        button.setAttribute('data-route-id', id);
        button.querySelector('i').textContent = index < 9 ? '0' + String(index + 1) : String(index + 1);
        button.querySelector('strong').textContent = item.original;
        button.querySelector('small').textContent = item.wing;
      });
      list('.collection-card').forEach(function (card) {
        var rank = mission.recommendedIds.indexOf(card.getAttribute('data-id'));
        card.classList.toggle('is-recommended', rank >= 0);
        if (rank >= 0) card.setAttribute('data-recommendation-rank', String(rank + 1));
        else card.removeAttribute('data-recommendation-rank');
      });
    }

    function findStrategy(id) {
      if (!activeVisitMission || !Array.isArray(activeVisitMission.strategies)) return null;
      return activeVisitMission.strategies.filter(function (strategy) { return strategy.id === id; })[0] || activeVisitMission.strategies[0];
    }

    function renderConfirmation(strategy) {
      if (!strategy) return;
      if (confirmationTitle) confirmationTitle.textContent = strategy.label + ' · ' + strategy.title;
      if (confirmationSentence) confirmationSentence.textContent = strategy.sentence;
      if (confirmationTradeoff) confirmationTradeoff.textContent = '你将承担的取舍：' + strategy.tradeoff;
      outputs.nextSentence.textContent = strategy.sentence;
      if (confirmation) confirmation.classList.toggle('is-confirmed', confirmedCandidateId === strategy.id);
      if (downloadButton) downloadButton.disabled = confirmedCandidateId !== strategy.id;
      if (confirmButton) confirmButton.textContent = confirmedCandidateId === strategy.id ? '已确认这条路径' : '确认采用这条路径';
      if (confirmationStatus) confirmationStatus.textContent = confirmedCandidateId === strategy.id ? '确认完成。沟通档案已可下载；更改任何线索后需要重新确认。' : '尚未确认。你仍可以切换候选路径。';
    }

    function chooseStrategy(id, preserveConfirmation) {
      var strategy = findStrategy(id);
      if (!strategy) return;
      activeCandidateId = strategy.id;
      if (!preserveConfirmation) {
        confirmedCandidateId = '';
        confirmedAt = '';
      }
      list('.strategy-card', candidates).forEach(function (card) {
        var selected = card.getAttribute('data-strategy-id') === strategy.id;
        card.classList.toggle('is-selected', selected);
        card.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });
      renderConfirmation(strategy);
    }

    function renderStrategies(mission) {
      if (!candidates || !Array.isArray(mission.strategies)) return;
      var cards = list('.strategy-card', candidates);
      mission.strategies.forEach(function (strategy, index) {
        var card = cards[index];
        if (!card) return;
        var visual = window.MuseumVisuals ? window.MuseumVisuals.getExhibitVisual(strategy.exhibitId, strategy.phase) : null;
        card.setAttribute('data-strategy-id', strategy.id);
        card.querySelector('figcaption').textContent = '路线 0' + String(index + 1) + ' · ' + strategy.exhibitId;
        card.querySelector('[data-candidate-label]').textContent = strategy.label;
        card.querySelector('[data-candidate-title]').textContent = strategy.title;
        card.querySelector('[data-candidate-fit]').textContent = strategy.fit;
        card.querySelector('[data-candidate-tradeoff]').textContent = '取舍 · ' + strategy.tradeoff;
        if (visual) {
          var image = card.querySelector('img');
          image.src = visual.asset;
          image.alt = visual.alt;
        }
      });
      activeCandidateId = mission.strategies[0].id;
      confirmedCandidateId = '';
      confirmedAt = '';
      chooseStrategy(activeCandidateId, true);
    }

    function render(save) {
      var mission = engine.createVisitMission(profileFromFields());
      activeVisitMission = mission;
      outputs.story.textContent = mission.story;
      outputs.wing.textContent = mission.recommendedWing + '优先';
      outputs.conflict.textContent = mission.conflict;
      outputs.choice.textContent = mission.choice;
      outputs.outcome.textContent = mission.outcome;
      outputs.review.textContent = mission.reviewPrompt;
      outputs.feedback.textContent = mission.feedbackSummary;
      outputs.nextSentence.textContent = mission.nextSentence;
      outputs.question.textContent = mission.observationQuestion;
      outputs.speaker.textContent = mission.perspectives.speaker;
      outputs.listener.textContent = mission.perspectives.listener;
      outputs.shared.textContent = mission.perspectives.shared;
      renderRoute(mission);
      renderStrategies(mission);
      if (save) storeProfile(mission.profile);
      document.dispatchEvent(new CustomEvent('museum:mission-change', { detail: mission }));
      var ledgerState = renderDecisionLedger();
      if (status && save) {
        if (ledgerState.proposal) {
          status.textContent = '已形成 V' + String(decisionHistory.length + 1) + ' 提案：' + ledgerState.changes.join('；') + '。再次确认前，上一版本保持不变。';
        } else if (ledgerState.confirmed) {
          status.textContent = '当前线索与已确认版本一致，可以继续使用或下载档案。';
        } else {
          status.textContent = '已根据这次关系、视角与目标生成候选路径；比较取舍后再确认。';
        }
      }
    }

    function loadSaved() {
      try {
        var profile = JSON.parse(localStorage.getItem(profileStorageKey) || 'null');
        if (profile) {
          var normalized = engine.normalizeProfile(profile);
          fields.name.value = normalized.name;
          fields.relationship.value = normalized.relationship;
          fields.perspective.value = normalized.perspective;
          fields.goal.value = normalized.goal;
          fields.feedback.value = normalized.feedback;
          fields.moment.value = normalized.moment;
          fields.eventLine.value = normalized.eventLine;
        }
        var savedNote = localStorage.getItem(noteStorageKey);
        if (savedNote) note.value = savedNote;
      } catch (error) { /* Local restoration is optional. */ }
    }

    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener(key === 'name' || key === 'moment' || key === 'eventLine' ? 'input' : 'change', function () { render(true); });
    });

    if (candidates) candidates.addEventListener('click', function (event) {
      var card = event.target.closest('[data-strategy-id]');
      if (!card) return;
      chooseStrategy(card.getAttribute('data-strategy-id'), false);
      var ledgerState = renderDecisionLedger();
      if (status) status.textContent = ledgerState.proposal ? '新的人工选择已进入 V' + String(decisionHistory.length + 1) + ' 提案，上一版本尚未被替换。' : '候选路径已切换。请查看取舍，再由你确认是否采用。';
    });

    if (confirmButton) confirmButton.addEventListener('click', function () {
      var strategy = findStrategy(activeCandidateId);
      if (!strategy) return;
      var previous = lastDecision();
      var signature = decisionSignature(activeVisitMission.profile, strategy.id);
      if (!previous || signature !== decisionSignature(previous.profile, previous.candidateId)) {
        confirmedAt = new Date().toLocaleString('zh-CN', { hour12: false });
        decisionHistory.push({
          profile: engine.normalizeProfile(activeVisitMission.profile),
          candidateId: strategy.id,
          confirmedAt: confirmedAt
        });
        decisionHistory = decisionHistory.slice(-8);
        storeDecisions();
      } else confirmedAt = previous.confirmedAt;
      confirmedCandidateId = strategy.id;
      renderDecisionLedger();
      if (status) status.textContent = 'V' + String(decisionHistory.length) + ' 已确认“' + strategy.label + '”。档案会同时保留此前版本和本次决定。';
    });

    route.addEventListener('click', function (event) {
      var button = event.target.closest('[data-route-id]');
      if (!button) return;
      document.dispatchEvent(new CustomEvent('museum:open-exhibit', { detail: { id: button.getAttribute('data-route-id'), scroll: true } }));
    });

    if (startButton) startButton.addEventListener('click', function () {
      if (!activeVisitMission) return;
      document.dispatchEvent(new CustomEvent('museum:open-exhibit', { detail: { id: activeVisitMission.recommendedIds[0], scroll: true } }));
    });

    if (saveButton) saveButton.addEventListener('click', function () {
      try { localStorage.setItem(noteStorageKey, note.value.trim()); } catch (error) { /* Optional. */ }
      if (status) status.textContent = note.value.trim() ? '这句话已加入本次沟通档案，可以继续修改。' : '这句话已从本次档案移除。';
    });

    if (downloadButton) downloadButton.addEventListener('click', function () {
      if (!confirmedCandidateId) {
        if (status) status.textContent = '请先比较候选路径并确认一条，再下载沟通档案。';
        return;
      }
      var receipt = engine.buildReconciliationArchive({
        profile: activeVisitMission ? activeVisitMission.profile : profileFromFields(),
        visitedIds: visitedIds,
        note: note.value,
        candidateId: confirmedCandidateId,
        confirmedAt: confirmedAt,
        history: decisionHistory
      });
      downloadText('误会博物馆-' + (activeVisitMission ? activeVisitMission.profile.name : '参观者') + '-沟通与和解档案.md', receipt, 'text/markdown');
      if (status) status.textContent = '沟通档案已下载，包含事件底稿、多视角、人的确认、取舍与下一轮复盘。';
    });

    document.addEventListener('museum:visit-change', function (event) {
      visitedIds = event.detail && Array.isArray(event.detail.visitedIds) ? event.detail.visitedIds.slice() : visitedIds;
    });

    loadSaved();
    loadDecisions();
    visitedIds = readVisited();
    render(false);
  }

  function registerOfflineCache() {
    if (!('serviceWorker' in navigator) || window.location.protocol !== 'https:') return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () { /* The site works without offline cache. */ });
    });
  }

  function init() {
    root.classList.add('enhanced');
    setupHeroSequence();
    setupTextReveal();
    setupReveal();
    setupScrollState();
    setupNavigationState();
    setupLens();
    setupCollection();
    setupLab();
    setupCardGenerator();
    setupVisitorMission();
    registerOfflineCache();
  }

  try {
    init();
  } catch (error) {
    list('.reveal-pending').forEach(function (item) {
      item.classList.remove('reveal-pending');
      item.classList.add('is-visible');
    });
    var heroCopy = document.querySelector('[data-hero-sequence]');
    if (heroCopy) heroCopy.classList.add('is-entered');
    list('[data-text-reveal]').forEach(function (heading) { heading.classList.add('is-text-visible'); });
    root.classList.add('enhancement-failed');
  }
}());
