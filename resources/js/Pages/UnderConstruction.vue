<template>
<!--    <AppLayout>-->
        <main class="bg-white overflow-hidden  relative">
            <!-- <header class="absolute top-0 left-0 right-0 z-20">
                <nav class="container mx-auto px-6 md:px-12 py-4">
                    <div class="md:flex justify-between items-center">
                        <div class="flex justify-between items-center">
                            <div class="md:hidden">
                                <button class="text-gray-800 focus:outline-none">
                                    <svg class="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="hidden md:flex md:items-center md:justify-end space-x-4">
                            <a href="#" class="px-3 py-2 transition ease-in duration-200 uppercase hover:text-gray-700 text-gray-400 focus:outline-none">
                                Shop
                            </a>
                            <a href="#" class="px-3 py-2 transition ease-in duration-200 uppercase hover:text-gray-700 text-gray-400 focus:outline-none">
                                Contact
                            </a>
                        </div>
                    </div>
                </nav>
            </header> -->
            <div class="container mx-auto h-auto pt-16 px-6 z-10 flex items-center justify-between">
                <div class="container mx-auto px-6 flex flex-col-reverse lg:flex-row justify-between items-center relative">
                    <div class="w-full mb-16 text-center lg:text-left">
                        <h1 class="font-light font-sans text-center lg:text-left text-5xl lg:text-8xl mt-12 md:mt-0 text-gray-700">
                            Sorry, this page <br /> is under <br/> construction.
                        </h1>
                        <Link :href="route('index')">
                            <button class="px-2 py-2 w-36 mt-16 font-light transition ease-in duration-200 hover:bg-yellow-400 border-2 text-lg border-gray-700 bg-yellow-300 focus:outline-none">
                                Go back home
                            </button>
                        </Link>
                    </div>
                    <div class="block w-full mx-auto md:mt-0 relative max-w-md lg:max-w-2xl">
                        <!-- <img :src="`${baseUrl}/images/construction.svg`"/> -->
                        <img src="../../asset/images/construction.svg" />
                    </div>
                </div>
            </div>
        </main>
<!--    </AppLayout>-->
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3'

const baseUrl = ref(base_url)
</script>

<style>

</style>
