// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { breadcrumbJsonLd, serviceJsonLd, faqPageJsonLd } from '../data/jsonLd';

describe('City Page Utilities', () => {
  describe('breadcrumbJsonLd', () => {
    it('generates correct BreadcrumbList structure', () => {
      const segments = [
        { label: 'Startseite', href: 'https://soundundlicht-stuttgart.de/' },
        { label: 'Stuttgart', href: 'https://soundundlicht-stuttgart.de/stuttgart' }
      ];
      const result = breadcrumbJsonLd(segments);
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('BreadcrumbList');
      expect(result.itemListElement).toHaveLength(2);
      expect(result.itemListElement[0]['@type']).toBe('ListItem');
      expect(result.itemListElement[0].position).toBe(1);
      expect(result.itemListElement[0].name).toBe('Startseite');
      expect(result.itemListElement[0].item).toBe('https://soundundlicht-stuttgart.de/');
      expect(result.itemListElement[1].position).toBe(2);
      expect(result.itemListElement[1].name).toBe('Stuttgart');
      expect(result.itemListElement[1].item).toBe('https://soundundlicht-stuttgart.de/stuttgart');
    });
  });

  describe('serviceJsonLd', () => {
    it('generates Service schema with correct structure', () => {
      const product = {
        title: 'Test Product',
        description: 'Test Description',
        priceValue: 100,
        features: ['Feature 1', 'Feature 2']
      };
      const images = ['/img/test.webp'];
      const result = serviceJsonLd(product, images);
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('Service');
      expect(result.name).toBe('Test Product');
      expect(result.description).toBe('Test Description');
      expect(result.image).toEqual(['/img/test.webp']);
      expect(result.serviceType).toBe('Veranstaltungstechnik-Vermietung');
      expect(result.areaServed).toBeDefined();
      expect(result.provider).toEqual({ '@type': 'LocalBusiness', '@id': 'https://soundundlicht-stuttgart.de/#business' });
      expect(result.offers).toBeDefined();
      expect(result.offers.priceSpecification.price).toBe(100);
    });
  });

  describe('faqPageJsonLd', () => {
    it('generates FAQPage schema with correct structure', () => {
      const faqs = [
        { id: '1', question: 'Question 1?', answer: 'Answer 1' },
        { id: '2', question: 'Question 2?', answer: 'Answer 2' }
      ];
      const result = faqPageJsonLd(faqs);
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('FAQPage');
      expect(result.mainEntity).toHaveLength(2);
      expect(result.mainEntity[0]['@type']).toBe('Question');
      expect(result.mainEntity[0].name).toBe('Question 1?');
      expect(result.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(result.mainEntity[0].acceptedAnswer.text).toBe('Answer 1');
    });

    it('handles empty FAQ array', () => {
      const result = faqPageJsonLd([]);
      expect(result.mainEntity).toHaveLength(0);
    });
  });
});