//window._ = require('lodash')

//window.axios = require('axios')

//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import SafeHtml from './Services/SafeHtml.js';

import '../css/app.css';

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import VuePdfEmbed from 'vue-pdf-embed'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import AppLayout from '@/Layouts/AppLayout.vue'
import AdminAppLayout from '@/Layouts/Admin/AdminAppLayout.vue'

// Import Library
import { i18nVue } from 'laravel-vue-i18n';

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    progress: {
        includeCSS: false,
        showSpinner: true,
    },
    setup({ el, App, props, plugin }) {
      createApp({ render: () => h(App, props) })
        .use(plugin)
        .use(VueSweetalert2)
        .directive('safe-html', SafeHtml)
        .component('Datepicker', Datepicker)
        .component('VuePdfEmbed', VuePdfEmbed)
        .component('AppLayout', AppLayout)
        .component('AdminAppLayout', AdminAppLayout)
        .mixin({ methods: { route: window.route } }) // enable route() on template
        // 2. ลงทะเบียน i18nVue
        .use(i18nVue, {
            // 1. บอกให้มันใช้ภาษาตามที่ Laravel ส่งมา (สำคัญมาก!)
            lang: props.initialPage.props.locale,
            // 2. การโหลดไฟล์ภาษา
          resolve: async lang => {
              const langs = import.meta.glob('../../lang/*.json');
              return await langs[`../../lang/${lang}.json`]();
          }
        })
        .mount(el)
    },
  })

// InertiaProgress.init({
//   // The color of the progress bar.
//   //color: '#dd6722',
//   // color: '#f53333',
//
//   // Whether to include the default NProgress styles.
//   includeCSS: false,
//
//   // Whether the NProgress spinner will be shown.
//   showSpinner: true,
// });
