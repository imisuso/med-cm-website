<template>
    <AdminAppLayout>
        <div class="flex flex-col p-4 w-full">
            <!-- Toolbar -->
            <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
                <div class=" text-2xl font-bold">{{ actionWord }}ข้อมูลบุคลากร</div>
                <Link :href="route('admin.person')" :data="{ 'fdivision_selected': personForm.division_selected }" method="get" as="button" type="button"
                    class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800"
                >
                    กลับหน้าหลัก
                </Link>  
            </div>
        
            <div class="text-gray-900 text-lg underline font-medium dark:text-white mb-4">
                รายละเอียดข้อมูลของบุคลากร
            </div>

            <div class="flex flex-col border rounded-lg shadow-lg p-4">
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <fieldset :disabled="viewDataInfomation">
                                <div class="gap-6 mb-6">
                                    <label class="block text-sm font-medium text-gray-700">
                                    รูปบุคลากร
                                    </label>
                                    <div class="mt-1 flex items-center">
                                        <span class="inline-block h-32 w-28 rounded-md overflow-hidden bg-gray-100">
                                            <!-- <svg v-if="! personForm.image" class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg> -->
                                            <img v-if="! url" :src="`${baseUrl}/fallbackimage/default-blank-image.jpg`" class="h-full w-full rounded-md"/>
                                            <img v-else :src="url" />
                                        </span>
                                        <label class="flex flex-col w-24 items-center mx-2 px-2 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white">
                                            <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                            </svg>
                                            <span class="mt-2 text-base leading-normal">เลือกรูป</span> 
                                            <input type="file" @input="personForm.image = $event.target.files[0]" @change="previewImage" class="hidden">
                                        </label>
                                    </div>
                                </div>

                                <div class="grid grid-cols-6 gap-6 mb-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="sap_id" class="block text-sm font-medium text-gray-700">รหัส SAP-ID</label>
                                        <!-- <input :type="[pdpa_protect ? 'password' : 'text']" id="sap_id" v-model.trim="personForm.sap_id" 
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']" 
                                        /> -->
                                        <input :type="[pdpa_protect ? 'password' : 'text']" id="sap_id" v-model.trim="personForm.sap_id" 
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="division_selected" class="block text-sm font-medium text-gray-700">สาขา/หน่วยงาน</label>
                                        <select v-model="personForm.division_selected" id="division_selected" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <template v-for="(option, index) in divisions" :key="index">
                                            <option v-if="$page.props.auth.abilities.includes('view_all_content')" :value="option.division_id">{{ option.name_th }}</option>
                                            <option v-else :value="option.division_id" :disabled="personForm.division_selected !== option.division_id">{{ option.name_th }}</option>                     
                                            </template>
                                        </select>
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="title_th" class="block text-sm font-medium text-gray-700">คำนำหน้าตามบัตร ปชช. (TH)</label>
                                        <select v-model="personForm.title_th" id="title_th" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="นาย">นาย</option>
                                            <option value="นาง">นาง</option>
                                            <option value="นางสาว">นางสาว</option>
                                        </select>
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <div class="flex">
                                            <label for="fname_th" class="block text-sm font-medium text-gray-700">ชื่อ (TH)</label>
                                            <div class="text-red-500 px-2">*</div>
                                        </div>
                                        <!-- <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.fname_th" id="fname_th" required="true" 
                                                class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                                :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']"        
                                        /> -->
                                        <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.fname_th" id="fname_th" required="true" 
                                                class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        />
                                        <div class="p-error" v-if="submitted && !personForm.fname_th">จำเป็นต้องใส่ ชื่อภาษาไทย</div>
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <div class="flex">
                                            <label for="lname_th" class="block text-sm font-medium text-gray-700">นามสกุล (TH)</label>
                                            <div class=" text-red-500 px-2">*</div>
                                        </div>
                                        <!-- <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.lname_th" id="lname_th" 
                                                class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                                :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']"
                                        /> -->
                                        <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.lname_th" id="lname_th" 
                                                class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        />
                                        <div class="p-error" v-if="submitted && !personForm.lname_th">จำเป็นต้องใส่ นามสกุลภาษาไทย</div>
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="title_en" class="block text-sm font-medium text-gray-700">คำนำหน้าตามบัตร ปชช. (EN)</label>
                                        <select v-model="personForm.title_en" id="title_en" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="Mr.">Mr.</option>
                                            <option value="Mrs.">Mrs.</option>
                                            <option value="Miss.">Miss.</option>
                                        </select>
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="fname_en" class="block text-sm font-medium text-gray-700">ชื่อ (EN)</label>
                                        <!-- <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.fname_en" id="fname_en" 
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                                :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']"
                                        /> -->
                                        <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.fname_en" id="fname_en" 
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="lname_en" class="block text-sm font-medium text-gray-700">นามสกุล (EN)</label>
                                        <!-- <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.lname_en" id="lname_en" 
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                                :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']"
                                        /> -->
                                        <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.lname_en" id="lname_en" 
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="type" class="block text-sm font-medium text-gray-700">ประเภทบุคลากร</label>
                                        <select v-model="personForm.type" id="type" @change="personForm.group=99" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="z">ที่ปรึกษา</option>
                                            <option value="a">สายวิชาการ</option>
                                            <option value="b">สายสนับสนุน</option>
                                        </select>
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <div class="flex">
                                            <label for="group" class="block text-sm font-medium text-gray-700">กลุ่มงาน</label>
                                            <div class=" text-red-500 px-2">*</div>
                                        </div>
                                        <select v-model="personForm.group" id="group" @change="personForm.position_academic=99" class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <template v-for="option in group_list" :key="option.value">
                                                <!-- กรณีสายวิชาการ หรือ ที่ปรึกษา จะให้อยู่ในกลุ่มวิชาการ (ของจริงสายวิชาการจะไม่มีกลุ่ม สร้างขึ้นเพื่อไว้ใช้เฉพาะ app นี้) -->
                                                <option v-if="(personForm.type !== 'b') && ([1].includes(option.value))"
                                                        :value="option.value"
                                                >
                                                {{ option.desc }}
                                                </option>
                                                <!-- กรณีที่ปรึกษา จะมีทุกกลุ่มให้เลือก -->
                                                <option v-else-if="personForm.type === 'z'"
                                                        :value="option.value"
                                                >
                                                {{ option.desc }}
                                                </option>
                                                <!-- กรณีสายสนับสนุนจะต้องไม่มี กลุ่มวิชาการให้เลือก -->
                                                <option v-else-if="(personForm.type === 'b') && (! [1].includes(option.value))"
                                                        :value="option.value"
                                                >
                                                {{ option.desc }}
                                                </option>
                                            </template>
                                        </select>
                                        <div class="p-error" v-if="submitted && (personForm.group === 99)">จำเป็นต้องเลือกกลุ่มงาน</div>
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <div class="flex">
                                            <label for="position_academic" class="block text-sm font-medium text-gray-700">ตำแหน่งงาน</label>
                                            <div class=" text-red-500 px-2">*</div>
                                        </div>
                                        <select v-model="personForm.position_academic" id="position_academic" class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <template v-for="option in position_academic_list" :key="option.value">
                                                <!-- กรณีกลุ่มวิชาการ จะแสดงตำแหน่งทางวิชาการเท่านั้น -->
                                                <option v-if="(personForm.group === 1) && ([1, 2, 3, 4].includes(option.value))"
                                                        :value="option.value"
                                                >
                                                {{ option.desc }}
                                                </option>
                                                <!-- กรณีกลุ่มวิชาชีพเฉพาะ จะไม่แสดงตำแหน่งทางวิชาการ -->
                                                <option v-else-if="(personForm.group === 2) && ([0, 5, 6].includes(option.value))"
                                                        :value="option.value"
                                                >
                                                {{ option.desc }}
                                                </option>
                                                <!-- กรณีกลุ่มที่เหลือ จะแสดงแค่ไม่ระบุตำแหน่ง -->
                                                <option v-else-if="(personForm.group > 2) && ([0].includes(option.value))"
                                                        :value="option.value"
                                                >
                                                {{ option.desc }}
                                                </option>
                                            </template>
                                        </select>
                                        <div class="p-error" v-if="submitted && (personForm.position_academic === 99)">จำเป็นต้องระบุตำแหน่งงาน</div>
                                    </div>

                                    <!-- แสดงข้อมูลส่วนนี้เมื่อบุคลากรคนนั้นเป็น อาจารย์แพทย์ แพทย์ หรือ ที่ปรึกษา (เป็นข้อมูลสำหรับหมอ เท่านั้น เพราะไม่ได้เอาคำนำหน้าตามปกติไปแสดง เลยต้องมีส่วนนี้) -->
                                    <!-- <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3"> -->
                                    <div v-if="personForm.position_academic !== 0" class="col-span-6">
                                        <div class="flex">
                                            <label for="rname_full_th" class="block text-sm font-medium text-gray-700">คำนำหน้าชื่อแบบเต็ม (แสดงผล สำหรับแพทย์ TH)</label>
                                            <div v-if="personForm.position_academic !== 0" class=" text-red-500 px-2">*</div>
                                        </div>
                                        <input type="text" v-model.trim="personForm.rname_full_th" id="rname_full_th" placeholder="เช่น ศาสตราจารย์ คลินิก เกียรติคุณ นายแพทย์ หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        <div class="p-error" v-if="submitted && !personForm.rname_full_th">จำเป็นต้องใส่ คำนำหน้าชื่อแบบเต็มภาษาไทย</div>
                                    </div>

                                    <!-- <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3"> -->
                                    <div v-if="personForm.position_academic !== 0" class="col-span-6">
                                        <label for="rname_full_en" class="block text-sm font-medium text-gray-700">คำนำหน้าชื่อแบบเต็ม (แสดงผล สำหรับแพทย์ EN)</label>
                                        <input type="text" v-model.trim="personForm.rname_full_en" id="rname_full_en" placeholder="Ex. Emeritus Professor Or etc..." class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3">
                                        <div class="flex">
                                            <label for="rname_short_th" class="block text-sm font-medium text-gray-700">คำนำหน้าชื่อแบบย่อ (แสดงผล สำหรับแพทย์ TH)</label>
                                            <div v-if="personForm.position_academic !== 0" class=" text-red-500 px-2">*</div>
                                        </div>
                                        <input type="text" v-model.trim="personForm.rname_short_th" id="rname_short_th" placeholder="เช่น ศ. คลินิก เกียรติคุณ พญ. หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        <div class="p-error" v-if="submitted && !personForm.rname_short_th">จำเป็นต้องใส่ คำนำหน้าชื่อแบบย่อภาษาไทย</div>
                                    </div>

                                    <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3">
                                        <div class="flex">
                                            <label for="rname_short_en" class="block text-sm font-medium text-gray-700">คำนำหน้าชื่อแบบย่อ (แสดงผล สำหรับแพทย์ EN)</label>
                                            <div class=" text-white">.</div>
                                        </div>
                                        <input type="text" v-model.trim="personForm.rname_short_en" id="rname_short_en" placeholder="Ex. Emeritus Professor Or etc..." class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />       
                                    </div>

                                    <!-- <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-4"> -->
                                    <div v-if="personForm.position_academic !== 0" class="col-span-6">
                                        <label for="position_mgnt" class="block text-sm font-medium text-gray-700">ตำแหน่งทางการบริหารในภาควิชา (แสดงผล สำหรับแพทย์)</label>
                                        <input type="text" v-model.trim="personForm.position_mgnt" id="position_mgnt" placeholder="เช่น รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายเวชสารสนเทศและเวชระเบียน หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3">
                                        <label for="reward" class="block text-sm font-medium text-gray-700">คำต่อท้ายชื่อ (แสดงผล สำหรับแพทย์)</label>
                                        <input type="text" v-model.trim="personForm.reward" id="reward" placeholder="เช่น ศ.11 หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="position_division" class="block text-sm font-medium text-gray-700">ตำแหน่งใน สาขา/หน่วยงาน (แสดงผล)</label>
                                        <input type="text" v-model.trim="personForm.position_division" id="position_division" placeholder="เช่น หัวหน้าสาขา หรือ หัวหน้าหน่วย หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <div class="flex items-center space-x-2">
                                            <label for="leader" class="block text-sm font-medium text-gray-700">เป็นหัวหน้า สาขา/หน่วยงาน</label>
                                            <input type="checkbox" v-model="personForm.leader" id="leader" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                        </div>
                                    </div>

                                    <div v-if="personForm.type == 'z'" class="col-span-6 sm:col-span-2">
                                        <div class="flex items-center space-x-2">
                                            <label for="teacher" class="block text-sm font-medium text-gray-700">เป็นอาจารย์ประจำสาขา</label>
                                            <input type="checkbox" v-model="personForm.teacher" id="teacher" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                        </div>
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <div class="flex items-center justify-start">
                                            <div class="text-sm"> รายละเอียดใบประกาศ / วุฒิบัตรต่างๆ : </div>
                                            <svg
                                            v-show="!viewDataInfomation" 
                                            xmlns="http://www.w3.org/2000/svg" @click="createCertificate(personForm.certificateList)" class="h-5 w-5 ml-2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-col">
                                    <div
                                        v-for="(input, index) in personForm.certificateList"
                                        :key="`certificateInput-${index}`" 
                                        class="flex items-center mb-2"
                                    > 
                                        <div class="w-full mr-1">
                                            <input v-model="input.cert" type="text" name="" id="" placeholder="ใส่รายละเอียดที่นี่" class="w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
                                        </div>
                                        <div class="w-25">
                                            <input v-model="input.cert_year" type="text" name="" id="" placeholder="ใส่ปี พ.ศ." class="w-full border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
                                        </div>
                                        <svg
                                            v-show="personForm.certificateList.length > 0 && !viewDataInfomation"
                                            xmlns="http://www.w3.org/2000/svg" @click="deleteCertificate(index, personForm.certificateList)" class="h-5 w-5 ml-2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                        </svg>    
                                    </div>  

                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row mt-2 space-x-4">
                <!-- <button v-if="action === 'view' && viewDataInfomation" @click="togglePdpaData" type="button" 
                    class="bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                    :class="[pdpa_protect ? 'text-green-700' : 'text-red-700']"
                    >
                    ดู/ปิด ข้อมูลส่วนบุคคล
                </button> -->
                <button v-if="action === 'insert'" type="button" @click="savePerson" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">จัดเก็บ</button>
                <button v-if="action === 'edit'" type="button" @click="savePerson" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">แก้ไข</button>
                <!-- <Link :href="route('admin.person')" :data="{ 'fdivision_selected': personForm.division_selected }" method="get" as="button" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                    ยกเลิก
                </Link> -->
                <!-- ใช้ remember middleware แล้วมันจะจำ query string ล่าสุดให้เอง -->
                <Link :href="route('admin.person')" method="get" as="button" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                    ยกเลิก
                </Link>
            </div>

        </div>
    </AdminAppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'

