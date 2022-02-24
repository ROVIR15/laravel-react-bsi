<?php

namespace App\Models\Order;
use Illuminate\Database\Eloquent\Model;
  
  class OrderItem extends Model
  {
    protected $table = 'order_item';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'id',
        'order_id',
        'qty',
        'unit_price',
        'shipment_estimated',
        'product_id'
    ];
  }

