<template>
    <!-- First Level -->
    <Link
        as="button" type="button"
        preserve-state
        :href="route(item.href)"
        v-if="! item.children.length"
        v-show="canUseMenu(item.ability) || ! item.ability.length"
        :class="[
            'group flex w-full items-center rounded-l-md py-2 px-3 text-sm',
            'hover:bg-green-100',
            item.active ? 'text-gray-800 font-semibold' : 'text-gray-800 font-semibold'
            // item.active ? 'text-gray-800 font-semibold' : 'text-gray-600 font-medium'
        ]"
    >
        <component
            :class="[
                'w-6 h-6 shrink-0 mr-2 group-hover:text-green-600',
                item.active ? 'text-gray-600' : 'text-gray-600'
                // item.active ? 'text-gray-600' : 'text-gray-400'
            ]"
            :is="item.icon"
            v-if="item.icon">

        </component>
        <span>{{ item.label }}</span>
    </Link>

    <Disclosure
        v-else
        v-slot="{open}"
        :default-open="hasActiveChild"
    >
        <DisclosureButton
            v-show="canUseMenu(item.ability) || ! item.ability.length"
            :class="[
                'group text-left flex w-full items-center rounded-l-md py-2 px-3 text-sm',
                'hover:bg-green-100',
                open ? 'font-semibold text-gray-800' : 'font-semibold text-gray-800'
                // open ? 'font-semibold text-gray-800' : 'font-medium text-gray-600'
            ]"
        >
            <component
                :class="[
                    'w-6 h-6 shrink-0 mr-2 group-hover:text-blue-600',
                    // 'w-6 h-6 shrink-0 mr-2 group-hover:text-gray-600',
                    open ? 'text-blue-600' : 'text-gray-600'
                    // open ? 'text-gray-600' : 'text-gray-400'
                ]"
                :is="item.icon"
                v-if="item.icon">

            </component>
            <span class="flex-1">{{ item.label }}</span>
            <ChevronRightIcon
                :class="[
                    'w-6 h-6 shrink-0',
                    open ? 'rotate-90 text-gray-600' : 'text-gray-400'
                ]"
            />
        </DisclosureButton>
        <DisclosurePanel class="ml-4">
            <AdminNavSideBar
                v-for="child in item.children"
                :item="child"
            >
            </AdminNavSideBar>
        </DisclosurePanel>
    </Disclosure>

</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import { ChevronRightIcon } from "@heroicons/vue/solid"
import { computed } from "vue";
import { usePage, Link } from "@inertiajs/inertia-vue3";

const props = defineProps({
    item: {type: Object }
})

const hasActiveChild = computed(() =>  {
    function hasActiveItem(items) {
        return items.some( item => item.active || hasActiveItem(item.children))
    }
    return hasActiveItem(props.item.children)
})

const canUseMenu = ( ability ) => {
    let hasAbility = false
    // for ( let i = 0; i < ability.length; i++ ) {
    //     if( usePage().props.value.auth.abilities.includes(ability[i]) ) {
    //         hasAbility = true
    //         break
    //     }
    // }

    hasAbility = ability.some( item =>  usePage().props.value.auth.abilities.includes(item) )
    // console.log(ability)
    // console.log(hasAbility)
    return hasAbility
}


</script>
