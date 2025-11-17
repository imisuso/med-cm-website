<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
export default {
    layout: AdminAppLayout,
}
</script>

<script setup>

const props = defineProps({
    total_visitor: { type: Number, default: 0 },
    branch_visitor: { type: Number, default: 0 },
    total_announce: { type: Number, default: 0 },
    total_poster: { type: Number, default: 0 }
})
</script>

<template>
    <div class="flex flex-col p-4 w-full">
        <!-- Toolbar -->
        <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border border-gray-200 rounded-md shadow-md items-baseline">
            <div class=" text-2xl font-bold">หน้าแรก</div>
        </div>
    </div>
</template>
