<template>
<!--    <AppLayout>-->
        <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
            <div>
                <h4 class="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-800">ที่ปรึกษาภาควิชา</h4>

            </div>
            <div class="mt-6 md:mt-0">
                <Link :href="route('index')">
                    <button class="mr-3 bg-gray-200 text-indigo-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out rounded px-5 py-2 text-sm">กลับหน้าหลัก</button>
                </Link>
            </div>
        </div>
        <div class="container px-6 py-10 mx-auto">
            <div class="grid grid-cols-1 gap-4 mt-1 xl:mt-2 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="(consultant, index) in listConsultant" :key="index" class="flex flex-col items-center p-2 transition-colors duration-200 transform rounded-xl">
                    <svg v-if="! consultant.image" class="w-32 h-32 rounded-full ring-4 ring-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>

                    <img v-else class="object-fill w-32 h-32 rounded-full ring-4 ring-gray-300" :src="consultant.image_url" alt="">

                    <h1 class="mt-4 text-center text-md font-semibold text-gray-700 capitalize ">{{ consultant.rname_short_th }}<br class="block md:hidden" />{{ consultant.fname_th }} {{ consultant.lname_th }}</h1>

                    <p class="mt-2 text-center text-gray-500 capitalize dark:text-gray-500 ">{{ consultant.division.division_type }}{{ consultant.division.name_th }}</p>
                </div>
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
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    listConsultant: { type: Array, required: true }
})

