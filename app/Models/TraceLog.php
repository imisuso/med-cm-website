<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TraceLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user',
        'section',
        'action',
        'type',
        'details',
        'other'
    ];

    // สำหรับ column ที่ประกาศเอาไว้ว่าเป็นชนิด json
    protected $casts = [
        'other' => 'array',
    ];

    protected static function booted()
    {
        static::creating(function ($trace_logs) {
            $trace_logs->slug = Str::uuid()->toString();
        });
    }

    public function person()
    {
        return $this->hasOne(Person::class, 'sap_id', 'user')->select(['sap_id', 'fname_th', 'lname_th']);
    }
}
