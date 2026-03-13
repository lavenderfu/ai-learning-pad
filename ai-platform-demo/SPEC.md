# 智创 AI 创作平台 - 运营配置规范文档

## 项目概述

智创是一个 AI 创作平台前端演示项目，支持运营人员通过配置文件动态管理页面内容，无需修改代码即可更新页面展示。

## 目录结构

```
ai-platform-demo/
├── index.html          # 首页
├── account.html        # 账户管理页
├── assets.html         # 我的资产页
├── style.css           # 全局样式
├── config.js           # 运营配置文件 ⭐
├── main.js             # 主逻辑文件
└── SPEC.md             # 本文档
```

---

## 配置文件说明 (config.js)

所有可配置项均在 `config.js` 文件中的 `CONFIG` 对象内定义。

---

### 1. 顶部公告栏 `notices`

滚动公告消息配置，支持多条轮播。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | string | ✅ | 公告文字内容，支持 emoji |
| `link` | string | ✅ | 点击跳转链接，`#` 表示无跳转 |

**示例：**
```javascript
notices: [
    { text: "🔥 新品首发：AI宠物翻译器上线！", link: "/activity/pet" },
    { text: "🎉 创作挑战赛：赢取万元现金大奖！", link: "/contest" },
]
```

**特殊情况：**
- 空数组 `[]`：隐藏公告栏
- 单条公告：静态展示，不滚动
- 多条公告：自动上下滚动，3秒切换

---

### 2. 顶部通栏 `header`

#### 2.1 Logo 配置 `header.logo`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | string | ✅ | Logo 文字 |
| `icon` | string | ✅ | Logo 图标 SVG 代码 |

#### 2.2 操作按钮 `header.actions`

支持两种按钮类型：

**类型一：客服按钮 (hover-qr)**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识 |
| `type` | string | ✅ | 固定值 `"hover-qr"` |
| `icon` | string | ✅ | 按钮图标 SVG |
| `text` | string | ✅ | 按钮文字 |
| `qrText` | string | ✅ | 二维码下方提示文字 |

**类型二：签到按钮 (signin)**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识 |
| `type` | string | ✅ | 固定值 `"signin"` |
| `icon` | string | ✅ | 按钮图标 SVG |
| `text` | string | ✅ | 按钮文字 |
| `points` | number | ✅ | 签到奖励点数 |

**示例：**
```javascript
header: {
    logo: { text: "智创", icon: '<svg>...</svg>' },
    actions: [
        {
            id: "customer-service",
            type: "hover-qr",
            icon: '<svg>...</svg>',
            text: "客服",
            qrText: "扫码添加客服"
        },
        {
            id: "signin",
            type: "signin",
            icon: '<svg>...</svg>',
            text: "签到",
            points: 20
        }
    ]
}
```

---

### 3. 左侧菜单 `sideMenu`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识 |
| `text` | string | ✅ | 菜单显示文字 |
| `icon` | string | ✅ | 菜单图标 SVG |
| `href` | string | ✅ | 跳转页面路径 |
| `anchor` | string | ❌ | 页面内锚点（如 `#section-hero`） |
| `enabled` | boolean | ✅ | 是否启用，`false` 显示为禁用态 |
| `disabledText` | string | ❌ | 禁用时 hover 提示文字 |

**示例：**
```javascript
sideMenu: [
    {
        id: "home",
        text: "首页",
        icon: '<svg>...</svg>',
        href: "index.html",
        anchor: "#section-hero",
        enabled: true
    },
    {
        id: "assets",
        text: "我的资产",
        icon: '<svg>...</svg>',
        href: "assets.html",
        enabled: false,
        disabledText: "coming soon"
    }
]
```

---

### 4. 主功能卡片 `mainFeatures`

首页核心功能区大卡片配置。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识 |
| `title` | string | ✅ | 卡片标题 |
| `description` | string | ✅ | 卡片描述文字 |
| `image` | string | ❌ | 封面图片 URL，留空显示默认占位图 |
| `buttonText` | string | ✅ | 按钮文字 |
| `buttonLink` | string | ✅ | 按钮点击跳转链接 |
| `cardLink` | string | ✅ | 卡片整体点击跳转链接 |

**示例：**
```javascript
mainFeatures: [
    {
        id: "comic",
        title: "漫剧创作",
        description: "剧本生成、智能分镜、一键视频合成，轻松做漫剧。",
        image: "https://cdn.example.com/comic-cover.jpg",
        buttonText: "开始创作",
        buttonLink: "/comic/create",
        cardLink: "/comic"
    }
]
```

**注意：**
- `buttonLink` 和 `cardLink` 设为 `#` 表示无跳转
- 点击按钮时会阻止卡片跳转事件冒泡

---

### 5. 特色功能卡片 `extraFeatures`

