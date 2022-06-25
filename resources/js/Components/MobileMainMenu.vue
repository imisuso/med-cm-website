<template>
    <button v-if="has_sub_menu" class="text-white font-sans font-bold my-3 flex flex-row items-center dropsidemenu" @click="items_visibility = !items_visibility">
        {{ menu_name }}
        <svg v-if="items_visibility" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 dropsidemenu" viewBox="0 0 20 20" fill="currentColor">
            <path class="dropsidemenu" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 dropsidemenu" viewBox="0 0 20 20" fill="currentColor">
            <path class="dropsidemenu" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
    </button>

    <Link v-else :href="route(`${menu_link}`)">
        <button class="text-white font-sans font-bold my-3 flex flex-row items-center dropsidemenu">{{ menu_name }} :</button>
    </Link>

    <ul v-if="has_sub_menu" class="pl-1 border-white text-menu-color dropsidemenu" :class="{'hidden': !items_visibility}">
        <template v-for="sub_menu_item in sub_menu" :key="sub_menu_item.sub_menu_id">
            <li class="flex flex-row items-baseline mb-1 py-1 rounded-sm shadow-md dropsidemenu">
                <div v-html="pic_heading_submenu" class="inline-block"></div>
                <a v-if="sub_menu_item.sub_menu_link.startsWith('#')" :href="sub_menu_item.sub_menu_link" @click="true">{{ sub_menu_item.sub_menu_name }}</a>
                <a v-else-if="sub_menu_item.sub_menu_link.startsWith('http')" :href="sub_menu_item.sub_menu_link" target="_blank" @click="true">{{ sub_menu_item.sub_menu_name }}</a>
                <Link v-else :href="route(`${sub_menu_item.sub_menu_link}`)" @click="true">{{ sub_menu_item.sub_menu_name }}</Link>       
            </li>
        </template>
    </ul>
</template>

<script setup>
import { ref } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

const props = defineProps({
    has_sub_menu: { type: Boolean, required: true },
    pic_heading_submenu: { type: String, required: true },
    menu_name: { type: String, required: true },
    menu_link: { type: String, required: true },
    sub_menu: { type: Array, required: true }
})

const items_visibility = ref(true)

</script>

<style scoped>
    .text-menu-color {
        color: white; 
    }
</style>