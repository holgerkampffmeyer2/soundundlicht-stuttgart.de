export interface ProductData {
  slug: string;
  title: string;
  image: string;
  description: string;
  category: string;
  price: string;
  priceValue: number;
  order?: number;
  features: string[];
  detailPage?: string;
}
