<template>  
    <div class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div class="flex flex-col items-start">
            
            <div class="text-2xl font-medium text-white title-font mb-2 p-2 bg-gradient-to-r from-green-800 to-green-600 rounded-md shadow-md flex items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <div class="flex items-center ml-2">ข่าวประชาสัมพันธ์</div>
            </div>
            
            <div v-for="item in announcements" :key="item.id" class="flex flex-wrap md:flex-nowrap w-full">
                <div v-if="item.publish_status" class="w-full mb-2 bg-white rounded-md border border-gray-400 border-l-4 border-l-teal-600">
                    <a class="text-gray-500 italic inline-flex items-center px-2 text-xs">{{ dayjs(item.publish_date).locale('th').format('D MMMM BBBB เวลา H:mm') }}</a>
                    <!-- <a class="text-gray-500 italic inline-flex items-center px-2 text-xs">{{ dayjs.tz(dayjs(item.publish_date), 'Asia/Bangkok').locale('th').format('D MMMM BBBB เวลา H:mm') }}</a> -->
                    <div class="flex flex-col items-start shadow-md rounded-md">
                        <svg v-if="item.pinned" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="h-5 w-5 text-red-500 shrink-0" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                            <g transform="translate(128 128) scale(0.72 0.72)" style="">
                                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                                <path d="M 89.011 87.739 c -0.599 -1.371 -1.294 -2.652 -1.968 -3.891 l -0.186 -0.343 l -15.853 -15.91 c -0.371 -0.375 -0.746 -0.748 -1.12 -1.12 c -0.671 -0.667 -1.342 -1.335 -1.997 -2.018 l -1.459 -1.437 l 23.316 -23.317 l -1.704 -1.704 c -9.111 -9.112 -22.925 -12.518 -35.353 -8.759 l -6.36 -6.359 c 0.769 -7.805 -2.017 -15.69 -7.503 -21.175 L 37.123 0 L 0 37.122 l 1.706 1.704 c 5.487 5.487 13.368 8.271 21.176 7.503 l 6.36 6.36 C 25.484 65.115 28.889 78.93 38 88.041 l 1.703 1.704 l 23.316 -23.316 l 1.438 1.458 c 0.679 0.653 1.344 1.321 2.009 1.989 c 0.373 0.374 0.745 0.748 1.117 1.116 l 15.699 15.7 l 0.566 0.352 c 1.239 0.673 2.52 1.369 3.891 1.968 L 90 90 L 89.011 87.739 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(175,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                </g>
                            </g>
                        </svg>
                        <a :href="route(`announce_details`, item.slug)" target="_blank">
                            <p class="leading-relaxed text-md text-black font-bold p-2  hover:text-indigo-700 cursor-pointer">{{ item.topic }}</p>    
                        </a>
                    </div>
                    
                </div>
            </div>
            
            <!-- <div v-show="announcement_all > limit" class="text-md mt-4 hover:text-indigo-700 cursor-pointer">
                <a :href="route(`announce_all_publish`)" target="_blank">
                    ดูทั้งหมด...
                </a>
            </div> -->
            <div v-show="announcement_all > limit" 
                class="border rounded-xl shadow bg-green-600 px-2 py-2 leading-none text-center text-sm text-gray-100 mt-4 hover:bg-green-500 hover:text-white cursor-pointer"
            >
                <Link :href="route(`announce_all_publish`)">
                    ข่าวประชาสัมพันธ์ ทั้งหมด
                </Link>
                <!-- <a :href="route(`announce_all_publish`)" target="_blank">
                    ข่าวประชาสัมพันธ์ ทั้งหมด
                </a> -->
            </div>              
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import { Link } from '@inertiajs/inertia-vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
//import * as utc from 'dayjs/plugin/utc'
// import * as timezone from 'dayjs/plugin/timezone'

// API Service
import AnnounceService from '@/Services/AnnounceService'

const props = defineProps({
    limit: { type: Number },
    announcement_all: { type: Number, default: 0 }
})

onMounted(() => {
    // เอามาจาก DB แค่ 10 records
    announceService.value.listShow(props.limit).then(data => {
        announcements.value = data
    });
})

dayjs.extend(buddhistEra)
//dayjs.extend(utc)
// dayjs.extend(timezone)
// dayjs.tz.setDefault("Asia/Bangkok")

const announceService = ref(new AnnounceService())
const announcements = ref([])
        
</script>

<style scoped>

</style>