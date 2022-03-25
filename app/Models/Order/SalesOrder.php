<?php

  namespace App\Models\Order;
  
  use Carbon\Carbon;
  
  use Illuminate\Database\Eloquent\Model;
  
  class SalesOrder extends Model
  {  
    protected $table = 'sales_order';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'order_id',
        'sold_to',
        'ship_to',
        'po_number',
        'issue_date',
        'delivery_date',
        'valid_thru'
    ];

    public function order(){
      return $this->belongsTo('App\Models\Order\Order')->with('order_item');
    }

    public function product_feature(){
      return $this->hasManyThrough('App\Models\Product\ProductFeature', 'App\Models\Order\OrderItem', 'order_id', 'id', 'order_id', 'id')->with('product');
    }

    public function order_item(){
      return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->with('product_feature');
    }
  }
