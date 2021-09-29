import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			script: {
				refSugar: true,
				refTransform: true
			}
		})
	],
	base: './',
	server: {
		open: true,
		host: 'localhost',
		port: 80,
		https: false,
		proxy: {
			'/api': {
				target: 'http://81.68.95.59:8888',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		},
		fs: {
			strict: false
		}
	},
	publicDir: 'public/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/')
		}
	}
})
