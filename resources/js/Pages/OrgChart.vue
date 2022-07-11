<template>
    <AppLayout>
        <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
            <div>
                <h4 class="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">โครงสร้างภาควิชา</h4>
                
            </div>
            <div class="mt-6 md:mt-0">
                <Link :href="route('index')">
                    <button class="mr-3 bg-gray-200 dark:bg-gray-700 focus:outline-none transition duration-150 ease-in-out rounded hover:bg-gray-300 text-indigo-700 dark:hover:bg-gray-600 dark:text-indigo-600 px-5 py-2 text-sm">กลับหน้าหลัก</button>
                </Link>
            </div>
        </div>
        <div class="flex flex-col justify-center container px-6 py-10 mx-auto">
            <!-- <img :src="`${baseUrl}/images/medicine_org_chart.jpg`" alt="" /> -->
            <img src="../../asset/images/medicine_org_chart.jpg" alt="" />
        </div>
    </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/inertia-vue3'

const baseUrl = ref(base_url)

</script>

<style>

</style>