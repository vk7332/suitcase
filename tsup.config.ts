import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    server: 'server/index.ts',
  },
  format: ['esm'],
  outExtension() {
    return {
      js: '.mjs',
    }
  },
  bundle: true,
  splitting: false,
  clean: true,
  sourcemap: false,
  minify: false,
  target: 'node20',
  shims: true,
  noExternal: [/(.*)/], 
  external: [
    'canvas',
    'fsevents',
  ],
});
