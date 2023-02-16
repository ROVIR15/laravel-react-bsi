<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;
use DB;

class ManufacturePlanningItems extends Model
{
    //
    protected $table = 'manufacture_planning_items';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'facility_id',
        'bom_id',
        'manufacture_planning_id',
        'sales_order_id',
        'expected_output',
        'work_days'
    ];

    public function sales_order() {
        return $this->belongsTo('App\Models\Order\SalesOrder', 'sales_order_id')->with('sum', 'party');
    }

    public function info() {
        return $this->belongsTo('App\Models\Order\SalesOrder', 'sales_order_id')->with('avg_price');
    }

    public function ckck(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'sales_order_id', 'sales_order_id')->select('sales_order_id', 'facility_id', 'date', DB::raw('sum(output) as total_output'))->groupBy('sales_order_id');
    }

    public function bom(){
        return $this->belongsTo('App\Models\Manufacture\BOM', 'bom_id', 'id')->select('id')->with('get_target_output');
    }

    public function ckckck(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'sales_order_id', 'sales_order_id')
        ->select('sales_order_id', 'facility_id', 'date', DB::raw('sum(output) as total_output'))
        ->groupBy('facility_id', 'sales_order_id');
        // ->where('facility_id', '=', $this->facility);
    }
    
    public function facility() {
        return $this->belongsTo('App\Models\Facility\Facility', 'facility_id');
    }

    public function costing() {
        return $this->belongsTo('App\Models\Manufacture\BOM', 'bom_id');
    }

    public function sewing() {
        return $this->hasMany('App\Models\Monitoring\Sewing', 'sales_order_id', 'sales_order_id');
    }

    public function month_archive(){
        return $this->belongsTo('App\Models\Manufacture\ManufacturePlanning', 'manufacture_planning_id', 'id');
    }
}
