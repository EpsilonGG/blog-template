import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { BLOG_TAGS, BLOG_TAG_HINT } from './config/tags';

/**
 * 文章集合。
 *
 * - 文件放在 src/content/blog/，每个文件一篇文章。
 * - 文件名（不含扩展名）就是 URL 中的 slug，因此修改标题不会改变既有链接。
 * - 构建时由 Zod 校验字段，字段缺失或类型错误会让构建失败并指出具体文件。
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z
    .object({
      title: z.string().trim().min(1, 'title 不能为空'),
      description: z.string().trim().min(1, 'description 不能是空字符串').optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string().trim().min(1)).default([]),
      draft: z.boolean().default(false),
      /**
       * 内容来源 / 披露标记。
       * - `original`（默认）：本人原创，或转载/整理自其它网站但由人工完成。
       *   默认「笔记」列表（栏目名「原创与转载」）展示的就是这一类。
       * - `ai`：由 AI 参与整理/生成的文章。默认列表不包含，需要手动开启
       *   滑块后才会出现，单篇页面与列表项都会显示「AI 整理」标记作披露。
       */
      source: z.enum(['original', 'ai']).default('original'),
    })
    .superRefine((data, ctx) => {
      if (data.updatedDate && data.updatedDate.getTime() < data.pubDate.getTime()) {
        ctx.addIssue({
          code: 'custom',
          message: 'updatedDate 不能早于 pubDate',
          path: ['updatedDate'],
        });
      }

      /**
       * 标签是封闭集合（见 `src/config/tags.json`）：六个大格子之外一律不许新增。
       * 想加新标签，先改那份 JSON，而不是在文章里就地发明一个。
       */
      data.tags.forEach((tag, index) => {
        if (!BLOG_TAGS.includes(tag)) {
          ctx.addIssue({
            code: 'custom',
            message: `标签「${tag}」不在允许范围内。可用：${BLOG_TAG_HINT}。放不进去就写「其它」。`,
            path: ['tags', index],
          });
        }
      });
    }),
});

export const collections = { blog };
