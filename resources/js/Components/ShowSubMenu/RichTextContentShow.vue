<template>
    <div class="flex items-center justify-between text-md text-green-900 font-bold border-b-2">
        <div class="flex items-center">
            <EyeOffIcon :class="['w-6 h-6 px-1 text-blue-600 shrink-0']" />
            <ToggleSwitch v-model:status="sub_header.status" @button-is-toggle="confirmSwitchChange(sub_header)" />
            <EyeIcon :class="['w-6 h-6 px-1 text-blue-600 shrink-0']" />
            <div class="ml-3 border-l-2 px-4">
                {{ `${index}. ${sub_header.sub_header_name_th}` }}
            </div>

        </div>
        <div class="flex items-center">
            <div class="">
                <button @click="isExpand = !isExpand" class=" bg-gray-500 text-white rounded-full my-2 p-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                </button>
            </div>
            <div class="mx-2">
                <Link :href="route('admin.richtext_content_edit', sub_header.slug)">
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
import { router, Link } from '@inertiajs/vue3'
import { EyeOffIcon, EyeIcon } from "@heroicons/vue/outline"
import ToggleSwitch from '@/Components/ToggleSwitch.vue'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

import Swal  from 'sweetalert2';

const props = defineProps({
    sub_header: { type: Object, required: true },
    index: { type: Number, required: true }
})

const isExpand = ref(false)
const wordStatus = ref()

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

const confirmSwitchChange = ( menu ) => {
    if( menu.status ) {
        wordStatus.value = 'ปิด'
    } else {
        wordStatus.value = 'เปิด'
    }
    Swal.fire({
        title: `คุณต้องการ${wordStatus.value}การแสดงผลเมนูนี้ ใช่ หรือ ไม่ ?`,
        showCancelButton: true,
        confirmButtonColor: '#1e40af',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            switchButtonToggle(menu)
        }
    })
}

const switchButtonToggle = (menu) => {
    router.patch(route('admin.change_status_branch_sub_menu', menu.id), {}, {
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
