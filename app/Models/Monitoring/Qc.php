<?php

namespace App\Models\Monitoring;

use DB;
use Illuminate\Database\Eloquent\Model;

class Qc extends Model
{
    protected $table = 'monitoring_bsi_qc';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'ms_id',
        'date',
        'po_number',
        'sales_order_id',
        'order_id',
        'order_item_id',
        'product_feature_id',
        'recorder',
        'line',
        'qty_loading',
        'output',
        'reject'
    ];

    public function order_item(){
        return $this->belongsTo('App\Models\Order\OrderItem')->with('product_feature');
    }

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }

    public function sales_order(){
        return $this->belongsTo('App\Models\Order\SalesOrder')->with('product_feature');
      }
  
    public function inventory(){
        return $this->belongsTo('App\Models\Inventory\InventoryItem', 'id', 'product_feature_id')->with('facility');
    }

    public function fg(){
        return $this->hasMany('App\Models\Monitoring\FinishedGoods', 'product_feature_id', 'product_feature_id')->select('id', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(output) as total_output'))->groupBy('order_item_id');
    }

    public function detail(){
        return $this->hasMany('App\Models\Monitoring\FinishedGoods', 'sales_order_id', 'sales_order_id')
        ->selectRaw('sum(output) as output_qc, sales_order_id, po_number')
        ->groupBy('sales_order_id', 'po_number')
        ->with('detail');
    }

    public function wip_fg(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'order_item_id', 'order_item_id')->select('id', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(output) as total_output'))->groupBy('order_item_id', 'date');
    }
}
