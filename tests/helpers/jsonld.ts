import type { Page } from '@playwright/test';

export type JsonLdNode = Record<string, unknown>;

export async function getJsonLdNodes(page: Page): Promise<JsonLdNode[]> {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocks.flatMap((block) => {
    const parsed: unknown = JSON.parse(block.trim());
    return Array.isArray(parsed) ? (parsed as JsonLdNode[]) : [parsed as JsonLdNode];
  });
}

export function jsonLdTypes(nodes: JsonLdNode[]): string[] {
  return nodes.map((node) => String(node['@type']));
}
