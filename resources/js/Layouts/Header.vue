<template>
  <div class="relative">
    <!-- <img :src="`${baseUrl}/storage/images/header_simed13.jpg`" class="object-scale-down md:object-cover w-full h-full" alt="" /> -->
    <div class="flex items-start">
      <img src="../../asset/images/mu_logo.jpg" class="object-fill md:object-cover w-36 h-36" alt="" />
      <div class="ml-2">
        <div v-if="$page.props.locale === 'th'" class=" text-5xl mt-2 text-blue-900 font-['DBLim']">มหาวิทยาลัยมหิดล</div>
        <div v-if="$page.props.locale === 'th'" class="text-4xl text-blue-900 font-['DBLim']">คณะแพทยศาสตร์ศิริราชพยาบาล</div>
        <div v-if="$page.props.locale === 'th'" class="text-3xl text-blue-900 font-['DBLim']">ภาควิชาอายุรศาสตร์</div>

        <div v-if="$page.props.locale === 'en'" class=" text-5xl mt-2 text-blue-900 font-['DBLim']">Mahidol University</div>
        <div v-if="$page.props.locale === 'en'" class="text-4xl text-blue-900 font-['DBLim']">Faculty of Medicine Siriraj Hospital</div>
        <div v-if="$page.props.locale === 'en'" class="text-3xl text-blue-900 font-['DBLim']">Department of Medicine</div>
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
