<?php

namespace Database\Seeders;

use App\Models\Ability;
use App\Models\Role;
use Illuminate\Database\Seeder;

class AbilityRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $abilities = [
            'goto_admin_panel', // สามารถ login เข้ามาที่ หน้า Admin ได้
            
            // กลุ่มการเห็นข้อมูลต่างๆ
            'view_all_content',             // เห็นได้ทุก content
            'view_division_content',   // จะเห็นได้แต่ content ของสาขาตัวเองเท่านั้น
            'view_owner_content',      // จะเห็นได้แต่ content ของตัวเองเท่านั้น

            'manage_branch_main_menu', // จัดการเพิ่ม ลด เมนูหลักในการเพิ่ม content ของสาขา
            'manage_branch_sub_menu', // จัดการเพิ่ม ลด เมนูย่อยของเมนูต่างๆในการเพิ่ม content ของสาขา
            
            'manage_divisions',     // จัดการสาขา หรือ หน่วยงานต่างๆ  create, update, delete
            
            'manage_person',        // จัดการบุคคลากร create, update, delete

            // จัดการเมนูหลักทั้งหมดของสาขา enable, disable
            // เมนูหลัก ได้แก่
            // เกี่ยวกับสาขา, อาจารย์และแพทย์ประจำสาขา, งานวิจัย, งานการเรียนการสอน, งานบริการของสาขาวิชา, หลักสูตรฝึกอบรมแพทย์ประจำบ้านต่อยอด, ติดต่อสอบถาม

            // จัดการเมนูย่อยในเมนูหลักของสาขา (เกี่ยวกับสาขา) enable, disable, preview, update
            // จัดการเนื้อหาของเมนูหลักต่างๆของสาขา update
            'manage_division_content',

            // กลุ่มของเรื่องการจัดการข่าวประกาศ
            'manage_announce', // จัดการข่าวประกาศ create, update, delete,
            'publish_unpublish_announce', // เผยแพร่ ยกเลิกเผยแพร่ ข่าวประกาศ
            'pin_unpin_announce',  // จัดการเรื่องการปักหมุด ยกเลิกปักหมุด ข่าวประกาศ
            
            'manage_posters', // จัดการ poster ต่างๆ ที่จะแสดงผลที่หน้าแรกของ website

            'manage_users', // จัดการผู้ใช้งานระบบ

            'manage_galleries', // จัดการ gallery และรูปต่างๆใน gallery ที่จะแสดงผลที่หน้าแรกของ website

            'manage_download', // จัดการในส่วนของ download ที่จะแสดงผลที่หน้าแรกของ website

            'manage_ability_role', // จัดการสิทธิ์การใช้งานระบบ

            'manage_log', // จัดการ log

            'view_log', // ดู log เท่านั้น

            'manage_knowledge_people' // *****  จัดการในส่วนของ ความรู้สำหรับประชาชน ที่จะแสดงผลที่หน้าแรกของ website (ยังไม่ได้ทำ เอาไว้ก่อน)
        ];

        foreach ($abilities as $ability) {
            Ability::create(['name' => $ability]);
        }
        
        $roles = [
            'super_admin',
            'general_admin',
            'division_admin',
            'user'
        ];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $super_admin = Role::whereName('super_admin')->first();
        foreach ($abilities as $ability) {
            if ($ability === "view_division_content" ||
                $ability === "view_owner_content") {
                continue;
            }
            $super_admin->allowTo($ability);
        }

        $general_admin = Role::whereName('general_admin')->first();
        foreach ($abilities as $ability) {
            if ($ability === "view_division_content" ||
                $ability === "view_owner_content" ||
                $ability === "manage_divisions" ||
                $ability === "manage_users" ||
                $ability === "manage_branch_main_menu" ||
                $ability === "manage_ability_role" ||
                $ability === "manage_log") {
                continue;
            }
            $general_admin->allowTo($ability);
        }

        $division_admin = Role::whereName('division_admin')->first();
        foreach ($abilities as $ability) {
            if ($ability === "view_all_content" ||
                $ability === "manage_divisions" ||
                $ability === "view_owner_content" ||
                $ability === "manage_users" ||
                $ability === "pin_unpin_announce" ||
                $ability === "manage_branch_main_menu" ||
                $ability === "manage_branch_sub_menu" ||
                $ability === "manage_posters" ||
                $ability === "manage_galleries" ||
                $ability === "manage_download" ||
                $ability === "manage_knowledge_people" ||
                $ability === "manage_ability_role" ||
                $ability === "manage_log" ||
                $ability === "view_log") {
                continue;
            }
            $division_admin->allowTo($ability);
        }

        $user = Role::whereName('user')->first();
        $user->allowTo('goto_admin_panel');
        $user->allowTo('view_owner_content');
        $user->allowTo('manage_announce');
        // $user->allowTo('publish_unpublish_announce');
    }
}
