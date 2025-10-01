<template>
  <div class="bg-green-800 w-full h-full">
    <!-- Navigation starts -->
    <nav class="w-full mx-auto shadow">
      <div class="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
        <!-- Desktop horizontal nav -->
        <div class="h-full flex items-center">
          <div class="mr-10 flex items-center">
            <Link
              :href="route('index')"
              aria-label="SI MEDICINE"
              title="SI MEDICINE"
              class="inline-flex items-center"
            >
              <svg
                class="w-8  text-emerald-400 "
                viewBox="0 0 24 24"
                stroke-linejoin="round"
                stroke-width="2"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12"></rect>
                <rect x="3" y="17" width="7" height="6"></rect>
                <rect x="14" y="1" width="7" height="6"></rect>
                <rect x="14" y="11" width="7" height="12"></rect>
              </svg>
              <span class="ml-2 tracking-wide text-white uppercase block lg:hidden">
                <h2 class="max-w-lg mb-6 items-baseline text-xl font-bold tracking-tight text-white leading-none mt-5">
                    ศิริราช
                    <br />
                    <span class="relative px-0">
                      <!-- <div class="absolute inset-x-0 inset-y-1 bottom-0 h-5 transform -skew-x-12 bg-yellow-400"></div> -->
                      <span class="relative inline-block text-white text-lg italic">อายุรศาสตร์</span>
                    </span>
                </h2>
              </span>
            </Link>
          </div>

          <ul class="pr-12 lg:flex items-center h-full hidden space-x-6">
            <template v-for="main_menu_item in main_menu" :key="main_menu_item.main_menu_id">
              <li v-if="( ($page.url === '/') && (main_menu_item.main_menu_id === 1)) || ( ($page.url.startsWith('/#')) && (main_menu_item.main_menu_id === 1) )" class="hoverable">
                <a
                  :aria-label="main_menu_item.main_menu_name"
                  :title="main_menu_item.main_menu_name"
                  class="font-medium cursor-pointer tracking-wide transition-colors duration-200"
                  :class="[isScroll ? 'change_text-menu-color' : 'text-menu-color']"
                  >{{ main_menu_item.main_menu_name }}
                </a>
                <div v-if="main_menu_item.has_sub_menu" class="sub-menu z-20 w-56 py-7 rounded-md shadow-xs ">
                  <template v-for="sub_menu_item in filterSubMenuByID(sub_menu, main_menu_item.main_menu_id)" :key="sub_menu_item.sub_menu_id">
                    <div class="flex flex-row items-baseline text-menu-color sub-menu-background-color px-4 py-1">
                      <div v-html="pic_heading_submenu"></div>
                      <a v-if="sub_menu_item.sub_menu_link.startsWith('#')" :href="sub_menu_item.sub_menu_link" class="font-medium capitalize transition-colors duration-200 transform">{{ sub_menu_item.sub_menu_name }}</a>
                      <Link v-else :href="route(`${sub_menu_item.sub_menu_link}`)">{{ sub_menu_item.sub_menu_name }}</Link>
                    </div>
                  </template>
                </div>
              </li>
              <li v-else-if="main_menu_item.main_menu_id === 1">
                <Link :href="route('index')" class="font-medium cursor-pointer tracking-wide text-menu-color transition-colors duration-200">
                  <button class="p-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </button>
                </Link>
              </li>
              <li v-else :class="{'hoverable': main_menu_item.has_sub_menu}">
                <a v-if="main_menu_item.has_sub_menu"
                  :aria-label="main_menu_item.main_menu_name"
                  :title="main_menu_item.main_menu_name"
                  class="font-medium cursor-pointer tracking-wide transition-colors duration-200"
                  :class="[isScroll ? 'change_text-menu-color' : 'text-menu-color']"
                  >{{ main_menu_item.main_menu_name }}
                </a>
                <Link v-else
                  :href="route(`${main_menu_item.main_menu_link}`)"
                  class="font-medium tracking-wide transition-colors duration-200"
                  :class="[isScroll ? 'change_text-menu-color' : 'text-menu-color']"
                > {{ main_menu_item.main_menu_name }}
                </Link>
                <div v-if="main_menu_item.has_sub_menu" class="sub-menu z-20 w-56 py-7 rounded-md shadow-xs ">
                  <template v-for="sub_menu_item in filterSubMenuByID(sub_menu, main_menu_item.main_menu_id)" :key="sub_menu_item.sub_menu_id">
                    <div class="flex flex-row items-baseline text-menu-color sub-menu-background-color px-4 py-1">
                      <div v-html="pic_heading_submenu"></div>
                      <a v-if="sub_menu_item.sub_menu_link.startsWith('#')" :href="sub_menu_item.sub_menu_link" class="font-medium capitalize transition-colors duration-200 transform">{{ sub_menu_item.sub_menu_name }}</a>
                      <a v-else-if="sub_menu_item.sub_menu_link.startsWith('http')" :href="sub_menu_item.sub_menu_link" target="_blank" class="font-medium capitalize transition-colors duration-200 transform">{{ sub_menu_item.sub_menu_name }}</a>
                      <a v-else :href="route(`${sub_menu_item.sub_menu_link}`)">{{ sub_menu_item.sub_menu_name }}</a>
                        <!--  <Link v-else :href="route(`${sub_menu_item.sub_menu_link}`)">{{ sub_menu_item.sub_menu_name }}</Link> -->
                    </div>
                  </template>
                </div>
              </li>
            </template>
          </ul>
        </div>

        <div class="h-full lg:flex items-center justify-end hidden">
          <div class="w-full h-full flex items-center">
            <div class="w-full h-full flex">
              <div aria-haspopup="true" class="cursor-pointer w-full flex items-center justify-end relative">
                <Link
                  :href="route('login')"
                  class="text-white py-2 px-4 uppercase rounded-sm bg-emerald-500 hover:bg-emerald-600 flex items-center shadow-sm hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <!-- เข้าสู่ระบบ -->
                </Link>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Side nav -->
          <div id="mobile-nav" class="visible lg:hidden flex items-center z-50 bg-gray-800/25">
            <div v-show="isMenuOpen" id="mobile-overlay" class=" flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 inset-0 z-50 justify-center sm:h-full bg-gray-800/25">
              <ul v-show="isMenuOpen" class="z-40 w-10/12 md:w-2/5 max-h-screen p-4 border-r bg-green-800 absolute rounded-sm -top-16 left-0 right-0 shadow-sm mt-16 md:mt-16 hidden overflow-scroll">
                <li>
                  <div class="flex items-center w-full justify-between">
                    <div class="flex">
                      <Link
                        :href="route('index')"
                        aria-label="SI MEDICINE"
                        title="SI MEDICINE"
                        class="inline-flex items-center"
                      >
                        <svg
                          class="w-8  text-emerald-400"
                          viewBox="0 0 24 24"
                          stroke-linejoin="round"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-miterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12"></rect>
                          <rect x="3" y="17" width="7" height="6"></rect>
                          <rect x="14" y="1" width="7" height="6"></rect>
                          <rect x="14" y="11" width="7" height="12"></rect>
                        </svg>
                        <span class="ml-2 tracking-wide text-white uppercase block lg:hidden">
                          <h2 class="max-w-lg mb-6 items-baseline text-xl font-bold tracking-tight text-white leading-none mt-5">
                              ศิริราช
                              <br />
                              <span class="relative px-0">
                                <span class="relative inline-block text-white text-lg italic">อายุรศาสตร์</span>
                              </span>
                          </h2>
                        </span>
                      </Link>
                    </div>
                    <div>
                        <div class="hidden close-m-menu cursor-pointer" @click="SideMenuHandler($event, false)">
                            <svg aria-label="Close" v-bind:xmlns="xmlns" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                    </div>
                  </div>
                </li>
                <li class="mt-2 mb-4">
                    <hr class="border-b border-white w-full" />
                </li>
                <template v-for="main_menu_item in main_menu" :key="main_menu_item.main_menu_id">
                  <li v-if="($page.url === '/' && main_menu_item.main_menu_id === 1) || ($page.url.startsWith('/#') && main_menu_item.main_menu_id === 1)" class="dropsidemenu">
                    <MobileMainMenu
                      :has_sub_menu="main_menu_item.has_sub_menu"
                      :pic_heading_submenu="pic_heading_submenu"
                      :menu_name="main_menu_item.main_menu_name"
                      :menu_link="main_menu_item.main_menu_link"
                      :sub_menu="filterSubMenuByID(sub_menu, main_menu_item.main_menu_id)"
                    />
                  </li>
                  <li v-else-if="main_menu_item.main_menu_id === 1">
                    <Link :href="route('index')" class="font-medium cursor-pointer tracking-wide text-menu-color transition-colors duration-200">
                      <button class="p-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </button>
                    </Link>
                  </li>
                  <li v-else class="dropsidemenu">
                    <MobileMainMenu
                      :has_sub_menu="main_menu_item.has_sub_menu"
                      :pic_heading_submenu="pic_heading_submenu"
                      :menu_name="main_menu_item.main_menu_name"
                      :menu_link="main_menu_item.main_menu_link"
                      :sub_menu="filterSubMenuByID(sub_menu, main_menu_item.main_menu_id)"
                    />
                  </li>
                </template>

                <li class="mb-4">
                    <hr class="border-b border-white w-full" />
                </li>
                <Link
                  :href="route('login')"
                  :class="[isMenuOpen ? '' : 'hidden']"
                  class="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded-sm shadow-md bg-emerald-500 hover:bg-emerald-600 focus:shadow-outline focus:outline-hidden"
                  aria-label="Sign in"
                  title="Sign in"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <!-- เข้าสู่ระบบ -->
                </Link>
              </ul>
            </div>

            <!-- <svg @click="MenuHandler($event, true)" aria-haspopup="true" aria-label="Main Menu" v-bind:xmlns="xmlns" class="show-m-menu icon icon-tabler icon-tabler-menu dropsidemenu " width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <line x1="4" y1="8" x2="20" y2="8"></line>
                <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg> -->

            <svg @click="setIsOpen(true)" aria-haspopup="true" aria-label="Main Menu" v-bind:xmlns="xmlns" class="w-7 text-emerald-400 show-m-menu icon icon-tabler icon-tabler-menu dropsidemenu cursor-pointer" viewBox="0 0 24 24">
              <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
              <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"></path>
              <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"></path>
            </svg>


            <!-- <div class="hidden close-m-menu" @click="MenuHandler($event, false)">
                <svg aria-label="Close" v-bind:xmlns="xmlns" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div> -->
          </div>
      </div>
    </nav>
  </div>

    <TransitionRoot appear as="template" :show="isOpen">
        <Dialog
            :initial-focus="closeMenuButtonRef"
            class="fixed inset-0 overflow-hidden z-10"
            :open="isOpen" @close="setIsOpen">
            <TransitionChild
                enter="transition-opacity ease-in-out duration-300"
                enter-from="-translate-x-full"
                enter-to="translate-x-0"
                leave="transition-opacity ease-in-out duration-300"
                leave-from="translate-x-0"
                leave-to="-translate-x-full"
                as="template">
                <DialogOverlay class="absolute inset-0 bg-black/40"></DialogOverlay>
            </TransitionChild>

            <TransitionChild
                enter="transition-opacity ease-linear duration-200"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity ease-linear duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
                as="template">
                <div class="flex flex-col fixed inset-y-0 left-0 w-10/12 md:w-2/5 max-w-sm bg-green-800">
                    <div class="flex items-center justify-between p-4 shadow-sm ">
                        <DialogTitle class="text-lg font-semibold">
                            <div class="flex">
                                <Link
                                    :href="route('index')"
                                    aria-label="SI MEDICINE"
                                    title="SI MEDICINE"
                                    class="inline-flex items-center"
                                >
                                    <svg
                                        class="w-8 text-emerald-400"
                                        viewBox="0 0 24 24"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-miterlimit="10"
                                        stroke="currentColor"
                                        fill="none"
                                    >
                                        <rect x="3" y="1" width="7" height="12"></rect>
                                        <rect x="3" y="17" width="7" height="6"></rect>
                                        <rect x="14" y="1" width="7" height="6"></rect>
                                        <rect x="14" y="11" width="7" height="12"></rect>
                                    </svg>
                                <span class="ml-2 tracking-wide text-white uppercase">
                                  ศิริราช
                                  <br />
                                  <span class="relative px-0">
                                    <span class="relative  text-white text-lg italic">อายุรศาสตร์</span>
                                  </span>
                                </span>
                                </Link>
                            </div>
                        </DialogTitle>
                        <button @click="setIsOpen(false)"
                                class="p-1 rounded-full focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                ref="closeMenuButtonRef"
                        >
                            <XIcon class="w-6 h-6"></XIcon>
                        </button>
                    </div>

                    <div class="flex flex-col flex-1 px-4 overflow-y-auto">
                        <ul>
                            <li class="mb-4">
                                <hr class="border-b border-white w-full" />
                            </li>
                            <template v-for="main_menu_item in main_menu" :key="main_menu_item.main_menu_id">
                                <li v-if="($page.url === '/' && main_menu_item.main_menu_id === 1) || ($page.url.startsWith('/#') && main_menu_item.main_menu_id === 1)" class="dropsidemenu">
                                    <MobileMainMenu
                                        :has_sub_menu="main_menu_item.has_sub_menu"
                                        :pic_heading_submenu="pic_heading_submenu"
                                        :menu_name="main_menu_item.main_menu_name"
                                        :menu_link="main_menu_item.main_menu_link"
                                        :sub_menu="filterSubMenuByID(sub_menu, main_menu_item.main_menu_id)"
                                        @click-tag="setIsOpen(false)"
                                    />
                                </li>
                                <li v-else-if="main_menu_item.main_menu_id === 1">
                                    <Link :href="route('index')" class="font-medium cursor-pointer tracking-wide text-menu-color transition-colors duration-200">
                                        <button class="p-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </button>
                                    </Link>
                                </li>
                                <li v-else>
                                    <MobileMainMenu
                                        :has_sub_menu="main_menu_item.has_sub_menu"
                                        :pic_heading_submenu="pic_heading_submenu"
                                        :menu_name="main_menu_item.main_menu_name"
                                        :menu_link="main_menu_item.main_menu_link"
                                        :sub_menu="filterSubMenuByID(sub_menu, main_menu_item.main_menu_id)"
                                    />
                                </li>
                            </template>
                            <li class="mb-4">
                                <hr class="border-b border-white w-full" />
                            </li>
                            <Link
                                :href="route('login')"
                                class="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded-sm shadow-md bg-emerald-500 hover:bg-emerald-600 focus:shadow-outline focus:outline-hidden"
                                aria-label="Sign in"
                                title="Sign in"
                                @click="setIsOpen(false)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                        </ul>
                    </div>


                </div>
            </TransitionChild>
        </Dialog>
    </TransitionRoot>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import {
    Dialog,
    DialogOverlay,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    TransitionRoot,
    TransitionChild
} from '@headlessui/vue'
import {XIcon,} from '@heroicons/vue/solid';
import MobileMainMenu from '@/Components/MobileMainMenu.vue'

