# 项目说明

[← 返回仓库首页](../README.md) ｜ [快速启动](quickstart.md) ｜ [博客写作指南](blog-guide.md)

一个以个人简介为入口的静态个人主页：首页先介绍「我是谁」，再给出名片、链接库、笔记三个入口。博客是站点的一部分，不是主角。

- 技术栈：Astro 7（静态生成）、TypeScript、原生 CSS、Markdown + Content Collections（Zod 校验）
- 无前端框架、无数据库、无后端、无第三方托管
- 部署：GitHub Pages + GitHub Actions
- 仓库里**没有**任何运行时依赖，构建产物是一堆静态文件

---

## 1. 本地运行

需要 Node.js **≥ 22.23.4**（`astro@7.4` 的硬性要求，`package.json` 里写死了），以及 Python 3.9+（只给几个检查脚本和单元测试用）。

```bash
npm install      # 安装依赖
npm run dev      # 开发服务器，默认 http://localhost:4321
npm run build    # 生产构建，输出到 dist/（会先跑图片优化与 Pagefind 索引）
npm run preview  # 预览生产构建
npm run check    # Astro / TypeScript 类型检查
npm test         # Python 单元测试
npm run test:md  # Markdown 插件测试
```

---

## 2. 目录结构

```text
.
├── README.md                  仓库首页
├── README/                    文档
│   ├── project.md             本文件：项目说明
│   ├── quickstart.md          20 分钟把它变成你自己的主页
│   ├── blog-guide.md          博客写作指南（frontmatter / 图注 / 注释）
│   └── ads.md                 右侧广告位：默认关闭，怎么开
├── public/
│   ├── fonts/                 本地字体（Inter / Cormorant Garamond / Fira Code）+ 许可文本
│   ├── images/
│   │   ├── avatar.jpg         头像（460×460）
│   │   ├── bg/                可选背景图（宽于 1280px 才生效，默认关闭）
│   │   ├── blog/<slug>/       每篇文章自己的插图目录
│   │   ├── links/ people/ tools/   链接库与名片页用的小图标
│   ├── favicon.svg
│   └── og/default.jpg         默认分享图（1200×630，由 npm run og 生成）
├── src/
│   ├── components/            Header / Footer / 导航 / 链接行 / 卡片 / 图标网格 / 徽章墙 / 最近文章 / 主题切换 / 背景开关 / 阅读进度条
│   ├── config/                站点、个人资料、导航、链接、名片页的全部数据
│   ├── content/blog/          Markdown 文章（文件名即 slug）
│   ├── content.config.ts      文章集合定义与 Zod 校验
│   ├── data/                  image-manifest.json / og-manifest.json（脚本生成，要提交）
│   ├── layouts/               BaseLayout（HTML 骨架与 SEO）/ ArticleLayout（文章阅读布局）
│   ├── lib/posts.ts           读取、排序、按年分组文章
│   ├── lib/markdown-*.mjs     Markdown 插件：图片尺寸、图注、提示框
│   ├── pages/                 路由
│   ├── scripts/               主题、背景、阅读进度、目录、注释弹层、归档筛选
│   └── styles/                tokens / global / typography / components / fonts
├── scripts/                   图片优化、分享图、链接检查、README 同步
├── tests/                     Markdown 插件测试 + Python 单元测试
├── .github/workflows/         deploy.yml（部署）/ sync-profile-readme.yml（可选）
├── astro.config.mjs
└── package.json
```

设计约定：

- 颜色、字号、间距、圆角、动效时长**只在** `src/styles/tokens.css` 定义，组件里不写死色值。
- 个人信息只存在 `src/config/*.json` / `*.ts`，页面组件不保存任何个人资料。
- 用 JSON 存站点数据，是因为 README 同步脚本（Python）也要读同一份数据，避免两份配置互相冲突。
- 站内链接一律写成根绝对路径（`/blog/` 等），所以站点**必须部署在域名根路径**——仓库名得是 `<用户名>.github.io`。
- 页头是 `1fr auto 1fr` 三栏网格：站名 / 导航 / 开关。两边等宽导航才会真正居中，不要改回 `space-between`。
- 背景图是可选功能，由 `<html>` 上的三层背景画出来（纸面 → 纱 → 照片），**不参与布局**。不要给 `body` 设 `max-width`，那会把文章页的网格挤坏。

### 路由

| 路径 | 内容 |
| --- | --- |
| `/` | 首页：个人简介 → 站点导航 → 最近文章 |
| `/me/` | 名片页（简介、主要平台、关注领域、项目与经历） |
| `/morelinks/` | 链接库（分类展示） |
| `/blog/` | 笔记列表：按年份分组，支持搜索、标签筛选与分页 |
| `/blog/{slug}/` | 单篇文章，`slug` 即 Markdown 文件名 |
| `/rss.xml`、`/robots.txt`、`/sitemap-index.xml` | 自动生成 |
| 其他任意地址 | `404.html` |

---

## 3. 要改哪些地方

