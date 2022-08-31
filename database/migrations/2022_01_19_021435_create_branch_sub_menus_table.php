<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBranchSubMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch_sub_menus', function (Blueprint $table) {
            $table->id();
            $table->uuid('slug');
            $table->tinyInteger('main_header_id');
            $table->tinyInteger('sub_header_id');
            $table->string('sub_header_name_th');
            $table->string('sub_header_name_en')->nullable();
            $table->tinyInteger('division_id');
            $table->tinyInteger('menu_order_id')->default(99);
            $table->boolean('status')->default(true);
            $table->longText('detail_delta');
            $table->longText('detail_html');
            $table->json('attach_files')->nullable();
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
    //     Schema::dropIfExists('branch_sub_menus');
    // }
}
