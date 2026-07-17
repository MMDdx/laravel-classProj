<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\BookingController;
use App\Models\Tour;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\TourController as AdminTourController;

require __DIR__.'/auth.php';

Route::get('/', function () {
    $popularTours = Tour::active()
        ->latest()
        ->take(6)
        ->get();
    return Inertia::render('Welcome', [
        'popularTours' => $popularTours,
        'canBook' => auth()->check(),
        'user' => auth()->user(),
    ]);
});

Route::get('/tours', [TourController::class, 'index'])->name('tours.index');
Route::get('/tours/{tours}', [TourController::class, 'show'])->name('tours.show');
Route::post('/tours/{tours}/comments', [App\Http\Controllers\CommentController::class, 'store'])->name('comments.store');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('users', UserController::class)->only(['index', 'destroy']);
    Route::resource('tours', AdminTourController::class);
    Route::resource('bookings', \App\Http\Controllers\Admin\BookingController::class)->except(['create', 'store', 'edit']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/password', [ProfileController::class, 'updatePassword'])->name('password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('bookings', BookingController::class);
    Route::patch('bookings/{bookings}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
});
