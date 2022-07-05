<template>
    <AnnounceCard 
      :announceDetails="announceItem"
      typeDetail="full" 
    />
</template>

<script setup>
import AnnounceCard from '@/Components/AnnounceItemInteractiveCardList'

const props = defineProps({
    announceItem: { type: Object, required: true  },
})
</script>

<style>

</style>