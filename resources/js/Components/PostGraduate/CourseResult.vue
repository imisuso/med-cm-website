<template>
    <div class="relative px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
        <div class="flex justify-center mb-8">
            <div class="inline-flex w-full mt-4 overflow-hidden rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0">
                <div class="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white transition-colors duration-150 transform sm:w-auto bg-gradient-to-r from-green-700 to-green-900 hover:from-green-600 hover:to-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-2 fill-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span class="mx-2 text-2xl">
                        ผลลัพธ์ของหลักสูตรการฝึกอบรม
                    </span>
                </div>
            </div>
        </div>
        <p class="text-left mb-8">ผลสัมฤทธิ์ของแผนงานฝึกอบรมมีแนวคิดมาจากคุณลักษณะหลักของอายุรแพทย์ที่พึงประสงค์ในปัจจุบัน สอดคล้องกับความต้องการของสังคม สอดคล้องกับระบบสุขภาพ และต่อยอดคุณลักษณะของแพทยศาสตร์บัณฑิต ดังนั้นแพทย์ประจำบ้านที่จบการฝึกอบรมต้องสามารถปฏิบัติงานได้ด้วยตนเองตามสมรรถนะหลักทั้ง 6 ด้านดังนี้</p>
        <!-- <div class="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
        <svg viewBox="0 0 88 88" class="w-full max-w-screen-xl text-indigo-100">
            <circle fill="currentColor" cx="44" cy="44" r="15.5"></circle>
            <circle fill-opacity="0.2" fill="currentColor" cx="44" cy="44" r="44"></circle>
            <circle fill-opacity="0.2" fill="currentColor" cx="44" cy="44" r="37.5"></circle>
            <circle fill-opacity="0.3" fill="currentColor" cx="44" cy="44" r="29.5"></circle>
            <circle fill-opacity="0.3" fill="currentColor" cx="44" cy="44" r="22.5"></circle>
        </svg>
        </div> -->
        <div class="relative grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                    <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-blue-200">
                        <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                        <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                        </svg>
                    </div>
                    <div class="flex items-start space-x-2">
                        <p class="mb-2 font-bold">1.</p>
                        <p class="mb-2 font-bold">การบริบาลผู้ป่วย (Patient Care)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>มีทักษะในการซักประวัติ ตรวจร่างกาย การส่งตรวจทางห้องปฏิบัติการ และการรวบรวมข้อมูล สำหรับนำมาคิดวิเคราะห์อย่างเป็นเหตุเป็นผล เพื่อนำไปสู่การตัดสินใจให้การดูแลรักษาผู้ป่วยอย่างเหมาะสมเป็น</li>
                            <li>วินิจฉัยบำบัดรักษาภาวะผิดปกติทางอายุรศาสตร์ที่พบโดยทั่วไปในประเทศไทยได้อย่างถูกต้องและเหมาะสม</li>
                            <li>บันทึกรายงานผู้ป่วยได้อย่างสมบูรณ์และสม่ำเสมอ</li>
                            <li>ป้องกันโรคและสร้างเสริมสุขภาพ</li>
                        </ul>
                    </div>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-blue-500 group-hover:scale-x-100"></div>
            </div>

            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                    <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-blue-200">
                        <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                        <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                        </svg>
                    </div>
                    <div class="flex items-start space-x-2">
                        <p class="mb-2 font-bold">2.</p>
                        <p class="mb-2 font-bold">ความรู้และทักษะหัตถการเวชกรรม (medical knowledge and procedural skills)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>มีความรู้ทางวิทยาศาสตร์การแพทย์พื้นฐานของร่างกาย และจิตใจ และสามารถประยุกต์ใช้ในการบริบาลผู้ป่วย</li>
                            <li>มีความรู้ความสามารถในวิชาชีพ และความเชี่ยวชาญในสาขาอายุรศาสตร์</li>
                            <li>มีทักษะในการทำหัตถการเพื่อวินิจฉัยและรักษาอย่างเหมาะสม</li>
                            <li>วิพากษ์งานวิจัยทางการแพทย์และสาธารณสุขได้</li>
                        </ul>
                    </div>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-blue-500 group-hover:scale-x-100"></div>
            </div>

            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                    <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-blue-200">
                        <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                        <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                        </svg>
                    </div>
                    <div class="flex items-start space-x-2">
                        <p class="mb-2 font-bold">3.</p>
                        <p class="mb-2 font-bold">ทักษะระหว่างบุคคล และการสื่อสาร (interpersonal and communication skills)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>นำเสนอข้อมูลผู้ป่วย และอภิปรายปัญหาอย่างมีประสิทธิภาพ</li>
                            <li>ถ่ายทอดความรู้และทักษะทางอายุรศาสตร์ให้แก่แพทย์ นักศึกษาแพทย์ และบุคลากรทางการแพทย์</li>
                            <li>สื่อสารให้ข้อมูลแก่ผู้ป่วยและญาติได้อย่างถูกต้องและมีประสิทธิภาพ บนพื้นฐานของความเมตตา เคารพในการตัดสินใจและศักดิ์ศรีของความเป็นมนุษย์</li>
                            <li>มีมนุษยสัมพันธ์ที่ดี  ทำงานกับผู้ร่วมงานทุกระดับอย่างมีประสิทธิภาพ และมีภาวะผู้นำ</li>
                            <li>เป็นที่ปรึกษาและให้คำแนะนำแก่แพทย์และบุคลากรอื่น</li>
                        </ul>
                    </div>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-blue-500 group-hover:scale-x-100"></div>
            </div>

            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                    <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-blue-200">
                        <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                        <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                        </svg>
                    </div>
                    <div class="flex items-start space-x-2">
                        <p class="mb-2 font-bold">4.</p>
                        <p class="mb-2 font-bold">การเรียนรู้และการพัฒนาจากฐานการปฏิบัติ (practice-based learning and improvement)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>เรียนรู้และเพิ่มประสบการณ์ได้ด้วยตนเองจากการปฏิบัติ</li>
                            <li>ปฏิบัติงานแบบสหวิชาชีพและเป็นทีม</li>
                            <li>การใช้ยาและทรัพยากรอย่างสมเหตุผล</li>
                            <li>ดำเนินการวิจัยทางการแพทย์และสาธารณสุขได้</li>
                        </ul>
                    </div>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-blue-500 group-hover:scale-x-100"></div>
            </div>

            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                    <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-blue-200">
                        <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                        <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                        </svg>
                    </div>
                    <div class="flex items-start space-x-2">
                        <p class="mb-2 font-bold">5.</p>
                        <p class="mb-2 font-bold">การปฏิบัติงานตามหลักวิชาชีพนิยม (professionalism)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>มีคุณธรรม จริยธรรม และเจตคติที่ดีต่อผู้ป่วย ญาติ ผู้ร่วมงาน เพื่อนร่วมวิชาชีพและชุมชน</li>
                            <li>เคารพในสิทธิผู้ป่วย</li>
                            <li>คำนึงถึงผลประโยชน์ส่วนรวม</li>
                            <li>มีความสนใจใฝ่รู้ และสามารถพัฒนาไปสู่ความเป็นผู้เรียนรู้ตลอดชีวิต และการพัฒนาวิชาชีพต่อเนื่อง</li>
                            <li>มีความรับผิดชอบต่องานที่ได้รับมอบหมาย</li>
                        </ul>
                    </div>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-blue-500 group-hover:scale-x-100"></div>
            </div>

            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                    <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-blue-200">
                        <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                        <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                        </svg>
                    </div>
                    <div class="flex items-start space-x-2">
                        <p class="mb-2 font-bold">6.</p>
                        <p class="mb-2 font-bold">การทำเวชปฏิบัติให้สอดคล้องกับระบบสุขภาพ (systems-based practice)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>มีความรู้ความเข้าใจเกี่ยวกับระบบสุขภาพและระบบยาของประเทศ</li>
                            <li>มีความรู้และมีส่วนร่วมในระบบพัฒนาคุณภาพการดูแลรักษาผู้ป่วย</li>
                            <li>มีความรู้ความเข้าใจในเรื่องการใช้ทรัพยากรสุขภาพอย่างเหมาะสม สามารถปรับเปลี่ยนการดูแลรักษาผู้ป่วยให้เข้ากับบริบทของการบริการสาธารณสุขได้ตามมาตรฐานวิชาชีพ</li>
                        </ul>
                    </div>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-blue-500 group-hover:scale-x-100"></div>
            </div>


            <!-- <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                    <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                    </svg>
                </div>
                <p class="mb-2 font-bold">Bowling Sports</p>
                <p class="text-sm leading-5 text-gray-900">
                    Disrupt inspire and think tank, social entrepreneur but preliminary thinking think tank compelling.
                </p>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
            </div>
            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                    <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                    </svg>
                </div>
                <p class="mb-2 font-bold">Cycling Sports</p>
                <p class="text-sm leading-5 text-gray-900">
                    A slice of heaven. O for awesome, this chocka full cuzzie is as rip-off as a cracker.
                </p>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
            </div>
            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                    <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                    </svg>
                </div>
                <p class="mb-2 font-bold">Weight Lifting Sports</p>
                <p class="text-sm leading-5 text-gray-900">
                    Meanwhile, in behind the bicycle shed, Hercules Morse, as big as a horse.
                </p>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
            </div>
            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                    <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                    </svg>
                </div>
                <p class="mb-2 font-bold">Golf Sports</p>
                <p class="text-sm leading-5 text-gray-900">
                    Disrupt inspire and think tank, social entrepreneur but preliminary thinking think tank compelling.
                </p>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
            </div>
            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                    <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                    </svg>
                </div>
                <p class="mb-2 font-bold">Hockey Sports</p>
                <p class="text-sm leading-5 text-gray-900">
                    A business big enough that it could be listed on the NASDAQ goes belly up.
                </p>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
            </div>
            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                    <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                    </svg>
                </div>
                <p class="mb-2 font-bold">Shooting Sports</p>
                <p class="text-sm leading-5 text-gray-900">
                    Lookout flogging bilge rat main sheet bilge water nipper fluke to go on account heave down clap of thunder.
                </p>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
            </div>
            <div class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
                <div class="p-5">
                <div class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                    <svg class="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                    </svg>
                </div>
                <p class="mb-2 font-bold">Martial Arts</p>
                <p class="text-sm leading-5 text-gray-900">
                    Webtwo ipsum orkut reddit meebo skype vimeo jajah spock empressr zimbra, mobly napster.
                </p>
                </div>
                <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
            </div> -->
        </div>
    </div>
</template>

<script>

</script>

<style>

</style>
