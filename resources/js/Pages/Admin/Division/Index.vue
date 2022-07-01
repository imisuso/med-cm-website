<template>
  <AdminAppLayout>
    <div class="flex flex-col p-4 w-full">
      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
        <div class=" text-2xl font-bold">จัดการสาขา / หน่วยงาน</div>
        <input type="text" v-model="search" class="text rounded-md border-gray-400" placeholder="ค้นหาจากชื่อหน่วย/สาขา">  
      </div>
      <div class="">
        <Link :href="route('admin.division.create')" method="get" as="button" type="button"
            class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
        >
            เพิ่ม
        </Link>
      </div>

      <!-- Modal สำหรับ confirm การลบ สาขา/หน่วยงาน -->
      <teleport to="body">
      <Modal :isModalOpen="deleteDivisionModal" >
        <!-- Modal Header -->
        <template v-slot:header>
          <div class="text-gray-900 text-xl font-medium dark:text-white">
              คุณต้องการลบข้อมูลของ สาขา/หน่วยงาน
          </div>
        </template>
        <!-- Modal Body -->
        <template v-slot:body>
          <div class="flex flex-row justify-start items-center">
            <img :src="url" alt="" class="h-20 w-20 rounded-full object-cover mr-4" />
            <div class="text-gray-900 text-md font-medium dark:text-white">
                {{ divisionForm.name_th }}
            </div>
          </div>
        </template>
        <!-- Modal Footer -->
        <template v-slot:footer>
          <button @click="openDeleteDivisionModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
          <button @click="deleteDivision()" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">ลบ</button>
        </template>
      </Modal>
      </teleport>

      <!-- สำหรับแสดงผล list รายชื่อ สาขา/หน่วยงาน -->
      <div v-for="item in props.divisions.data" :key="item.id" class="flex flex-col items-center space-y-4 sm:flex-row w-full px-4 py-2 mb-4 mx-auto bg-gradient-to-l from-sky-100 rounded-lg shadow-md dark:bg-gray-800">  
        <div>
          <img :src="`${item.image_url}`" class="h-20 w-20 rounded-full object-cover mr-4"/>
        </div>
        <div class="flex w-full items-center justify-between ml-2">
            <div class="flex items-baseline">
              <p class="text-md mr-2">{{ item.division_id }}.</p> 
              <span class="text-md font-normal text-black dark:text-gray-400">
              {{ item.name_th }}
              <p class="text-gray-600 text-sm">({{ item.name_en }})</p>
              <p class="text-gray-600">ประเภท : {{item.division_type}}</p>
            </span>
            </div>
            <div class="flex flex-col space-y-2 items-end sm:space-y-0 sm:flex-row sm:items-center space-x-1 ml-2">
              <Link :href="route('admin.division.edit', item.id)" class="flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-full border border-orange-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </Link>
              <button @click="confirmDeleteDivision(item)" class="flex items-center mx-1 text-red-500 bg-white hover:bg-red-200 focus:ring-4 focus:ring-red-300 rounded-full border border-red-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div> 
        </div>
      </div>

      <Paginations :pagination="divisions"/>
    </div>
  </AdminAppLayout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Inertia } from '@inertiajs/inertia'
import { useForm, Link } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal'
import Paginations from '@/Components/Paginations'

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const props = defineProps({
    divisions: { type: Object, required: true },
    filters: { type: Object },
})

const blank_image = '/fallbackimage/default-blank-image.jpg'
const url = ref(null)
const baseUrl = ref(base_url)
const deleteDivisionModal = ref(false)
let search = ref(props.filters.search)

const divisionForm = useForm({
  id: null,
  name_th: null
});

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('admin.division'), { search: value }, {
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

const openDeleteDivisionModal = (isopen) => {
  deleteDivisionModal.value = isopen
  if( !isopen ) {
    divisionForm.reset()
  }
}

const confirmDeleteDivision = (item) => {
  url.value = item.image ? item.image_url : `${baseUrl.value}${blank_image}`
  divisionForm.id = item.id
  divisionForm.name_th = item.name_th
  openDeleteDivisionModal(true)
}

const deleteDivision = () => {
  Inertia.delete(route('admin.division.delete', divisionForm.id), {
    preserveState: true,
    //onBefore: () => { return confirm('Are you sure you want to delete this division?') },
    onSuccess: () => {
      toast('success', 'สำเร็จ', 'ลบข้อมูล สาขา/หน่วยงาน เรียบร้อย');
    },
    onError: (errors) => {
      let error_display = ''
      for ( let p in errors ) {
        error_display = error_display + `- ${errors[p]}<br/>`
      }
      toast('danger', 'พบปัญหา', error_display);
    },
    onFinish: () => {
      divisionForm.processing = false 
    }
  });
  openDeleteDivisionModal(false)
}
</script>

<style scoped>
</style>