<template>
    <div>
        <QuillEditor
            ref="quill_e"
            theme="snow"
            toolbar="full"
            v-model:content="form.deltaContent"
            contentType="delta"
            @ready="initialQuill"
            :options="editorOption"
        />
        <!-- :modules="editorModule" -->

        <div class="flex items-center space-x-2 mt-2 mb-4">
            <button @click="saveAgreement()" class="flex items-center mx-1 text-emerald-500 bg-white hover:bg-emerald-100 focus:ring-4 focus:ring-emerald-300 rounded-lg border border-emerald-200 text-sm font-medium px-5 py-2 hover:text-emerald-900 focus:z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                บันทึก
            </button>
            <button @click="true" class="flex items-center mx-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10">
                <svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                ยกเลิก
            </button>
        </div>
    </div>

    {{ form.deltaContent }}
   <div class="ql-container ql-snow">
        <div class="ql-editor" v-html="form.htmlContent"/>
   </div>
    {{ form.htmlContent }}

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'
// import BlotFormatter, { AlignAction, DeleteAction, ResizeAction, ImageSpec } from 'quill-blot-formatter';
//
// class CustomImageSpec extends ImageSpec {
//     getActions() {
//         return [AlignAction, DeleteAction, ResizeAction];
//     }
// }
//
// class RemoveImageSpec extends ImageSpec {
//     getActions() {
//         return [];
//     }
// }
// import { Quill } from "@vueup/vue-quill";
// import { ImageActions } from '@xeger/quill-image-actions';
// import { ImageFormats } from '@xeger/quill-image-formats';
//
// Quill.register('modules/imageActions', ImageActions);
// Quill.register('modules/imageFormats', ImageFormats);

const props = defineProps({
    agreement: {type: Object, required: true}
});

const form = useForm({
    id: props.agreement.id,
    deltaContent: null,
    htmlContent: null
});

const editorOption = reactive({
    readOnly: false,
})

const quill_e = ref()

// const editorModule = [
        // {
        //     name: 'blotFormatter',
        //     module: BlotFormatter,
        //     specs: [
        //         CustomImageSpec,
        //     ],
        //     overlay: {
        //         style: {
        //             border: '2px solid red',
        //         }
        //     },
        //     options: {/* options */}
        // },
        // {
        //     name: 'imageActions',
        //     module: ImageActions,
        //     options: {}
        // },
        // {
        //     name: 'imageFormats',
        //     module: ImageFormats,
        //     options: {}
        // }
    // ]

// const editorModule = {
//     imageActions: {},
//     imageFormats: {},
// }

const initialQuill = () => {
  //quill_e.value.getEditor().addEventListener('paste', pasteImage, false)
  // var toolbar = quill_e.value.getQuill().getModule('toolbar');
  // toolbar.addHandler('image', selectLocalImage)
  quill_e.value.setContents(JSON.parse(props.agreement.detail_delta))
  quill_e.value.getQuill().enable(true)
}

const saveAgreement = () => {
    form.htmlContent = quill_e.value.getHTML()
}

</script>

<style>
/* p.ql-align-center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    background-color: yellow;
} */

/* p.ql-align-center {
    display: flex;
    justify-content: center;
    background-color: yellow;
}

p.ql-align-right {
    display: flex;
    justify-content: right;
    background-color: blue;
} */
</style>
