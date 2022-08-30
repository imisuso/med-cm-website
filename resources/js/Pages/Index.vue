<template>
<!--    <AppLayout>-->

        <!-- <div id="temlogin">
            <section class="w-full bg-white">
                <TempLogin />
            </section>
        </div> -->

        <div id="carousel">
            <section class="w-full bg-gradient-to-r from-slate-100">
                <!-- <MedPoster :posters="posters" /> -->
                <MedPoster />
            </section>
        </div>

        <div id="cov19" >
            <section class="w-full bg-gradient-to-l from-slate-100">
                <Cov19Service />
            </section>
        </div>

        <!-- <div id="knowledge_for_people" >
            <section class="w-full bg-gradient-to-r from-slate-100">
                <KnowledgeForPeople />
            </section>
        </div> -->

        <div id="download">
            <section class="w-full bg-gradient-to-l from-slate-100">
                <Download />
            </section>
        </div>

        <div id="announcement">
            <section class="w-full bg-gradient-to-r from-slate-100">
                <Announcement />
            </section>
        </div>

        <div id="photo_gallery">
            <section class="w-full py-2 bg-gradient-to-l from-slate-100">
                <PhotoGallery
                    data-aos="zoom-in"
                    data-aos-duration="2000"
                />
            </section>
        </div>

        <div id="links">
            <section class="w-full py-2 bg-gradient-to-r from-slate-100">
                <Links />
            </section>
        </div>

<!--    </AppLayout>-->

</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';
import TempLogin from '@/Components/TemporaryLogin.vue'
import KnowledgeForPeople from '@/Components/KnowledgeForPeople.vue'
import MedPoster from '@/Components/MedPoster.vue'
import PhotoGallery from '@/Components/PhotoGallery.vue'
import Cov19Service from '@/Components/Cov19Service.vue'
import Download from '@/Components/Download.vue'
import Announcement from '@/Components/Announcement.vue'
import Links from '@/Components/Links.vue'

import AOS from 'aos';
import 'aos/dist/aos.css';

// const posters = ref([])
// axios.get(route('list_enabled_poster')).then(res => {posters.value = [...res.data]} );

const handleAos = ({ detail }) => {
    if (!detail.dataset.statCounting) {
        return;
    }
    let counting = detail.querySelector('span');
    animateValue(counting, 0, detail.dataset.statCount, 2500);
};

onMounted(() => {
    AOS.init({duration: 1200, once: false});
    document.addEventListener('aos:in', handleAos);
});
onUnmounted(() => {
    document.removeEventListener('aos:in', handleAos);
});

const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

</script>

<style scoped>
</style>
