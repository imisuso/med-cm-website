<template>
    <div class="flex flex-col m-2">
        <div class="mt-2 mb-2 text-lg">{{ sub_header.sub_header_name_th }}</div>
        <div>
            <QuillRichTextEditor
                v-model="content"
                toolbar="full"
                @image-added="handleImageAdded"
                @image-removed="handleImageRemoved"
                @update:html="(html) => contentForm.detail_html = html"
            />

            <div class="flex items-center space-x-2 mt-2 mb-4">
                <button @click="confirmChange" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    บันทึก
                </button>
                <!-- <Link :href="route('admin.show_branch_main_menu', sub_header.division_id)" method="post" as="button" type="button"  preserve-scroll> -->
                    <button @click="cancelEditContent" class="flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10">
                        <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        ยกเลิก
                    </button>
                <!-- </Link> -->
            </div>
        </div>
        <div class="w-full ql-container ql-snow">
            <QuillRichTextEditor
                v-model="contentForm.detail_html"
                read-only
                class="p-4"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {useForm, router} from '@inertiajs/vue3'


import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast
import QuillRichTextEditor from '@/Components/RichTextEditor.vue';
import Swal  from 'sweetalert2';
import axios from "axios";

const props = defineProps({
    sub_header: { type: Object, required: true }
})

const contentForm = useForm({
    id: props.sub_header.id,
    detail_delta: null,
    detail_html: props.sub_header.detail_html || '',
    division_id: props.sub_header.division_id ?? 0,
});

// ใช้ content รับค่าจาก Prop Delta (ถ้าไม่มีให้เป็น object ว่าง)
const content = ref(props.sub_header.detail_delta ? JSON.parse(props.sub_header.detail_delta) : { ops: [] });
// เก็บ URL ของรูปใหม่ที่เพิ่ง Upload เข้ามาใน Session นี้
const uploadedImages = ref([]);
// เก็บ URL ของรูปที่ User ลบออกจาก Editor (เตรียมรอการลบจริง)
const removedImages = ref([]);

// --- Image Handlers (รับ Event จาก Child) ---
const handleImageAdded = (url) => {
    console.log('Image Added:', url);
    uploadedImages.value.push(url);
};

const handleImageRemoved = (url) => {
    console.log('Image Removed:', url);
    // เช็คก่อนว่ารูปนี้มีอยู่ใน removedImages หรือยัง (ป้องกันซ้ำ)
    if (!removedImages.value.includes(url)) {
        removedImages.value.push(url);
    }
};

const cancelEditContent = () => {
    // [LOGIC การลบรูปขยะ]
    // ถ้ายกเลิกการแก้ไข -> รูปที่ "เพิ่ง Upload มาใหม่" (uploadedImages) ถือเป็นขยะทันที ต้องลบทิ้ง
    if (uploadedImages.value.length > 0) {
        deleteFromServer(uploadedImages.value);
    }

    // 3. Reset State
    uploadedImages.value = [];
    removedImages.value = [];

    router.visit(route('admin.show_branch_main_menu', props.sub_header.division_id), {
        method: "post"
    });
}

const deleteFromServer = ( files ) => {
    // เรียก API ลบไฟล์
    axios.post(route('delete_file_api'), { imgFiles: files })
        .then(res => console.log('Deleted:', res.data))
        .catch(err => console.error(err));
}

const confirmChange = () => {
    Swal.fire({
        title: `คุณต้องการจัดเก็บข้อมูล ใช่ หรือ ไม่ ?`,
        showCancelButton: true,
        confirmButtonColor: '#1e40af',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            saveContent()
        } else {
            // cancelEditContent()
            return false
        }
    })
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

const saveContent = () => {

    // [สำคัญ] แปลง Object Delta กลับเป็น String เพื่อส่งเข้าหลังบ้าน
    contentForm.detail_delta = JSON.stringify(content.value);

    // สำคัญ: ใช้ html ล่าสุดที่ได้จาก event @update:html
    // (สมมติว่าคุณรับค่ามาเก็บในตัวแปร htmlContent หรือ contentForm.detail_html แล้ว)
    const finalHtml = contentForm.detail_html || '';

    contentForm.patch(route('admin.richtext_content_update', contentForm.id), {
        preserveState: false,
        onSuccess: () => {
            toast('success', 'แก้ไขสำเร็จ', `แก้ไขข้อมูล ${props.sub_header.sub_header_name_th} เรียบร้อย`)

            // ------------------------------------------------------------
            // [LOGIC การลบรูปจริง]
            // ------------------------------------------------------------

            // กรองรายการที่จะลบจริงๆ:
            // เอาเฉพาะรูปที่อยู่ใน removedImages และ "ต้องไม่มี" อยู่ใน finalHtml แล้วเท่านั้น
            // (เพื่อกันกรณี User เผลอลบ -> แล้วกด Undo รูปจะกลับมา -> เราห้ามลบไฟล์ทิ้ง)
            const imagesToDelete = removedImages.value.filter(url => !finalHtml.includes(url));

            if (imagesToDelete.length > 0) {
                deleteFromServer(imagesToDelete);
            }

            // Reset Arrays
            uploadedImages.value = [];
            removedImages.value = [];
        },
        onError: (errors) => {
          let error_display = ''
          for ( let p in errors ) {
              error_display = error_display + `- ${errors[p]}<br/>`
          }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            contentForm.reset()
        }
    })
}

// const saveContent = () => {
//     contentForm.detail_delta = JSON.stringify(contentForm.detail_delta);
//     contentForm.transform(data => ({
//         ...data,
//         detail_html: htmlContent.value,
//         division_id: props.sub_header.division_id,
//     })).patch( route('admin.richtext_content_update', contentForm.id), {
//         onSuccess: () => {
//           toast('success', 'แก้ไขสำเร็จ', `แก้ไขข้อมูล ${props.sub_header.sub_header_name_th} เรียบร้อย`)
//           if( imgDeleted.length ) {
//               deleteFromServer(imgDeleted)
//           }
//           contentForm.reset()  // ทำการ reset person form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว
//         },
//         onError: (errors) => {
//           let error_display = ''
//           for ( let p in errors ) {
//               error_display = error_display + `- ${errors[p]}<br/>`
//           }
//           toast('danger', 'พบข้อผิดพลาด', error_display);
//         },
//         onFinish: () => {
//           contentForm.processing = false
//           imgDeleted.splice(0)
//           imgInserted.splice(0)
//         }
//     })
// }

</script>
