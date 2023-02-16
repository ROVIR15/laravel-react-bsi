<?php
  
  namespace App\Models\Order;
  
  use Illuminate\Database\Eloquent\Model;
  
  class OrderStatus extends Model
  {
    protected $table = 'order_status';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'description',
        'status_type',
        'user_id',
        'order_id',
        'id'
    ];

    public function sales_order() {
      return $this->belongsTo('App\Models\Order\Order', 'order_id')->with('order_item', 'sales_order');
    }

    public function purchase_order() {
      return $this->belongsTo('App\Models\Order\Order', 'order_id')->with('order_item', 'purchase_order');
    }    

    public function user_info(){
      return $this->belongsTo('App\User', 'user_id');
    }
  }
