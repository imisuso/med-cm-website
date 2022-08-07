<template>
    <!-- <div class="hidden lg:block">
        <div class="flex flex-row">
            <AdminSideBar />
            <div class="px-5 mt-5 w-full">
                <slot></slot>
            </div>
        </div>

    </div>

    <div class="block lg:hidden">
        <AdminNavBar />
        <div class="px-5 mt-5">
            <slot></slot>
        </div>
    </div> -->

    <div class="flex flex-col lg:flex-row h-screen">
        <!-- <div class="hidden lg:block overflow-x-hidden overflow-y-scroll w-80"> -->
        <div class="hidden lg:block overflow-x-hidden w-80">
            <AdminSideBar />
        </div>
        <div class="block lg:hidden">
            <AdminNavBar />
        </div>
        <div class="overflow-y-scroll px-2 mt-5 w-full h-auto">
            <slot></slot>
        </div>
    </div>

</template>

<script setup>
import AdminSideBar from '@/Layouts/Admin/AdminSideBar.vue'
import AdminNavBar from '@/Layouts/Admin/AdminNavBar.vue'

</script>

<style>

</style>
