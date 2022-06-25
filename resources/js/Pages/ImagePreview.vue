<template>
  <div class="mt-20 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <img class="object-fit w-full h-full" :src="`${baseUrl}/images/map.jpg`" alt="map">
    
    <!-- <div class="py-5 text-center">
        <a href="#" class="block text-2xl font-bold text-gray-800 dark:text-white">John Doe</a>
        <span class="text-sm text-gray-700 dark:text-gray-200">Software Engineer</span>
    </div> -->
</div>
</template>

<script setup>
import { ref } from 'vue'

const baseUrl = ref(base_url)

</script>

<style>

</style>