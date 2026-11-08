import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() ?? 'https://soundundlicht-stuttgart.de').replace(/\/$/, '');
  const products = await getCollection('products');

  const items = products
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))
    .map(({ data: product }) => ({
      slug: product.slug,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      priceValue: product.priceValue,
      features: product.features,
      image: new URL(product.image, base).toString(),
      detailUrl: product.detailPage ? new URL(product.detailPage, base).toString() : null,
    }));

  return new Response(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseUrl: base,
        products: items,
      },
      null,
      2,
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  );
};
