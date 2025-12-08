<template>
    <component :is="currentHistoryComponent" />
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import { usePage } from '@inertiajs/vue3'; // ใช้ของ Inertia โดยตรง
import HistoryTH from "@/Components/Content/HistoryTH.vue";
import HistoryEN from "@/Components/Content/HistoryEN.vue";
import {computed} from "vue";

const page = usePage();

// สร้าง Computed เพื่อเลือก Component ตามภาษา
const currentHistoryComponent = computed(() => {
    // ถ้า locale เป็น 'th' ให้ส่ง Component ไทย, นอกนั้นส่งอังกฤษ
    return page.props.locale === 'th' ? HistoryTH : HistoryEN;
});



</script>

<style>

</style>
