<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('divisions', function (Blueprint $table) {
            $table->smallInteger('display_order')->nullable()->default(999)->after('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
//    public function down(): void
//    {
//        Schema::table('divisions', function (Blueprint $table) {
//            $table->dropColumn('display_order');
//        });
//    }
};
