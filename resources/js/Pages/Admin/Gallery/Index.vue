<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการ Galleries รูปกิจกรรม</div>
                <input type="text" v-model="search" class="text rounded-md border-gray-400" placeholder="ค้นหาจากรายละเอียด">
            </div>

            <div class="flex space-x-2">
                <Link :href="route('admin.gallery.create')" method="get" as="button" type="button"
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

            <div v-if="galleries.data.length === 0" class="flex flex-col justify-center  mt-10 p-2 text-2xl text-white text-center border rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500">
                ไม่พบข้อมูล Galleries รูปกิจกรรม ในระบบ
            </div>

            <div class="flex flex-col w-full mb-4">
                <GalleryInteractiveCardList
                    v-for="(item, index) in galleries.data"
                    :key="index"
                    :galleryDetails="item"
                    @edit-gallery="editGallery(item)"
                    @delete-gallery="confirmDeleteGallery(item)"
                />
            </div>

            <Paginations :pagination="galleries"/>

            <!-- Modal สำหรับ confirm การลบ ข้อมูลแกลลอรี่  -->
            <Modal :isModalOpen="deleteGalleryModal" >

            <template v-slot:header>
                <div class="text-gray-900 text-xl font-medium dark:text-white">
                    คุณต้องการลบข้อมูลแกลลอรี่
                </div>
            </template>

            <template v-slot:body>
                <div class="text-gray-900 text-md font-medium dark:text-white">
                    {{ galleryForm.desc }}
                    <!-- <img class="shadow-lg rounded-md h-20 w-16 mb-1 mt-1" :src="`${galleryForm.event_date}`" alt=""/> -->
                </div>
            </template>

            <template v-slot:footer>
                <button @click="deleteGallery()" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">ลบ</button>
                <button @click="openDeleteGalleryModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
            </template>
            </Modal>
        </div>
<!--    </AdminAppLayout>-->
</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
    export default {
        layout: AdminAppLayout,
    }
</script>

<script setup>
import { ref, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, Link } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal.vue'
import GalleryInteractiveCardList from '@/Components/GalleryInteractiveCardList.vue'
import Paginations from '@/Components/Paginations.vue'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast


const props = defineProps({
    galleries: { type: Object, required: true, default: {} },
    filters: { type: Object },
})

let search = ref(props.filters.search)

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('admin.gallery'), { search: value }, {
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

const galleryForm = useForm({
    id: null,
    desc: null,
    event_date: ref(dayjs().startOf('day').toDate())
});

const deleteGalleryModal = ref(false)

const openDeleteGalleryModal = (isopen) => {
    deleteGalleryModal.value = isopen
    if( !isopen ) {
        galleryForm.reset()
    }
}

const confirmDeleteGallery = ( galleryData ) => {
    axios({
        url: route('admin.gallery.check_empty', dayjs(galleryData.event_date).locale('th').format('YYYYMMDD')),
        method: 'GET',
    }).then((response) => {
        if(response.data > 0 ) {
            toast('warning', 'คำเตือน', 'ตรวจพบรูปภาพในแกลลอรี่ <br> กรุณาลบรูปทั้งหมดในแกลลอรี่นี้ก่อนทำการลบ แกลลอรี่');
            return true
        }
        else {
            galleryForm.id = galleryData.id
            galleryForm.desc = galleryData.desc
            openDeleteGalleryModal(true)
        }
    });

}

const editGallery = ( item ) => {
  Inertia.get(route('admin.gallery.edit', item.id), {}, {
    preserveState: true,
    replace: true
  })
}

const deleteGallery = () => {
    galleryForm.delete(route('admin.gallery.delete', galleryForm.id), {
        preserveState: false,
        onSuccess: () => {
            toast('success', 'สำเร็จ', 'ลบข้อมูลแกลลอรี่ เรียบร้อย')
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            galleryForm.processing = false
        }
    });

  openDeleteGalleryModal(false)
}

</script>

<style scoped>
.dp-custom-input {
    border: rgb(99 102 241 / var(--tw-border-opacity));
}
</style>
