<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('name_id')->nullable()->after('name');
            $table->string('slug_id')->nullable()->after('slug');
            $table->text('description_id')->nullable()->after('description');
            $table->string('meta_title_id')->nullable()->after('meta_title');
            $table->text('meta_description_id')->nullable()->after('meta_description');
            $table->string('meta_keywords_id')->nullable()->after('meta_keywords');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'name_id',
                'slug_id',
                'description_id',
                'meta_title_id',
                'meta_description_id',
                'meta_keywords_id',
            ]);
        });
    }
};
