<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Tour extends Model
{


    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'start_date',
        'end_date',
        'max_capacity',
        'location',
        'image_url',
        'is_active',
        'remaining_capacity',
    ];

    // Relationship: A tour has many bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    // Relationship: A tour has many comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Automatically generate slug from title when creating
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($tour) {
            $tour->slug = Str::slug($tour->title);
        });
    }

    public function scopeActive($query){
        return $query->where('is_active', true);
    }

    public function getExcerptAttribute(): string
    {
        return substr($this->description, 0, 30)."...";
    }


    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
