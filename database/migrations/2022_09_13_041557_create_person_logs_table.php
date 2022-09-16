<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('person_logs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('log_id')->nullable();
            $table->string('slug', 36)->nullable();
            $table->tinyInteger('division_id')->nullable();
            $table->string('sap_id', 20)->nullable();
            $table->string('title_th')->nullable();
            $table->string('title_en')->nullable();
            $table->string('fname_th')->nullable();
            $table->string('fname_en')->nullable();
            $table->string('lname_th')->nullable();
            $table->string('lname_en')->nullable();
            $table->string('rname_full_th')->nullable();
            $table->string('rname_full_en')->nullable();
            $table->string('rname_short_th')->nullable();
            $table->string('rname_short_en')->nullable();
            $table->string('image', 500)->nullable();
            $table->string('type', 100)->nullable();
            $table->tinyInteger('group')->nullable();
            $table->string('position_mgnt')->nullable();
            $table->string('position_division')->nullable();
            $table->tinyInteger('position_academic')->nullable();
            $table->string('reward')->nullable();
            $table->longText('cert')->nullable();
            $table->json('profiles')->nullable();
            $table->boolean('status')->nullable();
            $table->tinyInteger('display_order')->nullable();
            $table->string('user_previous_act')->nullable();
            $table->string('user_last_act')->nullable();
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
        Schema::dropIfExists('person_logs');
    }
};
