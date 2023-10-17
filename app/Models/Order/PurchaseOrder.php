<?php

  namespace App\Models\Order;
  use Illuminate\Database\Eloquent\Model;
  use DB;
  
  class PurchaseOrder extends Model
  {
    protected $table = 'purchase_order';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'import_flag',
        'order_id',
        'po_number',
        'bought_from',
        'ship_to',
        'issue_date',
        'delivery_date',
        'valid_thru'
    ];

    public function order(){
      return $this->belongsTo('App\Models\Order\Order')->with('status');
    }

    public function order_item_one(){
      return $this->belongsTo('App\Models\Order\OrderItem', 'order_id', 'order_id')->with('costing');
    }

    public function product_feature(){
      return $this->hasManyThrough('App\Models\Product\ProductFeature', 'App\Models\Order\OrderItem', 'order_id', 'id', 'order_id', 'id')->with('product');
    }

    public function order_item(){
      return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->with('product_feature', 'check_shipment', 'import_info');
    }

    public function sum(){
      return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->groupBy('order_id')->select(DB::raw('sum(qty) as total_qty, sum(qty*unit_price) as total_money'));
    }

    public function bought(){
      return $this->belongsTo('App\Models\Party\Party', 'bought_from', 'id');
    }

    public function party(){
      return $this->belongsTo('App\Models\Party\Party', 'bought_from', 'id')->with('address');
    }

    public function ship(){
        return $this->belongsTo('App\Models\Party\Party', 'ship_to', 'id')->with('address');
    }

    public function status(){
        return $this->hasManyThrough('App\Models\Order\OrderStatus', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->orderBy('created_at', 'desc')->with('user_info');
    }

    public function completion_status(){
        return $this->hasManyThrough('App\Models\Order\OrderCompletionStatus', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->with('status')->orderBy('created_at', 'desc');
    }

    public function invoice(){
      return $this->hasMany('App\Models\Invoice\Invoice', 'order_id', 'order_id')->with('purchase_order', 'sum', 'terms', 'payment_history');
    }

    public function import_doc(){
      return $this->belongsTo('App\Models\KITE\ImportDoc', 'id', 'purchase_order_id');
    }

  }

?>