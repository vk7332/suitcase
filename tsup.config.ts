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
  // We MUST keep node built-ins external in ESM to avoid "Dynamic require of fs" errors
  external: [
    'fs',
    'path',
    'os',
    'crypto',
    'stream',
    'events',
    'http',
    'https',
    'net',
    'tls',
    'zlib',
    'canvas',
    'fsevents'
  ],
  noExternal: [/(.*)/], // Bundle all npm packages EXCEPT the ones in 'external'
});
