<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">ข้อมูลการใช้งาน</div>
                <!-- <div class="">
                    <Link :href="route('admin.download.create')" method="get" as="button" type="button"
                        class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                    >
                        เพิ่ม
                    </Link>
                </div> -->
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div class="col-span-2 sm:col-span-1">
                  <label for="section" class="block text-sm font-medium text-gray-700">Section :</label>
                  <select v-model="Form.section" id="section" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <template v-for="(section, section_index) in sections" :key="section_index">
                      <!-- <option v-if="$page.props.auth.abilities.includes('view_all_content')" :value="option.division_id">{{ option.name_th }}</option> -->
                      <option :value="section.section">{{ section.section }}</option>                     
                    </template>
                  </select>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label for="type" class="block text-sm font-medium text-gray-700">Type :</label>
                  <select v-model="Form.type" id="type" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <template v-for="(type, type_index) in types" :key="type_index">
                      <!-- <option v-if="$page.props.auth.abilities.includes('view_all_content')" :value="option.division_id">{{ option.name_th }}</option> -->
                      <option :value="type.type">{{ type.type }}</option>                     
                    </template>
                  </select>
                </div>
            </div>

            
            <div v-for="(log, index) in logs" :key="index">
                <div v-if="log.person">{{ log.person.fname_th }} {{ log.person.lname_th }} {{ log.action }} {{ log.details }} {{ log.created_at }}</div>
                <div v-else>Unknow-User {{ log.action }} {{ log.details }} {{ log.created_at }}</div>
            </div>
            <!-- <Pagination :pagination="logs"
                class=""
            /> -->

            <!-- <div class="grid grid-cols-1 gap-4">
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
                </div>

            </div> -->
           
        </div>
    </AdminAppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'

import Pagination from '@/Components/Paginations.vue'

const props = defineProps({
    logs: { type: Object, required: true, default: {} },
    sections: { type: Object, required: true, default: {} },
    types: { type: Object, required: true, default: {} },
})

const Form = useForm({
  section: 'login-page',
  type: 'info',
  //division_selected: usePage().props.value.auth.division_id,
  //leader: false,
  //certificateList: []
});

const statusText = (text) => {
    return text ? 'Active' : 'Disabled'
}

</script>

<style>

</style>