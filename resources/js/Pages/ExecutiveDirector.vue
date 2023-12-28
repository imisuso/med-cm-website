<template>
<!--  <AppLayout>-->
    <div class="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
      <div class="mx-auto mb-10 lg:max-w-xl sm:text-center">
        <p class="text-base text-blue-900 md:text-3xl font-bold">
          กรรมการบริหารภาควิชาอายุรศาสตร์
        </p>
      </div>

      <!-- Fix สำหรับหัวหน้าภาค -->
      <div class="grid gap-10 mx-auto lg:max-w-screen-lg mb-4">
        <div class="flex flex-col items-center">
          <img class="object-cover w-24 h-28 mb-2 rounded-xl shadow" :src="`${baseUrl}/${DirectorData[0].image}`" />
          <div class="flex flex-col items-center">
            <p class="text-lg text-center font-bold">{{ DirectorData[0].rname_full_th }}<br />{{ DirectorData[0].name }}</p>
            <p class="text-sm text-center text-gray-800">{{ DirectorData[0].position_thai }}</p>
          </div>
        </div>
      </div>

        <div class="grid gap-4 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-2 mb-4">
            <div class="flex flex-col items-center">
                <img class="object-cover object-top w-24 h-24 mb-2 rounded-full shadow" :src="`${baseUrl}/${DirectorData[1].image}`" />
                <div class="flex flex-col items-center">
                    <p class="text-lg text-center font-bold">{{ DirectorData[1].rname_full_th }}<br />{{ DirectorData[1].name }}</p>
                    <p class="text-sm text-center text-gray-800">{{ DirectorData[1].position_thai }}</p>
                </div>
            </div>
            <div class="flex flex-col items-center">
                <img class="object-cover object-top w-24 h-24 mb-2 rounded-full shadow" :src="`${baseUrl}/${DirectorData[2].image}`" />
                <div class="flex flex-col items-center">
                    <p class="text-lg text-center font-bold">{{ DirectorData[2].rname_full_th }}<br />{{ DirectorData[2].name }}</p>
                    <p class="text-sm text-center text-gray-800">{{ DirectorData[2].position_thai }}</p>
                </div>
            </div>
        </div>

      <div class="grid gap-4 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-4">
          <template v-for="director in DirectorData" :key="director.position_id">
              <div class="flex flex-col items-center" v-if="director.position_id >= 4">
                  <img class="object-cover object-top w-24 h-24 mb-2 rounded-full shadow" :src="`${baseUrl}/${director.image}`" />
                  <div class="flex flex-col items-center">
                  <p class="text-lg text-center font-bold">{{ director.rname_full_th }}<br />{{ director.name }}</p>
                  <p class="text-sm text-center text-gray-800">{{ director.position_thai }}</p>
                  </div>
              </div>
          </template>
      </div>

      <div class="flex items-center justify-center mx-auto mt-10 lg:max-w-xl sm:text-center">
        <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-green-900">
          ปรับปรุงข้อมูล ณ วันที่ 27 ธันวาคม พ.ศ. 2566
        </p>
      </div>
    </div>
<!--  </AppLayout>-->
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>
<script setup>
import { ref, reactive } from 'vue';

let DirectorData = reactive([
    { position_id: 1, position_eng: 'manager', position_thai: 'หัวหน้าภาควิชาอายุรศาสตร์', rname_full_th: 'ศาสตราจารย์นายแพทย์', name: 'สมชาย ลีลากุศลวงศ์', image: 'images/executive_director/10004803.jpg', },
    { position_id: 2, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ คนที่ 1', rname_full_th: 'ศาสตราจารย์นายแพทย์', name: 'ทวีศักดิ์ แทนวันดี', image: 'images/executive_director/10003532.jpg', },
    { position_id: 3, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ คนที่ 2', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'อภิรดี ศรีวิจิตรกมล', image: 'images/executive_director/10008561.jpg', },
    { position_id: 4, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายการศึกษาก่อนปริญญา', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'เอกพันธ์ ครุพงศ์', image: 'images/executive_director/10016067.jpg', },
    { position_id: 5, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายการศึกษาหลังปริญญา', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'สุพจน์ พงศ์ประสบชัย', image: 'images/executive_director/10006188.jpg', },
    { position_id: 6, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายทรัพยากรบุคคล', rname_full_th: 'อาจารย์นายแพทย์', name: 'ชนินทร์ ลิ่มวงศ์', image: 'images/executive_director/10003610.jpg', },
    { position_id: 7, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายบริการผู้ป่วยนอก', rname_full_th: 'ศาสตราจารย์นายแพทย์', name: 'ทวีศักดิ์ แทนวันดี', image: 'images/executive_director/10003532.jpg', },
    { position_id: 8, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายบริการผู้ป่วยใน', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', name: 'ไกรวิพร เกียรติสุนทร', image: 'images/executive_director/10008475.jpg', },
    { position_id: 9, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายพัฒนาคุณภาพ', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'วีรชัย ศรีวณิชชากร', image: 'images/executive_director/10022718.jpg', },
    { position_id: 10, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายวิจัยและวิชาการ', rname_full_th: 'ศาสตราจารย์นายแพทย์', name: 'พูลชัย จรัสเจริญวิทยา', image: 'images/executive_director/10007752.jpg', },
    { position_id: 11, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายวิเทศสัมพันธ์', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'พรพรรณ กู้มานะชัย', image: 'images/executive_director/10011383.jpg', },
    { position_id: 12, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายเวชระเบียน', rname_full_th: 'ผู้ช่วยศาสตราจารย์นายแพทย์', name: 'ทวีศักดิ์ วรรณชาลี', image: 'images/executive_director/10026219.jpg', },
    { position_id: 13, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายสารสนเทศ', rname_full_th: 'อาจารย์นายแพทย์', name: 'ทนุวงศ์ เวียรศิลป์', image: 'images/executive_director/10030838.jpg', },
    { position_id: 14, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายอาคารสถานที่', rname_full_th: 'ผู้ช่วยศาสตราจารย์นายแพทย์', name: 'สุกิจ รักษาสุข', image: 'images/executive_director/10020732.jpg', },
    { position_id: 15, position_eng: 'xxxx', position_thai: 'เลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', name: 'สิรินาถ สิรินทร์วราวงศ์', image: 'images/executive_director/10029153.jpg', },
    { position_id: 16, position_eng: 'xxxx', position_thai: 'ผู้ช่วยเลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', name: 'อวยพร เค้าสมบัติวัฒนา', image: 'images/executive_director/10024393.jpg', },
    { position_id: 17, position_eng: 'xxxx', position_thai: 'ผู้ช่วยเลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', name: 'กฤติกา ธีระพันธ์เจริญ', image: 'images/executive_director/10030939.jpg', },
]);

const manager = ref(0)
const baseUrl = ref(base_url)

</script>

<style>

</style>
