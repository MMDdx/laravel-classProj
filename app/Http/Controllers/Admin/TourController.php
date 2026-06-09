<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TourController extends Controller
{
    public function index()
    {
        $tours = Tour::latest()->paginate(15);
        return view('admin.tours.index', compact('tours'));
    }

    public function create()
    {
        return view('admin.tours.create');
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
            'location' => 'required|string',
            'image_url' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        // Slug generated automatically in model, but you can also set manually:
        Tour::create($validated);

        return redirect()->route('admin.tours.index')->with('success', 'تور با موفقیت ایجاد شد.');
    }

    public function edit(Tour $tour)
    {
        return view('admin.tours.edit', compact('tour'));
    }

    public function update(Request $request, Tour $tour)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'max_capacity' => 'required|integer|min:1',
            'location' => 'required|string',
            'image_url' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        $tour->update($validated);
        return redirect()->route('admin.tours.index')->with('success', 'تور بروزرسانی شد.');
    }

    public function destroy(Tour $tour)
    {
        $tour->delete();
        return redirect()->route('admin.tours.index')->with('success', 'تور حذف شد.');
    }
}
