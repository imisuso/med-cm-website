<template>
    <div class="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
        <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center"
        >
        <div class="max-w-lg mx-auto text-center lg:text-left lg:mx-0">
            <h2 class="text-3xl font-bold sm:text-4xl">ความรู้สำหรับประชาชน</h2>

            <p class="mt-4 text-gray-600">
            แหล่งความรู้ทั่วไปสำหรับประชาชนที่ทาง ภาควิชาอายุรศาสตร์ ศิริราชพยาบาล นำมาเผยแพร่เพื่อเป็นสาธารณะประโยชน์ต่อการดำรงชีวิตประจำวัน
            </p>

            <a
            class="inline-flex items-center px-8 py-3 mt-8 text-white bg-indigo-600 border border-indigo-600 rounded-sm hover:bg-transparent hover:text-indigo-600 active:text-indigo-500 focus:outline-hidden focus:ring"
            href="/get-started"
            >
            <span class="text-sm font-medium"> ดูเพิ่มเติม </span>

            <svg
                class="w-5 h-5 ml-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
            </svg>
            </a>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <swiper
                :effect="'cube'"
                :grabCursor="true"
                :modules="modules"
                :cubeEffect="{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }"
                :pagination="true"
                :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }"
                class="mySwiper w-full h-full"
            >
                <swiper-slide v-for="(kb, key) in knowledges" :key="key">
                    <div class=" font-bold text-lg text-green-800">
                    <img :src="kb.cover" />
                    {{kb.desc}}
                    </div>
                </swiper-slide>
            </swiper>
            <!-- <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
                <a href="#" class="w-full block h-full">
                    <img alt="blog photo" src="storage/images/map.jpg" class="max-h-40 w-full object-cover"/>
                    <div class="bg-white dark:bg-gray-800 w-full p-4">
                        <p class="text-indigo-500 text-md font-medium">
                        </p>
                        <p class="text-gray-800 dark:text-white text-xl font-medium mb-2">
                            New Mac is here !
                        </p>
                        <p class="text-gray-400 dark:text-gray-300 font-light text-md">
                            The new supermac is here, 543 cv and 140 000$. This is best racing computer about 7 years on...
                        </p>
                    </div>
                </a>
            </div>
            <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
                <a href="#" class="w-full block h-full">
                    <img alt="blog photo" src="/images/blog/1.jpg" class="max-h-40 w-full object-cover"/>
                    <div class="bg-white dark:bg-gray-800 w-full p-4">
                        <p class="text-indigo-500 text-md font-medium">
                        </p>
                        <p class="text-gray-800 dark:text-white text-xl font-medium mb-2">
                            New Mac is here !
                        </p>
                        <p class="text-gray-400 dark:text-gray-300 font-light text-md">
                            The new supermac is here, 543 cv and 140 000$. This is best racing computer about 7 years on...
                        </p>
                    </div>
                </a>
            </div> -->
            <!-- <a
            class="block p-4 border border-gray-100 shadow-xs rounded-xl focus:outline-hidden focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
            href="/accountant"
            >
            <span class="inline-block p-3 rounded-lg bg-gray-50">
                <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
                </svg>
            </span>

            <h6 class="mt-2 font-bold">Accountant</h6>

            <p class="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                Lorem ipsum dolor sit amet consectetur.
            </p>
            </a>

            <a
            class="block p-4 border border-gray-100 shadow-xs rounded-xl focus:outline-hidden focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
            href="/accountant"
            >
            <span class="inline-block p-3 rounded-lg bg-gray-50">
                <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
                </svg>
            </span>

            <h6 class="mt-2 font-bold">Accountant</h6>

            <p class="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                Lorem ipsum dolor sit amet consectetur.
            </p>
            </a>

            <a
            class="block p-4 border border-gray-100 shadow-xs rounded-xl focus:outline-hidden focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
            href="/accountant"
            >
            <span class="inline-block p-3 rounded-lg bg-gray-50">
                <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
                </svg>
            </span>

            <h6 class="mt-2 font-bold">Accountant</h6>

            <p class="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                Lorem ipsum dolor sit amet consectetur.
            </p>
            </a>

            <a
            class="block p-4 border border-gray-100 shadow-xs rounded-xl focus:outline-hidden focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
            href="/accountant"
            >
            <span class="inline-block p-3 rounded-lg bg-gray-50">
                <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
                </svg>
            </span>

            <h6 class="mt-2 font-bold">Accountant</h6>

            <p class="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                Lorem ipsum dolor sit amet consectetur.
            </p>
            </a>

            <a
            class="block p-4 border border-gray-100 shadow-xs rounded-xl focus:outline-hidden focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
            href="/accountant"
            >
            <span class="inline-block p-3 rounded-lg bg-gray-50">
                <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
                </svg>
            </span>

            <h6 class="mt-2 font-bold">Accountant</h6>

            <p class="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                Lorem ipsum dolor sit amet consectetur.
            </p>
            </a>

            <a
            class="block p-4 border border-gray-100 shadow-sm rounded-xl focus:outline-hidden focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
            href="/accountant"
            >
            <span class="inline-block p-3 rounded-lg bg-gray-50">
                <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
                </svg>
            </span>

            <h6 class="mt-2 font-bold">Accountant</h6>

            <p class="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                Lorem ipsum dolor sit amet consectetur.
            </p>
            </a> -->
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { EffectCards, EffectCube, Pagination, Autoplay } from "swiper"
// Import Swiper styles
import 'swiper/css'
// import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
//import "swiper/css/effect-cards"
import "swiper/css/effect-cube"


