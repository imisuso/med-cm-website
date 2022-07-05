<template>
  <AdminAppLayout>
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
      <!-- <button @click="addAnnounce" class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        เพิ่ม
      </button> -->
    </div>
  
    <div class="mt-0 mb-2 md:col-span-2">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <!-- <div class="mb-4 text-sm">* หมายเหตุ : (ถ้าไม่ใส่หัวข้อข่าวจะค้นหาทั้งหมด)</div> -->
          <div class="grid grid-cols-6 gap-2">
            <!-- <div class="col-span-6 sm:col-span-3">
              <label for="filter_topic" class="block text-sm font-medium text-gray-700">หัวข้อข่าว</label>
              <input type="text" v-model="filterForm.ftopic" id="filter_topic" placeholder="ใส่หัวข้อข่าวที่ต้องการค้นหา" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div> -->

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

            <!-- <div class="col-span-6 sm:col-span-6 justify-items-end place-self-stretch">     
              <input type="checkbox" v-model="filterForm.fexpire_only" id="filter_expire" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
              <label for="filter_expire" class="ml-2 text-md font-medium text-gray-700">เฉพาะประกาศที่หมดอายุ</label>
            </div> -->

          </div>
        </div>
        <div class="px-4 py-1 bg-gray-50 text-left sm:px-6">
          <button type="button" @click="filterAnnounce" class="flex items-center justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            ค้นหา
          </button>
        </div>
      </div>
    </div>

    <!-- Modal สำหรับ จัดเก็บ หรือ แก้ไข ข้อมูลข่าวประกาศ -->
    <!-- <Modal modalSize="large" :isModalOpen="announceModal" >
      <template v-slot:header>
        <div class="text-gray-900 text-xl font-medium dark:text-white">
            รายละเอียดข้อมูลข่าวประกาศ
        </div>
        <svg @click="openAnnounceModal(false)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </template>
      <template v-slot:body>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
            <fieldset :disabled="viewDataInfomation">
              <div class="grid grid-cols-6 gap-6 mb-6">

                <div class="col-span-6">
                  <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">วันที่ประกาศหมดอายุ</label>
                  <Datepicker 
                    inputClassName="dp-custom-input"
                    placeholder="default 30 วัน"
                    v-model="announceForm.expire_date" 
                    locale="th"
                    cancelText="ยกเลิก"
                    selectText="เลือก"
                    :month-year-component="monthYear"
                    :yearRange="[new Date().getFullYear() - 2, new Date().getFullYear() + 5]"
                    :enableTimePicker="false"
                    :format="dateFormat"
                    :previewFormat="dateFormat"
                    :minDate="new Date()"
                    :clearable="false"
                    autoApply
                  />
                </div>

                <div v-if="$page.props.auth.abilities.includes('view_all_content')" class="col-span-6">
                  <label for="division_selected" class="block text-sm font-medium text-gray-700">สาขา/หน่วยงาน</label>
                  <select v-model="announceForm.division_id" id="division_selected" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value=0>ตามสาขา/หน่วยงานผู้ประกาศ</option>
                    <template v-for="(option, index) in divisions" :key="index">
                      <option :value="option.division_id">
                        {{ option.name_th }}
                      </option>
                    </template>                 
                  </select>
                </div>

                <div class="col-span-6">
                  <div class="flex items-center justify-between">
                    <label for="topic" class="block text-sm font-medium text-gray-700">หัวข้อข่าว</label>
                  </div>
                  <input type="text" id="topic" v-model.trim="announceForm.topic" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                
                </div>

                <div v-if="announceForm.old_attachments" class="col-span-6">
                  <ul>
                    <li v-for="(file, index) in announceForm.old_attachments" :key="index">
                      <div class="my-1">
                        <div class="flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md">
                          <div class="flex flex-col ">
                            <div class="p-2"><strong>ชื่อไฟล์ : </strong>{{file.orig_name}}</div>
                          </div>
                          <div class="flex items-center m-2 sm:m-0">
                            <a href="#" @click="deleteFile(announceForm.old_attachments, index)" class="flex items-center text-sm text-red-600 px-2 py-2">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </a>
                          </div>       
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="col-span-6">
                  <ul>
                    <li v-for="(file, index) in attachments" :key="index">
                      <div class="my-1">
                        <div class="flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md">
                          <div class="flex flex-col ">
                            <div class="p-2"><strong>ชื่อไฟล์ : </strong>{{file.name}}</div>
                          </div>
                          <div class="flex items-center m-2 sm:m-0">
                            <label>
                              <span class="p-2 mt-2 text-sm cursor-pointer rounded-lg shadow-lg border text-white border-indigo-500 bg-blue-700 hover:bg-blue-800 hover:text-white">เลือกไฟล์</span>
                              <input :id="'file-'+index" type="file" accept=".pdf" @change="uploadFile(index, file, $event)" style="display:none">
                            </label>
                            <a href="#" @click="deleteFile(attachments , index)" class="flex items-center text-sm text-red-600 px-2 py-2">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </a>
                          </div>       
                        </div>
                      </div>
                    </li>
                  </ul>
                  <a href="#" @click="addFile" class="add">
                    <div class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      เพิ่มไฟล์แนบ
                    </div>
                  </a>
                </div>
              </div>             
            </fieldset>
            </div>
          </div>
        </div>
        <div class="">
          <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">เนื้อหา</label>
          <QuillEditor
            id="quill_e"  
            ref="quill_e" 
            theme="snow" 
            v-model:content="announceForm.detail_delta" 
            contentType="delta" 
            :toolbar="quill_options_full" 
            @ready="initialQuill" 
          />
        </div>
      </template>
  
      <template v-slot:footer>
        <button
          v-show="!viewDataInfomation" 
          @click="saveAnnounce" 
          type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          จัดเก็บ
        </button>
        <button @click="openAnnounceModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
      </template>
    </Modal> -->

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

