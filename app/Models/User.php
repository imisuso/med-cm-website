<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $appends = ['user_roles', 'abilities'];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'sap_id',
        'status',
        'other'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'other' => 'array',
        'status' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($user) {
            $user->slug = Str::uuid()->toString();
        });
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    public function person()
    {
        return $this->hasOne(Person::class, 'sap_id', 'sap_id');
    }

    public function assignRole($role)
    {
        if (is_string($role)) {
            $role = Role::whereName($role)->firstOrCreate(['name' => $role]);
        }

        $this->roles()->syncWithoutDetaching($role);
    }

    public function getUserRolesAttribute()
    {
        return $this->roles->map->name->flatten()->unique()->flatten();
    }

    public function getAbilitiesAttribute()
    {
        return $this->roles->map->abilities->flatten()->pluck('name')->unique()->flatten();
    }

    public function agreements()
    {
        return $this->belongsToMany(Agreement::class)->withTimestamps();
    }

    public function needAcceptAgreement()
    {
        $latestAgreement = Agreement::orderByDesc('date_effected')->first();

        if (! $latestAgreement || $this->agreements()->where('id', $latestAgreement->id)->count()) {
            return false;
        }

        return true;
    }
}
