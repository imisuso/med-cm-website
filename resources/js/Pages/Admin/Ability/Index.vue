<template>
    <div class="flex flex-col p-4 w-full">
        <!-- Toolbar -->
        <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
            <div class=" text-2xl font-bold">จัดการสิทธ์ (Ability)</div>
            <Link :href="route('admin.role.index')" method="get" as="button" type="button">
                <button class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">
                    <ReplyIcon :class="['h-6 w-6 mr-2']" />
                    กลับหน้าจัดการ Role
                </button>
            </Link>
        </div>

        <div class="flex flex-col" v-for="ability in abilities" :key="ability.id">
            <AbilityList
                :ability="ability"
            />
        </div>

<!--        <Pagination :pagination="roles"-->
<!--                    class="mt-4 mb-4"-->
<!--        />-->
        </div>
</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
    export default {
        layout: AdminAppLayout,
    }
</script>

<script setup>
import { ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { ReplyIcon } from "@heroicons/vue/outline"

import Pagination from '@/Components/Paginations.vue'
import AbilityList from '@/Components/AbilityList.vue'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import Swal from "sweetalert2";  // import the styling for the toast

const props = defineProps({
    abilities: { type: Object, required: true, default: {} },
})

const roleId = ref(null)
const roleName = ref(null)

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

const confirmDeleteRole = ( role ) => {
    roleId.value = role.id
    roleName.value = role.name

    Swal.fire({
        title: `คุณต้องการลบ Role ที่ชื่อว่า ${roleName.value} ?`,
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteRole()
        }
    })
}

const deleteRole = () => {
    Inertia.delete(route('admin.role.delete', roleId.value), {
        preserveState: false,
        onSuccess: () => {
            toast('success', 'สำเร็จ', 'ลบข้อมูล Role เรียบร้อย')
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบปัญหา', error_display);
        },
    });
    roleId.value = null
    roleName.value = null
}

</script>

<style>

</style>
