<template>
<!--    <AdminAppLayout>-->
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-4 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">{{ actionWord }}ข้อมูลดาวน์โหลด</div>
                <Link :href="route('admin.download')" method="get" as="button" type="button"
                    class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                >
                    กลับหน้าหลัก
                </Link>
            </div>

            <div class="text-gray-900 text-lg underline font-medium dark:text-white mb-4">
                รายละเอียดข้อมูลดาวน์โหลด
            </div>

            <div class="flex flex-col">
                <label for="title" class="text-gray-600">รายละเอียด :</label>
                <div class="mb-4">
                    <input type="text" id="title" v-model="form.title" required="true" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    <span v-if="$page.props.errors.title" class="p-error">{{ $page.props.errors.title }}</span>
                </div>

                <label for="link" class="text-gray-600">URL ของข้อมูล :</label>
                <div class="mb-4">
                    <input type="text" id="link" v-model="form.link" required="true" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    <span v-if="$page.props.errors.link" class="p-error">{{ $page.props.errors.link }}</span>
                </div>

                <label for="order_number" class="text-gray-600">ลำดับการแสดง :</label>
                <div class="mb-4">
                    <input type="number" id="order_number" v-model="form.order_number" required="true" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    <span v-if="$page.props.errors.order_number" class="p-error">{{ $page.props.errors.order_number }}</span>
                </div>

                <div class="flex items-center mb-4">
                    <div>ปิด</div>
                    <div class="flex justify-between items-center mx-2 cursor-pointer" @click="form.status = ! form.status">
                        <div class="w-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': form.status}">
                            <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-4': form.status,}"></div>
                        </div>
                    </div>
                    <div>เปิด</div>
                </div>
            </div>

            <div class="flex flex-row mt-2 space-x-4">
                <button v-if="action === 'insert'" type="button" @click="save" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
                <button v-if="action === 'update'" type="button" @click="save" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
                <button v-if="action === 'delete'" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ลบ</button>
                <Link :href="route('admin.download')" method="get" as="button" type="button"
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
    item: { type: Object },
})

const actionWord = ref(null)

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

const form = useForm({
  id: props.item ? props.item.id : null,
  title: props.item ? props.item.title : null,
  link: props.item ? props.item.link : null,
  order_number: props.item ? props.item.order_number : null,
  status: props.item ? props.item.status : false
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


const save = () => {
    if(form.id) {  // Edit
        form.post(route('admin.download.update', form.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'แก้ไขรายละเอียดข้อมูลดาวน์โหลด เรียบร้อย');
            },
            onError: (errors) => {
                //console.log(errors)
                if( errors.msg ) {
                    toast('danger', errors.msg, errors.sysmsg);
                } else {
                    toast('danger', 'เกิดข้อผิดพลาด', 'ระบุรายละเอียดไม่ถูกต้องหรือไม่ครบถ้วน กรุณาตรวจสอบข้อมูลทุกครั้งก่อนทำการแก้ไข');
                }
            },
            onFinish: () => {
                form.processing = false
            }
        });
    } else {
        form.post(route('admin.download.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast('success', 'สำเร็จ', 'จัดเก็บรายละเอียดข้อมูลดาวน์โหลด เรียบร้อย');
            },
            onError: (errors) => {
                //console.log(errors)
                if( errors.msg ) {
                    toast('danger', errors.msg, errors.sysmsg);
                } else {
                    toast('danger', 'เกิดข้อผิดพลาด', 'ระบุรายละเอียดไม่ถูกต้องหรือไม่ครบถ้วน กรุณาตรวจสอบข้อมูลทุกครั้งก่อนทำการจัดเก็บ');
                }
            },
            onFinish: () => {
                form.processing = false
            }
        });
    }
}

</script>

<style scoped>
  .p-error {
    font-size: 12px;
    color: red;
  }
</style>
