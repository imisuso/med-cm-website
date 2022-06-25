<template>
    <div class="flex flex-col m-2">
        <div class="mt-2 mb-2 text-lg">{{ sub_header.sub_header_name_th }}</div>
        <div>
            <QuillEditor
                id="quill_e"
                ref="quill_e"
                v-model:content="contentForm.detail_delta" 
                contentType="delta"
                @ready="initialQuill"
                @textChange="textChange"        
            />
            <!--
            theme="snow" 
            :toolbar="quill_custom" 
            :modules="quill_modules"  
            -->

            <!-- <QuillEditor ref="quill" theme="snow" :content="sub_header.html_content" contentType="html" :toolbar="quill_options_full" :modules="quill_modules" /> -->
            <!-- <QuillEditor ref="quill" theme="snow" :content="sub_header.html_content" contentType="html" toolbar="full" /> -->
            <div class="flex items-center space-x-2 mt-2 mb-4">
                <button @click="saveContent()" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10">
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
        <div class="w-full">
            {{ getContent }}
            <div v-html="htmlContent" class="ql-editor border border-red-300 py-4 px-2 focus:outline-none"></div>
            <!-- <div v-html="content" class="border border-red-300 py-4 px-2 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-2  focus:outline-none"></div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted, reactive, computed, nextTick } from 'vue'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'
import BlotFormatter, { AlignAction, DeleteAction, ResizeAction, ImageSpec } from 'quill-blot-formatter'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

class CustomImageSpec extends ImageSpec {
    getActions() {
      return [AlignAction, DeleteAction, ResizeAction];
    }
}

class RemoveImageSpec extends ImageSpec {
    getActions() {
      return [];
    }
}

const props = defineProps({
    sub_header: { type: Object, required: true }
})

onUnmounted(() => {
    window.removeEventListener('click', pasteImage, false)
})

const contentForm = useForm({
    id: props.sub_header.id,
    detail_delta: JSON.parse(props.sub_header.detail_delta),
});

//const deltaContent = ref(JSON.parse(props.sub_header.delta_content))
const htmlContent = ref(props.sub_header.detail_html)

const quill_modules = {
                name: 'blotFormatter',  
                module: BlotFormatter, 
                    options: {/* options */}
            }

const quill_e = ref()
const imgDeleted = reactive([])
const imgInserted = reactive([])  

