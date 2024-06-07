<template>
<!--    <AppLayout>-->

        <div id="who_we_are">
            <section class="w-full bg-white">
                <WhoWeAre />
            </section>
        </div>


        <div id="vision_mission">
            <section class="w-full bg-gray-50">
                <VisionMission />
            </section>
        </div>


        <div id="course_detail">
            <section class="w-full bg-white">
                <CourseDetail />
            </section>
        </div>

        <div id="course_result">
            <section class="w-full bg-gray-50">
                <CourseResult />
            </section>
        </div>

        <div id="committee">
            <section class="w-full bg-white">
                <Committee
                    :committees="CommitteeData"
                />
            </section>
        </div>

        <div id="officer">
            <section class="w-full py-2 bg-gray-50">
                <Officer />
            </section>
        </div>

        <div id="criteria_detail">
            <section class="w-full py-2 bg-white">
                <ReportCommittee />
            </section>
        </div>

        <div id="criteria_detail">
            <section class="w-full py-2 bg-white">
                <CriteriaDetail />
            </section>
        </div>

        <div id="contact_us">
            <section class="w-full py-2 bg-gray-50">
                <ContactUs />
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

//import { ref } from 'vue';
import WhoWeAre from '@/Components/PostGraduate/WhoWeAre.vue'
import VisionMission from '@/Components/PostGraduate/VisionMission.vue'
import CourseDetail from '@/Components/PostGraduate/CourseDetail.vue'
import CourseResult from '@/Components/PostGraduate/CourseResult.vue'
import Committee from '@/Components/PostGraduate/Committee.vue'
import Officer from '@/Components/PostGraduate/Officer.vue'
import CriteriaDetail from '@/Components/PostGraduate/CriteriaDetail.vue'
import ContactUs from '@/Components/PostGraduate/ContactUs.vue'
import ReportCommittee from "@/Components/PostGraduate/ReportCommittee.vue";

const props = defineProps({
    CommitteeData: { type: Array, default: [] },
})

</script>

<style scoped>
</style>
