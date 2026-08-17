import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['geniotipo', 'altas-capacidades-familias', 'altas-capacidades-adultos']),
    pubDate: z.coerce.date(),
    minutes: z.number().int().positive(),
    heroImage: z.url().optional(),
  }),
});

export const collections = { blog };
