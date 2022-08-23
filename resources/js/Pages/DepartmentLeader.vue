<template>
    <AppLayout>
        <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
            <div>
                <h4 class="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-800">ทำเนียบหัวหน้าภาค</h4>

            </div>
            <div class="mt-6 md:mt-0">
                <a :href="route('index')">
                    <button class="mr-3 bg-gray-200 text-indigo-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out rounded px-5 py-2 text-sm">กลับหน้าหลัก</button>
                </a>
            </div>
        </div>

        <div class="container px-4">
            <div class="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-white">
                <template v-for="leader in leaders" :key="leader.id">
                    <!-- left -->
                    <div v-if="leader.id%2" class="flex flex-row-reverse md:contents">
                        <div class="flex flex-col sm:flex-row items-center bg-blue-500 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
                            <div class="h-20 w-20 mr-2 mb-1 sm:mb-0 shrink-0">
                                <!-- <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt="" class="rounded-full object-cover h-full w-full shadow-md" /> -->
                                <img :src="`${baseUrl}/${leader.image}`" alt="" class="rounded-full object-cover h-full w-full shadow-md" />
                            </div>
                            <div class="backdrop-opacity-10 backdrop-invert bg-white/20  p-2 rounded-md">
                                <h3 class="font-semibold text-center text-md text-gray-800">{{ leader.position }}<br class="block lg:hidden" />{{ leader.name }}</h3>
                                <!-- <h3 class="font-semibold text-md mb-1 text-gray-800">{{ leader.name }}</h3> -->
                                <p class="underline text-sm text-center">ระยะเวลาดำรงตำแหน่ง</p>
                                <p class="text-sm text-center">{{ leader.time_tenure }}</p>
                            </div>
                        </div>
                        <div class="col-start-5 col-end-6 md:mx-auto relative mr-10">
                            <div class="h-full w-6 flex items-center justify-center">
                                <div class="h-full w-1 bg-blue-800 pointer-events-none"></div>
                            </div>
                            <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow text-center">{{ leader.id }}</div>
                        </div>
                    </div>
                    <!-- right -->
                    <div v-else class="flex md:contents">
                        <div class="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                            <div class="h-full w-6 flex items-center justify-center">
                            <div class="h-full w-1 bg-blue-800 pointer-events-none"></div></div>
                            <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow text-center">{{ leader.id }}</div>
                        </div>
                        <div class="flex flex-col sm:flex-row items-center bg-blue-500 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
                            <div class="h-20 w-20 mr-2 mb-1 sm:mb-0 shrink-0">
                                <!-- <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt="" class="rounded-full object-cover h-full w-full shadow-md" /> -->
                                <img :src="`${baseUrl}/${leader.image}`" alt="" class="rounded-full object-cover h-full w-full shadow-md" />
                            </div>
                            <div class="backdrop-opacity-10 backdrop-invert bg-white/20  p-2 rounded-md">
                                <h3 class="font-semibold text-center text-md text-gray-800">{{ leader.position }}<br class="block lg:hidden" />{{ leader.name }}</h3>
                                <!-- <h3 class="font-semibold text-md mb-1 text-gray-800">{{ leader.name }}</h3> -->
                                <p class="underline text-sm text-center">ระยะเวลาดำรงตำแหน่ง</p>
                                <p class="text-sm text-center">{{ leader.time_tenure }}</p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { ref } from 'vue';

const leaders = ref(
            [
                {"id": 1, "position":"ศาสตราจารย์นายแพทย์ ", "name": "William Harvey Perkins","time_tenure": "25 สิงหาคม 2469 - 26 กุมภาพันธ์ 2473", "image":"images/department_leaders/01.gif"},
                {"id": 2, "position":"ศาสตราจารย์", "name": "พระอัพภันตราพาธพิศาล","time_tenure": "27 พฤษภาคม 2473 - 31 พฤษภาคม 2488", "image":"images/department_leaders/02.gif"},
                {"id": 3, "position":"ศาสตราจารย์นายแพทย์", "name": "ประเสริฐ กังสดาลย์","time_tenure": "1 มิถุนายน 2488 - 7 พฤษภาคม 2505", "image":"images/department_leaders/03.gif"},
                {"id": 4, "position":"ศาสตราจารย์นายแพทย์", "name": "จิตต์ ตู้จินดา","time_tenure": "8 พฤษภาคม 2505 - 30 กันยายน 2513", "image":"images/department_leaders/04.gif"},
                {"id": 5, "position":"ศาสตราจารย์นายแพทย์", "name": "วีกิจ วีรานุวัตติ์","time_tenure": "1 ตุลาคม 2513 - 30 กันยายน 2527", "image":"images/department_leaders/05.gif"},
                {"id": 6, "position":"ศาสตราจารย์นายแพทย์", "name": "สุเอ็ด คชเสนี","time_tenure": "1 ตุลาคม 2527 - 30 กันยายน 2528", "image":"images/department_leaders/06.gif"},
                {"id": 7, "position":"ศาสตราจารย์นายแพทย์", "name": "ประเวศ วะสี","time_tenure": "1 ตุลาคม 2528 - 30 พฤศจิกายน 2530", "image":"images/department_leaders/07.gif"},
                {"id": 8, "position":"ศาสตราจารย์นายแพทย์", "name": "อุกฤษต์ เปล่งวาณิช","time_tenure": "1 ธันวาคม 2530 - 30 พฤษภาคม 2532", "image":"images/department_leaders/08.gif"},
                {"id": 9, "position":"ศาสตราจารย์นายแพทย์", "name": "ประพาฬ ยงใจยุทธ","time_tenure": "1 มิถุนายน 2532 - 30 กันยายน 2536", "image":"images/department_leaders/09.gif"},
                {"id": 10, "position":"ศาสตราจารย์นายแพทย์", "name": "ศุภชัย ไชยธีระพันธ์","time_tenure": "1 ตุลาคม 2536 - 19 กุมภาพันธ์ 2540", "image":"images/department_leaders/010.gif"},
                {"id": 11, "position":"ศาสตราจารย์แพทย์หญิง", "name": "สุมาลี นิมมานนิตย์","time_tenure": "20 กุมภาพันธ์ 2540 - 19 กุมภาพันธ์ 2544", "image":"images/department_leaders/011.gif"},
                {"id": 12, "position":"ศาสตราจารย์นายแพทย์", "name": "อมร ลีลารัศมี","time_tenure": "20 กุมภาพันธ์ 2544 - 19 กุมภาพันธ์ 2548", "image":"images/department_leaders/012.gif"},
                {"id": 13, "position":"ศาสตราจารย์คลีนิกนายแพทย์", "name": "อุดม คชินทร","time_tenure": "20 กุมภาพันธ์ 2548 - 8 ธันวาคม 2554", "image":"images/department_leaders/013.gif"},
                {"id": 14, "position":"ศาสตราจารย์นายแพทย์", "name": "วันชัย วนะชิวนาวิน","time_tenure": "16 ธันวาคม 2554 - 15 ธันวาคม 2558", "image":"images/department_leaders/014.jpg"},
                {"id": 15, "position":"รองศาสตราจารย์นายแพทย์", "name": "ไชยรัตน์ เพิ่มพิกุล","time_tenure": "16 ธันวาคม 2558 - ปัจจุบัน", "image":"images/department_leaders/015.jpg"},

            ]
)

const baseUrl = ref(base_url)

</script>

<style>

</style>
