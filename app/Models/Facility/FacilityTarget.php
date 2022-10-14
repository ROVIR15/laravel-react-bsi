<?php

namespace App\Models\Facility;

use DB;
use Illuminate\Database\Eloquent\Model;

class FacilityTarget extends Model
{
    //
    protected $table = 'facility_target';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'facility_id',
        'date',
        'target'
    ];

    public function monitoring_sewing(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'facility_id', 'facility_id')->select('facility_id', 'line', DB::raw('sum(output) as total_output'))->groupBy('line');
    }

    public function facility(){
        return $this->belongsTo('App\Models\Facility\Facility', 'facility_id');
    }
}
