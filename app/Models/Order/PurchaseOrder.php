<?php

  namespace App\Models\Order;
  use Illuminate\Database\Eloquent\Model;
  
  class PurchaseOrder extends Model
  {
    protected $table = 'purchase_order';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = false;

    protected $fillable = [
        'id',
        'order_id',
        'po_number',
        'bought_from',
        'issue_date',
        'delivery_date',
        'valid_thru',
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

?>