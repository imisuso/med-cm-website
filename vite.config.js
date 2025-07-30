import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        tailwindcss(),
    ],
    css: {
        postcss: {
            plugins: [
                // กรองไฟล์ CSS ว่าง
                {
                    postcssPlugin: 'skip-empty-css',
                    Once (root) {
                        if (!root.nodes || root.nodes.length === 0) {
                            root.removeAll();
                        }
                    }
                }
            ]
        }
    }
});
