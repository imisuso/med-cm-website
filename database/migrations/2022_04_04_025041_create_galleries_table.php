<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->uuid('slug');
            $table->string('cover', 1000);
            $table->string('desc', 2000)->default('รายละเอียดเกี่ยวกับรูปกิจกรรมของงาน');
            $table->dateTimeTz('event_date');
            $table->boolean('status')->default(false);
            $table->json('other')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    // public function down()
    // {
    //     Schema::dropIfExists('galleries');
    // }
}
