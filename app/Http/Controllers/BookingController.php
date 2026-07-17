<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Auth::user()->bookings()->with('tours')->latest()->paginate(10);
        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tour_id' => 'required|exists:tours,id',
            'number_of_people' => 'required|integer|min:1',
        ]);

        $tour = Tour::findOrFail($validated['tour_id']);

        // Check capacity
        if ($validated['number_of_people'] > $tour->remaining_capacity) {
            return back()->withErrors([
                'number_of_people' => 'تعداد نفرات بیشتر از ظرفیت باقیمانده است. (ظرفیت: ' . $tour->remaining_capacity . ' نفر)'
            ]);
        }

        $totalPrice = $tour->price * $validated['number_of_people'];

        $booking = auth()->user()->bookings()->create([
            'tour_id' => $validated['tour_id'],
            'number_of_people' => $validated['number_of_people'],
            'total_price' => $totalPrice,
            'status' => 'confirmed',
            'booking_date' => now(),
        ]);

        $tour->decrement('remaining_capacity', $validated['number_of_people']);

        return redirect()->route('bookings.show', $booking)->with('success', 'رزرو شما با موفقیت انجام شد.');
    }

    public function show(Booking $booking)
    {
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }
        return Inertia::render('Bookings/Show', [
            'booking' => $booking->load('tour'),
        ]);
    }

    public function cancel(Booking $booking)
    {
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        // Restore capacity before cancelling
        $booking->tour->increment('remaining_capacity', $booking->number_of_people);

        $booking->update(['status' => 'cancelled']);

        return redirect()->route('bookings.index')->with('success', 'رزرو لغو شد.');
    }
}
