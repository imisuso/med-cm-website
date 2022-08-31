<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการผู้ใช้งาน</div>
                 <div class="">
                    <Link :href="route('admin.user.create')" method="get" as="button" type="button"
                        class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                    >
                        เพิ่มผู้ใช้งาน
                    </Link>
                 </div>
            </div>

            <Pagination :pagination="users"
                        class="mt-4 mb-4"
            />

            <div class="grid grid-cols-1 gap-2">
                <div v-for="(user, u_index) in users.data" :key="u_index"
                    class="p-4 rounded-md shadow bg-gradient-to-l from-sky-100 border-l-4 rounded-l-md border-l-blue-600"
                >
                    <div class="grid grid-cols-12">
                        <div class="col-span-10 md:col-span-11">
                            <div class="flex items-center space-x-2">
                                <div class="font-bold">สถานะ :</div>
                                <div class="text-sm italic font-medium tracking-wider rounded-lg bg-opacity-50 p-1"
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
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </Link>
                                <button @click="openDeleteUserModal(user)" class="flex items-center mx-1 text-red-500 bg-white hover:bg-red-200 focus:ring-4 focus:ring-red-300 rounded-full border border-red-200 text-sm font-medium px-2 py-2 hover:text-orange-900 focus:z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination :pagination="users"
                        class="mt-4"
            />

            <!-- Modal สำหรับ confirm การลบข้อมูลผู้ใช้งาน  -->
            <teleport to="body">
                <Modal :isModalOpen="deleteUserModal" >

                    <template v-slot:header>
                        <div class="text-gray-900 text-xl font-medium">
                            คุณต้องการลบข้อมูลผู้ใช้งาน
                        </div>
                    </template>

                    <template v-slot:body>
                        <div class="flex flex-row justify-start items-center">
                            <img :src="userImageUrl" alt="" class="h-20 w-20 rounded-lg object-contain mr-4" />
                            <div class="text-gray-900 text-md font-medium">
                                {{ userFullName }}
                            </div>
                        </div>
                    </template>

                    <template v-slot:footer>
                        <button @click="deleteUser" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ลบ</button>
                        <button @click="closeDeleteUserModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">ยกเลิก</button>
                    </template>
                </Modal>
            </teleport>
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
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import Modal from '@/Components/Modal.vue'
import Pagination from '@/Components/Paginations.vue'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    users: { type: Object, required: true, default: {} },
})

const deleteUserModal = ref(false)
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

const openDeleteUserModal = (user) => {
    userId.value = user.id
    userFullName.value = `${user.person.fname_th} - ${user.person.lname_th}`
    userImageUrl.value = user.person.image_url
    deleteUserModal.value = true
    // console.log(userId.value)
}

const closeDeleteUserModal = () => {
    userId.value = null
    userFullName.value = null
    userImageUrl.value = null
    deleteUserModal.value = false

}

const deleteUser = () => {
    Inertia.delete(route('admin.user.delete', userId.value), {
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
    closeDeleteUserModal()
}

</script>

<style>

</style>
