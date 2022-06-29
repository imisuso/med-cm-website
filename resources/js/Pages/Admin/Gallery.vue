<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">จัดการ Galleries รูปกิจกรรม</div>
                <input type="text" v-model="search" class="text rounded-md border-gray-400" placeholder="ค้นหาจากรายละเอียด">
            </div>

            <div>
                <button @click="openGalleryModal(true)" class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    เพิ่ม
                </button>
            </div>

            <div v-if="galleries.data.length === 0" class="flex flex-col justify-center  mt-10 p-2 text-2xl text-white text-center border rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500">
                ไม่พบข้อมูล Galleries รูปกิจกรรม ในระบบ
            </div>

            <div class="flex flex-col w-full mb-4">
                <GalleryInteractiveCardList 
                    v-for="(item, index) in galleries.data" 
                    :key="index" 
                    :galleryDetails="item"
                    @edit-gallery="editGallery(item)"
                    @delete-gallery="confirmDeleteGallery(item)"
                />
            </div>

            <Paginations :pagination="galleries"/>
        
            <!-- Modal สำหรับ จัดเก็บ หรือ แก้ไข ข้อมูล Gallery รูปกิจกกรรม -->
            <Modal modalSize="large" :isModalOpen="galleryModal" >
                <template v-slot:header>
                    <div class="text-gray-900 text-xl font-medium dark:text-white">
                        รายละเอียดการสร้าง Gallery รูปกิจกรรม
                    </div>
                    <svg @click="openGalleryModal(false)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </template>
                <template v-slot:body>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <fieldset>
                                <div class="grid grid-cols-6 gap-6 mb-6">
                                    <div class="col-span-6">
                                        <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">วันที่จัดกิจกรรม</label>
                                        <Datepicker 
                                            inputClassName="dp-custom-input"
                                            placeholder="default 30 วัน"
                                            v-model="galleryForm.event_date" 
                                            locale="th"
                                            cancelText="ยกเลิก"
                                            selectText="เลือก"
                                            :month-year-component="monthYear"
                                            :yearRange="[new Date().getFullYear() - 5, new Date().getFullYear()]"
                                            :enableTimePicker="false"
                                            :format="dateFormat"
                                            :previewFormat="dateFormat"
                                            :maxDate="new Date()"
                                            :clearable="false"
                                            autoApply
                                        />
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
                    </div>
                </template>
            
                <template v-slot:footer>
                    <button 
                        @click="saveGallery" 
                        type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        จัดเก็บ
                    </button>
                    <button @click="openGalleryModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
                </template>
            </Modal>

            <!-- Modal สำหรับ confirm การลบ ข้อมูลแกลลอรี่  -->
            <Modal :isModalOpen="deleteGalleryModal" >

            <template v-slot:header>
                <div class="text-gray-900 text-xl font-medium dark:text-white">
                    คุณต้องการลบข้อมูลแกลลอรี่
                </div>
            </template>

            <template v-slot:body>
                <div class="text-gray-900 text-md font-medium dark:text-white">
                    {{ galleryForm.desc }}
                    <!-- <img class="shadow-lg rounded-md h-20 w-16 mb-1 mt-1" :src="`${galleryForm.event_date}`" alt=""/> -->
                </div>
            </template>

            <template v-slot:footer>
                <button @click="openDeleteGalleryModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
                <button @click="deleteGallery()" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">ลบ</button>
            </template>
            </Modal>
        </div>
    </AdminAppLayout>
</template>

<script setup>
import { ref, reactive, computed, defineAsyncComponent, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal'
import GalleryInteractiveCardList from '@/Components/GalleryInteractiveCardList'
import Paginations from '@/Components/Paginations'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast


const props = defineProps({
    galleries: { type: Object, required: true, default: {} },
    filters: { type: Object },
})

let search = ref(props.filters.search)

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('admin.gallery'), { search: value }, {
        preserveState: true,
        replace: true
    })
})

const MonthYear = defineAsyncComponent(() => import('@/Components/MonthYearCustom.vue'));
const monthYear = computed(() => MonthYear);

dayjs.extend(buddhistEra)

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


const galleryForm = useForm({
    id: null,
    desc: null,
    event_date: ref(dayjs().startOf('day').toDate())
});

const galleryModal = ref(false)
const addDeleteImageGalleryModal = ref(false)
const deleteGalleryModal = ref(false)
const checkFileSize = ref(false)
const checkCoverFile = ref(false)
const checkContentFile = ref(false)
const attachments = reactive([
                        { name: "", size: 0, label: "รูปหน้าปก", accept: ".jpg,.jpeg"}
                        // { name: "", size: 0, label: "เพิ่มไฟล์เนื้อหา", accept: ".jpg,.jpeg,.pdf"}
                    ])

const dateFormat = (date) => {
    return dayjs(date).locale('th').format('วันddddที่ D MMMM BBBB')
}

const openGalleryModal = (isopen) => {
    galleryModal.value = isopen
    if( !isopen ) {
        galleryForm.reset()
        // submitted.value = false
        // viewDataInfomation.value = false
    }
}

const openDeleteGalleryModal = (isopen) => {
    deleteGalleryModal.value = isopen
    if( !isopen ) {
        galleryForm.reset()
    }
}

