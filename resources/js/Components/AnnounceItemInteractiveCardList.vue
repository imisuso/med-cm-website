<template>
    <div v-if="typeDetail === 'list'" class="flex flex-col my-1 py-1 border border-gray-200 rounded-md shadow-md" :class="[announceDetails.publish_status ? 'bg-gradient-to-l from-sky-100' : 'bg-gray-100']">
        <div class="flex items-start px-2 mt-1 space-x-2 justify-between">
            <div class="flex items-start font-bold">
                <div>
                    <a :href="route(`announce_details`, announceDetails.slug)" target="_blank">
                        {{ announceDetails.topic }}
                    </a>
                </div>
            </div>
            <div class="relative">
                <button id="dropdownButton" @click="isDropDownOpen = !isDropDownOpen" class="block dropbtn text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-1.5">
                    <svg class="w-6 h-6 dropbtn" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path class="dropbtn" d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                </button>

                <div id="dropdown" :class="[isDropDownOpen ? '' : 'hidden']" class="absolute right-10 -top-20 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded-sm shadow-sm w-44">
                    <ul class="py-1" aria-labelledby="dropdownButton">
                    <li v-if="!announceDetails.publish_status && $page.props.auth.abilities.includes('publish_unpublish_announce')">
                        <a href="#" @click="confirmAnwser('publish', true)" class="flex items-center text-sm hover:bg-gray-100 text-emerald-500 px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            เผยแพร่
                        </a>
                    </li>

                    <li v-if="announceDetails.publish_status && $page.props.auth.abilities.includes('publish_unpublish_announce')">
                        <a href="#" @click="confirmAnwser('unpublish', true)" class="flex items-center text-sm hover:bg-gray-100 text-gray-500 px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                            ไม่เผยแพร่
                        </a>
                    </li>

                    <li v-if="!announceDetails.pinned && $page.props.auth.abilities.includes('pin_unpin_announce')">
                        <a href="#" @click="confirmAnwser('pin', true)" class="flex items-center text-sm hover:bg-gray-100 text-red-500 px-4 py-2">
                            <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="h-4 w-4 text-red-500 mr-2 shrink-0" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                                <g transform="translate(128 128) scale(0.72 0.72)" style="">
                                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                                    <path d="M 89.011 87.739 c -0.599 -1.371 -1.294 -2.652 -1.968 -3.891 l -0.186 -0.343 l -15.853 -15.91 c -0.371 -0.375 -0.746 -0.748 -1.12 -1.12 c -0.671 -0.667 -1.342 -1.335 -1.997 -2.018 l -1.459 -1.437 l 23.316 -23.317 l -1.704 -1.704 c -9.111 -9.112 -22.925 -12.518 -35.353 -8.759 l -6.36 -6.359 c 0.769 -7.805 -2.017 -15.69 -7.503 -21.175 L 37.123 0 L 0 37.122 l 1.706 1.704 c 5.487 5.487 13.368 8.271 21.176 7.503 l 6.36 6.36 C 25.484 65.115 28.889 78.93 38 88.041 l 1.703 1.704 l 23.316 -23.316 l 1.438 1.458 c 0.679 0.653 1.344 1.321 2.009 1.989 c 0.373 0.374 0.745 0.748 1.117 1.116 l 15.699 15.7 l 0.566 0.352 c 1.239 0.673 2.52 1.369 3.891 1.968 L 90 90 L 89.011 87.739 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(175,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                    </g>
                                </g>
                            </svg>
                            ปักหมุด
                        </a>
                    </li>

                    <li v-if="announceDetails.pinned && $page.props.auth.abilities.includes('pin_unpin_announce')">
                        <a href="#" @click="confirmAnwser('unpin', true)" class="flex items-center text-sm hover:bg-gray-100 text-gray-500 px-4 py-2">
                            <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="h-4 w-4 text-gray-500 mr-2 shrink-0" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                                <g transform="translate(128 128) scale(0.72 0.72)" style="">
                                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                                    <path d="M 89.011 87.739 c -0.599 -1.371 -1.294 -2.652 -1.968 -3.891 l -0.186 -0.343 l -15.853 -15.91 c -0.371 -0.375 -0.746 -0.748 -1.12 -1.12 c -0.671 -0.667 -1.342 -1.335 -1.997 -2.018 l -1.459 -1.437 l 23.316 -23.317 l -1.704 -1.704 c -9.111 -9.112 -22.925 -12.518 -35.353 -8.759 l -6.36 -6.359 c 0.769 -7.805 -2.017 -15.69 -7.503 -21.175 L 37.123 0 L 0 37.122 l 1.706 1.704 c 5.487 5.487 13.368 8.271 21.176 7.503 l 6.36 6.36 C 25.484 65.115 28.889 78.93 38 88.041 l 1.703 1.704 l 23.316 -23.316 l 1.438 1.458 c 0.679 0.653 1.344 1.321 2.009 1.989 c 0.373 0.374 0.745 0.748 1.117 1.116 l 15.699 15.7 l 0.566 0.352 c 1.239 0.673 2.52 1.369 3.891 1.968 L 90 90 L 89.011 87.739 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(115 115 115 / var(--tw-text-opacity)); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                    </g>
                                </g>
                            </svg>
                            ยกเลิกปักหมุด
                        </a>
                    </li>

                    <li>
                        <a href="#" @click="$emit('edit-announce')" class="flex items-center text-sm hover:bg-gray-100 text-yellow-500 px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            แก้ไข
                        </a>
                    </li>
                    <li>
                        <a href="#" @click="confirmAnwser('delete', true)" class="flex items-center text-sm hover:bg-gray-100 text-red-600 px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            ลบ
                        </a>
                    </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="flex items-start px-2 space-x-2">
                <!-- <div v-if="announceDetails.division_id > 18" class="text-sm text-gray-500">หน่วย{{announceDetails.division.name_th}}</div>
                <div v-else class="text-sm text-gray-500">สาขา{{announceDetails.division.name_th}}</div> -->
                <div class="text-sm text-gray-500">{{announceDetails.division.division_type}}{{announceDetails.division.name_th}}</div>
                <div v-if="announceDetails.pinned" class="flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="h-5 w-5 text-red-500" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                        <g transform="translate(128 128) scale(0.72 0.72)" style="">
                            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                            <path d="M 89.011 87.739 c -0.599 -1.371 -1.294 -2.652 -1.968 -3.891 l -0.186 -0.343 l -15.853 -15.91 c -0.371 -0.375 -0.746 -0.748 -1.12 -1.12 c -0.671 -0.667 -1.342 -1.335 -1.997 -2.018 l -1.459 -1.437 l 23.316 -23.317 l -1.704 -1.704 c -9.111 -9.112 -22.925 -12.518 -35.353 -8.759 l -6.36 -6.359 c 0.769 -7.805 -2.017 -15.69 -7.503 -21.175 L 37.123 0 L 0 37.122 l 1.706 1.704 c 5.487 5.487 13.368 8.271 21.176 7.503 l 6.36 6.36 C 25.484 65.115 28.889 78.93 38 88.041 l 1.703 1.704 l 23.316 -23.316 l 1.438 1.458 c 0.679 0.653 1.344 1.321 2.009 1.989 c 0.373 0.374 0.745 0.748 1.117 1.116 l 15.699 15.7 l 0.566 0.352 c 1.239 0.673 2.52 1.369 3.891 1.968 L 90 90 L 89.011 87.739 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(175,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                            </g>
                        </g>
                    </svg>
                </div>
                <div v-if="announceDetails.attach_files.length > 0" class="flex space-x-2">
                    <!-- ไฟล์แนบ -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                </div>
                <div v-if="announceDetails.publish_status" class="flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <div v-else class="flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                </div>
                <div v-if="dayjs().isAfter(dayjs(announceDetails.expire_date))" class="flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                    </svg>
                </div>
            </div>
        <div class="flex flex-col md:flex-row items-start md:justify-between px-2 italic text-sm text-gray-500">
            <!-- สร้างเมื่อ : {{ moment(announceDetails.created_at).locale('th').add(543, "year").format("LLL") }} -->
            <div>
                <!-- สร้าง : {{ dayjs(announceDetails.created_at).locale('th').format('วันddddที่ D MMMM BBBB เวลา H:mm') }} -->
                สร้าง : {{ dayjs(announceDetails.created_at).locale('th').format('วันที่ D MMMM BBBB เวลา H:mm') }}
            </div>
            <div>
                <!-- หมดอายุ : {{ dayjs(announceDetails.expire_date).locale('th').format('วันddddที่ D MMMM BBBB เวลา H:mm') }} -->
                หมดอายุ : {{ dayjs(announceDetails.expire_date).locale('th').format('วันที่ D MMMM BBBB เวลา H:mm') }}
            </div>
        </div>
    </div>

    <div v-if="typeDetail === 'full'" class="mt-4 mb-4 md:ml-16 md:mr-16 lg:ml-24 lg:mr-24">
        <div class="flex flex-col w-full sm:mx-0 justify-center justify-items-center border rounded-md shadow-md">
            <div class="flex items-center w-full text-2xl font-medium text-white title-font mb-2 p-2 bg-gradient-to-r from-green-800 to-green-600 rounded-md shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <div class="flex items-center ml-2">ข่าวประชาสัมพันธ์</div>
            </div>

            <div class=" grid grid-cols-6 gap-2 p-2 w-full">
                <div class=" col-span-6 sm:col-span-1 font-bold text-emerald-700 sm:justify-self-end">
                    <div class="flex items-center space-x-2">
                        <svg v-if="announceDetails.pinned" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="h-5 w-5 text-red-500 mr-2 shrink-0" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                            <g transform="translate(128 128) scale(0.72 0.72)" style="">
                                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
                                <path d="M 89.011 87.739 c -0.599 -1.371 -1.294 -2.652 -1.968 -3.891 l -0.186 -0.343 l -15.853 -15.91 c -0.371 -0.375 -0.746 -0.748 -1.12 -1.12 c -0.671 -0.667 -1.342 -1.335 -1.997 -2.018 l -1.459 -1.437 l 23.316 -23.317 l -1.704 -1.704 c -9.111 -9.112 -22.925 -12.518 -35.353 -8.759 l -6.36 -6.359 c 0.769 -7.805 -2.017 -15.69 -7.503 -21.175 L 37.123 0 L 0 37.122 l 1.706 1.704 c 5.487 5.487 13.368 8.271 21.176 7.503 l 6.36 6.36 C 25.484 65.115 28.889 78.93 38 88.041 l 1.703 1.704 l 23.316 -23.316 l 1.438 1.458 c 0.679 0.653 1.344 1.321 2.009 1.989 c 0.373 0.374 0.745 0.748 1.117 1.116 l 15.699 15.7 l 0.566 0.352 c 1.239 0.673 2.52 1.369 3.891 1.968 L 90 90 L 89.011 87.739 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(175,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                </g>
                            </g>
                        </svg>
                        <div>หัวข้อข่าว :</div>
                    </div>
                </div>
                <div class=" col-span-6 sm:col-span-5 ml-3 font-bold text-xl">{{ announceDetails.topic }}</div>

                <div class=" col-span-6 sm:col-span-1 font-bold text-emerald-700 sm:justify-self-end">วันที่ประกาศ :</div>
                <div v-if="announceDetails.publish_status" class=" col-span-6 sm:col-span-5 ml-3 italic">{{ dayjs(announceDetails.publish_date).locale('th').format('D MMMM BBBB เวลา H:mm') }}</div>
                <div v-else class=" col-span-6 sm:col-span-5 ml-3">ยังไม่เผยแพร่</div>

                <div class="col-span-6 border-b-2"></div>

                <div class=" col-span-6 sm:col-span-1 mt-2 font-bold text-emerald-700 sm:justify-self-end">รายละเอียดข่าว :</div>
                <div class="col-span-6 sm:col-span-5 ql-container ql-snow" style="border: 0;">
                    <div class="border-0 ql-editor" v-html="announceDetails.detail_html"></div>
                </div>

                <div class=" col-span-6 sm:col-span-1 font-bold text-emerald-700 sm:justify-self-end">ส่วนงาน :</div>
                <div class=" col-span-6 sm:col-span-5 ml-3 font-bold">{{announceDetails.division.division_type}}{{ announceDetails.division.name_th }}</div>

                <div v-if="$page.props.auth" class=" col-span-6 sm:col-span-1 font-bold text-emerald-700 sm:justify-self-end">ผู้ประกาศ :</div>
                <div v-if="$page.props.auth && !pdpa_protect"
                            @click="pdpa_protect = !pdpa_protect"
                            @mouseleave="pdpa_protect = !pdpa_protect"
                            class=" col-span-6 sm:col-span-5 ml-3 font-bold cursor-pointer">{{ announceDetails.person.title_th }}{{ announceDetails.person.fname_th }} {{ announceDetails.person.lname_th }}
                </div>
                <div v-else-if="$page.props.auth && pdpa_protect"
                            @click="pdpa_protect = !pdpa_protect"
                            class=" col-span-6 sm:col-span-5 ml-3 font-bold cursor-pointer">**********
                </div>
                <!-- <div v-else class=" col-span-6 sm:col-span-5 ml-3 font-bold">**********</div> -->

                <div class=" col-span-6 sm:col-span-1 font-bold text-emerald-700 sm:justify-self-end">ไฟล์แนบ :</div>
                <div v-if="announceDetails.attach_files.length > 0" class=" col-span-6 sm:col-span-5 ml-3">
                    <div class="flex items-center border-t-2 space-x-4"
                        v-for="(atFile, index) in announceDetails.attach_files"
                        :key="index"
                    >
                        <div class="mx-2">
                            <DownloadPdfFile class=""
                                :origName="atFile.orig_name"
                                :pdfFile="atFile.unique_name"
                            />
                        </div>
                        <div class=" italic">{{ atFile.orig_name }}</div>

                    </div>
                </div>
                <div v-else class=" col-span-6 sm:col-span-5 ml-3">-</div>
            </div>
        </div>
    </div>

    <!-- Modal สำหรับ confirm การ pin, unpin, publish, unpublish and delete  -->
    <teleport to="body">
    <Modal :isModalOpen="confirmModal" >
      <template v-slot:header>
        <div class="text-gray-900 text-xl font-medium dark:text-white">
            {{ announceDetails.topic }}
        </div>
      </template>

      <template v-slot:body>
        <div class="text-gray-900 text-md font-medium dark:text-white">
            {{ confirmMsg }}
        </div>
      </template>

      <template v-slot:footer>
        <button @click="process_announce()" type="button"
            :class="[confirmType === 'delete' ? 'bg-red-700 hover:bg-red-800 focus:ring-red-300' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300']"
            class="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            ตกลง
        </button>
        <button @click="confirmModal = false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">ยกเลิก</button>
      </template>
    </Modal>
    </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'

