<template xmlns:slot="http://www.w3.org/1999/XSL/Transform">
    <div class="flex flex-col p-4 w-full">
        <!-- Toolbar -->
        <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
            <div class=" text-2xl font-bold">{{ actionWord }} Role</div>
            <Link :href="route('admin.role.index')" method="get" as="button" type="button">
                <button class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">
                    <ReplyIcon :class="['h-6 w-6 mr-2']" />
                    กลับหน้าจัดการ Role
                </button>
            </Link>
        </div>

        <div class="flex flex-col border rounded-lg shadow-lg p-4">
            <div class="grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6">
                <label for="role-name" class="col-span-6 md:col-span-1 mr-2 self-start justify-self-start sm:justify-self-end font-semibold">ชื่อ Role :</label>
                <div class="col-span-6 md:col-span-5">
                    <div>
                        <input  type="text" id="role-name"
                                v-model="form.role_name"
                                class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                :class="[$page.props.errors.role_name ? 'border-red-600' : 'border-gray-300']"
                        />
                    </div>
                    <div class="mt-2 text-xs  text-red-600" v-if="$page.props.errors.role_name">{{ $page.props.errors.role_name }}</div>
                </div>

                <label for="role-label" class="col-span-6 md:col-span-1 mr-2 self-start justify-self-start sm:justify-self-end font-semibold">รายละเอียด :</label>
                <div class="col-span-6 md:col-span-5">
                    <div>
                        <textarea id="role-label"
                                  v-model="form.role_label"
                                  class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                                  :class="[$page.props.errors.role_label ? 'border-red-600' : 'border-gray-300']"
                        />
                    </div>
                    <div class="mt-2 text-xs  text-red-600" v-if="$page.props.errors.role_label">{{ $page.props.errors.role_label }}</div>
                </div>
            </div>

            <div class="grid grid-cols-6 gap-2 md:gap-6 mt-2 mb-6 p-2 rounded-lg">
                <label for="abilities" class="col-span-6 md:col-span-1 mr-2 self-center justify-self-start sm:justify-self-end font-semibold">Ability :</label>
                <VueMultiselect
                    class="col-span-6 md:col-span-5 mt-4 border"
                    :class="[$page.props.errors.abilities ? 'border-red-600' : '']"
                    id="abilities"
                    v-model="selectedAbilities"
                    track-by="id"
                    :show-labels="true"
                    :custom-label="customLabelAbility"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :options="abilities"
                    :multiple="true"
                    :searchable="false"
                    :allow-empty="false"
                    selectLabel="กรุณาเลือก"
                    selectedLabel="เลือกแล้ว"
                    deselectLabel='เลือกเพื่อนำออก'
                    :preselect-first="true"
                    :hide-selected="true"
                    @select="onSelectedAbility"
                >
                </VueMultiselect>
                <div class="col-start-1 sm:col-start-2 col-span-6 text-xs text-red-600" v-if="$page.props.errors.abilities">{{ $page.props.errors.abilities }}</div>
            </div>
            <div class="bg-gradient-to-r from-blue-100 via-yellow-100 to-pink-100 px-2 py-1 rounded-lg font-normal text-sm tracking-wide text-gray-800 shadow-lg">
                <div class="font-semibold text-lg underline tracking-wide">ภาพรวม :</div>
                <div class="flex items-center py-1" v-for="abt in form.abilities" :key="abt.id">
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

        <div class="flex flex-row mt-2 space-x-4">
            <button v-if="action === 'insert'" type="button" @click="saveRole" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
            <button v-if="action === 'edit'" type="button" @click="saveRole" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
            <Link :href="route('admin.role.index')" method="get" as="button" type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
                ยกเลิก
            </Link>
        </div>

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
import {useForm, Link } from '@inertiajs/inertia-vue3'
import {Inertia} from "@inertiajs/inertia"

import VueMultiselect from 'vue-multiselect'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import { ReplyIcon, PlusSmIcon, FastForwardIcon } from "@heroicons/vue/outline"

import {throttle} from 'lodash'

const props = defineProps({
    action: { type: String, require: true, default: "insert" },
    abilities: { type: Array, default: [] },
    role: { type: Object, default: {} },
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
    role_id: props.role ? props.role.id : null,
    role_name: props.role ? props.role.name : null,
    role_label: props.role ? props.role.label : true,
    abilities: props.role ? props.role.abilities : []
});

const selectedAbilities = form.abilities ? ref(form.abilities) : ref([])

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

const customLabelAbility = ( {name, label}) => {
    return `${name}`
}

const onSelectedAbility = () => {
    form.abilities = selectedAbilities
}

const saveRole = () => {
    let error_display = ''
    if(props.action === 'edit') {  // Edit
        form.patch(route('admin.role.update', form.role_id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'แก้ไขข้อมูล Role เรียบร้อย');
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
        form.post(route('admin.role.store'), {
            preserveState:true,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'เพิ่มข้อมูล Role เรียบร้อย');
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
