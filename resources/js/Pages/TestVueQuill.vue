<template>
    <div>
        <QuillEditor
            ref="quill_e"
            theme="snow"
            v-model:content="form.deltaContent"
            contentType="delta"
            toolbar="full"
            :options="options"
        />
    </div>
    <div>{{ form }}</div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'
import { reactive } from '@vue/reactivity'
//import { QuillEditor } from '@vueup/vue-quill'
//import '@vueup/vue-quill/dist/vue-quill.snow.css'


const props = defineProps({
    deltaContent: {type: Object, required: true}
});

const form = useForm({
    deltaContent: props.deltaContent
});

const options = reactive({
        readOnly: false,
      })

</script>
