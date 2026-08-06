# 08 · Story asset manifest

**Status:** v1.0 · 24 production assets integrated

## 来源与处理

24 张图片均为 AI 辅助生成的编辑插画，人物与场景是虚构复合，不是新闻照片、真实投稿或对实际人物的记录。发布文件全部保存在 `assets/story/`，统一为 1440 × 960 WebP；总计约 2.9 MiB，单张不超过 300 KiB。页面不依赖境外图片源或运行时图像接口。

## 两联画清单

| 藏品 | 误读发生 | 补上语境 | 叙事转折 |
| --- | --- | --- | --- |
| MIS-001 吃了吗 | `mis-001-misread.webp` | `mis-001-context.webp` | 饮食回答 → 说明惦记 |
| MIS-002 你先忙吧 | `mis-002-misread.webp` | `mis-002-context.webp` | 对话结束 → 重新确认时间与感受 |
| MIS-003 ㅋㅋㅋ | `mis-003-misread.webp` | `mis-003-context.webp` | 礼貌或真笑 → 共享聊天节奏 |
| MIS-004 改天约 | `mis-004-misread.webp` | `mis-004-context.webp` | 模糊未来 → 具体日期 |
| MIS-005 随便 | `mis-005-misread.webp` | `mis-005-context.webp` | 选择压力 → 缩小选项与说出偏好 |
| MIS-006 我没事 | `mis-006-misread.webp` | `mis-006-context.webp` | 进退两难 → 空间或陪伴的可拒绝选择 |
| MIS-007 多穿点 | `mis-007-misread.webp` | `mis-007-context.webp` | 唠叨 → 远距离照顾 |
| MIS-008 有空来玩 | `mis-008-misread.webp` | `mis-008-context.webp` | 客气收尾 → 确认并赴约 |
| MIS-009 入坑 | `mis-009-misread.webp` | `mis-009-context.webp` | 危险字面 → 加入兴趣共同体 |
| MIS-010 我担杀疯了 | `mis-010-misread.webp` | `mis-010-context.webp` | 暴力字面 → 对舞台表现的高浓度赞美 |
| MIS-011 收到 | `mis-011-misread.webp` | `mis-011-context.webp` | 冷淡距离 → 说明沟通节奏并补温度 |
| MIS-012 哈哈长度 | `mis-012-misread.webp` | `mis-012-context.webp` | 难以判读 → 一起标注并真诚发笑 |

## 产品接入

- 首屏语境展签：MIS-001 至 MIS-004 可切换两态；
- 首件藏品：MIS-001 两联画完整展开；
- 馆藏目录：12 张误读图作为每件藏品的故事入口；
- 馆藏详情：12 组图片均可在两态之间切换，切换同时更新替代文本、展签与来源；
- Service Worker：只预缓存品牌标志与首张首屏图，其余图片按访问缓存，控制首次加载体积。

## 发布检查

`tests/visual-story.test.js` 会拒绝缺图、重复路径、错误扩展名、超过 300 KiB、缺少叙事说明或少于 12 组两联画的提交。
