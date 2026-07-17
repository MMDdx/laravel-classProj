<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Tour;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        return Inertia::render('Dashboard', [
            'totalBookings' => $user->bookings()->count(),
            'confirmedBookings' => $user->bookings()->where('status', 'confirmed')->count(),
            'activeToursCount' => Tour::active()->count(),
            'recentBookings' => $user->bookings()->with('tours')->latest()->take(5)->get(),
            'userName' => $user->name,
        ]);
    }
}
