<template>
  <!-- <div class="flex justify-between items-center mx-2 cursor-pointer" @click="toggleActive = !toggleActive ; $emit('button-is-toggle')">
    <div class="w-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': toggleActive}">
      <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-4': toggleActive,}"></div>
    </div>
  </div> -->

  <div class="flex justify-between items-center mx-2 cursor-pointer" @click="buttonToggle">
    <div class="w-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': status}">
      <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-4': status,}"></div>
    </div>
  </div>

  <!-- <div class="relative inline-block w-10 mx-1 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" name="toggle" id="toggle" v-model="status" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"/>
    <label class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
  </div> -->

</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    status: { type: Boolean, required: true }
})

const emit = defineEmits(['button-is-toggle'])

//const toggleActive = ref(props.status)

const buttonToggle = () => {
  //emit('update:status', $event.target.value)
  emit('button-is-toggle')
}

</script>

<style scoped>

/* .toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68D391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68D391;
} */
</style>
