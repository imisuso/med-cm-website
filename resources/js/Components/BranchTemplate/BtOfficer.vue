<template>
  <div v-if="!personList.length">
    <ComingSoon />
  </div>
  <!-- Display List สำหรับแสดงผลรายชื่อเจ้าหน้าที่ -->
  <div v-else class="flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5">
    <div v-for="person in personList" :key="person.id" class="flex flex-col sm:flex-row gap-4">
      <div class="flex shrink-0 justify-center">
        <svg v-if="! person.image" class="h-36 w-28 object-cover rounded-sm text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <img v-else :src="`${person.image_url}`" alt="" class="object-cover w-28 h-36 rounded-sm">
      </div>
      <div class="flex flex-col w-full space-y-2 mb-2 items-center">
        <div class="w-full p-2 border rounded-md sm:border-0">
          <div class="flex items-center font-bold">
            <div class="">{{ person.title_th }}</div>
            <div class="mr-1 ">{{ person.fname_th }} {{person.lname_th}}</div>
          </div>
          <div v-if="person.position_division && person.position_division !== 'NULL'" class="text-sm text-gray-600 italic">{{ person.position_division }}</div>
          <div v-else class="text-sm text-gray-600 italic">ไม่พบข้อมูลตำแหน่งงาน</div>
          <div v-for="(cert, index) in sortCertificate(person.cert)" :key="index" class="py-1 flex items-center text-sm">
            <div class="px-2">-</div>
            <div>{{ cert.cert }}</div>
          </div>
        </div>
        <!-- <div class="w-full border ">3</div> -->
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
})

onMounted(() => {
    personService.value.listOfficerByDivisionId(props.division_id).then(data => {
      personList.value = data
    });
})

const personService = ref(new PersonService());
const personList = ref([])
const baseUrl = ref(base_url)

const sortCertificate = ( cert ) => {
    return JSON.parse(cert).sort( (a, b) => { return b.cert_year - a.cert_year });
}

</script>

<style>

</style>