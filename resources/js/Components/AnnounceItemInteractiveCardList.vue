<template>
    <div v-if="typeDetail === 'list'"
         class="group relative flex flex-col p-5 mb-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-200"
         :class="[announceDetails.publish_status ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-slate-300 bg-slate-50']"
    >
        <div class="flex justify-between items-start mb-2">
            <div class="pr-8">
                <div class="flex flex-wrap gap-2 mb-2">
                    <span v-if="announceDetails.pinned" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        <svg class="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>
                        ปักหมุด
                    </span>
                    <span v-if="announceDetails.publish_status" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        เผยแพร่แล้ว
                    </span>
                    <span v-else class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-600">
                        รอการเผยแพร่
                    </span>
                    <span v-if="announceDetails.attach_files.length > 0" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        {{ announceDetails.attach_files.length }} ไฟล์แนบ
                    </span>
                </div>

                <a :href="route(`announce_details`, announceDetails.slug)" target="_blank" class="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors leading-snug">
                    {{ announceDetails.topic }}
                </a>
            </div>

            <div class="relative shrink-0">
                <button id="dropdownButton" @click.stop="isDropDownOpen = !isDropDownOpen" class="dropbtn p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none">
                    <svg class="w-6 h-6 dropbtn" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </button>

                <div id="dropdown" v-show="isDropDownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-50 overflow-hidden transform origin-top-right transition-all">
                    <ul class="text-sm text-slate-700">
                        <li v-if="!announceDetails.publish_status && $page.props.auth.abilities.includes('publish_unpublish_announce')">
                            <button @click="confirmAnwser('publish', true)" class="flex w-full items-center px-4 py-3 hover:bg-emerald-50 text-emerald-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                เผยแพร่
                            </button>
                        </li>
                        <li v-if="announceDetails.publish_status && $page.props.auth.abilities.includes('publish_unpublish_announce')">
                            <button @click="confirmAnwser('unpublish', true)" class="flex w-full items-center px-4 py-3 hover:bg-orange-50 text-orange-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                ยกเลิกเผยแพร่
                            </button>
                        </li>

                        <li v-if="!announceDetails.pinned && $page.props.auth.abilities.includes('pin_unpin_announce')">
                            <button @click="confirmAnwser('pin', true)" class="flex w-full items-center px-4 py-3 hover:bg-red-50 text-red-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                ปักหมุด
                            </button>
                        </li>
                        <li v-if="announceDetails.pinned && $page.props.auth.abilities.includes('pin_unpin_announce')">
                            <button @click="confirmAnwser('unpin', true)" class="flex w-full items-center px-4 py-3 hover:bg-slate-50 text-slate-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                ยกเลิกปักหมุด
                            </button>
                        </li>

                        <li>
                            <button @click="$emit('edit-announce')" class="flex w-full items-center px-4 py-3 hover:bg-yellow-50 text-yellow-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                แก้ไข
                            </button>
                        </li>
                        <li>
                            <button @click="confirmAnwser('delete', true)" class="flex w-full items-center px-4 py-3 hover:bg-red-50 text-red-600 transition-colors border-t border-slate-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                ลบ
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                {{announceDetails.division.division_type}}{{announceDetails.division.name_th}}
            </div>
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                สร้าง: {{ dayjs(announceDetails.created_at).locale('th').format('D MMM BBBB') }}
            </div>
            <div class="flex items-center" :class="dayjs().isAfter(dayjs(announceDetails.expire_date)) ? 'text-red-500 font-semibold' : ''">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                หมดอายุ: {{ dayjs(announceDetails.expire_date).locale('th').format('D MMM BBBB') }}
            </div>
        </div>
    </div>


    <div v-if="typeDetail === 'full'" class="max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div class="p-8 pb-4 border-b border-slate-100">
            <div v-if="announceDetails.pinned" class="mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600">
                <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>
                ประกาศปักหมุด
            </div>

            <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                {{ announceDetails.topic }}
            </h1>

            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div class="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg">
                    <span class="font-semibold text-slate-700 mr-2">หน่วยงาน:</span>
                    {{announceDetails.division.division_type}}{{ announceDetails.division.name_th }}
                </div>
                <div class="flex items-center">
                    <svg class="h-4 w-4 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span
                        v-if="$page.props.auth && !pdpa_protect"
                        @click="pdpa_protect = !pdpa_protect"
                        @mouseleave="pdpa_protect = true"
                        class="cursor-pointer hover:text-blue-600 border-b border-dashed border-slate-300"
                    >
                        {{ announceDetails.person.title_th }}{{ announceDetails.person.fname_th }} {{ announceDetails.person.lname_th }}
                    </span>
                    <span
                        v-else-if="$page.props.auth && pdpa_protect"
                        @click="pdpa_protect = !pdpa_protect"
                        class="cursor-pointer text-slate-400 hover:text-slate-600"
                    >
                        แสดงชื่อผู้ประกาศ
                    </span>
                </div>
                <div class="flex items-center">
                    <svg class="h-4 w-4 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {{ dayjs(announceDetails.publish_date).locale('th').format('D MMMM BBBB') }}
                </div>
            </div>
        </div>

        <div class="p-8 prose prose-slate max-w-none">
            <QuillRichTextEditor v-model="announceDetails.detail_delta" read-only />
        </div>

        <div v-if="announceDetails.attach_files.length > 0" class="px-8 py-6 bg-slate-50 border-t border-slate-100">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                ไฟล์แนบ ({{announceDetails.attach_files.length}})
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="(atFile, index) in announceDetails.attach_files" :key="index" class="flex items-center p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-blue-400 transition-colors">
                    <div class="shrink-0 mr-3">
                        <DownloadPdfFile
                            :origName="atFile.orig_name"
                            :pdfFile="atFile.unique_name"
                        />
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-medium text-slate-900 truncate" :title="atFile.orig_name">
                            {{ atFile.orig_name }}
                        </p>
                        <p class="text-xs text-slate-500">คลิกไอคอนเพื่อดาวน์โหลด</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <teleport to="body">
        <Modal :isModalOpen="confirmModal" >
            <template v-slot:header>
                <div class="text-slate-900 text-lg font-bold border-b pb-2">
                    ยืนยันการดำเนินการ
                </div>
            </template>

            <template v-slot:body>
                <div class="py-4 text-slate-600">
                    <p class="font-medium text-slate-900 mb-2">{{ announceDetails.topic }}</p>
                    <p>{{ confirmMsg }}</p>
                </div>
            </template>

            <template v-slot:footer>
                <div class="flex justify-end gap-2">
                    <button @click="confirmModal = false" type="button" class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:ring-slate-200">
                        ยกเลิก
                    </button>
                    <button @click="process_announce()" type="button"
                            :class="[confirmType === 'delete' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500']"
                            class="px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-2 focus:ring-offset-2">
                        ตกลง
                    </button>
                </div>
            </template>
        </Modal>
    </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import QuillRichTextEditor from '@/Components/RichTextEditor.vue';
