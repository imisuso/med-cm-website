<template>
    <div class="flex flex-col px-2 py-1 w-full">
        <div class="flex flex-row justify-between px-2 py-2 space-y-2 mt-2 mb-2 w-full border rounded-md shadow-md items-baseline">
            <div class="text-2xl font-bold">ประวัติการแก้ไขข้อมูล</div>
            <Link :href="route('admin.person')" method="get" as="button" type="button"
                  class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
            >
                กลับหน้าบุคลากร
            </Link>
<!--            <Link :href='route("admin.person")' >-->
<!--                <button @click='route("admin.person")' type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">กลับ</button>-->
<!--            </Link>-->
        </div>



        <div class="flex justify-center md:justify-end mt-2 px-4">
            <Pagination :pagination="person_versions"/>
        </div>

        <div class="flex flex-col">
            <div v-for="version in person_versions.data" :key="version.id"
                class="p-1"
            >
                <div class="flex flex-col border px-2 rounded-2xl">
                    <div class="flex flex-row tracking-wide">
                        <div class="flex items-center w-2/4 sm:w-1/4 font-semibold tracking-wide">#LOG-ID : </div>
                        <div class="flex items-center">
                            <div class="font-semibold tracking-wide">{{ version.trace_log_id }} </div>
                            <a :href='route("admin.person.view_version", version.id)' class="flex items-center text-sm hover:bg-gray-100 text-green-700 px-4 py-1 tracking-wide">
                                <UserCircleIcon class="w-8 h-8 px-2 text-blue-700 cursor-pointer" />
                            </a>
                        </div>
                    </div>
                    <div class="text-sm font-semibold tracking-wide text-gray-500"> แก้ไขเมื่อ : {{ dayjs(version.created_at).locale('th').format('D MMMM BBBB H:m:s') }}</div>
                </div>

<!--                <div class="grid grid-cols-4 p-2 gap-2 border-r border-l border-b">-->
<!--                    <div class="col-span-2 sm:col-span-1">SAP-ID : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.sap_id }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">TITLE_TH : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.title_th }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">TITLE_EN : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.title_en }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">FNAME_TH : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.fname_th }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">FNAME_EN : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.fname_en }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">LNAME_TH : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.lname_th }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">LNAME_EN : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.lname_en }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">RNAME_FULL_TH : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.rname_full_th }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">RNAME_FULL_EN : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.rname_full_en }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">RNAME_SHORT_TH : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.rname_short_th }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">RNAME_SHORT_EN : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.rname_short_en }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">TYPE : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.person_type }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">GROUP : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ version.group }}</div>-->
<!--                    <div class="col-span-2 sm:col-span-1">LENGTH : </div>-->
<!--                    <div class="col-span-2 sm:col-span-3">{{ Object.keys(version).length }}</div>-->
<!--                </div>-->
<!--                {{ version }}-->
            </div>
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
import { Link } from '@inertiajs/inertia-vue3'
import Pagination from '@/Components/Paginations.vue'
import { UserCircleIcon } from "@heroicons/vue/outline"

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

const props = defineProps({
    person_versions: { type: Object, default: {} },
})

dayjs.extend(buddhistEra)
</script>
