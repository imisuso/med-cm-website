<template>
    <div class=" container m-2">
        <div class=" text-3xl m-2 p-2">เพิ่มข้อมูลของสาขา</div>

        <div class="w-3/4 scroll-container">
            <QuillEditor :content="content" contentType="html" :toolbar="my_full" theme="snow" ref='quill' :modules="modules" :options="options">
            </QuillEditor>
        </div>
        <div><button @click="showData" class=" bg-green-900 text-white rounded-md m-2 p-2">จัดเก็บข้อมูล</button></div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
// import BlotFormatter from 'quill-blot-formatter'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default defineComponent ({
    components: {
        QuillEditor,
    },

    setup(props) {
        const quill = ref()
        const my_essential = ref([
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
                ['blockquote', 'code-block', 'link'],
                [{ 'color': [] }, 'clean'],
            ])

        const my_minimal = ref([
                [{ 'header': 1 }, { 'header': 2 }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
            ])

        const my_full = ref([
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                // [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown


                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                // [{ 'font': [] }],
                [{ 'align': [] }],

                ['link', 'video', 'image'],

                ['clean']                                         // remove formatting button
            ])
        const options = ref({scrollingContainer: '.scroll-container'})

        const content = ref('<h1 class="ql-align-center"><strong style="color: rgb(0, 138, 0);"><u>วิสัยทัศน์</u></strong></h1><ul><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li></ul><p><br></p> \
                             <h1 class="ql-align-center"><strong style="color: rgb(0, 102, 204);"><u>พันธกิจ</u></strong></h1><ol><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li></ol><p>  </p> \
                             <h1 class="ql-align-center"><strong style="color: rgb(153, 51, 255);"><u>คำขวัญ</u></strong></h1><ul><li class="ql-align-center">&lt; ใส่ข้อความที่นี่ &gt;</li></ul><p><br></p><p><br></p>')

        const showData = () => {
            //console.log(quill.value.getContents())
            console.log(quill.value.getHTML())

        }

        // const modules = {
        //     name: 'blotFormatter',
        //     module: BlotFormatter,
        //     options: {/* options */}
        // }

        return {
            content,
            quill,
            my_essential,
            my_minimal,
            my_full,
            showData,
            modules,
            options,
        }
    }
})
</script>

<style scoped>
    .scroll-container {
        overflow: auto;
        /* background-color: beige; */
        height: 720px;
    }
</style>
