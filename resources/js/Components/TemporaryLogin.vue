<template>
<div class="flex items-start space-x-2 ">
    <Link href="/login-as/10039018">
    <button class="flex items-center px-3 py-1 text-sm font-bold text-black transition-colors duration-200 transform bg-emerald-500 rounded cursor-pointer hover:bg-emerald-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Super Admin
    </button>
    </Link>

    <Link href="/login-as/10010205">
    <button class="flex items-center px-3 py-1 text-sm font-bold text-black transition-colors duration-200 transform bg-blue-500 rounded cursor-pointer hover:bg-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        General Admin
    </button>
    </Link>

    <div class="flex flex-col space-y-1">
        <Link href="/login-as/10022569">
            <button class="flex items-center px-3 py-1 text-sm font-bold text-black transition-colors duration-200 transform bg-red-500 rounded cursor-pointer hover:bg-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Division Admin วักกะ
            </button>
        </Link>
        <Link href="/login-as/10032736">
            <button class="flex items-center px-3 py-1 text-sm font-bold text-black transition-colors duration-200 transform bg-red-500 rounded cursor-pointer hover:bg-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Division Admin ความดัน
            </button>
        </Link>
    </div>
    

    <Link href="/login-as/10037332">
    <button class="flex items-center px-3 py-1 text-sm font-bold text-black transition-colors duration-200 transform bg-yellow-500 rounded cursor-pointer hover:bg-yellow-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        User วักกะ
    </button>
    </Link>
</div>
</template>

<script setup>
import { Link } from '@inertiajs/inertia-vue3'
</script>

<style>

</style>