<template>
    <div class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div class="flex flex-col items-start">   
        <div class="text-2xl font-medium text-white title-font mb-2 p-3 bg-gradient-to-r from-green-800 to-green-600 rounded-md shadow-md flex flex-col md:flex-row gap-2 md:items-center md:justify-between  w-full">
          <div class="flex items-center">
            <PhotographIcon class="h-6 w-6" />
            <div class="flex items-center ml-2">รูปกิจกรรม</div>
          </div>
          <div class=" relative flex items-center text-gray-400 focus-within:text-gray-600">
            <SearchIcon 
              class="w-5 h-5 absolute ml-3 pointer-events-none"
            />
            <input
              v-model="search" 
              type="text"
              placeholder="ค้นหารูปกิจกรรม"
              autocomplete="off" 
              aria-label="Search Announce"
              class="pr-3 pl-10 w-full md:w-72 lg:w-96 rounded-2xl font-semibold placeholder-gray-500 text-black border-none ring-2 ring-gray-300 focus:ring-gray-500 focus-ring-2"
            >
          </div>
        </div>
        
        <Paginations 
          :pagination="galleries"
          class="mt-2 mb-4 self-center md:self-end"
        />

        <!-- <div v-for="gl in galleries.data" :key="gl.id">
            <div>{{ gl.id }}</div>
        </div> -->
  
        <div class="grid gap-8 lg:grid-cols-4 sm:max-w-sm sm:mx-auto lg:max-w-full">
            <div v-for="gl in galleries.data" :key="gl.id" class="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-lg">
                <div class="">
                    <Link
                        :href="route(`show_gallery`, gl.id)"
                    >
                        <img class="object-contain bg-gray-300 backdrop-blur-lg drop-shadow-lg border rounded-md w-full md:h-40" :src="gl.cover_url" alt="" />
                    </Link>
                </div>
                <div class="p-5 border border-b-0">
                <p class="mb-3 text-sm font-semibold tracking-wide uppercase">
                    <span class="text-gray-600 underline">{{ dayjs(gl.event_date).locale('th').format('D MMMM BBBB') }}</span>
                </p>
                <p class="mb-2 text-gray-700">
                    {{ gl.desc }}
                </p>
                <Link
                    :href="route(`show_gallery`, gl.id)"
                    class="inline-flex items-center font-semibold transition-colors duration-200 text-blue-500 hover:text-blue-700"
                >
                    คลิกเพื่อดูอัลบั้ม
                </Link>
                </div>
            </div>
        </div>
        
        <Paginations 
          :pagination="galleries"
          class="mt-4 self-center md:self-end"
        />

      </div>
    </div>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import { ref, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'
import GalleryInteractiveCardList from '@/Components/GalleryInteractiveCardList.vue'
import Paginations from '@/Components/Paginations.vue'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { SearchIcon, PhotographIcon } from '@heroicons/vue/outline';

const props = defineProps({
    galleries: { type: Object, default: {} },
    filters: { type: Object },
})

let search = ref(props.filters.search)

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('gallery_all_publish'), { search: value }, {
        preserveState: true,
        replace: true
    })
})

dayjs.extend(buddhistEra)

</script>