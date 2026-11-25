// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { getFaqsForPage } from './faqUtils';

const idsFor = (page: string) => getFaqsForPage(page).map((faq) => faq.id);

describe('[REQ-FAQ-01] getFaqsForPage', () => {
  it('gibt FAQs mit pages=["index"] auf der Startseite zurück', () => {
    const result = idsFor('index');
    expect(result).toContain('dj-booking');
    expect(result).toContain('zahlungsmethoden');
  });

  it('gibt index-FAQs nicht auf Produkt- oder Katalogseiten zurück', () => {
    expect(idsFor('ld-maui-28g3')).not.toContain('dj-booking');
    expect(idsFor('vermietung')).not.toContain('dj-booking');
  });

  it('filtert nach dem aktuellen Seiten-Slug', () => {
    const result = idsFor('vermietung');
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('general-pricing');
  });

  it('gibt FAQs für eine Stadtseite zurück', () => {
    const result = idsFor('stuttgart');
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('zahlungsmethoden');
  });

  it('gibt für unbekannte Seiten nur globale FAQs zurück', () => {
    const result = getFaqsForPage('nonexistent-page');
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((faq) => faq.tags?.includes('global'))).toBe(true);
  });
});

describe('[REQ-FAQ-03] Tag-basierte FAQ-Filterung', () => {
  it('zeigt globale FAQs auf allen Seitentypen', () => {
    for (const page of ['index', 'vermietung', 'jbl-partybox-300-320', 'ld-maui-28g3', 'stuttgart']) {
      expect(idsFor(page)).toContain('zahlungsmethoden');
    }
  });

  it('zeigt JBL-FAQs auf allen JBL-Seiten', () => {
    for (const page of ['jbl-partybox-300-320', 'akku-party-paket', 'partypaket-stuttgart', 'karaoke-paket']) {
      const result = idsFor(page);
      expect(result).toContain('general-pricing');
      expect(result).toContain('jbl-akkulaufzeit');
    }
  });

  it('zeigt die Partybox-FAQ nicht auf LD- oder Lichtseiten', () => {
    for (const page of ['ld-maui-28g3', 'veranstaltungspaket-stuttgart', 'djpaket-fildern', 'led-scheinwerfer']) {
      expect(idsFor(page)).not.toContain('general-pricing');
    }
  });

  it('zeigt LD-FAQs auf LD-Seiten', () => {
    expect(idsFor('veranstaltungspaket-stuttgart')).toContain('pa-anlage-50-personen');
    expect(idsFor('ld-maui-28g3')).toContain('ld-maui-personen');
    expect(idsFor('ld-systems-icoa-series')).toContain('icoa-system-unterschied');
  });

  it('zeigt Licht- und Nebel-FAQs nur auf passenden Seiten', () => {
    expect(idsFor('led-scheinwerfer')).toContain('lichtanlage-preis');
    expect(idsFor('led-bossfx-nebelmaschine')).toContain('nebelmaschine-pakete');
    expect(idsFor('kls-laser-bar')).toContain('nebelmaschine-pakete');
    expect(idsFor('mini-party-beamer')).not.toContain('lichtanlage-preis');
    expect(idsFor('mikrofon-mischpult')).not.toContain('general-pricing');
  });
});