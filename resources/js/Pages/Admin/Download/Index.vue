<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการส่วนของดาวน์โหลด</div>
                <input type="text" v-model="search" class="text rounded-md border-gray-400" placeholder="ค้นหาจากชื่อหัวข้อ">
            </div>
            <div class="flex space-x-2">
                <Link :href="route('admin.download.create')" method="get" as="button" type="button"
                    class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                >
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <div>เพิ่ม</div>
                </Link>
            </div>
        </div>
        
        <div class="flex flex-col px-4 w-full">
            <DownloadItemInteractiveCardList 
                v-for="(item, index) in items.data" 
                :key="index" 
                :downloadItem="item"
                :index="index+1"
            />
        </div>

        <div class="flex justify-center md:justify-end mt-2 px-4">
            <Pagination :pagination="items"/>
        </div>

    </AdminAppLayout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import DownloadItemInteractiveCardList from '@/Components/DownloadItemInteractiveCardList.vue'
import Pagination from '@/Components/Paginations.vue'

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const props = defineProps({
    items: { type: Object, required: true, default: {} },
    filters: { type: Object },
})

let search = ref(props.filters.search)

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('admin.download'), { search: value }, {
        preserveState: true,
        replace: true
    })
})

const toast = (severity, summary, detail) => {
    createToast({
      title: summary,
      description: detail
    },
    {
      showIcon: true,
      transition: 'zoom',  // Can bounce, zoom, slide
      position: 'top-right', // Can top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
      type: severity,    // Can default, info, warning, success, danger
      timeout: 3000,
      //toastBackgroundColor: bg_color,
    })
}

// const statusText = (text) => {
//     return text ? 'เปิด' : 'ปิด'
// }

// const deleteItem = ( item ) => {
//     Inertia.delete(route('admin.download.delete', item.id), {
//         onBefore: () => { return confirm('คุณต้องการลบรายการนี้ ใช่ หรือ ไม่ ?') },
//         onSuccess: () => { toast('success', 'สำเร็จ', 'ลบข้อมูลดาวน์โหลด เรียบร้อย') },
//         onError: (errors) => { console.log(errors) },
//         onFinish: () => {}
//     });
// }

</script>

<style>

</style>