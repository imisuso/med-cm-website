<template>
    <div class="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-(--breakpoint-xl) md:px-24 lg:px-8 lg:py-16">
        <Swiper
            :effect="'coverflow'"
            :slidesPerView="3"
            :spaceBetween="30"
            :centeredSlides="false"
            :loop="true"
            :navigation="true"
            :modules="modules"
            :coverflowEffect="{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }"
            :pagination="{
                clickable: true,
            }"
            :breakpoints="{
                '320': {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                '768': {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                '1024': {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }"      
            class="mySwiper"
        >
            <SwiperSlide v-for="(poster, key) in posters" :key="key">
                <a :href="`${poster.content_url}`" target="_blank">
                    <img :src="`${poster.cover_url}`" :alt="poster.desc" class="carousel__item"/>
                </a>
                <!-- <div class="p-1 bg-blue-500 text-white rounded-md shadow-md">
                    เผยแพร่ : {{ dayjs(poster.created_at).locale('th').format('วันddddที่ D MMMM BBBB เวลา H:mm') }}
				</div> -->
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper";
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import "swiper/css/effect-coverflow";

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

// API Service
import PosterService from '@/Services/PosterService'

onMounted(() => {
    const posterService = new PosterService()
    posterService.listEnabledPoster().then(data => {
        posters.value = data
    });
})

dayjs.extend(buddhistEra)
const posters = ref([])

// const posters = ref(
//             [
//                 {"id": 1, "desc": "Product desc","cover": "1-11-2021-9.29.5_med_con_20211110.jpg","content":"1-11-2021-9.29.5_med_con_20211110.jpg"},
//                 {"id": 2, "desc": "Product desc","cover": "6-10-2021-10.43.29_poster_promote.jpg","content":"6-10-2021-10.43.29_poster_promote.jpg"},
//                 {"id": 3, "desc": "Product desc","cover": "25-10-2021-8.58.30_med_con_20211103.jpg","content":"25-10-2021-8.58.30_med_con_20211103.jpg"},
//                 {"id": 4, "desc": "Product desc","cover": "17-6-2021-9.16.44_infec_book2.jpg","content":"17-6-2021-9.16.44_infec_book2.jpg"},
//                 {"id": 5, "desc": "Product desc","cover": "1-11-2021-9.29.5_med_con_20211110.jpg","content":"1-11-2021-9.29.5_med_con_20211110.jpg"},
//                 {"id": 6, "desc": "Product desc","cover": "6-10-2021-10.43.29_poster_promote.jpg","content":"6-10-2021-10.43.29_poster_promote.jpg"},
//                 {"id": 7, "desc": "Product desc","cover": "25-10-2021-8.58.30_med_con_20211103.jpg","content":"25-10-2021-8.58.30_med_con_20211103.jpg"},
//                 {"id": 8, "desc": "Product desc","cover": "17-6-2021-9.16.44_infec_book2.jpg","content":"17-6-2021-9.16.44_infec_book2.jpg"},
//             ]
// )


const modules = ref([Autoplay, Pagination, Navigation, EffectCoverflow])

</script>

<style>

</style>