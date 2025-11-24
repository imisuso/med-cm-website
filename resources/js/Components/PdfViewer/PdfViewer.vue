<template>
    <div class="w-full h-full flex flex-col bg-gray-100 border border-gray-300 rounded-lg">

        <div class="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm shrink-0 z-10">
            <button
                @click="prevPage" :disabled="currentPage <= 1 || isLoading"
                class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm"
            >
                ❮ Prev
            </button>

            <span class="text-sm font-semibold text-gray-700">
        Page {{ currentPage }} / {{ pageCount || '-' }}
      </span>

            <button
                @click="nextPage" :disabled="currentPage >= pageCount || isLoading"
                class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm"
            >
                Next ❯
            </button>
        </div>

        <div class="flex-1 relative bg-gray-500/10 overflow-auto flex justify-center p-4">

            <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
                <span class="animate-pulse font-bold text-gray-500">Processing PDF...</span>
            </div>

            <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-white z-20 text-red-500">
                {{ error }}
            </div>

            <div v-if="localBlobUrl" class="bg-white shadow-lg" style="min-height: 600px;">
                <VuePdfEmbed
                    ref="pdfRef"
                    :source="localBlobUrl"
                    :page="currentPage"
                    :width="800"
                    @loaded="handleLoaded"
                    @rendered="handleRendered"
                    @loading-failed="handleError"
                />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import VuePdfEmbed from 'vue-pdf-embed';

// *** ลบ import css ที่ error ออกให้หมด ***

const props = defineProps({
    src: { type: String, required: true }
});

const currentPage = ref(1);
const pageCount = ref(0);
const isLoading = ref(true);
const error = ref(null);
const localBlobUrl = ref(null);
// const pdfWidth = ref(800); // ถ้าจะทำ Responsive ค่อยมาแก้ตรงนี้

const loadPdf = async () => {
    if (!props.src) return;

    isLoading.value = true;
    error.value = null;

    // Reset กลับหน้า 1 เสมอ
    currentPage.value = 1;

    if (localBlobUrl.value) URL.revokeObjectURL(localBlobUrl.value);

    try {
        console.log("Downloading...");
        const response = await axios.get(props.src, {
            responseType: 'blob',
            timeout: 60000
        });

        localBlobUrl.value = URL.createObjectURL(response.data);
        console.log("Blob ready:", localBlobUrl.value);

        // หมายเหตุ: isLoading จะปิดตอน handleRendered ทำงาน

    } catch (e) {
        console.error("Error:", e);
        error.value = "Load Failed";
        isLoading.value = false;
    }
};

const handleLoaded = (pdfDoc) => {
    console.log("Metadata Loaded. Pages:", pdfDoc.numPages);
    pageCount.value = pdfDoc.numPages;
};

// *** ต้องเห็น Log นี้ใน Console ถึงจะแปลว่าวาดเสร็จ ***
const handleRendered = () => {
    console.log("Rendered Success!");
    isLoading.value = false;
};

const handleError = (ev) => {
    console.error("Render Error:", ev);
    error.value = "Render Failed";
    isLoading.value = false;
};

const nextPage = () => {
    if (currentPage.value < pageCount.value) {
        isLoading.value = true;
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        isLoading.value = true;
        currentPage.value--;
    }
};

onMounted(() => { loadPdf(); });
watch(() => props.src, () => { loadPdf(); });
onUnmounted(() => {
    if (localBlobUrl.value) URL.revokeObjectURL(localBlobUrl.value);
});
</script>
