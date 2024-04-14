import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'es2018',
  minify: true,
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  external: ['react', 'react-dom'],
  plugins: [],
});
