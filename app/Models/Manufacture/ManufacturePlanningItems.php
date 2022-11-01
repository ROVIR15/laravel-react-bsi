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
        'manufacture_planning_id',
        'sales_order_id',
        'expected_output',
        'work_days'
    ];

    public function sales_order() {
        return $this->belongsTo('App\Models\Order\SalesOrder', 'sales_order_id')->with('sum');
    }

    public function info() {
        return $this->belongsTo('App\Models\Order\SalesOrder', 'sales_order_id')->with('avg_price');
    }

    public function ckck(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'sales_order_id', 'sales_order_id')->select('sales_order_id', 'date', DB::raw('sum(output) as total_output'))->groupBy('sales_order_id');
    }
    
}
