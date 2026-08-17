import { defineWranglerConfig } from 'wrangler/experimental-config';

export default defineWranglerConfig({
  build: {
    command: 'pnpm build',
  },
  assetsDirectory: './dist/client',
});
