<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class SampleProcessStudy extends Model
{
    //
    protected $table = 'sample_process_study';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'sampling_study_id',
        'machine_code',
        'time_1'
    ];
}
