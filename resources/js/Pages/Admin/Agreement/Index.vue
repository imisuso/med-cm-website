<template>
    <!-- Modal สำหรับ confirm การลบ สาขา/หน่วยงาน -->
    <teleport to="body">
    <Modal :isModalOpen="true" modalSize="large">
    <!-- Modal Header -->
    <template v-slot:header>
        <div class="flex flex-col space-y-2">
            <div class="text-gray-900 text-xl font-medium dark:text-white">
                {{ agreement.title }}
            </div>
            <div>
                {{ dayjs(agreement.date_effected).locale('th').format('D MMMM BBBB เวลา H:mm') }}
            </div>
        </div>
    </template>
    <!-- Modal Body -->
    <template v-slot:body>
        <div class="flex flex-row justify-start items-center">
        <div class="ql-editor" v-html="agreement.detail_html">
            
        </div>
        </div>
    </template>
    <!-- Modal Footer -->
    <template v-slot:footer>
        <button @click="acceptAgreement" type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ยอมรับ</button>
        <Link
            as="button" type="button"
            :href="route('logout')"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
        >
            ไม่ยอมรับ
        </Link>
        
    </template>
    </Modal>
    </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal.vue'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

const props = defineProps({
    agreement: { type: Object, required: true }
})

dayjs.extend(buddhistEra)

const acceptAgreement = () => {
    Inertia.post(route('admin.accept-agreement'), { agreement_id: props.agreement.id }, 
    {   
        preserveState: false,
    });
}

</script>

<style>

</style>