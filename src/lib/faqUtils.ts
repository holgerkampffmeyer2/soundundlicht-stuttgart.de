import faqsData from '../data/faqs.json';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  pages?: string[];
}

export async function getFaqsForPage(currentPage: string): Promise<FaqEntry[]> {
  return faqsData.filter((faq: FaqEntry) => {
    if (!faq.pages) return true;
    if (faq.pages.length === 0) return true;
    for (let i = 0; i < faq.pages.length; i++) {
      if (faq.pages[i] === currentPage || faq.pages[i] === 'index') {
        return true;
      }
    }
    return false;
  });
}
