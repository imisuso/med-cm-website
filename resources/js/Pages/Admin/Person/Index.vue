<template>
  <AdminAppLayout>
  <div class="flex flex-col px-2 py-1 w-full">
    <div class="mb-2 text-2xl font-bold">จัดการบุคคลากร</div>
    <!-- Toolbar -->
    <div v-if="$page.props.auth.abilities.includes('view_all_content')" class="flex flex-col sm:flex-row items-start sm:items-center mb-2">
      <div class="sm:w-32 text-sm font-medium text-gray-700">สาขา/หน่วยงาน:</div>
      <select v-model="fdivision_selected" @change="getPersonList" id="form_division_id" class="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <!-- <option value="0">ทุกสาขา/หน่วยงาน</option> -->
        <option v-for="(option, index) in divisions" :key="index" :value="option.division_id">
          {{ option.name_th }}
        </option>
      </select>
    </div>
    <div class="flex flex-col sm:flex-row sm:justify-between px-2 py-2 space-y-2 mb-2 w-full border rounded-md shadow-md items-baseline">
      <div class="flex space-x-2 w-full place-self-center">
        <!-- <input @keyup="person_filter" v-model="filter_key" type="text" id="search" placeholder="ค้นหาด้วย ชื่อ หรือ นามสกุล หรือ รหัส SAP" class="block mx-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> -->
        <input v-model="search" type="text" id="search" placeholder="ค้นหาด้วย ชื่อ หรือ นามสกุล หรือ รหัส SAP" class="block mx-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div class="flex space-x-2">
        <button @click="addPerson" class="flex items-center px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-900 rounded cursor-pointer hover:bg-green-800">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>เพิ่ม</div>
        </button>
  
        <Link v-if="fdivision_selected != 0 && persons.total > 1" :href="route('admin.person_order', getDivisionSlugFromId(parseInt(fdivision_selected)))">
          <button class="flex items-center w-28 py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <div>เรียงลำดับ</div> 
          </button>
        </Link>
      </div>
    </div>

    <div class="flex flex-col w-full">
        <PersonInteractiveCardList 
          v-for="(item, index) in persons.data" 
          :key="index" 
          :personDetails="item"
          :order-input="false"
          @edit-person="editPerson(item)" 
          @view-person="viewPerson(item)"
          @order-person="orderPerson(item)"
          @delete-person="confirmDeletePerson(item)"
        />
    </div>

    <!-- Modal สำหรับ ดู จัดเก็บ หรือ แก้ไข ข้อมูลบุคคลากร -->
    <Modal modalSize="large" :isModalOpen="personModal" >
      <template v-slot:header>
        <div class="text-gray-900 text-xl font-medium dark:text-white">
            รายละเอียดข้อมูลบุคคลากร
        </div>
        <svg @click="openPersonModal(false)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </template>
      <template v-slot:body>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
            <fieldset :disabled="viewDataInfomation">
              <div class="gap-6 mb-6">
                <label class="block text-sm font-medium text-gray-700">
                  รูปบุคคลากร
                </label>
                <div class="mt-1 flex items-center">
                  <span class="inline-block h-32 w-28 rounded-md overflow-hidden bg-gray-100">
                    <svg v-if="! personForm.image" class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
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
                  <input :type="[pdpa_protect ? 'password' : 'text']" id="sap_id" v-model.trim="personForm.sap_id" 
                         class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                         :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']" 
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="division_selected" class="block text-sm font-medium text-gray-700">สาขา/หน่วยงาน</label>
                  <select v-model="personForm.division_selected" id="division_selected" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <template v-for="(option, index) in divisions" :key="index">
                      <option v-if="$page.props.auth.abilities.includes('view_all_content')" :value="option.division_id">{{ option.name_th }}</option>
                      <option v-else :value="option.division_id" :disabled="personForm.division_selected !== option.division_id">{{ option.name_th }}</option>                     
                    </template>
                    <!-- <option v-for="(option, index) in divisions" :key="index" :value="option.division_id">
                      {{ option.name_th }}
                    </option> -->
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
                    <div class=" text-red-900 px-2">*</div>
                  </div>
                  <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.fname_th" id="fname_th" required="true" 
                          class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                          :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']"        
                  />
                  <div class="p-error" v-if="submitted && !personForm.fname_th">จำเป็นต้องใส่ ชื่อภาษาไทย</div>
                </div>

                <div class="col-span-6 sm:col-span-2">
                  <div class="flex">
                    <label for="lname_th" class="block text-sm font-medium text-gray-700">นามสกุล (TH)</label>
                    <div class=" text-red-900 px-2">*</div>
                  </div>
                  <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.lname_th" id="lname_th" 
                          class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                          :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']"
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
                  <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.fname_en" id="fname_en" 
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                          :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']"
                  />
                </div>

                <div class="col-span-6 sm:col-span-2">
                  <label for="lname_en" class="block text-sm font-medium text-gray-700">นามสกุล (EN)</label>
                  <input  :type="[pdpa_protect ? 'password' : 'text']" v-model.trim="personForm.lname_en" id="lname_en" 
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                          :class="[viewDataInfomation && !pdpa_protect ? 'border-red-500 ring-red-500' : '']"
                  />
                </div>

                <div class="col-span-6 sm:col-span-2">
                  <label for="type" class="block text-sm font-medium text-gray-700">ประเภทบุคคลากร</label>
                  <select v-model="personForm.type" id="type" @change="personForm.group=99" class=" block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="z">ที่ปรึกษา</option>
                    <option value="a">สายวิชาการ</option>
                    <option value="b">สายสนับสนุน</option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-2">
                  <label for="group" class="block text-sm font-medium text-gray-700">กลุ่มงาน</label>
                  <select v-model="personForm.group" id="group" @change="personForm.position_academic=99" class=" block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                  <label for="position_academic" class="block text-sm font-medium text-gray-700">ตำแหน่งงาน</label>
                  <!-- <select v-model="personForm.position_academic" :disabled="personForm.type === 'b'" id="position_academic" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"> -->
                  <select v-model="personForm.position_academic" id="position_academic" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                  <!-- <div class="p-error" v-if="submitted && (personForm.type !== 'b') && (personForm.position_academic === 0)">เลือกตำแหน่งงาน ไม่ถูกต้อง</div> -->
                  <div class="p-error" v-if="submitted && (personForm.position_academic === 99)">จำเป็นต้องระบุตำแหน่งงาน</div>
                </div>

                <!-- แสดงข้อมูลส่วนนี้เมื่อบุคคลากรคนนั้นเป็น อาจารย์แพทย์ แพทย์ หรือ ที่ปรึกษา (เป็นข้อมูลสำหรับหมอ เท่านั้น เพราะไม่ได้เอาคำนำหน้าตามปกติไปแสดง เลยต้องมีส่วนนี้) -->
                <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3">
                  <div class="flex">
                    <label for="rname_full_th" class="block text-sm font-medium text-gray-700">คำนำหน้าชื่อแบบเต็ม (แสดงผล สำหรับแพทย์ TH)</label>
                    <div v-if="personForm.position_academic !== 0" class=" text-red-900 px-2">*</div>
                  </div>
                  <!-- <input type="text" v-model.trim="personForm.rname_full_th" :disabled="personForm.type === 'b'" id="rname_full_th" placeholder="เช่น ศาสตราจารย์ คลินิก เกียรติคุณ นายแพทย์ หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> -->
                  <input type="text" v-model.trim="personForm.rname_full_th" id="rname_full_th" placeholder="เช่น ศาสตราจารย์ คลินิก เกียรติคุณ นายแพทย์ หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <div class="p-error" v-if="submitted && !personForm.rname_full_th">จำเป็นต้องใส่ คำนำหน้าชื่อแบบเต็มภาษาไทย</div>
                </div>

                <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3">
                  <label for="rname_full_en" class="block text-sm font-medium text-gray-700">คำนำหน้าชื่อแบบเต็ม (แสดงผล สำหรับแพทย์ EN)</label>
                  <!-- <input type="text" v-model.trim="personForm.rname_full_en" :disabled="personForm.type === 'b'" id="rname_full_en" placeholder="Ex. Emeritus Professor Or etc..." class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> -->
                  <input type="text" v-model.trim="personForm.rname_full_en" id="rname_full_en" placeholder="Ex. Emeritus Professor Or etc..." class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3">
                  <div class="flex">
                    <label for="rname_short_th" class="block text-sm font-medium text-gray-700">คำนำหน้าชื่อแบบย่อ (แสดงผล สำหรับแพทย์ TH)</label>
                    <div v-if="personForm.position_academic !== 0" class=" text-red-900 px-2">*</div>
                  </div>
                  <!-- <input type="text" v-model.trim="personForm.rname_short_th" :disabled="personForm.type === 'b'" id="rname_short_th" placeholder="เช่น ศ. คลินิก เกียรติคุณ พญ. หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> -->
                  <input type="text" v-model.trim="personForm.rname_short_th" id="rname_short_th" placeholder="เช่น ศ. คลินิก เกียรติคุณ พญ. หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <div class="p-error" v-if="submitted && !personForm.rname_short_th">จำเป็นต้องใส่ คำนำหน้าชื่อแบบย่อภาษาไทย</div>
                </div>

                <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-3">
                  <label for="rname_short_en" class="block text-sm font-medium text-gray-700">คำนำหน้าชื่อแบบย่อ (แสดงผล สำหรับแพทย์ EN)</label>
                  <!-- <input type="text" v-model.trim="personForm.rname_short_en" :disabled="personForm.type === 'b'" id="rname_short_en" placeholder="Ex. Emeritus Professor Or etc..." class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> -->
                  <input type="text" v-model.trim="personForm.rname_short_en" id="rname_short_en" placeholder="Ex. Emeritus Professor Or etc..." class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-2">
                  <label for="reward" class="block text-sm font-medium text-gray-700">คำต่อท้ายชื่อ (แสดงผล สำหรับแพทย์)</label>
                  <!-- <input type="text" v-model.trim="personForm.reward" :disabled="personForm.type === 'b'" id="reward" placeholder="เช่น ศ.11 หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> -->
                  <input type="text" v-model.trim="personForm.reward" id="reward" placeholder="เช่น ศ.11 หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div v-if="personForm.position_academic !== 0" class="col-span-6 sm:col-span-4">
                  <label for="position_mgnt" class="block text-sm font-medium text-gray-700">ตำแหน่งทางการบริหารในภาควิชา (แสดงผล สำหรับแพทย์)</label>
                  <!-- <input type="text" v-model.trim="personForm.position_mgnt" :disabled="personForm.type === 'b'" id="position_mgnt" placeholder="เช่น รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายเวชสารสนเทศและเวชระเบียน หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> -->
                  <input type="text" v-model.trim="personForm.position_mgnt" id="position_mgnt" placeholder="เช่น รองหัวหน้าภาควิชาอายุรศาสตร์ฝ่ายเวชสารสนเทศและเวชระเบียน หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label for="position_division" class="block text-sm font-medium text-gray-700">ตำแหน่งใน สาขา/หน่วยงาน (แสดงผล)</label>
                  <input type="text" v-model.trim="personForm.position_division" id="position_division" placeholder="เช่น หัวหน้าสาขา หรือ หัวหน้าหน่วย หรือ อื่นๆ" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-2">
                  <div class="flex items-center space-x-2">
                    <label for="leader" class="block text-sm font-medium text-gray-700">เป็นหัวหน้า สาขา/หน่วยงาน {{ personForm.leader }}</label>
                    <input type="checkbox" v-model="personForm.leader" id="leader" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    </div>
                </div>

                <div class="col-span-6 sm:col-span-4">
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
      </template>
  
      <template v-slot:footer>
        <button
          v-show="!viewDataInfomation" 
          @click="savePerson" 
          type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          จัดเก็บ
        </button>
        <button @click="openPersonModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
        <button v-show="viewDataInfomation" @click="togglePdpaData" type="button" 
                 class="bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                 :class="[pdpa_protect ? 'text-green-700' : 'text-red-700']"
                 >
                 ดู/ปิด ข้อมูลส่วนบุคคล
        </button>
      </template>
    </Modal>

    <!-- Modal สำหรับ confirm การลบ ข้อมูลบุคคลากร  -->
    <Modal :isModalOpen="deletePersonModal" >

      <template v-slot:header>
        <div class="text-gray-900 text-xl font-medium dark:text-white">
            คุณต้องการลบข้อมูลบุคคลากร
        </div>
      </template>

      <template v-slot:body>
        <div class="text-gray-900 text-md font-medium dark:text-white">
            {{ personForm.title_th }}{{ personForm.fname_th}} {{personForm.lname_th}}
        </div>
      </template>

      <template v-slot:footer>
        <button @click="openDeletePersonModal(false)" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">ยกเลิก</button>
        <button @click="deletePerson()" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800">ลบ</button>
      </template>
    </Modal>
  </div>

  <div class="flex justify-center md:justify-end mt-2 px-4">
      <Pagination :pagination="persons"/>
  </div>
