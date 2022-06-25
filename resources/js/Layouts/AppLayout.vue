<template>
    <!-- <div id="top" class="sticky top-0 z-10">
        <Header />
        <div class="w-full shadow-lg nav-background-color" :class="{change_color: scrollPosition > 281}" >
            <Navbar />
        </div>
    </div> -->

    <Header class="hidden lg:block"/>
    <div id="top" class="sticky top-0 z-10">
        
        <div class="w-full shadow-lg nav-background-color" :class="{change_color: scrollPosition > 281}" >
            <Navbar />
        </div>
    </div>

    <!-- <div class=" sticky top-0 z-10 w-full shadow-lg nav-background-color" :class="{change_color: scrollPosition > 281}" >
        <Navbar />
    </div> -->

    <!-- Page Content -->
    <!-- <main> -->
        <slot></slot>
    <!-- </main> -->
    
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