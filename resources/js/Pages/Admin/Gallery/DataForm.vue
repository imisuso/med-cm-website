<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-4 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">{{ actionWord }}ข้อมูลแกลลอรี่รูปกิจกรรม</div>
                <Link :href="route('admin.gallery')" method="get" as="button" type="button"
                    class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                >
                    กลับหน้าหลัก
                </Link>
            </div>

            <div class="text-gray-900 text-lg underline font-medium dark:text-white mb-4">
                รายละเอียดข้อมูลแกลลอรี่รูปกิจกรรม
            </div>

            <div class="shadow sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <fieldset>
                        <div class="grid grid-cols-6 gap-6 mb-6">
                            <div class="col-span-6">
                                <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">วันที่จัดกิจกรรม</label>
                                <Datepicker
                                    menu-class-name="shadow-lg shadow-stone-800/50"
                                    placeholder="default 30 วัน"
                                    v-model="galleryForm.event_date"
                                    locale="th"
                                    cancelText="ยกเลิก"
                                    selectText="เลือก"
                                    :yearRange="[new Date().getFullYear() - 5, new Date().getFullYear()]"
                                    :enableTimePicker="false"
                                    :format="dateFormat"
                                    :previewFormat="dateFormat"
                                    :maxDate="new Date()"
                                    :clearable="false"
                                    :auto-position="true"
                                    autoApply
                                >
                                    <template #year="{ value }">
                                        {{ parseInt(value)+543  }}
                                    </template>

                                    <template #year-overlay-value="{ text, value }">
                                        {{ parseInt(text)+543 }}
                                    </template>
                                </Datepicker>
                            </div>

                            <div class="col-span-6">
                                <div class="flex items-center justify-between">
                                    <label for="desc" class="block text-sm font-medium text-gray-700">รายละเอียดกิจกรรม</label>

                                </div>
                                <input type="text" id="desc" v-model.trim="galleryForm.desc" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
                <button v-if="action === 'create'" type="button" @click="saveGallery" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
                <button v-if="action === 'edit'" type="button" @click="saveGallery" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
                <Link :href="route('admin.gallery')" method="get" as="button" type="button"
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
import { ref, reactive, computed, defineAsyncComponent } from 'vue'
import { useForm, Link } from '@inertiajs/vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const props = defineProps({
    action: { type: String, require: true, default: "create" },
    gallery: { type: Object },
})

const MonthYear = defineAsyncComponent(() => import('@/Components/MonthYearCustom.vue'));
const monthYear = computed(() => MonthYear);

dayjs.extend(buddhistEra)

const actionWord = ref(null)
const checkFileSize = ref(false)
const checkCoverFile = ref(false)
const attachments = reactive([
                        { name: "", size: 0, label: "รูปหน้าปก", accept: ".jpg,.jpeg"}
                    ])

switch(props.action) {
    case 'create':
        actionWord.value = "เพิ่ม"
        break;
    case 'edit':
        actionWord.value = "แก้ไข"
        break;
}

const galleryForm = useForm({
    id: props.gallery ? props.gallery.id : null,
    desc: props.gallery ? props.gallery.desc : null,
    event_date: props.gallery ? dayjs(props.gallery.event_date).startOf('day').toDate() : dayjs().startOf('day').toDate()
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

const dateFormat = (date) => {
    return dayjs(date).locale('th').format('วันddddที่ D MMMM BBBB')
}

const uploadFile = (index, file, e) => {
  let f = e.target.files[0];

  file.File = f;
  file.name = f.name;
  file.size = f.size;

  if (file.size > 1024 * 1024 * 2) {
    checkFileSize.value = false
    toast('warning', 'คำเตือน', 'เพิ่มไฟล์ไม่ได้ เนื่องจากไฟล์ของคุณมีขนาดใหญ่กว่า 2MB')
  } else {
      checkFileSize.value = true
  }

  if( index === 0 ) {
      if( !f.type.match('image/jp.*') ) {
          checkCoverFile.value = false
          toast('warning', 'คำเตือน', 'เพิ่มไฟล์แนบไม่ได้ เนื่องจากอนุญาตให้แนบไฟล์เฉพาะ .jpg เท่านั้น')
      } else {
          checkCoverFile.value = true
      }
  }
}

const saveGallery = () => {
    let error_display = ''
    if(galleryForm.id) {  // Update
      galleryForm.transform(data => ({
          ...data,
          event_date: dayjs(data.event_date).format("YYYY-MM-DD HH:mm:ss"),
          cover: attachments[0].File
      })).post( route('admin.gallery.update', galleryForm.id), {
        _method: 'patch',
        preserveState: true,
        onSuccess: () => {
          toast('success', 'สำเร็จ', 'แก้ไขข้อมูลแกลลอรี่รูปกิจกรรม เรียบร้อย')
        },
        onError: (errors) => {
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
          galleryForm.processing = false
        }
      })
    } else { // Insert
      galleryForm.transform(data => ({
        ...data,
        //   atFiles: attachments.map(file => file.File)
        event_date: dayjs(data.event_date).format("YYYY-MM-DD HH:mm:ss"),
        cover: attachments[0].File
      })).post(route('admin.gallery.store'), {
        preserveState: true,
        onSuccess: () => {
          toast('success', 'สำเร็จ', 'สร้างแกลลอรี่รูปกิจกรรม เรียบร้อย')
        },
        onError: (errors) => {
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
          galleryForm.processing = false
        }
      });
    }
}

</script>

<style scoped>
</style>
