document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const figmaCaptureMode = window.location.hash.includes('figmacapture=');
if (figmaCaptureMode) document.documentElement.classList.add('figma-capture');
const revealItems = document.querySelectorAll('[data-reveal]');

revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
});

if (figmaCaptureMode || reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const siteHeader = document.querySelector('[data-header]');
const scrollProgress = document.querySelector('[data-scroll-progress]');
let scrollFrame = 0;

function updateScrollState() {
  scrollFrame = 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;
  if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
}

window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(updateScrollState);
}, { passive: true });
updateScrollState();

const exhibitStage = document.querySelector('[data-exhibit-stage]');
const exhibitNumber = document.querySelector('[data-exhibit-number]');
const exhibitWing = document.querySelector('[data-exhibit-wing]');
const exhibitOriginal = document.querySelector('[data-exhibit-original]');
const exhibitLiteral = document.querySelector('[data-exhibit-literal]');
const exhibitContext = document.querySelector('[data-exhibit-context]');
const exhibitSequence = [
  { number: '001', wing: 'LIFE ABROAD WING', original: '“吃了吗？”', literal: 'Have you eaten?', context: '今天过得怎么样？<br>有没有好好照顾自己？' },
  { number: '002', wing: 'RELATIONSHIP WING', original: '“你先忙吧”', literal: 'Take your time.', context: '我有点失落。<br>想让你再问一句。' },
  { number: '003', wing: 'FANDOM WING', original: '“ㅋㅋㅋ”', literal: 'Hahaha', context: '笑得多真，<br>数量和关系都在说话。' },
  { number: '004', wing: 'INTERNET CONTEXT WING', original: '“改天约”', literal: 'Another day.', context: '有时是礼貌收尾，<br>日期仍然没有出现。' }
];
let exhibitIndex = 0;

function rotateExhibit() {
  if (!exhibitStage) return;
  exhibitStage.classList.add('is-switching');
  window.setTimeout(() => {
    exhibitIndex = (exhibitIndex + 1) % exhibitSequence.length;
    const next = exhibitSequence[exhibitIndex];
    exhibitNumber.textContent = next.number;
    exhibitWing.textContent = next.wing;
    exhibitOriginal.textContent = next.original;
    exhibitLiteral.textContent = next.literal;
    exhibitContext.innerHTML = next.context;
    exhibitStage.classList.remove('is-switching');
  }, 230);
}

if (!reducedMotion && !figmaCaptureMode && exhibitStage) {
  window.setInterval(rotateExhibit, 3800);
}

const finePointer = window.matchMedia('(pointer: fine)').matches;
if (finePointer && !reducedMotion && !figmaCaptureMode) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--tilt-x', `${(-py * 4.5).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(px * 5.5).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

const demoForm = document.querySelector('[data-demo-form]');
const formStatus = document.querySelector('[data-form-status]');

if (demoForm && formStatus) {
  demoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = '流程预览完成：内容未上传、未保存。真实项目会先经过授权、匿名化与风险审核。';
    demoForm.reset();
  });
}

const copyButton = document.querySelector('[data-copy-template]');
const copyStatus = document.querySelector('[data-copy-status]');
const donationTemplate = `藏品名称：
当时的原话：
涉及语言：
我真正想表达：
对方当时怎样理解：
后来怎样解释清楚：
是否同意匿名收录：
是否拥有相关聊天与素材授权：`;

async function copyTemplate() {
  try {
    await navigator.clipboard.writeText(donationTemplate);
    copyStatus.textContent = '投稿模板已复制。';
  } catch (error) {
    copyStatus.textContent = '浏览器未允许自动复制，请从项目文档中手动复制模板。';
  }
}

if (copyButton && copyStatus) {
  copyButton.addEventListener('click', copyTemplate);
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];

if ('IntersectionObserver' in window && sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.toggleAttribute('aria-current', active);
    });
  }, { threshold: [0.25, 0.5, 0.75], rootMargin: '-18% 0px -55% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}
