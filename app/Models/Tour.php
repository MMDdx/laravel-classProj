<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Morilog\Jalali\Jalalian;

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


    protected $appends = ['start_date_jalali', 'end_date_jalali'];

    public function getStartDateJalaliAttribute(): string
    {
        try {
            $date = $this->start_date instanceof \Carbon\Carbon
                ? $this->start_date
                : \Carbon\Carbon::parse($this->start_date);
            return Jalalian::fromDateTime($date)->format('d %B %Y');
        } catch (\Exception $e) {
            return $this->start_date ?? '';
        }
    }

    public function getEndDateJalaliAttribute(): string
    {
        try {
            $date = $this->end_date instanceof \Carbon\Carbon
                ? $this->end_date
                : \Carbon\Carbon::parse($this->end_date);
            return Jalalian::fromDateTime($date)->format('d %B %Y');
        } catch (\Exception $e) {
            return $this->end_date ?? '';
        }
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
