<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTraceLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trace_logs', function (Blueprint $table) {
            $table->id();
            $table->uuid('slug');
            $table->string('user', 20);  // sap_id
            $table->string('section', 256);   // ส่วนงานด้านไหนที่เก็บ log
            $table->string('action', 256);  // ทำอะไรกับงานนั้น เช่น สร้าง อ่าน แก้ไข ลบ (CRUD)
            $table->string('type', 256); // ประเภทของการเก็บ log เช่น security, pdpa, infomation, อื่นๆ
            $table->string('details', 2000); // รายละเอียด
            $table->json('other')->nullable();  // เอาไว้เก็บอย่างอื่น เมื่อจำเป็น
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trace_logs');
    }
}
