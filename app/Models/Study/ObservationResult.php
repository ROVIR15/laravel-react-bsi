<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class ObservationResult extends Model
{
    protected $table = 'observation_result';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'name',
        'result'
    ];

}
