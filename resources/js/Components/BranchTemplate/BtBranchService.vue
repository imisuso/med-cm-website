<template>
  <div v-if="!branchSubMenu">
    <ComingSoon />
  </div>
  <div v-else-if="display_content === 'template'" class="flex flex-col">
    <!-- <div class="flex "><button @click="insertTable" class="border">Insert Table</button></div> -->
    <div class="grow">

      <QuillEditor
        id="quill_ourservice"
        ref="quill_ourservice"
        contentType="delta"
        @ready="initialQuill"
        @textChange="textChange"
      />

      <!-- toolbar="full"
      :modules="quill_modules" -->

    </div>
    <div class="mt-2">
      <button v-show="editButton" @click="editContent" class="flex items-center mx-1 text-orange-500 bg-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 rounded-lg border border-orange-200 text-sm font-medium px-5 py-2 hover:text-orange-900 focus:z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        แก้ไข
      </button>
      <div class="flex">
      <button v-show="!editButton" @click="confirmChange" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        บันทึก
      </button>
      <button v-show="!editButton" @click="cancelEditContent" class="flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10">
        <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        ยกเลิก
      </button>
      <!-- <button v-show="!editButton" @click="viewHtml" class="flex items-center mx-1 text-indigo-500 bg-white hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 rounded-lg border border-indigo-200 text-sm font-medium px-5 py-2 hover:text-indigo-900 focus:z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        HTML
      </button> -->
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col ">
    <div class="grow">
        <QuillRichTextEditor v-model="branchSubMenu.detail_html" read-only />
<!--      <div class="ql-container ql-snow">-->
<!--        <div class="ql-editor" v-html="branchSubMenu.detail_html"></div>-->
<!--      </div>-->
    </div>
  </div>

  <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Error atque consequatur consequuntur aliquid, magnam laudantium, cupiditate culpa earum est officia ex perferendis exercitationem totam assumenda voluptates quod aliquam minus voluptatem?
  Aperiam tempora odit fugit excepturi odio distinctio ratione pariatur dolores laudantium, laborum doloremque earum error a! Vitae, distinctio fuga. Dicta enim nobis nemo in rem provident. Itaque doloremque impedit qui.
  Minima fuga earum quo cum harum consequuntur voluptates iste a maiores quaerat nam illum asperiores ut impedit nemo possimus, magni natus nostrum quis id. Deserunt exercitationem nostrum repellat sint quod?
  Cumque eligendi reiciendis eaque numquam illo blanditiis deleniti, nisi expedita recusandae consequatur repudiandae repellat animi magni rem fuga ipsum doloribus voluptate facere quasi aut incidunt? Eaque est doloribus aliquam odit?
  Quibusdam suscipit voluptatem nisi, quia sunt dignissimos eveniet dolor, quisquam repudiandae distinctio tempore, qui quos velit a reprehenderit! Dicta error aspernatur quas aperiam vel perferendis natus nihil qui aut ipsa?
  Dicta ipsa aliquid, aperiam eius ab iste exercitationem explicabo tenetur laboriosam! Possimus sunt, aut aspernatur, quasi, doloribus nam molestias perferendis incidunt nihil enim quia laudantium quas error quaerat ad eos?
  Voluptatum praesentium in assumenda? Minus nisi sed at ad, est incidunt unde similique pariatur repellendus qui ducimus veniam adipisci perspiciatis atque quas tempora distinctio quod tenetur numquam fugit molestiae asperiores?
  Nostrum corrupti cum velit, tenetur, nemo dolor debitis eum iusto ullam doloribus delectus rem dignissimos explicabo enim veniam asperiores cumque laudantium soluta eius, dicta nam? Dignissimos voluptas ullam quo modi!
  Velit, dicta ut? Officiis quis vero exercitationem eveniet voluptate! Id eos quasi incidunt animi aliquid nihil, sunt saepe a error corporis iste suscipit! Amet at maxime suscipit temporibus ab molestiae!
  Unde perferendis rem autem. Quod, asperiores nemo incidunt ullam nihil ut reprehenderit adipisci repellat suscipit quisquam, voluptates consectetur, magnam pariatur. Quia consequuntur hic quas itaque animi ducimus iste deleniti nam. -->
</template>

<script setup>
import { ref, onUnmounted, nextTick, reactive } from 'vue'
import { useForm } from '@inertiajs/vue3'
import QuillRichTextEditor from '@/Components/RichTextEditor.vue';
// import BlotFormatter, { AlignAction, DeleteAction, ResizeAction, ImageSpec } from 'quill-blot-formatter'
//import QuillBetterTable from 'quill-better-table'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

import ComingSoon from '@/Components/ComingSoon.vue'
import Swal from "sweetalert2";

// class CustomImageSpec extends ImageSpec {
//     getActions() {
//       return [AlignAction, DeleteAction, ResizeAction];
//     }
// }

// class RemoveImageSpec extends ImageSpec {
//     getActions() {
//       return [];
//     }
// }

// ถูกส่งเป็น props เข้ามาจากหน้า BranchTemplateEditor หรือ BranchDetails เพราะใช้หน้านี้ในการแสดงผลร่วมกัน
const props = defineProps({
  division_id: { type: Number, required: true  },
  branchSubMenu: { type: Object, required: true },
  display_content: { type: String, required: true}
})

onUnmounted(() => {
    window.removeEventListener('click', pasteImage, false)
})

