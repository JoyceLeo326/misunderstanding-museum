# 05 · Measurement plan

**Test status:** NOT RUN

当前没有曝光、互动、安装、注册、CPI、ROI或产品激活数据。本文件只定义实验假设、指标口径和后续判断，不填写估计结果。

## First-month launch plan

### W0 · Observation and setup

- 拆解目标人群高互动内容的封面、首句、评论语言和分享动机。
- 建立12张种子选题卡、风险词表和投稿授权模板。
- 与产品团队确认实时翻译能力边界、落地页和可用埋点。
- 定义同一批次的发布时间、预算、人群和归因窗口。

### W1 · Brand opening

- 发布Hero藏品MIS-001及2个标题/封面变体。
- 评论区使用固定问题收集“原话”，不公开采集私密故事。
- 验证关系故事是否同时带来有效评论和产品主页访问。

### W2 · Creator relay

- 跨国情侣、海外生活、K-pop三类创作者同题共创。
- 不统一口吻，只统一“原话—误读—澄清—投稿邀请”。
- 比较不同创作者类型的评论质量、点击和有效首聊成本。

### W3 · UGC curation

- 对授权内容完成匿名化和事实确认。
- 发布“本周新入馆”，整理共同注释。
- 观察固定投稿模板是否提高有效UGC完成率。

### W4 · Amplify and learn

- 只选择自然互动质量较好的内容进入小额付费测试。
- 记录预算、时间、人群、创作者历史表现与节日等干扰因素。
- 将“内容信号—获客—产品激活”放在同一页判断。

## Hypotheses

- **H1** 关系故事型内容比功能说明型内容产生更多有效评论和收藏。
- **H2** 跨国情侣、海外生活和K-pop人群对不同故事入口的反应不同。
- **H3** 固定投稿模板比开放式“分享故事”更容易形成有效UGC。
- **H4** 产品在故事转折后出现，比首屏直接介绍功能更自然。
- **H5** “博物馆藏品”封面与强冲突大字封面的打开表现存在差异。

## Four primary A/B tests

| Test | Version A | Version B | Primary metric | Decision question |
|---|---|---|---|---|
| Content entry | Relationship conflict | Cultural knowledge | Open rate, meaningful comment rate | Story or knowledge for acquisition? |
| Product exposure | Natural appearance after conflict | Feature on first screen | Profile visit, activation | How to balance resonance and memory? |
| Creator type | Couple KOC | Language/culture KOC | CPE, effective first-chat cost | Authentic story or expert explanation? |
| CTA | Comment donation | Private-message trial | UGC completion, activation | Community or acquisition objective? |

## Test discipline

- 一次只改变一个主要变量。
- 同题自然内容至少复测，不使用单篇偶然波动下结论。
- 付费测试达到团队预设的最低点击或激活样本后再判断。
- 同时间窗、相似预算和相似人群比较素材。
- 获胜方案需要主指标改善，且有效评论质量与产品激活质量不得明显恶化。
- 每次实验记录版本、发布日期、创作者、预算、定向、归因窗和外部事件。

## Metric dictionary

正式执行前，所有公式与数据源都应由内容、投放、产品和数据团队共同确认。

### See

- Impressions
- Cover open rate or video three-second retention
- Source: Xiaohongshu content/ad platform

### Consume

- Reading time, completion, video completion
- Slide completion for multi-image posts if available
- Source: content platform

### Resonate

- Save rate, comment rate, share rate
- Meaningful comment rate: contains a story, question, context or submission; not a pure emoji
- Source: platform data plus sampled manual tagging

### Participate

- Valid UGC start rate
- Submission completion rate
- Permission-qualified submission count
- Community annotation count
- Source: comment/DM/form workflow

### Acquire

- Profile visit rate
- Landing-page CTR
- Install and registration rate
- CPI or cost per registration
- Source: tracked link, platform and app attribution

### Activate

- First real-time translation event
- First cross-language conversation
- Suggested “effective first chat”: a new user completes at least three alternating message rounds within 24 hours; final definition requires product-team validation
- Source: product analytics

### Retain

- D1/D7 repeat conversation
- Continued conversation with an existing contact
- Source: product analytics

## Suggested north-star bridge metric

For content acquisition evaluation, a possible bridge metric is:

> Effective first chats per 1,000 qualified content reads

or

> Cost per effective first chat

This connects content quality with a meaningful product action. It should only be used after the product team validates event definitions and attribution.

## Diagnostic rules

### High open, low saves/comments

Interpretation: cover or title wins, but the content delivers insufficient value or emotional truth.

Next action: keep the entry, rewrite the body, add specific context or a sharper question.

### High comments, low landing-page CTR

Interpretation: story resonates, but the product bridge is weak or arrives at the wrong moment.

Next action: make the real-time conversation scene clearer without turning the post into a feature demo.

### High landing CTR, low install

Interpretation: the content promise and landing-page promise may not match, or the page has friction.

Next action: preserve story continuity on the landing page and review technical/market access friction.

### High install, low effective first chat

Interpretation: acquisition is complete, but the new user does not immediately experience the core value.

Next action: review onboarding, conversation prompts and first-contact availability with the product team.

### High UGC count, low permission-qualified UGC

Interpretation: the activity is easy to join but does not produce publishable, safe material.

Next action: improve the template and permission explanation instead of chasing raw volume.

## Reporting format

Every weekly review should contain:

1. what was shipped;
2. what changed from the previous version;
3. primary and guardrail metrics;
4. sample and attribution limitations;
5. comment/UGC quality examples;
6. a clear keep, change or stop decision;
7. the next single variable to test.

No chart should display invented curves, percentages or testimonials.
