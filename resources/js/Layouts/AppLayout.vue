<template>
    <Header class="hidden lg:block"/>
    <div id="top" class="sticky top-0 z-10">

        <div class="w-full shadow-lg nav-background-color" :class="{change_color: scrollPosition > 281}" >
            <Navbar />
        </div>
    </div>

    <!-- Page Content -->
    <slot></slot>

    <div id="footer">
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/Layouts/Header.vue'
import Navbar from '@/Layouts/Nav.vue'
import Footer from '@/Layouts/Footer.vue'

const scrollPosition = ref(null)

onMounted(() => {
    window.addEventListener("scroll", updateScroll);
})

onUnmounted(() => {
    window.removeEventListener("scroll", updateScroll);
})

const updateScroll = (event) => {
    scrollPosition.value = window.scrollY
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
</style>
