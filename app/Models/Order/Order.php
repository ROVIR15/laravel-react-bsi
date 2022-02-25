<?php

  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class Order extends Model
  {  
    protected $table = 'order';

    protected $primaryKey = 'id';

    const CREATED_AT = 'creation_time';
    const UPDATED_AT = 'update_time';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'sales_order_id',
        'purchase_order_id',
        'creation_time',
        'update_time'
    ];
  }
