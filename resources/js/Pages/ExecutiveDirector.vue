<template>
  <AppLayout>
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

      <div class="grid gap-4 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-4">
          <template v-for="director in DirectorData" :key="director.position_id">
              <div class="flex flex-col items-center" v-if="director.position_id !== 1">
                  <img class="object-cover w-24 h-24 mb-2 rounded-full shadow" :src="`${baseUrl}/${director.image}`" />
                  <div class="flex flex-col items-center">
                  <p class="text-lg text-center font-bold">{{ director.rname_full_th }}<br />{{ director.name }}</p>
                  <p class="text-sm text-center text-gray-800">{{ director.position_thai }}</p>
                  </div>
              </div>
          </template>
      </div>

      <div class="mx-auto mt-10 lg:max-w-xl sm:text-center">
        <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-green-900">
          ปรับปรุงข้อมูล ณ วันที่ 2 มกราคม พ.ศ.2563
        </p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';

let DirectorData = reactive([
            { position_id: 1, position_eng: 'manager', position_thai: 'หัวหน้าภาควิชาอายุรศาสตร์', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'ไชยรัตน์ เพิ่มพิกุล', image: 'images/executive_director/u10003260.jpg', },
            { position_id: 2, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์', rname_full_th: 'ศาสตราจารย์ดอกเตอร์นายแพทย์', name: 'เกรียงศักดิ์ วารีแสงทิพย์', image: 'images/executive_director/u10004913.jpg', },
            { position_id: 3, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ 2', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'วันชัย เดชสมฤทธิ์ฤทัย', image: 'images/executive_director/u10004598.jpg', },
            { position_id: 4, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ 3', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'ธีระ ฤชุตระกูล', image: 'images/executive_director/u10004688.jpg', },
            { position_id: 5, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ 4', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'วีรนุช รอบสันติสุข', image: 'images/executive_director/u10006246.jpg', },
            { position_id: 6, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาฯ ฝ่ายการศึกษาระดับแพทยศาสตรบัณฑิต', rname_full_th: 'ศาสตราจารย์แพทย์หญิง', name: 'ปวีณา เชี่ยวชาญวิศวกิจ', image: 'images/executive_director/u10009837.jpg', },
            { position_id: 7, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายการศึกษาระดับหลังปริญญา', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'สุพจน์ พงศ์ประสบชัย', image: 'images/executive_director/u10006188.jpg', },
            { position_id: 8, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายวิจัยและวิชาการ', rname_full_th: 'ศาสตราจารย์นายแพทย์', name: 'รุ่งโรจน์ กฤตยพงษ์', image: 'images/executive_director/u10005628.jpg', },
            { position_id: 9, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายบริการผู้ป่วยใน', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', name: 'ไกรวิพร เกียรติสุนทร', image: 'images/executive_director/u10008475.jpg', },
            { position_id: 10, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายบริการผู้ป่วยนอก', rname_full_th: 'ศาสตราจารย์นายแพทย์', name: 'ทวีศักดิ์ แทนวันดี', image: 'images/executive_director/u10003532.jpg', },
            { position_id: 11, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายพัฒนาคุณภาพ', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'ณสิกาญจน์ อังคเศกวินัย', image: 'images/executive_director/u10017612.jpg', },
            { position_id: 12, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายทรัพยากรบุคคล', rname_full_th: 'อาจารย์นายแพทย์', name: 'ชนินทร์ ลิ่มวงศ์', image: 'images/executive_director/u10003610.jpg', },
            { position_id: 13, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายเวชสารสนเทศและเวชระเบียน', rname_full_th: 'อาจารย์แพทย์หญิง', name: 'นลินี เปรมัษเฐียร', image: 'images/executive_director/u10008842.jpg', },
            { position_id: 14, position_eng: 'xxxx', position_thai: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายวิเทศสัมพันธ์', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'ณัฐวุฒิ วงษ์ประภารัตน์', image: 'images/executive_director/u10014869.jpg', },    
            { position_id: 15, position_eng: 'xxxx', position_thai: 'เลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'อภิรดี ศรีวิจิตรกมล', image: 'images/executive_director/u10008561.jpg', }, 
            { position_id: 16, position_eng: 'xxxx', position_thai: 'ผู้ช่วยเลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', name: 'มณฑิรา มณีรัตนะพร', image: 'images/executive_director/u10014643.jpg', },
            { position_id: 17, position_eng: 'xxxx', position_thai: 'ผู้ช่วยเลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'รองศาสตราจารย์นายแพทย์', name: 'ชยวี เมืองจันทร์', image: 'images/executive_director/u10013675.jpg', },
]);

const manager = ref(0)
const baseUrl = ref(base_url)

</script>

<style>

</style>