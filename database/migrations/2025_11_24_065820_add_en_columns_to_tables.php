<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. ตาราง branch_sub_menus (เก็บเนื้อหา Rich Text)
        Schema::table('branch_sub_menus', function (Blueprint $table) {
            // เพิ่มฟิลด์เนื้อหาภาษาอังกฤษ (Nullable เพื่อไม่ให้กระทบข้อมูลเก่า)
            $table->longText('detail_delta_en')->nullable()->after('detail_delta');
            $table->longText('detail_html_en')->nullable()->after('detail_html');
        });

        // 2. ตาราง persons (เก็บข้อมูลบุคลากร)
        Schema::table('persons', function (Blueprint $table) {
            // เพิ่มตำแหน่งบริหาร EN
            $table->string('position_mgnt_en')->nullable()->after('position_mgnt');

            // เพิ่มตำแหน่งในหน่วยงาน EN
            $table->string('position_division_en')->nullable()->after('position_division');

            // เพิ่มรางวัล EN
            $table->string('reward_en')->nullable()->after('reward');

            // เพิ่มใบรับรอง EN (ถ้าเก็บเป็น Text ยาว)
            $table->longText('cert_en')->nullable()->after('cert');

            // เพิ่มโปรไฟล์ EN (กรณีเก็บเป็น JSON หรือ Text ยาว)
            $table->longText('profiles_en')->nullable()->after('profiles');
        });
    }

    public function down(): void
    {
        // คำสั่งลบฟิลด์เมื่อ Rollback
        Schema::table('branch_sub_menus', function (Blueprint $table) {
            $table->dropColumn(['detail_delta_en', 'detail_html_en']);
        });

        Schema::table('persons', function (Blueprint $table) {
            $table->dropColumn([
                'position_mgnt_en',
                'position_division_en',
                'reward_en',
                'cert_en',
                'profiles_en'
            ]);
        });
    }
};
