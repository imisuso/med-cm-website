<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold w-full md:w-1/3">ข้อมูลการใช้งาน</div>
                <input type="text" v-model="search" class="text rounded-md border-gray-400 w-full" placeholder="ค้นจาก Type, Action, Section หรือ Details" />
            </div>

            <div class="grid grid-cols-3 gap-2 sm:gap-6 mb-2">
                <div class="col-span-3 sm:col-span-1">
                  <label @click='listHint("type")' for="type" class="block cursor-pointer text-sm text-white text-center font-medium  bg-slate-700 tracking-wide border border-gray-700 rounded-2xl px-2">Type</label>
<!--                  <select v-model="Form.type" id="type" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">-->
<!--                    <template v-for="(type, type_index) in types" :key="type_index">-->
<!--                      <option :value="type.type">{{ type.type }}</option>-->
<!--                    </template>-->
<!--                  </select>-->
                </div>
                <div class="col-span-3 sm:col-span-1">
                    <label @click='listHint("action")' for="action" class="block cursor-pointer text-sm text-white text-center font-medium bg-amber-700 tracking-wide border border-gray-700 rounded-2xl px-2">Action</label>
                    <!--                  <select v-model="Form.action" id="action" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">-->
                    <!--                    <template v-for="(action, action_index) in actions" :key="action_index">-->
                    <!--                      <option :value="action.action">{{ action.action }}</option>-->
                    <!--                    </template>-->
                    <!--                  </select>-->
                </div>
                <div class="col-span-3 sm:col-span-1">
                    <label @click='listHint("section")' for="section" class="block cursor-pointer text-sm text-white text-center font-medium bg-sky-700 tracking-wide border border-gray-700 rounded-2xl px-2">Section</label>
<!--                    <select v-model="Form.section" id="section" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">-->
<!--                        <template v-for="(section, section_index) in sections" :key="section_index">-->
<!--                            <option :value="section.section">{{ section.section }}</option>-->
<!--                        </template>-->
<!--                    </select>-->
                </div>
            </div>

            <!-- {{ logs.data }} -->
            <div v-for="(log, index) in logs.data" :key="index"
                class="bg-gradient-to-l from-sky-100 border-l-4 rounded-l-md border-l-blue-600 mb-1"
            >
                <div v-if="log.person">
                    <div class="grid grid-cols-2 border p-2 rounded-md shadow-md">
                        <div class=" col-span-2 text-sm text-black font-semibold">#{{log.id}}</div>
                        <div class=" col-span-2 text-sm text-gray-700 italic">{{ dayjs(log.created_at).locale('th').format('D/MM/BBBB H:mm') }}</div>
                        <div class=" col-span-2">{{ log.person.fname_th }} {{ log.person.lname_th }}</div>
                        <div class=" col-span-2">{{ log.details }}</div>
                        <div class=" col-span-2">
                            <div class="flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-1 md:space-y-0 items-start md:items-center text-sm mt-2">
                                <div class="whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"> {{ log.type }}</div>
                                <div class="whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-amber-700"> {{ log.action }}</div>
                                <div class="whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-sky-700"> {{ log.section }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-2 border p-2 rounded-md shadow-md">
                        <div class=" col-span-2 text-sm text-black font-semibold">#{{log.id}}</div>
                        <div class=" col-span-2 text-sm text-gray-700 italic ">{{ dayjs(log.created_at).locale('th').format('D/MM/BBBB H:mm') }}</div>
                        <div class=" col-span-2">Unknow-User ({{ log.user }})</div>
                        <div class=" col-span-2">{{ log.details }}</div>
                        <div class=" col-span-2">
                            <div class="flex space-x-2 items-center text-sm mt-2">
                                <div class="whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-slate-700"> {{ log.type }}</div>
                                <div class="whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-amber-700"> {{ log.action }}</div>
                                <div class="whitespace-nowrap tracking-wide border border-gray-700 rounded-2xl shadow px-2 text-white bg-sky-700"> {{ log.section }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination :pagination="logs" class="mt-1"/>

            <!-- <div>
                <button @click="gotoPage(-1)" v-if="logs.current_page !== 1">previous</button>
                <input type="text" :value="filters?.page ?? 1"> of {{ logs.last_page }}
                <button @click="gotoPage(1)" v-if="logs.current_page !== logs.last_page">next</button>
            </div> -->

            <!-- Modal สำหรับ แสดงผล list ต่างๆของ Type, Action, Section -->
            <teleport to="body">
                <Modal :isModalOpen="showHintModal" >
                    <!-- Modal Header -->
                    <template v-slot:header>
                        <div class="text-gray-900 text-xl font-medium">
                            List ที่มีการเก็บ Log
                        </div>
                    </template>
                    <!-- Modal Body -->
                    <template v-slot:body>
                        <div class="flex flex-col justify-start">
                            <li v-for="(item, index) in hintList" :key="index"
                                class="text-sm"
                            >
                                {{ item }}
                            </li>
                        </div>
                    </template>
                    <!-- Modal Footer -->
                    <template v-slot:footer>
                        <button @click="showHintModal = !showHintModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">ปิด</button>
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
import {ref, watch, reactive, nextTick} from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import Pagination from '@/Components/Paginations.vue'
import Modal from '@/Components/Modal.vue'

const props = defineProps({
    logs: { type: Object, required: true, default: {} },
    sections: { type: Object, required: true, default: {} },
    types: { type: Object, required: true, default: {} },
    actions: { type: Object, required: true, default: {} },
    filters: { type: Object },
})

let search = ref(props.filters.search)

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('admin.log.index'), { search: value }, {
        preserveState: true,
        replace: true
    })
})

dayjs.extend(buddhistEra)

const showHintModal = ref(false)
const hintList = ref([])

const listHint = ( type ) => {
    if( type === 'type') {
        nextTick(() => {
            hintList.value = props.types.map((item) => {
                return item.type
            })
            // console.log(hintList.value)
        });
    } else if ( type === 'section') {
        nextTick(() => {
            hintList.value = props.sections.map((item) => {
                return item.section
            })
            // console.log(hintList.value)
        });
    } else if ( type === 'action') {
    nextTick(() => {
            hintList.value = props.actions.map((item) => {
                return item.action
            })
            // console.log(hintList.value)
        });
    }
    showHintModal.value = !showHintModal.value
}

// const gotoPage = (direction = 1) => {
//     // console.log({page: parseInt(props.filters.page) + 1})
//     // console.log(location.pathname)
//     let data = {page: parseInt(props.filters?.page ?? 1) + direction}
//     Inertia.get(location.pathname, data, {preserveScroll: true})
// }



</script>

<style>

</style>