const openAddDeleteImageGalleryModal = (isopen) => {
    addDeleteImageGalleryModal.value = isopen
    if( !isopen ) {
        galleryForm.reset()
    }
}

const confirmDeleteGallery = ( galleryData ) => {
    axios({
        url: route('admin.check_gallery_empty', dayjs(galleryData.event_date).locale('th').format('YYYYMMDD')),
        method: 'GET',
    }).then((response) => {
        //console.log(response.data)
        if(response.data > 0 ) {
            toast('warning', 'คำเตือน', 'ตรวจพบรูปภาพในแกลลอรี่ <br> กรุณาลบรูปทั้งหมดในแกลลอรี่นี้ก่อนทำการลบ แกลลอรี่');
            return true
        }
        else {
            galleryForm.id = galleryData.id
            galleryForm.desc = galleryData.desc
            openDeleteGalleryModal(true)
        }
    });
    
}

const uploadFile = (index, file, e) => {
  let f = e.target.files[0];

  //console.log(f)
  file.File = f;
  file.name = f.name;
  file.size = f.size;

  if (file.size > 1024 * 1024 * 2) {
    checkFileSize.value = false
    toast('warning', 'เพิ่มไฟล์ไม่ได้', 'เนื่องจากไฟล์ของคุณใหญ่เกินไป (> 2MB)')
  } else {
      checkFileSize.value = true
  }

  if( index === 0 ) {
      if( !f.type.match('image/jp.*') ) {
          checkCoverFile.value = false
          toast('warning', 'เพิ่มไฟล์แนบไม่ได้', 'อนุญาตให้แนบไฟล์เฉพาะ .jpg เท่านั้น')
      } else {
          checkCoverFile.value = true
      }
  } 
//   else {
//       if( ! (f.type.match('image/jp.*') || f.type.match('application/pdf')) ) {
//           checkContentFile.value = false
//           toast('warning', 'เพิ่มไฟล์แนบไม่ได้', 'อนุญาตให้แนบไฟล์เฉพาะ .jpg หรือ PDF เท่านั้น')
//       } else {
//           checkContentFile.value = true
//       }
//   }
}

const checkRequireData = () => {
    //return true
    //if( galleryForm.desc && checkFileSize.value && (checkCoverFile.value || checkContentFile.value) ) {
    if( galleryForm.desc && galleryForm.event_date ) {
      return true
    } else {
      return false
    }
}

const saveGallery = () => {
//   submitted.value = true;
  if(! checkRequireData() ) {
      toast('warning', 'คำเตือน', 'ยังระบุข้อมูลที่ต้องการของแกลลอรี่ ไม่ครบถ้วน');
  } else { 
    if(galleryForm.id) {  // Update
      //console.log("Update")
      galleryForm.transform(data => ({
          ...data,
          event_date: dayjs(data.event_date).format("YYYY-MM-DD HH:mm:ss"),
          cover: attachments[0].File
      })).post( route('admin.update_gallery', galleryForm.id), {
        _method: 'patch',
        preserveState: false,
        //preserveScroll: true,
        onSuccess: () => {
          toast('success', 'แก้ไขสำเร็จ', 'แก้ไขข้อมูลแกลลอรี่ เรียบร้อย')
          galleryForm.reset()  // ทำการ reset poster form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว       
        },
        onError: (errors) => {
          toast('danger', errors.msg, errors.sysmsg)
        },
        onFinish: () => {
          galleryForm.processing = false
        }
      })
    } else { // Insert
      //console.log("Insert")
      galleryForm.transform(data => ({
        ...data,
        //   atFiles: attachments.map(file => file.File)
        event_date: dayjs(data.event_date).format("YYYY-MM-DD HH:mm:ss"),
        cover: attachments[0].File   
      })).post(route('admin.add_gallery'), {
        preserveState: false,
        onSuccess: () => {
          toast('success', 'สำเร็จ', 'สร้างแกลลอรี่รูปกิจกรรม เรียบร้อย')
          galleryForm.reset()  // ทำการ reset gallery form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว
        },
        onError: (errors) => {
          toast('danger', errors.msg, errors.sysmsg)
        },
        onFinish: () => {
          galleryForm.processing = false
        }
      });
    }

    openGalleryModal(false) // ปิด Modal
  }
}

const editGallery = (item) => {
    galleryForm.id = item.id
    galleryForm.desc = item.desc
    galleryForm.event_date = dayjs(item.event_date).startOf('day').toDate()
    openGalleryModal(true)
}

const deleteGallery = () => {
    galleryForm.delete(route('admin.delete_gallery', galleryForm.id), {
    preserveState: false,
    onSuccess: () => {
        toast('success', 'สำเร็จ', 'ลบข้อมูลแกลลอรี่ เรียบร้อย')
    },
    onError: (errors) => {
        console.log(errors)
        toast('danger', errors.msg, errors.sysmsg)
    },
    onFinish: () => {
        galleryForm.processing = false 
    }
  });

  openDeleteGalleryModal(false)
}

</script>

<style scoped>
.dp-custom-input {
    border: rgb(99 102 241 / var(--tw-border-opacity));
}
</style>