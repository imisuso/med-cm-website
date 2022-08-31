<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDivisionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('divisions', function (Blueprint $table) {
            $table->id();
            $table->uuid('slug');
            $table->tinyInteger('division_id');
            $table->string('type', 5);
            $table->string('name_th', 256);
            $table->string('name_en', 256)->nullable();
            $table->string('image', 500)->nullable()->default('');
            $table->string('user_previous_act', 256)->nullable();
            $table->string('user_last_act', 256);
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
    //     Schema::dropIfExists('divisions');
    // }
}
