import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server/index.ts'],
  format: ['esm'],
  bundle: true,
  splitting: false,
  clean: true,
  sourcemap: false,
  minify: false,
  target: 'node20',
  shims: true,
  noExternal: [/(.*)/],
  skipNodeModulesBundle: false,
});
