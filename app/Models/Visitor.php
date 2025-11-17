<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    protected $table = 'visitors';

    protected $fillable = [
        'route_name',
        'session_token',
        'ip'
    ];

//    protected $casts = [
//        'date' => 'datetime:Y-m-d',
//    ];

// เพิ่มฟังก์ชันนี้เข้าไปใน Model ที่มีปัญหา เพื่อดักจับตัวอักษรเสียๆ เวลาดึงข้อมูลมาแสดง
    public function toArray()
    {
        $attributes = parent::toArray();
        array_walk_recursive($attributes, function (&$value) {
            if (is_string($value) && !mb_check_encoding($value, 'UTF-8')) {
                $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
            }
        });
        return $attributes;
    }

}
