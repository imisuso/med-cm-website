<template>
<!--  <AdminAppLayout>-->
    <div class="flex flex-col px-2 py-1 w-full">
      <div class="mt-2 mb-2 text-2xl font-bold">จัดการบุคลากร</div>
      <!-- Toolbar -->
      <div v-if="$page.props.auth.abilities.includes('view_all_content')" class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
        <div class="sm:w-32 text-sm font-medium text-gray-700">สาขา/หน่วยงาน:</div>
        <select v-model="fdivision_selected" @change="getPersonList" id="form_division_id" class="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <!-- <option value="0">ทุกสาขา/หน่วยงาน</option> -->
          <option v-for="(option, index) in divisions" :key="index" :value="option.division_id">
            {{ option.name_th }}
          </option>
        </select>
      </div>
      <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border border-gray-200 rounded-md shadow-md items-baseline">
        <div class="flex space-x-2 w-full place-self-center">
          <input v-model="search" type="text" id="search" placeholder="ค้นหาด้วย ชื่อ หรือ นามสกุล" class="block mx-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-xs sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div class="flex space-x-2" v-if="$page.props.auth.abilities.includes('manage_person')">
<!--          <Link :href="route('admin.person.create')" :data="{ 'fdivision_selected': fdivision_selected }" method="get" as="button" type="button"-->
<!--              class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded-sm cursor-pointer hover:bg-green-800"-->
<!--          >-->
<!--            <div>-->
<!--                <PlusSmIcon :class="['h-6 w-6']"/>-->
<!--            </div>-->
<!--            <div>เพิ่ม</div>-->
<!--          </Link>-->

          <Link v-if="fdivision_selected != 0 && persons.total > 1" :href="route('admin.person_order', getDivisionSlugFromId(parseInt(fdivision_selected)))">
            <button class="flex items-center w-28 py-1 px-3 border border-transparent shadow-xs text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <div>
                  <SwitchVerticalIcon :class="['h-6 w-6']"/>
              </div>
              <div>เรียงลำดับ</div>
            </button>
          </Link>
        </div>
      </div>

      <div class="flex flex-col w-full mb-4">
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

      <div class="flex justify-center md:justify-end mt-2 px-4">
        <Pagination :pagination="persons"/>
      </div>
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
import { ref, onMounted, reactive, watch, nextTick, inject } from 'vue'
import { router, useForm, usePage, Link } from '@inertiajs/vue3'
import PersonInteractiveCardList from '@/Components/PersonInteractiveCardList.vue'
import Pagination from '@/Components/Paginations.vue'

// API Service
import DivisionService from '@/Services/DivisionService'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import { PlusSmIcon, SwitchVerticalIcon } from "@heroicons/vue/outline"
import Swal  from 'sweetalert2';
//import Swal  from 'vue-sweetalert2'; // ใช้งานร่วมกับ inject

const props = defineProps({
    persons: { type: Object, required: true, default: {} },
    filters: { type: Object },
})

onMounted(() => {
  divisionService.value.listAll().then(data => {
    divisions.value = data
  });
})

// const swal = inject('$swal')

const blank_image = '/fallbackimage/default-blank-image.jpg'
const section = "Person Management (ดูข้อมูลทั้งหมดของบุคลากรเป็นรายคน)"
const divisionService = ref(new DivisionService())
const divisions = ref([])
const url = ref(null)
const baseUrl = ref(base_url)

let fdivision_selected = props.filters.fdivision_selected ? ref(props.filters.fdivision_selected) : ref(usePage().props.auth.division_id)
let search = ref(props.filters.search)

const personForm = useForm({
  id: null,
  fullname: null
});

watch( search, value => {
    //console.log('changed ' + value)
    router.get(route('admin.person'), { search: value, fdivision_selected: fdivision_selected.value }, {
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

const deletePerson = () => {
  router.delete(route('admin.person.delete', personForm.id), {
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
}

const getPersonList = () => {
  router.get(route('admin.person'), { fdivision_selected: fdivision_selected.value }, {
      preserveState: true,
      replace: true,
  })
}

const viewPerson = ( personData ) => {
  router.get(route('admin.person.view', personData.id), {}, {
    preserveState: true,
    replace: true
  })
  // nextTick(() => openPersonModal(true));
  // // setTimeout(() => openPersonModal(true), 1000)
}

const editPerson = ( personData ) => {
  router.get(route('admin.person.edit', personData.id), {}, {
    preserveState: true,
    replace: true
  })
}

const confirmDeletePerson = ( personData ) => {
    url.value = personData.image ? personData.image_url : `${baseUrl.value}${blank_image}`
    personForm.id = personData.id
    personForm.fullname = `${personData.fname_th} ${personData.lname_th}`

    // ตัวอย่างการใช้งาน
    // swal.fire({
    //     title: 'Are you sure?',
    //     text: "คุณต้องการลบข้อมูลบุคลากร",
    //     //icon: 'warning',
    //     imageUrl: url.value,
    //     imageWidth: 80,
    //     imageHeight: 80,
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         swal.fire(
    //             'Deleted!',
    //             'Your file has been deleted.',
    //             'success'
    //         )
    //     } else {
    //         personForm.reset()
    //         url.value = null
    //     }
    // })

    Swal.fire({
        title: 'คุณแน่ใจว่าต้องการลบข้อมูลบุคลากร?',
        text: `${personForm.fullname}`,
        imageUrl: url.value,
        imageWidth: 80,
        imageHeight: 80,
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            deletePerson()
        } else {
            personForm.reset()
            url.value = null
        }
    })
}

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

</script>

<style scoped>
  .p-error {
    font-size: 12px
    /*line-height: 1.25rem*/ /* 20px */;
    color: red;
  }
</style>
