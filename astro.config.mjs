import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.samjulien.com',

  integrations: [react(), tailwind(), mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'night-owl',
      wrap: true
    }
  },

  adapter: netlify()
});