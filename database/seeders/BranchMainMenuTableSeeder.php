<?php

namespace Database\Seeders;

use App\Models\BranchMainMenu;
use Illuminate\Database\Seeder;

class BranchMainMenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bmmJSON = '[
            { "main_header_id": 1, "main_header_name_th": "เกี่ยวกับสาขา", "menu_order_id": 1, "component_name": "BtAbout", "status": false, "isActive": true},
            { "main_header_id": 2, "main_header_name_th": "งานการเรียนการสอน", "menu_order_id": 2, "component_name": "BtEdu", "status": false, "isActive": true},
            { "main_header_id": 3, "main_header_name_th": "งานบริการของสาขา", "menu_order_id": 3, "component_name": "BtBranchService", "status": false, "isActive": true},
            { "main_header_id": 4, "main_header_name_th": "งานวิจัย", "menu_order_id": 4, "component_name": "BtResearch", "status": false, "isActive": true},
            { "main_header_id": 5, "main_header_name_th": "งานบริการวิชาการ", "menu_order_id": 5, "component_name": "BtAcademicService", "status": false, "isActive": true},
            { "main_header_id": 6, "main_header_name_th": "อาจารย์ประจำสาขา", "menu_order_id": 6, "component_name": "BtProfessor", "status": false, "isActive": true},
            { "main_header_id": 7, "main_header_name_th": "แพทย์ประจำสาขา", "menu_order_id": 7, "component_name": "BtDoctor", "status": false, "isActive": true},
            { "main_header_id": 8, "main_header_name_th": "เจ้าหน้าที่ประจำสาขา", "menu_order_id": 8, "component_name": "BtOfficer", "status": false, "isActive": true},
            { "main_header_id": 9, "main_header_name_th": "ติดต่อสอบถาม", "menu_order_id": 9, "component_name": "BtContact", "status": false, "isActive": true},
            { "main_header_id": 10, "main_header_name_th": "ลิงค์ที่เกี่ยวข้อง", "menu_order_id": 10, "component_name": "BtLink", "status": false, "isActive": true}
        ]';

        $bmms = json_decode($bmmJSON, true);

        for ($i=1; $i<=18; $i++) {
            foreach ($bmms as $bmm) {
                BranchMainMenu::create([
                    'main_header_id' => $bmm['main_header_id'],
                    'main_header_name_th' => $bmm['main_header_name_th'],
                    'menu_order_id' => $bmm['menu_order_id'],
                    'component_name' => $bmm['component_name'],
                    'division_id' => $i,
                    'status' => $bmm['status'],
                    'is_active' => $bmm['isActive']
                ]);
            }
        }
    }
}
