<template>
Hello
</template>

<!--<script>-->
<!--import AdminAppLayout from "@/Layouts/Admin/AdminAppLayout.vue"-->
<!--    export default {-->
<!--        layout: AdminAppLayout,-->
<!--    }-->
<!--</script>-->

<script setup>
import {onMounted, ref} from "vue";


const props = defineProps({
    total_visitor: { type: Number, default: 0 },
    branch_visitor: { type: Number, default: 0 },
    total_announce: { type: Number, default: 0 },
    total_poster: { type: Number, default: 0 }
})
</script>

<style>

</style>
