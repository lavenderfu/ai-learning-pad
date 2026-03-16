# 3岁启蒙 AI 学习平板 (Vercel 部署指南)

本项目是一个基于 Next.js 的全栈 Web 应用。由于涉及到安全调用 Anthropic (Claude)大模型 API，强烈建议将其部署到服务端渲染支持良好的平台（如 Vercel）。

## 部署到 Vercel (方案 B)

### 前置准备
1. 一个 [GitHub](https://github.com/) 账号
2. 一个 [Vercel](https://vercel.com/) 账号（可以用 GitHub 直接登录）
3. 你的 Anthropic API Key (用于 AI 题库生成)

### 步骤 1：推送到 GitHub
在你的终端执行以下命令，将代码推送到你的 GitHub 仓库（假设你已经在 GitHub 上新建了一个名为 `ai-learning-pad` 的空仓库）：

```bash
cd test-project/2-build

# 初始化 Git（如果尚未初始化）
git init

# 添加所有文件并提交
git add .
git commit -m "Init AI learning pad project"

# 关联远程仓库并推送 (替换成你自己的仓库地址)
git remote add origin https://github.com/你的用户名/ai-learning-pad.git
git push -u origin main
```

### 步骤 2：在 Vercel 导入并部署
1. 登录 [Vercel 控制台](https://vercel.com/dashboard)。
2. 点击右上角的 **"Add New..." -> "Project"**。
3. 在弹出的列表中找到你刚刚推送到 GitHub 的 `ai-learning-pad` 仓库，点击 **"Import"**。
4. **关键步骤 - 配置环境变量**：
   - 展开 "Environment Variables" (环境变量) 菜单。
   - 添加一个新变量：
     - **Name**: `ANTHROPIC_API_KEY`
     - **Value**: `你的sk-ant-api03...密钥`
   - 点击 **Add**。
5. 点击 **"Deploy"** 按钮。

### 步骤 3：在平板上“安装”
1. 部署完成后，Vercel 会给你分配一个免费的生产环境域名（如 `https://ai-learning-pad.vercel.app`）。
2. 在 iPad 的 **Safari 浏览器** 中打开这个域名。
3. 点击 Safari 底部的 **分享按钮**（正方形带向上箭头的图标）。
4. 在菜单中向下滑动，找到并点击 **"添加到主屏幕" (Add to Home Screen)**。
5. 确认添加后，你的平板桌面上就会出现这个应用的图标，点击它就会以**全屏去浏览器的原生 App 形态**启动啦！
