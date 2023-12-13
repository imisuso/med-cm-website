<template>
    <div class="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div class="flex items-center justify-between">
            <div class="w-full grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 content-start">
                <div v-for="item in links" :key="item.id" class="flex items-start justify-center w-full max-w-xs text-center">
                    <a :href="item.link" target="_blank" class="space-y-2" >
                        <!-- <img class="object-none object-center w-full h-20 mx-auto rounded-lg shadow-md " :src="item.image" alt="avatar"/> -->
                        <!-- <img class=" object-cover w-full h-20 rounded-lg shadow-md " :src="item.image" alt="avatar"/> -->
                        <div v-html="item.image" class="flex grow-0 items-center justify-center"></div>
                        <div v-html="item.desc" class="font-bold"></div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';

// const links = ref([
//                 {id:1, image:'storage/images/links/banner_link_edu.jpg', link:'https://10.7.14.14/edumed'},
//                 {id:2, image:'storage/images/links/banner_link_medcon.jpg', link:'https://www.si.mahidol.ac.th/department/Medicine/home/user/manual/Medcon_2565.pdf'},
//                 {id:3, image:'storage/images/links/banner_link_edoc.jpg', link:''},
//                 {id:4, image:'storage/images/links/banner_links_selectx.jpg', link:'http://selecx.si.mahidol.ac.th'},
//                 {id:5, image:'storage/images/links/banner_links_library.jpg', link:'https://medlib.si.mahidol.ac.th'},

//             ])

const props = defineProps({
    medcon_current_year: {type: Number},
    medcon_other_year: {type: Number}
})

const links = ref([


    {id:1, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-yellow-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />\
    </svg>', link:'http://eoffice.sihmis.si/edoc', desc:'ระบบ e-DOC (intranet)'},
    {id:2, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-green-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />\
    </svg>', link:'http://selecx.si.mahidol.ac.th', desc:'SELECx'},
    {id:3, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-orange-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />\
    </svg>', link:'https://medlib.si.mahidol.ac.th', desc:'หอสมุดศิริราช'},
    {id:4, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-pink-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\
    <path stroke-linecap="round" stroke-linejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />\
    </svg>', link:`https://med-cm-website.s3.ap-southeast-1.amazonaws.com/public/resource-files/pdf/Medical_Conference_Schedule_${props.medcon_current_year}.pdf`, desc:`กำหนดการประชุมวิชาการ Medical Conference ปี ${props.medcon_current_year}`},
    {id:5, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-pink-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\
    <path stroke-linecap="round" stroke-linejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />\
    </svg>', link:`https://med-cm-website.s3.ap-southeast-1.amazonaws.com/public/resource-files/pdf/Medical_Conference_Schedule_${props.medcon_other_year}.pdf`, desc:`กำหนดการประชุมวิชาการ Medical Conference ปี ${props.medcon_other_year}`},
    {id:6, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-indigo-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />\
    </svg>', link:'https://med-vdo.simedicine.org', desc:'MED-VDO'},
    {id:7, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-rose-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> \
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /> \
    </svg>', link:'https://10.7.14.14/edumed', desc:'ระบบส่งรายงาน นศพ. ปี 4-6 (intranet)'},
    {id:8, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-orange-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />\
    </svg>', link:'https://simed.mahidol.ac.th/navamindrapobitr/84th-Navamindrapobitr.html', desc:'หนังสือเปิดอาคาร <p>นวมินทรบพิตร ๘๔ พรรษา</p>'},
    {id:9, image:'<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 bg-orange-200 rounded-full shadow-lg p-2 text-gray-400 stroke-2 fill-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />\
    </svg>', link:'https://simed.mahidol.ac.th/AryurVeda-Siriraj_AR2023/AryurVeda-Siriraj_AR2023.html', desc:'รายงานประจำปี <p>2559-2566</p>'},
])

</script>

<style>

</style>
