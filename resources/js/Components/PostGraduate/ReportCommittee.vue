<template>
    <div class="container px-5 py-8 mx-auto">
        <div class="flex justify-center mb-2">
            <div class="w-full overflow-hidden rounded-lg shadow-sm sm:w-auto sm:mx-2">
                <div class="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white transition-colors duration-150 transform bg-gradient-to-r from-green-700 to-green-900 hover:from-green-600 hover:to-green-600 sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2 fill-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span class="mx-2 text-2xl">
                        รายงานการประชุมคณะกรรมการติดตามและประเมินผลโครงการฝึกอบรมแพทย์ประจำบ้าน
                    </span>
                </div>
                <ul class="flex flex-col p-4 mx-auto space-y-8 sm:p-10 text-xl list-outside list-disc">
                    <a href="../../../../images/post_graduate/report/8-02-2567.pdf" target="_blank" class="py-1 outline-hidden cursor-pointer text-lg md:text-xl"><li> 8 กุมภาพันธ์ 2567 </li></a>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const baseUrl = ref(base_url)
</script>

<style>

</style>
