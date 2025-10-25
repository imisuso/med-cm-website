<template>
<!--<AdminAppLayout>-->
  <div class="flex flex-wrap justify-center mt-2">
    <div class="w-full lg:w-11/12">
        <div v-if="$page.props.auth.abilities.includes('view_all_content')" class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
            <div class="sm:w-32 text-sm font-medium text-gray-700">สาขา/หน่วยงาน:</div>
            <select v-model="Form.division_selected" @change="showBranchMainMenu" id="form_division_id" class="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <template v-for="(option, index) in divisions" :key="index">
                    <option v-if="option.division_id < 19" :value="option.division_id">
                    {{ option.name_th }}
                    </option>
                </template>
            </select>
        </div>
        <div class="flex items-center justify-between mt-2 mb-2 ml-2 text-2xl text-orange-800 font-bold">
            <div>{{ getDivisionNameFromId() }}</div>
            <!-- <div> สาขาวิชา{{ $page.props.auth.division_name_th }} </div> -->
            <div class="flex space-x-4 mx-5">
                <svg @click="allTabExpandOrCollapse(true)" class="h-6 w-6 text-emerald-500 cursor-pointer"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                </svg>
                <svg @click="allTabExpandOrCollapse(false)" class="h-6 w-6 text-emerald-500 cursor-pointer"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
            </div>
        </div>
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-col ">
            <template v-for="(menu, index) in branchMainMenu" :key="menu.main_header_id" :index="index">
                <!-- {{ getBranchSubMenu( menu.main_header_id ) }} -->
                <li class="mb-2 mx-2 last:mr-0 flex-auto text-left">
                    <div class="flex justify-between flex-wrap sm:flex-nowrap">
                        <a class="w-full mr-2 transition duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-104 text-lg font-bold uppercase px-5 py-2 shadow-lg rounded-sm leading-normal flex items-center cursor-pointer" v-on:click="toggleTabs(menu.main_header_id, index)" v-bind:class="{'text-blue-600 bg-white': openTab !== menu.main_header_id, 'text-white bg-blue-600': openTab === menu.main_header_id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                            </svg>
                            {{ menu.main_header_name_th }}
                        </a>
                        <div class="flex items-center my-2 sm:my-0">
                            <EyeOffIcon :class="['w-6 h-6 px-1 text-blue-600']" />
                            <ToggleSwitch :status="menu.status" @button-is-toggle="confirmSwitchChange(menu)"/>
                            <!-- <ToggleSwitch v-model:status="menu.status" @button-is-toggle="switchButtonToggle(menu)"/> -->
                            <EyeIcon :class="['w-6 h-6 px-1 text-blue-600']" />
                        </div>
                    </div>
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded" v-bind:class="[menu.is_active ? 'block' : 'hidden']">
                        <div class="px-4 py-5 flex-auto ">
                            <div class="">
                                <div >
                                    <!-- Hi {{ menu.component_name }} -->
                                    <!-- <component :is='menu.component_name' /> -->
                                    <!-- <component :is="dynamicComponents[menu.component_name]" :user_branch_id="user_branch_id" />    -->
                                    <BtAbout :division_id="Form.division_selected" :branchSubMenu="getBranchSubMenu( menu.main_header_id )" v-if="menu.component_name === 'BtAbout' && menu.status"/>
                                    <BtEdu :division_id="Form.division_selected" :branchSubMenu="getBranchSubMenu( menu.main_header_id )" display_content="template" v-if="menu.component_name === 'BtEdu' && menu.status"/>
                                    <BtProfessor :division_id="Form.division_selected" v-if="menu.component_name === 'BtProfessor' && menu.status"/>
                                    <BtDoctor :division_id="Form.division_selected" v-if="menu.component_name === 'BtDoctor' && menu.status"/>
                                    <BtOfficer :division_id="Form.division_selected" v-if="menu.component_name === 'BtOfficer' && menu.status"/>
                                    <BtResearch :division_id="Form.division_selected" :branchSubMenu="getOneBranchSubMenu( menu.main_header_id )" display_content="template" v-if="menu.component_name === 'BtResearch' && menu.status"/>
                                    <BtBranchService :division_id="Form.division_selected" :branchSubMenu="getOneBranchSubMenu( menu.main_header_id )" display_content="template" v-if="menu.component_name === 'BtBranchService' && menu.status"/>
                                    <BtAcademicService :division_id="Form.division_selected" :branchSubMenu="getOneBranchSubMenu( menu.main_header_id )" display_content="template" v-if="menu.component_name === 'BtAcademicService' && menu.status"/>
                                    <BtLink :division_id="Form.division_selected" :branchSubMenu="getOneBranchSubMenu( menu.main_header_id )" display_content="template" v-if="menu.component_name === 'BtLink' && menu.status"/>
                                    <BtContact :division_id="Form.division_selected" :branchSubMenu="getOneBranchSubMenu( menu.main_header_id )" display_content="template" v-if="menu.component_name === 'BtContact' && menu.status"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </template>
        </ul>
    </div>
  </div>
