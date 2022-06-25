<template>
    <div class="container p-4">
        <!-- directive -->
        <!-- <div class="images" v-viewer>
            <img v-for="src in images" :key="src" :src="src">
        </div> -->
        <!-- component -->
        <VueViewer
            :images="props.images"
        >
            <template #default="scope">
                <div class=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <img class="object-cover border rounded-md w-full h-40 cursor-pointer" v-for="src in scope.images" :key="src" :src="`${baseUrl}/${src}`">
                </div>
            </template>
        </VueViewer>
        <!-- api -->
        <!-- <button type="button" @click="show">Click to show</button> -->
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { component as VueViewer } from 'v-viewer'

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
    images: { type: Array, default: [] }
})

const baseUrl = ref(base_url)

//console.log(props.images)

// const images =  ref([
//           "storage/images/gallery/25640101/photo/01.jpg",
//           "storage/images/gallery/25640101/photo/02.jpg",
//           "storage/images/gallery/25640101/photo/03.jpg",
//           "storage/images/gallery/25640101/photo/04.jpg",
//           "storage/images/gallery/25640101/photo/05.jpg",
//           "storage/images/gallery/25640101/photo/09.jpg"
//         ])
</script>

<style scoped>
@import 'viewerjs/dist/viewer.css';
</style>