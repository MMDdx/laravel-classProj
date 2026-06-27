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

    public function index(Request $request)
    {
        $query = Tour::query()->where('is_active', true);

        // Filter by title (search)
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter by location
        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by start date (tours starting on or after)
        if ($request->filled('start_date')) {
            $query->where('start_date', '>=', $request->start_date);
        }

        // Filter by end date (tours ending on or before)
        if ($request->filled('end_date')) {
            $query->where('end_date', '<=', $request->end_date);
        }

        // Sort
        $sort = $request->get('sort', 'start_date');
        $direction = $request->get('direction', 'asc');
        $query->orderBy($sort, $direction);

        $tours = $query->paginate(12)->withQueryString();

        return view('tours.index', compact('tours'));
    }

    /**
     * Show the form for creating a new tour (web view).
     */
    public function create()
    {
        return view('tours.create');
    }

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
        return view('tours.show', compact('tour'));
    }


    public function edit(Tour $tour)
    {
        return view('tours.edit', compact('tour'));
    }

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

    public function destroy(Request $request, Tour $tour)
    {
        $tour->delete();

        if ($request->wantsJson()) {
            return response()->json(null, 204);
        }

        return redirect()->route('tours.index')->with('success', 'Tour deleted!');
    }
}
