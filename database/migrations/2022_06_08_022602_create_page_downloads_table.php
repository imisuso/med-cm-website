<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePageDownloadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_downloads', function (Blueprint $table) {
            $table->id();
            $table->uuid('slug');
            $table->string('title', 1000);
            $table->string('link', 2000);
            $table->json('other')->nullable();
            $table->smallInteger('order_number')->default(999);
            $table->boolean('status')->default(false);
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
    //     Schema::dropIfExists('page_downloads');
    // }
}
