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
  noExternal: [/(.*)/],
  external: [
    'canvas',
    'fsevents'
  ],
  outDir: 'dist'
});