onMounted(() => {
    window.addEventListener("scroll", updateScroll);
    window.addEventListener('click', closeSideMenuWhenClickOutSide)
})

onUnmounted(() => {
    window.removeEventListener("scroll", updateScroll);
    window.removeEventListener('click', closeSideMenuWhenClickOutSide)
})

const xmlns = ref('http://www.w3.org/2000/svg')
const xlink = ref('http://www.w3.org/1999/xlink')

const pic_heading_submenu = ref('<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>')
const isMenuOpen = ref(false)
const isShow = ref(false)
const isScroll = ref(false)
let closeMenuButtonRef =ref(null)
//const items_visibility = ref([true, true, true, true]);

const toggle_menu = (event) => {
  isMenuOpen.value = false
}

const isOpen = ref(false)

function setIsOpen(value) {
    isOpen.value = value
}

// const toggle_visibleby_class = (index) => {
//   items_visibility.value[index] = !items_visibility.value[index];
//   //console.log(items_visibility);
// }

const main_menu = ref([
  {'main_menu_id':1,  'main_menu_name': 'หน้าหลัก', 'main_menu_link': 'index', 'has_sub_menu':true, },
  {'main_menu_id':2,  'main_menu_name': 'เกี่ยวกับเรา', 'main_menu_link': 'index', 'has_sub_menu':true, },
  {'main_menu_id':3,  'main_menu_name': 'สาขาวิชา', 'main_menu_link': 'branch', 'has_sub_menu':false, },
  {'main_menu_id':4,  'main_menu_name': 'การศึกษา', 'main_menu_link': 'index', 'has_sub_menu':true, },
  {'main_menu_id':5,  'main_menu_name': 'บริการทางการแพทย์', 'main_menu_link': 'index', 'has_sub_menu':true, },
  {'main_menu_id':6,  'main_menu_name': 'วิจัยวิชาการ', 'main_menu_link': 'index', 'has_sub_menu':true, },
  {'main_menu_id':7,  'main_menu_name': 'ติดต่อเรา', 'main_menu_link': 'contact_us', 'has_sub_menu':false, },
])

