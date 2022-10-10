<template>
<!--  <AdminAppLayout>-->
  <div class="flex flex-col p-4 w-full">
    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
      <div class=" text-2xl font-bold">เรียงการแสดงผลบุคคลากร</div>
        <Link :href="route('admin.person')" method="get" as="button" type="button">
          <button class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">
            <ReplyIcon :class="['h-6 w-6 mr-2']" />
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
        <button v-show="personList.length > 1" @click="confirmOrderChange" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10">
            <SaveIcon :class="['h-6 w-6 mr-2']" />
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
import { ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, Link } from '@inertiajs/inertia-vue3'
import PersonInteractiveCardList from '@/Components/PersonInteractiveCardList.vue'

import Swal  from 'sweetalert2';
import { ReplyIcon, SaveIcon } from "@heroicons/vue/outline"

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

const confirmOrderChange = () => {
    Swal.fire({
        title: 'ต้องการเรียงลำดับการแสดงผลบุคลากร?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1e40af',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            updateOrderPerson()
        }
    })
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
    onFinish: () => {}
  })
}
</script>
