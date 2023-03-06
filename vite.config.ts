import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		noExternal:
			process.env.NODE_ENV === 'production'
				? ['@carbon/charts', 'carbon-components']
				: [],
	},
	optimizeDeps: { include: ['@carbon/charts'] },
});
