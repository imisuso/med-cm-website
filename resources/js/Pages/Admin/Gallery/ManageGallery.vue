<template>
    <div class="m-4">
        <div class="flex flex-col space-y-4">
            <div class="flex items-center space-x-4">
                <div class="mt-1 flex items-center">
                    <label :class="{ 'cursor-not-allowed': images_url.length >= 4 || images.length >= limit_image_per_gallery }" class="flex flex-col w-24 items-center mx-2 px-2 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white">
                        <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">เลือกรูป</span>
                        <input
                            type="file"
                            accept="image/jpeg"
                            @change="onFileChange" class="hidden"
                            :disabled="images_url.length >= 4 || images.length >= limit_image_per_gallery"
                        >
                        <!-- <input
                            type="file"
                            multiple
                            accept="image/jpeg"
                            @change="onFileChange" class="hidden"
                            :disabled="images_url.length >= 4"
                        > -->
                    </label>
                </div>

                <div class="text-xl font-bold underline">{{ desc }}</div>
            </div>

            <div class="flex flex-col border border-dashed border-blue-500 p-4 rounded-md">
                <div class="text-lg font-bold">ส่วนแสดงรูปก่อนทำการอัพโหลด</div>
                <div class="text-sm text-gray-600">*** หมายเหตุ รูปต้องเป็นประเภท .jpg หรือ .jpeg เท่านั้น และต้องมีขนาดไม่เกิน 2 MB ต่อรูป</div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
                    <div v-for="(file, index) in images_url" :key="index">
                        <img class=" rounded-md shadow-md" :src="file.file_url" />
                        <button class="p-1 border rounded-md bg-red-700 hover:bg-red-500 text-white hover:text-black" @click="removeImage(index)">ลบรูปที่ {{ index + 1 }}</button>
                    </div>
            </div>
            </div>


            <a :class="{ 'hidden': !images_url.length || images_url.length > 4 || images_url.length + images.length > limit_image_per_gallery }" href="#" @click="uploadImage" >
                <div class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    อัพโหลด
                </div>
            </a>
            <div :class="{ 'hidden': images_url.length && images_url.length <= 4 }" class=" text-red-600 font-bold">กรุณาเลือกรูปอย่างน้อย 1 รูป และไม่เกิน 4 รูปต่อการอัพโหลด 1 ครั้ง</div>
            <div :class="{ 'hidden': images_url.length + images.length <= limit_image_per_gallery }" class=" text-red-600 text-sm">*** เกินจำนวนรูปสูงสุดที่จะเก็บลงใน gallery</div>
        </div>

        <div class="flex flex-col border border-dashed border-green-600 p-4 rounded-md mt-4">
            <div class="flex flex-col md:flex-row items-center justify-between">
                <div class="text-lg font-bold">รูปที่ถูกอัพโหลดเข้าแกลลอรี่แล้ว ( {{ images.length }}/{{ limit_image_per_gallery }} )</div>
                <div class="flex flex-row">
                    <div>เปิด/ปิด การลบรูป</div>
                    <ToggleSwitch v-model:status="delete_gallery_image" @button-is-toggle="delete_gallery_image = !delete_gallery_image" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
                <div v-for="(item, index) in images" :key="index">
                    <img class=" rounded-md shadow-md w-full h-40" :src="item.image_url" alt="">
                    <button :class="{ 'hidden': !delete_gallery_image}" class="p-1 border rounded-md bg-red-700 hover:bg-red-500 text-white hover:text-black" @click="deleteImage(item.image_path)">ลบรูปที่ {{ index + 1 }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import ToggleSwitch from '@/Components/ToggleSwitch.vue'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    id: { type: Number, required: true, default: 0 },
    slug: { type: String, required: true, default: '' },
    desc: { type: String, required: true, default: '' },
    event_date: { type: String, required: true, default: '' },
    images: { type: Array, required: true, default: [] },
    limit: { type: Number, require: true }
})

const limit_image_per_gallery = ref(props.limit)
const delete_gallery_image = ref(false)
const images_url = ref([])
const form = useForm({
    id: props.id,
    desc: props.desc,
    event_date: props.event_date
})

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

const onFileChange = (e) => {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
    return;

    // ตรวจสอบขาดไฟล์ว่าใหญ่เกิน 2 MB หรือไม่
    if (files[0].size > 1024 * 1024 * 2) {
        toast('warning', 'คำเตือน', 'เพิ่มไฟล์รูปไม่ได้ เนื่องจากไฟล์ของคุณมีขนาดใหญ่กว่า 2MB')
        return
    }

    // ตรวจสอบว่าเป็นไฟล์ .jpg หรือ .jpeg หรือไม่
    if( !files[0].type.match('image/jp.*') ) {
        toast('warning', 'คำเตือน', 'เพิ่มไฟล์รูปไม่ได้ อนุญาตให้แนบไฟล์เฉพาะ .jpg เท่านั้น')
        return
    }

    createImage(files);
}

const createImage = (files) => {
    for (var index = 0; index < files.length; index++) {
        //console.log(files[index])
        var reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            images_url.value.push({file_url: imageUrl, File: files[0]});
        }
        reader.readAsDataURL(files[index]);
    }
}

const removeImage = (index) => {
    images_url.value.splice(index, 1)
}

const uploadImage = () => {
    //console.log(images_url.value)
    form.transform(data => ({
        ...data,
        imageFiles: images_url.value.map(file => file.File)
    })).post(route('admin.gallery.upload_image_to_gallery', form.id), {
        _method: 'patch',
        preserveState: true,
        only: ['images'],
        onSuccess: () => {
            toast('success', 'สำเร็จ', 'อัพโหลดรูปเข้าแกลลอรี่ เรียบร้อย')
            form.reset()  // ทำการ reset form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            form.processing = false
        }
    })
    images_url.value.splice(0)
}

const deleteImage = (file_path) => {
    form.transform(data => ({
        ...data,
        file_path: file_path
    })).delete(route('admin.gallery.delete_image'), {
        preserveState: true,
        only: ['images'],
        onSuccess: () => {
            toast('success', 'สำเร็จ', 'ทำการลบรูปจากแกลลอรี่ เรียบร้อย')
            form.reset()  // ทำการ reset form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            form.processing = false
        }
    })
}

</script>

<style>

</style>
