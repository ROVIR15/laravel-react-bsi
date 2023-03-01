<?php

namespace App\Models\Facility;

use DB;
use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    //
    protected $table = 'facility';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'name',
        'type'
    ];

    public function type(){
        return $this->belongsTo('App\Models\Facility\FacilityType', 'facility_type_id', 'id');
    }

    public function plans(){
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems', 'facility_id')
                    ->select('id', 'manufacture_planning_id', 'sales_order_id', 'facility_id', DB::raw('sum(expected_output * work_days) as total_expected_output'))
                    ->groupBy('facility_id', 'sales_order_id');
    }

    public function archive(){
        return $this->hasManyThrough('App\Models\Manufacture\ManufacturePlanning', 'App\Models\Manufacture\ManufacturePlanningItems', 'facility_id', 'id', 'id', 'manufacture_planning_id');
    }

    public function items(){
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems', 'facility_id');
    }

    public function result_sewing(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'facility_id', 'id');
    }

    // i need this to do another query of sewing output haha..
    public function last_sewing_completion(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'facility_id', 'id');
    }


}
