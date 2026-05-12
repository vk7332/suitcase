import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server/index.ts'],
  format: ['esm'],
  bundle: true,
  splitting: false,
  clean: true,
  sourcemap: false, // Disable sourcemaps to keep it simple for now
  minify: false, // Disable minify to see the code clearly
  outDir: 'dist',
  target: 'node20',
  shims: true,
  noExternal: [/(.*)/], // Force EVERYTHING into the bundle
  external: [
    'canvas',
    'fsevents',
  ],
});
