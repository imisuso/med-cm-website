<template>
    <Head title="ทำเนียบผู้บริหาร" />

    <div class="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20 pt-24 relative z-0">

        <div class="relative bg-[#005740] text-white py-10 px-4 sm:px-6 lg:px-8 shadow-md -mt-8 mb-10 mx-4 md:mx-8 rounded-b-2xl overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10">
                <svg class="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>

            <div class="relative max-w-7xl mx-auto text-center">
                <h2 class="text-[#D4AF37] font-semibold tracking-wide uppercase text-xs mb-2">Executive Directory</h2>
                <h1 class="text-3xl font-bold mb-3">{{ $t('ทำเนียบหัวหน้าภาค') }}</h1>
                <div class="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <section v-if="currentExecutive" class="mb-14">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#D4AF37]">
                    <div class="p-6 md:p-8 md:flex items-start gap-8">

                        <div class="flex-shrink-0 mx-auto md:mx-0 w-48 relative group cursor-pointer">
                            <div class="aspect-[3/4] rounded shadow-md border border-gray-100 bg-gray-200 overflow-hidden">
                                <img
                                    :src="getImageUrl(currentExecutive.image_path)"
                                    :alt="currentExecutive.name"
                                    class="w-full h-full object-cover object-top
                                           transition-transform duration-700 ease-out
                                           group-hover:scale-105"
                                />
                            </div>
                        </div>

                        <div class="flex-grow text-center md:text-left mt-6 md:mt-0">
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#005740]/10 text-[#005740] text-[11px] font-bold uppercase mb-4">
                                Current Executive
                            </div>
                            <h3 class="text-lg md:text-xl font-bold text-[#D4AF37] mb-1">
                                {{ transDb(currentExecutive, 'position') }}
                            </h3>
                            <h2 class="text-2xl md:text-3xl font-bold text-[#005740] mb-1">
                                {{ transDb(currentExecutive, 'name') }}
                            </h2>
                            <p class="mb-5">{{ $t('ลำดับการดำรงตำแหน่ง') }} {{ currentExecutive.id }}</p>
                            <div v-if="currentExecutive.vision" class="mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-[#D4AF37] relative">
                                <p class="text-gray-700 italic text-sm md:text-base leading-relaxed">
                                    "{{ currentExecutive.vision }}"
                                </p>
                            </div>
                            <div class="inline-flex items-center border border-gray-200 rounded px-3 py-1.5 bg-white shadow-sm">
                                <span class="text-sm text-gray-500 mr-2">{{ $t('วาระการดำรงตำแหน่ง') }}:</span>
                                <span class="text-[#005740] font-bold text-sm">{{ transDb(currentExecutive, 'period') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="mb-6 border-b border-gray-200 pb-2">
                    <h3 class="text-xl font-bold text-[#005740] flex items-center gap-2">
                        <span class="w-1.5 h-6 bg-[#D4AF37] rounded-sm"></span>
                        {{ $t('ทำเนียบผู้บริหารในอดีต') }}
                    </h3>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    <div
                        v-for="exec in pastExecutives"
                        :key="exec.id"
                        class="group bg-white rounded shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden h-full cursor-pointer"
                    >
                        <div class="relative aspect-[3/4] bg-gray-100 overflow-hidden flex-shrink-0">
                            <img
                                :src="getImageUrl(exec.image_path)"
                                :alt="exec.name"
                                class="w-full h-full object-cover object-top
                                       brightness-90 saturate-75 contrast-95
                                       group-hover:brightness-100 group-hover:saturate-100 group-hover:contrast-100 group-hover:scale-105
                                       transition-all duration-500 ease-out"
                            />
                            <div class="absolute bottom-0 left-0 w-full h-1 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        </div>

                        <div class="p-3 md:p-4 flex-grow flex flex-col justify-between">
                            <div>
                                <p class="text-md sm:text-lg font-bold text-[#D4AF37] tracking-wide mb-1 leading-tight min-h-[1.5em] line-clamp-2">
                                    {{ transDb(exec, 'position') }}
                                </p>
                                <h4 class="text-sm font-bold text-gray-700 group-hover:text-[#005740] transition-colors mb-1 leading-snug">
                                    {{ transDb(exec, 'name') }}
                                </h4>
                                <span class="mb-3">{{ $t('ลำดับการดำรงตำแหน่ง') }} {{ exec.id }}</span>
                            </div>

                            <div class="mt-auto pt-2 border-t border-gray-50 w-full">
                                <div class="bg-gray-50 rounded border border-gray-100 px-2 py-2 text-center group-hover:bg-[#005740]/5 group-hover:border-[#005740]/10 transition-colors">
                                    <p class="text-[14px] text-gray-400 mb-1 leading-none">
                                        {{ $t('วาระการดำรงตำแหน่ง') }}
                                    </p>
                                    <p class="text-xs font-bold text-[#005740] leading-tight break-words">
                                        {{ transDb(exec, 'period') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="pastExecutives.length === 0" class="text-center py-12 text-gray-400 text-sm">
                    - ยังไม่มีข้อมูล -
                </div>
            </section>

        </div>
    </div>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
    export default {
        layout: AppLayout,
    }
</script>

<script setup>
import {reactive, ref} from 'vue';
import { Link } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3';
import { useTrans } from '@/Services/useTrans';

// 1. เรียกใช้ Helper
const { transDb } = useTrans();

const pastExecutives = reactive(
            [
                {"id": 1, "position":"ศาสตราจารย์ นายแพทย์ ", "position_en": "Professor", "name": "William Harvey Perkins", "name_en": "William Harvey Perkins", "period": "25 สิงหาคม 2469 - 26 กุมภาพันธ์ 2473", "period_en": "25/08/1926 - 26/02/1930", "image_path":"images/department_leaders/01.gif", "order": 1, "is_current": false},
                {"id": 2, "position":"ศาสตราจารย์", "position_en": "Professor", "name": "พระอัพภันตราพาธพิศาล", "name_en": "Phra Aphantraphatphisan", "period": "27 พฤษภาคม 2473 - 31 พฤษภาคม 2488", "period_en": "27/05/1930 - 31/05/1945", "image_path":"images/department_leaders/02.gif", "order": 2, "is_current": false},
                {"id": 3, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "ประเสริฐ กังสดาลย์", "name_en": "Prasert Kangsadal", "period": "1 มิถุนายน 2488 - 7 พฤษภาคม 2505", "period_en": "01/06/1945 - 07/05/1962", "image_path":"images/department_leaders/03.gif", "order": 3, "is_current": false},
                {"id": 4, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "จิตต์ ตู้จินดา", "name_en": "Chit Tuchinda", "period": "8 พฤษภาคม 2505 - 30 กันยายน 2513", "period_en": "08/05/1962 - 30/09/1970", "image_path":"images/department_leaders/04.gif", "order": 4, "is_current": false},
                {"id": 5, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "วีกิจ วีรานุวัตติ์", "name_en": "Vikit Viranuvatti", "period": "1 ตุลาคม 2513 - 30 กันยายน 2527", "period_en": "01/10/1970 - 30/09/1984", "image_path":"images/department_leaders/05.gif", "order": 5, "is_current": false},
                {"id": 6, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "สุเอ็ด คชเสนี", "name_en": "Su-ed Kochaseni", "period": "1 ตุลาคม 2527 - 30 กันยายน 2528", "period_en": "01/10/1984 - 30/09/1985", "image_path":"images/department_leaders/06.gif", "order": 6, "is_current": false},
                {"id": 7, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "ประเวศ วะสี", "name_en": "Prawase Wasi", "period": "1 ตุลาคม 2528 - 30 พฤศจิกายน 2530", "period_en": "01/10/1985 - 30/11/1987", "image_path":"images/department_leaders/07.gif", "order": 7, "is_current": false},
                {"id": 8, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "อุกฤษต์ เปล่งวาณิช", "name_en": "Ukrist Plengvanit", "period": "1 ธันวาคม 2530 - 30 พฤษภาคม 2532", "period_en": "01/12/1987 - 30/05/1989", "image_path":"images/department_leaders/08.gif", "order": 8, "is_current": false},
                {"id": 9, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "ประพาฬ ยงใจยุทธ", "name_en": "Praparn Youngchaiyud", "period": "1 มิถุนายน 2532 - 30 กันยายน 2536", "period_en": "01/06/1989 - 30/09/1993", "image_path":"images/department_leaders/09.gif", "order": 9, "is_current": false},
                {"id": 10, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "ศุภชัย ไชยธีระพันธ์", "name_en": "Suphachai Chaithiraphan", "period": "1 ตุลาคม 2536 - 19 กุมภาพันธ์ 2540", "period_en": "01/10/1993 - 19/02/1997", "image_path":"images/department_leaders/10.gif", "order": 10, "is_current": false},
                {"id": 11, "position":"ศาสตราจารย์ แพทย์หญิง", "position_en": "Professor", "name": "สุมาลี นิมมานนิตย์", "name_en": "Sumalee Nimmannit", "period": "20 กุมภาพันธ์ 2540 - 19 กุมภาพันธ์ 2544", "period_en": "20/02/1997 - 19/02/2001", "image_path":"images/department_leaders/11.gif", "order": 11, "is_current": false},
                {"id": 12, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "อมร ลีลารัศมี", "name_en": "Amorn Leelarasamee", "period": "20 กุมภาพันธ์ 2544 - 19 กุมภาพันธ์ 2548", "period_en": "20/02/2001 - 19/02/2005", "image_path":"images/department_leaders/12.gif", "order": 12, "is_current": false},
                {"id": 13, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "อุดม คชินทร", "name_en": "Udom Kachintorn", "period": "20 กุมภาพันธ์ 2548 - 8 ธันวาคม 2554", "period_en": "20/02/2005 - 08/12/2011", "image_path":"images/department_leaders/13.gif", "order": 13, "is_current": false},
                {"id": 14, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "วันชัย วนะชิวนาวิน", "name_en": "Wanchai Wanachiwanawin", "period": "16 ธันวาคม 2554 - 15 ธันวาคม 2558", "period_en": "16/12/2011 - 15/12/2015", "image_path":"images/department_leaders/14.jpg", "order": 14, "is_current": false},
                {"id": 15, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "ไชยรัตน์ เพิ่มพิกุล", "name_en": "Chairat Permpikul", "period": "16 ธันวาคม 2558 - 15 ธันวาคม 2566", "period_en": "16/12/2015 - 15/12/2023", "image_path":"images/department_leaders/15.jpg", "order": 15, "is_current": false},
            ]
);

const currentExecutive = reactive({"id": 16, "position":"ศาสตราจารย์ นายแพทย์", "position_en": "Professor", "name": "สมชาย ลีลากุศลวงศ์", "name_en": "Somchai Leelakusolvong", "period": "16 ธันวาคม 2566 - ปัจจุบัน", "period_en": "16/12/2023 - Now", "image_path":"images/department_leaders/16.jpg", "order": 16, "is_current": true});

const baseUrl = ref(base_url)

// ฟังก์ชันสำหรับใส่ Placeholder ถ้ารูปไม่มี
const getImageUrl = (path) => {
    return path ? `${baseUrl.value}/${path}` : 'https://ui-avatars.com/api/?name=Siriraj+Admin&background=005740&color=fff&size=256';
};

</script>

<style>

</style>
