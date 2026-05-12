import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server/index.ts'],
  format: ['esm'],
  bundle: true,
  splitting: false,
  clean: true,
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
  outDir: 'dist',
  target: 'node20',
  shims: true,
  // Ensure all local files are bundled and not treated as external
  noExternal: [
    /^\./, 
    /^[a-zA-Z]/ 
  ],
  // Only keep real node built-ins as external if needed, 
  // but tsup usually handles them.
  external: [
    'fsevents',
    'aws-sdk',
    'mock-aws-s3',
    'nock'
  ],
});
