<?php

use App\Models\Agreement;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agreements', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date_effected')->index();
            $table->string('title');
            $table->longText('detail_delta');
            $table->longText('detail_html');
            //$table->text('contents');
            $table->timestamps();
        });

        $agreement = new Agreement();
        $agreement->date_effected = now();
        $agreement->title = 'ข้อตกลงและเงื่อนไขการใช้งานเว็บไชต์ภาควิชาอายุรศาสตร์';
        $agreement->detail_delta = '[]';
        $agreement->detail_html = '<p><strong class="ql-size-large" style="color: rgb(230, 0, 0);">กรุณาอ่านข้อกำหนดและเงื่อนไขต่างๆ ดังต่อไปนี้อย่างละเอียด โดยในการเข้าถึงเว็บไซต์ เพื่อใช้งานใดๆ ถือว่าท่านตกลงที่จะผูกพันตามข้อกำหนดและเงื่อนไขการใช้งานนี้ </strong></p><h3><br></h3><p><span class="ql-size-large" style="color: rgb(0, 102, 204);">ข้อมูลต่างๆ บนเว็บไซต์ของภาควิชาอายุรศาสตร์</span></p><p><br></p><ul><li>หน่วยเวชสารสนเทศได้ดูแลและจัดทำเว็บไซต์ขึ้นตามความเหมาะสมและเห็นชอบจากทางภาควิชาฯ ซึ่งผู้ใช้งานต้องรับผิดชอบต่อ ความเหมาะสมของเนื้อหาในส่วนใดส่วนหนึ่งหรือหน้าใดหน้าหนึ่งของเว็บไซต์นี้ที่ทางผู้ใช้งานได้เป็นผู้ดำเนินการหรือทำการเผยแพร่ข้อมูลนั้นๆ เช่น ประกาศ หรือการลงรูปภาพต่างๆ ที่มีความเกี่ยวข้องกับข้อมูลส่วนบุคคลของผู้อื่นที่ไม่ได้รับอนุญาตให้เผยแพร่เป็นต้น &nbsp;</li></ul><p><br></p><ul><li>การใช้งานใดๆ ในส่วนของการเข้าจัดการเนื้อหาบนเว็บไซต์ของภาควิชาอายุรศาสตร์ จะมีการเก็บบันทึกการใช้งานตลอดเวลาเพื่อใช้เป็นข้อมูลอ้างอิงในการตรวจสอบเนื้อหาที่อาจเกิดปัญหาใดๆในภายหลัง</li></ul><p><br></p><ul><li><strong>หน่วยเวชสารสนเทศขอสงวนสิทธิ์ในการปรับปรุง เปลี่ยนแปลง สร้าง รวมถึง ลบข้อมูลบางส่วนของเว็บไซต์โดยไม่แจ้งให้ทราบล่วงหน้า เพื่อความเหมาะสมและทันสมัยของข้อมูล</strong></li></ul><p><br></p>';
        $agreement->save();

        Schema::create('agreement_user', function (Blueprint $table) {
            $table->primary(['agreement_id', 'user_id']);
            $table->unsignedBigInteger('agreement_id')->constrained('agreements')->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->constrained('users')->onDelete('cascade');
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
        Schema::dropIfExists('agreement_user');
        Schema::dropIfExists('agreements');
    }
};