</AdminAppLayout>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage, Link } from '@inertiajs/inertia-vue3'
import Modal from '@/Components/Modal'
import PersonInteractiveCardList from '@/Components/PersonInteractiveCardList'
import Pagination from '@/Components/Paginations'

// API Service
import DivisionService from '@/Services/DivisionService'
import TraceLogService from '@/Services/TraceLogService'

import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'  // import the styling for the toast

// import Swal from 'sweetalert2'
// import 'sweetalert2/dist/sweetalert2.min.css';

const props = defineProps({
    persons: { type: Object, required: true, default: {} },
    filters: { type: Object },
})

onMounted(() => {
  divisionService.value.listAll().then(data => {
    divisions.value = data
  });
})

const section = "Person Management (ดูข้อมูลทั้งหมดของบุคคลากรเป็นรายคน)"
const divisionService = ref(new DivisionService())
const traceLogService = ref(new TraceLogService())
const personModal = ref(false)
const deletePersonModal = ref(false)
const url = ref(null)
const oldimage = ref(null)
const submitted = ref(false)
const viewDataInfomation = ref(false)
const add_person_without_filter = ref(true)
const divisions = ref([])
const filter_key = ref()
const check_doctor = ref()
const pdpa_protect = ref(true)
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

const personForm = useForm({
  id: null,
  division_selected: usePage().props.value.auth.division_id,
  sap_id: '99999999',
  title_th: 'นาย',
  title_en:  'Mr.',
  fname_th: 'ทดสอบ',
  fname_en: '',
  lname_th: 'เพิ่มบุคคลากร',
  lname_en: '',
  rname_full_th: null,
  rname_full_en: null,
  rname_short_th: null,
  rname_short_en: null,
  image: '',
  type: 'b',
  group: 99,
  position_mgnt: null,
  position_division: null,
  position_academic: 99,
  reward: null,
  leader: false,
  certificateList: []
});

