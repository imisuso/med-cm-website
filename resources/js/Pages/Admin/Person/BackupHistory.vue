<template>
    <div class="flex flex-col px-2 py-1 w-full">
        <div class="mt-2 mb-2 text-2xl font-bold">ประวัติการแก้ไขข้อมูล </div>

        <Link :href='route("admin.person")' >
            <button @click='route("admin.person")' type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">กลับ</button>
        </Link>
    </div>

</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
export default {
    layout: AdminAppLayout,
}
</script>

<script setup>
import { ref } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

const props = defineProps({
    person_versions: { type: Array, required: true, default: [] },
    // division_version: { type: Array, default: [] }
})
</script>
