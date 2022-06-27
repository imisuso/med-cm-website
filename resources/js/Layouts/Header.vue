<template>
  <div class="relative">
    <!-- <img :src="`${baseUrl}/storage/images/header_simed13.jpg`" class="object-scale-down md:object-cover w-full h-full" alt="" /> -->
    <div class="flex items-start">
      <img :src="`${baseUrl}/images/mu_logo.jpg`" class="object-fill md:object-cover w-36 h-36" alt="" />
      <div class="ml-2">
        <div class=" text-5xl mt-2 text-blue-900 font-banner">มหาวิทยาลัยมหิดล</div>
        <div class="text-4xl text-blue-900 font-banner">คณะแพทยศาสตร์ศิริราชพยาบาล</div>
        <div class="text-3xl text-blue-900 font-banner">ภาควิชาอายุรศาสตร์</div>
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