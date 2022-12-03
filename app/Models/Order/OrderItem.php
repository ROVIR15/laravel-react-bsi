<?php

namespace App\Models\Order;
use Illuminate\Database\Eloquent\Model;
  
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
        'product_feature_id',
        'description'
    ];

    public function product_feature(){
      return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }
  }

