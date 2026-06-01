<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TourController;
use App\Http\Controllers\BookingController;

// Public welcome page
Route::get('/', function () {
    return view('welcome');
});

// ===================== WEB ROUTES (with views) =====================
Route::resource('tours', TourController::class);
// This creates:
// GET        /tours              index
// GET        /tours/create       create
// POST       /tours              store
// GET        /tours/{tour}       show
// GET        /tours/{tour}/edit  edit
// PUT/PATCH  /tours/{tour}       update
// DELETE     /tours/{tour}       destroy

// Bookings (if you have a BookingController)
Route::resource('bookings', BookingController::class);

// ===================== API ROUTES (JSON, no views) =====================
Route::prefix('api')->group(function () {
    // Tours API (index, show, store, update, destroy)
    Route::apiResource('tours', TourController::class);
    // apiResource excludes create/edit (since API doesn't need them)

    // Bookings API
    Route::apiResource('bookings', BookingController::class);

    // Nested routes: get bookings for a specific tour
    Route::get('tours/{tour}/bookings', [BookingController::class, 'tourBookings']);

    // Active tours endpoint (using your scope)
    Route::get('tours/active/list', [TourController::class, 'index']);
});
