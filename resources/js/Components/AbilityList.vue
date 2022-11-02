<template>
    <div class="grid grid-cols-12 space-y-1">
        <div class="col-span-12 md:col-span-4 flex items-center">{{ability.id}}. {{ability.name}}</div>
        <div class="col-span-12 md:col-span-6 px-1">
            <textarea name="" id=""
                   v-model="form.ability_label"
                   class="w-full rounded-md"
                   :disabled="!editButton"
            />
        </div>
        <div class="col-span-12 md:col-span-2 flex items-center space-x-2 font-semibold">
            <button @click="editButton = !editButton" v-if="!editButton" class="border bg-orange-400 p-1 mx-2 rounded-md text-white">edit</button>
            <button @click="confirmUpdateAbility(ability)" v-if="editButton" class="border bg-orange-500 p-1 mx-2 rounded-md text-white">save</button>
            <button v-if="editButton" @click="editButton = !editButton" class="border bg-gray-500 p-1 rounded-md text-white">cancel</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import {Link, useForm} from '@inertiajs/inertia-vue3'

import { ReplyIcon } from "@heroicons/vue/outline"

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import Swal from "sweetalert2";  // import the styling for the toast

const props = defineProps({
    ability: { type: Object, required: true, default: {} },
})

const form = useForm({
    ability_label: props.ability.label ? ref(props.ability.label) : ''
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

const confirmUpdateAbility = ( ability ) => {
    Swal.fire({
        title: `คุณต้องการแก้ไขราละเอียด Ability ที่ชื่อ ${ability.name} ?`,
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'แก้ไข',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            saveAbility(ability.id)
        }
    })
}

const saveAbility = (id) => {
    let error_display = ''

    form.patch(route('admin.ability.update', id), {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
            toast('success', 'สำเร็จ', 'แก้ไขข้อมูล Ability เรียบร้อย');
        },
        onError: (errors) => {
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            form.processing = false

        }
    });
    editButton.value = !editButton.value
}

</script>
