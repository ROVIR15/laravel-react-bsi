<?php

namespace App\Models\Order;
use Illuminate\Database\Eloquent\Model;
  
  class OrderItem extends Model
  {
    protected $table = 'order';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'order_id',
        'qty',
        'unit_price',
        'shipment_estimated',
        'product_id'
    ];
  }

