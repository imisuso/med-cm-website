<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class PersonVersion extends Person
{
    use HasFactory;

    protected $table = 'person_versions';

    public function getFillable()
    {
        $override =  parent::getFillable();
        $override[] = 'person_id';
        $override[] = 'trace_log_id';

        return $override;
    }

    public function log() {
        return $this->belongsTo(TraceLog::class, 'trace_log_id', 'id');
    }

}
