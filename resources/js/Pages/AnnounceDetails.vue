<template>
    <AnnounceCard 
      :announceDetails="announceItem"
      typeDetail="full" 
    />
</template>

<script setup>
import AnnounceCard from '@/Components/AnnounceCard'

const props = defineProps({
    announceItem: { type: Object, required: true  },
})
</script>

<style>

</style>