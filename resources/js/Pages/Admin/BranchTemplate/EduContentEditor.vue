<template>
  <div class="flex flex-col p-4 w-full">
    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
      <div class="flex items-center text-2xl font-bold space-x-2">
        <div>งานการเรียนการสอน ({{ sub_header.sub_header_name_th }})</div>
        <button @click="addFile" class="flex add items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          เพิ่มไฟล์แนบ
        </button>
      </div>

      <div class="flex">
        <button @click="saveContent" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          บันทึก
        </button>
        <Link :href="route('admin.show_branch_main_menu', props.sub_header.division_id)" method="post" as="button" type="button"  preserve-scroll>
          <button class="flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10">
            <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            ยกเลิก
          </button>
        </Link>
      </div>
    </div>

    <div v-if="form.old_attachments" class="col-span-6">
      <ul>
        <li v-for="(file, index) in form.old_attachments" :key="index">
          <div class="my-1">
            <div class="flex items-center flex-col sm:flex-row justify-between border border-indigo-500 rounded-md">
              <div class="flex flex-col ">
                <div class="p-2"><strong>ชื่อไฟล์ : </strong>{{file.orig_name}}</div>
                <!-- <div class="p-2"><p><strong>ขนาด : </strong>{{file.size}} kb</p></div> -->
              </div>
              <div class="flex items-center m-2 sm:m-0">
                <a href="#" @click="deleteFile(form.old_attachments , index)" class="flex items-center text-sm text-red-600 px-2 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </a>
              </div>
            </div>
            <div class="flex justify-center">
              <embed :src="`${sub_header.json_array_field_transform[index].url}`" width="800px" height="800px" />
              <!-- <embed :src="`${file.unique_name}`" width="800px" height="800px" /> -->
              <!-- ${file.json_array_field_transform[index].url} -->
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
            <div v-if="attachments[index].name !== 'กรุณาเลือกไฟล์'" class="flex justify-center">
              <!-- {{ attachments[index].File.name }} -->
              <embed :src="file.embedSrc" width="800px" height="800px" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,  nextTick, reactive } from 'vue'
import { useForm, Link } from '@inertiajs/vue3'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    sub_header: { type: Object, required: true }
})

const baseUrl = ref(base_url)
const attachments = reactive([])

const form = useForm({
  id: props.sub_header.id,
  old_attachments: props.sub_header?.attach_files ?? []
});


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

const uploadFile = (index, file, e) => {
  let f = e.target.files[0];

  //console.log(f)
  file.File = f;
  file.name = f.name;
  file.size = f.size;
  file.embedSrc = URL.createObjectURL(f);

  if (file.size > 1024 * 1024 * 5) {
    deleteFile(attachments, index)
    toast('warning', 'เพิ่มไฟล์แนบไม่ได้', 'ไฟล์ของคุณใหญ่เกินไป (> 5MB)')
  }

  //if(!file.type.match('image/jp.*')) {
  if(!f.type.match('application/pdf')) {
    deleteFile(attachments, index)
    toast('warning', 'เพิ่มไฟล์แนบไม่ได้', 'อนุญาตให้แนบไฟล์เฉพาะ PDF เท่านั้น')
  }
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

const checkRequireData = () => {
  return true
  // if(personForm.person_type === 'สายสนับสนุน') {
  //   if( personForm.fname_th && personForm.lname_th && personForm.display_order ) {
  //     return true
  //   } else {
  //     return false
  //   }
  // } else {
  //   if( personForm.fname_th && personForm.lname_th && personForm.display_order && personForm.rname_full_th
  //       && personForm.rname_short_th && (personForm.position_academic !== 0) )
  //   {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
}

const saveContent = () => {
  //submitted.value = true;
  if(! checkRequireData() ) {
      toast('warning', 'คำเตือน', 'ยังระบุข้อมูลที่ต้องการไม่ครบถ้วน');
  } else {
    form.transform( data => ({
      ...data,
      division_id: props.sub_header.division_id,
      atFiles: attachments.map(file => file.File)
    })).post(route('admin.update_edu_branch_content', form.id), {
      preserveState: false,
      onSuccess: () => {
        toast('success', 'จัดเก็บสำเร็จ', `จัดเก็บไฟล์ PDF ${props.sub_header.sub_header_name_th} เรียบร้อย`)
      },
      onError: (errors) => {
        toast('danger', errors.msg, errors.sysmsg)
      },
      onFinish: () => {
      }
    })
  }


  // } else {
  //   if(announceForm.id) {  // Edit
  //     console.log("Edit")
  //     //announceForm.detail_delta = JSON.stringify(announceForm.detail_delta);
  //     announceForm.transform(data => ({
  //         ...data,
  //         atFiles: attachments.map(file => file.File)
  //     })).post( route('admin.update_announce', announceForm.id), {
  //       _method: 'patch',
  //       //preserveState: false,
  //       onSuccess: () => {
  //         toast('success', 'แก้ไขสำเร็จ', 'แก้ไขข้อมูลประกาศ เรียบร้อย')
  //       },
  //       onError: (errors) => {
  //         toast('danger', errors.msg, errors.sysmsg)
  //       },
  //       onFinish: () => {
  //       }
  //     })
  //   } else { // Add
  //     console.log("Add")
  //     //console.log(announceForm.detail_delta)
  //     //announceForm.detail_delta = JSON.stringify(announceForm.detail_delta);
  //     //console.log(announceForm.detail_delta)
  //     announceForm.transform(data => ({
  //         ...data,
  //         atFiles: attachments.map(file => file.File)
  //     })).post(route('admin.add_announce'), {
  //       //preserveState: false,
  //       onSuccess: () => {
  //         toast('success', 'สำเร็จ', 'จัดเก็บประกาศ เรียบร้อย')
  //         announceForm.reset()  // ทำการ reset announce form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว
  //       },
  //       onError: (errors) => {
  //         toast('danger', errors.msg, errors.sysmsg)
  //       },
  //       onFinish: () => {
  //       }
  //     });
  //   }
  //   attachments.splice(0) // clear ไฟล์แนบทั้งหมดก่อนหน้านี้
  // }
}

</script>

<style scoped>
</style>
