<template>
    <div class="bg-green-800">
        <div
        class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
        >
            <div class="relative flex items-center justify-between">
                <div class="flex items-center">
                <a
                    href="/"
                    aria-label="Company"
                    title="Company"
                    class="inline-flex items-center mr-8"
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
                    <span
                    class="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase"
                    >ศิริราช-อายุรศาสตร์</span
                    >
                </a>
                <!-- <ul class="flex items-center hidden space-x-8 lg:flex">
                    <li>
                    <a
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                        >Product</a
                    >
                    </li>
                    <li>
                    <a
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                        >Features</a
                    >
                    </li>
                    <li>
                    <a
                        href="/"
                        aria-label="Product pricing"
                        title="Product pricing"
                        class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                        >Pricing</a
                    >
                    </li>
                    <li>
                    <a
                        href="/"
                        aria-label="About us"
                        title="About us"
                        class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                        >About us</a
                    >
                    </li>
                </ul> -->
                </div>
                <!-- <ul class="flex items-center hidden space-x-8 lg:flex">
                <li>
                    <a
                    href="/"
                    aria-label="Sign in"
                    title="Sign in"
                    class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                    >Sign in</a
                    >
                </li>
                <li>
                    <a
                    href="/"
                    class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    aria-label="Sign up"
                    title="Sign up"
                    >
                    Sign up
                    </a>
                </li>
                </ul> -->
                <div class="lg:hidden">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                        @click="isMenuOpen = true"
                    >
                        <svg class="w-7 text-emerald-400" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                        ></path>
                        <path
                            fill="currentColor"
                            d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                        ></path>
                        <path
                            fill="currentColor"
                            d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                        ></path>
                        </svg>
                    </button>
                    <div v-show="isMenuOpen" id="mobile-overlay" class=" flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 inset-0 z-50 justify-center sm:h-full bg-gray-800 bg-opacity-25">
                        <div v-if="isMenuOpen" class="z-10 absolute top-0 left-0 w-full">
                            <div class="p-5 bg-white border rounded shadow-sm">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                <a
                                    href="/"
                                    aria-label="Company"
                                    title="Company"
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
                                    <span
                                    class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase"
                                    >ศิริราช-อายุรศาสตร์</span
                                    >
                                </a>
                                </div>
                                <div>
                                <button
                                    aria-label="Close Menu"
                                    title="Close Menu"
                                    class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    @click="isMenuOpen = false"
                                >
                                    <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                    ></path>
                                    </svg>
                                </button>
                                </div>
                            </div>
<!--                                <nav>-->
<!--                                <div class="mt-6 mb-6 underline text-lg">เมนูการจัดการ</div>-->
<!--                                <ul class="space-y-4">-->
<!--                                <li>-->
<!--                                    <a -->
<!--                                        v-if="$page.props.auth.abilities.includes('manage_divisions')"-->
<!--                                        :href="route('admin.division')"-->
<!--                                        class="flex items-center py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"-->
<!--                                    >-->
<!--                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />-->
<!--                                        </svg>-->

<!--                                        <span class="mx-4 font-medium">สาขา/หน่วย</span>-->
<!--                                    </a>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <a -->
<!--                                        v-if="$page.props.auth.abilities.includes('manage_division_content')"-->
<!--                                        :href="route('admin.branch_template_editor')"-->
<!--                                        class="flex items-center py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" -->
<!--                                    >-->
<!--                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />-->
<!--                                        </svg>-->

<!--                                        <span class="mx-4 font-medium">เนื้อหาสาขา</span>-->
<!--                                    </a>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <Link-->
<!--                                        v-if="$page.props.auth.abilities.includes('manage_person')" -->
<!--                                        :href="route('admin.person')" :data="{ 'remember': 'forget' }" method="get" as="button" type="button"-->
<!--                                        class="flex items-center py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"-->
<!--                                    >-->
<!--                                        <svg class="w-5 h-5 text-emerald-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />-->
<!--                                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />-->
<!--                                        </svg>-->

<!--                                        <span class="mx-4 font-medium">บุคลากร</span>-->
<!--                                    </Link>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <a-->
<!--                                        v-if="$page.props.auth.abilities.includes('manage_announce')"-->
<!--                                        :href="route('admin.announce')"-->
<!--                                        class="flex items-center py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"-->
<!--                                    >-->
<!--                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />-->
<!--                                        </svg>-->

<!--                                        <span class="mx-4 font-medium">ข่าวประกาศ</span>-->
<!--                                    </a>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <a -->
<!--                                        v-if="$page.props.auth.abilities.includes('manage_posters')"-->
<!--                                        :href="route('admin.poster')"-->
<!--                                        class="flex items-center py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" -->
<!--                                    >-->
<!--                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">-->
<!--                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />-->
<!--                                        </svg>-->

