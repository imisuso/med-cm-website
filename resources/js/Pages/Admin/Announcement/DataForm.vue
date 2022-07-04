<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">{{ actionWord }}ข้อมูลข่าวประกาศ</div>
                <Link :href="route('admin.announce')" :data="{ 'fdivision_selected': fdivision_selected }" method="get" as="button" type="button"
                    class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                >
                    กลับหน้าหลัก
                </Link>  
            </div>
        
            <div class="text-gray-900 text-lg underline font-medium dark:text-white mb-4">
                รายละเอียดข้อมูลข่าวประกาศ
            </div>
            <div class="grid grid-cols-6 gap-2">
                <div class="mt-5 md:mt-0 col-span-6">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <fieldset :disabled="viewDataInfomation">
                                <div class="grid grid-cols-6 gap-6 mb-6">
                                    <div class="col-span-6">
                                        <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">วันที่ประกาศหมดอายุ</label>
                                        <Datepicker 
                                            inputClassName="dp-custom-input"
                                            placeholder="default 30 วัน"
                                            v-model="announceForm.expire_date" 
                                            locale="th"
                                            cancelText="ยกเลิก"
                                            selectText="เลือก"
                                            :month-year-component="monthYear"
                                            :yearRange="[new Date().getFullYear() - 2, new Date().getFullYear() + 5]"
                                            :enableTimePicker="false"
                                            :format="dateFormat"
                                            :previewFormat="dateFormat"
                                            :minDate="new Date()"
                                            :clearable="false"
                                            autoApply
                                        />
                                    </div>

                                    <div v-if="$page.props.auth.abilities.includes('view_all_content')" class="col-span-6">
                                        <label for="division_selected" class="block text-sm font-medium text-gray-700">สาขา/หน่วยงาน</label>
                                        <select v-model="announceForm.division_id" id="division_selected" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value=0>ตามสาขา/หน่วยงานผู้ประกาศ</option>
                                            <template v-for="(option, index) in divisions" :key="index">
                                                <option :value="option.division_id">
                                                    {{ option.name_th }}
                                                </option>
                                            </template>                 
                                        </select>
                                    </div>

                                    <div class="col-span-6">
                                        <div class="flex items-center justify-between">
                                            <label for="topic" class="block text-sm font-medium text-gray-700">หัวข้อข่าว</label>
                                            <!-- ส่วนของการปักหมุด ตอนนี้เอาออกก่อน ให้ใช้ที่ตัว component เป็นหลักจะได้ไม่ต้อง check หลายที่ -->
                                            <!-- <div class="flex items-center space-x-2">     
                                            <input type="checkbox" v-model="announceForm.pinned" id="pinned" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                                            
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" 
                                                class="h-5 w-5 text-red-500" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"
                                            >
                                                <g transform="translate(128 128) scale(0.72 0.72)" style="">
                                                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                                                <path d="M 89.011 87.739 c -0.599 -1.371 -1.294 -2.652 -1.968 -3.891 l -0.186 -0.343 l -15.853 -15.91 c -0.371 -0.375 -0.746 -0.748 -1.12 -1.12 c -0.671 -0.667 -1.342 -1.335 -1.997 -2.018 l -1.459 -1.437 l 23.316 -23.317 l -1.704 -1.704 c -9.111 -9.112 -22.925 -12.518 -35.353 -8.759 l -6.36 -6.359 c 0.769 -7.805 -2.017 -15.69 -7.503 -21.175 L 37.123 0 L 0 37.122 l 1.706 1.704 c 5.487 5.487 13.368 8.271 21.176 7.503 l 6.36 6.36 C 25.484 65.115 28.889 78.93 38 88.041 l 1.703 1.704 l 23.316 -23.316 l 1.438 1.458 c 0.679 0.653 1.344 1.321 2.009 1.989 c 0.373 0.374 0.745 0.748 1.117 1.116 l 15.699 15.7 l 0.566 0.352 c 1.239 0.673 2.52 1.369 3.891 1.968 L 90 90 L 89.011 87.739 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(175,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                </g>
                                                </g>
                                            </svg>
                                            <label for="pinned" class="ml-2 text-sm font-medium text-gray-700">ปักหมุด</label>
                                            </div> -->
                                        </div>
                                        <input type="text" id="topic" v-model.trim="announceForm.topic" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> 
                                    </div>

                                    <div v-if="announceForm.old_attachments" class="col-span-6">
                                        <ul>
                                            <li v-for="(file, index) in announceForm.old_attachments" :key="index">
                                                <div class="my-1">
                                                    <div class="flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md">
                                                        <div class="flex flex-col ">
                                                            <div class="p-2"><strong>ชื่อไฟล์ : </strong>{{file.orig_name}}</div>
                                                            <!-- <div class="p-2"><p><strong>ขนาด : </strong>{{file.size}} kb</p></div> -->
                                                        </div>
                                                        <div class="flex items-center m-2 sm:m-0">
                                                            <a href="#" @click="deleteFile(announceForm.old_attachments, index)" class="flex items-center text-sm text-red-600 px-2 py-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </a>
                                                        </div>       
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="col-span-6">
                                    <ul>
                                        <li v-for="(file, index) in attachments" :key="index">
                                        <div class="my-1">
                                            <div class="flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md">
                                            <div class="flex flex-col ">
                                                <div class="p-2"><strong>ชื่อไฟล์ : </strong>{{file.name}}</div>
                                                <!-- <div class="p-2"><p><strong>ขนาด : </strong>{{file.size}} kb</p></div> -->
                                            </div>
                                            <div class="flex items-center m-2 sm:m-0">
                                                <label>
                                                <span class="p-2 mt-2 text-sm cursor-pointer rounded-lg shadow-lg border text-white border-indigo-500 bg-blue-700 hover:bg-blue-800 hover:text-white">เลือกไฟล์</span>
                                                <!-- <input :id="'file-'+index" type="file" accept="image/*" @change="uploadFile(index, file, $event)" style="display:none"> -->
                                                <input :id="'file-'+index" type="file" accept=".pdf" @change="uploadFile(index, file, $event)" style="display:none">
                                                </label>
                                                <a href="#" @click="deleteFile(attachments , index)" class="flex items-center text-sm text-red-600 px-2 py-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                </a>
                                            </div>       
                                            </div>
                                        </div>
                                        </li>
                                    </ul>
                                    <a href="#" @click="addFile" class="add">
                                        <div class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        เพิ่มไฟล์แนบ
                                        </div>
                                    </a>
                                    </div>
                                </div>             
                            </fieldset>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="">
                <label for="topic" class="block text-sm font-medium text-gray-700 mt-2 mb-2">เนื้อหาข่าวประกาศ</label>
                <QuillEditor
                    id="quill_e"  
                    ref="quill_e" 
                    theme="snow" 
                    v-model:content="announceForm.detail_delta" 
                    contentType="delta" 
                    :toolbar="quill_options_full" 
                    @ready="initialQuill" 
                />
            </div>

            <div class="flex flex-row mt-4 space-x-4">
                <button v-if="action === 'insert'" type="button" @click="saveAnnounce" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
                <button v-if="action === 'edit'" type="button" @click="true" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
                <Link :href="route('admin.announce')" :data="{ 'fdivision_selected': announceForm.division_id }" method="get" as="button" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                    ยกเลิก
                </Link>
            </div>
        </div>
    </AdminAppLayout>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent, nextTick, reactive } from 'vue'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'

