<template>
    <div class="container px-5 py-8 mx-auto">
        <div class="flex justify-center mb-4">
            <div class="inline-flex w-full overflow-hidden rounded-lg shadow-sm sm:w-auto sm:mx-2">
                <div class="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white transition-colors duration-150 transform bg-gradient-to-r from-green-700 to-green-900 hover:from-green-600 hover:to-green-600 sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2 fill-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span class="mx-2 text-2xl">
                        เจ้าหน้าที่ฝ่ายการศึกษาหลังปริญญา
                    </span>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
<!--				<div class="flex flex-col justify-center m-4 text-center">-->
<!--					<img alt="" class="self-center shrink-0 w-20 h-20 mb-4 bg-center object-cover object-top rounded-full" src="../../../asset/images/post_graduate/officer/1.jpg">-->
<!--					<p class="text-xl font-semibold leading-tight">นางเรวดี พีรวัฒนฒึก</p>-->
<!--					<p class="text-md text-gray-600 italic">เจ้าหน้าที่บริหารงานทั่วไป ชำนาญการ</p>-->
<!--				</div>-->
				<div class="flex flex-col justify-center m-4 text-center">
					<img alt="" class="self-center shrink-0 w-20 h-20 mb-4 bg-center object-cover object-top rounded-full" src="../../../asset/images/post_graduate/officer/2.jpg">
					<p class="text-xl font-semibold leading-tight">นางสาวสุภาพร สุรัตน์</p>
					<p class="text-md text-gray-600 italic">นักวิชาการศึกษา</p>
				</div>
				<div class="flex flex-col justify-center m-4 text-center">
					<img alt="" class="self-center shrink-0 w-20 h-20 mb-4 bg-center object-cover object-top rounded-full" src="../../../asset/images/post_graduate/officer/3.jpg">
					<p class="text-xl font-semibold leading-tight">นางสาววันวิสาข์ สุวรรณเสาร์</p>
					<p class="text-md text-gray-600 italic">นักวิชาการศึกษา</p>
				</div>
				<div class="flex flex-col justify-center m-4 text-center">
					<img alt="" class="self-center shrink-0 w-20 h-20 mb-4 bg-center object-cover object-top rounded-full" src="../../../asset/images/post_graduate/officer/4.jpg">
					<p class="text-xl font-semibold leading-tight">นางสาวสุภาภรณ์ จุลเศียร</p>
					<p class="text-md text-gray-600 italic">นักวิชาการศึกษา</p>
				</div>
                <div class="flex flex-col justify-center m-4 text-center">
                    <img alt="" class="self-center shrink-0 w-20 h-20 mb-4 bg-center object-cover object-top rounded-full" src="../../../asset/images/post_graduate/officer/7.jpg">
                    <p class="text-xl font-semibold leading-tight">นางสาวอรนิตย์ ศรีพรหม</p>
                    <p class="text-md text-gray-600 italic">นักวิชาการศึกษา</p>
                </div>
				<div class="flex flex-col justify-center m-4 text-center">
					<img alt="" class="self-center shrink-0 w-20 h-20 mb-4 bg-center object-cover object-top rounded-full" src="../../../asset/images/post_graduate/officer/5.jpg">
					<p class="text-xl font-semibold leading-tight">นางสาวเพ็ญศิริ สีดีจริง</p>
					<p class="text-md text-gray-600 italic">พนักงานธุรการ</p>
				</div>
				<div class="flex flex-col justify-center m-4 text-center">
					<img alt="" class="self-center shrink-0 w-20 h-20 mb-4 bg-center object-cover object-top rounded-full" src="../../../asset/images/post_graduate/officer/6.jpg">
					<p class="text-xl font-semibold leading-tight">นางสาวนภัสวรรณ สุขแสง</p>
					<p class="text-md text-gray-600 italic">พนักงานบริการทั่วไป</p>
				</div>
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
