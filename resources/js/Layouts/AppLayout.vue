<template>
    <Header class="hidden lg:block"/>
    <div id="top" class="sticky top-0 z-10">

        <div class="w-full shadow-lg nav-background-color" :class="{change_color: scrollPosition > 281}" >
            <Navbar />
        </div>
    </div>

    <!-- Page Content -->
    <slot></slot>

    <div class="">
        <button v-if="toTopButton" @click="goToTop">
            <ChevronDoubleUpIcon class="fixed z-50 bottom-16 w-14 h-14 right-8 border-0 p-2 rounded-full drop-shadow-md bg-indigo-500 text-gray-400 font-bold hover:text-white" />
        </button>
    </div>

    <div id="footer">
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/Layouts/Header.vue'
import Navbar from '@/Layouts/Nav.vue'
import Footer from '@/Layouts/Footer.vue'
import { ChevronDoubleUpIcon } from "@heroicons/vue/outline"

const scrollPosition = ref(null)
const toTopButton = ref(false)

onMounted(() => {
    window.addEventListener("scroll", updateScroll);
})

onUnmounted(() => {
    window.removeEventListener("scroll", updateScroll);
})

const updateScroll = (event) => {
    scrollPosition.value = window.scrollY
    if (scrollPosition.value > 200) {
        // console.log("show to top")
        toTopButton.value = true
    } else {
        toTopButton.value = false
        // console.log("hidden to top")
    }
}

// When the user scrolls down 200px from the top of the document, show the button
// window.onscroll = () => {
//             if (window.scrollY > 200) {
//                 // console.log("show to top")
//                 toTopButton.value = true
//             } else {
//                 toTopButton.value = false
//                 // console.log("hidden to top")
//             }
//         }

// When the user clicks on the button, scroll to the top of the document
const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// console.log("+1 hit")
</script>

<style>
    .nav-background-color {
    /* background-color: #651FFF; */  /* deep-purple-accent-400 */
    background-color: #1B5E20;
    }

    .change_color {
       /* background-color: #651FFF; */ /* deep-purple-accent-400 */
       /* background-color: white; */
       /* background-color: #B3E5FC; */
       background-color: #1B5E20;
   }

   /* Make clicks pass-through */
    #nprogress {
        pointer-events: none;
    }

    #nprogress .bar {
        background: #FFAB00;

        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;

        width: 100%;
        height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #FFAB00, 0 0 5px #FFAB00;
        opacity: 1.0;

        -webkit-transform: rotate(3deg) translate(0px, -4px);
            -ms-transform: rotate(3deg) translate(0px, -4px);
                transform: rotate(3deg) translate(0px, -4px);
    }

   #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        /* top: 100px;
        right: 500px; */
        top: 50%;
        left: 50%;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);
    }

    #nprogress .spinner-icon {
        width: 48px;
        height: 48px;
        box-sizing: border-box;

        border: solid 6px transparent;
        border-top-color: #FFAB00;
        border-left-color: #FFAB00;
        /* border-top-color: rgb(243, 48, 48);
        border-left-color: rgb(243, 48, 48); */
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
                animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
        position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
        0%   { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
