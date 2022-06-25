<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $divisionJSON = '[
            {"division_id": 1, "type": "b", "name_th": "การบริบาลผู้ป่วยนอก", "name_en": "Ambulatory Medicine"},
            {"division_id": 2, "type": "b", "name_th": "ความดันโลหิตสูง", "name_en": "Hypertension"},
            {"division_id": 3, "type": "b", "name_th": "อายุรศาสตร์มะเร็งวิทยา", "name_en": "Medical Oncology"},
            {"division_id": 4, "type": "b", "name_th": "ต่อมไร้ท่อและเมตะบอลิสม", "name_en": "Endocrinology and Metabolism"},
            {"division_id": 5, "type": "b", "name_th": "โรคติดเชื้อและอายุรศาสตร์เขตร้อน", "name_en": "Infectious Diseases and Tropical Medicine"},
            {"division_id": 6, "type": "b", "name_th": "ประสาทวิทยา", "name_en": "Neurology"},
            {"division_id": 7, "type": "b", "name_th": "โภชนาการคลินิก", "name_en": "Nutrition"},
            {"division_id": 8, "type": "b", "name_th": "โรคข้อและรูมาติสซั่ม", "name_en": "Rheumatology"},
            {"division_id": 9, "type": "b", "name_th": "โรคภูมิแพ้และภูมิคุ้มกัน", "name_en": "Allergy and Clinical Immunology"},
            {"division_id": 10, "type": "b", "name_th": "โรคระบบการหายใจและวัณโรค", "name_en": "Respiratory Disease and Tuberculosis"},
            {"division_id": 11, "type": "b", "name_th": "โรคระบบทางเดินอาหาร", "name_en": "Gastroenterology"},
            {"division_id": 12, "type": "b", "name_th": "โลหิตวิทยา", "name_en": "Hematology"},
            {"division_id": 13, "type": "b", "name_th": "วักกะวิทยา", "name_en": "Nephrology"},
            {"division_id": 14, "type": "b", "name_th": "เวชบำบัดวิกฤต", "name_en": "Critical Care"},
            {"division_id": 15, "type": "b", "name_th": "เวชพันธุศาสตร์", "name_en": "Medical Genetics"},
            {"division_id": 16, "type": "b", "name_th": "หทัยวิทยา", "name_en": "Cardiology"},
            {"division_id": 17, "type": "b", "name_th": "อายุรศาสตร์ปัจฉิมวัย", "name_en": "Geriatric Medicine"},
            {"division_id": 18, "type": "b", "name_th": "อายุรศาสตร์ทั่วไป", "name_en": "General Medicine"},
            {"division_id": 19, "type": "u", "name_th": "หัวหน้าสำนักงานภาควิชาอายุรศาสตร์", "name_en": ""},          
            {"division_id": 20, "type": "u", "name_th": "การศึกษาระดับแพทยศาสตรบัณฑิต", "name_en": ""},
            {"division_id": 21, "type": "u", "name_th": "การศึกษาระดับหลังปริญญา", "name_en": ""},
            {"division_id": 22, "type": "u", "name_th": "วิจัยและวิชาการ", "name_en": ""},
            {"division_id": 23, "type": "u", "name_th": "บริการและพัฒนาคุณภาพ", "name_en": ""},
            {"division_id": 24, "type": "u", "name_th": "บุคคลและการจัดการความรู้", "name_en": ""},
            {"division_id": 25, "type": "u", "name_th": "เวชระเบียน", "name_en": ""},
            {"division_id": 26, "type": "u", "name_th": "เวชสารสนเทศ", "name_en": "Infomation Technology"},
            {"division_id": 27, "type": "u", "name_th": "นโยบายและแผน", "name_en": ""},
            {"division_id": 28, "type": "u", "name_th": "งบประมาณ พัสดุและการเงิน", "name_en": ""},
            {"division_id": 29, "type": "u", "name_th": "วิเทศสัมพันธ์", "name_en": ""},
            {"division_id": 30, "type": "u", "name_th": "บริหารสำนักงาน", "name_en": ""}
        ]';

        $divisions = json_decode($divisionJSON, true);

        foreach ($divisions as $division) {
            Division::create([
                'division_id' => $division['division_id'],
                'type' => $division['type'],
                'name_th' => $division['name_th'],
                'name_en' => $division['name_en'],
                'user_previous_act' => 'seeder',
                'user_last_act' => 'seeder',
            ]);
        }
    }
}
