<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการส่วนของดาวน์โหลด</div>
                <input type="text" v-model="search" class="text rounded-md border-gray-400" placeholder="ค้นหาจากชื่อหัวข้อ">
            </div>
            <div class="">
                <Link :href="route('admin.download.create')" method="get" as="button" type="button"
                    class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                >
                    เพิ่ม
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

import DownloadItemInteractiveCardList from '@/Components/DownloadItemInteractiveCardList'
import Pagination from '@/Components/Paginations'

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

 const deleteItem = ( item ) => {
    Inertia.delete(route('admin.download.delete', item.id), {
        onBefore: () => { return confirm('คุณต้องการลบรายการนี้ ใช่ หรือ ไม่ ?') },
        onSuccess: () => { toast('success', 'สำเร็จ', 'ลบข้อมูลดาวน์โหลด เรียบร้อย') },
        onError: (errors) => { console.log(errors) },
        onFinish: () => {}
    });
}

</script>

<style>

</style>