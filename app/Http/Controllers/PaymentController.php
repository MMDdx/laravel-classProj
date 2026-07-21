<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function show(Request $request, Tour $tour)
    {
        $number_of_people = $request->number_of_people ?? 1;

        if ($tour->remaining_capacity < $number_of_people) {
            return redirect()->route('tours.show', $tour)
                ->withErrors(['general' => 'ظرفیت کافی نیست.']);
        }

        return inertia('Payment/Pay', [
            'tour' => $tour,
            'number_of_people' => (int) $number_of_people,
        ]);
    }

    public function pay(Request $request, Tour $tour)
    {
        $validated = $request->validate([
            'number_of_people' => 'required|integer|min:1',
        ]);

        $number_of_people = $validated['number_of_people'];

        if ($tour->remaining_capacity < $number_of_people) {
            return back()->withErrors(['general' => 'ظرفیت کافی نیست.']);
        }


        $trackingCode = 'TR-' . strtoupper(Str::random(8));

        $totalPrice = $tour->price * $number_of_people;

        $booking = Booking::create([
            'user_id' => auth()->id(),
            'tour_id' => $tour->id,
            'number_of_people' => $number_of_people,
            'total_price' => $totalPrice,
            'status' => 'confirmed',
            'tracking_code' => $trackingCode,
        ]);

        $tour->decrement('remaining_capacity', $number_of_people);

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'پرداخت با موفقیت انجام شد!');
    }
}
