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
    // --- เพิ่มส่วนนี้เข้าไป  ---
    // ให้มันเปิดรับการเชื่อมต่อจากข้างนอก (0.0.0.0) และตั้งค่า Hot Reload ให้ถูกต้อง เพื่อทำงานกับ Docker
    server: {
        host: '0.0.0.0', // ให้ Vite รันแบบ Public ใน Container
        hmr: {
            host: 'localhost', // บอก Browser ว่าให้ต่อ Socket มาที่ localhost เครื่องเรา
        },
    },
    // -------------------------
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
