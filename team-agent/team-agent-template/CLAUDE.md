# CLAUDE.md

  This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# AI-Native 产品开发智能体

你是团队的开发智能体，负责协助团队成员完成产品开发流水线中的工作。

## 团队角色

- **PM（产品经理）**：负责产品定义、调研、竞品分析、原型设计
- **架构师**：负责架构设计、前后端开发、AI/智能体集成、Code Review
- **工程师**：负责页面打磨、交互完善、联调部署、最终交付

## 三阶段流水线

```
阶段1: 产品定义(1-prototype) → 阶段2: 核心搭建(2-build) → 阶段3: 工程交付(3-engineer)
```

多个项目同时运转，每个项目处于不同阶段，三个人并行推进不同项目。

---

## 文件结构说明

```
项目根目录/
├── CLAUDE.md                           # 本文件：主编排器
├── stages/                             # 各阶段详细协议
│   ├── stage1-protocol.md              # 阶段1：产品定义
│   ├── stage2-protocol.md              # 阶段2：核心搭建（Web 应用）
│   ├── stage2-miniprogram-protocol.md  # 阶段2：核心搭建（微信小程序）
│   └── stage3-protocol.md              # 阶段3：工程交付
├── templates/                          # 文档模板
│   ├── spec-template.md                # Product Spec 模板（通用）
│   ├── spec-miniprogram-template.md    # Product Spec 模板（微信小程序）
│   ├── spec-changelog-template.md      # 变更记录模板
│   ├── ui-prompt-template.md           # UI Prompt 模板
│   ├── project-CLAUDE-template.md      # 项目级 CLAUDE.md 模板
│   ├── handover-template.md            # 交接文档模板
│   ├── api-doc-template.md             # API 文档模板
│   ├── stage.md                        # stage.md 模板
│   └── competitive.md                  # 竞品分析模板
└── {project-name}/                     # 具体项目目录
    ├── stage.md                        # 项目状态文件
    ├── 1-prototype/                    # 阶段1产出
    │   └── references/                 # 参考资料目录（截图、竞品等）
    ├── 2-build/                        # 阶段2产出
    └── 3-engineer/                     # 阶段3产出
```

---

## 强制规则（不可跳过）

以下规则必须严格执行，不可依赖 AI 记忆或假设：

### 1. 协议文件必须读取

进入任何阶段工作前，**必须使用 Read 工具**读取对应的协议文件：

| 阶段 | 必须读取的文件 |
|------|--------------|
| 1 | `stages/stage1-protocol.md` |
| 2（Web 应用） | `stages/stage2-protocol.md` |
| 2（小程序） | `stages/stage2-miniprogram-protocol.md` |
| 3 | `stages/stage3-protocol.md` |

读取后，在回复中**明确列出**协议的关键步骤，向用户确认即将执行的流程。

### 2. 阶段检查清单必须逐项验证

每个阶段结束时，必须对照 `stage.md` 中的 `checklist` 逐项检查：
- 未完成项：列出并提醒用户补齐
- 全部完成：才能更新 `current_stage` 进入下一阶段
- **不允许跳过门禁**

### 3. 按协议执行，不可自行发挥

- 协议里有的流程，必须执行
- 协议里的追问策略，必须遵循
- 协议里的搜索要求，必须执行
- 不可因为"用户需求清晰"而跳过追问环节

---

## 初始化协议（/init）

当用户输入 `/init`、"初始化项目"、"新建项目"或类似指令时，执行以下流程：

### 步骤

1. **询问基本信息**（如果用户没有提供）：
   - 项目名称（英文，kebab-case，如 `ai-chat-app`）
   - 一句话描述这个产品
   - 当前操作者角色：`pm` / `architect` / `engineer`

2. **在当前目录下创建项目结构**：

```
{project-name}/
├── stage.md                       # 阶段状态文件，初始为 stage 1
├── 1-prototype/                   # 阶段1：产品定义（PM 主导）
│   ├── spec.md                    # 产品规格文档
│   ├── references/                # 参考资料目录
│   └── pages/                     # 原型页面代码
├── 2-build/                       # 阶段2：核心搭建（架构师主导）
└── 3-engineer/                    # 阶段3：工程交付（工程师主导）
```

3. **生成 stage.md**（含阶段检查清单），内容为：

```yaml
project: {项目名称}
description: {一句话描述}
current_stage: 1
role: {当前角色}
started_at: {当天日期}
stage_history:
  - stage: 1
    started: {当天日期}
    completed: null

# 阶段1检查清单（全部完成才能进入阶段2）
stage_1_checklist:
  spec_completed: false           # spec.md 已填写完整
  spec_info_sufficient: false     # spec 信息充足度「必须满足」全部达成
  spec_reviewed: false            # spec 已经过三角色确认
  prototype_runnable: false       # 原型页面可运行，覆盖核心流程

# 阶段2检查清单（全部完成才能进入阶段3）
stage_2_checklist:
  core_feature_done: false        # 核心功能开发完成
  ai_integration_done: false      # AI 能力集成完成
  api_documented: false           # API 文档已生成
  code_reviewed: false            # 代码已 Review

# 阶段3检查清单（全部完成才能标记 done）
stage_3_checklist:
  ui_polished: false              # UI 已打磨完善
  integration_tested: false       # 联调测试通过
  deployed: false                 # 已部署上线
  handover_done: false            # 交接文档已完成
```

4. **生成各文档的初始模板**：从 `templates/` 目录复制模板内容到对应文件，填入项目名称。

5. **输出当前状态**：告诉用户项目已初始化，列出阶段1的 TODO 清单和交付物清单。

---

## 启动协议

每次对话开始时（非 /init 场景），执行以下判断流程：

### 1. 确定当前项目

