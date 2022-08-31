<template>
    <div class="container px-5 py-8 mx-auto">
        <div class="flex justify-center mb-8">
            <div class="inline-flex w-full overflow-hidden rounded-lg shadow sm:w-auto sm:mx-2">
                <div class="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white transition-colors duration-150 transform bg-gradient-to-r from-green-700 to-green-900 hover:from-green-600 hover:to-green-600 sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2 fill-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span class="mx-2 text-2xl">
                        คณะกรรมการฝึกอบรมแพทย์ประจำบ้านอายุรศาสตร์
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap -m-2">
        <div v-for="(person, index) in committees" :key="index" class="p-2 xl:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 group hover:bg-blue-500 border p-4 rounded-lg">
            <!-- <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80"> -->
            <img alt="team" class="w-20 h-20 object-cover object-top flex-shrink-0 rounded-full mr-4" :src="`${person.image_url}`" />
            <div class="flex-grow">
                <h2 class="text-gray-900 group-hover:text-white title-font font-medium">{{ person.rname_full_th }}</h2>
                <h2 class="text-gray-900 group-hover:text-white title-font font-medium">{{ person.fullname }}</h2>
                <p class="text-gray-500 group-hover:text-gray-900 italic">{{ person.position_thai }}</p>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>

import { ref, reactive } from 'vue';

const props = defineProps({
    committees: { type: Array, default: [] },
})

// const CommitteeData = reactive([
//     { person_id: 10003260, position_id: 1, position_eng: 'xxxx', position_thai: 'ที่ปรึกษา', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'ไชยรัตน์ เพิ่มพิกุล', image: 'images/post_graduate/committee/1.jpg', },
//     { person_id: 10003630, position_id: 1, position_eng: 'xxxx', position_thai: 'ที่ปรึกษา', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'นิธิพัฒน์ เจียรกุล', image: 'images/post_graduate/committee/1.jpg', },
//     { person_id: 10003532, position_id: 1, position_eng: 'xxxx', position_thai: 'ที่ปรึกษา', rname_full_th: 'ศาสตราจารย์นายแพทย์', name: 'ทวีศักดิ์ แทนวันดี', image: 'images/post_graduate/committee/1.jpg', },
//     { person_id: 10004823, position_id: 1, position_eng: 'xxxx', position_thai: 'ที่ปรึกษา', rname_full_th: 'ศาสตราจารย์นายแพทย์', name: 'ชัยรัตน์ ฉายากุล', image: 'images/post_graduate/committee/1.jpg', },
//     { person_id: 10006188, position_id: 2, position_eng: 'xxxx', position_thai: 'ประธานกรรมการ', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'สุพจน์ พงศ์ประสบชัย', image: 'images/post_graduate/committee/2.jpg', },
//     { person_id: 10004805, position_id: 3, position_eng: 'xxxx', position_thai: 'รองประธานฯและกรรมการ', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', name: 'อัจฉรา กุลวิสุทธิ์', image: 'images/post_graduate/committee/3.jpg', },
//     { person_id: 10003691, position_id: 5, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'ศาสตราจารย์แพทย์หญิง', name: 'วิวรรณ ทังสุบุตร', image: 'images/post_graduate/committee/5.jpg', },
//     { person_id: 10008561, position_id: 6, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'อภิรดี ศรีวิจิตรกมล', image: 'images/post_graduate/committee/6.jpg', },
//     { person_id: 10006561, position_id: 7, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'รองศาสตราจารย์ดอกเตอร์นายแพทย์', name: 'เมธี ชยะกุลคีรี', image: 'images/post_graduate/committee/7.jpg', },
//     { person_id: 10009839, position_id: 9, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'วันรัชดา คัชมาตย์', image: 'images/post_graduate/committee/9.jpg', },
//     { person_id: 10011383, position_id: 8, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'พรพรรณ กู้มานะชัย', image: 'images/post_graduate/committee/8.jpg', },
//     { person_id: 10020928, position_id: 10, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'พจมาน พิศาลประภา', image: 'images/post_graduate/committee/10.jpg', },
//     { person_id: 10019496, position_id: 14, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'อาจารย์นายแพทย์', name: 'สุพจน์ นิ่มอนงค์', image: 'images/post_graduate/committee/14.jpg', },
//     { person_id: 10017710, position_id: 13, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'ศุภฤกษ์ ดิษยบุตร', image: 'images/post_graduate/committee/13.jpg', },
//     { person_id: 10020702, position_id: 12, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'ผู้ช่วยศาสตราจารย์นายแพทย์', name: 'นัฐสิทธิ์ ลาภปริสุทธิ', image: 'images/post_graduate/committee/12.jpg', },
//     { person_id: 10019478, position_id: 15, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', name: 'ปวีณา ชุณหโรจน์ฤทธิ์', image: 'images/post_graduate/committee/15.jpg', },
//     { person_id: 10027438, position_id: 16, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'ผู้ช่วยศาสตราจารย์นายแพทย์', name: 'นราธิป ชุณหะมณีวัฒน์', image: 'images/post_graduate/committee/16.jpg', },
//     { person_id: 10030939, position_id: 17, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', name: 'กฤติกา ธีระพันธ์เจริญ', image: 'images/post_graduate/committee/17.jpg', },
//     { person_id: 10034027, position_id: 18, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'อาจารย์แพทย์หญิง', name: 'ชามาศ วงค์ษา', image: 'images/post_graduate/committee/18.jpg', },
//     { person_id: 10029131, position_id: 10, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'จิราพร จิตประไพกุลศาล', image: 'images/post_graduate/committee/10.jpg', },
//     { person_id: 10030820, position_id: 16, position_eng: 'xxxx', position_thai: 'กรรมการ', rname_full_th: 'ผู้ช่วยศาสตราจารย์นายแพทย์', name: 'ภาคภูมิ พุ่มพวง', image: 'images/post_graduate/committee/16.jpg', },
//     { person_id: 10006517, position_id: 4, position_eng: 'xxxx', position_thai: 'เลขานุการและกรรมการ', rname_full_th: 'ผู้ช่วยศาสตราจารย์นายแพทย์', name: 'ยิ่งยง ชินธรรมมิตร์', image: 'images/post_graduate/committee/4.jpg', },
//     { person_id: 10004417, position_id: 11, position_eng: 'xxxx', position_thai: 'ผู้ช่วยเลขานุการและกรรมการ', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'กนกวรรณ บุญญพิสิฎฐ์', image: 'images/post_graduate/committee/11.jpg', },
// ]);

const baseUrl = ref(base_url)


</script>

<style>

</style>
