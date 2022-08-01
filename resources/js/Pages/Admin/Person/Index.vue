<template>
  <AdminAppLayout>
    <div class="flex flex-col px-2 py-1 w-full">
      <div class="mb-2 text-2xl font-bold">จัดการบุคลากร</div>
      <!-- Toolbar -->
      <div v-if="$page.props.auth.abilities.includes('view_all_content')" class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
        <div class="sm:w-32 text-sm font-medium text-gray-700">สาขา/หน่วยงาน:</div>
        <select v-model="fdivision_selected" @change="getPersonList" id="form_division_id" class="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <!-- <option value="0">ทุกสาขา/หน่วยงาน</option> -->
          <option v-for="(option, index) in divisions" :key="index" :value="option.division_id">
            {{ option.name_th }}
          </option>
        </select>
      </div>
      <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
        <div class="flex space-x-2 w-full place-self-center">
          <input v-model="search" type="text" id="search" placeholder="ค้นหาด้วย ชื่อ หรือ นามสกุล" class="block mx-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div class="flex space-x-2">
          <Link :href="route('admin.person.create')" :data="{ 'fdivision_selected': fdivision_selected }" method="get" as="button" type="button"
              class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>เพิ่ม</div>
          </Link>

          <Link v-if="fdivision_selected != 0 && persons.total > 1" :href="route('admin.person_order', getDivisionSlugFromId(parseInt(fdivision_selected)))">
            <button class="flex items-center w-28 py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div>เรียงลำดับ</div>
            </button>
          </Link>
        </div>
      </div>

      <div class="flex flex-col w-full mb-4">
<!--          <PersonInteractiveCardList -->
<!--            v-for="(item, index) in persons.data" -->
<!--            :key="index" -->
<!--            :personDetails="item"-->
<!--            :order-input="false"-->
<!--            @edit-person="editPerson(item)" -->
<!--            @view-person="viewPerson(item)"-->
<!--            @order-person="orderPerson(item)"-->
<!--            @delete-person="confirmDeletePerson(item)"-->
<!--          />-->
          <PersonInteractiveCardList
              v-for="(item, index) in persons.data"
              :key="index"
              :personDetails="item"
              :order-input="false"
              @edit-person="editPerson(item)"
              @view-person="viewPerson(item)"
              @delete-person="confirmDeletePerson(item)"
          />
      </div>

      <!-- Modal สำหรับ confirm การลบ ข้อมูลบุคลากร  -->
      <teleport to="body">
      <Modal :isModalOpen="deletePersonModal" >

        <template v-slot:header>
          <div class="text-gray-900 text-xl font-medium dark:text-white">
              คุณต้องการลบข้อมูลบุคลากร
          </div>
        </template>

        <template v-slot:body>
          <div class="flex flex-row justify-start items-center">
            <img :src="url" alt="" class="h-20 w-20 rounded-full object-cover mr-4" />
            <div class="text-gray-900 text-md font-medium dark:text-white">
                {{ personForm.fullname }}
            </div>
          </div>
        </template>

        <template v-slot:footer>
          <button @click="deletePerson()" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">ลบ</button>
          <button @click="openDeletePersonModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
        </template>
      </Modal>
      </teleport>

      <div class="flex justify-center md:justify-end mt-2 px-4">
        <Pagination :pagination="persons"/>
      </div>
    </div>
</AdminAppLayout>
</template>

<script setup>
import { ref, onMounted, reactive, watch, nextTick } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal.vue'
import PersonInteractiveCardList from '@/Components/PersonInteractiveCardList.vue'
import Pagination from '@/Components/Paginations.vue'

// API Service
import DivisionService from '@/Services/DivisionService'
import TraceLogService from '@/Services/TraceLogService'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    persons: { type: Object, required: true, default: {} },
    filters: { type: Object },
})

onMounted(() => {
  divisionService.value.listAll().then(data => {
    divisions.value = data
  });
})

