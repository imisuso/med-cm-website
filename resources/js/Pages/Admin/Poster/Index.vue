<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการโปสเตอร์</div>
                <input type="text" v-model="search" class="text rounded-md border-gray-400" placeholder="ค้นหาจากรายละเอียด">
            </div>

            <div class="flex space-x-2">
                <Link :href="route('admin.poster.create')" method="get" as="button" type="button"
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

            <div v-if="posters.data.length === 0" class="flex flex-col justify-center  mt-10 p-2 text-2xl text-white text-center border rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500">
                ไม่พบข้อมูลโปสเตอร์ในระบบ
            </div>

            <div class="flex flex-col w-full">
                <PosterInteractiveCardList 
                    v-for="(item, index) in posters.data" 
                    :key="index" 
                    :posterDetails="item"
                    @delete-poster="confirmDeletePoster(item)"
                />
            </div>

            <!-- Modal สำหรับ confirm การลบ ข้อมูลโปสเตอร์  -->
            <teleport to="body">
            <Modal :isModalOpen="deletePosterModal" >
                <template v-slot:header>
                    <div class="text-gray-900 text-xl font-medium dark:text-white">
                        คุณต้องการลบข้อมูลโปสเตอร์
                    </div>
                </template>

                <template v-slot:body>
                    <div class="flex flex-row justify-start items-center">
                        <img class="shadow-lg rounded-md h-20 w-16 mb-1 mt-1 mr-4" :src="`${posterForm.cover}`" alt=""/>
                        <div class="text-gray-900 text-md font-medium dark:text-white truncate">
                            {{ posterForm.desc }}
                        </div>
                    </div>
                </template>

                <template v-slot:footer>
                    <button @click="openDeletePosterModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
                    <button @click="deletePoster()" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">ลบ</button>
                </template>
            </Modal>
            </teleport>
        </div>

        <div class="flex justify-center md:justify-end mt-2 px-4">
            <Pagination :pagination="posters"/>
        </div>
    </AdminAppLayout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, Link } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal'
import PosterInteractiveCardList from '@/Components/PosterInteractiveCardList'
import Pagination from '@/Components/Paginations'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast


const props = defineProps({
    posters: { type: Object, required: true, default: {} },
    filters: { type: Object },
})

let search = ref(props.filters.search)

watch( search, value => {
    Inertia.get(route('admin.poster'), { search: value }, {
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

const posterForm = useForm({
    id: null,
    desc: null,
    cover: null,
});

const deletePosterModal = ref(false)

const openDeletePosterModal = (isopen) => {
  deletePosterModal.value = isopen
  if( !isopen ) {
    posterForm.reset()
  }
}

const confirmDeletePoster = ( posterData ) => {
  posterForm.id = posterData.id
  posterForm.desc = posterData.desc
  posterForm.cover = posterData.cover_url
  openDeletePosterModal(true)
}

const deletePoster = () => {
  posterForm.delete(route('admin.poster.delete', posterForm.id), {
    onSuccess: () => {
        toast('success', 'สำเร็จ', 'ลบข้อมูลโปสเตอร์เรียบร้อย')
    },
    onError: (errors) => {
        let error_display = ''
        for ( let p in errors ) {
            error_display = error_display + `- ${errors[p]}<br/>`
        }
        toast('danger', 'พบข้อผิดพลาด', error_display);
    },
    onFinish: () => {
        posterForm.processing = false 
    }
  });

  openDeletePosterModal(false)
}

</script>

<style>

</style>