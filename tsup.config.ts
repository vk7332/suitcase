import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server/index.ts'],
  format: ['cjs'],
  bundle: true,
  splitting: false,
  clean: true,
  sourcemap: false,
  minify: false,
  target: 'node20',
  platform: 'node',
  external: [
    'canvas',
    'chromium-bidi',
    'chromium-bidi/lib/cjs/bidiMapper/BidiMapper',
    'chromium-bidi/lib/cjs/cdp/CdpConnection',
    'playwright',
    'playwright-core',
    'fsevents',
    'fs',
    'path'
  ],
  outDir: 'dist',
});
