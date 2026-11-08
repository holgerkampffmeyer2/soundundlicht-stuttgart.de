import type { CollectionEntry } from 'astro:content';
import type { FaqEntry as FaqEntryType } from './faqUtils';

export type ProductData = CollectionEntry<'products'>['data'] & {
  ctaLabel?: string;
  images?: string[];
};
export type CityData = CollectionEntry<'cities'>['data'];
export type FaqEntry = FaqEntryType; // re-export
export interface EventItem { title: string; description: string; personCount: string; }
export interface PagefindMeta { type?: string; price?: string; image?: string; category?: string; label?: string; title?: string; }
export interface JsonLdItem { '@context': string; '@type': string; [key: string]: unknown; }
export interface BreadcrumbSegment { label: string; href?: string; }
export type CatalogProduct = Pick<ProductData, 'slug' | 'title' | 'image' | 'price' | 'category' | 'description' | 'features' | 'detailPage'>;