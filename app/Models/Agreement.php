<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agreement extends Model
{
    use HasFactory;

    // สำหรับ column ที่ประกาศเอาไว้ว่าเป็นชนิด json หรือ datetime
    protected $casts = [
        'date_effected' => 'datetime',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
