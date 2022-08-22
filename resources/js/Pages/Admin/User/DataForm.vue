<template xmlns:slot="http://www.w3.org/1999/XSL/Transform">
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">{{ actionWord }} ผู้ใช้งาน</div>
                <Link :href="route('admin.user.index')" method="get" as="button" type="button"
                    class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                >
                    กลับหน้าหลัก
                </Link>
            </div>

            <div class="flex flex-col border rounded-lg shadow-lg p-4">
                <div class="flex justify-center md:justify-start">
                    <img v-if="! selectedUser" :src="`${baseUrl}/fallbackimage/default-blank-image.jpg`" alt="No Picture" class="object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300"/>
                    <img v-else :src="selectedUser.image_url" alt="No Picture" class="object-cover w-20 h-28 rounded-lg ring-1 ring-gray-300">
                </div>
                <div class="grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6">
                    <label for="user_id" class="col-span-6 md:col-span-1 mr-2 self-end">ผู้ใช้งาน :</label>
                    <VueMultiselect
                        id="user_id"
                        v-model="selectedUser"
                        deselect-label="Can't remove this value"
                        track-by="id"
                        label="fname_th"
                        placeholder="กรุณาเลือกผู้ใช้งาน"
                        class="col-span-6 md:col-span-5"
                        :disabled="!!user"
                        :show-labels="false"
                        :options="person"
                        :searchable="!user"
                        :allow-empty="false"
                        @search-change="onSearchUserChange"
                        @select="onSelectedUser"
                    >
                        <template v-slot:singleLabel="props">
                            <span><strong>{{ props.option.fname_th }} - {{ props.option.lname_th }} [{{ props.option.division.name_th }}]</strong></span>
                        </template>
                        <template v-slot:option="props">
                            <div class="flex items-center">
                                <img class=" h-14 w-12 p-1" :src='props.option.image_url' alt="Not Available">
                                <strong>{{ props.option.fname_th }} - {{ props.option.lname_th }} [{{ props.option.division.name_th }}]</strong>
                            </div>
                        </template>
                    </VueMultiselect>

                    <label for="role_name" class="col-span-6 md:col-span-1 mr-2 self-end">หน้าที่ :</label>
                    <VueMultiselect
                        id="role_name"
                        v-model="selectedRole"
                        deselect-label="Can't remove this value"
                        track-by="name"
                        label="name"
                        placeholder="กรุณาเลือกหน้าที่รับผิดชอบ"
                        class="col-span-6 md:col-span-5"
                        :custom-label="customLabelRole"
                        :show-labels="false"
                        :options="roles"
                        :searchable="false"
                        :allow-empty="false"
                        @select="onSelectedRole"
                    >
                        <template slot:singleLabel="props">
                            <span>{{ props.option.name }}</span>
                        </template>
                        <template slot:option="props">
                            <span><strong>{{ props.option.name }}</strong></span>
                        </template>
                    </VueMultiselect>

                    <label for="status" class="col-span-2 md:col-span-1 mr-2 self-center">สถานะ :</label>
                    <div class="col-span-4">
                        <div id="status" class="flex items-center my-2 sm:my-0">
                            <div class="text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </div>
                            <ToggleSwitch :status="form.status" @button-is-toggle="switchButtonToggle"/>
                            <div class="text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row mt-2 space-x-4">
                <button v-if="action === 'insert'" type="button" @click="saveUser" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
                <button v-if="action === 'edit'" type="button" @click="saveUser" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
                <Link :href="route('admin.user.index')" method="get" as="button" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                    ยกเลิก
                </Link>
            </div>

        </div>
    </AdminAppLayout>
</template>

<script setup>
import { ref } from 'vue'
import {useForm, Link } from '@inertiajs/inertia-vue3'
import {Inertia} from "@inertiajs/inertia"

import ToggleSwitch from '@/Components/ToggleSwitch.vue'
import VueMultiselect from 'vue-multiselect'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import {throttle} from 'lodash'

const props = defineProps({
    action: { type: String, require: true, default: "insert" },
    user: { type: Object },
    person: { type: Array, default: [] },
    roles: { type: Array, default: [] },
})

const actionWord = ref(null)
const baseUrl = ref(base_url)

switch(props.action) {
    case 'insert':
        actionWord.value = "เพิ่ม"
        break;
    case 'edit':
        actionWord.value = "แก้ไข"
        break;
    case 'delete':
        actionWord.value = "ลบ"
        break;
}

const form = useForm({
    user_id: props.user ? props.user.id : null,
    role_name: (props.user && props.user.roles.length) ? props.user.roles[0].name : null,
    status: props.user ? props.user.status : true,
});

const selectedUser = props.user ? props.person[0] : ref(null)
const selectedRole = (props.user && props.user.roles.length) ? ref(props.user.roles[0]) : ref(null)
// const selectedRole = props.user.roles.length ? ref(props.user.roles[0]) : ref(null)

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
    })
}

// const customLabelUser = ({ fname_th, lname_th, division }) => {
//     return `${fname_th} – ${lname_th} [${division.name_th}]`;
// }

const customLabelRole = ({ name }) => {
    return `${name}`;
}

const onSearchUserChange = throttle((term) => {
    Inertia.get(route('admin.user.create'), {term}, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    })
}, 300)

const onSelectedUser = (person) => {
    form.user_id = person.id
}

const onSelectedRole = (role) => {
    form.role_name = role.name
}

const switchButtonToggle = () => {
    // console.log("before toggle " + form.status)
    form.status = ! form.status
    // console.log("after toggle " + form.status)
}

const saveUser = () => {
    let error_display = ''
    if(props.action === 'edit') {  // Edit
        form.patch(route('admin.user.update', form.user_id), {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'แก้ไขข้อมูลผู้ใช้งานเรียบร้อย');
            },
            onError: (errors) => {
                for ( let p in errors ) {
                    error_display = error_display + `- ${errors[p]}<br/>`
                }
                toast('danger', 'พบข้อผิดพลาด', error_display);
            },
            onFinish: () => {
                form.processing = false
            }
        });
    } else { // Add
        form.post(route('admin.user.store', form.user_id), {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'เพิ่มข้อมูลผู้ใช้งานเรียบร้อย');
            },
            onError: (errors) => {
                for ( let p in errors ) {
                    error_display = error_display + `- ${errors[p]}<br/>`
                }
                toast('danger', 'พบข้อผิดพลาด', error_display);
            },
            onFinish: () => {
                form.processing = false
            }
        });
    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>
