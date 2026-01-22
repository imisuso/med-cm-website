<template>
    <div class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-(--breakpoint-xl) md:px-24 lg:px-8">
        <div class="flex items-end justify-center mb-16">
            <div class="flex mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl px-2">
                {{ $t('ข่าวประชาสัมพันธ์') }}
            </div>
        </div>
        <div v-if="announcements.length === 0" class="space-y-4 animate-pulse">
            <div v-for="n in 3" :key="n" class="flex items-center space-x-4 p-4 border-b border-slate-100">
                <div class="h-12 w-12 bg-slate-200 rounded-lg"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div class="h-3 bg-slate-200 rounded w-1/4"></div>
                </div>
            </div>
        </div>

        <div v-else class="space-y-4">
            <div
                v-for="item in announcements"
                :key="item.id"
                class="group relative flex items-start gap-4 p-4 rounded-2xl bg-white border border-transparent transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-sm"
            >
                <div class="hidden sm:flex flex-col items-center justify-center w-16 h-16 shrink-0 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-md transition-all duration-300 border border-slate-200">
                    <span class="text-xl font-bold leading-none">
                        {{ getDay(item.publish_date) }}
                    </span>
                    <span class="text-[14px] font-medium uppercase mt-1">
                        {{ getMonth(item.publish_date) }}
                    </span>
                </div>

                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        <span v-if="item.pinned" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                            {{ $t('ปักหมุด') }}
                        </span>

                        <span class="sm:hidden text-xs text-slate-400">
                             {{ formatDateFull(item.publish_date) }}
                        </span>
                    </div>

                    <a :href="route(`announce_details`, item.slug)" target="_blank" class="block">
                        <h3 class="text-base font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            {{ item.topic }}
                        </h3>
                    </a>

                    <p class="mt-1 text-xs text-slate-400 font-light flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ getTime(item.publish_date) }}
                    </p>
                </div>

                <div class="hidden sm:block text-slate-300 group-hover:text-blue-400 transition-colors pt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>

        <div v-show="announcement_all > limit" class="mt-8 text-center">
            <Link
                :href="route(`announce_all_publish`)"
                class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
            >
                {{ $t('ดูข่าวประชาสัมพันธ์ทั้งหมด') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

// API Service
import AnnounceService from '@/Services/AnnounceService'

// Setup DayJS
dayjs.extend(buddhistEra)
dayjs.locale('th')

const props = defineProps({
    limit: { type: Number },
    announcement_all: { type: Number, default: 0 }
})

const announceService = ref(new AnnounceService())
const announcements = ref([])

// --- Helper Functions for Date Formatting ---
const getDay = (date) => dayjs(date).format('D')
const getMonth = (date) => dayjs(date).format('MMM BB') // เดือนย่อ + ปีพ.ศ. ย่อ
const getTime = (date) => dayjs(date).format('H:mm น.')
const formatDateFull = (date) => dayjs(date).format('D MMM BB')

onMounted(() => {
    // เรียกข้อมูลจาก API
    announceService.value.listShow(props.limit).then(data => {
        announcements.value = data
    });
})
</script>

<style scoped>
/* CSS Line Clamp สำหรับตัดคำถ้าหัวข้อยาวเกิน 2 บรรทัด */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
