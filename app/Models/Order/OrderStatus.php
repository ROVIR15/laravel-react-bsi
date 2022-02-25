<?php
  
  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class OrderStatus extends Model
  {
    protected $table = 'order_status';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'status_type',
        'created_at',
        'updated_at',
        'order_id',
        'id'
    ];
  }
