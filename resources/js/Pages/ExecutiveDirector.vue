<template>
<!--  <AppLayout>-->
    <div class="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-(--breakpoint-xl) md:px-24 lg:px-8 lg:py-12">
      <div class="mx-auto mb-10 lg:max-w-xl sm:text-center">
        <p class="text-base text-blue-900 md:text-3xl font-bold">
          {{ $t('กรรมการบริหารภาควิชาอายุรศาสตร์') }}
        </p>
      </div>

      <!-- Fix สำหรับหัวหน้าภาค -->
      <div class="grid gap-10 mx-auto lg:max-w-(--breakpoint-lg) mb-4">
        <div class="flex flex-col items-center">
          <img class="object-cover w-24 h-28 mb-2 rounded-xl shadow" :src="`${baseUrl}/${DirectorData[0].image}`" />
          <div class="flex flex-col items-center">
            <p class="text-lg text-center font-bold">{{ transDb(DirectorData[0], 'rname_full') }}<br />{{ transDb(DirectorData[0], 'name') }}</p>
            <p class="text-sm text-center text-gray-800">{{ transDb(DirectorData[0], 'position') }}</p>
          </div>
        </div>
      </div>

        <div class="grid gap-4 mx-auto lg:max-w-(--breakpoint-lg) sm:grid-cols-2 lg:grid-cols-2 mb-4">
            <div class="flex flex-col items-center">
                <img class="object-cover object-top w-24 h-24 mb-2 rounded-full shadow" :src="`${baseUrl}/${DirectorData[1].image}`" />
                <div class="flex flex-col items-center">
                    <p class="text-lg text-center font-bold">{{ transDb(DirectorData[1], 'rname_full') }}<br />{{ transDb(DirectorData[1], 'name') }}</p>
                    <p class="text-sm text-center text-gray-800">{{ transDb(DirectorData[1], 'position') }}</p>
                </div>
            </div>
            <div class="flex flex-col items-center">
                <img class="object-cover object-top w-24 h-24 mb-2 rounded-full shadow" :src="`${baseUrl}/${DirectorData[2].image}`" />
                <div class="flex flex-col items-center">
                    <p class="text-lg text-center font-bold">{{ transDb(DirectorData[2], 'rname_full') }}<br />{{ transDb(DirectorData[2], 'name') }}</p>
                    <p class="text-sm text-center text-gray-800">{{ transDb(DirectorData[2], 'position') }}</p>
                </div>
            </div>
        </div>

      <div class="grid gap-4 mx-auto lg:max-w-(--breakpoint-lg) sm:grid-cols-2 lg:grid-cols-4">
          <template v-for="director in DirectorData" :key="director.position_id">
              <div class="flex flex-col items-center" v-if="director.position_id >= 4">
                  <img class="object-cover object-top w-24 h-24 mb-2 rounded-full shadow" :src="`${baseUrl}/${director.image}`" />
                  <div class="flex flex-col items-center">
                  <p class="text-lg text-center font-bold">{{ transDb(director, 'rname_full') }}<br />{{ transDb(director, 'name') }}</p>
                  <p class="text-sm text-center text-gray-800">{{ transDb(director, 'position') }}</p>
                  </div>
              </div>
          </template>
      </div>

      <div class="flex items-center justify-center mx-auto mt-10 lg:max-w-xl sm:text-center">
        <p
            v-if="$page.props.locale === 'th'"
            class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-green-900"
        >
            ปรับปรุงข้อมูล ณ วันที่ 1 ตุลาคม พ.ศ. 2568
        </p>
        <p
          v-if="$page.props.locale === 'en'"
          class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-green-900"
        >
            Last updated: October 1, 2025
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
import { useTrans } from '@/Services/useTrans';

// 1. เรียกใช้ Helper
const { transDb } = useTrans();

