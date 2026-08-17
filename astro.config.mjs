import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gensai-akademy.alex03marcos.workers.dev',
  output: 'server',
  trailingSlash: 'never',
  redirects: {
    '/altas-capacidades': '/',
    '/inteligencia-emocional': '/altas-capacidades-adultos',
    '/contacto': '/',
    '/gracias': '/',
    '/blog/senales-altas-capacidades-hijos': '/blog/mi-hijo-tiene-altas-capacidades',
    '/blog/altas-capacidades-adultos': '/blog/encontrar-proposito-altas-capacidades',
  },
  devToolbar: { enabled: false },
  session: false,
  adapter: cloudflare({ imageService: 'passthrough' }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    // passthrough image service is loaded via a virtual entry; without this,
    // Vite rediscovers it at boot, re-hashes deps_ssr, and workerd crashes.
    optimizeDeps: {
      include: ['astro/assets/services/noop'],
    },
  },
});
