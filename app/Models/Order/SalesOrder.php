<?php

  namespace App\Models\Order;
  
  use Carbon\Carbon;
  
  use Illuminate\Database\Eloquent\Model;
  
  class SalesOrder extends Model
  {  
    protected $table = 'sales_order';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'id',
        'order_id'
    ];
  }
