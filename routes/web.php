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
});
