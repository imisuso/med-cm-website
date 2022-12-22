<template>
<!--<AppLayout>-->
    <div class="flex flex-wrap justify-center">
        <div class="w-full md:mx-5">
            <div class="flex items-center justify-between mt-5 ml-2 text-2xl text-orange-800 font-bold">
                <div> สาขาวิชา{{ branch.name_th }} </div>
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
                <template v-for="(mainMenu, index) in branchMainMenu" :key="mainMenu.main_header_id" :index="index">
                    <li v-if="mainMenu.status" class="mb-2 mx-2 last:mr-0 flex-auto text-left">
                        <a class="transition duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-104 text-xl font-bold uppercase px-5 py-2 shadow-lg rounded leading-normal flex items-center cursor-pointer" v-on:click="toggleTabs(mainMenu.main_header_id, index)" v-bind:class="{'text-blue-600 bg-white': openTab !== mainMenu.main_header_id, 'text-white bg-blue-600': openTab === mainMenu.main_header_id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                            </svg>

                            <div class="border-b-2">{{ mainMenu.main_header_name_th }}</div>
                        </a>

                        <!-- แสดงผลข้อมูลสำหรับแต่ละ เมนูย่อยของ เมนูหลัก -->
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded" v-bind:class="[mainMenu.isActive ? 'block' : 'hidden']">
                            <div class="px-4 py-5 flex-auto">
                                <div class="tab-content tab-space">
                                    <div v-if="mainMenu.component_name === 'BtAbout'">
                                        <template v-for="subMenu in branchSubMenu" :key="subMenu.sub_header_id">
                                            <div v-if="subMenu.status && subMenu.main_header_id === 1" class="mb-5" >
                                                <div class="flex items-center ">
                                                    <div class="text-blue-600 font-bold text-lg">{{ subMenu.sub_header_name_th }}</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                <!-- <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl ql-editor" v-html="sub_header.html_content"></div> -->
                                                <div class="ql-container ql-snow ">
                                                    <div class="ql-editor" v-html="subMenu.detail_html"></div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div v-if="mainMenu.component_name === 'BtEdu'">
                                        <template v-for="subMenu in branchSubMenu" :key="subMenu.sub_header_id">
                                            <div v-if="subMenu.status && subMenu.main_header_id === 2 && !richTextMenu.includes(subMenu.sub_header_name_th)" class="mb-5" >
                                                <div class="flex items-center">
                                                    <div class="text-blue-600 font-bold text-lg">{{ subMenu.sub_header_name_th }}</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                <!-- <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl ql-editor" v-html="sub_header.html_content"></div> -->
                                                <!-- <div class="ql-editor" v-html="subMenu.detail_html"></div> -->
                                                <div class="flex flex-col space-y-4">

                                                    <template v-if="subMenu?.attach_files">
                                                        <div v-for="(at, index) in subMenu.attach_files" :key="index" class="flex flex-col items-center border mt-2">
                                                            <div class="flex items-center place-self-start">
                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 256 256" xml:space="preserve">
                                                                    <g transform="translate(128 128) scale(0.72 0.72)" style="">
                                                                        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                                                                            <path d="M 11.194 73.946 v 11.506 c 0 2.508 2.04 4.548 4.548 4.548 h 58.517 c 2.508 0 4.548 -2.04 4.548 -4.548 V 20.496 c 0 -1.214 -0.473 -2.356 -1.332 -3.216 L 61.526 1.332 C 60.667 0.473 59.525 0 58.31 0 H 15.742 c -2.508 0 -4.548 2.04 -4.548 4.548 V 43.16 l 0 0 V 73.946 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(220,223,225); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                                            <path d="M 11.194 62.716 v 11.23 v 11.506 c 0 2.508 2.04 4.548 4.548 4.548 h 58.517 c 2.508 0 4.548 -2.04 4.548 -4.548 V 62.716 H 11.194 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(234,84,64); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                                            <polygon points="60.27,18.41 78.81,36.88 78.73,19.73 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,203,210); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
                                                                            <path d="M 77.474 17.28 L 61.526 1.332 c -0.675 -0.676 -1.529 -1.102 -2.453 -1.258 v 15.382 c 0 2.358 1.919 4.277 4.277 4.277 h 15.382 C 78.576 18.81 78.15 17.956 77.474 17.28 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(171,178,184); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                                            <path d="M 28.384 54.013 c -0.975 0 -1.617 -0.521 -1.969 -0.927 l -0.153 -0.237 c -0.731 -1.587 -1.05 -4.074 1.585 -6.904 c 2.191 -2.352 5.948 -4.403 10.226 -5.974 c 1.533 -2.849 2.967 -5.907 4.113 -8.825 c -2.735 -4.496 -3.877 -9.224 -2.75 -12.321 c 0.598 -1.644 1.835 -2.678 3.484 -2.913 l 0.141 -0.01 c 1.802 0 3.046 1.04 3.505 2.927 c 0.643 2.649 -0.341 7.154 -2.165 12.069 c 0.722 1.102 1.562 2.202 2.52 3.269 c 0.895 1.08 1.81 2.053 2.725 2.923 c 4.618 -0.64 8.813 -0.58 11.377 0.388 c 2.61 0.985 3.199 2.638 3.234 3.852 v 0.02 c 0.013 1.579 -0.773 2.774 -2.158 3.279 c -2.785 1.017 -8.033 -0.816 -13.155 -5.45 c -3.123 0.496 -6.419 1.315 -9.465 2.381 c -3.188 5.785 -6.785 10.645 -9.375 11.982 C 29.443 53.882 28.872 54.013 28.384 54.013 z M 28.016 51.87 c 0.16 0.141 0.458 0.261 1.17 -0.105 c 1.955 -1.009 4.701 -4.577 7.346 -9.059 c -3.032 1.31 -5.612 2.874 -7.222 4.602 C 27.828 48.9 27.403 50.395 28.016 51.87 z M 51.633 38.827 c 4.195 3.348 8.097 4.538 9.778 3.923 c 0.396 -0.145 0.85 -0.432 0.845 -1.375 c -0.01 -0.337 -0.058 -1.316 -1.94 -2.026 C 58.329 38.6 55.191 38.467 51.633 38.827 z M 43.521 33.146 c -0.81 1.969 -1.731 3.967 -2.717 5.907 c 2.102 -0.644 4.271 -1.172 6.397 -1.567 c -0.606 -0.631 -1.206 -1.302 -1.795 -2.013 C 44.731 34.722 44.101 33.943 43.521 33.146 z M 43.132 17.904 c -0.882 0.147 -1.477 0.673 -1.816 1.605 c -0.719 1.975 -0.145 5.453 1.781 9.167 c 1.34 -3.902 2.018 -7.339 1.524 -9.374 C 44.334 18.119 43.742 17.917 43.132 17.904 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(234,84,64); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                                            <path d="M 33.092 68.571 h -4.374 c -0.552 0 -1 0.447 -1 1 v 8.091 v 5.541 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 v -4.541 h 3.374 c 2.117 0 3.838 -1.722 3.838 -3.838 v -2.415 C 36.93 70.293 35.208 68.571 33.092 68.571 z M 34.93 74.824 c 0 1.014 -0.825 1.838 -1.838 1.838 h -3.374 v -6.091 h 3.374 c 1.014 0 1.838 0.824 1.838 1.838 V 74.824 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                                            <path d="M 45.351 84.203 H 41.27 c -0.552 0 -1 -0.447 -1 -1 V 69.571 c 0 -0.553 0.448 -1 1 -1 h 4.082 c 2.278 0 4.13 1.853 4.13 4.13 v 7.371 C 49.481 82.35 47.629 84.203 45.351 84.203 z M 42.27 82.203 h 3.082 c 1.174 0 2.13 -0.956 2.13 -2.131 v -7.371 c 0 -1.175 -0.956 -2.13 -2.13 -2.13 H 42.27 V 82.203 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                                            <path d="M 61.282 68.571 H 54.07 c -0.553 0 -1 0.447 -1 1 v 13.632 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 v -5.816 h 3.723 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 H 55.07 v -4.815 h 6.212 c 0.553 0 1 -0.447 1 -1 S 61.835 68.571 61.282 68.571 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <div class="px-2">{{ at.orig_name }}</div>
                                                                <button @click="dlClick( at.unique_name, at.orig_name )" class="border rounded-md shadow-md bg-emerald-400 px-2 py-1 my-1">Download</button>
                                                            </div>

                                                            <div class="hidden md:block">
                                                                <EduContentPdfViewer
                                                                    :allPages="false"
                                                                    :pdfFile="`${subMenu.json_array_field_transform[index].url}`"
                                                                />
                                                            </div>

                                                            <!-- <embed :src="`${subMenu.json_array_field_transform[index].url}`" width="800px" height="800px" /> -->
                                                            <!-- <embed :src="`${baseUrl}/storage/${at.unique_name}`" width="800px" height="800px" /> -->
                                                        </div>
                                                    </template>

                                                </div>
                                            </div>
                                            <div v-else-if="subMenu.status && subMenu.main_header_id === 2">
                                                <div class="flex items-center">
                                                    <div class="text-blue-600 font-bold text-lg">{{ subMenu.sub_header_name_th }}</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div class="ql-container ql-snow ">
                                                    <div class="ql-editor" v-html="subMenu.detail_html"></div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <BtProfessor v-if="mainMenu.component_name === 'BtProfessor'" :division_id="parseInt(branch.division_id)" :division_name="branch.name_th" />
                                    <BtDoctor v-if="mainMenu.component_name === 'BtDoctor'" :division_id="parseInt(branch.division_id)" />
                                    <BtOfficer v-if="mainMenu.component_name === 'BtOfficer'" :division_id="parseInt(branch.division_id)" />
                                    <BtResearch v-if="mainMenu.component_name === 'BtResearch'" :division_id="parseInt(branch.division_id)" :branchSubMenu="getOneBranchSubMenu( mainMenu.main_header_id )" display_content="" />
                                    <BtBranchService v-if="mainMenu.component_name === 'BtBranchService'" :division_id="parseInt(branch.division_id)" :branchSubMenu="getOneBranchSubMenu( mainMenu.main_header_id )" display_content="" />
                                    <BtAcademicService v-if="mainMenu.component_name === 'BtAcademicService'" :division_id="parseInt(branch.division_id)" :branchSubMenu="getOneBranchSubMenu( mainMenu.main_header_id )" display_content="" />
                                    <BtLink v-if="mainMenu.component_name === 'BtLink'" :division_id="parseInt(branch.division_id)" :branchSubMenu="getOneBranchSubMenu( mainMenu.main_header_id )" display_content="" />
                                    <BtContact v-if="mainMenu.component_name === 'BtContact'" :division_id="parseInt(branch.division_id)" :branchSubMenu="getOneBranchSubMenu( mainMenu.main_header_id )" display_content="" />
                                    <!-- <BtEduEditor v-if="mainMenu.component_name === 'BtEduEditor'" :division_id="parseInt(branch.division_id)" :branchSubMenu="getOneBranchSubMenu( mainMenu.main_header_id )" display_content="" /> -->
                                </div>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