const blank_image = '/fallbackimage/default-blank-image.jpg'
const section = "Person Management (ดูข้อมูลทั้งหมดของบุคลากรเป็นรายคน)"
const divisionService = ref(new DivisionService())
const traceLogService = ref(new TraceLogService())
const personModal = ref(false)
const deletePersonModal = ref(false)
const divisions = ref([])
// const filter_key = ref()
// const check_doctor = ref()
const pdpa_protect = ref(false)
const url = ref(null)
const baseUrl = ref(base_url)

let fdivision_selected = props.filters.fdivision_selected ? ref(props.filters.fdivision_selected) : ref(usePage().props.value.auth.division_id)
let search = ref(props.filters.search)

const personForm = useForm({
  id: null,
  fullname: null
});

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('admin.person'), { search: value, fdivision_selected: fdivision_selected.value }, {
        preserveState: true,
        replace: true
    })
})

const openDeletePersonModal = (isopen) => {
  deletePersonModal.value = isopen
  if( !isopen ) {
    personForm.reset()
    url.value = null
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

const deletePerson = () => {
  Inertia.delete(route('admin.person.delete', personForm.id), {
    preserveState: true,
    onSuccess: () => {
        toast('success', 'สำเร็จ', 'ลบข้อมูลบุคลากร เรียบร้อย')
    },
    onError: (errors) => {
      let error_display = ''
      for ( let p in errors ) {
        error_display = error_display + `- ${errors[p]}<br/>`
      }
      toast('danger', 'พบปัญหา', error_display);
    },
    onFinish: () => {
        personForm.processing = false
    }
  });
  openDeletePersonModal(false)
}

const getPersonList = () => {
  Inertia.get(route('admin.person'), { fdivision_selected: fdivision_selected.value }, {
      preserveState: true,
      replace: true,
  })
}

const viewPerson = ( personData ) => {
  Inertia.get(route('admin.person.view', personData.id), {}, {
    preserveState: true,
    replace: true
  })
  // nextTick(() => openPersonModal(true));
  // // setTimeout(() => openPersonModal(true), 1000)
}

const editPerson = ( personData ) => {
  Inertia.get(route('admin.person.edit', personData.id), {}, {
    preserveState: true,
    replace: true
  })
}

const confirmDeletePerson = ( personData ) => {
  url.value = personData.image ? personData.image_url : `${baseUrl.value}${blank_image}`
  personForm.id = personData.id
  personForm.fullname = `${personData.fname_th} ${personData.lname_th}`
  openDeletePersonModal(true)
}

// const orderPerson = (personData) => {
//   //console.log(personData.display_order)
//   personList.value = personList.value.sort( (a, b) => { return a.display_order - b.display_order });
// }

const getDivisionSlugFromId = (id) => {
  //console.log(id)
  let division = divisions.value.filter( (elm) => { return elm.division_id === id });
  if(division.length > 0) {
    return division[0].slug
  } else {
    return ""
  }
}

// const person_filter = () => {
//   //console.log(filter_key.value)
//   let filter_person = props.persons.filter( (elmt) => {
//     //console.log(elmt.sap_id)
//     if( elmt.sap_id.match(filter_key.value) || elmt.fname_th.match(filter_key.value) || elmt.lname_th.match(filter_key.value) ) {
//       return elmt
//     }
//   })

//   //console.log(filter_person)
//   personList.value = filter_person
// }

const replaced = ( str, use_case ) => {

    let markStr = "---"
    if( use_case === "sap") {
        markStr = "******"
    }

    let firstStr = str.substr(0,1)
    let lastStr = str.substr(str.length-1, 1)

    return firstStr+markStr+lastStr
    //return str.slice(0, -5) + '*****';
}

const original_str = ( str ) => {
    alert(str)
}

const togglePdpaData = () => {
    pdpa_protect.value = ! pdpa_protect.value
    if( ! pdpa_protect.value ) {
        // มีการเปิดดูข้อมูลส่วนบุคคล
        traceLogService.value.storeLog(
            section,
            "view",
            "มีการเปิดดูข้อมูลส่วนบุคคลของ sap_id:" + personForm.sap_id,
            "pdpa"
        )
    }
}

</script>

<style scoped>
  .p-error {
    font-size: 12px
    /*line-height: 1.25rem*/ /* 20px */;
    color: red;
  }
</style>
