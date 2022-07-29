<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('persons', function (Blueprint $table) {
            $table->id();
            $table->uuid('slug');
            $table->tinyInteger('division_id');
            $table->string('sap_id', 20)->nullable();
            $table->string('title_th');
            $table->string('title_en');
            $table->string('fname_th');
            $table->string('fname_en')->nullable();
            $table->string('lname_th');
            $table->string('lname_en')->nullable();
            $table->string('rname_full_th')->nullable();
            $table->string('rname_full_en')->nullable();
            $table->string('rname_short_th')->nullable();
            $table->string('rname_short_en')->nullable();
            $table->string('image', 500)->nullable();
            $table->string('type', 100);
            $table->string('position_mgnt')->nullable();
            $table->string('position_division')->nullable();
            $table->tinyInteger('position_academic')->nullable()->default(0);
            $table->string('reward')->nullable();
            $table->longText('cert')->nullable();
            $table->json('profiles')->nullable();
            $table->boolean('status')->default(false);
            $table->tinyInteger('display_order')->default(99);
            $table->string('user_previous_act');
            $table->string('user_last_act');
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
    //     Schema::dropIfExists('persons');
    // }
}
