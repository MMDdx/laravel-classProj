<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::with(['user', 'tour'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Comments/Index', [
            'comments' => $comments,
        ]);
    }

    public function approve(Comment $comment)
    {
        $comment->update(['is_approved' => true]);
        return back()->with('success', 'نظر تأیید شد.');
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
        return back()->with('success', 'نظر حذف شد.');
    }
}
