<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Poster extends Model
{
    use HasFactory;

    protected $table = 'posters';
    protected $appends = ['cover_url', 'content_url'];
    protected $fillable = [
        'desc',
        'cover',
        'content',
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
        static::creating(function ($poster) {
            $poster->slug = Str::uuid()->toString();
        });
    }

    public function getCoverUrlAttribute()
    {
        return Storage::url($this->cover);
    }

    public function getContentUrlAttribute()
    {
        return Storage::url($this->content);
    }
}
