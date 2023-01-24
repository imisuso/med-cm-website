<template>
  <div v-if="!doctorList.length">
    <ComingSoon />
  </div>
  <!-- Display List สำหรับแสดงผลรายชื่ออาจารย์และแพทย์ -->
  <div v-else class="flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5">
    <div v-for="doctor in doctorList" :key="doctor.id" class="flex flex-col sm:flex-row p-2 gap-4 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg shadow-lg">
      <div class="flex flex-shrink-0 justify-center">
        <img :src="`${doctor.image_url}`" alt="" class="object-cover w-28 h-36 rounded-sm" />
      </div>
      <div class="flex flex-col w-full space-y-2 mb-2 text-black">
        <div class="w-full p-2 border border-black rounded-md sm:border-0">
          <div class="flex items-center font-bold">
            <div class="mr-1 ">{{ doctor.rname_short_th }}</div>
            <div class="mr-1 ">{{ doctor.fname_th }} {{doctor.lname_th}}</div>
            <div class="px-1 ">{{ doctor.reward }}</div>
          </div>
          <div v-if="doctor.profiles.leader" class="flex items-center italic text-sm">
            <div class="mr-1 ">หัวหน้าสาขาวิชา{{ division_name }}</div>
          </div>
          <div class="flex items-center italic text-sm">
            <div class="mr-1 ">อาจารย์</div>
          </div>
          <div v-for="(cert, index) in sortCertificate(doctor.cert)" :key="index" class="py-1 flex items-center text-sm text-gray-600 italic">
            <div class="px-2">-</div>
            <div>{{ cert.cert }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue'
import ComingSoon from '@/Components/ComingSoon.vue'
import PersonService from '@/Services/PersonService';

// ถูกส่งเป็น props เข้ามาจากหน้า BranchTemplateEditor หรือ BranchDetails เพราะใช้หน้านี้ในการแสดงผลร่วมกัน
const props = defineProps({
    division_id: { type: Number, required: true  },
    division_name: { type: String },
})

onMounted(() => {
    personService.value.listProfessorByDivisionId(props.division_id).then(data => {
      doctorList.value = data
    });
})

const personService = ref(new PersonService());
const doctorList = ref([])
const baseUrl = ref(base_url)

const sortCertificate = ( cert ) => {
    return JSON.parse(cert).sort( (a, b) => { return b.cert_year - a.cert_year });
}

</script>

<style>

</style>
