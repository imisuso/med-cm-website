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
                    <a href="#" @click="$emit('delete-poster')" class="flex items-center text-sm hover:bg-gray-100 text-red-600 px-4 py-2">
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
            <div class="flex shrink-0 w-24 items-center justify-center">
                <svg v-if="! posterDetails.cover" class="shadow-lg rounded-md h-16 w-16 mb-1 mt-1 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <img v-else class="shadow-lg rounded-md h-20 w-16 mb-1 mt-1" :src="`${posterDetails.cover_url}`" :alt="posterDetails.desc"/>
            </div>
            <div class="flex flex-col w-full px-2 items-center sm:items-start">
                <h3 class="text-md text-indigo-500 font-bold mb-1">รายละเอียด:</h3>
                <span class="text-sm text-gray-500 break-words">{{ posterDetails.desc }}</span>
            </div>
            <div class="flex flex-row sm:flex-col w-full justify-center items-baseline px-1 sm:px-2 py-1 sm:py-0">
                <div class="px-1 place-self-center text-md text-indigo-500 font-bold">ไฟล์เนื้อหา:</div>
                <div class="text-sm text-gray-500 place-self-center">
                    <a :href="posterDetails.content_url" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div class="flex flex-row sm:flex-col w-full justify-center items-baseline px-1 sm:px-2 py-1 sm:py-0">
                <div class="px-1 place-self-center text-md text-indigo-500 font-bold">วันจัดเก็บ:</div>
                <div class="text-sm text-gray-500 place-self-center">{{ dayjs(posterDetails.created_at).locale('th').format('D/MM/BBBB H:mm') }}</div>
            </div>
            
            <div class="flex flex-row sm:flex-col w-full justify-center items-baseline px-1 sm:px-2 py-1 sm:py-0">
                <div class="px-1 place-self-center text-md text-indigo-500 font-bold">การแสดงผล:</div>
                <div class="text-sm text-gray-500 place-self-center">
                    <div class="flex flex-row items-baseline">
                        <div class="text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </div>
                        <ToggleSwitch v-model:status="posterDetails.status" @button-is-toggle="confirmModal = !confirmModal" />
                        <div class="text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
           
            <div class="hidden sm:block">
                <div class="px-4 pt-4 relative">
                    <button id="dropdownButton" @click="isDropDownOpen = !isDropDownOpen" class="block dropbtn text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-1.5">
                        <svg class="w-6 h-6 dropbtn" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path class="dropbtn" d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                        </svg>
                    </button>
                    
                    <!-- <div id="dropdown" :class="[isDropDownOpen ? '' : 'hidden']" class="absolute dropdown-content -left-28 -top-38 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44"> -->
                    <div id="dropdown" :class="[isDropDownOpen ? '' : 'hidden']" class="absolute dropdown-content -left-28 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44">
                        <ul class="py-1" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#" @click="$emit('delete-poster')" class="flex items-center text-sm hover:bg-gray-100 text-red-600 px-4 py-2">
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

    <!-- Modal สำหรับ confirm publish, unpublish  -->
    <teleport to="body">
    <Modal :isModalOpen="confirmModal" >
        <template v-slot:header>
            <div v-if="posterDetails.status" class="text-gray-900 text-xl font-medium dark:text-white">คุณต้องการ ปิด การแสดงผลโปสเตอร์</div>
            <div v-else class="text-gray-900 text-xl font-medium dark:text-white">คุณต้องการ เปิด การแสดงผลโปสเตอร์</div>
        </template>

        <template v-slot:body>
            <div class="flex flex-row justify-start items-center">
                <img class="shadow-lg rounded-md h-20 w-16 mb-1 mt-1 mr-4" :src="`${posterDetails.cover_url}`" alt=""/>
                <div class="text-gray-900 text-md font-medium dark:text-white truncate">
                    {{ posterDetails.desc }} 
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <button @click="switchButtonToggle(posterDetails)" type="button" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                ตกลง
            </button>
            <button @click="confirmModal = false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">ยกเลิก</button>
        </template>
    </Modal>
    </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import ToggleSwitch from '@/Components/ToggleSwitch.vue'
import Modal from '@/Components/Modal.vue'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    posterDetails: { type: Object, required: true, default: {} },
})

const emit = defineEmits(['delete-poster'])

onMounted(() => {
    window.addEventListener('click', closeDropdownWhenClickOutSide)
})

onUnmounted(() => {
    window.removeEventListener('click', closeDropdownWhenClickOutSide)
})

dayjs.extend(buddhistEra)
const baseUrl = ref(base_url)
const isDropDownOpen = ref(false)
const confirmModal = ref(false)

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

const switchButtonToggle = (poster) => {
    Inertia.patch(route('admin.poster.update_display_status', poster.id), {}, {
        onSuccess: () => {
            poster.status = ! poster.status
            toast('success', 'สำเร็จ', 'เปลี่ยนสถานะการแสดงผลบนหน้า website เรียบร้อย')
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            confirmModal.value = false
        }
    })
}

</script>

<style>

</style>