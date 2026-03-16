# 替代部署方案 (Next.js)

由于 Vercel 无法登录（可能是网络原因或账号受限），这里提供两个国内访问稳定、同样支持 Next.js 一键部署的优秀替代方案。

---

## 方案 1：Zeabur (最推荐，对国内网络友好)

[Zeabur](https://zeabur.com/zh-CN) 是一个非常优秀的无需关注服务器配置的 PaaS 平台，对国内访问速度更好，并且同样支持 GitHub 关联部署。

### 部署步骤：
1. 打开 [Zeabur 官网](https://zeabur.com/zh-CN)，使用 GitHub 账号登录。
2. 创建一个新的项目 (Create New Project)。
3. 在项目控制台中点击 **"部署新服务 (Deploy New Service)"**。
4. 选择 **"从 GitHub 仓库部署 (Deploy from GitHub)"**。
5. 授权并选择你刚刚推送的 `ai-learning-pad` 仓库。
6. **配置环境变量**：在服务创建好但正在构建时，点击该服务，进入 **"Variables (环境变量)"** 选项卡。
   - 添加 `ANTHROPIC_API_KEY` = `你的密钥`。
7. Zeabur 会自动识别这是 Next.js 项目并开始构建。
8. **绑定域名**：构建完成后，进入 **"Networking (域名)"** 选项卡，点击 "Generate Domain" 生成一个免费的 `.zeabur.app` 域名。

---

## 方案 2：Render

[Render](https://render.com/) 是另一个主流的免费部署平台。

### 部署步骤：
1. 打开 [Render 官网](https://render.com/) 并用 GitHub 登录。
2. 点击右上角 **"New"** -> **"Web Service"**。
3. 连接 GitHub 并选择你的代码仓库。
4. 在配置页面，Render 通常会自动识别，如果没识别，确保以下配置：
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. **配置环境变量**：向下滚动找到 "Environment Variables" 区域。
   - 添加 `ANTHROPIC_API_KEY` = `你的密钥`。
6. 点击最下方的 **"Create Web Service"**，等待几分钟构建完成，Render 会在左上角给你一个可访问的链接。
