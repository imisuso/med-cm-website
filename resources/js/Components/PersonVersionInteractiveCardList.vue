<template>
    <div :class="[personDetails.trace_log_id ? 'bg-gradient-to-l from-red-100' : 'bg-gradient-to-l from-sky-100']" class="shadow-md border-2 border-gray-200 rounded-lg flex flex-col w-full space-y-1 mt-2">
        <div :class="[personDetails.trace_log_id ? 'bg-gradient-to-l from-red-100' : 'bg-gradient-to-l from-sky-100']" class="flex flex-col sm:flex-row items-center w-full px-2 py-1">
            <div class="flex shrink-0 w-24 items-center justify-center">
<!--                <img class="shadow-lg rounded-md h-24 w-16 object-cover mb-1 mt-1" :src="`${personDetails.image_url}`" alt="Blank-Image"/>-->
                <div v-if="personDetails.trace_log_id" class="text-sm font-semibold tracking-wide text-gray-500">
                    LOG-ID : {{ personDetails.trace_log_id }}
                    <Link :href='route("admin.person.view_version", personDetails.id)' class="flex items-center text-sm hover:bg-gray-100 text-green-700 px-4 py-1 tracking-wide">
                        <UserCircleIcon class="w-10 h-10 px-2 text-blue-700 cursor-pointer" />
                    </Link>
                </div>
                <div v-else class="text-sm font-semibold tracking-wide text-gray-500">ข้อมูลปัจจุบัน</div>
            </div>
            <div class="flex flex-col w-full px-2 items-center sm:items-start">
                <h3 v-if="! isDoctor(personDetails)" class="text-md text-indigo-500 font-bold mb-1">
                    <div>{{ personDetails.title_th }}{{ personDetails.fname_th }} {{personDetails.lname_th }}</div>
                </h3>
                <h3 v-else class="text-md text-indigo-500 font-bold mb-1">
                    <div>{{ personDetails.rname_short_th }} {{ personDetails.fname_th }} {{ personDetails.lname_th }} {{ personDetails.reward }}</div>
                </h3>
                <span class="text-sm text-gray-500 break-words">{{ personDetails.position_division }}</span>
                <span class="text-sm text-gray-500">({{ isLeader() }}) ({{ isType() }}) ({{ personDetails.display_order }})</span>
            </div>

            <div class="flex flex-row sm:flex-col w-full justify-center items-baseline px-1 sm:px-2 py-1 sm:py-0">
                <div class="px-1 place-self-center">สาขา/หน่วย:</div>
<!--                <div class="text-sm text-gray-500 place-self-center">{{ personDetails.division_id }}</div>-->
                <div class="text-sm text-gray-500 place-self-center">{{ personDetails.division.division_type }}{{ personDetails.division.name_th }}</div>
            </div>

            <div class="flex flex-row sm:flex-col w-full justify-center items-baseline px-1 sm:px-2 py-1 sm:py-0">
                <div class="px-1 place-self-center">การแสดงผล:</div>
                <div class="text-sm text-gray-500 place-self-center">
                    <div class="flex flex-row items-baseline">
                        <EyeOffIcon :class="['w-6 h-6 px-1 text-blue-600']" />
                        <ToggleSwitch v-model:status="personDetails.status" />
                        <EyeIcon :class="['w-6 h-6 px-1 text-blue-600']" />
                    </div>
                </div>
            </div>
        </div>
        <span v-if="personDetails.trace_log_id" class="px-1 py-1 text-sm font-semibold tracking-wide text-gray-500"> ข้อมูลก่อนแก้ไขเมื่อวันที่ : {{ dayjs(personDetails.created_at).locale('th').format('D MMMM BBBB H:m:s') }}</span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import ToggleSwitch from '@/Components/ToggleSwitch.vue'
import { EyeOffIcon, EyeIcon, UserCircleIcon } from "@heroicons/vue/outline"

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)

// API Service
//import TraceLogService from '@/Services/TraceLogService'

const props = defineProps({
    personDetails: { type: Object, required: true },
})

//const traceLogService = ref(new TraceLogService())
const baseUrl = ref(base_url)
//const section = "Person Management (จัดการบุคคลากร)"

const isDoctor = (person) => {
    if( person.position_academic !== 0 ) {
        return true
    } else {
        return false
    }
}

const isLeader = () => {
    if( props.personDetails.profiles.leader ) {
        return "L"
    } else {
        return "M"
    }
}

const isType = () => {
    //console.log(props.personDetails)
    if( props.personDetails.type === 'a' ) {
        return "อาจารย์"
    } else if ( props.personDetails.type === 'z' ) {
        return "ที่ปรึกษา"
    } else if ( props.personDetails.type === 'b' && props.personDetails.position_academic !== 0) {
        return "แพทย์"
    } else if ( props.personDetails.type === 'b' && props.personDetails.position_academic === 0) {
        return "เจ้าหน้าที่"
    }
}

</script>

<style>

</style>
