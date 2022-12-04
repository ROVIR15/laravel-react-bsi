<?php

namespace App\Models\Facility;

use Illuminate\Database\Eloquent\Model;

class ProductionLog extends Model
{
    //
    protected $table = 'production_log';

    protected $primaryKey = 'id';

    public $incremeting = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'facility_id',
        'date',
        'log'
    ];
}
