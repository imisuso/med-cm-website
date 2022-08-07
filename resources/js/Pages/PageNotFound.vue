<template>
    <AppLayout>
        <section class="flex items-center h-full p-16">
            <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div class="max-w-md text-center">
                    <h2 class="mb-8 font-extrabold text-9xl">
                        <span class="sr-only">Error</span>404
                    </h2>
                    <p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p class="mt-4 mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
                    <a rel="noopener noreferrer" :href="route('index')">
                        <button class="rounded-md px-2 py-2 w-48 mt-16 font-light transition ease-in duration-200 hover:bg-yellow-400 border-2 text-lg border-gray-700 bg-yellow-300 focus:outline-none">
                            Back to homepage
                        </button>
                    </a>
                </div>
            </div>
        </section>
    </AppLayout>
</template>

<script setup>
// import { ref } from 'vue';

// const props = defineProps({
//     httpResponse: {type: Number,}
// });

// const baseUrl = ref(base_url)
</script>

<style>

</style>
