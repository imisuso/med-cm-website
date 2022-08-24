<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">ข้อมูลการใช้งาน</div>
                <input type="text" v-model="search" class="text rounded-md border-gray-400" placeholder="ค้นจาก Type หรือ Section" />
            </div>

            <div class="grid grid-cols-2 gap-6 mb-2">
                <div class="col-span-2 sm:col-span-1">
                  <label for="type" class="block text-sm font-medium text-gray-700">Type :</label>
                  <select v-model="Form.type" id="type" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <template v-for="(type, type_index) in types" :key="type_index">
                      <option :value="type.type">{{ type.type }}</option>
                    </template>
                  </select>
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label for="section" class="block text-sm font-medium text-gray-700">Section :</label>
                    <select v-model="Form.section" id="section" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <template v-for="(section, section_index) in sections" :key="section_index">
                            <option :value="section.section">{{ section.section }}</option>
                        </template>
                    </select>
                </div>
            </div>

            <!-- {{ logs.data }} -->
            <div v-for="(log, index) in logs.data" :key="index"
                class="bg-gradient-to-l from-sky-100 border-l-4 rounded-l-md border-l-blue-600 mb-1"
            >
                <div v-if="log.person">
                    <div class="grid grid-cols-2 border p-2 rounded-md shadow-md">
                        <div class=" col-span-2 md:col-span-1">{{ dayjs(log.created_at).locale('th').format('D/MM/BBBB H:mm') }}</div>
                        <div class=" col-span-2 justify-self-start md:col-span-1 md:justify-self-end">#{{ log.type }} #{{ log.section }}</div>
                        <div class=" col-span-2">{{ log.person.fname_th }} {{ log.person.lname_th }}</div>
                        <div class=" col-span-2">{{ log.details }}</div>

                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-2 border p-2 rounded-md shadow-md">
                        <div class=" col-span-2 md:col-span-1">{{ dayjs(log.created_at).locale('th').format('D/MM/BBBB H:mm') }}</div>
                        <div class=" col-span-2 justify-self-start md:col-span-1 md:justify-self-end">#{{ log.type }}#{{ log.section }}</div>
                        <div class=" col-span-2">Unknow-User ({{ log.user }})</div>
                        <div class=" col-span-2">{{ log.details }}</div>

                    </div>
                </div>
            </div>
            <Pagination :pagination="logs" class="mt-1"/>

            <!-- <div>
                <button @click="gotoPage(-1)" v-if="logs.current_page !== 1">previous</button>
                <input type="text" :value="filters?.page ?? 1"> of {{ logs.last_page }}
                <button @click="gotoPage(1)" v-if="logs.current_page !== logs.last_page">next</button>
            </div> -->

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
import { ref, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import Pagination from '@/Components/Paginations.vue'

const props = defineProps({
    logs: { type: Object, required: true, default: {} },
    sections: { type: Object, required: true, default: {} },
    types: { type: Object, required: true, default: {} },
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

const Form = useForm({
  section: 'login',
  type: 'info',
});

dayjs.extend(buddhistEra)

// const gotoPage = (direction = 1) => {
//     // console.log({page: parseInt(props.filters.page) + 1})
//     // console.log(location.pathname)
//     let data = {page: parseInt(props.filters?.page ?? 1) + direction}
//     Inertia.get(location.pathname, data, {preserveScroll: true})
// }

</script>

<style>

</style>