const modules = ref([EffectCards, EffectCube, Pagination, Autoplay])
//const knowledges = ref([])
const knowledges = ref(
            [
                {"id": 1, "desc": "ชีวิตแค่โดนทำร้าย","cover": "storage/images/map.jpg","content":"1-11-2021-9.29.5_med_con_20211110.jpg"},
                {"id": 2, "desc": "อาคารสำหรับให้บริการผู้ป่วยของภาควิชาอายุรศาสตร์","cover": "storage/images/med_building.jpg","content":"6-10-2021-10.43.29_poster_promote.jpg"},
                {"id": 3, "desc": "กินยาถูกวิธี ชีวียืนยาว","cover": "storage/images/pharmacy-3087598_960_720.jpg","content":"25-10-2021-8.58.30_med_con_20211103.jpg"},
                {"id": 4, "desc": "หัวใจไม่ได้เสริมใยเหล็ก (ควรหมั่นดูแล)","cover": "storage/images/heartbeat-1892826_960_720.jpg","content":"17-6-2021-9.16.44_infec_book2.jpg"},
                // {"id": 5, "desc": "Product desc","cover": "1-11-2021-9.29.5_med_con_20211110.jpg","content":"1-11-2021-9.29.5_med_con_20211110.jpg"},
                // {"id": 6, "desc": "Product desc","cover": "6-10-2021-10.43.29_poster_promote.jpg","content":"6-10-2021-10.43.29_poster_promote.jpg"},
                // {"id": 7, "desc": "Product desc","cover": "25-10-2021-8.58.30_med_con_20211103.jpg","content":"25-10-2021-8.58.30_med_con_20211103.jpg"},
                // {"id": 8, "desc": "Product desc","cover": "17-6-2021-9.16.44_infec_book2.jpg","content":"17-6-2021-9.16.44_infec_book2.jpg"},
            ]
)
</script>

<style scoped>
#app { height: 100% }
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Sarabun, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 320px;
  height: 375px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  /* font-size: 22px;
  font-weight: bold;
  color: rgb(6, 94, 28); */
}

/* .swiper-slide:nth-child(1n) {
  background-color: rgb(206, 17, 17);
}

.swiper-slide:nth-child(2n) {
  background-color: rgb(0, 140, 255);
}

.swiper-slide:nth-child(3n) {
  background-color: rgb(10, 184, 111);
}

.swiper-slide:nth-child(4n) {
  background-color: rgb(211, 122, 7);
}

.swiper-slide:nth-child(5n) {
  background-color: rgb(118, 163, 12);
}

.swiper-slide:nth-child(6n) {
  background-color: rgb(180, 10, 47);
}

.swiper-slide:nth-child(7n) {
  background-color: rgb(35, 99, 19);
}

.swiper-slide:nth-child(8n) {
  background-color: rgb(0, 68, 255);
}

.swiper-slide:nth-child(9n) {
  background-color: rgb(218, 12, 218);
}

.swiper-slide:nth-child(10n) {
  background-color: rgb(54, 94, 77);
} */

</style>
