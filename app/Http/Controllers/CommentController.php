<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created comment.
     */
    public function store(Request $request, Tour $tour)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $tour->comments()->create([
            'user_id' => auth()->id(),
            'content' => $validated['content'],
            'is_approved' => false,
        ]);

        return redirect()->back()->with('success', 'نظر شما ثبت شد و پس از تأیید مدیر نمایش داده می‌شود.');
    }
}
