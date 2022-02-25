<?php
  
  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class OrderRole extends Model
  {  
    protected $table = 'order_role';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'order_id'
    ];
  }
