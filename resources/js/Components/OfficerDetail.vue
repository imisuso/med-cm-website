<template>
    <div class=" w-full mt-0">
        <div>
            <div class=" flex justify-start items-center space-x-4 cursor-pointer">
                <button aria-label="too" class="flex items-center space-x-4 p-1 rounded-md cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-blue-400" @click="moreOfficer">
                    <div class="flex justify-start space-x-4">
                        <svg v-if="unitDetail" class=" shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.16602 10H15.8327" stroke="#1F2937" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-if="!unitDetail" class=" shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="path1" class="" d="M10 4.1665V15.8332" stroke="#1F2937" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.16602 10H15.8327" stroke="#1F2937" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="flex font-semibold text-lg leading-5 text-gray-800 text-left">
                            {{unit.division_type}}{{unit.name_th}}
                        </div>
                    </div>
                </button>

            </div>
            <template v-if="unitDetail" >
                <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full gap-1 md:gap-2">
                    <template v-for="(officer, index) in officers" :key="index">
                    <div class="flex flex-row mt-2 sm:mt-0  rounded-lg shadow-lg bg-gradient-to-r from-green-50 to-green-100">
                        <div class="flex items-center p-2">
                            <!-- <svg v-if="! officer.image" class="w-20 h-28 rounded-lg ring-1 ring-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>

                            <img v-else class="object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300" :src="`${officer.image_url}`" alt=""> -->
                            <img class="object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300" :src="`${officer.image_url}`" alt="" />
                        </div>
                        <div class="flex items-center">
                            <div class="flex flex-col">
                                <div class="px-2">{{ officer.title_th }}{{ officer.fname_th }} {{ officer.lname_th }}</div>
                                <div v-if="officer.position_division && officer.position_division !== 'NULL' " class="px-2 italic text-sm text-gray-600">{{ officer.position_division }}</div>
                                <div v-else class="px-2 italic text-sm text-gray-600">ไม่พบข้อมูลตำแหน่งงาน</div>
                                <div v-if="officer.profiles.leader" class="px-2 italic text-sm text-gray-600">(หัวหน้าหน่วยงาน)</div>
                            </div>
                        </div>
                    </div>
                    <!-- <div v-else class="flex flex-row mt-2 sm:mt-0">
                        <div class="flex items-center p-2">
                            <svg v-if="! officer.image" class="w-20 h-28 rounded-lg ring-1 ring-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>

                            <img v-else class="object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300" :src="`${officer.image_url}`" alt="">
                        </div>
                        <div class="flex items-center px-2">{{ officer.title_th }}{{ officer.fname_th }} {{ officer.lname_th }}</div>
                    </div>  -->
                    </template>
                </div>
            </template>
        </div>

        <hr class=" my-7 bg-gray-200">
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

// API Service
import PersonService from '@/Services/PersonService'

onMounted(() => {
    //console.log(props.unit.division_id)
    personService.value.listOfficerByDivisionId(props.unit.division_id).then(data => {
        //console.log(data)
        officers.value = data
    });

  //console.log(officers.value)
})

const props = defineProps({
    unit: { type: Object, default: {} }
})

const personService = ref(new PersonService())

const baseUrl = ref(base_url)
const unitDetail = ref(false)
const officers = ref([])

const moreOfficer = () => {
    unitDetail.value = !unitDetail.value
}

</script>

<style>

</style>
