# Misunderstanding Museum · 误会博物馆

> Cross-cultural content IP · UGC curation · KOC collaboration · Growth experiments

**Content IP** · **Editorial System** · **Growth Experiment Design**

## Live site

- Vercel: [`https://misunderstanding-museum.vercel.app/`](https://misunderstanding-museum.vercel.app/)
- GitHub: [`JoyceLeo326/misunderstanding-museum`](https://github.com/JoyceLeo326/misunderstanding-museum)
- Four-page case study: [`assets/misunderstanding-museum-case-study.pdf`](https://misunderstanding-museum.vercel.app/assets/misunderstanding-museum-case-study.pdf)

## Project status

`v1.1 · Editorial system complete`

本项目由刘佳锐独立完成，已形成可逐项检查的内容增长执行资产：4类固定内容展厅、12张首批选题卡、7页Hero图文结构、5步UGC策展流程、4类KOC内容角色、6维创作者筛选表、4组单变量实验和8项内容安全边界。

## One-line concept

**误会博物馆**收藏那些“每个字都懂了，却还是误会了”的跨文化瞬间。

核心句：

> 语言可以被翻译，关系需要被理解。

## Why this concept

“跨文化故事”是宽泛内容方向，“误会博物馆”则是可被识别、投稿和持续连载的品牌容器：

1. **具体**：每期围绕一句原话、一次误读和一次澄清。
2. **可参与**：用户不是被要求“评价功能”，而是“捐出一件误会藏品”。
3. **可扩展**：关系、海外生活、K-pop同好与网络语境都能成为固定展厅。
4. **可循环**：评论与投稿经过策展后回流选题库，形成下一轮内容。
5. **可测试**：同一IP可以比较封面、标题、创作者与参与入口。

## Concept deliverables

| Deliverable | Quantity | Purpose |
|---|---:|---|
| Brand content IP | 1 | Build a memorable and repeatable content container |
| Content wings | 4 | Separate audience, emotional tension and content task |
| Seed topic cards | 12 | Demonstrate a launch-ready editorial pipeline |
| Hero content story | 1 | Show cover, conflict, context turn and CTA |
| UGC participation flow | 1 | Turn comments into permissioned content supply |
| Creator framework | 1 | Define KOC roles, screening and content boundaries |
| Single-variable tests | 4 | Connect content signals to editorial decisions |
| Content safety checklist | 1 | Protect privacy and avoid cultural stereotyping |

## Information architecture

1. Brand proposition
2. Four museum wings
3. Hero exhibit MIS-001
4. UGC donation flow
5. KOC brief
6. Launch and test framework
7. Ethics and privacy boundaries
8. Verifiable deliverable inventory

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

MIS-001 uses the Chinese greeting “吃了吗？” as an editorial composite story. It shows a phrase that can be translated correctly while its relational function still needs explanation.

- Full writing sample: [`docs/03-hero-note.md`](docs/03-hero-note.md)

## UGC and creator design

Every submitted story moves through five editorial gates:

- permission check;
- privacy handling;
- factual confirmation;
- anonymous curation;
- return to the topic library.

The full participation flow, creator roles and one-page brief are in [`docs/04-ugc-koc-playbook.md`](docs/04-ugc-koc-playbook.md).

## Testing framework

The project defines hypotheses, variables, metric layers and decision rules before publishing so every result can map to a concrete next action.

Main test groups:

1. relationship conflict vs. cultural knowledge entry;
2. museum-label cover vs. conflict-led cover;
3. couple KOC vs. language KOC;
4. comment submission vs. private-message story submission.

See [`docs/05-measurement-plan.md`](docs/05-measurement-plan.md).

## Ethics and privacy

The project distinguishes personal cultural experience, editorial samples, permissioned user stories and AI-generated visual material.

The publication checklist is in [`docs/06-content-safety.md`](docs/06-content-safety.md).

## Repository structure

```text
.
├── index.html                 # GitHub Pages case site
├── styles.css                # responsive visual system
├── script.js                 # reveal, exhibit rotation, card generator and copy interaction
├── assets/
│   ├── favicon.svg
│   ├── meta-og-cover.svg
│   └── misunderstanding-museum-case-study.pdf
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

Production is live at [`misunderstanding-museum.vercel.app`](https://misunderstanding-museum.vercel.app/). The project is a static deployment with no backend, analytics or stored form data.

### GitHub Pages (fallback)

The site is designed for GitHub Pages from the default branch root. After pushing:

1. open repository **Settings → Pages**;
2. choose **Deploy from a branch**;
3. select `main` and `/ (root)`;
4. save and wait for the Pages build.

## Version history

- `v1.1 · 2026-07` — Reframed the project inventory around verifiable execution assets and strengthened the public output dashboard.
- `v1.0 · 2026-07` — Brand proposition, four wings, Hero exhibit, UGC/KOC framework, test plan and public case site.
