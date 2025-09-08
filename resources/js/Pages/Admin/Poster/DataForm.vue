<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-4 w-full border border-gray-200 rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">{{ actionWord }}ข้อมูลโปสเตอร์</div>
                <Link :href="route('admin.poster')" method="get" as="button" type="button"
                    class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded-sm cursor-pointer hover:bg-green-800"
                >
                    กลับหน้าหลัก
                </Link>
            </div>

            <div class="text-gray-900 text-lg underline font-medium dark:text-white mb-4">
                รายละเอียดข้อมูลโปสเตอร์
            </div>

            <div class="shadow-sm overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <fieldset>
                        <div class="grid grid-cols-6 gap-6 mb-6">
                            <div class="col-span-6">
                                <div class="flex items-center justify-between">
                                    <label for="desc" class="block text-sm font-medium text-gray-700">รายละเอียดโปสเตอร์</label>

                                </div>
                                <input type="text" id="desc" v-model.trim="posterForm.desc" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-xs sm:text-sm border-gray-300 rounded-md" />
                            </div>

                            <ul class="col-span-6">
                                <li v-for="(file, index) in attachments" :key="index">
                                    <div class="my-1">
                                        <div class="flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md">
                                            <div class="flex flex-col ">
                                                <div class="p-2"><strong>ชื่อไฟล์ : </strong>{{file.name}}</div>
                                                <!-- <div class="p-2"><p><strong>ขนาด : </strong>{{file.size}} kb</p></div> -->
                                            </div>
                                            <div class="flex items-center m-2 sm:m-1">
                                                <label>
                                                <span class="p-2 mt-2 text-sm cursor-pointer rounded-lg shadow-lg border text-white border-indigo-500 bg-blue-700 hover:bg-blue-800 hover:text-white">{{file.label}}</span>
                                                <!-- <input :id="'file-'+index" type="file" accept="image/*" @change="uploadFile(index, file, $event)" style="display:none"> -->
                                                <input :id="'file-'+index" type="file" :accept="file.accept" @change="uploadFile(index, file, $event)" style="display:none">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div class="flex flex-row mt-2 space-x-4">
                <button v-if="action === 'insert'" type="button" @click="savePoster" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
                <button v-if="action === 'update'" type="button" @click="true" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
                <!-- <button v-if="action === 'delete'" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ลบ</button> -->
                <Link :href="route('admin.poster')" method="get" as="button" type="button"
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
import { ref, reactive } from 'vue'
import { useForm, Link } from '@inertiajs/vue3'

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const props = defineProps({
    action: { type: String, require: true, default: "insert" },
    poster: { type: Object },
})

const actionWord = ref(null)
const checkFileSize = ref(false)
const checkCoverFile = ref(false)
const checkContentFile = ref(false)
const attachments = reactive([
                        { name: "", size: 0, label: "เพิ่มรูปหน้าปก", accept: ".jpg,.jpeg"},
                        { name: "", size: 0, label: "เพิ่มไฟล์เนื้อหา", accept: ".jpg,.jpeg,.pdf"}
                    ])

switch(props.action) {
    case 'insert':
        actionWord.value = "เพิ่ม"
        break;
    case 'update':
        actionWord.value = "แก้ไข"
        break;
    case 'delete':
        actionWord.value = "ลบ"
        break;
}

const posterForm = useForm({
    id: props.poster ? props.poster.id : null,
    desc: props.poster ? props.poster.desc : null,
    cover: '',
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

const uploadFile = (index, file, e) => {
  let f = e.target.files[0];

  //console.log(f)
  file.File = f;
  file.name = f.name;
  file.size = f.size;

  if (file.size > 1024 * 1024 * 16) {
    checkFileSize.value = false
    toast('warning', 'คำเตือน', 'เพิ่มไฟล์ไม่ได้ เนื่องจากไฟล์ของคุณมีขนาดใหญ่กว่า 16MB')
  } else {
      checkFileSize.value = true
  }

  if( index === 0 ) {
      if( !f.type.match('image/jp.*') ) {
          checkCoverFile.value = false
          toast('warning', 'คำเตือน', 'เพิ่มไฟล์หน้าปกไม่ได้ เนื่องจากอนุญาตให้แนบไฟล์เฉพาะ .jpg เท่านั้น')
      } else {
          checkCoverFile.value = true
      }
  } else {
      if( ! (f.type.match('image/jp.*') || f.type.match('application/pdf')) ) {
          checkContentFile.value = false
          toast('warning', 'คำเตือน', 'เพิ่มไฟล์เนื้อหาไม่ได้ เนื่องจากอนุญาตให้แนบไฟล์เฉพาะ .jpg หรือ PDF เท่านั้น')
      } else {
          checkContentFile.value = true
      }
  }
}

const savePoster = () => {
    let error_display = ''
    if(posterForm.id) {  // Update
    } else { // Insert
        posterForm.transform(data => ({
            ...data,
            //   atFiles: attachments.map(file => file.File)
            cover: attachments[0].File,
            content: attachments[1].File
        })).post(route('admin.poster.store'), {
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'จัดเก็บข้อมูลโปสเตอร์ เรียบร้อย')
            },
            onError: (errors) => {
                for ( let p in errors ) {
                    error_display = error_display + `- ${errors[p]}<br/>`
                }
                toast('danger', 'พบข้อผิดพลาด', error_display);
            },
            onFinish: () => {
                posterForm.processing = false
            }
        });
    }
}

// const save = () => {
//     if(form.id) {  // Edit
//         form.post(route('admin.download.update', form.id), {
//             preserveState: true,
//             preserveScroll: true,
//             onSuccess: () => {
//                 toast('success', 'สำเร็จ', 'แก้ไขรายละเอียดข้อมูลดาวน์โหลด เรียบร้อย');
//             },
//             onError: (errors) => {
//                 //console.log(errors)
//                 if( errors.msg ) {
//                     toast('danger', errors.msg, errors.sysmsg);
//                 } else {
//                     toast('danger', 'เกิดข้อผิดพลาด', 'ระบุรายละเอียดไม่ถูกต้องหรือไม่ครบถ้วน กรุณาตรวจสอบข้อมูลทุกครั้งก่อนทำการแก้ไข');
//                 }
//             },
//             onFinish: () => {
//                 form.processing = false
//             }
//         });
//     } else {
//         form.post(route('admin.download.store'), {
//             preserveState: true,
//             preserveScroll: true,
//             onSuccess: () => {
//                 toast('success', 'สำเร็จ', 'จัดเก็บรายละเอียดข้อมูลดาวน์โหลด เรียบร้อย');
//             },
//             onError: (errors) => {
//                 //console.log(errors)
//                 if( errors.msg ) {
//                     toast('danger', errors.msg, errors.sysmsg);
//                 } else {
//                     toast('danger', 'เกิดข้อผิดพลาด', 'ระบุรายละเอียดไม่ถูกต้องหรือไม่ครบถ้วน กรุณาตรวจสอบข้อมูลทุกครั้งก่อนทำการจัดเก็บ');
//                 }
//             },
//             onFinish: () => {
//                 form.processing = false
//             }
//         });
//     }
// }

</script>

<style scoped>
</style>
