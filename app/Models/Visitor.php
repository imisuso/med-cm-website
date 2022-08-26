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

}
