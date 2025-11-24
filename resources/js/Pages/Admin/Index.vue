<template>
    <div class="text-2xl mt-4 mb-4">แดชบอร์ด</div>

    <div class="grid grid-cols-12 p-2 space-y-2 md:space-y-0 space-x-0 md:space-x-2 mb-4">
        <div class=" col-span-12 md:col-span-4 border border-gray-200 rounded-md shadow-md p-4">
            <div class="flex items-start justify-between">
                <div class="flex flex-col">
                    <div class=" text-gray-500 font-medium">ผู้เข้าชมเว็บไซต์ทั้งหมด</div>
<!--                    <div class=" text-xl">{{ totalVisitor.toLocaleString() }}</div>-->
                    <div class=" text-xl">{{ total_visitor.toLocaleString() }}</div>
                </div>
                <span>
                    <ChartSquareBarIcon class="flex items-center w-10 h-10 border rounded-full bg-red-500 text-white p-2" />
                    <!-- <div class="flex items-center w-10 h-10 border rounded-full bg-red-500 px-1">ChartBarSquareIcon.js</div> -->
                </span>
            </div>
        </div>

        <div class=" col-span-12 md:col-span-4 border border-gray-200 rounded-md shadow-md p-4">
            <div class="flex items-start justify-between">
                <div class="flex flex-col">
                    <div class=" text-gray-500 font-medium">ข่าวประกาศ</div>
<!--                    <div class=" text-xl">{{ totalAnounce.toLocaleString() }}</div>-->
                    <div class=" text-xl">{{ total_announce.toLocaleString() }}</div>
                </div>
                <span>
                    <SpeakerphoneIcon class="flex items-center w-10 h-10 border rounded-full bg-blue-500 text-white p-2" />
                    <!-- <div class="flex items-center w-10 h-10 border rounded-full bg-blue-500 px-1">xxxx</div> -->
                </span>
            </div>
        </div>

        <div class=" col-span-12 md:col-span-4 border border-gray-200 rounded-md shadow-md p-4">
            <div class="flex items-start justify-between">
                <div class="flex flex-col">
                    <div class=" text-gray-500 font-medium">โปสเตอร์</div>
<!--                    <div class=" text-xl">{{ totalPoster.toLocaleString() }}</div>-->
                    <div class=" text-xl">{{ total_poster.toLocaleString() }}</div>
                </div>
                <span>
                    <PresentationChartLineIcon class="flex items-center w-10 h-10 border rounded-full bg-yellow-500 text-white p-2"/>
                    <!-- <div class="flex items-center w-10 h-10 border rounded-full bg-yellow-500 px-1">xxxx</div> -->
                </span>
            </div>
        </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow border border-gray-200 mb-8">
        <h3 class="font-semibold text-lg mb-4">สถิติผู้เข้าชมเว็บไซต์ย้อนหลัง 12 เดือน</h3>

        <apexchart
            width="100%"
            height="350"
            type="area"
            :options="chartOptions"
            :series="series"
        ></apexchart>

    </div>

    <!-- <div class="grid grid-cols-3 shadow-md rounded-md">
        <div class=" bg-cyan-400 border-b rounded-t-md col-span-3 mb-1 p-4">Page Visits</div>
        <div class=" hidden md:block px-4 text-sm text-gray-500">PAGE NAME</div>
        <div class=" hidden md:block px-4 text-sm text-gray-500">VISITORS</div>
        <div class=" hidden md:block px-4 text-sm text-gray-500">BOUNCE RATE</div>

        <div class=" border-gray-200 hidden md:block px-4">index</div>
        <div class=" border-gray-200 hidden md:block px-4">{{ totalVisitor.toLocaleString() }}</div>
        <div class=" border-gray-200 hidden md:block px-4"> Other</div>
    </div> -->

    <div class="p-4 border border-gray-200 rounded-md shadow-md text-2xl font-semibold bg-green-100">ผู้เข้าชมแยกตามหน้าเว็บไซต์</div>
    <div class=" overflow-auto rounded-lg shadow-sm hidden md:block mb-4">
        <table class="w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-200 ">
                <tr>
                    <th class="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">หน้าเว็บไซต์</th>
                    <th class=" w-3/4 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">#จำนวนผู้เข้าชม</th>
