<?php

namespace Database\Seeders;

use App\Models\BranchSubMenu;
use Illuminate\Database\Seeder;

class BranchSubMenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bsmJSON = '[
            {"sub_header_id":1,  "main_header_id": 1, "menu_order_id": 1, "sub_header_name_th":"ปณิธาน", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":2,  "main_header_id": 1, "menu_order_id": 2, "sub_header_name_th":"วิสัยทัศน์", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":3,  "main_header_id": 1, "menu_order_id": 3, "sub_header_name_th":"พันธกิจ", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":4,  "main_header_id": 1, "menu_order_id": 4, "sub_header_name_th":"วัฒนธรรม/ค่านิยม", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":5,  "main_header_id": 1, "menu_order_id": 5, "sub_header_name_th":"คำขวัญ", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":6,  "main_header_id": 1, "menu_order_id": 6, "sub_header_name_th":"คุณค่าหลัก", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":7,  "main_header_id": 1, "menu_order_id": 7, "sub_header_name_th":"ประวัติความเป็นมา", "status": false, "delta_content": "{ \"ops\": [ { \"attributes\": { \"bold\": true }, \"insert\": \"Default Template\" }, { \"attributes\": { \"header\": 2 }, \"insert\": \"\\\n\" }, { \"insert\": \"\\\n\" }, { \"attributes\": { \"color\": \"#008a00\" }, \"insert\": \"List Style 1\" }, { \"attributes\": { \"list\": \"bullet\" }, \"insert\": \"\\\n\" }, { \"attributes\": { \"color\": \"#e60000\" }, \"insert\": \"List Style 2\" }, { \"attributes\": { \"list\": \"bullet\" }, \"insert\": \"\\\n\" }, { \"insert\": \"\\\n\" }, { \"attributes\": { \"color\": \"#008a00\" }, \"insert\": \"Number Style 1\" }, { \"attributes\": { \"list\": \"ordered\" }, \"insert\": \"\\\n\" }, { \"attributes\": { \"color\": \"#e60000\" }, \"insert\": \"Number Style 2\" }, { \"attributes\": { \"list\": \"ordered\" }, \"insert\": \"\\\n\" }, { \"insert\": \"\\\n\" } ] }", "html_content": "<h2><strong>Default Template</strong></h2><p><br></p><ul><li><span style=\"color: rgb(0, 138, 0);\">List Style 1</span></li><li><span style=\"color: rgb(230, 0, 0);\">List Style 2</span></li></ul><p><br></p><ol><li><span style=\"color: rgb(0, 138, 0);\">Number Style 1</span></li><li><span style=\"color: rgb(230, 0, 0);\">Number Style 2</span></li></ol><p><br></p>"},          
            {"sub_header_id":8,  "main_header_id": 1, "menu_order_id": 8, "sub_header_name_th":"หัวหน้าสาขาจากอดีตถึงปัจจุบัน", "status": false, "delta_content": "{ \"ops\": [ { \"attributes\": { \"bold\": true }, \"insert\": \"Default Template\" }, { \"attributes\": { \"header\": 2 }, \"insert\": \"\\\n\" }, { \"insert\": \"\\\n\" }, { \"attributes\": { \"color\": \"#008a00\" }, \"insert\": \"List Style 1\" }, { \"attributes\": { \"list\": \"bullet\" }, \"insert\": \"\\\n\" }, { \"attributes\": { \"color\": \"#e60000\" }, \"insert\": \"List Style 2\" }, { \"attributes\": { \"list\": \"bullet\" }, \"insert\": \"\\\n\" }, { \"insert\": \"\\\n\" }, { \"attributes\": { \"color\": \"#008a00\" }, \"insert\": \"Number Style 1\" }, { \"attributes\": { \"list\": \"ordered\" }, \"insert\": \"\\\n\" }, { \"attributes\": { \"color\": \"#e60000\" }, \"insert\": \"Number Style 2\" }, { \"attributes\": { \"list\": \"ordered\" }, \"insert\": \"\\\n\" }, { \"insert\": \"\\\n\" } ] }", "html_content": "<h2><strong>Default Template</strong></h2><p><br></p><ul><li><span style=\"color: rgb(0, 138, 0);\">List Style 1</span></li><li><span style=\"color: rgb(230, 0, 0);\">List Style 2</span></li></ul><p><br></p><ol><li><span style=\"color: rgb(0, 138, 0);\">Number Style 1</span></li><li><span style=\"color: rgb(230, 0, 0);\">Number Style 2</span></li></ol><p><br></p>"},
            {"sub_header_id":9,  "main_header_id": 1, "menu_order_id": 9, "sub_header_name_th":"เกียรติยศและความภาคภูมิใจ", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":1,  "main_header_id": 2, "menu_order_id": 1, "sub_header_name_th":"ข้อมูลทั่วไป", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":2,  "main_header_id": 2, "menu_order_id": 2, "sub_header_name_th":"หลักสูตร", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":3,  "main_header_id": 2, "menu_order_id": 3, "sub_header_name_th":"รายนามคณะกรรมการ", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":4,  "main_header_id": 2, "menu_order_id": 4, "sub_header_name_th":"เกณฑ์การคัดเลือก", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":5,  "main_header_id": 2, "menu_order_id": 5, "sub_header_name_th":"ประกาศรับสมัคร", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":1,  "main_header_id": 3, "menu_order_id": 1, "sub_header_name_th":"งานบริการของสาขา", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":1,  "main_header_id": 4, "menu_order_id": 1, "sub_header_name_th":"งานวิจัย", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":1,  "main_header_id": 5, "menu_order_id": 1, "sub_header_name_th":"งานบริการวิชาการ", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":1,  "main_header_id": 9, "menu_order_id": 1, "sub_header_name_th":"ติดต่อสอบถาม", "status": false, "delta_content": "{\"ops\":[{\"insert\":\"Template\"}]}", "html_content": "<p>Template</p>" },
            {"sub_header_id":1,  "main_header_id": 10, "menu_order_id": 1, "sub_header_name_th":"ลิ้งก์ต่างๆที่เกี่ยวข้อง", "status": false, "delta_content": "[{\"name\":\"Template\",\"url\":\"#\"}]", "html_content": "Template Link" }
        ]';

        $bsms = json_decode($bsmJSON, true);

        for ($i=1; $i<=18; $i++) {
            foreach ($bsms as $bsm) {
                BranchSubMenu::create([
                    'main_header_id' => $bsm['main_header_id'],
                    'sub_header_id' => $bsm['sub_header_id'],
                    'sub_header_name_th' => $bsm['sub_header_name_th'],
                    'menu_order_id' => $bsm['menu_order_id'],
                    'division_id' => $i,
                    'status' => $bsm['status'],
                    'detail_delta' => $bsm['delta_content'],
                    'detail_html' => $bsm['html_content']
                ]);
            }
        }
    }
}
