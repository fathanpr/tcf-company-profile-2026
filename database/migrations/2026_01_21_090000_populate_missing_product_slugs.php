<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Product;
use Illuminate\Support\Str;

return new class extends Migration {
    /**
     * Run the migrations.
     * Generate by Antigravity
     */
    public function up(): void
    {
        $products = Product::whereNull('slug')->orWhere('slug', '')->get();
        foreach ($products as $product) {
            $product->slug = Product::generateUniqueSlug($product->name);
            $product->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need to reverse
    }
};
