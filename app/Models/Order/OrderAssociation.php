<?php
  
  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class OrderAssociation extends Model
  {  
    protected $table = 'order_association';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'sales_order_id',
        'purchase_order_id'
    ];
  }