const quill_ourservice = ref()
const editButton = ref(true)
const baseUrl = ref(base_url)
const uploadFileList = ref([])
const imgDeleted = reactive([])
const imgInserted = reactive([])

const form = useForm({
  id: null,
  detail_delta: null,
  detail_html: null
})

const quill_modules = ref([
  {
    // name: 'blotFormatter',
    // module: BlotFormatter,
    // options: {
    //   specs: [
    //     RemoveImageSpec,
    //   ],
    //   overlay: {
    //     style: {
    //       border: '2px solid red',
    //     }
    //   },
    // }
  },
  // {
  //   name: 'tableUI',
  //   module: QuillTableUI.default,
  //   table: true,
  //   tableUI: true,
  // },
  // {
  //   name: 'better-table',
  //   module: QuillBetterTable,
  //   table: false,
  //   'better-table': {
  //     operationMenu: {
  //       items: {
  //         unmergeCells: {
  //           text: 'Another unmerge cells name'
  //         }
  //       },
  //       color: {
  //         colors: ['green', 'red', 'yellow', 'blue', 'white'],
  //         text: 'Background Colors:'
  //       }
  //     }
  //   }
  // }
])

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
  const deleted = getImgUrls(quill_ourservice.value.getContents().diff(e.oldContents))

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
        let editor = document.querySelector(`#quill_ourservice .ql-editor`)
        // move to last child to update scrollY
        setTimeout(() => {
          editor.lastChild.scrollIntoView()

          let editorRect = document.querySelector(`#quill_ourservice .ql-editor`).getBoundingClientRect()
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

// var toolbarOptions = {
//   handlers: {
//     // handlers object will be merged with default handlers object
//     'link': function(value) {
//       if (value) {
//         var href = prompt('Enter the URL');
//         this.quill.format('link', href);
//       } else {
//         this.quill.format('link', false);
//       }
//     }
//   }
// }

const initialQuill = () => {
  quill_ourservice.value.getEditor().addEventListener('paste', pasteImage, false)
  // var toolbar = quill_ourservice.value.getQuill().getModule('toolbar');
  // toolbar.addHandler('image', selectLocalImage)
  quill_ourservice.value.setContents(JSON.parse(props.branchSubMenu.detail_delta))
  quill_ourservice.value.getQuill().enable(false)
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
            quill_ourservice.value.setContents(JSON.parse(props.branchSubMenu.detail_delta))
            cancelEditContent()
            return false
        }
    })
}

const editContent = () => {
  quill_ourservice.value.getQuill().enable(true)
  editButton.value = false
}

const cancelEditContent = () => {

  // ถ้ามีไฟล์รูปที่ insert เข้ามาเก็บที่ server แล้ว ต้องลบออกเพราะได้ยกเลิกการแก้ไข
  if( imgInserted.length ) {
    deleteFromServer(imgInserted)
  }

  // ทำการ clear list การ insert และ delete ให้เป็น array ว่าง
  imgDeleted.splice(0)
  imgInserted.splice(0)
  initialQuill()
  editButton.value = true
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
  fd.append('store_path', 'branch_content/' + props.division_id + '/images')

  // เรียก api โดยส่ง fd ที่เป็น form-data ที่มีค่าตัวแปรต่างๆ เข้าไปเป็น parameter
  axios.post(route('uploading_file_api'), fd, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then( res => {
    //console.log(res.data)
    //uploadFileList.value.push()

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
  let editor = quill_ourservice.value.getQuill()

  // push image url to rich editor.
  const range = editor.getSelection()
  editor.insertEmbed(range.index, 'image', `${url}`, 'user')

  // เพิ่ม list การ insert ไว้เพื่อใช้ในกรณี ยกเลิกการจัดเก็บก็ต้องลบรูปที่ insert เข้ามาด้วยเพื่อไม่ให้รูปค้างในระบบ
  imgInserted.push(url) && console.log('insert', imgInserted)

}


const saveContent = () => {
  //console.log(quill_ourservice.value.getHTML())
  form.id = props.branchSubMenu.id
  form.detail_delta = JSON.stringify(quill_ourservice.value.getContents())
  form.detail_html = quill_ourservice.value.getHTML()

  form.patch(route('admin.update_content_branch_sub_menu', form.id), {
    preserveState: false,
    // onBefore: () => {
    //    if( ! confirm('คุณต้องการจัดเก็บข้อมูล ใช่ หรือ ไม่ ?') ) {
    //       quill_ourservice.value.setContents(JSON.parse(props.branchSubMenu.detail_delta))
    //       cancelEditContent()
    //       return false
    //    }
    // },
    onSuccess: () => {
      toast('success', 'สำเร็จ', 'จัดเก็บข้อมูลเรียบร้อย')
      if( imgDeleted.length ) {
        deleteFromServer(imgDeleted)
      }
    },
    onError: (errors) => {
      let error_display = ''
      for ( let p in errors ) {
          error_display = error_display + `- ${errors[p]}<br/>`
      }
      toast('danger', 'พบข้อผิดพลาด', error_display);
    },
    onFinish: () => {
      form.reset()
      imgDeleted.splice(0)
      imgInserted.splice(0)
      editButton.value = true
    }
  })
}

const viewHtml = () => {
  console.log(quill_ourservice.value.getHTML())
}

</script>

<style>

</style>
