<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBranchMainMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch_main_menus', function (Blueprint $table) {
            $table->id();
            $table->uuid('slug');
            $table->tinyInteger('main_header_id');
            $table->string('main_header_name_th');
            $table->string('main_header_name_en')->nullable();
            $table->tinyInteger('division_id');
            $table->tinyInteger('menu_order_id')->default(99);
            $table->string('component_name');
            $table->boolean('status')->default(true);
            $table->boolean('is_active')->default(true);
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
        Schema::dropIfExists('branch_main_menus');
    }
}
