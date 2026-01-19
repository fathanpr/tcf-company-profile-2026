<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('lang/{locale}', [PageController::class, 'setLanguage'])->name('lang.switch');

Route::middleware(['web'])->group(function () {
    Route::get('/', [PageController::class, 'home'])->name('home');

    // About Us Sub-pages
    Route::get('/about/vision-mission', [PageController::class, 'visionMission'])->name('about.vision-mission');
    Route::get('/about/organization', [PageController::class, 'organization'])->name('about.organization');
    Route::get('/about/facilities', [PageController::class, 'facilities'])->name('about.facilities');
    Route::get('/about/customers', [PageController::class, 'customers'])->name('about.customers');

    // Capabilities Sub-pages
    Route::get('/capabilities/sales-growth', [PageController::class, 'salesGrowth'])->name('capabilities.sales-growth');
    Route::get('/capabilities/production-quality', [PageController::class, 'productionQuality'])->name('capabilities.production-quality');
    Route::get('/capabilities/loading-capacity', [PageController::class, 'loadingCapacity'])->name('capabilities.loading-capacity');

    // Products
    Route::get('/products', [PageController::class, 'products'])->name('products.index');
    Route::get('/products/{id}', [PageController::class, 'productDetail'])->name('products.show');

    // News
    Route::get('/news', [PageController::class, 'news'])->name('news.index');
    Route::get('/news/{slug}', [PageController::class, 'newsDetail'])->name('news.show');
});