<!--                    <th class=" w-1/4 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">BOUNCE RATE</th>-->
                </tr>
            </thead>
            <tbody class=" divide-y divide-gray-100">
<!--                <tr class="bg-white">-->
<!--                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap ">index</td>-->
<!--                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap ">{{ totalVisitor.toLocaleString() }}</td>-->
<!--                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap ">10%</td>-->
<!--                </tr>-->
                <tr class="bg-gray-50">
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap ">หน้าสาขา</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap ">{{ branch_visitor.toLocaleString() }}</td>
<!--                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap ">1%</td>-->
                </tr>
            </tbody>
        </table>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:hidden mb-4">
<!--        <div class=" bg-white border space-y-3 p-4 rounded-lg shadow-md">-->
<!--            <div class="flex items-center space-x-2 text-sm">-->
<!--                <div class="w-1/3 sm:w-2/3 font-semibold">หน้าเว็บไซต์ : </div>-->
<!--                <div class="text-sm text-gray-700">index</div>-->
<!--            </div>-->
<!--            <div class="flex items-center space-x-2 text-sm">-->
<!--                <div class="w-1/3 sm:w-2/3 font-semibold">#จำนวนผู้เข้าชม : </div>-->
<!--                <div class="text-sm text-gray-700">{{ totalVisitor.toLocaleString() }}</div>-->
<!--            </div>-->
<!--            <div class="flex items-center space-x-2 text-sm">-->
<!--                <div class="w-1/3 sm:w-2/3 font-semibold">BOUNCE RATE : </div>-->
<!--                <div class="text-sm text-gray-700">10%</div>-->
<!--            </div>-->
<!--        </div>-->
        <div class=" bg-white border space-y-3 p-4 rounded-lg shadow-md">
            <div class="flex items-center space-x-2 text-sm">
                <div class="w-1/3 sm:w-2/3 font-semibold">หน้าเว็บไซต์ : </div>
                <div class="text-sm text-gray-700">หน้าสาขา</div>
            </div>
            <div class="flex items-center space-x-2 text-sm">
                <div class="w-1/3 sm:w-2/3 font-semibold">#จำนวนผู้เข้าชม : </div>
                <div class="text-sm text-gray-700">{{ branch_visitor.toLocaleString() }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
    export default {
        layout: AdminAppLayout,
    }
</script>

<script setup>
import {computed, onMounted, ref} from "vue";
import VueApexCharts from "vue3-apexcharts";
import { ChartSquareBarIcon, SpeakerphoneIcon, PresentationChartLineIcon } from "@heroicons/vue/outline"

const props = defineProps({
    total_visitor: { type: Number, default: 0 },
    branch_visitor: { type: Number, default: 0 },
    total_announce: { type: Number, default: 0 },
    total_poster: { type: Number, default: 0 },
    total_visitor_stat: Object,
})

// ลงทะเบียน Component
const apexchart = VueApexCharts;

// 1. ข้อมูล Series (แกน Y)
const series = computed(() => {
    return [{
        name: "จำนวนผู้เข้าชม",
        data: props.total_visitor_stat.chartData.series // [10, 20, 5, ...]
    }];
});

// 2. ตั้งค่ากราฟ (Options)
const chartOptions = computed(() => {
    return {
        chart: {
            id: "basic-bar",
            toolbar: { show: false } // ซ่อนเมนู Download มุมขวา
        },
        xaxis: {
            categories: props.total_visitor_stat.chartData.categories // ['Jan', 'Feb', ...]
        },
        colors: ['#3b82f6'], // สีฟ้า Tailwind (blue-500)
        dataLabels: { enabled: false }, // ไม่ต้องโชว์ตัวเลขบนเส้น
        stroke: { curve: 'smooth' }, // เส้นโค้งสวยๆ
        fill: {
            type: 'gradient', // ไล่เฉดสีพื้นหลัง
        }
    };
});

const totalVisitor = ref(350897)
const totalAnounce = ref(2356)
const totalPoster = ref(924)

</script>

<style>

</style>