import dayjs from 'dayjs'
import 'dayjs/locale/th'

// API Service
import TraceLogService from '@/Services/TraceLogService'

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const props = defineProps({
    action: { type: String, require: true, default: "insert" },
    announce: { type: Object },
    divisions: { type: Array },
    fdivision_selected: { type: Number},
})

const quill_e = ref()
const quill_options_full = ref([
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //['blockquote', 'code-block'],
    ['blockquote'],
    //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'header': [1, 2, 3, 4, false] }],
    //[{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //[{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
    //[{ 'direction': 'rtl' }],                         // text direction
    //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //[{ 'font': [] }],
    //[{ 'align': [] }],
    //['link', 'video', 'image'],
    ['link'],
    ['clean']                                         // remove formatting button
])

const MonthYear = defineAsyncComponent(() => import('@/Components/MonthYearCustom.vue'));
const monthYear = computed(() => MonthYear);

const actionWord = ref(null)
const viewDataInfomation = ref(false)
const thaiMonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม' ]
const current_date = ref( dayjs().startOf('day').toDate() )
const attachments = reactive([])
const submitted = ref(false)

const announceForm = useForm({
  id: props.announce ? props.announce.id : null,
  pinned: props.announce ? props.announce.pinned : false,
  topic: props.announce ? props.announce.topic : null,
  detail_delta: props.announce ? JSON.parse(props.announce.detail_delta) : {},
  expire_date: props.announce ? dayjs(props.announce.expire_date).toDate() : ref(dayjs(current_date.value).add(30, 'day').toDate()),
  division_id: props.fdivision_selected ? props.fdivision_selected : usePage().props.value.auth.division_id,
  type: props.announce ? props.announce.type : 1,  // type ตอนนี้มีแบบเดียว แค่ออกแบบ db เพื่อรองรับประกาศ หลายๆแบบ 
  old_attachments: props.announce ? props.announce.attach_files.length > 0 ? props.announce.attach_files : [] : []
  //announceData.attach_files.length > 0 ? announceData.attach_files : []
});

