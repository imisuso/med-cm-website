<template>
    <div>
        <div class="overflow-x-scroll">
            <table class="w-full  border-collapse border border-slate-400">
                <thead class="bg-gray-50 border-b-2 border-gray-200 ">
                    <tr>
                        <th class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">#</th>
                        <th class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap justify-center">คำนำหน้า/ตำแหน่ง</th>
                        <th class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap justify-center">ชื่อ-สกุล</th>
                        <th class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">สาขา/หน่วย</th>
                        <th class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">หัวหน้าหน่วย</th>
                        <th class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">ลำดับ</th>
                        <th class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">การแสดงผล</th>
                        <th class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">ผู้ดำเนินการ</th>
                        <th class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">วันที่อัพเดท</th>
                        <th class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">วันที่เกิดข้อมูล/เวอร์ชั่น</th>
                    </tr>
                </thead>
                <tbody class=" divide-y divide-gray-100">
                    <tr class="bg-linear-to-r from-sky-50">
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                            ข้อมูลปัจจุบัน
                            <Link :href='route("admin.person.view", {Person: personCurrent.id, fromHistoryPage: true })' class="flex items-center text-sm hover:bg-gray-100 text-green-700 px-4 py-1 tracking-wide">
                                <UserCircleIcon class="w-10 h-10 px-2 text-blue-700 cursor-pointer" />
                            </Link>
                        </td>
                        <td v-if="isDoctor(personCurrent)" class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap justify-center">{{ personCurrent.rname_short_th }}</td>
                        <td v-else class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap justify-center">{{ personCurrent.title_th }}</td>
                        <td class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap justify-center">{{ personCurrent.fname_th }} {{personCurrent.lname_th }}</td>
                        <td class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ personCurrent.division.name_th }}</td>
                        <td v-if="isLeader(personCurrent.profiles.leader)" class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap"><CheckIcon class='h-6 w-6 text-green-700' /></td>
                        <td v-else class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap"><XIcon class='h-6 w-6 text-red-700' /></td>
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ personCurrent.display_order }}</td>
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap"><ToggleSwitch v-model:status="personCurrent.status" /></td>
                        <td v-if="personCurrent.user_last_act_full_name" class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ personCurrent.user_last_act_full_name }}</td>
                        <td v-else class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ personCurrent.user_last_act }}</td>
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ dayjs(personCurrent.updated_at).locale('th').format('D MMMM BBBB HH:mm:ss') }}</td>
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ dayjs(personCurrent.created_at).locale('th').format('D MMMM BBBB HH:mm:ss') }}</td>
                    </tr>
                    <tr v-for=" personVersion in personHistory" :key="personVersion.id"
                        class="bg-linear-to-r from-red-50"
                    >
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                            LOG-ID : {{ personVersion.trace_log_id }}
                            <Link :href='route("admin.person.view_version", personVersion.id)' class="flex items-center text-sm hover:bg-gray-100 text-green-700 px-4 py-1 tracking-wide">
                                <UserCircleIcon class="w-10 h-10 px-2 text-blue-700 cursor-pointer" />
                            </Link>
                        </td>
                        <td v-if="isDoctor(personVersion)" class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap justify-center">{{ personVersion.rname_short_th }}</td>
                        <td v-else class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap justify-center">{{ personVersion.title_th }}</td>
                        <td class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap justify-center">{{ personVersion.fname_th }} {{personVersion.lname_th }}</td>
                        <td class=" w-2/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ personVersion.division.name_th }}</td>
                        <td v-if="isLeader(personVersion.profiles.leader)" class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap"><CheckIcon class='h-6 w-6 text-green-700' /></td>
                        <td v-else class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap"><XIcon class='h-6 w-6 text-red-700' /></td>
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ personVersion.display_order }}</td>
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap"><ToggleSwitch v-model:status="personVersion.status" /></td>
                        <td v-if="personVersion.user_last_act_full_name" class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ personVersion.user_last_act_full_name }}</td>
                        <td v-else class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ personVersion.user_last_act }}</td>
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ dayjs(personVersion.record_updated).locale('th').format('D MMMM BBBB HH:mm:ss') }}</td>
                        <td class=" w-1/12 p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">{{ dayjs(personVersion.created_at).locale('th').format('D MMMM BBBB HH:mm:ss') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import ToggleSwitch from '@/Components/ToggleSwitch.vue'
import { UserCircleIcon, CheckIcon, XIcon } from "@heroicons/vue/outline"

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)

const props = defineProps({
    personCurrent: { type: Object, default: {} },
    personHistory: { type: Object, default: {} },
})

const baseUrl = ref(base_url)

const isDoctor = (person) => {
    if( person.type === 'a' || person.type === 'b'  || (person.type === 'z' && person.group === 1) ) {
        return true
    } else {
        return false
    }
}

const isLeader = ( leader ) => {
    if( leader ) {
        return true
    } else {
        return false
    }
}

</script>

<style>

</style>
