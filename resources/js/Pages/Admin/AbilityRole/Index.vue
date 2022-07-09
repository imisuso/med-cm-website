<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการสิทธิ์การใช้งาน</div>
                <!-- <div class="">
                    <Link :href="route('admin.download.create')" method="get" as="button" type="button"
                        class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                    >
                        เพิ่ม
                    </Link>
                </div> -->
            </div>


            <Pagination :pagination="users"
                class=""
            />

            <div class="grid grid-cols-1 gap-4">
                <div v-for="(user, u_index) in users.data" :key="u_index" 
                    class="bg-white p-4 rounded-lg shadow"
                >
                    <div class="flex items-center  justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="font-bold">ผู้ใช้ :</div>
                            <div class="text-sm">{{ user.name }}</div>
                            <div class="text-sm italic font-medium tracking-wider rounded-lg bg-opacity-50 p-1"
                                :class="[user.status ? 'text-green-800 bg-green-200' : 'text-red-800 bg-red-200']"
                            >
                                {{ statusText(user.status) }}
                            </div>
                        </div>
                        <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center space-x-2 ">
                            <div class="text-sm italic font-medium tracking-wider rounded-lg bg-opacity-50 p-1"
                                :class="[user.status ? 'text-green-800 bg-green-200' : 'text-red-800 bg-red-200']"
                            >
                                Edit
                            </div>
                            <div class="text-sm italic font-medium tracking-wider rounded-lg bg-opacity-50 p-1"
                                :class="[user.status ? 'text-green-800 bg-green-200' : 'text-red-800 bg-red-200']"
                            >
                                Delete
                            </div>
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
                    <!-- <div class="flex items-center space-x-2 flex-wrap"> -->
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 font-bold">สิทธิการใช้งาน :</div>
                        <div class="col-span-2">
                            <div class="flex flex-row flex-wrap">
                                <span v-for="(ability, a_index) in user.abilities" :key="a_index" 
                                    class="m-1 p-1 text-xs italic font-medium tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50"
                                >
                                    {{ ability }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="flex items-center space-x-2 text-sm">
                        xxxx, yyyy, zzzz
                    </div> -->
                </div>

            </div>
            <!-- {{ users }} -->
        </div>
    </AdminAppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import Pagination from '@/Components/Paginations.vue'

const props = defineProps({
    users: { type: Object, required: true, default: {} },
})

const statusText = (text) => {
    return text ? 'Active' : 'Disabled'
}

</script>

<style>

</style>