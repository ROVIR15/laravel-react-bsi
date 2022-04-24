<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class OperationStudyObeservationResult extends Model
{
    protected $table = 'study_process_observation_result';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'study_operation_id',
        'observation_result_id'
    ];

}
