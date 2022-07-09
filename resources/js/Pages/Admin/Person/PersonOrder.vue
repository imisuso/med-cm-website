<template>
  <AdminAppLayout>
  <div class="flex flex-col p-4 w-full">
    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
      <div class=" text-2xl font-bold">เรียงการแสดงผลบุคคลากร</div>
      <Link :href="route('admin.person')" method="get" :data="{ fdivision_selected: division_id}" as="button" type="button">
      <button class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        กลับไปหน้าจัดการบุคคลากร
      </button>
      </Link>
    </div>
    
    <div class="mt-0 mb-2 md:col-span-2">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-3">
            <div class="col-span-6 sm:col-span-6">
              <label for="person_types" class="block text-sm font-medium text-gray-700">ประเภทบุคคลากร:</label>
              <select v-model="Form.type" @change="displayPersonByType" id="person_types" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option v-for="(option, index) in person_types" :key="index" :value="option.type">
                  {{ option.person_type }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row ">
      <button v-show="personList.length > 1" @click="openOrderPersonModal(true)" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        บันทึก
      </button>
    </div>

    <!-- สำหรับแสดงผล list รายชื่อบุคลากร -->
    <div class="flex flex-col w-full">
      <PersonInteractiveCardList 
        v-for="(item, index) in personList" 
        :key="index" 
        :personDetails="item"
        :order-input="true"
        @order-person="orderPerson(item)"
      />
    </div>

    <!-- Modal สำหรับ confirm การลบ ข้อมูลบุคลากร  -->
    <teleport to="body">
    <Modal :isModalOpen="orderPersonModal" >

      <template v-slot:header>
        <div class="text-gray-900 text-xl font-medium dark:text-white">
            คุณต้องการจัดเก็บการเรียงลำดับการแสดงผลข้อมูลบุคลากร ใช่ หรือ ไม่
        </div>
      </template>

      <!-- <template v-slot:body>
        <div class="flex flex-row justify-start items-center">
          <img :src="url" alt="" class="h-20 w-20 rounded-full object-cover mr-4" />
          <div class="text-gray-900 text-md font-medium dark:text-white">
              {{ personForm.fullname }}
          </div>
        </div>
      </template> -->

      <template v-slot:footer>
        <button @click="openOrderPersonModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
        <button @click="updateOrderPerson" type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">ตกลง</button>
      </template>
    </Modal>
    </teleport>

  </div>

</AdminAppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, Link } from '@inertiajs/inertia-vue3'
import PersonInteractiveCardList from '@/Components/PersonInteractiveCardList.vue'
import Modal from '@/Components/Modal.vue'

// API Service
import PersonService from '@/Services/PersonService'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    person_types: { type: Array, required: true },
    division_id: { type: Number, required: true },
    division_slug: { type: String, required: true }
})

const personService = ref(new PersonService())
const personList = ref([])
const orderPersonModal = ref(false)

const Form = useForm({
  type: null,
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

const openOrderPersonModal = (isopen) => {
  orderPersonModal.value = isopen
}

const displayPersonByType = () => {
  personService.value.listPersonByDivisionAndType(props.division_id, Form.type).then(data => {
    personList.value = data
  });
}

const orderPerson = (personData) => {
  // Sort แบบ Multi columns
  personList.value = personList.value.sort( (a, b) => { return ( b.profiles.leader - a.profiles.leader || a.display_order - b.display_order) });
}

const updateOrderPerson = () => {
  Inertia.post(route('admin.person.update_display_order'), 
    { person_list: personList.value, 
      division_slug: props.division_slug
    }, 
    {
    // onBefore: () => {
    //   return confirm(`คุณต้องการจัดเก็บข้อมูลการเรียงลำดับ ใช่ หรือ ไม่ ?`)
    // },
    onSuccess: () => {
      toast('success', 'สำเร็จ', 'จัดเก็บข้อมูลการเรียงลำดับเรียบร้อย')
    },
    onError: (errors) => {
      let error_display = ''
      for ( let p in errors ) {
        error_display = error_display + `- ${errors[p]}<br/>`
      }
      toast('danger', 'พบปัญหา', error_display);
    },
    onFinish: () => {
      //openOrderPersonModal(false)
    }
  })
  openOrderPersonModal(false)
}
</script>