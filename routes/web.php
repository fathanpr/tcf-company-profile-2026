<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('lang/{locale}', [PageController::class, 'setLanguage'])->name('lang.switch');

Route::middleware(['web'])->group(function () {
    Route::get('/', [PageController::class, 'home'])->name('home');
});
