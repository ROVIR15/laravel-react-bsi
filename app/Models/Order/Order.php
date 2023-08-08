<?php

  namespace App\Models\Order;
  use DB;
  
  use Illuminate\Database\Eloquent\Model;
  
  class Order extends Model
  {  
    protected $table = 'order';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'currency_id',
        'sales_order_id',
        'purchase_order_id',
        'quote_id',
        'tax',
        'description'
    ];

    public function order_item(){
      return $this->hasMany('App\Models\Order\OrderItem');
    }

    public function order_item_img(){
      return $this->belongsTo('App\Models\Order\OrderItem', 'id', 'order_id')->with('product_feature');
    }

    public function sales_order(){
      return $this->belongsTo('App\Models\Order\SalesOrder', 'sales_order_id')->with('party', 'ship');
    }

    public function purchase_order(){
      return $this->belongsTo('App\Models\Order\PurchaseOrder', 'purchase_order_id')->with('party', 'ship');
    }

    public function status(){
      return $this->hasMany('App\Models\Order\OrderStatus', 'id', 'order_id')->orderBy('created_at', 'desc');
    }

    public function confirmation(){
      return $this->belongsTo('App\Models\Order\OrderConfirmed', 'id', 'order_id');
    }

    public function completion_status(){
      return $this->hasMany('App\Models\Order\OrderCompletionStatus', 'id', 'order_id')->orderBy('created_at', 'desc');
    }

    public function avg_value(){
      return $this->hasMany('App\Models\Order\OrderItem')->select('id', 'order_id', DB::raw('avg(unit_price) as unit_price'))->groupBy('order_id');
    }

    public function info(){
      return $this->hasMany('App\Models\Order\OrderItem')->select('id', 'order_id', DB::raw('avg(unit_price) as unit_price, sum(unit_price*qty) as total_amount, sum(qty) as total_qty'))->groupBy('order_id');
    }
  }
