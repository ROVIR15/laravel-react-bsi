<?php

  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class Order extends Model
  {  
    protected $table = 'order';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'sales_order_id',
        'purchase_order_id',
        'quote_id'
    ];

    public function order_item(){
      return $this->hasMany('App\Models\Order\OrderItem');
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
  }
