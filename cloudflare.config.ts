import { bindings, defineWorker } from 'wrangler/experimental-config';

export default defineWorker({
  name: 'gensai-akademy',
  compatibilityDate: '2026-08-17',
  workersDev: true,
  entrypoint: './dist/server/entry.mjs',
  env: {
    ASSETS: bindings.assets(),
  },
});
