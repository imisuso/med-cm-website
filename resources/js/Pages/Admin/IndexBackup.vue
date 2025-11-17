<template>
<!--    <AdminAppLayout>-->
    <div class="text-2xl mt-4 mb-4">แดชบอร์ด</div>
<!--    <Bar :chart-data="chartData"-->
<!--         :chart-options="chartOptions"-->
<!--    />-->

    <div class="grid grid-cols-12 p-2 space-y-2 md:space-y-0 space-x-0 md:space-x-2 mb-4">
        <div class=" col-span-12 md:col-span-4 border border-gray-200 rounded-md shadow-md p-4">
            <div class="flex items-start justify-between">
                <div class="flex flex-col">
                    <div class=" text-gray-500 font-medium">ผู้เข้าชมเว็บไซต์ทั้งหมด</div>
<!--                    <div class=" text-xl">{{ totalVisitor.toLocaleString() }}</div>-->
                    <div class=" text-xl">{{ total_visitor.toLocaleString() }}</div>
                    <!-- <div>yyyyy</div> -->
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
                    <!-- <div>yyyyy</div> -->
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
                    <!-- <div>yyyyy</div> -->
                </div>
                <span>
                    <PresentationChartLineIcon class="flex items-center w-10 h-10 border rounded-full bg-yellow-500 text-white p-2"/>
                    <!-- <div class="flex items-center w-10 h-10 border rounded-full bg-yellow-500 px-1">xxxx</div> -->
                </span>
            </div>
        </div>

    </div>

<!--    <div class="mb-4 h-1/4">-->
<!--    <Line-->
<!--        v-if="$page.props.auth.abilities.includes('view_all_content')"-->
<!--        :data="chartData"-->
<!--        :options="chartOptions"-->
<!--    />-->
<!--    </div>-->

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
<!--            <div class="flex items-center space-x-2 text-sm">-->
<!--                <div class="w-1/3 sm:w-2/3 font-semibold">BOUNCE RATE : </div>-->
<!--                <div class="text-sm text-gray-700">1%</div>-->
<!--            </div>-->
        </div>
    </div>
<!--    </AdminAppLayout>-->
</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
    export default {
        layout: AdminAppLayout,
    }
</script>

<script setup>
import {onMounted, ref} from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
        LineElement, PointElement
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'
import { ChartSquareBarIcon, SpeakerphoneIcon, PresentationChartLineIcon } from "@heroicons/vue/outline"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

// onMounted(() => {
//     fillChartData()
// })

const props = defineProps({
    total_visitor: { type: Number, default: 0 },
    branch_visitor: { type: Number, default: 0 },
    total_announce: { type: Number, default: 0 },
    total_poster: { type: Number, default: 0 }
})

const chartData = ref({
    datasets: []
})

const fillChartData = () => {
    const updatedChartData = {
        labels: [
            'มกราคม',
            'กุมภาพันธ์',
            'มีนาคม',
            'เมษายน',
            'พฤษภาคม',
            'มิถุนายน',
            'กรกฎาคม',
            'สิงหาคม',
            'กันยายน',
            'ตุลาคม',
            'พฤศจิกายน',
            'ธันวาคม'
        ],
        datasets: [
            {
                label: 'หน้าแรก',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            },
            {
                label: 'หน้าสาขาวิชา',
                backgroundColor: '#1d4ed8',
                data: [20, 70, 17, 39, 10, 45, 30, 10, 30, 20, 10, 12]
            },
        ]
    }

    chartData.value = { ...updatedChartData }
}

// const chartData = {
//         labels: [
//             'January',
//             'February',
//             'March',
//             'April',
//             'May',
//             'June',
//             'July',
//             'August',
//             'September',
//             'October',
//             'November',
//             'December'
//         ],
//         datasets: [
//             {
//                 label: 'ผู้เยี่ยมชม website',
//                 backgroundColor: '#f87979',
//                 data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
//             },
//             {
//                 label: 'หน้าสาขาวิชา',
//                 backgroundColor: '#1d4ed8',
//                 data: [20, 70, 17, 39, 10, 45, 30, 10, 30, 20, 10, 12]
//             },
//         ]
// }

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
}

const totalVisitor = ref(350897)
const totalAnounce = ref(2356)
const totalPoster = ref(924)

</script>

<style>

</style>
