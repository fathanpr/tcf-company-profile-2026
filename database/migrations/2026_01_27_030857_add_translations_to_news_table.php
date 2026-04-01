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
        Schema::table('news', function (Blueprint $table) {
            $table->string('title_id')->nullable()->after('title');
            $table->string('slug_id')->nullable()->after('slug');
            $table->text('content_id')->nullable()->after('content');
            $table->text('excerpt_id')->nullable()->after('excerpt');
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
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn([
                'title_id',
                'slug_id',
                'content_id',
                'excerpt_id',
                'meta_title_id',
                'meta_description_id',
                'meta_keywords_id',
            ]);
        });
    }
};
