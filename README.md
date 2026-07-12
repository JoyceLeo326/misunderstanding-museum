# Intent Misunderstanding Museum

> Independent Xiaohongshu content growth concept · 独立小红书内容增长概念项目

**Independent Concept** · **No Real Business Data** · **Not Affiliated with Intent**

## Live site

- Vercel: [`https://intent-misunderstanding-museum.vercel.app/`](https://intent-misunderstanding-museum.vercel.app/)
- GitHub: [`JoyceLeo326/intent-misunderstanding-museum`](https://github.com/JoyceLeo326/intent-misunderstanding-museum)
- Four-page case study: [`assets/intent-misunderstanding-museum-case-study.pdf`](https://intent-misunderstanding-museum.vercel.app/assets/intent-misunderstanding-museum-case-study.pdf)

## Project status

Concept only. No campaign has been launched, no user data has been collected, and no performance result is claimed.

本项目由刘佳锐独立完成，用于展示针对Intent小红书内容运营岗位的内容洞察、品牌内容IP、UGC、KOC与增长实验设计能力。项目未受Intent、Ultra或其他相关主体委托，未参与Intent实际运营，也未接触任何内部数据。

仓库只包含公开案例项目。个人简历、联系方式、投递邮件、其他经历材料及原始文件不在仓库中，也不会通过GitHub Pages发布。

## One-line concept

**Intent误会博物馆**收藏那些“每个字都懂了，却还是误会了”的跨文化瞬间。

核心句：

> 语言可以被翻译，关系需要被理解。

Intent提供AI实时翻译，让不同语言的人继续聊天；内容项目不宣称Intent能够识别情绪、读取潜台词或保证消除误会。

## Why this concept

“跨文化故事”是宽泛内容方向，“误会博物馆”则是可被识别、投稿和持续连载的品牌容器：

1. **具体**：每期围绕一句原话、一次误读和一次澄清。
2. **可参与**：用户不是被要求“评价功能”，而是“捐出一件误会藏品”。
3. **可扩展**：关系、海外生活、K-pop同好与网络语境都能成为固定展厅。
4. **产品自然**：Intent只在“双方继续把话说清楚”的真实节点出现。
5. **可测试**：同一IP可以比较封面、标题、人群、产品露出与CTA。

## Concept deliverables

These are deliverable counts, not performance results.

| Deliverable | Quantity | Purpose |
|---|---:|---|
| Brand content IP | 1 | Build a memorable and repeatable content container |
| Content wings | 4 | Separate audience, emotional tension and content task |
| Seed topic cards | 12 | Demonstrate a launch-ready editorial pipeline |
| Hero content mockup | 1 | Show cover, conflict, product role and CTA |
| UGC participation flow | 1 | Turn comments into permissioned content supply |
| Proposed creator framework | 1 | Define KOC roles, screening and content boundaries |
| Single-variable tests | 4 | Connect content signals to product activation |
| Content safety checklist | 1 | Protect privacy and avoid cultural stereotyping |

## Information architecture

1. Brand proposition
2. Four museum wings
3. Hero exhibit MIS-001
4. UGC donation flow
5. Proposed KOC brief
6. Launch and test framework
7. Ethics and privacy boundaries
8. Project status and disclaimer

## Four museum wings

| Wing | Audience | Main tension | Primary content objective |
|---|---|---|---|
| Relationship Wing | Cross-cultural couples and families | Care, distance, conflict and subtext | Comments and shares |
| Life Abroad Wing | International students and overseas Chinese | Etiquette, identity and daily habits | Search and saves |
| Fandom Wing | K-pop and multilingual interest groups | Slang, abbreviations and platform tone | Community distribution |
| Internet Context Wing | Cross-platform culture users | Meme migration and tonal shift | Timeliness and brand relevance |

## Content system

Every exhibit follows the same editorial structure:

`Original line → What the other person heard → What was later understood → Community annotation`

The first twelve seed topics and their intended formats are documented in [`docs/02-content-system.md`](docs/02-content-system.md).

## Hero exhibit

MIS-001 uses the Chinese greeting “吃了吗？” as a fictional composite story. It shows a phrase that can be translated correctly while its relational function still needs explanation.

- Full writing sample: [`docs/03-hero-note.md`](docs/03-hero-note.md)
- Status: fictional composite, not a real user testimonial

## UGC and creator design

The public website includes a non-persistent donation-form demo. It does not upload, store or process input.

In a real campaign, every submission would require:

- ownership and permission checks;
- privacy removal and anonymization;
- factual clarification;
- cultural stereotype review;
- editorial approval before publishing.

The full participation flow, creator roles and one-page brief are in [`docs/04-ugc-koc-playbook.md`](docs/04-ugc-koc-playbook.md).

## Testing framework

The project does not invent metrics. It defines hypotheses, variables and decision rules before results exist.

Main test groups:

1. relationship conflict vs. cultural knowledge entry;
2. natural product appearance vs. first-screen feature explanation;
3. couple KOC vs. language KOC;
4. comment submission vs. private-message trial CTA.

See [`docs/05-measurement-plan.md`](docs/05-measurement-plan.md).

## Ethics and privacy

The project separates four things that content portfolios often blur:

- actual product capability;
- personal cultural experience;
- fictional content mockup;
- real user story and business result.

The publication checklist is in [`docs/06-content-safety.md`](docs/06-content-safety.md).

## Repository structure

```text
.
├── index.html                 # GitHub Pages case site
├── styles.css                # responsive visual system
├── script.js                 # reveal, demo form and copy interaction
├── assets/
│   ├── favicon.svg
│   ├── meta-og-cover.svg
│   └── intent-misunderstanding-museum-case-study.pdf
├── docs/
│   ├── README.md
│   ├── 01-brand-strategy.md
│   ├── 02-content-system.md
│   ├── 03-hero-note.md
│   ├── 04-ugc-koc-playbook.md
│   ├── 05-measurement-plan.md
│   └── 06-content-safety.md
└── research/
    ├── audience-hypotheses.md
    └── content-hypotheses.md
```

## Technology

- Semantic HTML5
- Responsive CSS without a framework
- Vanilla JavaScript for progressive enhancement
- No analytics, cookies, backend, database or external font request
- GitHub Pages compatible; no build step required

## Accessibility

- semantic heading and landmark structure;
- visible keyboard focus and skip link;
- readable color contrast;
- reduced-motion support;
- labels for every form field;
- JavaScript interactions retain textual fallbacks.

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

### Vercel (primary)

The repository includes `vercel.json` with security headers and static-asset caching. From the project root:

```bash
vercel --prod
```

Production is live at [`intent-misunderstanding-museum.vercel.app`](https://intent-misunderstanding-museum.vercel.app/). The project is a static deployment with no backend, analytics or stored form data.

### GitHub Pages (fallback)

The site is designed for GitHub Pages from the default branch root. After pushing:

1. open repository **Settings → Pages**;
2. choose **Deploy from a branch**;
3. select `main` and `/ (root)`;
4. save and wait for the Pages build.

## Disclaimer

Intent名称、标识及相关品牌资产归其权利人所有。本项目只在非商业招聘作品集语境中作概念引用，不代表任何官方合作、认可或背书。Hero故事为展示内容方法而创作的虚构复合样稿；若未来改用真实故事，必须重新完成授权、匿名化与事实核查。

## Version history

- `v1.0 · 2026-07` — Brand proposition, four wings, Hero exhibit, UGC/KOC framework, test plan and public case site.
