<?php

namespace App\Models\Order;
use Illuminate\Database\Eloquent\Model;
use DB;
 
  class OrderItem extends Model
  {
    protected $table = 'order_item';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'order_id',
        'qty',
        'unit_price',
        'cm_price',
        'shipment_estimated',
        'product_id',
        'product_feature_id',
        'costing_item_id',
        'description'
    ];

    public function costing(){
      return $this->belongsTo('App\Models\Manufacture\BOMItem', 'costing_item_id', 'id')->with('costing');
    }

    public function costing_item(){
      return $this->belongsTo('App\Models\Manufacture\BOMItem', 'costing_item_id', 'id')
                  ->select('id', 'consumption', 'bom_id')->with('costing');
    }

    public function image_url(){
      return $this->belongsTo('App\Models\Product\ProductFeature')->select('id', 'product_feature_id')
              ->with(['product', function($query){
                return $query->with(['goods' => function($query) {
                  return $query->select('imageUrl');
                }]);
              }]);
    }

    public function product_feature(){
      return $this->belongsTo('App\Models\Product\ProductFeature')->with('product', 'product_category');
    }

    public function check_shipment(){
      return $this->hasMany('App\Models\Shipment\ShipmentItem', 'order_item_id')->select('id', 'order_item_id', 'shipment_id', DB::raw('sum(qty_shipped) as total_qty_received'))->groupBy('order_item_id');
    }

    public function incoming_shipment(){
      return $this->hasMany('App\Models\Shipment\ShipmentItem', 'order_item_id')->select('id', 'order_item_id', 'shipment_id', DB::raw('sum(qty_shipped) as total_qty_received'))
                  ->whereHas('shipment', function($query){
                    return $query->where('shipment_type_id', 1);
                  })
                  ->groupBy('order_item_id');
    }

    public function outgoing_shipment(){
      return $this->hasMany('App\Models\Shipment\ShipmentItem', 'order_item_id')
                  ->select('id', 'order_item_id', 'shipment_id', DB::raw('sum(qty_shipped) as total_qty_received'))
                  ->whereHas('shipment', function($query){
                    return $query->where('shipment_type_id', 1);
                  })
                  ->groupBy('order_item_id');
    }

    public function shipment_item(){
      return $this->hasMany('App\Models\Shipment\ShipmentItem', 'order_item_id')
                  ->select('id', 'order_item_id', 'shipment_id', DB::raw('sum(qty_shipped) as total_qty_received'))
                  ->with('shipment')
                  ->groupBy('order_item_id');
    }

    public function internal_transfer(){
      return $this->hasMany('App\Models\Inventory\MaterialTransferItem', 'product_feature_id', 'product_feature_id')
                  ->select('id', 'material_transfer_id', 'product_id', 'product_feature_id', DB::raw('sum(transfer_qty) as total_transffered'))
                  ->groupBy('product_feature_id');
    }

    public function adjustment_item(){
      return $this->hasMany('App\Models\Inventory\AdjustmentItem', 'product_feature_id', 'product_feature_id')
                  ->select('id', 'adjustment_id', 'product_id', 'product_feature_id', 'initial_qty', DB::raw('sum(changes) as result'))
                  ->groupBy('product_feature_id');
    }

    public function order(){
      return $this->belongsTo('App\Models\Order\Order');
    }

    public function wip_cutting(){
      return $this->hasMany('App\Models\Monitoring\Cutting', 'order_item_id')->select('id', 'product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', 'date', DB::raw('sum(output) as total_output'))->groupBy('order_item_id', 'date');
    }

    public function wip_sewing(){
      return $this->hasMany('App\Models\Monitoring\Sewing', 'order_item_id')->select('id', 'product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', 'date', DB::raw('sum(output) as total_output'))->groupBy('order_item_id', 'date');
    }

    public function wip_qc(){
      return $this->hasMany('App\Models\Monitoring\Qc', 'order_item_id')->select('id', 'product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', 'date', DB::raw('sum(output) as total_output'))->groupBy('order_item_id', 'date');
    }

    public function wip_fg(){
      return $this->hasMany('App\Models\Monitoring\FinishedGoods', 'order_item_id')->select('id', 'product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', 'date', DB::raw('sum(output) as total_output'))->groupBy('order_item_id', 'date');
    }

    public function import_info(){
      return $this->belongsTo('App\Models\KITE\ImportDocItem', 'id', 'order_item_id');
    }

    public function invoice(){
      return $this->belongsTo('App\Models\Invoice\Invoice', 'order_id', 'order_id');
    }

  }

