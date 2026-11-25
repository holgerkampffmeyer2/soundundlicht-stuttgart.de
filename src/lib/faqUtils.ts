import faqsData from '../data/faqs.json';

export const FAQ_TAGS = ['global', 'jbl', 'ld', 'licht', 'nebel'];
const TOPIC_TAGS = ['jbl', 'ld', 'licht', 'nebel'];

const PAGE_TAGS: Record<string, string[]> = {
  'jbl-partybox-300-320': ['jbl'],
  'akku-party-paket': ['jbl'],
  'partypaket-stuttgart': ['jbl'],
  'karaoke-paket': ['jbl'],
  'ld-maui-28g3': ['ld'],
  'ld-systems-icoa-series': ['ld'],
  'ld-icoa-club-paket': ['ld'],
  'ld-icoa-party-paket': ['ld'],
  'ld-icoa-top-paar': ['ld'],
  'djpaket-fildern': ['ld'],
  'veranstaltungspaket-stuttgart': ['ld'],
  'led-scheinwerfer': ['licht'],
  'partylicht-moving-head': ['licht'],
  'max-party-bar': ['licht'],
  'led-bossfx-nebelmaschine': ['licht', 'nebel'],
  'kls-laser-bar': ['licht', 'nebel'],
  nebelmaschinen: ['licht', 'nebel'],
};

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  pages?: string[];
}

export function getFaqsForPage(currentPage: string): FaqEntry[] {
  const pageTags = PAGE_TAGS[currentPage] ?? [];

  return faqsData.filter((faq: FaqEntry) => {
    const tags = faq.tags ?? [];

    if (tags.includes('global')) return true;

    const topicTags = tags.filter((tag) => TOPIC_TAGS.includes(tag));
    if (topicTags.length > 0 && pageTags.length > 0) {
      return topicTags.some((tag) => pageTags.includes(tag));
    }

    return faq.pages?.includes(currentPage) ?? false;
  });
}