首页"更多特色功能"区域小卡片配置。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识 |
| `title` | string | ✅ | 功能名称 |
| `description` | string | ✅ | 功能简介 |
| `icon` | string | ✅ | 图标 SVG 代码 |
| `iconBg` | string | ✅ | 图标背景色（CSS 颜色值） |
| `link` | string | ✅ | 点击跳转链接 |

**示例：**
```javascript
extraFeatures: [
    {
        id: "prompt",
        title: "提示词提取",
        description: "上传参考图，反推精准提示词",
        icon: '<svg>...</svg>',
        iconBg: "#e3f2fd",
        link: "/tools/prompt"
    }
]
```

---

### 6. 灵感广场 Tab `inspirationTabs`

灵感广场分类标签配置。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | Tab 唯一标识 |
| `text` | string | ✅ | Tab 显示文字 |
| `active` | boolean | ✅ | 是否默认选中（仅一个为 true） |

**示例：**
```javascript
inspirationTabs: [
    { id: "tab-comic", text: "漫剧", active: true },
    { id: "tab-novel", text: "小说", active: false },
    { id: "tab-ad", text: "解说视频", active: false }
]
```

---

### 7. 灵感广场作品 `inspirationWorks`

灵感广场瀑布流作品数据。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | ✅ | 作品唯一 ID |
| `title` | string | ✅ | 作品标题 |
| `height` | string | ✅ | 卡片高度比例（如 `"120%"`、`"75%"`） |
| `bgColor` | string | ✅ | 占位背景色 |
| `category` | string | ✅ | 所属分类，对应 Tab 的 id |

**示例：**
```javascript
inspirationWorks: [
    { id: 1, title: "赛博朋克风女战士", height: "120%", bgColor: "#eceff1", category: "tab-comic" },
    { id: 2, title: "小说《星辰》推广图", height: "75%", bgColor: "#cfd8dc", category: "tab-novel" }
]
```

---

### 8. 如何赚钱 `moneyGuide`

右侧悬浮按钮及弹窗配置。

#### 8.1 悬浮按钮 `moneyGuide.floatingButton`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `icon` | string | ✅ | 按钮图标 SVG |
| `text` | string | ✅ | 按钮文字 |

#### 8.2 弹窗配置

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `modalTitle` | string | ✅ | 弹窗标题 |
| `tabs` | array | ✅ | Tab 配置数组 |
| `content` | object | ✅ | 各 Tab 对应的内容 |

**Tab 配置：**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | Tab 唯一标识 |
| `text` | string | ✅ | Tab 显示文字 |
| `active` | boolean | ✅ | 是否默认选中 |

**内容配置：**
以 Tab id 为 key，值为内容数组：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 步骤标题 |
| `description` | string | ✅ | 步骤详细说明 |

**示例：**
```javascript
moneyGuide: {
    floatingButton: {
        icon: '<svg>...</svg>',
        text: "如何赚钱"
    },
    modalTitle: "创作者变现指南",
    tabs: [
        { id: "m-comic", text: "漫剧/小说", active: true },
        { id: "m-ad", text: "推广素材", active: false }
    ],
    content: {
        "m-comic": [
            { title: "平台内分成", description: "发布作品享受收益分成..." },
            { title: "多平台分发", description: "导出至抖音、快手..." }
        ],
        "m-ad": [
            { title: "接取悬赏任务", description: "在任务大厅接取需求..." }
        ]
    }
}
```

---

### 9. 创作点规则 `pointsRules`

创作点规则弹窗内容配置。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `modalTitle` | string | ✅ | 弹窗标题 |
| `sections` | array | ✅ | 规则章节数组 |

**章节配置：**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 章节标题 |
| `content` | string | ❌ | 章节正文（与 list 二选一） |
| `list` | array | ❌ | 列表内容（与 content 二选一） |

**列表项配置：**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `label` | string | ✅ | 列表项标签（加粗显示） |
| `text` | string | ✅ | 列表项内容 |

**示例：**
```javascript
pointsRules: {
    modalTitle: "创作点规则",
    sections: [
        {
            title: "1. 什么是创作点？",
            content: "创作点是平台内的通用消耗型资产..."
        },
        {
            title: "2. 如何获取创作点？",
            list: [
                { label: "每日签到：", text: "每天登录可免费领取..." },
                { label: "账号充值：", text: "在账户管理页面购买..." }
            ]
        }
    ]
}
```

---

### 10. 充值配置 `recharge`

充值弹窗配置。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `modalTitle` | string | ✅ | 弹窗标题 |
| `packages` | array | ✅ | 充值档位数组 |
| `tips` | string | ✅ | 温馨提示内容（支持 HTML） |
| `buttonText` | string | ✅ | 购买按钮文字 |
| `activityBadge` | string | ❌ | 活动角标文字，空字符串则不显示 |

