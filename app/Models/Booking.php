<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'tour_id', 'number_of_people', 'total_price', 'status', 'tracking_code'];

    protected $casts = [
        'booking_date' => 'datetime',
        'status' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    protected $appends = ['booking_date_jalali'];

    public function getBookingDateJalaliAttribute(): string
    {
        try {
            return Jalalian::fromDateTime($this->booking_date)->format('d %B %Y - H:i');
        } catch (\Exception $e) {
            return $this->booking_date ? $this->booking_date->format('Y/m/d H:i') : '';
        }
    }
}