switch(props.action) {
    case 'insert':
        actionWord.value = "เพิ่ม"
        //pdpa_protect.value = false
        break;
    case 'edit':
        actionWord.value = "แก้ไข"
        //pdpa_protect.value = false
        break;
    case 'view':
        actionWord.value = "ดู"
        //viewDataInfomation.value = true
        break;
}

const initialQuill = () => {
  //quill_e.value.setContents(JSON.parse(props.branchSubMenu.detail_delta))
  quill_e.value.getQuill().enable(true)
}

const dateFormat = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `วันที่ ${day} ${thaiMonth.at(month)} ${year+543}`;
}

const addFile = () => {
  attachments.push({ name: "กรุณาเลือกไฟล์", size: 0})
  // Click ปุ่ม Brows File ให้เลยหลังจากที่ DOM สร้างเสร็จแล้วจากการ push array เข้าไปใหม่
  nextTick(() => {
      var inputId = "file-" + (attachments.length - 1);
      document.getElementById(inputId).click();
  });  
}

const deleteFile = ( itemArray, index ) => {
  itemArray.splice(index, 1)
}

const checkRequireData = () => {
  //return true
    if( announceForm.topic ) {
      return true
    } else {
      return false
    }
}

const uploadFile = (index, file, e) => {
  let f = e.target.files[0];

  //console.log(f)
  file.File = f;
  file.name = f.name;
  file.size = f.size;

  if (file.size > 1024 * 1024 * 5) {
    deleteFile(attachments, index)
    toast('warning', 'พบข้อผิดพลาด', 'เพิ่มไฟล์แนบไม่ได้ เนื่องจากไฟล์ของคุณใหญ่เกินไป (> 5MB)')
  }

  //if(!file.type.match('image/jp.*')) {
  if(!f.type.match('application/pdf')) {
    deleteFile(attachments, index)
    toast('warning', 'พบข้อผิดพลาด', 'เพิ่มไฟล์แนบไม่ได้ เนื่องจากอนุญาตให้แนบไฟล์เฉพาะ PDF เท่านั้น')
  }
}

