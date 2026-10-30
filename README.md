# 主页模板

一个用 Astro 写的静态个人主页模板：首页先介绍「我是谁」，再给出名片、链接库、笔记三个入口。博客是站点的一部分，不是主角。

- **技术栈**：Astro 7（静态生成）+ TypeScript + 原生 CSS + Markdown，没有前端框架、没有数据库、没有后端
- **部署**：GitHub Pages + GitHub Actions，push 即上线
- **换人成本**：个人信息全在 `src/config/` 的几个 JSON 里，换掉就是另一个人的主页

---

## 三分钟上手

1. **点右上角 Use this template → Create a new repository**，仓库名必须是 `<你的用户名>.github.io`（站内链接都是根绝对路径，换个名字整站样式和链接一起失效）
2. **改配置**：`src/config/site.json`、`profile.json`、`navigation.json`、`about.ts`、`links.ts`
3. **开 Pages**：Settings → Pages → Source 选 **GitHub Actions**，等 `Deploy to GitHub Pages` 变绿

三步加起来十分钟左右。细节见[快速启动](README/quickstart.md)。

> 本仓库自身叫 `blog-template`，不满足「仓库名以 `.github.io` 结尾」这个前提，所以它的部署工作流会直接跳过——这是预期的，不是坏了。站内链接全是根绝对路径，只有部署在域名根路径上才对。

---

## 文档

| 文档 | 内容 |
| --- | --- |
| [快速启动](README/quickstart.md) | 20 分钟把它变成你自己的主页：三步 + 上线检查清单 + 给 AI 的速查 |
| [项目说明](README/project.md) | 目录结构、路由、配置项、写文章、部署与排查 |
| [博客写作指南](README/blog-guide.md) | frontmatter、图片图注、注释（脚注）的写法与约定 |
| [广告位](README/ads.md) | 右侧栏广告位：默认关闭，怎么开、放得下什么尺寸、合规要求 |

---

## 这个仓库里有什么

**四个页面**：首页（简介 + 站点导航 + 最近文章）、名片、链接库、笔记列表，外加单篇文章页与 404。

**笔记系统**：按年份分组、Pagefind 全文搜索、标签筛选、分页，以及一个「含 AI 整理」的披露滑块——标记为 AI 整理的文章默认不展示，需要手动打开才出现。

**一篇示例笔记**：`src/content/blog/example.md`，部署后是 `/blog/example/`。它把本站支持的写作语法全部列了一遍，**每条先给代码框里的源码，紧接着给渲染后的实际效果**，写完新文章可以直接对着它核对。语法覆盖 Markdown 基础（标题、段落、强调、行内代码、链接、列表、表格、分割线）、引用块、代码块、图片与图注、并排图组、注释（脚注），以及本站特有的 `:::note` 提示框。

**占位图**：`public/images/blog/example/` 下三张灰色网格图，专门用来演示图注和并排图组，换成自己的图直接覆盖即可。

---

## README 同步（可选）

`scripts/sync_profile_readme.py` 会把网站里的个人简介、站点导航和最近文章写进 README 的四个标记区域，让仓库首页和站点内容不至于各写一遍。下面是它填充后的样子——删掉这些标记就不会再同步。

**个人简介**

<!-- PROFILE:START -->
**你的名字** · 一句话定位

这里是第一段自我介绍。改 `src/config/profile.json` 的 `name`、`tagline`、`intro`，再跑一次同步脚本即可。
<!-- PROFILE:END -->

**站点导航**

<!-- NAV:START -->
- [首页](https://example.github.io/) — 个人简介与站点入口
- [名片](https://example.github.io/me/) — 个人背景、主要平台、关注领域与项目概览
- [链接库](https://example.github.io/morelinks/) — 外部平台、工具、资源和项目链接
- [笔记](https://example.github.io/blog/) — 文章、研究记录与长期内容
<!-- NAV:END -->

**最近文章**

<!-- POSTS:START -->
- [示例笔记：本站在用的全部写作语法](https://example.github.io/blog/example/) · 2026-10-30
<!-- POSTS:END -->

**最近更新**

<!-- RECENT:START -->
- [示例笔记：本站在用的全部写作语法](https://example.github.io/blog/example/)
<!-- RECENT:END -->

```bash
python scripts/sync_profile_readme.py --readme README.md --check   # 只检查
python scripts/sync_profile_readme.py --readme README.md           # 写入
```

`.github/workflows/sync-profile-readme.yml` 是手动触发版，需要仓库 Secret `PROFILE_README_TOKEN`；没配就直接跳过，不影响部署。

---

## 授权

**代码**（`src/`、`scripts/`、`tests/`、配置文件、工作流）用 [MIT](LICENSE)，随便拿去改、拿去用，保留版权声明即可。

**内容**（文章、译文、图片、文档）用 [CC BY-NC-SA 4.0](LICENSE-CONTENT)：署名、非商业、相同方式共享。

仓库里自带的示例笔记与占位图可以随便删——它们存在的唯一目的是告诉你「这里能写成什么样」。