const sub_menu = ref([
  {'sub_menu_id':1, 'main_menu_id':1, 'display_order':4, 'sub_menu_name':'ภาพกิจกรรม', 'sub_menu_link':'#photo_gallery'},
  {'sub_menu_id':2, 'main_menu_id':1, 'display_order':3, 'sub_menu_name':'ข่าวประชาสัมพันธ์', 'sub_menu_link':'#announcement'},
  {'sub_menu_id':3, 'main_menu_id':1, 'display_order':2, 'sub_menu_name':'ดาวน์โหลด', 'sub_menu_link':'#download'},
  {'sub_menu_id':4, 'main_menu_id':1, 'display_order':5, 'sub_menu_name':'ลิงก์ที่เกี่ยวข้อง', 'sub_menu_link':'#links'},
  // {'sub_menu_id':19, 'main_menu_id':1, 'display_order':1, 'sub_menu_name':'ความรู้สำหรับประชาชน', 'sub_menu_link':'#knowledge_for_people'},
  {'sub_menu_id':5, 'main_menu_id':2, 'display_order':1, 'sub_menu_name':'ประวัติภาควิชา', 'sub_menu_link':'history'},
  {'sub_menu_id':6, 'main_menu_id':2, 'display_order':1, 'sub_menu_name':'โครงสร้างภาควิชา', 'sub_menu_link':'org_chart'},
  {'sub_menu_id':7, 'main_menu_id':2, 'display_order':1, 'sub_menu_name':'กรรมการบริหาร', 'sub_menu_link':'executive_director'},
  {'sub_menu_id':8, 'main_menu_id':2, 'display_order':1, 'sub_menu_name':'ทำเนียบหัวหน้าภาค', 'sub_menu_link':'department_leader'},
  {'sub_menu_id':9, 'main_menu_id':2, 'display_order':1, 'sub_menu_name':'ที่ปรึกษาภาควิชา', 'sub_menu_link':'consultant'},
  // {'sub_menu_id':10, 'main_menu_id':2, 'display_order':1, 'sub_menu_name':'บุคลากรทางการแพทย์', 'sub_menu_link':'under_construction'},
  {'sub_menu_id':11, 'main_menu_id':2, 'display_order':1, 'sub_menu_name':'บุคลากรสำนักงาน', 'sub_menu_link':'officer'},
  {'sub_menu_id':12, 'main_menu_id':4, 'display_order':1, 'sub_menu_name':'ระดับแพทยศาสตรบัณฑิต', 'sub_menu_link':'under_construction'},
  {'sub_menu_id':13, 'main_menu_id':4, 'display_order':1, 'sub_menu_name':'ระดับหลังปริญญา', 'sub_menu_link':'post_graduate'},
  {'sub_menu_id':14, 'main_menu_id':5, 'display_order':1, 'sub_menu_name':'คลินิกอายุรศาสตร์', 'sub_menu_link':'https://www.si.mahidol.ac.th/th/schedule.asp?sid=14'},
  {'sub_menu_id':15, 'main_menu_id':5, 'display_order':1, 'sub_menu_name':'คลินิกพิเศษ (นอกเวลาราชการ)', 'sub_menu_link':'https://www.si.mahidol.ac.th/th/division/special_clinic/morepages.asp?pg=s'},
  {'sub_menu_id':16, 'main_menu_id':6, 'display_order':1, 'sub_menu_name':'ผลงานที่ได้รับการตีพิมพ์', 'sub_menu_link':'https://www.si.mahidol.ac.th/th/department/medicine/dept_publication.asp'},
  {'sub_menu_id':17, 'main_menu_id':6, 'display_order':1, 'sub_menu_name':'ประชุมวิชาการอายุรศาสตร์', 'sub_menu_link':'under_construction'},
  {'sub_menu_id':18, 'main_menu_id':6, 'display_order':1, 'sub_menu_name':'จำหน่ายหนังสือ', 'sub_menu_link':'under_construction'},
])

