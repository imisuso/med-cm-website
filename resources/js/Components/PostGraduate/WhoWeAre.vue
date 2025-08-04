<template>
	<div class="container flex flex-col items-center px-4 md:px-8 py-12 mx-auto xl:flex-row">
		<div class="flex justify-center xl:w-1/3 shrink-0">
			<img class="h-72 w-72 sm:w-[24rem] sm:h-[24rem] shrink-0 object-cover rounded-full" src="../../../asset/images/post_graduate/vision.jpg" alt="">
		</div>

		<div class="flex flex-col items-center mt-6 xl:items-start w-full xl:mt-0 px-8">
			<h2 class="text-3xl font-bold tracking-tight text-gray-800 xl:text-4xl text-center">
				การศึกษาระดับหลังปริญญา <br class="block md:hidden" /> (Post-Graduate)
			</h2>

			<p class="block max-w-2xl mt-4 text-center text-xl text-gray-500 ">" เชี่ยวชาญศาสตร์สรรพ์ ยึดมั่นคุณธรรม ชี้นำสังคม "</p>

		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const baseUrl = ref(base_url)
</script>
