import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

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
    resolve: {
        alias: {
            // ให้ @ ชี้ไปที่ resources/js (ค่ามาตรฐาน)
            '@': '/resources/js',
            // ให้ @images ชี้ไปที่โฟลเดอร์เก็บรูปของคุณ
            '@images': '/resources/asset/images',
        },
    },
    // --- เพิ่มส่วนนี้เข้าไป  ---
    // ให้มันเปิดรับการเชื่อมต่อจากข้างนอก (0.0.0.0) และตั้งค่า Hot Reload ให้ถูกต้อง เพื่อทำงานกับ Docker
    server: {
        // host: '0.0.0.0', // ให้ Vite รันแบบ Public ใน Container
        hmr: {
            host: 'localhost', // บอก Browser ว่าให้ต่อ Socket มาที่ localhost เครื่องเรา
        },
        // watch: {
        //     usePolling: true, // บังคับให้ Vite คอยเช็คไฟล์ตลอดเวลา
        // },
        // ตรวจเช็คทุกๆ 100ms (ลดภาระ CPU ลง)
        // interval: 100,
        //
        // // สำคัญที่สุด! สั่งให้ "อย่าตรวจ" โฟลเดอร์ที่มีไฟล์เยอะๆ เหล่านี้
        // ignored: [
        //     '**/node_modules/**',
        //     '**/vendor/**',
        //     '**/public/build/**',
        //     '**/.git/**'
        // ],
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