const filterSubMenuByID = (arr, id) => {
  //return arr.filter(el => el.main_menu_id === id).sort( (a, b) => { return a.display_order - b.display_order })
  return arr.filter(el => el.main_menu_id === id).sort( (a, b) => { return a.display_order - b.display_order })
}

const updateScroll = (event) => {
//this.scrollPosition = window.scrollY
//console.log(this.scrollPosition)
  if( window.scrollY > 281) {
    isScroll.value = true
    //console.log(isScroll.value)
  } else {
    if(isScroll.value) {
      isScroll.value = false
      //console.log(isScroll.value)
    }
  }
}

// const dropdownHandler = (event) => {
//             let single = event.currentTarget.getElementsByTagName("ul")[0];
//             single.classList.toggle("hidden");
// }

const MenuHandler = (el, val) => {

    console.log('Click')
    // console.log(val)
  let MainList = el.currentTarget.parentElement.getElementsByTagName("ul")[0];
  let closeIcon = el.currentTarget.parentElement.getElementsByClassName("close-m-menu")[0];
  //let showIcon = el.currentTarget.parentElement.getElementsByClassName("show-m-menu")[0];

  if (val) {
      MainList.classList.remove("hidden");
      el.currentTarget.classList.add("hidden");
      closeIcon.classList.remove("hidden");
  } else {
      // showIcon.classList.remove("hidden");
      // MainList.classList.add("hidden");
      // el.currentTarget.classList.add("hidden");
  }

  console.log('Before Click = ' + isMenuOpen.value)
  isMenuOpen.value = val
  console.log('After Click = ' + isMenuOpen.value)
}