<!--</AppLayout>-->
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import { ref, onMounted } from 'vue'
import EduContentPdfViewer from '@/Components/PdfViewer/EduContentPdfViewer.vue'
import BtProfessor from '@/Components/BranchTemplate/BtProfessor.vue'
import BtDoctor from '@/Components/BranchTemplate/BtDoctor.vue'
import BtOfficer from '@/Components/BranchTemplate/BtOfficer.vue'
import BtResearch from '@/Components/BranchTemplate/BtResearch.vue'
import BtBranchService from '@/Components/BranchTemplate/BtBranchService.vue'
import BtAcademicService from '@/Components/BranchTemplate/BtAcademicService.vue'
import BtLink from '@/Components/BranchTemplate/BtLink.vue'
import BtContact from '@/Components/BranchTemplate/BtContact.vue'
// import BtEduEditor from '@/Components/BranchTemplate/BtEduEditor.vue'

const props = defineProps({
    branch: { type: Object, required: true },
    branch_main_menu: { type: Array, required: true },
    branch_sub_menu: { type: Array, required: true }
})

onMounted(() => {
    branchMainMenu.value = props.branch_main_menu
    branchSubMenu.value =  props.branch_sub_menu
})

const richTextMenu = ['ข้อมูลทั่วไป']

const branchMainMenu = ref([])
const branchSubMenu = ref([])