import Modal from '@/Components/Modal.vue'
import DownloadPdfFile from '@/Components/DownloadPdfFile.vue'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast
import { router } from '@inertiajs/vue3'

onMounted(() => {
    window.addEventListener('click', closeDropdownWhenClickOutSide)
})

onUnmounted(() => {
    window.removeEventListener('click', closeDropdownWhenClickOutSide)
})

defineEmits(['edit-announce'])

const props = defineProps({
    announceDetails: { type: Object, required: true  },
    typeDetail: { type: String, required: true },
    filter: { type: Object }
})

dayjs.extend(buddhistEra)
// dayjs.extend(utc)
// dayjs.extend(timezone)
//dayjs.tz.setDefault("Asia/Bangkok")


const isDropDownOpen = ref(false)

const confirmMsg = ref('')
const confirmType = ref('')
const confirmModal = ref(false)
const pdpa_protect = ref(true)

const confirmAnwser = (type, isOpen) => {
    if( type === "publish" ) {
        confirmMsg.value = "ต้องการเผยแพร่ข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else if( type === "unpublish" ) {
        confirmMsg.value = "ต้องการยกเลิกการเผยแพร่ข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else if( type === "pin" ) {
        confirmMsg.value = "ต้องการปักหมุดข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else if( type === "unpin" ) {
        confirmMsg.value = "ต้องการยกเลิกการปักหมุดข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else if( type === "delete" ) {
        confirmMsg.value = "ต้องการลบข่าวประกาศนี้ ใช่ หรือ ไม่"
    } else {
        confirmMsg.value = ""
    }

    confirmType.value = type
    confirmModal.value = isOpen
}