<!--</AdminAppLayout>-->
</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
    export default {
        layout: AdminAppLayout,
    }
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { router, useForm } from '@inertiajs/vue3'
import { EyeOffIcon, EyeIcon } from "@heroicons/vue/outline"
import ToggleSwitch from '@/Components/ToggleSwitch.vue'
import BtAbout from '@/Components/BranchTemplate/BtAbout.vue'
import BtResearch from '@/Components/BranchTemplate/BtResearch.vue'
import BtEdu from '@/Components/BranchTemplate/BtEdu.vue'
import BtProfessor from '@/Components/BranchTemplate/BtProfessor.vue'
import BtDoctor from '@/Components/BranchTemplate/BtDoctor.vue'
import BtOfficer from '@/Components/BranchTemplate/BtOfficer.vue'
import BtLink from '@/Components/BranchTemplate/BtLink.vue'
import BtContact from '@/Components/BranchTemplate/BtContact.vue'
import BtBranchService from '@/Components/BranchTemplate/BtBranchService.vue'
import BtAcademicService from '@/Components/BranchTemplate/BtAcademicService.vue'

import Swal  from 'sweetalert2';

// API Service
import DivisionService from '@/Services/DivisionService'
//import { BranchMainMenuService, BranchSubMenuService } from '@/Services/BranchMenuService'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    division_id: { type: Number, required: true },
    branch_main_menu: { type: Array, required: true },
    branch_sub_menu: { type: Array, required: true },
})

onMounted(() => {
    divisionService.value.listAll().then(data => {
        divisions.value = data
    });

    branchMainMenu.value = props.branch_main_menu
    branchSubMenu.value =  props.branch_sub_menu

    // branchMainMenuService.value.listBranchMainMenuByDivision(props.division_id).then(data => {
    //     branchMainMenu.value = data
    // });

    // branchSubMenuService.value.listBranchSubMenuByDivision(props.division_id).then(data => {
    //     branchSubMenu.value = data
    // });
})

const divisionService = ref(new DivisionService())
//const branchMainMenuService = ref(new BranchMainMenuService())
//const branchSubMenuService = ref(new BranchSubMenuService())

const divisions = ref([])
const branchMainMenu = ref([])
const branchSubMenu = ref([])
const wordStatus = ref()

const Form = useForm({
  division_selected: props.division_id
});

const openTab = ref()

const toggleTabs = (tabNumber, index) => {
    openTab.value = tabNumber
    branchMainMenu.value[index].is_active = !branchMainMenu.value[index].is_active

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

const confirmSwitchChange = ( menu ) => {
    if( menu.status ) {
        wordStatus.value = 'ปิด'
    } else {
        wordStatus.value = 'เปิด'
    }
    Swal.fire({
        title: `คุณต้องการ${wordStatus.value}การแสดงผลเมนูนี้ ใช่ หรือ ไม่ ?`,
        //html: `คุณต้องการ${wordStatus.value}การแสดงผลเมนูนี้ ใช่ หรือ ไม่ ?`,
        //html: `<div class="mt-1 font-semibold">${props.personDetails.title_th}${props.personDetails.fname_th} ${props.personDetails.lname_th}</div>  <div class="mt-1">จาก <b>${isStatus(props.personDetails.status)}</b> เป็น <b>${isStatus(! props.personDetails.status)}</b></div>`,
        //imageWidth: 80,
        //imageHeight: 80,
        showCancelButton: true,
        confirmButtonColor: '#1e40af',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            switchButtonToggle(menu)
        }
    })
}

const switchButtonToggle = (menu) => {
    // console.log(menu.id);
    router.patch(route('admin.change_status_branch_main_menu', menu.id), {}, {
        // onBefore: () => {
        //     if( menu.status ) {
        //         return confirm('คุณต้องการปิดการแสดงผลเมนูนี้ ใช่ หรือ ไม่ ?')
        //     } else {
        //         return confirm('คุณต้องการเปิดการแสดงผลเมนูนี้ ใช่ หรือ ไม่ ?')
        //     }
        // },
        onSuccess: () => {
            //console.log("onSuccess state")
            menu.status = ! menu.status
            toast('success', 'สำเร็จ', 'เปลี่ยนสถานะการแสดงผลเมนูเรียบร้อย')
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            //console.log("onFinish state")
        }
    })
    //console.log(menu.status)
}

const allTabExpandOrCollapse = ( flag ) => {
    branchMainMenu.value.forEach(element => {
        element.is_active = flag
    });
}

const showBranchMainMenu = () => {
    router.post(route('admin.show_branch_main_menu', Form.division_selected), {}, {
        preserveState: false,
        onSuccess: () => {},
        onError: (errors) => {},
        onFinish: () => {}
    })
}

const getDivisionNameFromId = () => {
    let division = divisions.value.filter( (elm) => { return elm.division_id === Form.division_selected });
    //console.log(division)
    if(division.length > 0) {
        return `${division[0].division_type}${division[0].name_th}`
    } else {
        return ""
    }
}

const getBranchSubMenu = ( main_header_id ) => {
    return branchSubMenu.value.filter( item => item.main_header_id === main_header_id ) // เอาทุกค่าที่ match
}

const getOneBranchSubMenu = ( main_header_id ) => {
    let subMenu = {}
    subMenu = branchSubMenu.value.find( item => item.main_header_id === main_header_id) // เอาค่าแรกที่เจอค่าเดียว
    //console.log(subMenu.detail_delta)
    return subMenu
}

</script>

<style scoped>

</style>
