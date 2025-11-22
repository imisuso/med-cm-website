<template>
    <div v-if="!branchSubMenu">
        <ComingSoon />
    </div>

    <div v-else-if="display_content === 'template'" class="flex flex-col">
        <div class="grow">
            <QuillRichTextEditor
                v-model="content"
                :readOnly="readOnly"
                @image-added="handleImageAdded"
                @image-removed="handleImageRemoved"
                @update:html="(html) => form.detail_html = html"
            />
        </div>

<!--        <div class="grow" v-html="form.detail_html"></div>-->

        <div class="mt-2 flex items-center">
            <button v-show="readOnly" @click="editContent" class="flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                แก้ไข
            </button>

            <div v-show="!readOnly" class="flex">
                <button @click="confirmChange" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    บันทึก
                </button>
                <button @click="cancelEditContent" class="flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2">
                    <svg class="h-5 w-5 mr-1 text-red-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    ยกเลิก
                </button>
            </div>
        </div>
    </div>

    <div v-else class="flex flex-col ">
        <div class="grow">
            <QuillRichTextEditor v-model="branchSubMenu.detail_delta" read-only />
        </div>
    </div>

</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useForm } from '@inertiajs/vue3'
import QuillRichTextEditor from '@/Components/RichTextEditor.vue';
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import ComingSoon from '@/Components/ComingSoon.vue'
import Swal from "sweetalert2";
import axios from 'axios';

const props = defineProps({
    division_id: { type: Number, required: true  },
    branchSubMenu: { type: Object, required: true },
    display_content: { type: String, required: true}
})

// --- State ---
// ใช้ content รับค่าจาก Prop Delta (ถ้าไม่มีให้เป็น object ว่าง)
const content = ref(props.branchSubMenu.detail_delta ? JSON.parse(props.branchSubMenu.detail_delta) : { ops: [] });
const readOnly = ref(true);
const baseUrl = ref(base_url) // ถ้ามี global var

// เก็บ URL ของรูปใหม่ที่เพิ่ง Upload เข้ามาใน Session นี้
const uploadedImages = ref([]);
// เก็บ URL ของรูปที่ User ลบออกจาก Editor (เตรียมรอการลบจริง)
const removedImages = ref([]);

const form = useForm({
    id: null,
    detail_delta: null,
    // ให้ค่าเริ่มต้นเป็น HTML เดิมที่มีอยู่ (เผื่อ User ไม่ได้แก้ จะได้ส่งค่าเดิมกลับไป)
    detail_html: props.branchSubMenu.detail_html || '',
})

const toast = (severity, summary, detail) => {
    createToast({ title: summary, description: detail }, { type: severity, timeout: 3000 })
}

// --- Handlers ---

const editContent = () => {
    readOnly.value = false;
}

const cancelEditContent = () => {
    // 1. Reset Content กลับไปเป็นค่าเดิมจาก Database
    content.value = props.branchSubMenu.detail_delta ? JSON.parse(props.branchSubMenu.detail_delta) : { ops: [] };

    // 2. [LOGIC การลบรูปขยะ]
    // ถ้ายกเลิกการแก้ไข -> รูปที่ "เพิ่ง Upload มาใหม่" (uploadedImages) ถือเป็นขยะทันที ต้องลบทิ้ง
    if (uploadedImages.value.length > 0) {
        deleteFromServer(uploadedImages.value);
    }

    // 3. Reset State
    uploadedImages.value = [];
    removedImages.value = [];
    readOnly.value = true;
}

const confirmChange = () => {
    Swal.fire({
        title: `คุณต้องการจัดเก็บข้อมูล ใช่ หรือ ไม่ ?`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            saveContent()
        }
    })
}

const saveContent = () => {
    form.id = props.branchSubMenu.id

    // [สำคัญ] แปลง Object Delta กลับเป็น String เพื่อส่งเข้าหลังบ้าน
    form.detail_delta = JSON.stringify(content.value);

    // แต่ถ้า form.detail_html ยังเป็น null (กรณี User ไม่ได้แก้อะไรเลย)
    // เราอาจจะต้องกันเหนียว โดยการใช้ค่าเดิม หรือถ้า content เปลี่ยน logic event ก็จะทำงาน
    if (!form.detail_html && props.branchSubMenu.detail_html) {
        form.detail_html = props.branchSubMenu.detail_html;
    }

    // สำคัญ: ใช้ html ล่าสุดที่ได้จาก event @update:html
    // (สมมติว่าคุณรับค่ามาเก็บในตัวแปร htmlContent หรือ form.detail_html แล้ว)
    const finalHtml = form.detail_html || '';

    form.patch(route('admin.update_content_branch_sub_menu', form.id), {
        preserveState: false,
        onSuccess: () => {
            toast('success', 'สำเร็จ', 'จัดเก็บข้อมูลเรียบร้อย')

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
            // ... handle error
            toast('danger', 'Error', 'บันทึกไม่สำเร็จ');
        },
        onFinish: () => {
            form.reset()
            readOnly.value = true
        }
    })
}

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

const deleteFromServer = ( files ) => {
    // เรียก API ลบไฟล์
    axios.post(route('delete_file_api'), { imgFiles: files })
        .then(res => console.log('Deleted:', res.data))
        .catch(err => console.error(err));
}

</script>
