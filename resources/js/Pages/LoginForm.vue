<template>
    <AppLayout>
        <section class="relative flex flex-wrap lg:h-96 lg:items-center">
            <div class="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-20 lg:mb-0">
                <div class="max-w-lg mx-auto text-center">
                        <div class="text-2xl font-bold sm:text-3xl">We're Medicine Team!</div>
                        <div class="font-medium text-gray-500 rounded-lg shadow-xl shadow-green-200">
                            <div>Login ด้วย Siriraj AD</div>
                            <div>ใช้ Username และ Password เดียวกับระบบ e-Document</div>
                        </div>
                </div>

                <!-- <form action="" class="max-w-md mx-auto mt-8 mb-0 space-y-4"> -->
                <div class="max-w-md mx-auto mt-8 mb-0 space-y-4">
                    <div>
                        <label for="username" class="sr-only">Username</label>

                        <div class="relative">
                        <input
                            v-model="form.username"
                            class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            placeholder="ระบุ username"
                            type="text"
                        />

                        <span class="absolute inset-y-0 inline-flex items-center right-4">
                            <!-- <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                            </svg> -->
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        </div>
                    </div>

                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <div class="relative">
                        <input
                            v-model="form.password"
                            :type="[showPass ? 'text' : 'password']"
                            @keyup.enter="focusLoginBtn"
                            class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            placeholder="ระบุ password"
                        />

                        <span class="absolute inset-y-0 inline-flex items-center right-4" @click="showPass = !showPass">
                            <svg v-if="showPass" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </span>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <!-- <p class="text-sm text-gray-500">
                        No account?
                        <a class="underline" href="">Sign up</a>
                        </p> -->
                        <!-- <p class="text-sm border p-2 rounded-md text-green-600">
                            <a href="/"> กลับหน้าหลัก... </a>
                        </p> -->

                        <button
                            id="loginBtn"
                            @click="clickLogin"
                            class="inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                            เข้าสู่ระบบ
                        </button>

                        <p class="text-sm border p-2 rounded-md text-green-600 hover:bg-gray-200">
                            <a :href="sso_url" target="_blank">ลืมรหัสผ่าน ?</a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
                <!-- <img
                    class="absolute inset-0 object-cover w-full h-full"
                    src="https://www.hyperui.dev/photos/team-1.jpeg"
                    alt=""
                /> -->
                <!-- <img
                    class="absolute inset-0 lg:-inset-y-4 object-cover lg:object-contain w-full h-full"
                    :src="`${baseUrl}/images/login_logo.jpg`"
                    alt=""
                /> -->
                <img
                    class="absolute inset-0 lg:-inset-y-4 object-cover lg:object-contain w-full h-full"
                    src="../../asset/images/login_logo.jpg"
                    alt=""
                />
            </div>
        </section>
    </AppLayout>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const showPass = ref(false)
const baseUrl = ref(base_url)

const props = defineProps({
    sso_url: { type: String },
})

const form = useForm({
    username: '',
    password: ''
})

const toast = (severity, summary, detail) => {
    createToast({
      title: summary,
      description: detail
    },
    {
      showIcon: true,
      transition: 'zoom',  // Can bounce, zoom, slide
      position: 'top-right', // Can top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
      type: severity,    // Can default, info, warning, success, danger
      timeout: 3000,
      //toastBackgroundColor: bg_color,
    })
}

const focusLoginBtn = () => {
    nextTick(() => {
        document.getElementById('loginBtn').focus();
    });
}

const clickLogin = () => {
    form.post(route('login_authen'), {
        onSuccess: () => {
            //toast('success', 'Login สำเร็จ', 'เข้าสู่ระบบเรียบร้อย')
            form.reset()
        },
        onError: (errors) => {
            toast('danger', 'พบข้อผิดพลาด', errors.msg)
        },
        onFinish: () => {
            form.processing = false
        }
    })
}

</script>

<style>

</style>
