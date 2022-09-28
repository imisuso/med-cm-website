<template>
    <div class="flex flex-col px-2 py-1 w-full">
        <div class="flex flex-row justify-between px-2 py-2 space-y-2 mt-2 mb-2 w-full border rounded-md shadow-md items-baseline">
            <div class="text-2xl font-bold">ประวัติการแก้ไขข้อมูล</div>
            <Link :href="route('admin.person')" method="get" as="button" type="button"
                  class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
            >
                กลับหน้าบุคลากร
            </Link>
        </div>

        <div class="flex flex-col">
            <div class="flex flex-col w-full mb-4">
                <PersonVersionInteractiveTable
                    :personDetails="person"
                    :personCurrent="person"
                    :personHistory="person_versions.data"
                />
            </div>
        </div>

<!--        <div class="flex flex-col">-->
<!--            <div class="flex flex-col w-full mb-4">-->
<!--                <PersonVersionInteractiveTable-->
<!--                    :personDetails="person"-->
<!--                />-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="flex flex-col">-->
<!--            <div class="flex flex-col w-full mb-4">-->
<!--                <PersonVersionInteractiveTable-->
<!--                    v-for="version in person_versions.data"-->
<!--                    :key="version.id"-->
<!--                    :personDetails="version"-->
<!--                />-->
<!--            </div>-->
<!--        </div>-->

        <div class="flex justify-center md:justify-end mt-2 px-4">
            <Pagination :pagination="person_versions"/>
        </div>

    </div>

</template>

<script>
import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"
export default {
    layout: AdminAppLayout,
}
</script>

<script setup>
import { ref } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import PersonVersionInteractiveTable from '@/Components/PersonVersionInteractiveTable.vue'
import Pagination from '@/Components/Paginations.vue'
// import { UserCircleIcon } from "@heroicons/vue/outline"
//
// import dayjs from 'dayjs'
// import 'dayjs/locale/th'
// import buddhistEra from 'dayjs/plugin/buddhistEra'

const props = defineProps({
    person: { type: Object, default: {} },
    person_versions: { type: Object, default: {} },
})

// dayjs.extend(buddhistEra)
</script>
