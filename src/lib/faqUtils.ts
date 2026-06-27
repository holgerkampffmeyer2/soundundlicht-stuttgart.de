import { getCollection } from 'astro:content';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  pages?: string[];
}

export async function getFaqsForPage(currentPage: string): Promise<FaqEntry[]> {
  const faqs = await getCollection('faqs');
  return faqs.filter((faq: any) => {
    if (!faq.data.pages) return true;
    if (faq.data.pages.length === 0) return true;
    for (let i = 0; i < faq.data.pages.length; i++) {
      if (faq.data.pages[i] === currentPage || faq.data.pages[i] === 'index') {
        return true;
      }
    }
    return false;
  });
}
