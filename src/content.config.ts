import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/blog" }),
  schema: ({image}) => z.object({
    title: z.string(),  
    description: z.string().optional(),
    date: z.coerce.date(),
    date_updated: z.coerce.date().optional(),
    excerpt: z.string().optional(),
    ogimage: image().optional(),
    pinned: z.boolean().optional(),
    published: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  })
});

export const collections = { blog };