// API Service
import TraceLogService from '@/Services/TraceLogService'

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css' // import the styling for the toast

const props = defineProps({
    action: { type: String, require: true, default: "insert" },
    person: { type: Object },
    divisions: { type: Array },
    fdivision_selected: { type: Number},
})

const section = "Person Management (ดูข้อมูลทั้งหมดของบุคลากรเป็นรายคน)"
const actionWord = ref(null)
const baseUrl = ref(base_url) 
const url = props.person ? ref(props.person.image_url) : ref(null)
const oldimage = props.person ? ref(props.person.image) : ref(null)
const viewDataInfomation = ref(false)
const pdpa_protect = ref(false)
const submitted = ref(false)
const traceLogService = ref(new TraceLogService())

const personForm = useForm({
  id: props.person ? props.person.id : null,
  division_selected: props.fdivision_selected ? props.fdivision_selected : usePage().props.value.auth.division_id,
  sap_id: props.person ? props.person.sap_id : '99999999',
  title_th: props.person ? props.person.title_th : 'นาย',
  title_en: props.person ? props.person.title_en :  'Mr.',
  fname_th: props.person ? props.person.fname_th : 'ทดสอบ',
  fname_en: props.person ? props.person.fname_en : null,
  lname_th: props.person ? props.person.lname_th : 'เพิ่มบุคลากร',
  lname_en: props.person ? props.person.lname_en : null,
  rname_full_th: props.person ? props.person.rname_full_th : null,
  rname_full_en: props.person ? props.person.rname_full_en : null,
  rname_short_th: props.person ? props.person.rname_short_th : null,
  rname_short_en: props.person ? props.person.rname_short_en : null,
  image: props.person ? props.person.image : null,
  type: props.person ? props.person.type : 'b',
  group: props.person ? props.person.group : 99,
  position_mgnt: props.person ? props.person.position_mgnt : null,
  position_division: props.person ? props.person.position_division : null,
  position_academic: props.person ? props.person.position_academic : 99,
  reward: props.person ? props.person.reward : null,
  leader: props.person ? props.person.profiles.leader : false,
  teacher: props.person ? props.person.profiles.teacher : false,
  certificateList: props.person ? JSON.parse(props.person.cert) : []
});

