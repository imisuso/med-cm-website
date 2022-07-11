<template>
    <div class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
        <div class="grid gap-5 row-gap-8 lg:grid-cols-2">
            <div class="flex flex-col justify-center">
                <div class="max-w-xl mb-6">
                <h2 class="max-w-lg mb-6 font-sans text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl sm:leading-none">
                    เกณฑ์การคัดเลือก  แพทย์ประจำบ้าน  ภาควิชาอายุรศาสตร์
                    คณะแพทยศาสตร์
                    <span class="relative px-1">
                    <div class="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-yellow-400"></div>
                    <span class="relative inline-block text-green-800">ศิริราชพยาบาล</span>
                    </span>
                </h2>
                </div>
                <div class="grid gap-5 row-gap-8 sm:grid-cols-2">
                <div class="bg-white border-l-4 shadow-sm border-green-800">
                    <div class="h-full p-5 border border-l-0 rounded-r">
                    <h6 @click="criteriaModal = true" class="mb-2 font-semibold leading-5 cursor-pointer">
                        เกณฑ์การคัดเลือก
                    </h6>
                    </div>
                </div>
                <div class="bg-white border-l-4 shadow-sm border-green-800">
                    <div class="h-full p-5 border border-l-0 rounded-r">
                    <h6 @click="selectMethodModal = true" class="mb-2 font-semibold leading-5 cursor-pointer">
                        วิธีการคัดเลือก   
                    </h6>
                    </div>
                </div>
                </div>
            </div>
            <div>
                <img class="object-cover w-full h-56 rounded shadow-lg sm:h-96" src="../../../asset/images/post_graduate/criteria.jpg" alt="" />
            </div>
        </div>
    </div>

    <Modal :isModalOpen="criteriaModal" >

      <template v-slot:header>
        <div class="text-gray-900 text-xl font-bold">
            เกณฑ์การคัดเลือก
        </div>
      </template>

      <template v-slot:body>
        <div class="flex flex-col text-gray-900 text-md font-medium px-5">
            <ol class="list-decimal list-outside space-y-2">
                <li class=" leading-5">พิจารณารับแพทย์ประจำบ้านสาขาอายุรศาสตร์ตามจำนวนที่แพทยสภากำหนดไว้ โดยมีสัดส่วนจำนวนหนึ่งสำหรับโครงการแพทย์ทดแทนภาระงานภาควิชาอายุรศาสตร์ในปี 2562 </li> 
                <li class=" leading-5">พิจารณารับแพทย์ประจำบ้านที่มีต้นสังกัดมากกว่าแพทย์ประจำบ้านต้นสังกัดอิสระในสัดส่วนประมาณ 2 ต่อ 1</li>
                <li class=" leading-5">ผู้สมัครต้องมีคุณสมบัติถูกต้องตามระเบียบของแพทยสภาและราชวิทยาลัยอายุรแพทย์ฯ และไม่มีความพิการรุนแรงที่จะเป็นอุปสรรคในการฝึกอบรมแพทย์ประจำบ้านอายุรศาสตร์</li>
                <li class=" leading-5">การตัดสินการคัดเลือกแพทย์ประจำบ้าน พิจารณาจากการรวมคะแนนตามลำดับดังนี้</li>
            </ol>
            <ul class=" list-outside list-disc px-5 space-y-2">
                <li class=" leading-5">
                    <div class="flex justify-between items-center">
                        <div class="mr-4">คะแนนเฉลี่ยตลอดหลักสูตร</div>
                        <div>50%</div>
                    </div>	
                </li>
 	            <li class=" leading-5">
                     <div class="flex justify-between items-center">
                        <div class="mr-4">คะแนนสอบ NL ขั้นที่ 2</div>
                        <div>10%</div>
                    </div>	
                </li>
                <li class=" leading-5">
                     <div class="flex justify-between items-center">
                        <div class="mr-4">จบการศึกษาจากแพทยศาสตร์บัณฑิต จากคณะแพทยศาสตร์ศิริราชพยาบาล</div>
                        <div>5%</div>
                    </div>	
                </li>
                <li class=" leading-5">
                     <div class="flex justify-between items-center">
                        <div class="mr-4">มีต้นสังกัดเข้าฝึกอบรม</div>
                        <div>5%</div>
                    </div>	
                </li>
                <li class=" leading-5">
                     <div class="flex justify-between items-center">
                        <div class="mr-4">มีต้นสังกัดของ 3 จังหวัดภาคใต้ หรือคณะแพทยศาสตร์ศิริราชพยาบาล</div>
                        <div>2%</div>
                    </div>	
                </li>
                <li class=" leading-5">
                     <div class="flex justify-between items-center">
                        <div class="mr-4">คะแนนการสัมภาษณ์</div>
                        <div>30%</div>
                    </div>	
                </li>
            </ul>
        </div>
      </template>

      <template v-slot:footer>
        <button @click="criteriaModal = !criteriaModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ปิด</button>
      </template>
    </Modal>

    <Modal :isModalOpen="selectMethodModal" >

      <template v-slot:header>
        <div class="text-gray-900 text-xl font-bold">
            วิธีการคัดเลือก
        </div>
      </template>

      <template v-slot:body>
        <div class="flex flex-col text-gray-900 text-md font-medium px-5">
            <ol class="list-decimal list-outside space-y-2">
                <li class=" leading-5">ผู้สมัครส่งใบสมัครเป็นทางการให้ราชวิทยาลัยอายุรแพทย์ฯ ตามกำหนดการรับสมัคร พร้อมส่งหลักฐานประกอบการสมัครให้ภาควิชาฯ</li> 
                <li class=" leading-5">สอบสัมภาษณ์ผู้สมัครโดยคณะกรรมการการศึกษาหลังปริญญาและคณาจารย์ภาควิชาอายุรศาสตร์ ตามกำหนดเวลาและหลักเกณฑ์ของราชวิทยาลัยอายุรแพทย์ฯ</li>
                <li class=" leading-5">ตัดสินผลการคัดเลือกตามเกณฑ์การคัดเลือกข้างต้น กรณีที่คะแนนใกล้เคียงกันขึ้นอยู่กับดุลยพินิจของคณะกรรมการการศึกษาหลังปริญญา</li>
                <li class=" leading-5">แจ้งผลการคัดเลือกให้ผู้สมัครรับทราบตามกำหนดเวลาของราชวิทยาลัยอายุรแพทย์ฯ และส่งรายชื่อผู้ที่ได้รับคัดเลือกให้แพทยสภาโดยผ่านราชวิทยาลัยอายุรแพทย์ฯ</li>
            </ol>
        </div>
      </template>

      <template v-slot:footer>
        <button @click="selectMethodModal = !selectMethodModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ปิด</button>
      </template>
    </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/Components/Modal.vue'

const criteriaModal = ref(false)
const selectMethodModal = ref(false)

const modalHandler = (val) => {
            let modal = document.getElementById("modal");
            if (val) {
                fadeIn(modal);
            } else {
                fadeOut(modal);
            }
        }
const fadeOut = (el) => {
            el.style.opacity = 1;
            (function fade() {
                if ((el.style.opacity -= 0.1) < 0) {
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        }
const fadeIn = (el, display) => {
            el.style.opacity = 0;
            el.style.display = display || "flex";
            (function fade() {
                let val = parseFloat(el.style.opacity);
                if (!((val += 0.2) > 1)) {
                    el.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            })();
        }
const baseUrl = ref(base_url)
</script>

<style>

</style>