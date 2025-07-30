<template>
  <div class="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
    <div class="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
      <h2 class="max-w-lg mb-2 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-2 group">
        <span class="inline-block mb-1 sm:mb-4">
          ภาพกิจกรรม.
        </span>
        <div class="h-1 ml-auto duration-300 origin-left transform bg-blue-500 scale-x-30 group-hover:scale-x-100"></div>
      </h2>
      <p class="text-gray-700 lg:text-sm lg:max-w-md">
        ภาพกิจกรรมสำคัญต่างๆของภาควิชาอายุรศาสตร์ ที่ได้มีการจัดขึ้นไม่ว่าจะเป็น กิจกรรมงานวิชาการ วันสำคัญ และอื่นๆ ได้ถูกรวบรวมไว้ที่นี่แล้ว...
      </p>
    </div>

    <div class="grid gap-8 lg:grid-cols-4 sm:max-w-sm sm:mx-auto lg:max-w-full">
      <div v-for="gl in gelleries" :key="gl.id" class="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-lg">
        <!-- <a :href="route(`show_gallery`, date_tranform(gl.event_date))" target="_blank"> -->
        <div class="border-0">
          <!-- <a :href="route(`show_gallery`, gl.id)" target="_blank">
            <img class="object-contain bg-gray-300 backdrop-blur-lg drop-shadow-lg border rounded-md w-full md:h-40" :src="gl.cover_url" alt="" />
          </a> -->
          <Link
            :href="route(`show_gallery`, gl.id)"
          >
            <img class="object-contain bg-gray-300 backdrop-blur-lg drop-shadow-lg border-0 rounded-md w-full md:h-40" :src="gl.cover_url" alt="" />
          </Link>
        </div>
        <div class="p-5 border-0">
          <p class="mb-3 text-sm font-semibold tracking-wide uppercase">
            <span class="text-gray-600 underline">{{ dayjs(gl.event_date).locale('th').format('D MMMM BBBB') }}</span>
          </p>
          <p class="mb-2 text-gray-700">
            {{ gl.desc }}
          </p>
          <Link
            :href="route(`show_gallery`, gl.id)"
            class="inline-flex items-center font-semibold transition-colors duration-200 text-blue-500 hover:text-blue-700"
          >
            คลิกเพื่อดูอัลบั้ม
          </Link>
          <!-- <a :href="route(`show_gallery`, gl.id)" target="_blank" aria-label="" class="inline-flex items-center font-semibold transition-colors duration-200 text-blue-500 hover:text-blue-700">คลิกเพื่อดูอัลบั้ม</a> -->
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div v-show="gallery_all > limit"
          class="w-32 border rounded-xl shadow bg-green-600 px-2 py-2 leading-none text-center text-sm text-gray-100 mt-4 hover:bg-green-500 hover:text-white cursor-pointer"
      >
        <div>
          <Link :href="route(`gallery_all_publish`)">
              รูปกิจกรรม ทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

// API Service
import GalleryService from '@/Services/GalleryService'

const props = defineProps({
    limit: { type: Number },
    gallery_all: { type: Number, default: 0 }
})

onMounted(() => {
    const galleryService = new GalleryService()
    galleryService.listEnabledGallery().then(data => {
        gelleries.value = data
    });
})

dayjs.extend(buddhistEra)

const gelleries = ref([])

const date_tranform = ( event_date ) => {
  return dayjs(event_date).locale('th').format('YYYYMMDD')
}
</script>

<style>

</style>
