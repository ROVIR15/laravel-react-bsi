<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class ProcessStudy extends Model
{
    protected $table = 'process_study';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'production_study_id',
        'party_id',
        'process_id',
        'seq_1',
        'seq_2',
        'seq_3',
        'target'
    ];

}
