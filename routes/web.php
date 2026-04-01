<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\ActivityLogController;

// Redirect root to default locale
Route::get('/', function () {
    return redirect('/en');
});

Route::prefix('{locale}')
    ->where(['locale' => 'en|id'])
    ->middleware([\App\Http\Middleware\SetLocale::class])
    ->group(function () {
        // Public Routes
        Route::get('/', [PageController::class, 'home'])->name('home');
        Route::get('/about/vision-mission', fn() => Inertia::render('About/VisionMission'))->name('about.vision-mission');
        Route::get('/about/organization', fn() => Inertia::render('About/Organization'))->name('about.organization');
        Route::get('/about/facilities', fn() => Inertia::render('About/Facilities'))->name('about.facilities');
        Route::get('/about/customers', [PageController::class, 'customers'])->name('about.customers');

        Route::get('/capabilities/sales-growth', fn() => Inertia::render('Capabilities/SalesGrowth'))->name('capabilities.sales-growth');
        Route::get('/capabilities/production-quality', fn() => Inertia::render('Capabilities/ProductionQuality'))->name('capabilities.production-quality');
        Route::get('/capabilities/loading-capacity', fn() => Inertia::render('Capabilities/LoadingCapacity'))->name('capabilities.loading-capacity');

        Route::get('/products', [PageController::class, 'products'])->name('products.index');
        Route::get('/products/{slug}', [PageController::class, 'productDetail'])->name('products.detail');

        Route::get('/news', [PageController::class, 'news'])->name('news.index');
        Route::get('/news/{slug}', [PageController::class, 'newsDetail'])->name('news.detail');
        Route::get('/gallery', [PageController::class, 'gallery'])->name('gallery.index');
    });

// Admin/Auth routes (default locale: en, no locale segment in URL)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        app()->setLocale('en');
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Management Group (no locale in URL)
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('roles', RoleController::class);
        Route::resource('news', NewsController::class);
        Route::resource('products', ProductController::class);
        Route::resource('customers', CustomerController::class);
        Route::get('galleries/category/{category}/edit', [GalleryController::class, 'editByCategory'])->name('galleries.category.edit');
        Route::put('galleries/category/{category}', [GalleryController::class, 'updateByCategory'])->name('galleries.category.update');
        Route::resource('galleries', GalleryController::class);
        Route::get('activity-logs', [ActivityLogController::class, 'index'])->name('activity-logs.index');

        // API Documentation (Superuser only)
        Route::get('api-docs', [\App\Http\Controllers\Admin\ApiDocsController::class, 'index'])
            ->name('api-docs.index')
            ->middleware('can:view api-docs');
    });
});

require __DIR__ . '/auth.php';