**档位配置：**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `points` | number | ✅ | 点数 |
| `price` | number | ✅ | 价格（元） |
| `bonus` | number | ✅ | 赠送点数，0 表示不赠送 |

**示例：**
```javascript
recharge: {
    modalTitle: "创作点充值",
    packages: [
        { points: 490, price: 7, bonus: 0 },
        { points: 1400, price: 20, bonus: 0 },
        { points: 3500, price: 50, bonus: 100 },
        { points: 7000, price: 100, bonus: 200 }
    ],
    tips: '温馨提示：创作点有效期1年，客服邮箱：<a href="mailto:support@example.com">support@example.com</a>',
    buttonText: "购买创作点",
    activityBadge: "限时特惠"
}
```

---

### 11. 作品详情弹窗 `workDetail`

点击灵感广场作品后的详情弹窗配置。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `modalTitle` | string | ✅ | 弹窗标题 |
| `defaultWork` | object | ✅ | 默认展示作品信息 |

**默认作品配置：**
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 作品标题 |
| `tags` | array | ✅ | 标签数组（字符串） |
| `promptTitle` | string | ✅ | 提示词区块标题 |
| `prompt` | string | ✅ | 提示词内容 |
| `ctaText` | string | ✅ | 行动号召文字 |
| `buttonText` | string | ✅ | 按钮文字 |

**示例：**
```javascript
workDetail: {
    modalTitle: "作品详情",
    defaultWork: {
        title: "赛博朋克风女战士",
        tags: ["漫剧创作", "二次元"],
        promptTitle: "创作提示词",
        prompt: "一个拥有机械义肢的女性战士，赛博朋克城市背景...",
        ctaText: "喜欢这个风格？立即使用相同参数生成你的作品！",
        buttonText: "一键同款创作"
    }
}
```

---

## 页面说明

### 首页 (index.html)

| 区域 | 对应配置 |
|------|----------|
| 顶部公告栏 | `notices` |
| 顶部通栏 | `header` |
| 左侧菜单 | `sideMenu` |
| 核心功能区 | `mainFeatures` |
| 特色功能区 | `extraFeatures` |
| 灵感广场 | `inspirationTabs` + `inspirationWorks` |
| 如何赚钱悬浮按钮 | `moneyGuide` |
| 作品详情弹窗 | `workDetail` |

### 账户管理页 (account.html)

| 区域 | 对应配置 |
|------|----------|
| 顶部公告栏 | `notices` |
| 顶部通栏 | `header` |
| 左侧菜单 | `sideMenu` |
| 创作点规则弹窗 | `pointsRules` |
| 充值弹窗 | `recharge` |
| 如何赚钱悬浮按钮 | `moneyGuide` |

### 我的资产页 (assets.html)

| 区域 | 对应配置 |
|------|----------|
| 顶部公告栏 | `notices` |
| 顶部通栏 | `header` |
| 左侧菜单 | `sideMenu` |
| 如何赚钱悬浮按钮 | `moneyGuide` |

---

## 使用指南

### 修改配置步骤

1. 打开 `config.js` 文件
2. 找到需要修改的配置项
3. 按照本文档说明修改对应字段
4. 保存文件并刷新页面预览效果

### 注意事项

1. **SVG 图标**：所有图标字段需要填入完整的 SVG 代码字符串
2. **链接格式**：
   - 相对路径：`/path/to/page`
   - 外部链接：`https://example.com`
   - 无跳转：`#`
3. **HTML 支持**：`tips` 等字段支持 HTML 标签，可添加链接等
4. **数组顺序**：数组内元素顺序决定页面显示顺序
5. **布尔值**：`active`、`enabled` 等字段需使用 `true`/`false`

### 常见操作示例

**添加新公告：**
```javascript
notices: [
    { text: "🆕 新公告内容", link: "/new-link" },
    // 保留原有公告...
]
```

**添加新功能卡片：**
```javascript
mainFeatures: [
    // 原有卡片...
    {
        id: "new-feature",
        title: "新功能",
        description: "新功能描述",
        image: "",
        buttonText: "立即体验",
        buttonLink: "/new-feature",
        cardLink: "/new-feature"
    }
]
```

**修改充值档位：**
```javascript
recharge: {
    packages: [
        { points: 100, price: 1, bonus: 10 },  // 新增1元档
        // 其他档位...
    ]
}
```

**隐藏活动角标：**
```javascript
recharge: {
    activityBadge: ""  // 设为空字符串即可隐藏
}
```

---

## 技术说明

- **前端框架**：原生 HTML/CSS/JavaScript
- **样式方案**：CSS 变量 + 响应式设计
- **配置加载**：页面加载时读取 `CONFIG` 对象动态渲染
- **兼容性**：现代浏览器（Chrome、Firefox、Safari、Edge）

---

## 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2024-03-05 | v1.0 | 初始版本，支持全部运营配置项 |
