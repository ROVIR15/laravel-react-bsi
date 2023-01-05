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
        'description'
    ];

    public function product_feature(){
      return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }

    public function check_shipment(){
      return $this->hasMany('App\Models\Shipment\ShipmentItem', 'order_item_id')->select('id', 'order_item_id', DB::raw('sum(qty_shipped) as total_qty_received'))->groupBy('order_item_id');
    }
  }

