<template>
        <body style="overflow: hidden">
            <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                <div class="flex flex-col lg:flex-row justify-between gap-8">
                    <div class="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 underline">{{ $t('เกี่ยวกับเรา') }}</h1>
                        <ul class="font-normal text-base leading-6 text-gray-600 list-disc">
                            <div class="text-lg text-blue-500 font-bold">{{ $t('วิสัยทัศน์') }}</div>
                            <li class="ml-4 mb-2">To be an international leader in internal medicine</li>
                            <div class="text-lg text-blue-500 font-bold">{{ $t('พันธกิจ') }}</div>
                            <li class="ml-4 mb-2">An excellent organization in internal medicine for producing perfect physicians, creating knowledge, and providing services that meet international standards</li>
                            <div class="text-lg text-blue-500 font-bold">{{ $t('คำขวัญ') }}</div>
                            <li class="ml-4">Pride, Passion, Participation and Productivity"</li>
                        </ul>
                    </div>
                    <div class="w-full lg:w-8/12">
                        <img class="w-full h-full" src="../../../asset/images/med_building.jpg" alt="A group of People" />
                    </div>
                </div>

                <div class="flex flex-col justify-between gap-8 pt-12">
                    <div class="w-full flex flex-col justify-center">
                        <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 underline">{{ $t('ประวัติภาควิชา') }}</h1>
                        <div class="inline-block font-normal text-base leading-6 text-gray-600 mb-3 indent-8">
                            The Department of Medicine can be considered to have originated with the introduction of the modern medical curriculum at Siriraj Hospital. From the outset of teaching, the Department of Medicine began offering postgraduate training for physicians who wished to specialize in internal medicine. The subjects within internal medicine were known as "Materia Medica" and "Practice of Medicine". The internal medicine curriculum has been consistently incorporated into the medical training program ever since.
                            Subsequently, several Thai physicians received education and training from abroad and returned to teach internal medicine. When the Thai medical curriculum was upgraded to a degree level program, in collaboration with the Rockefeller Foundation, Professor Dr. William Harvey Perkins assumed the position of Head of the "Medicine Section" (or Department of Medicine) in 1926 (B.E. 2469). In 1930 (B.E. 2473), Professor Phra Aphantharaphathphisan became the next section head.
                            Initially, during the early period of studying internal medicine, there were only a few foreign and Thai medical instructors. However, due to the extensive progress in knowledge across various fields of internal medicine and the need for specialized experts, in 1945 (B.E. 2488), Professor Dr. Prasert Kangsadal, the third Head of the Department of Medicine, initiated the organization of the department into 10 specialized units. In 1969 (B.E. 2512), the status of the section was elevated to a full "Department" and the units were raised to the status of "Divisions" (or subspecialty divisions). The progress and growth of the Department have continued substantially ever since,
                            <div class="inline-block text-gray-300 indent-2" :class="{ 'hidden' : readMore }">
                                increasing the number of these divisions...
                                <button class="px-1 rounded-md text-blue-700 hover:text-blue-400" @click="readMore = !readMore">Read more</button>
                            </div>
                        </div>

                        <div :class="{ 'hidden' : !readMore }">
                            <p class="font-normal text-base leading-6 text-gray-600 mb-3 indent-8">
                                The progress and growth of the Department have continued substantially ever since, leading to an increase in the number of divisions. Furthermore, the original Department of Medicine expanded, separating three former divisions into new, independent departments: the Department of Preventive and Social Medicine, the Department of Psychiatry, and the Department of Dermatology.
                            </p>

                            <div class="flex flex-col lg:flex-row items-center">
                                <!-- <img class="w-96 h-60 shrink-0 px-4" :src="`${baseUrl}/images/doctor-2568481_960_720.jpg`" alt="A group of People" /> -->
                                <img class="w-96 h-60 shrink-0 px-4" src="../../../asset/images/doctor-2568481_960_720.jpg" alt="A group of People" />
                                <p class="mt-2 lg-mt-0 font-normal text-base leading-6 text-gray-600 mb-3 indent-8">
                                    Presently, the Department of Medicine comprises 18 divisions responsible for both lectures and practical training for medical students in their 3rd, 4th, 5th, and 6th years. Due to the increasing demand for internists in the country, the department offers postgraduate training for physicians wishing to become specialists in internal medicine. The residency program was established in 1962 (B.E. 2505), and this educational scope has since expanded to include several other subspecialty training programs, namely: Neurology, Hematology, Dermatology, Cardiology, Respiratory Disease and Tuberculosis, Nephrology, Gastroenterology, Rheumatology, Endocrinology and Metabolism, and Infectious Diseases.
                                    Currently, the Department of Medicine has 141 faculty members who possess extensive knowledge and capabilities in teaching, research, patient care, and administration. In terms of administration, faculty members from the department have been selected to hold many important positions, such as Vice President of Mahidol University, Deputy Director of Siriraj Hospital, Dean of the Faculty of Medicine Siriraj Hospital, Associate Dean, Assistant Dean, members of the Mahidol University Council, and members of the Siriraj Faculty Council, among others. Furthermore, they serve as presidents of various associations, as well as the president and board members of the Royal College of Physicians of Thailand, and even the President of Mahidol University.
                                </p>
                            </div>

                            <!-- <p class="font-normal text-base leading-6 text-gray-600 mb-3 indent-8">
                                ในปัจจุบันภาควิชาอายุรศาสตร์ ประกอบด้วย 18 สาขาวิชา รับผิดชอบการสอนทั้งภาคบรรยาย และภาคปฏิบัติ ให้แก่ นักศึกษาแพทย์ ชั้นปีที่ 3,4,5 และ 6 เนื่องจากความต้องการของอายุรแพทย์ของประเทศได้มีเพิ่มมากขึ้น โดยเปิดการฝึกอบรมระดับหลังปริญญาให้แก่แพทย์ที่มี ความต้องการเป็นแพทย์เฉพาะทางอายุรศาสตร์ โดยเปิดหลักสูตรแพทย์ประจำบ้านขึ้นใน พ.ศ. 2505 ซึ่งได้มีการขยายงานการสอนแพทย์ประจำบ้าน โดยเปิดหลักสูตรการฝึกอบรมแพทย์เฉพาะทางอีกหลายหลักสูตร ได้แก่ สาขาประสาทวิทยา สาขาโลหิตวิทยา สาขาตจวิทยา สาขาหทัยวิทยา สาขาโรคระบบทางเดินหายใจและวัณโรค สาขาวักกะวิทยา สาขาโรคระบบทางเดินอาหาร สาขาโรคข้อและรูมาติสซั่ม สาขาโรคระบบต่อมไร้ท่อ และเมตาบอลิสม และสาขาโรคติดเชื้อในปัจจุบันภาควิชาอายุรศาสตร์ มีอาจารย์ 141 ท่าน อาจารย์ในภาควิชาฯเป็นผู้มีความรู้ ความสามารถ ทั้งในด้านการเรียนการสอน วิจัย บริการผู้ป่วยและด้านบริหาร ทางด้านบริหารนั้น คณาจารย์ในภาควิชาฯ ได้รับเลือกให้ดำรงตำแหน่งสำคัญๆ หลายตำแหน่ง อาทิเช่น รองอธิการบดี มหาวิทยาลัยมหิดล รองผู้อำนวยการโรงพยาบาลศิริราช คณบดีคณะแพทยศาสตร์ศิริราชพยาบาล รองคณบดีคณะแพทยศาสตร์ศิริราชพยาบาล ผู้ช่วยคณบดีคณะแพทยศาสตร์ศิริราชพยาบาล คณะกรรมการ สภาอาจารย์มหาวิทยาลัยมหิดล คณะกรรมการสภาอาจารย์คณะแพทยศาสตร์ศิริราช พยาบาล เป็นต้น รวมทั้งเป็นนายกสมาคมต่าง ๆ ประธานและกรรมการของราชวิทยาลัยอายุรแพทย์แห่งประเทศไทย และอธิการบดีมหาวิทยาลัยมหิดล
                            </p> -->

                            <p class="font-normal text-base leading-6 text-gray-600 mb-3 indent-8">
                                In addition, faculty members of the department have authored textbooks, both in Thai and foreign languages. These include comprehensive internal medicine textbooks collaboratively written by faculty members, as well as specialized subject textbooks co-authored with experts from other institutions. These textbooks are widely recognized and have received awards at both the faculty and university levels.
                                In the area of teaching, the faculty of the Department of Medicine dedicate their abilities and time to diligently mentor medical students, ensuring they graduate as physicians who possess both knowledge, capability, and a strong sense of responsibility toward their duties. As a result of this sacrifice and dedication to their students, several faculty members in the department have been publicly recognized and selected for prestigious awards, such as the Outstanding Teacher Award from the Siriraj Faculty Council, the Chao Phraya Phra Sedet Surendrathibodi Award from the Faculty of Medicine Siriraj Hospital, the Role Model Award from the Mahidol University Faculty Senate, and the Mahidol University Award for the Field of Teaching Excellence (Khwam Pen Khru). These are considered high honors and serve as excellent examples for other faculty members to follow.
                                Academically, faculty members of the Department of Medicine have been appointed to the position of Professor (12 individuals in total), including 4 Level 11 Professors, 6 Level 10 Professors, and 2 Clinical Professors. The department also has 55 Associate Professors and 32 Assistant Professors. Currently, 15 faculty members have received scholarships to further their education and training abroad, who will return to serve as vital assets to the department and the faculty.
                            </p>

                            <p class="font-normal text-base leading-6 text-gray-600 mb-3 indent-8">
                                In the future, regarding the academic achievements of the department’s faculty members, numerous research papers authored by our faculty have been published in hundreds of domestic and international journals. The department has also produced outstanding research work that has received awards from the Faculty of Medicine Siriraj Hospital, Mahidol University, the National Research Council, and the Mahidol B. Braun Award, which is a great source of pride for the Department of Medicine.
                                In terms of patient services, previously, the general wards of the department were scattered across various buildings, which made administration and patient care difficult and inconvenient. When the Faculty received a budget to construct a new 12-story Asadang Building to replace the old one, the Department initiated a plan to consolidate the department office, some division offices, critical care units, and general wards within this single building. Decorations and furnishings were procured sequentially until all floors were fully operational in 1995 (B.E. 2538).
                                Currently, the Asadang Building houses a total of 10 general wards, comprising 5 male wards and 5 female wards, with a total capacity of 196 general patient beds. There are also 4 critical care units: the ICU (Intensive Care Unit), RCU (Respiratory Care Unit), CCU (Coronary Care Unit), and ICCU (Intermediate Cardiac Care Unit). Additionally, the building houses the Chulabhorn Bone Marrow Transplant Center, which opened in 1986 (B.E. 2529), as well as meeting rooms and the department library.
                            </p>

                            <p class="font-normal text-base leading-6 text-gray-600 mb-3 indent-8">
                                In summary, the Department of Medicine has progressed substantially and sequentially since 1926 (B.E. 2469), when Professor Dr. William Harvey Perkins became the first Head of the Department of Medicine. Over the 92 years since then, the department's total of 141 faculty members have dedicated their knowledge, abilities, and time to diligently mentor medical students, ensuring they graduate as good, quality physicians. In terms of patient care services, the department has completely renovated all internal medicine examination rooms for the highest benefit of patients receiving treatment at Siriraj Hospital.
                                The faculty and personnel within the department share a strong commitment to performing their duties to the best of their abilities, in order to contribute benefit and build reputation and prestige for the Department of Medicine, the Faculty of Medicine Siriraj Hospital, Mahidol University.
                            </p>

                            <button class=" w-28 px-1 rounded-md text-blue-700 hover:text-blue-400" @click="readMore = !readMore">Conceal the content</button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
</template>

<script setup>
import { ref } from 'vue';

const readMore = ref(false)

</script>

<style>

</style>
