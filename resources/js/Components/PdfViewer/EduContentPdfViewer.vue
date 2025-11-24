<template>
    <div class="app-content w-full h-screen">
        <PdfViewer
            v-if="pdfSource"
            :src="pdfSource"
        />

        <div v-else class="flex justify-center items-center h-full">
            Loading PDF...
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import PdfViewer from "@/Components/PdfViewer/PdfViewer.vue";

const props = defineProps({
    pdfFile: { type: String, required: true },
    allPages: { type: Boolean, default: false }
});

// *** แก้ตรงนี้: ตั้งชื่อตัวแปรให้เป็น pdfSource ให้ตรงกับ template ***
const pdfSource = computed(() => {
    if (!props.pdfFile) return null;

    // สร้าง URL ผ่าน Proxy เพื่อแก้ปัญหา CORS
    // ผลลัพธ์: /pdf-proxy?url=https%3A%2F%2Fs3...
    return `/pdf-proxy?url=${encodeURIComponent(props.pdfFile)}`;
});
</script>

<style scoped>
.app-content {
    width: 100%;
    height: 100vh; /* ความสูงเต็มจอ */
}
</style>