let DirectorData = reactive([
    { position_id: 1, position_en: 'Chairperson, Department of Internal Medicine', position_th: 'หัวหน้าภาควิชาอายุรศาสตร์', rname_full_th: 'ศาสตราจารย์นายแพทย์', rname_full_en: 'Prof.', name: 'สมชาย ลีลากุศลวงศ์', name_en: 'Somchai Leelakusolvong', image: 'images/executive_director/10004803.jpg', },
    { position_id: 2, position_en: 'First Deputy Head', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ คนที่ 1', rname_full_th: 'อาจารย์นายแพทย์', rname_full_en: 'Instructor.', name: 'ชนินทร์ ลิ่มวงศ์', name_en: 'Chanin Limwongse', image: 'images/executive_director/10003610.jpg', },
    { position_id: 3, position_en: 'Second Deputy Head', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ คนที่ 2', rname_full_th: 'ศาสตราจารย์แพทย์หญิง', rname_full_en: 'Prof.', name: 'อภิรดี ศรีวิจิตรกมล', name_en: 'Apiradee Sriwijitkamol', image: 'images/executive_director/10008561.jpg', },
    { position_id: 4, position_en: 'Deputy Head for Undergraduate Education', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายการศึกษาก่อนปริญญา', rname_full_th: 'รองศาสตราจารย์นายแพทย์', rname_full_en: 'Assoc. Prof.', name: 'เอกพันธ์ ครุพงศ์', name_en: 'Ekapun Karoopongse', image: 'images/executive_director/10016067.jpg', },
    { position_id: 5, position_en: 'Deputy Head for Postgraduate Education', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายการศึกษาหลังปริญญา', rname_full_th: 'ศาสตราจารย์นายแพทย์', rname_full_en: 'Prof.', name: 'สุพจน์ พงศ์ประสบชัย', name_en: 'Supot Pongprasobchai', image: 'images/executive_director/10006188.jpg', },
    { position_id: 6, position_en: 'Deputy Head for Human Resources', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายทรัพยากรบุคคล', rname_full_th: 'อาจารย์นายแพทย์', rname_full_en: 'Instructor.', name: 'ชนินทร์ ลิ่มวงศ์', name_en: 'Chanin Limwongse', image: 'images/executive_director/10003610.jpg', },
    { position_id: 7, position_en: 'Deputy Head for Outpatient Services', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายบริการผู้ป่วยนอก', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', rname_full_en: 'Asst. Prof.', name: 'รัตนา ชวนะสุนทรพจน์', name_en: 'Ratana Chawanasuntorapoj', image: 'images/executive_director/10008584.jpg', },
    { position_id: 8, position_en: 'Deputy Head for Inpatient Services', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายบริการผู้ป่วยใน', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', rname_full_en: 'Asst. Prof.', name: 'ไกรวิพร เกียรติสุนทร', name_en: 'Kraiwiporn Kiattisunthorn', image: 'images/executive_director/10008475.jpg', },
    { position_id: 9, position_en: 'Deputy Head for Quality Improvement', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายพัฒนาคุณภาพ', rname_full_th: 'รองศาสตราจารย์นายแพทย์', rname_full_en: 'Assoc. Prof.', name: 'วีรชัย ศรีวณิชชากร', name_en: 'Weerachai Srivanichakorn', image: 'images/executive_director/10022718.jpg', },
    { position_id: 10, position_en: 'Deputy Head for Research and Academic Affairs', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายวิจัยและวิชาการ', rname_full_th: 'ศาสตราจารย์นายแพทย์', rname_full_en: 'Prof.', name: 'พูลชัย จรัสเจริญวิทยา', name_en: 'Phunchai Charatcharoenwitthaya', image: 'images/executive_director/10007752.jpg', },
    { position_id: 11, position_en: 'Deputy Head for International Affairs', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายวิเทศสัมพันธ์', rname_full_th: 'รองศาสตราจารย์แพทย์หญิง', rname_full_en: 'Assoc. Prof.', name: 'พรพรรณ กู้มานะชัย', name_en: 'Pornpan Koomanachai', image: 'images/executive_director/10011383.jpg', },
    { position_id: 12, position_en: 'Deputy Head for Medical Records', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายเวชระเบียน', rname_full_th: 'รองศาสตราจารย์นายแพทย์', rname_full_en: 'Assoc. Prof.', name: 'ทวีศักดิ์ วรรณชาลี', name_en: 'Taweesak Wannachalee', image: 'images/executive_director/10026219.jpg', },
    { position_id: 13, position_en: 'Deputy Head for Information Technology', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายสารสนเทศ', rname_full_th: 'รองศาสตราจารย์นายแพทย์', rname_full_en: 'Assoc. Prof.', name: 'ทนุวงศ์ เวียรศิลป์', name_en: 'Tanuwong Viarasilpa', image: 'images/executive_director/10030838.jpg', },
    { position_id: 14, position_en: 'Deputy Head for Facilities', position_th: 'รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายอาคารสถานที่', rname_full_th: 'ผู้ช่วยศาสตราจารย์นายแพทย์', rname_full_en: 'Asst. Prof.', name: 'สุกิจ รักษาสุข', name_en: 'Sukit Raksasuk', image: 'images/executive_director/10020732.jpg', },
    { position_id: 15, position_en: 'Secretary of the Executive Committee', position_th: 'เลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', rname_full_en: 'Asst. Prof.', name: 'สิรินาถ สิรินทร์วราวงศ์', name_en: 'Sirinart Sirinuarauong', image: 'images/executive_director/10029153.jpg', },
    { position_id: 16, position_en: 'Assistant Secretary of the Executive Committee', position_th: 'ผู้ช่วยเลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', rname_full_en: 'Asst. Prof.', name: 'อวยพร เค้าสมบัติวัฒนา', name_en: 'Uayporn Kaosombatwattana', image: 'images/executive_director/10024393.jpg', },
    { position_id: 17, position_en: 'Assistant Secretary of the Executive Committee', position_th: 'ผู้ช่วยเลขานุการกรรมการบริหารภาควิชาอายุรศาสตร์', rname_full_th: 'ผู้ช่วยศาสตราจารย์แพทย์หญิง', rname_full_en: 'Asst. Prof.', name: 'กฤติกา ธีระพันธ์เจริญ', name_en: 'Krittika Teerapuncharoen', image: 'images/executive_director/10030939.jpg', },
]);

const manager = ref(0)
const baseUrl = ref(base_url)

</script>

<style>

</style>