const process_announce = () => {
    let routeName = ""
    let msgProcess =""
    if( confirmType.value === "publish" ) {
        routeName = "admin.announce.toggle_publish"
        msgProcess = "เผยแพร่ข่าวประกาศ"
    } else if( confirmType.value === "unpublish" ) {
        routeName = "admin.announce.toggle_publish"
        msgProcess = "ยกเลิกเผยแพร่ข่าวประกาศ"
    } else if( confirmType.value === "pin" ) {
        routeName = "admin.announce.toggle_pin"
        msgProcess = "ปักหมุดข่าวประกาศ"
    } else if( confirmType.value === "unpin" ) {
        routeName = "admin.announce.toggle_pin"
        msgProcess = "ยกเลิกปักหมุดข่าวประกาศ"
    } else if( confirmType.value === "delete" ) {
        routeName = "admin.announce.delete"
        msgProcess = "ลบข่าวประกาศ"
    }

    // router.get(route(routeName, props.announceDetails.id), {
    //     data: {
    //         // publish_status: props.announceDetails.publish_status,
    //         // pinned: props.announceDetails.pinned,
    //         ftopic: props.filter.ftopic,
    //         fexpire_type: props.filter.fexpire_type,
    //         fdivision_selected: props.filter.fdivision_selected
    //     },
    //     preserveState: true,
    //     onSuccess: () => {
    //         toast('success', 'สำเร็จ', `ดำเนินการ${msgProcess}เรียบร้อย`)
    //     },
    //     onError: (errors) => {
    //         let error_display = ''
    //         for ( let p in errors ) {
    //             error_display = error_display + `- ${errors[p]}<br/>`
    //         }
    //         toast('danger', 'พบข้อผิดพลาด', error_display);
    //         //toast('danger', errors.msg, errors.sysmsg)
    //     },
    //     onFinish: () => {
    //         confirmType.value = ''
    //         confirmModal.value = false
    //     }
    // })

    router.get(route(routeName, props.announceDetails.id), {
        ftopic: props.filter.ftopic,
        fexpire_type: props.filter.fexpire_type,
        fdivision_selected: props.filter.fdivision_selected
    }, {
        preserveState: true,
        onSuccess: () => {
            toast('success', 'สำเร็จ', `ดำเนินการ${msgProcess}เรียบร้อย`)
        },
        onError: (errors) => {
            let error_display = ''
            for ( let p in errors ) {
                error_display = error_display + `- ${errors[p]}<br/>`
            }
            toast('danger', 'พบข้อผิดพลาด', error_display);
        },
        onFinish: () => {
            confirmType.value = ''
            confirmModal.value = false
        }
    })
}

const closeDropdownWhenClickOutSide = (event) => {
    if (!event.target.matches('.dropbtn')) {
        if( isDropDownOpen.value ) {
            isDropDownOpen.value = false
        }
    }
}

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
</script>

<style>

</style>
