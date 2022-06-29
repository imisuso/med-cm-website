<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Gallery extends Model
{
    use HasFactory;

    //protected $table = 'galleries';
    protected $appends = ['cover_url'];
    protected $fillable = [
        'cover',
        'desc',
        'event_date',
        'status',
        'other',
    ];

    // สำหรับ column ที่ประกาศเอาไว้ว่าเป็นชนิด json
    protected $casts = [
        'status' => 'boolean',
        'other' => 'array',
    ];

    protected static function booted()
    {
        static::creating(function ($gallery) {
            $gallery->slug = Str::uuid()->toString();
        });
    }

    // public function getImageUrlAttribute()
    // {
    //     return Storage::url($this->cover);
    // }

    public function getCoverUrlAttribute()
    {
        //return Storage::url($this->cover);
        return $this->cover ? Storage::url($this->cover) : url('fallbackimage/default-blank-image.jpg');
    }
}
