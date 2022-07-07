<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Announce extends Model
{
    use HasFactory;

    protected $table = 'announces';
    protected $fillable = [
        'topic',
        'detail_delta',
        'detail_html',
        'attach_files',
        'expire_date',
        'type',
        'user_sap_id',
        'division_id',
        'publish_status',
        'publish_date',
        'pinned'
    ];

    // สำหรับ column ที่ประกาศเอาไว้ว่าเป็นชนิด json
    protected $casts = [
        //'detail_delta' => 'array',
        'attach_files' => 'array',
        'expire_date' => 'datetime',
        'publish_date' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($announce) {
            $announce->slug = Str::uuid()->toString();
        });
    }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'division_id');
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'user_sap_id', 'sap_id');
    }
}
