<?php

  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class Order extends Model
  {  
    protected $table = 'order';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'sales_order_id',
        'purchase_order_id',
        'quote_id'
    ];

    public function order_item(){
      return $this->hasMany('App\Models\Order\OrderItem');
    }
  }
