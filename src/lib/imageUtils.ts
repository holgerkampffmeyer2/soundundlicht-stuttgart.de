export function getWebpUrl(src: string): string {
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

export function getThumbUrl(src: string): string {
  return src.replace(/\.[^.]+$/, '-thumb.webp');
}
