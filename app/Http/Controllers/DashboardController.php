<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Tour;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $totalBookings = $user->bookings()->count();
        $confirmedBookings = $user->bookings()->where('status', 'confirmed')->count();
        $activeToursCount = Tour::active()->count();
        $recentBookings = $user->bookings()->with('tour')->latest()->take(5)->get();

        return view('dashboard', compact('totalBookings', 'confirmedBookings', 'activeToursCount', 'recentBookings'));
    }
}
