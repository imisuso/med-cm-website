<template>
    <div class=" bg-gradient-to-l from-sky-100 shadow-md border-2 border-gray-200 rounded-lg flex flex-col w-full space-y-1 mt-2">
        <div v-if="!orderInput" class="block sm:hidden px-4 pt-4 relative">
            <button id="dropdownButton" @click="isDropDownOpen = !isDropDownOpen" class="block dropbtn text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-1.5">
                <svg class="w-6 h-6 dropbtn" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path class="dropbtn" d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
            </button>

            <div id="dropdown" :class="[isDropDownOpen ? '' : 'hidden']" class="absolute dropdown-content left-0 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-48">
                <ul class="py-1" aria-labelledby="dropdownButton">
                    <li v-if="personDetails.versions.length && $page.props.auth.abilities.includes('view_all_content')">
                        <Link :href='route("admin.person.show_backup_history", personDetails.id)' class="flex items-center text-sm hover:bg-gray-100 text-green-700 px-4 py-2">
                            <DatabaseIcon :class="['w-6 h-6 px-1']" />
                            ประวัติการแก้ไข
                        </Link>
                    </li>
                    <li>
                        <Link href="#" @click="$emit('view-person')" class="flex items-center text-sm hover:bg-gray-100 text-blue-900 px-4 py-2">
                            <IdentificationIcon :class="['w-6 h-6 px-1']" />
                            ดูข้อมูล
                        </Link>
                    </li>
                    <li>
                        <Link href="#" @click="$emit('edit-person')" class="flex items-center text-sm hover:bg-gray-100 text-yellow-500 px-4 py-2">
                            <PencilAltIcon :class="['w-6 h-6 px-1']" />
                            แก้ไข
                        </Link>
                    </li>
                    <li>
                        <Link href="#" @click="$emit('delete-person')" class="flex items-center text-sm hover:bg-gray-100 text-red-600 px-4 py-2">
                            <TrashIcon :class="['w-6 h-6 px-1']" />
                            ลบ
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center w-full px-2 bg-gradient-to-l from-sky-100">
            <div class="flex shrink-0 w-24 items-center justify-center">
                <img class="shadow-lg rounded-md h-24 w-16 object-cover mb-1 mt-1" :src="`${personDetails.image_url}`" alt="Blank-Image"/>
            </div>
            <div class="flex flex-col w-full px-2 items-center sm:items-start">
                <span>
                    <h3 v-if="! isDoctor(personDetails)" class="text-md text-indigo-500 font-bold mb-1">
                        <div>{{ personDetails.title_th }}{{ personDetails.fname_th }} {{personDetails.lname_th }}</div>
                    </h3>
                    <h3 v-else class="text-md text-indigo-500 font-bold mb-1">
                        <div>{{ personDetails.rname_short_th }} {{ personDetails.fname_th }} {{ personDetails.lname_th }} {{ personDetails.reward }}</div>
                    </h3>
                </span>
                <span class="text-sm text-gray-500 break-words">{{ personDetails.position_division }}</span>
                <span class="text-sm text-gray-500 ">{{ isLeader() }} </span>
                <span class="text-sm text-gray-500">{{ isType() }} </span>
                <span class="text-sm text-gray-500">ลำดับการแสดงผล {{ personDetails.display_order }}</span>
            </div>

            <div class="flex flex-row sm:flex-col w-full justify-center items-baseline px-1 sm:px-2 py-1 sm:py-0">
                <div class="px-1 place-self-center">สาขา/หน่วย:</div>
                <div class="text-sm text-gray-500 place-self-center">{{ personDetails.division.division_type }}{{ personDetails.division.name_th }}</div>
            </div>
            <div v-if="orderInput" class="flex flex-row sm:flex-col w-full sm:w-24 justify-center items-baseline px-1 sm:px-2 py-1 sm:py-0">
                <div class="px-1 place-self-center">จัดลำดับ:</div>
                <div class="text-sm text-gray-500 place-self-center">
                    <!-- <label for="filter_fname" class="block text-sm font-medium text-gray-700">ชื่อ</label> -->
                    <input type="text" v-model="personDetails.display_order" @change="orderPerson" id="order_text" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-24 block shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    <!-- <input type="text" name="" id="" v-model="personDetails.display_order"> -->
                </div>
            </div>
            <div v-if="!orderInput" class="flex flex-row sm:flex-col w-full justify-center items-baseline px-1 sm:px-2 py-1 sm:py-0">
                <div class="px-1 place-self-center">การแสดงผล:</div>
                <div class="text-sm text-gray-500 place-self-center">
                    <div class="flex flex-row items-baseline">
                        <div class="text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </div>
                        <ToggleSwitch v-model:status="personDetails.status" @button-is-toggle="confirmDisplayChange" />
                        <div class="text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!orderInput" class="hidden sm:block">
                <div class="px-4 pt-4 relative">
                    <button id="dropdownButton" @click="isDropDownOpen = !isDropDownOpen" class="block dropbtn text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-1.5">
                        <svg class="w-6 h-6 dropbtn" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path class="dropbtn" d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                        </svg>
                    </button>

                    <div id="dropdown" :class="[isDropDownOpen ? '' : 'hidden']" class="absolute dropdown-content -left-28 -top-28 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-48">
                        <ul class="py-1" aria-labelledby="dropdownButton">
                            <li v-if="personDetails.versions.length && $page.props.auth.abilities.includes('view_all_content') && $page.props.auth.abilities.includes('view_log')">
                                <Link :href='route("admin.person.show_backup_history", personDetails.id)' class="flex items-center text-sm hover:bg-gray-100 text-green-700 px-4 py-2">
                                    <DatabaseIcon :class="['w-6 h-6 px-1']" />
                                    ประวัติการแก้ไข
                                </Link>
                            </li>
                            <li>
                                <Link href="#" @click="$emit('view-person')" class="flex items-center text-sm hover:bg-gray-100 text-blue-900 px-4 py-2">
                                    <IdentificationIcon :class="['w-6 h-6 px-1']" />
                                    ดูข้อมูล
                                </Link>
                            </li>
                            <li>
                                <Link href="#" @click="$emit('edit-person')" class="flex items-center text-sm hover:bg-gray-100 text-yellow-500 px-4 py-2">
                                    <PencilAltIcon :class="['w-6 h-6 px-1']" />
                                    แก้ไข
                                </Link>
                            </li>
                            <li>
                                <Link href="#" @click="$emit('delete-person')" class="flex items-center text-sm hover:bg-gray-100 text-red-600 px-4 py-2">
                                    <TrashIcon :class="['w-6 h-6 px-1']" />
                                    ลบ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'
