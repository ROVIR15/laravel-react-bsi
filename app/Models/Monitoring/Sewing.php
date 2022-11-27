<?php

namespace App\Models\Monitoring;

use Illuminate\Database\Eloquent\Model;

class Sewing extends Model
{
    protected $table = 'monitoring_bsi_sewing';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'date',
        'po_number',
        'sales_order_id',
        'order_id',
        'order_item_id',
        'product_feature_id',
        'line',
        'facility_id',
        'qty_loading',
        'output'
    ];

    public function order_item(){
        return $this->belongsTo('App\Models\Order\OrderItem')->with('product_feature');
    }

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }

    public function sales_order(){
        return $this->belongsTo('App\Models\Order\SalesOrder')->with('party');
    }
  
    public function inventory(){
        return $this->belongsTo('App\Models\Inventory\InventoryItem', 'id', 'product_feature_id')->with('facility');
    }

    public function qc(){
        return $this->hasMany('App\Models\Monitoring\Qc', 'ms_id', 'id')->selectRaw('sum(output) as output_qc, ms_id')->groupBy('ms_id');
    }

    public function target(){
        return $this->belongsTo('App\Models\Facility\FacilityTarget', 'facility_id', 'facility_id')->with('facility');
    }

    public function detail(){
        return $this->hasMany('App\Models\Monitoring\Qc', 'sales_order_id', 'sales_order_id')
        ->selectRaw('sum(output) as output_qc, sales_order_id, po_number')
        ->groupBy('sales_order_id', 'po_number')
        ->with('detail');
    }

    public function planning_items(){
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems', 'sales_order_id', 'sales_order_id')->with('month_archive');
    }

}
