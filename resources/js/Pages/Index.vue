<template>
<!--    <AppLayout>-->

        <!-- <div id="temlogin">
            <section class="w-full bg-white">
                <TempLogin />
            </section>
        </div> -->

    <WelcomePopup
        :open="isPopupVisible"
        @close="isPopupVisible = false"
    >
<!--        <template #title>-->
<!--            &nbsp;-->
<!--        </template>-->

        <template #default>
            <div class="text-center mt-2 bg-gradient-to-b from-gray-200 to-black text-white rounded-lg">
                <div class="mt-2">
                    <br>
                </div>
                    <img
                        src="../../asset/images/queen_mother.jpg"
                        alt="พระบรมฉายาลักษณ์"
                        class="h-96 m-auto rounded-lg"
                    >
                <p class="text-xl text-white font-semibold mt-2 ">
                    น้อมรำลึกในพระมหากรุณาธิคุณ
                    <br class="block md:hidden">
                    ตราบนิรันดร์
                </p>
                <br />
                <p class="text-xl text-white font-semibold">
                    สมเด็จพระนางเจ้าสิริกิติ์
                    <br class="block md:hidden">
                    พระบรมราชินีนาถ
                    <br>
                    พระบรมราชชนนีพันปีหลวง
                </p>
                <img
                    src="../../asset/images/line_thai.png"
                    alt="เส้นลายไทย"
                    class="h-14 w-full m-auto"
                >
                <p class="text-md text-white font-semibold mt-2 py-4">
                    ข้าพระพุทธเจ้า ผู้บริหาร คณาจารย์ บุคลากร แพทย์ประจำบ้าน
                    <br>
                    แพทย์ประจำบ้านต่อยอด และนักศึกษา
                    <br>
                    ภาควิชาอายุรศาสตร์
                    <br class="block md:hidden">
                    คณะแพทยศาสตร์ศิริราชพยาบาล
                    <br>
                    มหาวิทยาลัยมหิดล
                </p>
            </div>
        </template>
    </WelcomePopup>

        <div id="carousel">
            <section class="w-full bg-linear-to-r from-slate-100">
                <!-- <MedPoster :posters="posters" /> -->
                <MedPoster />
            </section>
        </div>

        <div id="cov19" >
            <section class="w-full bg-linear-to-l from-slate-100">
                <Cov19Service />
            </section>
        </div>

        <!-- <div id="knowledge_for_people" >
            <section class="w-full bg-linear-to-r from-slate-100">
                <KnowledgeForPeople />
            </section>
        </div> -->

        <div id="download">
            <section class="w-full bg-linear-to-l from-slate-100">
                <Download />
            </section>
        </div>

        <div id="announcement">
            <section class="w-full bg-linear-to-r from-slate-100">
                <Announcement
                    :limit=announce_show_limit
                    :announcement_all=announcement_all
                />
            </section>
        </div>

        <div id="photo_gallery">
            <section class="w-full py-2 bg-linear-to-l from-slate-100">
                <PhotoGallery
                    data-aos="zoom-in"
                    data-aos-duration="2000"
                    :limit=gallery_show_limit
                    :gallery_all=gallery_all
                />
            </section>
        </div>

        <div id="links">
            <section class="w-full py-2 bg-linear-to-r from-slate-100">
                <Links
                    :medcon_current_year=medcon_current_year
                    :medcon_other_year=medcon_other_year
                />
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
// import KnowledgeForPeople from '@/Components/KnowledgeForPeople.vue'
import MedPoster from '@/Components/MedPoster.vue'
import PhotoGallery from '@/Components/PhotoGallery.vue'
import Cov19Service from '@/Components/Cov19Service.vue'
import Download from '@/Components/Download.vue'
import Announcement from '@/Components/Announcement.vue'
import Links from '@/Components/Links.vue'
import WelcomePopup from '@/Components/Popup.vue'

import AOS from 'aos';
import 'aos/dist/aos.css';

const props = defineProps({
    announce_show_limit: { type: Number },
    announcement_all: { type: Number },
    gallery_show_limit: { type: Number },
    gallery_all: { type: Number },
    medcon_current_year: {type: Number},
    medcon_other_year: {type: Number}
})

// const posters = ref([])
// axios.get(route('list_enabled_poster')).then(res => {posters.value = [...res.data]} );

const isPopupVisible = ref(false);

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

    // ตั้งชื่อ Key ที่จะใช้เก็บ
    const popupKey = 'hasSeenWelcomePopup';

    // 1. ตรวจสอบว่าผู้ใช้เคยเห็น Popup นี้แล้วหรือยัง
    const hasSeen = sessionStorage.getItem(popupKey);

    // 2. ถ้ายังไม่เคยเห็น (hasSeen เป็น null)
    if (!hasSeen) {
        // 3. ให้แสดง Popup
        isPopupVisible.value = true;

        // 4. และ "บันทึก" ว่าเห็นแล้ว (ครั้งต่อไปจะได้ไม่แสดงอีก)
        sessionStorage.setItem(popupKey, 'true');
    }
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
