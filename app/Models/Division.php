<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Division extends Model
{
    use HasFactory;

    protected $table = 'divisions';
    protected $appends = ['division_type', 'image_url'];
    protected $fillable = [
        'division_id',
        'type',
        'name_th',
        'name_en',
        'image',
        'user_previous_act',
        'user_last_act'
    ];

    protected static function booted()
    {
        static::creating(function ($division) {
            $division->slug = Str::uuid()->toString();
        });
    }

    public function announces()
    {
        return $this->hasMany(Announce::class);
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'division_id', 'division_id');
    }

    public function getDivisionTypeAttribute()
    {
        return $division_type = $this->type === "u" ? "หน่วย" : "สาขา";
    }

    public function getImageUrlAttribute()
    {
        //return Storage::url($this->image);
        return $this->image ? Storage::url($this->image) : url('fallbackimage/default-blank-image.jpg');
    }
}