// const consultants = ref(
//             [
//                 {"id": 1, "position": "ศ. เกียรติคุณ พญ.",  "name": "จินตนา ศิรินาวิน","branch": "สาขาวิชาเวชพันธุศาสตร์", "image":"storage/images/consultants/u10001241.jpg"},
//                 {"id": 2, "position": "ศ. เกียรติคุณ พญ.", "name": "เจียมจิตต์ ดำรงศักดิ์","branch": "สาขาวิชาโรคระบบทางเดินอาหาร", "image":"storage/images/consultants/u10009880.jpg"},
//                 {"id": 3, "position": "ศ. คลินิกนพ.", "name": "ดำรัส ตรีสุโกศล","branch": "สาขาวิชาหทัยวิทยา", "image":"storage/images/consultants/u10003759.jpg"},
//                 {"id": 4, "position": "ศ. เกียรติคุณ นพ.", "name": "เติมชัย ไชยนุวัติ","branch": "สาขาวิชาโรคระบบทางเดินอาหาร", "image":"storage/images/consultants/u10009899.jpg"},
//                 {"id": 5, "position": "ศ. เกียรติคุณ พญ.", "name": "ธัญญารัตน์ ธีรพรเลิศรัฐ","branch": "สาขาวิชาวักกะวิทยา", "image":"storage/images/consultants/u10000625.jpg"},
//                 {"id": 6, "position": "ผศ. นพ.", "name": "นพดล ศิริธนารัตนกุล","branch": "สาขาวิชาโลหิตวิทยา", "image":"storage/images/consultants/u10032290.jpg"},
//                 {"id": 7, "position": "ศ. เกียรติคุณ พญ.", "name": "นลินี อัศวโภคี","branch": "สาขาวิชาโรคติดเชื้อและอายุรศาสตร์เขตร้อน", "image":"storage/images/consultants/u10000368.jpg"},
//                 {"id": 8, "position": "ศ. เกียรติคุณ พญ.", "name": "นันทา มานะเนตร์","branch": "สาขาวิชาโรคระบบการหายใจและวัณโรค", "image":"storage/images/consultants/u10009915.jpg"},
//                 {"id": 9, "position": "ศ. คลินิกเกียรติคุณ นพ.", "name": "ประดิษฐ์ ปัญจวีณิน","branch": "สาขาวิชาหทัยวิทยา", "image":"storage/images/consultants/u10003441.jpg"},
//                 {"id": 10, "position": "ศ. เกียรติคุณ นพ.", "name": "ประพาฬ ยงใจยุทธ","branch": "สาขาวิชาโรคระบบการหายใจและวัณโรค", "image":"storage/images/consultants/u10009934.jpg"},
//                 {"id": 11, "position": "อ. นพ.", "name": "ไพโรจน์ สินลารัตน์","branch": "สาขาวิชาอายุรศาสตร์มะเร็งวิทยา", "image":"storage/images/consultants/u10012805.jpg"},
//                 {"id": 12, "position": "ศ. เกียรติคุณ นพ.", "name": "ยงยุทธ สหัสกุ","branch": "สาขาวิชาหทัยวิทยา", "image":"storage/images/consultants/u10001630.jpg"},
//                 {"id": 13, "position": "ศ. เกียรติคุณ นพ.", "name": "รังสรรค์ ปุษปาคม","branch": "สาขาวิชาโรคระบบการหายใจและวัณโรค", "image":"storage/images/consultants/u10009994.jpg"},
//                 {"id": 14, "position": "รศ. พญ.", "name": "เล็ก ปริวิสุทธิ์","branch": "สาขาวิชาโรคข้อและรูมาติสซั่ม", "image":"storage/images/consultants/u10001244.jpg"},
//                 {"id": 15, "position": "ศ. เกียรติคุณ พญ.", "name": "วรรณี นิธิยานันท์","branch": "สาขาวิชาต่อมไร้ท่อและเมตะบอลิสม", "image":"storage/images/consultants/u10001512.jpg"},
//                 {"id": 16, "position": "ศ. เกียรติคุณ นพ.", "name": "วันชัย วนะชิวนาวิน","branch": "สาขาวิชาโลหิตวิทยา", "image":"storage/images/consultants/u10002044.jpg"},
//                 {"id": 17, "position": "ศ. เกียรติคุณ นพ.", "name": "วิเชียร ทองแตง","branch": "สาขาวิชาหทัยวิทยา", "image":"storage/images/consultants/u10010015.jpg"},
//                 {"id": 18, "position": "ศ. เกียรติคุณ พญ.", "name": "ศศิประภา บุญญพิสิฏฐ์","branch": "สาขาวิชาโรคระบบทางเดินอาหาร", "image":"storage/images/consultants/u10010027.jpg"},
//                 {"id": 19, "position": "ศ. เกียรติคุณ นพ.", "name": "สง่า นิลวรางกูร","branch": "สาขาวิชาวักกะวิทยา", "image":"storage/images/consultants/u10010033.jpg"},
//                 {"id": 20, "position": "ศ. นพ.", "name": "สถาพร มานัสสถิตย์","branch": "สาขาวิชาโรคระบบทางเดินอาหาร", "image":"storage/images/consultants/u10000908.jpg"},
//                 {"id": 21, "position": "อ. นพ.", "name": "สมเกียรติ วสุวัฏฏกุล","branch": "สาขาวิชาวักกะวิทยา", "image":"storage/images/consultants/u10004275.jpg"},
//                 {"id": 22, "position": "ศ. เกียรติคุณ นพ.", "name": "สมหวัง ด่านชัยวิจิตร","branch": "สาขาวิชาโรคติดเชื้อและอายุรศาสตร์เขตร้อน", "image":"storage/images/consultants/u10000375.jpg"},
//                 {"id": 23, "position": "ศ. เกียรติคุณ นพ.", "name": "สวัสดิ์ หิตะนันท์","branch": "สาขาวิชาโรคระบบทางเดินอาหาร", "image":"storage/images/consultants/u10010051.jpg"},
//                 {"id": 24, "position": "ศ. เกียรติคุณ นพ.", "name": "สาธิต วรรณแสง","branch": "สาขาวิชาต่อมไร้ท่อและเมตะบอลิสม", "image":"storage/images/consultants/u10000376.jpg"},
//                 {"id": 25, "position": "ศ. เกียรติคุณ พญ.", "name": "สุคนธ์ วิสุทธิพันธ์","branch": "สาขาวิชาโลหิตวิทยา", "image":"storage/images/consultants/u10010056.jpg"},
//                 {"id": 26, "position": "ศ. นพ.", "name": "สุชัย เจริญรัตนกุล","branch": "สาขาวิชาโรคระบบการหายใจและวัณโรค", "image":"storage/images/consultants/u10029214.jpg"},
//                 {"id": 27, "position": "ศ. คลินิกเกียรติคุณ นพ.", "name": "สุพัฒน์ วาณิชย์การ","branch": "สาขาวิชาวักกะวิทยา", "image":"storage/images/consultants/u10000799.jpg"},
//                 {"id": 28, "position": "รศ. พญ.", "name": "สุมิตร วัฒนวิจารณ์","branch": "สาขาวิชาโลหิตวิทยา", "image":""},
//                 {"id": 29, "position": "ศ. เกียรติคุณ นพ.", "name": "สุรพล อิสรไกรศีล","branch": "สาขาวิชาโลหิตวิทยา", "image":"storage/images/consultants/u10029366.jpg"},
//                 {"id": 30, "position": "ผศ. นพ.", "name": "สุรพล กอบวรรธนะกุล","branch": "สาขาวิชาโรคติดเชื้อและอายุรศาสตร์เขตร้อน", "image":"storage/images/consultants/u10001518.jpg"},
//                 {"id": 31, "position": "ศ. คลินิกนพ.", "name": "สุรศักดิ์ นิลกานุวงศ์","branch": "สาขาวิชาโรคข้อและรูมาติสซั่ม", "image":"storage/images/consultants/u10002186.jpg"},
//                 {"id": 32, "position": "ศ. เกียรติคุณ นพ.", "name": "อภิชาติ วิชญาณรัตน์","branch": "สาขาวิชาต่อมไร้ท่อและเมตะบอลิสม", "image":"storage/images/consultants/u10000081.jpg"},
//                 {"id": 33, "position": "ศ. เกียรติคุณ นพ.", "name": "อมร ลีลารัศมี ศ.11","branch": "สาขาวิชาโรคติดเชื้อและอายุรศาสตร์เขตร้อน", "image":"storage/images/consultants/u10000970.jpg"},
//                 {"id": 34, "position": "ศ. เกียรติคุณ พญ.", "name": "อรพรรณ ชินะภัค","branch": "สาขาวิชาโรคระบบทางเดินอาหาร", "image":"storage/images/consultants/u10010096.jpg"},
//                 {"id": 35, "position": "ศ. เกียรติคุณ นพ.", "name": "อรรถ นานา","branch": "สาขาวิชาโรคระบบการหายใจและวัณโรค", "image":"storage/images/consultants/u10001589.jpg"},
//                 {"id": 36, "position": "อ. นพ.", "name": "เอกพล อัจฉริยะประสิทธิ์","branch": "สาขาวิชาโลหิตวิทยา", "image":"storage/images/consultants/u10024316.jpg"},
//             ])
</script>

<style>

</style>
