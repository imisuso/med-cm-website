<template>
    <div class="flex items-center justify-between text-md text-green-900 font-bold border-b-2">
        <div class="flex items-center">
            <div class="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
            </div>
            <ToggleSwitch v-model:status="sub_header.status" @button-is-toggle="switchButtonToggle(sub_header)" />
            <div class="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
            <div class="ml-3 border-l-2 px-4">
                <!-- {{ `${sub_header.sub_header_id}. ${sub_header.sub_header_name_th}` }} -->
                {{ `${index}. ${sub_header.sub_header_name_th}` }}
            </div>
            
        </div> 
        <div class="flex items-center">          
            <div v-if="sub_header?.attach_files" class="">
                <button @click="isExpand = !isExpand" class=" bg-gray-500 text-white rounded-full my-2 p-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                </button>
            </div>
            <div class="mx-2">
                <!-- <Link :href="route('branch_about_details_edit')" method="post" as="button" :data="{ sub_header }"> -->
                <Link :href="route('admin.edu_content_edit', sub_header.slug)">
                    <button @click="true" class=" bg-yellow-500 text-white rounded-full my-2 p-1 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </Link>
            </div>
            
        </div>
    </div>
 
    <div :class="[isExpand ? 'block' : 'hidden']">
        <slot name="display_content"></slot>
    </div>

</template>

<script setup>
import { ref, } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { Inertia } from '@inertiajs/inertia'
import ToggleSwitch from '@/Components/ToggleSwitch.vue'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    sub_header: { type: Object, required: true },
    index: { type: Number, required: true }
})

const isExpand = ref(false)

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

const switchButtonToggle = (menu) => {
    //console.log(menu);
    Inertia.patch(route('admin.change_status_branch_sub_menu', menu.id), {}, {
        onBefore: () => {
            if( menu.status ) { 
                return confirm('คุณต้องการปิดการแสดงผลเมนูนี้ ใช่ หรือ ไม่ ?')
            } else {
                return confirm('คุณต้องการเปิดการแสดงผลเมนูนี้ ใช่ หรือ ไม่ ?')
            }
        },
        onSuccess: () => {
            //console.log("onSuccess state")
            menu.status = ! menu.status
            toast('success', 'สำเร็จ', 'เปลี่ยนสถานะการแสดงผลเมนูเรียบร้อย')
        },
        onError: (errors) => {
            //console.log("onError state")
            toast('danger', errors.msg, errors.sysmsg)
        },
        onFinish: () => {
            //console.log("onFinish state")
        }
    })
    //console.log(menu.status)
}

</script>

<style>

</style>