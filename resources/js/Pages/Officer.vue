<template>
<!--    <AppLayout>-->
        <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
            <div>
                <h4 class="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-800">บุคคลากรสำนักงาน</h4>

            </div>
            <div class="mt-6 md:mt-0">
                <Link :href="route('index')">
                    <button class="mr-3 bg-gray-200 text-indigo-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out rounded px-5 py-2 text-sm">กลับหน้าหลัก</button>
                </Link>
            </div>
        </div>

        <div class=" 2xl:container 2xl:mx-auto md:py-6 lg:px-20 md:px-6 py-2 px-4">
            <div class=" flex flex-col ">
                <div class=" w-full mt-0">
                    <div>
                        <div class=" flex justify-start items-center space-x-4 cursor-pointer">
                            <button aria-label="too" class="flex items-center space-x-4 p-1 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-blue-400" @click="unitDetail=!unitDetail">
                                <div class="flex justify-start space-x-4">
                                    <svg v-if="unitDetail" class=" shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16602 10H15.8327" stroke="#1F2937" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <svg v-if="!unitDetail" class=" shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path id="path1" class="" d="M10 4.1665V15.8332" stroke="#1F2937" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M4.16602 10H15.8327" stroke="#1F2937" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <div class="flex font-semibold text-lg leading-5 text-gray-800 text-left">
                                        หัวหน้าสำนักงานภาควิชาอายุรศาสตร์
                                    </div>
                                </div>
                            </button>

                        </div>
                        <div v-if="unitDetail" class="flex flex-col w-full mt-4 rounded-lg shadow-lg bg-gradient-to-r from-blue-50 to-blue-200">
                            <div v-if="secretary" class="flex items-center space-x-4">
                                <div class=" shrink-0 ">
                                    <svg v-if="! secretary.image" class="w-20 h-28 rounded-lg ring-1 ring-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>

                                    <img v-else class="object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300" :src="`${secretary.image_url}`" alt="">
                                </div>
                                <div>
                                    <div class="mb-4 underline ">{{ secretary.title_th }}{{ secretary.fname_th }} {{ secretary.lname_th }}</div>
                                    <div class="italic text-sm text-gray-600">เลขานุการภาควิชาอายุรศาสตร์/หัวหน้าสำนักงานภาควิชาอายุรศาสตร์</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <hr class=" my-7 bg-gray-200">
                </div>

                <template v-for="unit in props.units" :key="unit.id">
                    <OfficerDetail v-if="unit.division_id !== 19" :unit="unit" />
                </template>
            </div>
        </div>
<!--    </AppLayout>-->
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/inertia-vue3'
import OfficerDetail from '@/Components/OfficerDetail.vue'

const props = defineProps({
    units: { type: Array, default: [] },
    secretary: { type: Object, default: {} }
})

const baseUrl = ref(base_url)
const unitDetail = ref(false)

</script>

<style>
</style>

