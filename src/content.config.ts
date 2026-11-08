import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: 'src/content/products' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.string(),
    description: z.string(),
    category: z.enum(['Paket', 'Sound', 'Licht']),
    price: z.string(),
    priceValue: z.number(),
    order: z.number().optional(),
    features: z.array(z.string()),
    detailPage: z.string().optional(),
  }),
});

const faqs = defineCollection({
  loader: file('src/data/faqs.json'),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    tags: z.array(z.string()).optional(),
    pages: z.array(z.string()).optional(),
  }),
});

const cities = defineCollection({
  loader: file('src/data/cities.json'),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    image: z.string(),
    title: z.string(),
    description: z.string(),
    distance: z.string().optional(),
    travelTime: z.string().optional(),
    areas: z
      .array(
        z.object({
          name: z.string(),
          km: z.string().optional(),
          travelTime: z.string().optional(),
          url: z.string().optional(),
        })
      )
      .optional(),
    // Prosa-Felder für dynamische City-Pages (optional, Defaults in Page)
    heroTitle: z.string().optional(),
    heroDescription: z.string().optional(),
    heroDetails: z.string().optional(),
    einzelTitle: z.string().optional(),
    einzelDescription: z.string().optional(),
    areasIntro: z.string().optional(),
    contactDescription: z.string().optional(),
    distanceText: z.string().optional(),
    travelTimeText: z.string().optional(),
  }),
});

export const collections = { products, faqs, cities };
