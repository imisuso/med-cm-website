<template>
    <div class=" bg-gradient-to-l from-sky-100 shadow-md border-2 border-gray-200 rounded-lg flex flex-col w-full space-y-1 mt-2">
        <div class="block sm:hidden px-4 pt-4 relative">
            <button id="dropdownButton" @click="isDropDownOpen = !isDropDownOpen" class="block dropbtn text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-1.5">
                <svg class="w-6 h-6 dropbtn" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path class="dropbtn" d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
            </button>
            
            <div id="dropdown" :class="[isDropDownOpen ? '' : 'hidden']" class="absolute dropdown-content left-0 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44">
                <ul class="py-1" aria-labelledby="dropdownButton">
                    <li>
                        <Link :href="route('admin.download.edit', downloadItem.id)" class="flex items-center text-sm hover:bg-gray-100 text-yellow-500 px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            แก้ไข
                        </Link>
                    </li>
                    <li>
                        <a href="#" @click="deleteItem(downloadItem)" class="flex items-center text-sm hover:bg-gray-100 text-red-600 px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            ลบ
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center w-full px-2 bg-gradient-to-l from-sky-100">
            <div class="flex shrink-0 w-8 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" v-if="downloadItem.status" class="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" v-else class="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
            </div>
         
            <div class="flex flex-col w-full px-2 space-y-1 items-start">
                    <div class="flex flex-row">
                        <div class="mr-1 shrink-0">{{ index }} :</div> 
                        <div class="text-ellipsis overflow-hidden">{{ downloadItem.title }}</div>
                    </div>
                    <div class="hidden md:block ml-5 text-xs text-gray-900 break-all"><a :href="downloadItem.link" target="_blank" class="hover:underline">{{ downloadItem.link }}</a></div>
                    <div class="ml-5 text-xs text-gray-900">เลขลำดับ : {{ downloadItem.order_number }}</div>  
            </div>
           
            <div class="hidden sm:block">
                <div class="px-4 pt-4 relative">
                    <button id="dropdownButton" @click="isDropDownOpen = !isDropDownOpen" class="block dropbtn text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-1.5">
                        <svg class="w-6 h-6 dropbtn" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path class="dropbtn" d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                        </svg>
                    </button>
                    
                    <div id="dropdown" :class="[isDropDownOpen ? '' : 'hidden']" class="absolute dropdown-content -left-28 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44">
                        <ul class="py-1" aria-labelledby="dropdownButton">
                            <li>
                                <Link :href="route('admin.download.edit', downloadItem.id)" class="flex items-center text-sm hover:bg-gray-100 text-yellow-500 px-4 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    แก้ไข
                                </Link>
                            </li>
                            <li>
                                <a href="#" @click="deleteItem(downloadItem)" class="flex items-center text-sm hover:bg-gray-100 text-red-600 px-4 py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    ลบ
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>  
           
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    downloadItem: { type: Object, required: true, default: {} },
    index: { type: Number, required: true, default: 1 }
})

const emit = defineEmits(['edit-gallery', 'delete-gallery'])

onMounted(() => {
    window.addEventListener('click', closeDropdownWhenClickOutSide)
})

onUnmounted(() => {
    window.removeEventListener('click', closeDropdownWhenClickOutSide)
})

dayjs.extend(buddhistEra)
const baseUrl = ref(base_url)
const isDropDownOpen = ref(false)

const toggleDropDown = () => {
    isDropDownOpen.value = !isDropDownOpen.value
}

const closeDropdownWhenClickOutSide = (event) => {
    if (!event.target.matches('.dropbtn')) {
        if( isDropDownOpen.value ) {
            isDropDownOpen.value = false
        }
    }
  
}

const toast = (severity, summary, detail) => {
    createToast({
      title: summary,
      description: detail
    },
    {
      showIcon: true,
      transition: 'zoom',  // Can bounce, zoom, slide
      position: 'top-right', // Can top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
      type: severity,    // Can default, info, warning, success, danger
      timeout: 3000,
      //toastBackgroundColor: bg_color,
    })
}

const deleteItem = ( item ) => {
    Inertia.delete(route('admin.download.delete', item.id), {
        onBefore: () => { return confirm('คุณต้องการลบรายการนี้ ใช่ หรือ ไม่ ?') },
        onSuccess: () => { toast('success', 'สำเร็จ', 'ลบข้อมูลดาวน์โหลด เรียบร้อย') },
        onError: (errors) => { console.log(errors) },
        onFinish: () => {}
    });
}

</script>

<style>

</style>