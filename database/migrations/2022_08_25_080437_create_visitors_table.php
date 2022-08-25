<?php

use App\Models\Webpage;
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
        Schema::create('webpages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('label')->nullable();
            $table->timestamps();
        });

        $webpage = new Webpage();
        $webpage->name = 'page_index';
        $webpage->label = 'หน้าแรกที่เข้าจาก domain name';
        $webpage->save();

        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->string('page_name');
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
        Schema::dropIfExists('visitors');
        Schema::dropIfExists('webpages');
    }
};
