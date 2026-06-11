<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Auth::user()->bookings()->with('tour')->latest()->paginate(10);
        return view('bookings.index', compact('bookings'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'tour_id' => 'required|exists:tours,id',
            'number_of_people' => 'required|integer|min:1',
            'total_price' => 'required|numeric',
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $tour = Tour::findOrFail($request->tour_id);

        // Check capacity
        if ($request->number_of_people > $tour->max_capacity) {
            return back()->withErrors(['number_of_people' => 'تعداد نفرات بیشتر از ظرفیت مجاز تور است.']);
        }

        $booking = Auth::user()->bookings()->create([
            'tour_id' => $request->tour_id,
            'number_of_people' => $request->number_of_people,
            'total_price' => $request->total_price,
            'status' => 'pending',
            'booking_date' => now(),
        ]);

        return redirect()->route('bookings.show', $booking)->with('success', 'رزرو شما با موفقیت ثبت شد.');
    }

    public function show(Booking $booking)
    {
        // Ensure the bookings belongs to the logged-in user
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }
        return view('bookings.show', compact('booking'));
    }

    public function cancel(Booking $booking)
    {
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }
        $booking->update(['status' => 'cancelled']);
        return redirect()->route('bookings.index')->with('success', 'رزرو لغو شد.');
    }
}
