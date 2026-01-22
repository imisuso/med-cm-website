<template>
    <div class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-(--breakpoint-xl) md:px-24 lg:px-8">
        <div class="flex items-end justify-center mb-16">
            <div class="flex mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl px-2">
                {{ $t('COVID-19 Service') }}
            </div>
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
            <a
                v-for="(item, index) in items"
                :key="index"
                :href="item.link"
                target="_blank"
                class="group relative flex flex-col justify-between h-full p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200"
            >
                <div class="flex items-start justify-between mb-4">
                    <div
                        class="flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300"
                        :class="item.type === 'video' ? 'bg-red-50 text-red-500 group-hover:bg-red-100' : 'bg-teal-50 text-teal-600 group-hover:bg-teal-100'"
                    >
                        <svg v-if="item.type === 'video'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>

                    <span
                        class="px-3 py-1 text-xs font-medium rounded-full"
                        :class="item.type === 'video' ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-700'"
                    >
            {{ item.type === 'video' ? 'Video' : 'Document' }}
          </span>
                </div>

                <div>
                    <h3 class="mb-2 text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {{ item.title }}
                    </h3>
                    <p class="text-sm text-slate-500 leading-relaxed">
                        {{ item.desc }}
                    </p>
                </div>

                <div class="mt-4 flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-300 transform transition-transform group-hover:translate-x-1 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </a>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// ข้อมูลจำลอง (นำ Link เดิมมาใส่)
const items = ref([
    {
        title: "Survival Guide",
        desc: "แนวทางการดูแลผู้ป่วย COVID-19 ฉบับเข้าใจง่าย",
        link: "https://med-cm-website.s3.ap-southeast-1.amazonaws.com/public/resource-files/html/covid_survival_guide.html",
        type: "document"
    },
    {
        title: "สาระดีศิริราช ตอนที่ 1",
        desc: "อุปกรณ์ป้องกันบุคลากรทางการแพทย์ Airborne / Droplet + Contact PPE set",
        link: "https://www.facebook.com/watch/?v=232398127871009",
        type: "video"
    },
    {
        title: "สาระดีศิริราช ตอนที่ 2",
        desc: "อุปกรณ์ป้องกันบุคลากรทางการแพทย์ Maximal PPE Set 1 (ชุด Cover All)",
        link: "https://www.facebook.com/watch/?v=658939604917989",
        type: "video"
    },
    {
        title: "สาระดีศิริราช ตอนที่ 3",
        desc: "อุปกรณ์ป้องกันบุคลากรทางการแพทย์ Maximal PPE Set 2 (ชุดเสื้อกาวน์แยกชิ้น)",
        link: "https://www.facebook.com/watch/?v=232588717858238",
        type: "video"
    },
]);
</script>