const quill_custom = ref([
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

// const initialQuill = () => {
//   quill_e.value.getQuill().enable(true)
// }

const initialQuill = () => {
  quill_e.value.getEditor().addEventListener('paste', pasteImage, false)
  // var toolbar = quill_e.value.getQuill().getModule('toolbar');
  // toolbar.addHandler('image', selectLocalImage)
  quill_e.value.setContents(JSON.parse(props.sub_header.detail_delta))
  quill_e.value.getQuill().enable(true)
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

// ใช้สำหรับ event เมื่อ rich-text มีการเปลี่ยนแปลงข้อความ ซึ่งในที่นี้จะหมายถึงการลบ รูป
const textChange = (e) => {
  //console.log(e.delta)
  //const inserted = getImgUrls(e.delta);

  // หา url ของรูปที่ถูกลบไป
  const deleted = getImgUrls(quill_e.value.getContents().diff(e.oldContents))
  
  //inserted.length && console.log('insert', inserted)
  //inserted.length && imgInserted.push(inserted) && console.log('insert', imgInserted)
  
  // เพิ่มข้อมูลรูปที่ถูกลบ ลงไปใน list
  deleted.length && imgDeleted.push(deleted[0]) && console.log('delete', imgDeleted)
}

const getImgUrls = (delta) => {
  return delta.ops.filter(i => i.insert && i.insert.image).map(i => i.insert.image)
}

// ใช้สำหรับ copy patse รูปมาไว้ที่ rich-text
const pasteImage = (e) => {
  // console.log(e)
  // console.log(e.clipboardData)
  //console.log(e.target)
  Array.prototype.forEach.call(e.clipboardData.items, item => {
    if (item.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)$/i)) {
        e.preventDefault()
        saveToServer(item.getAsFile())
        return
    } else if (item.type.match(/^application\//i)) {
        e.preventDefault()
    } 
    else if (item.type.startsWith('text/html')) {
      nextTick(() => {
        let editor = document.querySelector(`#quill_e .ql-editor`)
        // move to last child to update scrollY
        setTimeout(() => {
          editor.lastChild.scrollIntoView()

          let editorRect = document.querySelector(`#quill_e .ql-editor`).getBoundingClientRect()
          let y = editorRect.top + window.scrollY + editorRect.height

          // wait DOM updated
          setTimeout(() => {
            window.scrollTo(0, y - window.innerHeight / 2);
          }, 100)
        }, 300)
      })
    }
  })
}

const cancelEditContent = () => {
  
  // ถ้ามีไฟล์รูปที่ insert เข้ามาเก็บที่ server แล้ว ต้องลบออกเพราะได้ยกเลิกการแก้ไข
  if( imgInserted.length ) {
    deleteFromServer(imgInserted)
  }

  // ทำการ clear list การ insert และ delete ให้เป็น array ว่าง
  imgDeleted.splice(0)
  imgInserted.splice(0)
  //initialQuill()

  contentForm.post( route('admin.show_branch_main_menu', props.sub_header.division_id) )
}

//
//  * Step1. select local image
//  
const selectLocalImage = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();

  // Listen upload local image and save to server
  input.onchange = () => {
    const file = input.files[0];

    // file type is only image.
    if (/^image\//.test(file.type)) {
      saveToServer(file);
      //console.log("Save to Server")
    } else {
      toast('warning', 'คำเตือน', 'กรุณาเลือกเฉพาะไฟล์ที่เป็นรูปภาพเท่านั้น')
      //console.warn('You could only upload images.');
    }
  };
}

//  * Step2. save to server
//  *
//  * @param {File} file
//  
const saveToServer = ( file ) => {
  const fd = new FormData()
  
  // แนบรูป ที่จะเก็บไปด้วยเมื่อเรียกใช้ api
  fd.append('image_file', file)

  // แนบ path ที่จะเก็บรูปไปด้วยเมื่อเรียกใช้ api
  fd.append('store_path', 'branch_content/' + props.sub_header.division_id + '/images')

  // เรียก api โดยส่ง fd ที่เป็น form-data ที่มีค่าตัวแปรต่างๆ เข้าไปเป็น parameter
  axios.post(route('uploading_file_api'), fd, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then( res => {
    //console.log(res.data)
 
    // หลังจาก upload รูปขึ้น server สำเร็จ จะได้เป็น url ของรูปกลับมาจาก api
    // จากนั้นจึงเรียกใช้งาน function insertToEditor() และส่ง url เข้าไปยัง function เพื่อเพิ่มรูปเข้าไปยัง rich-text  
    insertToEditor(res.data.url)
  })
  .catch( (error) => {
    if (error.response) {
      //console.log(error.response.data);
      if( error.response.status === 401 ) { toast('warning', 'คำเตือน', 'กรุณาเลือกเฉพาะไฟล์ที่เป็นรูปภาพเท่านั้น') }
      //console.log(error.response.headers);
    }
  })
}

const deleteFromServer = ( files ) => {
  //console.log(files)
  axios.post(route('delete_file_api'), {
    imgFiles: files
  })
  .then( res => {
    console.log(res.data)
  })
  .catch( (error) => {
    if (error.response) {
      //console.log(error.response.data);
      if( error.response.status === 401 ) { toast('warning', 'คำเตือน', 'ลบไฟล์ภาพเก่าไม่สำเร็จ') }
      //console.log(error.response.headers);
    }
  })
}

//  * Step3. insert image url to rich editor.
//  *
//  * @param {string} url
//
const insertToEditor = ( url ) => {
  //console.log(url)
  let editor = quill_e.value.getQuill()

  // push image url to rich editor.
  const range = editor.getSelection()
  editor.insertEmbed(range.index, 'image', `${url}`, 'user')

  // เพิ่ม list การ insert ไว้เพื่อใช้ในกรณี ยกเลิกการจัดเก็บก็ต้องลบรูปที่ insert เข้ามาด้วยเพื่อไม่ให้รูปค้างในระบบ
  imgInserted.push(url) && console.log('insert', imgInserted)

}

const getHtmlContent = () => {
    console.log(htmlContent.value)
}

const getContent = computed( () => {
    contentForm.detail_delta
    nextTick(() => {
        htmlContent.value = quill_e.value.getHTML()
        //return htmlContent.value
    });
})

const saveContent = () => {
    contentForm.detail_delta = JSON.stringify(contentForm.detail_delta);
    contentForm.transform(data => ({
        ...data,
        detail_html: htmlContent.value,
        division_id: props.sub_header.division_id,   
    })).patch( route('admin.richtext_content_update', contentForm.id), {
        //preserveState: false,
        onBefore: () => {    
            if( ! confirm('คุณต้องการจัดเก็บข้อมูล ใช่ หรือ ไม่ ?') ) {
                quill_e.value.setContents(JSON.parse(props.sub_header.detail_delta))
                cancelEditContent()
                return false
            }
        },
        onSuccess: () => {
            toast('success', 'แก้ไขสำเร็จ', `แก้ไขข้อมูล ${props.sub_header.sub_header_name_th} เรียบร้อย`)
            if( imgDeleted.length ) {
                deleteFromServer(imgDeleted)
            }
            contentForm.reset()  // ทำการ reset person form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว       
        },
        onError: (errors) => {
            toast('danger', errors.msg, errors.sysmsg)
        },
        onFinish: () => {
            contentForm.processing = false
            imgDeleted.splice(0)
            imgInserted.splice(0)
        }
    })
}

</script>

<style>

</style>