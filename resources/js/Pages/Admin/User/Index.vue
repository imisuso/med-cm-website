<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border border-gray-200 rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการผู้ใช้งาน</div>
                 <div class="">
                    <Link :href="route('admin.user.create')" method="get" as="button" type="button">
                        <button class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded-sm cursor-pointer hover:bg-green-800">
                            <PlusSmIcon :class="['h-6 w-6 mr-2']" />
                            เพิ่มผู้ใช้งาน
                        </button>
                    </Link>
                 </div>
            </div>

            <Pagination :pagination="users"
                        class="mt-4 mb-4"
            />

            <div class="grid grid-cols-1 gap-2">
                <div v-for="(user, u_index) in users.data" :key="u_index"
                    class="p-4 rounded-md shadow-sm bg-gradient-to-l from-sky-100 border-l-4 rounded-l-md border-l-blue-600"
                >
                    <div class="grid grid-cols-12">
                        <div class="col-span-10 md:col-span-11">
                            <div class="flex items-center space-x-2">
                                <div class="font-bold">สถานะ :</div>
                                <div class="text-sm italic font-medium tracking-wider rounded-lg p-1"
                                     :class="[user.status ? 'text-green-800 bg-green-200' : 'text-red-800 bg-red-200']"
                                >
                                    {{ statusText(user.status) }}
                                </div>
                            </div>
                            <div class="flex items-center  justify-between">
                                <div class="flex items-center space-x-2">
                                    <div class="font-bold">ผู้ใช้ :</div>
                                    <div class="text-sm" v-if="user.person">{{ user.person.title_th }}{{ user.person.fname_th }} {{ user.person.lname_th }}</div>
                                    <div class="text-sm" v-else>Unknown-User</div>

                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="font-bold">หน้าที่ :</div>
                                <div v-for="(role, r_index) in user.user_roles" :key="r_index"
                                    class="text-sm"
                                >
                                    {{ role }}
                                </div>
                            </div>
                        </div>
                        <div class="col-span-2 md:col-span-1">
                            <div class="flex flex-col space-y-2 items-end sm:space-y-1 sm:items-center">
                                <Link :href="route('admin.user.edit', user.id)" class="flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-full border border-orange-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                                    <PencilIcon :class="['h-5 w-5']" />
                                </Link>
                                <button @click="confirmDeleteUser(user)" class="flex items-center mx-1 text-red-500 bg-white hover:bg-red-200 focus:ring-4 focus:ring-red-300 rounded-full border border-red-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                                    <TrashIcon :class="['h-5 w-5']" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination :pagination="users"
                        class="mt-4"
            />

        </div>
<!--    </AdminAppLayout>-->
</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
    export default {
        // Using a render function
        //layout: (h, page) => h(AdminAppLayout, () => child),

        // Using the shorthand
        layout: AdminAppLayout,
    }
</script>

<script setup>
import { ref } from 'vue'
import { router, Link } from '@inertiajs/vue3'

import Pagination from '@/Components/Paginations.vue'

import { PlusSmIcon, PencilIcon, TrashIcon } from "@heroicons/vue/outline"

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import Swal from "sweetalert2";  // import the styling for the toast

const props = defineProps({
    users: { type: Object, required: true, default: {} },
})

const userId = ref(null)
const userFullName = ref(null)
const userImageUrl = ref(null)

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

const statusText = (text) => {
    return text ? 'Active' : 'Disabled'
}

const confirmDeleteUser = ( user ) => {
    userId.value = user.id
    userFullName.value = `${user.person.fname_th} - ${user.person.lname_th}`
    userImageUrl.value = user.person.image_url

    Swal.fire({
        title: 'คุณแน่ใจว่าต้องการลบผู้ใช้งาน?',
        text: `${userFullName.value}`,
        imageUrl: userImageUrl.value,
        imageWidth: 80,
        imageHeight: 80,
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteUser()
        }
    })
}

const deleteUser = () => {
    router.delete(route('admin.user.delete', userId.value), {
        preserveState: false,
        onSuccess: () => {
            toast('success', 'สำเร็จ', 'ลบข้อมูลผู้ใช้งาน เรียบร้อย')
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบปัญหา', error_display);
        },
    });
    userId.value = null
    userFullName.value = null
    userImageUrl.value = null
}

</script>

<style>

</style>