<!--                                        <span class="mx-4 font-medium">โปสเตอร์</span>-->
<!--                                    </a>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <a -->
<!--                                        v-if="$page.props.auth.abilities.includes('manage_galleries')"-->
<!--                                        :href="route('admin.gallery')"-->
<!--                                        class="flex items-center py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" -->
<!--                                    >-->
<!--                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">-->
<!--                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />-->
<!--                                        </svg>-->

<!--                                        <span class="mx-4 font-medium">รูปกิจกรรม</span>-->
<!--                                    </a>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <a -->
<!--                                        v-if="$page.props.auth.abilities.includes('manage_download')"-->
<!--                                        :href="route('admin.download')"-->
<!--                                        class="flex items-center py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" -->
<!--                                    >-->
<!--                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">-->
<!--                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />-->
<!--                                        </svg>-->

<!--                                        <span class="mx-4 font-medium">ดาวน์โหลด</span>-->
<!--                                    </a>-->
<!--                                </li>-->
<!--                                -->
<!--                                <li>-->
<!--                                    <Link-->
<!--                                        as="button" type="button"-->
<!--                                        :href="route('logout')"-->
<!--                                        class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-emerald-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"-->
<!--                                        aria-label="Sign out"-->
<!--                                        title="Sign out"-->
<!--                                    >-->
<!--                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">-->
<!--                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />-->
<!--                                        </svg>-->
<!--                                    </Link>-->
<!--                                </li>-->
<!--                                </ul>-->
<!--                            </nav>-->
                                <nav>
                                    <AdminNavSideBar
                                        :item="item"
                                        v-for="item in navItems"
                                        :key="item.label">
                                    </AdminNavSideBar>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/inertia-vue3';
import AdminNavSideBar from "@/Layouts/Admin/AdminNavSideBar.vue";
import {
    CubeIcon,
    DocumentTextIcon, DownloadIcon,
    HandIcon,
    InformationCircleIcon, LogoutIcon, PhotographIcon, PresentationChartLineIcon,
    ShieldCheckIcon, SpeakerphoneIcon, TemplateIcon, UserGroupIcon,
    UsersIcon, DesktopComputerIcon
} from "@heroicons/vue/outline";

const isMenuOpen = ref(false)
const navItems = [
    {href: "admin.index", active: true, label:"แดชบอร์ด", children: [], ability:[], icon: DesktopComputerIcon},
    {href: "admin.index", active: false, label:"จัดการระบบ", children: [
            {href: "admin.role.index", active: false, label:"หน้าที่และสิทธิ์", children: [], ability:['manage_ability_role'], icon: ShieldCheckIcon},
            {href: "admin.user.index", active: false, label:"ผู้ใช้งาน", children: [], ability:['manage_users'], icon: UsersIcon},
            {href: "admin.log.index", active: false, label:"ข้อมูลการใช้งาน", children: [], ability:['view_log'], icon: InformationCircleIcon},
        ], ability:['manage_users', 'view_log', 'manage_ability_role'], icon: HandIcon},
    {href: "admin.index", active: true, label:"จัดการเนื้อหา", children: [
            {href: "admin.division", active: true, label:"สาขา/หน่วย", children: [], ability:['manage_divisions'], icon: CubeIcon},
            {href: "admin.branch_template_editor", active: true, label:"เนื้อหาสาขา", children: [], ability:['manage_division_content'], icon: DocumentTextIcon},
            {href: "admin.person", active: true, label:"บุคลากร", children: [], ability:['view_person'], icon: UserGroupIcon},
            {href: "admin.announce", active: true, label:"ข่าวประกาศ", children: [], ability:['manage_announce'], icon: SpeakerphoneIcon},
            {href: "admin.poster", active: true, label:"โปสเตอร์", children: [], ability:['manage_posters'], icon: PresentationChartLineIcon},
            {href: "admin.gallery", active: true, label:"รูปกิจกรรม", children: [], ability:['manage_galleries'], icon: PhotographIcon},
            {href: "admin.download", active: true, label:"ดาวน์โหลด", children: [], ability:['manage_download'], icon: DownloadIcon},
            // {href: "#", active: false, label:"ดาวน์โหลด", children: [
            //         {href: "#", active: true, label:"Level 3", children: [], role:[], icon: null},
            //     ], role:[], icon: null},
        ], ability:[], icon: TemplateIcon},
    {href: "logout", active: true, label:"ออกจากระบบ", children: [], ability:[], icon: LogoutIcon},
]


</script>

<style>

</style>
