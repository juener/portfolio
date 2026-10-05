import { resolve } from 'node:path'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: [{ find: /^@\//, replacement: `${resolve(import.meta.dirname, 'src')}/` }],
	},
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
	},
	plugins: [
		swc.vite({
			module: { type: 'es6' },
			jsc: {
				parser: { syntax: 'typescript', decorators: true },
				transform: { legacyDecorator: true, decoratorMetadata: true },
			},
		}),
	],
})
