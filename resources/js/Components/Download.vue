<template>
    <div class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <!-- <div class="text-2xl font-medium text-white title-font mb-2 p-2 bg-green-800 rounded-md shadow-md flex items-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <div class="flex items-center ml-2">ดาวน์โหลด</div>
        </div>  -->
        <div class="flex items-end justify-center mb-16">
            <div class="flex px-2 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
            </div>
            <div class="flex mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl px-2">
                ดาวน์โหลด
            </div>
        </div>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">       
            <div v-for="(card, idx) in downloadItems" v-bind:key="idx" class="w-full h-32 flex flex-col justify-between bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg border border-gray-400 mb-2 py-5 px-4" v-bind:class="[card.theme, card.border]">
                <div class="flex align-top justify-between space-x-2">
                    <h4 class="text-gray-800 font-bold mb-3">{{ card.title }}</h4>
                    <a :href="card.link" target="_blank">
                        <div class="w-8 h-8 rounded-full bg-blue-500  text-white flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                        </div>
                    </a>           
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div class="flex flex-wrap my-12 dark:text-white">
            <div v-for="(card, idx) in downloadItems" :key="idx" class="w-full border-b border-gray-200 md:w-1/2 md:border-r lg:w-1/3 p-8">
                <div class="flex items-center mb-6">
                    <svg width="20" height="20" fill="currentColor" class="h-6 w-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                        </path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div class="ml-4 text-md text-gray-500">
                        {{ card.updated_at }}
                    </div>
                </div>
                <p class="leading-loose text-md">
                    {{ card.title }}
                </p>
            </div>
        </div>
    </div> -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios, { AxiosInstance } from 'axios'

onMounted(() => {
    axios.get(route('download.all_enable')).then(res => {
        downloadItems.value = res.data
    });
})

const downloadItems = ref(null)
// cards: [
//                 {
//                     title: "ขั้นตอนการติดตั้งระบบ Medical Notes ของภาควิชาอายุรศาสตร์ บน Firefox Portable",
//                     desc: "Our interior design experts work with you to create the space that you have been dreaming about. ",
//                     date: "March 28, 2020",
//                     // theme: "bg-teal-100",
//                     // border: "border-teal-100",
//                     link: "https://www.si.mahidol.ac.th/department/Medicine/home/document/HowToInstallMedicalNotes.pdf",
//                 },
//                 {
//                     title: "โปรแกรม firefox portable",
//                     desc: "Our interior design experts work with you to create the space that you have been dreaming about. ",
//                     date: "March 28, 2020",
//                     // theme: "bg-teal-300",
//                     // border: "border-teal-300",
//                     link: "https://www.si.mahidol.ac.th/department/Medicine/home/document/FirefoxPortable.zip",
//                 },
//                 {
//                     title: "VDO สาธิตการใส่ชุดป้องกันไวรัส Covid-19",
//                     desc: "Our interior design experts work with you to create the space that you have been dreaming about. ",
//                     date: "March 28, 2020",
//                     // theme: "bg-teal-100",
//                     // border: "border-teal-100",
//                     link: "https://www.si.mahidol.ac.th/department/Medicine/home/covid.html",
//                 },
//                 {
//                     title: "VDO สอนการใช้งาน Cisco Webex เพื่อ Join Meeting/Event",
//                     desc: "Our interior design experts work with you to create the space that you have been dreaming about. ",
//                     date: "March 28, 2020",
//                     // theme: "bg-teal-100",
//                     // border: "border-teal-100",
//                     link: "https://www.si.mahidol.ac.th/department/Medicine/home/webexdocument/participantsJoin.html",
//                 },
//                 {
//                     title: "คู่มือสอนการใช้งาน Cisco Webex",
//                     desc: "Our interior design experts work with you to create the space that you have been dreaming about. ",
//                     date: "March 28, 2020",
//                     // theme: "bg-teal-100",
//                     // border: "border-teal-100",
//                     link: "https://www.si.mahidol.ac.th/department/Medicine/home/webex_documents.html",
//                 },
//                 {
//                     title: "แบบฟอร์มขอข้อมูล ปรับปรุงระบบงานและประชาสัมพันธ์บน Website",
//                     desc: "Our interior design experts work with you to create the space that you have been dreaming about. ",
//                     date: "March 28, 2020",
//                     // theme: "bg-teal-500",
//                     // border: "border-teal-500",
//                     link: "https://www.si.mahidol.ac.th/department/Medicine/home/user/new/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%9F%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%20%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B8%87%E0%B8%B2%E0%B8%99%20%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C%E0%B8%9A%E0%B8%99%20Website.pdf",
//                 },
//                 {
//                     title: "VDO การฝึกการหายใจแบบใช้กระบังลม",
//                     desc: "Our interior design experts work with you to create the space that you have been dreaming about. ",
//                     date: "April 1, 2022",
//                     // theme: "bg-teal-500",
//                     // border: "border-teal-500",
//                     link: "https://www.si.mahidol.ac.th/department/Medicine/home/Animation_Breath_Sound.html",
//                 },
//             ],
</script>

<style scoped>
/* body {
    font-family: "Lato", sans-serif;
} */
</style>