import Modal from '@/Components/Modal.vue'
import DownloadPdfFile from '@/Components/DownloadPdfFile.vue'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { router } from '@inertiajs/vue3'

onMounted(() => {
    window.addEventListener('click', closeDropdownWhenClickOutSide)
})

onUnmounted(() => {
    window.removeEventListener('click', closeDropdownWhenClickOutSide)
})

const emit = defineEmits(['edit-announce'])

const props = defineProps({
    announceDetails: { type: Object, required: true  },
    typeDetail: { type: String, required: true },
    filter: { type: Object }
})

dayjs.extend(buddhistEra)

const isDropDownOpen = ref(false)
const confirmMsg = ref('')
const confirmType = ref('')
const confirmModal = ref(false)
const pdpa_protect = ref(true)

const confirmAnwser = (type, isOpen) => {
    if( type === "publish" ) {
        confirmMsg.value = "ต้องการเผยแพร่ข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else if( type === "unpublish" ) {
        confirmMsg.value = "ต้องการยกเลิกการเผยแพร่ข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else if( type === "pin" ) {
        confirmMsg.value = "ต้องการปักหมุดข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else if( type === "unpin" ) {
        confirmMsg.value = "ต้องการยกเลิกการปักหมุดข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else if( type === "delete" ) {
        confirmMsg.value = "ต้องการลบข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else {
        confirmMsg.value = ""
    }

    confirmType.value = type
    confirmModal.value = isOpen
    isDropDownOpen.value = false // ปิด dropdown เมื่อกดเลือก
}

const process_announce = () => {
    let routeName = "";
    let msgProcess ="";
    let method = "get";
    if( confirmType.value === "publish" ) {
        routeName = "admin.announce.toggle_publish";
        msgProcess = "เผยแพร่ข่าวประกาศ";
    } else if( confirmType.value === "unpublish" ) {
        routeName = "admin.announce.toggle_publish";
        msgProcess = "ยกเลิกเผยแพร่ข่าวประกาศ";
    } else if( confirmType.value === "pin" ) {
        routeName = "admin.announce.toggle_pin";
        msgProcess = "ปักหมุดข่าวประกาศ";
    } else if( confirmType.value === "unpin" ) {
        routeName = "admin.announce.toggle_pin";
        msgProcess = "ยกเลิกปักหมุดข่าวประกาศ";
    } else if( confirmType.value === "delete" ) {
        routeName = "admin.announce.delete";
        msgProcess = "ลบข่าวประกาศ";
        method = "post";
    }

    router.visit(route(routeName, props.announceDetails.id),  {
        method: method,
        data: {
            ftopic: props.filter?.ftopic,
            fexpire_type: props.filter?.fexpire_type,
            fdivision_selected: props.filter?.fdivision_selected
        },
        preserveState: true,
        onSuccess: () => {
            toast('success', 'สำเร็จ', `ดำเนินการ${msgProcess}เรียบร้อย`)
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            confirmType.value = ''
            confirmModal.value = false
        }
    })
}

const closeDropdownWhenClickOutSide = (event) => {
    // เช็คว่า click โดนปุ่มหรือ dropdown หรือไม่
    const dropdown = document.getElementById('dropdown');
    const button = document.getElementById('dropdownButton');

    // ถ้าไม่มี element เหล่านี้ (อาจอยู่หน้าอื่น) ให้ข้ามไป
    if (!dropdown || !button) return;

    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        isDropDownOpen.value = false;
    }
}

const toast = (severity, summary, detail) => {
    createToast({
            title: summary,
            description: detail
        },
        {
            showIcon: true,
            transition: 'zoom',
            position: 'top-right',
            type: severity,
            timeout: 3000,
        })
}
</script>

<style scoped>
/* เพิ่ม CSS สำหรับ Rich Text Editor ให้อ่านง่าย */
:deep(.ql-editor) {
    padding: 0;
    font-size: 1rem;
    line-height: 1.75;
    color: #334155; /* slate-700 */
}
</style>