const openTab = ref()
const baseUrl = ref(base_url)

const toggleTabs = (tabNumber, index) => {
    openTab.value = tabNumber
    branchMainMenu.value[index].isActive = !branchMainMenu.value[index].isActive

}

const allTabExpandOrCollapse = ( flag ) => {
    branchMainMenu.value.forEach(element => {
        element.isActive = flag
    });
}

// const getBranchSubMenu = ( main_header_id ) => {
//     return branchSubMenu.value.filter( (item) => { return item.main_header_id === main_header_id }) // เอาทุกค่าที่ match
// }

const getOneBranchSubMenu = ( main_header_id ) => {
    let subMenu
    subMenu = branchSubMenu.value.find( item => item.main_header_id === main_header_id) // เอาค่าแรกที่เจอค่าเดียว
    //console.log(subMenu)
    return subMenu
}

const dlClick = ( pdfFile, origName ) => {
    axios({
            url: route('edu_content_download_pdf'),
            method: 'GET',
            params: {
                pdf_file: pdfFile,
                t: new Date().getTime()
            },
            responseType: 'arraybuffer',
        }).then((response) => {
            //console.log(response)
            let blob = new Blob([response.data], {
                type: 'application/pdf'
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = origName
            link.click()
        });
}

</script>

<style scoped>

</style>
