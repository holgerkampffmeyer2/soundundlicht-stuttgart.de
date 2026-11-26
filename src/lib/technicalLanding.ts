import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from '../data/jsonLd';
import type { BreadcrumbSegment, FaqEntry, JsonLdItem, ProductData } from './types';

export function technicalLandingData({
  title,
  description,
  label,
  priceValue,
  products,
  faqs,
}: {
  title: string;
  description: string;
  label: string;
  priceValue: number;
  products: ProductData[];
  faqs: FaqEntry[];
}): { breadcrumbSegments: BreadcrumbSegment[]; jsonLd: JsonLdItem[] } {
  const breadcrumbSegments: BreadcrumbSegment[] = [
    { label: 'Startseite', href: '/' },
    { label: 'Vermietung', href: '/vermietung' },
    { label },
  ];

  const jsonLd = [
    serviceJsonLd(
      {
        title,
        description,
        priceValue,
        features: products.flatMap((product) => product.features).slice(0, 8),
      },
      products.map((product) => product.image)
    ),
    breadcrumbJsonLd(breadcrumbSegments),
    faqPageJsonLd(faqs),
  ];

  return { breadcrumbSegments, jsonLd };
}
