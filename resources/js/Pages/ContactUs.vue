<template>
<!--    <AppLayout>-->
        <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
            <div>
                <h4 class="text-2xl font-bold leading-tight text-gray-800">ติดต่อเรา</h4>

            </div>
            <div class="mt-6 md:mt-0">
                <Link :href="route('index')">
                    <button class="mr-3 bg-gray-200 text-indigo-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out rounded px-5 py-2 text-sm">กลับหน้าหลัก</button>
                </Link>
            </div>
        </div>

        <div class="flex flex-col justify-center container px-6 py-10 mx-auto">
            <div class="mb-4 text-2xl font-bold">สาขาวิชา</div>
            <div v-for="(item, index) in BranchPhone" :key="index">
                <div class="grid grid-cols-2 gap-4 p-2 border border-white" :class="[index%2 ? 'border-r-green-800 border-b-green-800' : 'border-l-green-800 border-b-green-800']">
                    <div class="self-center italic">{{ item.name }}</div>
                    <div>
                        <div class="flex flex-col md:flex-row items-start">
                            <div class="flex items-center space-x-2 w-27 font-bold ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-cyan-600 fill-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>เบอร์โทร :</span>
                            </div>
                            <div class="md:ml-2">
                                <div v-for="(phone, pindex) in item.phone" :key="pindex">
                                    {{ phone }}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row items-start">
                            <div class="flex items-center space-x-2 w-27 font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-gray-600 fill-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                <span>Fax :</span>
                            </div>
                            <div class="md:ml-2">
                                <div v-for="(fax, findex) in item.fax" :key="findex">
                                    {{ fax }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 mb-4 text-2xl font-bold">สำนักงานภาควิชาอายุรศาสตร์</div>
            <div v-for="(item, index) in UnitPhone" :key="index">
                <div class="grid grid-cols-2 gap-4 p-2 border border-white" :class="[index%2 ? 'border-r-green-800 border-b-green-800' : 'border-l-green-800 border-b-green-800']">
                    <div class="self-center italic">{{ item.name }}</div>
                    <div>
                        <div class="flex flex-col md:flex-row items-start">
                            <div class="flex items-center space-x-2 w-27 font-bold ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-cyan-600 fill-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>เบอร์โทร :</span>
                            </div>
                            <div class="md:ml-2">
                                <div v-for="(phone, pindex) in item.phone" :key="pindex">
                                    {{ phone }}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row items-start">
                            <div class="flex items-center space-x-2 w-27 font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-gray-600 fill-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                <span>Fax :</span>
                            </div>
                            <div class="md:ml-2">
                                <div v-for="(fax, findex) in item.fax" :key="findex">
                                    {{ fax }}
                                </div>
                            </div>
                        </div>
                    </div>
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
import { reactive, ref } from 'vue'
import { Link } from '@inertiajs/vue3'

const BranchPhone = ref([
        // {'name' : 'สาขาวิชาการบริบาลผู้ป่วยนอก', 'phone' : ['02-419-7190'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาความดันโลหิตสูง', 'phone' : ['0-2419-7790-1'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชามะเร็งวิทยา', 'phone' : ['02-419-7190', '0-2419-4495'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาต่อมไร้ท่อและเมตะบอลิสม', 'phone' : ['0-2419-7799'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาโรคติดเชื้อและอายุรศาสตร์เขตร้อน', 'phone' : ['0-2419-7783-4', '0-2419-9462'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาประสาทวิทยา', 'phone' : ['0-2419-7101'], 'fax' : ['0-2419-7665']},
        // {'name' : 'สาขาวิชาโภชนาการคลินิก', 'phone' : ['0-2419-7191'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาโรคข้อและรูมาติสซั่ม', 'phone' : ['0-2419-7776'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาโรคภูมิแพ้และภูมิคุ้มกันทางคลินิก', 'phone' : ['0-2419-8263'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาโรคระบบการหายใจและวัณโรค', 'phone' : ['0-2419-7757-8'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาโรคระบบทางเดินอาหาร', 'phone' : ['0-2419-7281-3'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาโลหิตวิทยา', 'phone' : ['0-2419-4448-9'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาวักกะวิทยา', 'phone' : ['0-2419-8383', '0-2419-7291'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาเวชบำบัดวิกฤต', 'phone' : ['0-2419-8354'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาเวชพันธุศาสตร์', 'phone' : ['0-2419-2729'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาหทัยวิทยา', 'phone' : ['0-2419-6104-5'], 'fax' : ['-']},
        // {'name' : 'สาขาวิชาอายุรศาสตร์ปัจฉิมวัย', 'phone' : ['0-2419-7196'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาการบริบาลผู้ป่วยนอก', 'phone' : ['02-419-7190'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาความดันโลหิตสูง', 'phone' : ['0-2419-7790-1'], 'fax' : ['-']},
        {'name' : 'สาขาวิชามะเร็งวิทยา', 'phone' : ['02-419-4489', '0-2419-4495'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาต่อมไร้ท่อและเมตะบอลิสม', 'phone' : ['0-2419-7799'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาโรคติดเชื้อและอายุรศาสตร์เขตร้อน', 'phone' : ['0-2419-7783-4', '0-2419-9462'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาประสาทวิทยา', 'phone' : ['0-2419-7101'], 'fax' : ['0-2419-7665']},
        {'name' : 'สาขาวิชาโภชนาการคลินิก', 'phone' : ['0-2419-9322'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาโรคข้อและรูมาติสซั่ม', 'phone' : ['0-2419-7776'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาโรคภูมิแพ้และภูมิคุ้มกันทางคลินิก', 'phone' : ['0-2419-8263'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาโรคระบบการหายใจและวัณโรค', 'phone' : ['0-2419-7757-8'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาโรคระบบทางเดินอาหาร', 'phone' : ['0-2419-7281-3'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาโลหิตวิทยา', 'phone' : ['0-2419-4448-9'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาวักกะวิทยา', 'phone' : ['0-2419-8383', '0-2419-7291'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาเวชบำบัดวิกฤต', 'phone' : ['0-2419-8354'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาเวชพันธุศาสตร์', 'phone' : ['0-2419-2729'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาหทัยวิทยา', 'phone' : ['0-2419-6104-5'], 'fax' : ['-']},
        {'name' : 'สาขาวิชาอายุรศาสตร์ปัจฉิมวัย', 'phone' : ['0-2419-7196'], 'fax' : ['-']},
    ])

const UnitPhone = ref([
        // {'name' : 'เลขานุการภาควิชาอายุรศาสตร์', 'phone' : ['0-2419-7770'], 'fax' : ['-']},
        // {'name' : 'เลขานุการหัวหน้าภาควิชาอายุรศาสตร์', 'phone' : ['0-2419-7767-69 ต่อ 110', '0-2419-7782'], 'fax' : ['-']},
        // {'name' : 'หน่วยการศึกษา (ก่อนปริญญา และหลังปริญญา)', 'phone' : ['0-2419-7778', '0-2419-8302', '0-2419-9695'], 'fax' : ['0-2411-1103']},
        // {'name' : 'หน่วยวิจัยและวิชาการ', 'phone' : ['0-2419-7767-69 ต่อ 108', '0-2419-8801'], 'fax' : ['-']},
        // {'name' : 'หน่วยบริการและพัฒนาคุณภาพ', 'phone' : ['0-2419-7767-69 ต่อ 104', '0-2419-7767-69 ต่อ 105', '0-2419-7767-69 ต่อ 109', '0-2419-7767-69 ต่อ 113'], 'fax' : ['-']},
        // {'name' : 'หน่วยบุคคลและการจัดการความรู้', 'phone' : ['0-2419-7767-69 ต่อ 103', '0-2419-8258'], 'fax' : ['-']},
        // {'name' : 'หน่วยเวชระเบียน', 'phone' : ['0-2419-7043 ต่อ 101', '0-2419-7781'], 'fax' : ['-']},
        // {'name' : 'หน่วยเวชสารสนเทศ', 'phone' : ['0-2419-8260 ต่อ 104 - 108'], 'fax' : ['-']},
        // {'name' : 'หน่วยงบประมาณพัสดุและการเงิน', 'phone' : ['0-2419-7767-69 ต่อ 102', '0-2419-8700'], 'fax' : ['-']},
        // {'name' : 'หน่วยบริหารสำนักงาน', 'phone' : ['0-2419-7767-69 ต่อ 101', '0-2419-7767-69 ต่อ 106', '0-2419-7191'], 'fax' : ['-']},
        {'name' : 'เลขานุการภาควิชาอายุรศาสตร์', 'phone' : ['0-2419-7771'], 'fax' : ['-']},
        {'name' : 'เลขานุการหัวหน้าภาควิชาอายุรศาสตร์', 'phone' : ['0-2419-7767-69 ต่อ 110', '0-2419-7782'], 'fax' : ['-']},
        {'name' : 'หน่วยการศึกษา (ก่อนปริญญา และหลังปริญญา)', 'phone' : ['0-2419-7778', '0-2419-8302', '0-2419-9695'], 'fax' : ['0-2411-1103']},
        {'name' : 'หน่วยวิจัยและวิชาการ', 'phone' : ['0-2419-7767-69 ต่อ 108', '0-2419-8801'], 'fax' : ['-']},
        {'name' : 'หน่วยบริการและพัฒนาคุณภาพ', 'phone' : ['0-2419-7767-69 ต่อ 104', '0-2419-7767-69 ต่อ 105', '0-2419-7767-69 ต่อ 109', '0-2419-7767-69 ต่อ 113'], 'fax' : ['-']},
        {'name' : 'หน่วยบุคคลและการจัดการความรู้', 'phone' : ['0-2419-7767-69 ต่อ 103', '0-2419-8258'], 'fax' : ['-']},
        {'name' : 'หน่วยเวชระเบียน', 'phone' : ['0-2419-7043 ต่อ 101', '0-2419-7781'], 'fax' : ['-']},
        {'name' : 'หน่วยเวชสารสนเทศ', 'phone' : ['0-2419-8260 ต่อ 104 - 108'], 'fax' : ['-']},
        {'name' : 'หน่วยงบประมาณพัสดุและการเงิน', 'phone' : ['0-2419-7767-69 ต่อ 102', '0-2419-8700'], 'fax' : ['-']},
        {'name' : 'หน่วยบริหารสำนักงาน', 'phone' : ['0-2419-7767-69 ต่อ 101', '0-2419-7767-69 ต่อ 106', '0-2419-7191'], 'fax' : ['-']},
    ])

</script>

<style>

</style>
