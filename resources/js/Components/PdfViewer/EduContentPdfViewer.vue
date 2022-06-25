<template>
    <div class="w-full flex items-center justify-between border bg-stone-400 p-2">
        <template v-if="isLoading">
        Loading...
        </template>

        <template v-else>
          <div>
            <span v-if="showAllPages">
                {{ pageCount }} page(s)
            </span>

            <span v-else>
                <button :disabled="page <= 1" @click="page--">❮</button>

                {{ page }} / {{ pageCount }}

                <button :disabled="page >= pageCount" @click="page++">❯</button>
            </span>
          </div>

          <label class="right">
              <input v-model="showAllPages" type="checkbox">

              Show all pages
          </label>
        </template>
    </div>

    <div class="app-content">
        <!-- <VuePdfEmbed
            ref="pdfRef"
            :source="pdfSource"
            :page="page"
            @password-requested="handlePasswordRequest"
            @rendered="handleDocumentRender"
        /> -->
        <VuePdfEmbed
            ref="pdfRef"
            :source="pdfSource"
            :page="page"
            :width="720"
            @rendered="handleDocumentRender"
        />
    </div>
</template>

<script setup>
import { watchEffect, ref } from 'vue'

const props = defineProps({
    pdfFile: { type: String, required: true },
    allPages: { type: Boolean}
})

const pdfRef = ref()
const isLoading = ref(true)
const page = ref(1)
const pageCount =  ref(1)
const pdfSource = ref(props.pdfFile)
const showAllPages = ref(props.allPages ? props.allPages : false)

watchEffect( () => {
  page.value = showAllPages.value ? null : 1
})
// const showAllPages = computed( () => {
//   console.log(showAllPages.value)
//   page.value = showAllPages.value ? null : 1
// })

const handleDocumentRender = () => {
      isLoading.value = false
      pageCount.value = pdfRef.value.pageCount
}
    
const handlePasswordRequest = (callback, retry) => {
      callback(prompt(retry
        ? 'Enter password again'
        : 'Enter password'
      ))
}

</script>

<style scoped>
/* body {
  margin: 0;
  padding: 0;
  background-color: #ccc;
} */

/* canvas {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
} */

/* .app-header {
  padding: 16px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
  background-color: #555;
  color: #ddd;
} */

/* .app-content {
  padding: 24px 16px;
} */

/* .right {
  float: right;
} */
</style>