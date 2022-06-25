<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PageDownload extends Model
{
    use HasFactory;

    protected $table = 'page_downloads';
    protected $fillable = [
        'title',
        'link',
        'other',
        'order_number',
        'status'
    ];

    // สำหรับ column ที่ประกาศเอาไว้ว่าเป็นชนิด json
    protected $casts = [
        'other' => 'array',
        'status' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($page_download) {
            $page_download->slug = Str::uuid()->toString();
        });
    }
}