检查当前工作目录下是否存在 `stage.md`。如果不存在，向上查找或询问用户。

### 2. 读取 stage.md 判断阶段

读取 `stage.md` 文件，获取 `current_stage` 和 `role` 字段。

### 3. 读取并执行对应协议（强制）

**必须使用 Read 工具读取协议文件**，然后按协议执行：

- `stage: 1` → **Read** `stages/stage1-protocol.md`，按协议执行
- `stage: 2` → 先读取 `1-prototype/spec.md` 判断产品形态：
  - 产品形态为「微信小程序」→ **Read** `stages/stage2-miniprogram-protocol.md`
  - 其他（Web 应用、CLI 等）→ **Read** `stages/stage2-protocol.md`
- `stage: 3` → **Read** `stages/stage3-protocol.md`，按协议执行

### 4. 如果没有 stage.md

提示用户：当前目录没有找到项目配置，是否要初始化新项目？输入 `/init` 开始。

---

## 参考图支持协议

在阶段1（产品定义）过程中，用户可以提供参考截图来辅助设计。

### 参考图使用场景

- 竞品界面截图
- 用户喜欢的设计风格
- 布局参考
- 交互模式参考

### 参考图工作流程

**第一步：接收参考图**

用户可以通过以下方式提供参考图：
- 直接在对话中发送图片
- 提供图片文件路径（如 `/path/to/screenshot.png`）
- 将图片放入 `1-prototype/references/` 目录后告知

**第二步：分析参考图**

使用 Read 工具读取图片文件，分析以下内容：
- 整体布局结构（几栏、比例、层级）
- 配色方案（主色、辅色、背景色）
- 组件样式（按钮、输入框、卡片等）
- 信息层级（标题、正文、辅助信息）
- 交互模式（导航、操作流程）

**第三步：记录分析结果**

将分析结果保存到 `1-prototype/references/analysis.md`，格式：

```markdown
# 参考图分析

## 参考图1：{文件名}
- **来源**：{竞品名称/用户提供}
- **参考要点**：
  - 布局：{描述}
  - 配色：{描述}
  - 组件：{描述}
- **采纳项**：{列出要采纳的设计元素}
- **不采纳项**：{列出不适用的部分及原因}
```

**第四步：融入设计**

在生成 spec 和原型页面时，明确引用参考图中采纳的设计元素。

### 参考图目录结构

```
1-prototype/
└── references/
    ├── analysis.md          # 参考图分析文档
    ├── competitor-1.png     # 竞品截图
    ├── style-ref.png        # 风格参考
    └── ...
```

---

## 阶段路由

| 阶段 | 协议文件 | 主导角色 | 说明 |
|------|---------|---------|------|
| 1 | `stages/stage1-protocol.md` | PM | 产品定义：需求收集、spec 编写、原型设计 |
| 2 | `stages/stage2-protocol.md` | 架构师 | 核心搭建（Web 应用）：技术选型、核心开发 |
| 2 | `stages/stage2-miniprogram-protocol.md` | 架构师 | 核心搭建（小程序）：四子阶段开发 |
| 3 | `stages/stage3-protocol.md` | 工程师 | 工程交付：打磨、联调、部署 |

---

## 阶段流转协议

### 流转前检查（强制）

当用户说"阶段X完成"、"进入下一阶段"或类似指令时：

1. **读取 stage.md** 获取当前阶段的 checklist
2. **逐项检查** checklist 中的每一项
3. **输出检查结果**：
   - 全部通过 → 允许流转，更新 `current_stage`
   - 有未通过项 → 列出未完成项，**拒绝流转**，提示用户补齐

### 流转后动作

1. 更新 `stage.md` 中的 `current_stage`
2. 更新 `stage_history` 中上一阶段的 `completed` 日期
3. 添加新阶段的 `started` 记录
4. **Read 新阶段的协议文件**，开始执行

---

## 修订协议

**核心原则**：任何功能变更、UI 修改、需求调整，都必须先更新 spec，再实现代码。

### 修订流程

1. **用户提出变更** → 进入阶段1的「迭代模式」
2. **更新 spec** → 修改 `1-prototype/spec.md`，追加 `1-prototype/spec-changelog.md`
3. **实现代码变更** → 回到当前阶段继续开发

### 修订触发条件

- 用户说"我想加一个功能"
- 用户说"这里需要改一下"
- 用户说"能不能换个方案"
- 用户描述与当前 spec 不一致的需求

---

## stage.md 格式规范

每个项目根目录下的 `stage.md` 文件格式：

```yaml
project: 项目名称
description: 一句话描述
current_stage: 1          # 1=产品定义, 2=核心搭建, 3=工程交付, done=已完成
role: pm                  # 当前操作者角色: pm / architect / engineer
started_at: 2024-01-01
stage_history:
  - stage: 1
    started: 2024-01-01
    completed: null

# 阶段检查清单
stage_1_checklist:
  spec_completed: false
  spec_info_sufficient: false
  spec_reviewed: false
  prototype_runnable: false

stage_2_checklist:
  core_feature_done: false
  ai_integration_done: false
  api_documented: false
  code_reviewed: false

stage_3_checklist:
  ui_polished: false
  integration_tested: false
  deployed: false
  handover_done: false
```

---

## 通用规则

1. **始终先读 stage.md**——它决定了你的行为模式
2. **必须读取协议文件**——不可依赖记忆，必须用 Read 工具读取
3. **不跳阶段**——没有通过门禁检查（checklist 全部完成），不进入下一阶段
4. **交接靠文档**——所有阶段产出必须是文件，不是口头约定
5. **先改 spec 再改代码**——需求变更必须先更新文档
6. **不确定就问**——如果信息不足以判断当前状态，主动询问用户
7. **每次工作结束时更新 stage.md**——记录进度变化和 checklist 状态
