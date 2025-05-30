import { defineConfig } from 'tsup'

export default defineConfig({
	outDir: 'dist',
	entry: ['src/index.ts'],
	target: 'es2021',
	minify: true,
	format: ['esm', 'cjs'],
	clean: true,
	dts: true,
	treeshake: true,
})
