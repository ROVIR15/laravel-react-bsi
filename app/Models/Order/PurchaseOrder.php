<?php

  namespace App\Models\Order;
  use Illuminate\Database\Eloquent\Model;
  
  class PurchaseOrder extends Model
  {
    protected $table = 'purchase_order';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'id',
        'order_id',
        'created_at',
        'updated_at'
    ];
  }

?>