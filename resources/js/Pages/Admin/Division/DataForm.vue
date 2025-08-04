<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border border-gray-200 rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">{{ actionWord }}สาขา / หน่วยงาน</div>
                <Link :href="route('admin.division')" method="get" as="button" type="button"
                    class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded-sm cursor-pointer hover:bg-green-800"
                >
                    กลับหน้าหลัก
                </Link>
            </div>

            <div class="text-gray-900 text-lg underline font-medium dark:text-white mb-4">
                รายละเอียดข้อมูลของ สาขา/หน่วยงาน
            </div>

            <div class="flex flex-col border rounded-lg shadow-lg p-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        รูปสาขา/หน่วยงาน
                    </label>
                    <div class="mt-2 flex items-center">
                    <span class="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                        <img v-if="! url" :src="`${baseUrl}/fallbackimage/default-blank-image.jpg`" class="h-20 w-20 rounded-full"/>
                        <img v-else :src="url" class="h-20 w-20 rounded-full">
                    </span>
                    <label class="flex flex-col w-24 items-center mx-2 px-2 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white">
                        <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">เลือกรูป</span>
                        <input type="file" @input="divisionForm.image = $event.target.files[0]" @change="previewImage" class="hidden">
                    </label>
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-2 md:gap-6 mt-6 mb-6">
                    <label for="division_id" class="col-span-6 md:col-span-2 mr-2 self-end">ลำดับแสดงผล :</label>
                    <input type="number" id="division_id" v-model="divisionForm.display_order" required="true" class="col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-xs sm:text-sm border-gray-300 rounded-md">

                    <label for="division_id" class="col-span-6 md:col-span-2 mr-2 self-end">เลข สาขา/หน่วยงาน :</label>
                    <input type="number" id="division_id" v-model="divisionForm.division_id" required="true" class="col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-xs sm:text-sm border-gray-300 rounded-md">

                    <label for="name_thai" class="col-span-6 md:col-span-2 mr-2 self-end">ชื่อ สาขา/หน่วยงาน (ไทย) :</label>
                    <input type="text" id="name_thai" v-model="divisionForm.name_th" required="true" class="col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-xs sm:text-sm border-gray-300 rounded-md">

                    <label for="name_eng" class="col-span-6 md:col-span-2 mr-2 self-end">ชื่อ สาขา/หน่วยงาน (อังกฤษ) :</label>
                    <input type="text" id="name_eng" v-model="divisionForm.name_en" required="true" class="col-span-6 md:col-span-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-xs sm:text-sm border-gray-300 rounded-md">

                </div>
                <fieldset class="py-3">
                    <div>
                        <legend class="text-base font-medium text-gray-900">ประเภท :</legend>
                        <p class="text-sm text-gray-500">กรุณาเลือกระหว่าง สาขา หรือ หน่วยงาน</p>
                    </div>
                    <div class="mt-4 space-y-4">
                        <div class="flex items-center">
                            <input id="branch" type="radio" value="b" v-model="divisionForm.type" :checked="divisionForm.type === 'b'" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                            <label for="branch" class="ml-3 block text-sm font-medium text-gray-700">
                                สาขา
                            </label>
                        </div>
                        <div class="flex items-center">
                            <input id="unit" type="radio" value="u" v-model="divisionForm.type" :checked="divisionForm.type === 'u'" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                            <label for="unit" class="ml-3 block text-sm font-medium text-gray-700">
                                หน่วยงาน
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>

            <div class="flex flex-row mt-2 space-x-4">
                <button v-if="action === 'insert'" type="button" @click="saveDivision" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
                <button v-if="action === 'edit'" type="button" @click="saveDivision" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
                <Link :href="route('admin.division')" method="get" as="button" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                    ยกเลิก
                </Link>
            </div>

        </div>
<!--    </AdminAppLayout>-->
</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
    export default {
        layout: AdminAppLayout,
    }
</script>

<script setup>
import { ref } from 'vue'
import { useForm, Link } from '@inertiajs/vue3'

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const props = defineProps({
    action: { type: String, require: true, default: "insert" },
    division: { type: Object },
})

const actionWord = ref(null)
const baseUrl = ref(base_url)
const url = props.division ? ref(props.division.image_url) : ref(null)
const oldimage = props.division ? ref(props.division.image) : ref(null)

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

const divisionForm = useForm({
  id: props.division ? props.division.id : null,
  display_order : props.division ? props.division.display_order : 999,
  division_id: props.division ? props.division.division_id : null,
  type: props.division ? props.division.type : null,
  name_th: props.division ? props.division.name_th : null,
  name_en: props.division ? props.division.name_en : null,
  image: null
});

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

const saveDivision = () => {
    let error_display = ''
    if(divisionForm.id) {  // Edit
        divisionForm.transform(data => ({
            ...data,
            oldimage: oldimage.value
        })).post(route('admin.division.update', divisionForm.id), {
            _method: 'patch',
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'แก้ไขข้อมูล สาขา/หน่วยงาน เรียบร้อย');
            },
            onError: (errors) => {
                for ( let p in errors ) {
                    error_display = error_display + `- ${errors[p]}<br/>`
                }
                toast('danger', 'พบข้อผิดพลาด', error_display);
            },
            onFinish: () => {
                divisionForm.processing = false
            }
        });
    } else { // Add
        divisionForm.post(route('admin.division.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'จัดเก็บข้อมูล สาขา/หน่วยงาน เรียบร้อย');
            },
            onError: (errors) => {
                // ใช้งานได้เหมือน code ด้านล่าง
                // for ( let p of Object.keys(errors) ) {
                //     console.log(errors[p])
                // }
                for ( let p in errors ) {
                    error_display = error_display + `- ${errors[p]}<br/>`
                }
                toast('danger', 'พบข้อผิดพลาด', error_display);
                //toast('danger', 'Error', `- ${errors.division_id} <br /> - ${errors.name_th} <br /> - ${errors.type} <br /> - ${errors.msg} <br /> - ${errors.sysmsg}`);
            },
            onFinish: () => {
                divisionForm.processing = false
            }
        });
    }
}

const previewImage = (e) => {
    const file = e.target.files[0];
    if( file ) {
        url.value = URL.createObjectURL(file);
    } else {
        url.value = ""
    }
}

</script>

<style>

</style>