| 改什么 | 文件 |
| --- | --- |
| 站点名、域名、作者、邮箱 | `src/config/site.json` |
| 首页上的你（姓名、一句话定位、简介、头像） | `src/config/profile.json` |
| 名片页（简介、关注领域、项目、经历） | `src/config/about.ts` |
| 页头导航与首页导航区 | `src/config/navigation.json` |
| 链接库 | `src/config/links.ts` |
| 笔记的标签集合（封闭集合） | `src/config/tags.json` |
| 头像 / favicon / 默认分享图 | `public/images/avatar.jpg`、`public/favicon.svg`、`public/og/default.jpg` |
| 右侧广告位 | `src/config/ads.json`（默认关闭，说明见 [ads.md](ads.md)） |

`site.json` 里的 `url` 只写「协议 + 域名」，不带结尾斜杠、不带子路径。canonical、Open Graph、RSS、sitemap 全靠它拼绝对地址。

---

## 4. 写文章

新建 `src/content/blog/<slug>.md`，文件名就是 URL。frontmatter 四个字段由 Zod 校验，写错会**构建失败**并指出具体文件：

```yaml
---
title: 文章标题
description: 一句话摘要，会显示在列表项和分享卡片上
pubDate: 2026-10-30T16:30:00+08:00
tags: [其它]
draft: false
source: original
---
```

- `draft: true` 的文章不生成页面、不进首页、不进 RSS 与 sitemap。
- `source` 取 `original`（默认）或 `ai`；`ai` 的文章在列表与文章页都会挂「AI 整理」标记，默认列表不展示，需要打开「含 AI 整理」滑块。
- `tags` 只能取 `src/config/tags.json` 里的值。

正文支持哪些语法、每种怎么写、渲染出来什么样，**全部写在仓库自带的示例笔记里**：`src/content/blog/example.md`，部署后就是 `/blog/example/`。那篇是语法总览，写完新文章可以直接对着它核对。

图片放 `public/images/blog/<slug>/`，正文里写 `![alt](/images/blog/<slug>/01.jpg "图注")`——引号里那串会渲染成图注。构建时会自动生成 WebP 与多尺寸变体，清单写到 `src/data/image-manifest.json`（**要提交**）。

---

## 5. 部署

仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**，然后每次 push 到 `main`，`.github/workflows/deploy.yml` 会自动跑：

```text
npm ci → npm run check → npm run test:md → npm run build → npm run links → npm test → 部署
```

首次约 1–2 分钟。新仓库可能要先去 Actions 标签点一次「I understand my workflows, go ahead and enable them」。

工作流第一条就是一道守卫：**仓库名不以 `.github.io` 结尾时整个 job 直接跳过**。因为站内链接全是根绝对路径，部署到 `https://<用户名>.github.io/blog-template/` 这种子路径下只会得到一个样式全丢的页面。所以「本仓库自己的 push 没有部署」是预期行为，改名成 `<用户名>.github.io` 之后它才会真正跑。

`sync-profile-readme.yml` 是可选的，只在手动触发时运行，没配 `PROFILE_README_TOKEN` 就自动跳过，不影响部署。

---

## 6. 构建闸门

```bash
npm run check        # 类型检查，0 error 才算过
npm run build        # 构建 + 图片优化 + Pagefind 索引
npm run links        # 站内死链检查（对着 dist 跑，要先 build）
npm run check:prose  # 正文渲染体检：落单的 ** 与误渲染的删除线
npm run test:md      # Markdown 插件测试
npm test             # Python 单元测试
npm run check:images # 远程图片体积检查（用了外链图才需要）
```

`check:prose` 值得单独说一句：它扫的是构建产物，专门抓「Markdown 没生效、把标记当正文印出来」的情况。中文标点后面紧跟 `**` 是最常见的翻车点，`npm run check:prose` 会在报错里直接给出那句话。

---

## 7. 常见问题

**构建报 `EBADENGINE`。** Node 版本不够，升到 22.23.4 以上。

**页面样式全丢、链接 404。** 九成是仓库名不对，站点跑在 `https://<用户名>.github.io/仓库名/` 下，而站内链接都是根绝对路径。把仓库名改成 `<用户名>.github.io`。

**图片不显示，或者图注没出来。** 图片必须在 `public/images/blog/<slug>/` 下，路径以 `/images/` 开头；图注是 Markdown title，图片要独占一个段落。

**改了样式没生效。** 删掉 `node_modules/.astro` 再构建，Astro 的内容缓存偶尔会留住旧的渲染结果。

**提示框里的内容整块消失。** `astro.config.mjs` 里 `features.directive: true` 必须配 `mdastPlugins: [admonitionPlugin]`，只开开关不给插件，`:::` 里的内容会被静默丢掉。

---

## 8. 授权

**代码**（`src/`、`scripts/`、`tests/`、配置文件、工作流）用 [MIT](../LICENSE)，随便拿去改、拿去用，保留版权声明即可。

**内容**（文章、译文、图片、文档）用 [CC BY-NC-SA 4.0](../LICENSE-CONTENT)：署名、非商业、相同方式共享。仓库里自带的示例笔记与占位图可以随便删。
