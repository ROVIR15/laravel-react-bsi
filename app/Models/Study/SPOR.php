<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class SPOR extends Model
{
    protected $table = 'study_process_observation_result';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'process_study_id',
        'observation_result_id'
    ];
}
