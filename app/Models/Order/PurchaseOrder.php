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

    public function product_feature(){
      return $this->hasManyThrough('App\Models\Product\ProductFeature', 'App\Models\Order\OrderItem', 'order_id', 'id', 'order_id', 'id')->with('product');
    }

    public function order_item(){
      return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->with('product_feature');
    }

    public function sum(){
      return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->groupBy('order_id')->select(DB::raw('sum(qty) as total_qty, sum(qty*unit_price) as total_money'));
    }

    public function bought(){
      return $this->belongsTo('App\Models\Party\Party', 'bought_from', 'id');
    }

    public function party(){
      return $this->belongsTo('App\Models\Party\Party', 'bought_from', 'id');
    }

    public function ship(){
        return $this->belongsTo('App\Models\Party\Party', 'ship_to', 'id');
    }

    public function status(){
        return $this->hasManyThrough('App\Models\Order\OrderStatus', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->orderBy('created_at', 'desc');
    }

    public function completion_status(){
        return $this->hasManyThrough('App\Models\Order\OrderCompletionStatus', 'App\Models\Order\Order', 'id', 'order_id', 'order_id', 'id')->with('status')->orderBy('created_at', 'desc');
    }
  }

?>