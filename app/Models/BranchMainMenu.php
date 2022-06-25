<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BranchMainMenu extends Model
{
    use HasFactory;

    protected $fillable = [
        'main_header_id',
        'main_header_name_th',
        'main_header_name_en',
        'division_id',
        'menu_order_id',
        'component_name',
        'status',
        'is_active'
    ];

    protected $casts = [
        'status' => 'boolean',
        'is_active' => 'boolean'
    ];

    protected static function booted()
    {
        static::creating(function ($main_menu) {
            $main_menu->slug = Str::uuid()->toString();
        });
    }
}
