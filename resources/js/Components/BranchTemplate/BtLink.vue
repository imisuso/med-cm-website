<template>
  <div v-if="display_content === 'template'">
    <div class="col-span-6 sm:col-span-4 mb-2">
      <div class="flex items-center justify-start">
        <div class="text-md font-bold text-green-700"> เพิ่มลิงก์ : </div>
        <svg
          v-show="editButton"
          xmlns="http://www.w3.org/2000/svg" @click="createLink(form.linkList)" class="h-5 w-5 ml-2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <div class="flex flex-col">
      <div
        v-for="(input, index) in form.linkList"
        :key="`linkInput-${index}`" 
        class="flex items-center shrink-0 mb-2"
        > 
        <div class="w-full mr-1">
          <label for="link_detail" class="block text-sm font-medium text-gray-700">หัวข้อลิงก์</label>
          <input v-model="input.name" type="text" :readonly="!editButton" name="" id="link_detail" placeholder="ใส่หัวข้อลิ้งก์ที่ต้องการ" class="w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
        </div>
        <div class="w-full">
          <label for="link_url" class="block text-sm font-medium text-gray-700">URL ของลิงก์</label>
          <input v-model="input.url" type="text" :readonly="!editButton" name="" id="link_url" placeholder="https://simed.mahidol.ac.th" class="w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
        </div>
        <svg
          v-show="editButton"
          xmlns="http://www.w3.org/2000/svg" @click="deleteLink(index, form.linkList)" class="h-5 w-5 ml-2 shrink-0 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
        </svg>    
      </div>  
    </div>

    <div class="mt-2">
      <button v-show="!editButton" @click="editButton = !editButton" class="flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        แก้ไข
      </button>
      <div class="flex">
      <button v-show="editButton" @click="saveLink" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        บันทึก
      </button>
      <button v-show="editButton" @click="clickCancle" class="flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10">
        <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
          <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        ยกเลิก
      </button>
      </div>   
    </div>
  </div>

  <div v-else>
    <div class="flex flex-col">
      <div
        v-for="(input, index) in form.linkList"
        :key="`linkInput-${index}`" 
        class="flex items-center shrink-0 mb-2"
        > 
        <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 group hover:shadow-2xl">
          <div class="p-1">
              <div class="flex items-center justify-center w-full h-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <a :href="input.url" target="_blank"  >{{ input.name }}</a>
              </div>
          </div>
          <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-green-700 group-hover:scale-x-100"></div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

const props = defineProps({
    // ถูกส่งเป็น props เข้ามาจากหน้า BranchTemplateEditor
    division_id: { type: Number, required: true  },
    branchSubMenu: { type: Object, required: true },
    display_content: { type: String, required: true},
})

const data_links = ref(JSON.parse(props.branchSubMenu.detail_delta))
//console.log(data_links.value)

const form = useForm({
  id: props.branchSubMenu.id,
  linkList: props.branchSubMenu.detail_delta ? JSON.parse(props.branchSubMenu.detail_delta) : []
});

const editButton = ref(false)

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

const createLink = (fieldType) => {
  fieldType.push({ name: '' });
}

const deleteLink = (index, fieldType) => {
  fieldType.splice(index, 1);
}

const saveLink = () => {
  form.transform(data => ({
      ...data,
      detail_delta: JSON.stringify(data.linkList),
      detail_html: "Template Link"
  })).patch( route('admin.update_content_branch_sub_menu', form.id), {
    _method: 'patch',
    preserveState: false,
    preserveScroll: true,
    onSuccess: () => {
      toast('success', 'แก้ไขสำเร็จ', 'แก้ไขข้อมูลลิ้งก์ที่เกี่ยวข้อง เรียบร้อย')
      form.reset()  // ทำการ reset person form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว       
    },
    onError: (errors) => {
      toast('danger', errors.msg, errors.sysmsg)
    },
    onFinish: () => {
      form.processing = false
    }
  })
}

const clickCancle = () => {
  form.linkList = JSON.parse(props.branchSubMenu.detail_delta)
  editButton.value = false
}

</script>

<style>

</style>