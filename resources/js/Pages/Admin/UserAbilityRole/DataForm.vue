<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">{{ actionWord }} ผู้ใช้งานและสิทธิ์</div>
                <Link :href="route('admin.user_ability_role.index')" method="get" as="button" type="button"
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
                    <label for="division_id" class="col-span-6 md:col-span-1 mr-2 self-end">ผู้ใช้งาน :</label>
                    <VueMultiselect
                        id="user_id"
                        v-model="selectedUser"
                        deselect-label="Can't remove this value"
                        track-by="id"
                        label="fname_th"
                        placeholder="กรุณาเลือกผู้ใช้งาน"
                        class="col-span-6 md:col-span-5"
                        :custom-label="customLabelUser"
                        :show-labels="false"
                        :options="person"
                        :searchable="true"
                        :allow-empty="false"
                        @search-change="onSearchUserChange"
                        @select="onSelectedUser"
                    >
                        <template slot="singleLabel" slot-scope="props">
<!--                            <img class="option__image" :src="props.option.image_url" alt="No Man’s Sky">-->
                            <span>{{ props.option.fname_th }}</span>
                        </template>
                        <template slot="option" slot-scope="props">
                            <img class="option__image" :src='props.option.image_url' alt="No Man’s Sky">
                            <span><strong>{{ props.option.fname_th }} {{ props.option.lname_th }}</strong></span>
                        </template>
                    </VueMultiselect>



                    <label for="division_id" class="col-span-6 md:col-span-1 mr-2 self-end">หน้าที่ :</label>
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
                        <template slot="singleLabel" slot-scope="props">
                            <span>{{ props.option.name }}</span>
                        </template>
                        <template slot="option" slot-scope="props">
                            <span><strong>{{ props.option.name }}</strong></span>
                        </template>
                    </VueMultiselect>
                </div>
            </div>

            <div class="flex flex-row mt-2 space-x-4">
                <button v-if="action === 'insert'" type="button" @click="saveUser" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
                <button v-if="action === 'edit'" type="button" @click="true" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
                <Link :href="route('admin.user_ability_role.index')" method="get" as="button" type="button"
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

import VueMultiselect from 'vue-multiselect'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import {throttle} from 'lodash'


const props = defineProps({
    action: { type: String, require: true, default: "insert" },
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
    user_id: null,
    role_name: null,
  // id: props.person ? props.person.id : null,
  // division_id: props.division ? props.division.division_id : null,
  // type: props.division ? props.division.type : null,
  // name_th: props.division ? props.division.name_th : null,
  // name_en: props.division ? props.division.name_en : null,
  // image: null
});

const selectedUser = ref(null)
const selectedRole = ref(null)

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

const customLabelUser = ({ fname_th, lname_th, division }) => {
    return `${fname_th} – ${lname_th} [${division.name_th}]`;
}

const customLabelRole = ({ name }) => {
    return `${name}`;
}

const onSearchUserChange = throttle((term) => {
    Inertia.get(route('admin.user_ability_role.create'), {term}, {
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

const saveUser = () => {
    let error_display = ''
    if(props.action === 'edit') {  // Edit
        form.patch(route('admin.user_ability_role.update', form.user_id), {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'แก้ไขข้อมูล สาขา/หน่วยงาน เรียบร้อย');
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
        form.post(route('admin.user_ability_role.store', form.user_id), {
            preserveState: true,
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
