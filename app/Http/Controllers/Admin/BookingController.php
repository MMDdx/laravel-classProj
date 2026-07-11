<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['user', 'tour'])->latest()->paginate(15);
        return Inertia::render('Admin/Bookings/Index', compact('bookings'));
    }

    public function show(Booking $booking)
    {
        $booking->load(['user', 'tour']);
        return Inertia::render('Admin/Bookings/Show', compact('booking'));
    }

    public function update(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $oldStatus = $booking->status;
        $newStatus = $request->status;

        if ($oldStatus !== 'confirmed' && $newStatus === 'confirmed') {
            if ($booking->number_of_people > $booking->tour->remaining_capacity) {
                return redirect()->back()->withErrors(['status' => 'ظرفیت باقیمانده برای تایید این رزرو کافی نیست.']);
            }
            $booking->tour->decrement('remaining_capacity', $booking->number_of_people);
        }

        if ($oldStatus === 'confirmed' && $newStatus === 'cancelled') {
            $booking->tour->increment('remaining_capacity', $booking->number_of_people);
        }

        $booking->update(['status' => $newStatus]);

        return redirect()->route('admin.bookings.index')->with('success', 'وضعیت رزرو با موفقیت تغییر یافت.');
    }

    public function destroy(Booking $booking)
    {
        if ($booking->status === 'confirmed') {
            $booking->tour->increment('remaining_capacity', $booking->number_of_people);
        }

        $booking->delete();

        return redirect()->route('admin.bookings.index')->with('success', 'رزرو حذف شد.');
    }
}
