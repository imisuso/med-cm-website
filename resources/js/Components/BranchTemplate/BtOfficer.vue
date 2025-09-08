<template>
  <div v-if="!personList.length">
    <ComingSoon />
  </div>
  <!-- Display List สำหรับแสดงผลรายชื่อเจ้าหน้าที่ -->
  <!-- <div v-else class="flex flex-col border-green-200 gap-2 p-2 rounded-md mt-5">
    <div v-for="person in personList" :key="person.id" class="flex flex-col sm:flex-row gap-4">
      <div class="flex shrink-0 justify-center">
        <img :src="`${person.image_url}`" alt="" class="object-cover w-28 h-36 rounded-sm" />
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
      </div>
    </div>
  </div> -->

  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full gap-1 md:gap-2">
    <template v-for="person in personList" :key="person.id">
      <div class="flex flex-row mt-2 sm:mt-0  rounded-lg shadow-lg bg-linear-to-r from-gray-50 to-gray-200">
          <div class="flex items-center p-2">
            <img class="object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300" :src="`${person.image_url}`" alt="" />
          </div>
          <div class="flex items-center">
              <div class="flex flex-col">
                  <div class="px-2">{{ person.title_th }}{{ person.fname_th }} {{ person.lname_th }}</div>
                  <div v-if="person.position_division && person.position_division !== 'NULL' " class="px-2 italic text-sm text-gray-600">{{ person.position_division }}</div>
                  <div v-else class="px-2 italic text-sm text-gray-600">ไม่พบข้อมูลตำแหน่งงาน</div>
                  <!-- <div v-if="officer.profiles.leader" class="px-2 italic text-sm text-gray-600">(หัวหน้าหน่วยงาน)</div> -->
              </div>
          </div>
      </div>
    </template>
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