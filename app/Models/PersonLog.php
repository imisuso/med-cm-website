<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonLog extends Model
{
    use HasFactory;

    protected $guarded = [];

    // สำหรับ column ที่ประกาศเอาไว้ว่าเป็นชนิด json
    protected $casts = [
        'profiles' => 'array',
        'status' => 'boolean',
    ];

}
