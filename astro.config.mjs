import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://soundundlicht-stuttgart.de',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    format: 'directory',
  },
  image: {
    service: {
      config: {
        webp: { effort: 6 },
        avif: { effort: 4 },
      },
    },
  },
  integrations: [sitemap({
    serialize(item) {
      const url = new URL(item.url);
      const path = decodeURIComponent(url.pathname);
      const now = new Date().toISOString();

      let priority = 0.5;
      let changefreq = 'monthly';

      if (path === '/') {
        priority = 1.0;
        changefreq = 'weekly';
      } else if (path.startsWith('/vermietung/') || path === '/vermietung') {
        priority = 0.8;
        changefreq = 'weekly';
      } else if (path.match(/^\/[a-zäöüß-]+(\/)?$/)) {
        priority = 0.6;
        changefreq = 'monthly';
      }

      return { ...item, changefreq, lastmod: now, priority };
    }
  }), pagefind()],
});
