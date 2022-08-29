<template>
<!--    <AdminAppLayout>-->
    <div> Hello Admin</div>
<!--    <Bar :chart-data="chartData"-->
<!--         :chart-options="chartOptions"-->
<!--    />-->

    <Line :chart-data="chartData"
         :chart-options="chartOptions"
    />
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
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
        LineElement, PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

onMounted(() => {
    fillChartData()
})

const chartData = ref({
    datasets: []
})

const fillChartData = () => {
    const updatedChartData = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
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

</script>

<style>

</style>