import { IdentificationIcon, PencilAltIcon, TrashIcon, DatabaseIcon } from "@heroicons/vue/outline"
import ToggleSwitch from '@/Components/ToggleSwitch.vue'

// API Service
//import TraceLogService from '@/Services/TraceLogService'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

import Swal  from 'sweetalert2';

const props = defineProps({
    personDetails: { type: Object, required: true },
    orderInput: { type: Boolean, required: true },
})

const emit = defineEmits(['view-person', 'edit-person', 'delete-person', 'order-person'])

onMounted(() => {
    window.addEventListener('click', closeDropdownWhenClickOutSide)
})

onUnmounted(() => {
    window.removeEventListener('click', closeDropdownWhenClickOutSide)
})

//const traceLogService = ref(new TraceLogService())
const baseUrl = ref(base_url)
const isDropDownOpen = ref(false)
const section = "Person Management (จัดการบุคคลากร)"

const toggleDropDown = () => {
    isDropDownOpen.value = !isDropDownOpen.value
}

const closeDropdownWhenClickOutSide = (event) => {
    //console.log(event.target)
    if (!event.target.matches('.dropbtn')) {
        //console.log("OutSide")
        if( isDropDownOpen.value ) {
            isDropDownOpen.value = false
        }
    }
    // else {
    //     console.log("InSide")
    // }
}

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

const switchButtonToggle = (person) => {
    Inertia.patch(route('admin.person.update_display_status', person.id), { fdivision: props.personDetails.division_id }, {
        // onBefore: () => {
        //     let display = ''
        //     if( person.type === 'b' && person.position_academic === 0 ) {
        //         display = `${person.title_th}${person.fname_th} ${person.lname_th}`
        //     } else {
        //         display = `${person.rname_short_th}${person.fname_th} ${person.lname_th}`
        //     }

        //     if( person.status ) {
        //         return confirm(`คุณต้องการปิดการแสดงผล ${display} ใช่ หรือ ไม่ ?`)
        //     } else {
        //         return confirm(`คุณต้องการเปิดการแสดงผล ${display} ใช่ หรือ ไม่ ?`)
        //     }
        // },
        onSuccess: () => {
            person.status = ! person.status
            toast('success', 'สำเร็จ', 'เปลี่ยนสถานะการแสดงผลบนหน้า website เรียบร้อย')
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {}
    })
}

const confirmDisplayChange = () => {
    Swal.fire({
        title: 'ต้องการเปลี่ยนการแสดงผลบุคลากร?',
        html: `<div class="mt-1 font-semibold">${props.personDetails.title_th}${props.personDetails.fname_th} ${props.personDetails.lname_th}</div>  <div class="mt-1">จาก <b>${isStatus(props.personDetails.status)}</b> เป็น <b>${isStatus(! props.personDetails.status)}</b></div>`,
        imageUrl: props.personDetails.image_url,
        imageWidth: 80,
        imageHeight: 80,
        showCancelButton: true,
        confirmButtonColor: '#1e40af',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            switchButtonToggle(props.personDetails)
        }
    })
}

const orderPerson = () => {
    //document.getElementById("order_text").blur();
    emit('order-person')
}

const isDoctor = (person) => {
    if( person.position_academic !== 0 ) {
        return true
    } else {
        return false
    }
}

const isLeader = () => {
    if( props.personDetails.profiles.leader ) {
        return "(หัวหน้าหน่วย/สาขา)"
    } else {
        return ""
    }
}

const isType = () => {
    //console.log(props.personDetails)
    if( props.personDetails.type === 'a' ) {
        return "(อาจารย์)"
    } else if ( props.personDetails.type === 'z' ) {
        return "(ที่ปรึกษา)"
    } else if ( props.personDetails.type === 'b' && props.personDetails.position_academic !== 0) {
        return "(แพทย์)"
    } else if ( props.personDetails.type === 'b' && props.personDetails.position_academic === 0) {
        return "(เจ้าหน้าที่)"
    }
}

const isStatus = ( status ) => {
    if( status ) {
        return "เปิด"
    } else {
        return "ปิด"
    }
}

const replaced = ( str, use_case ) => {

    let markStr = "---"
    if( use_case === "sap") {
        markStr = "******"
    }

    let firstStr = str.substr(0,1)
    let lastStr = str.substr(str.length-1, 1)

    return firstStr+markStr+lastStr
    //return str.slice(0, -5) + '*****';
}

</script>

<style>

</style>
