<template>
    <div class="flex items-center space-x-3 text-sm font-medium">

        <a
            href="/lang/th"
            class="cursor-pointer transition-colors duration-200"
            :class="{
        'text-yellow-400 font-bold underline': currentLocale === 'th',
        'text-gray-300 hover:text-white': currentLocale !== 'th'
      }"
        >
            TH
        </a>

        <span class="text-gray-400">|</span>

        <a
            href="/lang/en"
            class="cursor-pointer transition-colors duration-200"
            :class="{
        'text-yellow-400 font-bold underline': currentLocale === 'en',
        'text-gray-300 hover:text-white': currentLocale !== 'en'
      }"
        >
            EN
        </a>

    </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage();
// รับค่าภาษาปัจจุบันมาเพื่อทำ Highlight สีเหลือง
const currentLocale = computed(() => page.props.locale || 'th');
</script>
