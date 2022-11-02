<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการหน้าที่ (Role)</div>
                 <div class="space-x-2">
                    <Link :href="route('admin.role.create')" method="get" as="button" type="button">
                        <button class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">
                            <PlusSmIcon :class="['h-6 w-6 mr-2']" />
                            เพิ่ม Role
                        </button>
                    </Link>
                     <Link :href="route('admin.ability.index')" method="get" as="button" type="button">
                         <button class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-orange-600 rounded cursor-pointer hover:bg-orange-500">
                             <PencilIcon :class="['h-6 w-6 mr-2']" />
                             จัดการ Ability
                         </button>
                     </Link>
                 </div>
            </div>

            <Pagination :pagination="roles"
                        class="mt-4 mb-4"
            />

            <div class="grid grid-cols-1 gap-2">
                <div v-for="role in roles.data" :key="role.id"
                    class="p-4 rounded-md shadow bg-gradient-to-l from-sky-100 border-l-4 rounded-l-md border-l-blue-600"
                >
                    <div class="grid grid-cols-12">
                        <div class="col-span-10 md:col-span-11">
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col sm:flex-row py-2 sm:py-0 sm:items-center space-x-0 sm:space-x-2">
                                    <div class="font-bold w-28">Role Name :</div>
                                    <div class="text-sm">{{ role.name }}</div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col sm:flex-row py-2 sm:items-center space-x-0 sm:space-x-2">
                                    <div class="flex font-bold w-28">คำอธิบาย :</div>
                                    <div class="text-sm">{{ role.label }}</div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col sm:flex-row py-2 sm:items-center space-x-0 sm:space-x-2">
                                    <div class="flex font-bold w-28">สิทธิดำเนินการ :</div>
                                </div>
                            </div>
                            <div class="bg-gradient-to-r from-blue-100 via-yellow-100 to-pink-100 px-2 py-1 rounded-lg font-normal text-sm tracking-wide text-gray-800 shadow-lg">
                                <div class="flex items-center py-1" v-for="abt in role.abilities" :key="abt.id">
                                    <div class="flex flex-col sm:flex-row sm:items-center">
                                        <div class="border-green-700 text-white bg-green-600 px-1 pb-1 rounded-md mr-1">{{abt.name}}</div>
                                        <div class="flex items-start sm:items-center">
                                            <FastForwardIcon :class="['mr-1 text-green-700 w-6 h-6 shrink-0']" />
                                            {{abt.label}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="flex items-center justify-center mt-2 space-x-12">
                        <Link :href="route('admin.role.edit', role.id)" class="flex items-center justify-center w-1/6 mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-md border border-orange-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                            <PencilIcon :class="['h-5 w-5']" />
                        </Link>
                        <button @click="confirmDeleteRole(role)" class="flex items-center justify-center w-1/6 mx-1 text-red-500 bg-white hover:bg-red-200 focus:ring-4 focus:ring-red-300 rounded-md border border-red-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                            <TrashIcon :class="['h-5 w-5']" />
                        </button>
                    </div>
                </div>
            </div>

            <Pagination :pagination="roles"
                        class="mt-4"
            />

        </div>
<!--    </AdminAppLayout>-->
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

import Pagination from '@/Components/Paginations.vue'

import { PlusSmIcon, PencilIcon, TrashIcon, FastForwardIcon } from "@heroicons/vue/outline"

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import Swal from "sweetalert2";  // import the styling for the toast

const props = defineProps({
    roles: { type: Object, required: true, default: {} },
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
