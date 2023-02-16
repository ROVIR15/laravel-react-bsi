<?php
  
  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class OrderAssociation extends Model
  {  
    protected $table = 'order_association';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'sales_order_id',
        'purchase_order_id'
    ];
  }
