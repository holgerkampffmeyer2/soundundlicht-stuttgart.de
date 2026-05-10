import { faqs } from '../data/faqs.ts';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  pages?: string[]; // Empty array means show on all pages
}

/**
 * Get FAQs for a specific page
 * @param currentPage - The current page identifier (should match the pages array in FaqEntry)
 * @returns Array of FAQs that should be displayed on the given page
 */
export function getFaqsForPage(currentPage: string): FaqEntry[] {
  return faqs.filter(faq => {
    if (!faq.pages) return true;
    if (faq.pages.length === 0) return true;
    
    // Manual includes check for older TypeScript targets
    for (let i = 0; i < faq.pages.length; i++) {
      if (faq.pages[i] === currentPage) {
        return true;
      }
    }
    return false;
  });
}