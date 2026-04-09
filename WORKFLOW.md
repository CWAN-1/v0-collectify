# Collectify 混合开发工作流

## 概述

混合开发模式：
- **v0.dev**：负责 UI 设计和前端页面
- **本地开发**：负责后端 API、数据库、业务逻辑
- **Git 分支策略**：安全地管理两种代码

---

## 📋 目录结构

```
collectify/
├── app/
│   ├── (main)/           # v0.dev 生成的 UI 页面
│   │   ├── page.tsx
│   │   ├── listings/
│   │   └── ...
│   ├── api/              # 手动创建的后端 API (不被 v0 覆盖)
│   │   ├── listings/
│   │   ├── auth/
│   │   └── ...
│   └── layout.tsx
├── prisma/               # 数据库 Schema (手动管理)
├── lib/                  # 工具库 (手动管理)
├── components/           # 共享组件 (混合管理)
│   ├── ui/               # v0.dev 生成的 UI 组件
│   └── ...               # 手动创建的组件
├── gstack/               # gstack 技能 (不提交)
├── android/              # Capacitor (不提交)
└── ...
```

---

## 🌿 Git 分支策略

### 主分支

- **`main`**：v0.dev 自动提交的分支（纯 UI）
- **`develop`**：混合开发分支（UI + 后端）
- **`feature/*`**：功能分支

### 工作流

```
v0.dev → main (自动)
         ↓ (定期合并)
      develop (UI + 后端)
         ↓
      feature/* (新功能)
```

---

## 🚀 详细工作流

### 第一步：初始化分支

```bash
# 1. 确保在 main 分支
git checkout main
git pull origin main

# 2. 创建 develop 分支
git checkout -b develop

# 3. 推送 develop 分支
git push -u origin develop
```

### 第二步：在 develop 分支添加后端代码

```bash
# 1. 在 develop 分支工作
git checkout develop

# 2. 添加后端代码（已存在）
# - prisma/schema.prisma
# - app/api/
# - lib/
# - middleware.ts

# 3. 提交后端代码
git add prisma/ app/api/ lib/ middleware.ts package.json
git commit -m "Add backend: Prisma schema, API routes, and auth"

# 4. 推送到 develop
git push origin develop
```

### 第三步：v0.dev 更新 UI 后的处理

当 v0.dev 自动提交到 `main` 分支后：

```bash
# 1. 切换到 main 分支，拉取最新
git checkout main
git pull origin main

# 2. 切换回 develop 分支
git checkout develop

# 3. 合并 main 到 develop
git merge main

# 4. 解决冲突（如果有）
# - 冲突通常在 app/(main)/ 下的页面
# - 保留 v0.dev 的 UI 更新
# - 确保后端代码不受影响

# 5. 测试合并结果
npm run dev
# 检查 UI 和后端是否都正常工作

# 6. 提交合并
git commit

# 7. 推送到 develop
git push origin develop
```

### 第四步：开发新功能

```bash
# 1. 从 develop 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# 2. 开发功能
# - 修改后端 API
# - 修改前端页面（如果需要）

# 3. 提交功能
git add .
git commit -m "Feature: Add my new feature"

# 4. 合并回 develop
git checkout develop
git merge feature/my-new-feature
git push origin develop

# 5. 删除功能分支
git branch -d feature/my-new-feature
```

### 第五步：部署到 Vercel

**选项 A：部署 develop 分支（推荐）**
- 在 Vercel 中设置默认分支为 `develop`
- 每次推送到 `develop` 自动部署
- URL: https://3april-collectify-develop.vercel.app

**选项 B：保持 main 为 UI 预览，develop 为完整版**
- main: 纯 UI 预览（v0.dev 自动）
- develop: 完整版本（UI + 后端）

---

## ⚠️ 关键注意事项

### 1. 文件隔离

**v0.dev 不会覆盖的文件/目录：**
- ✅ `app/api/` - API 路由
- ✅ `prisma/` - 数据库 Schema
- ✅ `lib/` - 工具库
- ✅ `middleware.ts` - 中间件
- ✅ `components/` 下的手动创建组件

