<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;
use DB;

class ManufacturePlanning extends Model
{
    //
    protected $table = 'manufacture_planning';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'month',
        'year'
    ];

    public function info() {
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems')->select('id', 'manufacture_planning_id', 'facility_id', DB::raw('count(distinct sales_order_id), count(distinct facility_id) as active_line, sum(expected_output*work_days) as planned_output'))->groupBy('manufacture_planning_id');
    }

    public function items() {
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems')->with('sales_order');
    }

    public function items_with_price() {
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems')->with('info', 'ckck', 'costing', 'facility');
    }

    public function test_sum_based_on_mpi() {
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems')->with('sales_order_img');
    }
}
