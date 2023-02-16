<?php

namespace App\Models\Monitoring;

use DB;
use Illuminate\Database\Eloquent\Model;

class FinishedGoods extends Model
{
    //
    protected $table = 'monitoring_bsi_finished_goods';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'qc_id',
        'date',
        'box',
        'po_number',
        'sales_order_id',
        'order_id',
        'order_item_id',
        'product_feature_id',
        'recorder',
        'line',
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
        return $this->belongsTo('App\Models\Order\SalesOrder')->with('product_feature');
      }
  
    public function inventory(){
        return $this->belongsTo('App\Models\Inventory\InventoryItem', 'id', 'product_feature_id')->with('facility');
    }

    public function check_shipment(){
        return $this->hasMany('App\Models\Shipment\ShipmentItem', 'order_item_id', 'order_item_id')->select('id', 'shipment_id', 'order_item_id', DB::raw('sum(qty_shipped) as total_shipped_goods'))->groupBy('order_item_id');
    }
}
