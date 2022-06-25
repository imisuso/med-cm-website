<template>
  <button class=" border rounded-md shadow-md bg-emerald-400 px-2 py-1 my-1" @click="dlClick">Download</button>
</template>

<script setup>
const props = defineProps({
    pdfFile: { type: String, default: '', required: true },
    origName: { type: String, default: '', required: true },
})

const dlClick = () => {
    axios({
            url: route('announce_download_pdf'),
            method: 'GET',
            params: {
                pdf_file: props.pdfFile,
                t: new Date().getTime()               
            },
            responseType: 'arraybuffer',
        }).then((response) => {
            //console.log(response)
            let blob = new Blob([response.data], {
                type: 'application/pdf'
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = props.origName
            link.click()
        });   
}

</script>

<style>

</style>