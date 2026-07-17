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
    public function store(Request $request, Tour $tour)  // ← tours از URL میاد
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',    // ← فقط content
        ]);
        $comment = Comment::create([
            'user_id' => Auth::id(),
            'tour_id' => $tour->id,
            'content' => $validated['content'],
        ]);

        // Reload with user relationship
        $comment->load('user');

        return redirect()
            ->back()
            ->with('success', 'نظر شما با موفقیت ثبت شد.');
    }
}
