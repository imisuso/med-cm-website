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
        <p class="text-left mb-8">ผลลัพธ์ของหลักสูตรการฝึกอบรมมีแนวคิดมาจากคุณลักษณะหลักของอายุรแพทย์ที่พึงประสงค์ในปัจจุบัน สอดคล้องกับความต้องการของสังคม สอดคล้องกับระบบสุขภาพ และต่อยอดคุณลักษณะของแพทยศาสตรบัณฑิต ดังนั้นแพทย์ประจำบ้านที่จบการฝึกอบรมต้องสามารถปฏิบัติงานได้ด้วยตนเองตามสมรรถนะหลักทั้ง 6 ด้าน ดังนี้</p> 
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
                        <p class="mb-2 font-bold">การดูแลรักษาผู้ป่วย (Patient Care)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>มีทักษะในการซักประวัติ ตรวจร่างกายผู้ป่วย ทำหัตถการ และการรวบรวมข้อมูล สำหรับนำมาคิดวิเคราะห์อย่างเป็นเหตุเป็นผลเพื่อนำไปสู่การตัดสินใจให้การดูแลรักษาผู้ป่วยอย่างเหมาะสม</li>
                            <li>วินิจฉัยบำบัดรักษาภาวะผิดปกติทางอายุรศาสตร์ที่พบโดยทั่วไปในประเทศไทยได้อย่างถูกต้องและเหมาะสม</li>
                            <li>บันทึกรายงานผู้ป่วยได้อย่างสมบูรณ์และสม่ำเสมอ</li>
                            <li>ป้องกันโรคและสร้างเสริมสุขภาพ</li>
                            <li>ดูแลผู้ป่วยโดยยึดผู้ป่วยเป็นศูนย์กลาง คำนึงถึงสิทธิของผู้ป่วย และดูแลแบบองค์รวม</li>
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
                        <p class="mb-2 font-bold">ความรู้ ความเชี่ยวชาญ และความสามารถในการนำไปใช้แก้ปัญหาของผู้ป่วยและสังคมรอบด้าน (Medical knowledge and Skills)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>เข้าใจวิทยาศาสตร์การแพทย์พื้นฐานของร่างกายและจิตใจ</li>
                            <li>มีความรู้ความสามารถในวิชาชีพ และเชี่ยวชาญในสาขาอายุรศาสตร์</li>
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
                        <p class="mb-2 font-bold">การพัฒนาตนเองและการเรียนรู้จากการปฏิบัติ (Practice-based Learning and Improvement)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>ดำเนินการวิจัยทางการแพทย์และสาธารณสุขได้</li>
                            <li>วิพากษ์บทความและงานวิจัยทางการแพทย์</li>
                            <li>เรียนรู้และเพิ่มประสบการณ์ได้ด้วยตนเองจากการปฏิบัติ</li>
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
                        <p class="mb-2 font-bold">ทักษะปฏิสัมพันธ์และการสื่อสาร (Interpersonal and Communication Skills)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>นำเสนอข้อมูลผู้ป่วย และอภิปรายปัญหาอย่างมีประสิทธิภาพ</li>
                            <li>ถ่ายทอดความรู้และทักษะ ให้แพทย์ นักศึกษาแพทย์ และบุคลากรทางการแพทย์</li>
                            <li>สื่อสารให้ข้อมูลแก่ญาติ และผู้ป่วย ได้อย่างถูกต้องและมีประสิทธิภาพ โดยมีเมตตา เคารพการตัดสินใจและศักดิ์ศรีของความเป็นมนุษย์</li>
                            <li>มีมนุษยสัมพันธ์ที่ดี ทำงานกับผู้ร่วมงานทุกระดับอย่างมีประสิทธิภาพ</li>
                            <li>เป็นที่ปรึกษาและให้คำแนะนำแก่แพทย์และบุคคลากรอื่น โดยเฉพาะทางอายุรศาสตร์</li>
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
                        <p class="mb-2 font-bold">ความเป็นมืออาชีพ (Professionalism)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>มีคุณธรรม จริยธรรม และเจตคติอันดีต่อผู้ป่วย ญาติ ผู้ร่วมงาน เพื่อนร่วมวิชาชีพและชุมชน</li>
                            <li>มีความสนใจใฝ่รู้ และสามารถพัฒนาไปสู่ความเป็นผู้เรียนรู้ต่อเนื่องตลอดชีวิต (Continuous Professional Development)</li>
                            <li>มีความรับผิดชอบต่องานที่ได้รับมอบหมาย</li>
                            <li>คำนึงถึงผลประโยชน์ส่วนรวม</li>
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
                        <p class="mb-2 font-bold">การปฏิบัติงานให้เข้ากับระบบ (System-based Practice)</p>
                    </div>
                    <div class="px-10">
                        <ul class=" list-outside list-disc text-sm leading-5 text-gray-900">
                            <li>มีความรู้เกี่ยวกับระบบสุขภาพของประเทศ</li>
                            <li>คำนึงถึงความปลอดภัยของผู้ป่วย (Patient safety) เป็นสำคัญ</li>
                            <li>การใช้ยาอย่างสมเหตุผล (Rational drug use)</li>
                            <li>มีความรู้และมีส่วนร่วมในระบบพัฒนาคุณภาพการดูแลรักษาผู้ป่วย</li>
                            <li>ใช้ทรัพยากรสุขภาพอย่างเหมาะสม (Cost Consciousness Medicine) และสามารถปรับเปลี่ยนการดูแลรักษาผู้ป่วยให้เข้ากับบริบทของการบริการสาธารณสุขได้ตามมาตรฐานวิชาชีพ</li>
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