const group_list = ref([
                        { value: 1, desc: "วิชาการ" },
                        { value: 2, desc: "วิชาชีพเฉพาะ" },
                        { value: 3, desc: "สนับสนุนวิชาการ" },
                        { value: 4, desc: "สนับสนุนทั่วไป(ปฏิบัติการ)" },
                        { value: 5, desc: "สนับสนุนทั่วไป(ช่วยปฏิบัติการ)" }
                      ])
const position_academic_list = ref([
                                    { value: 0, desc: "ไม่ระบุตำแหน่ง" },
                                    { value: 1, desc: "ศาสตราจารย์" },
                                    { value: 2, desc: "รองศาสตราจารย์" },
                                    { value: 3, desc: "ผู้ช่วยศาสตราจารย์" },
                                    { value: 4, desc: "อาจารย์" },
                                    { value: 5, desc: "แพทย์ (ผู้ช่วยอาจารย์คลินิก)" },
                                    { value: 6, desc: "แพทย์" }
                                  ])

switch(props.action) {
    case 'insert':
        actionWord.value = "เพิ่ม"
        pdpa_protect.value = false
        break;
    case 'edit':
        actionWord.value = "แก้ไข"
        pdpa_protect.value = false
        break;
    case 'view':
        actionWord.value = "ดู"
        viewDataInfomation.value = true
        break;
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

const createCertificate = (fieldType) => {
  fieldType.push({ cert: '' });
  //console.log(personForm.certificateList)
}

const deleteCertificate = (index, fieldType) => {
  fieldType.splice(index, 1);
  //console.log(personForm.certificateList)
}

const previewImage = (e) => {
    const file = e.target.files[0];
    if( file ) {
        url.value = URL.createObjectURL(file);
    } else {
        url.value = ""
    }
}

const replaced = ( str, use_case ) => {

    let markStr = "---"
    if( use_case === "sap") {
        markStr = "******"
    }

    let firstStr = str.substr(0,1)
    let lastStr = str.substr(str.length-1, 1)

    return firstStr+markStr+lastStr
    //return str.slice(0, -5) + '*****';
}

const original_str = ( str ) => {
    alert(str)
}

const togglePdpaData = () => {
    pdpa_protect.value = ! pdpa_protect.value
    if( ! pdpa_protect.value ) {
        // มีการเปิดดูข้อมูลส่วนบุคคล
        traceLogService.value.storeLog(
            section, 
            "view",
            "มีการเปิดดูข้อมูลส่วนบุคคลของ sap_id:" + personForm.sap_id, 
            "pdpa"
        )
    }
}

const checkRequireData = () => {
  // ตรวจสอบ กลุ่มงานและ ตำแหน่งงานต้องถูกเลือก ห้ามว่าง
  if( (personForm.group === 99) || (personForm.position_academic === 99) ) {
    return false
  }
  // ถ้ามีตำแหน่งทางวิชาการ ต้องระบุให้ครบทั้งชื่อ นามสกุล คำนำหน้าชื่อแบบเต็ม คำนำหน้าชื่อแบบย่อ 
  else if(personForm.position_academic !== 0) {
    if( personForm.fname_th && personForm.lname_th && personForm.rname_full_th && personForm.rname_short_th ) {
      return true
    } else {
      return false
    }
  }
  // ที่เหลืออย่างน้อยต้องใส่ ชื่อ นามสกุล
  else {
    if( personForm.fname_th && personForm.lname_th ) {
      return true
    } else {
      return false
    }
  }
}

const savePerson = () => {
    let error_display = ''
    submitted.value = true;
    if(! checkRequireData() ) {
        toast('warning', 'คำเตือน', 'ยังระบุข้อมูลที่ต้องการของบุคลากรไม่ครบถ้วน');
    } else { 
        if(personForm.id) {  // Update
            personForm.transform(data => ({
                ...data,
                certificateList: JSON.stringify(data.certificateList),
                oldimage: oldimage.value,
                //fdivision_selected: fdivision_selected.value   
            })).post( route('admin.person.update', personForm.id), {
                    _method: 'patch',
                    preserveState: true,
                onSuccess: () => {
                    toast('success', 'สำเร็จ', 'แก้ไขข้อมูลบุคลากร เรียบร้อย')    
                },
                onError: (errors) => {
                    for ( let p in errors ) {
                        error_display = error_display + `- ${errors[p]}<br/>`
                    }
                    toast('danger', 'พบข้อผิดพลาด', error_display);
                    pdpa_protect.value = false
                },
                onFinish: () => {
                    personForm.processing = false
                }
            })
        } else { // Insert
        // console.log(personForm.certificateList)
        //personForm.certificateList = JSON.stringify(personForm.certificateList)
        // console.log(personForm.certificateList)
            personForm.transform(data => ({
                ...data,
                certificateList: JSON.stringify(data.certificateList)
            })).post(route('admin.person.store'), {
                    preserveState: true,
                onSuccess: () => {
                    toast('success', 'สำเร็จ', 'จัดเก็บข้อมูลบุคลากร เรียบร้อย')
                },
                onError: (errors) => {
                    for ( let p in errors ) {
                        error_display = error_display + `- ${errors[p]}<br/>`
                    }
                    toast('danger', 'พบข้อผิดพลาด', error_display);
                },
                onFinish: () => {
                    personForm.processing = false 
                }
            });
        }
        //pdpa_protect.value = true
    }
}


</script>

<style scoped>
  .p-error {
    font-size: 12px
    /*line-height: 1.25rem*/ /* 20px */;
    color: red;
  }
</style>