<template>
<!--    <AppLayout>-->
        <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
            <div>
                <h4 class="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-800">โครงสร้างภาควิชา</h4>

            </div>
            <div class="mt-6 md:mt-0">
                <Link :href="route('index')">
                    <button class="mr-3 bg-gray-200 text-indigo-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus:outline-hidden transition duration-150 ease-in-out rounded-sm px-5 py-2 text-sm">กลับหน้าหลัก</button>
                </Link>
            </div>
        </div>
        <div class="flex flex-col justify-center container px-6 py-10 mx-auto">
            <!-- <img :src="`${baseUrl}/images/medicine_org_chart.jpg`" alt="" /> -->
            <img src="../../asset/images/medicine_org_chart.jpg" alt="" />
        </div>
<!--    </AppLayout>-->
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3'

const baseUrl = ref(base_url)

</script>

<style>

</style>
