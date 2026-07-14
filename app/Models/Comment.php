<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Morilog\Jalali\Jalalian;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tour_id',
        'content',
    ];

    // این باعث میشه created_at_jalali خودکار به فرانت‌اند فرستاده بشه
    protected $appends = ['created_at_jalali'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    public function getCreatedAtJalaliAttribute(): string
    {
        try {
            return Jalalian::fromDateTime($this->created_at)->format('d %B %Y - H:i');
        } catch (\Exception $e) {
            return $this->created_at->format('Y/m/d H:i');
        }
    }
}
