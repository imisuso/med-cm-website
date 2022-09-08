<template>
    <div class="p-4 w-full self-center bg-gray-300">
        <!-- directive -->
        <!-- <div class="images" v-viewer>
            <img v-for="src in images" :key="src" :src="src">
        </div> -->

        <!-- <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <img class="object-cover border rounded-md w-full h-40 cursor-pointer" v-for="src in images" :key="src" :src="src">
        </div> -->
        
        <div class="px-4 py-2 mb-4 border-none text-lg font-bold text-black bg-amber-400 shadow-lg rounded-2xl">
            {{ desc }}
        </div>
        <!-- component -->
        <VueViewer
            :images="images"
        >
            <template #default="scope">
                <div class=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <!-- <img class="object-cover border rounded-md w-full h-40 cursor-pointer" v-for="src in scope.images" :key="src" :src="`${src}`"> -->
                    <img class="object-contain bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg border rounded-md w-full md:h-60 cursor-pointer" v-for="src in scope.images" :key="src" :src="`${src}`" />
                </div>
            </template>
        </VueViewer>
        
        <!-- api -->
        <!-- <button type="button" @click="show">Click to show</button> -->
    </div>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import { ref } from 'vue';
import { component as VueViewer } from 'v-viewer'
import 'viewerjs/dist/viewer.css';

// const options = reactive({
//         inline: true,
//         button: true,
//         navbar: true,
//         title: true,
//         toolbar: true,
//         tooltip: true,
//         movable: true,
//         zoomable: true,
//         rotatable: true,
//         scalable: true,
//         transition: true,
//         fullscreen: true,
//         keyboard: true,
//         url: 'data-source',
//       })

const props = defineProps({
    images: { type: Array, default: [] },
    desc: { type: String, default: ''}
})

const baseUrl = ref(base_url)

</script>

<style scoped>

</style>