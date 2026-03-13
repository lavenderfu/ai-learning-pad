# {项目名称} - 项目配置

> 此文件由阶段2（核心搭建）创建，定义本项目的技术栈和开发规范。

---

## 技术栈

- **前端框架**：{React / Vue / 微信小程序原生 / ...}
- **后端框架**：{Next.js API Routes / Express / 微信云开发 / 无}
- **数据库**：{PostgreSQL / MySQL / MongoDB / 云数据库 / LocalStorage / 无}
- **部署方式**：{Vercel / Docker / 微信小程序 / ...}
- **AI 能力**：{Claude API / OpenAI / 无}

---

## 目录结构

### Web 应用

```
2-build/
├── src/
│   ├── app/               # 页面（Next.js App Router）或 pages/（Pages Router）
│   ├── components/        # UI 组件
│   ├── services/          # API 调用、AI 服务
│   ├── utils/             # 工具函数
│   └── types/             # TypeScript 类型定义
├── public/                # 静态资源
├── .env.example           # 环境变量模板
└── package.json
```

### 微信小程序

```
2-build/
├── miniprogram/
│   ├── app.js             # 小程序入口
│   ├── app.json           # 全局配置
│   ├── app.wxss           # 全局样式
│   ├── pages/             # 页面目录
│   ├── components/        # 公共组件
│   ├── utils/             # 工具函数
│   └── static/            # 静态资源
├── cloudfunctions/        # 云函数（如使用云开发）
└── project.config.json    # 项目配置
```

---

## 代码规范

- **语言**：{TypeScript / JavaScript}
- **代码风格**：{ESLint + Prettier / 微信小程序默认}
- **命名规范**：
  - 文件名：kebab-case（如 `user-profile.tsx`）
  - 组件名：PascalCase（如 `UserProfile`）
  - 函数/变量：camelCase（如 `getUserData`）
- **Git 分支**：`main` 为主分支，功能分支用 `feat/{feature-name}`

---

## API 约定

### Web 应用

- **基础路径**：`/api/v1/`
- **响应格式**：`{ code: number, data: any, message: string }`
- **认证方式**：{JWT / Session / 无需认证}

### 微信小程序

- **调用方式**：`wx.cloud.callFunction({ name: '云函数名', data: {} })`
- **响应格式**：`{ code: number, data: any, message: string }`
- **认证方式**：微信登录（自动获取 openid）

---

## 环境变量

### Web 应用

```bash
# .env.example
# AI API（Next.js 服务端使用，不加 NEXT_PUBLIC_ 前缀）
ANTHROPIC_API_KEY=your_api_key_here

# 其他配置
# DATABASE_URL=...
```

### 微信小程序

云函数环境变量通过微信开发者工具配置，不提交到代码仓库。

---

## 开发命令

### Web 应用

```bash
# 安装依赖
npm install

# 启动开发环境
npm run dev

# 运行测试
npm test

# 构建生产版本
npm run build
```

### 微信小程序

```
1. 使用微信开发者工具打开 2-build 目录
2. 点击「编译」预览
3. 点击「上传」部署云函数
4. 点击「预览」生成二维码测试
```

---

## 注意事项

- {项目特殊约定，如：API Key 必须放在服务端，不能暴露给前端}
- {性能优化要求，如：图片需要压缩后上传}
- {兼容性要求，如：需要支持 iOS 和 Android}
