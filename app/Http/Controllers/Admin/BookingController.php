<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['user', 'tour'])->latest()->paginate(15);
        return view('admin.bookings.index', compact('bookings'));
    }

    public function show(Booking $booking)
    {
        return view('admin.bookings.show', compact('booking'));
    }

    public function update(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $oldStatus = $booking->status;
        $newStatus = $request->status;

        // If booking was pending and now confirmed → reduce capacity
        if ($oldStatus !== 'confirmed' && $newStatus === 'confirmed') {
            if ($booking->number_of_people > $booking->tour->remaining_capacity) {
                return back()->withErrors(['status' => 'ظرفیت باقیمانده برای تایید این رزرو کافی نیست.']);
            }
            $booking->tour->decrement('remaining_capacity', $booking->number_of_people);
        }

        // If booking was confirmed and now cancelled → restore capacity
        if ($oldStatus === 'confirmed' && $newStatus === 'cancelled') {
            $booking->tour->increment('remaining_capacity', $booking->number_of_people);
        }

        $booking->update(['status' => $newStatus]);

        return redirect()->route('admin.bookings.index')->with('success', 'وضعیت رزرو با موفقیت تغییر یافت.');
    }

    public function destroy(Booking $booking)
    {
        // Restore capacity if booking was confirmed
        if ($booking->status === 'confirmed') {
            $booking->tour->increment('remaining_capacity', $booking->number_of_people);
        }

        $booking->delete();

        return redirect()->route('admin.bookings.index')->with('success', 'رزرو حذف شد.');
    }
}