</AdminAppLayout>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent, nextTick, reactive } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, Link, usePage } from '@inertiajs/inertia-vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'

import Modal from '@/Components/Modal'
import AnnounceCard from '@/Components/AnnounceItemInteractiveCardList'
import Pagination from '@/Components/Paginations'

// API Service
import DivisionService from '@/Services/DivisionService'
//import AnnounceService from '@/Services/AnnounceService'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'

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
const baseUrl = ref(base_url)
const announceModal = ref(false)
const deletePersonModal = ref(false)
const viewDataInfomation = ref(false)

const announceForm = useForm({
  id: null,
  pinned: false,
  topic: null,
  detail_delta: {},
  //expire_date: ref(dayjs(current_date.value).add(30, 'day').toDate()),
  division_id: 0,
  type: 1,
  old_attachments: []
});

const filterForm = useForm({
  //fclick: 1,
  ftopic: null,
  //fexpire_only: 0,
  fexpire_type: 'all',
  fdivision_selected: props.fdivision_selected ? props.fdivision_selected : usePage().props.value.auth.division_id
});

const openAnnounceModal = (isopen) => {
  announceModal.value = isopen
  nextTick(() => {
      quill_e.value.reinit() // ทำการ Reinit ตัว Editor หลังจากที่มีการเปลี่ยน content เพื่อให้แสดงผลได้
  }); 
  
  if( !isopen ) {
    announceForm.reset()
    // submitted.value = false
    // viewDataInfomation.value = false
  }
}

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
  filterForm.post(route('admin.announce'), {
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

const addAnnounceDataToForm = ( announceData ) => {
  announceForm.id = announceData.id
  announceForm.pinned = announceData.pinned ? true : false
  announceForm.topic = announceData.topic
  announceForm.detail_delta = JSON.parse(announceData.detail_delta) 
  //announceForm.expire_date = dayjs(announceData.expire_date).toDate()
  announceForm.type = announceData.type
  announceForm.division_id = announceData.division_id
  announceForm.old_attachments = announceData.attach_files.length > 0 ? announceData.attach_files : []
};

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