<template>
    <AppLayout>

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
                <Committee />
            </section>      
        </div>

        <div id="officer">
            <section class="w-full py-2 bg-gray-50">
                <Officer />
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
    
    </AppLayout>

</template>

<script setup>

//import { ref } from 'vue';
import WhoWeAre from '@/Components/PostGraduate/WhoWeAre'
import VisionMission from '@/Components/PostGraduate/VisionMission'
import CourseDetail from '@/Components/PostGraduate/CourseDetail'
import CourseResult from '@/Components/PostGraduate/CourseResult'
import Committee from '@/Components/PostGraduate/Committee'
import Officer from '@/Components/PostGraduate/Officer'
import CriteriaDetail from '@/Components/PostGraduate/CriteriaDetail'
import ContactUs from '@/Components/PostGraduate/ContactUs'

</script>

<style scoped>
</style>