**v0.dev 可能覆盖的文件/目录：**
- ⚠️ `app/(main)/` - 页面（接受覆盖）
- ⚠️ `components/ui/` - UI 组件（接受覆盖）
- ⚠️ `app/layout.tsx` - 根布局（小心冲突）

### 2. Git 忽略配置

确保 `.gitignore` 包含：

```
# gstack (外部依赖)
/gstack/

# Capacitor (不需要提交)
/android/
/ios/

# 环境变量
.env.local
.env.*.local

# 构建产物
.next/
node_modules/
dist/
```

### 3. 冲突解决策略

当合并 `main` 到 `develop` 时：

| 文件 | 策略 |
|------|------|
| `app/(main)/*.tsx` | 接受 v0.dev 的更改 |
| `app/layout.tsx` | 手动合并，保留后端相关代码 |
| `components/ui/*.tsx` | 接受 v0.dev 的更改 |
| `app/api/**` | 保留手动创建的 API |
| `prisma/**` | 保留手动创建的 Schema |
| `lib/**` | 保留手动创建的工具 |
| `package.json` | 手动合并依赖 |

### 4. v0.dev 中的最佳实践

在 v0.dev 中：
- ✅ 只修改 UI 相关的内容
- ✅ 不要尝试添加后端逻辑
- ✅ 不要修改 `app/api/` 目录
- ✅ 定期从 v0.dev 拉取更新

---

## 📝 日常检查清单

### 每次开始工作前

- [ ] 我在正确的分支吗？（develop 或 feature/*）
- [ ] 我拉取了最新的代码吗？
- [ ] main 分支有 v0.dev 的新提交吗？

### 每次提交前

- [ ] 我提交的是后端代码还是 UI 代码？
- [ ] 如果是 UI 代码，应该在 v0.dev 中修改吗？
- [ ] 我的提交会被 v0.dev 覆盖吗？

### 每次合并后

- [ ] 我测试了 UI 是否正常显示？
- [ ] 我测试了后端 API 是否正常工作？
- [ ] 没有引入新的 bug 吗？

---

## 🔧 工具和脚本

### 有用的 Git 别名

在 `~/.gitconfig` 中添加：

```ini
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    lg = log --graph --oneline --all
    sync = !git checkout main && git pull && git checkout develop && git merge main
```

使用：
```bash
git sync  # 自动拉取 main 并合并到 develop
```

---

## ❓ 常见问题

### Q: v0.dev 会删除我手动创建的 API 路由吗？

**A:** 不会。v0.dev 只修改它自己生成的文件，不会删除或修改 `app/api/` 目录。

### Q: 我可以在 v0.dev 中修改 layout.tsx 吗？

**A:** 可以，但要小心。修改后合并时需要手动解决冲突，确保不丢失后端相关的代码。

### Q: 如何知道 main 分支有新的 v0.dev 提交？

**A:** 定期运行：
```bash
git checkout main
git fetch
git status
```

或者在 GitHub 上查看提交历史。

### Q: 我可以直接在 main 分支添加后端代码吗？

**A:** 不建议。main 分支应该只包含 v0.dev 生成的 UI 代码。所有后端代码应该在 develop 分支。

---

## 🎯 总结

**这个工作流的核心原则：**
1. 📦 **main 分支 = v0.dev 的纯 UI**
2. 🔧 **develop 分支 = UI + 后端**
3. 🔄 **定期合并 main → develop**
4. ⚠️ **小心文件隔离和冲突解决**

**好处：**
- ✅ 可以继续使用 v0.dev 的强大 UI 设计能力
- ✅ 可以自由开发后端功能
- ✅ 安全的 Git 分支管理
- ✅ 清晰的责任分离

---

## 📚 相关文档

- [BACKEND_SETUP.md](./BACKEND_SETUP.md) - 后端搭建指南
- [README.md](./README.md) - 项目说明
