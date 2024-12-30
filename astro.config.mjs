import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    mdx()
  ],

  markdown: {
    shikiConfig: {
      theme: 'night-owl',
      wrap: true
    }
  },

  adapter: netlify()
});