# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目架构与规范 (Stage 2: Core Build)

**项目名称**: 3岁启蒙 AI 学习平板
**项目类型**: 全栈 Web 应用
**核心框架**: Next.js (App Router) + React + TypeScript + Tailwind CSS

### 核心目录结构
```
2-build/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 启动路由（区分家长台与孩子学习台逻辑入口）
│   │   ├── api/              # 后端 API 路由（用于连接 LLM 生成题库，及读取云端配置）
│   ├── components/           # 复用 UI 组件
│   │   ├── parent/           # 家长看板组件（看板、设置面板）
│   │   ├── child/            # 学习台交互组件（全屏锁、听音卡片、拖拽块）
│   ├── lib/                  # 工具类（LLM prompt 处理，状态管理）
├── .env.example              # 环境变量模板（如：ANTHROPIC_API_KEY=）
```

### 开发规范

1. **客户端与服务端分离**：
   - 所有包含拖拽 (`dnd-kit`)、状态管理（如解锁锁屏）、音频播放的页面/组件，必须在顶部声明 `"use client"`;
   - 与 LLM 交互的路由必须放在 `app/api/` 下作为 Server端代码，确保 API Key 不被暴露到浏览器。
2. **样式规范**：
   - 必须使用 Tailwind CSS。UI 色彩保持大色块、高对比度（符合 3 岁儿童认知与视力保护需求）。
3. **安全规范**：
   - `.env.local` 绝对不能提交到代码仓库。
   - 不要将 `NEXT_PUBLIC_` 用于存放任何敏感 Key。

### 运行与测试命令
```bash
# 安装依赖
npm install

# 运行本地开发服务器
npm run dev

# 生产环境构建
npm run build
```
