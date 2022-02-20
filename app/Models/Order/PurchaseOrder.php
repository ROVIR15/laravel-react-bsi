<?php

  namespace App\Models\Order;
  use Illuminate\Database\Eloquent\Model;
  
  class PurchaseOrder extends Model
  {
    protected $table = 'purchase_order';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'order_id',
    ];
  }

?>