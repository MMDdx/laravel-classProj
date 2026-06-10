<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\BookingController;
use App\Models\Tour;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\TourController as AdminTourController;
// This single line loads all of Breeze's authentication routes
require __DIR__.'/auth.php';

// No need for Auth::routes() here

Route::get('/', function () {
    $popularTours = Tour::active()
        ->latest()
        ->take(6)
        ->get();
    return view('welcome', compact('popularTours'));
});

Route::get('/tours', [TourController::class, 'index'])->name('tours.index');
Route::get('/tours/{tour}', [TourController::class, 'show'])->name('tours.show');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // User management
    Route::resource('users', UserController::class)->only(['index', 'destroy']);

    // Tour management
    Route::resource('tours', AdminTourController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');

//    Route::resource('tours', TourController::class);
    Route::resource('bookings', BookingController::class);
    Route::patch('bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
});
