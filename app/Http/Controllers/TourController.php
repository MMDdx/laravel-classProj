<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TourController extends Controller
{
    /**
     * Display a listing of active tours.
     */
    public function index()
    {
        $tours = Tour::active()
            ->orderBy('start_date', 'asc')
            ->get();

        return response()->json($tours);
    }

    /**
     * Show the form for creating a new tour (web view).
     */
    public function create()
    {
        return view('tours.create');
    }

    /**
     * Store a newly created tour in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'max_capacity' => 'required|integer|min:1',
            'location' => 'required|string|max:255',
            'image_url' => 'nullable|url|max:2048',
            'is_active' => 'boolean',
        ]);

        $tour = Tour::create($validated);

        // For API (JSON response)
        if ($request->wantsJson()) {
            return response()->json($tour, 201);
        }

        // For web (redirect after store)
        return redirect()->route('tours.show', $tour)->with('success', 'Tour created!');
    }

    /**
     * Display the specified tour.
     */
    public function show(Tour $tour)
    {
        // Load bookings count or relationships if needed
        $tour->loadCount('bookings');

        if (request()->wantsJson()) {
            return response()->json($tour);
        }

        return view('tours.show', compact('tour'));
    }

    /**
     * Show the form for editing the specified tour (web view).
     */
    public function edit(Tour $tour)
    {
        return view('tours.edit', compact('tour'));
    }

    /**
     * Update the specified tour in storage.
     */
    public function update(Request $request, Tour $tour)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'start_date' => 'sometimes|date|after_or_equal:today',
            'end_date' => 'sometimes|date|after:start_date',
            'max_capacity' => 'sometimes|integer|min:1',
            'location' => 'sometimes|string|max:255',
            'image_url' => 'nullable|url|max:2048',
            'is_active' => 'boolean',
        ]);

        $tour->update($validated);

        if ($request->wantsJson()) {
            return response()->json($tour);
        }

        return redirect()->route('tours.show', $tour)->with('success', 'Tour updated!');
    }

    /**
     * Remove the specified tour from storage.
     */
    public function destroy(Request $request, Tour $tour)
    {
        $tour->delete();

        if ($request->wantsJson()) {
            return response()->json(null, 204);
        }

        return redirect()->route('tours.index')->with('success', 'Tour deleted!');
    }
}
