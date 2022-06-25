<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BranchSubMenu extends Model
{
    use HasFactory;

    protected $appends = ['json_array_field_transform'];
    protected $fillable = [
        'main_header_id',
        'sub_header_id',
        'sub_header_name_th',
        'sub_header_name_en',
        'division_id',
        'menu_order_id',
        'status',
        'detail_delta',
        'detail_html',
        'attach_files'
    ];
   
    protected $casts = [
        'status' => 'boolean',
        'attach_files' => 'array',  // สำหรับ column ที่ประกาศเอาไว้ว่าเป็นชนิด json
    ];

    // protected $attributes = [
    //     'attach_files' => [],    
    // ];


    protected static function booted()
    {
        static::creating(function ($sub_menu) {
            $sub_menu->slug = Str::uuid()->toString();
        });
    }

    public function getJsonArrayFieldTransformAttribute()
    {
        return collect($this->attach_files)->map(function ($item) {
            return [ 'url' => Storage::url($item['unique_name']) ];
        });
    }
}