const SideMenuHandler = (el, val) => {
  let MainList = document.getElementsByTagName("ul")[0];
  //let closeIcon = el.currentTarget.parentElement.getElementsByClassName("close-m-menu")[0];
  let closeIcon = document.getElementsByClassName("close-m-menu")[0];
  let showIcon = document.getElementsByClassName("show-m-menu")[0];

  showIcon.classList.remove("hidden");
  MainList.classList.add("hidden");
  closeIcon.classList.add("hidden");
  isMenuOpen.value = val
}

const closeSideMenuWhenClickOutSide = (event) => {
    if (!event.target.matches('.dropsidemenu')) {
        if( isMenuOpen.value ) {
            SideMenuHandler(event, false)
        }
    }
}

const closeSubMenu = (event) => {
    let x = document.getElementById("sub-menu");
    x.style.display = "none";
    console.log("Close Sub Menu")
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
}

</script>

<style scoped>
  .sub-menu {
    display: none;
    /* left: 0; */
    position: absolute;
    text-align: left;
    /* width: 100%; */
  }

  .hoverable {
    position: static;
  }

  .hoverable > a:after {
    content: "\25BC";
    font-size: 10px;
    padding-left: 6px;
    position: relative;
    top: -2px;
  }

  .hoverable:hover .sub-menu {
    display: block;
  }

  /*.hoverable:hover a:focus {*/
  /*    display: none;*/
  /*}*/

  /*.sub-menu > a:after:focus {*/
  /*    display: none;*/
  /*}*/

  .text-menu-color {
    color: white;
  }

  .text-menu-color:hover {
    /* text-decoration: solid underline 3px;
    text-decoration-color: #FFAB00; */
    font-weight: bold;
  }

  .sub-menu-background-color {
    background-color: #1B5E20
  }

  .sub-menu-background-color:hover {
    text-decoration: solid underline 3px;
    text-decoration-color: #FFAB00;
    font-weight: bold;
  }

  .change_text-menu-color {
      color: white;
   }

  .change_text-menu-color:hover {
      font-weight: bold;
  }

</style>