const saveAnnounce = () => {
    //submitted.value = true;
    let error_display = ''
    if(announceForm.id) {  // Edit
        announceForm.detail_delta = JSON.stringify(announceForm.detail_delta);
        announceForm.transform(data => ({
            ...data,
            expire_date: dayjs(data.expire_date).format("YYYY-MM-DD HH:mm:ss"),
            detail_html: quill_e.value.getHTML(),
            atFiles: attachments.map(file => file.File)     
        })).post( route('admin.update_announce', announceForm.id), {
        _method: 'patch',
        //preserveState: false,
        onSuccess: () => {
            toast('success', 'แก้ไขสำเร็จ', 'แก้ไขข้อมูลประกาศ เรียบร้อย')
            announceForm.reset()  // ทำการ reset person form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว       
        },
        onError: (errors) => {
            toast('danger', errors.msg, errors.sysmsg)
        },
        onFinish: () => {
            announceForm.processing = false
            //filterAnnounce()
        }
        })
    } else { // Add
        //console.log(announceForm.detail_delta)
        //announceForm.detail_delta = JSON.stringify(announceForm.detail_delta);
        announceForm.transform(data => ({
            ...data,
            expire_date: dayjs(data.expire_date).format("YYYY-MM-DD HH:mm:ss"),
            detail_delta: JSON.stringify(data.detail_delta), 
            detail_html: quill_e.value.getHTML(),
            atFiles: attachments.map(file => file.File)
        })).post(route('admin.announce.store'), {
        //preserveState: false,
        onSuccess: () => {
            toast('success', 'สำเร็จ', 'จัดเก็บประกาศเรียบร้อย')
            announceForm.reset()  // ทำการ reset announce form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว
        },
        onError: (errors) => {
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
            //toast('danger', errors.msg, errors.sysmsg)
        },
        onFinish: () => {
            announceForm.processing = false
            //filterAnnounce()
        }
        });
    }
    attachments.splice(0) // clear ไฟล์แนบทั้งหมดก่อนหน้านี้
//   if(! checkRequireData() ) {
//       toast('warning', 'คำเตือน', 'ยังระบุข้อมูลที่ต้องการของประกาศไม่ครบถ้วน');
//   } else { 
//     if(announceForm.id) {  // Edit
//       announceForm.detail_delta = JSON.stringify(announceForm.detail_delta);
//       announceForm.transform(data => ({
//           ...data,
//           expire_date: dayjs(data.expire_date).format("YYYY-MM-DD HH:mm:ss"),
//           detail_html: quill_e.value.getHTML(),
//           atFiles: attachments.map(file => file.File)     
//       })).post( route('admin.update_announce', announceForm.id), {
//         _method: 'patch',
//         //preserveState: false,
//         onSuccess: () => {
//           toast('success', 'แก้ไขสำเร็จ', 'แก้ไขข้อมูลประกาศ เรียบร้อย')
//           announceForm.reset()  // ทำการ reset person form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว       
//         },
//         onError: (errors) => {
//           toast('danger', errors.msg, errors.sysmsg)
//         },
//         onFinish: () => {
//           announceForm.processing = false
//           //filterAnnounce()
//         }
//       })
//     } else { // Add
//       //console.log(announceForm.detail_delta)
//       //announceForm.detail_delta = JSON.stringify(announceForm.detail_delta);
//       announceForm.transform(data => ({
//           ...data,
//           expire_date: dayjs(data.expire_date).format("YYYY-MM-DD HH:mm:ss"),
//           detail_delta: JSON.stringify(data.detail_delta), 
//           detail_html: quill_e.value.getHTML(),
//           atFiles: attachments.map(file => file.File)
//       })).post(route('admin.announce.store'), {
//         //preserveState: false,
//         onSuccess: () => {
//           toast('success', 'สำเร็จ', 'จัดเก็บประกาศเรียบร้อย')
//           announceForm.reset()  // ทำการ reset announce form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว
//         },
//         onError: (errors) => {
//           toast('danger', errors.msg, errors.sysmsg)
//         },
//         onFinish: () => {
//           announceForm.processing = false
//           //filterAnnounce()
//         }
//       });
//     }
//     attachments.splice(0) // clear ไฟล์แนบทั้งหมดก่อนหน้านี้
//     //openAnnounceModal(false) // ปิด Modal
//   }
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

</script>