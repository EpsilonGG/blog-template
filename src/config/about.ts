/**
 * 「名片」页面的内容配置。
 *
 * 数组为空时，页面对应区块会显示一行简洁的提示，而不是渲染空区块。
 * 关注领域用英文表达，保持与其他条目的视觉一致性。
 */

export interface AboutEntry {
  title: string;
  /** 可选：时间范围，例如「2023 — 至今」 */
  period?: string;
  description: string;
  /** 可选：相关链接（站内路径或完整 URL） */
  href?: string;
}

export interface AboutConfig {
  /** 简介段落 */
  intro: string[];
  /** 关注领域 */
  focusAreas: string[];
  /** 当前进行的项目 */
  projects: AboutEntry[];
  /** 个人经历 / 研究经历 */
  experience: AboutEntry[];
}

export const about: AboutConfig = {
  intro: ['这里写一段自我介绍：你是谁、在做什么、关心什么。这段话只出现在名片页，首页的那段在 profile.json 里。'],
  focusAreas: ['Web Development', 'Static Sites', 'Markdown Writing', 'Interface Design'],
  projects: [
    {
      title: '示例项目',
      href: 'https://github.com/',
      description: '一句话说明这个项目做什么，标题会变成链接。',
    },
    {
      title: '另一个项目',
      description: '不写 href 时标题退化成纯文本，适合还没有仓库的项目。',
    },
  ],
  experience: [
    {
      title: '学校 / 公司 · 专业或职位',
      period: '2022 — 至今',
      description: '一句话说明你在这里做过什么。period 是可选的，写了会显示在标题右侧。',
    },
  ],
};
