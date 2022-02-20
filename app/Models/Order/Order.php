<?php

  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class Order extends Model
  {  
    protected $table = 'order';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'order_type_id',
        'creation_time',
        'update_time'
    ];
  }
