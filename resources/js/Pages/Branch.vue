<template>
<!--  <AppLayout>-->
    <div class="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-4 lg:px-4 lg:py-12">
      <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span class="relative inline-block">
            <svg viewBox="0 0 52 24" fill="currentColor" class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
              <defs>
                <pattern id="247432cb-6e6c-4bec-9766-564ed7c230dc" x="0" y="0" width=".135" height=".30">
                  <circle cx="1" cy="1" r=".7"></circle>
                </pattern>
              </defs>
              <rect fill="url(#247432cb-6e6c-4bec-9766-564ed7c230dc)" width="52" height="24"></rect>
            </svg>
          </span>
          <div class="mt-2">สาขาวิชา</div>
        </h2>
      </div>
      <div class="grid gap-4 row-gap-8 mx-auto sm:row-gap-8 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3 ">
        <div class="flex space-x-4 items-center" v-for="branch in branchs" :key="branch.division_id" >
          <!-- <Link :href="route('branch_details')" method="post" :data="{ branch_id: branch.division_id }"><img class="object-cover w-20 h-20 mr-4 rounded-full shadow-sm" :src="`${baseUrl}/storage/${branch.image}`" /></Link> -->
          <!-- <Link :href="route('branch_details', branch.division_id)"><img class="object-cover w-20 h-20 mr-4 rounded-full shadow-sm" :src="`${baseUrl}/storage/${branch.image}`" /></Link> -->
          <Link class="shrink-0" :href="route('branch_details', branch.slug)"><img class="object-cover w-20 h-20 rounded-full shadow-sm shrink-0" :src="`${branch.image_url}`" /></Link>
          <div class="flex flex-col">
            <Link :href="route('branch_details', branch.slug)">
              <p class="text-lg font-bold">{{branch.name_th}}</p>
              <p class="text-sm text-gray-800">{{branch.name_en}}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
<!--  </AppLayout>-->
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import { ref, onMounted, } from 'vue';
import { Link } from '@inertiajs/vue3'
import DivisionService from '@/Services/DivisionService';

onMounted(() => {
  divisionService.value.listBranchOnly().then(data => {
    branchs.value = data
  });
})

const divisionService = ref(new DivisionService())
const branchs = ref([])
const baseUrl = ref(base_url)

</script>

<style>

</style>
