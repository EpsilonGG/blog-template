/**
 * 外部链接数据。
 *
 * 名片页（/me/）与链接库（/morelinks/）都从这里读取数据，
 * 页面组件中不硬编码任何个人链接。
 *
 * 注意：
 * - 模板里的每个分类都只留一条示例链接，地址统一指向 GitHub 官网，
 *   用途是展示排版样式；换成自己的链接时直接把 href 改掉即可。
 * - 只填写可以确认的真实地址，不要填写猜测或未经验证的账号。
 * - 没有内容的分类会自动隐藏，不会渲染空区块。
 * - 每个分类用 layout 决定渲染方式，不写则按 'list' 渲染。
 * - 分类可以再拆成 subgroups（子栏目），子栏目之间自动画一条分隔线。
 * - 条目里的 icon 是可选字段：放一张图到 public/images/links/icons/ 再填路径，
 *   不填则退化成字母块（monogram，省略时取 label 首字）。
 */

export interface LinkItem {
  /** 链接显示名称 */
  label: string;
  /** 完整 URL 或站内路径 */
  href: string;
  /** 一句话说明 */
  description?: string;
  /** 可选标签，仅用于展示，首版不做筛选 */
  tags?: string[];
  /** 图标：badges 布局里显示 22×22，icons 布局里显示 48×48 */
  icon?: string;
  /** 没有图标时显示的字母块，省略则取 label 首字 */
  monogram?: string;
  /** 卡片右上角的次要信息，例如 Python */
  meta?: string;
}

/** 分类的渲染方式 */
export type GroupLayout = 'list' | 'cards' | 'icons' | 'badges';

/** 子栏目：同一个大分类下再分小组，组间用分隔线隔开 */
export interface LinkSubGroup {
  /** 稳定的子栏目标识 */
  id: string;
  /** 子栏目标题 */
  title: string;
  /** 渲染方式，默认继承外层，再缺省为 list */
  layout?: GroupLayout;
  links: LinkItem[];
}

export interface LinkGroup {
  /** 稳定的分类标识 */
  id: string;
  /** 分类标题 */
  title: string;
  /** 分类说明，可省略 */
  description?: string;
  /** 渲染方式，默认 list */
  layout?: GroupLayout;
  links: LinkItem[];
  /** 子栏目：写了 subgroups 就忽略 links，子栏目之间自动分隔 */
  subgroups?: LinkSubGroup[];
}

/**
 * 名片页（/me/）的「主要平台」区块。
 * 留空时该区块不渲染，其余内容（简介、关注领域、项目与经历）照常显示。
 */
export const primaryLinks: LinkItem[] = [
  { label: 'GitHub', href: 'https://github.com/', description: '主要平台，换成你自己的主页地址' },
];

/**
 * 链接库分类。分类由配置驱动，页面组件不硬编码链接。
 * 顺序即页面顺序：个人平台 → 项目 → 工具 → 参考资料 → 常用链接。
 *
 * 每个分类只放一条示例链接，说明文字写的就是这个版式长什么样，
 * 换内容时连说明一起改掉即可。
 */
export const linkGroups: LinkGroup[] = [
  {
    id: 'platforms',
    title: '个人平台',
    description: '在其他平台上可以找到我的地方。',
    layout: 'cards',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/',
        description: '卡片版式：名称、说明，右上角还能放一个 meta 标签。',
        meta: '外部',
      },
    ],
  },
  {
    id: 'projects',
    title: '项目与代码仓库',
    description: '正在维护的代码与项目记录。',
    layout: 'cards',
    links: [
      {
        label: '示例项目',
        href: 'https://github.com/',
        description: '一句话说明这个项目做什么，整张卡片都是链接。',
        meta: 'Astro',
      },
    ],
  },
  {
    id: 'tools',
    title: '工具与服务',
    description: '日常使用、值得推荐的工具。',
    layout: 'icons',
    links: [
      {
        label: '示例工具',
        href: 'https://github.com/',
        description: '图标网格：没有图标时显示字母块',
        monogram: 'T',
      },
    ],
  },
  {
    id: 'research',
    title: '研究与参考资料',
    description: '长期回看的文献与资料。',
    links: [
      {
        label: '示例资料',
        href: 'https://github.com/',
        description: '列表版式：左边名称，右边说明，一行一条。',
      },
    ],
  },
  {
    id: 'common',
    title: '常用链接',
    description: '常去的地方和朋友的主页。',
    links: [],
    subgroups: [
      {
        id: 'accounts',
        title: '常去的账号',
        layout: 'badges',
        links: [
          {
            label: '示例账号',
            href: 'https://github.com/',
            description: '徽章版式',
            monogram: 'G',
          },
        ],
      },
      {
        id: 'sites',
        title: '站点收藏',
        layout: 'badges',
        links: [
          {
            label: '示例站点',
            href: 'https://github.com/',
            description: '同一分类下的第二组',
            monogram: 'S',
          },
        ],
      },
    ],
  },
];

/** 判断是否为外部链接（用于决定 target / rel） */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
