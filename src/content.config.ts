import { defineCollection, z } from 'astro:content';
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
  }),
});

export const collections = { products, faqs, cities };
