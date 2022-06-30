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
      <!-- <div class="">
        <button @click="openDivisionModal(true)" class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">เพิ่ม</button>
      </div> -->

      <!-- Modal สำหรับจัดเก็บ หรือ แก้ไข สาขา/หน่วยงาน -->
      <Modal modalSize="large" :isModalOpen="divisionModal" >
        <template v-slot:header>
          <div class="text-gray-900 text-xl font-medium dark:text-white">
              รายละเอียดข้อมูลของ สาขา/หน่วยงาน
          </div>
        </template>
        <template v-slot:body>
          <div>
            <label class="block text-sm font-medium text-gray-700">
              รูปสาขา/หน่วยงาน
            </label>
            <div class="mt-2 flex items-center">
              <span class="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                <svg v-if="divisionForm.image === ''" class="h-20 w-20 rounded-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <img v-else :src="url" class="h-20 w-20 rounded-full"/>
              </span>
              <label class="flex flex-col w-24 items-center mx-2 px-2 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2 text-base leading-normal">เลือกรูป</span> 
                  <input type="file" @input="divisionForm.image = $event.target.files[0]" @change="previewImage" class="hidden">
              </label>
            </div>
          </div>
          <div class="flex flex-col items-start sm:flex-row sm:items-end">
            <label for="division_id" class="flex flex-grow flex-shrink-0 mr-2">เลข สาขา/หน่วยงาน :</label>
            <input type="number" id="division_id" v-model="divisionForm.division_id" required="true" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <div class="flex flex-col items-start sm:flex-row sm:items-end">
            <label for="name_thai" class=" flex flex-grow flex-shrink-0 mr-2">ชื่อ สาขา/หน่วยงาน (ไทย) :</label>
            <input type="text" id="name_thai" v-model="divisionForm.name_th" required="true" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <div class="flex flex-col items-start sm:flex-row sm:items-end">
            <label for="name_eng" class=" flex flex-grow flex-shrink-0 mr-2">ชื่อ สาขา/หน่วยงาน (อังกฤษ) :</label>
            <input type="text" id="name_eng" v-model="divisionForm.name_en" required="true" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <fieldset class="py-3">
            <div>
              <legend class="text-base font-medium text-gray-900">ประเภท :</legend>
              <p class="text-sm text-gray-500">กรุณาเลือกระหว่าง สาขา หรือ หน่วยงาน</p>
            </div>
            <div class="mt-4 space-y-4">
              <div class="flex items-center">
                <input id="branch" type="radio" value="b" v-model="divisionForm.type" :checked="divisionForm.type === 'b'" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label for="branch" class="ml-3 block text-sm font-medium text-gray-700">
                  สาขา
                </label>
              </div>
              <div class="flex items-center">
                <input id="unit" type="radio" value="u" v-model="divisionForm.type" :checked="divisionForm.type === 'u'" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label for="unit" class="ml-3 block text-sm font-medium text-gray-700">
                  หน่วยงาน
                </label>
              </div>
            </div>
          </fieldset>
        </template>
        <!-- Modal Footer -->
        <template v-slot:footer>
          <button @click="saveDivision()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">จัดเก็บ</button>
          <button @click="openDivisionModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
        </template>
      </Modal>

      <!-- Modal สำหรับ confirm การลบ สาขา/หน่วยงาน -->
      <Modal :isModalOpen="deleteDivisionModal" >
        <!-- Modal Header -->
        <template v-slot:header>
          <div class="text-gray-900 text-xl font-medium dark:text-white">
              คุณต้องการลบข้อมูลของ สาขา/หน่วยงาน
          </div>
        </template>
        <!-- Modal Body -->
        <template v-slot:body>
          <div class="text-gray-900 text-md font-medium dark:text-white">
              {{ divisionForm.name_th }}
          </div>
        </template>
        <!-- Modal Footer -->
        <template v-slot:footer>
          <button @click="openDeleteDivisionModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
          <button @click="deleteDivision()" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">ลบ</button>
        </template>
      </Modal>

      <!-- สำหรับแสดงผล list รายชื่อ สาขา/หน่วยงาน -->
      <!-- <div v-for="item in mDivisions.data" :key="item.id" class="flex flex-col items-center space-y-4 sm:flex-row w-full px-4 py-2 mb-2 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800"> -->
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
              <!-- <p v-if="item.type === 'b'" class="text-gray-600">ประเภท : สาขา</p>
              <p v-else class="text-gray-600 text-sm">ประเภท : หน่วยงาน</p> -->
            </span>
            </div>
            <div class="flex flex-col space-y-2 items-end sm:space-y-0 sm:flex-row sm:items-center space-x-1 ml-2">
              <!-- <button @click="route('admin.division.edit', item.id)" class="flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-full border border-orange-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10"> -->
              <Link :href="route('admin.division.edit', item.id)" class="flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-full border border-orange-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </Link>
              <!-- </button> -->
              <!-- <button @click="editDivision(item)" class="flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-full border border-orange-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button> -->
              <button @click="confirmDeleteDivision(item)" class="flex items-center mx-1 text-red-500 bg-white hover:bg-red-200 focus:ring-4 focus:ring-red-300 rounded-full border border-red-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <!-- <a @click="editDivision(item)" class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-yellow-500 rounded cursor-pointer hover:bg-yellow-700">Edit</a>
              <a @click="confirmDeleteDivision(item)" class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-red-600 rounded cursor-pointer hover:bg-red-700">Delete</a> -->
            </div> 
        </div>
      </div>

      <Paginations :pagination="divisions"/>
      <!-- <Pagination class="mt-2" 
        :links="props.divisions.links" 
      /> -->
      
    </div>

    <!-- <NotifyMsg severity="success" summary="Success" detail="Your account was register success"/> -->
    <!-- <NotifyMsg severity="error" summary="Error" detail="Your account was register incomplete"/>
    <NotifyMsg severity="info" summary="Info" detail="Your account was registered"/>
    <NotifyMsg severity="warn" summary="Warning" detail="Your account has some problem"/> -->
  </AdminAppLayout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal'
