# 误会博物馆

> 语言可以被翻译，关系需要被理解。

误会博物馆是一座收藏跨文化话语与关系语境的线上博物馆。每件藏品从一句原话出发，拆开字面、误读、语境与重新靠近彼此的下一句话。

## 访问

- Vercel：<https://misunderstanding-museum.vercel.app/>
- GitHub Pages 备用入口：<https://joyceleo326.github.io/misunderstanding-museum/>
- GitHub：<https://github.com/JoyceLeo326/misunderstanding-museum>
- 四页策展档案：[`assets/misunderstanding-museum-case-study.pdf`](assets/misunderstanding-museum-case-study.pdf)

## 馆内内容

- 4 个固定展厅：关系、异乡生活、同好暗号、网络语境；
- 12 件可筛选馆藏，每件都有字面、语境与共同注释问题；
- 本次参观进度、已阅标记、动态回执与三轴“编辑语境坐标”；
- “只看字面 / 补上语境”双态互动展签；
- 四层藏品解剖：原话、字面、语境、下一句；
- 本地藏品卡生成器：实时预览、复制、草稿恢复，不上传表单内容；
- 策展室：内容结构、共同策展、观察与复盘；
- 馆藏公约：授权、匿名、去刻板印象与撤回机制。

## 移动端与可访问性

- mobile-first 响应式布局，覆盖 320px 至桌面宽度；
- iPhone 安全区、`100svh / 100dvh`、16px 表单输入与至少 44px 触控区；
- 移动端四项底部导览，桌面端使用紧凑顶部导航；
- 渐进增强：脚本或 IntersectionObserver 失败时，正文仍默认可见；
- 键盘焦点、语义化地标、标签、状态播报与 reduced-motion 支持；
- 进入、切换、生成与已选藏品均有克制微动效，并自动尊重 reduced-motion；
- Service Worker 缓存已访问页面与核心资源，改善回访和弱网体验。

## 本地运行

无需构建工具：

```bash
python3 -m http.server 8000
```

打开 <http://localhost:8000>。

## 文件结构

```text
.
├── index.html
├── styles.css
├── script.js
├── manifest.webmanifest
├── sw.js
├── vercel.json
├── assets/
├── docs/
└── research/
```

## 技术边界

- Semantic HTML、原生 CSS 与 Vanilla JavaScript；
- 不依赖外部字体、前端框架、分析脚本、Cookie、数据库或后端；
- 表单仅在当前设备生成和保存草稿；
- Vercel 与 GitHub Pages 均可直接托管。

## 策展文档

- [`docs/01-brand-strategy.md`](docs/01-brand-strategy.md)
- [`docs/02-content-system.md`](docs/02-content-system.md)
- [`docs/03-hero-note.md`](docs/03-hero-note.md)
- [`docs/04-ugc-koc-playbook.md`](docs/04-ugc-koc-playbook.md)
- [`docs/05-measurement-plan.md`](docs/05-measurement-plan.md)
- [`docs/06-content-safety.md`](docs/06-content-safety.md)

## 版本

- `v2.1 · 2026-07`：新增真实会话态参观进度、动态回执、馆藏已阅标记与编辑语境坐标，补强移动端信息层次与微动效。
- `v2.0 · 2026-07`：重构参观叙事与视觉系统，补齐 12 件可交互馆藏、移动端导览、本地藏品卡生成、渐进增强和弱网回访缓存。
- `v1.1 · 2026-07`：完善四个展厅、UGC 策展、创作者协作与观察框架。
