<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Str;

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
    ];

    // Relationship: A tour has many bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    // Automatically generate slug from title when creating
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($tour) {
            $tour->slug = Str::slug($tour->title);
        });
    }
}
