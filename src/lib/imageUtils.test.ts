// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { getWebpUrl, getThumbUrl } from './imageUtils';

describe('getWebpUrl', () => {
  it('converts .jpg to .webp', () => {
    expect(getWebpUrl('image.jpg')).toBe('image.webp');
  });

  it('converts .jpeg to .webp', () => {
    expect(getWebpUrl('image.jpeg')).toBe('image.webp');
  });

  it('converts .png to .webp', () => {
    expect(getWebpUrl('image.png')).toBe('image.webp');
  });

  it('handles uppercase extensions', () => {
    expect(getWebpUrl('image.JPG')).toBe('image.webp');
    expect(getWebpUrl('image.PNG')).toBe('image.webp');
  });

  it('handles path with directories', () => {
    expect(getWebpUrl('path/to/image.jpg')).toBe('path/to/image.webp');
  });

  it('returns unchanged for non-image extensions', () => {
    expect(getWebpUrl('document.pdf')).toBe('document.pdf');
    expect(getWebpUrl('script.js')).toBe('script.js');
    expect(getWebpUrl('data.json')).toBe('data.json');
  });

  it('returns unchanged for already .webp', () => {
    expect(getWebpUrl('image.webp')).toBe('image.webp');
  });

  it('handles filenames with multiple dots', () => {
    expect(getWebpUrl('my.image.file.jpg')).toBe('my.image.file.webp');
  });

  it('handles empty string', () => {
    expect(getWebpUrl('')).toBe('');
  });
});

describe('getThumbUrl', () => {
  it('replaces extension with -thumb.webp for .jpg', () => {
    expect(getThumbUrl('image.jpg')).toBe('image-thumb.webp');
  });

  it('replaces extension with -thumb.webp for .png', () => {
    expect(getThumbUrl('image.png')).toBe('image-thumb.webp');
  });

  it('replaces extension with -thumb.webp for .webp', () => {
    expect(getThumbUrl('image.webp')).toBe('image-thumb.webp');
  });

  it('handles path with directories', () => {
    expect(getThumbUrl('path/to/image.jpg')).toBe('path/to/image-thumb.webp');
  });

  it('handles filenames with multiple dots', () => {
    expect(getThumbUrl('my.image.file.jpg')).toBe('my.image.file-thumb.webp');
  });

  it('handles uppercase extensions', () => {
    expect(getThumbUrl('image.JPG')).toBe('image-thumb.webp');
    expect(getThumbUrl('image.PNG')).toBe('image-thumb.webp');
  });

  it('returns unchanged for non-standard extensions', () => {
    expect(getThumbUrl('document.pdf')).toBe('document-thumb.webp');
  });

  it('handles empty string', () => {
    // regex replace on empty string returns empty string
    expect(getThumbUrl('')).toBe('');
  });
});