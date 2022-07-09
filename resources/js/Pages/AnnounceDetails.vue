<template>
    <AnnounceCard 
      :announceDetails="announceItem"
      typeDetail="full" 
    />
</template>

<script setup>
import AnnounceCard from '@/Components/AnnounceItemInteractiveCardList.vue'

const props = defineProps({
    announceItem: { type: Object, required: true  },
})
</script>

<style>

</style>