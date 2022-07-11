//window._ = require('lodash')

//window.axios = require('axios')

//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest' 

import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { InertiaProgress } from '@inertiajs/progress'

import '../css/app.css';

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import VuePdfEmbed from 'vue-pdf-embed'

import AppLayout from '@/Layouts/AppLayout.vue'
import AdminAppLayout from '@/Layouts/Admin/AdminAppLayout.vue'

import { QuillEditor } from '@vueup/vue-quill'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
//import '@vueup/vue-quill/dist/vue-quill.snow.css'

const globalOptions = {
  // debug: 'info',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'align': [] }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      ['link', 'video', 'image'],
      ['clean']      
    ]
  },
  // placeholder: 'Compose an epic...',
  readOnly: true,
  theme: 'snow'
}

QuillEditor.props.globalOptions.default = () => globalOptions

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
      createApp({ render: () => h(App, props) })
        // .config.compilerOptions.isCustomElement = tag => tag.startsWith('trix-')
        .use(plugin)
        .component('Datepicker', Datepicker)
        .component('VuePdfEmbed', VuePdfEmbed)
        .component('QuillEditor', QuillEditor)
        .component('AppLayout', AppLayout)
        .component('AdminAppLayout', AdminAppLayout)
        .mixin({ methods: { route: window.route } }) // enable route() on template
        .mount(el)
    },
  })
  
InertiaProgress.init({ color: '#4B5563' });
  