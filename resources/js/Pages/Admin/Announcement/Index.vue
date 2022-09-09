<template>
<!--  <AdminAppLayout>-->
  <div class="flex flex-col p-4 w-full">
    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
      <div class=" text-2xl font-bold">จัดการข่าวประกาศ</div>
      <Link :href="route('admin.announce.create')" :data="{ 'fdivision_selected': filterForm.fdivision_selected }" method="get" as="button" type="button"
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

    <div class="mt-0 mb-2 md:col-span-2">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-2">
            <div class="col-span-6">
              <label for="filter_topic" class="block text-sm font-medium text-gray-700">หัวข้อข่าว</label>
              <input type="text" v-model="filterForm.ftopic" id="filter_topic" placeholder="ค้นหาจากหัวข้อข่าว" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>

            <div v-if="$page.props.auth.abilities.includes('view_all_content')" class="col-span-6 sm:col-span-3">
              <label for="division_selected" class="block text-sm font-medium text-gray-700">สาขา/หน่วยงาน</label>
              <select v-model="filterForm.fdivision_selected" id="division_selected" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="0">ทุกสาขา/หน่วยงาน</option>
                <option v-for="(option, index) in divisions" :key="index" :value="option.division_id">
                  {{ option.name_th }}
                </option>
              </select>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="division_selected" class="block text-sm font-medium text-gray-700">ประเภทประกาศ</label>
              <select v-model="filterForm.fexpire_type" id="division_selected" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="all">ทั้งหมด</option>
                <option value="alive">ประกาศที่ยังไม่หมดอายุเท่านั้น</option>
                <option value="expire">ประกาศที่หมดอายุเท่านั้น</option>
              </select>
            </div>
          </div>
        </div>
        <div class="px-4 py-1 bg-gray-50 text-left sm:px-6">
          <button type="button" @click="filterAnnounce" class="flex items-center justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
<!--            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />-->
<!--            </svg>-->
              <SearchIcon class="h-6 w-6" />
            ค้นหา
          </button>
        </div>
      </div>
    </div>

    <!-- typeDetail สามารถใช้ได้แบบ list (ใช้สำหรับดูเฉพาะหัวห้อที่หน้า admin) และ full (ใช้เพื่อดูรายละเอียดแบบเต็ม) -->
    <AnnounceCard
      v-for="(item) in announces.data"
      :key="item.id"
      :announceDetails="item"
      typeDetail="list"
      @edit-announce="editAnnounce(item)"
    />

  </div>

  <div class="flex justify-center md:justify-end mt-2 px-4">
      <Pagination :pagination="announces"/>
  </div>

<!--</AdminAppLayout>-->
</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
    export default {
        layout: AdminAppLayout,
    }
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, Link, usePage } from '@inertiajs/inertia-vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'

import Modal from '@/Components/Modal.vue'
import AnnounceCard from '@/Components/AnnounceItemInteractiveCardList.vue'
import Pagination from '@/Components/Paginations.vue'
import { SearchIcon } from '@heroicons/vue/outline';

// API Service
import DivisionService from '@/Services/DivisionService'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

onMounted(() => {
  divisionService.value.listAll().then(data => {
    divisions.value = data
  });
})

const props = defineProps({
    announces: { type: Object, required: true, default: {} },
    fdivision_selected: { type: Number}
})

const divisionService = ref(new DivisionService())
const divisions = ref([])

const filterForm = useForm({
  ftopic: null,
  fexpire_type: 'all',
  fdivision_selected: props.fdivision_selected ? props.fdivision_selected : usePage().props.value.auth.division_id
});

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

const filterAnnounce = () => {
  filterForm.get(route('admin.announce'), {
    preserveState: true,
    replace: true,
    onError: (errors) => {
      let error_display = ''
      for ( let p in errors ) {
        error_display = error_display + `- ${errors[p]}<br/>`
      }
      toast('info', 'ข้อแนะนำ', error_display);
    },
    onFinish: () => {
      filterForm.processing = false
    }
  })
}

const editAnnounce = ( announceData ) => {
  Inertia.get(route('admin.announce.edit', announceData.id), {}, {
    preserveState: true,
    replace: true
  })
}

</script>

<style scoped>
  .p-error {
    font-size: 12px
    /*line-height: 1.25rem*/ /* 20px */;
    color: red;
  }

  /* .dp__theme_light {
    --dp-background-color: #ffffff;
    --dp-text-color: #212121;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #1976d2;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: #ddd;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: #76d275;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #959595; */
    /* --dp-border-color-hover: rgb(99 102 241 / var(--tw-border-opacity));
    --dp-icon-color: rgb(29 78 216 / var(--tw-bg-opacity)); */
    /* --dp-danger-color: #ff6f60; */
  /* } */

  .dp-custom-input {
    border: rgb(99 102 241 / var(--tw-border-opacity));
    /* box-shadow: 0 0 6px #1976d2;
    color: #1976d2; */

    /* &:hover {
      border-color: #1976d2;
    } */
  }
</style>
