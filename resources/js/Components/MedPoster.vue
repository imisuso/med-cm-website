<template>
    <div class="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-(--breakpoint-xl) md:px-24 lg:px-8 lg:py-16">
        <div class="swiper-container-wrapper">
            <div class="custom-prev-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>
            <Swiper
                v-if="posters.length > 0"
                :effect="'coverflow'"
                :slidesPerView="3"
                :spaceBetween="30"
                :centeredSlides="true"
                :loop="posters.length > 3"
                :navigation="{
                    nextEl: '.custom-next-button',
                    prevEl: '.custom-prev-button'
                }"
                :modules="modules"
                :coverflowEffect="{
                    rotate: 0,      /* ไม่หมุน */
                    stretch: 0,
                    depth: 150,     /* ความลึกระหว่างรูป */
                    modifier: 1.5,  /* ความชัดของ effect */
                    slideShadows: false, /* ปิดเงาดำเพื่อความคลีน (เปิดเป็น true ได้ถ้าชอบ) */
                }"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }"
                :pagination="{
                    clickable: true,
                }"
                :preventClicks="false"
                :preventClicksPropagation="false"
                :breakpoints="{
                    '320': {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    '768': {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    '1024': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }"
                class="mySwiper"
            >
                <SwiperSlide v-for="(poster, key) in posters" :key="key">
                    <a :href="`${poster.content_url}`" target="_blank">
                        <img :src="`${poster.cover_url}`" :alt="poster.desc" class="carousel__item"/>
                    </a>
                    <!-- ไม่ได้ ใช้ <div class="p-1 bg-blue-500 text-white rounded-md shadow-md">
                        เผยแพร่ : {{ dayjs(poster.created_at).locale('th').format('วันddddที่ D MMMM BBBB เวลา H:mm') }}
                    </div> ไม่ได้ใช้ -->
                </SwiperSlide>
            </Swiper>
            <div class="custom-next-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
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
const modules = ref([Autoplay, Pagination, Navigation, EffectCoverflow])

</script>

<style scoped>
/* --- ส่วนแก้ไขปัญหาคลิกไม่ได้ (Functional) --- */
.slide-link {
    display: block;
    position: relative;
    z-index: 20; /* ลอยเหนือ Layer ของ Swiper */
    cursor: pointer;
}

.carousel__item {
    pointer-events: auto !important; /* บังคับให้รูปรับการคลิกเสมอ */
    width: 100%;
    display: block;
    object-fit: cover;
}

/* --- ส่วนตกแต่งความสวยงาม (Visual) --- */
.carousel__item {
    border-radius: 16px; /* ขอบมน */
    box-shadow: 0 10px 20px rgba(0,0,0,0.15); /* เงานุ่มๆ */
    transition: all 0.4s ease; /* Animation เวลาขยับ */
}

/* --- Active State: ทำให้รูปตรงกลางเด่นกว่าเพื่อน --- */

/* รูปปกติ (ที่ไม่ได้อยู่ตรงกลาง) ให้จางลงและย่อลงนิดหน่อย */
.swiper-slide img {
    opacity: 0.6;
    transform: scale(0.92);
}

/* รูปตรงกลาง (Active) ให้ชัดเต็มร้อยและขยายเต็ม */
.swiper-slide-active img {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3); /* เงาเข้มขึ้นตอนเด่น */
    z-index: 30; /* อยู่บนสุด */
}

/* Container ใหญ่สุด ให้จัดเรียงแนวนอน */
.swiper-container-wrapper {
    display: flex;
    align-items: center; /* จัดให้อยู่กึ่งกลางแนวตั้ง */
    justify-content: center;
    position: relative;
    width: 100%;
    padding: 0 10px; /* เว้นขอบซ้ายขวานิดหน่อย */
}

.custom-prev-button svg,
.custom-next-button svg {
    width: 20px;
    height: 20px;
    color: #333; /* หรือสีตามธีมเว็บ */
}

/* ปรับตัว Swiper ให้ไม่เต็มจอ เพื่อเหลือที่ให้ปุ่ม */
.mySwiper {
    width: 85% !important; /* บีบ Swiper ให้เล็กลง เหลือที่ด้านข้างให้ปุ่ม */
    margin: 0 20px !important; /* เว้นระยะห่างระหว่างรูปกับปุ่ม */
    padding-top: 20px;
    padding-bottom: 40px;
}

/* ดีไซน์ปุ่ม Custom */
.custom-prev-button,
.custom-next-button {
    width: 40px;
    height: 40px;
    background-color: #fff; /* พื้นหลังปุ่ม */
    color: #333;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 50;
    font-size: 20px;
    font-weight: bold;
    user-select: none;
    transition: all 0.3s;
}

/* Hover Effect */
.custom-prev-button:hover,
.custom-next-button:hover {
    background-color: #f0f0f0;
    transform: scale(1.1);
}

/* Disabled state (เวลากดสุด) */
.swiper-button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Mobile: ซ่อนปุ่ม custom แล้วให้ Swiper เต็มจอ (เพราะมือถือใช้ปัดเอา) */
@media (max-width: 768px) {
    .mySwiper {
        width: 100% !important;
        margin: 0 !important;
    }
    .custom-prev-button,
    .custom-next-button {
        display: none;
    }
}

/* จัดตำแหน่ง Pagination ให้อยู่ด้านล่าง ตรงกลาง */
:deep(.swiper-pagination) {
    position: absolute;
    bottom: 0px !important; /* ปรับระยะห่างจากขอบล่างตามชอบ */
    padding-bottom: 10px;
    z-index: 10;
}

/* 1. จุดปกติ (Inactive): กลมๆ สีเทาจาง */
:deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    background-color: #d1d5db; /* สีเทาอ่อน (Gray-300) */
    opacity: 0.6;
    transition: all 0.3s ease; /* ใส่ Animation ให้นุ่มนวล */
    border-radius: 50%;
    margin: 0 6px !important; /* ระยะห่างระหว่างจุด */
}

/* 2. จุดที่เลือก (Active): ยืดเป็นเม็ดยา สีเขียว */
:deep(.swiper-pagination-bullet-active) {
    width: 30px; /* ยืดความกว้างออก */
    border-radius: 6px; /* ขอบมนเป็นแคปซูล */

    /* --- โซนสีเขียว (เลือกปรับ Code สีได้ตามใจชอบ) --- */
    background-color: #15803d; /* สีเขียวมรกต #10b981 (Emerald-500) สว่าง ทันสมัย */
    /* หรือใช้ #16a34a (Green-600) ถ้าชอบเขียวเข้มแบบใบไม้  หรือ #15803d เขียวธรรมชาติ*/

    opacity: 1;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4); /* เงาสีเขียวเรืองแสงนิดๆ */
}

/* (Optional) Hover: เมื่อเอาเมาส์ไปชี้ที่จุดอื่น ให้เข้มขึ้นนิดนึง */
:deep(.swiper-pagination-bullet:hover) {
    background-color: #9ca3af;
    opacity: 1;
}
</style>
