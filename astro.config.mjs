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
  build: {
    format: 'directory',
  },
  integrations: [sitemap(), pagefind()],
});
