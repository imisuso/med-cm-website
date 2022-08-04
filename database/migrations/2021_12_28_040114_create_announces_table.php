<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnouncesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('announces', function (Blueprint $table) {
            $table->id();
            $table->uuid('slug');
            $table->string('topic', 1000);
            $table->longText('detail_delta');
            $table->longText('detail_html');
            $table->json('attach_files')->nullable();
            $table->dateTime('expire_date');
            $table->tinyInteger('type');
            $table->string('user_sap_id');
            $table->tinyInteger('division_id');
            $table->boolean('publish_status')->default(false);
            $table->dateTime('publish_date')->nullable();
            $table->boolean('pinned')->default(false);
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
    //     Schema::dropIfExists('announces');
    // }
}
