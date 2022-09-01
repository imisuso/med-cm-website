<template>

    <div class="flex flex-col lg:flex-row h-screen">
        <div class="hidden lg:block overflow-x-hidden w-80">
            <AdminSideBar />
        </div>

        <div class="block lg:hidden">
            <AdminNavBar />
        </div>

        <div class="overflow-x-hidden px-2 w-full h-screen">
            <slot></slot>
        </div>

        <!-- <div>
            <button @click="goToTop">
                <ChevronDoubleUpIcon class="fixed z-50 bottom-16 w-14 h-14 right-8 border-0 p-2 rounded-full drop-shadow-md bg-indigo-500 text-gray-400 font-bold hover:text-white" />
            </button>
        </div> -->
    </div>

</template>

<script setup>
// import { ref, onMounted, onUnmounted } from 'vue';
import AdminSideBar from '@/Layouts/Admin/AdminSideBar.vue'
import AdminNavBar from '@/Layouts/Admin/AdminNavBar.vue'
// import { ChevronDoubleUpIcon } from "@heroicons/vue/outline"

// const toTopButton = ref(false)

// onMounted(() => {
//     console.log("On mounted")
//     window.addEventListener("scroll", handleScroll);
// })

// onUnmounted(() => {
//     console.log("On unmounted")
//     window.removeEventListener("scroll", handleScroll);
// })

// // When the user scrolls down 200px from the top of the document, show the button
// const handleScroll = () => {
//             if (window.scrollY > 200) {
//                 console.log("show to top")
//                 toTopButton.value = true
//             } else {
//                 toTopButton.value = false
//                 console.log("hidden to top")
//             }
//         }

// // When the user clicks on the button, scroll to the top of the document
// const goToTop = () => {
//     console.log("Click to top")
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// }

</script>

<style>

</style>
