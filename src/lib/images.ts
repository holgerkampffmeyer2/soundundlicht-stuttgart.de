import { getImage, type ImageMetadata } from 'astro:assets';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sliderImages: Record<string, any> = import.meta.glob('/src/assets/slider/*.{webp,jpg,png}');

export function getSliderImage(filename: string): ImageMetadata | undefined {
  for (const key of Object.keys(sliderImages)) {
    if (key.endsWith(filename)) {
      return sliderImages[key] as ImageMetadata;
    }
  }
}