// import Pagination from '@/components/Pagination'
import Paginations from '@/Components/Paginations'
//import NotifyMsg from '@/Components/NotifyMsg'

// import Swal from 'sweetalert2'
// import 'sweetalert2/dist/sweetalert2.min.css';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const props = defineProps({
    divisions: { type: Object, required: true },
    filters: { type: Object },
})

const url = ref(null)
const oldimage = ref(null)
const baseUrl = ref(base_url)
const divisionModal = ref(false)
const deleteDivisionModal = ref(false)
let search = ref(props.filters.search)

const divisionForm = useForm({
  id: null,
  division_id: null,
  type: null,
  name_th: null,
  name_en: null,
  image: ''
});

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('admin.division'), { search: value }, {
        preserveState: true,
        replace: true
    })
})

const openDivisionModal = (isopen) => {
  divisionModal.value = isopen
  //console.log(divisionModal.value)
  if( !isopen ) {
    divisionForm.reset()
    url.value = null
    oldimage.value = null
  }
}

const openDeleteDivisionModal = (isopen) => {
  deleteDivisionModal.value = isopen
  if( !isopen ) {
    divisionForm.reset()
  }
}

const saveDivision = () => {
  if(divisionForm.id) {  // Edit
    //console.log("Edit")
    divisionForm.transform(data => ({
          ...data,
          oldimage: oldimage.value     
    })).post(route('admin.update_division', divisionForm.id), {
      _method: 'patch',
      preserveState: false,
      //only: ['divisions'],
      preserveScroll: true,
      onSuccess: () => {
          toast('success', 'สำเร็จ', 'แก้ไขข้อมูล สาขา/หน่วยงาน เรียบร้อย');
      },
      onError: (errors) => {
          console.log(errors)
          toast('danger', errors.msg, errors.sysmsg);
      },
      onFinish: () => {
          divisionForm.processing = false 
      }
    });
  } else { // Add
    //console.log("Add")
    divisionForm.post(route('admin.add_division'), {
      // replace: true,
      // onBefore: () => {
      // },
      preserveState: false,
      preserveScroll: true,
      onSuccess: () => {
          toast('success', 'สำเร็จ', 'จัดเก็บข้อมูล สาขา/หน่วยงาน เรียบร้อย');
      },
      onError: (errors) => {
          console.log(errors)
          toast('danger', errors.msg, errors.sysmsg);
      },
      onFinish: () => {
          divisionForm.processing = false 
      }
    });
  }

  divisionForm.reset()
  openDivisionModal(false)

}

const editDivision = (item) => {
  addDivisionDataToForm(item)
  //console.log(divisionForm)
  openDivisionModal(true)
}

const confirmDeleteDivision = (item) => {
  addDivisionDataToForm(item)
  openDeleteDivisionModal(true)
}

const addDivisionDataToForm = ( divisionData ) => {
  divisionForm.id = divisionData.id
  divisionForm.division_id = divisionData.division_id
  divisionForm.type = divisionData.type
  divisionForm.name_th = divisionData.name_th
  divisionForm.name_en = divisionData.name_en
  divisionForm.image = divisionData.image
  url.value = `${divisionData.image_url}`
  oldimage.value = divisionData.image
}

const deleteDivision = () => {
  Inertia.delete(route('admin.delete_division', divisionForm.id), {}, {
    preserveState: false,
    preserveScroll: true,
    onSuccess: () => {
        toast('success', 'สำเร็จ', 'ลบข้อมูล สาขา/หน่วยงาน เรียบร้อย');
    },
    onError: (errors) => {
        console.log(errors)
        toast('danger', errors.msg, errors.sysmsg);
    },
    onFinish: () => {
        divisionForm.processing = false 
    }
  });
  divisionForm.reset()
  openDeleteDivisionModal(false)
}

const previewImage = (e) => {
    const file = e.target.files[0];
    //console.log(file)
    if( file ) {
        url.value = URL.createObjectURL(file);
    } else {
        url.value = ""
    }
}

const showAlert = () => {
  Swal.fire({
              icon: 'success',
              //toast: true,
              position: 'top-end',
              title: 'Auto close alert!',
              html: 'I will close in <b></b> milliseconds.',
              timer: 3000,
              timerProgressBar: true,
            })
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

</script>

<style scoped>

</style>