let fdivision_selected = props.filters.fdivision_selected ? ref(props.filters.fdivision_selected) : ref(usePage().props.value.auth.division_id)
let search = ref(props.filters.search)

watch( search, value => {
    //console.log('changed ' + value)
    Inertia.get(route('admin.person'), { search: value, fdivision_selected: fdivision_selected.value }, {
        preserveState: true,
        replace: true
    })
})

const createCertificate = (fieldType) => {
  fieldType.push({ cert: '' });
  //console.log(personForm.certificateList)
}

const deleteCertificate = (index, fieldType) => {
  fieldType.splice(index, 1);
  //console.log(personForm.certificateList)
}

const openPersonModal = (isopen) => {
  personModal.value = isopen
  if( !isopen ) {
    personForm.reset()
    url.value = null
    oldimage.value = null
    submitted.value = false
    viewDataInfomation.value = false
    pdpa_protect.value = true
  }
}

const openDeletePersonModal = (isopen) => {
  deletePersonModal.value = isopen
  if( !isopen ) {
    personForm.reset()
    url.value = null
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

const swalAlert = (severity, summary, detail ) => {
  Swal.fire({
              icon: severity,   // Can success, warning, error, info, question
              //toast: true,
              position: 'center', // Can 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'
              title: summary,
              html: detail,
              //timer: 3000,
              //timerProgressBar: true,
            })
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
  submitted.value = true;
  if(! checkRequireData() ) {
      toast('warning', 'คำเตือน', 'ยังระบุข้อมูลที่ต้องการของบุคคลากรไม่ครบถ้วน');
  } else { 
    if(personForm.id) {  // Update
      //console.log("Update")
      //console.log(personForm)
      personForm.transform(data => ({
          ...data,
          certificateList: JSON.stringify(data.certificateList),
          oldimage: oldimage.value,
          fdivision_selected: fdivision_selected.value   
      })).post( route('admin.update_person', personForm.id), {
        _method: 'patch',
        preserveState: false,
        //preserveScroll: true,
        onSuccess: () => {
          //swalAlert('success', 'แก้ไขสำเร็จ', 'แก้ไขข้อมูลบุคคลากร เรียบร้อย')
          toast('success', 'แก้ไขสำเร็จ', 'แก้ไขข้อมูลบุคคลากร เรียบร้อย')
          personForm.reset()  // ทำการ reset person form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว       
        },
        onError: (errors) => {
          toast('danger', errors.msg, errors.sysmsg)
        },
        onFinish: () => {
          personForm.processing = false
        }
      })
    } else { // Insert
      //console.log("Insert")
      // console.log(personForm.certificateList)
      //personForm.certificateList = JSON.stringify(personForm.certificateList)
      // console.log(personForm.certificateList)
      personForm.transform(data => ({
          ...data,
          certificateList: JSON.stringify(data.certificateList),
          fdivision_selected: fdivision_selected.value
      })).post(route('admin.add_person'), {
        preserveState: true,
        onSuccess: () => {
          toast('success', 'สำเร็จ', 'จัดเก็บข้อมูลบุคคลากร เรียบร้อย')
          personForm.reset()  // ทำการ reset person form ตรงนี้ก่อน ไม่งั้นจะได้ ข้อมูลของเดิมจากที่ได้เพิ่ม หรือแก้ไขไว้แล้ว
        },
        onError: (errors) => {
          toast('danger', errors.msg, errors.sysmsg)
        },
        onFinish: () => {
          personForm.processing = false
          
        }
      });
    }

    pdpa_protect.value = true
    openPersonModal(false) // ปิด Modal
  }
}

const deletePerson = () => {
  personForm.transform(data => ({
    ...data,
    fdivision_selected: fdivision_selected.value
  })).delete(route('admin.delete_person'), {
    preserveState: true,
    onSuccess: () => {
        toast('success', 'สำเร็จ', 'ลบข้อมูลบุคคลากร เรียบร้อย')
    },
    onError: (errors) => {
        console.log(errors)
        toast('danger', errors.msg, errors.sysmsg)
    },
    onFinish: () => {
        personForm.processing = false 
    }
  });

  openDeletePersonModal(false)
}

const getPersonList = () => {
  Inertia.get(route('admin.person'), { fdivision_selected: fdivision_selected.value }, {
      preserveState: true,
      replace: true,
  })
}

// Click ปุ่ม เพิ่ม 
const addPerson = () => {
  personForm.reset()
  pdpa_protect.value = false
  openPersonModal(true)
}

const viewPerson = ( personData ) => {
  addPersonDataToForm( personData )
  viewDataInfomation.value = true
  // เก็บ Log เมื่อมีการเปิดดูข้อมูล
  traceLogService.value.storeLog(
      section, 
      "view",
      "มีการเปิดดูข้อมูลบุคคลากรของ sap_id:" + personData.sap_id, 
      "info"
  )
  openPersonModal(true)
}

const editPerson = ( personData ) => {
  addPersonDataToForm( personData )
  pdpa_protect.value = false
  // เก็บ Log เมื่อมีการแก้ไขข้อมูล
  traceLogService.value.storeLog(
      section, 
      "edit",
      "มีการเปิดแก้ไขข้อมูลบุคคลากรของ sap_id:" + personData.sap_id, 
      "pdpa"
  )
  openPersonModal(true)
}

const confirmDeletePerson = ( personData ) => {
  addPersonDataToForm( personData )
  openDeletePersonModal(true)
}

const orderPerson = (personData) => {
  //console.log(personData.display_order)
  personList.value = personList.value.sort( (a, b) => { return a.display_order - b.display_order });
}

const getDivisionSlugFromId = (id) => {
  //console.log(id)
  let division = divisions.value.filter( (elm) => { return elm.division_id === id });
  if(division.length > 0) {
    return division[0].slug
  } else {
    return ""
  }
  //console.log(division[0].slug)
  //console.log(division)
}

const addPersonDataToForm = ( personData ) => {
  // console.log( JSON.parse(personData.cert) )
  //console.log(personData.profiles.leader)
  personForm.id = personData.id
  personForm.division_selected = personData.division_id
  personForm.sap_id = personData.sap_id
  personForm.title_th = personData.title_th
  personForm.title_en = personData.title_en
  personForm.fname_th = personData.fname_th
  personForm.fname_en = personData.fname_en
  personForm.lname_th = personData.lname_th
  personForm.lname_en = personData.lname_en
  personForm.rname_full_th = personData.rname_full_th
  personForm.rname_full_en = personData.rname_full_en
  personForm.rname_short_th = personData.rname_short_th
  personForm.rname_short_en = personData.rname_short_en
  personForm.image = personData.image
  url.value = `${personData.image_url}`
  oldimage.value = personData.image
  personForm.type = personData.type
  personForm.group = personData.group
  personForm.position_mgnt = personData.position_mgnt
  personForm.position_division = personData.position_division
  personForm.position_academic = personData.position_academic
  personForm.reward = personData.reward
  personForm.leader = personData.profiles.leader
  personForm.certificateList = personData.cert ? JSON.parse(personData.cert) : []
  //personForm.display_order = personData.display_order

  //console.log(personForm.certificateList)
};

const previewImage = (e) => {
    const file = e.target.files[0];
    //console.log(file)
    if( file ) {
        url.value = URL.createObjectURL(file);
    } else {
        url.value = ""
    }
}

// const person_filter = () => {
//   //console.log(filter_key.value)
//   let filter_person = props.persons.filter( (elmt) => {
//     //console.log(elmt.sap_id)
//     if( elmt.sap_id.match(filter_key.value) || elmt.fname_th.match(filter_key.value) || elmt.lname_th.match(filter_key.value) ) {
//       return elmt
//     }
//   })

//   //console.log(filter_person)
//   personList.value = filter_person
// }

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

</script>

<style scoped>
  .p-error {
    font-size: 12px
    /*line-height: 1.25rem*/ /* 20px */;
    color: red;
  }
</style>